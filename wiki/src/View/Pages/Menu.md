---
type: module
path: "@root/src/View/Pages/Menu.pudu"
fidelity: Active
layer: View
tags: [module, menus]
---
# View.Pages.Menu
## Purpose
Dedicated menu reader with place attribution, ordered sections and declared dish facts.
## Interface
render(frame, detail, board) returns Html; link(frame, slug, optional board) returns an optional place-page entry.
## Algorithm
Render database-backed names, descriptions, ordered sections and dishes with escaped text. Use actual cover when present, otherwise a plain branded heading rather than a fabricated food photograph. Jump links have unique stable menu/section IDs. Unknown price and unavailable items have distinct bilingual labels. Draft/archive labels are visible to owners. Empty menus explain that the owner has not published a menu yet.
## Negative Logic
No service calls, fabricated dishes, inferred allergens or invented availability. Uploaded photos/documents and carousel enhancement remain separate required work.
## Grill Log
Resolved: public indexing requires a published parent and at least one published menu; all other menu states use noindex. Optional parent-page menu failures do not claim empty data. Owner-declared dietary/allergen labels are translated without changing underlying facts and include an allergy-contact note.
## Referenced by
[[src/_MOC]] · [[src/Web/Handlers/Menus]] · [[src/View/Pages/Place]]

## Owner editor Grill Log · #69
Resolved: Add owner-only new/edit links bounded by database capability and menu count; old unsupported-category menus may be archived through editing.

## Place media Grill Log · #69
Resolved: The menu header reuses the shared photo header; menu files (photos and PDFs) are listed separately from structured dishes. See [[decisions/ADR-0012-place-media]].
