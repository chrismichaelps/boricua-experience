---
type: module
path: "@root/src/Domain/MenuDraft.pudu"
fidelity: Active
layer: Domain
tags: [module, menus]
---
# Domain.MenuDraft
## Purpose
Raw owner menu input retains invalid prices and unknown declarations independently of typed database documents.
## Interface
MenuEditorDraft, MenuSectionInput and MenuDishInput; blank, emptySection, emptyDish and fromListing.
## Algorithm
Convert listings to editable strings without defaulting null price to zero. Keep stable section/item IDs, nullable availability and allergen declaration state. New drafts have empty names and prices and draft publication status.
## Negative Logic
No invented dishes, price or locale translation; raw input is never sent directly to the database.
## Grill Log
Resolved: separate raw form types preserve invalid submitted text and model unknown/free distinctly. Blank UI values are draft state only, not production seed data. Validation.MenuForm produces the strict owner document.
## Referenced by
[[src/_MOC]] · [[src/Validation/MenuForm]] · [[src/Services/Menus]]
