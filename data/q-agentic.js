// CCA-F practice questions — domain: agentic — exam-style scenarios (rebuilt 2026-07)
window.QUESTIONS.push(
  {
    id: 'ag2-001', domain: 'agentic', answer: 0,
    ja: {
      scenario: '通販会社の返品対応エージェントが、返品可否の判定、返金実行、在庫戻し、クーポン発行を同じ会話で扱う。FAQ回答は安定しているが、返金額が大きいケースで担当者確認を飛ばしそうになった。CS責任者は「顧客体験を落としたくないので全部自動で」と言っている。',
      question: '返金のような不可逆・金銭操作を含むエージェント設計として最も適切なのはどれか。',
      options: ['FAQや返品条件の案内は自動化し、返金実行は金額や条件に応じて人間承認を必須にする', '返金ツールを読み取り専用にし、実行は別システムで手作業に戻す', 'すべての返金を自動化し、事故が起きたら監査ログで追跡する', 'プロンプトに「高額返金は慎重に」と追記し、同じ権限のまま運用する'],
      explanations: ['正解。リスクで自律度を変え、不可逆操作だけ承認ゲートを置くのが決め手。', 'もっともらしいが不十分。決め手は「リスクで自律度を変え、不可逆操作だけ承認ゲートを置くのが決め手」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「リスクで自律度を変え、不可逆操作だけ承認ゲートを置くのが決め手」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「リスクで自律度を変え、不可逆操作だけ承認ゲートを置くのが決め手」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'EC returns agent handles eligibility checks, refund execution, inventory restocking, and coupon issuance in one conversation. FAQ answers are stable, but in high-value refunds it almost skipped staff review. The CS lead wants everything automated to preserve customer experience.',
      question: 'Which design is most appropriate for an agent that includes irreversible monetary operations?',
      options: ['Add explicit human review or approval at the risky point', 'Restrict permissions to the minimum needed for the task', 'Rely on after-the-fact logs, review, rollback, or apology', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-002', domain: 'agentic', answer: 2,
    ja: {
      scenario: '法務部向けの契約レビューAIで、条文抽出、リスク分類、修正文案作成、社外弁護士への送信までを1体のエージェントに任せる案が出た。過去の試験運用では抽出は高精度だが、リスク分類の根拠が曖昧なまま送信案まで進むことがあった。',
      question: '責務分離の観点で最も適切な構成はどれか。',
      options: ['1体のエージェントに全工程を任せ、送信前に「本当に大丈夫か」と自己確認させる', '抽出と送信を優先して自動化し、リスク分類は後からログで確認する', '抽出・分類・修正文案・送信を役割ごとに分け、送信前に検証と承認を挟む', '社外送信だけ別ツールにし、他はすべて同じプロンプト内で自由に処理させる'],
      explanations: ['もっともらしいが不十分。決め手は「工程ごとの責務と権限を分け、外部送信前に検証・承認を置くのがポイント」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「工程ごとの責務と権限を分け、外部送信前に検証・承認を置くのがポイント」であり、この選択肢は構造的な制御になっていない。', '正解。工程ごとの責務と権限を分け、外部送信前に検証・承認を置くのがポイント。', 'もっともらしいが不十分。決め手は「工程ごとの責務と権限を分け、外部送信前に検証・承認を置くのがポイント」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A legal contract review AI is proposed to extract clauses, classify risks, draft revisions, and send them to external counsel as one agent. Trials show extraction is accurate, but it sometimes proceeds to sending drafts with weak risk rationale.',
      question: 'Which architecture is most appropriate from a separation-of-responsibilities perspective?',
      options: ['Add explicit human review or approval at the risky point', 'Rely on after-the-fact logs, review, rollback, or apology', 'Add explicit human review or approval at the risky point', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-003', domain: 'agentic', answer: 0,
    ja: {
      scenario: '社内ナレッジ検索エージェントが、検索結果の上位10件を読み、要約し、出典付きで回答する。最近、検索結果が0件のときにも「おそらく」と推測で回答し、存在しない社内ルールを作ってしまった。',
      question: '失敗時の扱いとして最も適切なのはどれか。',
      options: ['検索0件を明示的な失敗状態として扱い、回答を保留して追加検索・確認依頼・人間引き継ぎへ分岐する', '推測回答には「たぶん」と付ければ利用者が判断できるのでよい', '検索件数を増やせば必ず何か出るので、0件の扱いは不要', 'モデルの一般知識で埋めるようにプロンプトを強める'],
      explanations: ['正解。検索0件は成功ではない。失敗状態を検知して分岐する設計が必要。', 'もっともらしいが不十分。決め手は「検索0件は成功ではない。失敗状態を検知して分岐する設計が必要」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「検索0件は成功ではない。失敗状態を検知して分岐する設計が必要」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「検索0件は成功ではない。失敗状態を検知して分岐する設計が必要」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An internal knowledge-search agent reads the top ten search results, summarizes them, and answers with citations. Recently, when search returned zero results, it guessed and invented a non-existent internal policy.',
      question: 'What is the most appropriate handling for this failure case?',
      options: ['Add explicit human review or approval at the risky point', 'Represent missing values explicitly instead of guessing', 'Use a plausible but indirect workaround', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-004', domain: 'agentic', answer: 3,
    ja: {
      scenario: '採用候補者の書類スクリーニングで、AIが履歴書を読み、面接推奨度を出す。人事は効率化を狙っているが、候補者への不採用連絡まで自動化するか迷っている。評価理由には曖昧な推論が混ざることがある。',
      question: '段階的導入として最も適切なのはどれか。',
      options: ['最初から不採用連絡まで完全自動化し、苦情が来たら止める', '推奨度だけ出し、人間は見ずに閾値で自動判断する', '人間評価を廃止し、モデルの一貫性を信頼する', 'まず提案・根拠提示に限定し、人間レビューで精度を測ってから限定的な自動化に広げる'],
      explanations: ['もっともらしいが不十分。決め手は「挙動が読めない高影響領域では、提案のみから始めて実績で自律度を上げる」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「挙動が読めない高影響領域では、提案のみから始めて実績で自律度を上げる」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「挙動が読めない高影響領域では、提案のみから始めて実績で自律度を上げる」であり、この選択肢は構造的な制御になっていない。', '正解。挙動が読めない高影響領域では、提案のみから始めて実績で自律度を上げる。']
    },
    en: {
      scenario: 'In recruiting, an AI reads resumes and produces interview recommendations. HR wants efficiency but is unsure whether rejection notices should also be automated. Evaluation rationales sometimes include ambiguous inference.',
      question: 'What is the most appropriate staged rollout?',
      options: ['Fully automate the action for convenience', 'Add explicit human review or approval at the risky point', 'Add explicit human review or approval at the risky point', 'Add explicit human review or approval at the risky point'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-005', domain: 'agentic', answer: 1,
    ja: {
      scenario: '売上分析エージェントが、SQL生成、実行、グラフ化、経営会議用コメント作成を行う。SQL実行ツールにはSELECTだけでなくUPDATE/DELETEも可能な管理者権限が渡されている。実際の用途は読み取り分析だけである。',
      question: '最小権限として最も適切なのはどれか。',
      options: ['プロンプトで更新・削除を禁止し、管理者権限は維持する', 'SELECT専用の読み取りツールだけを渡し、書き込み権限は別経路に分離する', '実行前にモデル自身に危険SQLか判定させる', '監査ログを残せば管理者権限でも問題ない'],
      explanations: ['もっともらしいが不十分。決め手は「必要なのは読み取りだけなので、構造的に書き込み権限を渡さないのが正解」であり、この選択肢は構造的な制御になっていない。', '正解。必要なのは読み取りだけなので、構造的に書き込み権限を渡さないのが正解。', 'もっともらしいが不十分。決め手は「必要なのは読み取りだけなので、構造的に書き込み権限を渡さないのが正解」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「必要なのは読み取りだけなので、構造的に書き込み権限を渡さないのが正解」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A sales-analysis agent generates SQL, runs it, creates charts, and drafts comments for executives. Its SQL tool has admin permissions including UPDATE/DELETE, though the actual use case is read-only analysis.',
      question: 'What is the most appropriate least-privilege design?',
      options: ['Rely mainly on stronger prompt wording or reminders', 'Restrict permissions to the minimum needed for the task', 'Tune model parameters or switch models as the primary fix', 'Rely on after-the-fact logs, review, rollback, or apology'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-006', domain: 'agentic', answer: 2,
    ja: {
      scenario: 'カスタマーサクセスの週次レポート生成で、会員数、解約理由、イベント参加率、Slack反応を横断して分析する。1回の会話に全CSVと全ログを入れると、後半で数値の取り違えが増えた。',
      question: '長い分析タスクの設計として最も適切なのはどれか。',
      options: ['最大コンテキストのモデルに変え、全データを一度に渡す', '出力を短くするよう指示して、取り違えを減らす', 'データ種別ごとに抽出・要約を分け、構造化した中間結果を統合する', 'temperatureを下げれば長文でも取り違えはなくなる'],
      explanations: ['もっともらしいが不十分。決め手は「長時間・多資料タスクは分割と構造化中間結果が決め手」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「長時間・多資料タスクは分割と構造化中間結果が決め手」であり、この選択肢は構造的な制御になっていない。', '正解。長時間・多資料タスクは分割と構造化中間結果が決め手。', 'もっともらしいが不十分。決め手は「長時間・多資料タスクは分割と構造化中間結果が決め手」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A CS weekly report analyzes membership, churn reasons, event attendance, and Slack reactions. When all CSVs and logs are placed in one conversation, late-stage number mixups increase.',
      question: 'What is the best design for this long analysis task?',
      options: ['Tune model parameters or switch models as the primary fix', 'Rely mainly on stronger prompt wording or reminders', 'Decompose the workflow and pass structured, validated intermediate results', 'Tune model parameters or switch models as the primary fix'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-007', domain: 'agentic', answer: 0,
    ja: {
      scenario: '請求書処理の自律エージェントが、OCR失敗時に同じPDFを何度も再処理し、夜間バッチが終わらない。担当者は「成功するまで粘る」挙動を期待していたが、翌朝の会計連携が遅延した。',
      question: 'ループ制御として最も適切なのはどれか。',
      options: ['リトライ上限、指数バックオフ、失敗キューへの隔離、通知を入れる', 'リトライ間隔を短くして朝までに成功確率を上げる', 'OCR失敗を無視して空の請求書として登録する', 'プロンプトに「無限ループしないで」と書く'],
      explanations: ['正解。有限リトライと隔離・通知でバッチ全体を止めない設計にする。', 'もっともらしいが不十分。決め手は「有限リトライと隔離・通知でバッチ全体を止めない設計にする」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「有限リトライと隔離・通知でバッチ全体を止めない設計にする」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「有限リトライと隔離・通知でバッチ全体を止めない設計にする」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An invoice-processing agent retries the same PDF whenever OCR fails, causing the overnight batch never to finish. The owner expected it to “keep trying until it works,” but accounting sync was delayed the next morning.',
      question: 'What is the most appropriate loop control?',
      options: ['Use bounded retries, coordination, quarantine, and notification controls', 'Use bounded retries, coordination, quarantine, and notification controls', 'Use a plausible but indirect workaround', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-008', domain: 'agentic', answer: 3,
    ja: {
      scenario: 'マーケティングAIが広告文を作成し、そのまま配信予約ツールを呼ぶ。表現チェックでは法務NG語がたまに混ざるため、担当者は別のAIにレビューさせる案を出した。',
      question: 'critic/verifierの入れ方として最も適切なのはどれか。',
      options: ['同じ生成エージェントに最後にもう一度読み返させる', '配信後に法務NG語があれば停止する', 'レビューAIにも配信予約権限を渡して、判断したら即配信させる', '独立した検証ステップでNG語・根拠・ブランド条件を確認し、失敗時は配信せず差し戻す'],
      explanations: ['もっともらしいが不十分。決め手は「検証は独立させ、配信前にブロックできる位置に置く」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「検証は独立させ、配信前にブロックできる位置に置く」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「検証は独立させ、配信前にブロックできる位置に置く」であり、この選択肢は構造的な制御になっていない。', '正解。検証は独立させ、配信前にブロックできる位置に置く。']
    },
    en: {
      scenario: 'A marketing AI drafts ad copy and then calls a scheduling tool directly. Legal-prohibited terms sometimes appear, so the team proposes adding another AI reviewer.',
      question: 'What is the most appropriate verifier design?',
      options: ['Use a plausible but indirect workaround', 'Use a plausible but indirect workaround', 'Add explicit human review or approval at the risky point', 'Add explicit human review or approval at the risky point'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-009', domain: 'agentic', answer: 1,
    ja: {
      scenario: '5つのsubagentが同じ顧客レコードを並列に更新する。住所更新、契約更新、問い合わせ履歴追記が同時に走り、最後に書いた結果だけが残る事故が起きた。',
      question: '並列処理の設計として最も適切なのはどれか。',
      options: ['last-write-winsにして速さを優先する', '共有レコードへの書き込みをキュー・ロック・単一所有者で調停する', '並列数を増やして処理時間を短くする', '全subagentに全レコードの管理者権限を与える'],
      explanations: ['もっともらしいが不十分。決め手は「共有リソースへの書き込みは調停が必要。並列の利点と整合性を両立する」であり、この選択肢は構造的な制御になっていない。', '正解。共有リソースへの書き込みは調停が必要。並列の利点と整合性を両立する。', 'もっともらしいが不十分。決め手は「共有リソースへの書き込みは調停が必要。並列の利点と整合性を両立する」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「共有リソースへの書き込みは調停が必要。並列の利点と整合性を両立する」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'Five subagents update the same customer record in parallel. Address updates, contract updates, and support-history appends run at once, causing only the last write to survive.',
      question: 'Which parallel-processing design is most appropriate?',
      options: ['Use a plausible but indirect workaround', 'Use bounded retries, coordination, quarantine, and notification controls', 'Use a plausible but indirect workaround', 'Restrict permissions to the minimum needed for the task'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-010', domain: 'agentic', answer: 2,
    ja: {
      scenario: '社内ヘルプデスクAIで、パスワードリセット、福利厚生案内、端末紛失報告を扱う。端末紛失はセキュリティ事故につながるが、福利厚生案内と同じ軽い応答フローに載っている。',
      question: 'リスク別フローとして最も適切なのはどれか。',
      options: ['すべて軽いFAQフローに統一してUXを揃える', 'すべてセキュリティ事故扱いにして人間承認にする', '低リスク案内は自動回答し、端末紛失は本人確認・チケット化・必要時の人間エスカレーションに分ける', 'プロンプトに「重要そうなら慎重に」とだけ書く'],
      explanations: ['もっともらしいが不十分。決め手は「操作のリスクで本人確認・エスカレーションの深さを変える」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「操作のリスクで本人確認・エスカレーションの深さを変える」であり、この選択肢は構造的な制御になっていない。', '正解。操作のリスクで本人確認・エスカレーションの深さを変える。', 'もっともらしいが不十分。決め手は「操作のリスクで本人確認・エスカレーションの深さを変える」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An internal helpdesk AI handles password resets, benefits questions, and lost-device reports. Lost devices may be security incidents but currently go through the same lightweight flow as benefits questions.',
      question: 'What is the most appropriate risk-based flow?',
      options: ['Fully automate the action for convenience', 'Add explicit human review or approval at the risky point', 'Add explicit human review or approval at the risky point', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-011', domain: 'agentic', answer: 0,
    ja: {
      scenario: 'エージェントが会議日程を調整する。空き時間検索は読み取りだが、予定作成は外部参加者に通知が飛ぶ。誤って仮説の候補時間を本予定として送ったことがある。',
      question: '予定作成ツールの扱いとして最も適切なのはどれか。',
      options: ['空き時間検索と予定作成を分け、作成前にユーザー確認を必須にする', '予定作成ツールを常にautoで渡し、モデルに判断させる', '通知を送った後に間違いなら削除する', 'プロンプトで「候補は送らない」と強調する'],
      explanations: ['正解。外部通知は副作用があるため、読み取りと書き込みを分けて確認を挟む。', 'もっともらしいが不十分。決め手は「外部通知は副作用があるため、読み取りと書き込みを分けて確認を挟む」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「外部通知は副作用があるため、読み取りと書き込みを分けて確認を挟む」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「外部通知は副作用があるため、読み取りと書き込みを分けて確認を挟む」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A scheduling agent coordinates meetings. Availability search is read-only, but event creation sends notifications to external attendees. It once sent a tentative candidate as an actual event.',
      question: 'How should the event-creation tool be handled?',
      options: ['Add explicit human review or approval at the risky point', 'Tune model parameters or switch models as the primary fix', 'Use bounded retries, coordination, quarantine, and notification controls', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-012', domain: 'agentic', answer: 3,
    ja: {
      scenario: '経営企画AIが毎朝KPI異常を検知し、原因候補を出す。最近、単発のデータ欠損を「売上急落」と誤判定して全社通知した。',
      question: '監視エージェントの品質設計として最も適切なのはどれか。',
      options: ['通知文を短くして誤解を減らす', '異常検知の閾値を常に厳しくする', '全社通知は誤報でも早い方がよい', 'データ鮮度・欠損チェックを先に行い、異常判定と通知を別段階にする'],
      explanations: ['もっともらしいが不十分。決め手は「異常判定前に入力品質を検証し、高影響通知は段階を分ける」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「異常判定前に入力品質を検証し、高影響通知は段階を分ける」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「異常判定前に入力品質を検証し、高影響通知は段階を分ける」であり、この選択肢は構造的な制御になっていない。', '正解。異常判定前に入力品質を検証し、高影響通知は段階を分ける。']
    },
    en: {
      scenario: 'A planning AI detects KPI anomalies every morning and proposes causes. Recently, it mistook a one-off data gap for a sales collapse and notified the entire company.',
      question: 'What is the best quality design for this monitoring agent?',
      options: ['Use bounded retries, coordination, quarantine, and notification controls', 'Use a plausible but indirect workaround', 'Use bounded retries, coordination, quarantine, and notification controls', 'Decompose the workflow and pass structured, validated intermediate results'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-013', domain: 'agentic', answer: 1,
    ja: {
      scenario: '営業AIがCRMを見て次アクションを提案する。提案だけのはずが、商談ステージ更新ツールも持っているため、確度が低い商談を勝手に「失注」に変更した。',
      question: '権限設計として最も適切なのはどれか。',
      options: ['提案AIにも更新権限を残し、誤操作時だけ戻す', '提案モードでは読み取り専用にし、更新は明示承認された別フローに分離する', '商談ステージ更新は低リスクなので全自動でよい', 'モデルを大きくすれば勝手な更新はなくなる'],
      explanations: ['もっともらしいが不十分。決め手は「提案と実行を分離し、提案段階では書き込み権限を持たせない」であり、この選択肢は構造的な制御になっていない。', '正解。提案と実行を分離し、提案段階では書き込み権限を持たせない。', 'もっともらしいが不十分。決め手は「提案と実行を分離し、提案段階では書き込み権限を持たせない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「提案と実行を分離し、提案段階では書き込み権限を持たせない」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A sales AI reviews CRM records and suggests next actions. It was supposed to only suggest, but because it also had a deal-stage update tool, it marked a low-probability deal as lost.',
      question: 'What permission design is most appropriate?',
      options: ['Restrict permissions to the minimum needed for the task', 'Add explicit human review or approval at the risky point', 'Fully automate the action for convenience', 'Tune model parameters or switch models as the primary fix'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-014', domain: 'agentic', answer: 2,
    ja: {
      scenario: '自治体の問い合わせAIが、住民票、税、福祉の質問を扱う。福祉相談では個人状況が複雑で、規定に当てはめきれないケースがある。AIは無理に結論を出してしまう。',
      question: '不確実性の扱いとして最も適切なのはどれか。',
      options: ['曖昧でも一番近い制度を断定する', '「規定にありません」とだけ返して終える', '不足情報を質問し、判断不能なら担当窓口へ引き継ぐ', '温度を上げて柔軟な回答を出す'],
      explanations: ['もっともらしいが不十分。決め手は「不確実なまま断定せず、追加確認または人間引き継ぎにする」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「不確実なまま断定せず、追加確認または人間引き継ぎにする」であり、この選択肢は構造的な制御になっていない。', '正解。不確実なまま断定せず、追加確認または人間引き継ぎにする。', 'もっともらしいが不十分。決め手は「不確実なまま断定せず、追加確認または人間引き継ぎにする」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A municipal support AI handles resident records, taxes, and welfare questions. Welfare cases can be complex and not fit rules cleanly. The AI tends to force a conclusion.',
      question: 'What is the best handling of uncertainty?',
      options: ['Use a plausible but indirect workaround', 'Use a plausible but indirect workaround', 'Add explicit human review or approval at the risky point', 'Use a plausible but indirect workaround'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-015', domain: 'agentic', answer: 0,
    ja: {
      scenario: 'RPA置き換えとして、AIが請求メールを読み、支払い遅延の督促文を作成する。下書き作成までは安定したが、送信まで自動化すると顧客関係への影響が大きい。',
      question: '自動化範囲として最も適切なのはどれか。',
      options: ['下書き生成と根拠提示は自動化し、送信は人間承認にする', '送信まで自動化し、クレームが来たら学習データにする', '送信権限を持たせたまま、プロンプトで丁寧さを担保する', '督促は全部人間に戻し、AIは使わない'],
      explanations: ['正解。高影響な外部送信は承認つき実行に留める。', 'もっともらしいが不十分。決め手は「高影響な外部送信は承認つき実行に留める」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「高影響な外部送信は承認つき実行に留める」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「高影響な外部送信は承認つき実行に留める」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An AI replacing RPA reads billing emails and drafts payment-reminder messages. Drafting is stable, but automating sending could significantly affect customer relationships.',
      question: 'What automation scope is most appropriate?',
      options: ['Add explicit human review or approval at the risky point', 'Fully automate the action for convenience', 'Rely mainly on stronger prompt wording or reminders', 'Add explicit human review or approval at the risky point'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-016', domain: 'agentic', answer: 3,
    ja: {
      scenario: 'データ移行AIが旧システムから新DBへ顧客データを移す。移行前検証、移行、移行後照合を1つの長いプロンプトで実行しており、失敗箇所が分からない。',
      question: '運用しやすい設計はどれか。',
      options: ['プロンプトをさらに詳しくして一度で成功させる', '失敗時は最初から全部やり直す', 'ログだけ増やして工程は1つのままにする', '工程をチェックポイント付きで分け、各段階の入出力と成功条件を記録する'],
      explanations: ['もっともらしいが不十分。決め手は「チェックポイントと成功条件で失敗箇所を切り分けられる」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「チェックポイントと成功条件で失敗箇所を切り分けられる」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「チェックポイントと成功条件で失敗箇所を切り分けられる」であり、この選択肢は構造的な制御になっていない。', '正解。チェックポイントと成功条件で失敗箇所を切り分けられる。']
    },
    en: {
      scenario: 'A data-migration AI moves customer data from an old system to a new DB. Pre-check, migration, and post-check run inside one long prompt, so failures are hard to locate.',
      question: 'Which design is most operable?',
      options: ['Rely mainly on stronger prompt wording or reminders', 'Use a plausible but indirect workaround', 'Rely on after-the-fact logs, review, rollback, or apology', 'Decompose the workflow and pass structured, validated intermediate results'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-017', domain: 'agentic', answer: 1,
    ja: {
      scenario: '社内AIがSlackの質問に答える。単純な用語質問にも毎回、検索、要約、critic、再生成の4段階を走らせ、応答が遅い。重要な規程質問ではその多段処理が役立つ。',
      question: 'コスト・レイテンシ設計として最も適切なのはどれか。',
      options: ['常に4段階にして品質を最大化する', '質問の複雑さ・リスクで軽量応答と多段処理を切り替える', '常に単一応答にして速度を優先する', 'criticだけ残し、検索は省く'],
      explanations: ['もっともらしいが不十分。決め手は「タスクの複雑さとリスクで自律度・工程を変える」であり、この選択肢は構造的な制御になっていない。', '正解。タスクの複雑さとリスクで自律度・工程を変える。', 'もっともらしいが不十分。決め手は「タスクの複雑さとリスクで自律度・工程を変える」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「タスクの複雑さとリスクで自律度・工程を変える」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An internal Slack AI answers questions. Even simple terminology questions run through search, summarization, critic, and regeneration, making it slow. For important policy questions, the multi-step flow helps.',
      question: 'What is the best cost/latency design?',
      options: ['Decompose the workflow and pass structured, validated intermediate results', 'Use a structural control that directly addresses the risky failure mode', 'Use a plausible but indirect workaround', 'Use a plausible but indirect workaround'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-018', domain: 'agentic', answer: 2,
    ja: {
      scenario: '医療機関の予約AIが、患者の症状を聞いて診療科候補を出す。緊急症状が含まれる場合でも通常予約フローに進めてしまうことがある。',
      question: '安全設計として最も適切なのはどれか。',
      options: ['通常予約フローを高速化して離脱を減らす', '緊急症状もモデル判断で通常予約か救急か決める', '緊急症状のルールベース検知を置き、該当時は救急案内・人間対応へ強制分岐する', 'プロンプトに「危険なら注意」と書く'],
      explanations: ['もっともらしいが不十分。決め手は「高リスク条件はモデルの自由判断だけでなく構造的ガードで分岐させる」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「高リスク条件はモデルの自由判断だけでなく構造的ガードで分岐させる」であり、この選択肢は構造的な制御になっていない。', '正解。高リスク条件はモデルの自由判断だけでなく構造的ガードで分岐させる。', 'もっともらしいが不十分。決め手は「高リスク条件はモデルの自由判断だけでなく構造的ガードで分岐させる」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A clinic booking AI suggests departments based on symptoms. Even when emergency symptoms appear, it sometimes proceeds with the normal booking flow.',
      question: 'What safety design is most appropriate?',
      options: ['Use a plausible but indirect workaround', 'Tune model parameters or switch models as the primary fix', 'Add explicit human review or approval at the risky point', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-019', domain: 'agentic', answer: 0,
    ja: {
      scenario: 'ソフトウェア修正エージェントが、失敗したテストを直すためにコードを変更する。ところが同じ箇所を何度も直しては別のテストを壊し、変更が膨らんでいく。',
      question: '自律修正ループの制御として最も適切なのはどれか。',
      options: ['試行回数と差分サイズに上限を置き、失敗時は原因・変更履歴を残して人間へ戻す', '成功するまで無制限に編集させる', 'テストを減らして通りやすくする', '大きなモデルに変えれば上限は不要'],
      explanations: ['正解。試行上限・差分上限・引き継ぎ情報が暴走防止になる。', 'もっともらしいが不十分。決め手は「試行上限・差分上限・引き継ぎ情報が暴走防止になる」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「試行上限・差分上限・引き継ぎ情報が暴走防止になる」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「試行上限・差分上限・引き継ぎ情報が暴走防止になる」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A code-fixing agent edits code to repair failing tests, but repeatedly changes the same area, breaking other tests and expanding the diff.',
      question: 'What is the best control for this autonomous repair loop?',
      options: ['Add explicit human review or approval at the risky point', 'Keep retrying or executing until it succeeds', 'Use a plausible but indirect workaround', 'Use bounded retries, coordination, quarantine, and notification controls'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-020', domain: 'agentic', answer: 3,
    ja: {
      scenario: '社内購買AIが備品購入申請を処理する。5万円以下は自動承認、5万円超は部長承認という規程があるが、AIは合計金額ではなく単価だけを見て承認した。',
      question: 'ルール適用の設計として最も適切なのはどれか。',
      options: ['プロンプトに「合計金額を見る」と追加する', '承認後に経理が見つけたら取り消す', '金額判定はAIの自然文推論に任せる', '承認条件を構造化ルールとして実装し、AIは必要項目抽出と説明生成に限定する'],
      explanations: ['もっともらしいが不十分。決め手は「決定的な業務ルールはコード/ルールで強制し、AIに自由判断させない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「決定的な業務ルールはコード/ルールで強制し、AIに自由判断させない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「決定的な業務ルールはコード/ルールで強制し、AIに自由判断させない」であり、この選択肢は構造的な制御になっていない。', '正解。決定的な業務ルールはコード/ルールで強制し、AIに自由判断させない。']
    },
    en: {
      scenario: 'A procurement AI processes office-supply purchase requests. Policy says purchases under 50,000 yen can be auto-approved; above that require department-head approval, but the AI checked unit price instead of total amount.',
      question: 'What is the most appropriate policy-application design?',
      options: ['Rely mainly on stronger prompt wording or reminders', 'Rely on after-the-fact logs, review, rollback, or apology', 'Use a plausible but indirect workaround', 'Add explicit human review or approval at the risky point'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-021', domain: 'agentic', answer: 1,
    ja: {
      scenario: '学習支援AIが誤答理由を分析して次の問題を出す。苦手分野の推定を会話履歴だけに頼っており、セッションをまたぐと弱点が消える。',
      question: '状態管理として最も適切なのはどれか。',
      options: ['毎回会話履歴を全部貼り直す', '誤答・分野・理由を永続ストアに構造化して保存し、次回の出題に使う', '弱点推定はモデルの記憶に任せる', 'セッションをまたいだ学習は諦める'],
      explanations: ['もっともらしいが不十分。決め手は「学習記録は会話履歴でなく構造化された永続状態として扱う」であり、この選択肢は構造的な制御になっていない。', '正解。学習記録は会話履歴でなく構造化された永続状態として扱う。', 'もっともらしいが不十分。決め手は「学習記録は会話履歴でなく構造化された永続状態として扱う」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「学習記録は会話履歴でなく構造化された永続状態として扱う」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A tutoring AI analyzes wrong answers and serves the next question. Weak-area detection relies only on chat history, so weaknesses disappear across sessions.',
      question: 'What is the best state-management design?',
      options: ['Use a plausible but indirect workaround', 'Decompose the workflow and pass structured, validated intermediate results', 'Tune model parameters or switch models as the primary fix', 'Use a plausible but indirect workaround'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-022', domain: 'agentic', answer: 2,
    ja: {
      scenario: '保険査定AIで、画像確認subagent、契約確認subagent、支払可否subagentがそれぞれ自由文で結果を返す。統合役が「損傷なし」と「軽微な損傷」を取り違えた。',
      question: 'subagent出力の設計として最も適切なのはどれか。',
      options: ['自由文のまま、統合役に注意深く読むよう指示する', '全subagentの出力を長く詳しくする', '各subagentの出力スキーマと許可ラベルを定め、統合前に検証する', '統合役をなくして最初のsubagentに全部任せる'],
      explanations: ['もっともらしいが不十分。決め手は「機械的に統合するには、出力スキーマとラベルを固定する必要がある」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「機械的に統合するには、出力スキーマとラベルを固定する必要がある」であり、この選択肢は構造的な制御になっていない。', '正解。機械的に統合するには、出力スキーマとラベルを固定する必要がある。', 'もっともらしいが不十分。決め手は「機械的に統合するには、出力スキーマとラベルを固定する必要がある」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'In an insurance-claim AI, image-review, contract-check, and payout-decision subagents each return free text. The integrator confused “no damage” with “minor damage.”',
      question: 'What is the most appropriate subagent-output design?',
      options: ['Rely mainly on stronger prompt wording or reminders', 'Decompose the workflow and pass structured, validated intermediate results', 'Decompose the workflow and pass structured, validated intermediate results', 'Decompose the workflow and pass structured, validated intermediate results'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-023', domain: 'agentic', answer: 0,
    ja: {
      scenario: '問い合わせ分類AIが、苦情、解約、要望を分類して担当キューに振る。誤分類時にどの入力で間違えたか記録がなく、改善できない。',
      question: '継続改善として最も適切なのはどれか。',
      options: ['入力、出力、正解ラベル、信頼度、後続修正を記録し、定期評価セットに反映する', '誤分類は一定数起きるものとして無視する', 'モデル更新を待つ', '担当者が気づいた時だけプロンプトを直す'],
      explanations: ['正解。観測できないものは改善できない。評価データ化することが決め手。', 'もっともらしいが不十分。決め手は「観測できないものは改善できない。評価データ化することが決め手」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「観測できないものは改善できない。評価データ化することが決め手」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「観測できないものは改善できない。評価データ化することが決め手」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A ticket-classification AI routes complaints, cancellations, and requests to queues. When it misclassifies, no record of the input and decision is kept, so improvement is impossible.',
      question: 'What is the most appropriate continuous-improvement design?',
      options: ['Define the output contract with schema, enums, and validation', 'Use a plausible but indirect workaround', 'Tune model parameters or switch models as the primary fix', 'Rely mainly on stronger prompt wording or reminders'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-024', domain: 'agentic', answer: 3,
    ja: {
      scenario: 'AI秘書がユーザーのメールを読み、返信案を作る。ユーザーが「必要なら送っておいて」と曖昧に言った場合でも、外部送信を実行してしまう。',
      question: '曖昧な委任への対応として最も適切なのはどれか。',
      options: ['曖昧でも利便性を優先して送る', '一切送信機能を持たせない', '送った後に送信済み通知を出す', '送信内容・宛先・タイミングの明示承認がない限り下書きに留める'],
      explanations: ['もっともらしいが不十分。決め手は「外部送信は明示承認が必要。曖昧さは確認で解消する」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「外部送信は明示承認が必要。曖昧さは確認で解消する」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「外部送信は明示承認が必要。曖昧さは確認で解消する」であり、この選択肢は構造的な制御になっていない。', '正解。外部送信は明示承認が必要。曖昧さは確認で解消する。']
    },
    en: {
      scenario: 'An AI assistant reads user emails and drafts replies. Even when the user vaguely says “send it if needed,” it sends external emails.',
      question: 'What is the best handling of ambiguous delegation?',
      options: ['Use a plausible but indirect workaround', 'Use a plausible but indirect workaround', 'Use bounded retries, coordination, quarantine, and notification controls', 'Add explicit human review or approval at the risky point'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-025', domain: 'agentic', answer: 1,
    ja: {
      scenario: '倉庫ロボットの指示AIが、棚卸し、移動、廃棄を扱う。廃棄指示は取り返しがつかないが、棚卸しと同じツール権限で即実行される。',
      question: 'ツール権限として最も適切なのはどれか。',
      options: ['すべて同じ実行ツールにまとめて単純化する', '棚卸しは読み取り、移動は制限付き実行、廃棄は承認必須の別ツールに分ける', '廃棄もAI判断なら問題ない', 'ログを残せば廃棄も即実行でよい'],
      explanations: ['もっともらしいが不十分。決め手は「操作の危険度でツールを分け、不可逆操作だけ承認必須にする」であり、この選択肢は構造的な制御になっていない。', '正解。操作の危険度でツールを分け、不可逆操作だけ承認必須にする。', 'もっともらしいが不十分。決め手は「操作の危険度でツールを分け、不可逆操作だけ承認必須にする」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「操作の危険度でツールを分け、不可逆操作だけ承認必須にする」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A warehouse robot-instruction AI handles inventory checks, moves, and disposal. Disposal is irreversible but is executed immediately with the same tool permissions as inventory checks.',
      question: 'What tool-permission design is best?',
      options: ['Fully automate the action for convenience', 'Add explicit human review or approval at the risky point', 'Use a plausible but indirect workaround', 'Rely on after-the-fact logs, review, rollback, or apology'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-026', domain: 'agentic', answer: 2,
    ja: {
      scenario: 'レポートAIが複数ソースから数値を拾う。A表は税込、B表は税抜、C表は通貨がUSDだが、統合時に単位が混ざってしまった。',
      question: '統合前の設計として最も適切なのはどれか。',
      options: ['統合役に「単位に注意」と書く', '全数値をそのまま1つのプロンプトに入れる', '抽出段階で単位・税込区分・通貨を構造化メタデータとして持たせ、統合前に正規化する', '出典を省略して回答を短くする'],
      explanations: ['もっともらしいが不十分。決め手は「数値統合では値だけでなく単位などのメタデータを構造化して渡す」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「数値統合では値だけでなく単位などのメタデータを構造化して渡す」であり、この選択肢は構造的な制御になっていない。', '正解。数値統合では値だけでなく単位などのメタデータを構造化して渡す。', 'もっともらしいが不十分。決め手は「数値統合では値だけでなく単位などのメタデータを構造化して渡す」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A reporting AI pulls numbers from multiple sources. Table A is tax-included, B is tax-excluded, and C is USD, but units get mixed during synthesis.',
      question: 'What is the most appropriate pre-synthesis design?',
      options: ['Rely mainly on stronger prompt wording or reminders', 'Rely mainly on stronger prompt wording or reminders', 'Decompose the workflow and pass structured, validated intermediate results', 'Enforce the rule with structured validation and explicit evidence fields'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-027', domain: 'agentic', answer: 0,
    ja: {
      scenario: '社内チャットAIが、機密プロジェクト名を含む会話にも参加する。通常FAQには便利だが、外部APIツールに会話全文を送る設計になっている。',
      question: '機密保護として最も適切なのはどれか。',
      options: ['外部ツールへ渡す前に必要最小限の入力に縮約・マスキングし、権限と送信先を制限する', 'プロンプトに「秘密を漏らさない」と書けば十分', '外部APIの方が高性能なら全文送信してよい', '後からログを消せばよい'],
      explanations: ['正解。外部送信前に入力最小化とマスキングを行う構造的対策が必要。', 'もっともらしいが不十分。決め手は「外部送信前に入力最小化とマスキングを行う構造的対策が必要」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「外部送信前に入力最小化とマスキングを行う構造的対策が必要」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「外部送信前に入力最小化とマスキングを行う構造的対策が必要」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An internal chat AI joins conversations that may include confidential project names. It is useful for FAQs, but its external API tool sends the full conversation text.',
      question: 'What is the most appropriate confidentiality control?',
      options: ['Restrict permissions to the minimum needed for the task', 'Rely mainly on stronger prompt wording or reminders', 'Use a plausible but indirect workaround', 'Rely on after-the-fact logs, review, rollback, or apology'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-028', domain: 'agentic', answer: 3,
    ja: {
      scenario: 'プロダクト分析AIがユーザー行動ログを見て施策案を出す。施策案の根拠として、実際には見ていない属性を「高い可能性」と書くことがある。',
      question: '根拠管理として最も適切なのはどれか。',
      options: ['根拠欄は自由に書かせる', 'もっと長い説明を書かせれば矛盾は減る', '推測を禁止するプロンプトだけで対応する', '観測事実と推測を別フィールドに分け、出典ID付きで根拠を検証する'],
      explanations: ['もっともらしいが不十分。決め手は「観測事実と推測を構造的に分け、出典で検証できるようにする」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「観測事実と推測を構造的に分け、出典で検証できるようにする」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「観測事実と推測を構造的に分け、出典で検証できるようにする」であり、この選択肢は構造的な制御になっていない。', '正解。観測事実と推測を構造的に分け、出典で検証できるようにする。']
    },
    en: {
      scenario: 'A product-analysis AI reads behavior logs and suggests growth experiments. In rationales, it sometimes cites attributes it never actually observed as “highly likely.”',
      question: 'What is the best evidence-management design?',
      options: ['Enforce the rule with structured validation and explicit evidence fields', 'Use a plausible but indirect workaround', 'Rely mainly on stronger prompt wording or reminders', 'Decompose the workflow and pass structured, validated intermediate results'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-029', domain: 'agentic', answer: 1,
    ja: {
      scenario: 'AIエージェントが複数ツールを使う途中で、あるツールが429を返す。現状はすぐ同じリクエストを繰り返し、レート制限を悪化させる。',
      question: '外部依存の扱いとして最も適切なのはどれか。',
      options: ['429は無視して続ける', 'Retry-Afterやバックオフを尊重し、上限超過時は縮退または後続処理を止める', '並列数を増やして空いているリクエストを探す', '429を成功扱いにして次へ進む'],
      explanations: ['もっともらしいが不十分。決め手は「レート制限はバックオフと上限、縮退で扱う」であり、この選択肢は構造的な制御になっていない。', '正解。レート制限はバックオフと上限、縮退で扱う。', 'もっともらしいが不十分。決め手は「レート制限はバックオフと上限、縮退で扱う」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「レート制限はバックオフと上限、縮退で扱う」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'During a multi-tool workflow, one tool returns HTTP 429. The agent immediately repeats the same request, worsening the rate limit.',
      question: 'What is the best handling of this external dependency?',
      options: ['Use a plausible but indirect workaround', 'Use bounded retries, coordination, quarantine, and notification controls', 'Use a plausible but indirect workaround', 'Use a plausible but indirect workaround'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-030', domain: 'agentic', answer: 2,
    ja: {
      scenario: 'コンテンツ審査AIが投稿を自動削除する。誤削除時の復元経路がなく、ユーザーからの異議申し立てにも根拠を示せない。',
      question: '本番運用として最も適切なのはどれか。',
      options: ['削除件数が多いほど安全なのでそのままにする', '誤削除は仕方ないので異議申し立てを受けない', '高信頼度のみ自動措置し、根拠・ログ・復元/異議申し立てフローを用意する', 'すべて人間審査に戻すしかない'],
      explanations: ['もっともらしいが不十分。決め手は「高影響措置は信頼度で段階化し、監査・復元・異議申し立てを設計する」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「高影響措置は信頼度で段階化し、監査・復元・異議申し立てを設計する」であり、この選択肢は構造的な制御になっていない。', '正解。高影響措置は信頼度で段階化し、監査・復元・異議申し立てを設計する。', 'もっともらしいが不十分。決め手は「高影響措置は信頼度で段階化し、監査・復元・異議申し立てを設計する」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A content-moderation AI automatically deletes posts. There is no restoration path for false positives, and appeals cannot be explained with evidence.',
      question: 'What is most appropriate for production operation?',
      options: ['Use a plausible but indirect workaround', 'Use a plausible but indirect workaround', 'Rely on after-the-fact logs, review, rollback, or apology', 'Add explicit human review or approval at the risky point'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-031', domain: 'agentic', answer: 0,
    ja: {
      scenario: '出張精算AIが領収書を読み、経費カテゴリを付ける。低額交通費は安定しているが、交際費・贈答品は規程が複雑で誤分類が多い。',
      question: '自律度の調整として最も適切なのはどれか。',
      options: ['安定した低リスクカテゴリは自動処理し、複雑・高リスクカテゴリはレビューに回す', '全カテゴリを同じ自動処理にする', '誤分類があるのでAI利用を完全にやめる', '高リスクカテゴリほど自動化して人の負担を減らす'],
      explanations: ['正解。一律ではなくカテゴリのリスクと安定度で自動化範囲を変える。', 'もっともらしいが不十分。決め手は「一律ではなくカテゴリのリスクと安定度で自動化範囲を変える」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「一律ではなくカテゴリのリスクと安定度で自動化範囲を変える」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「一律ではなくカテゴリのリスクと安定度で自動化範囲を変える」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A travel-expense AI reads receipts and assigns categories. Low-value transit expenses are stable, but entertainment and gifts have complex policies and frequent mistakes.',
      question: 'How should autonomy be adjusted?',
      options: ['Add explicit human review or approval at the risky point', 'Fully automate the action for convenience', 'Fully automate the action for convenience', 'Fully automate the action for convenience'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-032', domain: 'agentic', answer: 3,
    ja: {
      scenario: '研究支援AIが論文要約を作る。subagentごとに要約観点が違い、統合時に「効果あり」と「統計的有意差なし」が同じ結論として扱われた。',
      question: '統合品質を上げるにはどれが最も適切か。',
      options: ['統合役に医学知識をもっと与える', '要約を短くして読みやすくする', 'subagent数を増やす', '観点、ラベル、信頼度、p値など必須項目を共通スキーマにする'],
      explanations: ['もっともらしいが不十分。決め手は「比較・統合には共通スキーマと必須項目が必要」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「比較・統合には共通スキーマと必須項目が必要」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「比較・統合には共通スキーマと必須項目が必要」であり、この選択肢は構造的な制御になっていない。', '正解。比較・統合には共通スキーマと必須項目が必要。']
    },
    en: {
      scenario: 'A research assistant summarizes papers. Subagents use different summary criteria, and synthesis treated “effect observed” and “not statistically significant” as the same conclusion.',
      question: 'What best improves synthesis quality?',
      options: ['Decompose the workflow and pass structured, validated intermediate results', 'Use a plausible but indirect workaround', 'Decompose the workflow and pass structured, validated intermediate results', 'Decompose the workflow and pass structured, validated intermediate results'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-033', domain: 'agentic', answer: 1,
    ja: {
      scenario: '社内AIが「この操作は実行していい？」とユーザーに確認するが、確認文が曖昧で、ユーザーは何が起きるか分からずOKしてしまう。',
      question: 'HITL確認の設計として最も適切なのはどれか。',
      options: ['OK/キャンセルだけ出せば十分', '実行内容、対象、影響、取り消し可否を明示して承認を取る', '確認を省略してログに残す', '長い規約全文を表示して同意を取る'],
      explanations: ['もっともらしいが不十分。決め手は「人間承認は内容・対象・影響が分かって初めて意味がある」であり、この選択肢は構造的な制御になっていない。', '正解。人間承認は内容・対象・影響が分かって初めて意味がある。', 'もっともらしいが不十分。決め手は「人間承認は内容・対象・影響が分かって初めて意味がある」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「人間承認は内容・対象・影響が分かって初めて意味がある」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An internal AI asks “May I execute this?” but the confirmation text is vague, so users approve without understanding what will happen.',
      question: 'What is the best HITL confirmation design?',
      options: ['Use a plausible but indirect workaround', 'Add explicit human review or approval at the risky point', 'Rely on after-the-fact logs, review, rollback, or apology', 'Use a plausible but indirect workaround'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-034', domain: 'agentic', answer: 2,
    ja: {
      scenario: '分析AIが毎日自動で経営レポートを作る。ある日、入力CSVの列名変更で主要指標が空になったが、AIは前日値から推測して自然な文章を作った。',
      question: '入力検証として最も適切なのはどれか。',
      options: ['自然な文章なら問題ない', '列名変更はAIが推測で補うべき', '必須列・件数・欠損率を処理前に検証し、失敗時はレポート生成を止める', '前日値で埋めれば継続性が出る'],
      explanations: ['もっともらしいが不十分。決め手は「入力契約の破損を検知し、推測で埋めないことが重要」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「入力契約の破損を検知し、推測で埋めないことが重要」であり、この選択肢は構造的な制御になっていない。', '正解。入力契約の破損を検知し、推測で埋めないことが重要。', 'もっともらしいが不十分。決め手は「入力契約の破損を検知し、推測で埋めないことが重要」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An analysis AI generates an executive report daily. One day, a CSV column rename leaves key metrics empty, but the AI guesses from previous values and writes plausible prose.',
      question: 'What input validation is most appropriate?',
      options: ['Use a plausible but indirect workaround', 'Represent missing values explicitly instead of guessing', 'Enforce the rule with structured validation and explicit evidence fields', 'Use a plausible but indirect workaround'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-035', domain: 'agentic', answer: 0,
    ja: {
      scenario: 'サポートAIが問い合わせ履歴を読み、同じ顧客の過去対応を踏まえて返答する。別顧客の履歴が混入したときに、そのまま個人情報を含む回答を作った。',
      question: 'データ境界として最も適切なのはどれか。',
      options: ['顧客IDで取得範囲を機械的に制限し、回答前に参照元が同一顧客か検証する', 'プロンプトに「他人の情報は使わない」と書く', '混入してもモデルが判断できるので問題ない', '後で顧客から指摘されたら謝る'],
      explanations: ['正解。権限・検索範囲・参照元検証でデータ境界を強制する。', 'もっともらしいが不十分。決め手は「権限・検索範囲・参照元検証でデータ境界を強制する」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「権限・検索範囲・参照元検証でデータ境界を強制する」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「権限・検索範囲・参照元検証でデータ境界を強制する」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A support AI reads ticket history and responds using the same customer’s past cases. When another customer’s history is mixed in, it includes that personal data in the answer.',
      question: 'What is the best data-boundary design?',
      options: ['Enforce the rule with structured validation and explicit evidence fields', 'Rely mainly on stronger prompt wording or reminders', 'Tune model parameters or switch models as the primary fix', 'Rely on after-the-fact logs, review, rollback, or apology'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-036', domain: 'agentic', answer: 3,
    ja: {
      scenario: 'AIがNotionタスクを作るワークフローで、ユーザーの曖昧なメモから勝手に期限や担当者を決める。後で誤タスクが大量にできた。',
      question: '不明情報の扱いとして最も適切なのはどれか。',
      options: ['推測で埋めるほど便利なので続ける', '期限は常に今日にする', '担当者は常にユーザーにする', '必須情報が不足している場合は確認し、推測値なら明示して承認後に作成する'],
      explanations: ['もっともらしいが不十分。決め手は「不明な必須情報は確認する。推測で外部状態を書き換えない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「不明な必須情報は確認する。推測で外部状態を書き換えない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「不明な必須情報は確認する。推測で外部状態を書き換えない」であり、この選択肢は構造的な制御になっていない。', '正解。不明な必須情報は確認する。推測で外部状態を書き換えない。']
    },
    en: {
      scenario: 'In a workflow that creates Notion tasks, the AI guesses deadlines and assignees from vague user notes, creating many incorrect tasks.',
      question: 'What is the best handling of missing information?',
      options: ['Fully automate the action for convenience', 'Use a plausible but indirect workaround', 'Add explicit human review or approval at the risky point', 'Add explicit human review or approval at the risky point'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-037', domain: 'agentic', answer: 1,
    ja: {
      scenario: '音声入力から操作するAIで、「あれ送っといて」のような曖昧発話が多い。AIは直前の会話から推測してメール送信まで行う。',
      question: '音声入力の安全設計として最も適切なのはどれか。',
      options: ['推測精度を上げて確認を減らす', '曖昧な指示では宛先・本文・対象を復唱確認し、明確化してから実行する', '音声入力では送信承認を不要にする', '直前文脈があれば外部送信してよい'],
      explanations: ['もっともらしいが不十分。決め手は「曖昧な音声指示は確認なしに副作用を起こさない」であり、この選択肢は構造的な制御になっていない。', '正解。曖昧な音声指示は確認なしに副作用を起こさない。', 'もっともらしいが不十分。決め手は「曖昧な音声指示は確認なしに副作用を起こさない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「曖昧な音声指示は確認なしに副作用を起こさない」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A voice-operated AI often receives vague utterances like “send that.” It infers from prior conversation and sends emails.',
      question: 'What is the best safety design for voice input?',
      options: ['Add explicit human review or approval at the risky point', 'Rely mainly on stronger prompt wording or reminders', 'Add explicit human review or approval at the risky point', 'Use a plausible but indirect workaround'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-038', domain: 'agentic', answer: 2,
    ja: {
      scenario: '金融アドバイスAIが投資商品の説明をする。説明と同じ会話で購入申込ツールも使えるため、理解確認なしに申込まで進むことがある。',
      question: '高影響アクションへの設計として最も適切なのはどれか。',
      options: ['購入ツールを常に渡してスムーズにする', '説明と申込を同じ自由フローにする', '説明、適合性確認、明示承認、申込を段階化し、各段階の条件を満たすまで進ませない', '免責文を長くすれば申込は自動でよい'],
      explanations: ['もっともらしいが不十分。決め手は「高影響な申込は段階条件と明示承認で制御する」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「高影響な申込は段階条件と明示承認で制御する」であり、この選択肢は構造的な制御になっていない。', '正解。高影響な申込は段階条件と明示承認で制御する。', 'もっともらしいが不十分。決め手は「高影響な申込は段階条件と明示承認で制御する」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'A financial-advice AI explains investment products. In the same conversation it can also use a purchase-application tool, so it may proceed without confirming understanding.',
      question: 'What design is best for this high-impact action?',
      options: ['Fully automate the action for convenience', 'Use a plausible but indirect workaround', 'Add explicit human review or approval at the risky point', 'Fully automate the action for convenience'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-039', domain: 'agentic', answer: 0,
    ja: {
      scenario: 'AIエージェントが外部SaaSのAPIキーを使う。開発者は全権限キーを環境変数に入れ、エージェントの全ツールから参照できるようにした。',
      question: '秘密情報と権限の扱いとして最も適切なのはどれか。',
      options: ['用途別に限定権限キーを分け、必要なツールだけが必要なキーを参照できるようにする', '全権限キーの方が設定が簡単なので維持する', 'プロンプトでキーを漏らさないよう指示する', 'ログに出さなければ全ツールから参照できてよい'],
      explanations: ['正解。秘密情報も最小権限・最小到達範囲で分ける。', 'もっともらしいが不十分。決め手は「秘密情報も最小権限・最小到達範囲で分ける」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「秘密情報も最小権限・最小到達範囲で分ける」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「秘密情報も最小権限・最小到達範囲で分ける」であり、この選択肢は構造的な制御になっていない。']
    },
    en: {
      scenario: 'An AI agent uses an external SaaS API key. The developer put a full-permission key in an environment variable accessible to all tools.',
      question: 'What is the best handling of secrets and permissions?',
      options: ['Restrict permissions to the minimum needed for the task', 'Restrict permissions to the minimum needed for the task', 'Rely mainly on stronger prompt wording or reminders', 'Rely on after-the-fact logs, review, rollback, or apology'],
      explanations: ['Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  },
  {
    id: 'ag2-040', domain: 'agentic', answer: 3,
    ja: {
      scenario: 'プロダクトチームがエージェント改善を進めたいが、成功率、介入率、誤実行率、レイテンシのどれも測っていない。体感で「賢くなった」と判断している。',
      question: '評価設計として最も適切なのはどれか。',
      options: ['ユーザーの印象だけで十分', 'モデルが新しければ改善とみなす', '失敗事例だけを見る', '主要指標と評価セットを定義し、変更前後で定期的に比較する'],
      explanations: ['もっともらしいが不十分。決め手は「改善は指標と評価セットで測る。体感だけでは本番品質を判断できない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「改善は指標と評価セットで測る。体感だけでは本番品質を判断できない」であり、この選択肢は構造的な制御になっていない。', 'もっともらしいが不十分。決め手は「改善は指標と評価セットで測る。体感だけでは本番品質を判断できない」であり、この選択肢は構造的な制御になっていない。', '正解。改善は指標と評価セットで測る。体感だけでは本番品質を判断できない。']
    },
    en: {
      scenario: 'A product team wants to improve its agent, but measures none of success rate, intervention rate, wrong-action rate, or latency. It judges improvement by feel.',
      question: 'What evaluation design is best?',
      options: ['Use a plausible but indirect workaround', 'Tune model parameters or switch models as the primary fix', 'Use representative examples and versioned prompt assets', 'Rely on after-the-fact logs, review, rollback, or apology'],
      explanations: ['Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Plausible, but not sufficient. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.', 'Correct. The exam point is to control autonomy with structure: permissions, approval, validation, bounded loops, or explicit handoff.']
    }
  }
);
