---
type: module
fidelity: Active
tags: [module, browser, location]
---

# Locate

## Purpose
Bounded explicit device-location lookup shared by publishing controls.

## Interface
requestLocation(signal, geolocation=navigator.geolocation) -> Promise<Position>. GEO options are supplied by BrowserConfig.

## Algorithm
Try high accuracy once; unavailable/timeout/invalid coordinates trigger one balanced-accuracy fallback. Permission denial never retries. A total deadline and AbortSignal ignore stale callbacks. Validate finite latitude/longitude and nonnegative accuracy before resolving.

## Negative Logic
No IP-location service, fabricated coordinates, background sharing, automatic permission request or unbounded retry.

## Edge Cases
Desktop CoreLocation transient failure, denial, missing API, synchronous exception, aborted navigation, invalid readings and coarse cached fixes.

## Grill Log
Resolved: browsers and operating systems can refuse a fix despite permission. The app retries transient errors once and preserves manual pin placement; it cannot guarantee GPS hardware availability.

## Referenced by
[[src/_MOC]] · [[src/Public/EventMaps]]
