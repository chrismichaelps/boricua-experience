---
type: module
path: "@root/src/Validation/Check.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: MEDIUM
tags: [module, validation, medium]
---

# Validation.Check

> /** @Validation.Check.Runner — a validator's verdict as a problem */

## Purpose

Runs a validator and turns its failures into `Problem.Invalid`, one field error per field, keyed by the rule's message key.

## Interface

### Signatures

```pudu
export fn run[T](validator: &Validator.Validator[T], value: T) -> Result[T, Problem.Problem]
export fn rule[T, V](field: Str, select: fn(T) -> V, test: fn(V) -> Bool, key: Str) -> Rule.Rule[T]
export fn ruleWith[T, V](field: Str, select: fn(T) -> V, test: fn(T, V) -> Bool, key: Str) -> Rule.Rule[T]
export fn all[T](rules: &Array[Rule.Rule[T]]) -> Validator.Validator[T]
export fn lengthWithin(text: Str, low: Int, high: Int) -> Bool
```

### Linkage

- **Requires:** `pudu-lang-validator`, [[src/Domain/Problem]].
- **Consumed by:** every validation module.

## Algorithm

The rule's code is the translation key; the first failure of a field wins.

## Negative Logic (Prohibited Paths)

- ❌ No translated text here: keys only.

## Edge Cases

- A valid value passes through unchanged.

## Depth

MEDIUM.

## Grill Log

- **Q:** Message per rule or per field?
  **A:** Per field, first failure: a form shows one message under each field.

## Referenced by

[[src/_MOC]]
