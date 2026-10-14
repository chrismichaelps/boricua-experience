---
type: module
path: "@root/src/Validation/Contact.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: MEDIUM
tags: [module, validation]
---

# Validation.Contact

> /** @Validation.Contact — A contact message checked before it is recorded */

## Purpose

Topic from the offered list, single-line name of 2-80 characters, a plausible single mailbox (no spaces, line breaks, commas, angle brackets or quotes), and a message of 20-3000 characters.

## Interface

### Signatures

```pudu
export mailbox, form
```

### Linkage

- **Consumed by:** [[src/Services/Contact]].

## Referenced by

[[src/_MOC]]
