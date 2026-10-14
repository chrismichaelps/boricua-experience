---
type: module
path: "@root/src/Web/Handlers/Participation.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web, medium]
---

# Web.Handlers.Participation

> /** @Web.Handlers.Participation.Routes — joining, deciding, saving, reacting, reporting, activity */

## Purpose

Routes for joining, deciding, saving, reacting, reporting, activity: `/e/:slug/join|withdraw|save|react|report`, `/e/:slug/requests`, `/requests/:id/decide`, `/activity`.

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

- Toggles answer JSON to scripts and redirect plain forms; a refused join re-renders the event page with the reason in the join panel.

## Depth

MEDIUM.

## Grill Log

- **Q:** Post-redirect-get?
  **A:** Yes for every successful form, with a one-time flash message; refused forms re-render in place.

## Referenced by

[[src/_MOC]]

## Formatting baseline Grill Log · #88
Resolved: pinned0.1.3 formatting only; preserve imports, literals, control flow, authorization and output. Validate the token-preserving diff independently before commit.
