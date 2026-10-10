---
type: module
fidelity: Active
tags: [module, presentation, carousel]
---

# Carousel

## Purpose

Background rotation every six seconds with fade, manual dot selection, synchronized caption/href, pause, focus/hover/visibility suspension and reduced-motion support.

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

- **Q:** Can an old worker return configuration without the new carousel export?
  **A:** The main-to-carousel and carousel-to-config imports use version 3 URLs, so an old cache-first worker cannot substitute the prior unversioned modules. Both are in the new anonymous precache.


- **Q:** Does the entire hero move?
  **A:** No. Backgrounds crossfade; the cotorra, search form and navigation stay fixed. The caption and selected dot update together.
- **Q:** How does motion stay controllable?
  **A:** A labelled pause button persists user choice. Focus, hover and page hide suspend the timer; reduced-motion preference disables automatic rotation and fades.
- **Q:** How are failed/late image loads handled?
  **A:** Keep the current image until the next decodes. A selection ticket ignores stale completions.

## Referenced by

[[src/_MOC]] · [[src/View/Pages/Home]] · [[subsystems/Presentation]]
