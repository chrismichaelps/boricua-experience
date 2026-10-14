---
type: module
fidelity: Active
tags: [module, email, privacy]
---
# Web.Handlers.Digest

## Purpose and interface
The scheduler requires its bearer secret. Both unsubscribe routes use the ungated API visitor wrapper: GET displays confirmation without mutation; POST validates the account-bound signature and commits opt-out without login, CSRF token or redirect. HTML callers receive confirmation; mail clients receive JSON200.

## Algorithm and negative paths
No SMTP signup dependency, welcome email or automatic opt-in. Password recovery is a separate essential flow. A provider-accepted message cannot be recalled. Unknown consent never authorizes a send. Capability signatures never enter logs.

## Grill Log
Resolved #89: use a database-maintained generation rather than a cached preference; any opt-out/re-opt-in invalidates a selected batch. Preserve list-specific digest opt-out and separate marketing preferences. GET is scanner-safe and must not be blocked by onboarding. Independent review and focused, database and HTTP verification are required before promotion.

## Referenced by
[[src/_MOC]] · [[src/Database/EmailUnsubscribe]]

## Capability form Grill Log
Resolved: render a canonical single-slash stop path from validated account/token parameters; never use the raw request path as a form action, because repeated leading slashes could become a foreign authority. Test canonical output, repeated valid stop calls and claimed generation forwarding.

Capability responses explicitly use private/no-store and no-referrer, including invalid links. This prevents local history/cache copies from being reused as responses and avoids propagating capability paths via resource referrers.
