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

## Unknown event facts Grill Log · #51
Resolved: nullable prices/end retain explicit unknown state; known free/paid and dates regressions stay covered. No1970 null-date coercion. Unknown schedule24-hour discovery cutoff is separate from actual end. Boundary, malformed input, bilingual output and provider projections need focused tests.

## Unknown temporal facts Grill Log · #51
Resolved: end=null never coerces to1970; schedule shows start plus localized unknown-end text. Browser and provider never claim ongoing without known end. Provider instruction preserves unknown price/end and keeps source cutoff separate.

## Asset graph46 · #51
Resolved: first-party import identities and worker cache advance together to46 for nullable schedule/price rendering. Public code changes are limited to LocalTime, BrowserMessages, AssistantStream and Explorer; other browser modules only change dependency identities. No private data enters precache.

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.
