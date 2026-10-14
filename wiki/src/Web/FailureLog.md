---
type: module
fidelity: Active
tags: [module, privacy, operations]
---
# Web.FailureLog
## Purpose
Optional1500ms operational sink; strips internal failure header before browser response. Bounded single-line reason and method/path/status/time/release JSON contain no session/query. Normalize private calendar and digest-stop capability URLs to route templates before platform or remote logging; a private URL token must never enter a log.
## Interface
FailureLog event, report, pathForLog, reasonLine, takeReason and optional client; test module verifies the contract.
## Algorithm
Normalize capability paths before generating values; transport errors are ignored, not substituted for the original response.
## Negative Logic
No private URL credential, query string or header secret in local or remote logs.
## Edge Cases
Missing sink, malformed or interrupted request, private route parameters, fragments and sensitive queries.
## Grill Log · #89
Resolved: share one route normalizer between platform access logging and remote event serialization. Test both private capability routes and ordinary source paths. Never log a bearer capability as an operation identifier.
## Backlinks
[[src/_MOC]] · [[seams/FailureLog]]

## Routing-equivalent capability Grill Log · #89
Resolved: recognize private paths after decoding path escapes and dropping empty slash segments, matching routing separator semantics. Redact even encoded/unknown variants conservatively; preserve the original cleaned path for ordinary operations.
