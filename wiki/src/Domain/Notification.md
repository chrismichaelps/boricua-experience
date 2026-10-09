---
type: module
path: "@root/src/Domain/Notification.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Notification

> /** @Domain.Notification.Inbox — in-app notifications */

## Purpose

Inbox entries with their event and actor.

## Interface

### Signatures

```pudu
export type EventRef, Notification
export fn note(notification: &Notification) -> Str
```

### Linkage

- **Requires:** `Std.Json`.
- **Consumed by:** [[src/Api/Account]], [[src/View/Pages/Notifications]].

## Algorithm

`note` reads `data.note` when present.

## Negative Logic (Prohibited Paths)

- ❌ No HTML in notification data.

## Edge Cases

- Missing note reads empty.

## Depth

SHALLOW: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Store rendered text?
  **A:** No: kinds are rendered in the reader's language.

## Referenced by

[[src/_MOC]]
