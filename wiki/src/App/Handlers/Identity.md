---
type: module
path: "@root/src/App/Handlers/Identity.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: SHALLOW
tags: [module, app, shallow]
---

# App.Handlers.Identity

> /** @App.Handlers.Identity.Registrations — signing up, in, out, and recovering */

## Purpose

Registers one mediator handler per kind of signing up, in, out, and recovering; each lifts a service result into the mediator's outcome.

## Interface

### Signatures

```pudu
export fn registrations(kinds: &Messages.Kinds, runtime: &Runtime.Runtime) -> Array[Registration.Registration]
```

### Linkage

- **Requires:** `pudu-lang-mediator`, [[src/App/Messages]], [[src/Services/Auth/Accounts]].
- **Consumed by:** [[src/App/Assembly]].

## Algorithm

For each of signIn, signUp, provider, callback, recover, changePassword, signOut: `Registration.handler(&kinds.<kind>, |message, context| Messaging.lift(Service.call(...)))`.

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
