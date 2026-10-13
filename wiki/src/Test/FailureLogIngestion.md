---
type: module
fidelity: Active
tags: [module, test]
---
# Test.FailureLogIngestion
## Purpose
Run the actual Worker against a temporary real SQLite database via a child-process adapter. Concurrent requests at4999 admit one;5000 refuses. Failed insertion rolls back the counter. UTC-day routing derives from one row timestamp; retention removes old rows/counters and preserves current reports. No remote test data.
## Interface
Focused browser/SQLite regression harness.
## Negative Logic
No fake production data or untested implementation mirror.
## Edge Cases
Failure, last-slot concurrency, scaling and lifecycle.
## Grill Log · #88
Resolved: behavioral assertions exercise actual modules and stored SQL, rather than matching source text.
## Referenced by
[[src/_MOC]]
