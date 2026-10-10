---
type: module
path: "@root/src/Web/Handlers/Events.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web, medium]
---

# Web.Handlers.Events

> /** @Web.Handlers.Events.Routes — event pages, calendar files, publishing, editing, cancelling */

## Purpose

Routes for event pages, calendar files, publishing, editing, cancelling: `/e/:slug`, `/e/:slug/calendar.ics`, `/create`, `/e/:slug/edit`, `/e/:slug/cancel`.

## Interface

### Signatures

```pudu
export fn routes(app: &Assembly.App) -> Array[Route.Route]
```

### Linkage

- **Requires:** [[src/Web/Serve]], [[src/Web/Context]], [[src/Web/Respond]], [[src/App/Messages]], and the pages it renders.
- **Consumed by:** [[src/Web/Router]].

## Algorithm

Read the request, send one message through the mediator, render the outcome or answer the problem.

## Negative Logic (Prohibited Paths)

- ❌ No direct API or service calls: everything goes through the mediator.
- ❌ No unguarded state change.

## Edge Cases

- A refused publishing form re-renders with every field error and what was typed.

## Depth

MEDIUM.

## Grill Log

- **Q:** Post-redirect-get?
  **A:** Yes for every successful form, with a one-time flash message; refused forms re-render in place.

## Referenced by

[[src/_MOC]]
