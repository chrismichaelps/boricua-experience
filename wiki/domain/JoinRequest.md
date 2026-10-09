---
type: domain
tags: [domain]
aliases: [Request, Solicitud]
---

# JoinRequest

- **Definition:** a member's request to attend an event, with an optional message.
- **States:** `pending` → `approved` or `rejected` by the organizer; `withdrawn` by the member.
  Open events create requests already `approved`.
- **Rules:** one request per member and event; a rejected member cannot ask again; approval respects
  capacity; an organizer cannot request their own event.
- **Effects:** the organizer is notified of a pending request; the member of the decision; approval
  reveals the exact location and instructions.

## Referenced by

[[domain/_MOC]] · [[subsystems/Participation]] · [[src/Domain/Participation]]
