import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = name => readFileSync(new URL(`../public/assets/js/features/${name}.js`, import.meta.url), 'utf8').replace(/^import .*\n/gm, '').replace(/^export /gm, '');
const dates = { Event, Intl, Date, Number, document: { querySelectorAll: () => [] }, HTMLDialogElement: undefined };
vm.runInNewContext(source('formDates')+'\nthis.apply=applyDate; this.time=applyTime; this.bounds=dateBounds; this.today=puertoRicoToday; this.start=formDates;', dates);
const events=[];
const input={type:'datetime-local',value:'2026-10-20T19:35:12',dispatchEvent:event=>events.push(event.type)};
dates.apply(input,'2026-11-01');assert.equal(input.value,'2026-11-01T19:35:12');assert.deepEqual(events,['input','change']);
dates.apply(input,'');assert.equal(input.value,'');
dates.apply(input,'2026-12-01');assert.equal(input.value,'2026-12-01T12:00','a new date-time defaults to noon');
input.value='';dates.apply(input,'2026-12-02','19:30');assert.equal(input.value,'2026-12-02T19:30','a time chosen first is kept');
dates.time(input,'08:15');assert.equal(input.value,'2026-12-02T08:15');dates.time(input,'bad');assert.equal(input.value,'2026-12-02T08:15');
input.value='';dates.time(input,'08:15');assert.equal(input.value,'','a time alone never invents a date');
assert.equal(dates.today(new Date('2026-10-13T02:00:00Z')),'2026-10-12','Puerto Rico today');
assert.deepEqual({...dates.bounds({min:'',max:'',value:'',dataset:{dateMin:'today'}},'2026-10-12')},{min:'2026-10-12',max:''});
assert.equal(dates.bounds({min:'',max:'',value:'2026-01-05T10:00',dataset:{dateMin:'today'}},'2026-10-12').min,'2026-01-05','editing keeps a past start reachable');
assert.equal(dates.bounds({min:'1900-01-01',max:'',value:'',dataset:{dateAge:'18'}},'2026-10-12').max,'2008-10-12');
assert.equal(dates.bounds({min:'',max:'',value:'',dataset:{dateAge:'18'}},'2028-02-29').max,'2010-02-28','leap-day birthdays clamp to the month');
const birthday={type:'date',value:'',dispatchEvent(){}};dates.apply(birthday,'1992-02-29');assert.equal(birthday.value,'1992-02-29');
dates.apply(birthday,'bad');assert.equal(birthday.value,'1992-02-29');dates.start();
let active;
class Element {
 constructor(tag){this.tag=tag;this.dataset={};this.children=[];this.handlers={};this.attrs={};this.style={};this.textContent='';const set=new Set();this.classList={contains:key=>set.has(key),add:key=>set.add(key),remove:key=>set.delete(key)};}
 append(...items){this.children.push(...items);}
 setAttribute(key,value){this.attrs[key]=value;} getAttribute(key){return this.attrs[key]||null;} removeAttribute(key){delete this.attrs[key];}
 addEventListener(name,fn){this.handlers[name]=fn;}
 dispatchEvent(event){this.handlers[event.type]?.(event);return true;}
 after(item){this.trigger=item;} focus(){active=this;}
 close(){this.open=false;this.handlers.close?.();} showModal(){this.open=true;}
}
const form=new Element('div'),owner=new Element('form'),select=new Element('select'),label=new Element('label');label.textContent='Category';
select.id='f-category';select.name='category';select.required=true;select.form=owner;select.value='';
select.options=[{value:'',textContent:'Choose'},{value:'music',textContent:'Music'},{value:'disabled',textContent:'Unavailable',disabled:true}];
Object.defineProperty(select,'selectedOptions',{get:()=>select.options.filter(o=>o.value===select.value)});
form.dataset={pickerClose:'Close',pickerSearch:'Search',pickerEmpty:'No results'};form.querySelectorAll=()=>[select];form.querySelector=()=>label;
const scope={Event,CustomEvent:class extends Event{constructor(name,options){super(name,options);this.detail=options?.detail;}},HTMLDialogElement:{prototype:{showModal(){}}},Array,String,JSON,setTimeout:fn=>fn(),clearTimeout(){},window:{addEventListener(){}},document:{createElement:tag=>new Element(tag),documentElement:{classList:{add(){},remove(){}}}},innerWidth:320};
Object.defineProperty(scope.document,'activeElement',{get:()=>active});
vm.runInNewContext(source('searchPickers')+'\nthis.start=searchPickers;',scope);scope.start(form);
assert(select.classList.contains('picker-native'));assert.equal(select.trigger.attrs['aria-required'],'true');
owner.querySelector=()=>({});active=null;select.handlers.invalid({preventDefault(){}});assert.equal(active,null,'a later invalid control leaves focus on the first one');delete owner.querySelector;
let prevented=false;select.handlers.invalid({preventDefault(){prevented=true;}});assert(prevented);assert.equal(active,select.trigger);assert.equal(select.trigger.attrs['aria-invalid'],'true');
const all=node=>[node,...node.children.flatMap(all)];const rows=all(form).filter(node=>node.className==='picker-option');assert.equal(rows[2].disabled,true);
rows[1].handlers.click();assert.equal(select.value,'music');assert.equal(select.trigger.attrs['aria-invalid'],undefined);
select.value='';owner.handlers.reset();assert.equal(select.trigger.children[0].textContent,'Choose');
select.disabled=true;select.classList={contains:()=>false};select.trigger=null;scope.start(form);assert.equal(select.trigger,null);
console.log('PASS: date-time clock/clear/default, historical dates, native fallback; required select validation focus, disabled options, canonical change and form reset');

