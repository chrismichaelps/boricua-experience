---
type: module
path: "@root/scripts/discovery-surfaces-test.mjs"
fidelity: Active
tags: [module, test]
---
# DiscoverySurfaces

## Purpose and interface
Execute actual MapSurface and HomeReadiness scripts with deterministic DOM/lifecycle doubles. Run node scripts/discovery-surfaces-test.mjs.

## Algorithm and edge cases
Check real busy status, expand/close labels, unchanged map identity, Escape with focus restoration and dialog precedence, pagehide cleanup, home photo/font readiness, root error, nonhome, rejected photo, timeout and user interaction.

## Negative logic
No production data, location permissions, fabricated network results or claims of physical iPhone validation.

## Grill Log
Resolved: test behavior rather than matching source text; synthetic coverage complements real responsive browser checks. Existing Explorer harness evaluates MapSurface too; no unexplained dependency stubs.

## Referenced by
[[src/_MOC]] · [[src/Public/MapSurface]] · [[src/Public/HomeReadiness]]

## Scroll intent
Asserts wheel, touch-move, scroll and key presses reveal the page and that the skeleton fades.

## Expanded selection regression · #124
Resolved: execute actual Explorer selection callbacks, asserting the selected-card class is exposed and cleared by canvas click. Real browser geometry checks cover control gaps and circular controls; simulated harnesses do not prove physical-device gestures.
