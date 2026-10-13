---
type: module
path: "@root/src/Web/Handlers/Account.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web, medium]
---

# Web.Handlers.Account

> /** @Web.Handlers.Account.Routes — the account page, profiles, notifications, and onboarding */

## Purpose

Routes for the account page, profiles, notifications, and onboarding: `/account`, `/account/profile|preferences|password`, `/u/:id`, `/notifications`, `/notifications/read`, `/welcome`.

## Interface

### Signatures

```pudu
export fn routes(app: &Assembly.App) -> Array[Route.Route]
```

### Linkage

- **Requires:** [[src/Web/Serve]], [[src/Web/Context]], [[src/Web/Respond]], [[src/App/Messages]], and the pages it renders.
- **Consumed by:** [[src/Web/Router]].

### Photo routes

`POST /account/avatar` reads `{image}` JSON and answers `{avatarUrl}`; `POST /account/avatar/remove` redirects with a flash.

## Algorithm

Read the request, send one message through the mediator, render the outcome or answer the problem.

## Negative Logic (Prohibited Paths)

- ❌ No direct API or service calls: everything goes through the mediator.
- ❌ No unguarded state change.

## Edge Cases

- Saving the profile also switches the language cookie.

## Depth

MEDIUM.

## Grill Log

- **Q:** Post-redirect-get?
  **A:** Yes for every successful form, with a one-time flash message; refused forms re-render in place.

## Referenced by

[[src/_MOC]]

## Inbox and age gate Grill Log

- **Q:** Why is there no “mark all read” route?
  **A:** Opening the inbox marks read everything it shows, as native inboxes do; the button, its route, and its message kind were removed with it. Resolved.
- **Q:** What does onboarding do with a minor's date of birth?
  **A:** It deletes the account Google just created and refuses; see [[src/Validation/Account]]. Resolved.

## Formatting baseline Grill Log · #88
Resolved: pinned0.1.3 formatting only; preserve imports, literals, control flow, authorization and output. Validate the token-preserving diff independently before commit.
