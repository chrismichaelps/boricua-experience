import assert from 'node:assert/strict';

// Follow-ups come from what the last answer found, and a drawn plan can start its trip.
const { followUps, short, tripHref } = await import('../public/assets/js/features/assistantNext.js');
const labels = {
  nextPlan: 'Arma un plan con «:a» y «:b»', nextRoute: '¿Cómo llego de «:a» a «:b»?', nextFree: '¿Cuáles son gratis?',
  nextFamily: '¿Con niños?', nextAnother: 'Otra opción', nextFreeplan: 'Plan gratis', nextPlace: '¿Qué hay cerca de :place?',
};
const event = (slug, title) => ({ href: `/e/${slug}`, title });
const two = [event('bomba-loiza', 'Bomba en Loíza'), event('feria-caguas', 'Feria de artesanías de Caguas con música en vivo y comida típica')];

const asks = followUps(two, [], labels);
assert.equal(asks[0], 'Arma un plan con «Bomba en Loíza» y «Feria de artesanías de Caguas con mús…»', 'two activities suggest a plan with their names, shortened');
assert.equal(asks[1], '¿Cómo llego de «Bomba en Loíza» a «Feria de artesanías de Caguas con mús…»?');
assert.deepEqual(asks.slice(2), ['¿Cuáles son gratis?', '¿Con niños?']);
assert.ok(asks.length <= 4, 'at most four');
assert.deepEqual(followUps(two, [{ kind: 'itinerary' }], labels), ['Otra opción', 'Plan gratis', '¿Cuáles son gratis?', '¿Con niños?'], 'after a plan, another plan comes first');
assert.ok(!followUps(two, [{ kind: 'route' }], labels).some((ask) => ask.startsWith('¿Cómo llego')), 'a route already drawn is not offered again');
assert.deepEqual(followUps([{ href: '/lugar/la-placita', title: 'La Placita' }], [], labels), ['¿Qué hay cerca de La Placita?'], 'a place suggests what is near it');
assert.deepEqual(followUps([], [], labels), [], 'nothing found, nothing suggested');
assert.ok(!followUps(two, [], labels, asks[0]).includes(asks[0]), 'the question just asked is not suggested again');
assert.deepEqual(followUps([{ href: 'https://evil.example/e/x', title: 'x' }], [], labels), [], 'only the app\'s own addresses count');
assert.deepEqual(followUps(two, [], {}), [], 'missing messages are never shown with placeholders');
assert.equal(short('  a   b  '), 'a b');
assert.equal(tripHref('/plan?e=bomba-loiza,feria-caguas'), '/plan/viaje?e=bomba-loiza,feria-caguas', 'a drawn plan starts its trip');
assert.equal(tripHref('/plan?e=x'), '', 'too short to be a plan');
assert.equal(tripHref('https://evil.example/plan?e=abc,def'), '');
console.log('PASS: assistant follow-ups from what was found; plan trips from the chat');
