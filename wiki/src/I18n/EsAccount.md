---
type: module
path: "@root/src/I18n/EsAccount.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.EsAccount

> /** @I18n.EsAccount.Catalog — Spanish text for sign-in, the account, forms, problems, notices, and the inbox */

## Purpose

Spanish messages under the `account.`, `auth.`, `form.`, `problem.`, `flash.`, `notifications.`, `notification.`, `cookies.`, and `admin.` prefixes; counterpart of [[src/I18n/EnAccount]].

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

- ❌ No key lives in both this catalogue and [[src/I18n/Es]]; lookup takes the first catalogue that holds it.

## Edge Cases

- Parity across languages and coverage of every key the source names are tested.

## Depth

SHALLOW.

## Grill Log

- **Q:** Why a separate catalogue?
  **A:** The interface catalogue reached the compiler's parser nesting limit as one list literal of about 510 entries. Splitting by area keeps each literal well under it and groups the account and notice text that changes together. Resolved.

## Referenced by

[[src/_MOC]] · [[src/I18n/Translate]]
