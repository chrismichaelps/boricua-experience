---
type: adr
status: ACCEPTED
date: 2026-10-12
tags: [adr, media, security]
---

# ADR-0012 — Place photographs and menu documents

## Decision

- **Storage.** One public bucket, `place-media`, paths `<place>/<uuid>.<ext>`, at most 3 MB, WebP/JPEG/PNG and PDF only. Covers appear on every card and map pin, so signing a private address per card per render would cost a request per card; instead, the database lists only media of places the viewer may see, and removal deletes the file.
- **Authorisation.** No client storage policy exists. The owner reserves an upload through `reserve_place_media` (ownership, category capability, per-kind limits — 1 cover, 8 photos, 6 menu files — and 40 reservations a day). The server then mints a one-path signed upload address with the service key, which never reaches the browser.
- **Uploads bypass the function.** The browser PUTs the file straight to storage without overwrite, so request bodies stay within the function limit.
- **Verification.** Before a file is shown, the server reads it back with the service key and compares its size and leading bytes with the reservation (`pending_place_media`). A mismatch deletes the file and the record.
- **Sanitising.** Photographs are re-encoded in the browser to at most 1600 px WebP, which drops camera and location metadata. PDFs are opened from the storage origin, never this site, with `noopener noreferrer`.
- **Covers.** A confirmed cover becomes the place's `cover_url`, so cards, the map and the assistant use it; removing it restores the category illustration. The illustration is labelled as such and never stands for the venue.
- **Lifecycle.** Signed addresses live two hours. A daily cron (`/internal/media-sweep`, bearer `CRON_SECRET`, within the free plan's daily limit) drops reservations never confirmed and deletes stored files without a record that are older than three hours.
- **Menu documents never become structured facts**: dishes, prices and allergens come only from the menu editor.

## Rejected

- Private bucket with per-render signed reads (cost per card); base64 uploads through the function (body limit); member-token storage policies (the browser could write anything into its folder); paid image services.

## Consequences

A file a refused upload re-sends through its still-valid address stays unlisted until the next daily sweep. Advisors keep reporting the intentional closed-table and definer-function boundary.
