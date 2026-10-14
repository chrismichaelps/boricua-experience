---
type: module
path: "@root/public/assets/js/features/formDates.js"
fidelity: Active
tags: [module, public, forms]
---
# FormDates
## Purpose and interface
Turn labelled date, date-time, month and time fields into the same picker fields the search bar uses. `formDates()` enhances every `[data-form-date]` input (date, datetime-local, month) and every `input[type=time][data-form-time]`. Exports `applyDate(input, day, fallbackClock)`, `applyTime(input, clock)`, `puertoRicoToday(now)` and `dateBounds(input, today)` for the harness.

- **Date**: a picker trigger shows the formatted day ("Sat, Oct 24, 2026") or "Add date" with a calendar icon; it opens the shared single-date calendar in a body-owned modal.
- **Date-time**: the date trigger plus a time picker (30-minute steps, any existing off-grid clock kept as its own choice) built from a generated `<select>` handed to SearchPickers.
- **Month**: two pickers, month and year (year from the input's `min` to its `max` or the current year).
- **Time** (opening hours): one picker of 30-minute steps (an existing off-grid clock is kept) with the field's placeholder.

The native input stays in the form as the canonical value: visually hidden (`picker-native`), out of the tab order, still required/validated. Its `invalid` event marks the trigger `aria-invalid` and focuses it only when it is the form's first invalid control; the field label points at the trigger.
## Algorithm
Bounds: `data-date-min="today"` sets the minimum to Puerto Rico's today unless the stored value is earlier (editing keeps a past start reachable); `data-date-age="N"` sets the maximum to today minus N years, clamping a leap day to the month's end; otherwise the input's own `min`/`max`. A calendar commit writes the day with the existing clock, else the clock already chosen in the time picker, else 12:00. A time choice writes only when a day exists. Every write emits input and change; the trigger resyncs on change and form reset.
## Negative logic and edge cases
No JS or no `<dialog>`: native inputs stay visible and untouched. Disabled and read-only inputs are skipped. A time alone never invents a date. Auxiliary pickers carry no `name`, so they never submit or validate. No timezone conversion: values are Puerto Rico wall-clock strings as before.
## Grill Log
Resolved: picker-style triggers replace native text boxes so every date, time and choice looks the same as the search filters. Rejected: keeping the native date-time text with an icon (inconsistent across browsers and locales) and a free-typed time (no consistent picker). Noon as the default clock avoids publishing a midnight start by accident.
## Referenced by
[[src/_MOC]] · [[src/Public/DateCalendar]] · [[src/Public/SearchPickers]] · [[src/View/Components/Form]] · [[src/View/Pages/EventForm]] · [[src/View/Pages/PlaceForm]] · [[src/View/Pages/Auth]] · [[src/Test/FormControls]]

## Independent review resolution
Resolved: the calendar dialog lives outside the owning form; cancel leaves the native field validatable; desktop centers with inset/margin so optional Motion entry preserves position.
