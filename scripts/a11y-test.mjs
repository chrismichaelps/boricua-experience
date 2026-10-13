import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const boot = readFileSync(new URL('../public/assets/js/a11y-boot.js', import.meta.url), 'utf8');
let stored = null; let blocked = false;
const props = {};
const root = { className: 'assistant-open reveal-ready a11y-stale', style: { setProperty: (k, v) => { props[k] = v; }, removeProperty: (k) => { delete props[k]; } } };
const scope = { window: {}, document: { documentElement: root }, localStorage: { getItem: () => { if (blocked) throw new Error('blocked'); return stored; }, setItem: (_k, v) => { if (blocked) throw new Error('blocked'); stored = v; } }, Number, JSON };
vm.runInNewContext(boot, scope);
const model = scope.window.bxA11y;
assert.equal(root.className, 'assistant-open reveal-ready', 'boot with nothing stored removes stale settings and keeps page classes');

stored = JSON.stringify({ scale: 99, line: -1, spacing: 2, font: 'comic', color: 'invert', titles: 'yes', still: true, evil: '<script>' });
const cleaned = model.read();
assert.deepEqual({ ...cleaned }, { ...model.defaults(), spacing: 2, still: true }, 'stored values outside the model are dropped');
assert.equal(model.clean({ align: true }).align, 'left', 'the earlier alignment switch reads as left');
assert.equal(model.clean({ align: 'justify' }).align, '', 'unknown alignments are dropped');
assert.equal(model.clean({ ink: '#d43c3c', heading: 'red', paper: 'url(javascript:x)' }).ink, '#d43c3c', 'palette colors are kept');
assert.equal(model.clean({ heading: 'red', paper: 'url(javascript:x)' }).paper, '', 'colors outside the palette are dropped');
assert.equal(model.clean({ text: 9 }).text, 0, 'font sizing outside its steps is dropped');
stored = '{not json'; assert.deepEqual({ ...model.read() }, { ...model.defaults() }, 'corrupt storage reads as defaults');
blocked = true; assert.deepEqual({ ...model.read() }, { ...model.defaults() }, 'blocked storage reads as defaults'); model.save({ scale: 1 }); blocked = false;

model.apply(model.clean({ scale: 3, line: 2, spacing: 1, font: 'dyslexia', color: 'mono', mask: true, focus: true }), root);
assert.equal(root.className, 'assistant-open reveal-ready a11y-scaled a11y-line a11y-spacing a11y-font-dyslexia a11y-color-mono a11y-mask a11y-focus');
assert.equal(props['--a11y-zoom'], '1.3'); assert.equal(props['--a11y-line'], '1.9'); assert.equal(props['--a11y-spacing'], '0.03em');
model.apply(model.clean({ align: 'center', ink: '#000000', paper: '#ffffff' }), root);
assert.equal(root.className, 'assistant-open reveal-ready a11y-align-center a11y-ink a11y-paper');
assert.equal(props['--a11y-ink'], '#000000'); assert.equal(props['--a11y-paper'], '#ffffff');
model.apply(model.defaults(), root);
assert.equal(root.className, 'assistant-open reveal-ready'); assert.deepEqual(props, {}, 'defaults clear every variable');

for (const [name, profile] of Object.entries(model.PROFILES)) {
  const applied = model.clean({ ...model.defaults(), ...profile });
  for (const [key, value] of Object.entries(profile)) assert.equal(applied[key], value, `${name} profile survives cleaning (${key})`);
}
model.save({ scale: 2, color: 'dark' }); assert.equal(JSON.parse(stored).color, 'dark');
console.log('PASS: settings model sanitizes storage, survives blocked/corrupt storage, applies classes and variables without touching page classes, profiles are valid, alignment and palettes are validated');
