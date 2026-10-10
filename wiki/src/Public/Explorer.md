---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, browser, location]
---

# Explorer

## Purpose

Map pins, filtered nearby refresh, explicit location controls and responsive event sheet.

## Interface

public/assets/js/features/explorer.js, wired by [[src/View/Pages/Map]] and main.js.

## Algorithm

Start watches only from an explicit location action or a previously enabled sharing session. Stop watches on off/page hide. Map reads the current search query when refreshing nearby.

## Negative Logic

No public sharing of all users, no watch remaining active after disabling location, no discarded discovery filters.

## Edge Cases

Location denied, page hidden, sharing disabled while local locate stays enabled, repeated toggles and failed nearby requests.

## Depth

MEDIUM: browser and server boundaries.

## Grill Log

- **Q:** Who stops the watcher?
  **A:** Live owns clearWatch; explorer keeps at most one subscription per control. Turning both controls off or hiding the page stops it.
- **Q:** How are map filters preserved?
  **A:** Nearby URLs start from the current query, replace coordinates, clear pagination, and the server sends a typed filtered pins message.

## Referenced by

[[src/_MOC]] · [[subsystems/Location]]

- **Q:** How is map selection accessible and responsive?
  **A:** Price pins select matching cards; keyboard focus on cards also highlights the pin. A semantic button toggles the mobile sheet with aria-expanded. Pan and scroll animation honor reduced motion. Location remains opt-in.

MapLibre addTo resets marker labels, so draw restores activity title/price after attachment. Desktop canvas begins beside the 360px list instead of underneath it; fit padding no longer counts that separate panel twice.

Resize refits event bounds after desktop/mobile canvas layout changes. Expanded mobile sheet uses a vertical scrolling list; collapsed mode keeps the horizontal card strip.

Overview markers group projected locations, show translated activity counts and zoom in on activation. Detailed zoom restores individual price markers. All list entries remain reachable; selected activity tracks through redraw. Move-end redraw updates groups after zoom.

- **Q:** How is keyboard focus preserved when zoom regroups markers?
  **A:** Record the focused marker's member slugs before draw, then focus a new marker representing one of those same activities with preventScroll. Removing DOM markers must not strand keyboard users on body.

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** Viewport results are projected into the unobscured canvas. Move-end filters cards and markers together, then debounces a bounded radius request retaining category/town/text/date/free filters. Request tickets reject late responses; no result refresh recenters the camera. Locate subscribes before watching, restores the meaningful current-position marker label, centers only on explicit activation, and clears pressed/busy state after failed or paused readings. Resolved.

- **Q:** What happens when the sheet or breakpoint changes? **A:** Update camera padding without refitting event bounds, then cull again after the sheet transition ends. Persistent mobile padding must not displace activities above the desktop viewport after resize. Resolved.

Sheet toggle invokes resizeViewport immediately as well as on transitionend, so reduced-motion users receive correct padding even when no transition event fires.

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Read exact unobscured bounds, retain category/town/query/date/free filters, abort replaced fetches, debounce stopped camera movement and cache at most eight successful viewport batches for 30 seconds. Only markers/cards in view render; no user population fetch. Dragging the named mobile sheet handle changes its two snap states, preserves native list scroll, supports cancellation and keyboard toggle. Resolved.

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.

## Transition boundary
Only the sheet itself ending a height/max-height transition updates map padding. Ignore bubbled card/child transitions to prevent repeated read loops. Grill: final soak found propagation loop; target/property filter resolves it.
