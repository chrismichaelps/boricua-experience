const VERSION = 'bx-v63';
const SHELL = ['/assets/js/home-readiness.js?v=63', '/assets/js/features/mapSurface.js?v=63', '/assets/js/features/dateCalendar.js?v=62', '/assets/js/features/explorer.js?v=63', '/assets/css/menu.css?v=63', '/assets/js/features/passwords.js?v=59', '/assets/js/features/submitFeedback.js?v=59', '/assets/js/vendor/marked-18.1.0.js', '/assets/css/assistant.css?v=63', '/assets/css/a11y.css?v=63', '/assets/js/a11y-boot.js?v=59', '/assets/js/features/a11y.js?v=59', '/assets/js/features/assistant.js?v=59', '/assets/js/features/assistantMarkdown.js?v=59', '/assets/css/experience.css?v=63', '/assets/js/features/motion.js?v=59', '/assets/js/vendor/motion-14.1.0.js', '/assets/brand/cotorra-mark.svg?v=63', '/assets/brand/google-mark.svg', '/assets/css/search.css?v=63', '/assets/js/features/searchPickers.js?v=62', '/offline', '/assets/css/app.css?v=63', '/assets/css/home.css?v=63', '/assets/js/main.js?v=63', '/assets/js/features/carousel.js?v=59', '/assets/js/constants/config.js?v=59', '/assets/fonts/nunito-sans.woff2', '/assets/brand/logo.svg?v=63', '/assets/brand/icon-192.png?v=63', '/assets/brand/cotorra-search.svg?v=63', '/assets/fonts/pacifico-latin.woff2'];

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
