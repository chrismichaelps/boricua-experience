---
type: module
path: "@root/src/Validation/MenuForm.pudu"
fidelity: Active
layer: Validation
tags: [module, menus]
---
# Validation.MenuForm
## Purpose
Validate complete editable menu drafts before the owner save RPC.
## Interface
check(draft) returns MenuDocument or Invalid with indexed field paths.
## Algorithm
Accumulate field errors for names, descriptions, enum states, stable IDs, counts and unknown/free/paid prices. Validate decimal USD input before arithmetic so oversized integers cannot overflow. Map blank price to null and explicit0 to zero. Unknown availability/allergens remain nullable. Require a dish for published menus, bound sections/items/document size and refuse duplicate IDs/tag declarations. Database ownership and revision checks remain authoritative.
## Negative Logic
No arbitrary full JSON textarea, inferred allergen safety, silent truncation or network calls. Raw draft remains unchanged on failure.
## Grill Log
Resolved: amount parsing accepts only digits with at most two decimal places. Digit count bounds precede safe conversion, then the USD cents cap is checked. Document bytes include PostgreSQL JSONB's colon/comma separator spaces rather than only compact JSON bytes. Indexed error paths point back to the corresponding nested controls. API validates everything again; frontend validation improves errors but grants no authority.
## Referenced by
[[src/_MOC]] · [[src/Domain/MenuDraft]] · [[src/Services/Menus]]
