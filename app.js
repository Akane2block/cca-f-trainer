/* CCA-F 練習アプリ エンジン
   依存: questions.js が window.QUESTIONS と window.DOMAINS を定義 */
(function () {
  'use strict';

  const Q = window.QUESTIONS || [];
  const DOMAINS = window.DOMAINS; // [{key,ja,en,weight}]
  const DOMAIN_MAP = Object.fromEntries(DOMAINS.map(d => [d.key, d]));
  const GLOSSARY = window.GLOSSARY || [];
  const GLOSSARY_MAP = Object.fromEntries(GLOSSARY.map(g => [g.key, g]));
  const APP_UPDATED_AT = '2026-07-14 00:31';
  const APP_VERSION = '20260714-0031';

  // 問題文に出てくる用語を別名照合で拾う（最大6件）
  function matchTerms(q) {
    const L = q[lang] || q.ja;
    const hay = (L.scenario + ' ' + L.question + ' ' + L.options.join(' ') + ' ' + L.explanations.join(' ')).toLowerCase();
    const hit = [];
    for (const g of GLOSSARY) {
      if ((g.aliases || []).some(a => hay.includes(String(a).toLowerCase()))) hit.push(g);
      if (hit.length >= 6) break;
    }
    return hit;
  }

  // ---- 永続化 ----
  const LS = {
    get(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const PROGRESS_SNAPSHOT_KEY = 'ccaf_progress_snapshot_v1';
  const PROGRESS_HISTORY_KEY = 'ccaf_progress_history_v1';
  const PROGRESS_BACKUPS_KEY = 'ccaf_progress_backups_v2';
  const PROGRESS_LATEST_NONEMPTY_KEY = 'ccaf_progress_latest_nonempty_v1';
  const STATS_KEY = 'ccaf_stats';
  const WRONG_KEY = 'ccaf_wrong';
  const QUESTION_IDS = new Set(Q.map(q => q.id));
  const LEGACY_ID_MAP = {};
  for (let i = 1; i <= 40; i++) LEGACY_ID_MAP['ag-' + String(i).padStart(3, '0')] = 'ag2-' + String(i).padStart(3, '0');
  for (let i = 1; i <= 30; i++) LEGACY_ID_MAP['pr-' + String(i).padStart(3, '0')] = 'pr2-' + String(i).padStart(3, '0');

  let lang = LS.get('ccaf_lang', 'ja');
  let stats = normalizeStats(LS.get(STATS_KEY, {}));      // {domainKey:{correct,total}}
  let wrong = normalizeWrong(LS.get(WRONG_KEY, []));      // [questionId]

  function normalizeStats(value) {
    const out = {};
    if (!value || typeof value !== 'object' || Array.isArray(value)) return out;
    DOMAINS.forEach(d => {
      const s = value[d.key];
      const total = Number(s && s.total);
      const correct = Number(s && s.correct);
      if (Number.isFinite(total) && total > 0) {
        out[d.key] = {
          total: Math.max(0, Math.round(total)),
          correct: Math.max(0, Math.min(Math.round(correct || 0), Math.round(total)))
        };
      }
    });
    return out;
  }

  function normalizeWrong(value) {
    if (!Array.isArray(value)) return [];
    const set = new Set();
    value.forEach(id => {
      const nextId = LEGACY_ID_MAP[id] || id;
      if (QUESTION_IDS.has(nextId)) set.add(nextId);
    });
    return [...set];
  }

  function progressTotal(s) {
    return Object.values(normalizeStats(s)).reduce((sum, row) => sum + row.total, 0);
  }

  function progressCorrect(s) {
    return Object.values(normalizeStats(s)).reduce((sum, row) => sum + row.correct, 0);
  }

  function progressScore(candidate) {
    if (!candidate || typeof candidate !== 'object') return -1;
    return (progressTotal(candidate.stats) * 1000) + normalizeWrong(candidate.wrong).length;
  }

  function snapshotCandidate(label, value) {
    if (!value || typeof value !== 'object') return null;
    return {
      label,
      stats: normalizeStats(value.stats),
      wrong: normalizeWrong(value.wrong)
    };
  }

  function currentRawProgress(label) {
    return {
      label,
      stats: LS.get(STATS_KEY, {}),
      wrong: LS.get(WRONG_KEY, []),
      savedAt: new Date().toISOString(),
      appVersion: APP_VERSION
    };
  }

  function addBackup(candidate) {
    if (progressScore(candidate) <= 0) return;
    const backup = {
      stats: normalizeStats(candidate.stats),
      wrong: normalizeWrong(candidate.wrong),
      correct: progressCorrect(candidate.stats),
      total: progressTotal(candidate.stats),
      savedAt: candidate.savedAt || new Date().toISOString(),
      appVersion: candidate.appVersion || APP_VERSION,
      source: candidate.label || 'backup'
    };
    const existing = LS.get(PROGRESS_BACKUPS_KEY, []);
    const backups = [backup].concat(Array.isArray(existing) ? existing : [])
      .filter((item, idx, arr) => idx === arr.findIndex(x => JSON.stringify(x && x.stats) === JSON.stringify(item && item.stats) && JSON.stringify(x && x.wrong) === JSON.stringify(item && item.wrong)))
      .slice(0, 30);
    LS.set(PROGRESS_BACKUPS_KEY, backups);
    LS.set(PROGRESS_LATEST_NONEMPTY_KEY, backup);
  }

  function backupStoredProgress(label) {
    addBackup(currentRawProgress(label));
  }

  function restoreProgress() {
    const candidates = [
      { label: 'current', stats, wrong },
      snapshotCandidate('snapshot', LS.get(PROGRESS_SNAPSHOT_KEY, null)),
      snapshotCandidate('latest-nonempty', LS.get(PROGRESS_LATEST_NONEMPTY_KEY, null))
    ];
    const history = LS.get(PROGRESS_HISTORY_KEY, []);
    if (Array.isArray(history)) history.forEach((item, idx) => candidates.push(snapshotCandidate('history-' + idx, item)));
    const backups = LS.get(PROGRESS_BACKUPS_KEY, []);
    if (Array.isArray(backups)) backups.forEach((item, idx) => candidates.push(snapshotCandidate('backup-' + idx, item)));

    const best = candidates.filter(Boolean).sort((a, b) => progressScore(b) - progressScore(a))[0];
    if (!best || progressScore(best) <= 0) return;
    if (progressScore(best) > progressScore({ stats, wrong })) {
      stats = best.stats;
      wrong = best.wrong;
    }
  }

  function persistProgress(reason) {
    backupStoredProgress(reason || 'before-save');
    stats = normalizeStats(stats);
    wrong = normalizeWrong(wrong);
    if (progressTotal(stats) <= 0 && wrong.length <= 0) return;
    LS.set(STATS_KEY, stats);
    LS.set(WRONG_KEY, wrong);
    const history = LS.get(PROGRESS_HISTORY_KEY, []);
    const snapshot = {
      stats,
      wrong,
      correct: progressCorrect(stats),
      total: progressTotal(stats),
      savedAt: new Date().toISOString(),
      appVersion: APP_VERSION
    };
    const nextHistory = [snapshot].concat(Array.isArray(history) ? history : [])
      .filter((item, idx, arr) => idx === arr.findIndex(x => JSON.stringify(x && x.stats) === JSON.stringify(item && item.stats) && JSON.stringify(x && x.wrong) === JSON.stringify(item && item.wrong)))
      .slice(0, 10);
    LS.set(PROGRESS_HISTORY_KEY, nextHistory);
    LS.set(PROGRESS_LATEST_NONEMPTY_KEY, snapshot);
    LS.set(PROGRESS_SNAPSHOT_KEY, {
      stats,
      wrong,
      correct: snapshot.correct,
      total: snapshot.total,
      savedAt: snapshot.savedAt,
      appVersion: APP_VERSION
    });
  }

  restoreProgress();
  addBackup({ label: 'startup-current', stats, wrong, savedAt: new Date().toISOString(), appVersion: APP_VERSION });
  if (progressScore({ stats, wrong }) > progressScore(currentRawProgress('stored'))) {
    persistProgress('restore-better-progress');
  }

  function recordAnswer(q, isCorrect) {
    const s = stats[q.domain] || { correct: 0, total: 0 };
    s.total++; if (isCorrect) s.correct++;
    stats[q.domain] = s;
    const set = new Set(wrong);
    if (isCorrect) set.delete(q.id); else set.add(q.id);
    wrong = [...set];
    persistProgress('record-answer');
  }

  // ---- DOM ----
  const $ = sel => document.querySelector(sel);
  const sections = { home: $('#home'), domainPick: $('#domainPick'), quiz: $('#quiz'), result: $('#result'), glossary: $('#glossary'), audio: $('#audio') };
  const navBar = $('#navBar');

  function show(name) {
    Object.entries(sections).forEach(([k, el]) => el.classList.toggle('hidden', k !== name));
    navBar.classList.toggle('hidden', name !== 'quiz');
    window.scrollTo(0, 0);
  }

  // ---- ユーティリティ ----
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }
  function pool() { return Q; }
  function byDomain(key) { return pool().filter(q => q.domain === key); }
  function loc(q) { return q[lang] || q.ja; }

  // ---- セッション状態 ----
  let session = null; // {list, idx, answered, correctCount, mode, timed, startTs}

  function startSession(list, opts = {}) {
    if (!list.length) { alert('この条件の問題がまだありません。'); return; }
    session = { list, idx: 0, answered: false, choice: null, correctCount: 0, mode: opts.mode, timed: !!opts.timed, synthetic: !!opts.synthetic, startTs: Date.now() };
    show('quiz');
    if (session.timed) startTimer(); else stopTimer();
    renderQuestion();
  }

  // ---- タイマー（本番モード）----
  let timerId = null;
  const timerEl = $('#qTimer');
  function startTimer() {
    timerEl.classList.remove('hidden');
    const tick = () => {
      const s = Math.floor((Date.now() - session.startTs) / 1000);
      timerEl.textContent = String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    };
    tick(); timerId = setInterval(tick, 1000);
  }
  function stopTimer() { timerEl.classList.add('hidden'); if (timerId) clearInterval(timerId); timerId = null; }

  // ---- 出題描画 ----
  // preserve=true のとき（言語切替時）は回答済み状態を保ったまま言語だけ差し替える
  function renderQuestion(preserve) {
    const q = session.list[session.idx];
    const L = loc(q);
    if (!preserve) { session.answered = false; session.choice = null; }
    const terms = $('#qTerms'); terms.classList.add('hidden'); terms.innerHTML = '';
    if (session.synthetic) {
      $('#qTag').textContent = (lang === 'en' ? 'Term quiz' : '用語クイズ');
    } else {
      $('#qTag').textContent = (DOMAIN_MAP[q.domain] || {})[lang] || q.domain;
    }
    $('#qCount').textContent = (session.idx + 1) + ' / ' + session.list.length;
    const promptText = [L.scenario, L.question].filter(Boolean).join(' ');
    $('#qScenario').textContent = promptText;
    $('#qScenario').style.display = promptText ? '' : 'none';
    $('#qText').textContent = '';

    const box = $('#qOptions'); box.innerHTML = '';
    L.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'opt';
      b.innerHTML = '<span class="lab">' + 'ABCDE'[i] + '</span>' + escapeHtml(opt) +
        '<span class="ex"></span>';
      b.addEventListener('click', () => choose(i));
      box.appendChild(b);
    });
    $('#nextBtn').textContent = (session.idx === session.list.length - 1)
      ? (lang === 'en' ? 'Results' : '結果へ')
      : (lang === 'en' ? 'Next' : '次へ');
    if (preserve && session.answered && session.choice !== null) {
      reveal(session.choice);
    } else {
      $('#nextBtn').disabled = true;
      $('#nextBtn').style.opacity = .5;
    }
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

  function choose(i) {
    if (session.answered) return;
    session.answered = true;
    session.choice = i;
    const q = session.list[session.idx];
    const isCorrect = i === q.answer;
    if (isCorrect) session.correctCount++;
    if (!session.synthetic) recordAnswer(q, isCorrect);
    reveal(i);
  }

  // 回答結果の表示（choose直後と、言語切替時の再描画で共用。統計は記録しない）
  function reveal(i) {
    const q = session.list[session.idx];
    const L = loc(q);
    const correct = q.answer;
    const okL = lang === 'en' ? 'Correct' : '正解';
    const ngL = lang === 'en' ? 'Incorrect' : '不適';
    const opts = $('#qOptions').children;
    for (let k = 0; k < opts.length; k++) {
      const el = opts[k];
      const ex = el.querySelector('.ex');
      const verdict = (k === correct) ? '<span class="verdict ok">' + okL + '</span> ' : '<span class="verdict ng">' + ngL + '</span> ';
      ex.innerHTML = verdict + escapeHtml((L.explanations && L.explanations[k]) || '');
      el.classList.add('revealed');
      if (k === correct) el.classList.add('correct');
      else if (k === i) el.classList.add('wrong');
      else el.classList.add('dim');
    }
    if (!session.synthetic) renderTerms(q);
    $('#nextBtn').disabled = false;
    $('#nextBtn').style.opacity = 1;
  }

  // 解答後の用語チップ（タップで解説をその場表示）
  function renderTerms(q) {
    const box = $('#qTerms');
    const terms = matchTerms(q);
    if (!terms.length) { box.classList.add('hidden'); box.innerHTML = ''; return; }
    box.classList.remove('hidden');
    box.innerHTML = '<div class="lead">' + (lang === 'en' ? 'Key terms in this question (tap for definition)' : 'この問題の専門用語（タップで解説）') + '</div>';
    const chipRow = document.createElement('div');
    const defRow = document.createElement('div');
    terms.forEach(g => {
      const chip = document.createElement('button');
      chip.className = 'chip';
      chip.textContent = g[lang === 'en' ? 'en' : 'ja'];
      chip.addEventListener('click', () => {
        const existing = defRow.querySelector('[data-k="' + g.key + '"]');
        chip.classList.toggle('open');
        if (existing) { existing.remove(); return; }
        const d = document.createElement('div');
        d.className = 'termdef'; d.dataset.k = g.key;
        d.innerHTML = '<span class="tn">' + escapeHtml(g.ja) + '</span><span class="te">' + escapeHtml(g.en) + '</span>' +
          '<div class="td">' + escapeHtml(lang === 'en' ? (g.defEn || g.def) : g.def) + '</div>';
        defRow.appendChild(d);
      });
      chipRow.appendChild(chip);
    });
    box.appendChild(chipRow);
    box.appendChild(defRow);
  }

  // ---- 用語集画面 ----
  function renderGlossary(filter) {
    const list = $('#glossaryList'); list.innerHTML = '';
    const f = (filter || '').trim().toLowerCase();
    DOMAINS.forEach(d => {
      const items = GLOSSARY.filter(g => g.domain === d.key).filter(g => {
        if (!f) return true;
        return [g.ja, g.en, g.def, g.defEn].join(' ').toLowerCase().includes(f) ||
          (g.aliases || []).some(a => String(a).toLowerCase().includes(f));
      });
      if (!items.length) return;
      const head = document.createElement('div');
      head.className = 'ghead'; head.textContent = d[lang] + '（' + d.weight + '%）';
      list.appendChild(head);
      items.forEach(g => {
        const el = document.createElement('div');
        el.className = 'gitem';
        el.innerHTML =
          '<span class="gt">' + escapeHtml(g.ja) + '</span><span class="ge">' + escapeHtml(g.en) + '</span>' +
          '<div class="gd">' + escapeHtml(g.def) + '</div>' +
          '<div class="gde">' + escapeHtml(g.defEn || '') + '</div>';
        list.appendChild(el);
      });
    });
    if (!list.children.length) list.innerHTML = '<p class="muted">該当する用語がありません。</p>';
  }

  // ---- 音声学習（ポッドキャスト）----
  const EPISODES = window.EPISODES || [];
  let currentEp = null;
  let audioRate = 1.0;

  function fmtDur(sec) {
    if (!sec) return '';
    return Math.floor(sec / 60) + ':' + String(Math.round(sec % 60)).padStart(2, '0');
  }

  function stopAudio() {
    document.querySelectorAll('#audioPlayer audio').forEach(a => a.pause());
  }

  function renderAudio() {
    $('#audioHeading').textContent = lang === 'en' ? 'Audio lessons' : '音声で学ぶ';
    $('#audioLead').textContent = lang === 'en'
      ? 'Podcast-style walkthroughs of high-yield CCA-F topics. The language toggle switches the audio and transcript.'
      : 'ポッドキャスト形式で頻出ポイントを解説。右上の言語切替で音声と台本が日英で切り替わります。';
    renderPlayer();
    const list = $('#episodeList'); list.innerHTML = '';
    EPISODES.forEach(ep => {
      const b = document.createElement('button');
      b.className = 'ep';
      const styleLabel = ep.style === 'dialogue' ? (lang === 'en' ? 'Dialogue' : '対話') : (lang === 'en' ? 'Solo' : '一人語り');
      b.innerHTML =
        '<span class="et">' + escapeHtml(ep.topic[lang] || ep.topic.ja) + '</span>' +
        '<span class="em">' + styleLabel + ' ・ ' + fmtDur((ep.duration || {})[lang] || (ep.duration || {}).ja) + ' ・ ' + escapeHtml(ep.date || '') + '</span>' +
        '<span class="em">' + escapeHtml((ep.summary || {})[lang] || (ep.summary || {}).ja || '') + '</span>';
      b.addEventListener('click', () => { currentEp = ep; renderPlayer(true); window.scrollTo(0, 0); });
      list.appendChild(b);
    });
  }

  function renderPlayer(autoplay) {
    const box = $('#audioPlayer');
    if (!currentEp) { box.classList.add('hidden'); box.innerHTML = ''; return; }
    const ep = currentEp;
    const src = (ep.audio || {})[lang] || ep.audio.ja;
    box.classList.remove('hidden');
    box.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'player';
    const styleLabel = ep.style === 'dialogue' ? (lang === 'en' ? 'Dialogue' : '対話') : (lang === 'en' ? 'Solo' : '一人語り');
    wrap.innerHTML =
      '<div style="font-weight:800; font-size:16px;">' + escapeHtml(ep.topic[lang] || ep.topic.ja) + '</div>' +
      '<div class="muted" style="font-size:12px; margin-top:2px;">' + styleLabel + ' ・ ' + fmtDur((ep.duration || {})[lang] || (ep.duration || {}).ja) + '</div>';
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.preload = 'metadata';
    audio.src = src;
    wrap.appendChild(audio);
    audio.addEventListener('loadedmetadata', () => { audio.playbackRate = audioRate; });
    const rates = document.createElement('div');
    rates.className = 'ratebtns';
    [1.0, 1.25, 1.5].forEach(r => {
      const rb = document.createElement('button');
      rb.textContent = '×' + r;
      if (r === audioRate) rb.classList.add('on');
      rb.addEventListener('click', () => {
        audioRate = r; audio.playbackRate = r;
        rates.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === rb));
      });
      rates.appendChild(rb);
    });
    wrap.appendChild(rates);
    const sc = document.createElement('div');
    sc.className = 'scriptbox';
    sc.innerHTML = '<div class="muted" style="font-size:12px; font-weight:700;">' + (lang === 'en' ? 'Transcript' : '台本（読みながら聞く用）') + '</div>';
    (((ep.script || {})[lang]) || ((ep.script || {}).ja) || []).forEach(line => {
      const d = document.createElement('div');
      d.className = 'scriptline';
      d.innerHTML = (line.s ? '<span class="sp">' + escapeHtml(line.s) + '</span>' : '') + escapeHtml(line.t);
      sc.appendChild(d);
    });
    wrap.appendChild(sc);
    box.appendChild(wrap);
    if (autoplay) { audio.playbackRate = audioRate; audio.play().catch(() => {}); }
  }

  function nextQuestion() {
    if (!session.answered) return;
    if (session.idx < session.list.length - 1) { session.idx++; renderQuestion(); window.scrollTo(0, 0); }
    else finish();
  }

  function finish() {
    stopTimer();
    const total = session.list.length;
    const pct = Math.round(session.correctCount / total * 100);
    $('#rScore').textContent = pct + '%';
    $('#rBreakdown').innerHTML =
      '<div class="resultline"><span>正解</span><span>' + session.correctCount + ' / ' + total + '</span></div>' +
      (session.timed ? '<div class="resultline"><span>所要時間</span><span>' + timerEl.textContent + '</span></div>' : '');
    let msg;
    if (pct >= 85) msg = '受験圏。誤答理由まで説明できるか最終確認を。';
    else if (pct >= 80) msg = '合格ライン目前。間違えた問題を潰せば十分狙える。';
    else if (pct >= 70) msg = 'もう一歩。弱いドメインを「ドメイン別」で集中的に。';
    else msg = 'まず解説を読み込んで、なぜ他がダメかを言語化する段階。';
    $('#rMsg').textContent = msg;
    renderScores();
    show('result');
  }

  // ---- ホームのスコア表示 ----
  function renderScores() {
    const box = $('#scoreBox'); box.innerHTML = '';
    let tc = 0, tt = 0;
    DOMAINS.forEach(d => {
      const s = stats[d.key] || { correct: 0, total: 0 };
      tc += s.correct; tt += s.total;
      const pct = s.total ? Math.round(s.correct / s.total * 100) : null;
      const row = document.createElement('div');
      row.className = 'scorerow';
      row.innerHTML =
        '<span class="nm">' + d[lang] + ' <span class="muted">' + d.weight + '%</span></span>' +
        '<span class="bar"><i style="width:' + (pct || 0) + '%"></i></span>' +
        '<span class="pct">' + (pct === null ? '—' : pct + '%') + '</span>';
      box.appendChild(row);
    });
    $('#totalLine').textContent = tt ? ('累計 ' + tc + ' / ' + tt + ' 問正解（' + Math.round(tc / tt * 100) + '%）') : 'まだ記録なし。どれか解いてみよう。';
  }

  // ---- ドメイン選択画面 ----
  function renderDomainPick() {
    const list = $('#domainList'); list.innerHTML = '';
    DOMAINS.forEach(d => {
      const n = byDomain(d.key).length;
      const b = document.createElement('button');
      b.className = 'card';
      b.innerHTML = '<span class="t">' + d[lang] + '</span><span class="d">配点 ' + d.weight + '% ・ ' + n + '問</span>';
      b.addEventListener('click', () => startSession(shuffle(byDomain(d.key)), { mode: 'domain' }));
      list.appendChild(b);
    });
    show('domainPick');
  }

  // ---- 用語クイズ（用語集から4択を動的生成。定義→用語 と 用語→定義 を交互に）----
  function buildTermQuestions() {
    const terms = shuffle(GLOSSARY.slice());
    const nameOf = (x, lng) => lng === 'en' ? x.en : x.ja;
    const defOf = (x, lng) => lng === 'en' ? (x.defEn || x.def) : x.def;
    return terms.map((g, i) => {
      const others = shuffle(GLOSSARY.filter(x => x.key !== g.key));
      let pool = others.filter(x => x.domain === g.domain);
      if (pool.length < 3) pool = pool.concat(others.filter(x => x.domain !== g.domain));
      const choices = shuffle([g].concat(pool.slice(0, 3)));
      const answer = choices.indexOf(g);
      const dir = (i % 2 === 0) ? 'pickTerm' : 'pickDef';
      const block = lng => dir === 'pickTerm'
        ? {
            scenario: defOf(g, lng),
            question: lng === 'en' ? 'Which term matches the description above?' : '上の説明にあてはまる用語はどれ？',
            options: choices.map(x => nameOf(x, lng)),
            explanations: choices.map(x => nameOf(x, lng) + (lng === 'en' ? ' — ' : '：') + defOf(x, lng))
          }
        : {
            scenario: nameOf(g, lng),
            question: lng === 'en' ? 'Which description fits the term above?' : '上の用語の説明として正しいのはどれ？',
            options: choices.map(x => defOf(x, lng)),
            explanations: choices.map(x => (lng === 'en' ? 'Describes “' + nameOf(x, lng) + '”' : '「' + nameOf(x, lng) + '」の説明'))
          };
      return { id: 'term-' + g.key + '-' + i, domain: g.domain, answer, synthetic: true, ja: block('ja'), en: block('en') };
    });
  }

  // ---- モード起動 ----
  function launchMode(mode) {
    if (mode === 'domain') return renderDomainPick();
    if (mode === 'terms') return startSession(buildTermQuestions(), { mode, synthetic: true });
    if (mode === 'random') return startSession(shuffle(pool()), { mode });
    if (mode === 'review') {
      const list = pool().filter(q => wrong.includes(q.id));
      if (!list.length) { alert('復習する間違いがありません。まずは解いてみよう。'); return; }
      return startSession(shuffle(list), { mode });
    }
    if (mode === 'mock') {
      // 配点比で60問を抽出
      const picked = [];
      DOMAINS.forEach(d => {
        const n = Math.round(60 * d.weight / 100);
        picked.push(...shuffle(byDomain(d.key)).slice(0, n));
      });
      return startSession(shuffle(picked).slice(0, 60), { mode, timed: true });
    }
  }

  // ---- イベント ----
  document.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => launchMode(b.dataset.mode)));
  document.addEventListener('click', e => {
    const act = e.target.closest('[data-act]'); if (!act) return;
    const a = act.dataset.act;
    if (a === 'backHome') { stopTimer(); stopAudio(); renderScores(); show('home'); }
    if (a === 'nextQ') nextQuestion();
    if (a === 'quitQuiz') { if (confirm('この演習をやめてホームに戻る？')) { stopTimer(); renderScores(); show('home'); } }
    if (a === 'reviewWrong') launchMode('review');
    if (a === 'openGlossary') { renderGlossary($('#glossarySearch').value); show('glossary'); }
    if (a === 'openAudio') { renderAudio(); show('audio'); }
  });
  $('#glossarySearch').addEventListener('input', e => renderGlossary(e.target.value));
  $('#langToggle').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang; LS.set('ccaf_lang', lang);
    document.querySelectorAll('#langToggle button').forEach(x => x.classList.toggle('on', x.dataset.lang === lang));
    // 表示中の画面のまま、言語だけ差し替える（回答済み状態・問題は保持）
    if (!sections.quiz.classList.contains('hidden') && session) renderQuestion(true);
    if (!sections.domainPick.classList.contains('hidden')) renderDomainPick();
    if (!sections.glossary.classList.contains('hidden')) renderGlossary($('#glossarySearch').value);
    if (!sections.audio.classList.contains('hidden')) renderAudio();
    renderAppMeta();
    renderCountInfo();
    renderScores();
  });

  // ---- 収録数表示 ----
  function renderCountInfo() {
    $('#levelInfo').textContent = lang === 'en'
      ? Q.length + ' scenario questions (real-exam style)'
      : '収録 ' + Q.length + ' 問（本試験レベル・業務シナリオ形式）';
  }

  function renderAppMeta() {
    const el = $('#appMeta');
    if (!el) return;
    el.textContent = lang === 'en'
      ? 'Updated: ' + APP_UPDATED_AT + ' / version ' + APP_VERSION
      : '更新日: ' + APP_UPDATED_AT + ' / バージョン ' + APP_VERSION;
  }

  // ---- 初期化 ----
  document.querySelectorAll('#langToggle button').forEach(x => x.classList.toggle('on', x.dataset.lang === lang));
  renderAppMeta();
  renderCountInfo();
  renderScores();
  show('home');
  console.log('[CCA-F] loaded', Q.length, 'questions');
})();
