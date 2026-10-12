---
type: handoff
tags: [handoff, presentation]
---

# Homepage refresh

2026-10-09 · existing feature/1-boricua-experience-mvp · issue #1.

## Carousel continuation

User requested automatic header background rotation and lower-right caption/dots. Architect → Implementer: own Constants/Hero, View/Components/Hero, Home, carousel.js, main.js, browser config, home.css, image assets, translations, cache version and carousel tests.

## Role transitions and ownership

Architect → Implementer: own View/Layout, View/Pages/Home, View/Components/Search, Constants/App, homepage CSS, coqui assets, font and service worker. Preserve previous uncommitted wiki work.

## Resolved design

Rounded full-width Puerto Rico photo hero with white overlay navigation, handwritten brand and original coqui. Preserve all activity routes and search names. Mobile search stacks and retains the tab bar. Offline navigation must not store personalized HTML.

## Validation and review

Implementer → Independent Reviewer: a separate reviewer examined presentation, offline caching and map/location integration. Three findings (session-bearing precache, footer contrast, hidden-page restart) were fixed; independent reruns of both browser-lifecycle test scripts pass. Reviewer → Implementer: no outstanding findings in the reviewed scope.

- Every source module checked with the pinned Pudu 0.1.3 release: no diagnostics.
- Full Pudu suite: 6/6 suites, 116 assertions. New output tests cover header failures, escaped search input, bilingual controls and retained map filters.
- Worker and location harnesses: pass anonymous install, private-navigation exclusion, cache cleanup, offline fallback, duplicate starts, off/hide and hidden restart.
- 26 local route smoke checks pass: discovery, category/town landing, filtered map and nearby pins, suggestions, sign-in/up/recovery screens, legal pages, sitemap/robots/manifest/offline/health, 404 and five sign-in guards.
- Browser: desktop 1440×900 and mobile 390×844 have no horizontal overflow; search for salsa retains one matching event when opening the map; language and necessary-cookie forms work on the configured localhost origin.
- Changed Pudu files pass formatting; repository-wide formatting still reports pre-existing violations elsewhere. No baseline was silently reformatted.
- Supabase project is healthy; all 41 RPC names declared by Constants.Supabase exist among the 42 public functions. No schema mutation was needed.

## Remaining integration boundaries

Authenticated publishing, request/approval, account lifecycle, actual device geolocation permissions, Google OAuth (currently disabled in the Supabase project settings) and recovery-email delivery were not executed in this pass. Price filtering currently offers free-only; the model's maximum-price field and configurable search radius lack UI integration. Deployment helper scripts referenced by DELIVERY are absent. Existing Supabase advisor warnings include disabled leaked-password protection and executable SECURITY DEFINER functions; these require review of the deliberately RPC-only authorization contract before any production claim.

## Next action

On a designated physical test device, verify the explicit geolocation permission and nearby-results journey. Completed authenticated evidence and remaining boundaries are recorded below.

## Referenced by

[[handoffs/_MOC]]

## Lower-page refinement

Architect → Implementer: own View/Components/Footer, Layout footer integration, Home destination directory, translated footer labels and home.css. Preserve all search/activity routes and prior edits. Resolve presentation review independently before completion.

## Final carousel and footer evidence

Implementer → Independent Reviewer → Implementer: reviewed the rotating hero, stale-cache module linkage, lower homepage and new footer. Versioned carousel/config imports fixed the old-cache upgrade finding. App-bar-scoped white brand rules fixed the footer contrast finding. Reviewer confirmed both resolved with no outstanding findings in the assigned scopes.

- Four generated Puerto Rico scenes rotate every six seconds; synchronized place links and dots verified in the live browser, including manual selection and pause.
- Hero/browser lifecycle harnesses and real ES-module old-cache linkage regression pass; worker and location checks still pass.
- Full suite: 6/6, 116 assertions; translation fixture now contains 553 keys. Changed Pudu files are formatted and git diff --check is clean.
- Desktop 1440×900 and mobile 390×844 show no horizontal overflow. Mobile date control fits its default caption. Footer has four desktop/two mobile columns and readable coqui branding. Native municipality expansion exposes all 78 entries; live browser has no console errors.
- Local preview left running at http://localhost:8080; generated scenes are explicitly disclosed in the footer. No backend/auth settings changed.

