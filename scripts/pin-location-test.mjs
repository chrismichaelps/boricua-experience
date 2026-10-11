import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
let deadline;
const config={precise:{enableHighAccuracy:true,timeout:12000},balanced:{enableHighAccuracy:false,timeout:10000},deadlineMs:25000};
const scope={GEO:config,DOMException,AbortController,navigator:{},setTimeout:fn=>(deadline=fn,1),clearTimeout:()=>{}};
vm.runInNewContext(readFileSync('public/assets/js/utils/locate.js','utf8').replace(/^import.*;$/gm,'').replace('export function','function')+'\nthis.locate=requestLocation;',scope);
const fix={coords:{latitude:18.4,longitude:-66.1,accuracy:12}};
let attempts=[];
assert.equal(await scope.locate(null,{getCurrentPosition(ok,error,options){attempts.push(options);ok(fix);}}),fix);
assert.equal(attempts.length,1);
attempts=[];
assert.equal(await scope.locate(null,{getCurrentPosition(ok,error,options){attempts.push(options);if(attempts.length===1)error({code:2});else ok(fix);}}),fix);
assert.equal(attempts.length,2);assert.equal(attempts[1].enableHighAccuracy,false,'CoreLocation failure gets one balanced fallback');
let calls=0;
await assert.rejects(scope.locate(null,{getCurrentPosition(ok,error){calls++;error({code:1});}}),e=>e.code===1);assert.equal(calls,1,'denial never retries');
calls=0;await assert.rejects(scope.locate(null,{getCurrentPosition(ok,error){calls++;error({code:3});}}),e=>e.code===3);assert.equal(calls,2);
await assert.rejects(scope.locate(null,null),e=>e.code===0);
let late;const controller=new AbortController();const pending=scope.locate(controller.signal,{getCurrentPosition(ok){late=ok;}});controller.abort();late(fix);await assert.rejects(pending,e=>e.name==='AbortError');
const timed=scope.locate(null,{getCurrentPosition(){}});deadline();await assert.rejects(timed,e=>e.code===3);
let invalid=0;await assert.rejects(scope.locate(null,{getCurrentPosition(ok){invalid++;ok({coords:{latitude:NaN,longitude:-66,accuracy:12}});}}),e=>e.code===2);assert.equal(invalid,2);
console.log('PASS: publishing fix, CoreLocation fallback, denial, timeout, cancellation, unsupported API and invalid readings');

class Control {
  value='';handlers={};attrs={};disabled=false;
  addEventListener(name,fn){this.handlers[name]=fn;}setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}after(node){this.notice=node;}
}
const button=new Control(),lat=new Control(),lng=new Control();lat.value='18.2';lng.value='-66.2';
const map={handlers:{},moves:[],on(name,fn){this.handlers[name]=fn;},easeTo(value){this.moves.push(value);}};
class Marker {setLngLat(point){this.point=point;return this;}addTo(){return this;}on(){}}
let resolveFix,rejectFix,requests=0;
const pickerScope={GEO:{approximateM:100},MAP:{searchBounds:[[-67.5,17.5],[-65.1,18.7]],pinZoom:15,zoom:8},LIVE:{},window:{addEventListener(){}},AbortController,Number,String,document:{createElement(){return new Control();}},message:key=>key,createMap:async()=>({map,maplibregl:{Marker}}),requestLocation:signal=>{requests++;return new Promise((resolve,reject)=>{resolveFix=resolve;rejectFix=reject;signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true});});}};
const form={querySelector(selector){return selector.includes('pin-here')?button:selector.includes('lat')?lat:lng;}};
const element={closest:()=>form,dataset:{lat:'18.2',lng:'-66.2'}};
vm.runInNewContext(readFileSync('public/assets/js/features/eventMaps.js','utf8').replace(/^import.*;$/gm,'').replace(/^export /gm,'')+'\nthis.picker=pinPicker;',pickerScope);
await pickerScope.picker(element);
let request=button.handlers.click();assert.equal(button.disabled,true);await button.handlers.click();assert.equal(requests,1);
resolveFix(fix);await request;assert.equal(lat.value,'18.400000');assert.equal(lng.value,'-66.100000');assert.equal(button.disabled,false);assert.equal(button.notice.textContent,'locationPinReady');
request=button.handlers.click();resolveFix({coords:{latitude:40,longitude:-74,accuracy:50}});await request;assert.equal(lat.value,'18.400000','outside-island fix preserves the existing draft');
request=button.handlers.click();rejectFix({code:1});await request;assert.equal(button.notice.textContent,'locationPinDenied');
request=button.handlers.click();map.handlers.click({lngLat:{lat:18.3,lng:-66.3}});await request;assert.equal(lat.value,'18.300000','manual pin cancels pending device lookup');assert.equal(button.notice.hidden,true);
pickerScope.createMap=async()=>{throw new Error('offline map');};await pickerScope.picker(element);request=button.handlers.click();resolveFix(fix);await request;assert.equal(lat.value,'18.400000','location lookup still works when map cannot load');
console.log('PASS: picker busy/duplicate guard, valid fix, outside-island preservation, denial, manual cancellation and map-load failure');
