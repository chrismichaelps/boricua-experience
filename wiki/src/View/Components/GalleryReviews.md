---
type: module
fidelity: Active
grammar: "[[grammar/pudu]]"
---
# View.Components.GalleryReviews

## Purpose and interface
`render(frame, slug, board)` supplies bounded, escaped visitor-review context for the place image viewer.

## Algorithm
Filter published highlights and take at most six. Render author/avatar, rating, visit date when valid, an excerpt and canonical full-review link. Summarize real count/average only when present; empty preview state never invents reviews.

## Negative logic
No database calls, third-party content, photo/reviewer association, moderation actions or hidden review projection.

## Resolved Grill Log
Place reviews remain independent of photo selection. Sidebar labels make that relationship explicit. Reuse existing domain projection and i18n; no schema change or extra request.

## Referenced by
[[src/View/Components/PlaceGallery]] · [[src/_MOC]]
