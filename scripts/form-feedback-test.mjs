import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
const source = await fs.readFile(new URL('../public/assets/js/features/submitFeedback.js', import.meta.url), 'utf8');
const observers = [];
class Observer {
  constructor(callback) { this.callback = callback; observers.push(this); }
  observe(owner) { this.owner = owner; }
  disconnect() { this.stopped = true; }
}
const context = vm.createContext({ queueMicrotask, URL, location: { href: 'https://boricuaexperience.com/search', origin: 'https://boricuaexperience.com', pathname: '/search' }, MutationObserver: Observer });
vm.runInContext(source.replace('export function', 'function') + '\nglobalThis.start = submitFeedback;', context);
function control(hidden = false) {
  const attributes = new Map(); const classes = new Set();
  return { hidden, disabled: false, name: 'choice', value: 'necessary', attributes, classes,
    setAttribute: (key, value) => attributes.set(key, value),
    getAttribute: key => attributes.get(key) ?? null,
    removeAttribute: key => attributes.delete(key),
    classList: { add: key => classes.add(key), remove: key => classes.delete(key) } };
}
const handlers = new Map(); const lifecycle = new Map(); const forms = [];
const root = { addEventListener: (name, callback, capture = false) => handlers.set(`${name}:${capture ? 'capture' : 'bubble'}`, callback), querySelectorAll: () => forms.filter(f => f.dataset.submitting) };
context.start(root, { addEventListener: (name, callback) => lifecycle.set(name, callback) });
function fixture(hidden = false) {
  const button = control(hidden); const form = control(); form.dataset = {}; form.querySelector = () => button;
  form.closest = () => form.getAttribute('aria-busy') === 'true' ? form : null;
  forms.push(form);
  return { form, button, event: { target: form, submitter: button, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } } };
}
const flush = () => new Promise(resolve => queueMicrotask(resolve));
// A real click drains microtasks between listeners: capture, checkpoint, the form's own listener, checkpoint, bubble.
async function submit(event, own = () => {}) {
  handlers.get('submit:capture')(event); await flush();
  own(event); await flush();
  handlers.get('submit:bubble')(event); await flush();
}
const native = fixture(true);
await submit(native.event);
assert.equal(native.button.getAttribute('aria-busy'), 'true');
assert.equal(native.button.hidden, false);
assert.equal(native.button.disabled, false);
assert.equal(native.button.name, 'choice'); assert.equal(native.button.value, 'necessary');
handlers.get('submit:capture')(native.event); assert.equal(native.event.defaultPrevented, true);
lifecycle.get('pageshow')();
assert.equal(native.button.hidden, true); assert.equal(native.button.getAttribute('aria-busy'), null);
assert.equal(native.form.dataset.submitting, undefined);
const automatic = fixture(true); automatic.event.submitter = null;
await submit(automatic.event);
assert.equal(automatic.button.getAttribute('aria-busy'), 'true'); lifecycle.get('pageshow')();
assert.equal(automatic.button.hidden, true);
const canceled = fixture();
await submit(canceled.event, event => event.preventDefault());
assert.equal(canceled.button.getAttribute('aria-busy'), null);
const ajax = fixture();
// The save toggle prevents navigation and marks itself busy only in its own listener, after capture.
// What the toggle sees when its own listener runs: the form must not already look busy, or it refuses to send.
let busyWhenToggleRan = null;
await submit(ajax.event, event => { busyWhenToggleRan = ajax.form.getAttribute('aria-busy'); event.preventDefault(); ajax.form.setAttribute('aria-busy', 'true'); });
assert.equal(busyWhenToggleRan, null, 'a script-owned form is not marked busy before its own listener runs');
assert.equal(ajax.form.dataset.submitting, undefined);
assert.equal(ajax.button.getAttribute('aria-busy'), 'true');
ajax.form.setAttribute('aria-busy', 'false'); observers.at(-1).callback();
assert.equal(ajax.button.getAttribute('aria-busy'), null); assert.equal(observers.at(-1).stopped, true);
const passwords = await fs.readFile(new URL('../public/assets/js/features/passwords.js', import.meta.url), 'utf8');
vm.runInContext(passwords.replaceAll('export function', 'function') + '\nglobalThis.progress = passwordProgress;', context);
assert.equal(context.progress(''), 0); assert.equal(context.progress('abc'), 3); assert.equal(context.progress('x'.repeat(40)), 20);
console.log('PASS: native/canceled/AJAX feedback with real click listener ordering, duplicate prevention, named submitter values, hidden filter restoration, BFCache reset and bounded local password guidance');

const listing = await fs.readFile(new URL('../public/assets/js/features/listing.js', import.meta.url), 'utf8');
vm.runInContext(listing.replace(/^import .*;$/gm, '').replace(/^export /gm, '') + '\nglobalThis.attachMore=loadMore;', context);
let reply, fetches=0, appended='';
context.getJson=()=>{fetches++;return new Promise(resolve=>reply=resolve);};
const more=control();more.href='https://boricuaexperience.com/search?places_after=next';more.dataset={};
more.addEventListener=(_name,fn)=>{more.ownClick=fn;};
more.closest=selector=>selector==='.results'?{querySelector:()=>({insertAdjacentHTML:(_where,html)=>{appended+=html;}})}:more;
context.attachMore(more);
function clickEvent(link){return {target:link,button:0,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;}};}
async function dispatchClick(event, own=()=>{}) {
  handlers.get('click:capture')?.(event);await flush();
  const pending=own(event);await flush();
  handlers.get('click:bubble')?.(event);await flush();
  return {pending};
}
const firstMore=await dispatchClick(clickEvent(more),event=>more.ownClick(event));
assert.equal(fetches,1,'shared feedback must not preempt progressive pagination');
assert.equal(more.getAttribute('aria-busy'),'true');assert.equal(more.getAttribute('aria-disabled'),null,'script owns the control lifetime');
await dispatchClick(clickEvent(more),event=>more.ownClick(event));assert.equal(fetches,1,'own pending lock prevents duplicate reads');
reply({html:'<article>next</article>',next:'https://boricuaexperience.com/search?places_after=last'});await firstMore.pending;
assert.equal(appended,'<article>next</article>');assert.equal(more.getAttribute('aria-busy'),null);assert.equal(more.getAttribute('aria-disabled'),null);
const nextMore=await dispatchClick(clickEvent(more),event=>more.ownClick(event));assert.equal(fetches,2,'the next page remains actionable');
reply({html:'',next:'https://boricuaexperience.com/search?places_after=last'});await nextMore.pending;
const nativeLink=control();nativeLink.href='https://boricuaexperience.com/signin';nativeLink.closest=()=>nativeLink;
await dispatchClick(clickEvent(nativeLink));assert.equal(nativeLink.getAttribute('aria-busy'),'true','native links keep loading feedback');lifecycle.get('pageshow')();
console.log('PASS: actual navigation feedback plus pagination respect capture/target/bubble microtasks, completion and repeated pages');
