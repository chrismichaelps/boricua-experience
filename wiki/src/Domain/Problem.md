---
type: module
path: "@root/src/Domain/Problem.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: DEEP
tags: [module, domain, deep]
---

# Domain.Problem

> /** @Domain.Problem.Failure — why a use case produced no value */

## Purpose

The single failure type of every service, with its HTTP status, stable code, and message key; field errors for forms.

## Interface

### Signatures

```pudu
export type FieldError = { field: Str, key: Str }
export type Problem = Refused(Str) | SignedOut | Forbidden | Missing | Invalid(Array[FieldError]) | Throttled | Unavailable(Str)
export fn status(problem: &Problem) -> Int
export fn code(problem: &Problem) -> Str
export fn messageKey(problem: &Problem) -> Str
export fn fromApi(reason: Str, httpStatus: Int) -> Problem
export fn fieldErrors(problem: &Problem) -> Array[FieldError]
export fn errorFor(errors: &Array[FieldError], field: Str) -> Option[Str]
```

### Linkage

- **Requires:** [[src/Constants/Codes]].
- **Consumed by:** every service, [[src/Web/Respond]], views showing errors.

## Algorithm

`fromApi` maps 401 to `SignedOut`, 404 to `Missing`, `forbidden` to `Forbidden`, 429 to `Throttled`, 5xx to `Unavailable`, and anything else to `Refused(code)`. Status: refused 409, invalid 422.

## Negative Logic (Prohibited Paths)

- ❌ `Unavailable` detail is for logs only, never shown.

## Edge Cases

- Unknown codes show `problem.generic`.

## Depth

DEEP: one small sum carries every failure from the database to the response.

## Grill Log

- **Q:** One type or one per service?
  **A:** One: the web layer answers every failure the same way. _Rejected:_ per-service sums (each needing its own mapping).
- **Q:** Where do validation errors live?
  **A:** `Invalid` carries field errors so a form re-renders with messages beside its fields.

## Referenced by

[[src/_MOC]]
