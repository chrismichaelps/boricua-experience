---
type: module
fidelity: Active
tags: [module, email, privacy]
---
# Test.Digest

## Purpose and interface
Pure localized-letter/header/signature checks plus stubbed batch/send checks. Suppressed and unavailable consent checks must cause zero provider calls. Invalid unsubscribe signatures must cause zero database calls; repeated valid stops remain successful.

## Algorithm and negative paths
No SMTP signup dependency, welcome email or automatic opt-in. Password recovery is a separate essential flow. A provider-accepted message cannot be recalled. Unknown consent never authorizes a send. Capability signatures never enter logs.

## Grill Log
Resolved #89: use a database-maintained generation rather than a cached preference; any opt-out/re-opt-in invalidates a selected batch. Preserve list-specific digest opt-out and separate marketing preferences. GET is scanner-safe and must not be blocked by onboarding. Independent review and focused, database and HTTP verification are required before promotion.

## Referenced by
[[src/_MOC]] · [[src/Database/EmailUnsubscribe]]

## Capability form Grill Log
Resolved: render a canonical single-slash stop path from validated account/token parameters; never use the raw request path as a form action, because repeated leading slashes could become a foreign authority. Test canonical output, repeated valid stop calls and claimed generation forwarding.
