---
type: domain
tags: [domain]
aliases: [Like, Dislike]
---

# Reaction

- **Definition:** a member's like (`1`) or dislike (`-1`) of an event; `0` clears it.
- A like is public as a count and raises the event's category in that member's recommendations.
- A dislike is private: the event leaves that member's recommendations and its category weighs less
  ([[decisions/ADR-0005-reactions]]).

## Referenced by

[[domain/_MOC]] · [[domain/Recommendation]] · [[src/Domain/Event]]
