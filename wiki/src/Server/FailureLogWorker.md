---
type: module
fidelity: Active
tags: [module, operations]
---
# Server.FailureLogWorker
## Purpose
Bounded anonymous server-failure ingestion and retention in D1.
## Interface
Existing server/failure-log Worker and schema; POST /failures and daily scheduled retention.
## Algorithm
Validate 2KB JSON and bounded safe fields before admission. Capture one ISO timestamp. The database insert trigger reserves the UTC-day counter and report atomically; a capped insert is ignored and returns429, a failed transaction returns503. Isolate burst guard is supplementary. Retention removes expired reports and old counters.
## Negative Logic
No secrets, user content, credentials, paid resource changes or report failure affecting the application response.
## Edge Cases
Concurrent final quota slot, transaction failure, UTC rollover, malformed streamed input and retention.
## Grill Log · #88
Resolved: use a SQLite trigger to keep shared quota and report commit inseparable. A cap cannot be bypassed by racing isolates; insert failure consumes no slot. Verify with real SQLite and live D1 before promotion.
## Referenced by
[[src/_MOC]] · [[seams/FailureLog]]
