// CCA-F practice questions — domain: claudecode (Claude Code Configuration & Workflows)
window.QUESTIONS.push(
  {
    id: 'cc-001', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'チームでClaude Codeを使う。コーディング規約・使用ライブラリ・禁止事項を、毎回プロンプトに貼らずに全員へ一貫して効かせたい。',
      question: '最も適切な方法は？',
      options: ['各自が自分のシェル履歴にメモしておく','Slackに規約を貼って都度コピペしてもらう','リポジトリに CLAUDE.md を置き、規約・禁止事項を記述してコミットする','規約はプロンプトに毎回手で書く運用にする'],
      explanations: ['シェル履歴は共有されず属人的。チーム一貫性が出ない。','都度コピペは抜け漏れと不一致の温床。仕組みで効かせるべき。','CLAUDE.md にプロジェクト方針を書いてコミット＝全員に一貫して効く正攻法。共有・バージョン管理もできる。','毎回手書きは再現性がなく、人によってブレる。']
    },
    en: {
      scenario: 'Your team uses Claude Code and wants coding standards, allowed libraries, and prohibitions applied consistently for everyone without pasting them into every prompt.',
      question: 'What is the most appropriate approach?',
      options: ['Each person keeps notes in their own shell history','Post the standards in Slack and have people copy-paste them each time','Put a CLAUDE.md in the repository describing standards and prohibitions, and commit it','Type the standards by hand into the prompt every time'],
      explanations: ['Shell history is not shared and is personal; it cannot create team consistency.','Copy-paste each time invites omissions and inconsistency; enforce it structurally instead.','A committed CLAUDE.md applies project guidance consistently to everyone and is shareable and version-controlled.','Hand-typing every time is not reproducible and varies by person.']
    }
  },
  {
    id: 'cc-002', domain: 'claudecode', answer: 1,
    ja: {
      scenario: 'Claude Codeで「コミット前に必ずlintとテストを自動実行する」を、人が忘れても確実に走るようにしたい。',
      question: '適切な仕組みはどれ？',
      options: ['CLAUDE.md に「コミット前にテストして」と書くだけにする','hooks を設定し、特定イベント時に lint/test コマンドを自動実行させる','毎回チャットで「テストして」と打つのを習慣にする','テストは人が気づいたときだけ手動で回す'],
      explanations: ['CLAUDE.md の記述は指示であって自動実行の保証ではない。「忘れても走る」を満たさない。','hooks はイベント連動で決まったコマンドを自動実行する仕組み。人の記憶に依存せず確実に走らせられる。','毎回手で打つのは「忘れても確実に」を満たさない。','気づいたときだけは抜けが出る。自動化が要件。']
    },
    en: {
      scenario: 'In Claude Code you want lint and tests to always run before a commit, even if a person forgets.',
      question: 'Which mechanism fits?',
      options: ['Just write "test before committing" in CLAUDE.md','Configure hooks to auto-run lint/test commands on specific events','Make a habit of typing "run tests" in chat every time','Run tests manually only when someone notices'],
      explanations: ['A CLAUDE.md note is an instruction, not guaranteed automatic execution; it does not satisfy "runs even if forgotten."','Hooks auto-run defined commands on events, running reliably without depending on memory.','Typing it by hand every time does not guarantee "even if forgotten."','Only-when-noticed leaves gaps; automation is the requirement.']
    }
  },
  {
    id: 'cc-003', domain: 'claudecode', answer: 3,
    ja: {
      scenario: 'リリース手順（バージョン更新→CHANGELOG追記→タグ付け）を、チームの誰がやっても同じ流れで再現したい。手順書をその都度読み合わせるのは負担。',
      question: '最も再現性が高い方法は？',
      options: ['手順をConfluenceに書き、各自が読みながら手で実行する','口頭で先輩から後輩へ手順を引き継ぐ','詳しい人だけがリリース担当を続ける','カスタムスラッシュコマンドにリリース手順を定義し、リポジトリにコミットして全員が呼び出す'],
      explanations: ['読みながら手作業は手順の解釈や順序がブレる。再現性が担保されない。','口頭引き継ぎは記憶頼みで属人化する。','担当固定は属人化そのもので、本人不在時に止まる。','スラッシュコマンドに手順を定義してコミットすれば、誰が呼んでも同じ流れになり共有・再現できる。']
    },
    en: {
      scenario: 'You want the release flow (bump version, update CHANGELOG, tag) to be reproducible by anyone on the team. Re-reading a runbook each time is a burden.',
      question: 'What gives the highest reproducibility?',
      options: ['Write the steps in Confluence and have everyone do them by hand while reading','Hand the steps down verbally from senior to junior','Keep only the expert doing releases','Define the release steps as a custom slash command and commit it so everyone invokes the same flow'],
      explanations: ['Doing it by hand while reading lets interpretation and ordering drift; reproducibility is not guaranteed.','Verbal handoff relies on memory and becomes person-dependent.','Fixing one owner is exactly the personal-dependency problem and stalls when they are away.','A committed slash command defines the steps once so anyone invoking it gets the same flow — shared and reproducible.']
    }
  },
  {
    id: 'cc-004', domain: 'claudecode', answer: 0,
    ja: {
      scenario: 'Claude Code から社内のチケット管理システムやデータベースなど、外部ツール・データへ安全に接続して操作させたい。',
      question: '想定された接続方法はどれ？',
      options: ['MCPサーバーを設定し、Claude Code から外部ツール／データへ接続する','外部システムのパスワードをCLAUDE.mdに平文で書く','チャットに毎回APIのURLとトークンを貼り付ける','外部接続は諦めて、結果を人が手でコピーして渡す'],
      explanations: ['MCP（Model Context Protocol）サーバーの設定が、Claude Code から外部ツール／データへ接続する想定の仕組み。','認証情報を平文で設定ファイルに書くのは漏洩リスクが高く不適切。','毎回貼り付けは属人的で危険、再現性もない。','人が手で運ぶのは自動化・再現性の放棄で、接続要件を満たさない。']
    },
    en: {
      scenario: 'You want Claude Code to connect securely to external tools/data such as your issue tracker or a database and operate on them.',
      question: 'Which is the intended way to connect?',
      options: ['Configure an MCP server so Claude Code connects to external tools/data','Write the external system password in plaintext in CLAUDE.md','Paste the API URL and token into chat every time','Give up on external connection and have a human copy results by hand'],
      explanations: ['Configuring an MCP (Model Context Protocol) server is the intended way for Claude Code to connect to external tools/data.','Writing credentials in plaintext in a config file is a leak risk and inappropriate.','Pasting every time is personal, risky, and not reproducible.','Hand-carrying results abandons automation/reproducibility and does not meet the connection need.']
    }
  },
  {
    id: 'cc-005', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'Claude Code に「rm -rf や本番DBへの書き込みなど危険なコマンドは勝手に実行させない」ようにしたい。',
      question: '最も適切な設計は？',
      options: ['全コマンドを無条件で許可し、後からログを見て気をつける','危険操作は本人が覚えておいて、その都度止める','settings.json の権限設定で許可リスト／拒否リストを定義し、危険な操作を制御する','危険なコマンドにならないことを祈る'],
      explanations: ['無条件許可は事故が起きてからでは取り返せない。最小権限の原則に反する。','人の記憶頼みは抜けが出る。仕組みで止めるべき。','settings.json の権限（許可／拒否）設定で危険操作を明示的に制御＝最小権限の正攻法。','祈りは設計ではない。']
    },
    en: {
      scenario: 'You want Claude Code to not run dangerous commands (e.g. rm -rf, writes to the production DB) on its own.',
      question: 'What is the most appropriate design?',
      options: ['Allow all commands unconditionally and just watch logs afterward','Rely on the person to remember and stop each dangerous one','Define allow/deny lists in settings.json permissions to control dangerous operations','Hope no dangerous command ever happens'],
      explanations: ['Unconditional allow is unrecoverable once an accident happens and violates least privilege.','Relying on memory leaves gaps; stop it structurally instead.','Defining allow/deny in settings.json permissions explicitly controls dangerous ops — the least-privilege way.','Hope is not a design.']
    }
  },
  {
    id: 'cc-006', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '新しく入ったメンバーのマシンだけClaude Codeの挙動が違う。規約も承認コマンドの許可リストも効いていない。',
      question: '最初に確認すべき原因は？',
      options: ['そのメンバーのタイピングが速すぎる','.claude/（CLAUDE.md や settings.json）がリポジトリにコミットされず共有されていない','Claudeのモデルが古い','チャットの言語設定が違う'],
      explanations: ['タイピング速度は設定の差とは無関係。','.claude/ の設定をコミットして共有していなければ各自バラバラになる。属人化＝共有漏れが典型原因。','モデルの新旧では規約や許可リストの有無は説明できない。','言語設定は規約・権限の適用とは別問題。']
    },
    en: {
      scenario: 'Only a new member\'s machine behaves differently in Claude Code — neither the standards nor the approved-command allowlist are taking effect.',
      question: 'What is the first likely cause to check?',
      options: ['That member types too fast','The .claude/ directory (CLAUDE.md and settings.json) was not committed to the repo, so it is not shared','The Claude model is outdated','The chat language setting differs'],
      explanations: ['Typing speed is unrelated to configuration differences.','If .claude/ settings are not committed and shared, each machine diverges — the classic "not shared" cause.','Model version does not explain missing standards or allowlists.','Language setting is separate from applying standards/permissions.']
    }
  },
  {
    id: 'cc-007', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '大きめのタスク（仕様調査→実装→テスト作成）を1つのチャットで全部やると文脈が膨らみ、focusがぼやける。Claude Code内で作業を整理して進めたい。',
      question: '適切な進め方は？',
      options: ['すべてを1メッセージに詰め込んで一気に頼む','調査結果を毎回手でコピーして次の会話に貼り直す','文脈が増えても気にせず同じ会話を延々続ける','サブエージェントに調査やテスト作成など独立した部分を切り出して任せ、結果を受け取る'],
      explanations: ['1メッセージに全部は文脈が膨らみ、focusも品質も落ちやすい。','手コピーは属人的で抜けやすく、自動化されない。','延々と同じ会話を続けると文脈が肥大して扱いづらい。','サブエージェントに独立した部分を切り出して任せ、結果だけ受け取れば、文脈を分離して進められる。']
    },
    en: {
      scenario: 'Doing a large task (spec research → implement → write tests) all in one chat bloats context and blurs focus. You want to organize the work within Claude Code.',
      question: 'What is a good way to proceed?',
      options: ['Cram everything into one message and ask for it all at once','Manually copy research results and re-paste them into the next conversation each time','Keep going in the same conversation regardless of growing context','Delegate independent parts (research, writing tests) to subagents and receive their results'],
      explanations: ['All in one message bloats context and tends to lower focus and quality.','Manual copying is personal, error-prone, and not automated.','Endlessly extending one conversation inflates context and is hard to manage.','Delegating independent parts to subagents and receiving just the results lets you separate context cleanly.']
    }
  },
  {
    id: 'cc-008', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '個人の好みの細かな指示（口調や日付計算の癖など）と、チーム全員に効かせたいプロジェクト規約を、混ぜずに管理したい。',
      question: 'メモリ／指示の階層の使い分けとして適切なのは？',
      options: ['プロジェクト共通はリポジトリの CLAUDE.md、個人の好みはユーザースコープの設定に分けて置く','すべて1つのファイルに全員分の好みも含めて書く','個人の好みもリポジトリのCLAUDE.mdに書いて全員に強制する','チーム規約は各自のローカルにだけ置く'],
      explanations: ['プロジェクト共通＝リポジトリの CLAUDE.md、個人の好み＝ユーザースコープ、と階層を分けるのが正しい使い分け。','全部1ファイルだと個人の好みが他人にも効いてしまい混乱する。','個人の好みを全員に強制するのは不適切。階層を分ける目的に反する。','チーム規約をローカルだけに置くと共有されず属人化する。']
    },
    en: {
      scenario: 'You want to keep personal preferences (tone, date-calc habits) separate from project standards that should apply to the whole team.',
      question: 'What is the right use of the memory/instruction hierarchy?',
      options: ['Put project-wide rules in the repo CLAUDE.md and personal preferences in user-scoped settings','Put everyone\'s preferences plus rules all in one file','Put personal preferences in the repo CLAUDE.md and force them on everyone','Keep team standards only on each person\'s local machine'],
      explanations: ['Project-wide → repo CLAUDE.md, personal → user scope: that is the correct separation of the hierarchy.','One file makes personal preferences apply to others and causes confusion.','Forcing personal preferences on everyone is inappropriate and defeats the hierarchy.','Keeping team standards only local means they are not shared and become person-dependent.']
    }
  },
  {
    id: 'cc-009', domain: 'claudecode', answer: 2,
    ja: {
      scenario: '「PRを開く前に必ず差分を要約してレビュー観点を出す」という決まった作業を、毎回同じ品質でやりたい。',
      question: '最も再現性の高い方法は？',
      options: ['各自が自分の頭の中の手順で要約する','要約は気が向いたときだけやる','カスタムスラッシュコマンド／スキルにレビュー要約手順を定義し、共有して呼び出す','毎回チャットに長い指示文を打ち直す'],
      explanations: ['頭の中の手順は人によって違い、品質が揺れる。','気が向いたときだけは抜けが出る。','スラッシュコマンド／スキルに手順を定義して共有すれば、毎回同じ品質で呼び出せる。','長文を毎回打ち直すのは手間で、内容もブレやすい。']
    },
    en: {
      scenario: 'Before opening a PR you want to always summarize the diff and list review points — at the same quality every time.',
      question: 'What gives the highest reproducibility?',
      options: ['Each person summarizes using their own mental steps','Summarize only when in the mood','Define the review-summary steps as a custom slash command/skill, share it, and invoke it','Retype a long instruction into chat every time'],
      explanations: ['Mental steps differ per person and quality wobbles.','Only-when-in-the-mood leaves gaps.','Defining the steps as a shared slash command/skill lets you invoke the same quality every time.','Retyping a long prompt each time is effortful and drifts in content.']
    }
  },
  {
    id: 'cc-010', domain: 'claudecode', answer: 1,
    ja: {
      scenario: 'CIで自動チェックを通すようにClaude Codeを組み込みたい。テストやlintが失敗したら処理を止めて、人が差分を確認できるようにしたい。',
      question: '適切な組み込み方は？',
      options: ['チェックが失敗しても無視してそのままマージする','CIにlint/test/型チェックを入れ、失敗時はパイプラインを停止して差分レビューに回す','チェックはローカルの各自任せにしてCIには入れない','失敗したら自動で強制マージする'],
      explanations: ['失敗を無視したマージは品質を壊す。チェックの意味がない。','CIに自動チェックを入れ、失敗時に停止＋差分レビューに回す＝自動チェック・失敗時停止・差分確認の正攻法。','各自任せはCIで担保できず属人化する。','失敗時の強制マージは検証を飛ばす最悪パターン。']
    },
    en: {
      scenario: 'You want to wire Claude Code into CI so automated checks run. If tests or lint fail, stop and let a human review the diff.',
      question: 'What is the right way to integrate?',
      options: ['Merge anyway even if checks fail','Add lint/test/type-check to CI; on failure, stop the pipeline and route to diff review','Leave checks to each person locally and not put them in CI','Force an auto-merge when checks fail'],
      explanations: ['Merging despite failures breaks quality and defeats the checks.','Adding automated checks to CI and stopping + routing to diff review on failure is the correct pattern.','Leaving it to each person locally is not enforced in CI and is person-dependent.','Force-merging on failure is the worst pattern — it skips verification.']
    }
  },
  {
    id: 'cc-011', domain: 'claudecode', answer: 3,
    ja: {
      scenario: 'チームで、よく使う「依存関係を更新して安全に検証する」一連の手順をClaude Codeで標準化したい。新メンバーもすぐ同じ手順を使えるようにしたい。',
      question: '最も適切なのは？',
      options: ['ベテランの作業を録画して見せるだけにする','各自がブックマークに手順メモを貼っておく','手順はその場のチャットで毎回口頭ニュアンスで伝える','再利用する手順をスキル／スラッシュコマンドとして定義し、.claude/ にコミットして共有する'],
      explanations: ['録画を見せるだけでは実行は属人的で、標準化にならない。','個人ブックマークは共有されず、新メンバーに行き渡らない。','その場の口頭ニュアンスは再現性がない。','再利用手順をスキル／スラッシュコマンドにしてコミット＝共有・自動化・即時利用ができる正攻法。']
    },
    en: {
      scenario: 'Your team wants to standardize a frequent flow ("update dependencies and verify safely") in Claude Code so new members can use the same steps immediately.',
      question: 'What is the most appropriate?',
      options: ['Just show a recording of a veteran doing it','Each person keeps step notes in their bookmarks','Convey the steps verbally with on-the-spot nuance each time','Define the reusable steps as a skill/slash command and commit them under .claude/ to share'],
      explanations: ['Showing a recording leaves execution personal and is not standardization.','Personal bookmarks are not shared and do not reach new members.','On-the-spot verbal nuance is not reproducible.','Turning reusable steps into a committed skill/slash command gives sharing, automation, and immediate use.']
    }
  },
  {
    id: 'cc-012', domain: 'claudecode', answer: 0,
    ja: {
      scenario: 'CLAUDE.md に「秘密鍵やトークンを生成物・ログに書かない」と書いたが、実際にコミット直前に検出して止める保証が欲しい。',
      question: '保証を高める最善手は？',
      options: ['hook で pre-commit 相当のシークレットスキャンを自動実行し、検出時は処理を止める','CLAUDE.md の文言をもっと強い口調にする','人が毎回目視でgrepする運用にする','検出は諦めてレビューに任せる'],
      explanations: ['hook で自動シークレットスキャンを走らせ、検出時に停止＝人の記憶に依存せず確実に止められる正攻法。','文言を強めても自動実行の保証にはならない。','目視grepは抜けが出る。仕組みで止めるべき。','レビュー任せは見落としが起きる。自動検出が要件。']
    },
    en: {
      scenario: 'CLAUDE.md says "never write secret keys/tokens into outputs or logs," but you want a guarantee that this is caught and blocked right before commit.',
      question: 'What best strengthens the guarantee?',
      options: ['Use a hook to auto-run a pre-commit secret scan and stop on detection','Make the CLAUDE.md wording more forceful','Rely on a human to grep visually every time','Give up detection and leave it to review'],
      explanations: ['A hook that auto-runs a secret scan and stops on detection guarantees blocking without depending on memory.','Stronger wording does not guarantee automatic execution.','Visual grep leaves gaps; stop it structurally.','Leaving it to review allows oversights; auto-detection is the requirement.']
    }
  },
  {
    id: 'cc-013', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'Claude Code に外部の検索ツールやデータソースをいくつも繋いだが、接続設定が各メンバーのマシンにしかなく、入った人ごとに繋ぎ直しが必要で手間。',
      question: '改善策として適切なのは？',
      options: ['接続設定は各自が思い出して毎回手で打つ','繋がっている人にだけ作業を集中させる','MCPサーバーの接続設定をプロジェクト設定としてリポジトリで共有し、全員に同じ接続を効かせる','接続が面倒なので外部ツール連携をやめる'],
      explanations: ['毎回手打ちは属人的でミスが出る。','一人に集中＝属人化で本人不在時に止まる。','MCP接続設定をプロジェクト共有にすれば、新メンバーも繋ぎ直し不要で同じ接続が効く。','連携をやめるのは要件の放棄。']
    },
    en: {
      scenario: 'You connected several external search tools and data sources to Claude Code, but the connection config lives only on each member\'s machine, so every newcomer must reconnect.',
      question: 'What is the right improvement?',
      options: ['Have each person recall and type the connection config by hand every time','Concentrate the work on whoever is already connected','Share the MCP server connection config as project settings in the repo so everyone gets the same connections','Drop external tool integration because connecting is a hassle'],
      explanations: ['Typing it by hand each time is personal and error-prone.','Concentrating on one person is personal dependency and stalls when they are away.','Sharing the MCP connection config as project settings means newcomers need no reconnect and get the same connections.','Dropping integration abandons the requirement.']
    }
  },
  {
    id: 'cc-014', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '権限設定で「読み取り系コマンドは許可、書き込み・削除系は確認を要求」にしたい。最小権限で安全に運用したい。',
      question: '適切な方針は？',
      options: ['とりあえず全部許可して、危なそうなら後で外す','許可リストに安全な操作だけを明示し、それ以外はデフォルトで確認／拒否にする','全部拒否にして毎回手で例外を足す（実質手作業に戻る）','許可・拒否は決めず運用で気をつける'],
      explanations: ['全部許可してから外すのは事故が先に起きる。最小権限と逆。','安全な操作だけ明示許可し、それ以外は確認／拒否＝最小権限の正しい設計。','全部拒否で毎回手で足すのは運用が回らず、結局手作業に逆戻り。','決めずに気をつけるのは仕組みでなく記憶頼み。']
    },
    en: {
      scenario: 'In permissions you want read commands allowed but write/delete commands to require confirmation — least privilege, safe operation.',
      question: 'What is the right policy?',
      options: ['Allow everything for now and remove risky ones later','Explicitly allowlist only safe operations and default everything else to confirm/deny','Deny everything and add exceptions by hand each time (back to manual work)','Do not decide allow/deny and just be careful operationally'],
      explanations: ['Allow-all-then-remove lets the accident happen first; the opposite of least privilege.','Allowlisting only safe ops and defaulting the rest to confirm/deny is correct least-privilege design.','Deny-all with hand-added exceptions does not scale and reverts to manual work.','Deciding nothing and "being careful" is memory, not a mechanism.']
    }
  },
  {
    id: 'cc-015', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '同じバグ調査でも、人によって「ログを見る／再現手順を作る／原因仮説を立てる」のやり方がバラバラで品質が安定しない。',
      question: 'チームで品質を揃える最善手は？',
      options: ['一番上手い人のやり方を口頭で共有する','各自が自分流を続け、レビューで都度直す','バグ調査は得意な人に集約する','調査の標準手順をスラッシュコマンド／スキル化し、CLAUDE.md に方針を書いてコミットして全員で使う'],
      explanations: ['口頭共有は再現性がなく、すぐ崩れる。','自分流＋都度修正はコストが高く品質が安定しない。','一人に集約＝属人化。本人不在で止まる。','調査手順をコマンド化し方針をCLAUDE.mdに書いてコミット＝共有・再現性・品質の標準化ができる正攻法。']
    },
    en: {
      scenario: 'Even for the same bug investigation, people differ in how they read logs, build a repro, and form hypotheses, so quality is unstable.',
      question: 'What best aligns team quality?',
      options: ['Share the best person\'s approach verbally','Let everyone keep their own style and fix it in review each time','Funnel bug investigation to one strong person','Turn the investigation steps into a slash command/skill, write the policy in CLAUDE.md, and commit it for everyone'],
      explanations: ['Verbal sharing is not reproducible and erodes quickly.','Own-style plus per-review fixes is costly and unstable.','Funneling to one person is personal dependency and stalls when they are away.','Turning the steps into a command and committing the policy in CLAUDE.md gives sharing, reproducibility, and standardized quality.']
    }
  },
  {
    id: 'cc-016', domain: 'claudecode', answer: 0,
    ja: {
      scenario: 'Claude Codeの設定（CLAUDE.md・スラッシュコマンド・権限）を変えたら、誰が・いつ・なぜ変えたかを追えるようにしたい。',
      question: '適切な運用は？',
      options: ['.claude/ をリポジトリで管理し、設定変更も通常のコミット／PRとして履歴に残す','設定は各自がローカルで好きに変え、記録は残さない','変更点はSlackに書くだけで済ませる','設定変更は口頭で合意して即反映する'],
      explanations: ['.claude/ をバージョン管理してコミット／PRで残せば、誰がいつなぜ変えたかが履歴で追え、レビューもできる。','ローカルで好き勝手＋記録なしは追跡不能で属人化する。','Slackメモだけでは設定そのものと履歴が紐づかない。','口頭合意・即反映は記録が残らず再現できない。']
    },
    en: {
      scenario: 'When you change Claude Code settings (CLAUDE.md, slash commands, permissions), you want to trace who changed what, when, and why.',
      question: 'What is the right practice?',
      options: ['Manage .claude/ in the repo so setting changes are normal commits/PRs with history','Let each person change settings locally with no record','Just post changes in Slack','Agree verbally and apply immediately'],
      explanations: ['Version-controlling .claude/ via commits/PRs records who/when/why and enables review.','Free local edits with no record are untraceable and person-dependent.','A Slack note alone does not tie history to the actual settings.','Verbal agreement applied immediately leaves no record and is not reproducible.']
    }
  },
  {
    id: 'cc-017', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'あるスラッシュコマンドが本番環境に対して破壊的操作を含みうる。誰でも軽い気持ちで実行できる状態は避けたい。',
      question: '安全側に倒す設計は？',
      options: ['コマンド名を分かりにくくして気づきにくくする','実行ログだけ後で見て反省する','破壊的操作は権限設定で確認を必須化し、危険コマンドは許可リストから外して明示承認を要求する','実行は早い者勝ちにして速度を優先する'],
      explanations: ['名前を隠すのは事故防止にならず、むしろ混乱を生む。','後でログを見ても破壊は取り返せない。','破壊的操作に確認必須・明示承認を要求＝最小権限と人の判断を介する正しい設計。','速度優先で危険操作を素通しは最悪。']
    },
    en: {
      scenario: 'A slash command could include destructive operations against production. You want to avoid anyone running it casually.',
      question: 'What design errs on the safe side?',
      options: ['Make the command name obscure so it is hard to notice','Just review the execution log afterward','Require confirmation for destructive ops in permissions and keep dangerous commands off the allowlist so they need explicit approval','Make execution first-come-first-served to prioritize speed'],
      explanations: ['Hiding the name does not prevent accidents and breeds confusion.','Reviewing logs later cannot undo destruction.','Requiring confirmation/explicit approval for destructive ops applies least privilege and human judgment — correct.','Prioritizing speed and waving through dangerous ops is the worst.']
    }
  },
  {
    id: 'cc-018', domain: 'claudecode', answer: 1,
    ja: {
      scenario: 'Claude Code でファイル編集後、毎回「フォーマッタをかける」のを誰かが忘れて差分が汚れる。',
      question: '根本対策は？',
      options: ['コミットメッセージに「整形した」と書く運用にする','編集後イベントに hook を設定して、フォーマッタを自動実行する','整形は気づいた人がやる文化にする','整形しないことを許容して差分の汚れは無視する'],
      explanations: ['メッセージに書くだけでは実際の整形は保証されない。','編集後イベントの hook でフォーマッタを自動実行＝人が忘れても確実に走る根本対策。','気づいた人任せは抜けが出る。','汚れ放置は差分レビューを困難にし品質を下げる。']
    },
    en: {
      scenario: 'After editing files in Claude Code, someone keeps forgetting to run the formatter and the diff gets messy.',
      question: 'What is the root-cause fix?',
      options: ['Adopt a rule of writing "formatted" in the commit message','Set a hook on the post-edit event to auto-run the formatter','Make it a culture where whoever notices runs it','Tolerate not formatting and ignore the messy diff'],
      explanations: ['Writing it in the message does not guarantee the formatting actually happened.','A hook on the post-edit event auto-runs the formatter — a root fix that runs even if forgotten.','Whoever-notices leaves gaps.','Leaving it messy hurts diff review and lowers quality.']
    }
  },
  {
    id: 'cc-019', domain: 'claudecode', answer: 3,
    ja: {
      scenario: '複数リポジトリで共通の社内規約（命名規則・禁止ライブラリ）を効かせたい。各リポジトリにバラバラに書くと更新が追いつかない。',
      question: '保守しやすい方法は？',
      options: ['各リポジトリのCLAUDE.mdに毎回全文をコピペし、更新も全部手で直す','規約は誰かが覚えていて口頭で都度伝える','規約はもう揃えるのを諦める','共通規約はユーザー／組織スコープのメモリに置き、各リポジトリのCLAUDE.mdは固有事項に絞って参照させる'],
      explanations: ['全文コピペ＋手更新は更新漏れと不一致が必ず起きる。','口頭は再現性がなくスケールしない。','諦めは要件放棄。','共通規約を上位スコープに置き、各リポジトリは固有事項に絞る＝階層を活かして一元管理できる正攻法。']
    },
    en: {
      scenario: 'You want common org standards (naming rules, banned libraries) across many repos. Writing them separately in each repo makes updates fall behind.',
      question: 'What is more maintainable?',
      options: ['Copy-paste the full text into each repo\'s CLAUDE.md and update them all by hand','Have someone remember the standards and convey them verbally','Give up on keeping them aligned','Put common standards in user/org-scope memory and keep each repo\'s CLAUDE.md to repo-specific items'],
      explanations: ['Full-text copy-paste plus manual updates guarantees missed updates and inconsistency.','Verbal is not reproducible and does not scale.','Giving up abandons the requirement.','Putting common standards in a higher scope and limiting repo CLAUDE.md to specifics uses the hierarchy for single-source management.']
    }
  },
  {
    id: 'cc-020', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '大規模リファクタを、調査・分割実装・テスト整備に分けて並行で進めたい。メインの会話の文脈は汚したくない。',
      question: 'Claude Code内で適切な進め方は？',
      options: ['独立した部分をサブエージェントに分割して任せ、各自の結果をメインで統合する','全部メインの会話で一気にやって文脈を膨らませる','調査結果を都度手でコピーして貼り直す','一人が全部順番にやり、並行はしない'],
      explanations: ['独立部分をサブエージェントに分割し結果をメインで統合＝文脈分離と並行を両立する正攻法。','メインで全部は文脈が膨らみ品質が落ちる。','手コピーは属人的で抜けやすい。','順番だけだと並行の利点が得られない（独立作業がある前提）。']
    },
    en: {
      scenario: 'You want to run a large refactor in parallel across research, split implementation, and test setup, without polluting the main conversation\'s context.',
      question: 'What is a good approach within Claude Code?',
      options: ['Split independent parts to subagents and integrate their results in the main thread','Do it all in the main conversation and let context balloon','Manually copy and re-paste research each time','Have one person do it all sequentially, no parallelism'],
      explanations: ['Splitting independent parts to subagents and integrating results in main achieves context separation and parallelism.','Doing it all in main balloons context and lowers quality.','Manual copy is personal and error-prone.','Sequential-only forgoes parallel benefits when independent work exists.']
    }
  },
  {
    id: 'cc-021', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'PR作成時に「テスト結果と影響範囲のサマリーを必ず本文に付ける」を、チーム全員が抜けなくやれるようにしたい。',
      question: '最も確実なのは？',
      options: ['本文の書き方を各自のセンスに任せる','付け忘れたらレビューで指摘して直してもらう','PR作成のスラッシュコマンドにサマリー生成を組み込み、CIでも本文要件を自動チェックする','テンプレ文をSlackに置いて毎回コピペしてもらう'],
      explanations: ['各自のセンス任せは抜け・ばらつきが出る。','レビューでの後追い指摘は手戻りが多い。','PR作成コマンドにサマリー生成を組み込み、CIでも本文要件を自動チェック＝抜けなく再現できる正攻法。','コピペ運用は抜け漏れの温床で、仕組みになっていない。']
    },
    en: {
      scenario: 'You want everyone to always include a test-results and impact summary in the PR body, with no misses.',
      question: 'What is most reliable?',
      options: ['Leave the body format to each person\'s sense','If forgotten, point it out in review and have them fix it','Build summary generation into the PR-creation slash command and also auto-check the body requirement in CI','Put a template in Slack and have people copy-paste it each time'],
      explanations: ['Leaving it to each person\'s sense yields misses and variance.','After-the-fact review comments cause rework.','Building summary generation into the PR command and enforcing the body requirement in CI reproduces it with no misses.','Copy-paste is a source of omissions and is not a mechanism.']
    }
  },
  {
    id: 'cc-022', domain: 'claudecode', answer: 1,
    ja: {
      scenario: 'Claude Code に与える権限を見直したい。実際に使われていない広い許可（任意のシェル実行全許可など）が残っている。',
      question: '最小権限の観点で正しい対応は？',
      options: ['念のため広い許可は残しておく','実際に必要な操作だけを許可リストに残し、使っていない広い許可は外す','許可は一度決めたら見直さない','迷ったらすべて許可に倒す'],
      explanations: ['「念のため広め」は攻撃面・事故面を広げる。最小権限に反する。','必要な操作だけ残し不要な広い許可を外す＝最小権限の正しい運用。','見直さない運用は権限が肥大化していく。','迷ったら全許可は最も危険な倒し方。']
    },
    en: {
      scenario: 'You want to review the permissions granted to Claude Code. Broad, unused grants (e.g., allow any shell execution) remain.',
      question: 'What is correct under least privilege?',
      options: ['Keep broad grants just in case','Keep only operations actually needed in the allowlist and remove unused broad grants','Never revisit permissions once decided','When unsure, default to allowing everything'],
      explanations: ['"Broad just in case" widens attack and accident surface — against least privilege.','Keeping only needed ops and removing unused broad grants is correct least-privilege practice.','Never revisiting lets permissions bloat.','Defaulting to allow-all when unsure is the most dangerous choice.']
    }
  },
  {
    id: 'cc-023', domain: 'claudecode', answer: 3,
    ja: {
      scenario: 'チームの誰かがローカルだけで便利なスラッシュコマンドを作って使っているが、他のメンバーは存在を知らない。',
      question: '組織的に活かす最善手は？',
      options: ['作った本人だけが使い続ける','使い方を口頭で広める','各自が同じものを自前で再実装する','そのコマンド定義を .claude/ にコミットして共有し、全員が同じものを使えるようにする'],
      explanations: ['本人だけの利用は属人化で、ノウハウが共有されない。','口頭普及は再現性がなく、実物が行き渡らない。','各自再実装は二重作業で品質もバラつく。','コマンド定義を .claude/ にコミットして共有＝属人化解消・全員が同じものを使える正攻法。']
    },
    en: {
      scenario: 'Someone on the team built a handy slash command they use only locally, and others don\'t know it exists.',
      question: 'What best leverages it organizationally?',
      options: ['Only the author keeps using it','Spread usage verbally','Have each person reimplement the same thing','Commit the command definition under .claude/ to share it so everyone uses the same one'],
      explanations: ['Author-only use is person-dependent and shares no know-how.','Verbal spread is not reproducible and the actual tool does not reach people.','Reimplementing each is duplicate work with varying quality.','Committing the command under .claude/ removes personal dependency and lets everyone use the same one.']
    }
  },
  {
    id: 'cc-024', domain: 'claudecode', answer: 0,
    ja: {
      scenario: 'MCPで接続した外部サービスのトークンを、リポジトリにコミットせずに安全に扱いたい。',
      question: '適切な管理方法は？',
      options: ['トークンは環境変数や秘密情報の管理に置き、設定では参照のみにしてコミットしない','トークンをCLAUDE.mdに直接書いてコミットする','トークンをスラッシュコマンドの定義にハードコードする','トークンを毎回チャットに貼り付けて使う'],
      explanations: ['トークンは環境変数／シークレット管理に置き、設定は参照のみにすればコミットされず安全。','CLAUDE.md直書き＋コミットは秘密情報の漏洩そのもの。','コマンド定義へのハードコードも共有時に漏れる。','毎回チャット貼り付けは属人的で漏洩・履歴残りのリスク。']
    },
    en: {
      scenario: 'You want to handle tokens for an MCP-connected external service safely, without committing them to the repo.',
      question: 'What is the right management?',
      options: ['Keep tokens in environment variables/secret management and only reference them in config, not committed','Write tokens directly in CLAUDE.md and commit','Hardcode tokens in the slash command definition','Paste tokens into chat each time'],
      explanations: ['Keeping tokens in env vars/secret management and only referencing them avoids committing and is safe.','Writing tokens in CLAUDE.md and committing is a secret leak.','Hardcoding into a command definition also leaks when shared.','Pasting into chat each time is personal and risks leakage and history retention.']
    }
  },
  {
    id: 'cc-025', domain: 'claudecode', answer: 2,
    ja: {
      scenario: '「マージ前に必ずレビューが付き、テストが緑であること」をルールにしたい。口頭ルールだと守られないことがある。',
      question: '確実に効かせる方法は？',
      options: ['ルールをCLAUDE.mdに書けば自動でブロックされると考える','レビュー有無は各自の良心に任せる','レビュー必須・必須チェック合格をマージ条件として設定し、満たさなければマージできないようにする','緑じゃなくてもとりあえずマージして後で直す'],
      explanations: ['CLAUDE.md の記述は指示であって、マージのブロックを自動で行う保証ではない。','良心任せは守られないことがある。仕組みで担保すべき。','レビュー必須＋必須チェック合格をマージ条件にすれば、満たさない限りマージできず確実に効く。','緑でないマージは検証を飛ばすアンチパターン。']
    },
    en: {
      scenario: 'You want a rule that a review must be present and tests green before merge. Verbal rules sometimes aren\'t followed.',
      question: 'How do you make it reliably enforced?',
      options: ['Assume writing it in CLAUDE.md auto-blocks the merge','Leave whether to review to each person\'s conscience','Set required review and required passing checks as merge conditions so it can\'t merge unless met','Merge even if not green and fix later'],
      explanations: ['A CLAUDE.md note is an instruction, not a guarantee that merges are auto-blocked.','Conscience-based is sometimes not followed; enforce structurally.','Required review plus required passing checks as merge conditions means it cannot merge unless met — reliably enforced.','Merging while not green skips verification — an anti-pattern.']
    }
  },
  {
    id: 'cc-026', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '新しく追加した hook が重く、毎回の編集が遅い／たまに誤って処理を止める。チームに展開する前に確認したい。',
      question: '適切な進め方は？',
      options: ['とりあえず全員に配って様子を見る','まず自分の環境で挙動と影響範囲を検証し、問題なければ設定をコミットして展開する','重さは気にせずそのまま本番運用に入れる','誤って止まることは無視して使い続ける'],
      explanations: ['いきなり全員配布は誤作動が全体に波及する。検証を飛ばすアンチパターン。','自分の環境で挙動・影響範囲を検証→問題なければコミットして展開＝安全な段階展開。','重さを無視した本番投入は生産性と信頼性を損なう。','誤停止の無視は事故を放置すること。']
    },
    en: {
      scenario: 'A newly added hook is heavy — edits are slow and it sometimes wrongly halts work. You want to check before rolling it out to the team.',
      question: 'What is the right approach?',
      options: ['Just distribute it to everyone and see what happens','First verify behavior and impact in your own environment, then commit and roll out the config if fine','Put it into production regardless of the slowness','Ignore the wrong halts and keep using it'],
      explanations: ['Distributing to everyone immediately spreads misbehavior; it skips verification.','Verifying behavior/impact locally then committing to roll out is safe staged rollout.','Ignoring slowness in production hurts productivity and reliability.','Ignoring wrong halts leaves an incident unaddressed.']
    }
  },
  {
    id: 'cc-027', domain: 'claudecode', answer: 0,
    ja: {
      scenario: '「このプロジェクトでは本番ブランチへ直接コミットしない」を、Claude Code 経由でも確実に守らせたい。',
      question: '最も確実なのは？',
      options: ['権限／フックで本番ブランチへの直接書き込みを止め、加えてリポジトリ側でブランチ保護を設定する','CLAUDE.md に「直接コミット禁止」と書くだけにする','本人がそのつど気をつける','たまにしか触らないので運用で十分とする'],
      explanations: ['権限／フックで直接書き込みを止め、ブランチ保護も設定＝Claude Code 側とリポジトリ側の両方で確実に止める正攻法。','文言だけでは自動でブロックされない。','その都度の注意は記憶頼みで抜ける。','「たまにだから運用で十分」は一度の事故で破綻する。']
    },
    en: {
      scenario: 'You want "no direct commits to the production branch" reliably enforced even via Claude Code.',
      question: 'What is most reliable?',
      options: ['Block direct writes to the production branch via permissions/hooks, plus set branch protection on the repo side','Just write "no direct commits" in CLAUDE.md','Have the person be careful each time','Decide that since it\'s rare, operational care is enough'],
      explanations: ['Blocking direct writes via permissions/hooks plus branch protection enforces it on both the Claude Code and repo sides.','Wording alone does not auto-block.','Per-time care relies on memory and leaks.','"Rare, so care is enough" breaks on a single accident.']
    }
  },
  {
    id: 'cc-028', domain: 'claudecode', answer: 3,
    ja: {
      scenario: 'チームのClaude Code運用をオンボーディング資料にまとめたい。新メンバーが入っても同じ前提で動けるようにしたい。',
      question: '再現性の観点で最も効くのは？',
      options: ['口頭オンボーディングだけで済ませる','資料はあるが設定はコミットされておらず各自バラバラ','資料を作るが更新されず実態とずれていく','規約はCLAUDE.md、繰り返し手順はスラッシュコマンド／スキル、自動チェックはhooks／CIとして .claude/ にコミットし、資料はそれを指し示す'],
      explanations: ['口頭だけは再現性ゼロ。新メンバーごとに前提がずれる。','設定がコミットされていなければ資料があっても実態がバラバラになる。','更新されない資料は実態とずれて信頼できなくなる。','規約・手順・自動チェックを実体としてコミットし、資料がそれを指す＝設定で前提を担保する再現性の正攻法。']
    },
    en: {
      scenario: 'You want to capture the team\'s Claude Code practice in onboarding docs so new members operate on the same assumptions.',
      question: 'What works best for reproducibility?',
      options: ['Do onboarding verbally only','Have docs but uncommitted, per-person settings','Make docs that aren\'t updated and drift from reality','Commit standards as CLAUDE.md, repeatable steps as slash commands/skills, and auto-checks as hooks/CI under .claude/, with docs pointing to them'],
      explanations: ['Verbal-only has zero reproducibility; assumptions drift per new member.','If settings aren\'t committed, docs exist but reality varies per person.','Unmaintained docs drift from reality and lose trust.','Committing standards/steps/auto-checks as artifacts with docs pointing to them secures assumptions in config — the reproducible way.']
    }
  },
  {
    id: 'cc-029', domain: 'claudecode', answer: 1,
    ja: {
      scenario: '危険操作の許可リストを更新したが、自分のローカルだけ直して動作確認し、満足して終えてしまいそうになっている。',
      question: 'チーム運用として正しい締め方は？',
      options: ['ローカルで効いていれば十分なのでそのまま終える','変更した settings.json をコミット／PRにしてレビューを通し、全員に共有する','変更内容をSlackに文章で説明して終える','次に困った人が同じ修正を各自やればよい'],
      explanations: ['ローカルだけでは他メンバーに効かず、属人化したまま終わる。','変更をコミット／PR＋レビューで全員に共有＝設定をチームに行き渡らせる正しい締め方。','Slackの説明だけでは実体の設定が共有されない。','各自が同じ修正を繰り返すのは二重作業で不整合の元。']
    },
    en: {
      scenario: 'You updated the dangerous-ops allowlist, but only fixed it locally, tested it, and are about to call it done.',
      question: 'What is the correct way to close this out as team practice?',
      options: ['Local enforcement is enough, so just finish','Commit/PR the changed settings.json, get it reviewed, and share it with everyone','Just explain the change in Slack and finish','Let the next person who hits the issue make the same fix themselves'],
      explanations: ['Local-only does not apply to others and finishes still person-dependent.','Commit/PR + review shares the change with everyone — the correct close-out that propagates config.','A Slack explanation alone does not share the actual settings.','Repeating the same fix per person is duplicate work and breeds inconsistency.']
    }
  },
  {
    id: 'cc-030', domain: 'claudecode', answer: 2,
    ja: {
      scenario: 'デプロイ前チェック（ビルド・テスト・依存脆弱性スキャン）を、Claude Codeでの作業からCI／CDまで一貫して効かせ、失敗時は止めたい。',
      question: '一貫性と安全性が最も高い設計は？',
      options: ['ローカルでだけ手動チェックし、CIには入れない','CIには入れるがローカルでは何もしない（人によって差分が出る）','ローカルは hooks で同等チェックを自動実行し、CI／CD でも必須チェックとして実行し、失敗時はパイプラインを停止する','チェックは重いので本番直前に一度だけ手で回す'],
      explanations: ['ローカル手動のみはCIで担保されず、人によって差が出る。','CIだけでローカル無しだと手元で気づけず手戻りが増える。','ローカルは hooks で自動実行、CI／CD でも必須チェックにして失敗時停止＝一貫性と安全性を両立する正攻法。','本番直前に一度手で回すだけは抜けと事故のリスクが高い。']
    },
    en: {
      scenario: 'You want pre-deploy checks (build, tests, dependency vulnerability scan) enforced consistently from Claude Code work through CI/CD, stopping on failure.',
      question: 'What design is highest in consistency and safety?',
      options: ['Manual checks locally only, not in CI','In CI but nothing locally (people diverge)','Auto-run equivalent checks locally via hooks, run them as required checks in CI/CD too, and stop the pipeline on failure','Since checks are heavy, run them by hand once right before production'],
      explanations: ['Local-manual-only is not enforced in CI and diverges per person.','CI-only with nothing local means you can\'t catch issues early and rework grows.','Auto-running locally via hooks plus required checks in CI/CD with stop-on-failure achieves both consistency and safety.','Running by hand once before production is high risk for misses and accidents.']
    }
  }
);
