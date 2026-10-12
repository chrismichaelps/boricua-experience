---
type: module
path: "@root/test/Web/MenuFieldsTest.pudu"
fidelity: Active
tags: [module, menus]
---
# Test.MenuFields
## Purpose
Check nested field decoding, missing/overflow counts, explicit unknown declarations and bounded structural edits without database writes.
## Interface
Typed owner draft input/output or escaped server-rendered HTML; tests use isolated in-memory data.
## Algorithm
Apply the established menu limits and viewer/owner contract; retain submitted values on refusal.
## Negative Logic
No fake business data, authorization bypass, implicit overwrite, write retries or JSON textarea.
## Grill Log
Resolved: Check nested field decoding, missing/overflow counts, explicit unknown declarations and bounded structural edits without database writes.
## Referenced by
[[src/_MOC]]
