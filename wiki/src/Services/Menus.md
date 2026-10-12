---
type: module
path: "@root/src/Services/Menus.pudu"
fidelity: Active
layer: Services
tags: [module, menus]
---
# Services.Menus
## Purpose
Read menus through the shared runtime gateway and optional viewer session; validate and conditionally save owner drafts.
## Interface
board(runtime, placeId, session) returns MenuBoard or Problem. save(runtime, placeId, draft, expectedRevision, menuId, session) returns the saved MenuListing or Problem.
## Algorithm
Pass the viewer access token only when a session exists. The database determines supported capabilities, visibility and ownership.
## Negative Logic
No category slug assumptions, synthesized menus or secrets in returned values.
## Grill Log
Resolved: capability comes from the database; public reads and owner draft access share a typed projection and existing timeout boundary. A failed menu read does not prevent the parent place page from loading.
## Referenced by
[[src/_MOC]] · [[src/Api/Menus]] · [[src/App/Handlers/Places]]

## Owner save Grill Log
Resolved: save validates MenuEditorDraft into the strict menu document before the non-retrying API write. Expected revision and optional menu ID stay separate; negative revisions are refused. Database ownership, account status, category, quota and stale-edit checks remain authoritative.
