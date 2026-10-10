---
type: module
path: "@root/src/Domain/Location.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Location

> /** @Domain.Location.Positions — live positions and who may see them */

## Purpose

A browser reading, what the database did with it, and a co-attendee's live position.

## Interface

### Signatures

```pudu
export type Position = { lat, lng, accuracyM }
export type Recorded = { status: Str }
export type Participant = { displayName, lat, lng, accuracyM, recordedAt }
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Services/Location]], [[src/Web/Handlers/Location]].

## Algorithm

Derived decoding.

## Negative Logic (Prohibited Paths)

- ❌ A position is never part of a page rendered for others.

## Edge Cases

- `throttled` is a normal answer, not a failure.

## Depth

SHALLOW: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Expose accuracy?
  **A:** Yes: the map draws a circle so a coarse reading is not mistaken for a precise one.

## Referenced by

[[src/_MOC]]
