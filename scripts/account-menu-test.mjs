import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const listeners = () => { const handlers = new Map(); return { addEventListener(k,f) { if(!handlers.has(k))handlers.set(k,[]); handlers.get(k).push(f); }, emit(k,e={}) { for(const f of handlers.get(k)||[])f(e); } }; };
const doc=listeners();let locked=false;
globalThis.document={...doc,documentElement:{classList:{toggle(k,on){locked=on;}}}};
const lifecycle=listeners();globalThis.addEventListener=lifecycle.addEventListener;
const media={...listeners(),matches:true};globalThis.matchMedia=()=>media;
let focused=0;const summary={focus(){focused++;}};const button=listeners();const details={...listeners(),open:false,querySelector(s){return s==='summary'?summary:s==='[data-menu="close"]'?button:{focus(){}};},contains(t){return t===button;}};
const source=readFileSync('public/assets/js/features/accountMenu.js','utf8');const {accountMenu}=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);accountMenu(details);
const open=()=>{details.open=true;details.emit('toggle');assert.equal(locked,media.matches);};
for(let i=0;i<5;i++){open();button.emit('click',{preventDefault(){}});assert.equal(details.open,false);assert.equal(locked,false);}
open();doc.emit('keydown',{key:'Escape',preventDefault(){}});assert.equal(details.open,false);assert.equal(locked,false);assert.equal(focused,6);
open();doc.emit('click',{target:{}});assert.equal(details.open,false);assert.equal(locked,false);
open();media.matches=false;media.emit('change');assert.equal(locked,false);media.matches=true;media.emit('change');assert.equal(locked,true);
lifecycle.emit('pagehide');assert.equal(details.open,false);assert.equal(locked,false);open();lifecycle.emit('pageshow');assert.equal(details.open,false);assert.equal(locked,false);
console.log('Account menu dismissal/lifecycle regressions passed.');
