import assert from 'node:assert/strict';

// The island forecast: the hour a slot falls in, what to warn outdoor plans about, and the words shown.
globalThis.document = { querySelectorAll: () => [] };
const { forecastAt, caution, describe, islandWeather, RAIN_WARN, HEAT_WARN } = await import('../public/assets/js/features/weather.js');
const { weatherFor } = await import('../server/assistant.mjs');

const doc = { start: '2026-10-14T21:00:00Z', towns: { 'san-juan': [[82, 90, 20, 2], [81, 88, 60, 3], null, [84, 104, 10, 0]] } };
assert.deepEqual(forecastAt(doc, 'san-juan', '2026-10-14T21:59:00Z'), { temp: 82, feels: 90, rain: 20, sky: 2 }, 'an instant falls in its hour');
assert.deepEqual(forecastAt(doc, 'san-juan', '2026-10-14T22:30:00-00:00'), { temp: 81, feels: 88, rain: 60, sky: 3 });
assert.equal(forecastAt(doc, 'san-juan', '2026-10-14T23:10:00Z'), null, 'an hour without a forecast shows nothing');
assert.equal(forecastAt(doc, 'san-juan', '2026-10-14T20:10:00Z'), null, 'before the forecast starts');
assert.equal(forecastAt(doc, 'san-juan', '2026-10-20T20:10:00Z'), null, 'beyond the 48 hours');
assert.equal(forecastAt(doc, 'ponce', '2026-10-14T21:10:00Z'), null, 'a town without a fresh forecast');
assert.equal(forecastAt(null, 'san-juan', '2026-10-14T21:10:00Z'), null);

assert.equal(caution({ temp: 81, feels: 88, rain: 60, sky: 3 }, true), 'storm', 'storms come first');
assert.equal(caution({ temp: 81, feels: 88, rain: RAIN_WARN, sky: 2 }, true), 'rain');
assert.equal(caution({ temp: 90, feels: HEAT_WARN, rain: 0, sky: 0 }, true), 'heat');
assert.equal(caution({ temp: 81, feels: 88, rain: 90, sky: 3 }, false), '', 'indoor activities get no warning');
assert.equal(caution({ temp: 81, feels: 88, rain: 10, sky: 0 }, true), '');

const words = { skyShowers: 'Aguaceros', skyClear: 'Despejado', temp: ':temp°F', feels: 'se siente como :feels°F', rain: 'lluvia :rain%' };
const say = (key) => words[key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())];
assert.equal(describe({ temp: 82, feels: 90, rain: 20, sky: 2 }, say), 'Aguaceros · 82°F · se siente como 90°F · lluvia 20%');
assert.equal(describe({ temp: 84, feels: 85, rain: 10, sky: 0 }, say), 'Despejado · 84°F', 'feels like and rain only when they matter');

let calls = 0;
const fetcher = async () => { calls += 1; return { ok: true, json: async () => doc }; };
await Promise.all([islandWeather(fetcher), islandWeather(fetcher), islandWeather(fetcher)]);
assert.equal(calls, 1, 'one request per page however many slots');

