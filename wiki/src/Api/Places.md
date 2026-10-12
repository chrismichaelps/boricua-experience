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
