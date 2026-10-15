---
type: module
path: "@root/src/App/Handlers/Places.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: MEDIUM
tags: [module, app]
---

# App.Handlers.Places

> /** @App.Handlers.Places.Registrations — place pages, listings, and publishing */

## Purpose

Registers the place message kinds with the mediator.

## Interface

### Signatures

```pudu
export fn registrations(kinds: &Messages.Kinds, runtime: &Runtime.Runtime) -> Array[Registration.Registration]
```

### Linkage

- **Requires:** [[src/Services/Places]].
- **Consumed by:** [[src/App/Assembly]].

## Algorithm

One handler per kind.

## Negative Logic (Prohibited Paths)

- ❌ No logic beyond delegation.

## Referenced by

[[src/_MOC]]

## Menu reader Grill Log · #69
Resolved: Register menuBoard by delegating to Services.Menus with the viewer session; no handler business rules.

## Owner editor Grill Log · #69
Resolved: Register saveMenu by delegation to Services.Menus.save without business logic.

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

## Complete place pagination Grill Log · #124
Resolved: place listings return a bounded24-item Results page and retain its next cursor. Activity and place cursors remain separate query parameters; progressive links request only their own source, no-script links render a full page. Filters and explicit sort are preserved. Activity-only constraints return an empty place page. Failure to read places is reported rather than silently presented as completeness. Database pages use deterministic score/count/name/id keysets bound to normalized filters and sort, without an offset ceiling. Canonicalize McDonald/Macdonald/apostrophe-s variants and use indexed full-text prefixes for plain partial queries; map uses the same normalization. Never infer missing branches or municipality facts. Invalid or wrong-scope cursors fail before reads. Matching indexes support name/category/town, ranked and spatial/text paths. No table/API grant expansion or private data in source.
