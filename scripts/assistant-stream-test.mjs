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
await assert.rejects(() => runConversation(context, async () => ({ result: { error: 'invalid town' }, sources: [] }), 'fixture', signal, async () => {}, provider([tool('search_activities'), answer, answer])), ChatFailure, 'failed tools cannot establish a grounded answer');
const recoveredGrounding=[];
await runConversation(context,async()=>({result:{searched:true,activities:[]},sources:[]}), 'fixture',signal,async(name)=>recoveredGrounding.push(name),provider([answer,tool('search_activities'),answer]));
assert.equal(recoveredGrounding.filter(name=>name==='delta').length,2,'an ignored required tool retries without displaying ungrounded text');
let called = false;
await assert.rejects(() => runConversation(context, async () => { called = true; }, 'fixture', signal, async () => {}, provider([tool('execute_sql')])), ChatFailure);
assert.equal(called, false, 'unknown tools never reach database bridge');
await assert.rejects(() => runConversation(context, async () => {}, 'fixture', signal, async () => {}, provider([answer,answer,answer])), ChatFailure, 'ungrounded plain answers are refused');
await assert.rejects(() => runConversation(context, async () => {}, 'fixture', signal, async () => {}, async () => ({ ok: false, status: 429 })), error => error.code === 'assistant_limit');
const stopped = new AbortController(); stopped.abort();
await assert.rejects(() => runConversation(context, async () => {}, 'fixture', stopped.signal, async () => {}, async (_, init) => { assert.equal(init.signal.aborted, true); throw new DOMException('Aborted', 'AbortError'); }));
let retries=0;const recovered=provider([tool('search_activities'),answer]);
await runConversation(context,async()=>({result:{searched:true,activities:[]},sources:[]}), 'fixture',signal,async()=>{},async(...args)=>{if(retries++===0)return{ok:false,status:503};return recovered(...args);});
assert.equal(retries,3,'retry and tool rounds share a three-attempt budget');
await assert.rejects(()=>runConversation(context,async()=>{},'fixture',signal,async()=>{},provider([[{choices:[{delta:{content:'unfinished'}}]}]])),ChatFailure);
console.log('PASS: free-only stream, UTF-8 framing, live-data gate, unknown-tool rejection, quota errors and upstream cancellation');
