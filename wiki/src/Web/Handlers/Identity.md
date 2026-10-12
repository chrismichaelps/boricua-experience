---
type: module
path: "@root/src/Web/Handlers/Identity.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web, medium]
---

# Web.Handlers.Identity

> /** @Web.Handlers.Identity.Routes — signing in, up, out, with Google, and recovering */

## Purpose

Routes for signing in, up, out, with Google, and recovering: `/signin`, `/signup`, `/auth/google`, `/auth/callback`, `/recover`, `/reset-password`, `/signout`.

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

- The callback opens the sealed flow, exchanges the code, and continues to the flow's return path, or to the new-password page for recovery.

## Depth

MEDIUM.

## Grill Log

- **Q:** Post-redirect-get?
  **A:** Yes for every successful form, with a one-time flash message; refused forms re-render in place.

## Referenced by

[[src/_MOC]]

## Age gate

See [[src/Validation/Account]] for the age gate contract this module takes part in.

## Resolved feedback Grill Log · #45
Read confirmation without trimming or persisting it and pass it through validated signup. Re-render errors without retaining either password. Resolved.
