---
type: module
path: "@root/src/I18n/En.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.En

> /** @I18n.En.Catalog — English text of every message key */

## Purpose

The English catalogue.

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

A const map folded at compile time.

## Negative Logic (Prohibited Paths)

- ❌ No markup in values.

## Edge Cases

- Missing keys fall back to Spanish.

## Depth

SHALLOW.

## Grill Log

- **Q:** Complete parity with Spanish?
  **A:** Yes; a test compares the key sets.

## Referenced by

[[src/_MOC]]
