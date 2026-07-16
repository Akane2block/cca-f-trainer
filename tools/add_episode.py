#!/usr/bin/env python3
"""苦手問題 → 音声エピソード を1コマンドでアプリに追加するパイプライン。

/cca 問題モードから自動で呼ばれる想定。台本JSON（topic/summary/script の日英）を渡すと、
  1. 日本語音声を AivisSpeech morioki（一人語り）で生成
  2. 英語音声を edge-tts Ava で生成
  3. data/episodes.json の先頭に新エピソードを追記（＝アプリで最新が一番上）
  4. data/episodes.js を episodes.json から再生成
  5. index.html / app.js / sw.js のバージョン3点セットを自動更新
  6. Apple Music プレイリスト「音声学習」（単語と共通・日英とも1本）にも追加（--no-music で無効化）
までを一気に行う。git commit と push はしない（呼び出し側＝Claudeが確認のうえ行う）。

使い方:
  python3 tools/add_episode.py <台本.json> [--no-music]
  python3 tools/add_episode.py --rebuild-only   # episodes.json から js を作り直すだけ

事前条件:
  AivisSpeech Engine を起動しておく:
    ~/Applications/AivisSpeech-Engine/macOS-arm64/run --port 10101 &
  edge-tts / ffmpeg は導入済み。英語生成はネット接続が必要（失敗しても日本語は生成する）。

台本JSONの形式:
  {
    "style": "solo",                       # 省略時 solo。対話は "dialogue"
    "topic":   {"ja": "...", "en": "..."},
    "summary": {"ja": "...", "en": "..."},
    "script": {
      "ja": [{"s": "", "t": "..."}, ...],   # s(話者): 一人語りは "" / 対話は "host","expert"
      "en": [{"s": "", "t": "..."}, ...]
    }
  }
"""
import argparse, asyncio, datetime, json, os, re, subprocess, sys, tempfile, urllib.request, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # cca-f-trainer/
AUDIO_DIR = os.path.join(ROOT, "audio")
DATA_JSON = os.path.join(ROOT, "data", "episodes.json")
DATA_JS = os.path.join(ROOT, "data", "episodes.js")
INDEX = os.path.join(ROOT, "index.html")
APPJS = os.path.join(ROOT, "app.js")
SW = os.path.join(ROOT, "sw.js")

AIVIS = "http://127.0.0.1:10101"
# 標準は morioki の一人語り（2026-07-06 富永さん決定）。対話にする場合のみ expert を分ける
JA_VOICES = {"": 497929760, "host": 497929760, "expert": 606865152}
EN_VOICES = {"": "en-US-AvaNeural", "host": "en-US-AvaNeural", "expert": "en-US-AndrewNeural"}


# ---- 音声生成 ----
def engine_up():
    try:
        urllib.request.urlopen(AIVIS + "/version", timeout=3)
        return True
    except Exception:
        return False


def aivis_synth(text, speaker, path):
    q = urllib.parse.urlencode({"text": text, "speaker": speaker})
    req = urllib.request.Request(f"{AIVIS}/audio_query?{q}", method="POST")
    with urllib.request.urlopen(req, timeout=120) as r:
        query = json.load(r)
    req = urllib.request.Request(f"{AIVIS}/synthesis?speaker={speaker}",
                                 data=json.dumps(query).encode(),
                                 headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=300) as r, open(path, "wb") as f:
        f.write(r.read())


def concat_to_mp3(segs, out_path, rate="44100"):
    tmpdir = tempfile.mkdtemp(prefix="cca_ep_")
    silence = os.path.join(tmpdir, "sil.wav")
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i", f"anullsrc=r={rate}:cl=mono",
                    "-t", "0.45", silence], capture_output=True, check=True)
    lst = os.path.join(tmpdir, "list.txt")
    with open(lst, "w") as f:
        for i, p in enumerate(segs):
            f.write(f"file '{p}'\n")
            if i < len(segs) - 1:
                f.write(f"file '{silence}'\n")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst,
                    "-c:a", "libmp3lame", "-q:a", "4", out_path], capture_output=True, check=True)


