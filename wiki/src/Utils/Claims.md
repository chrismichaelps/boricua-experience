---
type: module
path: "@root/src/Utils/Claims.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: MEDIUM
tags: [module, utils, medium]
---

# Utils.Claims

> /** @Utils.Claims.Token — the readable part of an access token */

## Purpose

Reads the subject, email, expiry, issue time, and provider from an access token's payload.

## Interface

### Signatures

```pudu
export type Claims = { subject: Str, email: Str, expiresAt: Int, issuedAt: Int, provider: Str }
export fn read(token: Str) -> Option[Claims]
```

### Linkage

- **Requires:** `Std.Bytes`, `Std.Json`.
- **Consumed by:** [[src/Services/Auth/Sessions]].

## Algorithm

Split on `.`, base64url-decode the middle part, parse JSON, read `sub`, `exp`, `email`, `iat`, and `app_metadata.provider`.

## Negative Logic (Prohibited Paths)

- ❌ Never treats a decoded token as proof of identity: the database verifies every token it is handed.

## Edge Cases

- A token without three parts, `sub`, or `exp` has no claims.

## Depth

MEDIUM.

## Grill Log

- **Q:** Verify the signature here?
  **A:** No: the project signs with asymmetric keys and the database verifies on every call; the server only needs expiry for refresh timing. _Rejected:_ fetching signing keys per instance.

## Referenced by

[[src/_MOC]]
