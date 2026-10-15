import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const png = readFileSync(new URL('../public/assets/brand/social.png', import.meta.url));
assert(png.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])), 'sharing asset must contain PNG bytes');
assert.equal(png.toString('ascii',12,16),'IHDR');
assert.equal(png.readUInt32BE(16),1200);
assert.equal(png.readUInt32BE(20),630);
assert(png.length < 2 * 1024 * 1024, 'sharing image stays below2MB');
console.log('PASS: real PNG signature,1200×630 sharing dimensions and bounded bytes');
