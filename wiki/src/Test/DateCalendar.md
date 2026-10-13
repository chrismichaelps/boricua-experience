---
type: module
fidelity: Active
tags: [module, test, calendar]
---
# Date calendar regression
## Purpose
Exercise production calendar draft, date arithmetic, modal integration boundary and keyboard behavior with explicit DOM/clock stubs.
## Interface
scripts/date-calendar-test.mjs; consumed by scripts/test.sh. No credentials or browser location.
## Algorithm
Fixed instant crosses Puerto Rico/UTC day boundary. Exercise selection, apply, cancel/reopen, clear, presets, inclusive single day, impossible/reversed/oversized ranges, cross-month keyboard, leap day and phone month count.
## Negative Logic
No invented availability or external submissions. Do not mirror implementation; assert canonical values, focus and visible states.
## Edge Cases
Local timezone mismatch, stale draft, leap year,366-day span, unsupported/invalid dates and resize.
## Grill Log
Resolved: first tap never changes canonical GET field; apply commits exactly once. Escape lifecycle owned by existing picker; reopening discards draft. Independent UI/browser review before release.
## Referenced by
[[src/_MOC]] · [[src/Public/DateCalendar]]

Resize regression: a focused day survives a desktop-to-phone month rerender with one roving tab stop. Resolved.
