// CCA-F practice questions — domain: claudecode — exam-style scenarios (rebuilt 2026-07)
window.QUESTIONS.push(
  {
    id: 'cc2-001', domain: 'claudecode', answer: 2,
    ja: {
      scenario: '決済系フィンテック企業のモノレポには8つのサービスがあり、リポジトリ直下のCLAUDE.mdに「エラーハンドリングは例外を送出する方式で統一する」と定めている。一方、決済コアを担当するチームは半年前にResult型ベースの設計へ移行しており、services/payment/ 配下のCLAUDE.mdには「エラーは例外ではなくResult型で返す」と書かれている。先週異動してきたエンジニアが、services/payment/ 内で返金APIのエラー処理追加をClaude Codeに依頼しようとしている。CIはGitHub Actionsで、テストカバレッジは82%ある。',
      question: 'このときClaude Codeが従う規約として最も適切な説明はどれか。',
      options: [
        'リポジトリ全体の正はルートのCLAUDE.mdなので、例外送出方式が適用される',
        'CLAUDE.mdは最初に読み込まれた1ファイルだけが有効になるため、起動時のディレクトリによって結果が変わる',
        '作業対象に近い services/payment/ のCLAUDE.mdが優先され、Result型で実装される',
        '矛盾する指示が検出されると両方とも無効になり、どちらに従うか選択を求められる'
      ],
      explanations: [
        'ルートは全体共通の既定にすぎない。より作業地点に近い（具体的な）サブディレクトリの指定がある場合はそちらが優先される。',
        'CLAUDE.mdは階層的に複数読み込まれる。1ファイルだけが排他的に有効になる仕組みではない。',
        '正解。決め手は作業場所が services/payment/ 配下であること。規約が矛盾する場合は、作業地点に近いCLAUDE.mdが優先される。',
        '矛盾を自動検出して選択を迫る仕組みはない。階層の優先順位（近い方が勝つ）で解決される。'
      ]
    },
    en: {
      scenario: 'A payments fintech runs a monorepo with eight services. The repo-root CLAUDE.md states that error handling must be standardized on throwing exceptions. However, the payment-core team migrated to a Result-type design six months ago, and the CLAUDE.md under services/payment/ says errors must be returned as Result types, not thrown. An engineer who transferred last week is about to ask Claude Code to add error handling to a refund API inside services/payment/. CI runs on GitHub Actions and test coverage is 82%.',
      question: 'Which statement best describes the convention Claude Code will follow here?',
      options: [
        'The root CLAUDE.md is the source of truth for the whole repo, so exceptions will be thrown',
        'Only the first CLAUDE.md loaded takes effect, so the result depends on the startup directory',
        'The CLAUDE.md closer to the work, under services/payment/, takes precedence, so Result types are used',
        'When conflicting instructions are detected, both are disabled and the user is prompted to choose'
      ],
      explanations: [
        'The root file is only the repo-wide default. A more specific subdirectory file closer to the work overrides it on conflict.',
        'CLAUDE.md files are loaded hierarchically; there is no rule that only one file is active.',
        'Correct. The deciding detail is that the work happens under services/payment/. On conflict, the CLAUDE.md closer to the working location wins.',
        'There is no conflict-detection prompt; the hierarchy (closer wins) resolves it.'
      ]
    }
  },
  {
    id: 'cc2-002', domain: 'claudecode', answer: 0,
    ja: {
      scenario: 'SaaS企業のリポジトリでは、ルートのCLAUDE.mdに「コミットメッセージは英語の命令形で書く」「PRには変更理由を必ず書く」とあり、frontend/ 配下のCLAUDE.mdには「Reactコンポーネントは関数コンポーネントで書き、クラスコンポーネントは新規作成しない」とだけ書かれている。frontend/ で作業していた若手メンバーが「サブディレクトリにCLAUDE.mdがあるなら、ルートのコミット規約はもう効かないのでは」と不安になり、リリース前に確認したいと言ってきた。チームは週2回リリースしている。',
      question: 'frontend/ 配下で作業するときのルール適用について、正しい説明はどれか。',
      options: [
        'ルートとfrontend/の両方のルールが適用される。矛盾しない方針は継承される',
        'frontend/にCLAUDE.mdがある時点でルートは読み込まれず、コミット規約は適用されない',
        'ルートのルールだけが有効で、サブディレクトリのCLAUDE.mdは参考情報として扱われる',
        'コミット規約をfrontend/のCLAUDE.mdにもコピーしない限り、frontend/内では適用されない'
      ],
      explanations: [
        '正解。決め手は2つのファイルの内容が矛盾していないこと。矛盾しない上位の方針はそのまま継承され、両方が同時に効く。',
        'サブディレクトリのファイルは上位を置き換えるのではなく、追加・具体化する。上書きが起きるのは矛盾したときだけ。',
        'サブディレクトリのCLAUDE.mdも実際に適用される正式なルールであり、参考情報扱いではない。',
        '継承されるためコピーは不要。むしろ同一内容の重複コピーは更新漏れの温床になる。'
      ]
    },
    en: {
      scenario: 'In a SaaS company’s repository, the root CLAUDE.md says commit messages must be written in English imperative form and every PR must state the reason for the change. The CLAUDE.md under frontend/ only says React components must be function components and no new class components may be created. A junior member working in frontend/ got worried that “if a subdirectory has its own CLAUDE.md, the root commit conventions no longer apply,” and wants to confirm before the release. The team releases twice a week.',
      question: 'Which statement about rule application when working under frontend/ is correct?',
      options: [
        'Rules from both the root and frontend/ apply; non-conflicting policies are inherited',
        'Once frontend/ has a CLAUDE.md, the root file is not loaded, so the commit conventions do not apply',
        'Only the root rules are effective; the subdirectory CLAUDE.md is treated as reference material',
        'The commit conventions do not apply inside frontend/ unless they are copied into its CLAUDE.md'
      ],
      explanations: [
        'Correct. The deciding detail is that the two files do not conflict. Non-conflicting higher-level policies are inherited, so both apply simultaneously.',
        'A subdirectory file adds to and specializes the parent; it does not replace it. Overriding only happens on conflict.',
        'The subdirectory CLAUDE.md is a real rule that applies, not mere reference material.',
        'Copying is unnecessary because of inheritance, and duplicated copies invite update drift.'
      ]
    }
  },
  {
    id: 'cc2-003', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '受託開発企業のテックリードは、自分の ~/.claude/CLAUDE.md に命名規則・レビュー観点・禁止パターンなど3年分のノウハウを蓄積しており、本人のClaude Code出力は品質が高い。ところが新しく入った2人のメンバーの出力は規約から外れることが多く、レビュー指摘が一向に減らない。リードは「自分のdotfilesリポジトリを共有して、各自ホームディレクトリにコピーしてもらえばよい」と提案している。プロジェクトはGitHubのプライベートリポジトリで管理されている。',
      question: 'チーム全員のClaude Code出力に同じ規約を適用する方法として最も適切なのはどれか。',
      options: [
        'dotfilesリポジトリを共有し、各メンバーが ~/.claude/ に手動でコピーする',
        '規約をプロジェクトリポジトリのCLAUDE.mdや .claude/rules/ にコミットし、リポジトリを通じて全員に適用する',
        '規約をオンボーディングWikiに整理し、新メンバーに熟読してもらう',
        'hooksで規約違反のコードをコミット時に自動検出する仕組みを先に構築する'
      ],
      explanations: [
        'コピーした時点の内容で固定され、更新のたびに再配布が必要になる。属人化の場所がdotfilesに移るだけで解決しない。',
        '正解。決め手は規約が個人の ~/.claude/ にあること＝属人化。リポジトリにコミットすれば全員に同じルールが自動で効き、更新もバージョン管理される。',
        'Wikiは人間向けの文書であり、Claude Codeの動作には反映されない。',
        '違反検出は事後対策であり、出力を最初から規約に沿わせる根本対応にはならない。'
      ]
    },
    en: {
      scenario: 'A tech lead at a contract-development firm has accumulated three years of know-how — naming rules, review checkpoints, forbidden patterns — in his personal ~/.claude/CLAUDE.md, and his Claude Code output is high quality. But two newly joined members keep producing output that violates the conventions, and review comments are not decreasing. The lead proposes sharing his dotfiles repository and having everyone copy it into their home directories. The project itself lives in a private GitHub repository.',
      question: 'What is the most appropriate way to apply the same conventions to everyone’s Claude Code output?',
      options: [
        'Share the dotfiles repository and have each member manually copy it into ~/.claude/',
        'Commit the conventions into the project repository’s CLAUDE.md and .claude/rules/ so they apply to everyone through the repo',
        'Organize the conventions in an onboarding wiki and have new members study it',
        'First build hooks that automatically detect convention violations at commit time'
      ],
      explanations: [
        'Copies freeze at copy time and require redistribution on every update; the person-dependence just moves into dotfiles.',
        'Correct. The deciding detail is that the rules live in a personal ~/.claude/ — that is what makes them person-dependent. Committing them to the repo applies them to everyone automatically, with version control.',
        'A wiki is documentation for humans; it has no effect on Claude Code’s behavior.',
        'Violation detection is after-the-fact; it does not make the output follow conventions in the first place.'
      ]
    }
  },
  {
    id: 'cc2-004', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '物流スタートアップのモノレポには、Goで書かれた api/ とTypeScriptの web/ がある。チームは「全サービス共通のセキュリティ方針（秘密情報の扱い・依存追加時の承認）」と「Go固有のエラーラップ規約」「web固有のアクセシビリティ規約」をClaude Codeに守らせたい。あるメンバーは管理のしやすさを理由に、すべてをルートのCLAUDE.md 1ファイルにまとめる案を出している。リポジトリのコントリビューターは11人で、PRは1日10本ほど流れる。',
      question: 'この規約群の配置として最も適切なのはどれか。',
      options: [
        'すべてルートのCLAUDE.mdに集約する。1ファイルなら更新漏れが起きない',
        '共通方針は各メンバーの ~/.claude/CLAUDE.md に置き、リポジトリにはサービス固有の規約だけをコミットする',
        '共通方針もサービス固有規約も、api/ と web/ の両方のCLAUDE.mdにそれぞれ全文を書く',
        '共通方針はルートのCLAUDE.mdに置き、Go固有は api/、web固有は web/ 配下のCLAUDE.mdに分けて置く'
      ],
      explanations: [
        '1ファイル集約は、webの作業でもGo規約が毎回読み込まれるなど無関係なコンテキストを常に消費し、肥大化の起点になる。',
        '共通方針こそ全員・全作業に効かせたいものであり、個人ディレクトリに置くと属人化して新メンバーに効かない。',
        '同一内容の二重コピーは更新漏れの温床。共通部分は1箇所で管理すべき。',
        '正解。決め手は「共通」と「サービス固有」の分離。共通はルートで継承させ、固有規約は該当ディレクトリの作業時だけ効くように配置するのが階層設計の基本。'
      ]
    },
    en: {
      scenario: 'A logistics startup’s monorepo contains api/ written in Go and web/ written in TypeScript. The team wants Claude Code to follow a repo-wide security policy (secret handling, approval for new dependencies), plus Go-specific error-wrapping rules and web-specific accessibility rules. One member proposes putting everything into the single root CLAUDE.md for ease of management. The repo has 11 contributors and about 10 PRs a day.',
      question: 'What is the most appropriate placement for these rules?',
      options: [
        'Consolidate everything into the root CLAUDE.md; a single file avoids missed updates',
        'Put the common policy in each member’s ~/.claude/CLAUDE.md and commit only service-specific rules to the repo',
        'Write both the common policy and the service-specific rules in full in both api/ and web/ CLAUDE.md files',
        'Put the common policy in the root CLAUDE.md, Go-specific rules under api/, and web-specific rules under web/'
      ],
      explanations: [
        'A single consolidated file loads Go rules even during web work, constantly burning unrelated context and inviting bloat.',
        'The common policy is exactly what must reach everyone; personal directories make it person-dependent and it never reaches new members.',
        'Duplicated full copies are a breeding ground for update drift; shared content should live in one place.',
        'Correct. The deciding point is separating “common” from “service-specific”: the root file is inherited everywhere, while service rules load only when working in those directories.'
      ]
    }
  },
  {
    id: 'cc2-005', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '倉庫管理システムのリポジトリには、旧システムから移植した *.old.py が約40ファイルと、Goマイクロサービス用の *.service.go が複数ディレクトリに点在している。旧Pythonファイルには「修正時は必ず互換テストを回す」、Goサービスファイルには「独自のロギング規約に従う」を適用したい。メンバーが .claude/rules/legacy.md を作成し、フロントマターに paths: "\\.old\\.py$|\\.service\\.go$" と1本の正規表現で書いたPRを出してきた。あなたはレビューを依頼されている。',
      question: 'このフロントマターへのレビュー指摘として最も適切なのはどれか。',
      options: [
        'pathsはグロブパターンの配列で指定する。paths: ["**/*.old.py", "**/*.service.go"] のように書き直す',
        '方向性は正しいので、正規表現のエスケープ漏れだけ修正すればよい',
        'pathsではなくmatchキーを使う仕様なので、キー名を修正する',
        '1つのルールファイルに複数の対象は書けないため、ファイルを2つに分割する'
      ],
      explanations: [
        '正解。決め手はpathsの書式。正規表現ではなくグロブパターンの配列を取り、複数のglobを並べることで複数種類のファイルに1ファイルのルールを適用できる。',
        '書式そのものが正規表現ではないため、エスケープを直しても意図どおりに動かない。',
        'matchというキーは存在しない。それらしい名前の別キーに置き換えるのは誤り。',
        '配列に複数のglobを列挙できるため分割は不要。分割はむしろ管理対象を増やす。'
      ]
    },
    en: {
      scenario: 'A warehouse-management repo contains about 40 legacy files named *.old.py ported from the old system, plus *.service.go files for Go microservices scattered across directories. The team wants a rule “always run the compatibility tests when modifying” applied to the legacy Python files and “follow the custom logging conventions” applied to the Go service files. A member created .claude/rules/legacy.md and submitted a PR whose frontmatter reads paths: "\\.old\\.py$|\\.service\\.go$" as a single regular expression. You are asked to review it.',
      question: 'What is the most appropriate review comment on this frontmatter?',
      options: [
        'paths takes an array of glob patterns; rewrite it as paths: ["**/*.old.py", "**/*.service.go"]',
        'The direction is right; just fix the missing escapes in the regular expression',
        'The spec uses a match key instead of paths, so rename the key',
        'A single rules file cannot target multiple patterns, so split it into two files'
      ],
      explanations: [
        'Correct. The deciding point is the format: paths takes an array of globs, not a regex, and listing multiple globs applies one rules file to multiple file types.',
        'The format itself is not a regular expression, so fixing escapes will not make it work.',
        'There is no match key; swapping in a plausible-sounding key name is wrong.',
        'Multiple globs can be listed in the array, so splitting is unnecessary and just multiplies maintenance.'
      ]
    }
  },
  {
    id: 'cc2-006', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'ヘルスケア系スタートアップに入社したエンジニアが、リポジトリの .claude/rules/db-migration.md に paths: ["db/migrations/**"] というフロントマターが付いているのを見つけ、「これはClaudeがこのフォルダのファイルを探しに行くための設定ですか」と質問してきた。実際、READMEを更新する作業ではこのルールの内容が会話に反映されている様子はなく、マイグレーションファイルを修正したときには規約どおりの出力になっていた。ルール本文には命名規則とロールバック手順が書かれている。',
      question: 'このpaths指定の役割として正しい説明はどれか。',
      options: [
        '起動時に該当パスのファイルを検索してインデックスを作るための設定である',
        '該当パス以外のファイルへの編集をブロックする権限設定である',
        '該当パスのファイルを扱う作業のときだけルールを読み込むという条件で、無関係な作業ではコンテキストを消費しない',
        '該当パスの変更を監視してhooksを発火させるためのトリガー設定である'
      ],
      explanations: [
        'pathsは検索やインデックス作成の指示ではない。「ファイルを探す」設定だという理解が典型的な誤解。',
        '編集の可否を決めるのはpermissionsであり、rulesのpathsに編集ブロックの機能はない。',
        '正解。決め手はREADME作業では効かず、マイグレーション作業でだけ効いたという挙動。pathsは「いつルールを読み込むか」の条件で、コンテキスト節約の仕組み。',
        'イベント連動でコマンドを実行するのはhooksの領域で、rulesのpathsとは別の仕組み。'
      ]
    },
    en: {
      scenario: 'An engineer who just joined a healthcare startup found that the repo’s .claude/rules/db-migration.md has frontmatter paths: ["db/migrations/**"], and asked, “Is this a setting that makes Claude go search for files in this folder?” In practice, when they were updating the README the rule’s content never seemed to appear in the conversation, but when they modified a migration file the output followed the conventions. The rule body describes naming rules and rollback procedures.',
      question: 'Which statement correctly describes the role of this paths setting?',
      options: [
        'It makes Claude search and index the matching files at startup',
        'It is a permission setting that blocks edits to files outside the matching paths',
        'It is a condition that loads the rule only when working on files under the matching paths, so unrelated work spends no context on it',
        'It is a trigger that watches the matching paths for changes and fires hooks'
      ],
      explanations: [
        'paths is not an instruction to search or index; “it finds files” is the classic misreading.',
        'Edit permissions are governed by the permissions system; a rule’s paths cannot block edits.',
        'Correct. The deciding evidence is the observed behavior: inert during README work, active during migration work. paths controls when a rule is loaded, saving context.',
        'Running commands on events is the domain of hooks, a separate mechanism from rule paths.'
      ]
    }
  },
  {
    id: 'cc2-007', domain: 'claudecode', answer: 1,
    ja: {
      scenario: 'EC企業のモノレポには15のマイクロサービスがあり、以前の担当者が「確実に読ませたい」という理由で、DBアクセス規約を書いた同一内容のCLAUDE.mdを15サービスのディレクトリすべてにコピーしていた。先月、接続プールに関する新ルールを追記した際、15ファイル中2ファイルの更新が漏れ、そのサービスだけ古い規約で実装が進んでレビューで発覚した。リポジトリはトランクベース運用で、デプロイは日次。規約の見直しは四半期ごとに入る。',
      question: 'この保守性の問題への対処として最も適切なのはどれか。',
      options: [
        '15ファイルの内容が一致しているかをCIで検査するスクリプトを追加する',
        '規約を .claude/rules/ の1ファイルにまとめ、pathsに対象サービスのglobを複数列挙して適用する',
        '15ファイルを削除し、規約をすべてルートのCLAUDE.mdに移す',
        '実体ファイルを1つにして、15のディレクトリへシンボリックリンクを張る'
      ],
      explanations: [
        '不一致の検出はできるが、15ファイルを更新し続ける運用自体が残る。対症療法にとどまる。',
        '正解。決め手は同一規約の多重コピーという構造。pathsはglobの配列を取れるので、規約1ファイルを複数サービスに適用でき、更新箇所が1つになる。',
        'ルート集約だと全作業で常時読み込まれ、無関係なフロントエンド作業などでもコンテキストを消費する。',
        '同期問題は解けるが読み込みタイミングは制御できず、リンクの管理という別の煩雑さが増える。pathsが本来の解決策。'
      ]
    },
    en: {
      scenario: 'An e-commerce monorepo has 15 microservices. A previous maintainer, wanting the rules “definitely read,” copied an identical CLAUDE.md containing DB-access conventions into all 15 service directories. Last month, when a new connection-pool rule was added, 2 of the 15 files were missed; those services were implemented against the stale conventions and it surfaced in review. The repo is trunk-based with daily deploys, and conventions are revised quarterly.',
      question: 'What is the most appropriate fix for this maintainability problem?',
      options: [
        'Add a CI script that checks the 15 files stay identical',
        'Consolidate the conventions into one file under .claude/rules/ and list multiple service globs in paths',
        'Delete the 15 files and move everything into the root CLAUDE.md',
        'Keep one physical file and create symbolic links in the 15 directories'
      ],
      explanations: [
        'It detects drift but keeps the 15-copy workflow alive; it treats the symptom.',
        'Correct. The deciding structure is the duplicated identical rules. paths takes an array of globs, so one rules file can target many services and there is a single place to update.',
        'Root consolidation loads the rules during every task, spending context even on unrelated frontend work.',
        'Symlinks fix synchronization but cannot control when the content is loaded, and add link-management overhead; paths is the designed solution.'
      ]
    }
  },
  {
    id: 'cc2-008', domain: 'claudecode', answer: 3,
    ja: {
      scenario: 'メディア企業の開発チームでは、ルートのCLAUDE.mdが1,200行まで育っている。iOSアプリのSwift規約、インフラのTerraform規約、データ基盤のdbt規約までがすべて1ファイルに詰め込まれている。最近メンバーから「READMEを1行直すだけの依頼でも動きが重い」「セッションの後半になるとルールを無視されることがある」という声が出始めた。Claude Codeは最新版に更新済みで、リポジトリのサイズは1.2GBある。',
      question: 'この状況への改善として最も適切なのはどれか。',
      options: [
        'CLAUDE.mdを英語に書き換えてトークン数を圧縮する',
        'より大きいコンテキストウィンドウを持つモデルへ切り替える',
        'ルールの読み込みを作業種別ごとにスキップする設定をhooksに追加する',
        '領域別ルールを .claude/rules/*.md のpathsやサブディレクトリのCLAUDE.mdへ分割し、関係する作業のときだけ読み込まれるようにする'
      ],
      explanations: [
        '多少の圧縮にはなるが、無関係なルールが全作業で読み込まれる構造は変わらない。',
        '器を広げても、毎回不要なルールでコンテキストを埋める根本構造が残る。実在する対処だが今回の決め手を外している。',
        'hooksはイベント連動のコマンド実行の仕組みで、ルール読み込みの取捨選択を行う機能はない。',
        '正解。決め手は「どの作業でも1,200行全部が読み込まれる」構造。pathsやサブディレクトリ分割で読み込みを作業に関係する分だけに絞るのが設計どおりの解決。'
      ]
    },
    en: {
      scenario: 'At a media company, the root CLAUDE.md has grown to 1,200 lines. Swift conventions for the iOS app, Terraform conventions for infra, and dbt conventions for the data platform are all packed into the one file. Members have started saying that even a one-line README fix feels sluggish, and that rules sometimes get ignored late in a session. Claude Code is fully updated, and the repository is 1.2 GB.',
      question: 'What is the most appropriate improvement?',
      options: [
        'Rewrite CLAUDE.md in English to compress the token count',
        'Switch to a model with a larger context window',
        'Add a hooks setting that skips rule loading depending on the task type',
        'Split the domain-specific rules into .claude/rules/*.md with paths or subdirectory CLAUDE.md files, so they load only for related work'
      ],
      explanations: [
        'It shaves some tokens but leaves the structure where unrelated rules load for every task.',
        'A bigger window still gets filled with irrelevant rules every session; a real remedy for a different problem, missing the decisive issue here.',
        'Hooks run commands on events; they have no capability to filter which rules get loaded.',
        'Correct. The decisive structure is that all 1,200 lines load for every task. Splitting with paths or subdirectory files limits loading to relevant work — the designed solution.'
      ]
    }
  },
  {
    id: 'cc2-009', domain: 'claudecode', answer: 0,
    ja: {
      scenario: 'ゲーム会社のモノレポで、共通のセキュリティレビュー規約を6つのサービスに適用したい。インフラ担当は「実体ファイルを1つ置いて、各サービスディレクトリにシンボリックリンクを張れば同期問題は起きない」と提案した。別のメンバーは「.claude/rules/ にルールファイルを置いてpathsで6サービスのglobを指定するのと同じことでは」と述べ、どちらでもよいという空気になっている。リポジトリはGit LFSを使っており、CIはセルフホストランナーで動いている。',
      question: '2つの方式の違いの説明として正しいものはどれか。',
      options: [
        'シンボリックリンクは複数箇所から同一ファイルを参照させるだけで読み込みタイミングは制御できない。pathsは該当ファイルを扱うときだけ読み込む条件を定義でき、コンテキスト管理の意味が異なる',
        'シンボリックリンクはgitで管理できるがpathsの設定はローカル限定なので、チーム共有ならシンボリックリンク一択である',
        'pathsを使っても起動時に全ルールが読み込まれるため、コンテキスト消費はシンボリックリンクと変わらない',
        '両者は機能的に完全に等価であり、チームの好みで選んで問題ない'
      ],
      explanations: [
        '正解。決め手は「同期」と「読み込み制御」の違い。リンクは実体を共有するだけだが、pathsは無関係な作業でルールを読み込まない条件を与える。',
        '.claude/rules/ はリポジトリにコミットでき、チーム全員に共有される。ローカル限定という前提が誤り。',
        'pathsの本質は条件付き読み込みであり、該当しない作業ではコンテキストを消費しない。',
        '内容の同期という点では似て見えるが、読み込みタイミングの制御有無という本質的な差がある。'
      ]
    },
    en: {
      scenario: 'In a game studio’s monorepo, the team wants a shared security-review rule applied to six services. The infra engineer proposes keeping one physical file and placing symbolic links in each service directory so nothing drifts. Another member says that putting a rules file under .claude/rules/ with six service globs in paths “amounts to the same thing,” and the room is leaning toward “either is fine.” The repo uses Git LFS and CI runs on self-hosted runners.',
      question: 'Which statement correctly describes the difference between the two approaches?',
      options: [
        'Symlinks only make multiple locations reference the same file and cannot control load timing; paths defines a condition to load the rule only when touching matching files, which is a different kind of context management',
        'Symlinks can be managed in git while paths settings are local-only, so symlinks are the only option for team sharing',
        'Even with paths, all rules load at startup, so context consumption equals the symlink approach',
        'The two are functionally identical, so the team can pick by preference'
      ],
      explanations: [
        'Correct. The deciding distinction is synchronization versus load control: links share content, while paths prevents the rule from loading during unrelated work.',
        '.claude/rules/ is committed to the repository and shared with the whole team; the local-only premise is false.',
        'The essence of paths is conditional loading; non-matching work spends no context on the rule.',
        'They look similar for keeping content in sync, but differ fundamentally in whether load timing is controlled.'
      ]
    }
  },
  {
    id: 'cc2-010', domain: 'claudecode', answer: 2,
    ja: {
      scenario: '会計SaaSのチームは、CLAUDE.mdの冒頭に「コードを変更したら必ず npm run test:unit を実行すること」と太字で書いている。それでも長いセッションの終盤や、複数ファイルにまたがる修正の後で、テスト未実行のままコミットされるケースが月に数回発生し、翌朝のCIで発覚して差し戻しになっている。テスト自体は3分で終わる。チームはトランクベース開発を採用しており、コミットは1日30件ほどある。',
      question: 'テスト実行を確実にする方法として最も適切なのはどれか。',
      options: [
        'CLAUDE.mdの該当指示をさらに目立つ位置に移し、より強い表現に書き換える',
        'カスタムスラッシュコマンド /test を作り、コミット前に実行する運用を周知する',
        'hooksでファイル編集イベントに連動して npm run test:unit を自動実行するよう設定する',
        'コミット前にペアのメンバーがテスト実行を確認するチェックリスト運用にする'
      ],
      explanations: [
        '既に太字で冒頭にある指示が守られないことがあるのが問題。指示は実行の保証ではなく、強調しても構造は変わらない。',
        'コマンド化しても起動は手動のままで、実行漏れの余地が残る。定型手順の共有には良い手だが今回の決め手を外している。',
        '正解。決め手は「書いてあるのに実行されないことがある」という点。hooksはイベントに連動してコマンドを必ず実行するため、指示ではなく仕組みで保証できる。',
        '人間の確認は忘れや形骸化が起こる。自動化できるものを運用でカバーするのは逆方向。'
      ]
    },
    en: {
      scenario: 'An accounting-SaaS team has written in bold at the top of CLAUDE.md: “Always run npm run test:unit after changing code.” Even so, a few times a month — late in long sessions or after multi-file changes — commits land without the tests having run, and the next morning’s CI catches it and the work is bounced back. The test suite takes three minutes. The team practices trunk-based development with about 30 commits a day.',
      question: 'What is the most appropriate way to make sure the tests actually run?',
      options: [
        'Move the instruction to an even more prominent spot in CLAUDE.md and phrase it more forcefully',
        'Create a custom slash command /test and tell everyone to run it before committing',
        'Configure a hook tied to file-edit events that automatically runs npm run test:unit',
        'Adopt a checklist process where a pair member confirms the tests ran before each commit'
      ],
      explanations: [
        'The instruction is already bold and at the top, yet it gets skipped; an instruction is not a guarantee of execution, and emphasis does not change the structure.',
        'A command still requires manual invocation, leaving room for omission; good for sharing procedures, but it misses the decisive issue.',
        'Correct. The deciding fact is “it is written down but sometimes not executed.” Hooks run the command automatically on the event, guaranteeing it by mechanism rather than instruction.',
        'Human confirmation gets forgotten and degrades into ritual; covering an automatable step with process runs the wrong way.'
      ]
    }
  },
  {
    id: 'cc2-011', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '機械学習基盤チームのPythonリポジトリでは、CLAUDE.mdに「編集後は必ずblackとisortをかける」と書いてあるにもかかわらず、Claude Codeの編集にフォーマット未適用の差分が混ざることがあり、レビュアーが毎回スタイル指摘に時間を取られている。CIには既にフォーマットチェックがあり違反PRは落ちるが、指摘と修正の往復で1〜2日のリードタイムが発生している。チームは6人で、週20本前後のPRを処理している。',
      question: 'レビューの往復を減らす仕組みとして最も適切なのはどれか。',
      options: [
        'CLAUDE.mdに実行すべきコマンドの具体例とオプションを追記する',
        'ファイル編集イベントに連動するhookでblackとisortを自動実行する',
        'カスタムスラッシュコマンド /format を用意し、PR作成前に実行してもらう',
        'CIのフォーマットチェックをより厳格な設定に強化する'
      ],
      explanations: [
        '指示を具体化しても、指示が実行の保証にならない構造は変わらない。',
        '正解。決め手は「書いてあるのに適用されないことがある」点。編集イベントに連動するhookなら人もモデルも介在せず、フォーマットが仕組みとして必ず適用される。',
        '手動起動のため実行漏れが残り、往復の原因が解消しない。',
        '検出は既にCIができている。問題は検出後の往復時間であり、チェック強化では往復は減らない。'
      ]
    },
    en: {
      scenario: 'In an ML-platform team’s Python repository, CLAUDE.md says “always run black and isort after editing,” yet unformatted diffs still slip into Claude Code’s edits, and reviewers keep spending time on style comments. CI already has a format check that fails violating PRs, but the comment-and-fix round trips add one to two days of lead time. The team has six people handling about 20 PRs a week.',
      question: 'What is the most appropriate mechanism to reduce the review round trips?',
      options: [
        'Add concrete command examples and options to CLAUDE.md',
        'Run black and isort automatically via a hook tied to file-edit events',
        'Provide a custom slash command /format and ask everyone to run it before opening a PR',
        'Tighten the CI format check with stricter settings'
      ],
      explanations: [
        'Making the instruction more concrete does not change the fact that an instruction is not a guarantee of execution.',
        'Correct. The deciding fact is “it is written down but sometimes not applied.” A hook on the edit event applies formatting mechanically, with no human or model in the loop.',
        'Manual invocation leaves room for omission, so the cause of the round trips remains.',
        'Detection already works in CI; the problem is the round-trip time after detection, which stricter checks do not reduce.'
      ]
    }
  },
  {
    id: 'cc2-012', domain: 'claudecode', answer: 3,
    ja: {
      scenario: 'BtoB SaaSのチームでは月2回のリリース作業（CHANGELOGの更新、バージョン番号の繰り上げ、タグ作成、リリースノート下書き）を、当番のメンバーが毎回自分の言葉でClaude Codeに依頼している。先月はCHANGELOGの更新が抜け、今月はバージョン番号の付け方が前回と違うという指摘が入った。当番は5人の持ち回りで、リリース手順自体はConfluenceに文書化されている。',
      question: 'この手順のばらつきをなくす方法として最も適切なのはどれか。',
      options: [
        'Confluenceの手順書を最新化し、当番が毎回それをコピーしてClaude Codeに貼り付ける運用にする',
        'リリース手順をhooksに設定し、自動で実行されるようにする',
        '各メンバーが自分の個人設定にリリース用のカスタムコマンドを作る',
        'リリース手順をカスタムスラッシュコマンドとしてリポジトリにコミットし、全員が同じコマンドで同じ流れを実行する'
      ],
      explanations: [
        '毎回の手動コピペは貼り忘れ・版ズレが起こる。文書は正しくても実行が人に依存したままになる。',
        'hooksはツールイベントに連動する仕組みで、月2回オンデマンドで起動する多段手順の入口には合わない。',
        '個人設定のコマンドは内容が人ごとにズレていき、当番制ではまさに属人化が再発する。',
        '正解。決め手は「同じ定型手順を誰がやっても同じ流れで」という要件。コマンドをリポジトリにコミットすれば、5人の当番全員が同一手順を再現できる。'
      ]
    },
    en: {
      scenario: 'A B2B SaaS team performs a twice-monthly release procedure — updating the CHANGELOG, bumping the version, creating a tag, drafting release notes — and the member on duty describes it to Claude Code in their own words each time. Last month the CHANGELOG update was missed; this month the version was bumped differently from last time. Five people rotate the duty, and the procedure itself is documented in Confluence.',
      question: 'What is the most appropriate way to eliminate this variance?',
      options: [
        'Keep the Confluence document current and have the on-duty member copy-paste it into Claude Code every time',
        'Configure the release procedure in hooks so it runs automatically',
        'Have each member create a personal release command in their own settings',
        'Commit the procedure as a custom slash command in the repository so everyone runs the same flow with the same command'
      ],
      explanations: [
        'Manual copy-paste invites forgotten pastes and version drift; the document may be right but execution stays person-dependent.',
        'Hooks fire on tool events; they are the wrong entry point for an on-demand, multi-step procedure run twice a month.',
        'Personal commands drift apart per person — exactly the person-dependence a rotation must avoid.',
        'Correct. The deciding requirement is “the same routine procedure, identical for whoever runs it.” A slash command committed to the repo lets all five reproduce one flow.'
      ]
    }
  },
  {
    id: 'cc2-013', domain: 'claudecode', answer: 0,
    ja: {
      scenario: 'SREチームはClaude CodeでTerraformの運用作業を行っている。CLAUDE.mdには「destroy系・削除系のコマンドは実行前に必ず人間に確認すること」と明記していたが、先週、長いデバッグセッションの中でステージング環境への terraform destroy が承認直前まで進むヒヤリハットが起きた。担当者は「ルールに書いてあるのに」と驚いている。チームはstate管理にTerraform Cloudを使っており、環境は3面ある。',
      question: '再発防止策として最も適切なのはどれか。',
      options: [
        'permissions設定で該当コマンドをdenyまたはaskに指定し、ツール側で実行を制御する',
        'CLAUDE.mdの警告を強化し、禁止コマンド名を網羅的に列挙する',
        '本番の認証情報をClaude Codeから参照できない場所に隔離する',
        'Bashツールの利用自体を全面的に無効化する'
      ],
      explanations: [
        '正解。決め手はCLAUDE.mdの記述が「指示」であって「強制」ではないこと。危険コマンドはpermissionsでツール側からブロック・確認必須にするのが仕組みによる防御。',
        '指示の列挙を増やしても、長いセッションで指示が薄れる構造は変わらない。',
        '認証情報の隔離は別の実在するセキュリティ対策だが、今回のヒヤリはステージングで起きており、コマンド実行の制御という決め手を外している。',
        '全面無効化では通常のterraform planやテストも実行できなくなり、運用が成立しない過剰対応。'
      ]
    },
    en: {
      scenario: 'An SRE team uses Claude Code for Terraform operations. CLAUDE.md clearly states that destroy- and delete-type commands must be confirmed with a human before execution. Last week, however, during a long debugging session, a terraform destroy against the staging environment progressed to the brink of approval — a near miss. The engineer was shocked: “But it is written in the rules.” The team manages state in Terraform Cloud and runs three environments.',
      question: 'What is the most appropriate measure to prevent recurrence?',
      options: [
        'Specify the commands as deny or ask in the permissions settings so the tool itself controls execution',
        'Strengthen the CLAUDE.md warning and exhaustively list the forbidden command names',
        'Isolate the production credentials somewhere Claude Code cannot reference',
        'Disable the Bash tool entirely'
      ],
      explanations: [
        'Correct. The deciding fact is that CLAUDE.md content is instruction, not enforcement. Dangerous commands should be blocked or gated by permissions at the tool level.',
        'Listing more commands does not change the structure in which instructions fade during long sessions.',
        'Credential isolation is a real security practice, but the near miss happened in staging; it misses the decisive issue of controlling command execution.',
        'A total ban also kills ordinary terraform plan and tests — an overreaction that breaks operations.'
      ]
    }
  },
  {
    id: 'cc2-014', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'データ分析基盤のチームは、毎晩のGitHub Actionsジョブで前日のスキーマ変更サマリーをClaude Codeに生成させる仕組みを追加した。ところが初回実行からジョブが6時間のタイムアウトまで進まず、ログには起動直後のバナーが表示されたまま何も出力されない。担当者はタイムアウトを12時間に延ばし、ランナーのスペックも上げたが変わらなかった。APIキーは正しく設定されており、同じコマンドは手元のターミナルでは問題なく動く。',
      question: '原因と対処の組み合わせとして最も適切なのはどれか。',
      options: [
        'APIのレート制限で待機している。リトライ間隔とバックオフの設定を追加する',
        '--background を付けてバックグラウンド実行に切り替える',
        '既定の起動は対話モードのため入力待ちでハングしている。-p（--print）で非インタラクティブに1回実行し、結果を標準出力に出す',
        '権限承認を自動化する環境変数が未設定なので追加する'
      ],
      explanations: [
        'レート制限ならエラーや再試行のログが出るのが普通で、バナーのまま無出力という症状と合わない。',
        '--backgroundは処理を裏に回すだけで、対話モードで入力を待つという原因は解消しない。',
        '正解。決め手は「手元のターミナルでは動く（＝人間が入力できる）」という対比。CIには入力する人間がいないため、対話モード起動は入力待ちで止まる。-pが非インタラクティブ実行の正攻法。',
        '止まっているのは権限承認ではなく起動モード。承認を自動化しても対話モードの入力待ちは残る。'
      ]
    },
    en: {
      scenario: 'A data-platform team added a nightly GitHub Actions job that has Claude Code generate a summary of the previous day’s schema changes. From the first run, the job sits until the 6-hour timeout; the log shows the startup banner and then nothing. The engineer extended the timeout to 12 hours and upgraded the runner, with no change. The API key is configured correctly, and the same command works fine in a local terminal.',
      question: 'Which combination of cause and fix is most appropriate?',
      options: [
        'It is waiting on API rate limits; add retry intervals and backoff settings',
        'Add --background to switch to background execution',
        'The default launch is interactive and is hanging waiting for input; run non-interactively with -p (--print) to execute once and write the result to stdout',
        'The environment variable that auto-approves permissions is missing; add it'
      ],
      explanations: [
        'Rate limiting would normally show errors or retries in the log, which does not match a silent banner.',
        '--background just moves the process out of the way; it does not remove the interactive wait for input.',
        'Correct. The deciding contrast is “works in a local terminal” — where a human can type. CI has no human, so an interactive launch blocks on input. -p is the standard non-interactive execution.',
        'What blocks is the launch mode, not permission approval; automating approval leaves the interactive wait in place.'
      ]
    }
  },
  {
    id: 'cc2-015', domain: 'claudecode', answer: 1,
    ja: {
      scenario: 'モバイルアプリのチームは、PR作成時にClaude Codeへ差分の説明文を生成させるGitHub Actionsステップを作っている。同僚が技術ブログで見たという「CI環境では --ci-mode を付ければよい」という話を共有してきたが、手元のヘルプ出力にそのフラグが見当たらず自信が持てない。パイプラインには他にlintとE2Eテストのジョブがあり、生成した説明文は後続ステップでPRコメントとして投稿する予定である。',
      question: 'このステップの実装として正しいものはどれか。',
      options: [
        'claude --ci-mode "差分を要約して" のようにCI専用モードで起動する',
        'claude -p "差分を要約して" のように非インタラクティブ実行し、標準出力を後続ステップに渡す',
        'claude --background で起動し、ログファイルをtailして完了を待つ',
        'claude --headless で起動してTTYなしでの実行を宣言する'
      ],
      explanations: [
        '--ci-modeというフラグは存在しない。それらしい名前だが、ヘルプに見当たらないという記述がヒントだった。',
        '正解。決め手は「1回実行して結果を後続ステップに渡す」という要件。-p（--print）が非インタラクティブに1回実行して標準出力に出す正式な方法。',
        '--backgroundは裏で走らせて即座に制御を返すため、後続ステップが結果を受け取れない。',
        '--headlessというフラグも存在しない。実在しそうな名前に注意。'
      ]
    },
    en: {
      scenario: 'A mobile-app team is building a GitHub Actions step that has Claude Code generate a description of the diff when a PR is opened. A colleague shares advice from a tech blog claiming “just add --ci-mode in CI environments,” but the flag does not appear in the local help output and confidence is low. The pipeline also has lint and E2E jobs, and the generated text will be posted as a PR comment by a later step.',
      question: 'Which implementation of this step is correct?',
      options: [
        'Launch with a CI-specific mode such as claude --ci-mode "summarize the diff"',
        'Run non-interactively, e.g. claude -p "summarize the diff", and pass stdout to the next step',
        'Launch with claude --background and tail a log file to wait for completion',
        'Launch with claude --headless to declare TTY-less execution'
      ],
      explanations: [
        'There is no --ci-mode flag; it sounds plausible, and its absence from the help output was the clue.',
        'Correct. The deciding requirement is “run once and hand the result to the next step.” -p (--print) is the official non-interactive, run-once-to-stdout mode.',
        '--background returns control immediately while work continues elsewhere, so the next step cannot receive the result.',
        'There is no --headless flag either; beware of plausible-sounding inventions.'
      ]
    }
  },
  {
    id: 'cc2-016', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '社内ツールのリポジトリで、CIのドキュメント生成ステップにClaude Codeを組み込んだメンバーが「他のジョブをブロックしないように」と --background を付けた。ステップは数秒でグリーンになるのだが、成果物のはずの docs/summary.md が空だったり、ファイル自体が存在しなかったりする。ランナーのメモリは十分にあり、再実行しても結果は安定しない。ローカルで同じコマンドを実行すると正しいファイルが生成される。',
      question: '起きていることの説明と修正として最も適切なのはどれか。',
      options: [
        '権限プロンプトで停止している。自動承認の環境変数を設定する',
        '標準出力のバッファリングの問題なので、リダイレクトの書き方を修正する',
        'ランナーのリソース不足でバックグラウンドプロセスが強制終了されている',
        '--backgroundは処理を裏で走らせて即座に制御を返すため、CIステップが生成完了を待たずに終了している。-pによる同期実行へ変更する'
      ],
      explanations: [
        '承認待ちならステップは止まるはずで、「数秒でグリーン」という症状と矛盾する。',
        'バッファリングではファイルが丸ごと欠けることは説明できない。',
        'メモリは十分と明示されており、リソース不足を疑うのはノイズの追跡。',
        '正解。決め手は「数秒でグリーンなのに成果物がない」という組み合わせ。--backgroundは制御を即返すためCIは完了を待たない。結果を待つCIステップには-pの同期実行が正しい。'
      ]
    },
    en: {
      scenario: 'In an internal-tools repo, the member who added Claude Code to a CI documentation step attached --background “so it would not block other jobs.” The step goes green in seconds, but the expected artifact docs/summary.md is sometimes empty and sometimes missing entirely. The runner has plenty of memory, and reruns are inconsistent. Running the same command locally produces the correct file.',
      question: 'Which explanation and fix is most appropriate?',
      options: [
        'It is stopped at a permission prompt; set the auto-approval environment variable',
        'It is a stdout buffering problem; fix the redirection',
        'The background process is being killed by runner resource exhaustion',
        '--background runs the work in the background and returns control immediately, so the CI step finishes without waiting for generation; switch to synchronous execution with -p'
      ],
      explanations: [
        'A permission wait would stall the step, contradicting “green in seconds.”',
        'Buffering cannot explain an entirely missing file.',
        'Memory is explicitly sufficient; chasing resources is chasing the noise.',
        'Correct. The deciding combination is “green in seconds, yet no artifact.” --background returns immediately, so CI never waits; a CI step that needs the result must run synchronously with -p.'
      ]
    }
  },
  {
    id: 'cc2-017', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '保険系システムのチームは、週次レポートを生成するJenkinsジョブに claude "先週の変更をまとめて" という呼び出しを組み込んだが、ジョブが毎回入力待ちのまま止まる。担当者は「権限確認のダイアログで止まっているに違いない」と推測し、権限承認を自動化する環境変数をジョブに設定した。しかし症状はまったく変わらない。シークレットの注入は正しく行われており、同じコマンドは手元のターミナルでは対話セッションとして正常に立ち上がる。',
      question: '症状が変わらない理由として最も適切なのはどれか。',
      options: [
        'ハングの原因は対話モード起動による入力待ちであり、権限承認の自動化では実行モードの問題は解決しない。-p を付けて非インタラクティブ実行にする必要がある',
        '環境変数がJenkinsのステップに正しく引き継がれていないため、設定方法を見直す必要がある',
        '権限承認は環境変数では制御できず、permissions設定ファイルの編集でしか変更できない',
        'CIランナーにTTYがないため、環境変数自体が読み込まれない'
      ],
      explanations: [
        '正解。決め手は「手元では対話セッションとして立ち上がる」という記述。ジョブは権限ではなく対話モードのプロンプト入力を待っている。承認の自動化は別レイヤーの設定で、実行モードは変わらない。',
        '環境変数の引き継ぎ問題は実在するが、仮に正しく渡っていても対話モードの入力待ちは解消しない。',
        '承認の制御方法の議論であり、そもそも止まっている原因が承認ではない。',
        'TTYの有無と環境変数の読み込みは無関係。もっともらしいが技術的に成り立たない。'
      ]
    },
    en: {
      scenario: 'An insurance-systems team wired a Jenkins job to call claude "summarize last week’s changes" for a weekly report, but the job stalls waiting for input every time. The engineer guessed it must be stuck on a permission-approval dialog and set the environment variable that automates permission approval in the job. The symptom did not change at all. Secrets are injected correctly, and the same command launches a normal interactive session in a local terminal.',
      question: 'What is the most appropriate explanation for why the symptom is unchanged?',
      options: [
        'The hang comes from launching in interactive mode and waiting for input; automating permission approval does not solve an execution-mode problem. It needs -p for non-interactive execution',
        'The environment variable is not being passed into the Jenkins step correctly, so the configuration must be revisited',
        'Permission approval cannot be controlled by environment variables; it can only be changed by editing the permissions settings file',
        'The CI runner has no TTY, so environment variables themselves are not loaded'
      ],
      explanations: [
        'Correct. The deciding clue is that locally it starts an interactive session. The job is waiting at the interactive prompt, not on permissions; approval automation is a different layer and does not change the launch mode.',
        'Variable-passing problems are real, but even a correctly passed variable would not remove the interactive wait.',
        'That debates how approval is controlled, but approval is not what is blocking in the first place.',
        'TTY presence has nothing to do with whether environment variables load; plausible-sounding but technically wrong.'
      ]
    }
  },
  {
    id: 'cc2-018', domain: 'claudecode', answer: 2,
    ja: {
      scenario: '動画配信サービスのエンジニアは、Claude Codeとの長いセッションでキャッシュ層のリファクタ方針Aをほぼ実装し終えたところで、別の方針Bのほうが筋が良いかもしれないと感じ始めた。これまでの調査結果や設計判断の文脈は捨てたくないが、方針Aの検討内容も残しておきたい。同僚から「fork-sessionを使えば」と助言されたが、別の同僚は「forkするとその会話がモデルの学習に使われて、他のセッションにも影響が出る機能でしょ」と言っており、チーム内で認識が割れている。',
      question: 'fork-sessionの説明として正しいものはどれか。',
      options: [
        '現在の会話内容をモデルに学習させ、以降の新規セッションへ反映させる機能である',
        'gitのブランチを自動作成し、ワークツリーを分離する機能である',
        '現在の会話コンテキストをコピーした分岐セッションを作り、同じ前提から別のアプローチを試せる機能である',
        '過去の会話を要約・圧縮して、長いセッションを継続できるようにする機能である'
      ],
      explanations: [
        'forkはモデルの学習とは無関係。会話がモデルの重みに反映されるという理解が典型的な誤解。',
        'gitのブランチ操作とは別物。名前の連想からの混同に注意。',
        '正解。決め手は「これまでの文脈を保ったまま別ルートを試したい」という要件。forkはコンテキストをコピーした分岐を作り、元のセッションはそのまま残る。',
        'それはコンテキスト圧縮（コンパクション）の説明であり、forkの機能ではない。'
      ]
    },
    en: {
      scenario: 'An engineer at a video-streaming service has nearly finished implementing cache-layer refactoring approach A in a long Claude Code session, and starts to feel that an alternative approach B might be sounder. They do not want to throw away the accumulated research and design context, but also want to keep the approach-A work. One colleague suggests fork-session, while another insists that “forking feeds the conversation into model training and affects other sessions,” and the team is split.',
      question: 'Which statement about fork-session is correct?',
      options: [
        'It trains the model on the current conversation so future new sessions reflect it',
        'It automatically creates a git branch and separates the worktree',
        'It creates a branched session with a copy of the current conversation context, letting you try a different approach from the same premises',
        'It summarizes and compresses past conversation so a long session can continue'
      ],
      explanations: [
        'Forking has nothing to do with model training; “the conversation gets baked into the weights” is the classic misconception.',
        'It is unrelated to git branching; beware of the name association.',
        'Correct. The deciding requirement is trying another route while keeping the context. Fork copies the context into a branch and the original session remains intact.',
        'That describes context compaction, not forking.'
      ]
    }
  },
  {
    id: 'cc2-019', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '医療データ基盤のチームで、あるエンジニアが本番相当データベースに対するマイグレーションスクリプトの検証をしたくなり、進行中のセッションをフォークした。本人は「フォークは実験用のサンドボックスだから、プロジェクトのpermissions設定やCLAUDE.mdのルールは効かなくなる。破壊的なコマンドも自由に試せる」と考えて検証を始めようとしている。リポジトリのpermissionsではDB系の危険コマンドがask設定になっており、環境は本番のスナップショットから毎朝リストアされる。',
      question: 'この認識について正しい説明はどれか。',
      options: [
        'フォークは独立したサンドボックスとして起動し、権限設定は初期状態にリセットされる',
        'フォークしてもpermissionsやプロジェクトのルールは引き続き適用される。分岐するのは会話コンテキストであり、安全設定が外れるわけではない',
        'フォーク側のセッションは読み取り専用になるため、そもそもスクリプトの実行はできない',
        'フォークではCLAUDE.mdが再読み込みされないため、ルールが適用されない状態で動作する'
      ],
      explanations: [
        'フォークで権限がリセットされる仕様はない。「実験用だから緩くなる」という期待が誤り。',
        '正解。決め手は「分岐するのは会話コンテキストだけ」という点。permissionsやプロジェクトルールはセッションの分岐に関係なく適用され続ける。',
        'フォークに読み取り専用の制約はない。安全側に倒した誤解だが仕様として誤り。',
        'フォーク後もプロジェクトのルールは有効。読み込まれない前提が誤り。'
      ]
    },
    en: {
      scenario: 'On a medical-data platform team, an engineer wants to test a migration script against a production-equivalent database and forks the ongoing session. They assume that “a fork is an experimental sandbox, so the project’s permissions settings and CLAUDE.md rules stop applying — destructive commands can be tried freely,” and are about to begin. The repo’s permissions set DB-related dangerous commands to ask, and the environment is restored from a production snapshot every morning.',
      question: 'Which statement about this assumption is correct?',
      options: [
        'A fork launches as an independent sandbox and permissions are reset to defaults',
        'Even after forking, permissions and project rules continue to apply; what branches is the conversation context, not the safety settings',
        'The forked session becomes read-only, so the script cannot be executed at all',
        'A fork does not reload CLAUDE.md, so it operates with no rules applied'
      ],
      explanations: [
        'There is no spec that resets permissions on fork; “it is for experiments so it loosens up” is the false expectation.',
        'Correct. The deciding point is that only the conversation context branches. Permissions and project rules apply regardless of session branching.',
        'Forks carry no read-only restriction; a safe-sounding but incorrect understanding.',
        'Project rules remain in effect after a fork; the premise that they are not loaded is wrong.'
      ]
    }
  },
  {
    id: 'cc2-020', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '人材系サービスのモノレポで、APIレスポンスのフィールド名を user_name から display_name に変更するタスクをClaude Codeに依頼した。Claudeはバックエンドのルート定義とシリアライザを修正してPRを作成し、CIはすべてグリーンだったが、ステージングに出すとプロフィール画面が表示されなくなった。フロントエンドは歴史的経緯で、古い画面がaxios、新しい画面がfetchとSWRフックを併用している。デザインチームからは今週中の反映を求められている。',
      question: 'このタスクの進め方として最も適切だったものはどれか。',
      options: [
        'バックエンド修正後にOpenAPIスキーマを再生成すれば、フロントエンドは自動的に追従するので追加作業は不要だった',
        'フロントエンドはレスポンスを動的に扱うため修正不要で、CDNとブラウザのキャッシュ削除だけで解決できた',
        'フロントエンドのaxios呼び出し箇所を検索し、該当フィールドを置換すればよかった',
        'バックエンドのルート定義に加え、axios・fetch・SWRフックなどフロント側のHTTPクライアントを横断検索し、当該フィールドを参照する箇所をすべて洗い出してから修正すべきだった'
      ],
      explanations: [
        'スキーマ再生成が効くのは型やクライアントを自動生成している場合のみで、手書きのフィールド参照は追従しない。',
        'フィールド名の参照はコードに静的に書かれており、キャッシュ削除では直らない。',
        'axiosだけではfetchとSWRフックの画面が漏れる。シナリオに埋め込まれた「併用」が決め手だった。',
        '正解。決め手はフロントが複数のHTTPクライアントを併用している点。API変更はバックエンドのルート定義とフロントの全クライアント呼び出しの両方を横断調査してから修正する。'
      ]
    },
    en: {
      scenario: 'In an HR-services monorepo, Claude Code was asked to rename an API response field from user_name to display_name. Claude modified the backend route definitions and serializers and opened a PR; CI was fully green, but on staging the profile screen stopped rendering. For historical reasons the frontend mixes clients: older screens use axios, newer ones use fetch and SWR hooks. The design team wants the change live this week.',
      question: 'Which way of carrying out this task would have been most appropriate?',
      options: [
        'After fixing the backend, regenerating the OpenAPI schema would have made the frontend follow automatically, so no extra work was needed',
        'The frontend handles responses dynamically and needed no changes; clearing the CDN and browser caches would have resolved it',
        'Searching the frontend for axios call sites and replacing the field there would have been enough',
        'In addition to the backend route definitions, search across the frontend HTTP clients — axios, fetch, and SWR hooks — to enumerate every reference to the field before making changes'
      ],
      explanations: [
        'Schema regeneration only helps when types or clients are code-generated; hand-written field references do not follow.',
        'Field references are written statically in code; cache clearing cannot fix them.',
        'axios alone misses the fetch and SWR screens; the mixed clients buried in the scenario were the decisive detail.',
        'Correct. The deciding detail is the mixed HTTP clients. An API change requires investigating both the backend routes and every frontend client call before editing.'
      ]
    }
  },
  {
    id: 'cc2-021', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '広告配信システムのリポジトリで、共通ユーティリティ関数 formatBudget のリネームと引数変更をClaude Codeに依頼したところ、関数定義と目についた3ヶ所の呼び出しだけが修正され、マージ後に管理画面のバッチ処理と社内CLIの2ヶ所が実行時エラーで停止した。あとから調べると、呼び出しは約30ファイルに散らばっていた。該当箇所はテストで守られておらず、カバレッジも低い。シニアエンジニアは次回から依頼の仕方を変えることにした。',
      question: '次回の依頼に含める指示として最も適切なのはどれか。',
      options: [
        'まず rg（grep）でシンボルの使用箇所を全件洗い出し、一覧を確認してから一括で修正するよう指示する',
        '修正前にテストスイート全体を実行し、失敗したテストから影響範囲を特定させる',
        'リネームはIDEのリファクタ機能で人間が行い、Claude Codeには任せないルールにする',
        '旧名の関数をエイリアスとして残し、呼び出し側を段階的に移行する方式を指示する'
      ],
      explanations: [
        '正解。決め手は「目についた箇所だけ直した」という調査不足。横断的な変更は、編集の前にrg/grepで全使用箇所を機械的に列挙するのが基本動作。',
        'カバレッジが低いと明記されており、テストでは影響範囲を網羅できない。実際に今回もテストは通っていた。',
        '道具を取り上げるだけで、調査してから直すという本質的な改善がない。',
        '段階移行は実在する手法だが、使用箇所を全件把握しないままでは移行漏れが同じように起こる。'
      ]
    },
    en: {
      scenario: 'In an ad-delivery repository, Claude Code was asked to rename the shared utility function formatBudget and change its arguments. It fixed the definition and the three call sites it happened to see; after merge, an admin-dashboard batch job and an internal CLI crashed at runtime. It later turned out the calls were scattered across about 30 files. The area had no test protection and coverage is low. A senior engineer decided to change how the next request is phrased.',
      question: 'What is the most appropriate instruction to include next time?',
      options: [
        'Instruct it to first enumerate every usage of the symbol with rg (grep), review the list, and then fix all of them in one pass',
        'Instruct it to run the full test suite first and identify the impact from failing tests',
        'Make a rule that renames are done by humans with IDE refactoring tools, never by Claude Code',
        'Instruct it to keep the old name as an alias and migrate call sites gradually'
      ],
      explanations: [
        'Correct. The deciding failure was fixing only what happened to be visible. Cross-cutting changes require mechanically enumerating all usages with rg/grep before editing.',
        'Coverage is stated to be low, so tests cannot map the impact — indeed the tests passed this time.',
        'Taking the tool away skips the essential improvement: investigate first, then edit.',
        'Gradual migration is a real technique, but without a full usage inventory the same omissions recur.'
      ]
    }
  },
  {
    id: 'cc2-022', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'デザインシステムを内製している事業会社で、社内コンポーネントのドキュメントを返すMCPサーバーを構築した。リード1人が自分の個人設定でサーバーを登録して便利に使っているが、他のメンバーは接続方法を毎回リードに聞いており、1人はURLを打ち間違えて古い検証環境に接続したまま数日作業していた。サーバーのエンドポイントは四半期ごとに変わる可能性があり、利用者は今後さらに増える見込みである。',
      question: 'チーム全員に同じMCP接続設定を行き渡らせる方法として最も適切なのはどれか。',
      options: [
        'READMEにセットアップ手順を書き、各自が個人設定に追加する',
        'サーバーURLを環境変数として配布し、各自のシェル設定に追記してもらう',
        'リポジトリ直下の .mcp.json にサーバー設定をコミットし、リポジトリ経由で共有する',
        'CLAUDE.mdに接続先URLと設定手順を記載する'
      ],
      explanations: [
        '手順書があっても設定作業は各自の手作業のままで、打ち間違いのような事故は防げない。',
        '環境変数の配布も各自のシェル設定という個人環境に依存し、更新のたびに全員の作業が必要になる。',
        '正解。決め手は「全員に同じ設定を、更新も含めて配る」という要件。.mcp.jsonをコミットすればリポジトリを持つ全員に同一設定が行き渡り、エンドポイント変更も1コミットで済む。',
        'CLAUDE.mdは指示や文脈を伝えるファイルであり、MCPサーバーの接続設定として機能する場所ではない。'
      ]
    },
    en: {
      scenario: 'A company with an in-house design system built an MCP server that serves internal component documentation. The lead registered it in a personal configuration and uses it happily, but other members keep asking the lead how to connect, and one person mistyped the URL and worked against an old staging instance for days. The server endpoint may change quarterly, and the number of users is expected to grow.',
      question: 'What is the most appropriate way to distribute the same MCP connection settings to the whole team?',
      options: [
        'Write setup steps in the README and have each person add the server to their personal settings',
        'Distribute the server URL as an environment variable for everyone’s shell profile',
        'Commit the server configuration to .mcp.json at the repository root and share it through the repo',
        'Write the connection URL and setup steps in CLAUDE.md'
      ],
      explanations: [
        'Even with a document, setup stays manual per person, and typo accidents remain possible.',
        'Environment variables also live in personal shell configs, and every endpoint change requires everyone to act.',
        'Correct. The deciding requirement is delivering identical settings — including updates — to everyone. A committed .mcp.json reaches every repo user, and an endpoint change is one commit.',
        'CLAUDE.md conveys instructions and context; it is not a place where MCP server configuration takes effect.'
      ]
    }
  },
  {
    id: 'cc2-023', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '在庫管理システムの10年物のモジュールについて「読みにくいのできれいにして」とClaude Codeに依頼したところ、内部整理に加えて公開関数のシグネチャと戻り値の形式まで変更され、そのモジュールを利用していた夜間バッチが翌朝停止した。バッチの存在は依頼者自身も忘れていた。既存のユニットテストはカバレッジ6割程度で、すべて通過した状態でマージされていた。チームは再発防止のためにリファクタ依頼のテンプレートを整備することにした。',
      question: 'テンプレートの最初に据えるべき制約として最も適切なのはどれか。',
      options: [
        '1回の依頼で変更してよい行数の上限を定める',
        '外部から見える動作を変えないこと・既存テストをすべて通すことを明示する',
        'リファクタの前にモジュールのドキュメントを整備させる',
        '変更前にすべての関数へ型注釈を付けさせる'
      ],
      explanations: [
        '行数は変更の安全性の代理指標にすぎない。少ない行数でもシグネチャ変更は起こせる。',
        '正解。決め手は公開インターフェースが変わって外部利用者が壊れたこと。リファクタリングの定義は「外部動作を保ったままの内部改善」であり、その制約を最初に明示するのが要点。',
        'ドキュメント整備は有益だが、外部動作を守る制約がなければ同じ事故は防げない。',
        '型注釈は品質向上の実在する施策だが、戻り値の形式変更そのものは止められない。'
      ]
    },
    en: {
      scenario: 'For a ten-year-old module in an inventory system, Claude Code was asked to “clean it up because it is hard to read.” Along with internal tidying, it changed public function signatures and return formats, and a nightly batch job that consumed the module halted the next morning. Even the requester had forgotten the batch existed. The existing unit tests, at roughly 60% coverage, all passed and the change was merged. The team decided to build a template for refactoring requests.',
      question: 'What constraint should be placed first in the template?',
      options: [
        'Set an upper limit on the number of lines changed per request',
        'State explicitly that externally visible behavior must not change and all existing tests must pass',
        'Have the module documentation written before refactoring',
        'Have type annotations added to every function before changes'
      ],
      explanations: [
        'Line count is only a proxy for safety; a tiny diff can still change a signature.',
        'Correct. The deciding failure was a changed public interface breaking outside consumers. Refactoring means internal improvement with external behavior preserved — that constraint belongs first.',
        'Documentation helps, but without the behavior-preservation constraint the same accident recurs.',
        'Type annotations are a real quality measure but cannot stop a return-format change by themselves.'
      ]
    }
  },
  {
    id: 'cc2-024', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '料金計算サービスで「深夜割引が二重適用されるバグを直して」とClaude Codeに依頼したところ、バグ修正と同時にファイル全体の再フォーマット、変数名の一括リネーム、日付ライブラリの置き換えまで行われ、差分が900行になった。レビュアーは本質的な修正箇所を差分から特定できず、リリースが2日遅れた。実際のバグ修正は3行だったことが後から判明した。チームのPRレビューは2人承認制で、リリースは週次である。',
      question: '次回から依頼に含めるべき指示として最も適切なのはどれか。',
      options: [
        '変更をバグ修正そのものに限定し、無関係なリネーム・再フォーマット・ライブラリ置換を同じ変更に含めないよう明示する',
        'hookでPRあたりの差分行数に上限を設け、超過したらブロックする',
        'フォーマッタのチェックをCIから外して差分が出にくいようにする',
        '対象ファイルを事前に小さなモジュールへ分割してから修正させる'
      ],
      explanations: [
        '正解。決め手は3行の修正に900行の無関係な変更が混ざったこと。依頼時にスコープを明示的に固定し、リファクタや整形は別の変更として分離させるのが基本。',
        '行数制限は大きな正当な変更まで機械的に弾いてしまい、スコープの混在という原因には作用しない過剰設計。',
        'チェックを外すのは品質担保の逆方向で、差分の混在も解決しない。',
        'モジュール分割は実在する改善だが、それ自体が大規模変更であり、今回のスコープ管理の問題を先送りするだけ。'
      ]
    },
    en: {
      scenario: 'In a pricing service, Claude Code was asked to “fix the bug where the late-night discount is applied twice.” Along with the fix it reformatted the whole file, mass-renamed variables, and swapped the date library, producing a 900-line diff. Reviewers could not locate the essential fix in the diff, and the release slipped two days. The actual bug fix turned out to be three lines. The team requires two approvals per PR and releases weekly.',
      question: 'What instruction should be included in future requests?',
      options: [
        'Explicitly restrict changes to the bug fix itself and exclude unrelated renames, reformatting, and library swaps from the same change',
        'Enforce a per-PR diff line limit with a hook and block anything above it',
        'Remove the formatter check from CI so diffs are less likely to appear',
        'Have the file split into smaller modules first, then apply the fix'
      ],
      explanations: [
        'Correct. The deciding fact is 900 lines of unrelated churn around a 3-line fix. Fixing the scope in the request — and separating refactors and formatting into their own changes — is the fundamental practice.',
        'A line cap mechanically rejects large legitimate changes too and does not act on the real cause, mixed scope; over-engineering.',
        'Removing checks runs against quality and does nothing about mixed scope.',
        'Module splitting is a real improvement but is itself a large change, merely postponing the scope-management problem.'
      ]
    }
  },
  {
    id: 'cc2-025', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '複数案件を掛け持ちするフリーランスエンジニアは、自分の ~/.claude/CLAUDE.md に「コードコメントは最小限にする」「説明は簡潔な日本語で」という好みを設定している。新しく参画した金融系クライアントのリポジトリでは、CLAUDE.mdに「すべての公開関数にdocstringを必須とする」という規約がコミットされている。このリポジトリで新しい関数の追加作業を依頼するとき、docstringがどう扱われるのか本人は確信が持てていない。案件は他に2つ並行している。',
      question: 'この状況の動作として正しい説明はどれか。',
      options: [
        'ユーザースコープの設定は本人の全環境で最優先されるため、docstringは書かれない',
        '先に読み込まれた側の設定が優先されるため、起動のたびに結果が変わり得る',
        '矛盾が検出された時点で両方のルールが無効化され、素の動作になる',
        '作業中のプロジェクト側の規約が優先されてdocstringは書かれる。矛盾しない個人設定（日本語での説明など）はそのまま有効に働く'
      ],
      explanations: [
        'ユーザースコープは最も一般的な既定であり、プロジェクトの具体的な規約と矛盾すればプロジェクト側が勝つ。',
        '読み込み順のレースで決まる仕様ではない。階層の具体性で優先が決まる。',
        '矛盾で両方無効になる仕組みはない。',
        '正解。決め手は「作業地点に近い（具体的な）設定が優先」という階層原則。docstring必須はプロジェクト規約が勝ち、矛盾しない日本語説明などの個人好みは継承されて共存する。'
      ]
    },
    en: {
      scenario: 'A freelance engineer juggling several clients has personal preferences in ~/.claude/CLAUDE.md: “keep code comments minimal” and “explain concisely in Japanese.” A newly joined financial client’s repository has a committed CLAUDE.md requiring docstrings on all public functions. When asking for a new function in this repo, the engineer is unsure how docstrings will be handled. Two other engagements run in parallel.',
      question: 'Which statement correctly describes the behavior?',
      options: [
        'User-scope settings take absolute precedence across all of the person’s environments, so no docstrings are written',
        'Whichever file loads first wins, so the result can differ per launch',
        'Once the conflict is detected, both rules are disabled and behavior reverts to defaults',
        'The project’s convention wins for work in that repo, so docstrings are written; non-conflicting personal settings (such as Japanese explanations) remain in effect'
      ],
      explanations: [
        'User scope is the most general default; when it conflicts with a specific project convention, the project wins.',
        'It is not decided by a loading race; precedence follows the specificity of the hierarchy.',
        'There is no mechanism that voids both rules on conflict.',
        'Correct. The deciding principle is that settings closer to the work (more specific) take precedence. The docstring requirement wins, while non-conflicting personal preferences are inherited and coexist.'
      ]
    }
  },
  {
    id: 'cc2-026', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'フロントエンド基盤チームは、テスト規約（モックの作り方・describeブロックの命名）を、モノレポ内のあらゆる階層にある *.spec.ts ファイルだけに適用したい。packages/ 配下には12パッケージがあり、ディレクトリの深さはパッケージによって2〜5階層とまちまちである。メンバーが .claude/rules/testing.md のフロントマターに書くpathsの候補を4つ用意した。規約本文は既にレビュー済みで問題ない。',
      question: '意図どおりに動く記述はどれか。',
      options: [
        'paths: ["*.spec.ts"]',
        'paths: ["/.*\\.spec\\.ts$/"]',
        'paths: ["**/*.spec.ts"]',
        'paths: ["packages/*.spec.ts"]'
      ],
      explanations: [
        'このglobはルート直下の *.spec.ts にしかマッチせず、深い階層のテストファイルに適用されない。',
        'これは正規表現の記法。pathsはグロブパターンの配列で指定するため意図どおりに動かない。',
        '正解。決め手は「あらゆる階層」という要件。** が任意の深さのディレクトリにマッチするため、モノレポ全体のspecファイルに適用される。',
        'packages直下の1階層しか見ない。深さが2〜5階層とまちまちという条件を取りこぼす。'
      ]
    },
    en: {
      scenario: 'A frontend-platform team wants its testing conventions (how to build mocks, how to name describe blocks) applied only to *.spec.ts files at any depth in the monorepo. There are 12 packages under packages/, with directory depth varying from two to five levels. A member prepared four candidate paths values for the frontmatter of .claude/rules/testing.md. The rule body itself has already passed review.',
      question: 'Which value behaves as intended?',
      options: [
        'paths: ["*.spec.ts"]',
        'paths: ["/.*\\.spec\\.ts$/"]',
        'paths: ["**/*.spec.ts"]',
        'paths: ["packages/*.spec.ts"]'
      ],
      explanations: [
        'This glob matches *.spec.ts only at the repo root and never applies to deeper test files.',
        'That is regular-expression syntax; paths takes an array of glob patterns, so it does not work as intended.',
        'Correct. The deciding requirement is “at any depth”: ** matches directories of arbitrary depth, covering spec files across the whole monorepo.',
        'This looks only one level below packages/, missing the varying two-to-five-level depths.'
      ]
    }
  },
  {
    id: 'cc2-027', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '入社2週間の新人の環境では、Claude Codeがチームのエラーメッセージ規約や命名規則をまったく守らない出力をする。メンターの環境では同じ依頼で規約どおりの出力になる。メンターはClaude Codeのバージョン差やモデル設定の違いを疑って2時間かけて比較したが、両者は同一だった。最終的に、規約はすべてメンター個人の ~/.claude/CLAUDE.md に書かれており、プロジェクトのリポジトリには何もコミットされていないことが判明した。',
      question: 'この問題の根本対応として最も適切なのはどれか。',
      options: [
        '規約をリポジトリのCLAUDE.mdや .claude/rules/ に移してコミットし、誰の環境でも同じルールが適用されるようにする',
        'メンターの ~/.claude/ ディレクトリ一式を新人のマシンにコピーする',
        '2人のClaude Codeのバージョンを固定して揃える運用にする',
        '新人に規約ドキュメントを渡し、依頼のたびにプロンプトへ貼り付けてもらう'
      ],
      explanations: [
        '正解。決め手は規約の置き場所が個人ディレクトリだったこと。リポジトリにコミットすれば、環境差に関係なく全員に同じルールが効き、次の新人にも自動で行き渡る。',
        '今日は動くが、メンターが規約を更新するたびにコピーが陳腐化する。属人化の構造が残る。',
        'バージョンは既に同一と確認済みで、原因ではないノイズを追う対応。',
        '毎回の手動貼り付けは漏れやすく、他のメンバーが増えるたびに同じ運用負担が増える。'
      ]
    },
    en: {
      scenario: 'On a two-week-old new hire’s machine, Claude Code produces output that completely ignores the team’s error-message and naming conventions. On the mentor’s machine the same request follows the conventions. Suspecting version or model-setting differences, the mentor spent two hours comparing — both were identical. It finally turned out all the conventions live in the mentor’s personal ~/.claude/CLAUDE.md, with nothing committed to the project repository.',
      question: 'What is the most appropriate root fix?',
      options: [
        'Move the conventions into the repo’s CLAUDE.md and .claude/rules/ and commit them so the same rules apply in anyone’s environment',
        'Copy the mentor’s entire ~/.claude/ directory onto the new hire’s machine',
        'Pin and align both installations to the same Claude Code version',
        'Give the new hire the conventions document to paste into the prompt with every request'
      ],
      explanations: [
        'Correct. The deciding discovery is that the rules lived in a personal directory. Committed to the repo, they apply regardless of environment and reach the next hire automatically.',
        'It works today, but the copy goes stale every time the mentor updates the rules; the person-dependence remains.',
        'Versions were already confirmed identical; this chases noise, not the cause.',
        'Manual pasting is easy to miss and the operational burden grows with every new member.'
      ]
    }
  },
  {
    id: 'cc2-028', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '決済代行会社のチームには2つのニーズがある。1つは「Claudeがコードを編集したら毎回必ずeslintを走らせたい」、もう1つは「ステージングへのデプロイプレビュー作成という7ステップの手順を、必要になったときに誰でも同じ流れで実行したい」。あるメンバーは「どちらもカスタムスラッシュコマンドにすれば作り方が統一できて管理も楽になる」と提案しており、チームはこの案でよいか議論している。監査要件が厳しく、手順の再現性は重視されている。',
      question: '2つのニーズの実現方法として最も適切な組み合わせはどれか。',
      options: [
        'どちらもhooksで実装する。自動化はhooksに寄せるのが原則である',
        '毎回必ず実行したいeslintは編集イベントのhookに、オンデマンドのデプロイプレビュー手順はカスタムスラッシュコマンドにする',
        'どちらもカスタムスラッシュコマンドにし、eslintは毎回実行する運用ルールで担保する',
        'eslintはCLAUDE.mdに指示として書き、デプロイプレビュー手順をhooksに設定する'
      ],
      explanations: [
        'デプロイプレビューは「必要になったとき」に人が起動するもので、イベント連動のhooksでは起動のきっかけが合わない。',
        '正解。決め手は「毎回必ず（＝イベント連動の自動実行）」と「必要なときに誰でも同じ流れで（＝オンデマンドの定型手順）」の性質の違い。前者がhooks、後者がスラッシュコマンドの守備範囲。',
        '統一感はあるが、eslintの実行が手動起動と運用ルール頼みになり、「毎回必ず」が保証されない。',
        '組み合わせが逆。指示は実行の保証にならず、オンデマンド手順はhooksの起動モデルに合わない。'
      ]
    },
    en: {
      scenario: 'A payment-processing team has two needs. First: “every time Claude edits code, eslint must run, without exception.” Second: “a seven-step procedure for creating a staging deploy preview should be runnable by anyone, the same way, whenever needed.” One member proposes making both custom slash commands “so the implementation style is unified and easier to manage,” and the team is debating it. Audit requirements are strict and reproducibility matters.',
      question: 'Which combination is most appropriate for the two needs?',
      options: [
        'Implement both as hooks; automation should always be pushed into hooks',
        'Put the always-run eslint on an edit-event hook, and make the on-demand deploy-preview procedure a custom slash command',
        'Make both custom slash commands and guarantee the eslint runs through an operating rule',
        'Write the eslint requirement in CLAUDE.md as an instruction and configure the deploy-preview procedure as hooks'
      ],
      explanations: [
        'The deploy preview is launched by a person when needed; event-driven hooks are the wrong trigger model for it.',
        'Correct. The deciding difference is the nature of the two needs: “always, on every edit” means event-driven automation (hooks); “on demand, same flow for anyone” means a committed slash command.',
        'Uniform, but eslint then depends on manual invocation plus an operating rule, so “always” is not guaranteed.',
        'The pairing is inverted: instructions do not guarantee execution, and an on-demand procedure does not fit the hook trigger model.'
      ]
    }
  },
  {
    id: 'cc2-029', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '開発体験の改善を任されたメンバーが「承認プロンプトが多くて作業が止まる」という声を受け、チーム共用の開発コンテナ設定で権限確認をすべてスキップする設定を有効にした。2週間後、Claude Codeが依頼の解釈を誤り、社内レジストリへのパッケージpublishコマンドを実行する直前まで進んで、人間が気づいて止めるヒヤリハットが起きた。一方で、プロンプト削減による開発速度の向上はチームに好評で、元に戻すことへの抵抗も強い。',
      question: '権限設定の方針として最も適切なのはどれか。',
      options: [
        '全スキップ設定を維持し、週次で実行ログを監査する運用を追加する',
        'すべての操作を手動承認に戻し、プロンプトの多さは受け入れてもらう',
        'CLAUDE.mdに「公開・削除系の操作は行わない」という指示を追加した上でスキップ設定を維持する',
        'permissionsのallowlistで安全な定型コマンドだけを自動許可し、破壊的・外部公開系のコマンドはaskまたはdenyに分類する'
      ],
      explanations: [
        '事後の監査ではpublishのような取り消せない操作を防げない。実行された後では遅い。',
        '全戻しは元の課題（プロンプト過多で作業が止まる）を復活させる。二択ではなく粒度の問題。',
        '指示は強制ではないという構造が残ったままで、スキップ設定がある限り同じヒヤリは再発しうる。',
        '正解。決め手は「全許可か全確認か」の二択に見える状況を、コマンドの危険度で切り分けること。安全な定型操作は自動化の恩恵を残し、不可逆な操作だけツール側で止める。'
      ]
    },
    en: {
      scenario: 'A member tasked with improving developer experience responded to complaints about frequent approval prompts by enabling a skip-all-permission-checks setting in the team’s shared dev-container config. Two weeks later, Claude Code misinterpreted a request and progressed to the brink of running a package-publish command against the internal registry before a human noticed — a near miss. Meanwhile, the speed gain from fewer prompts is popular, and there is strong resistance to reverting.',
      question: 'What is the most appropriate permissions policy?',
      options: [
        'Keep the skip-all setting and add a weekly audit of execution logs',
        'Return every operation to manual approval and ask the team to accept the prompts',
        'Keep the skip setting but add a CLAUDE.md instruction saying publish- and delete-type operations are forbidden',
        'Auto-allow only safe routine commands via a permissions allowlist, and classify destructive or externally publishing commands as ask or deny'
      ],
      explanations: [
        'After-the-fact audits cannot prevent irreversible operations like publishing; it is too late once executed.',
        'A full revert resurrects the original problem of prompt fatigue; this is a granularity question, not a binary.',
        'Instructions are not enforcement; with the skip setting in place, the same near miss can recur.',
        'Correct. The deciding move is escaping the all-or-nothing framing by splitting on danger: keep automation for safe routine commands and let the tool gate only the irreversible ones.'
      ]
    }
  },
  {
    id: 'cc2-030', domain: 'claudecode', answer: 2,
    ja: {
      scenario: '認証基盤チームのCLAUDE.mdには「.envや認証情報ファイルを読まない・出力しない」と明記されている。ところが障害対応の長いセッション中、環境変数の不一致を調査する流れで .env の内容がトラブルシュートのまとめドキュメントに貼り込まれ、あと一歩でリポジトリにコミットされるところだった。チームは「ルールに明記していたのに」と困惑している。露出しかけたトークンは念のため即座にローテーションされた。',
      question: 'この事象の理解と対策として最も適切なのはどれか。',
      options: [
        'CLAUDE.mdが読み込まれていなかったことが原因なので、ファイルの配置と読み込み状態を確認する',
        'モデルの更新で指示追従性が向上するのを待ち、当面は運用でカバーする',
        'CLAUDE.mdの記述は指示であり強制ではない。permissionsで該当ファイルへのアクセスをツール側から制限し、仕組みとして防ぐ',
        '.envをリポジトリ外のディレクトリへ移動すれば解決する'
      ],
      explanations: [
        '同じセッションで他のルールは守られており、読み込み失敗を疑う根拠はない。ノイズの追跡になる。',
        '長いセッションで指示が薄れる可能性は常に残る。待つのは対策ではない。',
        '正解。決め手は「明記していたのに起きた」という事実そのもの。CLAUDE.mdは動作を強制しないため、秘密情報の保護はpermissionsによるアクセス制限という仕組みの層で行う。',
        '置き場所を変えても参照自体は可能で、実在する軽減策ではあるがアクセス制御という決め手を外している。'
      ]
    },
    en: {
      scenario: 'An auth-platform team’s CLAUDE.md explicitly says “do not read or output .env or credential files.” Yet during a long incident-response session, while investigating an environment-variable mismatch, the contents of .env were pasted into a troubleshooting summary document and came within a step of being committed to the repository. The team is puzzled — “but it was written in the rules.” The nearly exposed token was rotated immediately as a precaution.',
      question: 'Which understanding and countermeasure is most appropriate?',
      options: [
        'The cause is that CLAUDE.md was not loaded, so verify the file placement and load status',
        'Wait for model updates to improve instruction-following and cover the gap with process in the meantime',
        'CLAUDE.md content is instruction, not enforcement; restrict access to the files with permissions so the tool itself blocks it',
        'Moving .env outside the repository directory resolves the problem'
      ],
      explanations: [
        'Other rules were followed in the same session, so there is no basis for suspecting a load failure; that chases noise.',
        'Instructions can always fade in long sessions; waiting is not a countermeasure.',
        'Correct. The deciding fact is that it happened despite being written down. CLAUDE.md does not enforce behavior, so secret protection belongs in the enforcement layer: permissions-based access restriction.',
        'A relocated file can still be referenced; a real mitigation, but it misses the decisive layer of access control.'
      ]
    }
  }
);