const body=new Element('body'),field=new Element('div'),outer=new Element('form'),native=new Element('input'),dateLabel=new Element('label');
Element.prototype.before=function(item){const index=this.parent.children.indexOf(this);this.parent.children.splice(index,0,item);item.parent=this.parent;};
const append=Element.prototype.append;Element.prototype.append=function(...items){for(const item of items){if(item.parent)item.parent.children=item.parent.children.filter(child=>child!==item);item.parent=this;}append.call(this,...items);};
outer.append(field);field.append(native);body.append(outer);native.id='f-startsAt';native.type='datetime-local';native.value='2026-10-20T19:35';native.min='';native.max='';native.dataset={formDate:JSON.stringify({dates:'Dates'}),pickerClose:'Close'};dateLabel.textContent='Starts';
let commit,opened=false,focused=false,bounds;const rootClasses=new Set(),exit={},parts=[];
const make=tag=>{const node=new Element(tag);node.classList.toggle=(key,on)=>on?node.classList.add(key):node.classList.remove(key);node.prepend=item=>{if(item.parent)item.parent.children=item.parent.children.filter(child=>child!==item);item.parent=node;node.children.unshift(item);};return node;};
const modalScope={Event,Intl,Date,Number,Math,String,CustomEvent:scope.CustomEvent,HTMLDialogElement:scope.HTMLDialogElement,JSON,setTimeout:fn=>fn(),window:{addEventListener:(name,fn)=>exit[name]=fn},document:{body,querySelectorAll:selector=>selector.includes('form-time')?[]:[native],querySelector:()=>dateLabel,createElement:make,documentElement:{lang:'en',classList:{add:name=>rootClasses.add(name),remove:name=>rootClasses.delete(name)}}},
 searchPickers:part=>{const trigger=make('button');trigger.className='picker-trigger';part.append(trigger);part.querySelector=()=>trigger;parts.push(part);},
 dateCalendar:(dialog,proxy,choices,labels,fn,config)=>{commit=fn;bounds=config;return{open(){opened=true;assert.equal(proxy.value,native.value.slice(0,10));},focus(){focused=true;}};}};
native.dataset.dateMin='today';
vm.runInNewContext(source('formDates')+'\nthis.start=formDates;',modalScope);modalScope.start();
const modal=body.children.find(node=>node.tag==='dialog'),launch=all(field).find(node=>node.className==='picker-trigger date-trigger');
assert(modal);assert.equal(modal.parent,body,'calendar dialog lives outside the owning form');assert(launch);
assert.equal(launch.children[0].textContent,'Tue, Oct 20, 2026');assert.equal(dateLabel.htmlFor,launch.id,'the field label names the date trigger');
assert(native.classList.contains('picker-native'));assert.equal(native.tabIndex,-1);
assert.equal(bounds.min,new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico'}).format(new Date()) < '2026-10-20' ? new Intl.DateTimeFormat('en-CA',{timeZone:'America/Puerto_Rico'}).format(new Date()) : '2026-10-20');
const time=all(field).find(node=>node.className==='temporal-time');assert(time);assert.equal(time.value,'19:35','an off-grid clock is kept as its own choice');assert.equal(parts.length,1);
assert(time.children.some(option=>option.value==='19:30'));
let blocked=false;native.handlers.invalid({preventDefault(){blocked=true;}});assert(blocked);assert.equal(active,launch);assert.equal(launch.attrs['aria-invalid'],'true');
launch.handlers.click();assert(opened&&focused&&modal.open);assert(rootClasses.has('picker-open'));
modal.close();assert.equal(native.value,'2026-10-20T19:35');assert.equal(active,launch);assert(!rootClasses.has('picker-open'));
launch.handlers.click();commit('2026-11-01');assert.equal(native.value,'2026-11-01T19:35');assert.equal(modal.open,false);
native.handlers.change();assert.equal(launch.children[0].textContent,'Sun, Nov 1, 2026');assert.equal(launch.attrs['aria-invalid'],undefined);
time.value='08:00';time.handlers.change();assert.equal(native.value,'2026-11-01T08:00');
launch.handlers.click();exit.pagehide();assert.equal(modal.open,false);assert(!rootClasses.has('picker-open'));
console.log('PASS: form date-time renders formatted trigger and time picker, bounds, invalid focus, body-owned calendar; open/commit/cancel/focus/exit cleanup');
