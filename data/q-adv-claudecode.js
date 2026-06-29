// CCA-F practice questions — domain: claudecode (Claude Code Configuration & Workflows) — level: advanced
window.QUESTIONS.push(
  {
    id: 'cc-adv-001', domain: 'claudecode', answer: 2, level: 'advanced',
    ja: {
      scenario: '40人規模のプラットフォーム部門が、サービスごとに分かれた巨大monorepoでClaude Codeを導入した。最初の数週間、各エンジニアが自分のホームディレクトリの ~/.claude/ に規約・禁止ライブラリ・ビルド手順を書き込んでいたが、PRレビューで「人によってClaudeの出すコードのスタイルや使うパッケージが違う」「新メンバーの環境だけ規約が効かない」という不満が続出している。属人化を解消し、サービス横断で挙動を標準化したい。',
      question: 'チーム標準化として最も本質的な対処は？',
      options: [
        'リポジトリ直下に1つの巨大なCLAUDE.mdを作り、全サービスの規約・手順・例外をすべてそこに列挙してコミットする',
        '各自の ~/.claude/ の中身をWikiに貼り出し、新メンバーは入社時に手で自分のホームへコピーする運用を文書化する',
        'リポジトリ直下にプロジェクト共通のCLAUDE.mdを置き、各サービス配下にもサブディレクトリ用のCLAUDE.mdを置いてコミットし、メモリ階層で共通＋サービス固有を両立させる',
        'リードエンジニア1人が全PRをレビューし、規約違反を都度コメントで指摘して手で直させる体制にする'
      ],
      explanations: [
        '全部を1つの巨大ファイルに詰めると、サービス固有の差分が埋もれ、無関係な指示まで毎回読み込まれて精度もメンテ性も落ちる。',
        'ホームディレクトリ（ユーザースコープ）はリポジトリで共有されず属人化したまま。手コピー運用は新メンバーで必ずズレる。',
        '共通はリポジトリ直下、サービス固有は各配下のCLAUDE.mdにコミットすると、メモリ階層で共通と固有が合成され、全員に再現性高く効く正攻法。',
        '人手レビューで都度直すのは仕組み化ではなく属人化の温存。標準は設定をコミットして効かせるべき。'
      ]
    },
    en: {
      scenario: 'A 40-person platform org adopted Claude Code in a large monorepo split by service. For the first weeks each engineer wrote standards, banned libraries, and build steps into their own ~/.claude/, and PR reviews keep surfacing complaints: code style and chosen packages differ per person, and new members’ machines don’t get the standards at all. You want to remove this person-dependency and standardize behavior across services.',
      question: 'What is the most fundamental fix for team standardization?',
      options: [
        'Create one giant CLAUDE.md at the repo root listing every service’s standards, steps, and exceptions, and commit it',
        'Paste everyone’s ~/.claude/ contents into a wiki and document that new members hand-copy it into their home on day one',
        'Commit a shared CLAUDE.md at the repo root plus per-service CLAUDE.md files in each subdirectory, so the memory hierarchy combines common and service-specific guidance',
        'Have one lead review every PR and point out standard violations in comments for people to fix by hand'
      ],
      explanations: [
        'Cramming everything into one giant file buries service-specific deltas and loads irrelevant guidance every time, hurting both accuracy and maintainability.',
        'Home (user scope) is not shared via the repo and stays person-dependent; hand-copying always drifts for new members.',
        'Common at the root plus per-service CLAUDE.md, all committed, lets the memory hierarchy merge shared and specific guidance for everyone — the reproducible, correct approach.',
        'Fixing things by hand in review preserves person-dependency rather than systematizing; standards should be enforced by committed config.'
      ]
    }
  },
  {
    id: 'cc-adv-002', domain: 'claudecode', answer: 3, level: 'advanced',
    ja: {
      scenario: '組織では3階層の指示が同時に存在する。全社共通の ~/.claude/CLAUDE.md（例: 「日本語で応答」）、リポジトリ直下のプロジェクトCLAUDE.md（例: 「pnpmを使う」）、そして作業中のサブディレクトリにある CLAUDE.md（例: 「このパッケージだけはnpmを使う」）。あるパッケージ内で作業していると、上位の「pnpmを使う」とサブディレクトリの「npmを使う」が真っ向から矛盾していることに気づいた。',
      question: 'メモリ階層の優先順位として正しい理解は？',
      options: [
        '全社共通（ユーザースコープ）が常に最優先なので、サブディレクトリの指定は無視され、全パッケージでpnpmになる',
        '矛盾が起きたら最も短い指示が優先されるため、文字数の少ない方が採用される',
        '同時に読み込まれた指示は機械的に結合され、矛盾はランダムにどちらかが選ばれるので予測できない',
        '作業ディレクトリにより近い（より具体的な）CLAUDE.mdが優先され、このパッケージ内ではサブディレクトリの「npmを使う」が効く。共通の方針はそのまま継承される'
      ],
      explanations: [
        'ユーザースコープが常に全部を上書きするわけではない。より具体的（近い）指示が優先されるのが階層の考え方で、これは誤解。',
        '優先順位は文字数では決まらない。スコープの具体性（近さ）で決まる。',
        '矛盾がランダムに解決されるという理解は誤り。階層には決まった優先順位がある。',
        'メモリは階層で合成され、作業地点により近い具体的なCLAUDE.mdが優先される。矛盾しない共通方針は継承され、衝突点だけ具体側が勝つ。'
      ]
    },
    en: {
      scenario: 'Three layers of guidance coexist: an org-wide ~/.claude/CLAUDE.md (e.g. "respond in Japanese"), the project CLAUDE.md at the repo root (e.g. "use pnpm"), and a CLAUDE.md in the subdirectory you’re working in (e.g. "this package uses npm"). Working inside that package, you notice the higher-level "use pnpm" directly contradicts the subdirectory’s "use npm".',
      question: 'What is the correct understanding of memory-hierarchy precedence?',
      options: [
        'The org-wide (user-scope) file always wins, so the subdirectory directive is ignored and every package uses pnpm',
        'On conflict the shortest directive wins, so whichever has fewer characters is taken',
        'Concurrently loaded directives are merged mechanically and conflicts are resolved randomly, so it’s unpredictable',
        'The CLAUDE.md closer to (more specific to) the working directory takes precedence, so inside this package "use npm" wins, while non-conflicting common guidance is still inherited'
      ],
      explanations: [
        'User scope does not always override everything; more specific (closer) guidance takes precedence — this is a misconception.',
        'Precedence is not decided by length; it’s decided by scope specificity (proximity).',
        'Conflicts are not resolved randomly; the hierarchy has a defined precedence order.',
        'Memory is composed hierarchically and the closer, more specific CLAUDE.md wins; non-conflicting common guidance is inherited, and only at the clash the specific side prevails.'
      ]
    }
  },
  {
    id: 'cc-adv-003', domain: 'claudecode', answer: 1, level: 'advanced',
    ja: {
      scenario: 'セキュリティ部門から「secretsを含むファイル（.env, 鍵, 認証情報）が誤ってコミットされる事故をゼロにしたい。手元でClaude Codeにコードを書かせるとき、人が忘れても確実に防ぎたい」と要請が来た。同時に「正式な保証はCI側でも担保したい。手元設定は人によって無効化できてしまうから」という懸念も共有された。',
      question: 'hooksとCIの役割分担として最も適切なのは？',
      options: [
        'hooksで.envコミットをブロックすれば手元で確実に止まるので、CI側のシークレットスキャンは冗長として外す',
        'コミット系イベントのhooksで秘密情報の混入を手元でブロックして即時フィードバックを与え、加えてCIでも秘密情報スキャンを必須チェックにして、手元設定を無効化された場合の最終防衛線を残す',
        'CIだけで秘密情報スキャンを行えば十分なので、手元のhooksは設定せずレビュー時に気づけばよい',
        'secretsはCLAUDE.mdに「コミットしないこと」と明記すれば守られるので、hooksもCIも不要にする'
      ],
      explanations: [
        'hooksは手元で各自が無効化・スキップでき得るため、CIの必須スキャンを外すと最終保証が消える。冗長ではなく多層防御。',
        'hooksで手元の即時ブロック、CIで誰の手元設定にも依存しない必須チェック。早期フィードバックと無効化されても効く最終防衛線を両立する正攻法。',
        'CIだけでは手元での流出に気づくのが遅く、レビュー頼みは抜ける。早期に止める層がない。',
        'CLAUDE.mdの記述は指示であって強制力がなく、人が忘れれば素通りする。secrets防止の保証にならない。'
      ]
    },
    en: {
      scenario: 'Security asks you to drive secret-file commits (.env, keys, credentials) to zero — when engineers have Claude Code write code locally, it must be prevented even if a person forgets. They also note the real guarantee must hold in CI too, "because local settings can be disabled per person."',
      question: 'What is the most appropriate division of labor between hooks and CI?',
      options: [
        'Since hooks block .env commits reliably on the machine, drop CI secret scanning as redundant',
        'Use commit-event hooks to block secrets locally for instant feedback, and also make secret scanning a required CI check as the last line of defense if local config is disabled',
        'CI-only secret scanning is enough; skip local hooks and just catch it in review',
        'Just write "don’t commit secrets" in CLAUDE.md and you’re covered, so neither hooks nor CI are needed'
      ],
      explanations: [
        'Local hooks can be disabled or skipped per person, so dropping the required CI scan removes the final guarantee; this is defense-in-depth, not redundancy.',
        'Hooks give an instant local block; CI gives a required check independent of anyone’s machine — combining early feedback with a last line of defense even when local config is bypassed.',
        'CI-only catches local leaks late and review can miss them; there’s no early-stop layer.',
        'A CLAUDE.md note is guidance with no enforcement; a forgetful person sails right through, giving no guarantee.'
      ]
    }
  },
  {
    id: 'cc-adv-004', domain: 'claudecode', answer: 0, level: 'advanced',
    ja: {
      scenario: '全社で共有するMCPサーバー設定（チケット管理・社内DBレプリカ・デプロイAPI）を整備する。各MCPサーバーは強い権限を持ち得る。誰がどのサーバーに繋げるか、本番デプロイAPIのような危険なものをどう扱うかのガバナンスを決めたい。「便利だから全員に全部繋がせる」案も出ている。',
      question: '共有MCP設定のガバナンスとして最も適切なのは？',
      options: [
        '共有する読み取り中心のMCPサーバー設定だけをリポジトリにコミットして全員に配り、本番デプロイAPIのような危険なものは別管理＋最小権限（必要な人だけ・読み取り優先）にし、認証情報は環境変数等で外出ししてコミットしない',
        '全MCPサーバーを一律で全員に許可し、本番デプロイAPIも含めて誰でも繋げるようにして利便性を最大化する',
        'MCPサーバーの接続トークンを設定ファイルに直書きしてコミットし、全員が同じ認証情報を即使えるようにする',
        '危険なものも安全なものも区別せず、各自が自分のローカルにだけMCP設定を持ち、共有はしない'
      ],
      explanations: [
        '共有してよい安全な設定はコミットして配布、本番デプロイのような危険系は最小権限で限定し、認証情報は環境変数で外出ししてコミットしない——最小権限＋秘密非コミットの正攻法。',
        '危険なAPIまで全員に開放するのは最小権限の原則に反し、事故時の影響が全社に及ぶ。',
        'トークンの直書きコミットは秘密情報の流出そのもの。リポジトリ履歴に永久に残る。',
        '共有しないと標準化・再現性が失われ、各自バラバラの属人化に戻る。危険度に応じた制御もできない。'
      ]
    },
    en: {
      scenario: 'You’re setting up org-wide shared MCP server configs (issue tracker, internal DB replica, deploy API). Each MCP server can hold strong permissions. You must decide governance for who connects to what and how to treat dangerous ones like the production deploy API. Someone proposes "just let everyone connect to everything because it’s convenient."',
      question: 'What is the most appropriate governance for shared MCP configs?',
      options: [
        'Commit only the safe, read-oriented MCP server configs to the repo for everyone, manage dangerous ones like the production deploy API separately with least privilege (only those who need it, read-first), and keep credentials out of the repo via env vars',
        'Allow all MCP servers to everyone uniformly, including the production deploy API, to maximize convenience',
        'Hard-code MCP connection tokens into the config file and commit them so everyone shares the same credentials immediately',
        'Make no distinction between dangerous and safe servers; have each person keep MCP config only locally and share nothing'
      ],
      explanations: [
        'Commit the safe shared configs, restrict dangerous ones with least privilege, and externalize credentials via env vars without committing them — the least-privilege, secrets-not-committed approach.',
        'Opening even dangerous APIs to everyone violates least privilege and makes any incident org-wide.',
        'Committing hard-coded tokens is a secret leak itself and stays in repo history forever.',
        'Not sharing loses standardization and reproducibility and returns to per-person divergence, with no control by risk level.'
      ]
    }
  },
  {
    id: 'cc-adv-005', domain: 'claudecode', answer: 3, level: 'advanced',
    ja: {
      scenario: 'レガシーな決済モジュールを、命名規約変更・型付け強化・テスト追加・依存整理の4観点で横断的にリファクタする大型タスクを抱えている。単一の長い会話で全部やらせると、コンテキストが膨らんで指示が混ざり、後半で前半の前提を忘れて一貫性が崩れることが多い。観点ごとに独立して深掘りさせ、メインの会話を汚さずに進めたい。',
      question: '最も適した進め方は？',
      options: [
        '1つの会話で4観点を順番に全部やらせ、忘れそうな前提は都度プロンプトに貼り直して補う',
        'permissionsの許可リストを最大限広げ、Claudeが何でも実行できるようにして一気に終わらせる',
        '4観点それぞれをCLAUDE.mdの別セクションに長文で書き、巨大化したCLAUDE.mdに全部任せる',
        '観点ごとにサブエージェントへ分解し、各サブエージェントが独立したコンテキストで担当観点を深掘りして結果を返し、メインはそれらを統合する'
      ],
      explanations: [
        '単一の長い会話は後半でコンテキストが膨らみ前半の前提を取りこぼす。貼り直しは対症療法で根本解決にならない。',
        '権限を広げるのはリファクタの分解とは無関係で、最小権限に反し事故リスクを上げるだけ。',
        'CLAUDE.mdを巨大化させても1コンテキストで全観点を抱える構図は変わらず、混線も解消しない。',
        '観点ごとにサブエージェントへ分解すると各々が独立コンテキストで深掘りでき、メインのコンテキストを汚さず一貫性を保てる。大型リファクタの分割統治の正攻法。'
      ]
    },
    en: {
      scenario: 'You have a large refactor of a legacy payments module across four concerns: naming conventions, stronger typing, added tests, and dependency cleanup. Doing it all in one long conversation tends to balloon the context, mix instructions, and lose earlier assumptions late in the run, breaking consistency. You want each concern explored independently without polluting the main conversation.',
      question: 'What is the best way to proceed?',
      options: [
        'Do all four concerns in sequence in one conversation, re-pasting any assumptions you might forget into the prompt as you go',
        'Widen the permissions allowlist as much as possible so Claude can run anything and finish in one shot',
        'Write each concern as a long section in CLAUDE.md and let the now-giant CLAUDE.md handle everything',
        'Decompose into subagents per concern, each exploring its concern in an isolated context and returning results, with the main session integrating them'
      ],
      explanations: [
        'One long conversation balloons context late and drops earlier assumptions; re-pasting is a band-aid, not a root fix.',
        'Widening permissions is unrelated to decomposing the refactor and only raises accident risk against least privilege.',
        'A giant CLAUDE.md still holds all concerns in one context and does not resolve the cross-talk.',
        'Decomposing into per-concern subagents lets each go deep in its own context, keeps the main context clean, and preserves consistency — the divide-and-conquer approach for large refactors.'
      ]
    }
  },
  {
    id: 'cc-adv-006', domain: 'claudecode', answer: 1, level: 'advanced',
    ja: {
      scenario: '夜間バッチでClaude Codeを使い、依存パッケージの更新→テスト→PR作成までを無人で回したい。問題は「同じ入力でも実行のたびに微妙に結果が変わり、失敗を再現して原因を追えない」こと。CIログを見ても、どのコマンドが何の順で走ったかが回ごとにブレている。',
      question: '決定的・再現性のある自動化に最も寄与するのは？',
      options: [
        '毎回Claudeに「いい感じに依存を更新してPRを作って」と自由記述で頼み、細部は任せて柔軟性を上げる',
        '実行手順をスラッシュコマンド／スキルとして定義し、走るコマンド・順序・前提を固定して呼び出す。secretsは環境変数で渡しコミットしない',
        '再現性のために、各エンジニアが自分のローカルだけに少しずつ違う実行スクリプトを持ち、夜間はそれを使う',
        '失敗したらClaudeに「さっきと同じことをもう一度やって」と頼んで、運が良ければ再現するのを待つ'
      ],
      explanations: [
        '毎回自由記述で「いい感じ」に任せると、走る手順がブレて非決定的になり再現できない。',
        'スラッシュコマンド／スキルで手順・順序・前提を固定すれば、同じ入力で同じ流れが走り再現性が出る。秘密は環境変数で渡しコミットしないのも自動化の定石。',
        'ローカルごとに少しずつ違うスクリプトは属人化そのもので、回ごと・人ごとに結果がブレる。再現性に反する。',
        '「もう一度やって」で運任せに再現を待つのは決定性の放棄。原因追跡もできない。'
      ]
    },
    en: {
      scenario: 'A nightly batch uses Claude Code to update dependencies, run tests, and open a PR unattended. The problem: the same input yields slightly different results each run, so failures can’t be reproduced and traced. CI logs show which commands ran, in what order, drifting from run to run.',
      question: 'What contributes most to deterministic, reproducible automation?',
      options: [
        'Each run, ask Claude in free text to "update deps nicely and open a PR," leaving details to it for flexibility',
        'Define the procedure as a slash command/skill that fixes the commands, order, and assumptions, and invoke it; pass secrets via env vars without committing them',
        'For reproducibility, have each engineer keep a slightly different run script only locally and use it at night',
        'When it fails, ask Claude to "do the same thing again" and wait for it to reproduce if you’re lucky'
      ],
      explanations: [
        'Free-text "do it nicely" each time makes the executed steps drift and become non-deterministic and unreproducible.',
        'A slash command/skill that fixes steps, order, and assumptions makes the same input run the same flow, yielding reproducibility; passing secrets via env vars without committing is also standard for automation.',
        'Slightly-different local scripts per person are person-dependency itself and produce run-to-run and person-to-person drift, opposing reproducibility.',
        '"Do it again" relies on luck to reproduce, abandoning determinism and preventing root-cause tracing.'
      ]
    }
  },
  {
    id: 'cc-adv-007', domain: 'claudecode', answer: 2, level: 'advanced',
    ja: {
      scenario: 'チームに「Claude Codeで作業中、ユーザーやドキュメントから読み込んだ指示の中に、巧妙に紛れた破壊的操作の誘導（本番テーブルのDROP、フォースプッシュ、認証情報の外部送信など）が混ざる可能性がある」という懸念がある。悪意あるREADMEやIssue本文をうっかり取り込んだときに、確認なしで一発実行されることだけは避けたい。',
      question: 'プロンプト起点の破壊的操作を抑止する設計として最も適切なのは？',
      options: [
        'permissionsの許可リストを広く取って摩擦を減らし、破壊的操作も自動承認にして作業を止めないようにする',
        '破壊的操作が来ないことを前提に何も制御せず、もし起きたら事後にgitやバックアップから戻す運用にする',
        'settings.jsonのpermissionsで破壊的・不可逆な操作を拒否リストや要承認に設定し、危険コマンドは人の明示確認を必須にする。hooksで危険パターンを検知してブロックするのも併用する',
        '危険な指示を含むドキュメントは読み込ませないルールをCLAUDE.mdに書き、あとは各自の注意に任せる'
      ],
      explanations: [
        '許可リストを広げて破壊的操作まで自動承認すると、プロンプト経由の誘導がそのまま一発実行されてしまう。最も危険。',
        '事後復旧頼みは不可逆操作（外部送信・フォースプッシュ等）に無力で、抑止になっていない。',
        '破壊的・不可逆操作を拒否／要承認にして人の明示確認を挟み、hooksで危険パターンも検知——許可制と確認による多層の抑止が正攻法。',
        'CLAUDE.mdの注意書きは強制力がなく、うっかり取り込みを防げない。仕組みで止める必要がある。'
      ]
    },
    en: {
      scenario: 'Your team worries that while using Claude Code, instructions read from users or documents could hide cleverly disguised destructive actions (DROP on a production table, force-push, exfiltrating credentials). If a malicious README or issue body is accidentally ingested, you must at least avoid one-shot execution without confirmation.',
      question: 'What design best deters prompt-triggered destructive actions?',
      options: [
        'Make the permissions allowlist broad to reduce friction, auto-approving destructive actions too so work isn’t interrupted',
        'Assume destructive actions won’t come, control nothing, and if they happen restore afterward from git or backups',
        'In settings.json permissions, deny-list or require approval for destructive/irreversible operations so dangerous commands need explicit human confirmation, and also use hooks to detect and block dangerous patterns',
        'Write a CLAUDE.md rule to never ingest docs containing dangerous instructions and otherwise rely on each person’s care'
      ],
      explanations: [
        'A broad allowlist that auto-approves destructive actions lets prompt-borne lures execute in one shot — the most dangerous choice.',
        'After-the-fact restore is useless against irreversible actions (exfiltration, force-push) and provides no deterrence.',
        'Deny / require-approval for destructive, irreversible ops inserts explicit human confirmation, plus hooks to catch dangerous patterns — layered deterrence via allowlisting and confirmation is the correct approach.',
        'A CLAUDE.md note has no enforcement and can’t stop accidental ingestion; you must stop it structurally.'
      ]
    }
  },
  {
    id: 'cc-adv-008', domain: 'claudecode', answer: 0, level: 'advanced',
    ja: {
      scenario: '複数チームが「インシデント対応の初動」を毎回手探りでやっている。手順は、影響範囲の調査→関連ログの収集→暫定対応案の起票→ポストモーテムの雛形作成、と固定なのに、人によって順番も抜けも違い、夜間担当だと特に質が落ちる。Claude Codeでこの複雑ワークフローを誰がやっても同じ品質・同じ順序で回せるようにしたい。',
      question: '標準化の手段として最も適切なのは？',
      options: [
        'この一連の手順をスラッシュコマンド／スキルとして定義してリポジトリにコミットし、誰でも同じ入力で同じ順序のワークフローを呼び出せるようにする',
        'ベテランがインシデントのたびに付きっきりで隣に座り、口頭で順番を指示して品質を担保する',
        '手順をCLAUDE.mdの末尾に長文の散文で書き足し、必要なときに各自が読んで思い出して手で進める',
        'permissionsを全開放し、Claudeに「インシデント対応をうまくやって」と一任して自由に動かす'
      ],
      explanations: [
        '固定された複雑ワークフローはスラッシュコマンド／スキルに定義してコミットすれば、誰が呼んでも同じ順序・同じ品質で再現でき、夜間でもブレない。標準化の正攻法。',
        '付きっきりは属人化そのもので、本人不在の夜間に崩れる。スケールしない。',
        '散文の読み返しは解釈と順序がブレ、抜けも出る。再現性が担保されない。',
        '全開放して一任すると順序も品質もブレ、最小権限にも反する。標準化にならない。'
      ]
    },
    en: {
      scenario: 'Multiple teams improvise the first response to incidents every time. The procedure is fixed — assess blast radius, gather related logs, file an interim mitigation, draft a postmortem template — yet order and omissions vary by person, and quality drops especially on the night shift. You want this complex workflow runnable by anyone at the same quality and order via Claude Code.',
      question: 'What is the most appropriate means of standardization?',
      options: [
        'Define this whole procedure as a slash command/skill committed to the repo, so anyone invokes the same-order workflow from the same input',
        'Have a veteran sit beside whoever is on call every incident, dictating the order verbally to ensure quality',
        'Append the steps as long prose at the end of CLAUDE.md and have each person read, recall, and do them by hand when needed',
        'Open permissions fully and just tell Claude to "handle the incident well," letting it act freely'
      ],
      explanations: [
        'A fixed complex workflow defined as a committed slash command/skill reproduces the same order and quality for anyone, holding up even at night — the standardization approach.',
        'Sitting beside someone is person-dependency itself, collapses on the unattended night shift, and doesn’t scale.',
        'Re-reading prose lets interpretation and order drift and omissions appear; reproducibility isn’t guaranteed.',
        'Fully opening permissions and delegating drifts in order and quality and violates least privilege — not standardization.'
      ]
    }
  },
  {
    id: 'cc-adv-009', domain: 'claudecode', answer: 3, level: 'advanced',
    ja: {
      scenario: 'ある共有スキルが「DBマイグレーションを生成して適用する」一連を自動化している。ステージングでは快適に動くが、本番相当の環境で走らせたとき、スキル内のステップが確認なしでマイグレーションを適用しようとし、ヒヤリとした。スキル自体は便利なので残したいが、環境によって危険度が違う点を安全に扱いたい。',
      question: '最も適切な対処は？',
      options: [
        'スキルから適用ステップを完全に削除し、マイグレーションは常に人が全部手で打つ運用に戻す',
        '危険なのはスキルのせいなので、このスキルの利用自体を全社で禁止し、各自が好きなやり方でマイグレーションする',
        '本番でも止まらないよう、permissionsで適用コマンドを無条件許可に変え、確認ステップをスキルから外す',
        'スキルは生成までを担い、適用は破壊的操作としてpermissionsで要承認に設定し、本番相当環境では人の明示確認を必須にする。環境ごとの危険度に応じて許可制を効かせる'
      ],
      explanations: [
        '適用を全部手打ちに戻すのは自動化の放棄で、属人化とミスを増やす。便利さを捨てる過剰反応。',
        'スキル自体を禁止して各自バラバラにするのは標準化・再現性の喪失で、危険度の制御にもならない。',
        '無条件許可にして確認を外すのは、まさにヒヤリの原因を強化する真逆の対応。最小権限に反する。',
        '生成は自動化しつつ、適用は破壊的操作として要承認＋本番では明示確認を必須に——許可制で環境ごとの危険度を制御する正攻法。便利さと安全を両立する。'
      ]
    },
    en: {
      scenario: 'A shared skill automates "generate and apply a DB migration." It runs smoothly on staging, but when run in a production-like environment a step nearly applied a migration without confirmation — a close call. The skill is useful and you want to keep it, but handle the fact that risk differs by environment.',
      question: 'What is the most appropriate fix?',
      options: [
        'Remove the apply step from the skill entirely and go back to humans typing every migration by hand',
        'Since the danger is the skill’s fault, ban the skill org-wide and let everyone migrate however they like',
        'To avoid stalls in production, change permissions to unconditionally allow the apply command and drop the confirmation step from the skill',
        'Let the skill handle generation, mark apply as a destructive op requiring approval in permissions, and require explicit human confirmation in production-like environments — enforcing allowlisting by environment risk'
      ],
      explanations: [
        'Reverting apply to all-by-hand abandons automation and increases person-dependency and mistakes — an overreaction discarding the benefit.',
        'Banning the skill and going per-person loses standardization and reproducibility and doesn’t control risk either.',
        'Unconditional allow with confirmation removed is the exact opposite, reinforcing the close-call cause and violating least privilege.',
        'Automate generation, treat apply as destructive requiring approval, and mandate explicit confirmation in production — allowlisting by environment risk, balancing convenience and safety.'
      ]
    }
  },
  {
    id: 'cc-adv-010', domain: 'claudecode', answer: 1, level: 'advanced',
    ja: {
      scenario: 'オンボーディング中の新メンバーから「ローカルだけClaude Codeの挙動がおかしい」と報告。本番DBへの書き込みが許可リストで止まらず、規約も一部しか効いていない。チームのリポジトリには .claude/settings.json と CLAUDE.md があり、他メンバーでは正しく機能している。新メンバーはホームの ~/.claude/settings.json に過去案件の名残で広い許可と独自の上書き設定を残していた。',
      question: '原因の理解と是正として最も適切なのは？',
      options: [
        'リポジトリのsettings.jsonが壊れているはずなので、全員のローカルを作り直して再クローンさせる',
        'ユーザースコープの ~/.claude/settings.json に残った広い許可と上書きが、リポジトリのプロジェクト設定と合成された結果、危険操作が素通りしている。ユーザースコープの不要な広い許可・上書きを整理し、プロジェクト側の許可リスト・規約が意図通り効くようにする',
        '新メンバーのモデルが古いことが原因なので、最新モデルに切り替えれば許可リストも規約も直る',
        '許可リストが効かないのは仕様の範囲なので、本番DB書き込みは運用ルールで「やらないこと」と口頭周知すれば足りる'
      ],
      explanations: [
        'リポジトリ設定は他メンバーで正しく動いており壊れていない。再クローンは原因に当たらない対症療法。',
        'ユーザースコープに残った広い許可と上書きが、プロジェクト設定と合成されて危険操作を素通りさせている。ユーザースコープの不要設定を整理すればプロジェクトの許可リスト・規約が意図通り効く——スコープ合成の理解に基づく正しい是正。',
        'モデルの新旧は許可リストや規約の適用とは無関係で、原因を説明できない。',
        '口頭周知は強制力がなく最小権限にも反する。仕組み（許可リスト）で止めるのが本来の解。'
      ]
    },
    en: {
      scenario: 'A new member in onboarding reports "only my local Claude Code behaves oddly." Writes to the production DB aren’t blocked by the allowlist and only some standards take effect. The team repo has .claude/settings.json and CLAUDE.md that work correctly for everyone else. The new member had left broad permissions and custom overrides in their home ~/.claude/settings.json from a past project.',
      question: 'What is the most appropriate diagnosis and remediation?',
      options: [
        'The repo settings.json must be broken, so have everyone rebuild their local and re-clone',
        'The broad permissions and overrides left in the user-scope ~/.claude/settings.json, merged with the repo’s project settings, let dangerous operations slip through; clean up the unnecessary broad user-scope permissions/overrides so the project allowlist and standards take effect as intended',
        'The new member’s model is outdated, so switching to the latest model will fix both the allowlist and the standards',
        'The allowlist not taking effect is expected, so verbally telling people "don’t write to the production DB" as an operational rule is enough'
      ],
      explanations: [
        'The repo settings work for everyone else and aren’t broken; re-cloning is a band-aid that misses the cause.',
        'Broad user-scope permissions and overrides merged with project settings let dangerous ops pass; cleaning up the unneeded user-scope config restores the project allowlist and standards — correct remediation grounded in scope composition.',
        'Model version is unrelated to applying allowlists or standards and doesn’t explain the cause.',
        'Verbal notice has no enforcement and violates least privilege; stopping it structurally via the allowlist is the real fix.'
      ]
    }
  },
  {
    id: 'cc-adv-011', domain: 'claudecode', answer: 1, level: 'advanced',
    ja: {
      scenario: '1つのリポジトリに、古いPythonスクリプト（末尾 .old.py）と新しいGoサービス（末尾 .service.go）が混在している。共通のコーディング規約を .claude/rules/coding-standards.md に1ファイルで置き、この2種類の拡張子のファイルを編集するときだけClaudeに読み込ませたい。',
      question: 'ルールの適用対象を指定する最も適切な方法は？',
      options: ['フロントマターに paths: ["**/*.(old\\.py|service\\.go)"] と正規表現で1本にまとめて書く','フロントマターに paths: ["**/*.old.py", "**/*.service.go"] とグロブの配列で2パターン並べて書く','ルートに CLAUDE.coding.md という名前で置けば、ファイル名から対象拡張子が自動で決まる','拡張子ごとに .claude/rules/ 配下へ2つのルールファイルを分けて作る'],
      explanations: ['paths は正規表現ではなくグロブパターンを期待する。正規表現風の書き方は正しく認識されない。','正解。paths は配列を受け取れるので、対象パターンをグロブで複数並べれば1ファイルで両方の拡張子に効かせられる。','カスタムルールは .claude/rules/ 配下に置きフロントマターで対象を指定する。ファイル名だけで対象拡張子が決まるわけではない。','paths は配列を取れるので、わざわざ拡張子ごとにファイルを分ける必要はない。1ファイルで複数パターンを管理できる。']
    },
    en: {
      scenario: 'One repo mixes legacy Python scripts (ending .old.py) and new Go services (ending .service.go). You want a single shared coding-standards rule in .claude/rules/coding-standards.md that Claude loads only when editing files of these two extensions.',
      question: 'What is the best way to scope the rule?',
      options: ['Write it as one regex in frontmatter: paths: ["**/*.(old\\.py|service\\.go)"]','Write a glob array in frontmatter: paths: ["**/*.old.py", "**/*.service.go"]','Just name it CLAUDE.coding.md at the repo root so the target extensions are inferred from the filename','Create two separate rule files under .claude/rules/, one per extension'],
      explanations: ['paths expects glob patterns, not regex; a regex-style pattern will not be matched correctly.','Correct. paths takes an array, so listing multiple glob patterns in one file applies the rule to both extensions.','Custom rules live under .claude/rules/ and target files via frontmatter; the filename alone does not determine target extensions.','Since paths takes an array, splitting per extension is unnecessary—one file can manage multiple patterns.']
    }
  }
);
