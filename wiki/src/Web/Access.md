---
type: module
path: "@root/src/Web/Access.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: SHALLOW
tags: [module, web, shallow]
---

# Web.Access

> /** @Web.Access.Log — one structured event per request */

## Purpose

Writes method, path (never the query), status, and milliseconds for each request; errors for 5xx.

## Interface

### Signatures

```pudu
export const COMPLETED: Str
export fn around(logger, request, handle) -> Http.Response
export fn middleware(logger) -> Route.Middleware
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

Writes method, path (never the query), status, and milliseconds for each request; errors for 5xx.

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

## Private capability paths Grill Log · #89
Resolved: use FailureLog.pathForLog for both platform access events and remote failures. Calendar/subscription and digest-stop user/signature segments are replaced with route templates; method/status/timing/reason remain useful.
