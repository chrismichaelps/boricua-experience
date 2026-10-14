---
type: module
path: "@root/src/Api/Contact.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: MEDIUM
tags: [module, api]
---

# Api.Contact

> /** @Api.Contact — Recording contact messages and their delivery */

## Purpose

Calls the service-only `submit_contact` (rate windows: 3 per sender per hour, 10 per day, 400 site-wide per day) and `mark_contact` through `Gateway.queryAsService`.

## Interface

### Signatures

```pudu
export submit, mark
```

### Linkage

- **Consumed by:** [[src/Services/Contact]].

## Referenced by

[[src/_MOC]]
