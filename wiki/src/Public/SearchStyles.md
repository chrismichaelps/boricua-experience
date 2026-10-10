---
type: module
fidelity: Active
grammar: "[[grammar/styles]]"
tags: [module, presentation, search]
---

# SearchStyles

## Purpose

Search segments, option panels, query suggestions and responsive bottom sheets in public/assets/css/search.css.

## Interface

Loaded after home.css by [[src/View/Layout]], anonymously precached at asset version 7.

## Algorithm

Rounded white search pill with muted labels, separated segments and soft focus/hover highlights. Desktop has three columns from 700px; phone fields stack to preserve complete values. Dialog top-layer styles provide large option buttons, selected indicators and filtered lists.

## Negative Logic

Do not hide selects until JavaScript has successfully enhanced them. No clipped mobile values or controls beneath the fixed tab bar.

## Edge Cases

Keyboard focus, 320px screens, safe area, long municipality/date labels, reduced motion, missing JavaScript.

## Depth

MEDIUM: shared presentation boundary.

## Grill Log

- **Q:** How is progressive fallback visible?
  **A:** Only .picker-native enhanced selects are visually hidden; remaining native selects retain improved pill styling.
- **Q:** How does mobile resemble an app?
  **A:** Full-width segmented fields open an accessible bottom sheet, with a close control, search and large choices above the device safe area.

## Referenced by

[[src/_MOC]] · [[subsystems/Presentation]] · [[src/Public/SearchPickers]]

Independent review resolutions: Enter inside municipality search selects the first visible choice and never implicitly submits the surrounding form; empty results remain open. Default Soon is omitted to preserve server relevance for text searches. Keyboard-visible focus restores the segment outline.

Browser verification: first Escape closes the dialog even from a search input. Positioned field wrappers contain hidden select/label boxes so they cannot widen the mobile document.
