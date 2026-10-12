---
type: handoff
tags: [handoff, product, places]
---
# Product strategy continuation

2026-10-12 · issue69 · feature/69-menu-editor-form.

## Re-anchor
The recovered product-strategy session ends with0.3.0 releasePR68. Currentmain/dev3a87d40, assets52, category-aware places and reviews are present. Database catalogue has16original categories plus hospedaje. Existing place templates remain authoritative; no fake production places are permitted.

## Role transitions and ownership
Architect → Implementer: own menu/media database migrations and mirrors, then their typed adapters, owner workflows, detail/menu presentation and carousel reuse. Preserve current discovery, reviews and category validation. An independent reviewer examines each bounded increment before production application or promotion.

## Complete goal ledger
| Requirement | Current evidence / next work |
|---|---|
| Recover referenced session | Exact custom-title and final handoff read from local session; repo0.3.0 verified |
| Category-specific places | Existing category_fields and adaptive forms present; retain and extend across entire catalogue |
| Restaurant menus | Foundation applied/verified in both environments and mergeddevPR70. Dedicated bilingual reader integrated and browser-tested locally; owner editor, documents and deployment remain pending |
| Place/review photos | Pending: authorized private storage, sanitized images, moderation-aware read access, carousel and deletion lifecycle |
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
Build the owner menu editor with conditional saves and retained invalid drafts, then private sanitized image/PDF uploads and shared home-style header carousel with default imagery. Preserve all remaining goal ledger items.

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