## Search control refinement

Architect → Implementer: own View/Components/Search, new searchPickers.js and search.css, Layout assets, BrowserMain registry, asset/cache version, translation labels and presentation regressions. Preserve existing search fields and result auto-submit; independently review modal accessibility and retained query state.

## Final search-control evidence

Implementer → Independent Reviewer → Implementer: app-style picker review resolved implicit Enter submission, default relevance sorting and query focus visibility. Final review confirmed Escape dismissal, containment of hidden native controls, visible keyboard focus and decorative dividers; no outstanding findings in the bounded search scope.

- The reference app was browsed directly: segmented input highlights and dedicated date panels informed the interaction. Boricua retains its own municipality catalogue and existing date windows.
- Shared pill and result filters progressively enhance named selects; no-script fallback remains. The main pill preserves category/free/sort/coordinates, while omitted default Soon retains server relevance for text queries.
- Live browser: accent-insensitive town lookup, Enter selection without submission, empty-result Enter, Escape focus restoration, date choices, results auto-submit and retained category/town/window verified. Query suggestions returned the matching salsa activity. Mobile document is 390px wide without overflow; keyboard dialogs render above the mobile tab bar. No console errors.
- Full suite: 6/6, 121 assertions; translation fixture has 556 keys. Worker, carousel/module upgrade, location harnesses, JS syntax and changed-source formatting pass. Asset version 7 invalidates the refreshed entry/styles/picker; existing carousel dependencies retain version 3.
- Preview remains at http://localhost:8080/c/cultura. Authenticated integration boundaries and the next action above remain unchanged.

## Native motion and authenticated flow review

Architect → Implementer: own optional Motion feature/vendor, experience.css, auth presentation, coqui/Google assets, category fallback covers, picker transition events, Layout assets, main optional startup and asset version. Preserve all unrelated work. Use existing seeded accounts for authorized test journeys; do not mutate passwords, user consents or auth provider configuration. All implementation must receive independent review.

### Real photography, footer and map refinement

Architect → Implementer: own footer/translations, local destination assets/credits, bounded map sheet behavior and experience styles. Replace generated scenery with verified real photos. Keep blue/neutral brand surfaces, compact footer rows and accessible map selection. Independent review and desktop/mobile map evidence follow.

### Final motion, photography, map and authenticated evidence

Implementer → Independent Reviewer → Implementer: independent review resolved missing CSS photo replacements, zero-width auth photo, clustered-marker accessible labels, and keyboard focus after regrouping. No outstanding findings in the reviewed scopes. Final attribution-link check also corrected HTML static content type; independent reviewer confirmed the fix and mirror with no outstanding issues. The live credits page renders all four photographer/license/source entries.

