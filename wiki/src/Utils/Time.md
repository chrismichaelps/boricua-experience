---
type: module
path: "@root/src/Utils/Time.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: DEEP
tags: [module, utils, deep]
---

# Utils.Time

> /** @Utils.Time.Local — instants read and written in Puerto Rico time */

## Purpose

Reads database timestamps, converts instants to Puerto Rico wall-clock readings, and reads and writes `datetime-local` form values.

## Interface

### Signatures

```pudu
export type Local = { year: Int, month: Int, day: Int, weekday: Int, hour: Int, minute: Int }
export fn parseTimestamp(text: Str) -> Option[Time.Instant]
export fn toTimestamp(instant: &Time.Instant) -> Str
export fn local(instant: &Time.Instant) -> Local
export fn dayNumber(instant: &Time.Instant) -> Int
export fn parseLocalInput(text: Str) -> Option[Time.Instant]
export fn localInput(instant: &Time.Instant) -> Str
export fn clock24(at: &Local) -> Str
export fn clock12(at: &Local) -> Str
export fn now() -> Time.Instant
export fn nowSeconds() -> Int
```

### Linkage

- **Requires:** `Std.Time`, `Std.Text`, [[src/Constants/App]].
- **Consumed by:** [[src/Domain/Event]], [[src/I18n/Dates]], [[src/Validation/EventForm]], [[src/Services/Auth/Sessions]].

## Algorithm

1. A timestamp's first 19 characters are parsed as UTC; fractional seconds are skipped; the zone suffix (`Z`, empty, `±HH:MM`) is subtracted.
2. Local readings add the fixed offset (-240 minutes) and read the date and clock in UTC; the weekday is `(days since epoch + 4) mod 7`, Sunday = 0.
3. Form values are read as local wall-clock time and shifted back to UTC.

## Negative Logic (Prohibited Paths)

- ❌ No daylight-saving rule: Puerto Rico has none.
- ❌ Never reads the machine's zone.

## Edge Cases

- Text shorter than 19 characters is refused.
- Seconds in a `datetime-local` value are accepted.

## Depth

DEEP: one module hides timestamp grammar, the offset, and weekday arithmetic from every view and form.

## Grill Log

- **Q:** Use the platform clock's zone?
  **A:** No: functions run in UTC and developers' machines in any zone; the island's offset is a constant. _Rejected:_ `formatLocal`.
- **Q:** Weekday from the library?
  **A:** Computed from days since the epoch: exact and needs no extra call.

## Referenced by

[[src/_MOC]]

## Birth date Grill Log

- **Q:** How is age counted?
  **A:** `yearsOld` parses `YYYY-MM-DD`, rejects impossible days (leap years included) and years before 1900, and subtracts one when the birthday has not yet come this year. A future date gives none. Resolved.
