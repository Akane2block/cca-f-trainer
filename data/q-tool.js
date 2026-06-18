// CCA-F domain: tool (ツール設計・MCP連携 / Tool Design & MCP Integration) — 27 questions
window.QUESTIONS.push(
  {
    id: 'tl-001', domain: 'tool', answer: 1,
    ja: {
      scenario: '社内の在庫システムをClaudeから操作させたい。複数アプリ（Claude Desktop / Claude Code / 自社チャット）から同じ機能を再利用したい。',
      question: '最も適切なのは？',
      options: ['アプリごとに別々の独自実装でツール呼び出しを書き直す','MCPサーバーとして在庫機能を公開し、各クライアントから同じ標準プロトコルで接続する','在庫DBの認証情報をプロンプトに直書きして渡す','すべての在庫操作を1つの巨大ツールにまとめ、引数で分岐させる'],
      explanations: ['アプリごと再実装は重複・不整合のもと。再利用要件を満たさない。','MCP（Model Context Protocol）で機能をサーバー公開すれば、複数クライアントから標準的に再利用できる＝この要件の正解。','認証情報のプロンプト直書きは重大なセキュリティ事故。絶対に避ける。','巨大単一ツールは責務過多でスキーマが曖昧になりやすく、誤用・誤呼び出しを招く。']
    },
    en: {
      scenario: 'You want Claude to operate an internal inventory system, reusing the same capability across Claude Desktop, Claude Code, and your own chat app.',
      question: 'What is the most appropriate approach?',
      options: ['Rewrite separate custom tool-calling implementations per app','Expose inventory functions as an MCP server and connect each client via the same standard protocol','Hard-code the inventory DB credentials into the prompt','Combine all inventory operations into one giant tool that branches on arguments'],
      explanations: ['Per-app reimplementation breeds duplication and inconsistency and fails the reuse requirement.','Exposing functions via MCP lets multiple clients reuse them through a standard protocol — the correct fit.','Hard-coding credentials in the prompt is a serious security incident; never do this.','One giant tool overloads responsibility and yields ambiguous schemas, inviting misuse and wrong calls.']
    }
  },
  {
    id: 'tl-002', domain: 'tool', answer: 3,
    ja: {
      scenario: 'ツール定義の description が「データを処理する」とだけ書いてあり、Claudeが引数を取り違えたり、使うべきでない場面で呼んでしまう。',
      question: '改善として最も適切なのは？',
      options: ['description を空にしてClaudeの推測に任せる','ツールの戻り値を全部捨ててエラーを握りつぶす','1つのツールにオプション引数を増やして何でもできるようにする','いつ使うか・各引数の意味と制約・期待する入出力を description と schema に明確に書く'],
      explanations: ['descriptionを空にすると誤呼び出しが増えるだけ。逆効果。','戻り値を捨ててエラーを握りつぶすのは信頼性を下げるアンチパターン。','何でもできる肥大ツールは曖昧さを増やし、誤用を助長する。','use条件・引数の意味と制約・入出力を明確化＝ツール誤用を減らす正攻法。スキーマは契約として効く。']
    },
    en: {
      scenario: 'A tool\'s description only says "processes data," so Claude mixes up arguments or calls it when it should not.',
      question: 'What is the most appropriate fix?',
      options: ['Leave the description empty and let Claude guess','Discard all tool return values and swallow errors','Add optional arguments to one tool so it can do anything','Clearly state when to use it, each argument\'s meaning and constraints, and expected I/O in the description and schema'],
      explanations: ['Emptying the description only increases misfires; counterproductive.','Discarding returns and swallowing errors lowers reliability — an anti-pattern.','A do-everything bloated tool adds ambiguity and encourages misuse.','Clarifying usage conditions, argument meaning/constraints, and I/O is the right way to reduce misuse; the schema acts as a contract.']
    }
  },
  {
    id: 'tl-003', domain: 'tool', answer: 2,
    ja: {
      scenario: '「ユーザー管理ツール」が作成・取得・更新・削除・通知送信・レポート生成までを1つのツールで担い、actionという文字列引数で分岐している。Claudeがどのactionでどの引数が必要か取り違える。',
      question: '設計の改善として最も適切なのは？',
      options: ['actionの種類をさらに増やして1ツールに集約を進める','descriptionを長文にして全actionの注意点を1か所に詰め込む','責務ごとに create_user / get_user / update_user などツールを分割し、各ツールに明確なschemaを持たせる','引数をすべて任意（optional）にしてClaudeが自由に組み合わせられるようにする'],
      explanations: ['集約を進めるほど引数の組み合わせが爆発し、誤用が増える。','長文descriptionは1ツールの曖昧さを根本解決しない。分割が本筋。','1ツール1責務に分割すれば各schemaが明確になり、必要な引数も限定され誤用が減る＝正解。','全引数optionalは検証を弱め、不正な組み合わせを許してしまう。']
    },
    en: {
      scenario: 'A "user management tool" handles create, read, update, delete, notify, and report in one tool, branching on a string "action" argument. Claude confuses which args each action needs.',
      question: 'What is the best design improvement?',
      options: ['Add even more action types to consolidate further into one tool','Write a very long description packing all action caveats into one place','Split by responsibility into create_user / get_user / update_user etc., each with a clear schema','Make every argument optional so Claude can freely combine them'],
      explanations: ['Consolidating further explodes argument combinations and increases misuse.','A long description does not fix the underlying ambiguity of one tool; splitting does.','One tool per responsibility yields clear schemas and limited required args, reducing misuse — correct.','Making all args optional weakens validation and permits invalid combinations.']
    }
  },
  {
    id: 'tl-004', domain: 'tool', answer: 0,
    ja: {
      scenario: '外部APIを叩くツールでタイムアウトが起きたとき、現状は空文字列""を返している。Claudeは成功したと誤認して次の手順に進んでしまう。',
      question: 'エラー処理として最も適切なのは？',
      options: ['{"error":"upstream_timeout","retryable":true,"message":"APIが10秒で応答せず"} のような構造化エラーを返す','例外を握りつぶして空文字を返し続ける','タイムアウト時はツールをクラッシュさせてセッションを落とす','エラー内容を一切返さず "OK" とだけ返す'],
      explanations: ['モデルが回復できる構造化エラー（種別・再試行可否・説明）を返すのが正解。Claudeが再試行や代替手段を選べる。','空文字は成功と区別できず、Claudeを誤った継続に導く。','クラッシュは過剰反応で回復の余地を奪う。','"OK"は失敗を成功に偽装する最悪のパターン。']
    },
    en: {
      scenario: 'A tool calling an external API times out, and it currently returns an empty string "". Claude mistakes this for success and proceeds.',
      question: 'What is the best error-handling approach?',
      options: ['Return a structured error like {"error":"upstream_timeout","retryable":true,"message":"API did not respond in 10s"}','Swallow the exception and keep returning an empty string','Crash the tool and kill the session on timeout','Return only "OK" with no error detail'],
      explanations: ['Returning a recoverable structured error (type, retryable flag, message) is correct so Claude can retry or choose an alternative.','An empty string is indistinguishable from success and leads Claude to continue wrongly.','Crashing is an overreaction that removes any chance of recovery.','Returning "OK" disguises failure as success — the worst pattern.']
    }
  },
  {
    id: 'tl-005', domain: 'tool', answer: 2,
    ja: {
      scenario: '本番データベースのレコードを物理削除する delete_record ツールを設計している。元に戻せない不可逆操作。',
      question: '安全策として最も適切なのは？',
      options: ['確認なしで即削除し、速度を最優先する','削除前に他のテーブルも自動でついでに掃除する','危険・不可逆な操作として、対象IDの明示・実行前の確認・適切な権限チェックを必須にする','エラーが起きてもログを残さず黙って続行する'],
      explanations: ['不可逆操作の即時実行は事故時に取り返しがつかない。','「ついで掃除」は影響範囲を広げ、予期しない破壊を招く。','不可逆操作には対象の明示・確認ステップ・権限チェックを設けるのが安全設計の基本＝正解。','ログを残さないと事故調査も復旧判断もできない。']
    },
    en: {
      scenario: 'You are designing a delete_record tool that hard-deletes records from a production database — an irreversible operation.',
      question: 'What is the best safety measure?',
      options: ['Delete immediately without confirmation, prioritizing speed','Also auto-clean other tables while deleting','Treat it as a dangerous, irreversible action: require explicit target IDs, a pre-execution confirmation, and proper permission checks','Continue silently without logging even when errors occur'],
      explanations: ['Immediate irreversible execution is unrecoverable if it goes wrong.','"Cleaning up while at it" widens the blast radius and causes unexpected damage.','Irreversible operations need explicit targets, a confirmation step, and permission checks — sound safety design, the correct answer.','Without logs you cannot investigate incidents or decide on recovery.']
    }
  },
  {
    id: 'tl-006', domain: 'tool', answer: 1,
    ja: {
      scenario: '決済ツール charge_payment を作る。ネットワーク不安定でClaudeが同じ呼び出しを2回送ってしまう可能性がある。二重課金は避けたい。',
      question: '設計として最も適切なのは？',
      options: ['同じ呼び出しでも毎回新しい決済を作る','idempotency_key（冪等キー）を受け取り、同一キーの再実行は二重に課金しないようにする','二重課金が起きたら後で人手で返金する前提にする','リトライを完全に禁止して1回でも失敗したら諦める'],
      explanations: ['毎回新規決済は二重課金を防げない。','冪等キーで同一操作の重複実行を吸収するのが正攻法＝二重課金を構造的に防ぐ正解。','人手返金前提は事故を運用でカバーするだけで設計上の防御になっていない。','リトライ全面禁止は一時的障害への耐性を失わせ、可用性を下げる。']
    },
    en: {
      scenario: 'You build a charge_payment tool. On flaky networks Claude might send the same call twice, and you must avoid double charges.',
      question: 'What is the best design?',
      options: ['Create a brand-new payment on every call, even identical ones','Accept an idempotency_key so re-running the same key does not double-charge','Assume double charges will be refunded manually later','Forbid retries entirely and give up after a single failure'],
      explanations: ['A new payment every call cannot prevent double charges.','An idempotency key absorbs duplicate executions of the same operation — the structurally correct defense.','Manual refunds patch incidents operationally without designing the defense in.','Banning retries removes resilience to transient failures and hurts availability.']
    }
  },
  {
    id: 'tl-007', domain: 'tool', answer: 3,
    ja: {
      scenario: 'GitHubのリポジトリを操作するMCPサーバーを公開する。トークンの扱いを決める必要がある。',
      question: '認証情報の扱いとして最も適切なのは？',
      options: ['トークンをツールのdescriptionにサンプルとして書いておく','プロンプトにトークンを直接埋め込んでClaudeに渡す','会話ログに毎回トークンを出力して確認できるようにする','トークンはサーバー側の環境変数/シークレットストアで管理し、プロンプトやツール定義には載せない'],
      explanations: ['descriptionは共有・露出される。サンプルでも書いてはいけない。','プロンプト埋め込みは漏洩経路を増やす重大なアンチパターン。','会話ログへの出力は流出リスクそのもの。','秘密情報はサーバー側で安全に保持し、モデルに見せない＝正解。最小権限のトークンにするとなお良い。']
    },
    en: {
      scenario: 'You publish an MCP server that operates GitHub repositories and must decide how to handle the token.',
      question: 'What is the best way to handle credentials?',
      options: ['Put the token in the tool description as a sample','Embed the token directly in the prompt and pass it to Claude','Print the token to the conversation log each time for visibility','Keep the token in server-side environment variables / a secret store and never put it in prompts or tool definitions'],
      explanations: ['Descriptions are shared and exposed; never include a token even as a sample.','Embedding in the prompt multiplies leak paths — a serious anti-pattern.','Printing to logs is a leakage risk in itself.','Hold secrets securely server-side and never show them to the model — correct; using a least-privilege token is even better.']
    }
  },
  {
    id: 'tl-008', domain: 'tool', answer: 0,
    ja: {
      scenario: 'ファイルをパスで読むツール read_file を作る。Claudeが生成したパス文字列をそのままOSのファイルシステムに渡している。',
      question: '入力検証として最も適切なのは？',
      options: ['許可されたベースディレクトリ配下かを検証し、".."等のパストラバーサルを弾いてから読む','モデル出力は常に正しい前提でそのまま読む','パスが長すぎる時だけ拒否し、内容は検証しない','検証はクライアント側に任せ、サーバー側では何もしない'],
      explanations: ['許可範囲の検証とパストラバーサル防止＝モデル出力を鵜呑みにしない正しい入力検証。正解。','モデル出力をそのまま信用すると意図しないファイルへアクセスされる危険がある。','長さだけのチェックでは経路の不正は防げない。','検証をクライアント任せにすると、別経路の呼び出しで簡単に破られる。']
    },
    en: {
      scenario: 'You build a read_file tool that reads by path. Claude\'s generated path string is passed straight to the OS filesystem.',
      question: 'What is the best input validation?',
      options: ['Verify the path is under an allowed base directory and reject path traversal ("..") before reading','Assume model output is always correct and read it as-is','Reject only when the path is too long, without validating contents','Leave validation to the client and do nothing server-side'],
      explanations: ['Checking the allowed scope and blocking traversal is proper validation that does not trust model output — correct.','Trusting raw model output risks access to unintended files.','A length-only check cannot stop malicious paths.','Leaving validation to the client lets another call path bypass it easily.']
    }
  },
  {
    id: 'tl-009', domain: 'tool', answer: 1,
    ja: {
      scenario: '社内のドキュメント検索機能を、まず自社チャットアプリだけに独自実装で組み込んだ。半年後に別チームがClaude Codeからも同じ検索を使いたいと言ってきた。',
      question: '今後を見据えた方針として最も適切なのは？',
      options: ['チームごとに毎回ゼロから検索ツールを実装してもらう','検索機能をMCPサーバーとして標準化し、複数クライアントが同じ定義を再利用できるようにする','検索結果をスクリーンショットで送る運用にする','各チームにDB認証情報を配って直接叩いてもらう'],
      explanations: ['ゼロ実装の繰り返しは重複と挙動差を生む。スケールしない。','MCPで標準化すれば、自社アプリ・Claude Code・Claude Desktopなどから同一定義を再利用でき、保守も一元化＝正解。','スクショ運用は機械処理に向かず再利用できない。','認証情報の配布は最小権限・セキュリティに反する。']
    },
    en: {
      scenario: 'You first built internal document search as a custom implementation inside your own chat app. Six months later another team wants the same search from Claude Code.',
      question: 'What is the best forward-looking approach?',
      options: ['Have each team implement the search tool from scratch every time','Standardize search as an MCP server so multiple clients reuse the same definition','Switch to sending search results as screenshots','Hand the DB credentials to each team to query directly'],
      explanations: ['Repeated from-scratch builds create duplication and behavioral drift; it does not scale.','Standardizing via MCP lets your app, Claude Code, and Claude Desktop reuse one definition with centralized maintenance — correct.','Screenshots are not machine-processable and cannot be reused.','Distributing credentials violates least privilege and security.']
    }
  },
  {
    id: 'tl-010', domain: 'tool', answer: 2,
    ja: {
      scenario: '天気取得ツールの引数 location について、Claudeがときどき「東京」「Tokyo」「JP-13」など揺れた値を渡して失敗する。',
      question: 'schema/description の改善として最も適切なのは？',
      options: ['descriptionから引数の説明を削ってシンプルにする','どんな形式でも受け付けるよう検証を外す','期待する形式（例: ISO国コード+都市名、または許可された値のenum）と例をschema/descriptionに明記する','エラー時は黙って固定の都市を返すようにする'],
      explanations: ['説明を削ると揺れがさらに増える。','検証を外すと不正値が下流に流れて別の失敗を生む。','形式・許可値・具体例を明記すれば、Claudeが正しい引数を生成しやすくなる＝正解。enum化は特に有効。','黙って別都市を返すのはユーザーを誤誘導する。']
    },
    en: {
      scenario: 'For a weather tool\'s "location" argument, Claude sometimes passes inconsistent values like "東京", "Tokyo", or "JP-13" and the call fails.',
      question: 'What is the best schema/description improvement?',
      options: ['Remove the argument description to keep it simple','Drop validation so any format is accepted','Specify the expected format (e.g., ISO country code + city, or an enum of allowed values) with examples in the schema/description','Silently return a fixed city on error'],
      explanations: ['Removing the description increases inconsistency further.','Dropping validation lets bad values flow downstream and cause other failures.','Stating the format, allowed values, and concrete examples helps Claude generate correct arguments — correct; an enum is especially effective.','Silently returning another city misleads the user.']
    }
  },
  {
    id: 'tl-011', domain: 'tool', answer: 3,
    ja: {
      scenario: '送金ツール transfer_funds が、引数 amount に負の値やゼロ、巨大な値が来ても無検証でそのまま処理してしまう設計になっている。',
      question: 'ツール側の入力検証として最も適切なのは？',
      options: ['amountの検証はモデルが正しく生成するので不要とする','負の値が来たら絶対値に直して処理する','上限だけチェックし、下限と型は見ない','amountは正の数・型・上限/下限・通貨単位をツール側で検証し、不正なら構造化エラーを返す'],
      explanations: ['モデル出力を鵜呑みにする前提は危険。検証は必須。','勝手に絶対値変換すると意図と異なる送金になり事故になる。','上限だけでは負値やゼロ・型不一致をすり抜ける。','正値・型・範囲・単位をツール側で厳格に検証し不正は構造化エラーで返す＝正解。お金が絡む操作では特に重要。']
    },
    en: {
      scenario: 'A transfer_funds tool processes the "amount" argument with no validation, even for negative, zero, or huge values.',
      question: 'What is the best server-side input validation?',
      options: ['Skip amount validation since the model generates it correctly','Convert negatives to their absolute value and process','Check only an upper bound, ignoring lower bound and type','Validate that amount is positive, correctly typed, within min/max bounds, and has a currency unit; return a structured error if invalid'],
      explanations: ['Trusting model output blindly is dangerous; validation is mandatory.','Silently taking absolute value transfers a different amount than intended — an incident.','An upper bound alone lets negatives, zero, and type mismatches slip through.','Strictly validating positivity, type, range, and unit and returning a structured error is correct — especially critical for money operations.']
    }
  },
  {
    id: 'tl-012', domain: 'tool', answer: 0,
    ja: {
      scenario: 'メール送信ツール send_email のレスポンスを設計している。成功時も失敗時も返り値をどう設計するか。',
      question: 'Claudeが次の判断をしやすいレスポンス設計はどれか？',
      options: ['成功時は {status:"sent", id:"..."}、失敗時は {status:"error", code:"...", message:"...", retryable:bool} のように状態を構造化して返す','成功でも失敗でも常に "done" と返す','成功時のみ返し、失敗時は何も返さない','レスポンスを自然文の長い物語にして返す'],
      explanations: ['成功/失敗を構造化し、エラー種別・再試行可否を含めるとClaudeが次の手を選べる＝正解。','常に"done"では失敗が判別できず誤った継続を招く。','失敗時無応答は成功と区別できず危険。','長い自然文は機械的に判断しづらく、必要な情報が埋もれる。']
    },
    en: {
      scenario: 'You design the response of a send_email tool for both success and failure.',
      question: 'Which response design helps Claude decide its next step?',
      options: ['Return structured state: {status:"sent", id:"..."} on success and {status:"error", code:"...", message:"...", retryable:bool} on failure','Always return "done" whether it succeeded or failed','Return only on success and nothing on failure','Return a long narrative in natural language'],
      explanations: ['Structuring success/failure with error type and a retryable flag lets Claude choose its next action — correct.','Always "done" hides failure and invites wrong continuation.','No response on failure is indistinguishable from success and is dangerous.','A long narrative is hard to parse and buries the needed information.']
    }
  },
  {
    id: 'tl-013', domain: 'tool', answer: 2,
    ja: {
      scenario: '1つのMCPサーバーに、ファイル操作・カレンダー・決済・人事DB更新まであらゆる機能を詰め込み、すべてのクライアントに同じ全権限で公開している。',
      question: '権限設計として最も適切なのは？',
      options: ['1サーバーに全機能を集約したまま、全クライアントに全権限を渡す','権限の話は運用で口頭注意すれば十分とする','用途・信頼境界ごとにツール群を分け、各クライアントには必要最小限のツール/権限だけを公開する','読み取りも書き込みも区別せず一律で許可する'],
      explanations: ['全機能×全権限はひとつの侵害が全領域に波及する。最小権限に反する。','口頭注意は技術的な強制力がなく防御にならない。','信頼境界で分割し、各クライアントへ必要最小限だけ公開＝最小権限の原則に沿う正解。','読み書き無区別は危険操作を不必要に広く許可してしまう。']
    },
    en: {
      scenario: 'One MCP server packs file ops, calendar, payments, and HR-DB updates, and is exposed to all clients with the same full permissions.',
      question: 'What is the best permission design?',
      options: ['Keep all features in one server and grant every client full permissions','Just remind people verbally about permissions in operations','Separate tools by purpose and trust boundary, exposing only the minimum tools/permissions each client needs','Allow reads and writes uniformly without distinction'],
      explanations: ['Full features times full permissions means one breach spreads everywhere — violates least privilege.','Verbal reminders have no technical enforcement and are not a defense.','Splitting by trust boundary and exposing only the minimum per client follows least privilege — correct.','Not distinguishing read from write grants dangerous operations far too broadly.']
    }
  },
  {
    id: 'tl-014', domain: 'tool', answer: 1,
    ja: {
      scenario: '検索ツールが該当0件のとき、現状は架空のダミー結果を1件でっち上げて返している。Claudeはそれを本物として扱ってしまう。',
      question: '「0件」のレスポンス設計として最も適切なのは？',
      options: ['ダミー結果を返してとりあえず1件あるように見せる','{results:[], count:0} のように空であることを正直に構造化して返す','0件のときはエラーで落とす','0件のときは前回の検索結果をそのまま返す'],
      explanations: ['ダミーは捏造であり、モデルを誤った推論に誘導する重大な不正。','空集合を正直に返せばClaudeは「無かった」と正しく扱える＝正解。0件は失敗ではなく正常な状態。','0件は正常系。エラー化は過剰反応で回復を妨げる。','前回結果の流用は別クエリの混入で誤情報を生む。']
    },
    en: {
      scenario: 'When a search returns zero matches, the tool currently fabricates one fake result. Claude treats it as real.',
      question: 'What is the best response design for "zero results"?',
      options: ['Return a dummy result so there appears to be at least one','Honestly return an empty structured response like {results:[], count:0}','Crash with an error when there are zero results','Return the previous search\'s results when there are zero'],
      explanations: ['A dummy is fabrication that misleads the model into wrong reasoning — a serious defect.','Returning an honest empty set lets Claude correctly treat it as "none found" — correct; zero results is normal, not a failure.','Zero results is the normal case; erroring is an overreaction that blocks recovery.','Reusing prior results injects another query\'s data and produces misinformation.']
    }
  },
  {
    id: 'tl-015', domain: 'tool', answer: 3,
    ja: {
      scenario: '長時間かかるレポート生成ツールを設計中。同期で待たせるとタイムアウトし、Claudeはどう進めるべきか判断できない。',
      question: '設計として最も適切なのは？',
      options: ['必ず同期で最後まで待たせる（何分かかっても）','失敗を隠すため途中で空レスポンスを返す','タイムアウトしたら黙ってもう一度同じ重い処理を最初から走らせる','非同期にし、まず job_id を返して状態照会ツール（get_report_status）で進捗・完了を確認できるようにする'],
      explanations: ['長時間同期はタイムアウトを誘発し、Claudeが身動きできない。','空レスポンスは成功と誤認させる。','黙って再実行は負荷を倍にし、根本解決にならない。','job_idを返して状態照会できる非同期設計なら、Claudeが進捗確認や後続判断をできる＝正解。']
    },
    en: {
      scenario: 'You design a long-running report-generation tool. Synchronous waiting times out, leaving Claude unable to decide how to proceed.',
      question: 'What is the best design?',
      options: ['Always wait synchronously to the end, however many minutes it takes','Return an empty response midway to hide failures','Silently re-run the same heavy job from scratch on timeout','Make it async: return a job_id first and let a status tool (get_report_status) report progress and completion'],
      explanations: ['Long synchronous waits invite timeouts and leave Claude stuck.','An empty response misleads it into thinking it succeeded.','Silent re-runs double the load and fix nothing.','Returning a job_id with a status-query tool lets Claude check progress and decide next steps — correct.']
    }
  },
  {
    id: 'tl-016', domain: 'tool', answer: 0,
    ja: {
      scenario: '同じ「PDFを要約する」機能が、社内の3つのプロジェクトでそれぞれ別実装され、挙動も品質もバラバラになっている。',
      question: '最も適切な方針は？',
      options: ['共通のツール/MCPサーバーとして1か所に実装・標準化し、各プロジェクトはそれを再利用する','各プロジェクトでこれからも個別に作り続ける','一番新しい実装以外を削除し、再利用の仕組みは作らない','要約は人手でやる運用に戻す'],
      explanations: ['1か所に標準化して再利用すれば、品質・挙動が揃い保守も一元化できる＝正解。','個別実装の継続は重複と品質ばらつきを温存する。','古い実装を消すだけでは再利用の仕組みが無く、また別実装が生まれる。','人手回帰は自動化の価値を捨てる後退。']
    },
    en: {
      scenario: 'The same "summarize a PDF" capability is implemented separately in three internal projects, with inconsistent behavior and quality.',
      question: 'What is the best approach?',
      options: ['Implement and standardize it once as a shared tool/MCP server and have each project reuse it','Keep building it separately in each project going forward','Delete all but the newest implementation without creating a reuse mechanism','Revert to doing summaries manually'],
      explanations: ['Standardizing once and reusing aligns quality and behavior with centralized maintenance — correct.','Continued separate builds preserve duplication and quality drift.','Just deleting old ones leaves no reuse mechanism, so new variants reappear.','Reverting to manual abandons the value of automation.']
    }
  },
  {
    id: 'tl-017', domain: 'tool', answer: 2,
    ja: {
      scenario: 'ツールがDB接続失敗の例外を内部で catch し、何もログを残さず正常レスポンス形式で空データを返している。原因調査も再試行判断もできない。',
      question: '改善として最も適切なのは？',
      options: ['今のまま握りつぶしを続ける（ユーザーを驚かせないため）','例外時はスタックトレースをそのまま生でClaudeへ返す','エラーを握りつぶさず、ログに記録しつつ、種別・原因・再試行可否を含む構造化エラーをClaudeに返す','DB接続失敗時はランダムなサンプルデータを返す'],
      explanations: ['握りつぶしは失敗を隠し、誤った継続と調査不能を招く典型アンチパターン。','生スタックトレースは情報過多かつ内部詳細の漏洩リスク。要点を構造化すべき。','ログ記録＋構造化エラー返却で、運用は原因追跡でき、Claudeは再試行や代替を選べる＝正解。','ランダムデータは捏造で、誤情報を生む最悪の対応。']
    },
    en: {
      scenario: 'A tool catches a DB connection exception internally, logs nothing, and returns empty data in the normal response shape — so nobody can investigate or decide on retries.',
      question: 'What is the best improvement?',
      options: ['Keep swallowing it as-is (to avoid surprising the user)','Return the raw stack trace directly to Claude on exception','Stop swallowing: log the error and return a structured error to Claude with type, cause, and retryable flag','Return random sample data on DB connection failure'],
      explanations: ['Swallowing hides failure and causes wrong continuation and un-investigable incidents — a classic anti-pattern.','A raw stack trace is over-detailed and risks leaking internals; structure the essentials instead.','Logging plus a structured error lets operators trace the cause and lets Claude retry or fall back — correct.','Random data is fabrication and the worst response, producing misinformation.']
    }
  },
  {
    id: 'tl-018', domain: 'tool', answer: 1,
    ja: {
      scenario: 'カレンダーに予定を作る create_event と、予定を削除する delete_event を1つの manage_event ツールに統合しようとしている。delete は不可逆。',
      question: '責務分離・安全性の観点で最も適切なのは？',
      options: ['create と delete を1ツールに統合し、mode引数で切り替える','create_event と delete_event を別ツールに保ち、delete側に確認・対象明示などの安全策を個別に設ける','両方を削除し、ユーザーに手作業で運用させる','作成も削除も区別せず常に上書きする1ツールにする'],
      explanations: ['統合すると安全要件の異なる操作が混在し、削除に必要な防御を作成と共有できない。','責務（作成/削除）を分け、不可逆なdeleteに固有の安全策を付けるのが正解。粒度と防御を両立できる。','手作業回帰は自動化の利点を捨てる後退。','作成と削除を無区別の上書きにするのは破壊的で危険。']
    },
    en: {
      scenario: 'You want to merge create_event and delete_event into one manage_event tool. Deletion is irreversible.',
      question: 'What is best for separation of responsibility and safety?',
      options: ['Merge create and delete into one tool switched by a "mode" argument','Keep create_event and delete_event as separate tools and add delete-specific safeguards (confirmation, explicit target)','Remove both and have users do it manually','Make one tool that overwrites always, without distinguishing create from delete'],
      explanations: ['Merging mixes operations with different safety needs and cannot give delete its own required defenses.','Separating responsibilities and adding delete-specific safeguards to the irreversible action is correct, balancing granularity and protection.','Reverting to manual abandons the benefits of automation.','An undistinguished overwriting tool is destructive and dangerous.']
    }
  },
  {
    id: 'tl-019', domain: 'tool', answer: 3,
    ja: {
      scenario: 'チームメンバーがMCPサーバーに「マイナーアップデートだから」と既存ツールの引数の意味をこっそり変えた（amountを「円」から「セント」に変更）。description は更新していない。',
      question: '何が問題で、どうすべきか？',
      options: ['descriptionは飾りなので更新不要。実装だけ変えればよい','破壊的変更でもサイレントに出せばクライアントは勝手に追従する','引数の意味は自由に変えてよく、互換性は考えなくてよい','schemaは契約。意味を変えるのは破壊的変更なので、description/schemaを必ず更新し、必要なら版を分けて互換性に配慮する'],
      explanations: ['descriptionはモデルが従う契約の一部。未更新は誤呼び出しの直接原因。','サイレントな破壊的変更は既存クライアントを壊す。','互換性無視は再利用基盤としてのMCPの価値を損なう。','schema/descriptionは契約であり、意味変更は破壊的。定義を更新し版管理で互換性を守るのが正解。']
    },
    en: {
      scenario: 'A teammate quietly changed an existing tool\'s argument meaning ("amount" from yen to cents) on the MCP server as a "minor update," without updating the description.',
      question: 'What is the problem and what should be done?',
      options: ['Descriptions are cosmetic and need no update; just change the implementation','Even breaking changes can ship silently; clients will follow automatically','Argument meaning can change freely; compatibility need not be considered','A schema is a contract: changing meaning is a breaking change, so update the description/schema and version it to preserve compatibility'],
      explanations: ['The description is part of the contract the model follows; not updating it directly causes wrong calls.','Silent breaking changes break existing clients.','Ignoring compatibility undermines MCP\'s value as a reusable foundation.','The schema/description is a contract; a meaning change is breaking, so update the definition and version it — correct.']
    }
  },
  {
    id: 'tl-020', domain: 'tool', answer: 0,
    ja: {
      scenario: 'ツール run_shell_command が任意のシェルコマンドを無制限に実行できる設計で、Claudeの出力をそのまま実行している。',
      question: 'セキュリティ・最小権限の観点で最も適切なのは？',
      options: ['必要な操作だけを行う限定ツール（例: list_files / read_log）に分け、任意コマンド実行の権限は与えない','description に「危険なので注意」と書けば任意実行のままで安全','sudo を付けて常に管理者権限で実行させる','実行前後で何も検証せず、ログも残さない'],
      explanations: ['汎用シェル実行は権限過多。必要な操作に限定したツールへ分割するのが最小権限に沿う正解。','注意書きだけでは技術的な制限にならず、依然として任意実行のリスクが残る。','常時sudoは権限を最大化する最悪の選択。','検証もログも無いと事故検知も追跡もできない。']
    },
    en: {
      scenario: 'A run_shell_command tool can execute arbitrary shell commands without limits, running Claude\'s output as-is.',
      question: 'What is best for security and least privilege?',
      options: ['Split into narrow tools that do only what is needed (e.g., list_files / read_log) and grant no arbitrary-execution permission','Keep arbitrary execution but write "this is dangerous" in the description','Always run with sudo as administrator','Validate nothing before/after and keep no logs'],
      explanations: ['A general shell is over-privileged; splitting into narrow, purpose-limited tools follows least privilege — correct.','A warning is not a technical limit; the arbitrary-execution risk remains.','Always using sudo maximizes privilege — the worst choice.','Without validation or logs you cannot detect or trace incidents.']
    }
  },
  {
    id: 'tl-021', domain: 'tool', answer: 2,
    ja: {
      scenario: 'ツールの戻り値が巨大なJSON全体（数万トークン）で、その大半は今回の判断に不要なメタデータ。コンテキストを圧迫しClaudeが要点を見失う。',
      question: 'レスポンス設計として最も適切なのは？',
      options: ['常に生データ全件を返すのが誠実なので変えない','戻り値を画像化してトークンを節約する','タスクに必要なフィールドに絞り、件数上限・要約・ページングなどで返す情報量を適切に制御する','戻り値を全部省いてClaudeに推測させる'],
      explanations: ['全件返しはコンテキストを浪費し、要点を埋もれさせる。誠実さの問題ではない。','画像化は機械処理に不向きで、Claudeが値を正確に扱えなくなる。','必要フィールドへの絞り込み・上限・ページングで情報量を制御するのが、有用性と効率を両立する正解。','省略しすぎは推測（ハルシネーション）を誘発する。']
    },
    en: {
      scenario: 'A tool returns a huge JSON (tens of thousands of tokens), mostly metadata irrelevant to the current decision. It crowds the context and Claude loses the point.',
      question: 'What is the best response design?',
      options: ['Always return the full raw data because it is the honest thing to do','Render the return value as an image to save tokens','Return only the fields the task needs, controlling volume with row limits, summaries, and paging','Omit the return value entirely and let Claude guess'],
      explanations: ['Returning everything wastes context and buries the point; this is not about honesty.','Imaging is unfit for machine processing and stops Claude from handling values accurately.','Narrowing to needed fields with limits and paging balances usefulness and efficiency — correct.','Over-omitting induces guessing (hallucination).']
    }
  },
  {
    id: 'tl-022', domain: 'tool', answer: 1,
    ja: {
      scenario: '社内のMCPサーバーが100個近いツールを一度に公開しており、Claudeはどれを使うべきか迷い、似た名前のツールを取り違える。',
      question: '改善として最も適切なのは？',
      options: ['ツールをさらに増やして網羅性を高める','タスクに関連するツールだけを公開し、名前と description を区別が付くよう明確にして、関連する単位でまとめる','すべてのツール名を tool1, tool2... と連番にする','description を全ツール同一文にして統一感を出す'],
      explanations: ['ツールを増やすほど選択が難しくなり、取り違えが悪化する。','関連ツールに絞り、名前・descriptionを判別しやすくまとめるのが選択ミスを減らす正解。','連番名は意味を消し、誤用を増やす。','同一descriptionは区別不能にし、誤呼び出しを助長する。']
    },
    en: {
      scenario: 'An internal MCP server exposes nearly 100 tools at once; Claude struggles to pick the right one and confuses similarly named tools.',
      question: 'What is the best improvement?',
      options: ['Add even more tools for completeness','Expose only the tools relevant to the task, make names and descriptions clearly distinguishable, and group them by relevance','Rename every tool to tool1, tool2, ... sequentially','Make every tool\'s description an identical sentence for consistency'],
      explanations: ['More tools make selection harder and worsen mix-ups.','Narrowing to relevant tools with distinguishable names/descriptions reduces selection errors — correct.','Sequential names erase meaning and increase misuse.','Identical descriptions make tools indistinguishable and encourage wrong calls.']
    }
  },
  {
    id: 'tl-023', domain: 'tool', answer: 3,
    ja: {
      scenario: 'リモートのMCPサーバーをチーム外の不特定多数に公開しようとしている。認証なしで誰でもツールを呼べる状態。',
      question: 'アクセス制御として最も適切なのは？',
      options: ['公開なので認証は不要、誰でも呼べてよい','IPだけで判断し、認証は省略する','危険な操作にだけ認証を付け、読み取りは誰でも可とする','サーバー側で適切な認証・認可を行い、呼び出し元と権限を検証してから各ツールを実行する'],
      explanations: ['無認証公開は誰でも操作・データ取得でき重大なリスク。','IPのみは偽装に弱く、本人性・権限を担保できない。','読み取りも情報資産。無認証の読み取り開放は情報漏洩につながる。','サーバー側で認証・認可し、呼び出し元と権限を検証してから実行するのが正解。最小権限と組み合わせる。']
    },
    en: {
      scenario: 'You are about to expose a remote MCP server to an unbounded audience outside your team, with no authentication — anyone can call the tools.',
      question: 'What is the best access control?',
      options: ['Since it is public, no auth is needed; anyone may call it','Judge by IP only and skip authentication','Require auth only for dangerous operations and let anyone read','Perform proper authentication/authorization server-side, verifying the caller and permissions before executing each tool'],
      explanations: ['No-auth exposure lets anyone act and read — a serious risk.','IP alone is spoofable and cannot guarantee identity or permissions.','Reads are also assets; unauthenticated read access leaks information.','Authenticating and authorizing server-side and verifying caller/permissions before execution is correct, combined with least privilege.']
    }
  },
  {
    id: 'tl-024', domain: 'tool', answer: 0,
    ja: {
      scenario: 'ツール get_user の引数 user_id について、存在しないIDが来たときの挙動が未定義で、Claudeはエラーかデータ無しか判別できない。',
      question: 'レスポンス設計として最も適切なのは？',
      options: ['「該当ユーザー無し」を {found:false} のように明示的・構造化して返し、システム障害（接続失敗等）とは区別する','存在しないIDでも適当なダミーユーザーを返す','存在しないIDは常にシステムエラー扱いで落とす','何も返さずClaudeに存在有無を推測させる'],
      explanations: ['「該当無し（正常）」と「障害（異常）」を区別して構造化するのが正解。Claudeが正しく分岐できる。','ダミー返却は捏造で誤情報を生む。','存在しないIDは正常系。一律エラー化は障害と混同させ判断を誤らせる。','無応答は推測を誘発し信頼性を損なう。']
    },
    en: {
      scenario: 'For get_user\'s user_id argument, behavior on a nonexistent ID is undefined, so Claude cannot tell error from no-data.',
      question: 'What is the best response design?',
      options: ['Return "no such user" explicitly and structured, e.g., {found:false}, distinct from system failures (e.g., connection errors)','Return some dummy user even for a nonexistent ID','Always treat a nonexistent ID as a system error and crash','Return nothing and let Claude guess whether the user exists'],
      explanations: ['Distinguishing "not found (normal)" from "failure (abnormal)" in a structured way is correct so Claude can branch properly.','Returning a dummy is fabrication that produces misinformation.','A nonexistent ID is the normal case; erroring conflates it with failures and misleads decisions.','No response induces guessing and hurts reliability.']
    }
  },
  {
    id: 'tl-025', domain: 'tool', answer: 2,
    ja: {
      scenario: '会議メモを保存するツールを作る。Claudeが生成した本文をそのままDBに保存する設計で、文字数上限・必須項目・型の検証がない。空のタイトルや巨大本文が入る事故が起きた。',
      question: 'ツール側の入力検証として最も適切なのは？',
      options: ['モデルが整形済みのはずなので検証は不要','保存後に問題があれば人手で直す前提で無検証にする','必須項目（タイトル等）・型・最大長などをツール側で検証し、不正なら保存せず構造化エラーを返す','どんな入力でも保存し、壊れたデータは後で一括削除する'],
      explanations: ['モデル出力を鵜呑みにする前提は事故の原因。検証は必須。','人手修正前提は運用負荷を増やし、根本対策にならない。','必須項目・型・長さをツール側で検証し、不正は保存せず構造化エラー＝モデル出力を信用しすぎない正しい設計。','無検証保存はデータ品質を壊し、後始末コストを増やす。']
    },
    en: {
      scenario: 'You build a tool to save meeting notes. It stores Claude\'s generated body straight into the DB with no length, required-field, or type validation, and incidents occurred with empty titles and huge bodies.',
      question: 'What is the best server-side input validation?',
      options: ['No validation needed since the model already formats it','Skip validation, assuming humans will fix problems after saving','Validate required fields (e.g., title), types, and max lengths server-side; reject and return a structured error if invalid','Save any input and bulk-delete corrupted data later'],
      explanations: ['Trusting model output blindly causes incidents; validation is mandatory.','Relying on manual fixes adds operational load and is not a root fix.','Validating required fields, types, and lengths and rejecting invalid input is correct — it avoids over-trusting model output.','Saving without validation corrupts data quality and raises cleanup costs.']
    }
  },
  {
    id: 'tl-026', domain: 'tool', answer: 1,
    ja: {
      scenario: '同じ「Slackにメッセージを送る」機能を、Claude DesktopとClaude Codeと自社バッチの3か所で別々に実装した。チャンネルID指定の仕様が三者三様で、片方を直しても他に反映されない。',
      question: '最も適切な方針は？',
      options: ['それぞれ独立に保守し続け、差異は都度すり合わせる','送信機能を1つのMCPサーバー（または共通ツール）として標準化し、3つのクライアントから同一定義を再利用する','一番使われている1か所だけ残し、他は手作業送信に戻す','チャンネルIDの仕様を毎回プロンプトで個別指示する'],
      explanations: ['独立保守は差異と修正漏れを生み続ける。スケールしない。','送信機能を標準化して再利用すれば、仕様が一本化され修正も一度で全クライアントに行き渡る＝正解。','手作業回帰は自動化の利点を捨てる後退。','プロンプトで毎回個別指示は属人化し、仕様ぶれを助長する。']
    },
    en: {
      scenario: 'The same "send a Slack message" capability is implemented separately in Claude Desktop, Claude Code, and your own batch job. The channel-ID spec differs across all three, and fixing one does not propagate.',
      question: 'What is the best approach?',
      options: ['Keep maintaining each independently and reconcile differences case by case','Standardize sending as one MCP server (or shared tool) and reuse the same definition from all three clients','Keep only the most-used one and revert the others to manual sending','Specify the channel-ID spec individually in the prompt every time'],
      explanations: ['Independent maintenance keeps producing drift and missed fixes; it does not scale.','Standardizing and reusing unifies the spec so one fix reaches all clients — correct.','Reverting to manual abandons the benefits of automation.','Per-prompt instructions make it person-dependent and worsen spec drift.']
    }
  },
  {
    id: 'tl-027', domain: 'tool', answer: 3,
    ja: {
      scenario: '本番環境にデプロイする deploy_to_production ツールを設計中。実行すると即座に全ユーザーへ反映される不可逆かつ高影響な操作。',
      question: '安全設計として最も適切なのは？',
      options: ['誰でも引数1つで即デプロイできるようにして手軽さを優先する','失敗してもロールバック手段は用意しない','デプロイのログは取らず、結果も返さない','明示的な対象・確認ステップ・適切な権限チェックを必須にし、結果を構造化して返し、失敗時に回復できる導線（ロールバックや状態確認）を用意する'],
      explanations: ['高影響操作を確認なしで即実行できるのは事故の温床。','ロールバック無しは失敗時に被害を拡大させる。','ログ・結果無しでは事故検知も原因究明も復旧判断もできない。','対象明示・確認・権限チェック＋構造化結果＋回復導線をそろえるのが、不可逆・高影響操作の正しい安全設計＝正解。']
    },
    en: {
      scenario: 'You design a deploy_to_production tool. Running it instantly affects all users — an irreversible, high-impact operation.',
      question: 'What is the best safety design?',
      options: ['Let anyone deploy instantly with a single argument, prioritizing convenience','Provide no rollback path even if it fails','Keep no deployment logs and return no result','Require an explicit target, a confirmation step, and proper permission checks; return a structured result; and provide a recovery path (rollback or status check) on failure'],
      explanations: ['Letting a high-impact action run instantly without confirmation is a breeding ground for incidents.','No rollback amplifies damage on failure.','Without logs or results you cannot detect, diagnose, or decide on recovery.','Explicit target, confirmation, permission checks, structured results, and a recovery path are the correct safety design for irreversible, high-impact operations — correct.']
    }
  }
);
