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
