// CCA-F domain: prompt (Prompt Engineering & Structured Output) — advanced 10 questions
window.QUESTIONS.push(
  {
    id:'pr-adv-001', domain:'prompt', answer:0, level:'advanced',
    ja:{
      scenario:'法務チームが、契約書PDFから「自動更新条項の有無」を抽出するのにClaudeを使っている。現在のプロンプトは「更新に関係しそうな箇所を広く拾って報告」で、再現率（Recall）は高いが、無関係な条項まで大量に拾い（偽陽性）、レビュー担当が精査に追われている。適合率（Precision）を上げ、過剰抽出を減らすのに最も効果的なプロンプト/設計変更はどれか？',
      question:'最も効果的なのは？',
      options:['抽出条件を「契約期間の自動的な延長・更新を明示的に定める条項のみ」と客観基準で限定し、該当箇所の根拠文を併記させる','各抽出に1〜10の確信度をモデルに自己採点させ、アプリ側で7未満を機械的に捨てる','temperatureを上げて多様な候補を多めに出させ、人手で取捨選択する','一度広く拾わせたあと、同じプロンプトでもう一度全文を読み直させて重複を消す'],
      explanations:['抽出対象を「明示的に定める条項のみ」と客観基準で限定し根拠文を併記させる＝偽陽性を構造的に減らしPrecisionを上げる正攻法。','LLMの自己採点スコアは校正（Calibration）されておらず、閾値で切っても偽陽性が確実に減る保証はない。複雑化する割に効果が不確実。','temperatureを上げると候補のばらつきが増え、過剰抽出（偽陽性）はむしろ悪化する。Precision向上の手段ではない。','同じ曖昧な基準で再読しても抽出基準は変わらず偽陽性は減らない。重複削除はPrecisionの本質ではない。']
    },
    en:{
      scenario:'A legal team uses Claude to extract "whether an auto-renewal clause exists" from contract PDFs. The current prompt says "broadly capture anything that might relate to renewal," giving high recall but also capturing many irrelevant clauses (false positives), exhausting reviewers. Which prompt/design change is most effective to raise precision and cut over-extraction?',
      question:'Which is most effective?',
      options:['Limit the criterion to "only clauses that explicitly stipulate automatic extension/renewal of the contract term," and require the supporting sentence to be cited','Have the model self-score each extraction 1-10 for confidence and mechanically drop anything below 7 in the app','Raise temperature to generate more diverse candidates and let humans select','Capture broadly once, then re-read the whole document with the same prompt to remove duplicates'],
      explanations:['Restricting the target with an objective criterion ("explicitly stipulates") and requiring a cited basis structurally cuts false positives and raises precision — the right approach.','LLM self-scored confidence is not calibrated, so thresholding gives no guarantee of removing false positives; more complexity, uncertain effect.','Higher temperature increases candidate variance and worsens over-extraction; not a precision lever.','Re-reading with the same vague criterion does not change what gets extracted; dedup is not the core of precision.']
    }
  },
  {
    id:'pr-adv-002', domain:'prompt', answer:2, level:'advanced',
    ja:{
      scenario:'医療事務の問い合わせ分類で、Claudeに「緊急/通常/情報照会」のいずれかを返させている。ところが下流のルーティング処理が、モデルが返す表記ゆれ（「緊急です」「至急」「URGENT」「緊急対応」など）に追従できず、未知ラベルが来るたびに例外で落ちている。約12%のリクエストがフォールバック行きになっており、これを最小化したい。',
      question:'最も確実にラベルの安定性を担保できる設計は？',
      options:['プロンプトに「必ず3カテゴリのどれかで答えて」と強い禁止文を太字で何度も書き、表記を守らせる','分類精度が足りないと判断し、自社データでfine-tuningして専用分類モデルを作る','出力をJSON schemaで定義し、ラベルフィールドをenum（緊急/通常/情報照会）で固定して、検証に失敗したら再試行（retry）する','temperatureを0に下げて出力を決定的にし、表記ゆれが起きないようにする'],
      explanations:['自然言語の念押しは強制力がなく、表記ゆれや未知ラベルが確率的に残る。検証ゲートがないので落ち続ける。','fine-tuningは表記ゆれ問題に対して過剰投資で、出力契約の固定なしでは依然として表記ゆれが起こり得る。本質を外している。','enumで取りうる値を固定し、検証失敗時にretryするのが構造化出力の契約。下流が受け取る値の集合が保証され、未知ラベルが構造的に排除される。','temperature=0は再現性を上げるが、許容ラベル集合を制約しないため別表記（「至急」等）は依然出る。enum契約の代替にはならない。']
    },
    en:{
      scenario:'For a medical-office inquiry classifier, Claude returns one of "urgent / normal / info-request". But the downstream router cannot keep up with label variants the model emits ("it is urgent", "ASAP", "URGENT", "urgent handling"), and crashes on each unknown label. About 12% of requests fall back, and you want to minimize that.',
      question:'Which design most reliably guarantees label stability?',
      options:['Bold and repeat a strong prohibition in the prompt: "you MUST answer with exactly one of the 3 categories"','Decide accuracy is insufficient and fine-tune a dedicated classifier on your own data','Define the output as a JSON schema, fix the label field as an enum (urgent/normal/info-request), and retry on validation failure','Lower temperature to 0 so the output is deterministic and no variants occur'],
      explanations:['Natural-language insistence has no enforcement; variants and unknown labels remain probabilistically. Without a validation gate it keeps crashing.','Fine-tuning is overkill for a formatting problem and, without a fixed output contract, variants can still appear. It misses the point.','Fixing the allowed values with an enum and retrying on validation failure is the structured-output contract. The downstream value set is guaranteed and unknown labels are structurally excluded.','temperature=0 improves reproducibility but does not constrain the allowed label set, so variants ("ASAP", etc.) still appear. Not a substitute for the enum contract.']
    }
  },
  {
    id:'pr-adv-003', domain:'prompt', answer:1, level:'advanced',
    ja:{
      scenario:'与信審査の補助で、申込書の自由記述からリスク要因を抽出し、最終的に「承認推奨/要確認/否決推奨」をJSONで返すパイプラインを作っている。判断の質を上げるためモデルに段階的推論（chain-of-thought, CoT）をさせたいが、下流の自動処理は厳密なJSONしか受け付けず、思考の地の文が混ざると検証（validation）が壊れる。CoTの恩恵を得つつ下流を壊さない設計はどれか？',
      question:'最も適切な設計は？',
      options:['JSON本文の中に reasoning という長文フィールドを必須で持たせ、そこに思考過程を全部書かせて下流もそれを読む','モデルには内部で段階的に考えさせるが、最終出力はschemaで定義した構造化フィールド（判定・根拠リスト）だけにし、思考の地の文は出力に含めない','下流が壊れるのでCoTは諦め、推論なしの一発回答に切り替える','思考過程を出させたうえで、正規表現で最後のJSONらしき部分だけを後から切り出す'],
      explanations:['推論文を必須フィールドに丸ごと載せると下流が長文を毎回受け取り、契約が肥大化・不安定化する。構造化の意図に反する。','CoTは内部で行わせ、下流へは構造化フィールドだけを渡すのが正解。推論の質を得つつ、地の文の混入で検証が壊れる問題を構造的に断つ。','CoTを丸ごと捨てると判断品質が落ちる。下流互換のためにモデル側の推論能力を犠牲にしており、論点を取り違えている。','地の文＋正規表現切り出しは崩れやすく、構造化出力の信頼性を後付けパースに依存させる退行。schema契約の代替にならない。']
    },
    en:{
      scenario:'For credit-screening assistance, you extract risk factors from free-text applications and finally return "recommend-approve / needs-review / recommend-deny" as JSON. You want the model to do step-by-step reasoning (chain-of-thought, CoT) to improve quality, but the downstream automation accepts only strict JSON and breaks validation if reasoning prose leaks in. Which design keeps CoT benefits without breaking downstream?',
      question:'Which design is most appropriate?',
      options:['Add a required "reasoning" long-text field inside the JSON, put all the reasoning there, and have downstream read it too','Let the model reason step-by-step internally, but make the final output only the schema-defined structured fields (verdict, list of reasons), excluding reasoning prose','Give up on CoT since downstream breaks, and switch to a single-shot answer with no reasoning','Let it emit the reasoning, then regex-extract only the trailing JSON-looking part afterward'],
      explanations:['Putting the whole reasoning into a required field forces downstream to receive long text every time, bloating and destabilizing the contract — against the intent of structuring.','Reasoning internally and passing only structured fields downstream is correct: you get reasoning quality while structurally preventing prose from breaking validation.','Dropping CoT entirely degrades decision quality; sacrificing the model’s reasoning for downstream compatibility misframes the problem.','Prose + regex extraction is fragile and makes structured-output reliability depend on post-hoc parsing — a regression, not a substitute for a schema contract.']
    }
  },
  {
    id:'pr-adv-004', domain:'prompt', answer:3, level:'advanced',
    ja:{
      scenario:'社内ポリシーQ&Aボットを運用していて、回答の事実誤り（ハルシネーション）が月に数件報告され、信頼を損ねている。原因を調べると、規程に書かれていない事柄をもっともらしく作文しているケースが多い。回答の事実性を上げ、根拠のない断定を減らしたい。',
      question:'最も効果的な対策は？',
      options:['プロンプトに「絶対にハルシネーションするな」「嘘をつくな」と強い禁止文を追加する','temperatureを下げて出力を保守的にし、断定を減らす','回答を一度生成させたあと、同じモデルに「この回答は正しいか？」と自己検証させて合否を返させる','取得した社内規程の該当箇所をコンテキストに渡し（grounding）、回答には必ず出典（参照した条文）を併記させ、規程に根拠がなければ「規程に記載なし」と答えさせる'],
      explanations:['「嘘をつくな」という禁止文だけでは、モデルは何が根拠かを与えられておらず、依然として作文できる。根拠の供給という本質に触れていない。','temperatureを下げても、根拠を与えなければ事実誤りの根は残る。出力のランダム性低減は事実性の保証にならない。','同じモデルの自己検証は同じ知識・同じ思い込みに依存し、ハルシネーションを見逃しやすい（校正もされない）。独立した根拠の供給がない。','根拠文書をコンテキストに渡すgroundingと出典併記、根拠が無ければ「記載なし」と答えさせる設計が、根拠のない断定を構造的に抑え事実性を上げる正攻法。']
    },
    en:{
      scenario:'You run an internal-policy Q&A bot, and a few factual errors (hallucinations) are reported monthly, eroding trust. Investigation shows it often plausibly fabricates things not actually written in the policies. You want higher factuality and fewer unsupported assertions.',
      question:'Which is the most effective measure?',
      options:['Add strong prohibitions to the prompt: "never hallucinate", "do not lie"','Lower temperature to make output conservative and reduce assertions','Generate the answer once, then have the same model self-verify "is this answer correct?" and return pass/fail','Pass the relevant retrieved policy passages into context (grounding), require the answer to cite its source (the referenced clause), and answer "not stated in policy" when there is no basis'],
      explanations:['A "do not lie" prohibition alone gives the model no grounds for what is true, so it can still fabricate. It does not address supplying evidence.','Lowering temperature without supplying evidence leaves the root of factual error; reducing randomness does not guarantee factuality.','Self-verification by the same model relies on the same knowledge and biases and easily misses hallucinations (and is uncalibrated). No independent evidence is supplied.','Grounding by passing source passages into context, requiring citations, and answering "not stated" when unsupported structurally suppresses unsupported assertions and raises factuality — the right approach.']
    }
  },
  {
    id:'pr-adv-005', domain:'prompt', answer:2, level:'advanced',
    ja:{
      scenario:'プロンプトを改善した。具体的には抽出基準の言い換えと出力schemaの締め直しを行い、手元の5件のサンプルでは明らかに良くなった「気がする」。チームは本番投入したがっているが、過去にも「サンプルでは良いが本番で悪化」を経験している。変更の効果を正しく判断する方法はどれか？',
      question:'最も妥当な進め方は？',
      options:['本番の少数トラフィックに先行投入し、現場の体感で良くなったか判断する','5件で良くなったので根拠は十分。そのまま全面展開する','正解ラベル付きの評価セット（eval）で、旧プロンプトと新プロンプトの精度（Precision/Recall等）を同一データで比較してから判断する','モデルに「前のプロンプトと今のプロンプト、どちらが良い？」と聞いて多数決を取る'],
      explanations:['少数の現場体感は主観的でサンプルバイアスが大きく、Precision/Recallの変化を定量化できない。回帰を見落とす。','5件は統計的に不十分でサンプルバイアスが強い。「良くなった気がする」を根拠に全面展開するのは、過去に失敗した進め方そのもの。','固定の評価セット（eval）で旧新を同一データ・同一指標で比較するのが、変更の効果を定量的に切り分ける正攻法。回帰検知もできる。','モデル自身の好み投票は校正されておらず、正解ラベルに対する精度を測っていない。客観的な効果測定にならない。']
    },
    en:{
      scenario:'You improved a prompt — specifically you reworded the extraction criteria and tightened the output schema, and on your 5 hand-picked samples it "feels" clearly better. The team wants to ship it, but you have previously seen "good on samples, worse in production". How do you correctly judge the change’s effect?',
      question:'Which is the most sound approach?',
      options:['Ship to a small slice of production first and judge by how it feels on the ground','Five samples improving is enough evidence; roll out to everything as-is','Compare old vs new prompt accuracy (precision/recall, etc.) on the same labeled evaluation set (eval) before deciding','Ask the model "which is better, the old or new prompt?" and take a majority vote'],
      explanations:['Small-scale gut feel is subjective with heavy sample bias and cannot quantify precision/recall changes; regressions get missed.','Five samples is statistically insufficient with strong sample bias; rolling out on a "feels better" basis is exactly the approach that failed before.','Comparing old vs new on a fixed eval set with the same data and metrics is the right way to quantitatively isolate the effect, and it detects regressions.','The model’s preference vote is uncalibrated and does not measure accuracy against ground truth; it is not objective effect measurement.']
    }
  },
  {
    id:'pr-adv-006', domain:'prompt', answer:0, level:'advanced',
    ja:{
      scenario:'数値計算を含む財務サマリー生成で、Claudeの回答の数字がときどき微妙にズレる。チームの一人が「temperatureを0に、top-pも絞れば計算が正確になるはず」と主張している。実際、出力は決定的になったが、計算誤り自体は残っている。根本的に取り組むべき論点はどれか？',
      question:'最も適切な理解・対処は？',
      options:['decoding param(temperature/top-p)は出力のランダム性を制御するだけで計算の正しさは保証しない。数値はモデルに暗算させず、計算はコード/ツールで行わせ、結果だけを構造化出力に載せる','top-pをさらに下げれば計算は厳密になるので、0.1まで絞って様子を見る','temperatureを少し上げて、複数回生成した数字の多数決を取れば精度が上がる','計算が苦手なのはモデルのバージョンが古いせいなので、まず最新版に上げてから考える'],
      explanations:['decoding paramはサンプリングのランダム性を制御するだけで算術の正しさとは無関係。計算はツール/コードに委譲し、モデルには結果の組み立て（構造化出力）だけを任せるのが正攻法。','top-pは候補トークンの確率質量を絞るだけで、算術の正確さを上げる仕組みではない。決定的になっても誤りは残る。','多数決は計算ロジックの誤りを平均化できず、同じ誤りに収束しうる。decoding paramを精度策と取り違えている。','バージョン更新は一般的な改善はありうるが、暗算依存という設計上の根本（ツール委譲をしていない）を放置している。論点ずれ。']
    },
    en:{
      scenario:'In financial-summary generation involving arithmetic, Claude’s numbers are sometimes slightly off. A teammate argues "set temperature to 0 and tighten top-p and the math should be accurate." Indeed the output became deterministic, but the calculation errors remain. What is the fundamental issue to address?',
      question:'Which understanding/fix is most appropriate?',
      options:['Decoding params (temperature/top-p) only control output randomness and do not guarantee arithmetic correctness. Do not have the model do math in its head; perform calculations in code/tools and put only the results into the structured output','Tightening top-p further makes math exact, so drop it to 0.1 and observe','Raise temperature slightly, generate the numbers several times, and take a majority vote to improve accuracy','The model is bad at math because the version is old, so upgrade first and reconsider'],
      explanations:['Decoding params only control sampling randomness, unrelated to arithmetic correctness. Delegating calculation to tools/code and letting the model only assemble the structured result is the right approach.','top-p only narrows the probability mass of candidate tokens; it is not a mechanism for arithmetic accuracy. Even when deterministic, errors persist.','Majority vote cannot average away a flawed calculation path and may converge on the same error; it mistakes a decoding param for an accuracy lever.','A version upgrade may help generally but leaves the design root (relying on mental math, no tool delegation) untouched — off the point.']
    }
  },
  {
    id:'pr-adv-007', domain:'prompt', answer:1, level:'advanced',
    ja:{
      scenario:'レシート画像から店舗名・日付・合計金額・税区分をJSONで抽出するタスク。形式は概ね合っているが、税区分の表現がレシートによって「10%」「軽減8%」「非課税」「課税対象外」など多様で、モデルが毎回違う言い回しに正規化してしまい、下流の集計で値が割れる。few-shotを使う案が出ている。few-shotを最も効果的に使う方法はどれか？',
      question:'最も効果的なfew-shotの使い方は？',
      options:['「正しく分類しろ」という指示文を増やし、example（実例）は付けない','許容する税区分の正規化先（standard/reduced/exempt/out-of-scope）を、入力例→期待JSON出力例のペアで2〜3個示し、出力の形式と正規化のドレ（揺れ）を固定する','大量のレシート全種類を1つのプロンプトに貼り、網羅的に学習させようとする','exampleを毎回ランダムに差し替えて、モデルが多様な表現に慣れるようにする'],
      explanations:['指示文だけでは正規化先の対応関係が曖昧なまま残り、言い回しの揺れ（ドレ）が解消しない。few-shotの効きどころを使っていない。','入力→期待出力のペアを少数示して正規化先と形式を固定するのがfew-shotの正攻法。出力形式の揺れを抑え、税区分を所定の値に収束させられる。','全種類を網羅的に貼るのは過剰でコンテキストを浪費し、prompt cachingも効かせにくい。少数の代表例で十分に形式は固定できる。','exampleを毎回差し替えると正規化先が安定せず、揺れがむしろ増える。形式ドレ防止という目的に逆行する。']
    },
    en:{
      scenario:'You extract store name, date, total, and tax category as JSON from receipt images. The format is mostly right, but the tax category is expressed many ways across receipts ("10%", "reduced 8%", "tax-exempt", "out of scope"), and the model normalizes it differently each time, splitting values in downstream aggregation. Someone proposes few-shot. How do you use few-shot most effectively?',
      question:'Which is the most effective use of few-shot?',
      options:['Add more "classify correctly" instruction text and include no examples','Show 2-3 input-example → expected-JSON-output pairs that fix the allowed normalized tax categories (standard/reduced/exempt/out-of-scope), pinning both output format and normalization drift','Paste every kind of receipt into one prompt to learn comprehensively','Swap the examples randomly each time so the model gets used to diverse expressions'],
      explanations:['Instructions alone leave the normalization mapping ambiguous and do not resolve phrasing drift; this misses what few-shot is good at.','Showing a few input→expected-output pairs to fix the normalized targets and format is the right use of few-shot; it suppresses format drift and converges the tax category to fixed values.','Pasting every kind is excessive, wastes context, and makes prompt caching harder; a few representative examples are enough to fix the format.','Swapping examples each time destabilizes the normalized targets and increases drift — counter to the goal of preventing format drift.']
    }
  },
  {
    id:'pr-adv-008', domain:'prompt', answer:3, level:'advanced',
    ja:{
      scenario:'サポート問い合わせから「①感情（肯定/中立/否定）②要望カテゴリ ③解約リスク（高/中/低）」を一括抽出してダッシュボードに流している。プロダクト側から「解約リスク高で抽出された件のうち、実際に解約に至るのは少ない。リスク高をもっと厳しく絞れないか」と要望が来た。これは指標で言うと何の改善要求で、どう設計に落とすのが妥当か？',
      question:'最も妥当な解釈と対処は？',
      options:['再現率（Recall）が低いという要求なので、リスク高に該当させる条件を緩めて取りこぼしを減らす','偽陰性を減らす要求なので、迷ったらリスク高に倒すよう指示する','解約リスクは主観なので指標化できない。プロンプトに「正確に」と書いて運用で吸収する','適合率（Precision）を上げる要求（偽陽性を減らす）。リスク高の定義を「直近の明示的な解約意思表明や競合移行の言及」など客観条件に厳格化し、評価セット（eval）で旧新のPrecisionを比較して効果を確認する'],
      explanations:['「実際に解約する人が少ないのに高と出すのを減らせ」は偽陽性の削減＝Precision向上の要求。Recallを上げる方向は逆で、過剰抽出が悪化する。','迷ったら高に倒すのは偽陽性を増やしPrecisionを下げる。要望と真逆で、論点を取り違えている。','解約リスクは正解ラベル（実際に解約したか）で評価可能であり、指標化できる。「正確に」の念押しは強制力がなく改善を測れない。','要望の本質は偽陽性削減＝Precision向上。リスク高の定義を客観条件に厳格化し、evalで旧新のPrecisionを比較して効果を定量確認するのが正攻法。']
    },
    en:{
      scenario:'From support inquiries you jointly extract (1) sentiment (positive/neutral/negative), (2) request category, and (3) churn risk (high/med/low) into a dashboard. Product says: "Of the items flagged high churn risk, few actually churn. Can you make high-risk much stricter?" In metric terms, what is this asking for, and how should it be designed?',
      question:'Which is the most sound interpretation and fix?',
      options:['It asks for low recall, so loosen the conditions for high-risk to reduce misses','It asks to reduce false negatives, so instruct it to lean toward high-risk when unsure','Churn risk is subjective and cannot be made into a metric; write "accurately" in the prompt and absorb it operationally','It asks to raise precision (reduce false positives). Tighten the high-risk definition to objective conditions like "an explicit recent statement of intent to cancel or mention of switching to a competitor," and compare old vs new precision on an evaluation set (eval) to confirm the effect'],
      explanations:['"Flagging high when few actually churn — reduce that" is false-positive reduction = a precision request. Raising recall is the opposite and worsens over-flagging.','Leaning toward high when unsure increases false positives and lowers precision — the opposite of the request, misframing the problem.','Churn risk can be evaluated against ground truth (did they actually churn) and is measurable. An "accurately" reminder has no enforcement and cannot measure improvement.','The request is fundamentally false-positive reduction = precision improvement. Tightening the high-risk definition to objective conditions and comparing old vs new precision on an eval is the right approach.']
    }
  },
  {
    id:'pr-adv-009', domain:'prompt', answer:0, level:'advanced',
    ja:{
      scenario:'数千件の論文PDFを毎晩バッチ処理し、各論文から固定schema（タイトル・著者・手法・主要結果）を抽出している。各リクエストには共通の長い指示（抽出ルール・schema説明・few-shot例で約8千トークン）を前置きしており、論文本文だけが毎回変わる。コストが想定より高く、削減したい。同時に出力の形式安定性は落としたくない。',
      question:'最も効果的なコスト削減策は？',
      options:['共通の前置き（指示・schema説明・few-shot例）を prompt caching でキャッシュし、毎回変わる論文本文だけを可変部にする','few-shot例を全部削れば入力が短くなりコストが下がるので、例をゼロにする','schemaの説明文を削って指示を最小化し、出力検証も外して軽くする','temperatureを下げると課金トークンが減るので、temperatureを0にしてコストを下げる'],
      explanations:['固定の長い前置きはprompt cachingで再利用でき、可変の本文だけ毎回送る設計でコストを大きく下げられる。形式安定性に効くfew-shot/schemaは削らずに済む。','few-shotを全削除すると入力は短くなるが、形式ドレ防止が外れて出力の形式安定性が落ちる。要件（安定性を落とさない）に反する。','schema説明や検証を外すと軽くはなるが、構造化出力の信頼性が崩れ、要件に反する。コスト削減の正攻法ではない。','temperatureは出力のランダム性パラメータで課金トークン数とは無関係。コスト削減手段ではない。']
    },
    en:{
      scenario:'You batch-process thousands of paper PDFs nightly, extracting a fixed schema (title, authors, method, key results) from each. Every request prepends the same long instructions (extraction rules, schema description, few-shot examples — about 8k tokens), and only the paper body changes each time. Cost is higher than expected and you want to cut it, without losing output format stability.',
      question:'Which is the most effective cost-reduction measure?',
      options:['Cache the shared prefix (instructions, schema description, few-shot examples) with prompt caching, and keep only the changing paper body as the variable part','Delete all few-shot examples to shorten input and cut cost, going to zero examples','Trim the schema description to minimize instructions and remove output validation to lighten it','Lowering temperature reduces billed tokens, so set temperature to 0 to cut cost'],
      explanations:['A fixed long prefix can be reused via prompt caching, sending only the variable body each time — a large cost cut while keeping the few-shot/schema that drive format stability.','Removing all few-shot shortens input but drops format-drift prevention, reducing output stability — against the requirement.','Trimming schema and removing validation is lighter but collapses structured-output reliability — against the requirement and not the right way to cut cost.','Temperature is an output-randomness parameter unrelated to billed token count; it is not a cost-reduction lever.']
    }
  },
  {
    id:'pr-adv-010', domain:'prompt', answer:2, level:'advanced',
    ja:{
      scenario:'本人確認書類から「氏名・生年月日・住所・有効期限」を抽出するが、書類によっては有効期限が存在しない種類があり、また住所が読み取れず空欄になることもある。現状は全フィールドをrequiredにしており、欠けると、モデルがそれらしい値を捏造（ハルシネーション）して埋めてしまい、検証では弾けない。下流のKYC処理に汚染データが流れている。',
      question:'最も適切なschema/設計は？',
      options:['全フィールドをrequiredのままにし、欠けるときはモデルに「不明」と文字列で埋めさせる','requiredを外して全フィールドをoptionalにし、検証を緩めて何でも通す','必須度に応じてschemaを設計する。氏名・生年月日はrequired、有効期限はnull許容（任意）、読み取れない値はnull／"unreadable"フラグで明示し、捏造させず欠落を欠落として下流に渡す','読み取れない住所はモデルに近隣住所から推測させ、もっともらしい値で必ず埋める'],
      explanations:['「不明」を文字列で埋めると、required検証は通ってしまい欠落を検知できない。値の体裁を保ったまま欠落が隠れ、汚染が続く。','全optional＋検証緩和は、氏名・生年月日のような本来必須の欠落を見逃し、KYCの品質保証ができない。必須度を捨てている。','必須度をschemaで表し（氏名・生年月日required、有効期限はnull許容）、読み取れない値はnull/フラグで明示するのが正解。捏造を防ぎ、欠落を欠落として検証・下流に正しく渡せる。','近隣からの推測で必ず埋めるのは典型的なハルシネーション誘発で、本人確認に致命的な捏造データを生む。最も避けるべき設計。']
    },
    en:{
      scenario:'You extract "name / date of birth / address / expiry date" from identity documents, but some document types have no expiry date, and the address sometimes cannot be read and is blank. Currently all fields are required, so when something is missing the model fabricates (hallucinates) a plausible value to fill it, which validation cannot catch. Contaminated data flows into downstream KYC.',
      question:'Which schema/design is most appropriate?',
      options:['Keep all fields required and have the model fill missing ones with the string "unknown"','Remove required and make all fields optional, loosening validation to pass anything','Design the schema by necessity: name and date of birth required, expiry date nullable (optional), unreadable values explicitly null / flagged "unreadable", passing missingness as missingness downstream without fabrication','Have the model infer an unreadable address from nearby addresses and always fill a plausible value'],
      explanations:['Filling "unknown" as a string passes required validation, so missingness is not detected; it hides under a value-shaped placeholder and contamination continues.','All-optional plus loosened validation misses absence of truly required fields like name and date of birth and cannot guarantee KYC quality; it discards necessity.','Expressing necessity in the schema (name/DOB required, expiry nullable) and marking unreadable values as null/flagged is correct: it prevents fabrication and passes missingness as missingness to validation and downstream.','Always filling by inference from nearby addresses is a textbook hallucination trigger, producing fabricated data that is fatal for identity verification — the design to most avoid.']
    }
  }
);
