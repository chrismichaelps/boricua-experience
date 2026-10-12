---
type: module
path: "@root/src/Web/Handlers/Places.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web]
---

# Web.Handlers.Places

> /** @Web.Handlers.Places.Routes — place pages, the publishing chooser, publishing, editing, and hiding */

## Purpose

Routes `/lugar/:slug`, `/lugar/:slug/edit`, `/lugar/:slug/status`, `/create/place`, and the `/create` chooser.

## Interface

### Signatures

```pudu
export fn draftOf, routes, chooser
```

### Linkage

- **Requires:** [[src/App/Messages]], [[src/View/Pages/Place]], [[src/View/Pages/PlaceForm]].
- **Consumed by:** [[src/Web/Router]], [[src/Web/Handlers/Events]].

## Algorithm

`draftOf` keeps `d.` and `h.` fields only. A category switch carries shared fields in the query. A category that takes no places sends the visitor back to the chooser.

## Negative Logic (Prohibited Paths)

- ❌ Members only for every form and action.

## Referenced by

[[src/_MOC]]
