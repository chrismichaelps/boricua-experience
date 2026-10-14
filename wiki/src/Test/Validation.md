---
type: module
path: "@root/test/Validation/ValidationTest.pudu"
fidelity: Active
tags: [module, test, validation]
---
# Validation tests
## Purpose and interface
Pure publishing, account, place/menu and participation validation regressions using in-memory draft fixtures.
## Algorithm
Check success, field refusals, optional values and precise normalized output.
## Negative logic and edge cases
No backend mutation or fabricated evidence of browser/DB enforcement. New activity minimum age covers unknown,0,21, malformed/negative/over-bound values; step-free confirmation remains explicit.
## Grill Log
Resolved: blanks stay unknown, integer bounds match database, edit drafts preserve facts, and server checks remain authoritative.
## Referenced by
[[src/_MOC]] · [[src/Validation/EventForm]]
