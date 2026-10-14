import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

// The browser module's pure parts: which signals an address carries, and the server's day.
globalThis.window = globalThis;
const { pageSignals, today, keeps, filterBoard, primeAudio } = await import('../public/assets/js/features/achievements.js');
const at = (href) => new URL(href, 'https://boricuaexperience.com');

assert.deepEqual(pageSignals(at('/pueblo/loiza')), [{ metric: 'town_view', key: 'loiza' }], 'a town page is a town view');
assert.deepEqual(pageSignals(at('/pueblo/loiza/')), [{ metric: 'town_view', key: 'loiza' }], 'a trailing slash is the same page');
assert.deepEqual(pageSignals(at('/e/bomba-en-loiza-abc123')), [{ metric: 'event_view', key: 'bomba-en-loiza-abc123' }], 'an activity page is an activity view');
assert.deepEqual(pageSignals(at('/e/bomba-en-loiza-abc123/requests')), [], 'an activity\'s other pages are not views');
assert.deepEqual(pageSignals(at('/map')), [{ metric: 'map_open', key: 'today' }], 'the map is opened');
assert.deepEqual(pageSignals(at('/map?near=1&radio=10')).map((s) => s.metric), ['map_open', 'radius_use'], 'a radius on the map counts too');
assert.deepEqual(pageSignals(at('/search?radio=25')), [{ metric: 'radius_use', key: 'today' }], 'a radius search is recorded');
assert.deepEqual(pageSignals(at('/search?q=bomba')), [], 'a plain search is not');
assert.deepEqual(pageSignals(at('/pueblo/<script>')), [], 'only well-formed slugs are sent');
assert.equal(today(new Date('2026-12-01T03:30:00Z')), '2026-11-30', 'the day is Puerto Rico\'s, four hours behind UTC');
assert.equal(today(new Date('2026-12-01T04:30:00Z')), '2026-12-01');

// Every badge: one per seeded achievement, the shared motion classes, ids prefixed by its name, no
// scripts or external references, and a reduced-motion fallback.
const folder = new URL('../public/assets/badges/', import.meta.url);
const files = readdirSync(folder).filter((name) => name.endsWith('.svg'));
// The seed is a private migration; where it is present, every badge it names must exist.
let seed = '';
try { seed = readFileSync(new URL('../supabase/migrations/20261013050100_achievements_seed.sql', import.meta.url), 'utf8'); } catch { /* not in this checkout */ }
const seeded = [...seed.matchAll(/^\s+\('[a-z0-9-]+', '[a-z]+', '[a-z]+', '[a-z0-9_]+', '[a-z]+', \d+, \d+, '[^']*', (?:null|'[^']*'), '([a-z0-9-]+)'/gm)].map((m) => m[1]);
if (seed) {
  assert.equal(seeded.length, 81, 'every seeded achievement is read');
  for (const badge of seeded) assert.ok(files.includes(`${badge}.svg`), `badge ${badge} is drawn`);
}
const drawn = new Set();
for (const name of files) {
  const svg = readFileSync(new URL(name, folder), 'utf8');
  const badge = name.replace(/\.svg$/, '');
  assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"'), `${badge} is a 120 unit square`);
  assert.ok(!/<script|on[a-z]+=|href="http|xlink:href="http|<foreignObject/i.test(svg), `${badge} carries nothing active`);
  assert.ok(svg.includes('prefers-reduced-motion'), `${badge} rests under reduced motion`);
  for (const id of svg.matchAll(/ id="([^"]+)"/g)) assert.ok(id[1].startsWith(`bx-${badge}-`), `${badge} prefixes its ids (${id[1]})`);
  assert.ok(/class="b-(float|sway|pulse|twinkle|spin|blink)/.test(svg), `${badge} moves gently`);
  assert.ok(/bx-badge-(common|rare|epic|legendary)/.test(svg), `${badge} names its rarity`);
  const body = svg.replace(/<style>[\s\S]*?<\/style>/, '').replace(/ id="[^"]+"| data-badge="[^"]+"|url\(#[^)]+\)/g, '');
  assert.ok(!drawn.has(body), `${badge} is unique`);
  drawn.add(body);
  assert.ok(svg.length < 12000, `${badge} stays small (${svg.length} bytes)`);
}
console.log(`PASS: page signals and Puerto Rico day; ${files.length} unique, safe, versioned-id badges with gentle motion and reduced-motion rest`);

// Filters switch in place: every tile is on the page, the empty notice and the chosen chip follow.
const tile = (category, unlocked) => ({ dataset: { category, unlocked: unlocked ? '1' : '0' }, hidden: false });
const tiles = [tile('discovery', true), tile('discovery', false), tile('hosting', false)];
assert.deepEqual(tiles.map((t) => keeps('', t)), [true, true, true]);
assert.deepEqual(tiles.map((t) => keeps('unlocked', t)), [true, false, false]);
assert.deepEqual(tiles.map((t) => keeps('hosting', t)), [false, false, true]);
const chipOf = (filter) => ({ dataset: { filter }, attrs: {}, classList: { on: false, toggle(_name, on) { this.on = on; } }, setAttribute(k, v) { this.attrs[k] = v; }, removeAttribute(k) { delete this.attrs[k]; } });
const chips = [chipOf(''), chipOf('unlocked'), chipOf('hosting')];
const empty = { hidden: true };
const board = { querySelectorAll: (q) => (q.includes('li') ? tiles : chips), querySelector: () => empty };
const replaced = [];
const view = { URL, location: { href: 'https://boricuaexperience.com/achievements' }, history: { state: null, replaceState: (_s, _t, url) => replaced.push(url) } };
assert.equal(filterBoard(board, 'unlocked', view), 1);
assert.deepEqual(tiles.map((t) => t.hidden), [false, true, true]);
assert.equal(chips[1].attrs['aria-current'], 'page'); assert.equal(chips[0].attrs['aria-current'], undefined);
assert.equal(replaced.at(-1), '/achievements?c=unlocked', 'the address keeps the filter without a reload');
const noneLeft = [tile('hosting', false)];
assert.equal(filterBoard({ ...board, querySelectorAll: (q) => (q.includes('li') ? noneLeft : chips) }, 'unlocked', view), 0);
assert.equal(empty.hidden, false, 'an empty filter shows the empty notice');
filterBoard(board, '', view); assert.equal(replaced.at(-1), '/achievements');

// A phone's first tap wakes the audio so a later unlock can chime.
const listeners = new Map();
let resumed = 0, played = 0;
class FakeContext { constructor() { this.state = 'suspended'; this.destination = {}; } resume() { resumed++; this.state = 'running'; return Promise.resolve(); } createBuffer() { return {}; } createBufferSource() { return { connect() {}, start() { played++; } }; } }
const phone = { AudioContext: FakeContext, addEventListener: (type, fn) => listeners.set(type, fn), removeEventListener: (type) => listeners.delete(type), document: { hidden: false, addEventListener() {} } };
primeAudio(phone);
assert.ok(listeners.has('touchend') && listeners.has('click'), 'the first touch or click is awaited');
listeners.get('touchend')();
assert.equal(resumed, 1); assert.equal(played, 1, 'one silent sample plays inside the tap');
assert.equal(listeners.size, 0, 'once awake, nothing more is awaited');
console.log('PASS: in-place board filters with address and empty notice; audio woken by the first tap');
