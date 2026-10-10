---
type: module
path: "@root/src/Validation/Avatar.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: SHALLOW
tags: [module, validation, shallow]
---

# Validation.Avatar

> /** @Validation.Avatar.Photo — an uploaded photo checked before it is stored */

## Purpose

Decodes a base64 photo (bare or as a data address), refuses anything over 600 KB, and recognises WebP, JPEG, or PNG by their leading bytes.

## Interface

### Signatures

```pudu
export fn mediaType(image: &Bytes) -> Option[Str]
export fn photo(encoded: Str) -> Result[(Bytes, Str), Problem.Problem]
```

### Linkage

- **Requires:** `Std.Bytes`, [[src/Constants/Limits]], [[src/Domain/Problem]].
- **Consumed by:** [[src/Services/Account]].

## Algorithm

Strip any `data:…;base64,` prefix, decode, check the size limit, then match `RIFF….WEBP`, `FF D8 FF`, or `89 50 4E 47`.

## Negative Logic (Prohibited Paths)

- ❌ Never trusts the declared content type: the bytes decide.
- ❌ Never decodes the image: the browser already resized it; storage serves it as bytes.

## Edge Cases

- Broken base64 and text are `Invalid` on `photo`.
- The size limit applies after decoding.

## Depth

SHALLOW.

## Grill Log

- **Q:** Resize on the server?
  **A:** No: the browser crops to 320 px before upload, so the server only verifies and stores; Pudu has no image codec and the work belongs on the device.
- **Q:** Which formats?
  **A:** WebP first; JPEG where the browser cannot encode WebP; PNG accepted for completeness.

## Referenced by

[[src/_MOC]]
