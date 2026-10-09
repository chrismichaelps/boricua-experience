---
type: module
path: "@root/src/Domain/Catalog.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Catalog

> /** @Domain.Catalog.Reference — categories and municipalities */

## Purpose

Category and municipality reference values and lookups by slug.

## Interface

### Signatures

```pudu
export type Category = { slug, nameEs, nameEn, icon, upcoming }
export type Municipality = { slug, name, region, lat, lng }
export type Catalog = { categories: Array[Category], municipalities: Array[Municipality] }
export fn category(catalog: &Catalog, slug: Str) -> Option[Category]
export fn municipality(catalog: &Catalog, slug: Str) -> Option[Municipality]
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Services/Catalog]], views, validation.

## Algorithm

Linear lookups over 16 and 78 entries.

## Negative Logic (Prohibited Paths)

- ❌ Never hard-codes a slug: the database owns the lists.

## Edge Cases

- An unknown slug answers nothing.

## Depth

SHALLOW: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** A map keyed by slug?
  **A:** Lists keep display order; 78 comparisons are negligible per request.

## Referenced by

[[src/_MOC]]
