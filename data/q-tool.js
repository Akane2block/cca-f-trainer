// CCA-F practice questions — domain: tool — exam-style scenarios (rebuilt 2026-07)
window.QUESTIONS.push(
  {
    id: 'tl2-001', domain: 'tool', answer: 2,
    ja: {
      scenario: '製薬会社の学術部門で、MRからの質問に答える社内AIアシスタントを運用している。ツールは2つあり、search_clinical_papersは社内に取り込んだ臨床論文データベースを、search_regulatory_guidelinesは規制当局のガイドライン文書を検索する。両ツールのdescriptionはどちらも「医薬品に関する文書を検索する」とほぼ同じ文面で登録されている。検索インデックスは週1回更新され、応答速度の社内目標は3秒以内。最近、「この副作用の当局への報告義務は？」という質問で臨床論文側が検索され、見当違いの回答が返るケースが増えている。',
      question: 'この誤選択を減らす修正として最も適切なものはどれか。',
      options: [
        'アプリ側に質問文の事前分類器を実装し、質問の種類に応じて該当ツールだけをリクエストに含める',
        'tool_choiceをanyに設定し、質問が来たら必ずいずれかの検索ツールを呼ばせる',
        '両ツールのdescriptionに「報告義務・申請手続き・規制要件はこちら／有効性・安全性データの文献調査はこちら」のように、使い分けの対比条件を明記して書き分ける',
        '2つの検索バックエンドを統合し、source引数で検索先を切り替える単一のsearch_documentsツールにする'
      ],
      explanations: [
        '事前分類器の追加でも動くが、分類ロジックの二重管理が生まれる。決め手は「両ツールのdescriptionがほぼ同文」という点で、まず選択の判断材料を与えるのが正攻法。',
        '問題はツールを呼ぶかどうかではなく「どちらを選ぶか」。anyは呼び出しを強制するだけで、選択の精度は改善しない。',
        '正解。モデルはdescriptionを判断材料にツールを選ぶ。ほぼ同文のdescriptionが誤選択の根本原因であり、いつどちらを使うかの対比条件を書き分けるのが最も直接的な修正。',
        '統合しても「どちらの文書群を検索すべきか」の判断はsource引数の選択として残る。曖昧さが引数に移動するだけで解消されない。'
      ]
    },
    en: {
      scenario: 'A pharmaceutical company runs an internal AI assistant that answers questions from medical reps. It has two tools: search_clinical_papers queries an in-house database of clinical papers, and search_regulatory_guidelines queries regulatory agency guideline documents. Both tools were registered with nearly identical descriptions that just say “searches pharmaceutical documents.” The search index is refreshed weekly and the internal latency target is three seconds. Recently, questions like “What is our obligation to report this side effect to the regulator?” have been routed to the clinical-paper search, producing irrelevant answers.',
      question: 'Which fix is most appropriate for reducing these wrong tool selections?',
      options: [
        'Implement a query pre-classifier in the application and include only the matching tool in each request',
        'Set tool_choice to any so that one of the search tools is always called',
        'Rewrite both descriptions with contrastive conditions, e.g. “use this for reporting obligations, filings, and regulatory requirements / use the other for literature research on efficacy and safety data”',
        'Merge the two search backends into a single search_documents tool that switches targets via a source argument'
      ],
      explanations: [
        'A pre-classifier can work, but it duplicates routing logic in the app. The decisive detail is that both descriptions are nearly identical — giving the model selection criteria is the direct fix.',
        'The problem is not whether a tool gets called but which one. any only forces a call; it does nothing to improve selection quality.',
        'Correct. The model selects tools based on their descriptions. Nearly identical descriptions are the root cause, so writing contrastive “when to use which” conditions is the most direct fix.',
        'Merging just relocates the ambiguity into the source argument — the model still has to make the same distinction, now with less guidance.'
      ]
    }
  },
  {
    id: 'tl2-002', domain: 'tool', answer: 0,
    ja: {
      scenario: '旅行代理店のカスタマー向けAIに、reserve_flight_ticketとcheck_visa_requirementsの2つのツールを実装した。航空券予約ツールのdescriptionは利用条件・引数・制約まで丁寧に書かれている一方、ビザ確認ツールは開発の終盤に追加されたため「ビザ情報を返す」の一行だけになっている。リリース後、航空券予約は問題なく動くが、渡航先のビザ要否を聞かれた際にツールを呼ばず、モデル自身の知識から古い制度を答えてしまう事例が複数報告された。tool_choiceはautoで、ツールは2つともリクエストに含まれている。',
      question: 'ビザ質問でツールが呼ばれない原因として最も可能性が高いものはどれか。',
      options: [
        'check_visa_requirementsのdescriptionが一行しかなく、どんな場面で使うべきかの手がかりがないため、モデルがツール選択の判断材料を持てていない',
        'tools配列で後方に置かれたツールは優先度が下がる仕様のため',
        'tool_choiceがautoのままだから。anyに変更すれば解決する',
        'モデルの学習データが古いため。より新しいモデルに更新すれば解決する'
      ],
      explanations: [
        '正解。決め手は2つのツールのdescriptionの落差。モデルはdescriptionを根拠に「ツールを使うべき場面か」を判断するため、一行の説明では自身の知識で答える方に傾く。',
        'ツールの並び順による優先度の仕様は存在しない。もっともらしいが根拠のない説明。',
        'anyにすれば強制的に何かは呼ばれるが、挨拶などツール不要の入力にまで呼び出しが走る。descriptionが貧弱という根本原因も残る。',
        '学習データの新旧は「古い制度を答えた」ことの説明にはなるが、「ツールを呼ばなかった」ことの説明にならない。ツールを呼べば最新情報を返せていた。'
      ]
    },
    en: {
      scenario: 'A travel agency’s customer-facing AI has two tools: reserve_flight_ticket and check_visa_requirements. The flight booking tool has a carefully written description covering usage conditions, arguments, and constraints. The visa tool was added late in development, and its description is a single line: “returns visa information.” After launch, flight booking works fine, but when customers ask whether they need a visa for a destination, the model often skips the tool and answers from its own knowledge, citing outdated rules. tool_choice is auto and both tools are included in every request.',
      question: 'What is the most likely reason the tool is not being called for visa questions?',
      options: [
        'The one-line description of check_visa_requirements gives no cue about when it should be used, so the model lacks the material to justify selecting it',
        'Tools placed later in the tools array are given lower priority by the API',
        'tool_choice is still auto; switching to any would solve it',
        'The model’s training data is outdated; upgrading to a newer model would solve it'
      ],
      explanations: [
        'Correct. The decisive detail is the gap between the two descriptions. The model decides whether a situation calls for a tool based on its description, and a one-liner tips it toward answering from its own knowledge.',
        'There is no priority rule based on array position. Plausible-sounding but unfounded.',
        'any would force some tool call even for greetings and other tool-free inputs, and the impoverished description — the root cause — would remain.',
        'Stale training data explains why the answer was outdated, not why the tool was skipped. Calling the tool would have returned current information.'
      ]
    }
  },
  {
    id: 'tl2-003', domain: 'tool', answer: 1,
    ja: {
      scenario: '経費精算SaaSのチャット入力機能で、submit_expenseツールを提供している。input_schemaのdateプロパティはtype: stringとだけ定義されており、説明文もない。社員は「先週の金曜のタクシー代」のように話すため、モデルが渡す日付が「2026/6/26」「6月26日」「先週金曜」など形式バラバラで、バックエンドの登録処理が頻繁に失敗する。バックエンドはISO 8601形式（YYYY-MM-DD）のみを受け付ける仕様で、精算データは月次で会計システムに連携される。',
      question: '日付形式の不一致を防ぐ対応として最も適切なものはどれか。',
      options: [
        'システムプロンプトに「日付は必ずISO 8601形式で渡すこと」と指示を追加する',
        'input_schemaのdateプロパティにformatやpatternの制約と「YYYY-MM-DD形式で指定する」という説明を定義し、期待する形式をスキーマで表現する',
        'バックエンド側に多様な日付表現を解釈できるファジーパーサを実装する',
        '日付変換専用のconvert_dateツールを追加し、submit_expenseの前に必ず呼ばせる'
      ],
      explanations: [
        'システムプロンプトの指示は他の文脈に埋もれて効かないことがある。形式の制約はツール定義そのものに置く方が確実に参照される。',
        '正解。決め手は「スキーマにtype: string以外の情報がない」こと。引数の形式制約はinput_schemaに書くのが契約として最も確実で、ツール使用のたびに必ず参照される。',
        '対症療法。曖昧な表現の解釈をバックエンドに移すだけで、モデルの解釈とユーザーの意図がズレても検知できない。',
        '1回のツール往復で済む処理を2段にする過剰設計。スキーマに形式を書けば変換専用ツールは不要。'
      ]
    },
    en: {
      scenario: 'An expense-report SaaS offers a submit_expense tool through its chat interface. The date property in input_schema is defined only as type: string, with no description. Employees say things like “the taxi fare from last Friday,” so the model passes dates in inconsistent formats — “2026/6/26,” “June 26,” “last Friday” — and the backend registration frequently fails. The backend accepts only ISO 8601 (YYYY-MM-DD), and expense data is synced to the accounting system monthly.',
      question: 'Which is the most appropriate way to prevent the date format mismatches?',
      options: [
        'Add an instruction to the system prompt: “always pass dates in ISO 8601 format”',
        'Define format or pattern constraints on the date property in input_schema, with a description stating “specify as YYYY-MM-DD,” so the expected format is expressed in the schema',
        'Implement a fuzzy parser on the backend that can interpret varied date expressions',
        'Add a dedicated convert_date tool and require it to be called before submit_expense'
      ],
      explanations: [
        'System-prompt instructions can get lost among other context. Format constraints are consulted far more reliably when placed in the tool definition itself.',
        'Correct. The decisive detail is that the schema says nothing beyond type: string. Argument format constraints belong in input_schema — it acts as a contract consulted on every tool use.',
        'A symptomatic fix. It moves the interpretation of ambiguous phrases to the backend, and mismatches between the model’s reading and the user’s intent go undetected.',
        'Overengineering that turns one tool round-trip into two. With the format in the schema, a dedicated conversion tool is unnecessary.'
      ]
    }
  },
  {
    id: 'tl2-004', domain: 'tool', answer: 3,
    ja: {
      scenario: '社内プラットフォームチームが、既存の内部REST APIの仕様書からツール定義を自動生成する仕組みを構築した。生成されたツールの一つはnameがapi_v2_sync、descriptionが「POST /v2/syncを呼び出し、顧客テーブルとDynamoDBのGSIを同期する。リトライは3回」という内容になっている。実際には「営業担当が顧客情報を更新した後、検索画面に反映させる」ためのツールだ。展開後、モデルがこのツールを適切な場面で使わなかったり、無関係な同期依頼で呼んでしまったりする問題が続いている。自動生成の仕組み自体は10以上のAPIで再利用予定である。',
      question: 'このツールの使われ方を改善する対応として最も適切なものはどれか。',
      options: [
        'nameをapi_v2_syncからsync_customer_dataに変更する。名前が明確になればdescriptionはそのままでよい',
        'input_schemaに呼び出し例をいくつか追加する',
        'descriptionにテーブル名・インデックス構成・リトライ間隔など実装仕様をさらに詳しく記載する',
        'descriptionから実装内部の記述をやめ、「顧客情報の更新を検索画面に反映するときに使う」など、ツールが業務上何をするか・どんな場面で使うべきかを、読み手であるモデルの視点で書き直す'
      ],
      explanations: [
        '名前の改善は有効だが部分的。いつ使うべきか・何が起きるかはdescriptionが伝えるもので、実装用語のままでは判断材料にならない。',
        '呼び出し例は引数の形式理解には役立つが、「どんな場面で使うか」という選択の問題は解決しない。',
        '方向が逆。実装詳細を増やすほど、業務上の用途はかえって読み取りにくくなる。',
        '正解。決め手は「descriptionがAPI仕様書由来の実装者向け文面」であること。descriptionの読み手はモデルであり、業務上の機能と使用場面を利用者視点で書くことが正しい使われ方に直結する。'
      ]
    },
    en: {
      scenario: 'An internal platform team built a pipeline that auto-generates tool definitions from existing REST API specs. One generated tool has the name api_v2_sync and a description reading “calls POST /v2/sync to synchronize the customer table with the DynamoDB GSI; retries three times.” In practice, the tool exists so that “after a sales rep updates customer info, the change shows up on the search screen.” Since rollout, the model keeps failing to use the tool when appropriate and sometimes calls it for unrelated sync requests. The auto-generation pipeline is planned for reuse across more than ten APIs.',
      question: 'Which change is most appropriate for improving how this tool gets used?',
      options: [
        'Rename api_v2_sync to sync_customer_data; with a clearer name the description can stay as is',
        'Add a few example invocations to input_schema',
        'Make the description even more detailed with table names, index structure, and retry intervals',
        'Stop describing implementation internals and rewrite the description from the model’s point of view — what the tool does in business terms and when to use it, e.g. “use this to reflect customer info updates on the search screen”'
      ],
      explanations: [
        'A better name helps but is only partial. The description is what conveys when to use the tool and what it does; implementation jargon gives the model nothing to reason with.',
        'Example invocations help with argument formats but do not solve the selection problem of when the tool applies.',
        'The wrong direction. More implementation detail makes the business purpose even harder to extract.',
        'Correct. The decisive detail is that the description is developer-facing text lifted from an API spec. The description’s reader is the model, so it must state the business function and usage situations from the user’s perspective.'
      ]
    }
  },
  {
    id: 'tl2-005', domain: 'tool', answer: 1,
    ja: {
      scenario: '物流会社の出荷管理AIで、create_shipmentツールを使っている。input_schemaにはweight_kgプロパティが定義されているが、requiredの配列にはdestinationとitem_codeしか入っていない。バックエンドは重量なしのリクエストを500エラーで拒否する。チームはシステムプロンプトに「出荷登録では必ず重量を含めること」と指示を追加し、普段はほぼ正しく動いている。しかし繁忙期の長い会話や複数荷物の一括登録時に、まれに重量が抜けたままツールが呼ばれ、エラーが顧客対応の遅延につながっている。',
      question: 'weight_kgが確実に渡されるようにする対応として最も適切なものはどれか。',
      options: [
        'システムプロンプトの指示をより強い表現に書き直し、重量を含めた呼び出し例も追加する',
        'input_schemaのrequired配列にweight_kgを追加し、ツール定義でstrictを有効にしてスキーマ準拠を保証させる',
        'バックエンドで重量が欠落していた場合、直近の類似荷物の重量を自動補完する',
        'tool_choiceを{type: "tool", name: "create_shipment"}に設定し、ツール呼び出しを強制する'
      ],
      explanations: [
        'プロンプト指示はすでに試しており「まれに抜ける」という現状そのものがベストエフォートの限界を示している。長い会話では指示が薄まる。',
        '正解。決め手は「weight_kgがrequiredに入っていない」こと。必須引数の担保はinput_schemaのrequiredで宣言し、ツール定義側のstrictでスキーマ準拠を保証するのが構造的な解決。',
        '欠落を黙って推定値で埋めると、誤った重量での出荷という検知しづらい事故に変わる。エラーより悪い。',
        'tool_choiceのtool指定は「このツールを呼ぶこと」の強制であり、引数が揃うことは保証しない。論点が違う。'
      ]
    },
    en: {
      scenario: 'A logistics company’s shipping AI uses a create_shipment tool. The input_schema defines a weight_kg property, but the required array lists only destination and item_code. The backend rejects weightless requests with a 500 error. The team added a system-prompt instruction — “always include the weight when registering shipments” — and it usually works. During peak season, though, in long conversations or bulk registrations of multiple packages, the tool occasionally gets called without a weight, and the resulting errors delay customer service.',
      question: 'Which is the most appropriate way to guarantee that weight_kg is provided?',
      options: [
        'Rewrite the system-prompt instruction more forcefully and add example calls that include the weight',
        'Add weight_kg to the required array in input_schema and enable strict on the tool definition to guarantee schema conformance',
        'Have the backend auto-fill a missing weight using the most recent similar package',
        'Set tool_choice to {type: "tool", name: "create_shipment"} to force the tool call'
      ],
      explanations: [
        'Prompt instructions have already been tried — the “occasionally missing” symptom is exactly the limit of best-effort guidance, which dilutes in long conversations.',
        'Correct. The decisive detail is that weight_kg is missing from required. Mandatory arguments are guaranteed by declaring them in input_schema’s required array, with strict on the tool definition enforcing schema conformance.',
        'Silently filling the gap with an estimate turns an error into a harder-to-detect incident: shipping with the wrong weight.',
        'Forcing a tool via tool_choice guarantees that the tool is called, not that its arguments are complete. Different problem.'
      ]
    }
  },
  {
    id: 'tl2-006', domain: 'tool', answer: 0,
    ja: {
      scenario: 'フィンテック企業の開発者が、ツール呼び出しの引数がスキーマに従わないケース（数値の文字列化、未定義プロパティの混入）に悩んでいた。技術ブログで「strictを有効にすればスキーマ準拠が保証される」と読み、リクエストのtool_choice設定を{type: "auto", strict: true}のように書き換えてデプロイした。しかしその後もスキーマ違反の引数は減らない。ツールは4つ登録されており、input_schema自体はtype・properties・requiredが正しく定義されている。',
      question: 'strictが効いていない原因として最も適切なものはどれか。',
      options: [
        'strictはtools配列内の各ツール定義に設定するものであり、tool_choiceの設定項目ではない。ツール定義側に移す必要がある',
        'strictはtool_choiceがautoのときは無効になる仕様なので、anyに変更する必要がある',
        'input_schemaのadditionalPropertiesをfalseにしていないため、strictの指定が上書きされている',
        'temperatureが高いとスキーマ違反が起きやすいので、strictよりも先にtemperatureを0にすべき'
      ],
      explanations: [
        '正解。決め手は「strictをtool_choice側に書いた」こと。strictはツール定義（tools配列の各要素）に属する設定で、スキーマ準拠の保証はツール単位で宣言する。',
        'strictとtool_choiceのモード間にそのような依存仕様はない。もっともらしいが誤り。',
        'additionalPropertiesは未定義プロパティを制限するスキーマ記述であって、strictの指定場所の誤りを直すものではない。',
        'temperatureを下げても引数生成のばらつきが減るだけで、スキーマ準拠の保証にはならない。'
      ]
    },
    en: {
      scenario: 'A developer at a fintech company was struggling with tool-call arguments that violated the schema — numbers arriving as strings, undefined properties mixed in. After reading a tech blog saying “enable strict to guarantee schema conformance,” the developer rewrote the request’s tool_choice setting to something like {type: "auto", strict: true} and deployed. Schema-violating arguments did not decrease. Four tools are registered, and each input_schema correctly defines type, properties, and required.',
      question: 'What best explains why strict is not taking effect?',
      options: [
        'strict belongs on each tool definition inside the tools array, not on tool_choice; it needs to be moved to the tool definitions',
        'strict is ignored when tool_choice is auto, so it must be changed to any',
        'additionalProperties was not set to false in input_schema, which overrides the strict setting',
        'High temperature makes schema violations more likely, so temperature should be set to 0 before relying on strict'
      ],
      explanations: [
        'Correct. The decisive detail is that strict was written on the tool_choice side. strict is a property of each tool definition — schema conformance is declared per tool.',
        'No such dependency exists between strict and tool_choice modes. Plausible-sounding but wrong.',
        'additionalProperties restricts undefined keys within the schema; it has nothing to do with strict being placed in the wrong location.',
        'Lowering temperature reduces variance but provides no guarantee of schema conformance.'
      ]
    }
  },
  {
    id: 'tl2-007', domain: 'tool', answer: 3,
    ja: {
      scenario: '金融情報サービスのAIチャットで、get_stock_price（株価取得）とget_fx_rate（為替レート取得）の選択ミスが多発していた。担当エンジニアは対策として、「どちらのツールを使うべきか」を返すroute_queryツールを追加し、質問が来たらまずそれを呼ぶ運用に変えた。その結果、全リクエストがツール2往復になり応答時間はほぼ倍増。さらにroute_queryの答えと違うツールをモデルが呼ぶケースも残っており、選択ミス自体もなくなっていない。なお2つの取得ツールのdescriptionは、リリース以来「市場データを返す」という同一の短文のままである。',
      question: 'この設計を見直すうえで最も適切な対応はどれか。',
      options: [
        'route_queryの内部で軽量なLLMを呼び、ルーティング精度そのものを高める',
        'tool_choiceでroute_queryを毎回強制し、ルーターの判断を必ず経由させる',
        '2つのツールを廃止し、自由文字列のquery引数を受け取ってバックエンドで判定する単一のget_market_dataツールに統合する',
        'route_queryを撤去し、get_stock_priceとget_fx_rateそれぞれのdescriptionに対象データの範囲と使い分けの条件を明記する'
      ],
      explanations: [
        'ルーター自体を高度化する方向は、過剰設計をさらに深くする。根本原因はルーティング機構の精度ではない。',
        '強制しても2往復のレイテンシは固定化され、ルーターの答えを渡された後の選択ミスも構造的には残る。',
        '自由文字列をバックエンドで解釈する統合は、判定の曖昧さをアプリ側に移すだけで、間違った解釈をモデル側で検知する手段も失う。',
        '正解。決め手は「2つのツールのdescriptionが同一の短文のまま」であること。選択の判断材料をdescriptionで与えれば、ルーティング専用ツールという余分な階層は不要になる。'
      ]
    },
    en: {
      scenario: 'A financial data service’s AI chat kept mixing up get_stock_price and get_fx_rate. The engineer in charge responded by adding a route_query tool that returns which tool should be used, and changed the flow so route_query is called first for every question. As a result, every request now takes two tool round-trips and response time has nearly doubled. Cases where the model calls a different tool than the router recommended still occur, so the selection errors have not disappeared either. Meanwhile, both retrieval tools have kept the same one-line description since launch: “returns market data.”',
      question: 'Which is the most appropriate way to revise this design?',
      options: [
        'Call a lightweight LLM inside route_query to improve routing accuracy itself',
        'Force route_query on every request via tool_choice so the router’s judgment is always consulted',
        'Retire the two tools and merge them into a single get_market_data tool that takes a free-text query argument and decides on the backend',
        'Remove route_query and write each description for get_stock_price and get_fx_rate with the data each covers and the conditions for choosing between them'
      ],
      explanations: [
        'Making the router smarter deepens the overengineering. The root cause is not the routing mechanism’s accuracy.',
        'Forcing it locks in the two-round-trip latency, and the model can still pick a different tool after receiving the router’s answer.',
        'Interpreting free text on the backend just moves the ambiguity into the app, and you lose any way to catch a wrong interpretation on the model side.',
        'Correct. The decisive detail is that both descriptions have stayed an identical one-liner. Give the model selection criteria in the descriptions and the extra routing layer becomes unnecessary.'
      ]
    }
  },
  {
    id: 'tl2-008', domain: 'tool', answer: 2,
    ja: {
      scenario: '家電メーカーがLINE上のサポートボットを運用している。ツールはcheck_warranty（保証状態確認）、find_repair_shop（修理店検索）、track_repair_status（修理進捗照会）の3つ。立ち上げ時にPMが「回答の根拠を必ず社内データにしたい」と判断し、tool_choiceをanyに固定してリリースした。運用開始後、ユーザーの「ありがとう」「こんにちは」といったメッセージにも修理店検索が実行され、噛み合わない返答と外部API利用料の増加が問題になっている。ボットの月間利用者は約4万人で、問い合わせの3割程度は雑談や挨拶である。',
      question: 'この問題への修正として最も適切なものはどれか。',
      options: [
        '挨拶・雑談に応答するためのsmall_talk_replyツールを追加し、anyのまま運用する',
        'アプリ側で挨拶をキーワード検知し、該当メッセージはツールなしの別リクエストに振り分ける',
        'tool_choiceをautoに変更し、ツールを使うかテキストで答えるかの判断をモデルに任せる',
        'tool_choiceを{type: "tool", name: "check_warranty"}に変更し、誤ったツールが選ばれないようにする'
      ],
      explanations: [
        'テキスト返信のためだけのツールを足すのは過剰設計の典型。強制の副作用をツール追加で吸収しようとしている。',
        'キーワード検知は雑談の多様さに追従できず、分類ルールの保守が続く対症療法。',
        '正解。決め手は「問い合わせの3割が雑談・挨拶」という入力の混在。ツール不要の入力が混ざる要件では、モデルに使用可否を判断させるautoが適切で、anyの強制が症状の根本原因。',
        '特定ツールの強制はさらに悪い。保証確認以外のあらゆる入力で引数の欠落や作話を誘発する。'
      ]
    },
    en: {
      scenario: 'A home appliance maker runs a support bot on a messaging app. It has three tools: check_warranty, find_repair_shop, and track_repair_status. At launch, the PM decided that “every answer must be grounded in company data” and shipped with tool_choice pinned to any. Since then, even messages like “thank you” and “hello” trigger repair-shop searches, producing incoherent replies and inflating external API costs. The bot serves about 40,000 users a month, and roughly 30% of inbound messages are greetings or small talk.',
      question: 'Which fix is most appropriate?',
      options: [
        'Add a small_talk_reply tool for greetings and chit-chat, and keep running with any',
        'Detect greetings by keyword in the application layer and route those messages to a separate request without tools',
        'Change tool_choice to auto and let the model decide whether to use a tool or answer in text',
        'Change tool_choice to {type: "tool", name: "check_warranty"} so the wrong tool can never be selected'
      ],
      explanations: [
        'Adding a tool whose only job is to produce a text reply is classic overengineering — absorbing the side effects of forcing with yet another tool.',
        'Keyword detection cannot keep up with the variety of small talk and leaves you maintaining classification rules forever — a symptomatic fix.',
        'Correct. The decisive detail is that 30% of inputs are greetings and small talk. When tool-free inputs are mixed in, auto — letting the model judge whether a tool is needed — is the right mode; forcing via any is the root cause.',
        'Forcing one specific tool is even worse: every non-warranty input invites missing arguments and fabricated values.'
      ]
    }
  },
  {
    id: 'tl2-009', domain: 'tool', answer: 0,
    ja: {
      scenario: '保険会社の帳票処理パイプラインで、受信メール本文から保険金請求の項目を構造化データとして抜き出す非対話のバッチ処理を作っている。設計上、各メールに対して必ずextract_claim_fieldsを1回呼ばせたい。ツール定義は他工程と共通のモジュールで管理されており、リクエストのtools配列にはsearch_policyなど別工程用のツールも含まれる。この共通定義はプロンプトキャッシュの前提にもなっている。試験運用では、tool_choice: autoだと一部のメールでテキスト要約だけが返り、anyにするとまれにsearch_policyが呼ばれてしまった。',
      question: 'この工程の設定として最も適切なものはどれか。',
      options: [
        'tool_choiceを{type: "tool", name: "extract_claim_fields"}に設定する',
        'tool_choiceはanyのまま、システムプロンプトで「extract_claim_fields以外を呼ばない」と指示する',
        'この工程のリクエストだけtools配列からextract_claim_fields以外を取り除く',
        'max_tokensを増やしてテキスト応答を最後まで生成させ、後段で要約をパースして項目を抽出する'
      ],
      explanations: [
        '正解。決め手は「必ず特定の1ツールを呼ばせたい」という要件。tool_choiceのtool指定は特定ツールの呼び出しを強制する設定で、autoの呼び忘れもanyの誤選択も同時に解消する。',
        'anyが保証するのは「何かを呼ぶ」ことまで。どれを呼ぶかはプロンプト頼みのベストエフォートに戻ってしまう。',
        '技術的には動くが、共通のツール定義を分岐させることでプロンプトキャッシュが無効になり管理も複雑化する。tool指定ならツール定義を変えずに済む。',
        'テキストをパースする方式は構造化抽出の確実性を捨てる方向で、ツール呼び出しを使う意義がなくなる。'
      ]
    },
    en: {
      scenario: 'An insurance company is building a non-interactive batch pipeline that extracts claim fields as structured data from inbound email bodies. By design, extract_claim_fields must be called exactly once per email. Tool definitions are managed in a module shared with other pipeline stages, so the request’s tools array also contains tools like search_policy used elsewhere; this shared definition also underpins prompt caching. In trial runs, tool_choice: auto sometimes returned only a text summary, and any occasionally called search_policy instead.',
      question: 'Which setting is most appropriate for this stage?',
      options: [
        'Set tool_choice to {type: "tool", name: "extract_claim_fields"}',
        'Keep tool_choice as any and instruct in the system prompt: “never call anything except extract_claim_fields”',
        'For this stage only, strip every tool except extract_claim_fields from the tools array',
        'Increase max_tokens so the text response completes, then parse the summary downstream to extract the fields'
      ],
      explanations: [
        'Correct. The decisive requirement is “one specific tool must always be called.” The tool form of tool_choice forces that exact tool, eliminating both auto’s skipped calls and any’s wrong selections at once.',
        'any only guarantees that something gets called. Which tool gets called falls back to best-effort prompting.',
        'It would work, but forking the shared tool definitions invalidates the prompt cache and complicates maintenance. Forcing via tool_choice achieves the goal without touching the definitions.',
        'Parsing free text abandons the reliability of structured extraction — the whole reason to use tool calls.'
      ]
    }
  },
  {
    id: 'tl2-010', domain: 'tool', answer: 1,
    ja: {
      scenario: 'スタートアップの社内ハンドブックQAボットを新人エンジニアが担当している。ツールはsearch_handbook（社内規程検索）の1つだけ。実装時に新人は「anyは『ツールを使ってもよい』という許可の意味」と理解してtool_choice: anyを設定した。動作確認では規程に関する質問には正しく答えたが、同僚が試しに「今日は暑いね」と送ったところ、search_handbookが「今日 暑い」というクエリで実行され、無関係な服務規程の抜粋が返ってきた。システムプロンプトには特にツール使用の指示は書いていない。',
      question: 'この挙動の説明として正しいものはどれか。',
      options: [
        'autoとanyは実質同義で、この挙動の差はモデルのバージョンに起因する',
        'anyは「登録されたツールのうち必ずいずれかを呼ぶ」強制設定であり、ツールが不要な入力に対しても無理にクエリを組み立てて呼び出す',
        'search_handbookのdescriptionが雑談も検索対象に含むように読めることが原因で、descriptionを直せば解決する',
        'ツールが1つしか登録されていない場合は自動的に呼び出しが強制される仕様のため'
      ],
      explanations: [
        'autoとanyは明確に異なる。autoは使用可否をモデルが判断し、anyは必ず何かを呼ばせる。',
        '正解。決め手は「anyを許可の意味と誤解した」こと。anyは「選んでよい」ではなく「必ず呼べ」であり、雑談にも強制的にクエリを生成してツールが走る。',
        'descriptionを改善してもanyの強制は残る。雑談への呼び出しはdescriptionの読み違いではなく設定の意味論の問題。',
        'ツール数によって強制に切り替わる仕様は存在しない。強制されているのはany設定によるもの。'
      ]
    },
    en: {
      scenario: 'A junior engineer at a startup maintains an internal handbook QA bot. It has a single tool, search_handbook. During implementation, the engineer understood any as meaning “the model is allowed to use tools” and set tool_choice: any. In testing, handbook questions were answered correctly, but when a colleague typed “hot today, isn’t it,” search_handbook ran with the query “hot today” and returned an irrelevant excerpt from the dress-code policy. The system prompt contains no instructions about tool use.',
      question: 'Which statement correctly explains this behavior?',
      options: [
        'auto and any are effectively synonyms; the difference here comes from the model version',
        'any is a forcing setting — “always call one of the registered tools” — so even for tool-free inputs the model fabricates a query and calls the tool',
        'The cause is that search_handbook’s description reads as if small talk is in scope; fixing the description resolves it',
        'When only one tool is registered, calling it becomes mandatory automatically'
      ],
      explanations: [
        'auto and any differ clearly: auto lets the model decide whether to use a tool; any forces some call.',
        'Correct. The decisive detail is the misreading of any as permission. any means “you must call something,” not “you may,” so the model force-generates a query even for chit-chat.',
        'Improving the description leaves the forcing in place. The chit-chat call comes from the setting’s semantics, not a misread description.',
        'No rule makes calls mandatory based on tool count. The forcing comes from the any setting.'
      ]
    }
  },
  {
    id: 'tl2-011', domain: 'tool', answer: 3,
    ja: {
      scenario: 'コードベース調査エージェントを社内向けに提供している。エージェントはread_fileやsearch_codeを何ターンも呼んで調査し、最後のターンで「これまでの調査結果を日本語のレポートにまとめる」設計になっている。ツール定義は全ターンで同一のものを送っており、これを前提にプロンプトキャッシュでコストを4割削減できている。ところが最終のまとめ段で、モデルがまたread_fileを呼び始めて調査に戻ってしまい、レポートがなかなか出力されないケースが報告されている。',
      question: 'まとめ段の制御として最も適切なものはどれか。',
      options: [
        'まとめ段のリクエストだけtools配列を空にして送る',
        'システムプロンプトに「レポート作成段階ではツールを使わないこと」と追記する',
        'ループ回数に上限を設け、超えたら強制的に打ち切って直前のテキストをレポートとして採用する',
        'まとめ段のリクエストだけtool_choiceをnoneに設定し、ツール定義は残したままテキスト応答のみをさせる'
      ],
      explanations: [
        '履歴にtool_useブロックが残ったままtools定義を外すとリクエスト自体が不整合になるうえ、定義が変わることでプロンプトキャッシュも無効化される。',
        'プロンプト指示はベストエフォートで、現に呼んでしまう事象が起きている以上、確実な制御にならない。',
        '上限は暴走の保険にはなるが、打ち切り時点の中途半端なテキストがレポートになるだけで、まとめ段を確実にテキストで完結させる解決ではない。',
        '正解。決め手は「ツール定義を全ターン同一に保ってキャッシュを効かせている」こと。noneはツール定義を残したまま呼び出しだけを止められるので、キャッシュを壊さずにまとめ段をテキスト応答に固定できる。'
      ]
    },
    en: {
      scenario: 'A team provides an internal codebase-investigation agent. It calls read_file and search_code over many turns, and the final turn is designed to “compile the findings into a report in Japanese.” The same tool definitions are sent on every turn, and prompt caching built on that consistency cuts costs by 40%. However, in the final summarization turn the model sometimes starts calling read_file again and slips back into investigating, so the report never comes out.',
      question: 'Which is the most appropriate control for the summarization turn?',
      options: [
        'Send the summarization request with an empty tools array',
        'Add to the system prompt: “do not use tools during the report-writing phase”',
        'Cap the number of loop iterations and, past the cap, cut off and adopt the latest text as the report',
        'For the summarization request only, set tool_choice to none, keeping the tool definitions in place while allowing only a text response'
      ],
      explanations: [
        'Dropping the tools definitions while tool_use blocks remain in history makes the request inconsistent, and changing the definitions also invalidates the prompt cache.',
        'Prompt instructions are best-effort — the reported behavior shows the model calling tools anyway.',
        'A cap is a safety net against runaway loops, but it just promotes whatever half-finished text exists at cutoff; it does not reliably end the turn with a clean report.',
        'Correct. The decisive detail is that identical tool definitions across turns underpin the caching. none stops calls while leaving the definitions untouched, pinning the final turn to a text-only response without breaking the cache.'
      ]
    }
  },
  {
    id: 'tl2-012', domain: 'tool', answer: 2,
    ja: {
      scenario: '受託開発会社のエンジニアが、SDKを使わず素のHTTPでツール呼び出しの会話ループを実装している。モデルからtool_use（id: toolu_01A…）を含む応答を受け取り、ツールを実行して結果を返す段になった。実装者は「識別子はレスポンスを組み立てる側が採番するもの」と考え、uuid4()で新しく生成したIDをtool_resultブロックのtool_use_idに設定して、次のuserメッセージとして送信した。ツールの実行自体は成功しており、結果のJSONも正しく整形されている。',
      question: 'このリクエストを送ると何が起きるか。',
      options: [
        'モデルがツール名から対応関係を推測して処理を続けるが、複数ツール使用時に精度が落ちる',
        'tool_resultは無視され、モデルは結果が得られなかったものとして同じツールをもう一度呼ぶ',
        '対応するtool_useが見つからないため、モデルの処理に進む前にAPIがリクエストを400 Bad Requestで拒否する',
        'リクエストは受理されるが、応答のstop_reasonがerrorになり、エラー内容がテキストで返る'
      ],
      explanations: [
        'ツール名による自動対応付けは存在しない。並列呼び出しでは同名ツールが複数回現れるため、対応付けはIDのみで行われる。',
        '無視して続行される仕組みではない。紐付け不能なtool_resultはリクエスト自体の不整合として扱われる。',
        '正解。決め手は「tool_use_idを新規採番した」こと。tool_use_idは直前のtool_useのidと完全一致が必要で、一致しないリクエストはモデルの推論より前にAPIのバリデーションで400として拒否される。',
        'stop_reasonにerrorという値はなく、バリデーション失敗は応答が生成される前にHTTPエラーとして返る。'
      ]
    },
    en: {
      scenario: 'An engineer at a contract development firm is implementing a tool-use conversation loop over raw HTTP without an SDK. After receiving a response containing a tool_use block (id: toolu_01A…), it is time to execute the tool and return the result. Believing that “identifiers are assigned by whoever builds the response,” the engineer sets the tool_result block’s tool_use_id to a freshly generated uuid4() value and sends it as the next user message. The tool execution itself succeeded and the result JSON is well formed.',
      question: 'What happens when this request is sent?',
      options: [
        'The model infers the mapping from the tool name and continues, though accuracy degrades when multiple tools are used',
        'The tool_result is ignored, and the model calls the same tool again as if no result was received',
        'Because no matching tool_use exists, the API rejects the request with 400 Bad Request before any model processing occurs',
        'The request is accepted, but the response comes back with stop_reason set to error and the error described in text'
      ],
      explanations: [
        'There is no automatic mapping by tool name. Parallel calls can invoke the same tool multiple times, so correlation is done strictly by ID.',
        'It is not silently ignored. A tool_result that cannot be correlated makes the request itself invalid.',
        'Correct. The decisive detail is the newly minted ID. tool_use_id must exactly match the id of the preceding tool_use; a mismatched request is rejected by API validation with a 400 before the model ever reasons about it.',
        'There is no error value for stop_reason; validation failures return as HTTP errors before any response is generated.'
      ]
    }
  },
  {
    id: 'tl2-013', domain: 'tool', answer: 0,
    ja: {
      scenario: '越境ECの在庫案内ボットで、「SKU-AとSKU-Bの在庫を比べて」という質問に対し、モデルが1つの応答内でget_inventoryツールを並列に2回呼んだ（引数はそれぞれSKU-AとSKU-B）。実装側は実行結果を「ツール名→結果」の辞書で管理していたため、後から格納したSKU-Bの結果が先のSKU-Aの結果を上書きし、2つのtool_resultの両方にSKU-Bの在庫数が入って返された。モデルは「どちらも在庫120個です」と自信を持って誤答し、顧客からの指摘で発覚した。ツールの実行自体は2回とも正常だった。',
      question: 'この事故の根本原因はどれか。',
      options: [
        '同名ツールの並列呼び出しでは名前をキーにした結果管理が衝突する。tool_resultは各tool_useのidをキーに個別に対応付けなければならない',
        '並列ツール呼び出しは不安定な挙動なので、リクエスト側の設定で無効化しておくべきだった',
        'get_inventoryが冪等に設計されていないため、2回目の呼び出しが正しい値を返せなかった',
        'モデルが1つの応答で複数のツールを呼ぶのは異常動作であり、tool_choiceの設定ミスがある'
      ],
      explanations: [
        '正解。決め手は「ツール名をキーにした辞書管理」。同一ツールが並列で複数回呼ばれる状況では名前は一意にならず、tool_use_idで個別に紐付けるのが唯一正しい対応付けになる。',
        '並列呼び出しは正常な仕様上の動作であり、無効化は根本原因の説明にならない。IDで紐付けていれば並列でも問題なく動く。',
        '実行は2回とも正常だったと明記されており、冪等性は今回の混線とは無関係。',
        '複数ツールの同時呼び出しは通常の動作で、設定ミスではない。異常なのはアプリ側の結果管理の方。'
      ]
    },
    en: {
      scenario: 'In a cross-border e-commerce inventory bot, a user asked “compare stock for SKU-A and SKU-B,” and the model called the get_inventory tool twice in parallel within a single response (arguments SKU-A and SKU-B respectively). The implementation tracked results in a dictionary keyed by tool name, so the later SKU-B result overwrote the earlier SKU-A result, and both tool_result blocks went back containing SKU-B’s stock count. The model confidently answered “both have 120 units in stock,” and a customer complaint exposed the error. Both tool executions themselves were successful.',
      question: 'What is the root cause of this incident?',
      options: [
        'With parallel calls to the same tool, keying results by name collides; each tool_result must be correlated individually using the id of its tool_use',
        'Parallel tool calling is unstable behavior and should have been disabled in the request settings',
        'get_inventory was not designed to be idempotent, so the second call could not return the right value',
        'A model calling multiple tools in one response is abnormal behavior, indicating a tool_choice misconfiguration'
      ],
      explanations: [
        'Correct. The decisive detail is the dictionary keyed by tool name. When the same tool is called multiple times in parallel, names are not unique — correlating by tool_use_id is the only valid mapping.',
        'Parallel calls are normal, specified behavior; disabling them does not explain the root cause. With ID-based correlation, parallel calls work fine.',
        'The scenario states both executions succeeded; idempotency has nothing to do with this mix-up.',
        'Multiple tool calls in one response are normal. What was abnormal was the application’s result bookkeeping.'
      ]
    }
  },
  {
    id: 'tl2-014', domain: 'tool', answer: 1,
    ja: {
      scenario: '教育系スタートアップが自前のエージェントループを実装している。モデルからtool_useブロックを含む応答を受けたあと、開発者は「ツールの実行結果はモデル側の処理の続きだから」という理解で、tool_resultブロックをassistantロールの新しいメッセージとして会話履歴に追加し、次のリクエストを送った。するとAPIがエラーを返し、会話が継続できない。ツールの実行自体は成功しており、tool_use_idも正しくコピーしてある。リトライ処理を挟んでも同じエラーが返り続ける。',
      question: 'tool_resultの正しい返し方はどれか。',
      options: [
        '実行結果をsystemプロンプトの末尾に追記して次のターンに引き継ぐ',
        'tool_resultブロックは、tool_useを含むassistantメッセージの直後にuserロールのメッセージとして返し、tool_use_idで対応付ける',
        '実行結果はプレーンテキストとしてuserメッセージに貼り付ければよく、tool_resultブロックの使用は任意',
        'assistantロールのままでよいが、tool_resultブロックをcontent配列の先頭に置く必要がある'
      ],
      explanations: [
        'systemプロンプトはツール結果の受け渡し経路ではない。tool_useとの対応付けが失われ、会話構造としても不正。',
        '正解。決め手は「assistantロールで結果を返した」こと。ツール結果はアプリ（ユーザー側）からモデルへの入力であり、直後のuserメッセージ内のtool_resultブロックとしてtool_use_idつきで返すのが正しい構造。',
        'プレーンテキスト貼り付けではtool_useとの機械的な紐付けが失われる。tool_useを含む応答の直後にはtool_resultが必須で、任意ではない。',
        'ロールが誤っている以上、ブロックの位置を変えても解決しない。先頭配置という要件も存在しない。'
      ]
    },
    en: {
      scenario: 'An education startup is implementing its own agent loop. After receiving a response containing a tool_use block, the developer — reasoning that “the tool’s execution result is a continuation of the model’s work” — appended the tool_result block to the conversation history as a new assistant-role message and sent the next request. The API returns an error and the conversation cannot continue. The tool execution itself succeeded, and the tool_use_id was copied correctly. Retrying produces the same error every time.',
      question: 'What is the correct way to return the tool_result?',
      options: [
        'Append the execution result to the end of the system prompt and carry it into the next turn',
        'Return the tool_result block in a user-role message immediately following the assistant message that contains the tool_use, correlated via tool_use_id',
        'Paste the result as plain text in a user message; using a tool_result block is optional',
        'Keep the assistant role, but the tool_result block must be placed first in the content array'
      ],
      explanations: [
        'The system prompt is not a channel for tool results. The correlation with tool_use is lost and the conversation structure is invalid.',
        'Correct. The decisive detail is returning the result under the assistant role. Tool results are input from the application (user side) to the model, and must come back as a tool_result block in the next user message, tagged with the tool_use_id.',
        'Pasting plain text loses the machine-readable link to the tool_use. After a response containing tool_use, a tool_result is required, not optional.',
        'With the wrong role, repositioning the block does not help. No first-position requirement exists either.'
      ]
    }
  },
  {
    id: 'tl2-015', domain: 'tool', answer: 3,
    ja: {
      scenario: 'マーケティング企業のデータ分析エージェントで、実装者は会話ループの終了判定を「応答のcontent配列の最初のブロックがtextなら分析完了」というロジックにした。リリース当初の簡単な集計では問題なかったが、複数のデータソースをまたぐ複雑な依頼になると、分析が途中で止まり「ここまでの傾向を整理すると…」という中間的な考察だけがユーザーに返る事象が頻発。ログを確認すると、止まったターンの応答にはtextブロックの後ろにtool_useブロックが続いており、stop_reasonはtool_useだった。',
      question: 'この不具合の根本原因はどれか。',
      options: [
        'max_tokensが小さすぎて、応答が途中で切れている',
        'ツールのdescriptionが不明瞭なため、モデルが分析の続行を諦めている',
        '途中経過のテキストを返すのはモデルの不具合であり、textブロックを履歴から取り除く処理を入れるべきだった',
        '1つの応答にはtextとtool_useのブロックが同居しうるため、先頭ブロックの型で完了を判定するのは誤り。stop_reasonがtool_useの間は継続し、end_turnで終了と判定すべき'
      ],
      explanations: [
        'ログのstop_reasonはtool_useであり、max_tokensで切れた場合はstop_reasonがmax_tokensになる。トークン不足の兆候はない。',
        'モデルは続行を諦めておらず、現にtool_useブロックを出して次のツール実行を要求している。止めたのはアプリ側の判定ロジック。',
        '考察を書きながらツールを呼ぶのは正常な動作。textブロックを履歴から削るのは会話の整合性を壊す悪手で、修正の方向が逆。',
        '正解。決め手は「textブロックの後ろにtool_useが続いていた」というログ。応答には考察テキストとツール要求が同居しうるので、終了判定はブロックの型ではなくstop_reason（tool_useなら継続、end_turnで終了）で行う。'
      ]
    },
    en: {
      scenario: 'In a marketing firm’s data-analysis agent, the implementer wrote the loop-termination logic as “if the first block in the response’s content array is text, the analysis is complete.” Simple aggregations worked fine at launch, but for complex requests spanning multiple data sources, the analysis frequently stops midway and the user receives only an interim observation like “summarizing the trends so far…”. The logs show that in the stalled turns, the response had a text block followed by a tool_use block, and the stop_reason was tool_use.',
      question: 'What is the root cause of this bug?',
      options: [
        'max_tokens is too small, so responses are being cut off midway',
        'The tool descriptions are unclear, so the model gives up on continuing the analysis',
        'Returning interim text is a model defect; the code should strip text blocks from the history',
        'A single response can contain both text and tool_use blocks, so judging completion by the first block’s type is wrong; the loop should continue while stop_reason is tool_use and finish at end_turn'
      ],
      explanations: [
        'The logged stop_reason is tool_use; a max_tokens cutoff would show stop_reason max_tokens. There is no sign of token starvation.',
        'The model has not given up — it emitted a tool_use block requesting the next execution. What stopped it was the app’s termination logic.',
        'Writing commentary while calling tools is normal behavior. Stripping text blocks from history breaks conversation integrity — the wrong direction entirely.',
        'Correct. The decisive detail in the log is the text block followed by tool_use. Since commentary and tool requests coexist in one response, termination must key off stop_reason (continue on tool_use, finish on end_turn), not block types.'
      ]
    }
  },
  {
    id: 'tl2-016', domain: 'tool', answer: 2,
    ja: {
      scenario: 'リーガルテック企業の契約書レビューエージェントは、条項を検索ツールで照合しながら指摘事項のリストを生成し、完成したらSlackに通知する。完了判定は「応答にツール呼び出しが含まれなければレビュー完了」という実装。ある大型案件で、指摘リストが「第14条の解約条項につい」で文章ごと途切れたまま「レビュー完了」としてSlack通知され、法務部から品質を疑う問い合わせが来た。ログを確認すると、そのターンにツール呼び出しはなく、stop_reasonはmax_tokensだった。指摘は40件を超える長さだった。',
      question: 'この問題への対処として最も適切なものはどれか。',
      options: [
        'Slack通知の前に、本文の末尾が句点で終わっているかを正規表現で検査する',
        'システムプロンプトに「指摘リストは必ず最後まで出力すること」と指示を追加する',
        '完了判定にstop_reasonの検査を組み込み、max_tokensの場合は完了扱いにせず、上限の見直しや継続リクエストで最後まで生成させる',
        'ツール呼び出しの有無ではなく、応答の文字数が一定以上あるかで完了を判定する'
      ],
      explanations: [
        '句点検査は偶然句点で切れたケースをすり抜けさせる、その場しのぎのヒューリスティック。切り詰めの事実はstop_reasonが直接教えてくれる。',
        'max_tokensは生成の物理的な上限であり、どれほど強く指示してもモデルは上限を超えて出力できない。',
        '正解。決め手は「stop_reasonがmax_tokensだった」こと。max_tokensは途中停止を意味する明示的なシグナルであり、完了判定は必ずstop_reasonを見て、切り詰め時は継続や上限拡大で全文を得るのが正しい。',
        '文字数のしきい値は長い依頼と短い依頼を区別できず、根拠のない代理指標にすぎない。'
      ]
    },
    en: {
      scenario: 'A legal-tech contract review agent cross-checks clauses with a search tool while generating a list of findings, then notifies Slack when done. Completion is implemented as “if the response contains no tool call, the review is finished.” On a large deal, the findings list was posted to Slack as “review complete” even though it broke off mid-sentence at “regarding the termination clause in Article 14, the”. The legal team questioned the quality. Logs showed no tool call in that turn and a stop_reason of max_tokens. The findings ran to over forty items.',
      question: 'Which is the most appropriate remedy?',
      options: [
        'Before the Slack notification, check with a regex whether the text ends in a sentence-final period',
        'Add a system-prompt instruction: “always output the findings list to the very end”',
        'Incorporate stop_reason into the completion check: when it is max_tokens, do not treat the turn as complete — revisit the limit or send continuation requests until generation finishes',
        'Judge completion by whether the response exceeds a certain character count instead of by the absence of tool calls'
      ],
      explanations: [
        'A period check is a stopgap heuristic that lets truncations slipping past on a coincidental period. The truncation fact is reported directly by stop_reason.',
        'max_tokens is a hard generation ceiling; no instruction, however forceful, lets the model exceed it.',
        'Correct. The decisive detail is the stop_reason of max_tokens — an explicit signal of mid-generation cutoff. Completion logic must inspect stop_reason and, on truncation, continue or raise the limit to obtain the full text.',
        'A character-count threshold cannot distinguish long jobs from short ones; it is an unfounded proxy.'
      ]
    }
  },
  {
    id: 'tl2-017', domain: 'tool', answer: 0,
    ja: {
      scenario: 'フィンテック企業がAPIコスト削減のため、エージェントの会話履歴を圧縮する施策を実施した。エンジニアは「ループの実行に必要なのはtool_useブロックだけ」という理屈で、履歴中の過去のassistantメッセージからtextブロックだけを削除し、tool_useブロックのみを残す処理を組み込んだ。tool_resultとの対応関係は保たれており、APIエラーは発生していない。しかし施策後、複数ステップの与信調査タスクで、モデルが一度調べ終えた項目のツールをもう一度呼んだり、序盤の自身の分析と矛盾する結論を出したりする劣化が目立つようになった。',
      question: 'この劣化の原因として最も適切なものはどれか。',
      options: [
        'textブロックにはモデルの中間的な分析・推論が記録されており、削除すると以降のターンがその文脈を失う。assistantメッセージはtextとtool_useを含めそのまま保持すべき',
        'tool_useブロックだけのassistantメッセージはAPI仕様違反であり、リクエストが暗黙に補正されて内容が変質している',
        '圧縮によってプロンプトキャッシュが無効になり、キャッシュ未使用時はモデルの応答品質が低下するため',
        'ツール結果が長すぎることが真の原因であり、削るべきはtextブロックではなくtool_result側だった'
      ],
      explanations: [
        '正解。決め手は「削ったのが過去の分析テキスト」で、症状が「調べ直し・矛盾」であること。textブロックはモデル自身の思考の記録であり、それを失った後続ターンは何を確認済みかを参照できなくなる。',
        'tool_useのみのassistantメッセージは有効な形式で、現にエラーは出ていない。暗黙補正という仕組みも存在しない。',
        'キャッシュはコストとレイテンシの仕組みであり、ヒットの有無で応答品質は変わらない。',
        'tool_resultの要約は別の文脈管理手法として存在するが、今回の症状は分析テキストの喪失と時期が一致しており、原因のすり替えになる。'
      ]
    },
    en: {
      scenario: 'To cut API costs, a fintech company rolled out conversation-history compression for its agent. Reasoning that “only the tool_use blocks are needed to run the loop,” an engineer added logic that deletes just the text blocks from past assistant messages, keeping only tool_use blocks. The correspondence with tool_result blocks is preserved and no API errors occur. After the rollout, however, multi-step credit-investigation tasks degraded noticeably: the model re-calls tools for items it had already checked, and draws conclusions that contradict its own earlier analysis.',
      question: 'What best explains this degradation?',
      options: [
        'Text blocks record the model’s intermediate analysis and reasoning; deleting them strips that context from later turns. Assistant messages should be preserved intact, text and tool_use together',
        'Assistant messages containing only tool_use blocks violate the API spec, so requests are being silently corrected in ways that alter their content',
        'The compression invalidated the prompt cache, and response quality drops when the cache is not hit',
        'The real culprit is overly long tool results; what should have been trimmed was the tool_result side, not the text blocks'
      ],
      explanations: [
        'Correct. The decisive details are what was deleted (past analysis text) and the symptoms (re-checking and self-contradiction). Text blocks are the model’s recorded thinking; without them, later turns cannot see what was already established.',
        'Assistant messages with only tool_use blocks are valid — indeed no errors occurred. No silent-correction mechanism exists.',
        'Caching affects cost and latency; cache hits or misses do not change response quality.',
        'Summarizing tool results is a real context-management technique, but the symptoms coincide with losing the analysis text — this swaps in a different cause.'
      ]
    }
  },
  {
    id: 'tl2-018', domain: 'tool', answer: 1,
    ja: {
      scenario: '電力小売会社のチャットボットは、get_current_rateツールで外部の市場価格APIから最新単価を取得し、電気料金の試算を案内する。実装チームは「外部APIが落ちてもユーザー体験を守る」方針で、接続失敗時には直近に取得できたキャッシュ値を、成功時とまったく同じ形式のレスポンスとして返す設計にした。ある日、外部APIが12時間にわたり停止。その間に市場価格が3割超上昇したが、ボットは古い単価に基づく試算を「現在の単価です」と案内し続け、後日、請求額との乖離について苦情が相次いだ。',
      question: 'この設計の根本的な問題はどれか。',
      options: [
        'キャッシュのTTLが長すぎる。TTLを短くして期限切れキャッシュを使わないようにすべきだった',
        '障害時の結果を成功時と区別できない形式で返しているため、モデルには値が古い可能性を知る手段がなく、注記も判断もできない。isErrorやデータ鮮度の明示で失敗・劣化を伝えるべき',
        '外部APIへのリトライ回数が不足しており、フォールバック先の価格情報源も二重化されていなかった',
        'モデルが取得値の妥当性を検証していない。プロンプトで「価格の最新性を必ず確認せよ」と義務付けるべき'
      ],
      explanations: [
        'TTLを短くすると障害中は完全に応答不能になるだけで、「劣化した情報であることをモデルに伝えられない」という構造的問題は残る。',
        '正解。決め手は「失敗時も成功とまったく同じ形式で返す」設計。ツールのエラーや劣化状態はisErrorや鮮度情報として明示的に返してこそ、モデルが「参考値です」と注記したり別対応を取ったりできる。',
        'リトライや冗長化は障害の頻度を下げる施策で、障害が起きたときに誤情報を断定調で案内し続ける問題の答えになっていない。',
        'レスポンスに鮮度の手がかりが一切ない以上、モデル側でいくら検証を義務付けても判断材料がない。無い情報は確認できない。'
      ]
    },
    en: {
      scenario: 'A power retailer’s chatbot uses a get_current_rate tool to fetch the latest unit price from an external market-price API and walks users through bill estimates. To “protect the user experience even if the external API goes down,” the team designed the tool to return the most recent cached value on connection failure — in exactly the same response format as a success. One day the external API was down for twelve hours. Market prices rose more than 30% during that window, but the bot kept presenting estimates based on the stale rate as “the current unit price,” and complaints about billing discrepancies poured in later.',
      question: 'What is the fundamental flaw in this design?',
      options: [
        'The cache TTL is too long; a shorter TTL should have prevented expired cache values from being used',
        'Failure results are returned in a form indistinguishable from success, so the model has no way to know the value may be stale — it can neither caveat nor adapt. Failures and degradation should be signaled explicitly via isError or freshness metadata',
        'Retries against the external API were insufficient, and no redundant fallback price source was provisioned',
        'The model fails to validate the fetched value; the prompt should mandate “always verify the freshness of prices”'
      ],
      explanations: [
        'A shorter TTL just makes the bot fully unresponsive during outages; the structural problem — the model cannot be told the data is degraded — remains.',
        'Correct. The decisive detail is returning failures in exactly the success format. Only when errors and degraded states are surfaced explicitly — isError, freshness metadata — can the model add caveats or change course.',
        'Retries and redundancy reduce outage frequency, but they do not answer why the bot kept asserting wrong information once the outage happened.',
        'With no freshness cue anywhere in the response, no amount of mandated verification gives the model anything to verify. Absent information cannot be checked.'
      ]
    }
  },
  {
    id: 'tl2-019', domain: 'tool', answer: 3,
    ja: {
      scenario: 'SaaS企業のプラットフォームチームが、社内共通のMCPサーバーを各プロダクトチームに提供している。あるチームから「エラーハンドリングが壊れている。ツールが失敗してもisError: trueが返ってこず、代わりに別のエラーで落ちる」という報告が来た。調査すると、そのチームは3か月前に改名されたツールを旧名のget_user_v1のまま呼び出しており、サーバーはJSON-RPCレベルのエラー（メソッド未検出相当）を返していた。サーバー側のツール実装には、実行失敗時にisError: trueと原因を返すコードが正しく入っている。',
      question: 'この状況の理解として正しいものはどれか。',
      options: [
        'サーバーのバグである。存在しないツール名で呼ばれた場合も、isError: trueの結果として返すべき',
        'クライアントSDKが古いことが原因で、更新すればJSON-RPCエラーは自動的にisError形式に変換される',
        'isErrorはHTTPステータスコードに対応する仕組みなので、この場合は404が返るのが本来の挙動',
        'MCPのエラーは2系統ある。存在しないツールや不正な引数など「ツールに到達できない」段階の問題はプロトコル（JSON-RPC）エラーで返り、isErrorはツールが実行されて失敗したときの仕組み。今回は前者であり、isErrorが返らないのは正常'
      ],
      explanations: [
        '存在しないツールの呼び出しは、そもそもツール実装に到達する前のプロトコル層で検出される。isErrorで返すべきという前提が誤り。',
        'そのような自動変換の仕組みは存在しない。2つのエラーは層が違うものであり、変換して混ぜるべきものでもない。',
        'isErrorはツール実行結果の中のフィールドで、HTTPステータスとは別の仕組み。対応関係はない。',
        '正解。決め手は「旧名のツールを呼んでいた」こと。未知のツール・引数不正はプロトコル（JSON-RPC）エラー、実行後の失敗はisErrorという2系統の区別が理解できていれば、これは壊れているのではなく仕様どおりだと分かる。'
      ]
    },
    en: {
      scenario: 'A SaaS company’s platform team provides a shared internal MCP server to product teams. One team reported: “Error handling is broken — when the tool fails we never get isError: true; instead we crash with a different error.” Investigation showed the team was still calling a tool by its old name, get_user_v1, three months after it was renamed, and the server was returning a JSON-RPC-level error (method not found). The server-side tool implementation correctly returns isError: true with a reason when execution fails.',
      question: 'Which is the correct understanding of this situation?',
      options: [
        'It is a server bug: calls to a nonexistent tool name should also come back as a result with isError: true',
        'The client SDK is outdated; upgrading it makes JSON-RPC errors convert automatically into the isError format',
        'isError maps to HTTP status codes, so the proper behavior here would be returning a 404',
        'MCP has two error channels. Problems before the tool can even be reached — unknown tool, malformed arguments — surface as protocol (JSON-RPC) errors, while isError is for tools that ran and failed. This case is the former, so the absence of isError is correct behavior'
      ],
      explanations: [
        'A call to a nonexistent tool is caught at the protocol layer before the tool implementation is ever reached. The premise that it should be an isError result is wrong.',
        'No such automatic conversion exists. The two error kinds live at different layers and should not be blended.',
        'isError is a field inside a tool execution result, a separate mechanism from HTTP status codes. There is no mapping.',
        'Correct. The decisive detail is the call to the renamed tool’s old name. Unknown tools and malformed arguments produce protocol (JSON-RPC) errors; isError covers tools that executed and failed. This is the former — working as specified, not broken.'
      ]
    }
  },
  {
    id: 'tl2-020', domain: 'tool', answer: 2,
    ja: {
      scenario: '製造業のIoTダッシュボードチームが、工場センサーの読み取り値を返すget_sensor_readingsツールをMCPサーバー経由で提供し、異常検知エージェントに使わせている。ある週から特定ラインの温度異常アラートが大量発生。調べると、そのラインの新型センサー群がファームウェアの仕様で華氏の値を返しており、サーバーはそれを摂氏として扱ってそのまま返却していた。担当者は「MCPという標準プロトコルを通しているのに、なぜ単位の不整合が検出されないのか」と困惑している。ツールのinput_schemaにはsensor_group引数が正しく定義されている。',
      question: 'この担当者への説明として正しいものはどれか。',
      options: [
        'レスポンスのスキーマにunitプロパティを定義しておけば、プロトコルが単位の検証と変換を行ってくれる',
        '使用しているMCPのバージョンが古い。最新版にはデータ品質検証の機能が含まれている',
        'プロトコルが定めるのはメッセージの書式とやり取りの手順であり、運ばれる中身が意味的に正しいかは検査しない。単位の整合性はサーバー実装、つまりアプリ側の責任',
        'ホスト側のMCPクライアントで検証機能が無効化されていることが原因で、設定を有効に戻せば検出される'
      ],
      explanations: [
        'スキーマは構造の契約であり、値の意味的な正しさ（華氏か摂氏か）を検証・変換する機構はプロトコルにはない。',
        'バージョンの新旧を問わず、プロトコルにデータ品質検証の機能はない。もっともらしいが存在しない機能。',
        '正解。決め手は「標準プロトコルなら中身も検証されるはず」という誤解。プロトコルは書式と往復の約束事であって、中身の意味的な正しさは運ばない側、つまりツールを実装したサーバー側の責任になる。',
        'クライアントにそのような意味的検証機能はなく、無効化されているという前提自体が誤り。'
      ]
    },
    en: {
      scenario: 'A manufacturing IoT dashboard team provides a get_sensor_readings tool via an MCP server for use by an anomaly-detection agent. One week, temperature anomaly alerts exploded for a particular line. Investigation revealed that the line’s new sensor batch reports values in Fahrenheit per its firmware spec, and the server was passing those through, treated as Celsius. The engineer in charge is baffled: “We go through MCP, a standard protocol — why doesn’t it detect the unit mismatch?” The tool’s input_schema correctly defines a sensor_group argument.',
      question: 'Which explanation to this engineer is correct?',
      options: [
        'If the response schema had defined a unit property, the protocol would validate and convert units',
        'The MCP version in use is outdated; the latest version includes data-quality validation',
        'The protocol defines message formats and the exchange procedure; it does not inspect whether the transported content is semantically correct. Unit consistency is the responsibility of the server implementation — the application side',
        'A validation feature is disabled in the host-side MCP client; re-enabling the setting would catch this'
      ],
      explanations: [
        'Schemas are structural contracts; the protocol has no mechanism to verify or convert the semantic meaning of values, such as Fahrenheit versus Celsius.',
        'No version of the protocol includes data-quality validation. Plausible-sounding, but the feature does not exist.',
        'Correct. The decisive detail is the misconception that a standard protocol validates content. A protocol is an agreement on format and exchange; semantic correctness belongs to whoever implements the tool — the server side.',
        'No such semantic validation feature exists in the client, so the premise that it was disabled is itself wrong.'
      ]
    }
  },
  {
    id: 'tl2-021', domain: 'tool', answer: 0,
    ja: {
      scenario: '商社のIT部門がSalesforce連携のAIエージェントを構築中で、セキュリティ審査の場で「SalesforceのAPIトークンをどこに保管するか」が論点になった。担当した若手エンジニアは「最終的にAPIを呼ぶのはClaudeなのだから、何らかの形でモデルにトークンを渡す必要がある」と主張し、システムプロンプト経由での受け渡しやtool_result経由での返却などの案を検討している。連携はMCPサーバーとして実装済みで、検索と更新の2ツールを公開している。審査では情報漏えい時の影響範囲も問われている。',
      question: 'この構成における役割分担の説明として正しいものはどれか。',
      options: [
        '外部APIを実際に呼び出すのはMCPサーバー側であり、モデルはツール呼び出しの要求を出すだけ。トークンはサーバー側に保持すればよく、モデルやプロンプトに渡す必要は一切ない',
        'モデルがAPIを直接呼び出すため、トークンは暗号化したうえでシステムプロンプトに埋め込むのが標準的な方法',
        'トークンはtool_resultで毎回モデルに返しておき、次のツール呼び出し時に引数として渡させる設計が正しい',
        'トークンはAnthropic側に預けるマネージド機能を使って管理するのが標準構成'
      ],
      explanations: [
        '正解。決め手は「最終的にAPIを呼ぶのはClaude」という誤った前提。モデルはtool_useという要求を出力するだけで、実行と外部通信はツールを実装したサーバー（アプリ側）が担う。したがって認証情報がモデルに渡る必要はない。',
        '暗号化してもプロンプトに入れた時点で会話コンテキストに秘密情報が流入する。そもそもモデルは直接APIを呼ばないので、渡す必要自体がない。',
        'tool_result経由の受け渡しは、秘密情報を会話履歴に往復させ続ける最悪の設計。漏えいの影響範囲を最大化する。',
        'そのようなトークン預かりのマネージド機能は標準構成として存在しない。認証情報の管理は自組織のサーバー側の責任。'
      ]
    },
    en: {
      scenario: 'A trading company’s IT division is building a Salesforce-integrated AI agent, and a security review raised the question of where to store the Salesforce API token. The junior engineer on the project argues that “since Claude is what ultimately calls the API, the token has to be handed to the model somehow,” and is weighing options like passing it via the system prompt or returning it through tool_result. The integration is already implemented as an MCP server exposing two tools, search and update. The review also asks about blast radius in case of a leak.',
      question: 'Which statement correctly describes the division of roles in this architecture?',
      options: [
        'The MCP server is what actually calls the external API; the model only emits tool-call requests. The token stays on the server side and never needs to be given to the model or the prompt',
        'Because the model calls the API directly, the standard method is to embed the token, encrypted, in the system prompt',
        'The correct design returns the token to the model in every tool_result so it can pass it back as an argument on the next call',
        'The standard configuration is a managed feature where the token is deposited with Anthropic'
      ],
      explanations: [
        'Correct. The decisive detail is the false premise that Claude ultimately calls the API. The model only outputs a tool_use request; execution and external communication are done by the server (application side) that implements the tool, so credentials never need to reach the model.',
        'Even encrypted, putting it in the prompt injects secrets into the conversation context — and since the model never calls the API directly, there is no need to pass it at all.',
        'Shuttling secrets through tool_result keeps them circulating in the conversation history — the worst possible design, maximizing leak impact.',
        'No such managed token-custody feature exists as a standard configuration. Credential management is the responsibility of your own server side.'
      ]
    }
  },
  {
    id: 'tl2-022', domain: 'tool', answer: 1,
    ja: {
      scenario: '中堅SIerの社内勉強会で、MCPを初めて学ぶメンバーが構成図を作って発表した。図では「Claude DesktopがMCPサーバーであり、社内の勤怠システムやファイル検索などの各ツールがクライアントとしてClaude Desktopに接続する」と描かれている。発表後、参加者から「逆ではないか」という指摘が出て議論になった。勉強会では今後、天気APIを例にした自作サーバーのハンズオンも予定されており、用語の整理が必要になっている。',
      question: 'MCPの構成の説明として正しいものはどれか。',
      options: [
        '図のとおりで正しい。Claude Desktopがサーバーとして機能し、各ツールがクライアントとして接続する',
        'Claude DesktopのようなLLMアプリはホストであり、その内部のMCPクライアントが、ツールを提供するMCPサーバー（勤怠システムやファイル検索側）に接続する',
        'どちらがサーバーでどちらがクライアントかは、先に接続を開始した側がクライアントになるという形で構成ごとに決まる',
        'モデル（Claude本体）がクライアントであり、Claude Desktopがそれを仲介するサーバーとして機能する'
      ],
      explanations: [
        '役割が逆。ツールを「提供する」側がサーバーであり、Claude Desktopは提供される側（利用する側）にあたる。',
        '正解。決め手はホスト・クライアント・サーバーの役割理解。LLMアプリ本体がホスト、その中のMCPクライアントが接続を張り、機能を公開する側がMCPサーバーという固定の役割分担になっている。',
        'MCPの役割は接続順で入れ替わる相対的なものではない。ツール提供側がサーバーという役割は固定している。',
        'モデル自体はMCPの当事者ではなく、ホストアプリが内包するクライアントがサーバーと通信する。モデルとホストの区別が混同されている。'
      ]
    },
    en: {
      scenario: 'At a mid-sized system integrator’s internal study session, a member new to MCP presented an architecture diagram. It showed “Claude Desktop as the MCP server, with in-house tools — the attendance system, file search — connecting to it as clients.” After the talk, someone objected that it was backwards, sparking a debate. The study group also plans a hands-on session building a homemade server around a weather API, so the terminology needs to be sorted out.',
      question: 'Which statement correctly describes the MCP architecture?',
      options: [
        'The diagram is correct as drawn: Claude Desktop functions as the server, and each tool connects to it as a client',
        'An LLM application like Claude Desktop is the host; the MCP client inside it connects to MCP servers — the attendance system and file search sides — which provide the tools',
        'Which side is server and which is client is decided per deployment: whichever initiates the connection becomes the client',
        'The model itself (Claude) is the client, and Claude Desktop functions as the server mediating for it'
      ],
      explanations: [
        'The roles are reversed. The side that provides tools is the server; Claude Desktop is the consumer.',
        'Correct. The decisive point is the host–client–server division: the LLM app is the host, the MCP client inside it establishes connections, and whatever exposes capabilities is the MCP server. These roles are fixed.',
        'MCP roles are not relative or connection-order dependent. The tool-providing side is the server, always.',
        'The model itself is not an MCP participant; the client embedded in the host app talks to servers. This confuses the model with the host.'
      ]
    }
  },
  {
    id: 'tl2-023', domain: 'tool', answer: 3,
    ja: {
      scenario: '中堅メーカーの情報システム部で、部門ごとにMCPサーバーの構築が進んでいる。経理チームは使い慣れたPythonで経費データ検索サーバーを、開発チームはTypeScriptで社内Wiki検索サーバーを作った。これを知った役員が「部門ごとにバラバラの言語で作って、全社標準のクライアント（Claude Desktop）から本当に両方使えるのか。作り直しになるなら今のうちに言語を統一させたい」と懸念を示した。両サーバーとも各言語の公式SDKで実装され、単体での動作確認は済んでいる。',
      question: 'この役員への回答として正しいものはどれか。',
      options: [
        '同一言語に揃えないとメッセージ形式が微妙に異なるため、どちらかへの統一が必要',
        'TypeScript製はそのまま動くが、Python製は間に変換ゲートウェイを立てる必要がある',
        'どちらも動くが、言語ごとにClaude Desktop側へ対応プラグインを追加インストールする必要がある',
        'プロトコルはJSON-RPCベースのメッセージ書式の取り決めであり、これに準拠してさえいれば実装言語を問わず同一のクライアントから接続できる。言語統一は不要'
      ],
      explanations: [
        'メッセージ形式は実装言語ではなくプロトコルが定める。準拠実装同士で形式が食い違うことはない。',
        'どちらの言語にも公式SDKがあり、対等に準拠サーバーを実装できる。変換ゲートウェイという概念は不要。',
        'クライアントはプロトコルに準拠したサーバーとそのまま話せる。言語別プラグインという仕組みは存在しない。',
        '正解。決め手は「プロトコル＝書式の約束事」という理解。ワイヤ上のメッセージ形式さえ守られていれば、サーバーがPythonかTypeScriptかはクライアントから見えない実装詳細にすぎない。'
      ]
    },
    en: {
      scenario: 'At a mid-sized manufacturer’s IT department, each division has been building its own MCP server. The accounting team built an expense-data search server in Python, their comfort zone, while the development team built an internal wiki search server in TypeScript. Hearing this, an executive worried: “With every division using a different language, can our company-standard client (Claude Desktop) really use both? If a rebuild is coming, I want the language unified now.” Both servers are implemented with each language’s official SDK and have passed standalone testing.',
      question: 'Which is the correct answer to this executive?',
      options: [
        'Without unifying on one language, the message formats will differ subtly, so consolidation is necessary',
        'The TypeScript one works as is, but the Python one needs a translation gateway in between',
        'Both work, but a language-specific plugin must be installed into Claude Desktop for each',
        'The protocol is an agreement on JSON-RPC-based message formats; any compliant implementation, regardless of language, can be reached from the same client. No language unification is needed'
      ],
      explanations: [
        'Message formats are defined by the protocol, not the implementation language. Compliant implementations cannot diverge in format.',
        'Both languages have official SDKs and can implement compliant servers equally. No translation gateway concept exists.',
        'A client talks directly to any protocol-compliant server. There is no per-language plugin mechanism.',
        'Correct. The decisive understanding is that a protocol is a format agreement. As long as the on-the-wire messages conform, whether the server is Python or TypeScript is an implementation detail invisible to the client.'
      ]
    }
  },
  {
    id: 'tl2-024', domain: 'tool', answer: 2,
    ja: {
      scenario: '流通企業の社内データ整備エージェントが、重複レコードの整理作業中にdelete_recordsツールを呼び、誤って本番の顧客レコード約800件を削除した。幸い前夜のバックアップから復旧できたが、ポストモーテムでPMは「モデルが勝手に削除を判断した。システムプロンプトの禁止指示を強化することが再発防止策だ」と結論づけようとしている。delete_recordsツールは条件に合致した全レコードを即時に消す実装で、確認ステップや削除件数の上限は設けられていなかった。',
      question: '再発防止の考え方として最も適切なものはどれか。',
      options: [
        'システムプロンプトに「削除操作は絶対に行わないこと」と明記し、モデルの判断で削除を防ぐ',
        'delete_recordsツールのdescriptionに「使用には細心の注意を払うこと」という警告文を追加する',
        '削除を実際に実行したのはツールを実装したアプリ側である。モデルは要求を出すことしかできない以上、破壊的操作には人間の確認・削除件数の上限・権限チェックといったガードを実行側であるアプリ層に設ける',
        'モデルのバージョンを固定し、アップデートによる挙動変化が起きないようにする'
      ],
      explanations: [
        'プロンプト指示はベストエフォットの一層にすぎず、長い会話や紛らわしい文脈では突破されうる。防止をモデルの判断だけに委ねる構造が残る。',
        '警告文の追加も同じくモデルへのお願いであり、実行を止める力を持つガードではない。',
        '正解。決め手は「実行したのは誰か」の整理。モデルはtool_useという要求を出すだけで、削除を実行したのはアプリ側。したがって不可逆な操作の防護壁は、確認・上限・権限という形で実行側に置くのが原則。',
        'バージョン固定は挙動の再現性の話であり、確認なしで800件即時削除できる構造そのものは何も変わらない。'
      ]
    },
    en: {
      scenario: 'A retail company’s internal data-cleanup agent, while consolidating duplicate records, called the delete_records tool and mistakenly deleted about 800 production customer records. Fortunately they were restored from the previous night’s backup. In the postmortem, the PM is pushing the conclusion that “the model decided to delete on its own — hardening the prohibition in the system prompt is our recurrence prevention.” The delete_records tool immediately erases every record matching its conditions, with no confirmation step and no cap on deletion count.',
      question: 'Which approach to preventing recurrence is most appropriate?',
      options: [
        'State “never perform delete operations” in the system prompt and rely on the model’s judgment to prevent deletion',
        'Add a warning to the delete_records description: “exercise extreme caution when using this tool”',
        'What actually executed the deletion was the application implementing the tool. Since the model can only issue requests, guards for destructive operations — human confirmation, deletion-count caps, permission checks — belong in the executing application layer',
        'Pin the model version so behavior changes from updates cannot occur'
      ],
      explanations: [
        'Prompt instructions are one best-effort layer that long conversations or confusing contexts can defeat. Prevention would still hinge entirely on model judgment.',
        'A warning in the description is likewise a request to the model, not a guard with the power to stop execution.',
        'Correct. The decisive question is who executed. The model only emits a tool_use request; the app performed the deletion. Barriers against irreversible operations — confirmation, caps, permissions — therefore belong on the executing side.',
        'Version pinning is about reproducibility; the structure that allows an unconfirmed, instant 800-record deletion remains untouched.'
      ]
    }
  },
  {
    id: 'tl2-025', domain: 'tool', answer: 0,
    ja: {
      scenario: '広告代理店のデータ分析チームが、社内アナリスト向けにquery_databaseツールを提供している。ツールはsqlという自由文字列の引数を受け取り、渡されたSQLをそのまま分析DBで実行する設計で、柔軟さから利用者に好評だった。ある日、アナリストの「先月分のデータがおかしいので消して集計し直して」という依頼に対し、モデルがDELETE文を組み立てて実行しようとした。今回はDBアカウントの権限エラーで偶然止まったが、チーム内で設計の見直しが始まった。分析クエリのパターンは月次売上・キャンペーン効果など10種類程度に集約されることも分かった。',
      question: '設計の見直しとして最も適切なものはどれか。',
      options: [
        '自由なSQL文字列を受け取る設計をやめ、get_monthly_sales(month)のような目的別ツールに分割し、SQL本体はパラメータ化されたテンプレートとして固定して引数の値だけを渡させる',
        'システムプロンプトに「SELECT文以外のSQLは生成しないこと」という指示を追加する',
        '実行前にsql引数を正規表現で検査し、DELETEやDROPなどの危険な語を含むクエリを拒否する',
        '1回のクエリで返せる行数に上限を設け、誤操作時の影響範囲を小さくする'
      ],
      explanations: [
        '正解。決め手は「クエリパターンが10種類程度に集約される」こと。SQLをテンプレートとして固定し引数だけを受ければ、モデルが構文を組み立てる余地そのものがなくなり、危険な文が構造的に発行できなくなる。',
        'プロンプト指示はベストエフォートで、今回のような依頼文脈では再び破られうる。生成の自由度が残る限り根本解決にならない。',
        '語のブロックリストはサブクエリ・コメント・別構文などで迂回されうる対症療法。守るべき境界の位置がクエリ生成の後ろにあるのが弱点。',
        '行数上限は読み取り結果の量の話であり、破壊的な書き込み系クエリの発行自体は防げない。'
      ]
    },
    en: {
      scenario: 'An ad agency’s data analysis team provides a query_database tool for in-house analysts. The tool takes a free-form sql string argument and executes it directly against the analytics DB — flexibility that made it popular. One day, responding to an analyst’s request to “delete last month’s data since it looks wrong, and re-aggregate,” the model constructed a DELETE statement and tried to run it. It happened to be stopped by a permissions error on the DB account, but a design review began. The team also found that analytics queries cluster into about ten patterns — monthly sales, campaign performance, and so on.',
      question: 'Which design revision is most appropriate?',
      options: [
        'Stop accepting free-form SQL; split into purpose-built tools like get_monthly_sales(month), fixing the SQL as parameterized templates so only argument values are passed in',
        'Add a system-prompt instruction: “never generate any SQL other than SELECT statements”',
        'Inspect the sql argument with regexes before execution and reject queries containing dangerous words like DELETE or DROP',
        'Cap the number of rows a single query can return to shrink the blast radius of mistakes'
      ],
      explanations: [
        'Correct. The decisive detail is that queries cluster into about ten patterns. With SQL fixed as parameterized templates and only argument values accepted, the model has no syntax-building surface left — dangerous statements become structurally impossible.',
        'Prompt instructions are best-effort and can be defeated again by request contexts like this one. As long as generation freedom remains, it is no root fix.',
        'Keyword blocklists are a symptomatic fix, bypassable via subqueries, comments, or alternate syntax. The guard sits after query generation — the wrong side of the boundary.',
        'A row cap addresses read-result volume; it does nothing to prevent issuing destructive write queries.'
      ]
    }
  },
  {
    id: 'tl2-026', domain: 'tool', answer: 1,
    ja: {
      scenario: '人材サービス企業の週次レポートエージェントは、candidates・jobs・placementsの3テーブルをSELECTして集計レポートを作る。ツールはパラメータ化済みで自由なSQLは受け付けず、これまで誤動作の報告もない。ところが年次のセキュリティ監査で、ツールがDBに接続する際のアカウントが、システム移行時に流用された管理者相当のもので、全テーブルへの読み書きとスキーマ変更まで可能な権限を持っていることが指摘された。開発チームには「ツール側が安全なら接続権限は問題にならないのでは」という声もある。',
      question: 'この指摘への対応として最も適切なものはどれか。',
      options: [
        'ツールのdescriptionに「このツールは読み取り専用である」と明記する',
        '接続に使うDBアカウントを、必要な3テーブルへのSELECT権限のみを持つ最小権限のロールに切り替える',
        '全クエリの監査ログを保存し、書き込み系クエリを検知したらアラートを送る仕組みを整備する',
        'ツールはパラメータ化済みで自由SQLを受けないため、リスクは既に解消されていると監査に回答する'
      ],
      explanations: [
        'descriptionはモデルへの説明であって、権限を制限する力はない。ツールの実装や設定に不備が生じた瞬間、何も守ってくれない。',
        '正解。決め手は「読むだけの用途に管理者相当の接続権限」というギャップ。ツール側の安全策と独立して、実行主体の権限を必要最小限に絞るのが多層防御の原則で、実装のバグや将来の変更が事故に化ける経路を断てる。',
        '監査ログとアラートは事後検知の仕組みであり、被害の発生自体を防がない。予防的統制の代わりにはならない。',
        '現状のツールが安全でも、権限が過大なら実装変更・脆弱性・設定ミスの一つで全テーブル操作が可能になる。防御をツール1層に依存する回答は監査指摘の趣旨を外している。'
      ]
    },
    en: {
      scenario: 'A staffing company’s weekly report agent runs SELECTs against three tables — candidates, jobs, placements — to build summary reports. The tool is fully parameterized, accepts no free-form SQL, and has no history of misbehavior. An annual security audit, however, flagged that the DB account the tool connects with was carried over from a system migration and is administrator-grade: read-write on every table plus schema changes. Some on the dev team argue that “if the tool side is safe, the connection privileges should not matter.”',
      question: 'Which response to this finding is most appropriate?',
      options: [
        'State clearly in the tool description that “this tool is read-only”',
        'Switch the connecting DB account to a least-privilege role holding only SELECT on the three required tables',
        'Retain audit logs of all queries and build alerting that fires when a write-type query is detected',
        'Reply to the audit that the risk is already resolved because the tool is parameterized and accepts no free-form SQL'
      ],
      explanations: [
        'A description informs the model; it has no power to restrict privileges. The moment the implementation or configuration slips, it protects nothing.',
        'Correct. The decisive gap is administrator-grade credentials for a read-only workload. Independent of tool-side safeguards, narrowing the executing principal to least privilege is the defense-in-depth principle — it severs the path by which a bug or future change becomes an incident.',
        'Audit logs and alerts are detective controls; they do not prevent damage from occurring and cannot substitute for preventive control.',
        'Even if the tool is safe today, oversized privileges mean one implementation change, vulnerability, or misconfiguration away from full-table access. Resting the defense on a single tool layer misses the point of the finding.'
      ]
    }
  },
  {
    id: 'tl2-027', domain: 'tool', answer: 2,
    ja: {
      scenario: '旅行予約エージェントのbook_hotelツールは、外部の予約APIを呼び出して部屋を確保する。海外ホテルとの通信は不安定なことがあり、アプリはタイムアウト時に同じ呼び出しを自動リトライする実装になっている。ある利用者の予約で、1回目の呼び出しがタイムアウト後に実はサーバー側で成立しており、リトライによって同じ部屋が二重に予約され、クレジットカードにも二重請求が発生した。カスタマーサポートへのクレームで発覚し、返金対応となった。リトライ自体は通信不安定への対策として必要だという認識でチームは一致している。',
      question: 'この問題の修正として最も適切なものはどれか。',
      options: [
        'タイムアウト値を現在の3倍に延長し、タイムアウト自体の発生頻度を下げる',
        '自動リトライを廃止し、失敗時はユーザーに手動での再実行を依頼する',
        '予約リクエストにクライアント側で生成する冪等キー（リクエストID）を持たせ、同一キーの再実行では新規予約を作らず前回の結果を返す設計に変える',
        '予約実行の前にsearch_reservationsで既存予約を確認するステップを踏むよう、モデルに指示を追加する'
      ],
      explanations: [
        'タイムアウト延長は発生頻度を下げるだけで、「タイムアウト後に実は成立していた」という根本の不確定性は残り続ける。',
        'リトライ廃止は通信不安定への耐性を捨てる後退であり、チームが必要と合意している要件とも矛盾する。手動再実行でも同じ二重予約は起こりうる。',
        '正解。決め手は「1回目が実は成立していた」こと。結果が不明なまま再実行しても安全であるためには操作自体を冪等にする必要があり、冪等キーによる重複排除はリトライを維持したまま二重予約を構造的に不可能にする。',
        '確認ステップはモデルへの指示というベストエフォートに依存するうえ、確認と予約の間に成立が反映される競合状態を防げない。'
      ]
    },
    en: {
      scenario: 'A travel booking agent’s book_hotel tool calls an external reservation API to secure rooms. Connections to overseas hotels can be flaky, so the app automatically retries the same call on timeout. For one customer, the first call timed out but had in fact succeeded on the server side; the retry booked the same room twice and the credit card was double-charged. The issue surfaced through a customer support complaint and ended in a refund. The team agrees that retrying itself is necessary to cope with the unstable connections.',
      question: 'Which fix is most appropriate for this problem?',
      options: [
        'Triple the timeout value to reduce how often timeouts occur in the first place',
        'Remove automatic retries and ask users to manually re-run failed bookings',
        'Attach a client-generated idempotency key (request ID) to booking requests, so re-execution with the same key returns the previous result instead of creating a new reservation',
        'Instruct the model to first call search_reservations to check for an existing booking before executing a reservation'
      ],
      explanations: [
        'A longer timeout only reduces frequency; the fundamental uncertainty — a call that succeeded after appearing to time out — remains.',
        'Dropping retries abandons resilience to flaky connections and contradicts the requirement the team already agreed on. Manual re-runs can produce the same double booking.',
        'Correct. The decisive detail is that the first call had actually succeeded. To make re-execution safe when the outcome is unknown, the operation itself must be idempotent; key-based deduplication keeps retries while making double bookings structurally impossible.',
        'A check step relies on best-effort model instructions and cannot close the race window between the check and the booking.'
      ]
    }
  }
);
