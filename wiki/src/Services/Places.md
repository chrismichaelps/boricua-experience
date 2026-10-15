---
type: module
path: "@root/src/Services/Places.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services]
---

# Services.Places

> /** @Services.Places.Listings — place pages, listings, publishing, editing, and hiding */

## Purpose

Place pages, landing rails, publishing and editing through the profile validator, and owner status changes.

## Interface

### Signatures

```pudu
export fn detail, listed, publish, editable, update, setStatus, mine, takesPlaces
```

### Linkage

- **Requires:** [[src/Api/Places]], [[src/Validation/PlaceForm]], [[src/Services/Catalog]].
- **Consumed by:** [[src/App/Handlers/Places]].

## Algorithm

Publishing reads the cached catalogue for the profile, validates, then calls the API. `editable` refuses anyone but the owner.

## Negative Logic (Prohibited Paths)

- ❌ A landing never fails because its places could not be read.

## Referenced by

[[src/_MOC]]


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

Reviewed refinement #120: place search preserves anchored nearby coordinates/radius. Camera refresh intentionally removes nearby-origin restrictions and queries its new bounded viewport; dates/category/text/traits remain intact. Anonymous map projection never includes hidden/removed rows. Cross-kind selection identity is distinct.
