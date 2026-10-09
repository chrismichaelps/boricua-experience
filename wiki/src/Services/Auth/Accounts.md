---
type: module
path: "@root/src/Services/Auth/Accounts.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: DEEP
tags: [module, services, deep]
---

# Services.Auth.Accounts

> /** @Services.Auth.Accounts.Identity — signing up, in, and out, and proving it is you */

## Purpose

Identity use cases: sign-up with confirmations (signed in at once or after the email link), password sign-in, provider sign-in through PKCE, finishing a redirect, recovery, password change, sign-out, and confirming presence before deletion.

## Interface

### Signatures

```pudu
export type Joined = SignedIn(Session.Session) | CheckEmail(Session.Flow)
export fn safeReturn(path: Str) -> Str
export fn signIn, signUp, startProvider, finish, recover, changePassword, signOut, confirm
```

### Linkage

- **Requires:** [[src/Api/Supabase/Identity]], [[src/Api/Account]], [[src/Validation/Account]], [[src/Services/Auth/Sessions]], [[src/Services/Auth/Pkce]].
- **Consumed by:** [[src/App/Handlers/Identity]].

## Algorithm

Every redirect flow returns to `/auth/callback` with a code; the verifier waits in a sealed cookie. Signing in reactivates a paused account. Deletion requires the password for email accounts and a sign-in within ten minutes for Google accounts.

## Negative Logic (Prohibited Paths)

- ❌ Never follows a return path off the site (`safeReturn`).
- ❌ Never reveals whether an address has an account.

## Edge Cases

- A recovery request for an unknown address answers success.

## Depth

DEEP: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Reactivate on sign-in automatically?
  **A:** Yes: the product promise is that signing in brings a paused account back; the action is idempotent.

## Referenced by

[[src/_MOC]]
