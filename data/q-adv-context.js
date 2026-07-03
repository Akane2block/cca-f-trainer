// CCA-F domain: context (Context Management & Reliability) — advanced 7 questions
window.QUESTIONS.push(
  {
    id: 'ctx-adv-001', domain: 'context', answer: 2, level: 'advanced',
    ja: {
      scenario: '大規模リポジトリを段階的にリファクタするエージェントを3時間走らせている。序盤で確定したコーディング規約・命名規則・除外パスといった「不変の制約」と、各ファイルの差分ログが同じ会話履歴に混在して積み上がり、コンテキスト窓の8割を超えたあたりから規約違反のパッチを出し始めた。トークン予算は有限で、毎ステップ全履歴を再投入し続けると上限で破綻する。',
      question: 'compaction（圧縮）戦略として最も適切なのは？',
      options: [
        '直近のメッセージから古い順に機械的に切り落とし、入りきる分だけを毎回残す',
        'コンテキストが膨らんできたので、全履歴を毎ステップ全文のまま投入し続けて押し切る',
        '不変の制約（規約・命名・除外パス・確定済み決定）は構造化サマリとして常駐させ、解決済みの差分ログは要約に畳んで詳細を破棄する',
        '規約違反が出た時点で会話をリセットし、まっさらな状態から最初のファイルをやり直す'
      ],
      explanations: [
        '古い順の機械的切り落としは、序盤で確定した不変の制約を真っ先に失う典型的な失敗。何を残すかの判断が欠けている。',
        '全文投入の押し切りはトークン上限で必ず破綻し、長期タスクほど早く壊れる。圧縮の設計から逃げているだけ。',
        '不変の制約は要約常駐で保持し、解決済みの詳細だけ畳む＝精度に効く情報を残し効かない情報を捨てる、compactionの正解パターン。',
        'リセットして最初からは、これまでの進捗と確定済み決定を丸ごと捨てる。劣化への対処ではなく作業のやり直し。'
      ]
    },
    en: {
      scenario: 'You run an agent for three hours doing an incremental refactor of a large repo. The immutable constraints fixed early (coding conventions, naming rules, excluded paths) and the per-file diff logs pile up in the same conversation history; past about 80% of the context window the agent starts emitting patches that violate the conventions. The token budget is finite, and re-injecting the full history every step will break at the limit.',
      question: 'What is the most appropriate compaction strategy?',
      options: [
        'Mechanically chop off the oldest messages first and keep only what fits each time',
        'Since context is growing, keep injecting the entire history verbatim every step and push through',
        'Keep the immutable constraints (conventions, naming, excluded paths, settled decisions) resident as a structured summary, and fold resolved diff logs into a summary while discarding their detail',
        'Reset the conversation the moment a violation appears and redo the first file from a blank slate'
      ],
      explanations: [
        'Oldest-first mechanical truncation drops the immutable constraints fixed early first — the classic failure; it lacks any judgment about what to keep.',
        'Pushing through with full verbatim injection inevitably breaks at the token limit, sooner the longer the task; it just dodges designing compaction.',
        'Keeping immutable constraints resident as a summary while folding only resolved detail is the correct compaction pattern: retain what drives accuracy, discard what does not.',
        'Resetting and starting over throws away all progress and settled decisions; that is redoing work, not handling degradation.'
      ]
    }
  },
  {
    id: 'ctx-adv-002', domain: 'context', answer: 0, level: 'advanced',
    ja: {
      scenario: '社内ナレッジ10万件を参照して問い合わせに答えるエージェントを設計している。初期実装では関連しそうな文書を上限ギリギリまで全文詰め込んだが、回答が遅く、無関係な記述に引きずられて事実と異なる回答（hallucination）が増えた。一方で文書を一切入れないと古い記憶で答えてしまう。レイテンシ・精度・トークン予算を同時に満たしたい。',
      question: 'retrieval（検索）と全文投入のトレードオフをふまえ、最も適切な設計は？',
      options: [
        '質問ごとに関連箇所を検索（retrieval）して上位の必要分だけを文脈に入れ、各抜粋に出典を付けて根拠を追えるようにする',
        '関連しそうな文書を上限まで全文詰め込み、入りきらない分は黙って切り捨てる',
        '常に最新更新の文書だけを固定で入れ、それ以外は参照しない',
        '文書は使わず、モデルの内部知識だけで答えてレイテンシを最小化する'
      ],
      explanations: [
        '質問ごとに必要分だけ取得し出典を併記＝レイテンシ・精度・トークン予算を同時に満たし、根拠も追える正解。',
        '全文詰め込み＋無言の切り捨ては遅く、無関係記述がノイズになりhallucinationを誘発する。問題の再現でもある。',
        '更新日時だけで選ぶと、その質問に本当に必要な文書を取りこぼす。新しさは関連性の代わりにならない。',
        '参照すべき一次情報があるのに内部知識任せは、古い・誤った回答を生む。速くても信頼性を失う。'
      ]
    },
    en: {
      scenario: 'You design an agent that answers queries against 100k internal knowledge docs. The first version stuffed plausibly-relevant docs in full up to the limit; answers were slow and, dragged by irrelevant passages, hallucinations rose. Yet with no docs at all it answers from stale memory. You need latency, accuracy, and the token budget satisfied at once.',
      question: 'Given the retrieval-vs-full-injection tradeoff, what is the best design?',
      options: [
        'Retrieve the relevant passages per question, put only the top needed slices into context, and attach a source to each excerpt so the grounding is traceable',
        'Stuff plausibly-relevant docs in full up to the limit and silently truncate the overflow',
        'Always include only the most recently updated doc and reference nothing else',
        'Skip docs entirely and answer from the model\'s internal knowledge to minimize latency'
      ],
      explanations: [
        'Retrieving only what each question needs and citing sources satisfies latency, accuracy, and token budget together while keeping grounding traceable — the correct answer.',
        'Full stuffing plus silent truncation is slow and turns irrelevant passages into noise that induces hallucination; it reproduces the very problem.',
        'Choosing by update time alone misses the doc actually needed for the question; recency is no substitute for relevance.',
        'Relying on internal knowledge when authoritative sources exist yields stale, wrong answers; fast but unreliable.'
      ]
    }
  },
  {
    id: 'ctx-adv-003', domain: 'context', answer: 3, level: 'advanced',
    ja: {
      scenario: '決済処理を呼ぶ本番エージェントが、決済プロバイダの一時的な遅延・503でときどき失敗する。素朴に「失敗したら即時リトライ」を入れたところ、障害時に全インスタンスが一斉に再送して相手をさらに過負荷にし、プロバイダ全体が長時間ダウンする連鎖障害（cascading failure）を起こした。止めずに、かつ障害を増幅させたくない。',
      question: '最も適切な信頼性設計は？',
      options: [
        '失敗したら遅延ゼロで無限にリトライし続け、成功するまで諦めない',
        '1回失敗したら即座にダミーの成功レスポンスを返し、決済は後で帳尻を合わせる前提で処理を続行する',
        'リトライ回数だけ増やして上限を大きくし、間隔は固定の短いスリープにする',
        '指数バックオフ＋ジッターで有限回リトライし、連続失敗が閾値を超えたらサーキットブレーカーで呼び出しを一時遮断、その間は縮退（degrade）して人間に通知する'
      ],
      explanations: [
        '遅延ゼロの無限リトライは、まさに今回の一斉再送による連鎖障害を引き起こす元凶。',
        'ダミーの成功を返すのは、決済という不確実かつ不可逆な結果を「成功した」と偽る危険行為。後で帳尻は合わない。',
        '回数を増やしても間隔が固定で短ければ、同時再送が集中して相手を過負荷にする問題は解けない。',
        'バックオフ＋ジッターで再送を分散し、閾値超過でサーキットブレーカーが遮断、その間は縮退＋人間通知＝連鎖障害を断つ正解パターン。'
      ]
    },
    en: {
      scenario: 'A production agent that calls a payment provider sometimes fails on transient latency/503s. A naive "retry immediately on failure" was added; during an incident every instance resent at once, overloading the provider further and causing a cascading failure that took the whole provider down for a long time. You must not stall, and must not amplify the outage.',
      question: 'What is the most appropriate reliability design?',
      options: [
        'On failure, retry forever with zero delay and never give up until it succeeds',
        'After one failure, immediately return a dummy success response and continue, planning to reconcile the payment later',
        'Just raise the retry count to a large number and use a fixed short sleep between attempts',
        'Finite retries with exponential backoff plus jitter; when consecutive failures cross a threshold, trip a circuit breaker to cut off calls temporarily, and during that window degrade gracefully and notify a human'
      ],
      explanations: [
        'Zero-delay infinite retries are exactly what caused this incident\'s synchronized resends and cascading failure.',
        'Returning a dummy success falsely claims an uncertain, irreversible payment "succeeded"; the books will not reconcile later.',
        'Raising the count with a fixed short interval does not solve the synchronized-resend overload; the herd still hits the provider together.',
        'Backoff plus jitter spreads resends, the circuit breaker cuts off past the threshold, and the window degrades with human notification — the correct pattern that breaks the cascade.'
      ]
    }
  },
  {
    id: 'ctx-adv-004', domain: 'context', answer: 1, level: 'advanced',
    ja: {
      scenario: '旅行手配エージェントが「フライト検索」「ホテル検索」「為替レート取得」「現地天気」の4サービスを呼んで提案をまとめる。本番で為替APIと天気APIがしばしば不安定になり、現状はどれか1つが落ちると例外で全体が中断し、ユーザーに何も返らない。フライトとホテルが取れていれば提案自体は成立するはずなのに、毎回ゼロ回答になっている。',
      question: 'graceful degradation（縮退）の設計として最も適切なのは？',
      options: [
        '4サービスのうち1つでも失敗したら、全体を失敗扱いにしてエラーだけ返す（部分的な誤りを出さないため）',
        'コア（フライト・ホテル）とオプション（為替・天気）を分け、コアが揃えば提案を返し、落ちたオプションは「取得不可」と明示して欠落部分を縮退表示する',
        '落ちた為替・天気は直近に成功した値や妥当そうな既定値を黙って埋め、4項目が揃った体裁で返す',
        '全サービスが成功するまでユーザーを待たせ、4つすべて揃ってからのみ提案を返す'
      ],
      explanations: [
        '1つの失敗で全体を落とすのは、コアが揃っていても毎回ゼロ回答になる今の問題そのもの。可用性を不必要に下げている。',
        'コアとオプションを分け、コアが揃えば返し、欠落は明示して縮退＝可用性と正直さを両立する縮退設計の正解。',
        '黙って既定値で埋めるのは、不確実・古い値を「取得できた」と偽ること。為替や天気で誤誘導を招く危険行為。',
        '全サービス成功を待つ設計は、不安定なオプションに引きずられて応答性が崩壊する。コアで返せるのに待たせる必要はない。'
      ]
    },
    en: {
      scenario: 'A travel-planning agent calls four services — flight search, hotel search, FX rates, and local weather — to assemble a proposal. In production the FX and weather APIs are often flaky; currently if any one fails, an exception aborts the whole thing and the user gets nothing. Even though flights and hotels would make the proposal viable on their own, every run returns zero.',
      question: 'What is the best graceful-degradation design?',
      options: [
        'If any one of the four fails, treat the whole run as failed and return only an error (to avoid emitting partial mistakes)',
        'Split core (flights, hotels) from optional (FX, weather); if core is present, return the proposal and mark a failed optional as "unavailable", degrading the missing part explicitly',
        'Silently fill a failed FX/weather with the last successful value or a plausible default, returning as if all four were present',
        'Make the user wait until every service succeeds, returning a proposal only once all four are ready'
      ],
      explanations: [
        'Failing the whole run on a single failure is exactly the current zero-answer problem even when core is present; it needlessly lowers availability.',
        'Separating core from optional, returning on core, and explicitly marking missing parts is the correct degradation design — availability and honesty together.',
        'Silently filling defaults falsely claims an uncertain/stale value was "obtained"; for FX or weather this risks misleading the user.',
        'Waiting for all services to succeed lets the flaky optionals destroy responsiveness; there is no need to stall when core can already answer.'
      ]
    }
  },
  {
    id: 'ctx-adv-005', domain: 'context', answer: 2, level: 'advanced',
    ja: {
      scenario: '請求書PDFから金額・取引先・支払期日を抽出して会計システムに登録するエージェントを運用している。抽出モデルは各フィールドに0〜1の自己採点スコアを付けて返す。スコアが高い案件でも実際には誤抽出が混じり、間違った金額がそのまま登録される事故が起きた。レイアウト崩れや手書き混在のPDFで特に不確実性が高い。',
      question: '不確実な抽出結果の扱いとして最も適切なのは？',
      options: [
        'モデルの自己採点スコアが0.8以上なら正しいとみなして無条件に自動登録する',
        '不確実さが残るのは仕方ないので、全件そのまま登録し、後から人間が誤りを見つけて直す運用にする',
        '抽出元のPDF上の該当箇所（根拠）を併記させ、金額の合計突合など客観チェックを通った案件のみ自動登録し、通らない・低信頼の案件は人間レビューにエスカレーションする',
        '抽出が不安定なフィールドは、過去案件で最も多かった値を既定として自動で埋める'
      ],
      explanations: [
        '自己採点スコアはキャリブレーションされておらず、0.8でも誤りは混じる。スコア閾値だけの自動採用は今回の事故そのもの。',
        '全件登録して後から人手で直すのは、誤った金額が一度会計に入ってしまう不可逆な影響を見落としている。',
        '根拠併記＋客観突合を通った案件のみ自動化し、残りは人間にエスカレーション＝不確実な結果をそのまま採用しない正解。',
        '不安定なフィールドを最頻値で埋めるのは、その案件と無関係な値を「抽出できた」と偽る危険な穴埋め。'
      ]
    },
    en: {
      scenario: 'You operate an agent that extracts amount, vendor, and due date from invoice PDFs and registers them into accounting. The extractor returns a 0–1 self-assessed confidence per field. Even high-confidence items sometimes contain mis-extractions, and a wrong amount got registered as-is. Uncertainty is especially high on broken layouts and mixed handwriting.',
      question: 'How should uncertain extraction results be handled?',
      options: [
        'Treat anything with a self-assessed score ≥ 0.8 as correct and auto-register it unconditionally',
        'Since some uncertainty is unavoidable, register everything as-is and have humans find and fix errors afterward',
        'Have the extractor cite the source location on the PDF, auto-register only items that pass objective checks (e.g., totals reconciliation), and escalate failing or low-confidence items to human review',
        'For unstable fields, auto-fill the value that occurred most often in past cases as a default'
      ],
      explanations: [
        'The self-assessed score is uncalibrated; errors mix in even at 0.8. Auto-accepting on a score threshold alone is exactly this incident.',
        'Registering everything and fixing later overlooks the irreversible impact of a wrong amount already entering the books.',
        'Auto-registering only items that pass objective reconciliation with cited grounding, escalating the rest, is the correct way to not accept uncertain results as-is.',
        'Filling unstable fields with the modal value falsely claims a value unrelated to that case was "extracted" — a dangerous gap-fill.'
      ]
    }
  },
  {
    id: 'ctx-adv-006', domain: 'context', answer: 0, level: 'advanced',
    ja: {
      scenario: '夜間バッチのエージェントが、外部APIへ「ポイント付与」リクエストを送る。タイムアウトしてリトライした際、実は1回目が相手側で成功していて、リトライで二重付与が起きた。さらに別の障害では、付与が失敗していたのにエラーが握り潰され、誰も気づかないまま数日が経った（沈黙の失敗）。リトライをまたいでも整合し、失敗を見逃さない設計にしたい。',
      question: '最も適切な設計は？',
      options: [
        '各リクエストに冪等キー（idempotency key）を付けてリトライしても二重実行されないようにし、すべての試行・成否・縮退を観測（observability）して失敗時はアラートを上げる',
        'タイムアウトしたら必ず再送する。二重付与が出たら後から手作業で相殺すればよい',
        'リトライ自体をやめて1回だけ送る。失敗したらその回は黙ってスキップし、次回バッチに任せる',
        '成功率の数字だけをダッシュボードに出し、個々のリクエストの成否やエラー内容はログに残さない'
      ],
      explanations: [
        '冪等キーでリトライをまたいだ二重実行を防ぎ、全試行を観測してアラート＝二重付与と沈黙の失敗を同時に潰す正解。',
        '無条件再送は二重付与を再発させ、手作業の相殺は規模が増えると破綻し抜けも出る。冪等性で根本から防ぐべき。',
        '1回だけで失敗を黙ってスキップは、まさに沈黙の失敗を放置する設計。整合は取れても見逃しが残る。',
        '成功率だけで個別の成否やエラー内容を残さないと、何がなぜ失敗したか追えず、沈黙の失敗を検知できない。'
      ]
    },
    en: {
      scenario: 'A nightly batch agent sends "grant points" requests to an external API. On a timeout it retried, but the first call had actually succeeded server-side, causing a double grant. In a separate incident a grant had failed but the error was swallowed and went unnoticed for days (a silent failure). You want a design that stays consistent across retries and never misses a failure.',
      question: 'What is the most appropriate design?',
      options: [
        'Attach an idempotency key to each request so retries are not executed twice, and observe every attempt, outcome, and degradation, raising an alert on failure',
        'Always resend on timeout; if double grants occur, manually offset them afterward',
        'Drop retries and send exactly once; if a send fails, silently skip it and leave it to the next batch',
        'Show only the success-rate number on a dashboard and keep no per-request outcome or error detail in logs'
      ],
      explanations: [
        'An idempotency key prevents double-execution across retries, and observing every attempt with alerting catches both the double grant and the silent failure — the correct answer.',
        'Unconditional resend reproduces double grants, and manual offsetting breaks down and misses cases at scale; idempotency prevents it at the root.',
        'Sending once and silently skipping failures is precisely the silent-failure design; consistent, but misses are left in place.',
        'Tracking only success rate without per-request outcomes and error detail makes it impossible to trace what and why failed, so silent failures go undetected.'
      ]
    }
  },
  {
    id: 'ctx-adv-007', domain: 'context', answer: 3, level: 'advanced',
    ja: {
      scenario: '数日にわたる移行プロジェクトをエージェントに任せている。1日の作業セッションが終わると会話コンテキストは破棄され、翌日は別セッションで再開する。当初はセッション末尾の生ログを次回プロンプトに丸ごと貼って引き継いでいたが、トークン予算を圧迫するうえ、確定済みの方針なのか途中の検討メモなのか区別がつかず、翌日のエージェントが既に却下した案を蒸し返した。',
      question: 'セッション間の状態ハンドオフ設計として最も適切なのは？',
      options: [
        '前日セッションの生ログ全文を毎朝そのまま貼り付けて引き継ぐ',
        '引き継ぎはやめて、毎朝まっさらな状態から開始し、必要な前提はその都度エージェントに推測させる',
        '前日の最後のメッセージ1通だけを次回に渡し、それ以外の文脈は捨てる',
        '確定した決定・現在地・残タスク・既に却下した選択肢を構造化した永続的なハンドオフ要約に書き出し、翌セッションはまずそれを読み込んでからトークン予算内で再開する'
      ],
      explanations: [
        '生ログ全文の貼り付けはトークン予算を圧迫し、確定方針と検討メモが混在して却下案の蒸し返しを招く、今回の問題そのもの。',
        'まっさら開始＋推測任せは、確定済みの決定や却下した案を失い、毎日方針が揺らぐ。状態の永続化を放棄している。',
        '最後の1通だけでは、確定済みの決定や残タスク・却下案といった引き継ぐべき状態が大半抜け落ちる。',
        '決定・現在地・残タスク・却下案を構造化要約として永続化し翌日まず読む＝トークン予算内で状態を確実に引き継ぐ正解。'
      ]
    },
    en: {
      scenario: 'You task an agent with a multi-day migration project. At the end of each work session the conversation context is discarded and the next day resumes in a fresh session. Initially you handed off by pasting the whole raw end-of-session log into the next prompt, but it strained the token budget and — with no distinction between settled decisions and mid-stream scratch notes — the next day\'s agent re-litigated an option already rejected.',
      question: 'What is the best cross-session state-handoff design?',
      options: [
        'Paste the previous session\'s entire raw log verbatim each morning to carry over',
        'Drop the handoff, start fresh every morning, and let the agent guess the needed premises each time',
        'Pass only the single last message from the previous session and discard all other context',
        'Write the settled decisions, current position, remaining tasks, and already-rejected options into a structured, persistent handoff summary; the next session loads that first, then resumes within the token budget'
      ],
      explanations: [
        'Pasting the full raw log strains the token budget and mixes settled policy with scratch notes, inviting re-litigation of rejected options — the very problem here.',
        'Starting fresh and guessing loses settled decisions and rejected options, so policy wobbles daily; it abandons persisting state.',
        'A single last message drops most of the state worth carrying — settled decisions, remaining tasks, and rejected options.',
        'Persisting decisions, position, remaining tasks, and rejected options as a structured summary read first the next day is the correct way to hand off state reliably within the token budget.'
      ]
    }
  },
  {
    id: 'ctx-adv-008', domain: 'context', answer: 2, level: 'advanced',
    ja: {
      scenario: '医療データ分析チームが数百万件の電子カルテを処理する。取り込みから最終レポート生成までのSLAは60時間。アーキテクトは1回目の処理で10%が失敗し、2回目の処理（再試行）が必要になると予測している。使用する Batch API は1バッチあたり最大24時間かかる。再試行を含めすべて60時間のSLAを確実に守るための「最大の」バッチ送信間隔は？',
      question: '1回目の送信から再試行の送信まで、最大どれだけ空けられるか？',
      options: ['12時間','24時間','36時間','48時間'],
      explanations: ['12時間は全体の余裕（スラック＝60−24−24）であって、問われている送信間隔ではない。これが定番の引っかけ。','24時間は1バッチの最大処理時間そのもので、送信間隔ではない。','正解。再試行バッチも最大24時間かかるため、締切24時間前（=36時間時点）までに再試行を送る必要がある。60−24=36時間が空けてよい最大間隔。','48時間だと再試行の完了が60時間を超え、SLAに間に合わない。']
    },
    en: {
      scenario: 'A medical data team processes millions of records. The SLA from ingestion to final report is 60 hours. The architect predicts 10% of the first pass fails and needs a second pass (retry). The Batch API takes up to 24 hours per batch. To guarantee the 60-hour SLA including reprocessing, what is the MAXIMUM batch submission interval?',
      question: 'At most how long can elapse between the first submission and the retry submission?',
      options: ['12 hours','24 hours','36 hours','48 hours'],
      explanations: ['12 hours is the overall slack (60 − 24 − 24), not the submission interval being asked—this is the classic trap.','24 hours is the max processing time of a single batch, not the submission interval.','Correct. The retry batch also takes up to 24h, so the retry must be sent by 24h before the deadline (at the 36h mark). 60 − 24 = 36h is the max gap.','At 48 hours the retry would finish past 60 hours and miss the SLA.']
    }
  },
  {
    id:'ctx-adv-009', domain: 'context', answer: 0, level: 'advanced',
    ja: {
      scenario: '15拠点のフルフィルメントセンターを持つECプラットフォームで、各拠点の日次操作ログをClaudeに分析させ、在庫の不正転送や横流しを検出している。現在は15拠点分のログをすべて連結して1つのプロンプトに入れており、コンテキストウィンドウには収まっている。単一拠点内で完結する不審な操作は検出できているが、複数拠点をまたいで在庫移動・権限変更・出荷処理を組み合わせる巧妙な攻撃を繰り返し見逃していることが監査で判明した。',
      question: '拠点横断の攻撃を検出するアーキテクチャとして最も適切なものはどれか。',
      options: [
        'マルチパス構成にし、まず各拠点ログごとの局所分析パスで不審なIP・ユーザーID・在庫ID・タイムスタンプ等を抽出し、抽出結果だけを統合パスに渡してファイル横断の相関分析を行う',
        '検出した攻撃候補ごとに確信度スコアを自己報告させ、低確信度のものをセキュリティチームの人間レビューに回す',
        'max_tokensを引き上げてExtended Thinkingを有効にし、より深い推論で全ログを読み解かせる',
        '初期分析の結果を、独立した別のClaudeインスタンスに渡して妥当性をレビューさせる二段構成にする'
      ],
      explanations: [
        '決め手は、生ログの全連結ではコンテキストに収まっていても重要な相関がノイズに埋もれる点。先にエンティティを抽出して入力密度を下げ、抽出結果同士で相関を見れば拠点横断のパターンが浮かび上がる。',
        '確信度スコアは「すでに見つけた候補」の優先度付けには使えるが、今回の問題はそもそも候補を発見できていないこと。発見漏れの解決策にはならない。',
        '思考量や出力余地を増やしても、巨大な生ログのノイズで注意が分散する問題は残る。入力を整理しないまま「もっと考えて」では根本解決しない。',
        'レビュー用インスタンスは品質評価には役立つが、元の分析が見落としたものはレビュー側にも渡らない。まず入力を相関しやすい形に変換する必要がある。'
      ]
    },
    en: {
      scenario: 'An e-commerce platform with 15 fulfillment centers has Claude analyze each site’s daily operation logs to detect fraudulent inventory transfers and diversion. Today all 15 logs are concatenated into a single prompt, which still fits within the context window. Suspicious activity confined to a single site is being caught, but an audit revealed the system repeatedly misses sophisticated attacks that combine inventory moves, permission changes, and shipping operations across multiple sites.',
      question: 'Which architecture is most appropriate for detecting the cross-site attacks?',
      options: [
        'Adopt a multi-pass design: run a local analysis pass per site log to extract suspicious IPs, user IDs, inventory IDs, and timestamps, then feed only those extractions into an aggregation pass that correlates across files',
        'Have the model self-report a confidence score per detected attack candidate and route low-confidence ones to human review by the security team',
        'Raise max_tokens and enable extended thinking so deeper reasoning can work through all the logs',
        'Add a second stage where an independent Claude instance reviews the validity of the initial analysis'
      ],
      explanations: [
        'The decisive point: with raw logs all concatenated, key correlations drown in noise even though everything “fits” in context. Extracting entities first lowers input density, and correlating the extractions surfaces cross-site patterns.',
        'Confidence scores help prioritize candidates already found; the problem here is that candidates are not being discovered at all. It does not fix detection misses.',
        'More thinking budget does not fix attention being diluted by massive raw-log noise. “Think harder” without restructuring the input does not address the root cause.',
        'A reviewer instance helps assess quality, but whatever the original analysis missed never reaches the reviewer. The input must first be transformed into a correlatable form.'
      ]
    }
  },
  {
    id:'ctx-adv-010', domain: 'context', answer: 3, level: 'advanced',
    ja: {
      scenario: '保険会社が医療保険請求の情報抽出をClaudeで自動化している。抽出結果には確信度スコアが付き、0.90未満は人間のオペレーターが全件レビューし、0.90以上はそのまま自動処理される。運用開始から半年、ビジネス側から「自動処理されている高確信度データの精度が長期的に維持されているか、新しい請求フォーマットや新規提携病院の増加でエラーパターンが変わっていないかを継続的に監視したい」という要望が出た。',
      question: '品質管理（QC）のサンプリング戦略として最も適切なものはどれか。',
      options: [
        '判定が最も不安定な0.90〜0.92の境界付近のデータに絞って人間レビューを行う',
        '全請求データから毎週5%を無作為抽出して人間レビューを行う',
        '毎週ランダムに選んだ1つの提携病院の請求を100%レビューする',
        '0.90以上の高確信度データを対象に、請求元や請求の複雑さなどの属性で層化したランダム抽出を行い、人間がレビューする'
      ],
      explanations: [
        '境界付近は確かに怪しいが、0.99のような高確信度で起きる深刻なサイレント・フェイラーを見逃す。高確信度層全体の監視には範囲が狭すぎる。',
        '低確信度データはすでに全件人間レビュー済みなので、全体からの無作為抽出はレビュー資源が重複する。監視すべきは自動処理される側。',
        '特定病院の傾向は分かるが偏りが大きく、他の病院・他の請求パターンで進むドリフトを見逃す。',
        '決め手は、監視対象が「自動処理される高確信度グループ」であること。属性で層化してランダム抽出すれば、偏りを抑えつつ新しいエラーパターンやドリフトを早期に検知できる。'
      ]
    },
    en: {
      scenario: 'An insurance company automates data extraction from medical claims with Claude. Each extraction carries a confidence score: below 0.90 goes to full human operator review, while 0.90 and above is processed automatically. Six months into operation, the business asks for continuous monitoring of whether the auto-processed high-confidence data is staying accurate over time, and whether error patterns are shifting as new claim formats and newly partnered hospitals come online.',
      question: 'Which sampling strategy is most appropriate for this quality control?',
      options: [
        'Focus human review on data near the boundary, between 0.90 and 0.92, where judgments are least stable',
        'Randomly sample 5% of all claims each week for human review',
        'Each week, pick one partner hospital at random and review 100% of its claims',
        'From the high-confidence (≥ 0.90) data, take a stratified random sample across attributes such as claim source and claim complexity, and have humans review it'
      ],
      explanations: [
        'The boundary zone is indeed suspect, but this misses severe silent failures occurring at very high confidence like 0.99. It is far too narrow to monitor the whole high-confidence group.',
        'Low-confidence data is already fully human-reviewed, so sampling from everything duplicates review effort. What needs watching is the auto-processed side.',
        'Reviewing one hospital reveals that hospital’s quirks but is heavily biased, missing drift progressing in other hospitals and claim patterns.',
        'The decisive point: the monitoring target is the auto-processed high-confidence group. Stratified random sampling across attributes keeps bias down while catching new error patterns and drift early.'
      ]
    }
  },
  {
    id:'ctx-adv-011', domain: 'context', answer: 2, level: 'advanced',
    ja: {
      scenario: '金融機関が、80ファイルからなるレガシーな勘定系モノリスを疎結合なモジュール構造へ再設計しようとしている。担当チームはClaudeに全80ファイルを1つのプロンプトで読ませてモジュール境界を提案させた。ファイル群はコンテキストウィンドウに収まっており、出力された境界案も一見それらしい。しかしアーキテクトが精査すると、提案はフォルダ構成をなぞった表面的なもので、遠く離れたファイル同士が共有データや業務ルールで強く結合している箇所をことごとく見落としていた。',
      question: 'この分析プロセスの再設計として最も適切なものはどれか。',
      options: [
        'より大きなコンテキストウィンドウを持つ次世代モデルの提供を待ち、それまで本件の分析は保留する',
        '独立したレビュー用のClaudeインスタンスを追加し、境界案が表面的でないか批判的にレビューさせる',
        'ファイルごとの局所分析フェーズで依存関係・ドメインエンティティ・責務を構造化データとして抽出し、その抽出結果だけを使うファイル横断の統合フェーズで深い結合を見つけて境界を提案させる2段階に分ける',
        'max_tokensを大幅に引き上げ、境界の根拠をより長く詳細に出力させることで見落としを減らす'
      ],
      explanations: [
        'コンテキストに「入るかどうか」は今回すでにクリアしている。問題は情報が過密だと重要な関係に注意を向け続けられないこと（注意力の減衰）で、ウィンドウ拡大では解決しない。',
        'レビューは品質確認に役立つが、同じ過密な材料を渡されたレビュー側も同様に深い結合を見落とす。入力密度の整理が先。',
        '決め手は「全部入る」と「正しく分析できる」が別物であること。局所分析で各ファイルの要点を構造化して入力密度を下げ、統合フェーズで抽出結果同士を突き合わせれば、遠距離の深い結合が浮かび上がる。',
        'max_tokensは主に出力長の上限であり、入力内の依存関係を深く読み取る能力を上げる設定ではない。長く書けても見落とした結合は出てこない。'
      ]
    },
    en: {
      scenario: 'A financial institution is redesigning a legacy core-banking monolith of 80 files into loosely coupled modules. The team had Claude read all 80 files in a single prompt and propose module boundaries. The files fit within the context window, and the proposed boundaries looked plausible at first glance. But on close inspection the architect found the proposal merely traced the folder layout and consistently missed places where distant files are tightly coupled through shared data and business rules.',
      question: 'Which redesign of this analysis process is most appropriate?',
      options: [
        'Wait for a next-generation model with a larger context window and put this analysis on hold until then',
        'Add an independent reviewer Claude instance to critically review whether the boundary proposal is superficial',
        'Split into two stages: a per-file local analysis phase that extracts dependencies, domain entities, and responsibilities as structured data, then a cross-file integration phase that uses only those extractions to find deep coupling and propose boundaries',
        'Raise max_tokens substantially so the model can output longer, more detailed justifications and miss less'
      ],
      explanations: [
        '“Fitting in context” is already achieved here. The problem is that with over-dense input the model cannot sustain attention on the relations that matter (attention decay) — a bigger window does not fix that.',
        'Review helps with quality assurance, but a reviewer fed the same over-dense material misses the same deep couplings. Reducing input density comes first.',
        'The decisive point: “it all fits” and “it analyzes correctly” are different things. Local analysis structures each file’s essentials and lowers input density; the integration phase then cross-references the extractions, surfacing deep long-range coupling.',
        'max_tokens mainly caps output length; it does not improve how deeply dependencies in the input are read. Longer output does not contain couplings that were never noticed.'
      ]
    }
  }
);
