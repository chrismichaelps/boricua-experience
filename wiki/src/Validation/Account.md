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

## Age gate Grill Log

- **Q:** Why a date of birth instead of an “I am 18” box?
  **A:** A checkbox signals the expected answer. A neutral date field does not, which is the age screen regulators describe. The date is checked once (`Utils.Time.yearsOld` against today in Puerto Rico) and never stored; only the adult confirmation reaches the database. Resolved.
- **Q:** What happens to a minor?
  **A:** Sign-up refuses before anything is sent: the unavailable page, the session ended, and `bx_age` closing sign-up to that browser for a day, so the back button cannot change the answer. Google creates the identity before onboarding, so an under-age onboarding, or any onboarding while `bx_age` is set, deletes that fresh account through `privacy.refuse_minor` before refusing. Resolved.
- **Q:** How is an impossible date told apart from a minor?
  **A:** Two rules on `birthDate`: `birthDateOk` rejects text that is not a real past date after 1900, and `adultOk` passes unreadable dates so only one error shows. `underage` is true only for a real date under `App.MINIMUM_AGE`. Resolved.
