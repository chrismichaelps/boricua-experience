---
type: module
path: "@root/src/Validation/ReviewForm.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: MEDIUM
tags: [module, validation]
---

# Validation.ReviewForm

> /** @Validation.ReviewForm.Opinion — a review checked before it is sent */

## Purpose

Stars 1–5, 20–2,000 characters, an optional visit month no later than the current Puerto Rico month; owner answers of 2–1,000 characters or empty to clear.

## Interface

### Signatures

```pudu
export fn check, responseOk
```

### Linkage

- **Requires:** [[src/Domain/Review]].
- **Consumed by:** [[src/Services/Reviews]].

## Algorithm

Every refused field is reported at once; the visit is stored as the first of its month.

## Negative Logic (Prohibited Paths)

- ❌ The database repeats every rule for direct API calls.

## Referenced by

[[src/_MOC]]
