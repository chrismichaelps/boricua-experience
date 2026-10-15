// Achievements in the browser. For signed-in members it records what only the browser sees — the
// day's first visit, towns and activities viewed, the map, its 3D view and camera, radius searches,
// sharing, calendars and the assistant — and shows each new unlock as a toast whose badge pops in
// with a short chime. On the board it draws badges inline so they animate (and pause while locked)
// and opens an achievement's detail in a dialog. Every unlock rule lives in the database.
import { postJson } from '../net/http.js?v=80';

const ENDPOINT = '/api/achievements/signals';
const DAY_KEY = 'bx-ach-day';
const CHECK_KEY = 'bx-ach-check';
const LAST_KEY = 'bx-ach-last';
// Without a new signal, unlocks from server-side actions are checked at most this often.
const RECHECK_MS = 5 * 60 * 1000;
const TOAST_MS = 4800;
const ACTIONS = new Set(['map_rotate', 'map_3d', 'share', 'calendar_add', 'ai_chat', 'plan_share', 'trip_start']);

const store = {
  get(area, key) { try { return window[area].getItem(key); } catch { return null; } },
  set(area, key, value) { try { window[area].setItem(key, value); } catch { /* kept for this page only */ } },
  drop(area, key) { try { window[area].removeItem(key); } catch { /* nothing kept */ } },
};