- Existing confirmed development accounts verified email/password sign-in, account save, activity tabs, saved/liked toggles, open join and withdrawal. Seeded activity counts and toggles were restored. No credentials, consent, passwords or auth provider configuration changed.
- Created a clearly labeled private flow-test activity, verified failed-form diagnostics, valid publishing, editing, attendee request, organizer approval, both notifications, exact-location reveal only after approval, withdrawal and organizer cancellation. The fixture remains private and canceled for audit; no public event was created.
- Official Motion 14.1.0 is vendored with license/provenance; optional import failures cannot block core features. Actual mobile picker entrance transforms observed, then settled. Reduced-motion and visibility/bfcache paths covered by harnesses.
- Four verified real photographs from Wikimedia Commons now supply hero, destinations, auth and nearby promo. All images load in the live page. Source/author/license and hashes recorded in public credits; generated destination files removed. Footer has expanded bilingual copy, no AI notice, and 32px desktop rows with mobile touch targets retained.
- Map at 390px groups all 39 results into six overview clusters; tapping drills into prices without losing activities. Expanded sheet grows from 236px to 544px. At 320px and 390px there is no horizontal overflow. Desktop map begins beside the compact list and shows the whole island. Category links retain the three culture results. Keyboard cluster zoom restores focus to a connected regrouped marker. No map console errors observed.
- Pudu check passes; full suite 6/6 with 129 assertions. Motion, carousel, location, service-worker and map-cluster JavaScript harnesses pass; edited JS syntax and git diff whitespace checks pass. Translation fixture has 559 keys. Asset/cache version is 13; unchanged carousel dependency version remains 3.
- Google OAuth remains disabled in Supabase. Physical-device GPS permission, recovery-email delivery, account deletion/export and production deployment remain unverified. Earlier historical integration-boundary notes are superseded by the authenticated evidence above. Price/radius UI and Supabase advisor warnings remain outside this presentation pass.

## Mobile auth and viewport discovery continuation

Architect → Implementer: own Auth shell/experience.css, explorer/live/mapViewport, nearby radius parsing, shared versioned imports and bounded regression harnesses. Preserve other work. Header alone renders the brand. Test visible map results, location failure/retry and mobile forms independently; no real registration agreements or account deletion.

### Final mobile auth / viewport discovery evidence

Implementer → Independent Reviewer → Implementer: independent review found and resolved restored-page subscription loss, stale state after awaited sharing-off, and cached-camera aria-busy cleanup. Independently reran explorer/location/viewport harnesses successfully.

- Mobile 390px login visibly contains the real forest photograph around the white form; registration grows to 1058px with all controls inside the photograph, without horizontal overflow. Duplicate form logo removed; global header brand remains. Email/password sign-in returns to /map as requested. No registration agreements accepted.
- Browser: map zoom changed 38 overview activities to 2, then panning exposed 17; marker member totals matched list/count at each settled view. Desktop zoom exposed 13. A real obstruction was found: mobile sheet covered zoom buttons and clicks could hit a card. Zoom controls now sit above the reserved sheet area and have 44px targets.
- Geolocation activation in this browser returned no usable device coordinates; pending state cleared to inactive after failure. Production-code harness verifies successful coordinate arrival before/after map readiness, marker placement/label, centering once, no position sharing during local locate, failure/retry/off, camera movement, retained filters, late responses and BFCache reconnection. Hardware position success is not claimed.
- Full Pudu suite 6/6, 130 assertions; Pudu check no diagnostics. Seven JS harnesses pass: motion, carousel, service worker, location, clusters, viewport geometry and explorer integration. Whitespace and edited-JS syntax checks pass.
- 26 anonymous discovery/auth/legal/offline/credits/guard entry points respond successfully. Nearby API read tests pass for narrow/default/max/negative/malformed/oversized radius; invalid coordinates return the existing JSON Refused/409 contract. No schema or provider settings changed.
- Earlier authenticated create/edit/request/approve/location reveal/notification/withdraw/cancel journey remains recorded above. Recovery email delivery, Google OAuth configuration, physical GPS success and destructive account flows remain unverified.

Exact next action: verify a permitted physical-device location reading, local blue marker and nearby results on the designated test device.

Independent review additionally confirmed responsive camera padding and reduced-motion sheet toggles; no outstanding findings in the assigned scope. Final desktop drill-down shows 14 visible activities with exactly 14 marker members and 14 cards. Final cache graph is version 16.

## Native mobile interaction and server spatial reads

Architect → Implementer: own haptics/sheet gestures/Motion, bounded map request transport/cache, typed viewport records and dedicated map RPC through existing discovery seam. Preserve other work and private schema files. Independently review RPC privacy/index/limit behavior before applying and all interaction/lifecycle changes before completion.

### Final native-mobile and spatial evidence

