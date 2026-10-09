---
type: module
path: "@root/src/Constants/Http.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.Http

> /** @Constants.Http.Policies — cache, security, and media-type values */

## Purpose

Media types, cache policies, the scripts' request marker, the content security policy, and the security headers every response carries.

## Interface

`HTML`, `JSON`, `XML`, `TEXT`, `MANIFEST`, `CALENDAR`; `CACHE_PRIVATE`, `CACHE_PUBLIC_PAGE`, `CACHE_REFERENCE`; `REQUESTED_WITH`/`REQUESTED_WITH_VALUE`; `CONTENT_SECURITY_POLICY`; `SECURITY_HEADERS`.

### Linkage

- **Requires:** nothing.
- **Consumed by:** modules of every higher layer that use these values.

## Algorithm

None: compile-time values only.

## Negative Logic (Prohibited Paths)

- ❌ No value computed from the environment or the clock.
- ❌ No literal of these values anywhere else in the source.

## Depth

SHALLOW by design: a table of names. Deletion test: the values scatter as literals.

## Grill Log

- **Q:** Which pages may a shared cache keep? **A:** Only pages rendered for a guest (no session cookie), for 60 s with stale-while-revalidate; any page for a member is `private, no-store`. _Rejected:_ caching member pages with `Vary: Cookie` (CDNs key poorly on cookies).
- **Q:** Inline scripts? **A:** None, so the policy needs no nonces; structured data is `application/ld+json`, which a policy does not execute.

## Referenced by

[[src/_MOC]]
