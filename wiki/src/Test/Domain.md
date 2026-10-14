---
type: module
fidelity: Active
tags: [module, test]
---
# Domain regression suite
## Purpose
`test/Domain/DomainTest.pudu` decodes recorded domain fixtures and checks search, consent, participation and profile boundaries.
## Interface
`main() -> Int`; consumed by the pinned Pudu test runner.
## Algorithm
Decode fixture JSON into typed domain values and compare outcomes with Std.Test. Nullable account-profile decoding uses Api.Account.profileOf without a network call.
## Negative Logic
No live database mutations, credentials or production data.
## Edge Cases
Invalid dates, query bounds, malformed profile payloads and a deleted identity returning JSONnull.
## Grill Log
Resolved: a valid profile remains typed, confirmed null signs out, and malformed non-null payload remains a dependency error. Live disposable development deletion additionally verifies cookie expiry/redirect.
## Referenced by
[[src/_MOC]] · [[handoffs/homepage-refresh]]

## Signup confirmation regression · #45
Server validation rejects unequal confirmation; length failures retain focused errors when both fields match. No provider or account is touched by pure tests. Resolved.

## Unknown event facts Grill Log · #51
Resolved: nullable prices/end retain explicit unknown state; known free/paid and dates regressions stay covered. No1970 null-date coercion. Unknown schedule24-hour discovery cutoff is separate from actual end. Boundary, malformed input, bilingual output and provider projections need focused tests.

## Date-range calendar Grill Log · #88
Resolved: add validated Dates(start,end) encoded YYYY-MM-DD..YYYY-MM-DD; reject malformed, impossible, reversed and over366-day spans. Inclusive end converts to following Puerto Rico midnight in existing from/to database arguments, without changing expiration or inventing availability. Preserve presets and canonical when URL across map/list/saved searches. Exact-date dialog uses semantic day buttons, roving keyboard focus, localized two-month desktop/one-month phone calendar, draft selection and explicit apply/clear. Escape cancels draft; existing select fallback remains functional. No Airbnb assets, popups or booking semantics.
