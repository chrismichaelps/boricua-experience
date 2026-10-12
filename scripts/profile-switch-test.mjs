import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/assets/js/features/profileSwitch.js', import.meta.url), 'utf8').replace(/^export /gm, '');
const scope = { URLSearchParams, location: {} };
vm.runInNewContext(source + '\nthis.profileSwitch = profileSwitch;', scope);
const formOf = (mode, values) => ({ dataset: { mode }, getAttribute: () => '/create/place', elements: Object.fromEntries(Object.entries(values).map(([k, v]) => [k, { value: v }])) });
const holderOf = (form, value) => {
  const select = { form, value, handlers: {}, addEventListener(name, fn) { this.handlers[name] = fn; } };
  return { select, querySelector: () => select };
};

let went;
const creating = holderOf(formOf('create', { name: ' La Fonda ', summary: '', municipality: 'ponce', lat: '18.01' }), 'playa');
scope.profileSwitch(creating, (url) => { went = url; });
creating.select.handlers.change();
assert.equal(went, '/create/place?category=playa&name=La+Fonda&municipality=ponce&lat=18.01', 'switching keeps typed shared fields and drops empty ones');

went = null;
const editing = holderOf(formOf('edit', { name: 'X' }), 'playa');
scope.profileSwitch(editing, (url) => { went = url; });
assert.equal(editing.select.handlers.change, undefined, 'editing never reloads on a category change');
console.log('PASS: category switch reloads the create form for the new profile and keeps typed fields; edit is untouched');
