---
type: module
path: "@root/src/Domain/Menu.pudu"
fidelity: Active
layer: Domain
tags: [module, menus]
---
# Domain.Menu

## Purpose
Typed menu projections and complete owner-save documents matching [[src/Database/Menus]].

## Interface
MenuBoard, MenuListing, MenuSection, MenuItem; MenuDocument, MenuSectionDraft and MenuItemDraft. Projections decode database JSON; documents encode only accepted save keys.

## Algorithm
Nullable cents, availability and allergen declarations remain nullable. Stable optional child IDs support existing edits and new rows. Revision belongs to the listing and is passed separately for conditional saves.

## Negative Logic
No inferred price, dietary fact, availability or document extraction. Reader projections cannot be posted as write documents because they contain server-owned fields.

## Edge Cases
Unknown/free/paid prices, empty drafts, nullable allergens and missing required projection fields.

## Grill Log
Resolved: separate write types prevent accidentally round-tripping server-owned revision/timestamps into strict save JSON. Availability and allergen unknown states survive typed decoding and encoding. All authorization, limits and revision arbitration remain authoritative in the database.

## Referenced by
[[src/_MOC]] · [[src/Api/Menus]]
