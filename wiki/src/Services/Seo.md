---
type: module
path: "@root/src/Services/Seo.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services, medium]
---

# Services.Seo

> /** @Services.Seo.Index — what the sitemap lists */

## Purpose

Fixed pages, every category and municipality page, and public events (upcoming and the last 90 days).

## Interface

### Signatures

```pudu
export type Entry = { path: Str, updatedAt: Str, priority: Str }
export fn entries(runtime) -> Result[Array[Entry], Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Events]], [[src/Services/Catalog]].
- **Consumed by:** [[src/App/Handlers/Seo]].

## Algorithm

Concatenate fixed, reference, and event entries.

## Negative Logic (Prohibited Paths)

- ❌ No unlisted or private events.

## Edge Cases

- Up to 20,000 events; a sitemap index is the next step past that.

## Depth

MEDIUM: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Generate at build time?
  **A:** No: events change hourly; the sitemap is served dynamically and cached an hour at the CDN.

## Referenced by

[[src/_MOC]]
