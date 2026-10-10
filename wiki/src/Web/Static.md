---
type: module
path: "@root/src/Web/Static.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: SHALLOW
tags: [module, web, shallow]
---

# Web.Static

> /** @Web.Static.Files — the public folder served by the development server */

## Purpose

Serves `public/` for assets, the service worker, and the favicon in development, with media types from a const table, including HTML photography credits.

## Interface

### Signatures

```pudu
export fn middleware(root: Str) -> Route.Middleware
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

Serves `public/` for assets, the service worker, and the favicon in development, with media types from a const table, including HTML photography credits.

## Negative Logic (Prohibited Paths)

- ❌ No business rule in the web layer.
- ❌ No secret or token in a response body or log.

## Edge Cases

- Paths containing `..` are refused.

## Depth

SHALLOW.

## Grill Log

- **Q:** Where is the HTTP boundary?
  **A:** Here: below this layer nothing knows about requests, cookies, or headers.

- **Q:** How should the public photography credits open?
  **A:** Resolve `.html` to `text/html; charset=utf-8` so attribution renders as a document rather than an attachment. Asset routing and traversal rejection remain unchanged. Resolved.

## Referenced by

[[src/_MOC]]
