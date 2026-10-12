---
type: module
path: "@root/src/I18n/Dates.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: DEEP
tags: [module, i18n, deep]
---

# I18n.Dates

> /** @I18n.Dates.Calendar — dates and times written for a reader */

## Purpose

Weekday and month names, short and long dates, relative days (today, tomorrow, weekday), card time lines, and full schedules, in Puerto Rico time.

## Interface

### Signatures

```pudu
export fn weekday, short, long, monthYear, relativeDay, when, schedule
```

### Linkage

- **Requires:** [[src/Utils/Time]], [[src/I18n/Translate]].
- **Consumed by:** event cards and pages, profiles.

## Algorithm

A card line reads `Hoy · 7:30 PM`, or `Ahora · hasta 10:00 PM` while the event runs; a schedule shows one date for same-day events and both otherwise.

## Negative Logic (Prohibited Paths)

- ❌ No 24-hour times in Spanish: Puerto Rico writes 12-hour times.

## Edge Cases

- Unparseable timestamps render empty.

## Depth

DEEP.

## Grill Log

- **Q:** 12- or 24-hour clock?
  **A:** 12-hour in both languages, as people on the island write times.

## Referenced by

[[src/_MOC]]

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.
