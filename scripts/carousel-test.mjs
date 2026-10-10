import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

class Element {
  constructor(dataset = {}) { this.dataset = dataset; this.attrs = {}; this.events = new Map(); this.classes = new Set(); this.classList = { toggle: (name, on) => on ? this.classes.add(name) : this.classes.delete(name) }; }
  setAttribute(key, value) { this.attrs[key] = value; }
  addEventListener(name, fn) { this.events.set(name, fn); }
  dispatch(name, event = {}) { return this.events.get(name)?.(event); }
  click() { this.dispatch('click'); }
  focus() { this.focused = true; }
}
const slides = ['Luquillo', 'San Juan', 'El Yunque', 'Culebra'].map((name) => { const e = new Element({ place: name, href: `/pueblo/${name}` }); e.decode = async () => {}; return e; });
slides[0].classes.add('is-current');
const dots = slides.map((_, i) => new Element({ slide: String(i) }));
const place = new Element(); place.textContent = 'Luquillo';
const pause = new Element({ pauseLabel: 'Pause', playLabel: 'Resume' });
const hero = new Element();
hero.querySelectorAll = (selector) => selector === '.hero-slide' ? slides : dots;
hero.querySelector = (selector) => selector.includes('place') ? place : pause;
hero.contains = (element) => dots.includes(element) || element === pause;
const timers = new Map(); let sequence = 0;
const media = new Element(); media.matches = false;
const document = new Element(); document.visibilityState = 'visible';
const windowEvents = new Element();
const scope = { document, CAROUSEL: { intervalMs: 6000 }, matchMedia: () => media, addEventListener: (name, fn) => windowEvents.addEventListener(name, fn), clearTimeout: (id) => timers.delete(id), setTimeout: (fn, delay) => { const id = ++sequence; timers.set(id, { fn, delay }); return id; } };
const source = readFileSync(new URL('../public/assets/js/features/carousel.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
vm.runInNewContext(source + '\nthis.start = heroCarousel;', scope);
scope.start(hero);
const flush = () => new Promise(setImmediate);
async function tick() { assert.equal(timers.size, 1); const [id, entry] = [...timers][0]; timers.delete(id); assert.equal(entry.delay, 6000); entry.fn(); await flush(); }
await tick();
assert.equal(place.textContent, 'San Juan'); assert.equal(place.attrs.href, '/pueblo/San Juan'); assert.equal(dots[1].attrs['aria-pressed'], 'true');
await tick(); await tick(); await tick(); assert.equal(place.textContent, 'Luquillo', 'automatic rotation wraps');
dots[2].click(); await flush(); assert.equal(place.textContent, 'El Yunque');
pause.click(); assert.equal(timers.size, 0); assert.equal(pause.attrs['aria-label'], 'Resume');
dots[3].click(); await flush(); assert.equal(place.textContent, 'Culebra', 'manual selection remains available while paused'); assert.equal(timers.size, 0);
pause.click(); assert.equal(timers.size, 1);
hero.dispatch('pointerenter'); assert.equal(timers.size, 0); hero.dispatch('pointerleave'); assert.equal(timers.size, 1);
hero.dispatch('focusin'); assert.equal(timers.size, 0); hero.dispatch('focusout', { relatedTarget: null }); assert.equal(timers.size, 1);
document.visibilityState = 'hidden'; document.dispatch('visibilitychange'); assert.equal(timers.size, 0); document.visibilityState = 'visible'; document.dispatch('visibilitychange'); assert.equal(timers.size, 1);
media.matches = true; media.dispatch('change'); assert.equal(timers.size, 0); assert.equal(pause.hidden, true); dots[1].click(); await flush(); assert.equal(place.textContent, 'San Juan'); assert.equal(timers.size, 0);
media.matches = false; media.dispatch('change'); assert.equal(timers.size, 1);
slides[2].decode = async () => { throw new Error('broken image'); }; dots[2].click(); await flush(); assert.equal(place.textContent, 'San Juan', 'failed decoding retains the visible image and caption');
let finish; slides[0].decode = () => new Promise((resolve) => { finish = resolve; }); dots[0].click(); dots[3].click(); await flush(); finish(); await flush(); assert.equal(place.textContent, 'Culebra', 'late decoding cannot replace a newer manual selection');
windowEvents.dispatch('pagehide'); assert.equal(timers.size, 0);
console.log('PASS: timed rotation/wrap, synchronized caption/dot, manual selection, pause, focus/hover/visibility, reduced motion, failed/late decoding');

// Link the actual ES module against a simulated old cache-first worker.
const currentConfig = readFileSync(new URL('../public/assets/js/constants/config.js', import.meta.url), 'utf8');
const oldConfig = currentConfig.replace(/export const CAROUSEL[^;]+;\s*/, '');
const carouselSource = readFileSync(new URL('../public/assets/js/features/carousel.js', import.meta.url), 'utf8');
const mainSource = readFileSync(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
const specifier = carouselSource.match(/from ['"]([^'"]+)['"]/)[1];
const rootSpecifier = mainSource.match(/heroCarousel.*from ['"]([^'"]+)['"]/)[1];
assert(/\?v=\d+$/.test(rootSpecifier), 'the entrypoint must version the carousel module so browsers drop an old cached copy');
const requestUrl = new URL(specifier, new URL(rootSpecifier, 'https://boricua.test/assets/js/main.js')).href;
const oldCache = new Map([['https://boricua.test/assets/js/constants/config.js', oldConfig]]);
const fetched = oldCache.get(requestUrl) ?? currentConfig;
const dataUrl = (code) => 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
const linked = carouselSource.replace(specifier, dataUrl(fetched));
assert.equal(typeof (await import(dataUrl(linked))).heroCarousel, 'function');
await assert.rejects(import(dataUrl(carouselSource.replace(specifier, dataUrl(oldConfig)))));
console.log('PASS: versioned module linkage works with a cached pre-carousel configuration');
