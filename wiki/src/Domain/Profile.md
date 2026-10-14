---
type: module
path: "@root/src/Domain/Profile.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: MEDIUM
tags: [module, domain, medium]
---

# Domain.Profile

> /** @Domain.Profile.Accounts — a member's own account and others' public profiles */

## Purpose

The signed-in account with preferences and counts, the public organizer profile, and the edit records.

## Interface

### Signatures

```pudu
export type MyProfile, PublicProfile, ProfileEdit, Preferences
export const ACTIVE, PAUSED, ONLY_ME, APPROVED_ACTIVITIES: Str
```

### Linkage

- **Requires:** [[src/Domain/Event]].
- **Consumed by:** [[src/Api/Account]], account and profile views.

## Algorithm

Derived decoding only.

## Negative Logic (Prohibited Paths)

- ❌ A public profile never carries email, preferences, or location.

## Edge Cases

- A paused profile is not found.

## Depth

MEDIUM: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** One profile type?
  **A:** Two: the public one is a separate projection so private fields cannot leak by accident.

## Referenced by

[[src/_MOC]]

## Curated publication Grill Log · #42
Resolved: PublicProfile adds trusted isAdmin, default false for older payloads; no email or user metadata grants authority.

## Accepted versions
`MyProfile.termsVersion` and `privacyVersion` (default empty) carry the versions the member last accepted; empty means the profile read predates them and never blocks.
