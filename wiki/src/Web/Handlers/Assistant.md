---
type: module
fidelity: Active
tags: [module, assistant]
---

# Web.Handlers.Assistant

## Purpose
Authenticated internal bridge for Node SSE adapter.

## Interface
routes(&App)->Array[Route]; signedBody(key:&Bytes,body:Str,operation:Str,signature:Str)->Bool. POST/api/assistant dispatches prepare or tool.

## Algorithm
memberAction checks origin/session/CSRF/onboarding. Reject body>24000, unsupported operation or failed constant-time HMAC over boricua-assistant:<operation>:<body>. Decode Input/Tool then dispatch signed mediator kinds. Only assistant_limit/not_configured are surfaced from unavailable errors.

## Negative Logic
Browser cannot call tools directly with unsigned input; no raw provider/database error strings.

## Edge Cases
Malformed signature, cross-operation replay, session refresh, tool failure.

## Depth
Bounded subsystem boundary.

## Grill Log
Resolved: Operation and exact body are authenticated together. Node forwards cookie/origin/CSRF; HMAC is additional protection, never a replacement for session guards.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.
