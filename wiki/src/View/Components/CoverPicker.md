---
type: module
path: "@root/src/View/Components/CoverPicker.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
depth_status: SHALLOW
tags: [module, covers]
---

# View.Components.CoverPicker

## Purpose

Radio tiles on the activity and place forms: the category default and seven themes, each previewing its artwork. The service sets the chosen theme after publishing through `public.set_cover_theme`, which never replaces an uploaded photograph.

## Interface

```pudu
export fn picker(frame, chosen, fallback, errors) -> H.Node
```

### Linkage

- **Consumed by:** [[src/View/Pages/EventForm]], [[src/View/Pages/PlaceForm]].

## Negative Logic (Prohibited Paths)

- ❌ A theme never replaces an uploaded photograph; an empty choice returns to the category default.

## Referenced by

[[src/_MOC]]

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.

## Own cover photograph · #176
The picker opens with a "Your photo" tile (hidden without scripts). `public/assets/js/features/coverPhoto.js` resizes and re-encodes the chosen file with the shared uploader's `preparePhoto` (camera and location metadata are dropped), refuses files over the upload limit, previews it, and stages the result in this browser through `coverStage.js` (IndexedDB, at most six hours). The form only posts `coverUpload=1`; the theme radio stays the category default so a listing without the photograph still has a cover. Clicking any background tile lets the photograph go. A form shown again with corrections restores the staged photograph; a fresh form clears it.

After a successful save with `coverUpload=1`, the event handlers redirect to `/e/:slug/cover?pending=1` and the place handlers to `/lugar/:slug/media?pending=1`. There the cover uploader (`mediaUpload.js`, `sendStaged`) declares, stores and verifies the staged photograph through the existing signed-upload path, clears it and returns to the listing. Without a staged photograph (another browser, expired) the cover page simply stays open for a manual upload.
