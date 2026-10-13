---
type: module
fidelity: Active
tags: [module, email, privacy]
---
# Domain.Digest

## Purpose and interface
Due includes the opt-in generation captured by the database claim. Run separates sent, failed and skipped counts. Upcoming carries only the approved activity fields used by the letter.

## Algorithm and negative paths
No SMTP signup dependency, welcome email or automatic opt-in. Password recovery is a separate essential flow. A provider-accepted message cannot be recalled. Unknown consent never authorizes a send. Capability signatures never enter logs.

## Grill Log
Resolved #89: use a database-maintained generation rather than a cached preference; any opt-out/re-opt-in invalidates a selected batch. Preserve list-specific digest opt-out and separate marketing preferences. GET is scanner-safe and must not be blocked by onboarding. Independent review and focused, database and HTTP verification are required before promotion.

## Referenced by
[[src/_MOC]] · [[src/Database/EmailUnsubscribe]]
