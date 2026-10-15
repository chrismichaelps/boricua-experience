---
type: module
path: "@root/src/Api/Places.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: MEDIUM
tags: [module, api]
---

# Api.Places

> /** @Api.Places.Client — permanent places: search, pages, publishing, and status */

## Purpose

HTTPS calls to the place functions of the database API.

## Interface

### Signatures

```pudu
export fn search, detail, mine, create, update, setStatus
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]].
- **Consumed by:** [[src/Services/Places]].

## Algorithm

Typed arguments in, decoded projections out; failures map to `Problem` in the gateway.

## Negative Logic (Prohibited Paths)

- ❌ No business rule is decided here.

## Referenced by

[[src/_MOC]]


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.
