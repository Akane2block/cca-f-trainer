/* オフライン用 Service Worker。問題を更新したら CACHE のバージョンを上げる。 */
const CACHE = 'ccaf-v12';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './questions.js',
  './data/q-agentic.js',
  './data/q-claudecode.js',
  './data/q-prompt.js',
  './data/q-tool.js',
  './data/q-context.js',
  './data/q-adv-agentic.js',
  './data/q-adv-claudecode.js',
  './data/q-adv-prompt.js',
  './data/q-adv-tool.js',
  './data/q-adv-context.js',
  './data/glossary.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* ネットワーク優先: オンライン時は必ず最新を取得しキャッシュ更新、
   オフライン時のみキャッシュへフォールバック（更新が反映されない問題を防ぐ） */
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
