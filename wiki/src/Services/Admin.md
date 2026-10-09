---
type: module
path: "@root/src/Services/Admin.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services, medium]
---

# Services.Admin

> /** @Services.Admin.Moderation — the administrator's dashboard and decisions */

## Purpose

Overview counts with open reports, and report resolution.

## Interface

### Signatures

```pudu
export type Dashboard = { overview, reports }
export fn dashboard, resolve
```

### Linkage

- **Requires:** [[src/Api/Admin]].
- **Consumed by:** [[src/App/Handlers/Admin]].

## Algorithm

Two reads; resolution maps a flag to `actioned` or `dismissed`.

## Negative Logic (Prohibited Paths)

- ❌ No admin check here: the database refuses others.

## Edge Cases

- Non-admins see 403.

## Depth

MEDIUM: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Audit trail?
  **A:** The database writes one row per decision.

## Referenced by

[[src/_MOC]]
