---
type: module
fidelity: Active
tags: [module, test]
---
# Test.Community
## Purpose
Pure calendar feed, channel classification and guest CSV-cell regressions.
## Interface
CommunityTest.pudu;33assertions without database access.
## Algorithm
Use typed feed fixtures, offline gateway and fixed keys to verify place formatting, cancellation, ICS escaping, stable signed URLs, referral classification and formula-safe CSV fields.
## Negative Logic
No real accounts, production records or provider calls.
## Edge Cases
Null address/end, Unicode, delimiter escaping, forged channel, lookalike host, dangerous spreadsheet prefixes and embedded newlines.
## Grill Log · #88
Resolved: normalize formatting only, preserving every assertion and fixture literal. This suite does not establish database authorization or waitlist concurrency correctness.
## Referenced by
[[src/_MOC]]
