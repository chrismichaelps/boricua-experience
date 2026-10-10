---
type: module
path: "@root/src/App/Handlers/Account.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: SHALLOW
tags: [module, app, shallow]
---

# App.Handlers.Account

> /** @App.Handlers.Account.Registrations — profile, preferences, onboarding, inbox */

## Purpose

Registers one mediator handler per kind of profile, preferences, onboarding, inbox; each lifts a service result into the mediator's outcome.

## Interface

### Signatures

```pudu
export fn registrations(kinds: &Messages.Kinds, runtime: &Runtime.Runtime) -> Array[Registration.Registration]
```

### Linkage

- **Requires:** `pudu-lang-mediator`, [[src/App/Messages]], [[src/Services/Account]].
- **Consumed by:** [[src/App/Assembly]].

## Algorithm

For each of me, profile, onboard, updateProfile, updatePreferences, notifications, markRead: `Registration.handler(&kinds.<kind>, |message, context| Messaging.lift(Service.call(...)))`.

## Negative Logic (Prohibited Paths)

- ❌ No logic beyond calling the service: validation and rules live below.

## Edge Cases

- A service problem becomes `Raised(problem)`.

## Depth

SHALLOW.

## Grill Log

- **Q:** One registration file per subsystem?
  **A:** Yes: it mirrors the services and keeps assembly a flat concatenation.

## Referenced by

[[src/_MOC]]