Implementer → Independent Reviewer → Implementer: all findings resolved. Reactions serialize their shared group; map truncation reaches a bilingual notice; horizontal rejected handle drags suppress subsequent clicks. Motion restores original inline styles and never transforms the fixed participation bar's ancestor. Independent interaction/Motion/explorer reruns pass; mirrors match.

- Explicit user approval obtained before applying the additive map_events RPC. Remote migration applied successfully. Guest/member grants retain existing public-only event and coordinate policy; no table/RLS changes.
- Camera queries use the visible rectangle, exclude sheet-covered pixels, cap cards at60 before detail joins, and return a limited flag. Out-of-island cameras return empty. Existing partial GiST index is used by populated (bitmap index) and empty (KNN index) EXPLAIN ANALYZE reads. This is index/query verification on existing data, not a million-user load benchmark.
- Live API: populated15, empty0, outside0, category+free1; inverted/NaN coordinates refused409. RPC limit2 returns2 and limited=true.
- Phone requests debounce300ms, cancel obsolete transport, reject stale responses and cache at most8 recent viewports for30 seconds. Initial island payload remains capped.
- Trusted actions use optional short vibration with cooldown, hidden/reduced-motion guards and safe unsupported fallback. Motion press/checkbox/sheet feedback remains progressive enhancement. Touch/pen sheet swipes operate only on the44px handle, preserving native list scrolling, keyboard clicks and desktop behavior.
- Actual browser:320/390/430px layouts have no horizontal overflow; anonymous320px auth real photograph surrounds the form. Mobile map zoom updates cards/count, and expanded sheet is operable. Activity participation bar now sits at635–780px on390×844, above the tabbar; event ancestor transform is none. Earlier whole-event entrance transform incorrectly trapped the bar and was corrected.
- Full suite6/6,130 assertions; eight JS harnesses pass (carousel, explorer, interactions, location, clusters, viewport, Motion, worker). JS syntax and whitespace checks pass. Cache graph version18. Local preview remains running atlocalhost:8080.
- Physical GPS/vibration and million-user capacity remain unverified. iPhone Safari cannot promise Vibration API support.

Exact next action: verify GPS, swipe handling and supported vibration on the designated physical phone; then measure dense-region load in a representative isolated benchmark environment.

Final soak refinement: ignore bubbled card transitions; only sheet height/max-height transition completion updates camera padding. Regression added. This stops the observed automatic request loop. Final cache version19 supersedes18. Local preview uses the4096 development connection allowance; no production runtime settings changed.

Independent final review confirmed the transition boundary; explorer regression passes with no outstanding finding. Browser soak now settles after initial/resize/sheet requests (three requests rather than a continuous loop); expanded390px sheet is544px high with27matching cards/count and no console errors.

## Parrot branding and account lifecycle audit
Architect → Implementer: own parrot brand/search/PWA assets, curated icon geometry/provenance, privacy controls/Motion, cache graph and mobile account-flow tests. Preserve unrelated work; independent review required. Real receiving disposable inbox created for email testing; no credentials recorded in repository.


## Hosted Google OAuth configuration

- Explicit approval obtained for Google API Services User Data Policy and the remaining OAuth credential/provider/public-audience configuration. Google Cloud project `boricua-experience-auth` created; web client `Boricua Experience Web` created. No billing enabled.
- Google JavaScript origins: `https://boricuaexperience.com`, `http://localhost:8080`. Sole Google redirect: `https://vkomwdhlheneumhykgus.supabase.co/auth/v1/callback`.
- Hosted Supabase Google provider saved and independently reopened: enabled, client populated, secret masked, nonce checks retained, missing-email accounts disallowed. Secret stored only in hosted provider; no Google secret added to app .env or repository.
- Supabase site URL is `https://boricuaexperience.com`; exact redirect allowlist contains production `/auth/callback` and `http://localhost:8080/auth/callback`. Google consent branding links use production home, `/privacy`, `/terms`; audience confirmed In production.
- Chrome login-form Google button reached Google account selection with email/profile scopes, then returned to local `/welcome?return=/` with authenticated Profile/Notifications navigation and the Google name. App age/Terms/Privacy checkboxes remain unchecked; user onboarding consent is not claimed.
- Production domain was registered but had no connected Vercel project at inspection. Production hosting/legal pages and production-endpoint login remain unverified; local .env retains localhost for correct development PKCE callbacks.

