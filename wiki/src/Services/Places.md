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

- ❌ A place read failure is reported rather than silently presented as a complete listing.

## Referenced by

[[src/_MOC]]


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

Reviewed refinement #120: place search preserves anchored nearby coordinates/radius. Camera refresh intentionally removes nearby-origin restrictions and queries its new bounded viewport; dates/category/text/traits remain intact. Anonymous map projection never includes hidden/removed rows. Cross-kind selection identity is distinct.

## Complete place pagination Grill Log · #124
Resolved: place listings return a bounded24-item Results page and retain its next cursor. Activity and place cursors remain separate query parameters; progressive links request only their own source, no-script links render a full page. Filters and explicit sort are preserved. Activity-only constraints return an empty place page. Failure to read places is reported rather than silently presented as completeness. Database pages use deterministic score/count/name/id keysets bound to normalized filters and sort, without an offset ceiling. Canonicalize McDonald/Macdonald/apostrophe-s variants and use indexed full-text prefixes for plain partial queries; map uses the same normalization. Never infer missing branches or municipality facts. Invalid or wrong-scope cursors fail before reads. Matching indexes support name/category/town, ranked and spatial/text paths. No table/API grant expansion or private data in source.
