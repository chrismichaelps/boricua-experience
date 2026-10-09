---
type: module
path: "@root/src/Services/Privacy.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: DEEP
tags: [module, services, deep]
---

# Services.Privacy

> /** @Services.Privacy.Rights — consent, export, pause, and deletion */

## Purpose

Records cookie choices, exports everything held as JSON, pauses and reactivates, and deletes the account after confirming presence.

## Interface

### Signatures

```pudu
export fn recordCookies(runtime, subject: Str, choice: &Consent.Choice, session: &Option[Session.Session]) -> Result[(), Problem.Problem]
export fn exportData(runtime, session) -> Result[Str, Problem.Problem]
export fn pause, reactivate
export fn delete(runtime, session, password: Str) -> Result[(), Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Account]], [[src/Api/Supabase/Identity]], [[src/Services/Auth/Accounts]].
- **Consumed by:** [[src/App/Handlers/Privacy]].

## Algorithm

Deletion: confirm presence, let the database cancel upcoming events and erase location, then delete the identity with the service key (cascading the profile).

## Negative Logic (Prohibited Paths)

- ❌ Never deletes without confirmation.
- ❌ Consent rows are never deleted, only unlinked.

## Edge Cases

- If the identity deletion fails after preparation, the member can retry; preparation is idempotent.

## Depth

DEEP: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Delete immediately or after a grace period?
  **A:** Immediately, as the right to be forgotten implies; pausing is the reversible option.

## Referenced by

[[src/_MOC]]
