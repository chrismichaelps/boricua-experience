import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

class RequestFailed extends Error { constructor(status, code, key) { super(code); this.status = status; this.code = code; this.key = key; } }
const posts = [];
let refuseStart = null;
const postJson = async (url, body) => {
  posts.push({ url, body });
  if (url.endsWith('/media') && refuseStart) throw refuseStart;
  return url.endsWith('/media') ? { id: 'm1', uploadUrl: 'https://test.supabase.co/storage/v1/object/upload/sign/place-media/p/m1.pdf?token=t', apiKey: 'public-key', finishUrl: '/lugar/test/media/m1/finish' } : { ok: true };
};
const scope = { RequestFailed, postJson, URL, Error, Math, Blob, location: {} };
const source = readFileSync(new URL('../public/assets/js/features/mediaUpload.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
vm.runInNewContext(source + '\nthis.api={fitted,refusal,mediaUpload};', scope);

assert.equal(JSON.stringify(scope.api.fitted(4000, 3000)), '{"width":1600,"height":1200}', 'large photos shrink to the longest side');
assert.equal(JSON.stringify(scope.api.fitted(800, 1200)), '{"width":800,"height":1200}', 'small photos keep their size');
const form = { dataset: { kind: 'menu', choose: 'choose', working: 'working', failed: 'failed', tooLarge: 'large', invalid: 'invalid', limit: 'limit' } };
assert.equal(scope.api.refusal(form, new RequestFailed(409, 'media_limit')), 'limit');
assert.equal(scope.api.refusal(form, new RequestFailed(422, 'invalid_input', 'media.too_large')), 'large', 'field refusals keep their specific reason');
assert.equal(scope.api.refusal(form, new RequestFailed(409, 'menu_unsupported')), 'invalid');
assert.equal(scope.api.refusal(form, new Error('network')), 'failed');

const attributes = new Map();
const status = { textContent: '' };
const pdf = { type: 'application/pdf', size: 2048 };
const input = { files: [pdf] };
let submit = null;
const node = {
  ...form, action: '/lugar/test/media',
  querySelector: (selector) => selector.includes('file') ? input : selector.includes('label') ? { value: '  Lunch  ' } : selector.includes('status') ? status : null,
  getAttribute: (name) => attributes.get(name) ?? null, setAttribute: (name, value) => attributes.set(name, value),
  addEventListener: (name, fn) => { submit = fn; },
};
const puts = [];
let reloaded = 0;
scope.api.mediaUpload(node, async (url, init) => { puts.push({ url, init }); return { ok: true }; }, () => reloaded++);
await submit({ preventDefault() {} });
assert.equal(JSON.stringify(posts[0].body), '{"kind":"menu","mediaType":"application/pdf","bytes":2048,"label":"Lunch"}', 'the declaration is sent before the file');
assert.equal(puts.length, 1); assert.equal(puts[0].init.method, 'PUT'); assert.equal(puts[0].init.body, pdf, 'the file goes straight to storage, unchanged for PDF');
assert.equal(puts[0].init.headers['x-upsert'], 'false', 'a signed upload never overwrites');
assert.equal(posts[1].url, '/lugar/test/media/m1/finish', 'the server verifies before the file is shown');
assert.equal(reloaded, 1); assert.equal(attributes.get('aria-busy'), 'false');

refuseStart = new RequestFailed(409, 'media_limit');
await submit({ preventDefault() {} });
assert.equal(puts.length, 1, 'a refused reservation sends nothing to storage'); assert.equal(status.textContent, 'limit'); assert.equal(reloaded, 1);
refuseStart = null;
input.files = [{ type: 'application/pdf', size: 3145729 }];
await submit({ preventDefault() {} });
assert.equal(status.textContent, 'large', 'oversized files are refused before any request'); assert.equal(posts.length, 3);
input.files = [{ type: '', name: 'Menu.PDF', size: 900 }];
await submit({ preventDefault() {} });
assert.equal(posts.at(-2).body.mediaType, 'application/pdf', 'a PDF without a reported type is sent as a PDF by its extension');
input.files = [];
await submit({ preventDefault() {} });
assert.equal(status.textContent, 'choose');
console.log('PASS: photo resizing bounds, specific refusals, declare-then-store-then-verify order, no overwrite, refused and oversized uploads send nothing');
