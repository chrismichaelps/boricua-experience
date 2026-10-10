---
type: module
fidelity: Active
tags: [module, presentation, photography]
---

# Real Puerto Rico photography

## Purpose

Replace generated destination assets with genuine photographed Puerto Rico places for the hero, destination tiles and auth story.

## Interface

Four versioned local WebP photographs under public/assets/img plus credits.html and PHOTO-CREDITS.md. Existing generated files are removed once references move to real filenames.

## Algorithm

Verified Commons description pages establish location, author and license. Download originals, resize without altering depicted content, convert to WebP, document checksum and transformations. Public credits link authors, source pages and licenses.

## Negative Logic

No synthetic scenes, invented landmarks, third-party runtime image requests, uncredited reuse, or claim that photographers endorse the app.

## Edge Cases

Portrait/mobile object-fit crops, caption-place correspondence, offline shell upgrades and licenses with attribution/share-alike obligations.

## Depth

MEDIUM: asset provenance and presentation boundary.

## Grill Log

- **Q:** How do these photos meet the user request?
  **A:** Documentary camera photographs of Luquillo, Viejo San Juan, El Yunque and Culebra replace all generated hero/tile/auth imagery. Attribution and license links remain available through a compact footer link. Resize/WebP conversion and display crops are declared; the El Yunque derivative retains CC BY-SA 4.0.

## Referenced by

[[src/_MOC]] · [[src/Public/Styles]] · [[src/View/Components/Footer]]

## Puerto Rican parrot Grill Log

- **Q:** Which photograph replaces the Río Grande slide and tile?
  **A:** `cotorra-photo.webp`, from USDA Forest Service photo 20230408-FS-PJK-6020 by Preston Keres, a public-domain work of the United States government. It shows a wild Puerto Rican parrot taking off with its blue flight feathers open. The Commons SHA-1 was matched before conversion. The El Yunque photograph remains on the auth page. Resolved.
- **Q:** How does text stay readable over a bright sky?
  **A:** The hero copy carries a soft radial scrim and a text shadow. Every slide benefits, and no photograph is altered. Resolved.
