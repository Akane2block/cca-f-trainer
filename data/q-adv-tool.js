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
  }
);
