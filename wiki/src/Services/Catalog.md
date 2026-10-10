---
type: module
path: "@root/src/Services/Catalog.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services, medium]
---

# Services.Catalog

> /** @Services.Catalog.Reference — categories and municipalities, cached per instance */

## Purpose

Categories, municipalities and featured scenes, read at most once per ten minutes per instance.

## Interface

### Signatures

```pudu
export fn current(runtime) -> Result[Catalog.Catalog, Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Catalog]], `Std.Sync`.
- **Consumed by:** views via handlers, [[src/Services/Seo]].

## Algorithm

A cell holds (loaded at, catalogue); stale or empty reloads all three lists.

## Negative Logic (Prohibited Paths)

- ❌ No cache across instances; the CDN covers that.

## Edge Cases

- Concurrent first loads may both read; the last write wins harmlessly.

## Depth

MEDIUM: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Cache upcoming counts that long?
  **A:** Yes: they decorate chips; ten minutes of lag is invisible.

## Referenced by

[[src/_MOC]]

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** Cache categories, municipalities and featured scenes together. No embedded business-data fallback on a failed database read. Resolved.
