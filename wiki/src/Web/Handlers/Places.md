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

## Menu reader Grill Log · #69
Resolved: Load the optional database menu board for the parent page. On dependency failure retain the place without fabricating an empty menu; render a reader link only when supported or owner menus remain.

## Place discovery Grill Log · #132
Resolved: Empty degraded review boards default highlights to empty; public details remain readable when optional review/media requests fail.