def build_ja(lines, out_path):
    tmpdir = tempfile.mkdtemp(prefix="cca_ja_")
    segs = []
    for i, line in enumerate(lines):
        p = os.path.join(tmpdir, f"s{i:02d}.wav")
        aivis_synth(line["t"], JA_VOICES.get(line.get("s", ""), JA_VOICES[""]), p)
        segs.append(p)
        print(f"  ja {i + 1}/{len(lines)}")
    concat_to_mp3(segs, out_path)


async def build_en(lines, out_path):
    import edge_tts
    tmpdir = tempfile.mkdtemp(prefix="cca_en_")
    segs = []
    for i, line in enumerate(lines):
        p = os.path.join(tmpdir, f"s{i:02d}.mp3")
        await edge_tts.Communicate(line["t"], EN_VOICES.get(line.get("s", ""), EN_VOICES[""])).save(p)
        segs.append(p)
        print(f"  en {i + 1}/{len(lines)}")
    concat_to_mp3(segs, out_path, rate="24000")


def tag(path, title, track):
    tmp = path + ".tmp.mp3"
    subprocess.run(["ffmpeg", "-y", "-i", path, "-c", "copy",
                    "-metadata", f"title={title}",
                    "-metadata", "artist=CCA-F 音声学習",
                    "-metadata", "album=CCA-F Podcast",
                    "-metadata", f"track={track}", tmp], capture_output=True, check=True)
    os.replace(tmp, path)


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
                          "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip()
    return round(float(out)) if out else 0


# ---- データ・バージョン管理 ----
def load_episodes():
    with open(DATA_JSON, encoding="utf-8") as f:
        return json.load(f)


def next_id(episodes):
    nums = [int(m.group(1)) for e in episodes for m in [re.match(r"ep(\d+)", e["id"])] if m]
    return "ep%03d" % ((max(nums) if nums else 0) + 1)


def regenerate_js(episodes):
    header = ("/* 自動生成ファイル。手で編集しない。\n"
              "   正本は data/episodes.json、追加は tools/add_episode.py（/cca 問題モードから自動実行）。 */\n")
    with open(DATA_JS, "w", encoding="utf-8") as f:
        f.write(header + "window.EPISODES = " + json.dumps(episodes, ensure_ascii=False, indent=2) + ";\n")


def bump_versions():
    now = datetime.datetime.now()
    ver = now.strftime("%Y%m%d-%H%M")
    updated = now.strftime("%Y-%m-%d %H:%M")
    html = open(INDEX, encoding="utf-8").read()
    html = re.sub(r"\?v=\d{8}-\d{4}", "?v=" + ver, html)
    html = re.sub(r"更新日: [\d\-: ]+/ バージョン \d{8}-\d{4}",
                  "更新日: " + updated + " / バージョン " + ver, html)
    open(INDEX, "w", encoding="utf-8").write(html)
    js = open(APPJS, encoding="utf-8").read()
    js = re.sub(r"const APP_UPDATED_AT = '[^']*';", "const APP_UPDATED_AT = '" + updated + "';", js)
    js = re.sub(r"const APP_VERSION = '[^']*';", "const APP_VERSION = '" + ver + "';", js)
    open(APPJS, "w", encoding="utf-8").write(js)
    sw = open(SW, encoding="utf-8").read()
    m = re.search(r"const CACHE = 'ccaf-v(\d+)';", sw)
    n = int(m.group(1)) + 1 if m else 1
    sw = re.sub(r"const CACHE = 'ccaf-v\d+';", "const CACHE = 'ccaf-v%d';" % n, sw)
    open(SW, "w", encoding="utf-8").write(sw)
    return ver


