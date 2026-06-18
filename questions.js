/* CCA-F 問題データ ブートストラップ
   ドメイン定義と空配列を用意。実際の問題は data/q-*.js が window.QUESTIONS.push(...) で足す。
   読み込み順: questions.js → data/q-*.js → app.js（index.html参照） */

window.DOMAINS = [
  { key: 'agentic',    ja: 'エージェント設計・統制',   en: 'Agentic Architecture & Orchestration', weight: 27 },
  { key: 'claudecode', ja: 'Claude Code 設定・運用',   en: 'Claude Code Configuration & Workflows', weight: 20 },
  { key: 'prompt',     ja: 'プロンプト・構造化出力',   en: 'Prompt Engineering & Structured Output', weight: 20 },
  { key: 'tool',       ja: 'ツール設計・MCP連携',     en: 'Tool Design & MCP Integration', weight: 18 },
  { key: 'context',    ja: 'コンテキスト管理・信頼性', en: 'Context Management & Reliability', weight: 15 }
];

window.QUESTIONS = [];
