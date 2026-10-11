---
type: module
fidelity: Active
tags: [module, assistant]
---

# Public.AssistantStream

## Purpose
Genuine OpenRouter SSE transport in server/assistant.mjs.

## Interface
signature(keyHex,body,operation=prepare); sseData(stream) async iterator; runConversation(context,bridge,key,signal,emit,fetcher=fetch); default assistant(req,res). Eventsstatus/delta/sources/done/error.

## Algorithm
Validate exactorigin/POST and configured secrets. Body≤24000. Call protected Pudu preparation before SSE; forward renewed cookies. Modelopenrouter/free, requirecompatibleparameters, max_tokens1800, reasoninglow/exclude. At most3 total calls including502/503 retries,2tools/call,args≤1200 and sources≤12. Requiredtool until verified read; only3rd call can disabletools. Reject ungrounded/empty/incomplete replies. Server formats actual activity timestamps with Intl in America/Puerto_Rico. Stream UTF8 chunks as received, answer≤6000. Totaldeadline90s, deployment120s; abort upstream on disconnect and wait for write drain.

## Negative Logic
No paid fallback, clientprovider selection, arbitrarySQL, secret logging or fabricated typing effect. No retry429, malformed/partial stream or abort.

## Edge Cases
CRLF/splitUTF8, upstream429,502/503, missingfinish, failedtools, refreshedcookies, deadline/disconnect.

## Depth
Bounded subsystem boundary.

## Grill Log
Resolved: Pinned Pudu Lambda returns complete responses, so this narrow Node seam streams while Pudu owns authorization/quota/database tools. Protected staging uses own deployment with provided bypass header; normal production uses canonical origin.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

Status phase events accompany actual provider/model work and authorized tool/database reads. Sources stream after each successful tool result before final answer; at most12 accumulate. Client updates one per-turn section, avoiding duplicated suggestions.

Provider telemetry records only round, HTTP status, model, finish reason and output/tool counts. It excludes credentials, prompts, results and member data.

A free provider that ignores required tools is retried within the same three-call budget; unsupported prose is never emitted. A successful live read remains mandatory before any answer.

## Bilingual tooling Grill Log
Resolved: The tool allowlist adds browse_catalog. Tool calls include the server-prepared locale, never a client-selected provider or table. Schedule labels retain America/Puerto_Rico formatting in both languages.