Exact next action: finish and independently review the in-progress parrot/privacy asset changes, then continue disposable-account recovery testing using the now-allowlisted local callback.

## Avatar upload (parallel session)

Architect → Implementer (separate session): own the avatar feature end to end — `supabase/migrations/20261010013000_avatars.sql` (public `avatars` bucket, per-account folder policies, `set_my_avatar`, avatar fields in `event_attendees` and `event_requests`), Constants.Supabase avatar names, Api.Account avatar calls, Validation.Avatar, Services.Account/Privacy avatar steps, App avatar kinds, Web.Handlers.Account avatar routes, View.Components.Avatar photo rendering and its call sites, the account-page uploader, `public/assets/js/features/avatarUpload.js`, one registry line in `main.js`, and the avatar translation keys. No edits to explorer, map, location, carousel, search pickers, or Motion files.

- The local map migration file was renamed from `20261010002819` to `20261010003351` to match the version already recorded remotely; contents are identical. `supabase db push` works again for every session.
- An earlier commit (`6e88b5f`) from this session swept the then-uncommitted homepage, map, and branding files into history with `git add -A`; nothing was reverted or altered.

### Avatar evidence

- Migration `20261010013000_avatars.sql` applied. Mobile 390px: a generated 900×600 test image picked through the real file input was cropped to 320px, stored under the member's own folder, and shown at once in the editor and app bar; after reload it rendered in the attendee list and stack. Removal cleared the pointer and deleted the stored object (bucket count 0). Seed state restored.
- Settings round trip: attendee-list opt-out saved and persisted; from another member's view the opted-out attendee counted as hidden; setting restored.
- Location: a simulated reading re-centred the map on the position with the blue marker, and the viewport query refreshed the list.
- Full suite 6/6 (136 assertions); every module checks clean; translation fixture 569 keys. Asset version 21.

## Production deployment (parallel session)

Architect → Implementer (separate session): own `scripts/fetch-runtime.sh`, `scripts/build-vercel.sh`, `scripts/dev.sh`, `vercel.json`-free Build Output routing, the Vercel project, its environment variables, and the production domain connection. No edits to application presentation files.

### Deployment evidence

- `scripts/fetch-runtime.sh` downloads the v0.1.3 musl Lambda runtime and libraries and verifies the release checksums; `scripts/build-vercel.sh` writes the Build Output (static assets with immutable caching, `sw.js` revalidated, one `provided.al2023` function); `scripts/dev.sh` runs the local server.
- Vercel project `boricua-experience` created; production variables `BORICUA_SUPABASE_URL`, `BORICUA_SUPABASE_ANON_KEY`, `BORICUA_SUPABASE_SERVICE_KEY`, and a production-only `BORICUA_SESSION_KEY` are encrypted project variables; the site URL and log format travel with the function.
- Production deployment answers `/health`, `/`, `/map`, search, the sitemap, an event page, assets, favicon, and manifest with 200; guest pages are cached at the edge (`x-vercel-cache: HIT`); security headers present.
- `boricuaexperience.com` serves production over HTTPS; `www.boricuaexperience.com` redirects with 308 to the apex.

## Location, parrot and town browser (parallel session)

Architect → Implementer (this session, while the other session is idle): owns `public/assets/js/features/explorer.js` location framing, `eventMaps.js` pin-here, `cotorra-search.svg`, `cotorra-photo.webp`, the home town browser (`View.Pages.Home.directory`, `Domain.Catalog.REGIONS`, `home.css` directory rules), the hero copy scrim, photo credits, and the asset/cache version bump to 22. Any session resuming homepage work starts from these files as they are now.

