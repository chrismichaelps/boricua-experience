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

## Place media Grill Log · #69
Resolved: The single cover image became the shared photo header (cover first, then more photos) and owners get a link to photos and menu files. See [[decisions/ADR-0012-place-media]].

## Place discovery Grill Log · #132
Resolved: Title and rating precede the gallery. In-page anchors reach information, location and reviews. Contact stays beside facts; recent review previews and the complete review section span the reading width below. No-photo state is explicitly a category illustration, never a venue photograph.
