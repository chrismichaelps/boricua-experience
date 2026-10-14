---
type: module
fidelity: Active
tags: [module, operations]
---
# Server.FailureLogSchema
## Purpose
Private operational report storage and shared admission counter.
## Interface
Existing server/failure-log Worker and schema; POST /failures and daily scheduled retention.
## Algorithm
RLS does not apply to D1. No visitor identity or query string is stored. BEFORE INSERT quota trigger performs indexed UTC-day UPSERT only below5000 then uses RAISE(IGNORE) on unchanged counter. Insert failure rolls back both counter and row. Indexed report paths/timestamps support operations; retention keeps30days and counters for approximately30days.
## Negative Logic
No secrets, user content, credentials, paid resource changes or report failure affecting the application response.
## Edge Cases
Concurrent final quota slot, transaction failure, UTC rollover, malformed streamed input and retention.
## Grill Log · #88
Resolved: use a SQLite trigger to keep shared quota and report commit inseparable. A cap cannot be bypassed by racing isolates; insert failure consumes no slot. Verify with real SQLite and live D1 before promotion.
## Referenced by
[[src/_MOC]] · [[seams/FailureLog]]
