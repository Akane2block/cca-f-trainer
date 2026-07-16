#!/usr/bin/env python3
"""英単語 → 英語のみの短い音声トラック を作り、Apple Music「音声学習」（問題エピソードと共通の1本）に追加する。

1単語=1トラック（英語のみ・edge-tts Ava）。テーマは曲のアルバム名「CCA-F単語_<テーマ>」に入れ、
Apple Music上でテーマごとに固まって見えるようにする（2026-07-11 富永要望）。
問題ポッドキャスト（episodes.json）とは別に data/words.json で単語を管理する。

使い方:
  # 1単語ずつ
  python3 tools/add_word.py --word delegate --theme "エージェント設計" \
      --def "to hand a task to another agent instead of doing it yourself" \
      --example "The coordinator delegates the task to a sub-agent with proxy capabilities."

  # まとめて（JSON配列: [{"word","theme","def","example"}, ...]）
  python3 tools/add_word.py --json /tmp/words.json

事前条件: edge-tts / ffmpeg 導入済み。英語生成はネット接続が必要。
Apple Music追加は失敗しても致命的にしない。git commit / push はしない（呼び出し側が確認のうえ行う）。
"""
import argparse, asyncio, datetime, json, os, re, subprocess, sys
import edge_tts

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUDIO_DIR = os.path.join(ROOT, "audio")
WORDS_JSON = os.path.join(ROOT, "data", "words.json")
EN_VOICE = "en-US-AvaNeural"
PLAYLIST = "CCA-F音声学習"


def slug(w):
    return re.sub(r"[^a-z0-9]+", "-", w.lower()).strip("-") or "word"


def load_words():
    if os.path.exists(WORDS_JSON):
        return json.load(open(WORDS_JSON, encoding="utf-8"))
    return []


async def synth_en(text, path):
    await edge_tts.Communicate(text, EN_VOICE).save(path)


def tag(path, title, album, track):
    tmp = path + ".tmp.mp3"
    subprocess.run(["ffmpeg", "-y", "-i", path, "-c", "copy",
                    "-metadata", f"title={title}",
                    "-metadata", "artist=CCA-F 単語学習",
                    "-metadata", f"album={album}",
                    "-metadata", f"track={track}", tmp],
                   capture_output=True, check=True)
    os.replace(tmp, path)


def duration(path):
    out = subprocess.run(["ffprobe", "-v", "quiet", "-show_entries", "format=duration",
                          "-of", "csv=p=0", path], capture_output=True, text=True).stdout.strip()
    return round(float(out)) if out else 0


def add_to_playlist(path):
    script = f'''
tell application "Music"
  if not (exists user playlist "{PLAYLIST}") then
    make new user playlist with properties {{name:"{PLAYLIST}"}}
  end if
  set pl to user playlist "{PLAYLIST}"
  add (POSIX file "{path}") to pl
end tell
'''
    try:
        subprocess.run(["osascript", "-e", script], capture_output=True, timeout=180, check=True)
        print(f"  Apple Music: {PLAYLIST} に追加")
    except Exception as e:
        print(f"  Apple Music 追加はスキップ（{e}）")


def add_one(spec, words, force=False, music=True):
    word = spec["word"].strip()
    theme = (spec.get("theme") or "汎用").strip()
    definition = spec["def"].strip()
    example = (spec.get("example") or "").strip()
    for w in words:
        if w["word"].lower() == word.lower() and not force:
            print(f"  スキップ（既出）: {word}")
            return None
    idx = (max([w.get("index", 0) for w in words]) + 1) if words else 1
    fn = f"word-{idx:03d}-{slug(word)}.mp3"
    path = os.path.join(AUDIO_DIR, fn)
    text = f"{word}. {word} means, {definition}."
    if example:
        text += f" For example. {example}."
    print(f"build word {idx:03d}: {word}  [{theme}]")
    asyncio.run(synth_en(text, path))
    album = f"CCA-F単語_{theme}"
    tag(path, word, album, idx)
    dur = duration(path)
    entry = {"index": idx, "word": word, "theme": theme,
             "definition_en": definition, "example_en": example,
             "audio": f"audio/{fn}", "duration": dur,
             "date": datetime.datetime.now().strftime("%Y-%m-%d")}
    words.append(entry)
    if music:
        add_to_playlist(path)
    print(f"  完了: {word} ({dur}s) album={album}")
    return entry


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--word")
    ap.add_argument("--theme", default="汎用")
    ap.add_argument("--def", dest="definition")
    ap.add_argument("--example", default="")
    ap.add_argument("--json", help="複数単語のJSON配列ファイル")
    ap.add_argument("--force", action="store_true", help="既出でも作る")
    ap.add_argument("--no-music", action="store_true", help="Apple Music へ追加しない")
    args = ap.parse_args()

    words = load_words()
    if args.json:
        raw = json.load(open(args.json, encoding="utf-8"))
    elif args.word and args.definition:
        raw = [{"word": args.word, "theme": args.theme,
                "def": args.definition, "example": args.example}]
    else:
        sys.exit("--word と --def、または --json を渡してください")

    added = 0
    for spec in raw:
        s = {"word": spec["word"], "theme": spec.get("theme", "汎用"),
             "def": spec.get("def") or spec.get("definition") or spec.get("definition_en", ""),
             "example": spec.get("example") or spec.get("example_en", "")}
        if not s["def"]:
            print(f"  スキップ（定義なし）: {s['word']}")
            continue
        if add_one(s, words, force=args.force, music=not args.no_music):
            added += 1

    with open(WORDS_JSON, "w", encoding="utf-8") as f:
        json.dump(words, f, ensure_ascii=False, indent=2)
    print(f"\n単語登録: +{added}件 / 累計{len(words)}件 → data/words.json")
    print("次: cca-f-trainer を git commit（push は富永さんの承認後）")


if __name__ == "__main__":
    main()
