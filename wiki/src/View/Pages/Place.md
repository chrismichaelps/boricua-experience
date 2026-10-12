---
type: module
path: "@root/src/View/Pages/Place.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view]
---

# View.Pages.Place

> /** @View.Pages.Place.Page — one permanent place: facts of its category, hours, contact, and map */

## Purpose

The place page.

## Interface

### Signatures

```pudu
export fn render, ownerName
```

### Linkage

- **Requires:** [[src/View/Components/Facts]], [[src/View/Components/PlaceCard]].
- **Consumed by:** [[src/Web/Handlers/Places]].

## Algorithm

Hidden places carry an owner notice and are not indexed. Hours list Monday first with closed days. Contact and management sit beside the content.

## Negative Logic (Prohibited Paths)

- ❌ Owner controls never render for other viewers.

## Referenced by

[[src/_MOC]]

## Menu reader Grill Log · #69
Resolved: Accept optional MenuBoard and render a dedicated-menu entry only from database capability/visibility. Existing reviews, contact and owner controls remain intact.
