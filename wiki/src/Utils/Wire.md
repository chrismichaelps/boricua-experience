---
type: module
path: "@root/src/Utils/Wire.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: SHALLOW
tags: [module, utils, shallow]
---

# Utils.Wire

> /** @Utils.Wire.Decoding — JSON read into a type chosen by the caller */

## Purpose

Decodes JSON into whichever `Json.Decode` type the caller's annotation names; the one generic seam between raw answers and typed values.

## Interface

### Signatures

```pudu
export fn decode[T: Json.Decode](json: &Json.Json) -> Result[T, Json.DecodeError]
export fn parse[T: Json.Decode](text: Str) -> Result[T, Str]
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Api/Supabase/Gateway]], tests.

## Algorithm

Call the type's derived `decode`; `parse` decodes text first and explains either failure.

## Negative Logic (Prohibited Paths)

- ❌ No fallback values: a shape mismatch is a failure.

## Edge Cases

- `null` decodes to `None` for optional fields.

## Depth

SHALLOW: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Why a helper at all?
  **A:** A type's `decode` cannot be reached through a module path from another module; a generic function chosen by the annotation can.

## Referenced by

[[src/_MOC]]
