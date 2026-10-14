---
type: module
path: "@root/src/I18n/EnAccount.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.EnAccount

> /** @I18n.EnAccount.Catalog — English text for sign-in, the account, forms, problems, notices, and the inbox */

## Purpose

English messages under the `account.`, `auth.`, `form.`, `problem.`, `flash.`, `notifications.`, `notification.`, `cookies.`, and `admin.` prefixes; counterpart of [[src/I18n/EsAccount]].

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

Const map.

## Negative Logic (Prohibited Paths)

- ❌ No key lives in both this catalogue and [[src/I18n/En]]; lookup takes the first catalogue that holds it.

## Edge Cases

- Parity across languages and coverage of every key the source names are tested.

## Depth

SHALLOW.

## Grill Log

- **Q:** Why a separate catalogue?
  **A:** The interface catalogue reached the compiler's parser nesting limit as one list literal of about 510 entries. Splitting by area keeps each literal well under it and groups the account and notice text that changes together. Resolved.

## Referenced by

[[src/_MOC]] · [[src/I18n/Translate]]

## Resolved feedback Grill Log · #45
Translate password visibility and local length guidance; keep bilingual key parity. Resolved.

## Descriptive policy link Grill Log · #48
Replace the generic cookie-policy anchor with a descriptive localized label. Destination and consent semantics stay unchanged; no asset/cache change required for server-rendered text. Resolved.

## Expired-request output Grill Log · #51
Resolved: event_ended refusal says requests are closed, without claiming completion of an unknown-end activity. Both locales use neutral wording.

## Renewal
`auth.renew_title`, `auth.renew_lead`, `auth.renew_accept`, `auth.renew_decline`, `flash.terms_renewed`.
