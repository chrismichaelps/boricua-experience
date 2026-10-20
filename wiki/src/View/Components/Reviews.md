---
type: module
path: "@root/src/View/Components/Reviews.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view]
---

# View.Components.Reviews

> /** @View.Components.Reviews.Opinions — a place's rating summary, reviews, the review form, answers, and reports */

## Purpose

The reviews section of a place page.

## Interface

### Signatures

```pudu
export fn section
```

### Linkage

- **Requires:** [[src/Domain/Review]], [[src/View/Components/Form]].
- **Consumed by:** [[src/View/Pages/Place]].

## Algorithm

`sectionFiltered` adds filter chips (stars, companions) for places with three or more reviews, keeps the filter in the next-page link, and the form asks who the visit was with (#151).


Average with a bar per star count; the composer for members who may review (pre-filled with their own review, with delete), a note for owners, a sign-in link for guests; each review with the owner's answer, the owner's answer form, and a report form for other members. Stars are radio buttons styled in reverse order so the hovered and chosen stars light up without a script.

## Negative Logic (Prohibited Paths)

- ❌ Review text is always `says`; the owner never sees a review form for their own place.

## Referenced by

[[src/_MOC]]

## Report reason picker
The report form declares `search-pickers`, so the reason select opens the shared picker instead of the native list.

## Place discovery Grill Log · #132
Resolved: Expose a horizontal, keyboard-scrollable rail of at most six recent published reviews supplied independently by the database. Include every rating, preserve escaped text and link to the first review page for full reading. The full section retains composer, responses, reports and pagination; author avatars and date metadata are visible. No positivity selection or generated summaries.
