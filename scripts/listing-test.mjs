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

let finishPage, calls=0, inserted='', removed=false;
const attributes=new Map();
const more={href:'/search?category=comida&places_after=next',addEventListener(_name,fn){this.click=fn;},getAttribute:k=>attributes.get(k),setAttribute:(k,v)=>attributes.set(k,v),removeAttribute:k=>attributes.delete(k),closest:()=>({querySelector:()=>({querySelectorAll:()=>[],insertAdjacentHTML:(_position,html)=>{inserted+=html;}})}),remove:()=>{removed=true;}};
const paging={getJson:()=>{calls++;return new Promise(resolve=>finishPage=resolve);},location:{href:''}};
vm.runInNewContext(source+'\nthis.attach=loadMore;',paging);
paging.attach(more);
const first=more.click({preventDefault(){}});
await more.click({preventDefault(){}});
assert.equal(calls,1,'repeat activation while loading cannot append duplicate pages');
finishPage({html:'<article>next</article>',next:null});await first;
assert.equal(inserted,'<article>next</article>');assert(removed);assert(!attributes.has('aria-busy'));
console.log('PASS: independent place load-more locks duplicate activations and appends once');

const copy={scrollTop:0,clientHeight:100,scrollHeight:250,scrollBy({top}){this.scrollTop+=top;}};
const card={querySelector:()=>copy,closest(){return this;}};const delegated={addEventListener(_name,fn){this.key=fn;}};
vm.runInNewContext(source+'\nthis.attachCard=cardScroll;',paging);paging.attachCard(delegated);let intercepted=0;
const key=(name,extra={})=>delegated.key({target:card,key:name,preventDefault(){intercepted++;},...extra});
key('ArrowDown');assert.equal(copy.scrollTop,40);key('ArrowUp');assert.equal(copy.scrollTop,0);
key('ArrowUp');assert.equal(intercepted,2,'top boundary lets native page scrolling continue');
key('PageDown');assert.equal(copy.scrollTop,100);key('ArrowRight');assert.equal(intercepted,3,'horizontal rail keys remain native');
key('ArrowDown',{ctrlKey:true});assert.equal(intercepted,3,'modified keyboard actions stay native');
copy.scrollTop=150;key('ArrowDown');assert.equal(intercepted,3,'bottom boundary lets the page continue');
console.log('PASS: overflowing card copy is keyboard-scrollable without trapping the page');

const dynamicallyInserted={...card,closest(){return this;}};copy.scrollTop=0;
delegated.key({target:dynamicallyInserted,key:'ArrowDown',preventDefault(){}});assert.equal(copy.scrollTop,40,'delegated handler covers cards inserted after initialization, including near rails');