def add_paths_to_playlist(playlist_name, paths):
    """指定プレイリストへ追加（無ければ作成）。失敗しても致命的にはしない。"""
    if not paths:
        return
    adds = "\n".join(
        f'  add (POSIX file "{p}") to pl\n  delay 2' for p in paths)
    script = f'''
tell application "Music"
  if not (exists user playlist "{playlist_name}") then
    make new user playlist with properties {{name:"{playlist_name}"}}
  end if
  set pl to user playlist "{playlist_name}"
{adds}
end tell
'''
    try:
        subprocess.run(["osascript", "-e", script], capture_output=True, timeout=90, check=True)
        print(f"  Apple Music: {playlist_name} に追加")
    except Exception as e:
        print(f"  Apple Music 追加はスキップ（{e}）。あとで手動追加可")


PLAYLIST = "音声学習"


def add_to_apple_music(ja_path, en_path=None):
    """問題エピソード（日英とも）を単語と共通の1プレイリスト「音声学習」へ追加。"""
    paths = [ja_path]
    if en_path:
        paths.append(en_path)
    add_paths_to_playlist(PLAYLIST, paths)


# ---- メイン ----
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script_json", nargs="?", help="台本JSONのパス")
    ap.add_argument("--no-music", action="store_true", help="Apple Music へ追加しない")
    ap.add_argument("--rebuild-only", action="store_true", help="episodes.json から js を作り直すだけ")
    args = ap.parse_args()

    episodes = load_episodes()

    if args.rebuild_only:
        regenerate_js(episodes)
        print("rebuilt data/episodes.js from data/episodes.json")
        return

    if not args.script_json:
        sys.exit("台本JSONのパスを渡してください（または --rebuild-only）")
    if not engine_up():
        sys.exit("AivisSpeech Engine が起動していません:\n"
                 "  ~/Applications/AivisSpeech-Engine/macOS-arm64/run --port 10101 &")

    with open(args.script_json, encoding="utf-8") as f:
        spec = json.load(f)

    eid = spec.get("id") or next_id(episodes)
    date = spec.get("date") or datetime.datetime.now().strftime("%Y-%m-%d")
    style = spec.get("style", "solo")
    ja_lines = spec["script"]["ja"]
    en_lines = spec["script"].get("en", [])

    ja_path = os.path.join(AUDIO_DIR, f"{eid}-ja.mp3")
    en_path = os.path.join(AUDIO_DIR, f"{eid}-en.mp3")
    track = int(re.match(r"ep(\d+)", eid).group(1))

    print(f"build {eid}: {spec['topic']['ja']}")
    build_ja(ja_lines, ja_path)
    tag(ja_path, f"第{track}回 {spec['topic']['ja']}", track)
    dur = {"ja": duration(ja_path)}
    audio = {"ja": f"audio/{eid}-ja.mp3"}
    en_ok = False

    if en_lines:
        try:
            asyncio.run(build_en(en_lines, en_path))
            tag(en_path, f"Ep.{track} {spec['topic']['en']}", track)
            dur["en"] = duration(en_path)
            audio["en"] = f"audio/{eid}-en.mp3"
            en_ok = True
        except Exception as e:
            print(f"  英語生成をスキップ（{e}）。日本語のみで登録")

    entry = {
        "id": eid, "date": date, "style": style,
        "topic": spec["topic"], "summary": spec["summary"],
        "audio": audio, "duration": dur, "script": spec["script"],
    }
    episodes.insert(0, entry)  # 最新を先頭に
    with open(DATA_JSON, "w", encoding="utf-8") as f:
        json.dump(episodes, f, ensure_ascii=False, indent=2)
    regenerate_js(episodes)
    ver = bump_versions()

    if not args.no_music:
        add_to_apple_music(ja_path, en_path if en_ok else None)

    print(f"\n完了: {eid}（{spec['topic']['ja']}） ja={dur.get('ja')}s en={dur.get('en', '-')}s / version {ver}")
    print("次: cca-f-trainer を git commit（push は富永さんの承認後）")


if __name__ == "__main__":
    main()
