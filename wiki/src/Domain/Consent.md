---
type: module
path: "@root/src/Domain/Consent.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Consent

> /** @Domain.Consent.Cookies — a visitor's cookie choice */

## Purpose

Which optional cookie uses a visitor allowed, and the versioned cookie value that remembers it.

## Interface

### Signatures

```pudu
export type Choice = { analytics: Bool, marketing: Bool, version: Str }
export fn encode(choice: &Choice) -> Str
export fn decode(value: Str, version: Str) -> Option[Choice]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/Web/Context]], [[src/Web/Handlers/Privacy]], [[src/View/Components/CookieBanner]].

## Algorithm

`v<version>:analytics,marketing` or `v<version>:necessary`; a different version decodes to nothing so the banner asks again.

## Negative Logic (Prohibited Paths)

- ❌ No optional script runs while the choice is absent.

## Edge Cases

- Unknown entries are ignored.

## Depth

SHALLOW: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Store the choice server-side only?
  **A:** Both: the cookie decides rendering; the ledger records the choice for compliance.

## Referenced by

[[src/_MOC]]
