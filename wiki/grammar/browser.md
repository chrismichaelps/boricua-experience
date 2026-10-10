---
type: grammar
language: JavaScript (ES2022 modules)
tags: [grammar]
---

# Grammar — Browser scripts

Pages work without scripts; scripts add the native feel: the service worker, live location, the
map, install prompts, optimistic toggles, and instant search suggestions.

## Layers (`public/assets/js/`)

| Layer | Folder | May import |
| --- | --- | --- |
| constants | `constants/` | nothing |
| utils | `utils/` | constants |
| net | `net/` | constants, utils |
| features | `features/` | constants, utils, net |
| root | `main.js` | everything; wires features to the page by `data-feature` attributes |

## Laws

- ES modules only, no bundler, no framework; each file one concern, well under 500 lines.
- Magic values in `constants/`; no banner comments.
- Every request to the server carries `x-requested-with: boricua` and is same-origin; the server
  refuses state changes without it or with a foreign `Origin`.
- Geolocation starts only from an explicit tap and stops on toggle, page hide, or sign-out.
- Map tiles and the map library load only on pages with a map.

## Referenced by

[[grammar/_MOC]] · [[subsystems/Location]] · [[subsystems/Presentation]]

Pinned upstream animation code may live under `vendor/`; feature modules may import it directly. Optional Motion loading must not prevent existing feature startup if it fails.
