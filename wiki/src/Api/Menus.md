---
type: module
path: "@root/src/Api/Menus.pudu"
fidelity: Active
layer: Api
tags: [module, menus]
---
# Api.Menus

## Purpose
Typed HTTPS adapter for menu read and complete-document save functions.

## Interface
board(gateway, placeId, token) returns MenuBoard. save(gateway, placeId, document, expectedRevision, menuId, token) returns MenuListing.

## Algorithm
Use the shared gateway and named function constants. Reads use optional viewer authentication; saves require a member access token. Encode only owner-editable document types and keep IDs/revision as separate RPC arguments.

## Negative Logic
No direct table requests, service credentials, retry of writes, authorization shortcuts or price defaults.

## Grill Log
Resolved: Gateway.Read and Gateway.Write preserve established timeout/retry/error behavior. Database permissions and owner checks arbitrate every save; typed projections preserve unknown facts. Application mediation and presentation are subsequent integration work.

## Referenced by
[[src/_MOC]] · [[src/Domain/Menu]] · [[src/Api/Supabase/Gateway]]
