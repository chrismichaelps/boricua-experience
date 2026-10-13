import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
let active = null, wide = true;const listeners={};
class Node {
 constructor(tag){this.tagName=tag;this.children=[];this.dataset={};this.attrs={};this.handlers={};const set=new Set();this.classList={add:key=>set.add(key),toggle:(key,on)=>on?set.add(key):set.delete(key),contains:key=>set.has(key)};}
 append(...items){this.children.push(...items);}
 insertBefore(item,before){const at=this.children.indexOf(before);this.children.splice(at<0?this.children.length:at,0,item);}
 replaceChildren(...items){this.children=items;}
 setAttribute(key,value){this.attrs[key]=String(value);}
 addEventListener(key,fn){this.handlers[key]=fn;}
 click(){if(!this.disabled)this.handlers.click?.();}
 focus(){active=this;this.handlers.focus?.();}
 get options(){return this.children;}
}
const RealDate = Date;
class Clock extends RealDate {constructor(...args){super(...(args.length?args:['2026-10-13T02:00:00Z']));}}
const scope={Date:Clock,Intl,Number,Array,String,Math,document:{documentElement:{lang:'es-PR'},createElement:tag=>new Node(tag)},matchMedia:()=>({matches:wide}),window:{addEventListener:(name,fn)=>listeners[name]=fn}};
Object.defineProperty(scope.document,'activeElement',{get:()=>active});
const source=readFileSync(new URL('../public/assets/js/features/dateCalendar.js',import.meta.url),'utf8').replace(/^export /gm,'');
vm.runInNewContext(source+'\nthis.calendar=dateCalendar;this.parse=rangeOf;',scope);
for(const bad of ['2026-02-30..2026-03-01','2026-10-18..2026-10-16','2026-01-01..2028-01-01','2026-10-16..2026-10-18..','bad..date'])assert.equal(scope.parse(bad),null);
assert.deepEqual(Array.from(scope.parse('2028-02-29..2028-02-29')),['2028-02-29','2028-02-29']);
assert(scope.parse('2028-01-01..2028-12-31'));
assert.equal(scope.parse('2028-01-01..2029-01-01'),null);
const dialog=new Node('dialog'),select=new Node('select'),choices=new Node('div');dialog.append(choices);select.value='';
const commits=[];
const labels={dates:'Fechas',flexible:'Flexible',start:'Desde',end:'Hasta',clear:'Borrar fechas',apply:'Aplicar fechas',prev:'Mes anterior',next:'Mes siguiente',hint:'Puerto Rico'};
const calendar=scope.calendar(dialog,select,choices,labels,value=>{select.value=value;commits.push(value);});
const all=node=>[node,...node.children.flatMap(all)];
const byClass=cls=>all(dialog).filter(node=>node.className===cls);
const day=value=>all(dialog).find(node=>node.dataset.date===value);
calendar.open();
assert.equal(byClass('calendar-month').length,2);
assert.equal(day('2026-10-12').attrs['aria-current'],'date','calendar today is Puerto Rico, not UTC');
assert.equal(day('2026-10-11').disabled,true);
day('2026-10-16').click();assert.equal(select.value,'');assert.equal(commits.length,0);
day('2026-10-18').click();assert.equal(commits.length,0,'range remains a draft until Apply');
assert(day('2026-10-17').classList.contains('is-range'));
assert.equal(day('2026-10-16').attrs['aria-pressed'],'true');
byClass('button calendar-apply')[0].click();assert.equal(select.value,'2026-10-16..2026-10-18');assert.equal(commits.length,1);
calendar.open();day('2026-10-23').click();calendar.open();
assert.equal(day('2026-10-16').attrs['aria-pressed'],'true','reopen discards uncommitted draft');
assert.equal(day('2026-10-23').attrs['aria-pressed'],'false');
byClass('calendar-clear')[0].click();assert.equal(select.value,'');
calendar.open();day('2026-10-20').click();byClass('button calendar-apply')[0].click();assert.equal(select.value,'2026-10-20..2026-10-20');
select.value='weekend';calendar.open();assert.equal(choices.hidden,false,'existing presets remain accessible');
byClass('calendar-mode')[0].click();assert.equal(choices.hidden,true);
select.value='';calendar.open();day('2026-10-31').focus();
let prevented=false,stopped=false;
byClass('calendar-months')[0].handlers.keydown({target:day('2026-10-31'),key:'ArrowRight',preventDefault(){prevented=true;},stopPropagation(){stopped=true;}});
assert.equal(active.dataset.date,'2026-11-01');assert(prevented&&stopped);
assert.equal(all(dialog).filter(node=>node.dataset.date&&node.tabIndex===0).length,1);
day('2026-11-01').focus();dialog.open=true;wide=false;listeners.resize();
assert.equal(active.dataset.date,'2026-11-01','responsive rerender restores the focused day');
calendar.open();assert.equal(byClass('calendar-month').length,1,'phone renders a full-width month');
byClass('calendar-arrow')[1].click();assert(day('2026-11-01'));
console.log('PASS: real/invalid/leap/bounded ranges; Puerto Rico today; draft/apply/cancel/clear/presets; roving cross-month keyboard; phone calendar');
