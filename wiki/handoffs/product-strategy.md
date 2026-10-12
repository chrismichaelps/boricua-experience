---
type: handoff
tags: [handoff, product, places]
---
# Product strategy continuation

2026-10-12 · issue69 · feature/69-menus-media.

## Re-anchor
The recovered product-strategy session ends with0.3.0 releasePR68. Currentmain/dev3a87d40, assets52, category-aware places and reviews are present. Database catalogue has16original categories plus hospedaje. Existing place templates remain authoritative; no fake production places are permitted.

## Role transitions and ownership
Architect → Implementer: own menu/media database migrations and mirrors, then their typed adapters, owner workflows, detail/menu presentation and carousel reuse. Preserve current discovery, reviews and category validation. An independent reviewer examines each bounded increment before production application or promotion.

## Complete goal ledger
| Requirement | Current evidence / next work |
|---|---|
| Recover referenced session | Exact custom-title and final handoff read from local session; repo0.3.0 verified |
| Category-specific places | Existing category_fields and adaptive forms present; retain and extend across entire catalogue |
| Restaurant menus | Database foundation applied and verified in both environments; typed projections/adapter present. Owner/reader interface and documents remain pending |
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

## Delivery
Implement additive schema/API first with rollback and ownership/race tests, then integrate owner and reader flows. Apply reviewed migrations to both projects and compare contracts/permissions. Do not mark the overall goal complete until every ledger item has current-state evidence.

## Exact next action
Connect the menu adapter through services and mediator to a dedicated reader page and owner editor; then add private sanitized media and carousel presentation.

## Foundation evidence
Both projects have matching menu function hashes, ACLs, category capabilities and RLS-enabled tables with no direct API-role grants. Development rollback tests cover unknown/free/paid prices, nullable availability, stable IDs, stale revisions, invalid JSON, empty publication refusal, hidden/paused/category visibility, limits and foreign/duplicate child references. Parallel saves at the last daily quota slot admit exactly one; parallel edits with the same revision admit one and refuse one conflict. Test places, menus and test audit rows were removed; the existing development place and review remain. Production retains92activities,0places and0menus, with no seed rows. The existing actor/time audit index supports quota lookup. Independent review found no remaining database blocker. No menus or uploads are user-visible yet.

Pure validation passes327assertions, including7new menu contracts, and all18browser-script harnesses. Main, Function and menu adapter checks have no diagnostics; whole-tree formatting passes. Independent review reran the seven menu assertions. These harnesses are not device-based UI verification; reader/editor browser testing remains required when those routes exist.

Security advisors continue flagging the intentionally closed-table/RPC boundary:28tables with deny-all RLS/no policies,18public-read definer functions and60authenticated definer functions per project. New menu tables have no direct role grants and write RPC is authenticated/owner-authorized. Existing leaked-password protection warning remains; development also reports insufficient MFA options. No paid feature or authentication-setting change was introduced. Relevant guidance: [RLS policy lint](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy), [definer endpoint lint](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable), [password security](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
