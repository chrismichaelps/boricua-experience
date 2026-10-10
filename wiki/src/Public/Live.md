---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, browser, location]
---

# Live

## Purpose

Geolocation watch and sharing state, throttled position updates, badge and visibility lifecycle.

## Interface

public/assets/js/features/live.js, wired by [[src/View/Pages/Map]] and main.js.

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
  **A:** Live owns clearWatch and refuses to start a watcher on a hidden page; explorer keeps at most one subscription per control. Turning both controls off or hiding the page stops it.
- **Q:** How are map filters preserved?
  **A:** Nearby URLs start from the current query, replace coordinates, clear pagination, and the server sends a typed filtered pins message.

## Referenced by

[[src/_MOC]] · [[subsystems/Location]]

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** Expose onStatus subscriptions for waiting, ready, error and stopped. Subscribe before navigator.watchPosition. Only replay fresh cached readings; clear stale readings on stop. Denial, timeout and unavailable APIs notify subscribers and stop a failing watcher. Page hide stops local watches and notifies controls; enabled sharing alone may resume. Location look-up alone never posts a position. Resolved.
