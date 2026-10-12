---
type: handoff
tags: [handoff, product, places]
---
# Product strategy continuation

2026-10-12 · issue82 · feature/82-activity-covers.

## Re-anchor
The recovered product-strategy session ends with0.3.0 releasePR68. Currentmain/dev3a87d40, assets52, category-aware places and reviews are present. Database catalogue has16original categories plus hospedaje. Existing place templates remain authoritative; no fake production places are permitted.

## Role transitions and ownership
Architect → Implementer: own menu/media database migrations and mirrors, then their typed adapters, owner workflows, detail/menu presentation and carousel reuse. Preserve current discovery, reviews and category validation. An independent reviewer examines each bounded increment before production application or promotion.

## Complete goal ledger
| Requirement | Current evidence / next work |
|---|---|
| Recover referenced session | Exact custom-title and final handoff read from local session; repo0.3.0 verified |
| Category-specific places | Existing category_fields and adaptive forms present; retain and extend across entire catalogue |
| Restaurant menus | Foundation, reader, validation merged to dev. Owner editor (create/edit sections and dishes, retained invalid input, revision conflicts) implemented and browser-verified on dev; image/PDF documents and deployment remain pending |
| Place/review photos | Place covers, photos and menu files done (ADR-0012): reserve → signed upload → server verification → confirm, daily sweep, shared photo header. Development migrated and browser-verified; production migration and review photos pending |
| Activity category fields/place links | Pending implementation and validation |
| Waitlists/attendance | Pending implementation and concurrency tests |
| Organizer dashboard/analytics | Pending implementation |
| Ownership claims/verification | Pending implementation with no unverified self-claims |
| Follows/saved searches/For You | Pending implementation with database preferences and bounded ranking |
| Assistant grounded in places | Pending tool/projection and bilingual tests |
| Resend notifications | Pending essential-only transactional outbox/quota safeguards; signup stays independent |
| Place map pins/cards | Pending viewport-bounded place queries and category-aware rendering |
| Real production places | None reported in prior handoff; only verified/source-reviewed records may be added |
| Deployment/security/performance | Verify every increment via connected services; preserve Free plans and data; no paid password-security fallback |

## Menu/media resolved contract
Menu capability is a database category capability, currently food places. Photos apply to every applicable place/review category; they do not invent opening times or change place expiry. Structured menu rows retain unknown price asnull and explicit0 asfree, have sections and stable itemIDs, owner-only writes, revisions and bounded lists. Uploaded documents never become structured item facts automatically. Published/hidden/removed parent and review moderation control media reads. Upload credentials stay server-side. Menu/gallery presentation reuses the established rounded photo carousel rather than introducing unrelated branding.

User refinement: owners can upload menu images and PDFs in addition to structured dishes. Place/card and menu headers use uploaded background photographs in the same home carousel container; without an uploaded background use the established default asset. A default photograph is presentation, never evidence of that venue's food or facilities. Upload validation, access control and deletion lifecycle remain required before release.

All-category cover refinement: activities and permanent places in every supported category can replace their card background with an authorized uploaded photograph. Without an uploaded cover, or after its removal, use the existing category-specific default background. This applies consistently to discovery/search, own activity listings, map cards and assistant suggestions. Activity photo authorization belongs to the organizer; place photo authorization belongs to the owner. This expands the media work beyond restaurant/place-only headers and retains privacy/moderation controls.

## Delivery
Implement additive schema/API first with rollback and ownership/race tests, then integrate owner and reader flows. Apply reviewed migrations to both projects and compare contracts/permissions. Do not mark the overall goal complete until every ledger item has current-state evidence.

