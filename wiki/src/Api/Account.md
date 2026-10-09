---
type: module
path: "@root/src/Api/Account.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: MEDIUM
tags: [module, api, medium]
---

# Api.Account

> /** @Api.Account.Client — profiles, preferences, notifications, consent, and data rights */

## Purpose

Account reads and writes, notifications, consent records, and the data-subject operations.

## Interface

### Signatures

```pudu
export fn me, publicProfile, completeOnboarding, updateProfile, updatePreferences, notifications, markRead,
          exportData, pause, reactivate, prepareDeletion, recordConsent
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Constants/App]], [[src/Domain/Profile]], [[src/Domain/Notification]].
- **Consumed by:** [[src/Services/Account]], [[src/Services/Privacy]], [[src/Services/Auth/Accounts]].

## Algorithm

Direct mapping; onboarding always sends the current policy versions from [[src/Constants/App]].

## Negative Logic (Prohibited Paths)

- ❌ No business rule: authorization and limits are the database's.
- ❌ No logging of arguments or tokens.

## Edge Cases

- A paused profile's public page is `Missing`.

## Depth

MEDIUM: one typed function per database function; the argument names and decoding stay here.

## Grill Log

- **Q:** Who sends the policy versions?
  **A:** The server, from constants, so a form cannot claim acceptance of a version it never showed.

## Referenced by

[[src/_MOC]]
