---
type: domain
tags: [domain]
aliases: [Participant, Going]
---

# Attendee

- **Definition:** a member with an `approved` [[domain/JoinRequest]].
- **Who sees the list:** the organizer and approved attendees always; onboarded members for public
  and unlisted events; guests see the count only ([[decisions/ADR-0007-attendee-visibility]]).
- A member who turned off "show me in attendee lists", or whose account is paused, counts in the
  total but is never named to others.

## Referenced by

[[domain/_MOC]] · [[src/View/Components/Attendees]] · [[src/Domain/Event]]