## Exact next action
Release 0.4.0 is merged to main (#81) and deployed to production (asset version 56): menu editor, place photos and menu files, save/like fix, moving nearby and 3D map. Production database has reaction_rules and the four place-media migrations with function hashes matching development; CRON_SECRET is set for the daily media sweep. Next: activity covers for every category (organizer-authorised, same reserve/verify/sweep pipeline), review photos, favorites and For You, waitlists, organizer tools, assistant grounded in places. Preserve all remaining goal ledger items.

## Release 0.4.0 evidence
Each PR was reviewed before merge and its findings fixed (#77 reaction feedback; #75 authorize-before-decode, duplicate error, labels; #80 curated cover, typeless PDF, literal cover check migration, sweep headers; #79 remembered-3D framing, speed-zoom hysteresis, 3D harness). Release branch: 11 suites, 409 assertions, 28 harness passes. Production smoke: pages 200, assets v56, sweep route 404 without the secret, guest like links to sign-in, 3D switch present, identical map area MISS then HIT at the edge cache, zero error-level logs in the first ten minutes.

## Media evidence
Development: three media migrations applied; rolled-back RPC checks (PDF cover refused, ninth photo refused, cover replacement and cover_url, non-owner refused, hidden place unreadable to others). Browser: 2400×1500 JPEG stored as 1600×1000 WebP without EXIF, cover_url updated; menu PDF listed with label and noopener; removal clears record, file and cover_url; a disguised HTML upload is refused and deleted; its re-sent file was removed by the sweep while the real PDF stayed. Sweep route: 404 without or with a wrong secret. Full suite 11 suites, 406 assertions, all harnesses including media-upload.

## Owner editor evidence
`/lugar/:slug/menu/edit` (GET/POST) verifies the editable parent and owner board before selecting a menu. Structural commands (add/remove/move sections and dishes) re-render the retained draft without writes; only `do=save` calls the conditional save. Full suite 391 assertions in 10 suites, including 22 field-decoding and 7 editor rendering checks. Dev browser run: new menu → add section → add dish → invalid price plus allergens checked while undeclared refused with every value retained → corrected save rendered in the reader → stale revision refused with draft and submitted revision kept and a link to the current version; 320px width without overflow, structural buttons at least 44px. Test place "Prueba dev: menú del editor" (created by the signed-in development seed account) was hidden afterwards; its draft menu remains in dev only. Menu messages moved to I18n.EsMenu/EnMenu after the Spanish catalogue reached the parser list limit.

## Foundation evidence
Both projects have matching menu function hashes, ACLs, category capabilities and RLS-enabled tables with no direct API-role grants. Development rollback tests cover unknown/free/paid prices, nullable availability, stable IDs, stale revisions, invalid JSON, empty publication refusal, hidden/paused/category visibility, limits and foreign/duplicate child references. Parallel saves at the last daily quota slot admit exactly one; parallel edits with the same revision admit one and refuse one conflict. Test places, menus and test audit rows were removed; the existing development place and review remain. Production retains92activities,0places and0menus, with no seed rows. The existing actor/time audit index supports quota lookup. Independent review found no remaining database blocker. No menus or uploads are user-visible yet.

Pure validation passes327assertions, including7new menu contracts, and all18browser-script harnesses. Main, Function and menu adapter checks have no diagnostics; whole-tree formatting passes. Independent review reran the seven menu assertions. These harnesses are not device-based UI verification; reader/editor browser testing remains required when those routes exist.

Security advisors continue flagging the intentionally closed-table/RPC boundary:28tables with deny-all RLS/no policies,18public-read definer functions and60authenticated definer functions per project. New menu tables have no direct role grants and write RPC is authenticated/owner-authorized. Existing leaked-password protection warning remains; development also reports insufficient MFA options. No paid feature or authentication-setting change was introduced. Relevant guidance: [RLS policy lint](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy), [definer endpoint lint](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [password security](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).

## Reader evidence
Place pages query the optional viewer-authorized board through the mediator and display a dedicated /lugar/:slug/menu link based on database capability. The reader distinguishes unknown/free/paid facts, labels unavailable dishes and owner drafts, escapes all content and marks private/empty pages noindex. Eight rendering regressions raise the full suite to335assertions; all18script harnesses pass. The generated bilingual fixture includes all25menu keys. Independent review reran143presentation assertions and the worker harness; its long-name overflow finding is fixed.

Real isolated Chrome testing followed the parent menu link to live development dishes, switched English to Spanish, found no console/page errors, and checked80-character unbroken names at320/390px with document widths equal to the viewport. The first test session had cached an earlier stylesheet; a fresh isolated session confirmed the current wrapping rules. Missing places return404; existing empty food menus return200 with noindex. Only the newly created test menu and its audit row were removed, leaving the original development place/review untouched. No production data or schema changed in this reader increment. Media uploads, default header background, carousel and owner editing are required follow-up work; none is claimed complete.

## Owner validation evidence
Raw nested drafts preserve stable IDs, unknown prices and declared allergen uncertainty. Validation rejects malformed prices, duplicate IDs, unsupported protocol values and published empty menus before a conditional save. UTF-8 JSONB document-size accounting matches the database separator overhead. The owner service never retries a write. Independent review is clear after the byte-size correction; all156source checks,362assertions and formatting pass. Owner HTTP forms, uploads and default/photo carousel remain pending; these validation modules alone do not expose editing controls.

## Current production source audit
The25BSNF games match the official calendar feed for UTC start and team order, with both calendar pages inspected. The22town/wellness recurrences match the published schedule. Of43reservation listings,42start times and published durations match the current organizer pages. One reservation page now offers no dates; its existing record was reversibly held as draft rather than reported canceled. The fragrance expo dates and end time are supported by its organizer. All91curated database records match the ignored reviewed CSV after that hold; the existing native publication remains untouched. This verifies schedule and CSV parity, not every source fee or venue-coordinate claim. Further source-field and photo-permission review remains pending. No third-party logo or event image has been published without an established reuse basis.

Private audit receipts, source snapshots and the reviewed CSV remain ignored, with restrictive filesystem permissions. They must not be copied into commits or pull requests. Photography credits spacing is merged into devPR73 with all six attributions and16external links retained; isolated Chrome verifies two columns at1280px and one at390px without overflow. Production application deployment remains pending.

The follow-up price audit inspected activity-specific pricing popups rather than the generic site information. Three booking types had incorrectly inherited the generic15USDcost. Sixteenproduction occurrences were corrected atomically under owner/source/old-value/timestamp guards: three now20USD and thirteen40USD. Matching public-detail RPC prices were verified for all16. The ignored CSV, private backup, source recheck snapshots and audit receipt were updated; no dates, identities or native publications changed. Menu validation is mergeddevPR74; the next branch owns actual owner forms and routes.

## Owner menu and features re-anchor
The newer session title is “Boricua Experience owner menu and features”; its session54a1a1c4-d65e-47ac-aeb9-bec5c97317e0ends during activity-cover testing. Worktree branchfeature/82-activity-covers contains that unfinished work; v0.4.0 is the current release. Historical evidence above remains labeled by increment, rather than treated as current deployment proof.

Current ordered backlog: activity covers for every category; review photos; favorites/For You; waitlists; organizer tools; assistant place grounding. Earlier category activity facts, ownership claims, essential emails and real production places remain tracked in the complete ledger.

Activity-cover implementation is present with independent review corrections: trusted server confirmations for both place/activity pipelines, pending-only invalid cleanup, storage-read failures preserved, route/media identity binding, parent/media rechecks and actor-wide serialized quota. Development migrations event_covers, media_confirmation_boundary, pending_media_cleanup and confirmation_cutover are applied. Rollback tests reject null/PDF type, wrong event, missing object, removed stale IDs and member confirmation; replacement and dynamic category fallback pass. Overlapping event/place reservation requests at39admit exactlyone and refuse the otherPT429; temporary audit/media fixtures are removed. Full417assertions and28harnesses pass before the additional source-cover rendering assertion; whole-source checks170modules passed. Source-cover presentation now avoids claiming real supplied photos are illustrations. Further browser verification is pending: local app catalog reads time out even though direct authenticated categories requests succeed. The local development process is live; do not restart solely on observation timeouts.

Production has not received these changes yet. Prepare additive RPCs before deploying privileged callers, then remove legacy member-confirm grants immediately after deployment; compare function hashes, ACLs and RLS in both projects. No public production testing data or files were added. Exact next action: resolve the local dependency timeout and verify upload/replace/remove in desktop and phone browser, then finish the reviewed activity-cover PR and production cutover. Preserve every remaining backlog item.
