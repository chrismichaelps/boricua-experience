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
