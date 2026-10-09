---
type: module
path: "@root/src/Domain/Session.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain, medium]
---

# Domain.Session

> /** @Domain.Session.Identity — who is visiting */

## Purpose

The sealed session, the sign-in flow, and the identity provider's tokens.

## Interface

### Signatures

```pudu
export type Session = { accessToken, refreshToken, userId, email, provider, expiresAt, issuedAt }
export type Flow = { verifier, returnTo, purpose }
export type Tokens = { accessToken, refreshToken }
export const SIGN_IN, RECOVERY: Str
export fn usesPassword(session: &Session) -> Bool
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Services/Auth/Sessions]], [[src/Services/Auth/Sealer]], [[src/Web/Context]].

## Algorithm

Derived encoding and decoding for sealing.

## Negative Logic (Prohibited Paths)

- ❌ Never rendered, logged, or sent to a browser unsealed.

## Edge Cases

- Google sessions report provider `google`.

## Depth

MEDIUM: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Keep the email in the session?
  **A:** Yes, for the account page without a round trip; it is sealed like the tokens.

## Referenced by

[[src/_MOC]]
