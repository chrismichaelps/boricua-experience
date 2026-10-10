---
type: module
path: "@root/src/Domain/Search.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain, medium]
---

# Domain.Search

> /** @Domain.Search.Filters — what a visitor asked a listing for */

## Purpose

Search filters, sort, and date windows with their wire names.

## Interface

### Signatures

```pudu
export type Sort = Soon | Near | Relevant
export type When = Anytime | Today | Tomorrow | Weekend | Week | Month
export type Filters = { query, category, municipality, window, freeOnly, maxPriceCents, lat, lng, radiusM, sort, after }
export fn everything() -> Filters
export fn sortName/sortFrom, windowName/windowFrom
export const WINDOWS: Array[When]
export fn isNarrowed(filters: &Filters) -> Bool
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/Services/Discovery]], [[src/Web/Handlers/Discover]], [[src/View/Components/Search]].

## Algorithm

Unknown wire names fall back to `Soon` and `Anytime`.

## Negative Logic (Prohibited Paths)

- ❌ Date arithmetic is not here: [[src/Services/Discovery]] turns a window into instants.

## Edge Cases

- Text queries switch the sort to `Relevant` only when asked.

## Depth

MEDIUM: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Free-form dates?
  **A:** Presets cover how people plan outings; they keep URLs short and cacheable.

## Referenced by

[[src/_MOC]]

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Add typed optional viewport bounds to the existing filters; other discovery flows default to None. Bounds are validated before dispatch. Resolved.

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.
