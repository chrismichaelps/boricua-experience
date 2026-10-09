---
type: seam
capacity: CRITICAL
capacity_score: 7
lifecycle: CRITICAL
drift_score: 0
drift_status: HEALTHY
production_adapters: 1
tags: [seam, critical]
---

# DatabaseApi (seam)

## Classification

CRITICAL — one production adapter on every path. Every read and write goes through
[[src/Api/Supabase/Gateway]], which posts named arguments to a database function and answers JSON or
a [[src/Domain/Problem]]. Tests replace the transport with the httpclient stub.

## Contract

[[grammar/database-api]] — function names, callers, answers, and error codes.

## Deepening

[[decisions/ADR-0001-database-api-over-https]].

## Referenced by

[[seams/_MOC]] · [[src/Api/Supabase/Gateway]]
