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

## Credits layout Grill Log
Resolved: credits.html groups the unchanged six author/license/source attributions into spacious responsive cards, with derivative and endorsement notes separated from records. Dedicated credits.css owns spacing; no license or photographer identity is inferred or changed.

## Puerto Rican parrot Grill Log

- **Q:** Which photograph replaces the Río Grande slide and tile?
  **A:** `cotorra-photo.webp`, from USDA Forest Service photo 20230408-FS-PJK-6020 by Preston Keres, a public-domain work of the United States government. It shows a wild Puerto Rican parrot taking off with its blue flight feathers open. The Commons SHA-1 was matched before conversion. The El Yunque photograph remains on the auth page. Resolved.
- **Q:** How does text stay readable over a bright sky?
  **A:** The hero copy carries a soft radial scrim and a text shadow. Every slide benefits, and no photograph is altered. Resolved.

## Discovery photo and footer Grill Log
Resolved: open search uses the first database-ordered featured scene, a local responsive real photograph and unchanged named filters. Category/town landing behavior stays intact. Empty scene catalogs render usable search without a broken image. Footer has current-year copyright, quiet grouped links and phone touch targets; eligibility policy is unchanged. Photograph source, CC BY2.0 attribution, resizing and crop are recorded in public credits and THIRD_PARTY_NOTICES.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Release0.5.0 Grill Log
Resolved: advance the linked local asset/cache graph from56to57together for the activity-cover release; no policy versions or third-party vendor bundles change.
