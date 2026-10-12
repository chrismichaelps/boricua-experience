import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');

function load(lang) {
  const document = { documentElement: { lang }, querySelectorAll: () => [] };
  const scope = { document, Intl, Date, Number, Object, Math };
  vm.runInNewContext(read('../public/assets/js/constants/messages.js') + read('../public/assets/js/features/localTime.js') + '\nthis.localize = localizeMoment;', scope);
  return scope.localize;
}

function moment(style, start, end, text) {
  return { dataset: { moment: style, ...(end ? { ends: end } : {}) }, getAttribute: () => start, textContent: text, title: '' };
}

const zone = process.env.TZ;
const startsAt = '2027-03-20T23:30:00Z';
const endsAt = '2027-03-21T02:00:00Z';
const localize = load('en');

if (zone === 'America/Puerto_Rico') {
  const node = moment('schedule', startsAt, endsAt, 'Saturday, March 20, 2027 · 7:30 PM – 10:00 PM');
  localize(node);
  assert.equal(node.textContent, 'Saturday, March 20, 2027 · 7:30 PM – 10:00 PM', 'Puerto Rico readers keep the server text');
  assert.equal(node.title, '');
} else if (zone === 'America/Los_Angeles') {
  const node = moment('schedule', startsAt, endsAt, 'Saturday, March 20, 2027 · 7:30 PM – 10:00 PM');
  localize(node);
  assert.match(node.textContent, /^Saturday, March 20, 2027 · 4:30\sPM – 7:00\sPM PDT$/);
  assert.equal(node.title, 'Puerto Rico time: Saturday, March 20, 2027 · 7:30 PM – 10:00 PM');
  const day = moment('day', startsAt, null, 'Sat, Mar 20');
  localize(day);
  assert.equal(day.textContent, 'Sat, Mar 20');
  localize(node);
  assert.match(node.textContent, /PDT$/, 'a second pass leaves the node alone');
} else if (zone === 'Europe/Madrid') {
  const node = moment('day', startsAt, null, 'Sáb 20 mar');
  load('es')(node);
  assert.match(node.textContent, /^Dom/i, 'the date crosses midnight in Madrid');
  const bad = moment('when', 'not a date', null, 'Hoy · 7:30 PM');
  localize(bad);
  assert.equal(bad.textContent, 'Hoy · 7:30 PM', 'an unreadable instant keeps the server text');
}
console.log(`local time ok in ${zone}`);

const unknown = moment('schedule', startsAt, null, 'Start · End time not provided');
localize(unknown);
assert(unknown.textContent.includes('End time not provided'), 'unknown end stays explicit in foreign zones');
assert(!unknown.textContent.includes('1970'));
