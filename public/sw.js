const VERSION = 'bx-v29';
const SHELL = ['/assets/css/experience.css?v=29', '/assets/js/features/motion.js?v=29', '/assets/js/vendor/motion-14.1.0.js', '/assets/brand/cotorra-mark.svg?v=29', '/assets/brand/google-mark.svg', '/assets/css/search.css?v=29', '/assets/js/features/searchPickers.js?v=29', '/offline', '/assets/css/app.css?v=29', '/assets/css/home.css?v=29', '/assets/js/main.js?v=29', '/assets/js/features/carousel.js?v=29', '/assets/js/constants/config.js?v=29', '/assets/fonts/nunito-sans.woff2', '/assets/brand/logo.svg?v=29', '/assets/brand/icon-192.png?v=29', '/assets/img/luquillo-photo-1300.webp', '/assets/img/san-juan-photo-1300.webp', '/assets/img/el-yunque-photo-1300.webp', '/assets/img/cotorra-photo-1300.webp', '/assets/img/culebra-photo-1300.webp', '/assets/brand/cotorra-search.svg?v=29', '/assets/fonts/pacifico-latin.woff2'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(SHELL.map((path) => new Request(path, { credentials: 'omit' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((names) => Promise.all(names.filter((name) => name !== VERSION).map((name) => caches.delete(name)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin === location.origin && url.pathname.startsWith('/assets/')) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      const copy = response.clone();
      if (response.ok) caches.open(VERSION).then((cache) => cache.put(request, copy));
      return response;
    })));
    return;
  }
  if (url.hostname === 'tiles.openfreemap.org') {
    event.respondWith(caches.open(`${VERSION}-tiles`).then((cache) => cache.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    }))));
    return;
  }
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(() => caches.match('/offline')));
  }
});
