// Offline support: the game shell and question bank are cached so the quiz works without internet
// (great on patchy mobile data). Network-first for pages, cache-first for static files.
const VERSION = "dc-v3";
const SHELL = ["/", "/style.css", "/app.js", "/calc.js", "/sound.js", "/share.js", "/ads-config.js", "/ads.js", "/favicon.svg", "/bank/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
  const isPage = e.request.mode === "navigate";
  const isBank = url.pathname.startsWith("/bank/");
  if (isPage || isBank || SHELL.includes(url.pathname)) {
    // Network first (fresh content), fall back to cache when offline.
    e.respondWith(fetch(e.request).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match("/"))));
  }
});
