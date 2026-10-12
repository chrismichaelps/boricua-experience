---
type: module
path: "@root/src/Web/MenuFields.pudu"
fidelity: Active
tags: [module, menus]
---
# Web.MenuFields
## Purpose
Decode bounded indexed menu form fields into raw drafts. Required section/item counts reject truncation rather than deleting omitted children. Structural add/remove/move actions change only the retained draft; only save invokes the database. Revision and identity remain separate from raw dish values.
## Interface
```pudu
export type Posted = { editing: Draft.MenuEditing, action: Str }
export fn decode(fields: &Map[Str, Str]) -> Result[Posted, Problem.Problem]
export fn apply(draft: &Draft.MenuEditorDraft, action: Str) -> Result[Draft.MenuEditorDraft, Problem.Problem]
```
Fields are `name`, `description`, `locale`, `status`, `menuId`, `revision`, `sections`, `s.N.{id,name,items}` and `s.N.i.M.{id,name,description,price,priceNote,available,allergensKnown}` plus `s.N.i.M.diet.<tag>` / `s.N.i.M.allergen.<tag>` checkboxes. The `do` submit value is `save` or a command from [[src/Constants/Menus]] carrying `:section[:dish]`.
## Algorithm
Apply the established menu limits and viewer/owner contract; retain submitted values on refusal.
## Negative Logic
No fake business data, authorization bypass, implicit overwrite, write retries or JSON textarea.
## Grill Log
Resolved: Decode bounded indexed menu form fields into raw drafts. Required section/item counts reject truncation rather than deleting omitted children. Structural add/remove/move actions change only the retained draft; only save invokes the database. Revision and identity remain separate from raw dish values.
## Referenced by
[[src/_MOC]]
