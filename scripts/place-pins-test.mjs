import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const create = (tag, attrs, text) => ({tag, attrs, textContent:text, children:[], classes:new Set(),
 classList:{add(value){this.owner.classes.add(value);},remove(value){this.owner.classes.delete(value);}},
 addEventListener(type,fn){this[type]=fn;}, setAttribute(key,value){this.attrs[key]=value;}, replaceChildren(...nodes){this.children=nodes;}});
function make(tag,attrs,text){const node=create(tag,attrs,text);node.classList.owner=node;return node;}
class Marker { constructor({element}){this.element=element;} setLngLat(point){this.point=point;return this;} }
const scope={create:make};
vm.runInNewContext(readFileSync(new URL('../public/assets/js/features/markers.js',import.meta.url),'utf8').replace(/^import .*;$/gm,'').replace(/^export /gm,''),scope);
for (const [icon,asset] of [['food','food'],['shopping','shopping'],['wave','pin'],['../../x','pin']]) {
 let selected;const pin={kind:'place',icon,slug:'branch',title:'Real branch',price:'Shopping',lat:18.44,lng:-66.07};
 const entry=scope.priceMarker({Marker},pin,slug=>selected=slug);
 assert.equal(entry.element.children[0].attrs.src,`/assets/icons/${asset}.svg`);
 assert.equal(entry.element.attrs['aria-label'],'Real branch, Shopping');
 assert.equal(JSON.stringify(entry.marker.point),JSON.stringify([-66.07,18.44]));
 entry.element.click({stopPropagation(){}});assert.equal(selected,'branch');
}
const activity=scope.priceMarker({Marker},{slug:'event',title:'Concert',price:'$25',lat:18.4,lng:-66.1},()=>{});
assert.equal(activity.element.textContent,'$25');assert.equal(activity.element.children.length,0);
console.log('PASS: category place icons, safe fallback, branch labels, exact position, selection and unchanged price markers');

const branded=scope.priceMarker({Marker},{kind:'place',icon:'food',map_icon:'/assets/listings/mcdonalds.png',slug:'branch',title:'McDonald’s',price:'Food',lat:18.4,lng:-66.1},()=>{});
assert.equal(branded.element.children[0].attrs.src,'/assets/listings/mcdonalds.png');
assert(branded.element.classes.has('place-marker-brand'));
branded.element.children[0].error();assert.equal(branded.element.children[0].attrs.src,'/assets/icons/food.svg');assert(!branded.element.classes.has('place-marker-brand'));
console.log('PASS: database business artwork and failed-logo category fallback');
