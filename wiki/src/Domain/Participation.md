---
type: module
path: "@root/src/Domain/Participation.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain, medium]
---

# Domain.Participation

> /** @Domain.Participation.Requests — join requests seen by members and organizers */

## Purpose

A member's own requests, an organizer's queue, and the small states actions answer.

## Interface

### Signatures

```pudu
export type PersonRef, MyRequest, IncomingRequest, JoinOutcome, SavedState, ReactionState
export const PENDING, APPROVED, REJECTED, WITHDRAWN: Str
export const REPORT_REASONS: Array[Str]
```

### Linkage

- **Requires:** [[src/Domain/Event]].
- **Consumed by:** [[src/Api/Participation]], [[src/View/Pages/Activity]], [[src/View/Pages/Manage]].

## Algorithm

Derived decoding only.

## Negative Logic (Prohibited Paths)

- ❌ Statuses are compared with the constants, never literals.

## Edge Cases

- Withdrawn requests are not listed.

## Depth

MEDIUM: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Model status as a sum?
  **A:** Strings with named constants: the set is owned by the database and only compared.

## Referenced by

[[src/_MOC]]
