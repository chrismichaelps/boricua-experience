---
type: module
path: "@root/src/Validation/Participation.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: SHALLOW
tags: [module, validation, shallow]
---

# Validation.Participation

> /** @Validation.Participation.Messages — join messages, decisions, and reports checked */

## Purpose

Message and note lengths, report reasons, and reaction values.

## Interface

### Signatures

```pudu
export type Report = { reason: Str, detail: Str }
export fn message(text: Str) -> Result[Str, Problem.Problem]
export fn report(form: &Report) -> Result[Report, Problem.Problem]
export fn reaction(value: Int) -> Result[Int, Problem.Problem]
```

### Linkage

- **Requires:** [[src/Validation/Check]], [[src/Domain/Participation]].
- **Consumed by:** [[src/Services/Participation]].

## Algorithm

Bounds from [[src/Constants/Limits]]; reasons from the domain list.

## Negative Logic (Prohibited Paths)

- ❌ No content filtering beyond length.

## Edge Cases

- An empty message is allowed.

## Depth

SHALLOW.

## Grill Log

- **Q:** Filter words?
  **A:** Not at this stage; reports and moderation handle abuse.

## Referenced by

[[src/_MOC]]
