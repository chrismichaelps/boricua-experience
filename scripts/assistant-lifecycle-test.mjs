import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
class Element {
  handlers = new Map(); children = []; dataset = {}; style = {}; classList = {add(){},remove(){}}; value = ''; disabled = false;
  addEventListener(name,fn) { this.handlers.set(name,fn); }
  emit(name,event={}) { return this.handlers.get(name)?.(event); }
  append(...nodes) { for(const n of nodes){ n.parentNode = this; this.children.push(n); } }
  replaceChildren(...nodes) { this.children = []; this.append(...nodes); }
  remove() { if(this.parentNode) this.parentNode.children=this.parentNode.children.filter(x=>x!==this); }
  cloneNode() { return new Element(); }
  setAttribute(name,value) { this[name]=value; } removeAttribute(name){delete this[name];}
  contains(node){return this.children.includes(node);}
  focus() {} scrollIntoView() {} querySelector(){return null;}
}
const dialog=new Element(),launch=new Element(),form=new Element(),input=new Element(),thread=new Element(),status=new Element(),voice=new Element(),submit=new Element(),close=new Element(),reset=new Element();
thread.firstElementChild = new Element();thread.append(thread.firstElementChild);
dialog.showModal=()=>dialog.open=true;dialog.close=()=>dialog.open=false;
form.querySelector=()=>submit;
const nodes={'dialog':dialog,'.assistant-launch':launch,'form':form,'textarea':input,'.assistant-thread':thread,'.assistant-status':status,'[data-assistant="voice"]':voice,'[data-assistant="close"]':close,'[data-assistant="reset"]':reset};
const root={dataset:{send:'Enviar',stop:'Detener',busy:'Buscando',thinking:'Pensando'},querySelector:s=>nodes[s],querySelectorAll:()=>[]};
let raf=0;const paints=new Map(),signals=[];
const recordings=[];class Speech {constructor(){recordings.push(this);}start(){}stop(){}abort(){this.aborted=true;}}
const scope={root,console,URL,ReadableStream,TextDecoder,AbortController,setTimeout,clearTimeout,innerWidth:390,innerHeight:844,location:{origin:'http://localhost:8080'},CustomEvent:class{},addEventListener(){},requestAnimationFrame:fn=>{paints.set(++raf,fn);return raf;},cancelAnimationFrame:id=>paints.delete(id),renderMarkdown(){},window:{SpeechRecognition:Speech},document:{activeElement:new Element(),hidden:false,documentElement:{lang:'es'},addEventListener(){},dispatchEvent(){},createElement:()=>new Element(),querySelector:()=>({content:'csrf'})},fetch:async(_,init)=>{
  signals.push(init.signal);
  const body=new ReadableStream({start(controller){controller.enqueue(new TextEncoder().encode('event: delta\ndata: {"text":"Texto"}\n\n'));init.signal.addEventListener('abort',()=>controller.error(new DOMException('Aborted','AbortError')),{once:true});}});
  return {ok:true,body};
}};
let source=readFileSync('public/assets/js/features/assistant.js','utf8').replace(/^import .*;$/gm,'').replace(/^export /gm,'');
vm.runInNewContext(source+'\nassistant(root);',scope);
const flush=()=>new Promise(setImmediate);
launch.emit('click');input.value='Pregunta';const first=form.emit('submit',{preventDefault(){}});await flush();
assert.equal(paints.size,1,'stream delta queues a paint');
close.emit('click');assert.equal(paints.size,0);assert.ok(signals[0].aborted);assert.equal(status.hidden,true);
launch.emit('click');input.value='Otra pregunta';const second=form.emit('submit',{preventDefault(){}});await flush();
assert.equal(paints.size,1,'reopen schedules fresh paint despite canceled old frame');
input.value='';let prevented=false;submit.emit('click',{preventDefault(){prevented=true;}});
assert.ok(prevented,'active Stop prevents native required-field validation');assert.ok(signals[1].aborted,'empty composer still stops generation');assert.equal(status.hidden,true);assert.equal(submit['aria-label'],'Enviar');
await Promise.all([first,second]);
input.value='Tercera';const third=form.emit('submit',{preventDefault(){}});await flush();reset.emit('click');assert.equal(paints.size,0);assert.ok(signals[2].aborted);await third;
const restoredPrompt=new Element();restoredPrompt.dataset.assistantPrompt='Planes para el fin de semana';thread.append(restoredPrompt);thread.emit('click',{target:{closest:()=>restoredPrompt}});assert.equal(input.value,'Planes para el fin de semana','reset welcome prompts use delegated click handlers');
const safe=scope.sourceImage;
assert.equal(safe('/assets/covers/musica.svg','http://localhost:8080'),'http://localhost:8080/assets/covers/musica.svg');
assert.equal(safe('https://project.supabase.co/storage/v1/object/public/covers/photo.webp','http://localhost:8080'),'https://project.supabase.co/storage/v1/object/public/covers/photo.webp');
for(const image of ['javascript:alert(1)','https://evil.test/photo.jpg','https://fake.supabase.co.evil.test/storage/v1/object/public/photo.png','/api/private'])assert.equal(safe(image,'http://localhost:8080'),'');
console.log('PASS: empty-input Stop, close/reset cancellation, fresh streamed paint after reopen, source-image authorization');

