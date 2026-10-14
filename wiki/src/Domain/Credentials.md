---
type: module
path: "@root/src/Domain/Credentials.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Credentials

> /** @Domain.Credentials.Forms — what identity forms collect */

## Purpose

Sign-up, sign-in, new password, and onboarding form records.

## Interface

### Signatures

```pudu
export type SignUp, SignIn, NewPassword, Onboarding
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/Validation/Account]], [[src/Api/Supabase/Identity]], [[src/Services/Auth/Accounts]].

## Algorithm

Plain records.

## Negative Logic (Prohibited Paths)

- ❌ Never logged.

## Edge Cases

- Checkboxes are booleans.

## Depth

SHALLOW.

## Grill Log

- **Q:** Keep confirmations as booleans?
  **A:** Yes; the versions they accept come from constants.

## Referenced by

[[src/_MOC]]

## Birth date Grill Log

- **Q:** Why does the form carry `birthDate` and not `adult`?
  **A:** The age is computed from the date during validation; a boolean the browser sends could be forged or pre-ticked. Resolved.

## Resolved feedback Grill Log · #45
SignUp carries a required confirmation string; passwords and confirmation remain transient and never logged or stored as plaintext. Resolved.

## Renewal
`Renewal = { terms: Bool, privacy: Bool }` — the two documents an onboarded member accepts again after a new version.
