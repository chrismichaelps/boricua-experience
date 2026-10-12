---
type: module
path: "@root/src/Services/Reviews.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services]
---

# Services.Reviews

> /** @Services.Reviews.Opinions — reading, writing, answering, reporting, and moderating reviews */

## Purpose

Validates and forwards review actions.

## Interface

### Signatures

```pudu
export fn board, save, delete, respond, report, resolve
```

### Linkage

- **Requires:** [[src/Api/Reviews]], [[src/Validation/ReviewForm]].
- **Consumed by:** [[src/App/Handlers/Places]].

## Algorithm

Report reasons are checked against `Review.REASONS` before the call.

## Negative Logic (Prohibited Paths)

- ❌ Moderation is refused by the database for anyone but an administrator.

## Referenced by

[[src/_MOC]]
