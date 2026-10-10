---
type: module
path: "@root/src/Utils/Query.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: SHALLOW
tags: [module, utils, shallow]
---

# Utils.Query

> /** @Utils.Query.String — query strings for links */

## Purpose

Builds a query string from pairs, leaving out empty values.

## Interface

### Signatures

```pudu
export fn render(pairs: &Array[(Str, Str)]) -> Str
```

### Linkage

- **Requires:** `Std.Url`.
- **Consumed by:** [[src/View/Pages/Search]], [[src/View/Components/Search]].

## Algorithm

Encode each non-empty pair and join with `&` behind `?`; empty when nothing remains.

## Negative Logic (Prohibited Paths)

- ❌ Never emits `key=` for an empty value.

## Edge Cases

- No pairs give empty text.

## Depth

SHALLOW.

## Grill Log

- **Q:** Keep empty filters in links?
  **A:** No: canonical search URLs carry only active filters.

## Referenced by

[[src/_MOC]]
