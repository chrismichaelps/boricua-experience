---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, search, calendar]
---
# DateCalendar
## Purpose
Shared exact-date and preset calendar inside the existing search dialog.
## Interface
`dateCalendar(dialog, select, choices, labels, commit)` returns open/focus lifecycle. Canonical named select stays the submission source. [[src/Public/SearchPickers]] owns modal and focus restoration.
## Algorithm
Puerto Rico today, UTC calendar arithmetic, Intl localized month/day labels. Render two months desktop and one phone with previous/next navigation, roving day focus, range endpoints and interior highlighting. First tap starts draft; second completes range; earlier tap restarts. Apply allows one day and commits once; clear resets to Anytime. Flexible mode keeps existing preset buttons. Reopening/Escape discards uncommitted draft. Native dialog contains focus and existing optional Motion handles presentation.
## Negative Logic
No availability/prices invented, bookings, copied Airbnb assets, popup map cards, innerHTML, network requests or automatic form submission from the first day tap.
## Edge Cases
Leap years, cross-month/year ranges,366-day maximum, today in Puerto Rico while visitor is abroad, invalid dates, reset, keyboard arrows/Home/End/PageUp/PageDown, 320px/safe area, reduced motion and no scripts.
## Depth
MEDIUM: calendar draft and rendering only, server validates dates independently.
## Grill Log
Resolved: real validated server ranges exist before offering the calendar; inclusive end maps to next Puerto Rico midnight. Semantic day buttons retain complete accessible date names and one roving tab stop. Draft never changes select until apply. Cancel restores canonical selection on next open. Independent review and regression/visual checks required before release.
## Referenced by
[[src/_MOC]] · [[src/Public/SearchPickers]] · [[src/Public/SearchStyles]]

Resize refinement: preserve and restore the focused calendar day across rerender when a breakpoint/orientation changes. Calendar desktop positioning reserves actual available panel height; mobile remains a scrollable safe-area sheet. Resolved.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Year jump and out-of-range today
The single-date jump uses a styled year `<select>` (from the minimum or 120 years back to the maximum or 10 years ahead) beside the month select; a navigated year outside that list is added so the control always shows the visible month. When today is outside the bounds (a birth date capped at adulthood) the calendar opens on the nearest allowed day instead of the minimum.
