// CCA-F domain: context (Context Management & Reliability) — 23 questions
window.QUESTIONS.push(
  {
    id: 'ctx-001', domain: 'context', answer: 2,
    ja: {
      scenario: '長時間のエージェント作業でやり取りが膨らみ、コンテキスト上限に近づくと初期の重要な制約を忘れて精度が落ちる。',
      question: '対策として最も適切なのは？',
      options: ['上限が来たら黙って古い履歴を捨て続ける','すべての履歴を毎回全文持ち続ける','重要な制約・決定を要約して保持し、不要な詳細は圧縮（compaction/要約）して文脈を維持する','コンテキストの話は無視して、モデルを信じて続行する'],
      explanations: ['無言で古い履歴を捨てると重要な制約も失う。何を残すかの設計が要る。','全文保持は上限に当たり破綻する。長期タスクほど要約・取捨選択が要る。','重要事項を要約保持し詳細を圧縮＝長期タスクで文脈と精度を保つ正解パターン。','無視して続行は信頼性設計の放棄。劣化を前提に手当てするのが正しい。']
    },
    en: {
      scenario: 'In a long agent session the conversation grows, and near the context limit the agent forgets early critical constraints and degrades.',
      question: 'What is the most appropriate mitigation?',
      options: ['Silently keep dropping old history when the limit is hit','Always keep the entire history in full','Summarize and retain key constraints/decisions and compact (summarize) unneeded detail to preserve context','Ignore the context issue and trust the model to continue'],
      explanations: ['Silently dropping old history loses critical constraints too; you must design what to keep.','Keeping everything in full hits the limit and breaks; long tasks need summarization and selection.','Retaining key items as summaries and compacting detail is the correct pattern to keep context and accuracy over long tasks.','Ignoring it abandons reliability design; the right move is to anticipate degradation and handle it.']
    }
  },
  {
    id: 'ctx-002', domain: 'context', answer: 0,
    ja: {
      scenario: '外部API依存のエージェントが、APIの一時的な障害でときどき失敗する。本番では止まらず、かつ誤った結果も出したくない。',
      question: '最も適切な設計は？',
      options: ['指数バックオフ付きの有限リトライ＋失敗時のフォールバック（縮退・人間通知）を用意し、不確実な結果はそのまま採用しない','失敗したら即座にダミーの結果を返して処理を続ける','エラーを無視して次の処理に進む','何度でも即時リトライし続ける'],
      explanations: ['有限リトライ＋バックオフ＋フォールバック＋不確実結果を採用しない＝信頼性設計の王道。止まらず、かつ誤りも出さない。','ダミー結果の続行は誤った出力をそのまま流す危険があり不可。','エラー無視は障害を隠して下流に伝播させる。','即時無限リトライは相手APIへの負荷増＆暴走の元。バックオフと上限が要る。']
    },
    en: {
      scenario: 'An agent depending on an external API sometimes fails due to transient outages. In production it must not stall, and must not emit wrong results.',
      question: 'What is the most appropriate design?',
      options: ['Finite retries with exponential backoff plus a fallback (degrade/notify a human) on failure, and never accept uncertain results as-is','On failure, immediately return a dummy result and continue','Ignore the error and move to the next step','Keep retrying immediately, forever'],
      explanations: ['Finite retries + backoff + fallback + not accepting uncertain results is the canonical reliability design: no stall, no wrong output.','Continuing with a dummy result risks propagating wrong output; not acceptable.','Ignoring errors hides failures and propagates them downstream.','Immediate infinite retries hammer the API and invite runaway behavior; backoff and limits are required.']
    }
  },
  {
    id: 'ctx-003', domain: 'context', answer: 3,
    ja: {
      scenario: '大量のドキュメント群を参照しながら回答するエージェントを設計している。全文を毎回プロンプトに入れると上限を超えてしまう。',
      question: '長期的に壊れにくい設計は？',
      options: ['上限ギリギリまで全文を詰め込み、入りきらない分は黙って切り捨てる','一番新しいドキュメントだけ常に入れる','ドキュメントを使わずモデルの記憶だけで答える','質問ごとに関連する部分だけを検索（retrieval）して必要分だけ文脈に入れる'],
      explanations: ['全文詰め込み＋無言の切り捨ては、何が落ちたか不明で再現性も精度も損なう。','新しさだけで選ぶと、その質問に本当に必要な情報を取りこぼす。','参照すべき資料があるのに記憶任せは、誤りや古い情報を生む。','質問に応じて必要分だけ取得（retrieval）するのが、上限と精度を両立する正解。']
    },
    en: {
      scenario: 'You design an agent that answers using a large document set. Putting every full document in the prompt each time exceeds the limit.',
      question: 'Which design holds up best long-term?',
      options: ['Stuff full documents up to the limit and silently truncate the overflow','Always include only the newest document','Skip the documents and answer from the model\'s memory alone','Retrieve only the relevant parts per question and put just what is needed into context'],
      explanations: ['Stuffing plus silent truncation makes it unclear what was dropped, hurting accuracy and reproducibility.','Choosing by recency alone misses the information actually needed for that question.','Relying on memory when source docs exist produces wrong or stale answers.','Retrieving only what each question needs (retrieval) balances the limit and accuracy correctly.']
    }
  },
  {
    id: 'ctx-004', domain: 'context', answer: 1,
    ja: {
      scenario: '複数ステップにわたる長いタスクを進めるうち、序盤に確定した前提（出力フォーマットや禁止事項）が後半で守られなくなってきた。',
      question: '最も適切な対処は？',
      options: ['後半は前提が変わったものとみなし、自由に出力させる','確定済みの前提・制約を要約してプロンプト先頭などに常時保持し、各ステップで参照させる','前提を守れないのはモデルの限界なので諦める','序盤のやり取りを全文そのまま末尾まで持ち続ける'],
      explanations: ['前提が変わっていないのに自由出力させると、要件違反が積み上がる。','確定済みの制約を要約して常駐させ毎ステップ参照＝長期タスクで前提を守らせる正解。','プロンプト設計で対処可能。諦めるのは設計放棄。','全文保持は上限に当たり、結局後半で文脈が押し出される。要約常駐が要る。']
    },
    en: {
      scenario: 'During a long multi-step task, the constraints fixed early (output format, prohibitions) start being violated later on.',
      question: 'What is the best response?',
      options: ['Treat the constraints as changed later and let it output freely','Summarize the fixed constraints and keep them persistently (e.g., at the prompt top) so every step references them','Accept that constraints can\'t hold; it\'s a model limitation','Keep the entire early transcript verbatim through to the end'],
      explanations: ['Letting it output freely when nothing changed piles up requirement violations.','Keeping the fixed constraints as a persistent summary referenced each step is the correct way to hold requirements over long tasks.','This is solvable by prompt design; giving up abandons it.','Keeping everything verbatim hits the limit and the context gets pushed out later anyway; a persistent summary is needed.']
    }
  },
  {
    id: 'ctx-005', domain: 'context', answer: 2,
    ja: {
      scenario: 'エージェントがツールを呼び出したが、レスポンスが「不確実・低信頼」と判定された。次の処理はこの結果に依存する。',
      question: '最も適切な振る舞いは？',
      options: ['不確実でも一番それらしい値を確定として次へ渡す','とりあえず空の結果を確定値として渡す','不確実さを明示し、再取得・検証・人間確認などで確信度を上げてから次へ進む（不確実なまま確定しない）','結果を捨てて何事もなかったように続行する'],
      explanations: ['不確実な値を確定扱いすると、誤りが下流に伝播し検知も困難になる。','空を確定値にするのも誤った前提を下流へ流すこと。','不確実さを明示し検証してから進む＝誤り伝播を防ぐ信頼性の正解。','黙って捨てて続行は、欠損を隠して後続を壊す。']
    },
    en: {
      scenario: 'An agent called a tool, but the response is judged uncertain/low-confidence. The next step depends on this result.',
      question: 'What is the best behavior?',
      options: ['Pass the most plausible value forward as final even if uncertain','Pass an empty result forward as the final value','Surface the uncertainty and raise confidence (re-fetch, verify, human check) before proceeding; do not finalize while uncertain','Discard the result and continue as if nothing happened'],
      explanations: ['Treating an uncertain value as final propagates errors downstream and makes them hard to detect.','Making "empty" the final value also pushes a wrong assumption downstream.','Surfacing uncertainty and verifying before proceeding is the reliable way to prevent error propagation.','Silently discarding and continuing hides the gap and breaks later steps.']
    }
  },
  {
    id: 'ctx-006', domain: 'context', answer: 0,
    ja: {
      scenario: '夜間に自動で長時間走るバッチエージェントを運用する。失敗しても誰も画面を見ておらず、後から原因を追えるようにしたい。',
      question: '最も重要な設計要素は？',
      options: ['各ステップの入出力・判断・失敗を構造化ログに残し、失敗を検知・通知できる観測性を組み込む','処理が速くなるようログ出力を一切やめる','失敗したら全ログを消してリトライする','成功したときだけログを残す'],
      explanations: ['構造化ログ＋失敗検知・通知の観測性は、無人運用で原因追跡と早期検知を可能にする正解。','ログ全廃は障害時に何も追えなくなる。観測性の放棄。','失敗時にログ消去は原因究明を不可能にする最悪手。','成功だけ記録では、肝心の失敗時に手掛かりが残らない。']
    },
    en: {
      scenario: 'You run a long-running batch agent overnight. No one watches the screen on failure, but you must be able to trace causes afterward.',
      question: 'What is the most important design element?',
      options: ['Emit structured logs of each step\'s inputs/outputs/decisions/failures and build observability that detects and notifies on failure','Stop all logging so it runs faster','Delete all logs and retry on failure','Log only when steps succeed'],
      explanations: ['Structured logs plus failure detection/notification (observability) is the correct way to trace causes and catch issues early in unattended runs.','Removing all logging leaves nothing to trace on failure; it abandons observability.','Deleting logs on failure makes root-cause analysis impossible — the worst move.','Logging only successes leaves no clues exactly when failures happen.']
    }
  },
  {
    id: 'ctx-007', domain: 'context', answer: 3,
    ja: {
      scenario: '会話のコンテキストがリセットされても継続できるエージェントを作りたい。中断後に別セッションで再開する想定。',
      question: '最も適切な設計は？',
      options: ['すべての状態をモデルのコンテキストだけに置き、リセットされたら最初からやり直す','リセットは起きない前提で永続化を省く','直近の数ターンだけメモリに残す','タスクの進捗・確定事項・次アクションを外部ストア等に永続化し、再開時にそれを読み込んで文脈を復元する'],
      explanations: ['コンテキスト依存のみだとリセットで全消失、毎回やり直しになる。','リセットは現実に起きる。前提から外すのは脆い設計。','直近数ターンだけでは、序盤に確定した重要事項が復元できない。','進捗・確定事項・次アクションを永続化し再開時に復元＝リセットをまたぐ正解設計。']
    },
    en: {
      scenario: 'You want an agent that can continue even after the conversation context is reset, resuming in a separate session after an interruption.',
      question: 'What is the best design?',
      options: ['Keep all state only in the model context and start over from scratch when reset','Assume resets never happen and skip persistence','Keep only the last few turns in memory','Persist task progress, fixed decisions, and next actions to an external store and reload them on resume to restore context'],
      explanations: ['Context-only state is wiped on reset, forcing a restart every time.','Resets do happen in reality; designing them out is fragile.','Only the last few turns can\'t restore the important items fixed early on.','Persisting progress/decisions/next-actions and restoring them on resume is the correct design that survives resets.']
    }
  },
  {
    id: 'ctx-008', domain: 'context', answer: 1,
    ja: {
      scenario: '同じリクエストが障害復旧後に再送される可能性があるワークフロー。副作用（メール送信・課金など）を含む。',
      question: '二重実行による被害を防ぐ最も適切な設計は？',
      options: ['再送されても気にせず毎回実行する','冪等性を確保する（同一リクエストはID等で識別し、二度目以降は副作用を再実行しない）','副作用のある処理を全部やめる','エラーが出たら全部やり直して上書きする'],
      explanations: ['再送のたびに実行すると、二重課金・重複送信などの実害が出る。','冪等キー等で同一リクエストを識別し二度目以降の副作用を抑止＝再送に強い正解。','副作用を全廃すると機能自体が成立しない。極端で非現実的。','全部やり直し上書きは、副作用のある処理では二重実行を生む。']
    },
    en: {
      scenario: 'A workflow where the same request may be resent after a recovery, including side effects (sending email, charging).',
      question: 'What design best prevents harm from double execution?',
      options: ['Just execute every time, regardless of resends','Ensure idempotency (identify the same request by an ID and do not re-apply side effects on repeats)','Remove all operations that have side effects','On any error, redo everything and overwrite'],
      explanations: ['Executing on every resend causes real harm like double charges and duplicate sends.','Identifying the same request by an idempotency key and suppressing repeated side effects is the resend-safe correct answer.','Removing all side effects makes the feature itself non-functional — extreme and unrealistic.','Redoing and overwriting everything still re-runs side-effecting operations on resends.']
    }
  },
  {
    id: 'ctx-009', domain: 'context', answer: 2,
    ja: {
      scenario: '上流のサービスが一時的に応答しない。エージェントの一部機能はそれに依存するが、コア機能は依存しない。',
      question: 'グレースフルデグレード（縮退運転）として正しいのは？',
      options: ['依存部分が落ちたら全機能を停止する','依存先が復旧するまで無言で同じ呼び出しを繰り返す','依存する部分だけ機能を縮退（保留・代替表示・後でリトライ）し、コア機能は動かし続ける','依存部分のエラーを握りつぶし、成功したかのように見せる'],
      explanations: ['一部依存の障害で全停止は過剰。縮退で守れる範囲を守るべき。','無言の連続呼び出しはバックオフもなく相手を圧迫する。','依存部分だけ縮退しコアは継続＝グレースフルデグレードの正解。','握りつぶして成功を装うのは、誤情報を出す危険な隠蔽。']
    },
    en: {
      scenario: 'An upstream service is temporarily unresponsive. Some agent features depend on it, but the core feature does not.',
      question: 'What is correct graceful degradation?',
      options: ['Stop all features when the dependent part fails','Silently repeat the same call until the dependency recovers','Degrade only the dependent feature (defer, show an alternative, retry later) while keeping the core running','Swallow the dependency error and present it as if it succeeded'],
      explanations: ['Full stop for a partial-dependency outage is excessive; degrade to protect what you can.','Silent repeated calls without backoff overload the dependency.','Degrading only the dependent part while keeping the core running is the correct graceful-degradation answer.','Swallowing and faking success is a dangerous cover-up that emits false information.']
    }
  },
  {
    id: 'ctx-010', domain: 'context', answer: 0,
    ja: {
      scenario: 'マルチステップのエージェントで、あるステップの結果が後続の前提になる。途中のステップで明らかにおかしい（矛盾した）出力が出た。',
      question: '下流に誤りを伝播させない正しい対処は？',
      options: ['矛盾を検知した時点で止め、検証・修正・人間確認をしてから後続に進む','おかしくても後続が直してくれると期待してそのまま渡す','矛盾を無視して全ステップを最後まで走らせる','矛盾が出たステップだけ結果を空にして続行する'],
      explanations: ['矛盾検知時に止めて検証してから進む＝誤り伝播を断ち切る正解。','後続任せは、誤った前提が全体を汚染するリスクが高い。','無視して走らせると、誤りが最終出力まで伝播する。','空にして続行も、欠損という別の誤りを下流に流す。']
    },
    en: {
      scenario: 'In a multi-step agent, one step\'s result becomes a premise for later steps. A mid-pipeline step produces clearly wrong (contradictory) output.',
      question: 'What is the correct way to avoid propagating the error downstream?',
      options: ['Stop on detecting the contradiction, then verify/correct/human-check before continuing','Pass it along, hoping later steps will fix it','Ignore the contradiction and run all steps to the end','Just empty out the result of that step and continue'],
      explanations: ['Stopping on detection and verifying before continuing is the correct way to break error propagation.','Relying on later steps risks a wrong premise contaminating the whole run.','Ignoring it and running on propagates the error to the final output.','Emptying and continuing pushes a different error (a gap) downstream.']
    }
  },
  {
    id: 'ctx-011', domain: 'context', answer: 3,
    ja: {
      scenario: '長い対話の途中で、コンテキストを圧縮（要約）して容量を空ける運用にした。何を要約に残すかが品質を左右する。',
      question: '圧縮（compaction）で優先して残すべきものは？',
      options: ['一番新しいメッセージの言い回しを一字一句','雑談や挨拶などの非本質的なやり取り','すでに無効になった古い指示','確定した決定・守るべき制約・未完了の課題・次アクションなどタスク継続に不可欠な情報'],
      explanations: ['新しさや言い回しの保存より、意味的に重要な情報を残すべき。','非本質的なやり取りは圧縮で落として良い対象。','無効になった指示は残すとむしろ誤動作の原因。','決定・制約・未完了課題・次アクションを残す＝圧縮後もタスクを正しく継続できる正解。']
    },
    en: {
      scenario: 'Mid-conversation you compact (summarize) context to free capacity. What you keep in the summary drives quality.',
      question: 'What should compaction prioritize keeping?',
      options: ['The exact wording of the newest message, verbatim','Small talk and greetings','Old instructions that are now void','Fixed decisions, constraints to uphold, open problems, and next actions — what is essential to continue the task'],
      explanations: ['Preserving recency or wording matters less than keeping semantically important info.','Non-essential exchanges are exactly what compaction should drop.','Keeping void instructions causes misbehavior.','Keeping decisions, constraints, open problems, and next actions is the correct answer that lets the task continue correctly after compaction.']
    }
  },
  {
    id: 'ctx-012', domain: 'context', answer: 1,
    ja: {
      scenario: 'リトライ戦略を設計している。失敗が一時的なものか恒久的なものか区別したい。',
      question: '最も健全なリトライ設計は？',
      options: ['すべての失敗を同じ回数だけ無条件にリトライする','一時的（過負荷・タイムアウト等）はバックオフ付きで有限回リトライし、恒久的（認証不正・存在しない等）は即座に失敗として扱う','どんな失敗でもリトライしない','リトライ回数を無制限にして必ず成功させる'],
      explanations: ['一律リトライは、回復しない恒久的失敗にも無駄な試行を重ねる。','一時的のみ有限リトライ＋バックオフ、恒久的は即失敗＝失敗種別に応じた正解。','一切リトライしないと、回復可能な一時障害まで取りこぼす。','無制限リトライは恒久的失敗で永久ループになる。上限が要る。']
    },
    en: {
      scenario: 'You design a retry strategy and want to distinguish transient from permanent failures.',
      question: 'What is the soundest retry design?',
      options: ['Retry every failure the same fixed number of times, unconditionally','Retry transient failures (overload, timeout) a finite number of times with backoff, and treat permanent ones (bad auth, not found) as immediate failures','Never retry any failure','Retry unlimited times so it always eventually succeeds'],
      explanations: ['Uniform retries waste attempts on permanent failures that won\'t recover.','Finite retries with backoff for transient only, immediate fail for permanent, is the correct failure-type-aware design.','Never retrying drops recoverable transient outages.','Unlimited retries loop forever on permanent failures; a cap is required.']
    }
  },
  {
    id: 'ctx-013', domain: 'context', answer: 2,
    ja: {
      scenario: '本番のエージェントが、ある日から徐々に出力品質が落ちている。原因がコンテキスト肥大なのか上流データ変化なのか分からない。',
      question: '原因特定を可能にする運用上の備えは？',
      options: ['毎回プロンプトを作り直し、過去の挙動は記録しない','問題が起きてから初めてログを取り始める','入力・出力・トークン使用量・各ステップの所要時間などを継続的に計測・記録（monitoring）し、変化を追えるようにしておく','品質が落ちたらモデルを変えるだけにする'],
      explanations: ['記録しなければ比較できず、原因の切り分けができない。','後追いでは劣化が始まった時点のデータがなく、原因に辿り着けない。','入出力・トークン・所要時間を継続計測し変化を追う＝劣化の原因特定を可能にする正解。','記録なしのモデル変更は、当て推量で根本原因に届かない。']
    },
    en: {
      scenario: 'A production agent\'s output quality gradually drops from some day on. You can\'t tell if it\'s context bloat or upstream data change.',
      question: 'What operational preparation enables root-cause identification?',
      options: ['Rebuild the prompt each time and keep no record of past behavior','Start collecting logs only after a problem appears','Continuously measure and record inputs, outputs, token usage, and per-step latency (monitoring) so changes can be traced','Just swap the model whenever quality drops'],
      explanations: ['Without records you can\'t compare and can\'t isolate causes.','After-the-fact logging lacks data from when degradation began, so the cause stays out of reach.','Continuously measuring I/O, tokens, and latency to trace changes is the correct way to enable root-cause identification.','Swapping models without records is guesswork that won\'t reach the root cause.']
    }
  },
  {
    id: 'ctx-014', domain: 'context', answer: 0,
    ja: {
      scenario: 'ユーザーが序盤に「絶対にこの口座番号は変更しないで」と指示したが、対話が長くなりその制約がコンテキストから押し出されつつある。',
      question: '安全側で正しい設計は？',
      options: ['「変更不可」のような致命的制約は要約・固定領域に明示的に残し、コンテキスト圧縮でも落とさない','新しい話題が来たら古い制約は不要とみなし削る','致命的制約も含め一律に古い順で削除する','制約はモデルが覚えているはずなので何もしない'],
      explanations: ['致命的制約を固定領域に明示保持し圧縮でも落とさない＝安全側の正解。','新トピックで安全制約を削るのは、最も危険な誤り。','一律古い順削除は、最重要の安全制約から先に消える恐れがある。','覚えている前提は危険。押し出されれば守られなくなる。']
    },
    en: {
      scenario: 'The user said early "never change this account number," but as the conversation grows that constraint is being pushed out of context.',
      question: 'What is the safe, correct design?',
      options: ['Explicitly keep critical "must-not" constraints in a summary/pinned region and never drop them during compaction','Once a new topic arrives, treat old constraints as unneeded and trim them','Delete uniformly oldest-first, including critical constraints','Do nothing, since the model should remember the constraint'],
      explanations: ['Pinning critical constraints and never dropping them in compaction is the safe correct answer.','Trimming safety constraints on a new topic is the most dangerous mistake.','Uniform oldest-first deletion risks erasing the most important safety constraint first.','Assuming the model remembers is dangerous; once pushed out, it won\'t be honored.']
    }
  },
  {
    id: 'ctx-015', domain: 'context', answer: 1,
    ja: {
      scenario: 'エージェントが外部検索ツールを呼んだが、タイムアウトした。後続は検索結果を前提に進む設計になっている。',
      question: '最も適切なエラーハンドリングは？',
      options: ['検索が空だったとみなし、結果ゼロ件として確定して進む','タイムアウトを明示的に捕捉し、有限回バックオフ再試行→なお失敗なら縮退（部分回答＋未取得の明示）か人間通知に切り替える','例外を握りつぶして、それらしい検索結果を創作して埋める','タイムアウトのたびに即座に同じ呼び出しを連打する'],
      explanations: ['タイムアウトをゼロ件確定にすると、未取得を「結果なし」と取り違え誤った前提になる。','捕捉→有限バックオフ再試行→縮退/人間通知＝障害を正しく扱う正解。','検索結果の捏造は重大な誤情報。絶対に不可。','即時連打はバックオフなしで相手を圧迫し回復も妨げる。']
    },
    en: {
      scenario: 'An agent called an external search tool but it timed out. Later steps are designed to assume the search result.',
      question: 'What is the best error handling?',
      options: ['Assume the search was empty and proceed with zero results as final','Explicitly catch the timeout, retry a finite number of times with backoff, then degrade (partial answer + flag the gap) or notify a human','Swallow the exception and fabricate plausible search results to fill in','On each timeout, immediately hammer the same call repeatedly'],
      explanations: ['Treating a timeout as "zero results final" mistakes "not fetched" for "nothing found," forming a wrong premise.','Catch -> finite backoff retry -> degrade/human-notify is the correct way to handle the failure.','Fabricating search results is serious misinformation and never acceptable.','Immediate hammering without backoff overloads the dependency and hinders recovery.']
    }
  },
  {
    id: 'ctx-016', domain: 'context', answer: 3,
    ja: {
      scenario: 'チャットボットの会話が長く続くと応答が遅く・不正確になる。コンテキスト全文を毎回送っているのが原因と分かった。',
      question: '持続可能な改善策は？',
      options: ['会話が長くなったらユーザーに毎回最初からやり直させる','とにかく最新10メッセージだけを固定で送る（重要度は見ない）','コンテキストを一切送らず単発の質問として扱う','過去を要約して圧縮しつつ、重要な確定事項は保持し、必要に応じて関連部分だけ取得する設計にする'],
      explanations: ['毎回やり直しは体験を壊し、確定事項も失う。','固定の直近N件だけでは、古いが重要な確定事項を取りこぼす。','コンテキスト無送信は文脈依存の対話を壊す。','要約圧縮＋重要事項保持＋必要分のみ取得＝速度と精度を両立する持続可能な正解。']
    },
    en: {
      scenario: 'A chatbot gets slow and inaccurate as conversations get long. The cause is sending the full context every time.',
      question: 'What is a sustainable improvement?',
      options: ['Make the user start over from scratch whenever the conversation gets long','Always send just the latest 10 messages, fixed, ignoring importance','Send no context and treat each as a standalone question','Summarize/compact the past while retaining key fixed items, and retrieve only the relevant parts as needed'],
      explanations: ['Forcing a restart breaks the experience and loses fixed items.','A fixed last-N window drops old-but-important fixed items.','Sending no context breaks context-dependent dialogue.','Summarize/compact + retain key items + retrieve only what is needed is the sustainable answer balancing speed and accuracy.']
    }
  },
  {
    id: 'ctx-017', domain: 'context', answer: 0,
    ja: {
      scenario: '複数のツール呼び出しを連鎖させるエージェント。あるツールが「成功」を返したが、出力スキーマが期待と違う（必須フィールド欠落）。',
      question: '誤りを下流に流さない正しい対応は？',
      options: ['出力を検証（バリデーション）し、スキーマ不一致なら失敗として扱って再取得・修正・人間確認に回す','「成功」と書いてあるので中身は見ずにそのまま次へ渡す','欠落フィールドを適当な既定値で埋めて続行する','スキーマ検証はコストなので省略する'],
      explanations: ['成功フラグと中身の妥当性は別物。検証して不一致なら失敗扱い＝誤り伝播を防ぐ正解。','成功表示を鵜呑みは、壊れた出力をそのまま下流へ流す。','適当な既定値で埋めるのは、誤った値を本物として伝播させる。','検証省略は、まさに今回のような不整合を見逃す原因。']
    },
    en: {
      scenario: 'An agent chains multiple tool calls. One tool returns "success," but the output schema differs from expected (a required field is missing).',
      question: 'What is the right handling to avoid passing the error downstream?',
      options: ['Validate the output; on schema mismatch treat it as a failure and route to re-fetch/correct/human-check','It says "success," so pass it along without inspecting the contents','Fill the missing field with an arbitrary default and continue','Skip schema validation because it costs time'],
      explanations: ['A success flag and content validity are different; validating and treating a mismatch as failure is the correct way to prevent propagation.','Trusting the success label pushes broken output downstream.','Filling with an arbitrary default propagates a wrong value as if real.','Skipping validation is exactly what lets mismatches like this slip through.']
    }
  },
  {
    id: 'ctx-018', domain: 'context', answer: 2,
    ja: {
      scenario: '数時間かかる調査タスクを1回のセッションで走らせている。途中でプロセスが落ちると、それまでの成果がすべて消えてしまう。',
      question: '回復力（resilience）を高める設計は？',
      options: ['落ちないことを祈り、何も保存しない','すべてを最後にまとめて一度だけ保存する','区切りのよい中間成果・進捗を定期的に永続化（チェックポイント）し、再起動時にそこから再開できるようにする','落ちたら最初から全部やり直す前提で設計する'],
      explanations: ['無保存は、落ちた瞬間に全成果消失。回復力ゼロ。','最後に一括保存では、その直前に落ちると全部失う。','中間成果を定期的にチェックポイント保存し再開可能にする＝回復力の正解。','毎回やり直し前提は、長時間タスクで非効率かつ脆い。']
    },
    en: {
      scenario: 'A multi-hour research task runs in a single session. If the process crashes midway, all progress so far is lost.',
      question: 'What design improves resilience?',
      options: ['Hope it doesn\'t crash and save nothing','Save everything once at the very end','Periodically persist sound intermediate results/progress (checkpoints) so it can resume from there on restart','Design assuming you redo everything from scratch on a crash'],
      explanations: ['Saving nothing loses all progress the moment it crashes — zero resilience.','A single save at the end loses everything if it crashes just before.','Periodic checkpointing of intermediate results with resume is the correct resilient answer.','Assuming a full redo each time is inefficient and fragile for long tasks.']
    }
  },
  {
    id: 'ctx-019', domain: 'context', answer: 1,
    ja: {
      scenario: '別のエージェント／別セッションへ作業を引き継ぐ。引き継ぎ先は元の長い対話履歴を持っていない。',
      question: '引き継ぎ（handoff）として最も適切なのは？',
      options: ['元の生の対話ログを丸ごと貼り付けて渡す','目的・確定事項・制約・現在地・残課題・次アクションを構造化した引き継ぎサマリーを渡す','「うまくやっておいて」とだけ伝える','引き継ぎ先に最初から全部やり直してもらう'],
      explanations: ['生ログ丸ごとは冗長で、相手の上限を圧迫し要点も埋もれる。','目的・確定事項・制約・現在地・残課題・次アクションの構造化サマリー＝引き継ぎの正解。','要点なしの丸投げは、引き継ぎ先が文脈を再構築できず破綻する。','全部やり直しは引き継ぎの意味を失い、二重作業になる。']
    },
    en: {
      scenario: 'You hand off work to another agent/session that does not have the original long conversation history.',
      question: 'What is the best handoff?',
      options: ['Paste the entire raw conversation log and hand it over','Hand over a structured handoff summary: goal, fixed decisions, constraints, current state, open items, next actions','Just say "handle it well"','Have the recipient redo everything from scratch'],
      explanations: ['A whole raw log is verbose, strains the recipient\'s limit, and buries the key points.','A structured summary of goal/decisions/constraints/state/open-items/next-actions is the correct handoff.','A vague dump leaves the recipient unable to reconstruct context, and it breaks down.','Redoing everything defeats the purpose of a handoff and duplicates work.']
    }
  },
  {
    id: 'ctx-020', domain: 'context', answer: 3,
    ja: {
      scenario: 'エージェントが連続して同じツールを呼ぶうち、レートリミット（429相当）を返され始めた。',
      question: '正しい対応は？',
      options: ['制限を無視して同じ速度で呼び続ける','制限が出たらそのツールの利用を恒久的に諦める','ランダムな別ツールに切り替えて回避を試みる','呼び出し頻度を落とし、バックオフして待ってから再試行する（必要なら有限回で打ち切り縮退/通知）'],
      explanations: ['無視して同速で叩き続けると、制限が長引き状況が悪化する。','一時的制限で恒久的に諦めるのは過剰。待てば回復する。','無関係な別ツールへの回避は、誤った結果や別の障害を生む。','頻度を落としバックオフ再試行、ダメなら有限で打ち切り縮退/通知＝レート制限の正解。']
    },
    en: {
      scenario: 'As an agent calls the same tool repeatedly, it starts getting rate-limited (429-equivalent).',
      question: 'What is the correct response?',
      options: ['Ignore the limit and keep calling at the same rate','Permanently give up using that tool once limited','Switch to a random different tool to evade it','Reduce call frequency and back off before retrying (and if needed, cap retries finitely, then degrade/notify)'],
      explanations: ['Ignoring it and hammering at the same rate prolongs the limit and worsens things.','Giving up permanently for a temporary limit is excessive; it recovers after waiting.','Evading via an unrelated tool produces wrong results or new failures.','Reducing frequency, backing off, retrying, then capping and degrading/notifying is the correct rate-limit handling.']
    }
  },
  {
    id: 'ctx-021', domain: 'context', answer: 2,
    ja: {
      scenario: 'エージェントの最終出力が外部システムに自動連携され、訂正が効きにくい。出力には時々低信頼な推測が混ざる。',
      question: '誤りを自動連携に流さないための正しい設計は？',
      options: ['速度優先で、すべての出力をそのまま自動連携する','低信頼かどうかは判定せず、出力は常に確定として扱う','確信度を評価し、しきい値未満や不確実な出力は自動連携を保留して人間レビューや追加検証に回す','低信頼な出力は黙って破棄し、何も連携しない'],
      explanations: ['全自動連携は、低信頼な推測も訂正困難なまま外部へ流す。','常に確定扱いは、不確実さを無視して誤りを通す。','確信度評価で不確実分は保留→人間レビュー/検証＝誤り流出を防ぐ正解。','黙って破棄は、欠損や見落としを生み、判断機会も奪う。']
    },
    en: {
      scenario: 'An agent\'s final output auto-syncs to an external system that is hard to correct. The output sometimes mixes in low-confidence guesses.',
      question: 'What design prevents pushing errors into the auto-sync?',
      options: ['Prioritize speed and auto-sync all output as-is','Never assess confidence; always treat output as final','Evaluate confidence and hold outputs below threshold or uncertain ones for human review or extra verification','Silently discard low-confidence output and sync nothing'],
      explanations: ['Full auto-sync pushes low-confidence guesses to a hard-to-correct external system.','Always treating output as final ignores uncertainty and lets errors through.','Assessing confidence and holding uncertain output for human review/verification is the correct way to prevent leakage.','Silently discarding creates gaps/oversights and removes the chance to decide.']
    }
  },
  {
    id: 'ctx-022', domain: 'context', answer: 0,
    ja: {
      scenario: 'コンテキストに毎回大量の生データ（ログ全文・巨大JSON）を貼っており、肝心の指示や制約が埋もれてモデルが見落とす。',
      question: '注意（attention）を要点に向けさせる正しい設計は？',
      options: ['生データは必要な抜粋・要約に絞り、指示・制約・タスクの要点を明確に配置して文脈のノイズを減らす','生データは多いほど良いので全部貼り続ける','指示も生データの中に混ぜて区別なく置く','要点は末尾の生データに紛れ込ませておけば拾われる'],
      explanations: ['生データを抜粋/要約に絞り要点を明確配置＝ノイズを減らし見落としを防ぐ正解。','大量の生データは要点を埋もれさせ、上限も圧迫する。','指示と生データを混ぜると区別がつかず見落とされる。','要点を生データに紛れ込ませるのは、まさに見落としを招く配置。']
    },
    en: {
      scenario: 'You paste large raw data (full logs, huge JSON) into context every time, burying the actual instructions and constraints so the model overlooks them.',
      question: 'What design focuses attention on the key points?',
      options: ['Narrow raw data to needed excerpts/summaries and clearly place instructions/constraints/task essentials to cut context noise','More raw data is always better, so keep pasting it all','Mix instructions into the raw data with no distinction','Tuck the key points inside the trailing raw data and they will be picked up'],
      explanations: ['Narrowing raw data to excerpts/summaries and clearly placing essentials cuts noise and prevents oversight — the correct answer.','Large raw data buries the essentials and strains the limit.','Mixing instructions into raw data makes them indistinguishable and overlooked.','Tucking key points into raw data is exactly the placement that invites oversight.']
    }
  },
  {
    id: 'ctx-023', domain: 'context', answer: 1,
    ja: {
      scenario: '本番エージェントの信頼性を継続的に保ちたい。失敗パターンを早期に発見し、再発を防ぎたい。',
      question: '最も適切な運用は？',
      options: ['失敗は起きないものとして監視も振り返りもしない','失敗・エラー・縮退の発生を観測し、アラートで早期検知しつつ、傾向を振り返って原因に手を打つ（観測性＋改善ループ）','失敗が出たらその場でログを消して再起動するだけ','成功率だけを見て、失敗の中身は調べない'],
      explanations: ['監視も振り返りもなしでは、失敗が放置され再発し続ける。','失敗/縮退を観測しアラート検知＋傾向を振り返り原因対処＝信頼性を継続的に保つ正解。','ログ消去＋再起動だけでは、原因が残り再発する。','成功率だけでは、何が・なぜ失敗したかが分からず手を打てない。']
    },
    en: {
      scenario: 'You want to continuously maintain a production agent\'s reliability, catching failure patterns early and preventing recurrence.',
      question: 'What is the best operational practice?',
      options: ['Assume failures never happen and neither monitor nor review','Observe failures/errors/degradations, detect early via alerts, and review trends to fix root causes (observability + improvement loop)','Just delete logs and restart whenever a failure appears','Watch only the success rate and never inspect the failures'],
      explanations: ['Without monitoring or review, failures go unaddressed and keep recurring.','Observing failures/degradations with alerting plus trend review and root-cause fixes is the correct way to sustain reliability.','Deleting logs and restarting leaves the cause in place, so it recurs.','Watching only success rate hides what and why failed, so you can\'t act.']
    }
  }
);
