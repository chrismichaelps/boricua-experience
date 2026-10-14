---
type: module
fidelity: Active
tags: [module, view, achievements]
---
# View.Pages.Achievements
## Purpose
Profile → Achievements: every visible achievement as a responsive grid of square tiles, with category and unlocked filters, and one achievement's detail as a dialog or its own page. Unlock toasts appear on any page for signed-in members.
## Interface
`/achievements` with `?c=<category>` or `?c=unlocked`; `/achievements/<slug>`; `POST /api/achievements/signals` with `{signals: [{metric, key}]}`, answering `{unlocked: [...]}`. The account page links in; public profiles show up to twelve recent badges.
## Algorithm
- **Grid:** 3 columns on phones, 4 from 600 px, 5 from 960 px, 6 from 1200 px.
- **Locked tiles:** gray, at 42% opacity, with paused animations.
- **Unlocked tiles:** full color with active animations and a border in their rarity's color: common green, rare blue, epic violet, legendary gold.
- **Detail:** each tile holds its detail in a `<template>`; the script opens it in a dialog with the large animated badge, rarity, title, description, unlock date or progress bar, and season.
- **Badge drawing:** the script fetches each badge's SVG (versioned), removes `<style>`, scripts and handlers, and inlines it, so badges.css animates it.
- **Signals:** `features/achievements.js` sends the day's first visit, town and activity views, the map, radius searches, and `bx:action` events (3D view, camera turn, share, calendar, assistant).
- **Batching:** signals go in batches of up to twenty, and a form post sets a flag so the next page asks for unlocks.
- **Toasts:** each lasts about 4.8 s. The badge pops in over 0.62 s after an 80 ms delay. A four-note WebAudio chime starts with it, its brightest note landing as the badge reaches full size. The chime is silent under the accessibility toolbar's "mute sounds".
## Negative Logic
Without the script, tiles link to detail pages and nothing is recorded. The board never adds or changes rules: adding an achievement needs no change here.
## Edge Cases
Browsers start audio only after a gesture on the page, so a toast right after a navigation may be silent. Reduced motion keeps the toast as a fade, still badges, and no hover lift.
## Referenced by
[[src/Database/Achievements]] · [[src/_MOC]]
