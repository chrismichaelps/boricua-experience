import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const image = (width, height, src = 'https://storage.example/cover.webp') => ({
  naturalWidth: width, naturalHeight: height, complete: true, contained: false,
  matches: () => true, getAttribute: () => src,
  classList: { toggle(_name, state) { this.owner.contained = state; } },
});
const pictures = [[200,200],[600,600],[800,1200],[1600,1000],[0,0]].map(([w,h])=>image(w,h));
pictures.push(image(200,200,'/assets/covers/deportes.svg'));
for (const picture of pictures) picture.classList.owner=picture;
let onLoad;
const root={querySelectorAll:()=>pictures,addEventListener:(name,fn,capture)=>{assert.equal(name,'load');assert.equal(capture,true);onLoad=fn;},removeEventListener:(name,fn,capture)=>{assert.equal(name,'load');assert.equal(fn,onLoad);assert.equal(capture,true);onLoad=null;}};
const scope={};
vm.runInNewContext(readFileSync(new URL('../public/assets/js/features/coverImages.js',import.meta.url),'utf8').replace(/^export /gm,'' )+'\nthis.start=coverImages;',scope);
const stop=scope.start(root);
assert.deepEqual(pictures.map(p=>p.contained),[true,true,true,false,false,false]);
const lazy=image(0,0);lazy.classList.owner=lazy;lazy.complete=false;onLoad({target:lazy});assert.equal(lazy.contained,false);
lazy.complete=true;lazy.naturalWidth=300;lazy.naturalHeight=400;onLoad({target:lazy});assert.equal(lazy.contained,true,'new lazy/dynamic map images use intrinsic framing');
lazy.naturalWidth=1600;lazy.naturalHeight=900;onLoad({target:lazy});assert.equal(lazy.contained,false,'reused images restore landscape framing');
onLoad({target:{}});
stop();assert.equal(onLoad,null);
console.log('PASS: intrinsic cover framing preserves small/portrait artwork, landscape photos, lazy/dynamic loads and teardown');
