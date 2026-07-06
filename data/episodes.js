/* 音声学習エピソード。追加時はこの配列に1エントリ足し、audio/ にmp3を置く。
   style: 'dialogue'（対話・2人） or 'solo'（一人語り）
   script: 読みながら聞く用の台本。speaker は dialogue のときのみ表示に使う */
window.EPISODES = [
  {
    id: 'ep002',
    date: '2026-07-06',
    style: 'solo',
    topic: { ja: 'stop_reason とツールループの終了判定', en: 'stop_reason: ending the tool-use loop' },
    summary: {
      ja: 'ツール実行ループはどこで終わらせるか。content[0] がテキストかどうかで判定してはいけない理由。',
      en: 'When is the tool-use loop actually done? Why checking content[0] is a trap.'
    },
    audio: { ja: 'audio/ep002-stopreason-ja.mp3', en: 'audio/ep002-stopreason-en.mp3' },
    duration: { ja: 109, en: 70 },
    script: {
      ja: [
        { s: '', t: 'こんにちは。今日も1テーマ、CCA-Fのポイントを一緒に確認していきましょう。今日のテーマは、stop_reason。ツール実行ループを、どこで終わらせるか、という話です。' },
        { s: '', t: 'まず、場面を想像してください。市場調査エージェントが、複数のツールを使って、消費者トレンドを分析しています。開発者は、応答の最初のコンテンツブロックがテキストだったら、もう分析は終わった、と見なして、ループを抜ける実装にしました。ところが、分析が完了する前に、頻繁に止まってしまいます。なぜでしょうか。' },
        { s: '', t: '実は、Claudeのひとつの応答には、複数のコンテンツブロックが入ることがあります。たとえば、「まず市場データを確認します」というテキストのあとに、tool_use のブロックが続く、ということが普通にあるんです。つまりこの状態は、最終回答ではなくて、「テキストを添えて、これからツールを呼ぼうとしている」ところ。ここでループを抜けると、分析が途中で止まってしまいます。' },
        { s: '', t: '正しい終了条件は、stop_reason を見ることです。stop_reason が tool_use の間は、テキストがあっても、ツール実行を続ける。end_turn になったら、そこで初めて、ターン完了です。' },
        { s: '', t: 'ちなみに、temperature を調整する、という選択肢が出てきたら、それは引っかけです。temperature は出力のランダム性を変えるだけで、制御フローの解決策にはなりません。' },
        { s: '', t: '最後にもう一度。ループの終了判定は、コンテンツブロックの先頭ではなく、stop_reason。end_turn で終わる。ここだけ持ち帰ってください。それでは、また次回。' }
      ],
      en: [
        { s: '', t: 'Hello, and welcome back. One topic today: stop reason. How do you know when your tool-use loop is actually done?' },
        { s: '', t: 'Picture this. A market research agent uses several tools to analyze consumer trends. The developer ends the loop whenever the first content block in the response is text. And the analysis keeps stopping halfway. Why?' },
        { s: '', t: 'Because a single response from Claude can contain multiple content blocks. A text block like "let me check the market data first" can be followed by a tool_use block in the same response. So checking the first block tells you nothing about whether Claude is finished.' },
        { s: '', t: 'The correct signal is the stop_reason field. While stop_reason says tool_use, keep executing tools and returning results, even if there is text. Only when it says end_turn is the turn complete.' },
        { s: '', t: "And if an option suggests raising the temperature to suppress extra text, that's a trap. Temperature controls randomness, not control flow." },
        { s: '', t: "One more time. Don't check the first content block. Check the stop_reason, and stop on end_turn. That's your takeaway. See you next time." }
      ]
    }
  },
  {
    id: 'ep001',
    date: '2026-07-06',
    style: 'dialogue',
    topic: { ja: 'Message Batches API', en: 'Message Batches API' },
    summary: {
      ja: '大量リクエストの非同期一括処理。50%オフの条件と、custom_id 突合・非対応プラットフォームの引っかけ。',
      en: 'Async bulk processing at 50% off: the latency trade-off, custom_id matching, and platform traps.'
    },
    audio: { ja: 'audio/ep001-batches-ja.mp3', en: 'audio/ep001-batches-en.mp3' },
    duration: { ja: 95, en: 49 },
    script: {
      ja: [
        { s: 'ホスト', t: 'こんにちは。CCA-F対策ポッドキャスト。今日のテーマは、Message Batches API です。これ、試験でよく出るんですよね。' },
        { s: '解説', t: 'はい、頻出です。一言でいうと、大量のリクエストをまとめて非同期処理する仕組みです。1件ずつではなく、一括で投げて、あとで結果を回収します。' },
        { s: 'ホスト', t: '具体的には、どんな場面で使うんですか。' },
        { s: '解説', t: '例えば、10万件のカスタマーレビューを分類したいとき。急がない大量処理ですね。その代わり、即時応答はしません。多くは1時間以内ですが、最大24時間かかります。' },
        { s: 'ホスト', t: '待つ代わりに、何かいいことがあるんですか。' },
        { s: '解説', t: 'コストが50%オフになります。ここが試験のポイントで、レイテンシを犠牲にして、コストを半分にする。このトレードオフを覚えてください。' },
        { s: 'ホスト', t: '引っかけポイントはありますか。' },
        { s: '解説', t: '2つあります。1つ目。結果は、投げた順には返ってきません。だから、custom_id で突き合わせます。位置で対応づけたら誤りです。2つ目。Amazon Bedrock と Google Vertex AI では使えません。Anthropic直のAPI、つまりファーストパーティAPIだけです。' },
        { s: 'ホスト', t: 'なるほど。では今日のまとめ。バッチは、安いけど待つ。結果は custom_id で突合。次回もお楽しみに。' }
      ],
      en: [
        { s: 'Host', t: "Welcome back to your CCA-F study podcast. Today's topic: the Message Batches API." },
        { s: 'Expert', t: "The key idea is simple. You send a large number of requests as one batch, and collect the results later. It's asynchronous." },
        { s: 'Host', t: "And what's the trade-off?" },
        { s: 'Expert', t: 'You give up latency, and in return, you get a fifty percent discount. Most batches finish within an hour, but they can take up to twenty-four hours.' },
        { s: 'Host', t: 'Any exam traps we should watch for?' },
        { s: 'Expert', t: "Two big ones. First, results don't come back in order, so always match them by custom_id. Second, batches are not supported on Amazon Bedrock or Google Vertex AI. First-party API only." },
        { s: 'Host', t: 'So remember: cheaper, but slower. And always match by custom_id. See you next time.' }
      ]
    }
  }
];
