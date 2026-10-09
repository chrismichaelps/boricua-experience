---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0004 — Location privacy

## Decision

Live location is off by default and started by a tap; positions are never public. The owner
chooses `only_me` or `approved_activities`. Writes are throttled (browser: 15 s and 25 m; database:
10 s); history is sampled, kept 30 days in monthly partitions, exported with the account, and
deletable in one action. Event locations are blurred in listings until approval reveals them.

## Referenced by

[[decisions/_MOC]] · [[subsystems/Location]]
