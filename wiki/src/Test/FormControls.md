---
type: module
path: "@root/scripts/form-controls-test.mjs"
fidelity: Active
tags: [module, test, forms]
---
# FormControls
## Purpose and interface
VM harness for canonical date-time editing and shared form select state; run node scripts/form-controls-test.mjs.
## Algorithm
Exercise exact module listeners against local DOM fixtures. Verify preserved clocks, explicit commit/clear, required validation focus, disabled options and reset synchronization.
## Negative logic and edge cases
No network, account mutations or claimed physical device evidence. Native date/month/time and no-dialog fallback remain usable.
## Grill Log
Resolved: behavioral tests check canonical values and events, not just the presence of styling classes.
## Referenced by
[[src/_MOC]] · [[src/Public/FormDates]] · [[src/Public/SearchPickers]]

## Picker fields
Covers noon default, a time chosen before the date, time-only writes refused, Puerto Rico today, `today`/age bounds including leap days, the formatted trigger, the off-grid time choice, invalid focus, and body-owned calendar open/commit/cancel/exit.
