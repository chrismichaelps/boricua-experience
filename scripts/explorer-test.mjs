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
const pins=[{slug:'a',title:'A',lng:10,lat:20},{slug:'b',title:'B',lng:500,lat:20,price_cents:null,price:'Consulta la entrada'}];
const canvas=new Node(),list=new Node(),count=new Node({},'2 activities'),locate=new Node(),sheet=new Node(),handle=new Node(),share=new Node();
const nodes={'#map':canvas,'#map-list':list,'#map-count':count,'#map-pins':{textContent:JSON.stringify(pins)},'[data-feature="locate"]':locate,'[data-feature="live"]':share,'.map-sheet':sheet,'.sheet-handle':handle};
const page={classList:new Node().classList,dataset:{clusterLabel:'See :count activities',near:'0'},querySelector:s=>nodes[s]};
let offset=0,zoom=14,sharing=false,watches=0,stops=0;
const lifecycle={};
const events={},readings=new Set(),statuses=new Set(),requests=[],nearbyRequests=[],timers=new Map();let tid=0;
const me=new Node();let mePosition=null;const eases=[],fits=[];let clusterAction=null;const markerActions=new Map();
const map={setPadding:()=>{},setMaxBounds:()=>{},on:(name,fn)=>events[name]=fn,project:([x,y])=>({x:x-offset,y}),getZoom:()=>zoom,isStyleLoaded:()=>true,fitBounds:(_bounds,options)=>{fits.push(options);zoom=10;},cameraForBounds:()=>({zoom:10}),easeTo:o=>{eases.push(o);},getSource:()=>null,addSource:()=>{},addLayer:()=>{},getCenter:()=>({lng:-66.1+offset/10000,lat:18.4}),getBounds:()=>({}),};
class Bounds {extend(){return this;}}
const makeMarker=(element)=>({element,marker:{addTo(){return this;},remove(){}}});
const live={onReading:fn=>{readings.add(fn);return()=>readings.delete(fn);},onStatus:fn=>{statuses.add(fn);return()=>statuses.delete(fn);},startWatching:()=>{watches++;for(const fn of statuses)fn('waiting');},stopWatching:()=>{stops++;for(const fn of statuses)fn('stopped');},isSharing:()=>sharing,startSharing:()=>{sharing=true;live.startWatching();},stopSharing:async()=>{sharing=false;live.stopWatching();}};
const scope={console,performance,URLSearchParams,AbortController,location:{search:'?category=cultura&when=weekend&free=1&cerca=ponce&radio=10'},document:{activeElement:null,hidden:false,documentElement:{lang:'es-PR'},addEventListener:(name,fn)=>lifecycle['document:'+name]=fn},window:{addEventListener:(name,fn)=>lifecycle[name]=fn},matchMedia:()=>({matches:true}),MAP:{nearbyFrameCount:3,nearbyFrameM:25000,islandBounds:[[-67.28,17.9],[-65.22,18.53]],clusterMaxZoom:13,clusterRadius:56,viewportDelayMs:300,viewportCacheMs:30000,viewportCacheSize:8,focusZoom:11,selfZoom:15,searchBounds:[[-67.5,17.5],[-65.1,18.7]]},ENDPOINTS:{map:'/api/map',nearby:'/api/nearby'},LIVE:{},message:k=>k,toast:()=>{},live,create:(tag,attrs,text)=>new Node(attrs,text),localizeMoment:()=>{},$:s=>nodes[s],$$:(s,root)=>root===list?list.children.filter(n=>n.className==='sheet-item'):[],createMap:async()=>({map,maplibregl:{LngLatBounds:Bounds}}),clusterPins:ps=>ps.map(p=>[p]),priceMarker:(_library,pin,select)=>{markerActions.set(pin.slug,select);return makeMarker(new Node());},clusterMarker:(_library,_group,_label,expand)=>{clusterAction=expand;return makeMarker(new Node());},meMarker:()=>({setLngLat(p){mePosition=p;return this;},addTo(){return this;},getElement:()=>me}),accuracyCircle:reading=>({geometry:{coordinates:[[[reading.lng,reading.lat],[reading.lng+.01,reading.lat+.01]]]}}),visiblePins:(ps,project,width,height)=>ps.filter(p=>{const point=project([p.lng,p.lat]);return point.x>=0&&point.x<=width&&point.y>=0&&point.y<=height;}),snapArea:(area)=>area,speedZoom:(_speed,current)=>current,speedBetween:()=>NaN,buildings3d:()=>{},viewportBounds:()=>({west:-66.3+offset/10000,east:-65.9+offset/10000,north:18.5,south:18.2}),getJson:(url,options)=>new Promise(resolve=>(url.startsWith('/api/nearby')?nearbyRequests:requests).push({url,resolve,signal:options?.signal})),innerWidth:1200,distanceM:(a,b)=>Math.hypot(a.lat-b.lat,a.lng-b.lng)*111000,setTimeout:fn=>{timers.set(++tid,fn);return tid;},clearTimeout:id=>timers.delete(id)};
const source=readFileSync(new URL('../public/assets/js/features/explorer.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'').replace(/^export /gm,'');
const surfaceSource=readFileSync(new URL('../public/assets/js/features/mapSurface.js',import.meta.url),'utf8').replace(/^export /gm,'');
vm.runInNewContext(surfaceSource+'\n'+source+'\nthis.run=explorer;this.renderItem=sheetItem;',scope);
await scope.run(page);
locate.handlers.click();
for(const fn of readings)fn({lat:18.4,lng:-66.1,accuracy:12});
assert.equal(mePosition,null,'readings before map load wait safely');
events.load();
page.dataset.mapExpanded='1';
markerActions.get('a')();
assert(page.classList.contains('has-map-selection'),'expanded marker selection exposes the preview panel');
assert(list.children[0].classList.contains('is-active'),'the preview uses the selected existing card');
events.moveend();
assert(page.classList.contains('has-map-selection'),'a redraw retains the selected preview while visible');
assert(list.children[0].classList.contains('is-active'),'redraw restores the selected card class');
offset=1000;events.moveend();
assert(!page.classList.contains('has-map-selection'),'a selection outside the visible batch is hidden');
offset=0;events.moveend();
events.click();
assert(!page.classList.contains('has-map-selection'),'empty canvas click dismisses the preview');
page.dataset.mapExpanded='0';
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
assert.ok(!requests[1].url.includes('cerca=') && !requests[1].url.includes('radio='),'camera reads clear nearby-town origin restrictions');
assert.ok(requests[1].url.includes('hl=es'),'map areas name their language so a shared cache keeps languages apart');
requests[1].resolve({items:[{...pins[1],title:'Latest'}],limited:true});await Promise.resolve();await Promise.resolve();
requests[0].resolve({items:[{...pins[0],title:'Stale'}],limited:false});await Promise.resolve();await Promise.resolve();
assert.equal(count.textContent,'1 activities','late responses cannot overwrite current viewport');
assert.equal(list.children[0].dataset.slug,'b');
const refreshedLink=list.children[0].children[0].children[0];
assert.equal(refreshedLink.children[0].children.length,1,'viewport refresh keeps unknown admission off the thumbnail');
assert.equal(refreshedLink.children[1].children.at(-1).children[0].textContent,'Consulta la entrada','viewport refresh retains the admission note beside the image');
events.moveend();for(const fn of timers.values())fn();timers.clear();
assert.equal(requests.length,2,'same viewport uses bounded recent cache');
scope.document.hidden=true;offset=900;events.moveend();for(const fn of timers.values())fn();timers.clear();
assert.equal(requests.length,2,'a hidden tab asks for nothing while the visitor keeps moving');
scope.document.hidden=false;lifecycle['document:visibilitychange']();for(const fn of timers.values())fn();timers.clear();
assert.equal(requests.length,3,'showing the tab again asks once for the current area');
requests[2].resolve({items:[],limited:false});await Promise.resolve();await Promise.resolve();
lifecycle['document:visibilitychange']();for(const fn of timers.values())fn();timers.clear();
assert.equal(requests.length,3,'a visible tab without a pending move does not ask again');
for(const fn of statuses)fn('error');assert.equal(locate.attrs['aria-pressed'],'false');assert.equal(locate.attrs['aria-busy'],'false');
locate.handlers.click();assert.equal(watches,2,'failed locate supports retry');
locate.handlers.click();assert.equal(stops,1,'off clears local watch');
locate.handlers.click();share.handlers.click();locate.handlers.click();
assert.equal(readings.size,1,'disabling private locate preserves independent sharing subscription');
for(const fn of readings)fn({lat:18.42,lng:-66.12,accuracy:8});assert.equal(mePosition[0],-66.12);
lifecycle.pagehide();assert.equal(readings.size,0);assert.equal(statuses.size,0);
lifecycle.pageshow({persisted:true});assert.equal(readings.size,1);assert.equal(statuses.size,1);
for(const fn of readings)fn({lat:18.42,lng:-66.12,accuracy:8});assert.equal(mePosition[0],-66.12,'restored sharing updates the map');
console.log('PASS: pending map location, marker/center, viewport movement, retained filters, stale responses, error/retry and off');

async function emptyLocatedView(accuracy=12) {
  readings.clear(); statuses.clear(); timers.clear(); requests.length=0; eases.length=0;fits.length=0;
  for (const key of Object.keys(events)) delete events[key];
  zoom=15; offset=0; sharing=false;
  nodes['#map-pins'].textContent='[]';
  map.easeTo=options=>{eases.push(options);zoom=options.zoom;};
  scope.viewportBounds=()=>({west:-66.3-zoom/1000+offset/10000,east:-65.9+zoom/1000+offset/10000,north:18.5,south:18.2});
  await scope.run(page);
  events.load(); locate.handlers.click();
  if(accuracy!==null) for (const fn of readings) fn({lat:18.4,lng:-66.1,accuracy});
  if(accuracy!==null && accuracy<=500) assert.equal(zoom,15,'a first precise fix starts at street level');
}
function settleCamera() {
  events.moveend();
  for (const fn of timers.values()) fn();
  timers.clear();
}
async function respond(items) {
  requests.at(-1).resolve({items,limited:false});
  await Promise.resolve();await Promise.resolve();
}
await emptyLocatedView();
settleCamera(); await respond([]);
assert.equal(zoom,15,'empty results never change the camera zoom');
for (const fn of readings) fn({lat:18.40001,lng:-66.10001,accuracy:30});
assert.equal(zoom,15,'GPS jitter preserves the selected zoom');
for (const fn of readings) fn({lat:18.40002,lng:-66.10002,accuracy:900});
assert.equal(zoom,15,'degrading accuracy cannot refit a precise camera');
for (const fn of readings) fn({lat:18.402,lng:-66.102,accuracy:8});
assert.equal(zoom,15,'recovering accuracy cannot cause a second zoom change');
zoom=12;events.zoomstart({originalEvent:{}});
for (const fn of readings) fn({lat:18.43,lng:-66.14,accuracy:8});
assert.equal(zoom,12,'movement leaves a user-selected camera alone');
offset=1;settleCamera();await respond([]);
assert.equal(zoom,12,'a later empty response cannot undo a manual zoom');
locate.handlers.click();
assert.equal(zoom,15,'explicit recenter may restore the location scale');
share.handlers.click();locate.handlers.click();
const stoppedEases=eases.length;
for (const fn of readings) fn({lat:18.44,lng:-66.15,accuracy:8});
assert.equal(eases.length,stoppedEases,'locate off stops following while independent sharing continues');
await emptyLocatedView(2500);
assert.equal(fits.length,1,'initial coarse location frames its uncertainty once');
assert.equal(zoom,10);
for(const fn of readings)fn({lat:18.401,lng:-66.101,accuracy:1200});
assert.equal(fits.length,1,'changing coarse accuracy cannot repeatedly fit bounds');
assert.equal(zoom,10);
for(const fn of readings)fn({lat:18.402,lng:-66.102,accuracy:25});
assert.equal(zoom,15,'first precise location may refine the initial coarse view once');
for(const fn of readings)fn({lat:18.403,lng:-66.103,accuracy:2600});
assert.equal(fits.length,1,'later coarse readings retain the established camera');
assert.equal(zoom,15);
// Normal-motion camera transitions report an intermediate zoom until moveend.
await emptyLocatedView();
scope.matchMedia=query=>({matches:query.includes('min-width')});
map.easeTo=options=>eases.push(options);
zoom=11;
share.handlers.click();
for(const fn of readings)fn({lat:18.405,lng:-66.105,accuracy:20});
assert.equal(eases.at(-1).zoom,15,'duplicate locate/share callbacks retain the intended in-flight zoom');
assert(eases.at(-1).duration>0,'regression models normal animated motion');
for(const fn of readings)fn({lat:18.406,lng:-66.106,accuracy:20});
assert.equal(eases.at(-1).zoom,15,'a later fix cannot target the intermediate animation scale');
await emptyLocatedView(null);
const beforeFirst=eases.length;
events.dragstart({originalEvent:{}});
for(const fn of readings)fn({lat:18.45,lng:-66.16,accuracy:8});
assert.equal(eases.length,beforeFirst,'panning during acquisition cancels the pending first recenter');
assert(locate.classList.contains('is-detached'));
locate.handlers.click();
assert.equal(eases.length,beforeFirst+1,'explicit recenter still works after acquisition was detached');
await emptyLocatedView();
settleCamera();await respond([{...pins[0],title:'Explore'}]);
list.children[0].handlers.focusin();
const listEases=eases.length;
for(const fn of readings)fn({lat:18.46,lng:-66.17,accuracy:8});
assert.equal(eases.length,listEases,'list focus exploration is not undone by location');
locate.handlers.click();
scope.clusterPins=ps=>[ps];zoom=12;
settleCamera();await respond([{...pins[0]},{...pins[0],slug:'c'}]);
clusterAction();
const clusterEases=eases.length,clusterFits=fits.length;
for(const fn of readings)fn({lat:18.47,lng:-66.18,accuracy:8});
assert.equal(eases.length,clusterEases,'cluster exploration is not undone by location');
assert.equal(fits.length,clusterFits);
console.log('PASS: empty results, GPS noise and accuracy degradation retain zoom; gestures detach; explicit recenter; independent sharing');

scope.clusterPins=ps=>ps.map(p=>[p]);
await emptyLocatedView();
const nearbyFits=fits.length;
assert.ok(nearbyRequests.at(-1).url.startsWith('/api/nearby?lat=18.40000&lng=-66.10000'),'the first precise fix asks for the closest activities');
nearbyRequests.at(-1).resolve([{...pins[0],lat:18.41,lng:-66.11},{...pins[0],slug:'far',lat:19.9,lng:-66.1}]);
await Promise.resolve();await Promise.resolve();
assert.equal(fits.length,nearbyFits+1,'close activities widen the street view to include them');
const fittingEases=eases.length;
for(const fn of readings)fn({lat:18.4001,lng:-66.1001,accuracy:10});
assert.equal(eases.length,fittingEases,'readings wait while the nearby frame settles');
events.moveend();
for(const fn of readings)fn({lat:18.4002,lng:-66.1002,accuracy:10});
assert.equal(eases.length,fittingEases+1,'after it settles, readings follow at the framed zoom');
await emptyLocatedView();
const lonelyFits=fits.length;
nearbyRequests.at(-1).resolve([{...pins[0],slug:'far',lat:19.9,lng:-66.1}]);
await Promise.resolve();await Promise.resolve();
assert.equal(fits.length,lonelyFits,'with nothing close the street view stays');
console.log('PASS: near me frames the closest activities and falls back to the street');

const rendered=scope.renderItem({...pins[0],when:'Dom 18 oct · 6:00 PM',starts:'2026-10-18T22:00:00Z',ends:'2026-10-19T00:00:00Z'});
const dateLine=rendered.children[0].children[0].children[1].children[0];
assert.equal(dateLine.children.length,1,'a refreshed card date appends the time element instead of stringifying it');
const dateNode=dateLine.children[0];
assert.equal(dateNode.attrs.datetime,'2026-10-18T22:00:00Z');
assert.equal(dateNode.dataset.moment,'when');
assert.equal(dateNode.textContent,'Dom 18 oct · 6:00 PM');
console.log('PASS: refreshed map cards preserve the semantic date child and readable text');

// Use the real date renderer with DOM-like string coercion, rather than its lifecycle stub.
class TimeNode {
 constructor(attrs={}, text=''){this.attrs={};this.dataset={};this.children=[];this.textContent=text;for(const[k,v]of Object.entries(attrs)){this.attrs[k]=String(v);if(k.startsWith('data-'))this.dataset[k.slice(5)]=String(v);}}
 getAttribute(k){return this.attrs[k];}
 append(...nodes){this.children.push(...nodes);}
}
const temporalScope={document:{documentElement:{lang:'es'},querySelectorAll:()=>[]},Intl,Date,Number,Object,Math,create:(_tag,attrs,text)=>new TimeNode(attrs,text)};
const temporalSource=file=>readFileSync(new URL(file,import.meta.url),'utf8').replace(/^import .*;$/gm,'').replace(/^export /gm,'');
vm.runInNewContext(temporalSource('../public/assets/js/constants/messages.js')+temporalSource('../public/assets/js/features/localTime.js')+temporalSource('../public/assets/js/features/explorer.js')+'\nthis.renderSheet=sheetItem;',temporalScope);
const unknownSheet=temporalScope.renderSheet({slug:'test',starts:'2026-10-12T00:00:00Z',ends:null,when:'Lun · 8:00 PM',title:'Test',place:'PR',price:'Precio no informado'});
const actualTime=unknownSheet.children[0].children[0].children[1].children[0].children[0];
assert.equal(actualTime.dataset.ends,'');assert(!actualTime.textContent.includes('1970'));
console.log('PASS: refreshed null-end sheet uses actual local-time renderer safely');

const permanentSheet=temporalScope.renderSheet({kind:'place',slug:'a-shop',starts:null,ends:null,when:'Shopping',title:'A shop',place:'San Juan',price:'Shopping'});
const permanentLink=permanentSheet.children[0].children[0];
assert.equal(permanentLink.attrs.href,'/lugar/a-shop');
assert.equal(permanentLink.children[1].children[0].children[0].textContent,'Shopping');
assert.equal(permanentLink.children[1].children[0].children[0].attrs.datetime,undefined);
console.log('PASS: permanent place cards link to places and never render fabricated activity times');

assert.equal(permanentSheet.dataset.slug,'place:a-shop');
const sameSlugPlace=scope.renderItem({...pins[0],kind:'place'});
const sameSlugEvent=scope.renderItem({...pins[0]});
assert.notEqual(sameSlugPlace.dataset.slug,sameSlugEvent.dataset.slug,'place/event identity cannot collide');

for (const label of ['Consulta la entrada', 'Check admission']) {
 const row=temporalScope.renderSheet({slug:'unknown',starts:'2026-10-22T00:00:00Z',ends:null,price_cents:null,price:label});
 const link=row.children[0].children[0];
 assert.equal(link.children[0].children.length,1,'unknown admission has no image pill');
 assert.equal(link.children[1].children.at(-1).children[0].textContent,label,'localized admission belongs in details');
}
for (const cents of [0,2500]) {
 const row=temporalScope.renderSheet({slug:'known',starts:'2026-10-22T00:00:00Z',ends:null,price_cents:cents,price:cents?'$25':'Gratis'});
 const link=row.children[0].children[0];
 assert.equal(link.children[0].children[1].attrs.class,'pill pill-light card-price');
 assert.equal(link.children[1].children.length,3,'known prices need no duplicate admission note');
}
assert.equal(permanentLink.children[0].children[1].textContent,'Shopping','permanent category label is unchanged');
assert.equal(unknownSheet.children[0].children[0].children[0].children.length,1,'legacy missing price metadata is safely unknown');
console.log('PASS: unknown admission stays in details after refresh; known prices and places preserve their badges');
