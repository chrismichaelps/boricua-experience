---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, map]
---

# Map markers

## Purpose

Accessible price, participant and local-position markers plus accuracy geometry.

## Interface

public/assets/js/features/markers.js exports priceMarker, meMarker, personMarker and accuracyCircle.

## Algorithm

Create custom marker elements and attach MapLibre markers. Set the activity/price accessible label after addTo because MapLibre replaces it with a generic label. Selection is delegated to the explorer.

## Negative Logic

No public participant disclosure or automatic geolocation. Do not animate the marker transform: MapLibre owns positioning.

## Edge Cases

Keyboard activation, long activity names, same-price markers, empty initials and reduced motion.

## Depth

MEDIUM: browser map-library boundary.

## Grill Log

- **Q:** Why restore the marker label after addTo?
  **A:** The verified browser rendered every activity as “Map marker”; applying the title and price after MapLibre addTo retains meaningful keyboard/screen-reader identification.

## Referenced by

[[src/_MOC]] · [[src/Public/Explorer]]

Count markers use a blue 44px circle and translated accessible count label, restored by explorer after MapLibre addTo.
