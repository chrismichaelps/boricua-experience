---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, browser, navigation]
---

# Account menu and bell

## Purpose

The header's account control and inbox bell: `public/assets/js/features/accountMenu.js` and `public/assets/js/features/bell.js`, with the markup in [[src/View/Layout]] and styles in [[src/Public/Styles]].

## Interface

`accountMenu(details)` wires `data-feature="account-menu"`; `bell(link)` wires `data-feature="bell"`. Both are registered in [[src/Public/BrowserMain]].

## Algorithm

The menu is a `<details>` whose summary is a pill with a menu icon and the member's face (a person icon for guests). On wide screens the panel is a 300 px popover under the pill. Below 960 px it is a full sheet with its own header and close button, and the globe button leaves the header because the sheet holds the language row. The script closes it on an outside tap, Escape (returning focus to the pill), the close button, or a page restore from the back-forward cache, and locks page scroll while the sheet covers a phone.

The bell carries `data-unread`. It rings twice, and its badge pops, only when the count is higher than the one this browser last stored under `bx-unread`; the stored count is updated on every page.

## Negative Logic

No navigation to the account page from the avatar; no menu that needs a script to open; no ring for a count already seen; no white hover blocks on the photo header.

## Edge Cases

Guests (sign in, create account, map, language), reduced motion (no menu or bell animation), touch devices (hover tints only where hover exists), the inbox page (badge hidden), storage unavailable (no ring, no error).

## Depth

SHALLOW.

## Grill Log

- **Q:** Why a disclosure element?
  **A:** It opens and closes without JavaScript and is announced as expandable; the script only adds dismissal and scroll locking. Resolved.
- **Q:** Why does the photo header no longer flash white on hover?
  **A:** Hover tints are translucent (ink at 6 % on white bars, white at 16 % on the photo header) and apply only under `(hover: hover)`, so a tap on a phone does not leave a lit square behind. Resolved.

## Referenced by

[[src/_MOC]] · [[src/View/Layout]]
