---
type: module
path: "@root/src/Constants/Supabase.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.Supabase

> /** @Constants.Supabase.Contract — database functions and identity endpoints */

## Purpose

The name of every database function the server calls, the identity endpoints, header names, the named client, and its timeouts.

## Interface

One `Str` per function of [[grammar/database-api]]; `RPC_PATH`, `AUTH_PATH`, `AUTH_*`; `API_KEY_HEADER`; `CLIENT_NAME`; `CALL_TIMEOUT_MILLIS` (8 s), `ATTEMPT_TIMEOUT_MILLIS` (4 s).

### Linkage

- **Requires:** nothing.
- **Consumed by:** modules of every higher layer that use these values.

## Algorithm

None: compile-time values only.

## Negative Logic (Prohibited Paths)

- ❌ No value computed from the environment or the clock.
- ❌ No literal of these values anywhere else in the source.

## Depth

SHALLOW by design: a table of names. Deletion test: the values scatter as literals.

## Grill Log

- **Q:** Timeouts? **A:** 4 s per attempt, 8 s per call including one retry of idempotent reads, under the platform's own limit. _Rejected:_ the client default of 100 s.

## Referenced by

[[src/_MOC]]
