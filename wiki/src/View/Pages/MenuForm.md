---
type: module
path: "@root/src/View/Pages/MenuForm.pudu"
fidelity: Active
tags: [module, menus]
---
# View.Pages.MenuForm
## Purpose
Render owner-only structured menu editing with native fields, indexed errors and explicit section/dish add/remove/reorder buttons. Keep stable IDs and expected revision hidden, unknown facts distinct from free/false/empty declarations. Never automatically replace the submitted revision after conflict. All structural actions work without scripts and retain unfinished input.
## Interface
```pudu
export fn render(frame: &Frame.Frame, detail: &Place.Detail, editing: &Draft.MenuEditing, problem: &Option[Problem.Problem], conflict: Bool) -> Html.Html
```
Fields are `name`, `description`, `locale`, `status`, `menuId`, `revision`, `sections`, `s.N.{id,name,items}` and `s.N.i.M.{id,name,description,price,priceNote,available,allergensKnown}` plus `s.N.i.M.diet.<tag>` / `s.N.i.M.allergen.<tag>` checkboxes. The `do` submit value is `save` or a command from [[src/Constants/Menus]] carrying `:section[:dish]`.
## Algorithm
Apply the established menu limits and viewer/owner contract; retain submitted values on refusal.
## Negative Logic
No fake business data, authorization bypass, implicit overwrite, write retries or JSON textarea.
## Grill Log
Resolved: Render owner-only structured menu editing with native fields, indexed errors and explicit section/dish add/remove/reorder buttons. Keep stable IDs and expected revision hidden, unknown facts distinct from free/false/empty declarations. Never automatically replace the submitted revision after conflict. All structural actions work without scripts and retain unfinished input.
## Referenced by
[[src/_MOC]]
