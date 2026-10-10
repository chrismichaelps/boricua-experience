---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, map]
---

# Event map surfaces

## Purpose

Render lazy event maps, approved participant positions and the publishing coordinate picker.

## Interface

public/assets/js/features/eventMaps.js; existing exported functions and UI data-feature contracts remain unchanged.

## Algorithm

Use versioned shared map configuration and loader modules to avoid a cached narrow-bounds configuration after upgrade. Initial center stays Puerto Rico; wider Caribbean camera bounds permit fitting the complete island and offshore municipalities in tall viewports.

## Negative Logic

No automatic geolocation or public participant disclosure. Map initialization does not change permission or privacy rules.

## Edge Cases

Narrow tall screens, event maps below fold, approximate locations for pending users, hidden participant pages and old module caches.

## Depth

MEDIUM: third-party map runtime and page boundary.

## Grill Log

- **Q:** Why change map imports?
  **A:** Versioned configuration/loader paths make the corrected camera bounds available to map, event and publishing surfaces after a cached-client upgrade. Exact/approximate location and coordinate-input rules remain intact.

## Referenced by

[[src/_MOC]] · [[src/Public/Explorer]]
