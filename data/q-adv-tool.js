// CCA-F domain: tool (ツール設計・MCP連携 / Tool Design & MCP Integration) — advanced 9 questions
window.QUESTIONS.push(
  {
    id: 'tl-adv-001', domain: 'tool', answer: 2, level: 'advanced',
    ja: {
      scenario: '社内インフラ操作用に execute_command という1つの汎用ツールを公開した。任意のシェルコマンドを文字列で受け取り、サーバーで実行して標準出力を返す。当初は「ログ確認やディスク使用量の確認に便利」という理由で広く作ったが、ある日Claudeがディスク逼迫を「解決」しようとして rm を含むコマンドを生成し、本番のログディレクトリを消した。description には「破壊的コマンドは使わないこと」と注意書きを足したが、別の状況で再発した。',
      question: '再発を構造的に防ぐ設計として最も適切なのは？',
      options: ['descriptionの注意書きをさらに詳しくし、禁止コマンドの一覧を列挙してClaudeに守らせる','汎用のexecute_commandは残しつつ、実行前にClaudeへ「本当に実行してよいか」を毎回自己確認させる','用途を満たす最小限の専用ツール（get_disk_usage / tail_logs など読み取り専用）に分割し、汎用シェル実行ツール自体を撤去する','execute_commandの戻り値に実行コマンドのログを必ず含め、事後に人がレビューできるようにする'],
      explanations: ['禁止リストをdescriptionに書いても、列挙漏れや言い換えで容易にすり抜ける。注意書きは権限境界の代わりにならない。','モデル自身の自己確認は当てにできず、巨大な権限を残したままでは同じ事故が起きる。','必要な操作を満たす最小権限の読み取り専用ツールに分割し、任意コマンド実行という過大な権限を撤去するのが構造的な正解（最小権限の原則）。','事後ログは検知には役立つが、破壊が起きた後では遅い。権限を絞っていない根本問題が残る。']
    },
    en: {
      scenario: 'For internal infra ops you exposed one general-purpose execute_command tool that takes any shell command string, runs it on a server, and returns stdout. It was built broadly because "it is handy for checking logs and disk usage." One day Claude, trying to "fix" a full disk, generated a command with rm and wiped the production log directory. You added "never use destructive commands" to the description, but it recurred in another situation.',
      question: 'What design structurally prevents recurrence?',
      options: ['Expand the description caveats further and enumerate a banned-command list for Claude to obey','Keep the general execute_command but make Claude self-confirm "is it really safe to run this?" before every execution','Split into minimal purpose-built read-only tools (get_disk_usage / tail_logs etc.) and remove the general shell-execution tool entirely','Always include the executed command in execute_command\'s return so a human can review it afterward'],
      explanations: ['A banned list in the description is easily bypassed by omissions or rephrasing; caveats are no substitute for a permission boundary.','Model self-confirmation is unreliable, and leaving a huge capability in place reproduces the same incident.','Splitting into minimal read-only tools that satisfy the actual need and removing the over-broad arbitrary-execution capability is the structural fix (principle of least privilege).','After-the-fact logs aid detection but arrive too late once damage is done; the unscoped-privilege root cause remains.']
    }
  },
  {
    id: 'tl-adv-002', domain: 'tool', answer: 1, level: 'advanced',
    ja: {
      scenario: 'create_invoice ツールは外部の請求サービスに新規請求書を作成する。ネットワークが不安定な顧客環境で、Claudeのエージェントループがツールのタイムアウト後にリトライを行うと、実際には1回目の作成が成功していたために請求書が二重に発行される事故が起きた。開発チームは「リトライ回数を1回に減らす」「タイムアウトを長くする」案を出している。',
      question: '二重発行を最も確実に防ぐ設計は？',
      options: ['リトライ回数を最大1回に制限し、タイムアウトも長めにしてリトライが起きにくくする','クライアントが生成した idempotency_key を引数で受け取り、同一キーの作成は1件として扱い、再送時は既存の請求書を返す','create_invoiceの直後に list_invoices を呼んで重複があれば自動で1件削除する後処理をエージェントに必須化する','タイムアウト時はツールが例外で停止し、人手で状態を確認してから手動で作り直す運用にする'],
      explanations: ['リトライを減らしても、一度でも再送が起きれば二重発行は起きる。発生確率を下げるだけで構造的防御にならない。','冪等キーを受け取り、同一キーの再送を1件として扱うのが二重実行を構造的に防ぐ正解。タイムアウト後の安全なリトライが可能になる。','削除による後処理は、どちらが正本かの判定や競合で新たな事故を生みやすく、不可逆操作（削除）を増やすだけ。','人手運用は自動リトライの利点を捨て、可用性とスループットを大きく損なう。']
    },
    en: {
      scenario: 'The create_invoice tool creates a new invoice in an external billing service. In a customer environment with flaky networking, when Claude\'s agent loop retries after a tool timeout, the invoice gets issued twice because the first creation had actually succeeded. The team proposes "cap retries at one" and "increase the timeout."',
      question: 'What design most reliably prevents duplicate issuance?',
      options: ['Limit retries to at most one and lengthen the timeout so retries are less likely','Accept a client-generated idempotency_key argument, treat same-key creations as one, and return the existing invoice on resend','Require the agent to call list_invoices right after create_invoice and auto-delete one if a duplicate is found','On timeout, have the tool stop with an exception and switch to a human-verifies-then-recreates manual process'],
      explanations: ['Fewer retries still produce a duplicate if a resend ever happens; this only lowers probability, not a structural defense.','Accepting an idempotency key and collapsing same-key resends into one is the structural fix against double execution, enabling safe retry after timeout.','Cleanup by deletion easily spawns new incidents over which record is canonical and merely adds an irreversible delete operation.','A manual process discards the benefit of auto-retry and badly hurts availability and throughput.']
    }
  },
  {
    id: 'tl-adv-003', domain: 'tool', answer: 3, level: 'advanced',
    ja: {
      scenario: 'search_knowledge_base ツールは社内ドキュメントを全文検索する。ヒット件数が多い質問では、マッチした全文書の本文をすべて連結して返すため、1回の呼び出しで数万トークンが返り、Claudeのコンテキストを圧迫して以降の推論が劣化する。担当者は「コンテキストウィンドウが大きいモデルに変えれば解決する」と考えている。',
      question: 'ツール設計として最も適切な対処は？',
      options: ['より大きいコンテキストウィンドウのモデルに切り替え、全文をそのまま返し続ける','返却前にツール内でレスポンス全体をClaudeに要約させ、要約だけを返す','全文書をそのまま返すが、Claudeに「長すぎる結果は読み飛ばしてよい」とシステムプロンプトで指示する','ページネーション（limit/offset または cursor）と1件あたりの抜粋・最大返却サイズ上限を設け、必要に応じて追加取得させる'],
      explanations: ['モデルを大きくしても、無制御な巨大レスポンスは早晩また溢れ、コストと劣化も増える。根本対処ではない。','返却前に別途要約を挟むのは設計が複雑になり、ツール内で勝手に情報を落とすと検索の正確性を損なう。','読み飛ばし指示は不確実で、巨大な結果がコンテキストに載る問題自体は解消しない。','ページネーションと抜粋・最大サイズ上限でレスポンスサイズを制御し、必要分だけ取得させるのが、コンテキストを保護する正攻法。']
    },
    en: {
      scenario: 'The search_knowledge_base tool full-text searches internal docs. For broad queries it concatenates the full body of every matched document, so a single call returns tens of thousands of tokens, crowding Claude\'s context and degrading subsequent reasoning. The owner thinks "switching to a model with a bigger context window fixes it."',
      question: 'What tool-design fix is most appropriate?',
      options: ['Switch to a larger-context model and keep returning full bodies as-is','Have Claude summarize the entire response inside the tool before returning, and return only the summary','Return all full documents but instruct Claude in the system prompt that it may skip overly long results','Add pagination (limit/offset or cursor), per-hit snippets, and a max response-size cap, letting it fetch more only as needed'],
      explanations: ['A bigger model still overflows eventually with uncontrolled giant responses, raising cost and degradation; not a root fix.','Inserting a separate pre-return summarization complicates design, and silently dropping info inside the tool harms search accuracy.','A skip instruction is unreliable and does not stop the giant result from loading into context.','Controlling response size via pagination, snippets, and a max-size cap and fetching only what is needed is the proper way to protect context.']
    }
  },
  {
    id: 'tl-adv-004', domain: 'tool', answer: 0, level: 'advanced',
    ja: {
      scenario: 'カスタマーサポート用のMCPサーバーを1つ立て、そこに「注文照会」「返金実行」「ユーザーDB全件エクスポート」「管理者権限ユーザー作成」まで全機能を相乗りで実装した。このMCPサーバーは社内チャットボット・公開デモ・外部委託先のツールなど複数クライアントから同じ認証情報で接続される。監査で「外部委託先からでも管理者作成が呼べる状態」が問題視された。',
      question: 'MCPサーバーの責務・権限設計として最も適切なのは？',
      options: ['機能を責務と必要権限ごとに別サーバー／別スコープに分け、各クライアントには最小限の権限のツールだけを公開する','1つのサーバーは維持し、危険な操作のdescriptionに「外部からは呼ばないこと」と明記して運用で守らせる','すべてのクライアントで共有している認証情報を定期的にローテーションして使い回しを続ける','管理者作成ツールだけ引数に管理者パスワードを必須化し、それ以外の構成は変えない'],
      explanations: ['責務・必要権限ごとにサーバー/スコープを分割し、各クライアントへ最小権限のツールだけ公開するのが正解。委託先から管理者作成が見えること自体を構造的に防ぐ。','descriptionの注意書きは権限境界ではなく、共有接続では容易に踏み越えられる。','認証情報のローテーションは漏洩対策であって、過大な権限が全クライアントに開いている問題を解決しない。','パスワード引数は秘密情報をツール経路に流すうえ、他の危険機能が露出したままで部分対処にすぎない。']
    },
    en: {
      scenario: 'You stood up a single customer-support MCP server and piled every capability into it: order lookup, refund execution, full user-DB export, and admin-user creation. Multiple clients — an internal chatbot, a public demo, and an outside contractor\'s tooling — connect to it with the same credentials. An audit flagged that "even the contractor can invoke admin creation."',
      question: 'What is the best responsibility/permission design for the MCP server?',
      options: ['Split capabilities into separate servers/scopes by responsibility and required privilege, exposing only minimal-privilege tools to each client','Keep one server and write "do not call from outside" in the dangerous tools\' descriptions to enforce by policy','Keep sharing one credential across all clients but rotate it periodically','Require an admin password argument only on the admin-creation tool and leave everything else unchanged'],
      explanations: ['Splitting by responsibility/required privilege into separate servers or scopes and exposing only least-privilege tools per client is correct, structurally preventing the contractor from even seeing admin creation.','A description caveat is not a permission boundary and is trivially crossed on a shared connection.','Credential rotation addresses leakage, not the fact that over-broad privileges are open to all clients.','A password argument funnels a secret through the tool path and is partial — other dangerous capabilities stay exposed.']
    }
  },
  {
    id: 'tl-adv-005', domain: 'tool', answer: 2, level: 'advanced',
    ja: {
      scenario: 'transfer_funds ツールは口座間送金を行う。引数は amount（数値）と currency（文字列）と to_account。ある呼び出しで amount に "1,250.00" という文字列、currency に "usd"、さらに別の呼び出しで amount に -500 が渡され、いずれもそのまま外部APIに送られて未定義動作や逆方向送金が起きた。チームは「Claude側のプロンプトで桁・符号・通貨表記を毎回しっかり指示すればよい」と考えている。',
      question: '金銭を扱うツールの設計として最も適切なのは？',
      options: ['プロンプトで「正の整数・小数2桁・大文字3字の通貨コードで渡すこと」と毎回強く指示し、ツール側は変更しない','amountの単位をドルから「セント（最小単位の整数）」に変えるが、検証はせず受け取った値をそのまま送る','ツール側で入力検証を必須化する：amountは正の数値・許容範囲・通貨ごとの最小単位、currencyはISOコードのホワイトリスト、不正なら構造化エラーで拒否する','金額をすべて文字列で受け取り、外部APIに渡す直前で文字列のまま連結して送る'],
      explanations: ['プロンプト指示は確率的で破られる。金銭の安全性を生成側の従順さに依存させてはいけない。','単位をセントにするのは妥当でも、検証を省けば負値や範囲外・通貨不整合をそのまま通してしまう。','型・範囲・通貨ごとの最小単位・通貨コードのホワイトリストをツール側で検証し、不正は構造化エラーで拒否するのが正解。金銭やPIIは境界で守る。','文字列のまま連結は型崩れ・桁区切り混入・インジェクションの温床で、最も危険。']
    },
    en: {
      scenario: 'The transfer_funds tool moves money between accounts. Its arguments are amount (number), currency (string), and to_account. In one call amount arrived as the string "1,250.00" with currency "usd"; in another, amount was -500. Both were passed straight to the external API, causing undefined behavior and a reverse transfer. The team thinks "just prompt Claude carefully every time about digits, sign, and currency format."',
      question: 'What is the best design for a money-handling tool?',
      options: ['Strongly prompt every time to "pass a positive integer, two decimals, and an uppercase 3-letter currency code" and leave the tool unchanged','Change amount\'s unit from dollars to cents (integer minor units) but skip validation and forward the received value as-is','Make the tool enforce input validation: amount positive and within an allowed range and the currency\'s minor unit, currency from an ISO whitelist, rejecting invalid input with a structured error','Accept all amounts as strings and concatenate them as strings just before sending to the external API'],
      explanations: ['Prompt instructions are probabilistic and get violated; financial safety must not depend on the generator\'s compliance.','Switching to cents is reasonable, but skipping validation still lets negatives, out-of-range, or currency mismatches through.','Validating type, range, the currency\'s minor unit, and a currency-code whitelist in the tool and rejecting invalid input with a structured error is correct — guard money and PII at the boundary.','Keeping amounts as concatenated strings invites type breakage, separators, and injection — the most dangerous.']
    }
  },
  {
    id: 'tl-adv-006', domain: 'tool', answer: 1, level: 'advanced',
    ja: {
      scenario: 'call_partner_api ツールはパートナーのREST APIを呼ぶ。動作させるために、ツール定義（schema/description）の中に固定値として APIキーとベアラートークンを直書きし、Claudeがそれを引数として渡す実装にしている。レビューで、ツール定義はプロンプトとしてモデルへ渡され、ログや会話履歴・エラーメッセージに残り得ると指摘された。',
      question: '認証情報の扱いとして最も適切なのは？',
      options: ['APIキーをツールのdescriptionから消し、代わりにシステムプロンプト冒頭に置いてClaudeに必要時だけ使わせる','認証情報はモデルに渡さず、ツール実行を担うサーバー側がsecret store／環境変数から読み込んで付与し、ツール定義・引数には一切含めない','APIキーをBase64でエンコードしてツール定義に埋め込み、見た目で鍵と分からないようにする','Claudeに毎回ユーザーからAPIキーを聞き出させ、引数として受け取って外部APIに渡す'],
      explanations: ['システムプロンプトに置いても結局モデルのコンテキスト＝プロンプト/ログに露出する。場所を移しただけ。','認証情報はモデルに渡さず、実行サーバーがsecret store/環境変数から注入し、ツール定義・引数に含めないのが正解。最小権限と秘密の非露出を両立する。','Base64は暗号化ではなく単なるエンコード。誰でも復号でき、秘密の保護にならない。','ユーザーから鍵を聞き出して引数で流すと、会話・ログに平文の秘密が残り危険。']
    },
    en: {
      scenario: 'The call_partner_api tool calls a partner REST API. To make it work, the API key and a bearer token are hard-coded as fixed values inside the tool definition (schema/description), and Claude passes them as arguments. A review noted that tool definitions are fed to the model as prompt and can persist in logs, conversation history, and error messages.',
      question: 'What is the best way to handle the credentials?',
      options: ['Remove the API key from the tool description and put it at the top of the system prompt instead, for Claude to use only when needed','Do not pass credentials to the model; have the server executing the tool read them from a secret store/env vars and attach them, keeping them out of the tool definition and arguments entirely','Base64-encode the API key and embed it in the tool definition so it does not look like a key','Have Claude ask the user for the API key each time and pass it as an argument to the external API'],
      explanations: ['Putting it in the system prompt still exposes it via the model\'s context — prompt and logs; it just moves location.','Keeping credentials out of the model and having the executing server inject them from a secret store/env vars, excluding them from the definition and arguments, is correct — least privilege plus secret non-exposure.','Base64 is encoding, not encryption; anyone can decode it, so it does not protect the secret.','Eliciting the key from the user and passing it as an argument leaves the plaintext secret in conversation and logs — dangerous.']
    }
  },
  {
    id: 'tl-adv-007', domain: 'tool', answer: 3, level: 'advanced',
    ja: {
      scenario: 'send_broadcast_email ツールは指定セグメントの全ユーザーへ一括メールを送る。一度送ると取り消せない。あるエージェントワークフローで、Claudeが「テスト配信」のつもりで segment="all_users" を渡し、本番の全顧客10万人へ未完成のメールが配信される事故が起きた。配信自体はツールとして必要で、止めるわけにはいかない。',
      question: '不可逆な一括操作のツール設計として最も適切なのは？',
      options: ['送信前にClaude自身に「これは本当に送ってよいか」を1問だけ自己確認させ、yesなら送る','segmentに all_users が来たときだけ自動でテスト用の小セグメントに置き換えてから送る','description に「テスト時は本番セグメントを使わないこと」と明記し、Claudeの順守に任せる','大量配信・不可逆という性質に応じ、人間の明示的な確認ゲート（承認）を必須にし、対象件数・セグメント・プレビューを提示してから実行、ドライラン／プレビュー専用の別ツールも用意する'],
      explanations: ['モデルの自己確認は当てにならず、不可逆かつ高影響な操作をモデル単独の判断に委ねてはいけない。','勝手にセグメントを置換すると、本当に全員へ送りたい正当なケースを壊し、挙動が予測不能になる。','descriptionの注意書きは強制力がなく、今回のような誤指定を防げない。','不可逆・高影響の一括操作には人間の確認ゲート（件数・対象・プレビュー提示後の承認）を必須化し、ドライラン用ツールも分けるのが正解。']
    },
    en: {
      scenario: 'The send_broadcast_email tool blasts an email to all users in a given segment. Once sent, it cannot be undone. In one agent workflow Claude, intending a "test send," passed segment="all_users", and an unfinished email went to all 100,000 production customers. Broadcasting is a needed capability, so you cannot simply remove it.',
      question: 'What is the best design for an irreversible bulk operation?',
      options: ['Have Claude self-confirm once, "is it really OK to send?", and send if yes','Auto-replace the segment with a small test segment whenever all_users is passed, then send','Write "do not use the production segment for tests" in the description and rely on Claude\'s compliance','Per its irreversible, high-impact nature, require a human confirmation gate (approval), present the recipient count/segment/preview before executing, and provide a separate dry-run/preview-only tool'],
      explanations: ['Model self-confirmation is unreliable; an irreversible, high-impact action must not be left to the model\'s judgment alone.','Silently swapping the segment breaks legitimate true-broadcast cases and makes behavior unpredictable.','A description caveat is unenforceable and would not prevent this kind of misspecification.','Requiring a human confirmation gate (approval after showing count/target/preview) and a separate dry-run tool for irreversible, high-impact bulk ops is correct.']
    }
  },
  {
    id: 'tl-adv-008', domain: 'tool', answer: 0, level: 'advanced',
    ja: {
      scenario: 'fetch_order ツールが外部の注文APIを呼ぶ。注文が見つからない・APIが認証エラー・レート制限・サーバー障害など、状況の異なる失敗をすべて「null を返す」で握りつぶしている。Claudeは null を見て「注文は存在しない」と毎回断定し、認証切れやレート制限のときでも顧客に「ご注文は確認できませんでした」と誤回答してしまう。',
      question: 'エラー設計として最も適切なのは？',
      options: ['失敗を種別ごとに区別した構造化エラー（not_found / unauthorized / rate_limited / upstream_error と retryable フラグ・人間可読メッセージ）を返し、Claudeが状況に応じて再試行・エスカレーション・正しい回答を選べるようにする','失敗時はすべて例外を投げてエージェントループを停止させ、必ず人手で対応させる','nullの代わりに空のオブジェクト {} を返すように変え、Claudeには「{}なら未確定」と推測させる','失敗種別に関わらず「現在ご注文を確認できません。後ほどお試しください」という固定文字列を常に返す'],
      explanations: ['失敗種別を区別した構造化エラー（種別・retryable・メッセージ）を返し、Claudeが再試行/エスカレーション/正答を選べるようにするのが正解。回復可能性を残す。','常に停止は過剰で、レート制限のように待てば回復する一時障害でも自動処理を捨ててしまう。','空オブジェクトはnullと同様に情報量が乏しく、種別が分からず推測頼みのまま。','固定文字列は全種別を1つに潰し、認証切れやバグを「一時障害」に偽装してしまい、運用での切り分けもできない。']
    },
    en: {
      scenario: 'The fetch_order tool calls an external order API. It swallows all different failures — order not found, auth error, rate limit, server outage — by "returning null." Seeing null, Claude always concludes "the order does not exist" and, even on expired auth or rate limiting, wrongly tells the customer "we could not find your order."',
      question: 'What is the best error design?',
      options: ['Return structured errors distinguished by type (not_found / unauthorized / rate_limited / upstream_error with a retryable flag and human-readable message) so Claude can retry, escalate, or answer correctly per situation','Throw on every failure to halt the agent loop and force human handling every time','Return an empty object {} instead of null and let Claude infer "{} means undetermined"','Always return a fixed string "We cannot check your order right now; please try later," regardless of failure type'],
      explanations: ['Returning type-distinguished structured errors (type, retryable, message) so Claude can retry/escalate/answer correctly is correct and preserves recoverability.','Always halting is excessive and discards automation even for transient failures like rate limits that recover with a wait.','An empty object is as information-poor as null; the type is lost and Claude is left guessing.','A fixed string collapses all types into one, disguising expired auth or bugs as a transient issue and blocking operational triage.']
    }
  },
  {
    id: 'tl-adv-009', domain: 'tool', answer: 2, level: 'advanced',
    ja: {
      scenario: 'list_customers ツールは顧客一覧を返す。要件で「メールアドレスでの絞り込み」が増えたため、開発者は既存ツールに filter という自由記述の文字列引数を1つ足し、"email contains @acme.com and status=active or region=APAC" のような式をClaudeに生成させて、それをそのままバックエンドのクエリに渡す方式にした。Claudeが式の構文をたびたび誤り、想定より広い範囲のPIIが返ることがある。',
      question: 'ツールのインターフェース設計として最も適切なのは？',
      options: ['filter文字列の書式をdescriptionで詳細に説明し、例を多数載せてClaudeが正しい式を書けるようにする','filterはそのままに、生成された式をバックエンドに渡す前にClaude自身にもう一度検証させる','自由記述の式をやめ、email / status / region など型付きの個別引数とenum・許容値をschemaで定義し、サーバー側で解釈・検証してクエリを組み立てる','1つのlist_customersに引数を足し続け、あらゆる絞り込みを自由記述の式1本で表現できるようにする'],
      explanations: ['式の書式説明や例を増やしても、自由記述である限り構文誤りと過剰取得のリスクは残り、PII漏れを構造的に防げない。','生成した式をモデルにもう一度検証させても、誤りを生んだのと同じモデルなので信頼できず、検証は境界の代わりにならない。','自由記述式を廃し、型付き個別引数とenum/許容値をschemaで縛り、解釈・検証をサーバー側で行うのが正解。入力検証とスキーマで誤用とPII過剰取得を防ぐ。','自由記述式に引数を足し続けるのは曖昧さと攻撃面を広げ、まさに今回の問題を悪化させる方向。']
    },
    en: {
      scenario: 'The list_customers tool returns a customer list. When a new requirement added "filter by email," the developer bolted on a single free-form string argument filter and had Claude generate expressions like "email contains @acme.com and status=active or region=APAC," passing them straight into the backend query. Claude frequently gets the expression syntax wrong, sometimes returning a wider range of PII than intended.',
      question: 'What is the best tool-interface design?',
      options: ['Describe the filter-string format in detail in the description with many examples so Claude writes correct expressions','Keep filter as-is but have Claude re-validate the generated expression before it goes to the backend','Drop the free-form expression and define typed individual arguments (email / status / region) with enums/allowed values in the schema, with the server interpreting and validating to build the query','Keep adding arguments to one list_customers so every filter can be expressed as a single free-form expression'],
      explanations: ['More format description and examples still leave syntax errors and over-fetching while it stays free-form; it cannot structurally prevent PII leaks.','Having the same model that produced the error re-validate it is unreliable; validation is no substitute for a boundary.','Replacing the free-form expression with typed individual arguments constrained by schema enums/allowed values, with server-side interpretation and validation, is correct — input validation and schema prevent misuse and PII over-fetch.','Piling arguments onto a free-form expression widens ambiguity and attack surface, worsening exactly this problem.']
    }
  },
  {
    id: 'tl-adv-010', domain: 'tool', answer: 1, level: 'advanced',
    ja: {
      scenario: 'カスタムツール update_ad_campaign は campaign_id が必須だが、Claudeが時々この引数を省略してツールを呼び、実行が失敗する。Claudeがこのツールを使うとき、必須の campaign_id を必ず含め、引数なしでの実行を試みないようにしたい。',
      question: '最も適切な設計は？',
      options: ['API呼び出しで output_config.format を json にし、Structured Outputs（構造化出力）で応答フォーマットを固定する','ツール定義の input_schema で campaign_id を required にし、ツール定義に strict: true を付けて厳密ツール使用を有効にする','CLAUDE.md に require-args: true を追記して、必須引数の付与をプロジェクト指示として強制する','tool_choice 側に strict: true を付けて、引数の欠落を防ぐ'],
      explanations: ['Structured Outputs（output_config.format）は応答本文のフォーマットを制御する別機能で、ツール引数の必須チェックはできない。引数の欠落は防げない。','正解。input_schema の required で必須を宣言し、ツール定義に strict: true を付けると tool_use.input がスキーマに厳密一致することが保証される（additionalProperties: false と required が必要）。','CLAUDE.md はエディタ統合向けのプロジェクト指示で、APIレベルの引数強制の仕組みではない。require-args のような設定キーも存在しない。','strict は tool_choice ではなくツール定義側（name/description/input_schema と並ぶトップレベル）に置かないと効かない。']
    },
    en: {
      scenario: 'A custom tool update_ad_campaign requires campaign_id, but Claude sometimes calls it without that argument and the call fails. You want Claude to always include the required campaign_id and never attempt a call without it.',
      question: 'What is the most appropriate design?',
      options: ['Set output_config.format to json on the API call and use Structured Outputs to fix the response format','Mark campaign_id as required in the tool input_schema and set strict: true on the tool definition to enable strict tool use','Add require-args: true to CLAUDE.md to enforce required arguments as a project instruction','Set strict: true on tool_choice to prevent missing arguments'],
      explanations: ['Structured Outputs (output_config.format) controls the response body format—a different feature; it cannot validate tool arguments, so omissions are not prevented.','Correct. Declaring required in input_schema and setting strict: true on the tool definition guarantees tool_use.input strictly matches the schema (needs additionalProperties: false and required).','CLAUDE.md is a project instruction for editor integrations, not an API-level argument-enforcement mechanism; no require-args key exists.','strict must sit on the tool definition (top-level alongside name/description/input_schema), not on tool_choice, or it has no effect.']
    }
  },
  {
    id: 'tl-adv-011', domain: 'tool', answer: 2, level: 'advanced',
    ja: {
      scenario: '在庫管理エージェントが、物流モニタリング用のMCPツールで「過去24時間に配送遅延した荷物のID」を照会する。ツールのサービスアカウント認証情報が期限切れになりバックエンドで認証失敗したが、開発者は「エージェントのクラッシュ防止」のため、すべての例外をキャッチして {"isError": false, "results": []} を返す設計にしていた。',
      question: 'この設計がアーキテクチャに与える影響として最も適切なのは？',
      options: ['MCPプロトコルが認証失敗を検出し、isError: false を上書きしてモデルへ警告する','エージェントは空配列を一時的なエラーと解釈し、指数バックオフで自動リトライする','エージェントは「遅延した荷物は存在しない」と誤結論し、重大なアクセス失敗を有効な空の結果として見逃す','エージェントはユーザーに新しい認証情報の手動入力を促す'],
      explanations: ['MCPプロトコルはツールが定義したレスポンスをそのまま運ぶだけで、エラーの検証・修正はしない。isError: false に塗られていれば検知しようがない。','isError: false はモデルにとって「成功」。成功レスポンスを疑わないため、リトライもしない。','正解。isError: false のためモデルはシステム障害をデータの不在と誤解し、誤った推論を出す（サイレント・フェイラー）。','認証問題が isError: false で隠蔽されているため、モデルはユーザーに情報を求めない。失敗は isError: true で伝えるべき。']
    },
    en: {
      scenario: 'An inventory agent uses an MCP tool to query the IDs of shipments delayed in the last 24 hours. The tool\'s service-account credentials expired and backend auth failed, but to "prevent the agent from crashing" the developer made it catch all exceptions and return {"isError": false, "results": []}.',
      question: 'What is the most accurate architectural impact of this design?',
      options: ['The MCP protocol detects the auth failure, overrides isError: false, and warns the model','The agent interprets the empty array as a transient error and auto-retries with exponential backoff','The agent wrongly concludes "no delayed shipments exist," missing a critical access failure as a valid empty result','The agent prompts the user to manually enter new credentials'],
      explanations: ['The MCP protocol merely transports the tool-defined response and does not validate or fix errors; if it is painted isError: false, there is nothing to detect.','isError: false means "success" to the model; it does not doubt a success response, so it will not retry.','Correct. Because isError: false, the model mistakes a system failure for absence of data and reasons incorrectly (silent failure).','The auth problem is hidden behind isError: false, so the model never asks the user for anything; failures should be surfaced with isError: true.']
    }
  },
  {
    id:'tl-adv-012', domain: 'tool', answer: 3, level: 'advanced',
    ja: {
      scenario: 'ECプラットフォームの在庫管理エージェントが、MCPツール sync_inventory で各倉庫の在庫を同期している。あるリリースでメッセージ組み立て処理をリファクタリングした際、tool_result ブロックの tool_use_id に、直前のアシスタントメッセージ内の tool_use の id を渡す代わりに、新しく生成したUUIDを設定してしまうバグが混入した。開発チームはこのリクエストをAPIに送信して会話ループを続けようとしている。',
      question: 'このリクエストを送ると何が起きるか。',
      options: [
        'APIはツール名 sync_inventory を手がかりに、対応するツール呼び出しへ結果を自動的にマッピングして処理を続行する',
        'APIはリクエストを受け付けるが、Claudeは元の要求が未完了と判断し、sync_inventory をもう一度呼び直す',
        'Claudeはこのツール結果を無視し、在庫の数値を推測で補って回答を生成する',
        'APIが 400 Bad Request を返し、リクエスト自体が拒否される'
      ],
      explanations: [
        'ツール名による自動マッピングは行われない。並列ツール呼び出しでは同名ツールが複数回呼ばれうるため、対応付けはIDでしか行えない。',
        'モデルが再判断する段階まで進まない。対応しないIDを持つ tool_result は、APIサーバー側のバリデーションで先に弾かれる。',
        'ハルシネーションはモデルの推論の問題だが、これはリクエスト構造の不整合。モデルに届く前に処理が止まる。',
        '決め手は、tool_result.tool_use_id が直前の tool_use.id と完全一致していなければならないこと。勝手に生成したUUIDでは「どの呼び出しへの返答か」を紐付けられず、構造エラーとして 400 Bad Request になる。'
      ]
    },
    en: {
      scenario: 'An e-commerce inventory agent synchronizes warehouse stock via the MCP tool sync_inventory. During a release that refactored the message-assembly code, a bug slipped in: the tool_result block’s tool_use_id is now set to a freshly generated UUID instead of the id of the tool_use in the preceding assistant message. The team sends this request to the API to continue the conversation loop.',
      question: 'What happens when this request is sent?',
      options: [
        'The API uses the tool name sync_inventory to automatically map the result to the corresponding tool call and continues',
        'The API accepts the request, but Claude decides the original call is unfinished and invokes sync_inventory again',
        'Claude ignores the tool result and generates an answer, filling in inventory figures by guesswork',
        'The API returns 400 Bad Request and the request itself is rejected'
      ],
      explanations: [
        'There is no auto-mapping by tool name. With parallel tool calls the same tool can be invoked multiple times, so correlation can only be done by ID.',
        'It never gets to the model’s re-reasoning stage; a tool_result with a non-matching ID is rejected earlier by API-side validation.',
        'Hallucination is a model-inference issue, but this is a structural inconsistency in the request. Processing stops before the model sees it.',
        'The decisive point: tool_result.tool_use_id must exactly match the preceding tool_use.id. With an invented UUID the API cannot tie the result to any call, so it rejects the request as a structural error — 400 Bad Request.'
      ]
    }
  },
  {
    id:'tl-adv-013', domain: 'tool', answer: 0, level: 'advanced',
    ja: {
      scenario: '市場調査エージェントが、検索・集計・グラフ生成の複数ツールを組み合わせて消費者トレンドのレポートを作る。実装では、Claudeの応答を受け取るたびに response.content[0].type を調べ、それが "text" ならば「ツール使用は終わり、最終回答が出た」と見なして while ループを抜ける。ところが本番では、分析が半分ほどしか進んでいないのにループが頻繁に終了し、レポートが未完成のまま出力される事象が多発している。',
      question: 'この実装の修正として最も適切なものはどれか。',
      options: [
        'ループの終了条件を stop_reason == "end_turn" に変更し、stop_reason == "tool_use" の間はツールを実行して tool_result を返し続ける',
        '分析が完了したら "ANALYSIS_COMPLETE" という合図を出力するようシステムプロンプトで指示し、その文字列の有無でループを終了する',
        '会話履歴に入れるassistantメッセージから text ブロックを取り除き、tool_use ブロックだけを残して誤判定を防ぐ',
        'temperatureを下げ、ツール呼び出しの前に余計な説明テキストを生成しないよう出力を安定させる'
      ],
      explanations: [
        '決め手は、1つの応答に text と tool_use の複数 content block が同居しうること。content[0] が text でも stop_reason が "tool_use" ならツール実行の要求は続いている。終了判定はAPIが正式に返す stop_reason で行う。',
        '独自の合図文字列はモデルが出し忘れる・早く出しすぎるリスクがあり、APIが stop_reason という正式なフィールドを返す以上、それを使うべき。',
        'textブロックもassistant出力の一部。勝手に削ると会話履歴とモデル出力の整合性が崩れ、説明や最終回答も失われる。',
        'temperatureはランダム性の調整であり、content blockの構成やループの制御フローを決めるものではない。'
      ]
    },
    en: {
      scenario: 'A market-research agent combines search, aggregation, and chart-generation tools to build consumer-trend reports. The implementation inspects response.content[0].type on every Claude response and, if it is "text", concludes “tool use is over, the final answer is here” and exits the while loop. In production, however, the loop frequently ends when the analysis is only half done, and incomplete reports keep being emitted.',
      question: 'Which fix to this implementation is most appropriate?',
      options: [
        'Change the loop exit condition to stop_reason == "end_turn", and while stop_reason == "tool_use", keep executing tools and returning tool_result blocks',
        'Instruct via the system prompt that the model output "ANALYSIS_COMPLETE" when done, and end the loop based on that marker string',
        'Strip text blocks from the assistant messages stored in history, keeping only tool_use blocks to avoid the misjudgment',
        'Lower temperature so the model stops generating extra explanatory text before tool calls'
      ],
      explanations: [
        'The decisive point: one response can contain both text and tool_use content blocks. Even if content[0] is text, stop_reason "tool_use" means tool execution is still being requested. Termination should be judged by the stop_reason the API officially returns.',
        'A custom marker string can be forgotten or emitted too early by the model; since the API returns the official stop_reason field, use that instead.',
        'Text blocks are part of the assistant’s output. Removing them corrupts the consistency between the history and the model’s output, and loses explanations and final answers.',
        'Temperature adjusts randomness; it does not determine content-block composition or the loop’s control flow.'
      ]
    }
  },
  {
    id:'tl-adv-014', domain: 'tool', answer: 2, level: 'advanced',
    ja: {
      scenario: 'フィットネスジムの問い合わせ自動応対システムには、レッスン予約の book_class と退会手続きの cancel_membership の2つのツールがある。予約や退会の要望が来たら該当ツールで詳細を抽出して処理する。一方で「いつもお世話になっています。今日のレッスン楽しかったです」のような挨拶や感想だけのメッセージには、ツールを呼ばず自然な文章で丁寧に返信したい。開発者はAPIリクエストの tool_choice の設定を検討している。',
      question: 'この要件を満たす設定として最も適切なものはどれか。',
      options: [
        'tool_choice を {"type": "any"} にし、丁寧な返信文を生成する generate_polite_response ツールを3つ目として追加する',
        'tool_choice を {"type": "tool", "name": "book_class"} にし、最も利用頻度の高い予約処理を確実に実行させる',
        'tool_choice を {"type": "auto"} にし、ツールを呼ぶか通常のテキストで返すかをClaudeに判断させる',
        '2つのツールを全フィールドoptionalの1つのツールに統合し、tool_choice を {"type": "any"} にする'
      ],
      explanations: [
        'any は「必ずどれかのツールを呼べ」という強制。テキスト返信のためだけに専用ツールを足すのは過剰設計で、自然な応答という要件にも合わない。',
        'tool は特定ツールの強制。挨拶にも退会依頼にも book_class が強制され、必須情報のない入力ではパラメータ欠落やハルシネーションを招く。',
        '決め手は「ツールを使う場合と使わない場合の両方がある」という要件。auto ならClaudeが文脈に応じて、予約→book_class、退会→cancel_membership、挨拶→ツールなしのテキスト回答と動的に切り替えられる。',
        'any である限り挨拶にもツール呼び出しが強制される。全フィールドoptionalの巨大スキーマは、何を抽出すべきかも曖昧にする。'
      ]
    },
    en: {
      scenario: 'A fitness gym’s automated inquiry system has two tools: book_class for lesson bookings and cancel_membership for cancellations. When a booking or cancellation request arrives, the appropriate tool should extract the details and process it. Meanwhile, messages that are just greetings or feedback — “Thanks as always, today’s class was great!” — should get a warm, natural text reply without any tool call. The developer is deciding how to set tool_choice on the API request.',
      question: 'Which setting best satisfies these requirements?',
      options: [
        'Set tool_choice to {"type": "any"} and add a third tool, generate_polite_response, for producing polite replies',
        'Set tool_choice to {"type": "tool", "name": "book_class"} so the most frequently used booking flow always runs',
        'Set tool_choice to {"type": "auto"} and let Claude decide whether to call a tool or answer with plain text',
        'Merge the two tools into one with every field optional, and set tool_choice to {"type": "any"}'
      ],
      explanations: [
        '“any” forces some tool call on every input. Adding a dedicated tool just to produce text replies is overengineering and conflicts with the natural-response requirement.',
        '“tool” forces one specific tool. Greetings and cancellations alike would be pushed through book_class, causing missing parameters and hallucinated values on inputs that lack the required details.',
        'The decisive point is that the requirement includes both tool and non-tool cases. With auto, Claude switches dynamically: bookings → book_class, cancellations → cancel_membership, greetings → a plain text reply with no tool.',
        'As long as it is “any”, even greetings force a tool call. A giant all-optional merged schema also blurs what should be extracted.'
      ]
    }
  },
  {
    id:'tl-adv-015', domain: 'tool', answer: 1, level: 'advanced',
    ja: {
      scenario: '法律事務所向けのリサーチアシスタントには、過去の判例を検索する search_case_law と、現行の法令・条文を検索する search_statutes の2つのツールがある。パラリーガルが「テナントの立ち退きに関するlawsを調べて」のような聞き方をすると、Claudeがどちらのツールを呼ぶかが安定せず、判例だけ・条文だけの偏った回答になる事象が続いている。チームはツール定義の description の改善を検討している。',
      question: 'description の改善として最も適切なものはどれか。',
      options: [
        '法律関連の質問ではまず routing_tool を呼んでどちらのデータベースを使うか判定させる2段構成に変える',
        '両ツールの description に「判例・裁判所の判断を調べるならこちら。現行の条文・法令を調べる場合は search_statutes を使う」のように、曖昧な語に対する使い分けの境界線を対比で書く',
        'システムプロンプトを変更し、法律関連の質問では常に両方のツールを順番に呼んでから回答させる',
        '2つのツールを search_legal_database に統合し、判例か条文かの振り分けはバックエンドの検索エンジンに任せる'
      ],
      explanations: [
        'ルーティング専用ツールの追加はワークフローを不必要に複雑にし、毎回1往復余計なレイテンシがかかる。まず既存の description の改善が先。',
        '決め手は、類似ツールの競合は「何をするか」だけでなく「いつこちらを使い、いつもう一方を使うか」の境界線を description に対比で書くことで解消される点。Claudeは description を読んでツールを選ぶ。',
        '常に両方呼ぶのは、片方で足りる質問にも余計な検索を走らせ、コストとレイテンシを増やす雑な回避策。',
        'バックエンド統合は設計としてあり得るが、問われているのは description の改善であり、問いが指定する改善対象からズレている。'
      ]
    },
    en: {
      scenario: 'A research assistant for a law firm has two tools: search_case_law for past court decisions and search_statutes for current statutes and regulations. When paralegals phrase requests like “look up the laws on tenant eviction,” Claude’s tool choice is unstable, and answers keep skewing toward only case law or only statutes. The team is considering improving the tool definitions’ descriptions.',
      question: 'Which is the most appropriate description improvement?',
      options: [
        'Restructure into two stages where a routing_tool is called first to decide which legal database to use',
        'Write boundary lines for ambiguous terms into both descriptions, contrastively: “use this for precedents and court rulings; for current statutes and regulations use search_statutes”',
        'Change the system prompt so every legal question always calls both tools in sequence before answering',
        'Merge the two into search_legal_database and let the backend search engine route between precedents and statutes'
      ],
      explanations: [
        'A dedicated routing tool complicates the workflow unnecessarily and adds an extra round trip of latency every time. Improving the existing descriptions comes first.',
        'The decisive point: conflicts between similar tools are resolved by writing not just “what this tool does” but contrastive boundaries — when to use this one and when to use the other. Claude reads descriptions to choose tools.',
        'Always calling both runs needless searches even when one suffices, a blunt workaround that inflates cost and latency.',
        'Backend consolidation is a legitimate design, but the question asks how to improve the descriptions — this misses the specified improvement target.'
      ]
    }
  }
);
