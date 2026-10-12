---
type: module
path: "@root/src/Domain/Review.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain]
---

# Domain.Review

> /** @Domain.Review.Opinions — reviews of places, their summary, and what a reviewer writes */

## Purpose

Review projections, the board a place page reads (summary, breakdown, page, the viewer's own review), the form draft, and moderation projections.

## Interface

### Signatures

```pudu
export fn countOf, draftOf, blank
export const REASONS
```

### Linkage

- **Requires:** [[src/Domain/Place]].
- **Consumed by:** [[src/Validation/ReviewForm]], [[src/View/Components/Reviews]].

## Algorithm

Type names are unique across domain modules so derived decoders do not collide.

## Negative Logic (Prohibited Paths)

- ❌ No rating arithmetic: averages and counts come from the database.

## Referenced by

[[src/_MOC]]
