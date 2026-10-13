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
