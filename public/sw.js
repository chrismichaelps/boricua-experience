const VERSION = 'bx-v86';
const SHELL = ['/assets/css/place.css?v=86', '/assets/js/features/placeGallery.js?v=86', '/assets/js/features/map3d.js?v=86', '/assets/js/features/listing.js?v=86', '/assets/js/features/formDates.js?v=86', '/assets/js/features/buildCheck.js?v=86', '/assets/js/features/mapSurface.js?v=86', '/assets/js/features/dateCalendar.js?v=86', '/assets/js/features/explorer.js?v=86', '/assets/css/menu.css?v=86', '/assets/js/features/passwords.js?v=86', '/assets/js/features/submitFeedback.js?v=86', '/assets/js/vendor/marked-18.1.0.js', '/assets/css/assistant.css?v=86', '/assets/css/a11y.css?v=86', '/assets/js/a11y-boot.js?v=86', '/assets/js/features/a11y.js?v=86', '/assets/js/features/assistant.js?v=86', '/assets/js/features/assistantMarkdown.js?v=86', '/assets/css/experience.css?v=86', '/assets/js/features/motion.js?v=86', '/assets/js/vendor/motion-14.1.0.js', '/assets/brand/cotorra-mark.svg?v=86', '/assets/brand/google-mark.svg', '/assets/css/search.css?v=86', '/assets/js/features/searchPickers.js?v=86', '/offline', '/assets/css/app.css?v=86', '/assets/css/home.css?v=86', '/assets/js/main.js?v=86', '/assets/js/features/carousel.js?v=86', '/assets/js/constants/config.js?v=86', '/assets/fonts/nunito-sans.woff2', '/assets/brand/logo.svg?v=86', '/assets/brand/icon-192.png?v=86', '/assets/brand/cotorra-search.svg?v=86', '/assets/fonts/pacifico-latin.woff2'];

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
