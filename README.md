# CCA-F 練習

Claude Certified Architect - Foundations（CCA-F）合格のための、スマホで解ける判断問題ドリル。

## 使い方
- iPhoneでURLを開く → 共有メニュー →「ホーム画面に追加」でアプリ化
- オフラインでも解ける（Service Worker）
- 進捗（ドメイン別正答率・間違いリスト）は端末のブラウザに保存

## モード
- ドメイン別 / ランダム / 間違いだけ復習 / 本番モード（60問・タイマー）

## 問題の足し方
`data/q-<domain>.js` の `window.QUESTIONS.push(...)` に同じ形式で追記する。
スキーマ: `{ id, domain, answer(0-3), ja{scenario,question,options[4],explanations[4]}, en{...} }`

## ドメインと配点
| key | 領域 | 配点 | 問題数 |
|---|---|---:|---:|
| agentic | Agentic Architecture & Orchestration | 27% | 40 |
| claudecode | Claude Code Configuration & Workflows | 20% | 30 |
| prompt | Prompt Engineering & Structured Output | 20% | 30 |
| tool | Tool Design & MCP Integration | 18% | 27 |
| context | Context Management & Reliability | 15% | 23 |

合計 150問。
