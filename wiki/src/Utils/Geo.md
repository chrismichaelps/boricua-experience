---
type: module
path: "@root/src/Utils/Geo.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: SHALLOW
tags: [module, utils, shallow]
---

# Utils.Geo

> /** @Utils.Geo.Island — coordinates on and around Puerto Rico */

## Purpose

Bounds checks, coordinate parsing, and distance labels.

## Interface

### Signatures

```pudu
export fn inPuertoRico(lat: Float64, lng: Float64) -> Bool
export fn parseDegrees(text: Str) -> Option[Float64]
export fn distanceLabel(meters: Int) -> Str
```

### Linkage

- **Requires:** [[src/Constants/App]].
- **Consumed by:** [[src/Validation/EventForm]], [[src/Validation/Location]], [[src/View/Components/EventCard]].

## Algorithm

Bounds compare against the island's box. Labels: below 1 km in tens of metres, below 10 km in tenths, otherwise whole kilometres.

## Negative Logic (Prohibited Paths)

- ❌ No distance computation: the database measures on the ellipsoid.

## Edge Cases

- Exactly 1000 m reads `1.0 km`.

## Depth

SHALLOW: three small rules kept in one place.

## Grill Log

- **Q:** Compute distances here?
  **A:** No: the database returns them with the rows. _Rejected:_ haversine in Pudu.

## Referenced by

[[src/_MOC]]
