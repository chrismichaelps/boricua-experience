---
type: module
path: "@root/src/Api/Supabase/Identity.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: DEEP
tags: [module, api, deep]
---

# Api.Supabase.Identity

> /** @Api.Supabase.Identity.Critical — sign-up, sign-in, tokens, recovery, and deletion */

## Purpose

The identity provider: email sign-up with confirmations, password sign-in, refresh, PKCE code exchange, recovery, password change, sign-out, the external-provider address, and deletion with the service key. Adapter of [[seams/IdentityProvider]].

## Interface

### Signatures

```pudu
export type SignedUp = Ready(Session.Tokens) | AwaitingEmail
export fn signUp(gateway, form: &Credentials.SignUp, locale: Str, redirectTo: Str, challenge: Str) -> Result[SignedUp, Problem.Problem]
export fn passwordGrant(gateway, email: Str, password: Str) -> Result[Session.Tokens, Problem.Problem]
export fn refresh(gateway, refreshToken: Str) -> Result[Session.Tokens, Problem.Problem]
export fn exchangeCode(gateway, code: Str, verifier: Str) -> Result[Session.Tokens, Problem.Problem]
export fn recover(gateway, email: Str, redirectTo: Str, challenge: Str) -> Result[(), Problem.Problem]
export fn changePassword(gateway, token: Str, password: Str) -> Result[(), Problem.Problem]
export fn signOut(gateway, token: Str) -> Result[(), Problem.Problem]
export fn authorizeUrl(gateway, provider: Str, redirectTo: Str, challenge: Str) -> Str
export fn deleteUser(gateway, userId: Str) -> Result[(), Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Constants/Supabase]], [[src/Constants/Codes]], [[src/Domain/Credentials]], [[src/Domain/Session]].
- **Consumed by:** [[src/Services/Auth/Accounts]], [[src/Services/Auth/Sessions]], [[src/Services/Privacy]].

## Algorithm

Requests go to `auth/v1/*` with the project key. Sign-up sends the name, locale, age confirmation, and policy versions as user metadata, which the database's sign-up trigger records as consent. Provider failure codes are translated through a const table into the app's codes; rate limits become `Throttled`.

## Negative Logic (Prohibited Paths)

- ❌ The service key is used only by `deleteUser`.
- ❌ Passwords are never logged or echoed.

## Edge Cases

- A sign-up answer without tokens means the account waits for its email link.
- A reused refresh token inside the provider's reuse window still refreshes.

## Depth

DEEP: one typed function per database function; the argument names and decoding stay here.

## Grill Log

- **Q:** Implicit or PKCE flow?
  **A:** PKCE for every redirect: the code is useless without the verifier, which lives only in a sealed cookie. _Rejected:_ implicit tokens in a URL fragment (the server never sees them).
- **Q:** Verify email before sign-in?
  **A:** The project's setting decides; `email_not_confirmed` is shown with a resend hint.

## Referenced by

[[src/_MOC]]
