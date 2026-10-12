---
type: module
path: "@root/src/Domain/Place.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain]
---

# Domain.Place

> /** @Domain.Place.Listings — permanent places as cards, pages, drafts, and opening hours */

## Purpose

Place projections (`Listing`, `Results`, `Detail`, `Relation`, `Owner`), the form `Draft` with facts (`d.<key>`, `d.<key>.<option>`) and hours (`h.<day>.<slot>.from|to`), its converted `Ready`, and opening-hours logic.

## Interface

### Signatures

```pudu
export fn decodeDetail, factName, flagName, hoursName, isOn, blank, fromDetail
export fn rangesOf, hasHours, minutesOf, openAt, ratingText
```

### Linkage

- **Requires:** [[src/Utils/Time]], [[src/Domain/Event]].
- **Consumed by:** [[src/Validation/PlaceForm]], [[src/Api/Places]], [[src/View/Pages/Place]], [[src/View/Components/PlaceCard]].

## Algorithm

Hours are a JSON object keyed by weekday 0 (Sunday) to 6, each at most two `HH:MM` ranges. `openAt` checks today's ranges and yesterday's ranges that close after midnight. `ratingText` rounds to one decimal.

## Negative Logic (Prohibited Paths)

- ❌ Type names never repeat another domain module's derived types (`Card`, `Page`, `Viewer`): derived decoders of equal names collide.

## Referenced by

[[src/_MOC]]
