---
type: module
path: "@root/src/Validation/Account.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: MEDIUM
tags: [module, validation, medium]
---

# Validation.Account

> /** @Validation.Account.Identity — identity and profile forms checked */

## Purpose

Sign-up, sign-in, recovery address, new password, onboarding, profile, and preferences.

## Interface

### Signatures

```pudu
export fn isEmail(text: Str) -> Bool
export fn signUp, signIn, email, newPassword, onboarding, profile, preferences
```

### Linkage

- **Requires:** [[src/Validation/Check]], [[src/Domain/Credentials]], [[src/Domain/Profile]].
- **Consumed by:** [[src/Services/Auth/Accounts]], [[src/Services/Account]].

## Algorithm

Email: one `@`, a dotted domain, no spaces, at most 254 characters. Passwords 8–72 characters. Every confirmation must be ticked.

## Negative Logic (Prohibited Paths)

- ❌ No password strength meter: the provider enforces its own policy and answers `weak_password`.

## Edge Cases

- A recovery request for an unknown address still answers success upstream.

## Depth

MEDIUM.

## Grill Log

- **Q:** Full RFC email grammar?
  **A:** No: the provider confirms by sending mail; this only catches typos.

## Referenced by

[[src/_MOC]]
