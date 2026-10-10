---
type: module
path: "@root/src/Web/Guard.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web, medium]
---

# Web.Guard

> /** @Web.Guard.Forgery — state changes refused unless they come from this site's own pages */

## Purpose

Every state change must be a POST whose `Origin` (or `Referer`) is the site and, for members, carry the session's form token.

## Interface

### Signatures

```pudu
export fn check(app, visitor) -> Option[Http.Response]
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

Every state change must be a POST whose `Origin` (or `Referer`) is the site and, for members, carry the session's form token.

## Negative Logic (Prohibited Paths)

- ❌ No business rule in the web layer.
- ❌ No secret or token in a response body or log.

## Edge Cases

- Guests posting sign-in, sign-up, consent, or language pass with a same-origin check only.

## Depth

MEDIUM.

## Grill Log

- **Q:** Where is the HTTP boundary?
  **A:** Here: below this layer nothing knows about requests, cookies, or headers.

## Referenced by

[[src/_MOC]]
