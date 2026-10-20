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

The place page also reads its town's best-ordered places (to find its rank, announced only among at least five) and the best places and next activities within 8 km. Each read is optional and falls back to empty (#150).

`draftOf` keeps `d.` and `h.` fields only. A category switch carries shared fields in the query. A category that takes no places sends the visitor back to the chooser.

## Negative Logic (Prohibited Paths)

- ❌ Members only for every form and action.

## Referenced by

[[src/_MOC]]

## Menu reader Grill Log · #69
Resolved: Load the optional database menu board for the parent page. On dependency failure retain the place without fabricating an empty menu; render a reader link only when supported or owner menus remain.

## Place discovery Grill Log · #132
Resolved: Empty degraded review boards default highlights to empty; public details remain readable when optional review/media requests fail.

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
