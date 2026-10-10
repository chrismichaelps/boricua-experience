---
type: module
path: "@root/src/Api/Catalog.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: SHALLOW
tags: [module, api, shallow]
---

# Api.Catalog

> /** @Api.Catalog.Client — categories and municipalities */

## Purpose

Reference lists.

## Interface

### Signatures

```pudu
export fn categories(gateway) -> Result[Array[Catalog.Category], Problem.Problem]
export fn municipalities(gateway) -> Result[Array[Catalog.Municipality], Problem.Problem]
export fn scenes(gateway) -> Result[Array[Catalog.Scene], Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Domain/Catalog]].
- **Consumed by:** [[src/Services/Catalog]].

## Algorithm

Direct mapping.

## Negative Logic (Prohibited Paths)

- ❌ No business rule: authorization and limits are the database's.
- ❌ No logging of arguments or tokens.

## Edge Cases

- Categories carry upcoming counts.

## Depth

SHALLOW: one typed function per database function; the argument names and decoding stay here.

## Grill Log

- **Q:** Cache here?
  **A:** No: [[src/Services/Catalog]] caches; the client stays stateless.

## Referenced by

[[src/_MOC]]

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** featured_destinations() returns at most eight active scenes in database order through the existing typed read gateway. Resolved.
