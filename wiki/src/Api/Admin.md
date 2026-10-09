---
type: module
path: "@root/src/Api/Admin.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: SHALLOW
tags: [module, api, shallow]
---

# Api.Admin

> /** @Api.Admin.Client — metrics and moderation */

## Purpose

Administrator overview, open reports, and resolution.

## Interface

### Signatures

```pudu
export fn overview(gateway, token) -> Result[Admin.Overview, Problem.Problem]
export fn reports(gateway, token) -> Result[Array[Admin.Report], Problem.Problem]
export fn resolve(gateway, reportId: Int, action: Str, token) -> Result[(), Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Domain/Admin]].
- **Consumed by:** [[src/Services/Admin]].

## Algorithm

Direct mapping; the database refuses non-administrators.

## Negative Logic (Prohibited Paths)

- ❌ No business rule: authorization and limits are the database's.
- ❌ No logging of arguments or tokens.

## Edge Cases

- `actioned` cancels the event.

## Depth

SHALLOW: one typed function per database function; the argument names and decoding stay here.

## Grill Log

- **Q:** Check admin status in the server too?
  **A:** The page hides the link for non-admins, but authority is the database's.

## Referenced by

[[src/_MOC]]
