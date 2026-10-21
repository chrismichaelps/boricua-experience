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
export type Area; export const NO_AREA
export fn render, renderWith, ownerName
```

### Linkage

- **Requires:** [[src/View/Components/Facts]], [[src/View/Components/PlaceCard]].
- **Consumed by:** [[src/Web/Handlers/Places]].

## Algorithm

`renderWith` adds the surroundings: a top-ten town rank in the heading ("#N of places in <town>") and "The area", up to four upcoming activities and six of the best places nearby, never the place itself, with its own section tab.

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

## Review gallery · #191 — resolved Grill Log
The inspected reference pairs a contained image with an independent context column. Render existing visible place reviews on the left at desktop widths, below the image on phones; explicitly title these as reviews of the place, not attributed to the selected photo. Use only published highlights, capped at six regardless of cursor/filter, preserve all ratings and escape content. No data import, fabricated reviews or schema change. Empty reviews show a truthful invitation. Native modal keeps background inert, exact scroll/focus restoration and Escape; thumbnails, arrows, keyboard and touch navigation keep the selected image/count/current thumbnail synchronized. Single-photo controls hide, links retain no-script/modifier behavior. Large photos stay uncropped; no autofocus moves on image changes. Review links close before navigating to their existing full-review anchor.
