// The island forecast where activities happen. A compact slot shows the sky, temperature, what it feels
// like and the chance of rain at an activity's hour; a card shows it like a weather app: the sky moving
// behind a large temperature, the day's high and low, the hours around the activity, the heat level and
// official alerts in force. The whole island comes in one small document every visitor shares from the
// edge cache, so a page makes one request however many forecasts it shows.

const WEATHER_URL = '/api/weather';
// The skies the forecast names, by number.
export const SKIES = ['clear', 'cloudy', 'showers', 'storm', 'fog'];
// Rain worth planning around.
export const RAIN_WARN = 50;
// The National Weather Service heat index levels (°F): caution, extreme caution, danger, extreme danger.
export const HEAT_LEVELS = [[125, 'extremedanger'], [103, 'danger'], [90, 'extreme'], [80, 'caution']];
export const HEAT_WARN = 103;
const HOUR = 3600000;

let loading = null;

/** The island forecast, fetched once per page; nothing when it cannot be read. */
export function islandWeather(fetcher = fetch) {
  loading ??= fetcher(WEATHER_URL, { credentials: 'omit' }).then((response) => (response.ok ? response.json() : null)).catch(() => null);
  return loading;
}

/** The hour index of an instant in the document, or -1 outside it. */
function indexOf(doc, at) {
  const start = Date.parse(doc?.start || ''), when = typeof at === 'number' ? at : Date.parse(at || '');
  if (!Number.isFinite(start) || !Number.isFinite(when)) return -1;
  return Math.floor((when - start) / HOUR);
}

/** The forecast for a town at an instant: temperature, feels like, rain chance and sky, or null. */
export function forecastAt(doc, town, at) {
  const hours = doc?.towns?.[town];
  const index = indexOf(doc, at);
  const hour = Array.isArray(hours) && index >= 0 && index < hours.length ? hours[index] : null;
  if (!Array.isArray(hour) || hour.length < 4) return null;
  const [temp, feels, rain, sky] = hour;
  return { temp, feels, rain: typeof rain === "number" && Number.isFinite(rain) && rain >= 0 && rain <= 100 ? rain : null, sky };
}

/** The heat level a "feels like" temperature reaches, or nothing below caution. */
export function heatLevel(feels) {
  return HEAT_LEVELS.find(([floor]) => feels >= floor)?.[1] || '';
}

/** The kind of an official alert, for its advice: heat, flood, surf, storm or other. */
export function alertKind(event) {
  if (/heat/i.test(event)) return 'heat';
  if (/rip|surf|coastal|craft|marine/i.test(event)) return 'surf';
  if (/flood/i.test(event)) return 'flood';
  if (/hurricane|tropical|thunder|storm|wind|tornado/i.test(event)) return 'storm';
  return 'other';
}

/** The official alerts in force for a town during an activity (from its start to four hours later). */
export function alertsFor(doc, town, at) {
  const from = Date.parse(at || ''), to = from + 4 * HOUR;
  if (!Number.isFinite(from)) return [];
  return (doc?.alerts || []).filter((alert) => Array.isArray(alert.towns) && alert.towns.includes(town)
    && (!alert.onset || Date.parse(alert.onset) <= to) && (!alert.ends || Date.parse(alert.ends) >= from));
}

/** What to warn an outdoor activity about, most serious first: storms, rain or dangerous heat; nothing indoors. */
export function caution(entry, outdoor) {
  if (!entry || !outdoor) return '';
  if (entry.sky === 3 && entry.rain >= 30) return 'storm';
  if (entry.rain >= RAIN_WARN) return 'rain';
  if (entry.feels >= HEAT_WARN) return 'heat';
  return '';
}

/** The words of a forecast: sky, temperature, and what it feels like or the rain chance when they matter. */
export function describe(entry, say) {
  const parts = [say('sky-' + (SKIES[entry.sky] || 'clear')), fill(say('temp'), { temp: entry.temp })];
  if (entry.feels >= entry.temp + 4) parts.push(fill(say('feels'), { feels: entry.feels }));
  if (entry.rain >= 20) parts.push(fill(say('rain'), { rain: entry.rain }));
  return parts.filter(Boolean).join(' · ');
}

