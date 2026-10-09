---
type: module
path: "@root/src/Api/Location.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: SHALLOW
tags: [module, api, shallow]
---

# Api.Location

> /** @Api.Location.Client — live positions and their history */

## Purpose

Recording, stopping, deleting, and reading co-attendee positions.

## Interface

### Signatures

```pudu
export fn record(gateway, reading: &Location.Position, token) -> Result[Location.Recorded, Problem.Problem]
export fn stop(gateway, token) -> Result[(), Problem.Problem]
export fn deleteHistory(gateway, token) -> Result[(), Problem.Problem]
export fn participants(gateway, eventId, token) -> Result[Array[Location.Participant], Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Domain/Location]].
- **Consumed by:** [[src/Services/Location]].

## Algorithm

Direct mapping.

## Negative Logic (Prohibited Paths)

- ❌ No business rule: authorization and limits are the database's.
- ❌ No logging of arguments or tokens.

## Edge Cases

- `throttled` is an answer, not a failure.

## Depth

SHALLOW: one typed function per database function; the argument names and decoding stay here.

## Grill Log

- **Q:** Batch readings?
  **A:** No: one current position per call keeps the live row fresh; the browser already throttles.

## Referenced by

[[src/_MOC]]
