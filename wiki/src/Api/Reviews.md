---
type: module
path: "@root/src/Api/Reviews.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: MEDIUM
tags: [module, api]
---

# Api.Reviews

> /** @Api.Reviews.Client — reviews of places, answers, reports, and moderation */

## Purpose

Calls `place_reviews`, `save_review`, `delete_review`, `respond_review`, `report_review`, `admin_review_reports`, `admin_resolve_review`.

## Interface

### Signatures

```pudu
export fn board, save, delete, respond, report, queue, resolve
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]].
- **Consumed by:** [[src/Services/Reviews]], [[src/Services/Admin]].

## Algorithm

Typed arguments in, decoded projections out.

## Negative Logic (Prohibited Paths)

- ❌ No business rule is decided here.

## Referenced by

[[src/_MOC]]
