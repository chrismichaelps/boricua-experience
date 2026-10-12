---
type: module
path: "@root/src/App/Handlers/Places.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: MEDIUM
tags: [module, app]
---

# App.Handlers.Places

> /** @App.Handlers.Places.Registrations — place pages, listings, and publishing */

## Purpose

Registers the place message kinds with the mediator.

## Interface

### Signatures

```pudu
export fn registrations(kinds: &Messages.Kinds, runtime: &Runtime.Runtime) -> Array[Registration.Registration]
```

### Linkage

- **Requires:** [[src/Services/Places]].
- **Consumed by:** [[src/App/Assembly]].

## Algorithm

One handler per kind.

## Negative Logic (Prohibited Paths)

- ❌ No logic beyond delegation.

## Referenced by

[[src/_MOC]]

## Menu reader Grill Log · #69
Resolved: Register menuBoard by delegating to Services.Menus with the viewer session; no handler business rules.
