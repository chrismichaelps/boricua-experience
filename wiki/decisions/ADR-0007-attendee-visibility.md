---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0007 — Attendee visibility

## Decision

Event pages show the organizer card and who is going. Guests see counts only. Onboarded members see
named attendees of public and unlisted events; private events show names only to the organizer and
approved attendees. A member can opt out of being named; paused accounts are never named.

## Rationale

Knowing who hosts and who goes is the main reason to trust an invitation; the opt-out and the guest
rule keep that from becoming a directory of where people will be.

## Referenced by

[[decisions/_MOC]] · [[domain/Attendee]]
