---
type: module
path: "@root/src/Web/Platform.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: MEDIUM
tags: [module, web, medium]
---

# Web.Platform

> /** @Web.Platform.Lambda — platform invocations read as requests and answered as documents */

## Purpose

Reads the request from an invocation (wrapped `Action: Invoke` bodies or gateway shapes, base64 bodies, list headers) and writes the answer with every `Set-Cookie` in `multiValueHeaders`.

## Interface

### Signatures

```pudu
export fn requestOf(event: &Json.Json) -> Route.Request
export fn answered(response: &Http.Response) -> Str
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

Reads the request from an invocation (wrapped `Action: Invoke` bodies or gateway shapes, base64 bodies, list headers) and writes the answer with every `Set-Cookie` in `multiValueHeaders`.

## Negative Logic (Prohibited Paths)

- ❌ No business rule in the web layer.
- ❌ No secret or token in a response body or log.

## Edge Cases

- Several cookies in one response survive the platform because they travel as a list.

## Depth

MEDIUM.

## Grill Log

- **Q:** Where is the HTTP boundary?
  **A:** Here: below this layer nothing knows about requests, cookies, or headers.

## Referenced by

[[src/_MOC]]