assert.deepEqual(weatherFor(doc, { town_slug: 'san-juan', starts_at: '2026-10-14T22:15:00Z' }), { sky: 'thunderstorms', temp_f: 81, feels_like_f: 88, rain_chance_pct: 60 }, 'the assistant reads the same forecast');
assert.equal(weatherFor(doc, { town: 'San Juan', starts_at: '2026-10-14T22:15:00Z' }), null, 'without a town slug, no weather');
assert.equal(weatherFor(null, { town_slug: 'san-juan', starts_at: '2026-10-14T22:15:00Z' }), null);
console.log('PASS: island forecast hours, warnings for outdoor plans, words, one request per page, assistant weather');
const { heatLevel, alertKind, alertsFor, dayRange, hoursAround } = await import('../public/assets/js/features/weather.js');
assert.deepEqual([79, 80, 90, 103, 125].map(heatLevel), ['', 'caution', 'extreme', 'danger', 'extremedanger'], 'the weather service heat index levels');
assert.deepEqual(['Heat Advisory', 'Rip Current Statement', 'Flash Flood Warning', 'Hurricane Watch', 'Special Weather Statement'].map(alertKind), ['heat', 'surf', 'flood', 'storm', 'other']);
const alerting = { ...doc, alerts: [{ event: 'Flood Watch', towns: ['san-juan'], onset: '2026-10-14T23:00:00Z', ends: '2026-10-15T03:00:00Z' }, { event: 'Heat Advisory', towns: ['ponce'], onset: null, ends: null }] };
assert.equal(alertsFor(alerting, 'san-juan', '2026-10-14T21:30:00Z').length, 1, 'an alert starting during the activity counts');
assert.equal(alertsFor(alerting, 'san-juan', '2026-10-15T05:00:00Z').length, 0, 'an alert over before the activity does not');
assert.equal(alertsFor(alerting, 'caguas', '2026-10-14T21:30:00Z').length, 0, 'other towns are not warned');
assert.deepEqual(dayRange(doc, 'san-juan', '2026-10-14T21:30:00Z'), { high: 84, low: 81 }, 'the day range comes from that Puerto Rico date');
assert.deepEqual(hoursAround(doc, 'san-juan', '2026-10-14T22:30:00Z').map((hour) => [hour.temp, hour.start]), [[82, false], [81, true], [84, false]], 'the hours around the start, skipping gaps');
console.log('PASS: heat levels, alert kinds and timing by town, day range, hours around the start');

const unknownRain = {start: doc.start, towns: {'san-juan': [[82,90,null,2]]}};
assert.equal(forecastAt(unknownRain,'san-juan',doc.start).rain,null,'unknown precipitation remains unknown');
assert.equal(weatherFor(unknownRain,{town_slug:'san-juan',starts_at:doc.start}).rain_chance_pct,null);
assert.ok(!describe(forecastAt(unknownRain,'san-juan',doc.start),key=>key).includes('0%'));
console.log('PASS: unknown rain remains null in UI and provider projection');

// Repainting the map must not destroy a reader's expanded hours or restart the weather scene.
class WeatherNode {
  constructor(tag) { this.tagName = tag; this.childNodes = []; this.dataset = {}; this.hidden = true; this.open = false; }
  append(...nodes) { this.childNodes.push(...nodes); }
  replaceChildren(...nodes) { this.childNodes = nodes; }
  setAttribute() {}
}
globalThis.document = { documentElement: { lang: 'en' }, createElement: (tag) => new WeatherNode(tag) };
const { renderCard } = await import('../public/assets/js/features/weather.js');
const card = new WeatherNode('section');
card.dataset = { weatherTown: 'san-juan', weatherName: 'San Juan', weatherAt: doc.start, weatherOutdoor: '1' };
const labels = { querySelector: () => null };
const cardWords = (key) => key;
assert.equal(renderCard(card, doc, labels, cardWords), true);
const initialChildren = card.childNodes;
const hourly = initialChildren.find((node) => node.tagName === 'details');
assert.equal(hourly.open, false, 'hours start secondary');
hourly.open = true;
renderCard(card, doc, labels, cardWords);
assert.equal(card.childNodes, initialChildren, 'same forecast preserves the scene and focus');
assert.equal(hourly.open, true, 'map repaint keeps the reader’s hours expanded');
card.dataset.weatherAt = '2026-10-14T22:30:00Z';
renderCard(card, alerting, labels, cardWords);
assert.notEqual(card.childNodes, initialChildren, 'a different stop gets its own forecast');
assert.ok(card.childNodes.some((node) => node.className === 'wx-notes'), 'official alerts remain outside the collapsed hours');
assert.equal(renderCard(card, null, labels, cardWords), false);
assert.equal(card.hidden, true, 'unavailable forecasts clear the previous conditions');
console.log('PASS: weather disclosure survives map repaints, stop changes refresh it, alerts stay visible, missing forecasts clear');
