---
type: module
path: "@root/src/Services/Location.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services, medium]
---

# Services.Location

> /** @Services.Location.Sharing — live location recorded, stopped, erased, and shared */

## Purpose

Records readings, stops sharing, erases history, and reads co-attendee positions. See [[decisions/ADR-0004-location-privacy]].

## Interface

### Signatures

```pudu
export fn record, stop, erase, participants
```

### Linkage

- **Requires:** [[src/Api/Location]], [[src/Api/Events]], [[src/Validation/Location]].
- **Consumed by:** [[src/App/Handlers/Location]].

## Algorithm

Validate then call; participants resolve the event by slug first.

## Negative Logic (Prohibited Paths)

- ❌ Never returns another member's position outside the database's rules.

## Edge Cases

- `throttled` is passed through.

## Depth

MEDIUM: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Keep history on the server only?
  **A:** Yes, and the member can export or erase it.

## Referenced by

[[src/_MOC]]
