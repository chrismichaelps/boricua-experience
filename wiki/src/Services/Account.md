---
type: module
path: "@root/src/Services/Account.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: MEDIUM
tags: [module, services, medium]
---

# Services.Account

> /** @Services.Account.Profile — the member's profile, preferences, onboarding, and inbox */

## Purpose

Profile reads and edits, preferences, onboarding, and notifications.

## Interface

### Signatures

```pudu
export fn me, publicProfile, onboard, updateProfile, updatePreferences, notifications
```

### Linkage

- **Requires:** [[src/Api/Account]], [[src/Validation/Account]].
- **Consumed by:** [[src/App/Handlers/Account]].

### Photos

`changeAvatar(runtime, encoded, session) -> Result[Str, Problem]` validates with [[src/Validation/Avatar]], stores the file in the member's folder, and points the profile at its public address with a version query; `removeAvatar` clears the pointer, then deletes the file.

## Algorithm

Validate then call.

## Negative Logic (Prohibited Paths)

- ❌ No direct consent writes: onboarding records consent in the database.

## Edge Cases

- A paused profile cannot be shown publicly.

## Depth

MEDIUM: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Separate service per screen?
  **A:** No: one service per subject keeps the handlers thin.

## Referenced by

[[src/_MOC]]

## Inbox Grill Log

- **Q:** How does opening the inbox clear the badge without losing new notifications?
  **A:** After reading the inbox, the service marks read up to the newest unread id it fetched (`mark_notifications_read(p_up_to)`). Anything arriving later stays unread. The page renders the read flags as they were on arrival, so new items still show their dot. A failed mark leaves the badge for the next visit. Resolved.

## renewConsent
Validates the renewal form, then records acceptance through `AccountApi.acceptTerms`.
