---
type: module
path: "@root/src/Web/Respond.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Web
depth_status: DEEP
tags: [module, web, deep]
---

# Web.Respond

> /** @Web.Respond.Answers — responses with their cookies, headers, and cache policy */

## Purpose

Page, redirect, JSON, and document responses; session, flow, flash, and preference cookies; problem answers (sign-in redirect, onboarding, JSON for scripts, error pages); and `finish`, which writes a renewed or ended session, consumes the flash, adds security headers, and chooses the cache policy.

## Interface

### Signatures

```pudu
export fn page, redirect, json, document, withCookie, withSession, withoutSession, withFlow, withoutFlow, withFlash, withPreference, problem, finish, returnPath
```

### Linkage

- **Requires:** `Std.Http.Server.Route`, [[src/App/Assembly]], and the modules named in the signatures.
- **Consumed by:** [[src/Web/Router]] and the web handlers; [[src/Main]] and [[src/Function]].

## Algorithm

Page, redirect, JSON, and document responses; session, flow, flash, and preference cookies; problem answers (sign-in redirect, onboarding, JSON for scripts, error pages); and `finish`, which writes a renewed or ended session, consumes the flash, adds security headers, and chooses the cache policy.

## Negative Logic (Prohibited Paths)

- ❌ No business rule in the web layer.
- ❌ No secret or token in a response body or log.

## Edge Cases

- Guest GET pages with no cookies set are CDN-cacheable for a minute; anything personal is `private, no-store` with `Vary: Cookie`. `finish` never overrides a session cookie the handler set (sign-out).

## Depth

DEEP.

## Grill Log

- **Q:** Where is the HTTP boundary?
  **A:** Here: below this layer nothing knows about requests, cookies, or headers.

## Referenced by

[[src/_MOC]]

## Age gate

See [[src/Validation/Account]] for the age gate contract this module takes part in.

## Deleted session Grill Log
Resolved: confirmed JSONnull from my_profile means SignedOut; malformed non-null JSON and network failures remain Unavailable. Context clears a known deleted member session, while preserving sessions on transient failures. SignedOut responses expire the cookie. No database schema or authorization guard changes.

JSON problem responses use the same SignedOut cookie expiry as HTML redirects. `problemJson(found, secure)` is a pure response boundary; tests inspect401/expired secure sessioncookie and ensure503 leaves the session intact. Resolved.

## Moving nearby and 3D Grill Log · #78
Resolved: a handler-chosen cache policy is kept without `vary: cookie`, except that any response setting a cookie is forced private so a shared cache never stores it.