Exact next action: deploy version 22 to production and verify location follow mode on a physical phone.

## Development continuation — 2026-10-10

Architect → Implementer → Independent Reviewer → Implementer. Recovered Claude session Boricua Experience PWA (5d112371-dddf-40bd-b475-58adf451f232). Own mobile menu CSS, refreshed map dates, explorer regressions and cache graph. Development project mywghuwpkhbjdqyeuubr only; production untouched.

- Browser: published disposable activity prueba-dev-recorrido-de-participacion-3ba99a, Carlos and Sofia requested, Maria approved/rejected with note. Queue and participant notifications reflected decisions. Directions/instructions were hidden before approval, revealed after approval and hidden after withdrawal. Re-request/re-approval, edited summary and cancellation notification verified. Test activity remains canceled in dev.
- Phone account menu was trapped in the blurred64px header. Disable both backdrop filters while open;390px menu now spans viewport with reachable logout/no overflow; logout also works320px. Desktop300px popover retains header blur.
- Map zoom narrowed40activities to17cards. Refreshed cards formerly stringified HTMLTimeElement; now append semantic time child with readable dates and retained datetime.
- Added widening15→13→11/floor/result/manual-pan regression and semantic date-child regression. Independent review found a cached-response false-positive in the test; corrected bounds and fresh-request assertion. Reviewer reran harness; no outstanding bounded findings.
- Full suite6/6,145assertions; allbrowserharnesses and timezone checks pass. Compiler0.1.3 required (default0.1.2). Compiler check and whitespace pass. Repository-wide formatter reports pre-existing differences; unedited HEAD Constants/App also fails. No unrelated format sweep. Asset graph32.
- Physical GPS/haptics, representative traffic, recovery/deletion and official/bulk import remain unverified in this pass. No auth/provider settings or production deployment changed.

Exact next action: test open-entry join/capacity boundaries and event-change notifications in the isolated development project.

## Authorized dev/production release — 2026-10-10

Architect → Implementer → Independent Reviewer → Implementer. Own brand, account-menu dismissal, cookie form tokens, catalogue featured-content API and matching views/tests/docs. User explicitly requests push to dev and production; isolated dev tests precede promotion.

- Phone320/390: authenticated cookie reset/accept-all/necessary-only dismiss and persist after reload; menu repeated close/Escape and desktop/phone rotation unlock scrolling.
- Destination/date/free-only filters survive search→map; zoom, sheet expansion and event navigation work. Dev save/reaction toggles restored; open-entry withdrawal/rejoin restores Carlos participation.
- Database featured destinations capped8; local licensed image paths, bilingual captions and municipality references. Empty active set returns[]; no hardcoded fallback. Tables retain RLS/no guest or member direct privileges. Additive migration applied to isolated dev and production before deploying dependent code.
- Independent reviewer passes pinned0.1.3 Pudu suite and focused harnesses; parity corrections applied. Production release stages prebuilt function/static output, verifies routes and promotes tested deployment.
- Physical GPS/haptics and exhaustive hardware coverage remain unverified. Existing repositorywide formatter differences are baseline; changed modules formatted where practical.

Release evidence: featurePR#2 and releasePR#3 merged; tagv0.1.1 at50bd09a. Dev/main synchronized. Vercel deploymentdpl_G7CSXCDnijRXaUfvtT4uLNSc5Xrf (boricua-experience-g4ronqiio.vercel.app) promoted tohttps://boricuaexperience.com. Authenticated staging and public-domain home/map/signin/cookies/manifest/brand checks return200; www redirects toapex. Live phone menu closes/unlocks with all brand filtersnone. Accept-all/reset/necessary-only cookie choices dismiss/persist. No application source or credentials changed after the tested build.

Exact next action: test join-capacity concurrency boundaries in the isolated development project; physical-phone GPS/haptics remain unverified.

