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

## Consistent card copy Grill Log · #124
Resolved: standard rail/search cards keep a shared13rem copy track, matching cover proportions and title/metadata alignment. Long text remains present in a native vertical scroll area rather than clipped; page scroll can chain at its boundaries. The focusable card link supports Arrow/Page keys for overflow without extra nested tab stops; directional keys are intercepted only when the body can scroll that direction. A single delegated listener covers initial and asynchronously inserted cards. Horizontal activity rows keep their distinct128px copy/media tracks on wide screens. Map cards remain compact and unaffected. Place article uses card-venue rather than the paragraph-only card-place class to avoid inherited flex/ellipsis rules.
