# Source listing artwork · #185

Role: Architect → Implementer. Owns source-matched production media curation, ignored manifests/CSV, public credits and matching mirrors. Preserve other work and uploaded owner photos.

## Resolved Grill Log
Official 2026 BSNF feed establishes the season year; calendar pages establish dates, home/away teams, venues and published times. Keep prices/end times unknown. Refresh stable source IDs under the business administrator; no fabricated games or birthday data. Covers must originate on the same source page, per the user’s refinement. Do not publish alternative Commons photos reviewed before that refinement. Each stored file is read back and checked against SHA/size/MIME before trusted confirmation; lock parents and recheck default covers atomically. Keep source/rights provenance, no invented license.

## Progress
Production schedule transaction independently reviewed/applied:27upcoming games throughNovember7, including rescheduled Monarcas–Gigantes onNovember3. Existing owner uploads and unrelated events preserved.27 official home-team artwork uploads are in progress.

## Referenced by
[[handoffs/_MOC]] · [[src/Public/Photographs]]

BSNF cover confirmation independently reviewed after adding same-transaction parent locks/default rechecks.27/27 production upcoming fixtures now have ready uploaded official home-team artwork with exact SHA/MIME/size read-back. No existing uploads replaced; no schema/grant change. Broader same-source image audit found generic/unrelated OG images, which must be rejected or replaced with a matching image actually on that source page.


## Expanded operator curation
User refinement: use imagery from the original information source only.405 records are prepared:97events and308places. This includes upgrading27BSNF images from200px to600px on official linked club pages; the game URLs remain the listing source and club URLs record image provenance.99 source-photo/artwork entries and279 crisp official brand identifiers complete the batch; unrelated source previews and low-resolution Walmart/Starbucks artwork are excluded. The administrative import reserves pending media with an audit, preserves member upload limits/grants, and confirms only after read-back and same-transaction ownership/cover rechecks. Expected storage is about18MB within the existing bucket; no new service or plan.

## Image sizing
Browser evidence established opacity1/filter none; the visible defect was enlargement and cropping of small source artwork. Intrinsic framing preserves small/portrait/square images without artificial color changes; high-resolution landscape photos retain cover framing. Asset98.22 suites/773 assertions and every browser/timezone harness pass; independent presentation review clear.

## Verified publication and release handoff
405 source-matched covers are confirmed in production:97events and308places, including27BSNF600px upgrades. All405 stored artifacts passed SHA/size/MIME read-back; the405-row confirmation first passed a rolled-back transaction, then committed with parent locks, ownership/cover CAS and exact prior27-media replacement checks. Independent operator and UI reviews clear. No schema or member-upload-limit changes. Private review CSVs synchronized from production:138events and380places, with image source/SHA provenance and preserved pre-import backups. Low-resolution Walmart/Starbucks and unrelated source previews remain excluded. Next action: merge reviewed UI into dev and release0.15.1, then verify real production cards/detail views at390px and1280px.

## Live verification
Release0.15.1 is live at commit82d8fe9, matching server/static fingerprint4ebd7c365d7b. Browser checks confirmed600px BSNF artwork, opacity1/no filter, uncropped scale-down, map redraw admission placement and the original NPS ElMorro photograph/gallery. Phone verification revealed an older mobile override that turns map results into large tiles; issue188 corrects that stylesheet to96×108 thumbnails beside copy. The independent review is clear and22suites/773assertions plus all browser/timezone harnesses pass. Next action: promote the reviewed compact phone-map correction and verify its live mobile/desktop rows.
