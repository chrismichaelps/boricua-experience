---
type: module
path: "@root/src/I18n/Es.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.Es

> /** @I18n.Es.Catalog — Spanish text of every message key */

## Purpose

The Spanish catalogue: every user-facing string by key.

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

- Keys missing here render as themselves.

## Depth

SHALLOW.

## Grill Log

- **Q:** One file or many?
  **A:** One per language: a translator reads a single table.

## Referenced by

[[src/_MOC]]
