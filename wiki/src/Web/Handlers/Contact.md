---
type: module
path: "@root/src/Web/Handlers/Contact.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web]
---

# Web.Handlers.Contact

> /** @Web.Handlers.Contact — The contact form and its relay */

## Purpose

GET renders the form with a fresh stamp; POST passes the origin guard, then the mediator. Refusals re-render with the visitor's values (422 invalid, 409 stamp, 429 rate). Success redirects to `?sent=1`.

## Interface

### Signatures

```pudu
export routes
```

### Linkage

- **Consumed by:** [[src/Web/Router]].

## Referenced by

[[src/_MOC]]
