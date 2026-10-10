---
type: module
path: "@root/public/assets/js/features/localTime.js"
fidelity: Active
tags: [module, browser, time]
---

# LocalTime

## Purpose

Rewrites each `<time data-moment>` element in the reader's time zone with `Intl.DateTimeFormat`, adding the zone abbreviation and keeping the Puerto Rico text as the element's title. Map sheet cards built in the browser use the same function.

## Interface

`localizeMoment(node)` for one element and `localizeMoments(root)` for every element under a root. Styles: `day`, `when`, `schedule`, matching [[src/View/Components/Moment]].

## Algorithm

When the reader's clock reads the same as Puerto Rico's for every instant on the element, the server text stays. Otherwise the text is rebuilt; "today" and "tomorrow" count days on the reader's calendar using `formatToParts`. A `data-localized` mark makes a second pass a no-op.

## Negative Logic

No network calls, no stored zone, no change to server-rendered text for Puerto Rico readers, no rewrite of an unreadable instant.

## Edge Cases

Readers in Puerto Rico, the United States, and Europe; a date that crosses midnight in the reader's zone; unreadable instants; repeated passes.

## Depth

SHALLOW: presentation only.

## Grill Log

- **Q:** Why compare formatted clocks instead of offsets? **A:** Puerto Rico has no daylight saving while many readers do, so the same zone pair can match in one season and differ in the other; comparing the formatted text checks the exact instant. Resolved.

## Tests

`scripts/local-time-test.mjs` under `TZ=America/Puerto_Rico`, `America/Los_Angeles`, and `Europe/Madrid`.

## Referenced by

[[src/_MOC]] · [[src/View/Components/Moment]] · [[src/Public/Explorer]]
