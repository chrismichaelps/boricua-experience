---
type: module
path: "@root/src/I18n/EsMenu.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow, menus]
---

# I18n.EsMenu

> /** @I18n.EsMenu.Catalog — Spanish text for menu reading and owner editing */

## Purpose

Spanish messages under the `menu.` prefix: reader labels, owner editor fields, structural actions, validation and conflict guidance; counterpart of [[src/I18n/EnMenu]].

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

- ❌ No `menu.` key lives in [[src/I18n/Es]]; lookup takes the first catalogue that holds it.

## Edge Cases

- Parity across languages and coverage of every key the source names are tested; `scripts/message-keys.sh` reads menu keys from the Spanish menu catalogue.

## Depth

SHALLOW.

## Grill Log

- **Q:** Why a separate catalogue?
  **A:** Adding the owner editor labels pushed the interface catalogue past the parser nesting limit (about 512 list entries). Menu text changes together, so it moves as one area, like the account catalogue before it. Resolved.

## Referenced by

[[src/_MOC]] · [[src/I18n/Translate]]

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.


## Source image semantics · #185 — resolved Grill Log
Listing galleries may contain source photographs, event artwork or official identifiers. Use neutral bilingual image labels, without presenting brand artwork as a photograph of a branch. Preserve upload controls and category-illustration fallbacks.

## Review gallery · #191 — resolved Grill Log
The inspected reference pairs a contained image with an independent context column. Render existing visible place reviews on the left at desktop widths, below the image on phones; explicitly title these as reviews of the place, not attributed to the selected photo. Use only published highlights, capped at six regardless of cursor/filter, preserve all ratings and escape content. No data import, fabricated reviews or schema change. Empty reviews show a truthful invitation. Native modal keeps background inert, exact scroll/focus restoration and Escape; thumbnails, arrows, keyboard and touch navigation keep the selected image/count/current thumbnail synchronized. Single-photo controls hide, links retain no-script/modifier behavior. Large photos stay uncropped; no autofocus moves on image changes. Review links close before navigating to their existing full-review anchor.
