---
type: module
path: "@root/src/Validation/Location.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: SHALLOW
tags: [module, validation, shallow]
---

# Validation.Location

> /** @Validation.Location.Readings — browser positions checked */

## Purpose

A reading must lie in Puerto Rico with an accuracy from 0 to 100 km.

## Interface

### Signatures

```pudu
export fn position(reading: &Location.Position) -> Result[Location.Position, Problem.Problem]
```

### Linkage

- **Requires:** [[src/Validation/Check]], [[src/Utils/Geo]].
- **Consumed by:** [[src/Services/Location]].

## Algorithm

Bounds and accuracy checks.

## Negative Logic (Prohibited Paths)

- ❌ No smoothing or snapping.

## Edge Cases

- Readings from outside the island are refused, not clamped.

## Depth

SHALLOW.

## Grill Log

- **Q:** Accept positions abroad?
  **A:** No: the product covers Puerto Rico; the database refuses them too.

## Referenced by

[[src/_MOC]]
