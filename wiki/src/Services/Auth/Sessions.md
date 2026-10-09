---
type: module
path: "@root/src/Services/Auth/Sessions.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: DEEP
tags: [module, services, deep]
---

# Services.Auth.Sessions

> /** @Services.Auth.Sessions.Lifecycle — sessions started, refreshed, and their forms signed */

## Purpose

Builds sessions from tokens, refreshes them before they expire, and signs and checks the token every form carries.

## Interface

### Signatures

```pudu
export type Fresh = { session: Session.Session, renewed: Bool }
export fn start(tokens: &Session.Tokens) -> Result[Session.Session, Problem.Problem]
export fn ensureFresh(runtime, session: &Session.Session) -> Result[Fresh, Problem.Problem]
export fn formToken(runtime, session: &Session.Session) -> Str
export fn formTokenValid(runtime, session: &Session.Session, given: Str) -> Bool
```

### Linkage

- **Requires:** [[src/Api/Supabase/Identity]], [[src/Utils/Claims]], [[src/Services/Auth/Pkce]].
- **Consumed by:** [[src/Web/Context]], [[src/Services/Auth/Accounts]].

## Algorithm

1. A new session reads subject, email, provider, and expiry from the token and draws a random form key.
2. With 60 seconds or less left, the refresh token buys new tokens; the form key and sign-in time carry over.
3. A refused refresh is `SignedOut`; an unreachable provider is `Unavailable` (the visitor keeps the session and may retry).
4. Form token = base64url(HMAC-SHA256(server key, form key ‖ account id)), compared in constant time.

## Negative Logic (Prohibited Paths)

- ❌ Never logs tokens.
- ❌ Never treats a decoded token as proof of identity.

## Edge Cases

- A refreshed session must be written back to its cookie.

## Depth

DEEP: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Tie form tokens to the refresh token?
  **A:** No: refresh tokens rotate, which would invalidate open forms. The form key lives for the session.

## Referenced by

[[src/_MOC]]
