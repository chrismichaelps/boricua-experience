---
type: module
path: "@root/src/I18n/Es.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.Es

> /** @I18n.Es.Catalog — Spanish text of every message key */

## Purpose

The Spanish catalogue: every user-facing string by key.

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

A const map folded at compile time.

## Negative Logic (Prohibited Paths)

- ❌ No markup in values.

## Edge Cases

- Keys missing here render as themselves.

## Depth

SHALLOW.

## Grill Log

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** How does the lower homepage use the reference without copying its content?
  **A:** Spacious activity cards, local destination tiles and a collapsible full municipality directory preserve discovery routes. The footer has Boricua discovery, towns, participation and legal links; no invented social accounts or copied third-party product copy. Real destination photography is credited in both locales. Mobile search gives the date enough width.

- **Q:** How is the hero carousel integrated?
  **A:** [[src/View/Components/Hero]] owns the fixed search surface and four scene controls. [[src/Public/Carousel]] rotates local images and captions. New controls have Spanish/English labels; asset version 3 refreshes cached scripts and styles.


- **Q:** One file or many?
  **A:** One per language: a translator reads a single table.

## Referenced by

[[src/_MOC]]

- **Q:** What footer copy changes?
  **A:** Expand the island activity/community description, replace the obsolete imagery statement with photography credits, and name the map sheet toggle. English parity is required.

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

Readout has translated Stop audio and playback-error states; pressed state follows actual speech lifecycle. Resolved.

## Explicit location lifecycle Grill Log
Resolved: nearby lookup stays private; initial acquisition uses the bounded accurate/balanced fallback. Fresh readings alone enable the sharing badge. No storage restores sharing; hiding or leaving stops it. Epochs reject stale callbacks and serialized writes prevent a late update undoing stop. Map controls expose purpose/status in both languages; the map omits the assistant.

## Discovery photo and footer Grill Log
Resolved: open search uses the first database-ordered featured scene, a local responsive real photograph and unchanged named filters. Category/town landing behavior stays intact. Empty scene catalogs render usable search without a broken image. Footer has current-year copyright, quiet grouped links and phone touch targets; eligibility policy is unchanged. Photograph source, CC BY2.0 attribution, resizing and crop are recorded in public credits and THIRD_PARTY_NOTICES.

## Curated publication Grill Log · #42
Resolved: Add Spanish administrator and curated source labels with English key parity.

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Menu reader Grill Log · #69
Resolved: Menu reader labels, unknown price, availability and owner-declared dietary/allergen labels are Spanish interface values; stored content is not translated or invented.

## Menu editor validation Grill Log · #69
Resolved: nested editor validation and revision conflicts have actionable interface messages. Invalid input stays in the form; a stale save requires reviewing the latest version instead of blind overwrite.

## Owner editor Grill Log · #69
Resolved: Add complete owner editor field/action/conflict labels and unknown declaration guidance.

## Date-range calendar Grill Log · #88
Resolved: add validated Dates(start,end) encoded YYYY-MM-DD..YYYY-MM-DD; reject malformed, impossible, reversed and over366-day spans. Inclusive end converts to following Puerto Rico midnight in existing from/to database arguments, without changing expiration or inventing availability. Preserve presets and canonical when URL across map/list/saved searches. Exact-date dialog uses semantic day buttons, roving keyboard focus, localized two-month desktop/one-month phone calendar, draft selection and explicit apply/clear. Escape cancels draft; existing select fallback remains functional. No Airbnb assets, popups or booking semantics.

## Discovery surfaces Grill Log · #88
Resolved: Add translated map expand/close/loading labels; match English keys.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Language names
`nav.language_other` names the other language in its own spelling for the accessibility panel switch.

## Build
`footer.build`, `build.update`, `build.refresh`.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

## Compact joystick refinement · #124
Resolved user sizing: discovery rotation is one44px circular compass, equal to the map buttons. Hide the former side buttons only on discovery; pointer drag rotates continuously, tap resets north, Left/Right keys step rotation and Home resets. Capture one primary pointer, ignore secondary pointers, cancel safely, suppress a drag's synthetic reset click and detach location-follow on explicit rotation. Existing trip controls remain unchanged. Localized label explains drag and north action. This supersedes the96px pad.
