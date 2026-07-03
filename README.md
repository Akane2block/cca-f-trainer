# CCA-F 練習

Claude Certified Architect - Foundations（CCA-F）合格のための、スマホで解ける判断問題ドリル。
本試験と同じ「具体的な業務シナリオ＋全選択肢もっともらしい4択（決め手は1点）」形式。

## 使い方
- iPhoneでURLを開く → 共有メニュー →「ホーム画面に追加」でアプリ化
- オフラインでも解ける（Service Worker）
- 進捗（ドメイン別正答率・間違いリスト）は端末のブラウザに保存（更新しても消えないバックアップ付き）
- 日英切替は画面右上。回答中に切り替えても問題・回答状態はそのまま言語だけ変わる

## モード
- ドメイン別 / ランダム / 間違いだけ復習 / 本番モード（60問・タイマー） / 用語クイズ（4択）

## 問題の足し方
`data/q-<domain>.js`（通常）または `data/q-adv-<domain>.js`（苦手問題由来）の `window.QUESTIONS.push(...)` に同じ形式で追記する。
スキーマ: `{ id, domain, answer(0-3), ja{scenario,question,options[4],explanations[4]}, en{...} }`
更新したら app.js の `APP_VERSION`・index.html の `?v=`・sw.js の `CACHE` を上げる。

## ドメインと配点
| key | 領域 | 配点 | 問題数 |
|---|---|---:|---:|
| agentic | Agentic Architecture & Orchestration | 27% | 54 |
| claudecode | Claude Code Configuration & Workflows | 20% | 42 |
| prompt | Prompt Engineering & Structured Output | 20% | 41 |
| tool | Tool Design & MCP Integration | 18% | 42 |
| context | Context Management & Reliability | 15% | 34 |

合計 213問（本試験レベル・シナリオ形式）＋ 用語集 127語。
学習記録（苦手問題・単語メモ）を反映して随時更新。
