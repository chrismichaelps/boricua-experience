// Tells a long-open tab when a newer build is live: the page's own fingerprint (meta[name=build]) is
// compared with /build.json, which the release writes beside the assets and the CDN never caches.
const PATTERN = /^sha256:[0-9a-f]{64}$/;
const EVERY = 30 * 60 * 1000;
const QUIET = 5 * 60 * 1000;

export function differs(current, live) {
  return PATTERN.test(current || '') && PATTERN.test(live || '') && current !== live;
}

export function buildCheck(doc = document, view = window) {
  const meta = doc.querySelector('meta[name="build"]');
  const current = meta?.content;
  if (!PATTERN.test(current || '') || typeof view.fetch !== 'function') return null;
  let last = 0;
  let shown = false;
  const show = () => {
    if (shown) return;
    shown = true;
    const note = doc.createElement('div');
    note.className = 'build-update';
    note.setAttribute('role', 'status');
    const text = doc.createElement('span');
    text.textContent = meta.dataset.update;
    const refresh = doc.createElement('button');
    refresh.type = 'button';
    refresh.className = 'button button-small';
    refresh.textContent = meta.dataset.refresh;
    refresh.addEventListener('click', () => view.location.reload());
    note.append(text, refresh);
    doc.body.append(note);
  };
  const check = async () => {
    const now = Date.now();
    if (shown || doc.visibilityState === 'hidden' || now - last < QUIET) return;
    last = now;
    try {
      const response = await view.fetch('/build.json', { cache: 'no-store', credentials: 'omit' });
      if (!response.ok) return;
      const live = (await response.json())?.hash;
      if (differs(current, live)) show();
    } catch { /* offline or blocked: try again later */ }
  };
  doc.addEventListener('visibilitychange', () => { if (doc.visibilityState === 'visible') check(); });
  const timer = view.setInterval(check, EVERY);
  view.addEventListener('pagehide', () => view.clearInterval(timer));
  last = Date.now();
  return { check, show };
}
