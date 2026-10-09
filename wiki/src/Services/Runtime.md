---
type: module
path: "@root/src/Services/Runtime.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: SHALLOW
tags: [module, services, shallow]
---

# Services.Runtime

> /** @Services.Runtime.Dependencies — what every use case is given */

## Purpose

The record every service receives: the gateway, the 32-byte session key, the site origin, whether cookies are `Secure`, and the per-instance catalogue cache.

## Interface

### Signatures

```pudu
export type Runtime = { gateway, sessionKey: Bytes, siteUrl: Str, secureCookies: Bool, catalog: Sync.Cell[Option[(Int, Catalog.Catalog)]] }
export fn create(settings: &Settings.Settings) -> Result[Runtime, Str]
export fn over(gateway, sessionKey, siteUrl) -> Runtime
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Config/Settings]], [[src/Domain/Catalog]].
- **Consumed by:** every service, [[src/App/Assembly]].

## Algorithm

Built once at start-up; the cache cell is shared by every copy of the record.

## Negative Logic (Prohibited Paths)

- ❌ No per-request state here.

## Edge Cases

- Tests build one over a stub gateway.

## Depth

SHALLOW: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Pass dependencies one by one?
  **A:** One record: every service signature stays two or three parameters.

## Referenced by

[[src/_MOC]]
