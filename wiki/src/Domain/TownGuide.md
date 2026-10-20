---
type: module
path: "@root/src/Domain/TownGuide.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow, towns]
---

# Domain.TownGuide

> /** @Domain.TownGuide.Guide — what a visitor checks before going to a town: weather by month, the drive, what is there */

## Purpose

The decoded answer of `public.town_guide`, and the two readings the page needs from it.

## Interface

### Signatures

```pudu
export type ClimateMonth, AirportAccess, ClimateSource, TownCategory, TownGuide
export fn driestMonths(guide: &TownGuide) -> Array[Int]
export fn airportMinutes(guide: &TownGuide) -> Option[Int]
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Api/Catalog]], [[src/Services/Catalog]], [[src/View/Components/TownGuide]], [[src/View/Pages/Search]].

## Algorithm

The three months with the fewest rainy days (cooler first on a tie), shown in calendar order. Minutes round up.

## Negative Logic (Prohibited Paths)

- ❌ No invented prose: every value is a database figure.
- ❌ Decodable type names stay globally unique (no `Month`, `Source`).

## Depth

SHALLOW: typed values and two small readings.

## Referenced by

[[src/_MOC]]