Release preparation: featurePR#2 merged into dev; release0.1.1 carries tested source and metadata into main. Physical deviceGPS/haptics and capacity-boundary concurrency remain separate validation work.

## 2026-10-11 map continuation · #24
Architect → Implementer: own Live, Explorer, BrowserMain, Map, Layout and bilingual status messages. Independent review required.

Implementer → Independent Reviewer → Implementer: subscription and stop/restart ordering findings resolved; reviewer reports no actionable findings. Browser nearby lookup failed cleanly with unchecked control and retry guidance. Phone map at390px has no horizontal overflow and no assistant. Physical GPS remains unverified; Chrome automation was unavailable because its request-header policy could not load.

## 2026-10-11 discovery continuation · #26
Architect → Implementer: own Search view/styles, Footer/home styles, localized copyright and output tests, Culebra photo/credits. Database order changes in both environments; no schema change. Independent review required.

Photo review strengthened the copy-region scrim to64% over worst-case white clouds and corrected footer mirror wording. Browser1440px/390px: loaded responsive Culebra image, one h1, no overflow. Catalog order verified equal in dev/prod, no schema mutation.

## 2026-10-11 account QA continuation · #28
Architect → Implementer: own Api.Account nullable profile boundary, Web.Context session cleanup, Web.Respond cookie expiry and Domain tests. Disposable dev account deleted successfully; stale cookie503 is the regression. Preserve transient-failure sessions; independent review required.

Implementer → Independent Reviewer → Implementer: null-profile and JSON cookie-expiry boundaries reviewed; mirror parity corrected. All7 suites/193 assertions pass. Disposable development account exercised password login, export, CSRF rejection, pause/reactivation, wrong-password deletion rejection and successful deletion. Both auth/profile rows are gone; stale cookie now redirects to sign-in and expires. No production account was modified.

Exact next action: promote reviewed issues24/26/28 through release0.2.2 and verify public routes. Physical-device GPS remains unverified.

## Source visibility · #30
Architect → Implementer: own root ignore rules and restore existing Api.Supabase gateway/identity files to Git. Existing complete mirrors resolve their transport/auth contracts. Preserve private root SQL files; no credentials in source. Independent reviewer verifies scope and module parity.

## Photographic pages · #31
Architect → Implementer: own Auth/Legal page composition, search/experience styles, bilingual cookie explanations, photo provenance and mechanical asset graph41. Independent review required. Local generated Supabase configuration remains untracked; only root SQL is ignored.

Implementer → Independent Reviewer → Implementer: stale sharing-restoration policy copy and singular cookie labels corrected. Reviewer reports no outstanding findings; all193 assertions/browser harnesses passed. English390px About/auth and1440px search/auth fit without horizontal overflow; photographs load, About has one h1, free-only filter submits and persists. Supabase source restoration is merged to dev.

## Local CLI configuration · #35
Architect → Implementer: own existing supabase/config.toml, local ignore file and complete mirror. Restore safe configuration to Git; no hosted settings applied. Independent review required.

## Full-width search · #36
Architect → Implementer: own Layout search body class, Search image sizes, SearchStyles width/rail rules and mechanical cache graph42. Supabase local files committed/reviewed separately. Independent review required.

Implementer → Independent Reviewer → Implementer: review clear;193assertions/allbrowserharnesses pass. Search bounds measured1440px→1424px(left8),390px→374px(left8), no horizontal overflow, oneh1. Category/town shells unchanged.

## Field focus · #39
Architect → Implementer: own shared app/search/experience focus styles, Legal effective-date presentation and bilingual keys, mechanical asset graph43. Preserve accessible focus and all form/auth/filter semantics. Independent review required.

Implementer → Independent Reviewer → Implementer: native-select fallback now shares parent focus only; policy change prose matches dates-only headings.193assertions/allharness pass, desktop/phone computedinputshadow none and parentone2pxinset, nooverflow. Globalfocus usesoneoutline so explicitcontroloutlines do not accumulate shadows.

