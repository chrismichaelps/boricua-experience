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


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; the initial category-only decision is superseded below; no hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

## Business identity refinement Grill Log · #120
Resolved user refinement: a nullable map_icon_url comes from the database public place projection and holds official business artwork for identification. A missing or failed image falls back once to the category icon. Keep the circular44px button, accessible branch/category label, map positioning and selection contract. No category/brand slug guessing in browser logic. Branded marks do not establish verified ownership or affiliation; provenance remains recorded.