/** Today in Puerto Rico as YYYY-MM-DD, matching the server's day. */
export function today(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Puerto_Rico', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}

/** The signals an address carries: a town page, an activity page, the map, or a radius search. */
export function pageSignals(location) {
  const signals = [];
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const town = path.match(/^\/pueblo\/([a-z0-9-]+)$/);
  if (town) signals.push({ metric: 'town_view', key: town[1] });
  const event = path.match(/^\/e\/([a-z0-9-]+)$/);
  if (event) signals.push({ metric: 'event_view', key: event[1] });
  if (path === '/map') signals.push({ metric: 'map_open', key: 'today' });
  const query = new URLSearchParams(location.search);
  if ((path === '/search' || path === '/map') && (query.get('radio') || query.get('radius') || query.get('near'))) signals.push({ metric: 'radius_use', key: 'today' });
  return signals;
}

// A short rising chime in four notes, its brightest note landing as the badge reaches full size.
let audio = null;
function audioContext(view) {
  const Context = view.AudioContext || view.webkitAudioContext;
  if (!Context) return null;
  audio = audio || new Context();
  return audio;
}

/** Phones only let a page make sound once a tap has started its audio. The first touch, click or key
 * press therefore wakes the audio with one silent sample, so a later unlock can chime on its own. */
export function primeAudio(view = window) {
  const events = ['touchend', 'pointerup', 'click', 'keydown'];
  const wake = () => {
    try {
      const context = audioContext(view);
      if (!context) return;
      if (context.state === 'suspended') context.resume().catch(() => {});
      const silence = context.createBuffer(1, 1, 22050);
      const source = context.createBufferSource();
      source.buffer = silence;
      source.connect(context.destination);
      source.start(0);
      if (context.state === 'running') for (const type of events) view.removeEventListener(type, wake, true);
    } catch { /* silent where audio is unavailable */ }
  };
  for (const type of events) view.addEventListener(type, wake, { capture: true, passive: true });
  // A page restored from the back-forward cache or brought back to the front may find its audio suspended.
  view.document.addEventListener('visibilitychange', () => {
    if (!view.document.hidden && audio?.state !== 'running') for (const type of events) view.addEventListener(type, wake, { capture: true, passive: true });
  });
}

function chime(view) {
  if (view.document.documentElement.classList.contains('a11y-mute')) return;
  try {
    if (!audioContext(view)) return;
    if (audio.state === 'suspended') audio.resume().catch(() => {});
    const start = audio.currentTime + 0.08;
    const master = audio.createGain();
    master.gain.value = 0.18;
    master.connect(audio.destination);
    // Notes scheduled while a phone's audio still sleeps play when the first tap wakes it; once the
    // toast is gone that would be a stray chime, so an untouched page drops it instead.
    view.setTimeout(() => { if (audio.state !== 'running') master.disconnect(); }, TOAST_MS);
    [[784, 0, 0.32], [1047, 0.12, 0.32], [1319, 0.24, 0.36], [1568, 0.38, 0.7]].forEach(([frequency, at, length]) => {
      const tone = audio.createOscillator();
      const shine = audio.createOscillator();
      const gain = audio.createGain();
      tone.type = 'sine';
      shine.type = 'triangle';
      tone.frequency.value = frequency;
      shine.frequency.value = frequency * 2;
      gain.gain.setValueAtTime(0.0001, start + at);
      gain.gain.exponentialRampToValueAtTime(1, start + at + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + at + length);
      const soft = audio.createGain();
      soft.gain.value = 0.18;
      tone.connect(gain);
      shine.connect(soft).connect(gain);
      gain.connect(master);
      tone.start(start + at); shine.start(start + at);
      tone.stop(start + at + length + 0.05); shine.stop(start + at + length + 0.05);
    });
  } catch { /* silent where audio is unavailable */ }
}

// Badges drawn inline: fetched once each, their shared motion from badges.css. Badge files are cached
// for a year, so every address carries the asset version the page itself was built with.
const drawings = new Map();
function badgeUrl(badge, view) {
  const sheet = view.document.querySelector('link[href*="/assets/css/achievements.css"]')?.getAttribute('href') || '';
  const version = sheet.match(/[?&]v=([0-9A-Za-z.-]+)/)?.[1];
  return `/assets/badges/${encodeURIComponent(badge)}.svg${version ? `?v=${version}` : ''}`;
}
async function drawing(badge, view) {
  if (!/^[a-z0-9-]{2,48}$/.test(badge)) return null;
  if (!drawings.has(badge)) {
    drawings.set(badge, view.fetch(badgeUrl(badge, view), { credentials: 'same-origin' })
      .then((response) => (response.ok ? response.text() : Promise.reject(new Error('missing'))))
      .then((text) => {
        const svg = new view.DOMParser().parseFromString(text, 'image/svg+xml').documentElement;
        if (svg.nodeName !== 'svg') return null;
        svg.querySelectorAll('style, script, foreignObject').forEach((node) => node.remove());
        for (const node of svg.querySelectorAll('*')) for (const attribute of [...node.attributes]) if (/^on/i.test(attribute.name)) node.removeAttribute(attribute.name);
        svg.setAttribute('aria-hidden', 'true');
        svg.setAttribute('focusable', 'false');
        return svg;
      })
      .catch(() => null));
  }
  const svg = await drawings.get(badge);
  return svg ? view.document.importNode(svg, true) : null;
}

/** Replaces each badge image inside a container with its inline drawing. */
export async function inline(container, view = window) {
  const slots = [...container.querySelectorAll('.ach-art[data-badge]')].filter((slot) => !slot.dataset.drawing);
  await Promise.all(slots.map(async (slot) => {
    slot.dataset.drawing = '1';
    const svg = await drawing(slot.dataset.badge, view);
    if (svg) slot.replaceChildren(svg);
    slot.dataset.drawn = '1';
  }));
}

function toast(root, unlocked, view) {
  const doc = view.document;
  const item = doc.createElement('a');
  item.className = `ach-toast rarity-${/^(common|rare|epic|legendary)$/.test(unlocked.rarity) ? unlocked.rarity : 'common'}`;
  item.href = `${root.dataset.href}/${encodeURIComponent(unlocked.slug)}`;
  const art = doc.createElement('span');
  art.className = 'ach-toast-art ach-art';
  art.dataset.badge = unlocked.badge;
  const image = doc.createElement('img');
  image.src = badgeUrl(unlocked.badge, view);
  image.alt = '';
  art.append(image);
  const text = doc.createElement('span');
  text.className = 'ach-toast-text';
  const label = doc.createElement('span');
  label.className = 'ach-toast-label';
  label.textContent = root.dataset.label;
  const title = doc.createElement('span');
  title.className = 'ach-toast-title';
  title.textContent = unlocked.title;
  text.append(label, title);
  item.append(art, text);
  return item;
}

/** Shows unlocks one after another, each for about five seconds, with the chime as its badge appears. */
export function announce(root, unlocked, view = window) {
  let delay = 0;
  for (const found of unlocked.slice(0, 6)) {
    view.setTimeout(async () => {
      const item = toast(root, found, view);
      await inline(item, view);
      root.append(item);
      chime(view);
      view.setTimeout(() => item.remove(), TOAST_MS + 100);
    }, delay);
    delay += TOAST_MS - 600;
  }
}

/** The signals a plans page carries: plans were built for the member, by surprise or not. A shared
 * plan someone sent is not one the member built. */
export function planSignals(doc, location) {
  if (!doc.querySelector('[data-feature="plan"] .plan-card') || doc.querySelector('.plan-shared')) return [];
  const signals = [{ metric: 'plan_build', key: 'today' }];
  if (new URLSearchParams(location.search).get('surprise') === '1') signals.push({ metric: 'plan_surprise', key: 'today' });
  return signals;
}

/** Records signals for a member and announces what they unlocked. */
export function achievements(root, view = window) {
  primeAudio(view);
  const pending = [];
  let timer = 0;
  const flush = async (keepalive = false) => {
    view.clearTimeout(timer);
    timer = 0;
    const signals = pending.splice(0, 20);
    try {
      const answer = await postJson(ENDPOINT, { signals }, keepalive);
      store.set('sessionStorage', LAST_KEY, String(Date.now()));
      store.drop('sessionStorage', CHECK_KEY);
      if (Array.isArray(answer?.unlocked) && answer.unlocked.length) announce(root, answer.unlocked, view);
    } catch { /* tried again on a later page */ }
  };
  const queue = (signal, wait = 900) => {
    pending.push(signal);
    if (!timer) timer = view.setTimeout(() => flush(), wait);
  };

  const day = today();
  if (store.get('localStorage', DAY_KEY) !== day) {
    store.set('localStorage', DAY_KEY, day);
    pending.push({ metric: 'login_day', key: day });
  }
  pending.push(...pageSignals(view.location), ...planSignals(view.document, view.location));
  const last = Number(store.get('sessionStorage', LAST_KEY) || 0);
  const due = pending.length || store.get('sessionStorage', CHECK_KEY) === '1' || Date.now() - last > RECHECK_MS;
  if (due) timer = view.setTimeout(() => flush(), 400);

  // A form post may unlock something on the server; the next page asks.
  view.document.addEventListener('submit', () => store.set('sessionStorage', CHECK_KEY, '1'), true);
  view.document.addEventListener('bx:action', (event) => {
    const { action, key } = event.detail || {};
    if (!ACTIONS.has(action)) return;
    queue({ metric: action, key: typeof key === 'string' ? key : 'today' });
  });
  // Unlocks answered by other requests, such as a trip stop confirmed on the server.
  view.document.addEventListener('bx:unlocked', (event) => {
    const items = event.detail?.items;
    if (Array.isArray(items) && items.length) announce(root, items, view);
  });
  view.addEventListener('pagehide', () => { if (pending.length) flush(true); });
}

/** Which tiles a filter keeps: every one, the unlocked ones, or one category's. */
export function keeps(filter, tile) {
  if (!filter) return true;
  if (filter === 'unlocked') return tile.dataset.unlocked === '1';
  return tile.dataset.category === filter;
}

/** Switches the board's filter in place: every tile is already on the page, so nothing waits on the network. */
export function filterBoard(board, filter, view = window) {
  let shown = 0;
  for (const tile of board.querySelectorAll('.ach-grid > li')) {
    const keep = keeps(filter, tile);
    tile.hidden = !keep;
    if (keep) shown += 1;
  }
  const empty = board.querySelector('[data-ach-empty]');
  if (empty) empty.hidden = shown > 0;
  for (const chip of board.querySelectorAll('.ach-filters [data-filter]')) {
    const on = chip.dataset.filter === filter;
    chip.classList.toggle('is-on', on);
    if (on) chip.setAttribute('aria-current', 'page'); else chip.removeAttribute('aria-current');
  }
  const address = new view.URL(view.location.href);
  if (filter) address.searchParams.set('c', filter); else address.searchParams.delete('c');
  view.history.replaceState(view.history.state, '', address.pathname + address.search);
  return shown;
}

/** The board: badges inline, filters that switch at once, and a tile's detail in a dialog. */
export function achievementBoard(board, view = window) {
  inline(board, view);
  board.querySelector('.ach-filters')?.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-filter]');
    if (!chip || event.metaKey || event.ctrlKey || event.shiftKey || event.button > 0) return;
    event.preventDefault();
    filterBoard(board, chip.dataset.filter, view);
    chip.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
  });
  const dialog = board.querySelector('.ach-dialog');
  const body = dialog?.querySelector('.ach-dialog-body');
  if (!dialog || !body || typeof dialog.showModal !== 'function') return;
  let opener = null;
  board.addEventListener('click', (event) => {
    const tile = event.target.closest('.ach-tile');
    if (!tile || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const template = tile.parentElement.querySelector(`template[data-detail="${CSS.escape(tile.dataset.achievement)}"]`);
    if (!template) return;
    event.preventDefault();
    opener = tile;
    body.replaceChildren(template.content.cloneNode(true));
    body.querySelector('.ach-detail-title')?.setAttribute('id', 'ach-dialog-title');
    inline(body, view);
    dialog.showModal();
    dialog.querySelector('.ach-dialog-close')?.focus();
  });
  const close = () => { dialog.close(); };
  dialog.querySelector('.ach-dialog-close')?.addEventListener('click', close);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
  dialog.addEventListener('close', () => { body.replaceChildren(); opener?.focus(); });
}