/** The day's high and low around an instant, from the hours of its Puerto Rico date in the document. */
export function dayRange(doc, town, at) {
  const hours = doc?.towns?.[town], start = Date.parse(doc?.start || ''), when = Date.parse(at || '');
  if (!Array.isArray(hours) || !Number.isFinite(start) || !Number.isFinite(when)) return null;
  const day = (ms) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Puerto_Rico' }).format(new Date(ms));
  const target = day(when);
  const temps = hours.map((hour, index) => (Array.isArray(hour) && day(start + index * HOUR) === target ? hour[0] : null)).filter((temp) => temp !== null);
  return temps.length ? { high: Math.max(...temps), low: Math.min(...temps) } : null;
}

/** The hours to show around an activity: one before and five after, those the forecast covers. */
export function hoursAround(doc, town, at) {
  const index = indexOf(doc, at), hours = doc?.towns?.[town], start = Date.parse(doc?.start || '');
  if (!Array.isArray(hours) || index < 0) return [];
  const shown = [];
  for (let i = Math.max(0, index - 1); i <= index + 5 && i < hours.length; i += 1) {
    const hour = hours[i];
    if (Array.isArray(hour)) shown.push({ at: start + i * HOUR, temp: hour[0], feels: hour[1], rain: hour[2], sky: hour[3], start: i === index });
  }
  return shown;
}

