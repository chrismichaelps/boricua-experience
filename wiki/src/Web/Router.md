---
type: module
path: "@root/src/Web/Router.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: SHALLOW
tags: [module, web, shallow]
---

# Web.Router

> /** @Web.Router.Table — every route the application answers */

## Purpose

Concatenates every handler module's routes and answers a 404 page for the rest.

## Interface

### Signatures

```pudu
export fn routes(app) -> Route.Router
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

Concatenates every handler module's routes and answers a 404 page for the rest.

## Negative Logic (Prohibited Paths)

- ❌ No business rule in the web layer.
- ❌ No secret or token in a response body or log.

## Edge Cases

- None beyond the platform's own.

## Depth

SHALLOW.

## Grill Log

- **Q:** Where is the HTTP boundary?
  **A:** Here: below this layer nothing knows about requests, cookies, or headers.

## Referenced by

[[src/_MOC]]

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.
