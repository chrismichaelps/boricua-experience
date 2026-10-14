// Achievements in the browser. For signed-in members it records what only the browser sees — the
// day's first visit, towns and activities viewed, the map, its 3D view and camera, radius searches,
// sharing, calendars and the assistant — and shows each new unlock as a toast whose badge pops in
// with a short chime. On the board it draws badges inline so they animate (and pause while locked)
// and opens an achievement's detail in a dialog. Every unlock rule lives in the database.
import { postJson } from '../net/http.js?v=59';

const ENDPOINT = '/api/achievements/signals';
const DAY_KEY = 'bx-ach-day';
const CHECK_KEY = 'bx-ach-check';
const LAST_KEY = 'bx-ach-last';
// Without a new signal, unlocks from server-side actions are checked at most this often.
const RECHECK_MS = 5 * 60 * 1000;
const TOAST_MS = 4800;
const ACTIONS = new Set(['map_rotate', 'map_3d', 'share', 'calendar_add', 'ai_chat']);

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
function chime(view) {
  if (view.document.documentElement.classList.contains('a11y-mute')) return;
  const Context = view.AudioContext || view.webkitAudioContext;
  if (!Context) return;
  try {
    audio = audio || new Context();
    if (audio.state === 'suspended') audio.resume().catch(() => {});
    const start = audio.currentTime + 0.08;
    const master = audio.createGain();
    master.gain.value = 0.18;
    master.connect(audio.destination);
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
  const slots = [...container.querySelectorAll('.ach-art[data-badge]')].filter((slot) => !slot.dataset.drawn);
  await Promise.all(slots.map(async (slot) => {
    slot.dataset.drawn = '1';
    const svg = await drawing(slot.dataset.badge, view);
    if (svg) slot.replaceChildren(svg);
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

/** Records signals for a member and announces what they unlocked. */
export function achievements(root, view = window) {
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
  pending.push(...pageSignals(view.location));
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
  view.addEventListener('pagehide', () => { if (pending.length) flush(true); });
}

/** The board: badges inline, and a tile's detail in a dialog. */
export function achievementBoard(board, view = window) {
  inline(board, view);
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
