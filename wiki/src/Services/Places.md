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
