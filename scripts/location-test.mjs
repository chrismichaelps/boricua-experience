import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
let watches=0, success, failure, pending, aborts=0;
const posted=[], cleared=[], states=[], handlers=new Map(), badge={hidden:true};
const document={visibilityState:'visible',getElementById:()=>badge,addEventListener:(n,f)=>handlers.set(n,f)};
const scope={setTimeout,clearTimeout,document,window:{addEventListener:(n,f)=>handlers.set(n,f)},AbortController,
 navigator:{geolocation:{watchPosition:(s,f,options)=>{success=s;failure=f;assert.equal(options.enableHighAccuracy,false);return ++watches;},clearWatch:id=>cleared.push(id)}},
 LIVE:{watch:{maximumAge:10000},minIntervalMs:15000,minDistanceM:25},ENDPOINTS:{location:'/location',locationStop:'/stop'},
 requestLocation:signal=>new Promise((resolve,reject)=>{pending={resolve,reject};signal.addEventListener('abort',()=>{aborts++;reject(new DOMException('Aborted','AbortError'));});}),
 postJson:async url=>{posted.push(url);},distanceM:()=>100,readingOf:p=>p,message:k=>k,toast:()=>{}};
const source=readFileSync(new URL('../public/assets/js/features/live.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'').replace(/^export /gm,'');
vm.runInNewContext(source+'\nthis.api={startWatching,stopWatching,startSharing,stopSharing,isSharing,onReading,onStatus};',scope);
const api=scope.api,flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
api.onStatus(s=>states.push(s));
api.startWatching();const initial=pending;api.startWatching();assert.equal(pending,initial,'deduplicate acquisition');
let reading;api.onReading(r=>reading=r);pending.resolve({lat:18.4,lng:-66.1,accuracy:20});await flush();
assert.equal(watches,1);assert.equal(reading.lat,18.4);assert.equal(posted.length,0,'near me never posts');
api.startSharing();await flush();assert.equal(badge.hidden,false);assert.deepEqual(posted,['/location']);
const stale=success;document.visibilityState='hidden';handlers.get('visibilitychange')();await flush();
assert.equal(api.isSharing(),false);assert.equal(badge.hidden,true);assert.deepEqual(cleared,[1]);assert.equal(posted.at(-1),'/stop');
stale({lat:1,lng:2,accuracy:5});assert.equal(reading.lat,18.4,'late callbacks ignored');
document.visibilityState='visible';handlers.get('visibilitychange')();assert.equal(watches,1,'never resume sharing automatically');
api.startSharing();assert.equal(badge.hidden,true,'no sharing badge before fix');pending.reject({code:2});await flush();
assert.equal(api.isSharing(),false);assert.equal(states.at(-1),'error');assert.equal(badge.hidden,true);
api.startWatching();pending.reject({code:1});await flush();assert.equal(states.at(-1),'error');
api.startWatching();const canceled=pending;api.stopWatching();canceled.resolve({lat:0,lng:0,accuracy:10});await flush();assert.equal(watches,1);
api.startWatching();pending.resolve({lat:18.4,lng:-66.1,accuracy:40});await flush();
const oldError=failure;const kept=cleared.length;failure({code:3});failure({code:2});assert.equal(states.at(-1),'ready','transient watch errors after a fix keep locating');assert.equal(cleared.length,kept,'transient watch errors keep the watch');
failure({code:1});assert.equal(states.at(-1),'error','denial stops locating');const count=cleared.length;oldError({code:2});assert.equal(cleared.length,count,'repeated provider errors do not restart');
api.startSharing();handlers.get('pagehide')();await flush();assert.equal(api.isSharing(),false);assert.ok(aborts>=2);
assert.equal(source.includes('sessionStorage'),false,'sharing is never persisted');
let release;
scope.postJson=(url,data,keepalive)=>{posted.push(url);return url==='/location'?new Promise(resolve=>{release=resolve;}):Promise.resolve();};
api.startSharing();pending.resolve({lat:18.4,lng:-66.1,accuracy:20});await flush();
assert.ok(release);const before=posted.length;
const stopping=api.stopSharing(true);assert.equal(posted[before],'/stop','stop dispatches before stalled update settles');
release();await stopping;assert.equal(posted.at(-1),'/stop','cleanup follows late update');
let stopRelease, stopCalls=0;
scope.postJson=url=>{posted.push(url);if(url==='/stop'&&++stopCalls===1)return new Promise(resolve=>{stopRelease=resolve;});return Promise.resolve();};
api.startSharing();pending.resolve({lat:18.4,lng:-66.1,accuracy:20});await flush();
const stopBarrier=api.stopSharing();api.startSharing();pending.resolve({lat:18.41,lng:-66.1,accuracy:20});await flush();
assert.equal(posted.at(-1),'/stop','restart waits for independently delayed revoke');
stopRelease();await stopBarrier;await flush();assert.equal(posted.at(-1),'/location','restart records after every old revoke');await api.stopSharing();
console.log('PASS: private locate, bounded acquisition, explicit sharing, failure/retry, transient watch errors, stale callbacks, hide/exit and no automatic restoration');
