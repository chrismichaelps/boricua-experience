import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const store = new Map();
const localStorage = { getItem: (key) => store.get(key) ?? null, setItem: (key, value) => store.set(key, String(value)) };
const scope = { localStorage, JSON, Math, location: { pathname: '/' }, document: { querySelector: () => null }, CSS: { escape: (value) => value }, decodeURIComponent };
const source = readFileSync(new URL('../public/assets/js/features/suggest.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
vm.runInNewContext(source + '\nthis.api={rounded,rememberTown,readRecent};', scope);

assert.equal(JSON.stringify(scope.api.rounded({ coords: { latitude: 18.466312, longitude: -66.105734 } })), '{"lat":18.47,"lng":-66.11}', 'a position is rounded to about a kilometre before it is sent');
const names = { 'san-juan': 'San Juan', culebra: 'Culebra', ponce: 'Ponce', rincon: 'Rincón', fajardo: 'Fajardo' };
scope.api.rememberTown('/pueblo/', '/search', (slug) => names[slug]);
assert.equal(store.size, 0, 'pages other than town guides are not remembered');
scope.api.rememberTown('/pueblo/', '/pueblo/unknown', () => undefined);
assert.equal(store.size, 0, 'a town without a known name is not remembered');
for (const slug of ['san-juan', 'culebra', 'ponce', 'rincon', 'san-juan', 'fajardo']) scope.api.rememberTown('/pueblo/', `/pueblo/${slug}`, (found) => names[found]);
assert.deepEqual(scope.api.readRecent().map((town) => town.slug), ['fajardo', 'san-juan', 'rincon', 'ponce'], 'newest first, no repeats, at most four');
assert.equal(scope.api.readRecent()[2].name, 'Rincón', 'the town name, not the page title, is kept');
store.set('bx-recent-towns', '{not json');
assert.equal(scope.api.readRecent().length, 0, 'unreadable storage reads as no towns');
console.log('PASS: rounded nearby position, recent towns newest first without repeats, capped, named from the picker, tolerant of bad storage');
