import { message } from '../constants/messages.js?v=44';

const PUERTO_RICO = 'America/Puerto_Rico';
const DAY_MS = 86400000;

const zone = (() => {
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || PUERTO_RICO; } catch { return PUERTO_RICO; }
})();
const language = () => (document.documentElement.lang.startsWith('en') ? 'en-US' : 'es-PR');
const format = (date, options, timeZone = zone) => new Intl.DateTimeFormat(language(), { timeZone, ...options }).format(date);
const capitalized = (text) => text.charAt(0).toUpperCase() + text.slice(1);

/** Whether a moment reads the same on a Puerto Rico clock as on the reader's; then the server text stands. */
const sameClock = (date) => format(date, { dateStyle: 'short', timeStyle: 'short' }) === format(date, { dateStyle: 'short', timeStyle: 'short' }, PUERTO_RICO);

/** Days from today to the date, counted on the reader's calendar. */
function daysAway(date) {
  const day = (value) => {
    const parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: zone, year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(value).map((part) => [part.type, part.value]));
    return Date.UTC(Number(parts.year), Number(parts.month) - 1, Number(parts.day));
  };
  return Math.round((day(date) - day(new Date())) / DAY_MS);
}

const clock = (date) => format(date, { hour: 'numeric', minute: '2-digit' });
const zoneName = (date) => new Intl.DateTimeFormat(language(), { timeZone: zone, timeZoneName: 'short' }).formatToParts(date).find((part) => part.type === 'timeZoneName')?.value ?? '';
const shortDay = (date) => capitalized(format(date, { weekday: 'short', day: 'numeric', month: 'short' }));
const longDay = (date) => capitalized(format(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));

function relativeDay(date) {
  const days = daysAway(date);
  if (days === 0) return message('today');
  if (days === 1) return message('tomorrow');
  if (days > 1 && days < 7) return capitalized(format(date, { weekday: 'long' }));
  return shortDay(date);
}

const STYLES = {
  day: (start) => shortDay(start),
  when: (start, end) => {
    const now = Date.now();
    if (end && start.getTime() <= now && end.getTime() > now) return `${message('now')} · ${message('until')} ${clock(end)} ${zoneName(end)}`;
    return `${relativeDay(start)} · ${clock(start)} ${zoneName(start)}`;
  },
  schedule: (start, end) => {
    const first = `${longDay(start)} · ${clock(start)}`;
    if (!end) return `${first} ${zoneName(start)}`;
    const sameDay = daysAway(start) === daysAway(end);
    return sameDay ? `${first} – ${clock(end)} ${zoneName(end)}` : `${first} – ${longDay(end)} · ${clock(end)} ${zoneName(end)}`;
  },
};

/** Rewrites one `<time data-moment>` in the reader's zone, keeping the Puerto Rico text as its title. */
export function localizeMoment(node) {
  const start = new Date(node.getAttribute('datetime'));
  const end = node.dataset.ends ? new Date(node.dataset.ends) : null;
  const style = STYLES[node.dataset.moment];
  if (!style || Number.isNaN(start.getTime()) || node.dataset.localized === '1') return;
  node.dataset.localized = '1';
  if (sameClock(start) && (!end || sameClock(end))) return;
  node.title = `${message('puertoRicoTime')}: ${node.textContent}`;
  node.textContent = style(start, end);
}

/** Every moment under a root, for the page and for content added later. */
export function localizeMoments(root = document) {
  for (const node of root.querySelectorAll('time[data-moment]')) localizeMoment(node);
}
