import assert from 'node:assert/strict';
import { profileSwitch } from '../public/assets/js/features/profileSwitch.js';

function fixture(mode, coverTheme) {
  let changed;
  const visits = [];
  const form = {
    dataset: { mode },
    elements: {
      name: { value: '  Playa & bosque  ' },
      summary: { value: '' },
      municipality: { value: 'ponce' },
      lat: { value: '18.01' },
      coverTheme: { value: coverTheme },
      'd.cuisine': { value: 'criolla' },
    },
    getAttribute: () => '/create/place',
  };
  const select = { value: 'playa', form, addEventListener: (event, handler) => {
    assert.equal(event, 'change');
    changed = handler;
  } };
  profileSwitch({ querySelector: () => select }, (url) => visits.push(url));
  return { run: () => changed?.(), hasHandler: () => typeof changed === 'function', visits };
}

const themed = fixture('create', 'bosque');
themed.run();
const query = new URL(themed.visits[0], 'https://example.test').searchParams;
assert.equal(query.get('category'), 'playa');
assert.equal(query.get('name'), 'Playa & bosque');
assert.equal(query.get('coverTheme'), 'bosque');
assert.equal(query.get('municipality'), 'ponce');
assert.equal(query.get('lat'), '18.01');
assert.equal(query.has('summary'), false);
assert.equal(query.has('d.cuisine'), false);
const defaults = fixture('create', '');
defaults.run();
assert.equal(new URL(defaults.visits[0], 'https://example.test').searchParams.has('coverTheme'), false);
const editing = fixture('edit', 'mar');
editing.run();
assert.equal(editing.visits.length, 0);
assert.equal(editing.hasHandler(), false);
console.log('PASS: category switching retains cover radio and shared draft, drops old facts, preserves edit forms');