launch.emit('click');input.value='Hola';voice.emit('click');const firstVoice=recordings.at(-1);assert.equal(firstVoice.lang,'es-PR');firstVoice.onresult({results:[[{transcript:'Puerto Rico'}]]});assert.equal(input.value,'Hola Puerto Rico');
close.emit('click');assert.equal(firstVoice.aborted,true);launch.emit('click');scope.document.documentElement.lang='en';voice.emit('click');const secondVoice=recordings.at(-1);assert.equal(secondVoice.lang,'en-US');firstVoice.onend();assert.equal(secondVoice.aborted,undefined,'stale voice end cannot abort a new recording');
secondVoice.onresult({results:[[{transcript:'x'.repeat(1300)}]]});assert.equal(input.value.length,1200);secondVoice.onerror();assert.equal(secondVoice.aborted,true);assert.equal(voice['aria-pressed'],'false');
console.log('PASS: bilingual dictation, transcript bounds, close cancellation, denied voice cleanup and stale-session isolation');

root.dataset.listen='Listen';root.dataset.stopAudio='Stop audio';let spoken=[],canceled=0;
scope.SpeechSynthesisUtterance=class {constructor(text){this.text=text;}};scope.window.SpeechSynthesisUtterance=scope.SpeechSynthesisUtterance;scope.window.speechSynthesis={speak:speech=>spoken.push(speech),cancel:()=>canceled++};
scope.fetch=async()=>({ok:true,body:new ReadableStream({start(controller){controller.enqueue(new TextEncoder().encode('event: delta\ndata: {"text":"**Hello**"}\n\nevent: done\ndata: {}\n\n'));controller.close();}})});
input.value='Read this';await form.emit('submit',{preventDefault(){}});const listen=thread.children.find(n=>n.className==='assistant-listen');assert.ok(listen);
voice.emit('click');const playingVoice=recordings.at(-1);listen.emit('click');assert.equal(playingVoice.aborted,true);assert.equal(spoken.at(-1).lang,'en-US');assert.equal(listen['aria-pressed'],'true');listen.emit('click');assert.equal(listen['aria-pressed'],'false');assert.equal(listen.textContent,'Listen');
listen.emit('click');const oldSpeech=spoken.at(-1);listen.emit('click');listen.emit('click');oldSpeech.onend();oldSpeech.onerror();assert.equal(listen['aria-pressed'],'true','old speech end preserves the new playback');spoken.at(-1).onend();assert.equal(listen['aria-pressed'],'false');
console.log('PASS: spoken reply start/stop, language, completion and stale-utterance isolation');
