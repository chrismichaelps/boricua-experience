---
type: module
path: "@root/src/Api/Mail.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: MEDIUM
tags: [module, api]
---

# Api.Mail

> /** @Api.Mail — Transactional email through the delivery provider's HTTPS API */

## Purpose

Builds a dedicated client only when `BORICUA_RESEND_KEY` is set; `send` posts one plain-text letter with structured fields (no header text is ever composed by hand), strips line breaks from single-line fields, and passes an idempotency key so a retried request never sends twice. The authorization header is redacted from client logs.

## Interface

### Signatures

```pudu
export create, over, body, send
```

### Linkage

- **Consumed by:** [[src/Services/Runtime]], [[src/Services/Contact]].

## Referenced by

[[src/_MOC]]