## Curated publications · #42
Architect → Implementer: own profile/event projections, curated participation views, translations, crown, private CSV and matching API migration. Production cleanup preserves confirmed administrator and required catalogs. Independent Reviewer checks contracts before import/deployment.

Implementer → Independent Reviewer → Implementer: all bounded findings resolved. Curated activity management and assistant publisher roles now follow the external-source contract. Full222 assertions, browser harnesses, allsource compiler checks and formatter pass. Dev/prod curated_publications migration applied; function hashes and ACL match, production seed check0. Development rollback test rejects curated join without writes. Browser320/390: no overflow, official CTA visible, publisher label and administrator badge present. Two real-source staging entries exist only in development. Private CSV has12 pending-review dated entries; no production cleanup/import yet.

Exact next action: promote the reviewed application change; import the private CSV only after publication review and guarded production cleanup. Physical GPS and hardware coverage remain unverified.

## Signup and discovery feedback · #45
Architect → Implementer: own Credentials, Validation.Account, Identity handler, shared Form/Auth/Notice/Errors, translated account labels, Passwords/SubmitFeedback browser modules and experience styles, Seo absolute-image/alternate correctness and focused regression tests. Independent review required before promotion. Private CSV research stays ignored and production import/cleanup remains pending expanded review.

Implementer → Independent Reviewer → Implementer: reviewer reports no remaining findings after after-bubbling cancellation and null-submitter filter regressions were added. All231 assertions, all browser harnesses, every source compiler check and full formatter pass. Actual browser320/390/1440: password visibility toggles, localized native mismatch validity clears, local meter and404 heading/no-icon/no-overflow verified. Raw native signup mismatch returns422 before provider creation. CSV now91 ignored review rows including25 future BSNF games in deportes,10 real arena boundaries; BSNF end/admission remain explicitly unknown and import-blocked. No production cleanup/import yet. Search Console opened in existing Chrome but its JavaScript automation is disabled and OS Accessibility access denied; owner must toggle the Chrome setting. Numeric Lighthouse audit still running locally after the public PageSpeed endpoint rejected its shared anonymous quota.

Exact next action: finish the local SEO audit, promote reviewed issue45, and continue expanded CSV review before any production import/cleanup. Physical GPS remains unverified.

## SEO link audit · #48
Architect → Implementer: own EnAccount/EsAccount cookies.learn_more labels. Local Lighthouse production audit92/100 identifies this as the only failed automated check. Independent review required; repeat live audit after promotion.

## Unknown event facts continuation · #51
Architect → Implementer: own nullable event/draft contracts, validation/API, price/date rendering, event/card/map/calendar/SEO, bilingual labels, assistant temporal enrichment, local-time messages, asset graph and private migration. Start remains required; unknown end expires from discovery24 elapsed hours after start without claiming actual completion. No category-specific duration guesses, undated live events or invented free prices. Apply reviewed migration to dev/prod before publishing25 BSNF CSV rows; retain the66 published IDs. Independent reviewer required.

Implementer → Independent Reviewer → Implementer: optional-facts review resolved admin/deletion cutoff omissions, pending-decision locking, nullable map-date coercion and organizing/stale-submit completion wording.257assertions and allbrowser harnesses pass; all133source modules/compiler and formatter clean. Real320/390/1440 checks show unknown price/end, omitted SEO end, search/map and nohorizontaloverflow. Development rollback matrix and real competingdecision checks pass; privatefixture removed. Bothoptional_event_facts and optional_event_decision_lock migrations applied dev/prod;17affectedfunction definitions/ACL and nullable/generated columns/RLS match. Production retains66curated publications with0seed rows. BSNF CSV publication follows application promotion so old decoders never encounter null facts.

Exact next action: after promotion, reconcile the25BSNF production IDs into the ignored CSV, then review newer official schedules before the next publication batch. Missing-start and date-only records remain blocked until a genuine scheduled time is verified; enduring venues require a separate catalog rather than a fabricated event.
