const CACHE_NAME = "bfh-cache-v2";
const ASSETS = [
  "./index.html",
  "./manifest.json"
];

// Force the app to cache critical layout pages on initial launch
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // 🆕 Forces instant operational activation
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim()); // 🆕 Claims active clients immediately
});

// Network-First with Cache Fallback strategy: Guarantees working offline!
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
