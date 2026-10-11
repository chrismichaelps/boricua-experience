---
type: module
path: "@root/src/Web/Context.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: DEEP
tags: [module, web, deep]
---

# Web.Context

> /** @Web.Context.Visitor — who is asking, resolved once per request */

## Purpose

Resolves the visitor: locale (cookie, then `Accept-Language`), sealed session refreshed when needed, member profile for pages, consent choice, visitor id, and flash; builds the view frame.

## Interface

### Signatures

```pudu
export type Visitor
export fn resolve(app, request, withMember: Bool) -> Visitor
export fn frame(app, visitor) -> Frame.Frame
export fn wantsJson(visitor) -> Bool
export fn problemOf[T](outcome) -> Result[T, Problem.Problem]
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

Resolves the visitor: locale (cookie, then `Accept-Language`), sealed session refreshed when needed, member profile for pages, consent choice, visitor id, and flash; builds the view frame.

## Negative Logic (Prohibited Paths)

- ❌ No business rule in the web layer.
- ❌ No secret or token in a response body or log.

## Edge Cases

- A cookie that no longer opens or a refused refresh ends the session; an unreachable identity provider keeps it.

## Depth

DEEP.

## Grill Log

- **Q:** Where is the HTTP boundary?
  **A:** Here: below this layer nothing knows about requests, cookies, or headers.

## Referenced by

[[src/_MOC]]

## Deleted session Grill Log
Resolved: confirmed JSONnull from my_profile means SignedOut; malformed non-null JSON and network failures remain Unavailable. Context clears a known deleted member session, while preserving sessions on transient failures. SignedOut responses expire the cookie. No database schema or authorization guard changes.
