---
type: module
path: "@root/src/Domain/Index.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Index

> /** @Domain.Index.Sitemap — addresses offered to search engines */

## Purpose

One sitemap entry: path, last change, priority.

## Interface

### Signatures

```pudu
export type Entry = { path: Str, updatedAt: Str, priority: Str }
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/Services/Seo]], [[src/View/Seo]], [[src/App/Messages]].

## Algorithm

Plain record.

## Negative Logic (Prohibited Paths)

- ❌ No absolute addresses: the view prefixes the origin.

## Edge Cases

- Empty `updatedAt` omits `lastmod`.

## Depth

SHALLOW.

## Grill Log

- **Q:** Why a Domain type?
  **A:** Views may not import services; the entry is shared vocabulary.

## Referenced by

[[src/_MOC]]
