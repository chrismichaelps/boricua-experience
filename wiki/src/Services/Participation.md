---
type: module
path: "@root/src/Services/Participation.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: DEEP
tags: [module, services, deep]
---

# Services.Participation

> /** @Services.Participation.Joining — requests, decisions, saves, reactions, and reports */

## Purpose

The join flow, the organizer's queue, saves, reactions, reports, and the activity page's three lists read in parallel.

## Interface

### Signatures

```pudu
export type Activity = { requests, saved, organizing }
export type Queue = { event: Event.Detail, requests }
export fn join, withdraw, decide, queue, toggleSaved, react, report, activity
```

### Linkage

- **Requires:** [[src/Api/Participation]], [[src/Api/Events]], [[src/Validation/Participation]].
- **Consumed by:** [[src/App/Handlers/Participation]].

## Algorithm

Validate the message or reaction, call, and answer the new state.

## Negative Logic (Prohibited Paths)

- ❌ No capacity check here: the database locks the event row and decides.

## Edge Cases

- `join` answers `approved` for open events.

## Depth

DEEP: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Optimistic UI?
  **A:** Scripts update toggles in place from the answer; without scripts the page reloads.

## Referenced by

[[src/_MOC]]
