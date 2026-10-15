---
type: module
fidelity: Active
tags: [module, presentation, carousel]
---

# BrowserConfig

## Purpose

Shared timing values for search, maps, location and a six-second hero-carousel interval.

## Interface

hero(frame, catalog) / heroCarousel(node), wired by data-feature="hero-carousel".

## Algorithm

Server emits the first scene and functional search. The browser rotates only backgrounds and the caption; search/navigation stay fixed. Selected dot uses aria-pressed. Each image must decode before activation; stale asynchronous selections are discarded.

## Negative Logic

No moving focus, live-region announcement every six seconds, remote image loading, personal data or inline scripts. No automatic motion with prefers-reduced-motion.

## Edge Cases

No JavaScript (first image and search work), failed image decode, rapid dot clicks, page hidden, keyboard focus, hover, explicit pause, reduced-motion change.

## Depth

MEDIUM: presentation boundaries; Constants are shallow immutable data.

## Grill Log

- **Q:** Does the entire hero move?
  **A:** No. Backgrounds crossfade; the cotorra, search form and navigation stay fixed. The caption and selected dot update together.
- **Q:** How does motion stay controllable?
  **A:** A labelled pause button persists user choice. Focus, hover and page hide suspend the timer; reduced-motion preference disables automatic rotation and fades.
- **Q:** How are failed/late image loads handled?
  **A:** Keep the current image until the next decodes. A selection ticket ignores stale completions.

## Referenced by

[[src/_MOC]] · [[src/View/Pages/Home]] · [[subsystems/Presentation]]

- **Q:** Why expand camera bounds beyond the island?
  **A:** The old 1.4-degree latitude bounds forced excessive minimum zoom on tall screens and cropped western/eastern activities. Bounds now cover the surrounding Caribbean while initial center and fit use Puerto Rico event data. No broader location permissions are granted.

MAP.clusterRadius is 56 screen pixels; overview clustering stops at MAP.clusterMaxZoom 13.

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** Camera query timing and focus zoom are shared constants. Viewport read requests are debounced; result radius never exceeds the server 200km bound. Location controls focus an area rather than an excessively close street. Resolved.

## Publishing recovery Grill Log
Resolved: GEO supplies high-accuracy12s and balanced10s requests, total25s deadline and100m approximate-warning threshold.

## Moving nearby and 3D Grill Log · #78
Resolved: grid, speed-zoom bands, 3D pitch and building zoom, and the 3D preference key are configuration values.

## Release0.5.0 Grill Log
Resolved: advance the linked local asset/cache graph from56to57together for the activity-cover release; no policy versions or third-party vendor bundles change.

## Place pin release Grill Log · #120
Resolved: advance only the changed module import chain, static stylesheet and worker shell to81. The offline shell never caches private pages. Place pins have a distinct route and no date/free label; tests execute actual projection and marker selection.
