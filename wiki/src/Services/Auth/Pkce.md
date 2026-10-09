---
type: module
path: "@root/src/Services/Auth/Pkce.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: SHALLOW
tags: [module, services, shallow]
---

# Services.Auth.Pkce

> /** @Services.Auth.Pkce.Proof — verifiers and challenges for redirect sign-ins */

## Purpose

PKCE verifiers (32 random bytes, base64url), their S256 challenges, and random tokens for visitors and form keys.

## Interface

### Signatures

```pudu
export fn newVerifier() -> Option[Str]
export fn challenge(verifier: Str) -> Str
export fn token(bytes: Int) -> Option[Str]
```

### Linkage

- **Requires:** `Std.Random`, `Std.Crypto`, `Std.Bytes`.
- **Consumed by:** [[src/Services/Auth/Accounts]], [[src/Services/Auth/Sessions]], [[src/Web/Context]].

## Algorithm

challenge = base64url(SHA-256(verifier)) without padding.

## Negative Logic (Prohibited Paths)

- ❌ No fallback to a weak random source.

## Edge Cases

- Without system randomness the flow fails as unavailable.

## Depth

SHALLOW: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Plain or S256?
  **A:** S256 only.

## Referenced by

[[src/_MOC]]
