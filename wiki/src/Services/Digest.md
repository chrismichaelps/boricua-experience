---
type: module
fidelity: Active
tags: [module, email, privacy]
---
# Services.Digest

## Purpose and interface
Signs account-bound unsubscribe links, builds localized letters and claims weekly digests. Each recipient is checked against the current opt-in revision immediately before provider submission. Revoked or superseded claims are skipped; database check failures fail closed. Signed stop requests are idempotent, need no session and never invoke the mail provider.

## Algorithm and negative paths
No SMTP signup dependency, welcome email or automatic opt-in. Password recovery is a separate essential flow. A provider-accepted message cannot be recalled. Unknown consent never authorizes a send. Capability signatures never enter logs.

## Grill Log
Resolved #89: use a database-maintained generation rather than a cached preference; any opt-out/re-opt-in invalidates a selected batch. Preserve list-specific digest opt-out and separate marketing preferences. GET is scanner-safe and must not be blocked by onboarding. Independent review and focused, database and HTTP verification are required before promotion.

## Referenced by
[[src/_MOC]] · [[src/Database/EmailUnsubscribe]]

## Capability form Grill Log
Resolved: render a canonical single-slash stop path from validated account/token parameters; never use the raw request path as a form action, because repeated leading slashes could become a foreign authority. Test canonical output, repeated valid stop calls and claimed generation forwarding.
