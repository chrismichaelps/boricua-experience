---
type: module
path: "@root/src/Domain/Contact.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain]
---

# Domain.Contact

> /** @Domain.Contact — A message from a visitor to the team */

## Purpose

The posted form, the database receipt, and the offered topics.

## Interface

### Signatures

```pudu
export Form, Receipt, TOPICS, empty
```

### Linkage

- **Consumed by:** [[src/Validation/Contact]], [[src/Services/Contact]], [[src/View/Pages/Contact]].

## Referenced by

[[src/_MOC]]
