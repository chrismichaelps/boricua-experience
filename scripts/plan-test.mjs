import assert from 'node:assert/strict';

// The modules' pure parts: a plan's pins, its drawn legs, and the interest summary wording.
globalThis.window = globalThis;
globalThis.matchMedia = () => ({ matches: false, addEventListener() {} });
globalThis.document = { documentElement: { lang: 'es' }, addEventListener() {}, querySelector: () => null };
const { pinsOf, legLines } = await import('../public/assets/js/features/plan.js');
const { summary } = await import('../public/assets/js/features/interest.js');

const node = { dataset: { pins: JSON.stringify([{ order: 1, slug: 'a-one', lat: 18.4, lng: -66.1 }, { order: 2, slug: 'b-two', lat: 18.42, lng: -66.0 }, { order: 3, slug: 'c-three', lat: 'x', lng: -65.9 }, { order: 4, slug: 'd-four', lat: 18.3, lng: -65.8 }]) } };
const pins = pinsOf(node);
assert.deepEqual(pins.map((pin) => pin.slug), ['a-one', 'b-two', 'd-four'], 'pins without a real position are left out');
assert.deepEqual(pinsOf({ dataset: { pins: '{broken' } }), [], 'a broken pin list draws nothing');

const lines = legLines(pins, [{ order: 1, coordinates: [[-66.1, 18.4], [-66.05, 18.41], [-66.0, 18.42]] }]);
assert.equal(lines.road.geometry.coordinates.length, 1, 'a leg with a road route is drawn on the road');
assert.equal(lines.straight.geometry.coordinates.length, 1, 'a leg without one is a straight dashed segment');
assert.deepEqual(lines.straight.geometry.coordinates[0], [[-66.0, 18.42], [-65.8, 18.3]]);
assert.equal(legLines(pins, null).straight.geometry.coordinates.length, 2, 'no routes at all still connects every stop');

const line = { dataset: { goingOne: ':count persona va', goingOther: ':count personas van', interestedOne: ':count interesada', interestedOther: ':count interesadas' } };
assert.equal(summary(line, 1, 0), '1 persona va · 0 interesadas', 'singular and plural follow each count');
assert.equal(summary(line, 38, 1), '38 personas van · 1 interesada');
console.log('PASS: plan pins and road or straight legs; interest counts in singular and plural');
