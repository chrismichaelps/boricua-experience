---
type: module
path: "@root/src/View/Components/PlaceCard.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view]
---

# View.Components.PlaceCard

> /** @View.Components.PlaceCard.Listing — a place as a card, and places as rails and grids */

## Purpose

A place card: cover, open-now, verified, rating, town, and the category's highlighted facts.

## Interface

### Signatures

```pudu
export fn coverOf, openNow, card, rail
```

### Linkage

- **Requires:** [[src/View/Components/Facts]], [[src/Domain/Place]].
- **Consumed by:** [[src/View/Pages/Search]], [[src/View/Pages/Place]].

## Algorithm

A restaurant card reads cuisine and price range; a beach card water conditions and facilities: whatever the profile highlights.

## Negative Logic (Prohibited Paths)

- ❌ No card shows a fact its profile does not highlight.

## Referenced by

[[src/_MOC]]
