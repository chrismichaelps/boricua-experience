---
type: module
fidelity: Active
tags: [module, assistant]
---

# Test.Assistant

## Purpose
Input, public projection, bridge signature, free-only model, stream parsing, deadline/cancellation and live-search gate regressions.

## Interface
Implementation contract and bounded adjacent layer API.

## Algorithm
Input, public projection, bridge signature, free-only model, stream parsing, deadline/cancellation and live-search gate regressions.

## Negative Logic
No secrets or private data in logs; no paid fallback.

## Edge Cases
Invalid roles, unavailable provider, malformed chunks, failed tools, deadline, abort, empty results.

## Depth
Bounded transport or verification responsibility.

## Grill Log
- **Q:** Why this boundary? **A:** The pinned Pudu route/lambda API returns complete response bodies. A narrow Node adapter supplies genuine incremental SSE while all authentication, quota and database authorization remain in Pudu. Resolved.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

## Concrete verification interface
`pudu test test/Assistant`, `node scripts/assistant-stream-test.mjs`, `node scripts/assistant-markdown-test.mjs`, `node scripts/assistant-adapter-test.mjs`. Resolve: adapter tests simulate browser disconnect and invoke the actual deadline callback while a provider request awaits its signal, check stable authentication errors and forwarded refreshed cookies. Markdown tests inspect produced node types/attributes rather than output snapshots. No real microphone permission, physical haptic or paid model request occurs.

Browser lifecycle harness exercises active Stop with empty required input, queued paint canceled onclose and fresh incremental paint afterreopen/reset. Sourceimage allowlist has goodlocal/Supabase and malicious/remote cases.

## Bilingual tooling Grill Log
Resolved: Localized source tests assert English/Spanish database category labels. Extended stream tests cover catalog reads, empty results, calendar labels, multiple tool fragments, forged tools and cancellation.
