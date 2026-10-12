---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0005 — Reactions

## Decision

Members may like or dislike an event. Likes show as a count on cards and raise popularity and the
member's taste for the category. Dislikes are never shown; they remove the event from that
member's recommendations and lower the category's weight. Reactions are exported with the account.

## Alternatives

Public dislike counts — rejected: they discourage small community events and invite pile-ons.

## Referenced by

[[decisions/_MOC]] · [[domain/Reaction]]

## Who may react · #76
Decision: `set_reaction` refuses a like or not-interested from the activity's organizer (`own_event`) and on a cancelled activity (`event_cancelled`); clearing a reaction is always allowed. Migration `20261012210000_reaction_rules` removes existing self-reactions so counts and taste signals exclude them, through the counting trigger. Rejected: hiding the control only in the interface, because a direct POST still inflated popularity.
