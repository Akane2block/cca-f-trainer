#!/usr/bin/env python3
"""CCA-F 音声学習エピソード生成ツール

台本（日英・話者つき）から audio/ 用のmp3を生成する。
  日本語: AivisSpeech Engine（ローカル・要起動）
  英語:   edge-tts（Microsoftニューラル音声・要ネット接続）

事前準備:
  1. AivisSpeech Engine を起動:
     ~/Applications/AivisSpeech-Engine/macOS-arm64/run --port 10101 &
  2. pip3 install --user edge-tts / brew install ffmpeg（導入済み）

使い方:
  python3 tools/generate_episode.py <台本.json>

台本JSONの形式（サンプル: tools/example_episode.json）:
  {
    "id": "ep003",
    "title_ja": "第3回 ◯◯（対話）",
    "title_en": "Ep.3 ◯◯ (dialogue)",
    "track": 3,
    "ja": [{"s": "host", "t": "こんにちは..."}, {"s": "expert", "t": "..."}],
    "en": [{"s": "host", "t": "Welcome back..."}]
  }
  s（話者）: "host" / "expert" / ""（一人語りは "" か "host" 固定でよい）

生成後にやること:
  1. data/episodes.js に台本・時間・パスのエントリを追加
  2. index.html の ?v=・app.js の APP_VERSION・sw.js の CACHE を上げる
  3. git commit（プッシュは富永さんの承認後）
"""
import asyncio, json, os, subprocess, sys, tempfile, urllib.request, urllib.parse

AIVIS = "http://127.0.0.1:10101"
# AivisSpeech の話者ID（/speakers で確認できる）
JA_VOICES = {"host": 888753760, "expert": 1878365376, "": 888753763}
# host=まお/ノーマル, expert=コハク/ノーマル, 一人語り("")=まお/おちつき
EN_VOICES = {"host": "en-US-AvaNeural", "expert": "en-US-AndrewNeural", "": "en-US-AvaNeural"}

AUDIO_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "audio")


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


def concat(segs, out_path):
    tmpdir = tempfile.mkdtemp(prefix="ep_")
    silence = os.path.join(tmpdir, "sil.wav")
    subprocess.run(["ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono",
                    "-t", "0.4", silence], capture_output=True, check=True)
    lst = os.path.join(tmpdir, "list.txt")
    with open(lst, "w") as f:
        for i, p in enumerate(segs):
            f.write(f"file '{p}'\n")
            if i < len(segs) - 1:
                f.write(f"file '{silence}'\n")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", lst,
                    "-c:a", "libmp3lame", "-q:a", "4", out_path], capture_output=True, check=True)


def tag(path, title, track):
    tmp = path + ".tmp.mp3"
    subprocess.run(["ffmpeg", "-y", "-i", path, "-c", "copy",
                    "-metadata", f"title={title}",
                    "-metadata", "artist=CCA-F 音声学習",
                    "-metadata", "album=CCA-F Podcast",
                    "-metadata", f"track={track}", tmp], capture_output=True, check=True)
    os.replace(tmp, path)


def build_ja(ep):
    tmpdir = tempfile.mkdtemp(prefix="ja_")
    segs = []
    for i, line in enumerate(ep["ja"]):
        p = os.path.join(tmpdir, f"s{i:02d}.wav")
        aivis_synth(line["t"], JA_VOICES.get(line.get("s", ""), JA_VOICES[""]), p)
        segs.append(p)
        print(f"  ja {i+1}/{len(ep['ja'])}")
    out = os.path.join(AUDIO_DIR, f"{ep['id']}-ja.mp3")
    concat(segs, out)
    tag(out, ep["title_ja"], ep.get("track", 0))
    return out


async def build_en(ep):
    tmpdir = tempfile.mkdtemp(prefix="en_")
    segs = []
    for i, line in enumerate(ep["en"]):
        p = os.path.join(tmpdir, f"s{i:02d}.mp3")
        await __import__("edge_tts").Communicate(
            line["t"], EN_VOICES.get(line.get("s", ""), EN_VOICES[""])).save(p)
        segs.append(p)
        print(f"  en {i+1}/{len(ep['en'])}")
    out = os.path.join(AUDIO_DIR, f"{ep['id']}-en.mp3")
    concat(segs, out)
    tag(out, ep["title_en"], ep.get("track", 0))
    return out


def duration(path):
    d = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
                        "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip()
    return round(float(d))


if __name__ == "__main__":
    with open(sys.argv[1]) as f:
        ep = json.load(f)
    try:
        urllib.request.urlopen(AIVIS + "/version", timeout=3)
    except Exception:
        sys.exit("AivisSpeech Engine が起動していません: ~/Applications/AivisSpeech-Engine/macOS-arm64/run --port 10101 &")
    ja = build_ja(ep)
    en = asyncio.run(build_en(ep)) if ep.get("en") else None
    print("done:")
    print(f"  ja: {ja} ({duration(ja)}s)")
    if en:
        print(f"  en: {en} ({duration(en)}s)")
    print("次: data/episodes.js にエントリ追加 → バージョン3点セット更新 → commit")
