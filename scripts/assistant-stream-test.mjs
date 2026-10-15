import assert from 'node:assert/strict';
import { signature, sseData, runConversation, ChatFailure } from '../server/assistant.mjs';

const key = 'ab'.repeat(32), signal = new AbortController().signal;
assert.equal(signature(key, 'hello').length, 64);
assert.notEqual(signature(key, 'hello'), signature(key, 'helló'));
assert.notEqual(signature(key,'hello'),signature(key,'hello','tool'));
assert.throws(() => signature('bad', 'hello'), ChatFailure);
function stream(items, split = 3) {
  const bytes = new TextEncoder().encode(items.map(item => `data: ${JSON.stringify(item)}\r\n\r\n`).join('') + 'data: [DONE]\r\n\r\n');
  return new ReadableStream({ start(controller) { for (let at = 0; at < bytes.length; at += split) controller.enqueue(bytes.slice(at, at + split)); controller.close(); } });
}
const chunks = [];
for await (const chunk of sseData(stream([{ text: 'Puerto Rico: música, café y piñón' }]))) chunks.push(chunk);
assert.equal(chunks[0].text, 'Puerto Rico: música, café y piñón', 'split UTF-8 and CRLF are decoded correctly');
const tool = name => [
  { choices: [{ delta: { tool_calls: [{ index: 0, id: 'one', function: { name, arguments: '{"query":""}' } }] } }] },
  { choices: [{ delta: {}, finish_reason: 'tool_calls' }] },
];
const answer = [{ choices: [{ delta: { content: '**Opciones**\n' } }] }, { choices: [{ delta: { content: 'Puedes explorar.' }, finish_reason: 'stop' }] }];
const context = { messages: [{ role: 'user', content: 'Qué hago' }], tools: [] };
function provider(rounds, inspect = () => {}) {
  let at = 0;
  return async (url, init) => { assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions'); const body = JSON.parse(init.body); assert.equal(body.model, 'openrouter/free'); assert.equal(body.stream, true); inspect(body); return { ok: true, body: stream(rounds[at++]) }; };
}
const events = [];
await runConversation(context, async () => ({ result: { searched: true, activities: [] }, sources: [] }), 'fixture', signal, async (name, value) => events.push([name, value]), provider([tool('search_activities'), answer]));
assert.equal(events.filter(([name]) => name === 'delta').map(([,value]) => value.text).join(''), '**Opciones**\nPuedes explorar.');
assert.equal(events.at(-1)[0], 'done');
await assert.rejects(() => runConversation(context, async () => ({ result: { error: 'invalid town' }, sources: [] }), 'fixture', signal, async () => {}, provider([tool('search_activities'), answer, answer, answer])), ChatFailure, 'failed tools cannot establish a grounded answer');
const recoveredGrounding=[];
await runConversation(context,async()=>({result:{searched:true,activities:[]},sources:[]}), 'fixture',signal,async(name)=>recoveredGrounding.push(name),provider([answer,tool('search_activities'),answer]));
assert.equal(recoveredGrounding.filter(name=>name==='delta').length,2,'an ignored required tool retries without displaying ungrounded text');
let called = false;
await assert.rejects(() => runConversation(context, async () => { called = true; }, 'fixture', signal, async () => {}, provider([tool('execute_sql')])), ChatFailure);
assert.equal(called, false, 'unknown tools never reach database bridge');
await assert.rejects(() => runConversation(context, async () => {}, 'fixture', signal, async () => {}, provider([answer,answer,answer,answer])), ChatFailure, 'ungrounded plain answers are refused');
await assert.rejects(() => runConversation(context, async () => {}, 'fixture', signal, async () => {}, async () => ({ ok: false, status: 429 })), error => error.code === 'assistant_limit');
const stopped = new AbortController(); stopped.abort();
await assert.rejects(() => runConversation(context, async () => {}, 'fixture', stopped.signal, async () => {}, async (_, init) => { assert.equal(init.signal.aborted, true); throw new DOMException('Aborted', 'AbortError'); }));
let retries=0;const recovered=provider([tool('search_activities'),answer]);
await runConversation(context,async()=>({result:{searched:true,activities:[]},sources:[]}), 'fixture',signal,async()=>{},async(...args)=>{if(retries++===0)return{ok:false,status:503};return recovered(...args);});
assert.equal(retries,3,'retry and tool rounds share a three-attempt budget');
await assert.rejects(()=>runConversation(context,async()=>{},'fixture',signal,async()=>{},provider([[{choices:[{delta:{content:'unfinished'}}]}]])),ChatFailure);
const metadata=[];
await assert.rejects(()=>runConversation(context,async()=>{},'fixture',signal,async()=>{},provider([[{error:{code:{secret:'malformed'}}}]]),value=>metadata.push(value)),ChatFailure);
assert.ok(!JSON.stringify(metadata).includes('malformed'));
console.log('PASS: free-only stream, UTF-8 framing, live-data gate, unknown-tool rejection, quota errors and upstream cancellation');

const catalogEvents=[];let catalogRead=false;
await runConversation({...context,locale:'en'},async(call)=>{assert.equal(call.name,'browse_catalog');assert.equal(call.args.scope,'categories');assert.equal(call.locale,'en');catalogRead=true;return {result:{verified:true,entries:[{name:'Music',slug:'music'}],more:false},sources:[]};},'fixture',signal,async(name,value)=>catalogEvents.push([name,value]),provider([[{choices:[{delta:{tool_calls:[{index:0,id:'catalog',function:{name:'browse_catalog',arguments:'{"scope":'}}]}}]},{choices:[{delta:{tool_calls:[{index:0,function:{arguments:'"categories"}'}}]},finish_reason:'tool_calls'}]}],answer]));
assert.ok(catalogRead);assert.equal(catalogEvents.at(-1)[0],'done');
let oversizedBridge=false;
await assert.rejects(()=>runConversation(context,async()=>{oversizedBridge=true;},'fixture',signal,async()=>{},provider([[{choices:[{delta:{tool_calls:[{index:0,id:'huge',function:{name:'search_activities',arguments:'x'.repeat(1201)}}]},finish_reason:'tool_calls'}]}]])),ChatFailure);
assert.equal(oversizedBridge,false);
console.log('PASS: catalog grounding, fragmented tool arguments and oversized-tool rejection');

for (const locale of ['es', 'en']) {
  let projected;
  await runConversation({...context, locale}, async () => ({result: {searched:true,activities:[{starts_at:'2026-10-12T00:00:00Z',ends_at:null,price_cents:null}]},sources:[]}), 'fixture',signal,async()=>{},provider([tool('search_activities'),answer],body=>{const message=body.messages.find(m=>m.role==='tool');if(message)projected=JSON.parse(message.content).activities[0];}));
  assert.equal(projected.ends_at,null);assert.equal(projected.price_cents,null);
  assert.match(projected.schedule_pr, locale==='en'?/End time not provided/:/Hora de fin no informada/);
  assert(!projected.schedule_pr.includes('1970'));
}

const markup = text => [{choices:[{delta:{content:text.slice(0,5)}}]}, {choices:[{delta:{content:text.slice(5,17)}}]}, {choices:[{delta:{content:text.slice(17)},finish_reason:'stop'}]}];
for(const text of ['<tool_call> <function=search_activities> <parameter=category> aire-libre </parameter> </function> </tool_call>', '<think>internal reasoning</think>', '<function=route_towns>{}</function>']) {
  const visible=[];
  await runConversation(context,async()=>({result:{verified:true},sources:[]}), 'fixture',signal,async(name,value)=>{if(name==='delta')visible.push(value.text);},provider([tool('browse_catalog'),markup(text),answer]));
  assert.equal(visible.join(''),'**Opciones**\nPuedes explorar.','split provider control syntax is never displayed');
}
const rejected=[];
await assert.rejects(()=>runConversation(context,async()=>({result:{verified:true},sources:[]}), 'fixture',signal,async(name,value)=>{if(name==='delta')rejected.push(value.text);},provider([tool('browse_catalog'),markup('<tool_call>bad</tool_call>'),markup('<tool_call>bad</tool_call>'),markup('<tool_call>bad</tool_call>')])),ChatFailure);
assert.equal(rejected.join(''),'');
for(const name of ['build_itinerary','route_towns','route_activities','search_places']) {
  const emitted=[];
  await runConversation(context,async(call)=>({result:{verified:true},sources:name==='search_places'?[{slug:'real-place',href:'/lugar/real-place',title:'Real place'}]:[],visuals:[{kind:'route',pins:[],legs:[]}]}), 'fixture',signal,async(event,data)=>emitted.push([event,data]),provider([tool(name),answer]));
  assert.ok(emitted.some(([event])=>event==='visuals'));
  if(name==='search_places')assert.equal(emitted.find(([event,data])=>event==='sources'&&data.items.length)?.[1].items[0].href,'/lugar/real-place');
}
console.log('PASS: split textual tool/reasoning quarantine, bounded retry/refusal and grounded itinerary/place/route events');
// Real results survive a model that cannot finish: the app answers with them instead of an error.
{
  const found=[];
  const real={slug:'bomba-en-loiza',href:'/e/bomba-en-loiza',title:'Bomba en Loíza'};
  await runConversation({...context,locale:'es'},async()=>({result:{searched:true,activities:[]},sources:[real]}),'fixture',signal,async(name,value)=>found.push([name,value]),provider([tool('search_activities'),markup('<tool_call>bad</tool_call>'),markup('<tool_call>bad</tool_call>'),markup('<tool_call>bad</tool_call>')]));
  assert.match(found.filter(([name])=>name==='delta').map(([,value])=>value.text).join(''),/^Esto es lo que encontré/,'the app says what it found');
  assert.deepEqual(found.filter(([name])=>name==='sources').at(-1)[1].items.map(item=>item.slug),['bomba-en-loiza'],'with the real results');
  assert.equal(found.at(-1)[0],'done');
  console.log('PASS: verified results answered when the model cannot finish');
}
// Markup under unusual names is quarantined too, and never shown before the fallback.
{
  for (const tag of ['<dots_function_call>{"name":"x"}</dots_function_call>', '<|tool_call|>x', '<invoke name="x">', '<function_calls>x']) {
    const seen=[];
    const real={slug:'bomba-en-loiza',href:'/e/bomba-en-loiza',title:'Bomba en Loíza'};
    await runConversation({...context,locale:'en'},async()=>({result:{searched:true,activities:[]},sources:[real]}),'fixture',signal,async(name,value)=>seen.push([name,value]),provider([tool('search_activities'),markup(tag),markup(tag),markup(tag)]));
    const text=seen.filter(([name])=>name==='delta').map(([,value])=>value.text).join('');
    assert.ok(!text.includes('<'), `no markup shown for ${tag}: ${text}`);
    assert.match(text,/^Here/,'the English fallback for an English page');
  }
  console.log('PASS: markup under any tool or reasoning name is quarantined; fallback in the page language');
}

