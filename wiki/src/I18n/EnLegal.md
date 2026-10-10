---
type: module
path: "@root/src/I18n/EnLegal.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.EnLegal

> /** @I18n.EnLegal.Catalog — English text of the policies and the about page */

## Purpose

English counterpart of [[src/I18n/EsLegal]].

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

Const map.

## Negative Logic (Prohibited Paths)

- ❌ Not legal advice.

## Edge Cases

- Parity is tested.

## Depth

SHALLOW.

## Grill Log

- **Q:** Translate legal text literally?
  **A:** Meaning first, kept parallel section by section.

## Referenced by

[[src/_MOC]]
