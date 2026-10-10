import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
class Node {
 constructor(attrs={},text=''){this.dataset={};this.attrs={};this.children=[];this.textContent=text;this.handlers={};this.className=attrs.class||'';for(const [k,v]of Object.entries(attrs)){this.attrs[k]=v;if(k.startsWith('data-'))this.dataset[k.slice(5)]=v;}const classes=new Set();this.classList={toggle:(n,on)=>{(on??!classes.has(n))?classes.add(n):classes.delete(n);return classes.has(n);},add:n=>classes.add(n),remove:n=>classes.delete(n),contains:n=>classes.has(n)};}
 append(...nodes){this.children.push(...nodes);}
 replaceChildren(...nodes){this.children=nodes;}
 setAttribute(k,v){this.attrs[k]=v;}
 addEventListener(k,fn){this.handlers[k]=fn;}
 querySelector(){return null;}
 closest(){return null;}
 focus(){}
 getBoundingClientRect(){return {width:800,height:600,bottom:600,top:500};}
}
const pins=[{slug:'a',title:'A',lng:10,lat:20},{slug:'b',title:'B',lng:500,lat:20}];
const canvas=new Node(),list=new Node(),count=new Node({},'2 activities'),locate=new Node(),sheet=new Node(),handle=new Node();
const nodes={'#map':canvas,'#map-list':list,'#map-count':count,'#map-pins':{textContent:JSON.stringify(pins)},'[data-feature="locate"]':locate,'.map-sheet':sheet,'.sheet-handle':handle};
const page={classList:{toggle:()=>{}},dataset:{clusterLabel:'See :count activities',near:'0'},querySelector:s=>nodes[s]};
let offset=0,zoom=14,sharing=false,watches=0,stops=0;
const lifecycle={};
const events={},readings=new Set(),statuses=new Set(),requests=[],timers=new Map();let tid=0;
const me=new Node();let mePosition=null;const eases=[];
const map={setPadding:()=>{},setMaxBounds:()=>{},on:(name,fn)=>events[name]=fn,project:([x,y])=>({x:x-offset,y}),getZoom:()=>zoom,isStyleLoaded:()=>true,fitBounds:()=>{},easeTo:o=>{eases.push(o);},getSource:()=>null,addSource:()=>{},addLayer:()=>{},getCenter:()=>({lng:-66.1+offset/10000,lat:18.4}),getBounds:()=>({}),};
class Bounds {extend(){return this;}}
const makeMarker=(element)=>({element,marker:{addTo(){return this;},remove(){}}});
const live={onReading:fn=>{readings.add(fn);return()=>readings.delete(fn);},onStatus:fn=>{statuses.add(fn);return()=>statuses.delete(fn);},startWatching:()=>{watches++;for(const fn of statuses)fn('waiting');},stopWatching:()=>{stops++;for(const fn of statuses)fn('stopped');},isSharing:()=>sharing,startSharing:()=>{sharing=true;live.startWatching();},stopSharing:async()=>{sharing=false;live.stopWatching();}};
const scope={console,URLSearchParams,AbortController,location:{search:'?category=cultura&when=weekend&free=1'},document:{activeElement:null},window:{addEventListener:(name,fn)=>lifecycle[name]=fn},matchMedia:()=>({matches:true}),MAP:{clusterMaxZoom:13,clusterRadius:56,viewportDelayMs:300,viewportCacheMs:30000,viewportCacheSize:8,focusZoom:11,searchBounds:[[-67.5,17.5],[-65.1,18.7]]},ENDPOINTS:{map:'/api/map'},LIVE:{},message:k=>k,toast:()=>{},live,create:(tag,attrs,text)=>new Node(attrs,text),localizeMoment:()=>{},$:s=>nodes[s],$$:(s,root)=>root===list?list.children.filter(n=>n.className==='sheet-item'):[],createMap:async()=>({map,maplibregl:{LngLatBounds:Bounds}}),clusterPins:ps=>ps.map(p=>[p]),priceMarker:()=>makeMarker(new Node()),clusterMarker:()=>makeMarker(new Node()),meMarker:()=>({setLngLat(p){mePosition=p;return this;},addTo(){return this;},getElement:()=>me}),accuracyCircle:()=>({}),visiblePins:(ps,project,width,height)=>ps.filter(p=>{const point=project([p.lng,p.lat]);return point.x>=0&&point.x<=width&&point.y>=0&&point.y<=height;}),viewportBounds:()=>({west:-66.3+offset/10000,east:-65.9+offset/10000,north:18.5,south:18.2}),getJson:(url,options)=>new Promise(resolve=>requests.push({url,resolve,signal:options.signal})),setTimeout:fn=>{timers.set(++tid,fn);return tid;},clearTimeout:id=>timers.delete(id)};
const source=readFileSync(new URL('../public/assets/js/features/explorer.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'').replace(/^export /gm,'');
vm.runInNewContext(source+'\nthis.run=explorer;',scope);
await scope.run(page);
locate.handlers.click();
for(const fn of readings)fn({lat:18.4,lng:-66.1,accuracy:12});
assert.equal(mePosition,null,'readings before map load wait safely');
events.load();
assert.deepEqual(Array.from(mePosition),[-66.1,18.4]);
assert.equal(me.attrs['aria-label'],'you');assert.equal(eases.length,1,'locate centers once');
assert.equal(locate.attrs['aria-busy'],'true');
for(const fn of statuses)fn('ready');assert.equal(locate.attrs['aria-busy'],'false');
for(const fn of readings)fn({lat:18.41,lng:-66.11,accuracy:12});assert.equal(eases.length,2,'readings keep the map following the visitor');
const panned=events.dragstart??events.movestart;panned({originalEvent:{}});assert.ok(locate.classList.contains('is-detached'),'a pan detaches the locate button');
for(const fn of readings)fn({lat:18.412,lng:-66.112,accuracy:12});assert.equal(eases.length,2,'after a pan, readings leave the camera where the visitor put it');
locate.handlers.click();assert.equal(eases.length,3,'tapping the detached button re-centers');assert.equal(locate.attrs['aria-pressed'],'true','re-centering keeps location on');assert.ok(!locate.classList.contains('is-detached'));
for(const fn of timers.values())fn();timers.clear();
assert.ok(requests[0].url.includes('category=cultura'));assert.ok(requests[0].url.includes('when=weekend'));assert.ok(requests[0].url.includes('free=1'));
const pendingBefore=timers.size;sheet.handlers.transitionend({target:list,propertyName:'transform'});
assert.equal(timers.size,pendingBefore,'child card transitions cannot schedule camera requests');
offset=300;events.moveend();assert.equal(count.textContent,'1 activities');
for(const fn of timers.values())fn();timers.clear();
assert.equal(requests[0].signal.aborted,true,'new camera cancels old transport');
assert.ok(requests[1].url.startsWith('/api/map?'));
assert.ok(requests[1].url.includes('west='));
requests[1].resolve({items:[{...pins[1],title:'Latest'}],limited:true});await Promise.resolve();await Promise.resolve();
requests[0].resolve({items:[{...pins[0],title:'Stale'}],limited:false});await Promise.resolve();await Promise.resolve();
assert.equal(count.textContent,'1 activities','late responses cannot overwrite current viewport');
assert.equal(list.children[0].dataset.slug,'b');
events.moveend();for(const fn of timers.values())fn();timers.clear();
assert.equal(requests.length,2,'same viewport uses bounded recent cache');
for(const fn of statuses)fn('error');assert.equal(locate.attrs['aria-pressed'],'false');assert.equal(locate.attrs['aria-busy'],'false');
locate.handlers.click();assert.equal(watches,2,'failed locate supports retry');
locate.handlers.click();assert.equal(stops,1,'off clears local watch');
sharing=true;
lifecycle.pagehide();assert.equal(readings.size,0);assert.equal(statuses.size,0);
lifecycle.pageshow({persisted:true});assert.equal(readings.size,1);assert.equal(statuses.size,1);
for(const fn of readings)fn({lat:18.42,lng:-66.12,accuracy:8});assert.equal(mePosition[0],-66.12,'restored sharing updates the map');
console.log('PASS: pending map location, marker/center, viewport movement, retained filters, stale responses, error/retry and off');
