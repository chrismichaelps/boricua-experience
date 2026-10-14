import assert from 'node:assert/strict';

// The trip module's pure parts: distances, the route check, directions, drive time, saved progress,
// and the plan signals the achievements module sends.
globalThis.window = globalThis;
globalThis.matchMedia = () => ({ matches: false, addEventListener() {} });
globalThis.document = { documentElement: { lang: 'es' }, addEventListener() {}, querySelector: () => null, hidden: false };
const { distance, distanceToLines, directionsUrl, minutesFor, say, loadProgress, stopsOf, ARRIVE_M, chosenOption, routeLayers } = await import('../public/assets/js/features/trip.js');
const { planSignals } = await import('../public/assets/js/features/achievements.js');

const sanJuan = { lat: 18.4655, lng: -66.1057 }, ponce = { lat: 18.0111, lng: -66.6141 };
const metres = distance(sanJuan, ponce);
assert.ok(metres > 70000 && metres < 76000, `San Juan to Ponce is about 73 km in a straight line, got ${metres}`);
assert.equal(Math.round(distance(sanJuan, sanJuan)), 0, 'a point is no distance from itself');
// A public point is snapped to a grid of about 550 m: its farthest corner must still count as reached.
const corner = { lat: sanJuan.lat + 0.0025, lng: sanJuan.lng + 0.0025 };
assert.ok(distance(sanJuan, corner) < ARRIVE_M, 'the farthest grid corner is within the arrival radius');

const road = [[[-66.1, 18.4], [-66.0, 18.4]]];
assert.ok(distanceToLines({ lat: 18.4, lng: -66.05 }, road) < 1, 'a point on the road is on the route');
const off = distanceToLines({ lat: 18.41, lng: -66.05 }, road);
assert.ok(off > 1050 && off < 1170, `a point 0.01° north is about 1.1 km off the route, got ${off}`);
assert.ok(distanceToLines({ lat: 18.4, lng: -65.99 }, road) > 1000, 'past the end, the distance is to the last point');
assert.equal(distanceToLines(sanJuan, []), Infinity, 'no route means nothing to be off');

const stop = { place: 'Plaza de Armas, San Juan', legSeconds: 600, legMeters: 10000 };
assert.equal(directionsUrl(stop, true), 'https://maps.apple.com/?daddr=Plaza%20de%20Armas%2C%20San%20Juan%2C%20Puerto%20Rico&dirflg=d', 'Apple devices open Apple Maps');
assert.match(directionsUrl(stop, false), /^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&destination=Plaza%20de%20Armas/, 'others open Google Maps');
assert.match(directionsUrl(stop, true, true), /dirflg=w$/, 'a walk opens walking directions');
assert.match(directionsUrl(stop, false, true), /travelmode=walking$/);
const line = (n) => [[-66.1, 18.4 + n], [-66.0, 18.4 + n]];
const options = [{ kind: 'fastest', seconds: 840, meters: 23000, coordinates: line(0) }, { kind: 'alternate', seconds: 900, meters: 21000, coordinates: line(0.01) }, { kind: 'walk', seconds: 1800, meters: 2300, coordinates: line(0) }];
assert.equal(chosenOption(options, undefined).kind, 'fastest', 'no choice means the fastest');
assert.equal(chosenOption(options, 'alternate').kind, 'alternate');
assert.equal(chosenOption(options, 'gone').kind, 'fastest', 'a choice no longer offered falls back to the fastest');
assert.equal(chosenOption([], 'alternate'), null);
const drawn = routeLayers(new Map([[1, options]]), { 1: 'alternate' });
assert.deepEqual(drawn.chosen, [{ order: 1, coordinates: line(0.01) }], 'the chosen way is the route');
assert.deepEqual(drawn.others.features.map((f) => f.properties), [{ order: 1, kind: 'fastest' }], 'the other road ways are drawn to tap; walking shares the roads and is not');
assert.equal(minutesFor(10000, stop), 14, 'drive time follows the leg\'s own pace with the road detour');
assert.equal(minutesFor(10000, { legSeconds: 0, legMeters: 0 }), 20, 'without a leg it uses the island pace');
assert.equal(minutesFor(5, stop), 1, 'never less than a minute');
assert.equal(say(':km km · unos :minutes min', { km: '3.4', minutes: '9' }), '3.4 km · unos 9 min');
assert.equal(say('Llegaste a :title', {}), 'Llegaste a :title', 'unknown placeholders stay');

const memory = new Map();
const store = { getItem: (key) => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
assert.deepEqual(loadProgress('a,b', store), { done: [], skipped: [], routes: {} }, 'a new trip has no progress');
const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Puerto_Rico' }).format(new Date());
memory.set('bx-trip:a,b', JSON.stringify({ day, done: ['a'], skipped: [] }));
assert.deepEqual(loadProgress('a,b', store), { done: ['a'], skipped: [], routes: {} }, 'today\'s progress is kept');
memory.set('bx-trip:a,b', JSON.stringify({ day: '2020-01-01', done: ['a'], skipped: [] }));
assert.deepEqual(loadProgress('a,b', store), { done: [], skipped: [], routes: {} }, 'yesterday\'s progress starts over');
memory.set('bx-trip:a,b', '{broken');
assert.deepEqual(loadProgress('a,b', store), { done: [], skipped: [], routes: {} }, 'broken progress starts over');
assert.deepEqual(loadProgress('a,b', { getItem() { throw new Error('blocked'); } }), { done: [], skipped: [], routes: {} }, 'a blocked store starts over');

const node = (data) => ({ dataset: data });
const page = { querySelectorAll: () => [
  node({ stop: 'a-one', title: 'A', place: 'P, San Juan', lat: '18.4', lng: '-66.1', legSeconds: '0', legMeters: '0' }),
  node({ stop: 'b-two', title: 'B', place: 'Q, Caguas', lat: 'x', lng: '-66.0' }),
  node({ stop: 'c-three', title: 'C', place: 'R, Ponce', lat: '18.0', lng: '-66.6', legSeconds: '900', legMeters: '12000' }),
] };
assert.deepEqual(stopsOf(page).map((item) => [item.slug, item.order, item.legSeconds]), [['a-one', 1, 0], ['c-three', 3, 900]], 'stops without a real position are left out, in order');

const doc = (selectors) => ({ querySelector: (selector) => (selectors.includes(selector) ? {} : null) });
const at = (href) => new URL(href, 'https://boricuaexperience.com');
assert.deepEqual(planSignals(doc(['[data-feature="plan"] .plan-card']), at('/plan?town=caguas')), [{ metric: 'plan_build', key: 'today' }], 'plans found are a plan built');
assert.deepEqual(planSignals(doc(['[data-feature="plan"] .plan-card']), at('/plan?town=caguas&surprise=1')).map((s) => s.metric), ['plan_build', 'plan_surprise'], 'a surprise plan counts as both');
assert.deepEqual(planSignals(doc(['[data-feature="plan"] .plan-card', '.plan-shared']), at('/plan?e=a,b')), [], 'a shared plan is not one the member built');
assert.deepEqual(planSignals(doc([]), at('/plan')), [], 'no plans, no signal');
console.log('PASS: trip distances, route check, directions, drive time, saved progress; plan signals');
