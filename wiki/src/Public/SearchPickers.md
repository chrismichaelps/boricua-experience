---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, presentation, search]
---

# SearchPickers

## Purpose

Progressively enhance existing named selects with app-style searchable option dialogs. Shared by the main search pill and results filter bar.

## Interface

`searchPickers(form)`. Requires native dialog support; otherwise retains the original controls. Consumed by [[src/Public/BrowserMain]].

## Algorithm

Read translated labels and select options from rendered DOM. Build each dialog using textContent; a trigger displays selected text. Municipality search folds accents. Option selection updates the original select, synchronizes pressed state, closes and restores focus before dispatching change. Existing result filter auto-submit continues to work. Desktop positions the panel near the trigger, mobile presents a bottom sheet. Native modal dialog traps focus; Escape/outside/close restore the trigger. Dialog stays under the form so carousel focus suspension applies.

## Negative Logic

No copied third-party copy, invented calendar filters, HTML injection, server calls or duplicate named controls. Do not replace controls when native dialog support is missing.

## Edge Cases

No scripts, empty/long option lists, accented queries, zero matches, selected options, reset/change synchronization, keyboard traversal, narrow viewport, unsupported dialog, multiple forms, browser resize and scrolling.

## Depth

MEDIUM: bounded select enhancement, independent of server filter semantics.

## Grill Log

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** Why retain the original select?
  **A:** It remains the canonical value and GET field, with native fallback when enhancement cannot run.
- **Q:** How are reference calendar interactions supported?
  **A:** Exact ranges now map to the existing server from/to query; presets remain available. Calendar drafts never submit until Apply, and no booking availability is implied.
- **Q:** How does a dialog work inside a clipping hero?
  **A:** showModal promotes it to the browser top layer while retaining DOM ancestry for form and carousel focus behavior.

## Referenced by

[[src/_MOC]] · [[subsystems/Presentation]] · [[src/View/Components/Search]]

Independent review resolutions: Enter inside municipality search selects the first visible choice and never implicitly submits the surrounding form; empty results remain open. Default Soon is omitted to preserve server relevance for text searches. Keyboard-visible focus restores the segment outline.

Browser verification: first Escape closes the dialog even from a search input. Positioned field wrappers contain hidden select/label boxes so they cannot widen the mobile document.

## Date-range calendar Grill Log · #88
Resolved: add validated Dates(start,end) encoded YYYY-MM-DD..YYYY-MM-DD; reject malformed, impossible, reversed and over366-day spans. Inclusive end converts to following Puerto Rico midnight in existing from/to database arguments, without changing expiration or inventing availability. Preserve presets and canonical when URL across map/list/saved searches. Exact-date dialog uses semantic day buttons, roving keyboard focus, localized two-month desktop/one-month phone calendar, draft selection and explicit apply/clear. Escape cancels draft; existing select fallback remains functional. No Airbnb assets, popups or booking semantics.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Placement
On wide screens a list picker opens directly below its trigger, or above it when the space below is shorter than both 360px and the space above; the date calendar keeps its clamp so the whole month stays visible. Phones keep the bottom sheet. The same module now also enhances the time, month and year pickers FormDates builds, the review report reason and the accessibility panel's useful-links menu.
