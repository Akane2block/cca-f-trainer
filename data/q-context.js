// CCA-F practice questions — domain: context — exam-style scenarios (rebuilt 2026-07)
window.QUESTIONS.push(
  {
    id: 'ctx2-001', domain: 'context', answer: 2,
    ja: {
      scenario: 'ECモール運営企業のデータチームは、出店者向けに商品レビューの感情分析レポートを提供している。毎晩0時にその日に投稿された約45,000件のレビューをMessages APIで1件ずつ処理しており、結果は2営業日以内に出店者ポータルへ反映されればよい契約になっている。処理は現在3時間ほどで完了しているが、月次のAPI利用料が予算を大幅に超過し、経営層から品質を落とさないコスト削減を求められた。プロンプトの大半はレビュー本文そのもので、共通の指示部分は短い。',
      question: '最も適切なコスト削減策はどれか。',
      options: [
        'プロンプトの指示部分を圧縮し、入力トークン数を削減する',
        '共通の指示部分にprompt cachingを適用し、キャッシュ読み込みの割引を受ける',
        '処理をMessage Batches APIに移行し、非同期の一括処理に切り替える',
        '感情分析を小型の低価格モデルに切り替える'
      ],
      explanations: [
        '指示部分はもともと短く、入力の大半はレビュー本文のため、圧縮しても削減効果はごく小さい。',
        'キャッシュは大きな同一プレフィックスの再利用で効く仕組みで、共通部分が短いこの構成では割引対象がほとんどない。',
        '正解。決め手は「2営業日以内でよい」というレイテンシ許容度。即時性が不要な大量処理はBatch APIに移せば品質そのままで50%割引になる。',
        'コストは下がるが品質低下のリスクがあり、「品質を落とさない」という条件に反する。要件を犠牲にせず半額にできる手段が他にある。'
      ]
    },
    en: {
      scenario: 'The data team at an e-commerce marketplace provides sellers with sentiment-analysis reports on product reviews. Every night at midnight they process roughly 45,000 reviews posted that day, one call at a time through the Messages API; contractually, results only need to appear in the seller portal within two business days. Processing currently finishes in about three hours, but monthly API spend has blown far past budget, and leadership demands cost cuts without any loss of quality. Most of each prompt is the review text itself — the shared instruction section is short.',
      question: 'Which cost-reduction approach is most appropriate?',
      options: [
        'Compress the instruction section of the prompt to reduce input tokens',
        'Apply prompt caching to the shared instruction section to receive discounted cache reads',
        'Move the workload to the Message Batches API for asynchronous bulk processing',
        'Switch the sentiment analysis to a smaller, cheaper model'
      ],
      explanations: [
        'The instructions are already short and most of the input is review text, so compression yields marginal savings.',
        'Caching pays off when a large identical prefix is reused; here the shared portion is short, so there is little to discount.',
        'Correct. The deciding detail is the two-business-day latency tolerance. Bulk work that needs no immediate response gets a 50% discount on the Batch API with identical quality.',
        'It cuts cost but risks quality, violating the stated requirement. Another option achieves a 50% cut with no quality change.'
      ]
    }
  },
  {
    id: 'ctx2-002', domain: 'context', answer: 1,
    ja: {
      scenario: '損害保険会社の査定部門は、毎日届く約30,000件の事故報告書をMessage Batches APIで分類している。分類結果のファイルは毎朝9:00までに取得を完了し、基幹システムに取り込む必要がある（取り込み処理自体は数分で終わる）。これまでの実績ではバッチの9割以上が投入から1時間以内に完了しているが、APIの仕様上、バッチの処理には最大24時間かかる場合がある。運用チームは投入ジョブのスケジュール設定を見直している。',
      question: 'SLAを確実に守れる、最も遅いバッチ投入時刻はどれか。',
      options: [
        '当日8:00',
        '前日9:00',
        '前日8:00',
        '前々日9:00'
      ],
      explanations: [
        '「9割以上が1時間以内」は実績であって保証ではない。仕様上の最大24時間で設計しないとSLA違反のリスクが残る。',
        '正解。9:00（SLA）− 24時間（仕様上の最大処理時間）＝前日9:00。保証された上限から逆算するのが正しい計算。',
        '24時間に加えてさらに1時間の余裕を引いており、安全ではあるが「最も遅い投入時刻」という問いの答えにはならない。',
        '24時間を2回引いた誤計算。最大処理時間は1つのバッチにつき1回だけ考慮すればよい。'
      ]
    },
    en: {
      scenario: 'The claims department of a property insurer classifies about 30,000 accident reports every day using the Message Batches API. The results file must be fully retrieved by 9:00 a.m. each morning so it can be loaded into the core system (the load itself takes only a few minutes). Historically more than 90% of batches finish within an hour of submission, but by specification a batch may take up to 24 hours to process. The operations team is reviewing the schedule of the submission job.',
      question: 'What is the latest batch submission time that still guarantees the SLA?',
      options: [
        '8:00 a.m. the same day',
        '9:00 a.m. the previous day',
        '8:00 a.m. the previous day',
        '9:00 a.m. two days before'
      ],
      explanations: [
        'The one-hour figure is an observed track record, not a guarantee. Designing to it leaves SLA risk.',
        'Correct. 9:00 a.m. (SLA) minus 24 hours (the guaranteed maximum processing time) = 9:00 a.m. the previous day. Work backwards from the guaranteed maximum.',
        'This subtracts an extra hour of slack on top of the 24 hours; safe, but not the latest possible time the question asks for.',
        'This subtracts the 24 hours twice. The maximum processing time applies once per batch.'
      ]
    }
  },
  {
    id: 'ctx2-003', domain: 'context', answer: 3,
    ja: {
      scenario: '多言語マニュアル制作会社は、顧客から預かった技術文書約12,000セクションの翻訳ドラフトをBatch APIで生成し、毎週金曜18:00までに顧客のレビューシステムへ納品する契約を結んでいる。入力JSONLの生成には前処理として約2時間かかる。過去3ヶ月の実績ではバッチは平均45分で完了しているが、仕様上は最大24時間かかる可能性がある。納品スクリプトは結果取得後すぐに実行され、所要時間は無視できる。',
      question: '納期を確実に守れる、最も遅いバッチ投入時刻はどれか。',
      options: [
        '金曜17:15',
        '木曜16:00',
        '水曜18:00',
        '木曜18:00'
      ],
      explanations: [
        '平均45分は実績にすぎず保証ではない。最大24時間を前提に設計する必要がある。',
        '前処理の2時間は「投入前」に行う作業。JSONL生成の開始を木曜16:00までにする必要はあるが、問われている投入時刻自体からさらに引く必要はない。',
        '24時間を二重に引いた誤計算。',
        '正解。金曜18:00 − 最大24時間 ＝ 木曜18:00。保証された最大処理時間だけで逆算する。'
      ]
    },
    en: {
      scenario: 'A localization vendor generates draft translations of about 12,000 technical-manual sections with the Batch API and must deliver them to the client’s review system by 18:00 every Friday. Building the input JSONL takes about two hours of preprocessing. Over the past three months batches have completed in 45 minutes on average, but the specification allows up to 24 hours. The delivery script runs immediately after results are retrieved and its runtime is negligible.',
      question: 'What is the latest batch submission time that still guarantees the delivery deadline?',
      options: [
        'Friday 17:15',
        'Thursday 16:00',
        'Wednesday 18:00',
        'Thursday 18:00'
      ],
      explanations: [
        'The 45-minute average is history, not a guarantee; the design must assume the 24-hour maximum.',
        'The two hours of preprocessing happen before submission; they set the preparation start at Thursday 16:00 but do not move the submission deadline itself.',
        'This subtracts the 24-hour maximum twice.',
        'Correct. Friday 18:00 minus the guaranteed 24-hour maximum = Thursday 18:00.'
      ]
    }
  },
  {
    id: 'ctx2-004', domain: 'context', answer: 0,
    ja: {
      scenario: 'CRMベンダーのエンジニアは、顧客企業のデータベースに保存された約120万件の商談メモを夜間にBatch APIで要約し、各行の要約カラムに書き戻すパイプラインを構築中である。リクエストは営業支援DBの行から生成され、各行にはUUIDの主キーがある。コードレビューで、結果JSONLを上から順に読み、入力JSONLの行番号と対応づけて書き戻す実装が提出された。テスト環境の500件では問題なく動作している。',
      question: '本番投入前の修正指摘として、最も適切なものはどれか。',
      options: [
        '各リクエストのcustom_idに行のUUIDを設定し、結果側のcustom_idで突合するように変更する',
        '結果は投入順に返るため現行ロジックのままでよいが、行数の一致チェックだけ追加する',
        'プロンプトに主キーを含め、モデルに応答へ主キーを出力させて突合する',
        '要約テキストの内容で元の商談メモをDB検索して対応づける'
      ],
      explanations: [
        '正解。バッチは並列処理され、結果の返却順は保証されない。テストの500件でたまたま一致しても本番規模では崩れる。主キーをcustom_idに入れて突合するのが定番の設計。',
        '「投入順に返る」という前提自体が誤り。行数が一致していても対応関係がずれる。',
        'モデル出力にIDを含めさせると、ハルシネーションでIDが捏造・欠落するリスクがあり、突合キーとして信頼できない。',
        '内容ベースの照合は類似メモとの誤一致リスクと検索コストが高く、確実なキーが存在するのに使わない理由がない。'
      ]
    },
    en: {
      scenario: 'An engineer at a CRM vendor is building a nightly pipeline that summarizes about 1.2 million deal notes stored in a customer database via the Batch API and writes each summary back to its row. Requests are generated from database rows, each of which carries a UUID primary key. In code review, the submitted implementation reads the results JSONL top to bottom and writes back by matching line numbers against the input JSONL. It works fine in the 500-record test environment.',
      question: 'Which review comment is the most appropriate fix before production?',
      options: [
        'Set each row’s UUID as the request’s custom_id and join on custom_id in the results',
        'Results come back in submission order, so keep the current logic and just add a row-count check',
        'Include the primary key in the prompt and have the model echo it in its output for matching',
        'Match each summary back to its source note by searching the database for similar text'
      ],
      explanations: [
        'Correct. Batches are processed in parallel and result order is not guaranteed; 500 test records matching by luck will not hold at production scale. Carrying the primary key in custom_id is the standard design.',
        'The order-guarantee assumption itself is wrong. Matching row counts do not mean the rows correspond.',
        'Having the model emit IDs risks hallucinated or dropped keys; it is not a reliable join key.',
        'Content-based matching risks false matches between similar notes and adds cost when an exact key is already available.'
      ]
    }
  },
  {
    id: 'ctx2-005', domain: 'context', answer: 2,
    ja: {
      scenario: '地域医療ネットワークの開発チームは、紹介状の要約を夜間バッチで生成し患者レコードに保存するシステムを運用している。ある朝、患者Aの紹介状要約が患者Bのレコードに保存されているという報告が複数の病院から寄せられた。調査すると、結果の件数は投入件数と完全に一致しており、欠損もエラーもなかった。実装は結果JSONLを先頭から読み、投入時の配列インデックスに基づいて書き戻していた。前夜のバッチは通常より件数が多く、完了まで4時間かかっていた。',
      question: 'この事故の根本原因として最も適切なものはどれか。',
      options: [
        '一部のリクエストがexpiredになって結果ファイルの行が欠落し、以降のインデックスがずれた',
        '入力JSONLに重複したcustom_idがあり、結果が互いに上書きされた',
        'バッチは並列処理され結果の返却順は投入順と一致しないのに、実装が順序の一致を前提にしていた',
        '処理に4時間かかったことで結果の保持期限を跨ぎ、別バッチの結果と混在した'
      ],
      explanations: [
        'expiredになったリクエストも結果ファイルには行として含まれる上、件数は完全一致と明記されており欠落は起きていない。',
        '実装はcustom_idを使わずインデックスで突合しているため、custom_idの重複はこの事故の原因になり得ない。',
        '正解。決め手は「件数一致・欠損なし・インデックス書き戻し」の組み合わせ。並列処理のため返却順は保証されず、順序前提の突合が本番負荷で崩れた。',
        '結果の保持期間は29日であり、4時間の処理で期限を跨ぐことはない。期限切れは取得失敗になるのであって混在は起きない。'
      ]
    },
    en: {
      scenario: 'A regional healthcare network generates referral-letter summaries in a nightly batch and stores them in patient records. One morning, several hospitals reported that patient A’s summary had been saved into patient B’s record. Investigation showed the number of results exactly matched the number of submitted requests, with no gaps and no errors. The implementation read the results JSONL from the top and wrote back based on the submission-time array index. The previous night’s batch was unusually large and took four hours to complete.',
      question: 'What is the most likely root cause of this incident?',
      options: [
        'Some requests expired, so rows were missing from the results file and later indexes shifted',
        'Duplicate custom_id values in the input JSONL caused results to overwrite each other',
        'Batches are processed in parallel and results are not returned in submission order, but the implementation assumed the order was preserved',
        'Because processing took four hours, the results crossed the retention window and got mixed with another batch’s results'
      ],
      explanations: [
        'Expired requests still appear as rows in the results file, and the counts are stated to match exactly — nothing was missing.',
        'The implementation joins by index, not by custom_id, so duplicate IDs could not have caused this failure.',
        'Correct. The deciding clues are matching counts, no gaps, and index-based write-back. Parallel processing means return order is not guaranteed, and the order assumption broke under production volume.',
        'Results are retained for 29 days; a four-hour run cannot cross the retention window, and expiry causes retrieval failure, not mixing.'
      ]
    }
  },
  {
    id: 'ctx2-006', domain: 'context', answer: 1,
    ja: {
      scenario: 'フィンテック企業の新任エンジニアは、毎晩22:00に投入する取引メモ分類バッチの結果取得ジョブを実装した。実績上ほとんどのバッチは1時間以内に完了するため、23:30に固定でresults_urlへアクセスして結果をダウンロードする仕組みにした。リリース後、週に1〜2回の頻度で結果取得が失敗し、翌朝のレポートが欠損する障害が起きている。失敗した夜のバッチはいずれも件数が通常より多い日だった。',
      question: '最も適切な修正はどれか。',
      options: [
        '固定の待機時刻を23:30から翌日22:00（24時間後）に変更する',
        'processing_statusを定期的にポーリングし、endedになってからresults_urlで結果を取得する',
        'バッチを5,000件ずつに分割して各バッチの処理時間を短縮する',
        '通常のMessages APIに切り替えて同期的に処理する'
      ],
      explanations: [
        '24時間待てば確実に完了しているが、翌朝のレポートに毎回間に合わなくなり、要件そのものを壊してしまう。',
        '正解。完了時刻は保証されないため、固定待機ではなくprocessing_statusが"ended"になるまでポーリングしてから取得するのが正規の設計。',
        '分割しても個々のバッチの完了時刻が保証されるわけではなく、固定待機という設計上の欠陥は残る。',
        '同期処理にすれば取得の失敗は消えるが、バッチ割引を失いコストが倍増する。取得タイミングの設計バグへの対処として過剰。'
      ]
    },
    en: {
      scenario: 'A newly hired engineer at a fintech firm implemented the results-retrieval job for a transaction-note classification batch submitted nightly at 22:00. Since nearly all batches historically finish within an hour, the job simply hits the results_url at a fixed 23:30 and downloads the output. Since release, retrieval has failed once or twice a week, leaving the next morning’s report incomplete. Every failure occurred on a night with an unusually high record count.',
      question: 'Which fix is most appropriate?',
      options: [
        'Move the fixed wait from 23:30 to 22:00 the next day (24 hours later)',
        'Poll processing_status periodically and fetch from results_url only after it reaches "ended"',
        'Split the batch into chunks of 5,000 requests to shorten each batch’s processing time',
        'Switch to the regular Messages API and process synchronously'
      ],
      explanations: [
        'Waiting 24 hours would always find the batch finished, but the morning report would always be late, breaking the requirement itself.',
        'Correct. Completion time is not guaranteed, so the proper design is to poll processing_status until "ended" instead of waiting a fixed interval.',
        'Splitting puts no guarantee on any individual batch’s completion time; the fixed-wait flaw remains.',
        'Synchronous processing removes the race but doubles cost by giving up the batch discount — an oversized fix for a retrieval-timing bug.'
      ]
    }
  },
  {
    id: 'ctx2-007', domain: 'context', answer: 3,
    ja: {
      scenario: '通信キャリアのマーケティングチームは、キャンペーン終了後のアンケート自由回答180,000件をテーマ別に分類することになった。担当エンジニアは全件を1つのJSONLにまとめてBatch APIへ投入するスクリプトを作成した。1リクエストあたりのサイズは約1.2KBで、ファイル全体では約216MBになる。投入を実行したところAPIからエラーが返され、バッチは作成されなかった。納期は1週間後で、時間には余裕がある。',
      question: '最も適切な対応はどれか。',
      options: [
        'リクエスト本文を圧縮してファイルサイズを削減する',
        'レート制限の引き上げをサポートに申請する',
        'プロンプトを短縮して1件あたり約0.6KBに削減する',
        '1バッチあたり100,000件以下になるよう複数のバッチに分割して投入する'
      ],
      explanations: [
        '216MBは256MBのサイズ上限内に収まっており、今回のエラーの原因はサイズではない。',
        '1バッチの件数上限はアカウントのレート制限ではなく仕様上の制限のため、申請では解決しない。',
        'サイズを半分にしても件数は180,000件のままで、原因である件数上限には効かない。',
        '正解。決め手は1バッチ100,000リクエストの上限。180,000件は件数超過であり、サイズ（216MB＜256MB）は問題ない。2つに分割すれば投入できる。'
      ]
    },
    en: {
      scenario: 'A telecom marketing team needs to classify 180,000 free-text survey responses collected after a campaign. The engineer wrote a script that bundles everything into a single JSONL file and submits it as one batch. Each request is roughly 1.2 KB, putting the whole file at about 216 MB. On submission the API returned an error and no batch was created. The delivery deadline is a week away, so time is not a concern.',
      question: 'Which response is most appropriate?',
      options: [
        'Compress the request bodies to reduce the file size',
        'Ask support to raise the account’s rate limits',
        'Shorten the prompts so each request is about 0.6 KB',
        'Split the submission into multiple batches of at most 100,000 requests each'
      ],
      explanations: [
        'At 216 MB the file is already under the 256 MB size cap; size is not the cause of this error.',
        'The per-batch request cap is a specification limit, not an account rate limit, so a support request will not fix it.',
        'Halving the size still leaves 180,000 requests, which is what actually exceeds the limit.',
        'Correct. The deciding constraint is the 100,000-requests-per-batch cap: 180,000 requests exceed it, while 216 MB is within the 256 MB cap. Two batches solve it.'
      ]
    }
  },
  {
    id: 'ctx2-008', domain: 'context', answer: 0,
    ja: {
      scenario: '大手銀行のAI推進室は、社内規定によりすべての生成AIワークロードをAWS環境内で完結させる方針を取っており、ClaudeはAmazon Bedrock経由で利用している。月次で発生する約250,000件の取引レビューコメント分類のコストが課題となり、若手メンバーが「Message Batches APIの50%割引を使えば解決する」と提案、Bedrockのエンドポイントに対してバッチを投入する検証を数日続けているがうまくいかない。チームリーダーであるあなたに相談が来た。',
      question: '最も適切な助言はどれか。',
      options: [
        'Message Batches APIはAnthropicの第一者APIでのみ提供されるため、この割引を前提にするなら第一者API利用の可否を含めて方針を再検討する必要がある',
        'Bedrockでも同一のClaudeモデルが動いているため、リージョンを変更すれば利用できる',
        'custom_idの形式がBedrockの命名規則と競合しているだけなので、形式を修正すれば動く',
        'プロビジョンドスループットを契約すれば同等の割引が得られるため、そちらで代替する'
      ],
      explanations: [
        '正解。決め手は利用経路がBedrockであること。Message Batches APIは第一者API限定で、検証が通らないのは設定ではなく提供範囲の問題。割引前提なら経路自体の再検討が必要になる。',
        'モデルが同じでも提供される機能はプラットフォームごとに異なる。リージョン変更でこのAPIが現れることはない。',
        '実装の細部の問題に見せかけているが、そもそもBedrockにこのAPIが存在しないことが原因。',
        'プロビジョンドスループットはスループット確保の仕組みであり、Batch APIの50%割引と同等のコスト構造を保証するものではない。論点がずれている。'
      ]
    },
    en: {
      scenario: 'The AI office of a major bank operates under a policy that all generative-AI workloads must stay inside AWS, so Claude is accessed through Amazon Bedrock. Facing cost pressure on a monthly classification job covering about 250,000 transaction-review comments, a junior member proposed using the Message Batches API’s 50% discount and has spent several days trying to submit batches against the Bedrock endpoint without success. As the team lead, you are asked for advice.',
      question: 'Which advice is most appropriate?',
      options: [
        'The Message Batches API is available only on Anthropic’s first-party API, so relying on this discount means revisiting whether first-party API use is permissible',
        'The same Claude models run on Bedrock, so switching regions will make it work',
        'The custom_id format merely conflicts with Bedrock naming rules; fixing the format will make it work',
        'Purchasing provisioned throughput will deliver an equivalent discount instead'
      ],
      explanations: [
        'Correct. The deciding detail is the access path: the workload runs on Bedrock, where the Message Batches API is not offered. The failure is about availability, not configuration.',
        'Identical models do not mean identical platform features; changing regions does not add the API.',
        'This frames it as an implementation detail, but the API simply does not exist on Bedrock.',
        'Provisioned throughput is a capacity mechanism, not a pricing structure equivalent to the batch discount; it misses the point.'
      ]
    }
  },
  {
    id: 'ctx2-009', domain: 'context', answer: 2,
    ja: {
      scenario: '製薬会社の法務部門は、四半期ごとに全契約書約8,000件のリスク条項抽出をBatch APIで実行している。3月末に完了したバッチの抽出結果について、5月中旬に外部監査人から「抽出プロセスの生データを提出してほしい」と依頼された。担当者が結果を再取得しようとしたところ、取得できなかった。パイプラインは結果をパースしてダッシュボードDBに流し込むのみで、APIから取得した生の結果ファイルはどこにも保存していなかった。バッチ自体はすべて正常に完了していた記録がある。',
      question: '再発防止策として最も適切なものはどれか。',
      options: [
        '投入時のJSONLを保管しておき、監査依頼が来たら同じ入力で再実行する',
        '結果の保持期間の延長をサポートに申請する',
        '結果取得後ただちに生の結果ファイルを自社ストレージへ永続化する処理をパイプラインに追加する',
        '実行頻度を四半期から月次に上げて、結果が常に新しい状態を保つ'
      ],
      explanations: [
        '再実行にはコストがかかる上、モデルの出力は決定的ではないため「監査対象となった当時の生データ」の代わりにはならない。',
        '結果の保持期間（29日）は仕様であり、申請で延長できるものではない。',
        '正解。決め手は3月末から5月中旬という経過期間。バッチ結果の保持は29日間で、それを過ぎると取得できない。後で必要になるデータは取得時に自社側へ保存するのが正しい設計。',
        '頻度を上げても、取得した結果を保存しない限り29日で消える構造は変わらない。'
      ]
    },
    en: {
      scenario: 'The legal department of a pharmaceutical company runs a quarterly Batch API job that extracts risk clauses from about 8,000 contracts. In mid-May, external auditors asked for the raw output of the batch that had completed at the end of March. When the owner tried to re-download the results, retrieval failed. The pipeline only parses results into a dashboard database and never stored the raw results files anywhere. Records confirm that every batch had completed successfully.',
      question: 'Which change best prevents a recurrence?',
      options: [
        'Keep the submitted JSONL files and re-run the same inputs whenever an audit request arrives',
        'Ask support to extend the results retention period',
        'Add a pipeline step that persists the raw results files to company storage immediately after retrieval',
        'Run the job monthly instead of quarterly so results stay fresh'
      ],
      explanations: [
        'Re-running costs money, and model output is not deterministic, so it cannot stand in for the raw data that was actually produced at the time.',
        'The 29-day retention period is part of the specification and cannot be extended on request.',
        'Correct. The deciding detail is the gap from late March to mid-May: batch results are retained for 29 days, after which they are gone. Data needed later must be persisted on your side at retrieval time.',
        'Higher frequency changes nothing if retrieved results are still never saved — they still disappear after 29 days.'
      ]
    }
  },
  {
    id: 'ctx2-010', domain: 'context', answer: 1,
    ja: {
      scenario: 'オンライン旅行代理店は、予約変更やホテル設備の質問に答える接客チャットボットを運用している。応答は平均4秒で、ピーク時には同時に約50会話が進行する。全社のコスト削減タスクフォースがAPI利用明細を精査し、「すべてのリクエストをMessage Batches APIに移行すれば費用が半分になる」という施策案を役員会に提出する準備を進めている。あなたはこの施策案のレビューを依頼された。',
      question: 'この施策案の最も重要な問題点はどれか。',
      options: [
        'バッチ処理では通常APIと比べて出力品質が低下する',
        'バッチは非同期処理で完了まで最大24時間かかりうるため、対話型チャットの応答要件を満たせない',
        '同時50会話分の履歴を含めるとバッチの256MB上限を超える',
        'custom_idによる突合管理が必要になり、運用負荷が増加する'
      ],
      explanations: [
        'バッチ処理でもモデルと処理内容は同一で、品質差はない。',
        '正解。決め手は「平均4秒で応答する対話型」という用途。Batch APIはレイテンシを犠牲にコストを下げる仕組みで、即時応答が必要なワークロードには適用できない。',
        'サイズ上限は大量一括投入時の話であり、この施策の本質的な問題ではない。',
        'custom_id管理は実在する考慮点だが軽微な実装事項で、施策全体を否定する決定的な問題ではない。'
      ]
    },
    en: {
      scenario: 'An online travel agency runs a customer-facing chatbot that answers questions about booking changes and hotel amenities. Responses average four seconds, and about 50 conversations run concurrently at peak. A company-wide cost taskforce reviewed the API bill and is preparing a board proposal stating that migrating every request to the Message Batches API will cut spend in half. You are asked to review the proposal.',
      question: 'What is the most critical flaw in this proposal?',
      options: [
        'Batch processing degrades output quality compared with the regular API',
        'Batches are asynchronous and may take up to 24 hours to complete, so they cannot meet an interactive chat’s response requirements',
        'Including the history of 50 concurrent conversations would exceed the 256 MB batch cap',
        'Managing custom_id reconciliation would add operational burden'
      ],
      explanations: [
        'Batch requests run on the same models with the same processing; there is no quality penalty.',
        'Correct. The deciding detail is the four-second interactive use case. The Batch API trades latency for cost and cannot serve workloads that need immediate responses.',
        'The size cap concerns bulk submissions and is not the essential problem with this plan.',
        'custom_id management is a real but minor implementation concern, not a reason the whole plan fails.'
      ]
    }
  },
  {
    id: 'ctx2-011', domain: 'context', answer: 0,
    ja: {
      scenario: '人材サービス企業のキャリア相談ボットは、1セッション平均40分、長い場合は2時間を超える対話が続く。リリースから2ヶ月後、長時間セッションの終盤にAPIエラーで会話が打ち切られる障害が週20件ほど発生するようになった。ログを確認すると、リクエストの入力トークン数がターンを重ねるごとに単調増加しており、ある閾値を超えたリクエストだけが失敗している。実装は毎ターン、システムプロンプトと全会話履歴をそのまま送信している。応答速度への不満は出ていない。',
      question: '最も適切な対策はどれか。',
      options: [
        '古いターンを要約に置き換え、直近の数ターンのみ原文で送るスライディングウィンドウ方式に変更する',
        'max_tokensを引き上げて処理できるトークン数を増やす',
        'prompt cachingを導入して履歴部分をキャッシュする',
        'より大きなコンテキストウィンドウを持つモデルに切り替える'
      ],
      explanations: [
        '正解。決め手は「入力トークンが単調増加し、閾値超過で失敗」という症状。APIはステートレスで履歴を毎回全送信するため、古いターンを要約して入力サイズに上限を設けるのが根本対策。',
        'max_tokensは出力側の上限であり、入力トークンの超過エラーには効かない。',
        'キャッシュはコストとレイテンシの削減策で、コンテキストウィンドウの消費量自体は減らない。',
        '上限は先送りできるが、履歴が無制限に成長する設計のままではいずれ同じ障害が再発する。'
      ]
    },
    en: {
      scenario: 'A staffing company’s career-counseling bot holds sessions averaging 40 minutes, sometimes exceeding two hours. Two months after launch, about 20 incidents a week began occurring in which the conversation is cut off by an API error near the end of long sessions. Logs show input token counts rising monotonically turn after turn, and only requests above a certain threshold fail. The implementation sends the system prompt plus the entire conversation history on every turn. Users have no complaints about response speed.',
      question: 'Which fix is most appropriate?',
      options: [
        'Adopt a sliding-window design that replaces older turns with a summary and sends only the recent turns verbatim',
        'Raise max_tokens to allow more tokens to be processed',
        'Introduce prompt caching to cache the history portion',
        'Switch to a model with a larger context window'
      ],
      explanations: [
        'Correct. The deciding clue is input tokens growing monotonically until a threshold failure. The API is stateless and the full history is resent every turn, so summarizing older turns and bounding input size is the structural fix.',
        'max_tokens caps the output; it does nothing about input exceeding the context window.',
        'Caching reduces cost and latency but does not reduce how much of the context window is consumed.',
        'A bigger window only postpones the failure; unbounded history growth will eventually hit any fixed limit.'
      ]
    }
  },
  {
    id: 'ctx2-012', domain: 'context', answer: 3,
    ja: {
      scenario: '消費財メーカーの品質保証チームは、新商品の発売後30日間に集まったレビュー約8,000件（合計約15万トークン）をClaudeで分析している。全件を1つのプロンプトに含めて「品質問題の兆候を報告せよ」と指示したところ、頻出の不満（サイズ感・価格）は正しく拾えたが、後の人手検証で、特定の製造ロットと特定地域の組み合わせで発生していた破損報告12件がレポートに一切含まれていないことが判明した。データはコンテキストウィンドウに問題なく収まっている。',
      question: '最も適切な改善はどれか。',
      options: [
        'Extended Thinkingを有効化し、より深く推論させる',
        '各指摘に確信度スコアを付けさせ、低確信度の指摘を除外する',
        '別のClaudeインスタンスにレポートをレビューさせる工程を追加する',
        'レビューをチャンクに分割して並列で所見を抽出し、所見とsource_idsのスキーマで集約するMap-Reduce構成に変更する'
      ],
      explanations: [
        'Extended Thinkingは推論の深さを増やすが、大量の入力の中で少数のシグナルが埋もれる問題は解決しない。',
        '確信度スコアは「見つけた候補」の選別に使うものであり、そもそも発見されなかった問題には無力。',
        'レビュー工程は元の分析と同じ入力の埋もれ方をする可能性が高く、見落としを直接は解決しない。',
        '正解。決め手は「ウィンドウに収まっているのに少数シグナルを見逃す」こと。チャンク単位の局所分析で確実に拾い上げ、Reduce時にsource_ids配列を結合すれば根拠のトレーサビリティも維持できる。'
      ]
    },
    en: {
      scenario: 'The quality-assurance team of a consumer-goods maker analyzes roughly 8,000 reviews (about 150K tokens in total) collected in the 30 days after a product launch. They put all reviews into a single prompt asking Claude to report signs of quality problems. Frequent complaints such as sizing and price were captured correctly, but later manual verification found that 12 breakage reports tied to one manufacturing lot in one region never appeared in the output. The data fits comfortably within the context window.',
      question: 'Which improvement is most appropriate?',
      options: [
        'Enable Extended Thinking for deeper reasoning',
        'Have the model attach confidence scores and filter out low-confidence findings',
        'Add a step in which a separate Claude instance reviews the report',
        'Split the reviews into chunks analyzed in parallel and aggregate findings using a finding-plus-source_ids schema in a Map-Reduce design'
      ],
      explanations: [
        'Extended Thinking deepens reasoning but does not fix weak signals getting buried in a huge input.',
        'Confidence scores only rank findings that were made; they cannot recover findings that were never made.',
        'A reviewer reading the same giant input tends to miss the same buried signals, so it does not directly fix the omission.',
        'Correct. The deciding clue is missing a minority signal even though everything fits in the window. Chunk-level analysis surfaces local findings, and merging source_ids arrays during Reduce preserves traceability.'
      ]
    }
  },
  {
    id: 'ctx2-013', domain: 'context', answer: 2,
    ja: {
      scenario: 'セキュリティ運用センター（SOC）は、インシデント調査のためファイアウォール・VPN・AD認証・プロキシ・EDRの5種類のログ（合計約18万トークン）を1つのプロンプトに連結し、Claudeに侵害の痕跡分析をさせている。深夜の大量ログイン失敗のような単一ログ内で完結する異常は安定して検出できるが、模擬侵入テストでは、同一の攻撃元IPがVPNログとプロキシログをまたいで段階的に活動するパターンを3回中3回見逃した。ログはウィンドウ内に収まっており、追加費用の予算は限られている。',
      question: '最も適切なアーキテクチャ変更はどれか。',
      options: [
        'max_tokensを増やし、より長く詳細な分析結果を出力させる',
        '重要度の低いログ行を事前にフィルタして入力量を減らす',
        '第1パスで各ログからIP・アカウント・タイムスタンプ等のエンティティを構造化抽出し、第2パスで抽出結果のみを統合して横断相関を分析するマルチパス構成にする',
        '同じログを独立したもう1つのインスタンスにも分析させ、両者の結果を突き合わせる'
      ],
      explanations: [
        '出力を長くしても、入力の中でログ種をまたぐ相関が埋もれる問題は解決しない。',
        '相関を見つける前にどの行が重要かは分からず、フィルタで攻撃の痕跡そのものを落とすリスクがある。',
        '正解。決め手は「単一ログ内は検出できるのに横断相関だけ失敗する」こと。局所分析でエンティティを抽出し、圧縮された構造化データだけを相関分析パスに渡せば、横断パターンが埋もれなくなる。',
        '同じ入力を同じ形で渡す限り同じ埋もれ方をしやすく、コストが倍増する割に見逃しの根本は解決しない。'
      ]
    },
    en: {
      scenario: 'A security operations center concatenates five log types — firewall, VPN, AD authentication, proxy, and EDR (about 180K tokens in total) — into one prompt and has Claude hunt for signs of compromise. Anomalies confined to a single log, such as mass overnight login failures, are detected reliably. But in red-team exercises the system missed, three times out of three, a pattern in which the same source IP moved step by step across the VPN and proxy logs. The logs fit within the window and the budget for extra spend is limited.',
      question: 'Which architecture change is most appropriate?',
      options: [
        'Increase max_tokens so the analysis output can be longer and more detailed',
        'Pre-filter low-importance log lines to shrink the input',
        'Adopt a multi-pass design: pass one extracts structured entities (IPs, accounts, timestamps) from each log, and pass two correlates only those extracted results across logs',
        'Have an independent second instance analyze the same logs and reconcile the two outputs'
      ],
      explanations: [
        'Longer output does not stop cross-log correlations from being buried in the input.',
        'Which lines matter cannot be known before the correlation is found; filtering risks discarding the very traces of the attack.',
        'Correct. The deciding clue is that single-log anomalies work while only cross-log correlation fails. Local extraction compresses each log into structured entities, and the correlation pass sees only that compact data, so cross-log patterns no longer drown.',
        'Two instances fed the same oversized input tend to fail the same way, doubling cost without fixing the root cause.'
      ]
    }
  },
  {
    id: 'ctx2-014', domain: 'context', answer: 1,
    ja: {
      scenario: 'フィットネスアプリのAIコーチ機能のβテストで、「セッションの最初に伝えた減量目標を、数ターン後にはもう覚えていない」というフィードバックが多数寄せられた。実装を確認すると、各ターンでmessages配列には最新のユーザー発話1件のみを載せ、アプリ側で発行した会話IDを毎回metadataフィールドに含めていた。開発者は「同じ会話IDを送っているのだから、モデル側で文脈は維持されるはず」と説明している。トークン使用量は各ターンとも小さく安定している。',
      question: '根本原因として最も適切なものはどれか。',
      options: [
        'metadataに設定した会話IDの形式が不正で、サーバー側のセッション復元に失敗している',
        'APIはステートレスで過去のやり取りを一切保持しないため、必要な会話履歴を毎リクエストのmessages配列に含めて送る必要がある',
        'システムプロンプトに「ユーザーの目標を記憶せよ」という指示が不足している',
        '会話がコンテキストウィンドウを超過し、古い履歴が自動的に切り捨てられている'
      ],
      explanations: [
        'metadataは分析・追跡用の付帯情報であり、そもそもAPIにはIDで文脈を復元するサーバー側セッションという機構が存在しない。',
        '正解。決め手は「最新の発話1件のみ送信」という実装。APIはステートレスで、文脈はクライアントが毎回messages配列で渡した分しか存在しない。',
        'プロンプトでいくら指示しても、そもそも入力に含まれていない過去の情報をモデルが参照することはできない。',
        'トークン使用量は小さく安定していると明記されており、ウィンドウ超過は起きていない。また履歴が自動で切り捨てられるという挙動もない。'
      ]
    },
    en: {
      scenario: 'In the beta test of a fitness app’s AI coach, many users reported that the coach forgets the weight-loss goal they stated at the start of the session within a few turns. A code inspection found that each turn sends only the latest user utterance in the messages array, while an app-issued conversation ID is included in the metadata field of every request. The developer explains that since the same conversation ID is sent every time, the model should maintain the context on its side. Token usage per turn is small and stable.',
      question: 'What is the most accurate root cause?',
      options: [
        'The conversation ID in metadata is malformed, so server-side session restoration is failing',
        'The API is stateless and retains nothing between calls, so the necessary conversation history must be included in the messages array of every request',
        'The system prompt lacks an instruction telling the model to remember the user’s goals',
        'The conversation exceeded the context window and older history was silently truncated'
      ],
      explanations: [
        'metadata is ancillary data for tracking and analytics; the API has no session mechanism that restores context by ID at all.',
        'Correct. The deciding detail is that only the latest utterance is sent. The API is stateless; context exists only insofar as the client resends it in the messages array on every call.',
        'No instruction can make the model recall information that was never included in the input.',
        'Token usage is stated to be small and stable, so no window overflow occurred — and the API does not silently truncate history anyway.'
      ]
    }
  },
  {
    id: 'ctx2-015', domain: 'context', answer: 0,
    ja: {
      scenario: '医療請求コーディング支援システムは、Claudeが提案する請求コードに確信度スコアを付与し、0.90未満は人間のコーダーが全件レビュー、0.90以上は自動確定という体制で運用されている。自動確定は月間約40万件にのぼり、提携する約300の医療機関は病床数も診療科構成も大きく異なる。リリースから半年が経ち、品質保証チームは自動確定側の見逃しエラーを継続的に監視する仕組みの設計を任された。レビューに割ける人員は限られている。',
      question: '最も適切な監視設計はどれか。',
      options: [
        '医療機関の規模・診療科・請求の複雑さなどの属性で層化した上で、自動確定分から無作為抽出して人間レビューする',
        '確信度0.90〜0.92の境界帯の請求だけを重点的にレビューする',
        '自動確定分と人間レビュー分を合わせた全請求から5%を無作為抽出してレビューする',
        '最大規模の医療機関1施設の請求を全件レビューし、そこでの精度を全体の代表値とする'
      ],
      explanations: [
        '正解。決め手は監視対象が「自動確定される高確信度側」であること。属性で層化した無作為抽出なら、多様な医療機関・診療科で起きる高確信度の誤りを偏りなく検出できる。',
        '境界帯だけを見ると、確信度0.99で自信を持って間違える深刻なエラーを構造的に見逃す。',
        '低確信度側はすでに全件レビュー済みであり、そこを含めて抽出するのは限られた人員の重複投資になる。',
        '1施設に固定するとその施設の傾向に偏り、他の299機関で起きるエラーやドリフトを検知できない。'
      ]
    },
    en: {
      scenario: 'A medical-billing coding assistant attaches a confidence score to every suggested billing code. Codes under 0.90 go to human coders for full review; codes at 0.90 or above are auto-finalized. Auto-finalized volume runs about 400,000 claims per month across roughly 300 partner facilities that vary widely in bed count and specialty mix. Six months after launch, the QA team has been asked to design ongoing monitoring for missed errors on the auto-finalized side. Reviewer headcount is limited.',
      question: 'Which monitoring design is most appropriate?',
      options: [
        'Stratify by facility size, specialty, and claim complexity, then randomly sample auto-finalized claims for human review',
        'Focus review on the boundary band of confidence 0.90 to 0.92',
        'Randomly sample 5% of all claims, combining auto-finalized and human-reviewed volume',
        'Fully review one of the largest facilities and treat its accuracy as representative of the whole'
      ],
      explanations: [
        'Correct. The deciding detail is that the monitoring target is the high-confidence, auto-finalized side. Stratified random sampling detects confidently wrong outputs across diverse facilities and specialties without bias.',
        'Watching only the boundary band structurally misses severe errors made at 0.99 confidence.',
        'The low-confidence side is already fully reviewed; sampling it again wastes scarce reviewer capacity.',
        'A single facility skews to its own patterns and cannot detect errors or drift in the other 299.'
      ]
    }
  },
  {
    id: 'ctx2-016', domain: 'context', answer: 3,
    ja: {
      scenario: '損害保険会社のコールセンターでは、通話ログを14種類の用件カテゴリに自動分類するシステムを運用している。リリース時の検収では精度94%を記録した。8ヶ月後、現場から「分類のずれが増えた」という声が上がり、測定し直すと精度は86%まで低下していた。この間、モデルのバージョンもプロンプトも一切変更していない。なお会社は今年度から自転車保険と海外旅行保険の販売を開始しており、これらに関する問い合わせが現在は全体の約2割を占めている。分類プロンプトのfew-shot例はリリース時の通話サンプルから作られたものだ。',
      question: '精度低下の根本原因として最も適切なものはどれか。',
      options: [
        'レート制限への断続的な到達により、失敗した分類がデフォルトカテゴリに落ちている',
        'モデルの自動アップデートにより応答の挙動が変化した',
        'プロンプトキャッシュに古いカテゴリ定義が残り、更新が反映されていない',
        '新商品の問い合わせ増加により入力データの分布が変化し、リリース時に作られたカテゴリ定義とfew-shot例が実データを代表しなくなるドリフトが起きている'
      ],
      explanations: [
        'レート制限エラーは処理の失敗として顕在化するものであり、分類精度の緩やかな劣化という症状には合わない。',
        'モデルもプロンプトも変更していないと明記されている。外部要因を疑う前に入力側の変化を確認すべき。',
        'プロンプトキャッシュは同一プレフィックスに対する課金・速度の最適化であり、古い内容が「残って」応答を変えるという挙動はない。',
        '正解。決め手はさりげなく書かれた「新商品の販売開始と問い合わせ構成の変化」。システムが変わらなくても入力分布が変われば精度は落ちる。定期評価でドリフトを検知し、定義とfew-shot例を実データに合わせて更新する必要がある。'
      ]
    },
    en: {
      scenario: 'A property-and-casualty insurer’s call center auto-classifies call logs into 14 intent categories. Acceptance testing at release measured 94% accuracy. Eight months later, agents reported growing misclassification, and re-measurement showed accuracy had fallen to 86%. Neither the model version nor the prompt has been changed in that period. Meanwhile, the company began selling bicycle insurance and overseas travel insurance this fiscal year, and inquiries about them now make up about 20% of volume. The few-shot examples in the classification prompt were built from call samples at release time.',
      question: 'What is the most accurate root cause of the accuracy decline?',
      options: [
        'Intermittent rate-limit errors cause failed classifications to fall into a default category',
        'An automatic model update changed response behavior',
        'An old category definition is stuck in the prompt cache, so updates are not taking effect',
        'The input distribution shifted as new-product inquiries grew, so the category definitions and few-shot examples built at release no longer represent live data — drift'
      ],
      explanations: [
        'Rate-limit errors surface as processing failures, not as a gradual accuracy slide; the symptom does not match.',
        'The scenario states the model and prompt are unchanged; input-side change should be examined before blaming external factors.',
        'Prompt caching is a billing and latency optimization for identical prefixes; stale content does not linger and alter responses.',
        'Correct. The deciding detail is the quietly mentioned new product lines now at 20% of volume. Even with the system frozen, a shifted input distribution erodes accuracy; periodic evaluation is needed to catch drift and refresh the definitions and examples.'
      ]
    }
  },
  {
    id: 'ctx2-017', domain: 'context', answer: 2,
    ja: {
      scenario: 'ニュースアプリの運営会社は、毎時0分にプッシュ通知の文面を全アクティブユーザー分パーソナライズ生成している。約12,000件のリクエストを毎時0分に一斉に並列実行しており、リリース直後から429エラーが多発している。現在の実装は失敗リクエストを1秒後に固定間隔で最大3回リトライするが、リトライも同時刻に集中するため再び429で失敗する。月間のAPI使用量を平均するとレート上限の3割程度しか使っていない。通知は毎時15分までに配信完了すればよい。',
      question: '最も適切な改善はどれか。',
      options: [
        'レート上限の引き上げを申請する',
        'リトライ回数を3回から10回に増やす',
        '指数バックオフにジッターを加えたリトライへ変更し、初回リクエストの投入も時間帯内に分散させる',
        '生成をMessage Batches APIへ移行する'
      ],
      explanations: [
        '平均使用量は上限の3割で、問題は総量ではなく毎時0分への瞬間集中。上限を上げても集中が続けば再発する。',
        '固定間隔のまま回数だけ増やしても、リトライの波が同時刻に集中する構造は変わらない。',
        '正解。決め手は「一斉投入と同時刻リトライの集中」。ジッター付き指数バックオフで衝突を散らし、毎時15分までという余裕を使って初回投入自体も分散させれば429は解消できる。',
        'バッチは完了まで最大24時間かかりうるため、15分以内の配信という時限要件に適さない。'
      ]
    },
    en: {
      scenario: 'A news app personalizes push-notification copy for every active user at the top of each hour, firing about 12,000 requests simultaneously at minute zero. Since launch, 429 errors have been rampant. The current implementation retries failures at a fixed one-second interval up to three times, so the retries also land at the same moment and fail again with 429. Averaged over a month, API usage sits at only about 30% of the rate limit. Notifications only need to finish sending by 15 minutes past the hour.',
      question: 'Which improvement is most appropriate?',
      options: [
        'Request a rate-limit increase',
        'Raise the retry count from three to ten',
        'Switch to exponential backoff with jitter and also spread the initial requests across the available window',
        'Move the generation to the Message Batches API'
      ],
      explanations: [
        'Average usage is 30% of the limit; the problem is the instantaneous spike at minute zero, which a higher cap would not eliminate.',
        'More retries at a fixed interval keep colliding in synchronized waves.',
        'Correct. The deciding clue is the synchronized burst plus synchronized retries. Jittered exponential backoff breaks up collisions, and the 15-minute window allows spreading the initial submissions too.',
        'Batches may take up to 24 hours, which cannot meet a 15-minute delivery requirement.'
      ]
    }
  },
  {
    id: 'ctx2-018', domain: 'context', answer: 0,
    ja: {
      scenario: 'ネットスーパーの商品問い合わせボットは1日約6万会話を処理している。過去2四半期にAPI側の障害が計3回（それぞれ20〜40分）発生し、その間ユーザーの画面には生のHTTPエラーがそのまま表示され、カートの放棄率が通常の3倍に跳ね上がった。サービスのSLOは「ユーザーの問いかけには常に何らかの有用な応答を返す」と定義されている。プラットフォームチームは次の障害に備えた設計変更を検討している。',
      question: '最も適切な設計はどれか。',
      options: [
        'API障害を検知したら、FAQ検索ベースの簡易応答と有人チャットへの導線に自動で切り替え、機能を段階的に縮退させる',
        'リトライ回数と間隔を増やし、障害が回復するまで再試行を続ける',
        'すべてのリクエストを常時2系統に二重送信し、先に返った応答を採用する',
        '障害中のリクエストをキューに退避し、回復後にまとめて応答を返す'
      ],
      explanations: [
        '正解。決め手はSLO「常に何らかの有用な応答を返す」。完全な機能が無理でも品質を段階的に落として応答し続けるgraceful degradationがこの要件に合致する。',
        '数十分規模の障害では再試行し続けてもユーザーは待たされ続け、接続リソースも枯渇する。SLOは満たせない。',
        '同一ベンダーのAPIへの二重送信は同じ障害で共倒れになる上、平時のコストが倍増する過剰設計。',
        '買い物中の質問への回答が数十分後に届いても価値がない。対話型ワークロードにキュー退避は適さない。'
      ]
    },
    en: {
      scenario: 'An online grocery’s product-question bot handles about 60,000 conversations a day. Over the past two quarters there were three API-side outages of 20 to 40 minutes each, during which users saw raw HTTP errors and cart abandonment tripled. The service SLO is defined as: always return some useful response to a user’s question. The platform team is designing for the next outage.',
      question: 'Which design is most appropriate?',
      options: [
        'On detecting an API outage, automatically switch to FAQ-search-based lightweight answers plus a path to human chat, degrading features step by step',
        'Increase retry counts and intervals, and keep retrying until the outage ends',
        'Send every request to two pipelines at all times and use whichever response returns first',
        'Queue requests during the outage and answer them in bulk after recovery'
      ],
      explanations: [
        'Correct. The deciding constraint is the SLO of always returning something useful. Graceful degradation keeps answering with reduced capability instead of failing outright.',
        'Through a 30-minute outage, endless retries leave users hanging and exhaust connection resources; the SLO is still broken.',
        'Duplicate sends to the same vendor fail together in the same outage while doubling normal-time cost — over-engineering.',
        'An answer to a mid-shopping question is worthless 30 minutes later; queuing does not fit interactive workloads.'
      ]
    }
  },
  {
    id: 'ctx2-019', domain: 'context', answer: 1,
    ja: {
      scenario: '不動産ポータルの物件説明文生成パイプラインは、毎晩約9,000件を処理する。共通のAPIラッパーは「あらゆるエラーに対して最大5回リトライする」仕様で実装されている。ある晩、上流の入稿データの不備で約800件のリクエストボディが不正なJSONとなり、APIはinvalid_request_error（400）を返した。パイプラインはこの800件それぞれに5回ずつリトライを繰り返し、総処理時間が大幅に伸びて翌朝の掲載更新に間に合わず、監視アラートが一晩中鳴り続けた。',
      question: '最も適切な改善はどれか。',
      options: [
        'リトライ間隔を短縮して総処理時間を圧縮する',
        'エラー種別で処理を分岐し、429や5xx等の一時的エラーのみバックオフ付きでリトライし、400等の恒久的エラーは即座に失敗として記録・スキップする',
        'リトライ上限を5回から2回に減らす',
        'リクエストのタイムアウト値を延長する'
      ],
      explanations: [
        '400は入力自体が不正であり、何度・どんな速さで送り直しても失敗する。無駄な試行の総量は変わらない。',
        '正解。決め手は「リトライで結果が変わるエラーか」の区別。一時的エラー（429・5xx）は再試行に意味があるが、恒久的エラー（4xx）は即時失敗として隔離するのが正しいエラーハンドリング設計。',
        '無駄は減るが恒久的エラーへのリトライ自体は残り、同時に一時的エラーからの回復力まで下げてしまう。',
        'タイムアウトは今回の障害と無関係で、原因であるエラー分類の欠如に触れていない。'
      ]
    },
    en: {
      scenario: 'A real-estate portal’s listing-description pipeline processes about 9,000 items nightly. The shared API wrapper is implemented to retry every error up to five times. One night, a defect in upstream data made about 800 request bodies malformed JSON, and the API returned invalid_request_error (400). The pipeline dutifully retried each of those 800 requests five times, total runtime ballooned, the morning listing update was missed, and monitoring alerts fired all night.',
      question: 'Which improvement is most appropriate?',
      options: [
        'Shorten the retry interval to compress total processing time',
        'Branch on error type: retry only transient errors such as 429 and 5xx with backoff, and immediately record and skip permanent 4xx errors',
        'Reduce the retry cap from five to two',
        'Extend the request timeout'
      ],
      explanations: [
        'A 400 means the input itself is invalid; it fails no matter how fast or how often it is resent.',
        'Correct. The deciding question is whether a retry can change the outcome. Transient errors (429/5xx) deserve backoff retries; permanent errors (4xx) should fail fast and be quarantined.',
        'Less waste, but the pipeline still retries unrecoverable errors while also weakening recovery from genuinely transient ones.',
        'Timeouts were not the failure mode; this does not touch the missing error classification.'
      ]
    }
  },
  {
    id: 'ctx2-020', domain: 'context', answer: 3,
    ja: {
      scenario: '企業法務向けリサーチアシスタントは、全リクエストの先頭に約8万トークンの社内判例要約集と回答指示を付与し、その後に弁護士の質問を続ける構成で、1日約3,000リクエストを処理している。判例要約集は法務部の承認を受けた固定文書で、月1回の改訂以外は変化せず、「質問との関連にかかわらず常に全体を参照させる」方針も確定している。入力コストの9割以上がこの固定部分で、初回トークンまでの待ち時間にも不満が出ている。',
      question: '最も適切な最適化はどれか。',
      options: [
        '判例要約集を3分の1に圧縮して入力トークンを削減する',
        '処理をMessage Batches APIへ移行する',
        '質問ごとに関連する判例のみを検索して差し込むRAG構成へ全面移行する',
        '固定部分をプロンプト先頭に置いたままprompt cachingを適用し、キャッシュされたプレフィックスを再利用する'
      ],
      explanations: [
        '承認済み文書の圧縮は正確性のリスクを伴い、承認プロセスのやり直しも必要になる。問題は文書の大きさではなく再利用のされ方にある。',
        '対話的に使うリサーチアシスタントに、バッチの非同期レイテンシは受け入れられない。',
        'RAGは実在する有効な手法だが、「常に全体を参照させる方針が確定」という要件に反する大規模な再設計であり、この状況では不要。',
        '正解。決め手は「巨大な固定プレフィックスが毎回同一」という構造。prompt cachingならアーキテクチャを変えずに、キャッシュ読み込みの大幅割引でコストとレイテンシを同時に削減できる。'
      ]
    },
    en: {
      scenario: 'A legal-research assistant for corporate counsel prepends about 80K tokens of an internally approved case-law digest plus answering instructions to every request, followed by the attorney’s question, at about 3,000 requests a day. The digest is a fixed document approved by the legal department, changing only in a monthly revision, and the policy that the model must always see the entire digest regardless of the question has been finalized. Over 90% of input cost is this fixed portion, and users also complain about time to first token.',
      question: 'Which optimization is most appropriate?',
      options: [
        'Compress the case-law digest to a third of its size to cut input tokens',
        'Move the workload to the Message Batches API',
        'Re-architect to RAG, retrieving only the cases relevant to each question',
        'Keep the fixed portion at the top of the prompt and apply prompt caching so the cached prefix is reused'
      ],
      explanations: [
        'Compressing an approved document risks accuracy and forces re-approval; the issue is how the document is reused, not its size.',
        'An interactive research assistant cannot absorb asynchronous batch latency.',
        'RAG is a legitimate technique, but it contradicts the finalized always-see-everything policy and is a heavy rebuild the situation does not require.',
        'Correct. The deciding structure is a huge fixed prefix identical on every call. Prompt caching cuts both cost (deeply discounted cache reads) and latency without changing the architecture.'
      ]
    }
  },
  {
    id: 'ctx2-021', domain: 'context', answer: 2,
    ja: {
      scenario: 'ECサイトのカスタマー対応アシスタントにprompt cachingを導入したが、想定していたコスト削減が全く実現していない。プロンプトの構成は、①現在時刻とセッションIDを含むヘッダー、②約5万トークンの商品カタログと対応ポリシー（固定）、③ユーザーの質問、の順である。リクエストは営業時間中、平均90秒間隔で途切れず発生している。利用ログを確認すると、キャッシュへの書き込みは毎リクエストで発生している一方、キャッシュ読み込みはほぼゼロだった。',
      question: '原因として最も適切なものはどれか。',
      options: [
        'キャッシュのTTL（5分）が短すぎて、次のリクエストの前に失効している',
        '商品カタログがキャッシュ可能な最小トークン数に達していない',
        '毎回変わる現在時刻とセッションIDがプロンプトの先頭に置かれているため、プレフィックスが一致せずキャッシュにヒットしない',
        'system側のコンテンツはキャッシュ対象外のため、カタログをuserメッセージに移動する必要がある'
      ],
      explanations: [
        'リクエストは90秒間隔でTTL（5分）内に収まっており、キャッシュは使用のたびにリフレッシュされるため失効は起きない。',
        '5万トークンのカタログは最小キャッシュ単位を大きく上回っている。',
        '正解。決め手は「毎回変わる値が先頭にある」構成。キャッシュはプレフィックスの完全一致で効くため、動的な値が先頭にあると毎回別プレフィックスとして書き込みだけが発生する。固定部分を先頭に、動的部分を後ろに移すのが正しい。',
        'systemプロンプトもキャッシュ対象にできる。これは配置の問題であり、ロールの問題ではない。'
      ]
    },
    en: {
      scenario: 'An e-commerce customer-support assistant adopted prompt caching, but the expected savings never materialized. The prompt is assembled as: (1) a header containing the current timestamp and session ID, (2) about 50K tokens of product catalog and support policy (fixed), then (3) the user’s question. Requests arrive continuously during business hours at an average interval of 90 seconds. Usage logs show cache writes on every request while cache reads are nearly zero.',
      question: 'What is the most accurate cause?',
      options: [
        'The 5-minute cache TTL is too short and entries expire before the next request',
        'The product catalog is below the minimum cacheable token count',
        'The ever-changing timestamp and session ID sit at the top of the prompt, so the prefix never matches and the cache never hits',
        'System-side content is not cacheable, so the catalog must be moved into the user message'
      ],
      explanations: [
        'Requests arrive every 90 seconds, well inside the 5-minute TTL, and the TTL refreshes on each use, so expiry is not the issue.',
        'A 50K-token catalog far exceeds the minimum cacheable size.',
        'Correct. The deciding detail is dynamic values placed first. Caching matches on an exact prefix, so a changing head makes every request a brand-new prefix — writes every time, reads never. Put static content first and dynamic content after it.',
        'System content is cacheable; this is a placement problem, not a role problem.'
      ]
    }
  },
  {
    id: 'ctx2-022', domain: 'context', answer: 0,
    ja: {
      scenario: '全国300店舗を展開する小売チェーンの経営企画室は、月次経営レポートの「示唆コメント」欄の作成をClaudeで自動化したい。元データはPOSの取引明細で月間約4億行あり、すでに全件がBigQueryに集約され、店舗別・カテゴリ別の集計クエリも整備されている。担当者が「明細をチャンク分割してBatch APIで全件読ませる」構成を試算したところ、割引を適用してもトークンコストが月数千万円規模になることが分かった。レポートの納期は毎月5営業日目である。',
      question: '最も適切な構成はどれか。',
      options: [
        'BigQueryで集計・異常検知した結果のサマリー（KPI・前月比・特異な変動）だけをClaudeに渡し、解釈と示唆コメントの生成に専念させる',
        'Batch APIの50%割引を前提に、明細全件をチャンク分割して読ませる現行案を採用する',
        '明細をベクトルDBに格納し、RAGで関連する行を検索してClaudeに渡す',
        'コンテキストウィンドウの大きいモデルを使い、明細を週次に分けて読ませる'
      ],
      explanations: [
        '正解。決め手は「集計クエリが整備済みのDWHが既にある」こと。大量スキャンと集計はBigQueryの得意領域で、Claudeには要約された事実の解釈と言語化という得意領域だけを任せる役割分担が正しい。',
        '割引後でも月数千万円という試算自体が、集計をLLMにやらせる構成の非現実性を示している。',
        'RAGは関連文書の検索には有効だが、「全店舗の合計・前月比」のような集計値は検索では得られない。',
        '週次に分割しても4億行をLLMに読ませるという根本構造は変わらず、コストも精度も改善しない。'
      ]
    },
    en: {
      scenario: 'The corporate-planning office of a 300-store retail chain wants Claude to automate the insights commentary section of the monthly business report. The source is POS transaction detail — about 400 million rows per month — already consolidated in BigQuery with store-level and category-level aggregation queries in place. The owner priced out a plan to chunk the raw rows and feed all of them through the Batch API; even with the discount, token cost came to tens of millions of yen per month. The report is due on the fifth business day each month.',
      question: 'Which architecture is most appropriate?',
      options: [
        'Aggregate and detect anomalies in BigQuery, and pass only the resulting summary (KPIs, month-over-month changes, notable deviations) to Claude for interpretation and commentary',
        'Adopt the current plan of feeding all raw rows through the Batch API using the 50% discount',
        'Load the rows into a vector database and use RAG to retrieve relevant rows for Claude',
        'Use a model with a larger context window and feed the rows week by week'
      ],
      explanations: [
        'Correct. The deciding detail is that an aggregation-ready DWH already exists. Scanning and aggregating is what BigQuery is for; Claude should receive summarized facts and do what it excels at — interpretation and language.',
        'A cost of tens of millions of yen even after the discount is itself the evidence that using an LLM as an aggregation engine is impractical.',
        'RAG retrieves relevant documents; it cannot produce aggregate values like chain-wide totals or month-over-month comparisons.',
        'Weekly slicing leaves the fundamental structure — reading 400 million rows with an LLM — unchanged in both cost and accuracy.'
      ]
    }
  },
  {
    id: 'ctx2-023', domain: 'context', answer: 1,
    ja: {
      scenario: 'HR SaaS企業のAI機能は2つのワークロードで構成される。1つは採用担当者と対話しながら候補者を絞り込むスクリーニングチャットで、日中に利用され即時応答が必要。もう1つは毎週金曜夜に実行する求人票と候補者レジュメのマッチングスコア再計算で、約70,000件を処理し月曜朝までに完了すればよい。トークン消費量は再計算側が全体の約8割を占める。経営層から全体で35%のコスト削減を指示された。現在はどちらも通常のMessages APIで動いている。',
      question: '最も適切な変更はどれか。',
      options: [
        '両方のワークロードをMessage Batches APIへ移行する',
        '週次のマッチング再計算のみBatch APIへ移行し、スクリーニングチャットは通常のMessages APIのまま維持する',
        '両方のワークロードを小型の低価格モデルへ切り替える',
        'スクリーニングチャットの会話履歴を要約圧縮して入力トークンを削減する'
      ],
      explanations: [
        'チャット側は即時応答が必要で、完了まで最大24時間かかりうるバッチには載せられない。',
        '正解。決め手はレイテンシ要件の違い。再計算は金曜夜から月曜朝まで余裕があり最大24時間でも間に合う。全体の8割を占めるこのワークロードを50%割引にすれば約40%の削減となり、目標を達成できる。',
        '一律の小型化はスクリーニング品質の低下リスクを伴う。要件を犠牲にせず目標を達成できる手段がある。',
        '実在する最適化だが、チャット側は消費全体の2割にすぎず、これだけでは35%削減に届かない。'
      ]
    },
    en: {
      scenario: 'An HR SaaS company’s AI features comprise two workloads. One is a screening chat in which recruiters interactively narrow down candidates during the day, requiring immediate responses. The other is a weekly recalculation of matching scores between job posts and candidate resumes, run every Friday night on about 70,000 items, with completion needed by Monday morning. The recalculation accounts for roughly 80% of total token consumption. Leadership has mandated a 35% overall cost reduction. Both workloads currently run on the regular Messages API.',
      question: 'Which change is most appropriate?',
      options: [
        'Migrate both workloads to the Message Batches API',
        'Migrate only the weekly matching recalculation to the Batch API and keep the screening chat on the regular Messages API',
        'Switch both workloads to a smaller, cheaper model',
        'Summarize and compress the screening chat’s conversation history to cut input tokens'
      ],
      explanations: [
        'The chat side needs immediate responses and cannot ride a pipeline that may take up to 24 hours.',
        'Correct. The deciding factor is the split in latency requirements. The Friday-night-to-Monday-morning window comfortably absorbs the 24-hour maximum, and discounting the workload that is 80% of consumption by 50% yields about a 40% total reduction — beating the target.',
        'A blanket downgrade risks screening quality; the target is reachable without sacrificing requirements.',
        'A real optimization, but chat is only about 20% of consumption, so this alone cannot reach 35%.'
      ]
    }
  }
);