function fill(template, values) {
  return String(template || '').replace(/:([a-z]+)/g, (whole, name) => (name in values ? values[name] : whole));
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

/** Whether an instant is daytime in Puerto Rico, for the card's sky. */
function daytime(ms) {
  const hour = Number(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Puerto_Rico', hour: 'numeric', hourCycle: 'h23' }).format(new Date(ms)));
  return hour >= 6 && hour < 19;
}

function clock(ms, hourOnly = false) {
  const english = document.documentElement.lang.startsWith('en');
  return new Intl.DateTimeFormat(english ? 'en-US' : 'es-PR', { timeZone: 'America/Puerto_Rico', hour: 'numeric', ...(hourOnly ? {} : { minute: '2-digit' }) }).format(new Date(ms));
}

/** The official alert's name in the page's language, else the service's own. */
function alertName(alert, say) {
  return say('alert-' + String(alert.event || '').toLowerCase().replace(/[^a-z]/g, '')) || alert.event;
}

const renderedCards = new WeakMap();

/** A forecast card: animated sky, temperature, range, the hours around the start, heat and alerts. */
export function renderCard(slot, doc, labels, say) {
  const town = slot.dataset.weatherTown, at = slot.dataset.weatherAt;
  const key = [town, at, slot.dataset.weatherOutdoor, slot.dataset.weatherName].join('|');
  const previous = renderedCards.get(slot);
  if (!slot.hidden && previous?.doc === doc && previous.key === key) return true;
  const entry = forecastAt(doc, town, at);
  if (!entry) { slot.hidden = true; slot.replaceChildren(); return false; }
  const outdoor = slot.dataset.weatherOutdoor === '1';
  const sky = SKIES[entry.sky] || 'clear';
  const day = daytime(Date.parse(at));
  slot.className = `wx-slot wx wx-${sky} ${day ? 'wx-day' : 'wx-night'}`;
  slot.setAttribute('aria-label', fill(say('label'), { town: slot.dataset.weatherName || '' }));
  const scene = element('div', 'wx-scene');
  scene.setAttribute('aria-hidden', 'true');
  for (const part of ['wx-glow', 'wx-stars', 'wx-cloud wx-cloud-1', 'wx-cloud wx-cloud-2', 'wx-cloud wx-cloud-3', 'wx-rain', 'wx-flash']) scene.append(element('span', part));
  const head = element('div', 'wx-head');
  head.append(element('p', 'wx-place', `${slot.dataset.weatherName || ''} · ${clock(Date.parse(at))}`), element('p', 'wx-temp', `${entry.temp}°`), element('p', 'wx-sky', say('sky-' + sky)));
  const range = dayRange(doc, town, at);
  if (range) head.append(element('p', 'wx-range', fill(say('highlow'), range)));
  const details = element('details', 'wx-details');
  details.append(element('summary', '', say('hourly')));
  const strip = element('ol', 'wx-hours');
  for (const hour of hoursAround(doc, town, at)) {
    const item = element('li', hour.start ? 'is-start' : '');
    const glyph = hour.sky === 0 && !daytime(hour.at) ? 5 : hour.sky;
    const icon = labels.querySelector(`[data-weather-icon="${glyph}"] svg`)?.cloneNode(true);
    item.append(element('span', 'wx-hour', hour.start ? say('start') : clock(hour.at, true)));
    if (icon) item.append(icon);
    item.append(element('span', 'wx-hour-temp', `${hour.temp}°`));
    item.append(element('span', 'wx-hour-rain', hour.rain === null ? "—" : hour.rain >= 20 ? `${hour.rain}%` : ''));
    strip.append(item);
  }
  details.append(strip);
  const notes = element('div', 'wx-notes');
  for (const alert of alertsFor(doc, town, at)) {
    const box = element('div', `wx-alert wx-alert-${alertKind(alert.event)}`);
    const until = alert.ends ? ' · ' + fill(say('until'), { time: clock(Date.parse(alert.ends)) }) : '';
    box.append(element('strong', '', `${say('official')}: ${alertName(alert, say)}${until}`), element('span', '', say('advice-' + alertKind(alert.event))));
    notes.append(box);
  }
  const level = heatLevel(entry.feels);
  // In Puerto Rico "caution" (80°F+) is most afternoons, so it is not shown; extreme caution warns outdoor
  // plans and danger warns everyone.
  const shown = level === 'danger' || level === 'extremedanger' || (outdoor && level === 'extreme');
  if (shown) notes.append(element('p', `wx-heat wx-heat-${level}`, fill(say('heat-' + level), { feels: entry.feels })));
  else if (outdoor && entry.rain >= RAIN_WARN) notes.append(element('p', 'wx-heat wx-heat-rain', say(entry.sky === 3 ? 'warn-storm' : 'warn-rain')));
  const source = element('p', 'wx-source', say('source'));
  slot.replaceChildren(scene, head, details, ...(notes.childNodes.length ? [notes] : []), source);
  slot.hidden = false;
  renderedCards.set(slot, { doc, key });
  return true;
}

/** A compact forecast line, with the most serious warning for an outdoor activity or an official alert. */
export function renderLine(slot, doc, labels, say) {
  const town = slot.dataset.weatherTown, at = slot.dataset.weatherAt;
  const entry = forecastAt(doc, town, at);
  if (!entry) { slot.hidden = true; return false; }
  const glyph = entry.sky === 0 && !daytime(Date.parse(at)) ? 5 : entry.sky;
  const icon = labels.querySelector(`[data-weather-icon="${glyph}"] svg`)?.cloneNode(true);
  const line = element('span', 'weather-line', describe(entry, say));
  line.title = say('source');
  slot.replaceChildren(...(icon ? [icon] : []), line);
  const alert = alertsFor(doc, town, at)[0];
  const warning = caution(entry, slot.dataset.weatherOutdoor === '1');
  if (alert) slot.append(element('span', `weather-warning weather-warning-${alertKind(alert.event) === 'storm' ? 'storm' : 'rain'}`, `${alertName(alert, say)}: ${say('advice-' + alertKind(alert.event))}`));
  else if (warning) slot.append(element('span', `weather-warning weather-warning-${warning}`, say('warn-' + warning)));
  slot.hidden = false;
  return true;
}

let shared = null;
let markReady;
// Slots drawn later (a trip's next stop) wait until the page's messages are known.
const ready = new Promise((resolve) => { markReady = resolve; });

/** Draws one slot again, for a trip whose next stop changed. */
export async function refreshSlot(slot) {
  if (!slot) return;
  await ready;
  const forecast = await islandWeather();
  if (!forecast) return;
  if (slot.dataset.weatherCard) renderCard(slot, forecast, shared.labels, shared.say);
  else renderLine(slot, forecast, shared.labels, shared.say);
}

/** Fills every weather slot on the page from the island forecast. */
export async function weather(labels, doc = document) {
  const say = (key) => labels.dataset['say' + key.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())] || '';
  shared = { labels, say };
  markReady();
  const slots = [...doc.querySelectorAll('[data-weather-town]')];
  if (!slots.length) return;
  const forecast = await islandWeather();
  if (!forecast) return;
  for (const slot of slots) {
    if (!slot.dataset.weatherTown || !slot.dataset.weatherAt) continue;
    if (slot.dataset.weatherCard) renderCard(slot, forecast, labels, say);
    else renderLine(slot, forecast, labels, say);
  }
  document.dispatchEvent(new CustomEvent('bx:weather-ready'));
}
