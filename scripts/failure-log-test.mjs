import assert from 'node:assert/strict';
import { clean } from '../server/failure-log/worker.js';

const good = { method: 'GET', path: '/achievements', status: 503, elapsed: 812, reason: 'my_achievements: timeout', release: '0.6.0' };
assert.deepEqual(clean(good), { ...good }, 'a well-formed failure is kept');
assert.equal(clean({ ...good, status: 404 }), null, 'only server failures are kept');
assert.equal(clean({ ...good, path: '/search?q=ana@example.com' }), null, 'query strings are refused');
assert.equal(clean({ ...good, path: 'https://x' }), null, 'paths must be local');
assert.equal(clean({ ...good, method: 'TRACE' }), null, 'unknown methods are refused');
assert.equal(clean({ ...good, reason: 'x'.repeat(900) }).reason.length, 400, 'reasons are capped');
assert.equal(clean({ ...good, reason: 'line\nbreak' }).reason, 'line break', 'control characters are flattened');
assert.equal(clean({ ...good, release: '0.6.0<script>' }).release, '0.6.0script', 'releases keep safe characters only');
assert.equal(clean({ ...good, elapsed: -5 }).elapsed, 0, 'negative timings are zeroed');
assert.equal(clean(null), null);
console.log('PASS: failure log keeps only well-formed server failures, without queries or control characters');
