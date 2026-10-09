---
type: module
path: "@root/src/I18n/Format.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: MEDIUM
tags: [module, i18n, medium]
---

# I18n.Format

> /** @I18n.Format.Values — prices, counts, and distances written for a reader */

## Purpose

Price (free or dollars), going counts, seats left, distance, and category names.

## Interface

### Signatures

```pudu
export fn price, going, seats, distance, categoryName
```

### Linkage

- **Requires:** [[src/I18n/Translate]], [[src/Domain/Event]], [[src/Utils/Money]], [[src/Utils/Geo]].
- **Consumed by:** event cards and pages.

## Algorithm

Small compositions of translations with formatted values.

## Negative Logic (Prohibited Paths)

- ❌ No currency other than dollars.

## Edge Cases

- No capacity shows nothing for seats.

## Depth

MEDIUM.

## Grill Log

- **Q:** Show remaining seats always?
  **A:** Only when a capacity exists.

## Referenced by

[[src/_MOC]]
