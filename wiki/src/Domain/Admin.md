---
type: module
path: "@root/src/Domain/Admin.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Admin

> /** @Domain.Admin.Moderation — platform metrics and open reports */

## Purpose

The administrator's overview counts and open reports.

## Interface

### Signatures

```pudu
export type Overview, ReportedEvent, Report
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Api/Admin]], [[src/View/Pages/Admin]].

## Algorithm

Derived decoding.

## Negative Logic (Prohibited Paths)

- ❌ Never shown to non-administrators.

## Edge Cases

- Empty report list renders a calm empty state.

## Depth

SHALLOW: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Real-time metrics?
  **A:** Counts per request are enough at this stage; the queries read indexed partial sets.

## Referenced by

[[src/_MOC]]
