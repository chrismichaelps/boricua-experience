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

Start watches only from an explicit location action. Each control owns a distinct callback subscription. Stop watches on off/page hide. Map reads the current search query when refreshing nearby.

## Stable location camera

Explicit locate frames the first reading. A coarse initial reading fits its accuracy circle once; the first precise reading may refine that view to street zoom once. Subsequent readings retain zoom, and empty results never move the camera. User gestures detach following until explicit recenter.

The first precise reading then asks for the nearest activities and, when up to three lie within 25 km, widens the street view to include them, so "near me" never opens on an empty street; with nothing close the street view stays.

## Camera padding

The camera's padding is the visible part of the canvas: on phones the sheet covers the bottom and buttons line both sides, so the base padding is the sheet height plus 16 px at the bottom and 64 px at the sides, and every fit adds only 24 px. A fit that cannot fit the room left zooms in around the group's middle instead of silently doing nothing, which is how cluster taps used to fail on phones. Markers are never scaled with CSS: the map positions them with a transform and a scale multiplies that position.

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

## Location follow mode Grill Log

- **Q:** Why did the current-position dot look misplaced?
  **A:** Three causes. The first, often coarse network fix was centred once and never followed, so the dot drifted from the camera as GPS sharpened. A coarse fix was shown at a tight fixed zoom, so a ±2 km guess looked exact. And `transform` rules on price markers overrode the transform MapLibre uses to position each marker. Resolved.
- **Q:** What is the contract now?
  **A:** The locate control starts follow mode. Every reading re-frames the camera until the visitor pans, zooms, or rotates; only events carrying `originalEvent` count, so programmatic easing never cancels following. A detached state keeps the control pressed with an outline; pressing it again re-frames the last reading at once. An initial reading less precise than 500 m fits the camera to its accuracy circle once, mutes the halo, and shows a one-time approximate-location toast. Later accuracy changes update the halo without refitting. A precise first fix opens at zoom 15, and later fixes keep the visitor's zoom. Hover and selected price markers scale through the independent `scale` property. Resolved.
- **Q:** What proves it?
  **A:** A simulated 2.5 km reading framed the circle and showed the toast; a 25 m reading switched to precise and centred the marker in the unobscured canvas. A real drag detached following and a later reading left the camera alone; pressing locate re-centred. Resolved.

## Refreshed card date node

Grill resolved: `create` accepts text, not DOM children. Append the localized semantic `<time>` to a separate date paragraph before appending that paragraph to the card. This preserves datetime/data-moment attributes and prevents stringifying an HTMLTimeElement after viewport queries. Test the child node contract and verify live refreshed cards.

## Explicit location lifecycle Grill Log
Resolved: nearby lookup stays private; initial acquisition uses the bounded accurate/balanced fallback. Fresh readings alone enable the sharing badge. No storage restores sharing; hiding or leaving stops it. Epochs reject stale callbacks and serialized writes prevent a late update undoing stop. Map controls expose purpose/status in both languages; the map omits the assistant.

## Nullable schedule rendering Grill Log · #51
Resolved: refreshed sheet data-ends normalizes null to empty; LocalTime treats malformed ends as unknown. Organizing activity final-state text uses archived when actual end unknown, retaining cancellation precedence. Test actual date renderer with null-end sheet data and bilingual archived output.

## Moving nearby and 3D Grill Log · #78
Resolved: area requests are grid-aligned and carry `hl`; a hidden tab defers its refresh until shown; following retains the chosen zoom (superseding the earlier speed-adaptive camera); the 3D switch is wired through [[src/Public/Map3d]]. See [[decisions/ADR-0011-moving-nearby-and-3d-map]].

## Stable discovery camera Grill Log · #88
Resolved: result responses never zoom the discovery camera. Remove empty-result widening and speed-based zoom because competing GPS/result eases cause oscillation. Explicit locate frames the initial accuracy once; a first precise fix may refine a previously coarse initial view once. Later readings only update position and follow center, preserving zoom even if accuracy degrades or speed changes. User pan/zoom/rotation detaches; recenter is explicit. Turning private locate off detaches even while sharing continues. Regression cases cover empty/filled responses, accuracy alternation, stationary/noisy/moving fixes, user gestures and sharing lifecycle. This supersedes earlier widening/speed-follow contracts.

Reference boundary: preserve existing cards, markers and mobile sheet. No Airbnb-style hover card or map popup is introduced.

Independent review refinement: preserve intended follow zoom while easing is in flight, including duplicated locate/share delivery. Defer coarse follow framing until its first fit settles; a precise reading can refine once. A gesture during initial acquisition cancels pending recenter and marks locate detached. Deferred normal-motion tests exercise these cases. Resolved.

Explicit exploration refinement: list focus that moves the camera and activated clusters detach location following, including pending initial framing. Hover and price-pin selection retain existing highlighting/scroll behavior and do not introduce popups. Resolved.

## Discovery surfaces Grill Log · #88
Resolved: Visible loading state follows the current request ticket, cached/error/no-area branches and pagehide. MapSurface owns expansion; expanded camera coverage is zero, resizing updates bounds without event refit or GPS recenter.

## Phone sheet behavior
Below 700px, scrolling the list past 24px raises the sheet and the Map pill lowers it. While raised, viewport refreshes are skipped so the list keeps what it showed; lowering re-reads the visible map.

Programmatic list scrolls (selecting a pin) are ignored for 900ms so they never raise the sheet.
