---
type: module
path: "@root/src/App/Handlers/Discover.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: SHALLOW
tags: [module, app, shallow]
---

# App.Handlers.Discover

> /** @App.Handlers.Discover.Registrations — home, search, suggestions, pins, catalogue, and sitemap */

## Purpose

Registers one mediator handler per kind of home, search, suggestions, pins, catalogue, and sitemap; each lifts a service result into the mediator's outcome.

## Interface

### Signatures

```pudu
export fn registrations(kinds: &Messages.Kinds, runtime: &Runtime.Runtime) -> Array[Registration.Registration]
```

### Linkage

- **Requires:** `pudu-lang-mediator`, [[src/App/Messages]], [[src/Services/Discovery]], [[src/Services/Catalog]], [[src/Services/Seo]].
- **Consumed by:** [[src/App/Assembly]].

## Algorithm

For each of home, search, suggest, pins, catalog, sitemap: `Registration.handler(&kinds.<kind>, |message, context| Messaging.lift(Service.call(...)))`.

## Negative Logic (Prohibited Paths)

- ❌ No logic beyond calling the service: validation and rules live below.

## Edge Cases

- A service problem becomes `Raised(problem)`.

## Depth

SHALLOW.

## Grill Log

- **Q:** How do map results stay consistent with the listing?
  **A:** The pins message carries Search.Filters. The service passes the same validated text, category, municipality, date and free-only arguments to search_events with the map limit. Nearby refreshes preserve these filters; category/town map links explicitly encode their landing filter.


- **Q:** One registration file per subsystem?
  **A:** Yes: it mirrors the services and keeps assembly a flat concatenation.

## Referenced by

[[src/_MOC]]
