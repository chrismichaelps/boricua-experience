import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync('public/assets/js/features/listing.js', 'utf8').replace(/^import .*;\n/, '').replaceAll('export function ', 'function ');
function setup({ intent, path = '/search', reduced = false, history = false, blocked = false, heading = true } = {}) {
  const listeners = {}, scrolls = [];
  const values = new Map(intent === undefined ? [] : [['bx_search_arrival', intent]]);
  const root = { addEventListener: (name, fn) => listeners[name] = fn, getElementById: () => heading ? { scrollIntoView: options => scrolls.push(options) } : null };
  const lifecycle = {
    location: { href: `https://example.test${path}`, origin: 'https://example.test', pathname: path },
    sessionStorage: { setItem: (key, value) => { if (blocked) throw Error(); values.set(key, value); }, getItem: key => { if (blocked) throw Error(); return values.get(key) ?? null; }, removeItem: key => values.delete(key) },
    performance: { getEntriesByType: () => [{ type: history ? 'back_forward' : 'navigate' }] },
    requestAnimationFrame: fn => fn(), matchMedia: () => ({ matches: reduced })
  };
  vm.runInNewContext(source + '\nsearchArrival(root, lifecycle);', { root, lifecycle, URL, Date, JSON, Number, queueMicrotask });
  return { listeners, scrolls, values };
}
const fresh = JSON.stringify({ path: '/search', at: Date.now() });
assert.equal(setup({ intent: fresh }).scrolls[0].behavior, 'smooth');
assert.equal(setup({ intent: fresh, reduced: true }).scrolls[0].behavior, 'instant');
for (const options of [{}, {intent:'bad'}, {intent:fresh, history:true}, {intent:fresh,path:'/map'}, {intent:fresh,blocked:true}, {intent:fresh,heading:false}, {intent:JSON.stringify({path:'/search',at:0})}, {intent:JSON.stringify({path:'/search',at:Date.now()+60000})}]) assert.equal(setup(options).scrolls.length,0);
const consumed = setup({intent:fresh}); assert.equal(consumed.values.size,0);
const form = {matches:()=>true, method:'get', action:'https://example.test/search'};
const submit = setup(); submit.listeners.submit({target:form}); await Promise.resolve(); assert.equal(JSON.parse(submit.values.get('bx_search_arrival')).path,'/search');
const cancelled = setup(); cancelled.listeners.submit({target:form,defaultPrevented:true}); assert.equal(cancelled.values.size,0);
function click(options={}) {
  const state = setup();
  state.listeners.click({button:0,target:{closest:()=>({href:'https://example.test/search?t=family', ...options.link})}, ...options.event});
  return state;
}
const normal = click(); await Promise.resolve(); assert.equal(normal.values.size,1);
const late = setup(); const lateEvent = {target:form}; late.listeners.submit(lateEvent); lateEvent.defaultPrevented = true; await Promise.resolve(); assert.equal(late.values.size,0);
const near = setup(); near.listeners.submit({target:{...form,matches: selector => selector.includes('.near-form')}}); await Promise.resolve(); assert.equal(near.values.size,1);
for (const options of [{event:{ctrlKey:true}}, {event:{button:1}}, {event:{defaultPrevented:true}}, {link:{target:'_blank'}}, {link:{href:'https://external.test/search'}}, {link:{href:'https://example.test/map?near=1'}}]) assert.equal(click(options).values.size,0);
assert.equal(setup({blocked:true}).scrolls.length,0);
console.log('PASS: explicit one-shot search arrival, smooth/reduced motion, native submission, cancellation, history, expiry and private-storage failure');
