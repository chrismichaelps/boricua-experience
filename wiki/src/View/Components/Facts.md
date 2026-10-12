---
type: module
path: "@root/src/View/Components/Facts.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view]
---

# View.Components.Facts

> /** @View.Components.Facts.Profile — a category profile as form controls, fact lists, and card highlights */

## Purpose

Renders any category profile: one control per fact, the stored facts as a definition list, and highlighted facts as short card texts.

## Interface

### Signatures

```pudu
export fn label, choiceLabel, controls, valueText, list, highlightTexts
```

### Linkage

- **Requires:** [[src/Domain/Catalog]], [[src/View/Components/Form]].
- **Consumed by:** [[src/View/Pages/PlaceForm]], [[src/View/Pages/Place]], [[src/View/Components/PlaceCard]].

## Algorithm

Choices and flags show their option label in the visitor's language; toggles show only when on; web addresses become `noopener nofollow` links.

## Negative Logic (Prohibited Paths)

- ❌ Stored text is always `says`, never raw.

## Referenced by

[[src/_MOC]]
