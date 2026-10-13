---
type: module
path: "@root/src/Services/Contact.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services]
---

# Services.Contact

> /** @Services.Contact — Visitor messages recorded, then relayed to the team by email */

## Purpose

Bot defenses run before any write: a filled trap field is accepted silently and dropped; the form carries a stamp (issue time plus an HMAC under the session key) that must be genuine, at least 4 seconds old and at most 2 hours old. The sender is rate-limited by a keyed SHA-256 fingerprint of the network address and day, never the address itself. Accepted messages are recorded, relayed with the sender as reply-to, and marked sent or failed. The team's address lives only in `BORICUA_CONTACT_TO` and never reaches a page.

## Interface

### Signatures

```pudu
export stamp, stampAge, fingerprint, letter, submit
```

### Linkage

- **Consumed by:** [[src/App/Handlers/Site]], [[src/Web/Handlers/Contact]].

## Referenced by

[[src/_MOC]]
