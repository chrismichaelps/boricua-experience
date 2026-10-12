---
type: module
path: "@root/src/Services/Menus.pudu"
fidelity: Active
layer: Services
tags: [module, menus]
---
# Services.Menus
## Purpose
Read menus through the shared runtime gateway and optional viewer session.
## Interface
board(runtime, placeId, session) returns MenuBoard or Problem.
## Algorithm
Pass the viewer access token only when a session exists. The database determines supported capabilities, visibility and ownership.
## Negative Logic
No category slug assumptions, synthesized menus or secrets in returned values.
## Grill Log
Resolved: capability comes from the database; public reads and owner draft access share a typed projection and existing timeout boundary. A failed menu read does not prevent the parent place page from loading.
## Referenced by
[[src/_MOC]] · [[src/Api/Menus]] · [[src/App/Handlers/Places]]
