import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const workerSource = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
const currentVersion = workerSource.match(/const VERSION = '([^']+)'/)[1];
const origin = 'https://boricua.test';
const listeners = new Map();
const stored = new Map();
const removed = [];
let precache;
let offline = false;
const cache = {
  addAll: async (requests) => { precache = requests; },
  put: async (request, response) => stored.set(request.url, response),
  match: async (request) => stored.get(request.url),
};
class LocalRequest extends Request {
  constructor(path, options) { super(new URL(path, origin), options); }
}
vm.runInNewContext(workerSource, {
  Request: LocalRequest, URL, Promise,
  self: { addEventListener: (type, handler) => listeners.set(type, handler), skipWaiting: async () => {}, clients: { claim: async () => {} } },
  location: { origin },
  caches: { open: async () => cache, keys: async () => ['bx-v2', currentVersion], delete: async (name) => removed.push(name), match: async (request) => request === '/offline' ? new Response('anonymous offline') : stored.get(request.url) },
  fetch: async () => { if (offline) throw new Error('offline'); return new Response('private member content'); },
});
let waiting;
listeners.get('install')({ waitUntil: (promise) => { waiting = promise; } });
await waiting;
assert(precache.length > 0);
assert(precache.every((request) => request.credentials === 'omit'), 'installation must never use a session cookie');
assert(precache.some((request) => request.url.endsWith('/offline')));
listeners.get('activate')({ waitUntil: (promise) => { waiting = promise; } });
await waiting;
assert.deepEqual(removed, ['bx-v2']);
async function navigate(path) {
  let response;
  listeners.get('fetch')({ request: { method: 'GET', url: origin + path, mode: 'navigate' }, respondWith: (promise) => { response = promise; } });
  return response;
}
for (const path of ['/e/private-event', '/activity', '/account', '/notifications', '/']) {
  assert.equal(await (await navigate(path)).text(), 'private member content');
}
assert.equal(stored.size, 0, 'personalized navigation responses must never enter the cache');
offline = true;
assert.equal(await (await navigate('/activity')).text(), 'anonymous offline');
console.log('PASS: anonymous install, old-cache removal, five uncached navigation paths, offline fallback');
