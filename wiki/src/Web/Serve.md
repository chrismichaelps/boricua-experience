---
type: module
path: "@root/src/Web/Serve.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: DEEP
tags: [module, web, deep]
---

# Web.Serve

> /** @Web.Serve.Handlers — the shapes every route handler takes */

## Purpose

The handler shapes: `page` (any visitor, member loaded, onboarding gate), `memberPage`, `action` (guarded), `memberAction`, and `api`; plus `ask` through the mediator and request readers.

## Interface

### Signatures

```pudu
export fn ask, page, memberPage, action, memberAction, api, param, fields, query, signed, visit
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

The handler shapes: `page` (any visitor, member loaded, onboarding gate), `memberPage`, `action` (guarded), `memberAction`, and `api`; plus `ask` through the mediator and request readers.

## Negative Logic (Prohibited Paths)

- ❌ No business rule in the web layer.
- ❌ No secret or token in a response body or log.

## Edge Cases

- An account that owes onboarding is sent to `/welcome` from any page except the policies and onboarding itself.

## Depth

DEEP.

## Grill Log

- **Q:** Where is the HTTP boundary?
  **A:** Here: below this layer nothing knows about requests, cookies, or headers.

## Referenced by

[[src/_MOC]]
