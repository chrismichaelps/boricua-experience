---
type: module
path: "@root/src/View/Components/TownGuide.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, towns]
---

# View.Components.TownGuide

> /** @View.Components.TownGuide.Panel — a town's guide: how to get there, when to go, and what it offers */

## Purpose

The "Plan your visit" panel on a town page.

## Interface

### Signatures

```pudu
export fn panel(frame, catalog, town, guide) -> H.Node
```

### Linkage

- **Requires:** [[src/Domain/TownGuide]], [[src/I18n/Dates]], [[src/Utils/Geo]].
- **Consumed by:** [[src/View/Pages/Search]].

## Algorithm

The drive from the main airport (or the ferry note for islands), the driest months, category chips with counts linking to `/pueblo/<town>?category=`, and a twelve-month strip: highs in °F as the island's forecasts read, bars for rainy days relative to the wettest month, the driest months outlined. Each month carries a spoken label; the source sentence names NOAA and the station distance.

## Negative Logic (Prohibited Paths)

- ❌ Nothing renders when the guide is empty, and nothing on continued listing pages.

## Referenced by

[[src/_MOC]]

## Grill Log · #148 — resolved
Only supplied typed database facts render. Empty guides and continuation pages omit the panel. NOAA normals are historical climate, not forecast; rainy-day bars and bilingual spoken month labels retain units and source attribution. Island access remains ferry/flight rather than an invented road. Activity category counts follow the reviewed non-held discovery cutoff contract; missing end does not mean finished at start.
