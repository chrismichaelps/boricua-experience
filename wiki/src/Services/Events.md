---
type: module
path: "@root/src/Services/Events.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Services
depth_status: DEEP
tags: [module, services, deep]
---

# Services.Events

> /** @Services.Events.Publishing — event pages, publishing, editing, and cancelling */

## Purpose

Event pages (counting a view for non-organizers), attendee lists, publishing and editing through validation, and cancelling.

## Interface

### Signatures

```pudu
export fn detail, attendees, publish, editable, update, cancel
export fn tokenOf(session: &Option[Session.Session]) -> Option[Str]
```

### Linkage

- **Requires:** [[src/Api/Events]], [[src/Validation/EventForm]].
- **Consumed by:** [[src/App/Handlers/Events]].

## Algorithm

Validate, call, answer; `editable` refuses non-organizers and cancelled events.

## Negative Logic (Prohibited Paths)

- ❌ View counting never fails a page.

## Edge Cases

- A missing event is `Missing`.

## Depth

DEEP: callers name a use case; validation, calls, and composition stay inside.

## Grill Log

- **Q:** Count views asynchronously?
  **A:** Synchronously but ignored on failure; one small write.

## Referenced by

[[src/_MOC]]

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
