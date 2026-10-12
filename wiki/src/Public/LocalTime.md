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

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Asset graph46 · #51
Resolved: first-party import identities and worker cache advance together to46 for nullable schedule/price rendering. Public code changes are limited to LocalTime, BrowserMessages, AssistantStream and Explorer; other browser modules only change dependency identities. No private data enters precache.
