import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const magic = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
function pngSize(bytes) {
  assert(bytes.subarray(0, 8).equals(magic), 'favicon payload must be PNG');
  assert.equal(bytes.toString('ascii', 12, 16), 'IHDR');
  const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
  assert.equal(width, height, 'favicon must be square');
  return width;
}
const ico = readFileSync(new URL('../public/favicon.ico', import.meta.url));
assert.equal(ico.readUInt16LE(0), 0);
assert.equal(ico.readUInt16LE(2), 1, 'resource must be an icon');
const count = ico.readUInt16LE(4), sizes = [];
assert.equal(count, 6);
let next = 6 + count * 16;
for (let i = 0; i < count; i++) {
  const entry = 6 + i * 16;
  const width = ico[entry] || 256, height = ico[entry + 1] || 256;
  const length = ico.readUInt32LE(entry + 8), offset = ico.readUInt32LE(entry + 12);
  assert.equal(width, height);
  assert.equal(ico.readUInt16LE(entry + 4), 1);
  assert.equal(ico.readUInt16LE(entry + 6), 32);
  assert.equal(offset, next, 'payloads must be contiguous and outside the directory');
  assert(offset + length <= ico.length && length >= 24, 'payload must fit the file');
  assert.equal(pngSize(ico.subarray(offset, offset + length)), width, 'directory must match PNG dimensions');
  sizes.push(width);
  next = offset + length;
}
assert.equal(next, ico.length);
assert.deepEqual(sizes, [16, 32, 48, 96, 192, 256]);
assert.equal(pngSize(readFileSync(new URL('../public/assets/brand/icon-192.png', import.meta.url))), 192);
assert(ico.length < 128 * 1024, 'favicon stays below128KB');
console.log('PASS: official cotorra ICO directory, six square raster sizes and192px PNG');
