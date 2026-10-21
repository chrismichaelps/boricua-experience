# Changelog

- 2026-10-21 · compact phone map rows · keep96px source thumbnails beside titles/venue/admission, reduce list gaps and inset selected-image rings; asset99 · issue #188.

- 2026-10-21 · release0.15.1 · source-image framing, neutral image labels, source credits and dynamic map admission placement; reviewed PR184/186. Production curated media405covers and27refreshed upcoming BSNF fixtures; no schema change; asset98.

- 2026-10-21 · source imagery and intrinsic framing · preserve small/square/portrait source artwork without stretching or cropping, retain landscape photo framing, and use neutral bilingual image labels. Official-source production image curation and BSNF schedule refresh retain private provenance/CSV; asset98 · issue #185.

- 2026-10-20 · map admission correction · dynamic viewport cards retain unknown admission beside the image, matching initial HTML; zero/paid values remain thumbnail badges. Nullable numeric pin metadata and redraw regressions; asset97 · issue #183.

- 2026-10-20 · production configuration verification · own-domain Google sign-in enabled and verified with the existing0.15.0 artifact; in-app notification trigger, reminder, inbox, preference and read-boundary checks passed in a rolled-back production audit. No application/schema change or fake notices. [[handoffs/production-auth-notifications]] · issue #181.

- 2026-10-20 · release0.15.0 · round route compass and full-screen route maps, own cover photos, split-screen sign-in/sign-up with credited Commons photographs, Google sign-in on the site's address (active once the client secret is set), Nearby search, town photo heroes, town-aware chips, Indoors filter, town review strip and questions, ItemList/TouristDestination/FAQPage data, landscape and dual-screen layouts; PR179. Private migrations 20261020050000_indoor_trait and 20261020051000_town_reviews recorded in both environments. 22 suites/773 assertions and all browser harnesses pass; asset96 · issues #175–#178.

- 2026-10-20 · device pass · checked 344–860 px phones, Fold cover/open, dual-screen inner/outer and phone landscape: no page overflow. Live trips on short landscape screens put the map beside the stops (the map was 109 px tall); on two-segment screens card grids take an even column count with the fold as the gap and the trip map and stops sit on separate screens; asset96.

- 2026-10-20 · town voices and questions · town guides show the newest reviews of their places with the town's average, and up to three questions answered from their own data with FAQPage markup (private migration 20261020051000_town_reviews, development applied); asset95 · issue #178.

- 2026-10-20 · rainy-day filter · new "Bajo techo / Indoors" quick trait: organizer-stated not outdoors, or workshops, technology and shopping by default; search, map and series honour it (private migration 20261020050000_indoor_trait, applied to development; production before the release) · issue #178.

- 2026-10-20 · richer town guides · featured towns open with their photograph, category chips keep the town, head titles name Puerto Rico, and pages carry ItemList and TouristDestination structured data · issue #178.

- 2026-10-20 · Nearby in search · the empty search box offers "Cerca de mí" (opens the nearest town guide from a position rounded to ~1 km) and recently viewed or featured towns; `/cerca` redirect; asset94 · issue #178.

- 2026-10-20 · Google sign-in on the site's address · with `BORICUA_GOOGLE_CLIENT_ID/SECRET` set, Google returns to /auth/google/callback and its ID token is exchanged with the identity provider, so the consent screen names boricuaexperience.com instead of the provider; unset keeps the old flow. [[src/Api/Google]] · issue #177.

- 2026-10-20 · split-screen sign-in and sign-up · half-screen real photographs (Playa Flamenco, Faro Los Morrillos, Rincón; CC BY/BY-SA, credited on the page) beside the form, a photo band on phones and a lined divider · issue #177.

- 2026-10-20 · own cover photographs · the activity and place forms offer a "Your photo" tile: the photo is resized and stripped of metadata in the browser, previewed, and uploaded from the cover page right after publishing; asset93 · issue #176.

- 2026-10-20 · round route compass and full-screen route maps · plan and trip maps show one round drag compass instead of a tall arrow pill, and an expand button opens the route over the whole screen (Escape closes); asset92 · issue #175.

- 2026-10-19 · release0.14.2 · unknown admission moves from narrow photo badges to card metadata; known/free badges are unchanged.21 suites/756 assertions and all browser harnesses pass. [[handoffs/admission-label]] · issue #171.

- 2026-10-19 · card admission label · unknown prices render as quiet metadata instead of wrapping across map thumbnails; explicit free/paid image badges retain their existing appearance. [[handoffs/admission-label]] · issue #171.

- 2026-10-19 · release0.14.1 · stable official cotorra raster favicon discovery and accurate multi-size ICO metadata. No schema changes.21 suites/752 assertions, binary format checks and browser icon decoding pass. [[handoffs/search-favicon]] · issue #167.

- 2026-10-19 · stable search favicon · official cotorra ICO now contains six accurately declared raster sizes; homepage icon URLs stay stable across asset releases, with a192px PNG candidate. Crawler access verified; Google recrawl/display remains external. [[handoffs/search-favicon]] · issue #167.

- 2026-10-19 · release0.14.0 · visitor guides, database plan styles, review companion filters, place quality/area ranking, resumed guest actions, shared UI polish and reviewed card themes; PRs154,156–163. Seven schema migrations are recorded in both environments. Live on production at main8284038; function/static/artifact fingerprints match. Release metadata synchronized to dev through PR165. Release validation and deployment receipt: [[handoffs/visitor-guide-completion]].

- 2026-10-19 · visitor guide completion · guest actions resume after authentication; quality-ranked permanent places and town standing; visit-companion review filters; database-backed plan styles and town access/climate/category guides; redesigned nearby home card and optional card backgrounds. Cover validation precedes publishing, partial saves produce bilingual warnings, category switches retain choices and artwork never counts as a photograph. Owned parent locks preserve concurrent uploads. Free plans require a known zero price; guide counts use canonical discovery windows and held exclusions. Seven reviewed private migrations are recorded in both environments. Independent review,21 suites/749 assertions, browser desktop/390px checks and real dev concurrency/permission regressions pass; asset91. [[handoffs/visitor-guide-completion]] · PR154.

- 2026-10-17 · release 0.13.1 · the member achievements board keeps its own decoder when the forum joins the build: the forum's page type is renamed Topics, because two Board decoders in one release let the forum's answer for the member board and every /achievements request failed since 0.13.0; a decode-collision test holds both apart · issue #137.

- 2026-10-16 · compact discovery cards · natural-height visible copy replaces internally scrolling13rem panels; two phone/three tablet/four wide grid columns. Organizer and map geometry preserved;320/390/1280px browser checks, profile/home/search/activity/map and worker regressions pass. Asset87 · issue #136.

- 2026-10-15 · release0.12.0 · permanent-place photo galleries, recent review previews, full-width reviews and hidden orphan review protection; both database migrations applied, asset86. Feature PR #133.

- 2026-10-15 · [[handoffs/place-discovery]] · original place photo mosaic and accessible viewer, recent published-review rail across all ratings, full-width reviews, bilingual navigation and labeled no-photo state. Bounded latest-six database projection and hidden orphan review guard applied to both environments. Real licensed Castillo Serrallés photograph with public attribution; asset86 · issue #132.

- 2026-10-15 · release0.11.0 · permanent restaurant/shop discovery with database business-logo map pins and category fallback, bounded viewport queries, nearby-aware search and shopping category. Both additive database migrations are applied in development and production; asset82.

- 2026-10-15 · [[src/Database/Places]] · Shopping place catalogue/profile and fast-food cuisine; bounded permanent-place map queries, category-icon pins, distinct place/event identity, nearby-aware search rails and bilingual result counts. Schema applied to both environments; real source data remains private and production-only. Business-logo pins use nullable database artwork with category/error fallback; asset82 · issue #120.

- 2026-10-15 · release 0.10.3 · assistant: tool or reasoning markup under any name (such as <dots_function_call> or <|tool_call|>) is kept from the page and answered from the verified results, and answers follow the language of the page the visitor reads · issue #117.

- 2026-10-15 · release 0.10.2 · home layout: categories, "plan your day" and quick filters sit together under the search on one shared edge (16 px apart instead of a full section gap each), the section rhythm is 56 px on desktop and 40 px on phones instead of 72 and 48, and rows with a single activity are left out instead of leaving a near-empty band; asset version 80 · issue #114.

- 2026-10-14 · release 0.10.1 · trips show the road route and its choices from where the visitor is to the next stop (the first stop included), so single-stop plans — the usual case with production's activities — no longer fall back to a straight line; routed once per pair of road junctions, cached at the edge by a position rounded to about 110 m, at most 10 new routings a minute site-wide; every asset reference moves to version 79 so no browser keeps an earlier trip script · issue #111. Production needs the private migration 20261014233000_approach_routes.

- 2026-10-14 · release 0.10.0 · for visitors and locals on the road: the island's weather from the National Weather Service at a fixed cost (hourly forecasts fetched only when they change, official alerts every ten minutes, one shared document cached at the edge) shown as a weather-app card with a moving sky on activity pages and the trip's next stop, a forecast line on plan and trip stops, heat index levels and official alerts (heat, floods, rip currents, storms) with what to do, and forecasts in the assistant's answers; plans stay on the land they start from and island crossings say "ferry from Ceiba"; miles in English; toll notes on expressway routes; parking and cash-only facts; automatic English titles and summaries for Spanish listings; asset version 75 · issue #107. Production needs the private migrations 20261014200000 through 20261014200500 and the model key in the database vault.

- 2026-10-14 · release 0.9.0 · trips: "Start trip" on every plan follows the visitor live with a heading-up 3D camera, road distance, time and arrival to the next stop updated live along the chosen route, a choice of ways to get there (fastest, another real route, no expressways, walking for close stops) and arrivals confirmed on the server without keeping the position; 3D and rotation on plan maps with compact controls kept off the route; 13 plan and trip achievements that leave every existing unlock untouched; assistant limits kept as settings, counted per member and day with no site-wide lock and a message for each limit; assistant follow-ups from real results, "Start trip" and "See on the map" from chat answers, nearest-town location sharing and answers from verified results when the free model cannot finish; home plan card in the page's own style; asset version 74 · issues #103 #104. Production needs the private migrations 20261014172900 through 20261014180200 before the application deploy.

- 2026-10-14 · release 0.8.0 · reliable phone map (cluster taps, fixed pin positions, near me framing, zoom and loading placement, sheet gestures), no home skeleton flash on fast loads, instant achievement filters with a faster board query, unlock chimes on phones, accessibility button on phones and the map, folded map credit, plans near me chained by road time, interested and going marks; asset version 69 · issues #94 #96 #98. Production needs the private migrations 20261014090000 through 20261014100300 and the road-graph load before the application deploy.

- 2026-10-14 · [[src/Domain/Plan]] · plans near the visitor: two or three ready itineraries by style (mixed, free, family, adventure, culture), window and stop count, ranked for locals or visitors, chained by real road time from a precomputed island road network, with route maps, WhatsApp, share and calendar, shared links and "surprise me"; "interested" and "going" marks with counts on every activity; activity facts for duration, minimum age, step-free access and outdoors; asset version 69. Private migrations 20261014100000_road_graph, 20261014100100_travel_legs, 20261014100200_activity_facts_interest and 20261014100300_plans, then the road-graph load.

- 2026-10-14 · [[src/Database/Achievements]] · achievement filters switch in place without a reload; the board reads the calendar only for seasonal achievements and works out the open edition once (about 10 ms in the database, same answer); badges shimmer until drawn; a phone's first tap wakes its audio so unlock chimes play on iOS; the accessibility button is shown on phones and on the map; the map credit starts folded into its "i" button; asset version 68 · issue #96. Production needs migration 20261014090000_achievement_board_speed.

- 2026-10-14 · [[src/Public/Explorer]] · phone map: cluster taps and fits respect the visible map instead of failing silently, selected pins stay in place, "near me" frames the closest activities, zoom buttons sit under the full-screen button, the loading pill waits at the top of the map, the sheet heading drags the sheet, only the visitor's own scrolling raises it, lowering it returns the list to the top, filter chips share one height, the date sheet keeps its buttons in reach, and the page no longer rubber-bands; the home placeholder only appears when loading is slow and a cached hero reveals at once; asset version 67.

- 2026-10-14 · release 0.7.0 · [[src/Domain/Build]] build fingerprint: reproducible SHA-256 over every deployed file with version, commit and time at /build.json and /version, x-build header, page meta, footer label, refresh notice for open tabs, and scripts/verify-build.sh; home skeleton reveals on scroll intent and fades; asset version 66.

- 2026-10-14 · release 0.6.0 · picker-style date, time, month and choice fields; terms and privacy renewal; accessibility toolbar on every page with a menu entry on phones; native-style phone map sheet; clean mobile sign-in and sign-up; shimmering home skeleton; community, achievements, discovery preferences, contact relay and weekly digest; asset version 65 · issues #86 #88 #89. Production needs the pending database migrations before the application deploy.

- 2026-10-13 · [[src/Public/DateCalendar]] · localized accessible date ranges with inclusive Puerto Rico server filtering; compact map list tracks and phone filter row remove wasted space · issue #88.

- 2026-10-13 · [[seams/FailureLog]] · server failures with their reason reported to a free Cloudflare Worker and kept 30 days in D1.

- 2026-10-13 · [[src/Database/NotificationDigest]] · low-cost notifications: optional weekly email summary only when there is something to say, batched daily within the free mail allowance, one-click stop.

- 2026-10-13 · [[src/Database/DiscoveryFunnel]] · discovery-to-request conversion by channel (referrer or tagged assistant, share and notification links), aggregate counts only, in the administrator dashboard.

- 2026-10-13 · [[src/Database/Achievements]] · data-driven achievements: 81 seeded across discovery, participation, hosting, social, profile, Puerto Rico and seasonal categories; one unlock mechanism over existing actions and browser signals; animated rarity badges; board, detail dialog, unlock toasts with chime; public badge showcase; backfill for existing members.

- 2026-10-13 · [[src/Database/Community]] · waitlist with automatic promotion, organizer overview with views-to-requests conversion, approve-all and guest spreadsheet, review holds after repeated reports with administrator restore, Google/Outlook/file calendar links, share menu and a private subscribable calendar feed.

- 2026-10-12 · [[src/Database/EventCovers]] · organizer-managed activity covers across categories; trusted server confirmation, shared reservation quota and pending-only cleanup; development verification passes, production cutover pending · issue #82.

- 2026-10-12 · release 0.4.0 · owner menu editor, place photos and menu files, save/like fix, moving nearby and 3D map; asset version 56 · issues #69 #76 #78.

- 2026-10-12 · [[src/Public/Explorer]] · nearby areas snap to a zoom grid and name their language so the edge cache shares them across moving visitors; hidden tabs defer refreshes; following zoom adapts to speed with hysteresis; optional 3D buildings from existing tiles · issue #78.

- 2026-10-12 · [[src/Services/Media]] · owner covers, photos and menu files through reservation, one-path signed upload, server read-back verification and a daily sweep; shared photo header on place and menu pages · issue #69.

- 2026-10-12 · [[src/Public/SubmitFeedback]] · save and like submit on the first tap: navigation decided after the form's own listeners, press animation with an explicit start; organizers and cancelled activities cannot react (database rule in both projects) · issue #76.

- 2026-10-12 · [[src/View/Pages/MenuForm]] · script-free owner menu editor with draft-only structural edits, retained invalid input and revision conflicts · issue #69.

- 2026-10-12 · [[src/Validation/MenuForm]] · validate raw nested owner menus and conditional saves with nullable facts, stable identities and JSONB byte limits; owner forms and uploads remain pending · issue #69.

- 2026-10-12 · [[src/Public/CreditsStyles]] · separate photography attributions into spaced responsive cards while preserving every source and license · issue #72.

- 2026-10-12 · [[src/View/Pages/Menu]] · add viewer-authorized dedicated menu reader and database-capability place links; bilingual declared facts, private/empty noindex and narrow-screen name wrapping verified; uploads/editor/carousel continue separately · issue #69.

- 2026-10-12 · [[src/Database/Menus]] · add category-authorized structured menus with nullable facts, owner revisions and serialized daily quotas; matching migrations verified in both environments; typed read/write contracts and regression fixtures · issue #69. Reader/editor and uploads continue separately.

- 2026-10-09 · [[architecture/_MOC]] · vault scaffolded: layers, grammar, domain, seams, ADR-0001 to ADR-0007 · risk LOW · issue #1
- 2026-10-09 · [[grammar/database-api]] · database API: schema, indexes, functions, jobs, reactions, attendees · risk MED · issue #1

- 2026-10-09 · [[handoffs/homepage-refresh]] · coastal home hero, overlay navigation, coqui branding and search mascot; private HTML removed from offline cache; asset version 2 · risk MED · issue #1

- 2026-10-09 · map pins now retain listing filters and category/town landing constraints; nearby refresh preserves filters; location off and page hide clear geolocation watchers · risk MED · issue #1

- 2026-10-09 · [[src/View/Components/Hero]] · four local Puerto Rico hero scenes, synchronized place link and dot indicators, six-second auto rotation, pause and reduced-motion controls; asset version 3 · risk LOW · issue #1

- 2026-10-09: Refined home discovery cards, photo destination tiles and collapsible municipality directory; added a branded four-column footer with real app links, cookie preferences and bilingual generated-image disclosure.

- 2026-10-09: Refined Qué/Dónde/Cuándo with segmented search, searchable municipality dialogs, existing date-window panels, mobile bottom sheets and polished suggestions. Preserved filter state, native fallback and relevance ordering; verified keyboard dismissal, focus and responsive overflow.

- 2026-10-09 · [[handoffs/homepage-refresh]] · optional Motion transitions with reduced-motion/lifecycle support; visible curved coqui brand and corrected official Google mark; refined email-first auth, activity panels and neutral category covers.
- 2026-10-09 · [[src/Public/Photographs]] · replaced generated destination scenery with four attributed real Puerto Rico photographs throughout hero, auth, destination tiles and nearby promo; expanded footer description and compact 32px desktop rows; removed AI notice.
- 2026-10-09 · [[src/Public/MapClusters]] · grouped overlapping map pins without losing results, preserved keyboard focus after regrouping, readable compact desktop cards and expandable mobile sheet; asset/cache version 13.
- 2026-10-09 · [[src/Web/Static]] · serve public HTML credits with a document content type; authenticated create/edit/request/approve/notification/withdraw/cancel journey verified using existing development accounts.

- 2026-10-09 · [[src/View/Pages/Auth]] · mobile identity forms now sit inside the real-photo container, with the global header as the sole brand mark; desktop two-column composition retained.
- 2026-10-09 · [[src/Public/Explorer]] · map cards/counts/markers now follow the unobscured camera viewport, with debounced bounded nearby reads and stale-response protection. Mobile zoom controls moved above the sheet with 44px targets; responsive padding updates after sheet animation.
- 2026-10-09 · [[src/Public/Live]] · explicit waiting/ready/error states, fresh location replay, failed-location retry, pre-load readings and restored-page subscriptions; no position transmission during local locate. Asset/cache version 16.

- Native mobile input: trusted optional haptics, Motion press/checkbox/sheet feedback, touch-handle swipes, shared reaction locking and larger touch targets. Fixed retained animation transforms displacing the mobile participation bar.
- Approved spatial map RPC reads bounded visible rectangles through the existing public GiST index, caps before card joins, preserves coordinate visibility and exposes truncation. Debounced abortable camera transport and bounded viewport cache. Independent review and130 application assertions/eight browser harnesses pass; physical-device and capacity testing remain pending.

- Final map soak: filter sheet transition events by target/property to stop automatic camera read loops; regression passes. Cache version19.

- 2026-10-09 · [[handoffs/homepage-refresh]] · approved hosted Google OAuth web client/provider configuration and public audience; production/local exact callbacks saved. Local login-form Google flow returns authenticated onboarding; application consent and production deployment remain unverified. No OAuth secret stored in source or app environment.
- 2026-10-09 · [[src/Validation/Avatar]] · member photos: storage bucket and policies, upload and removal, photos in app bar, account, organizer card, attendees, and request queue · risk LOW · issue #1
- 2026-10-09 · [[src/Public/Explorer]] · current location follows each reading until the visitor moves the map; coarse fixes frame their accuracy circle with an approximate-location notice; price-marker hover no longer overrides MapLibre positioning; high-accuracy pin-here on the create form.
- 2026-10-09 · [[src/View/Pages/Home]] · region-tab town browser replaces the raw directory list; works without scripts.
- 2026-10-09 · [[src/Public/Brand]] · redrawn animated search parrot (rise, blink, glance, breathe; reduced-motion safe).
- 2026-10-09 · [[src/Public/Photographs]] · real public-domain Puerto Rican parrot photograph on the Río Grande slide and tile; hero copy scrim. Asset/cache version 22.
- 2026-10-09 · [[src/Web/Platform]] · production cookies restored (consent banner closes, sessions persist); guest HTML no longer stored at the CDN.
- 2026-10-09 · [[src/Validation/Account]] · neutral date-of-birth age gate; minors refused without storing anything, a day-long browser lockout, and Google-created minor accounts deleted.
- 2026-10-09 · [[src/View/Pages/Legal]] · policies rewritten as numbered documents in sync with the product, with an “In short” summary and contents; no published contact address.
- 2026-10-09 · [[src/View/Pages/Notifications]] · inbox redesigned (headlines, relative times, day groups, unread dots); opening it marks shown items read.
- 2026-10-09 · [[src/Public/Brand]] · search parrot redrawn as a peeking head with feet on the search surface; compact carousel controls.
- 2026-10-09 · [[src/Public/AccountMenu]] · account menu replaces the avatar link (popover on desktop, full sheet on phones); the bell rings only for new notifications; translucent, hover-only header tints. Asset version 24.
- 2026-10-09 · [[decisions/ADR-0008-separate-environments]] · development moves to the local Supabase stack with seed; production purged of seed data and guarded; owner account is the administrator.
- 2026-10-09 · [[decisions/ADR-0009-event-expiry]] · events are marked ended by a five-minute job after their end time, kept as history, final, and removed from search engines.
- 2026-10-10 · [[src/Public/LocalTime]] · dates and times on cards, event pages, and the map sheet show in the reader's time zone with its abbreviation; Puerto Rico readers and pages without scripts keep the server text.
- 2026-10-10 · [[src/Public/Explorer]] · a second tap on the locate button while waiting for the first fix turns location off instead of re-centering; re-centering applies only after the visitor panned away.
- 2026-10-10 · scripts/test.sh · one command runs the Pudu suites and every browser harness; two stale harnesses repaired.
- 2026-10-10 · [[src/Database/MapEvents]] · map reads are nearest-first straight from the spatial index (whole-island view 85 ms → 0.2 ms at 500,000 events) and category filters get a category-and-location index · migration `20261010050000_map_nearest_first.sql`, not yet applied to production.
- 2026-10-10 · [[src/Public/ExperienceStyles]] · signed-in pages checked at phone width from fixtures: account, inbox, and activity fit 375 px; pause/delete account and the public-profile link get 44px touch targets; activity tabs share the phone width instead of scrolling. Asset/cache version 26.
- 2026-10-10 · [[src/Public/ExperienceStyles]] · desktop map privacy note moves to the map's bottom-left, clear of the attribution; public pages checked at 1440 px. Asset/cache version 27.
- 2026-10-10 · [[src/Public/Photographs]] · phones load 1300px photo copies through `srcset` and a 25 KB Latin WOFF2 subset of Pacifico instead of the 245 KB TTF; a first phone visit to the home page drops from 1,661 KB to 650 KB. Asset/cache version 28.
- 2026-10-10 · [[decisions/ADR-0008-separate-environments]] · development moves to a hosted `boricua-experience-dev` project with its own Google OAuth client; `scripts/dev-db.sh` applies migrations, seed, and auth settings to it; both scripts refuse the production project. Production received `20261010050000_map_nearest_first` (index-ordered nearest-first plan confirmed) and deploy of asset version 28.
- 2026-10-10 · [[src/View/Pages/Account]] · signed-in flows tested end to end against `boricua-experience-dev`: Google sign-in and onboarding, profile and preference saves (verified in the database), photo upload (stored as WebP) and removal (file deleted). Fixes: profile saves say “Profile saved.”; “Remove photo” appears right after an upload; phone toasts rise above the tab bar. Development Google client “Boricua Experience (Development)” allows only localhost and the dev project's callback. Asset/cache version 29.
- 2026-10-10 · [[decisions/ADR-0008-separate-environments]] · production redirect list now holds only `https://boricuaexperience.com/auth/callback`; production Google sign-in verified to use its own client and callback.
- 2026-10-10 · [[src/Public/Explorer]] · after “Near me” locates the visitor, an empty street-level view steps out two zoom levels at a time (down to zoom 11) until activities show; a manual pan or zoom stops it. Verified in the browser at Fajardo on the development data. Asset/cache version 30.

- 2026-10-10 · [[handoffs/homepage-refresh]] · development participation journey verified; phone account-menu containing block and refreshed-map dates fixed. Widening/date-child regressions independently reviewed;145assertions/allbrowserharnesses pass. Cache32; no production deployment.

## 2026-10-10 — mobile dismissal and database-owned destinations

- Fix authenticated cookie consent/reset forms by carrying the session CSRF token.
- Keep phone menu disclosure and scroll lock synchronized across close, Escape, outside tap, rotation and page restoration.
- Use one original green/red cotorra identity in headers, mobile menu, footer, favicon and install/social assets; remove blue recoloring.
- Read featured scenes/captions from Supabase's bounded public content RPC; derive regions from municipalities and remove embedded destination tuples/footer town slugs. Private migration remains ignored; guests/members have function access only.
- Regression gate:6/6 suites,152 assertions; complete browser harnesses and timezone checks; independent bounded review found no functional/security issue. Corrected wiki interface parity findings. Asset graph33.

## Release0.1.1

Promotes reviewed mobile navigation/privacy fixes, original green/red cotorra assets and database-owned featured destinations. Includes semantic map dates and the prior phone header clipping fix. Additive content RPC deployed to both databases before app rollout; no business-content seed or credentials committed. No changes to account/provider permissions or event-location policy.

Release0.1.1 deployment:50bd09a, https://boricuaexperience.com, staged and live route checks pass. Both dev and main contain the release; no secrets/private content migration committed.

- 2026-10-10 · issue#5 · bounded authenticated live-data assistant, genuine free-model SSE, safe Markdown, editable voice dictation, source links and native composer/Motion held press. Atomic member/project quota fixes rollover using locked wall clock. Activity rows constrain covers and text; ended/canceled cards suppress seats and pending actions at deadline. Dev rollback validates expiry and pending closure.

- 2026-10-10 · release0.2.0 · live free-only assistant with authorized database tools, streaming Markdown, cotorra welcome, editable voice dictation, spoken replies and cover cards; native Motion controls; activity overlap and ended-action fixes. 133 source checks, 169 assertions and all browser harnesses pass. Dev live conversation verified; provider quotas limit capacity; physical voice/haptics unverified.

- 2026-10-10 · [[architecture/DELIVERY]] · require reviewed schema changes in both environments before promotion; assistant release verified live, all73 application function definitions and quota privileges match across environments.

## 0.2.1 — activity layout, location recovery and bilingual assistant

- Activity covers and text use contained separate grid tracks; 26 live development cards verified without overlap/overflow at 360,390,768,1024,1440. Issue #18.
- Publishing location retries a transient CoreLocation failure once with balanced accuracy, bounds waiting and preserves manual draft pins; map loading failure leaves location/manual controls usable. Issue #6.
- Assistant reads current Supabase category/town catalog with capped results and localized labels; spoken replies and dictation isolate stale callbacks. Signed-in desktop/mobile language forms carry existing CSRF token. Issue #20.
- Revision39 refreshes the complete browser asset graph. No schema migration required; all73 application function definitions/grants match dev/prod; production seed rows0.

- 2026-10-11 · #24: private map lookup uses bounded location fallback; sharing starts explicitly and stops on hide/exit. Correct independent control subscriptions, bound write/revocation ordering, expose bilingual purpose/status and omit map assistant. Full gate: 180 Pudu assertions plus browser harnesses.

- 2026-10-11 · #26: Culebra leads featured destinations in both databases; open search gains a responsive real-photo hero from the ordered catalog. Credit CC BY2.0 source/derivatives, simplify current-year footer and refresh graph40. Full gate186 assertions; desktop/phone output verified.

- 2026-10-11 · [[src/Web/Context]] · deleted-account sessions now expire on confirmed missing profiles, including JSON errors; transient dependency failures retain sessions. Disposable development account pause/reactivate/export/delete and stale-session flow verified;193 assertions pass · issue #28.

- 2026-10-11 · [[src/Api/Supabase/Gateway]] · root-anchored SQL ignore rule restores gateway/identity application modules to Git; no runtime logic changes · issue #30.

- 2026-10-11 · [[src/View/Pages/Legal]] · home-sized search photograph, licensed El Morro auth/About imagery and human-readable cookie purpose labels; asset graph41 · issue #31.

- 2026-10-11 · [[src/Infrastructure/SupabaseConfig]] · track reviewed local CLI TOML and ignore file; no credentials, SQL or hosted-setting changes · issue #35.

- 2026-10-11 · [[src/Public/SearchStyles]] · open search hero fills the viewport with home-equivalent8px insets; results retain centered reading width; asset graph42 · issue #36.

## v0.2.2 · 2026-10-11
Promotes reviewed issues24/26/28/30/31/35/36: explicit bounded map location lifecycle, Culebra-first database order in both environments, real licensed discovery/auth/About photographs, full-width search, footer and cookie copy, deleted-account session expiry and restored tracked Supabase source/local CLI configuration.193 assertions and all browser harnesses pass; disposable dev export/pause/reactivate/delete verified. No schema migration or hosted configuration change. Asset graph42. Physical GPS/browser hardware coverage remains pending.

- 2026-10-11 · [[src/Public/SearchStyles]] · one restrained focus ring across shared search/filter/form fields; policy effective dates without displayed version numbers; internal agreements unchanged; asset graph43 · issue #39.

## v0.2.3 · 2026-10-11
Promotes reviewed issue39: shared single focus indications, stronger neutral field borders and policy effective-date labels without visible versions. Includes all reviewed v0.2.2 discovery/location/account/source fixes.193 assertions and all browser harnesses pass; phone/desktop focus verified. No database/schema changes. Asset graph43.

## Curated publications · #42
#42: database-backed administrator badge and curated official-source participation; assistant distinguishes curator from event producer and omits local availability; private CSV records stay ignored. Full gate222 assertions and all browser harnesses pass.

## v0.2.4 · 2026-10-11
Promotes reviewed issue42 application changes: trusted administrator crown, official-source curated publications, safe external booking links and publisher-aware assistant replies without local availability claims. Both database migrations applied and verified before promotion.222 assertions, all browser harnesses, allsource checks and formatter pass. Cache graph44. Expanded private CSV review and production data cleanup/import remain separate pending work.

## Signup and discovery feedback · #45
Signup now requires matching passwords in server validation and progressively exposes localized visibility controls and local length guidance. Native/AJAX submission feedback preserves named values, respects cancellation and resets on return. Empty/404 states use restrained typography;404 has a main heading. Signup stays out of indexing, external event images keep their real origin, and misleading Spanish alternate tags are removed. Browser cache45 and focused lifecycle regressions accompany the change.

## v0.2.5
Released matching-password signup, progressive password controls, submission feedback, restrained empty/404 presentation and corrected SEO image metadata.231 assertions, browser lifecycle checks and independent review passed.

## Descriptive cookie-policy link · #48
Localized cookie-policy anchors explicitly describe their destination, addressing the sole failed automated SEO audit in the92/100 baseline.

## v0.2.6
Descriptive bilingual cookie-policy anchors resolve the only failed automated SEO check in the92/100 baseline. Includes the reviewed0.2.5 signup and action-feedback changes.

## Unknown publication facts · #51
Nullable price/end preserve unknown facts; explicit0 remains free. Required finite start plus separately generated/indexed discovery_until uses known end or24elapsed hours. Discovery, counts, participation and expiry share the cutoff; pending approval races close before the batch job. ES/EN cards/forms/map/assistant and exports preserve unknown state, omit invented end/offer and label unknown-end expiration archived. Apply reviewed migration to both environments before importing remaining BSNF CSV entries.

## v0.2.7
Release nullable publication facts, consistent finite discovery expiry, null-safe bilingual surfaces and locked request decisions. Both schema migrations applied and parity verified; private CSV remains ignored.

- 2026-10-12 · [[architecture/DELIVERY]] · the build refuses a site URL that is not a public https origin: a deployment built with the development origin refused every form post from the canonical site with 403 and named localhost in canonical links · risk HIGH · issue #55
- 2026-10-12 · [[src/Public/Live]] · CoreLocation's transient "location unknown" (frequent on Chrome for macOS) is retried with backoff for the first fix, and transient watch errors after a fix keep locating; only denial stops. Asset/cache version 47 · risk MED · issue #57
- 2026-10-12 · [[src/Database/EventSeries]] · recurring activities list once, with "N more dates" on the card and an Other dates section on the event page; no production row deleted. Asset/cache version 48 · risk MED · issue #59
- 2026-10-12 · [[src/Public/Explorer]] · the map never sends an area read for an unsized or collapsed camera (it answered 409 and showed "could not update this area" on desktop load); a sheet that covers the canvas falls back to the whole canvas. Map style defaults missing POI rank, admin level and maritime flags. Asset/cache version 49 · risk LOW · issue #61
- 2026-10-12 · [[subsystems/Discovery]] · nearby discovery without location permission: search, landings and the map accept a town (`cerca`) and a radius (`radio`: 5, 10, 25, 50 km) anchored at the town centroid; the choice is remembered in `bx_near` and fills a private "Near <town>" home rail loaded by script so guest pages stay edge-cacheable; town pages list the nearest towns. Home rails show each event once (recommended, weekend, near, coming up, free, hidden gems); hidden gems are priced, attributed, little-engaged events. Unknown price reads "Check admission" / "Consulta la entrada". Asset/cache version 50 · risk MED · issue #54
- 2026-10-12 · [[decisions/ADR-0010-category-profiles-and-places]] · permanent places beside activities with per-category facts declared in the database (eleven categories, new Lodging); publishing starts with a category chooser; the place form, page and cards are rendered from the profile; hours with open now; places rails on category and town pages; database validation equal to the form's, owner-only edits and hiding, duplicate and daily-limit guards. Asset/cache version 51 · risk HIGH · issue #64
- 2026-10-12 · [[src/Database/Reviews]] · reviews of places: stars, text and visit month, one per member, owner answers, member reports that hold a review after three, administrator keep/remove; exact rating counters kept by the database; anti-fraud guards (own place, new accounts, daily limit). Asset/cache version 52 · risk MED · issue #66

## v0.3.0
Release production site-URL guard, tolerant map location, empty-camera map reads, recurring activities listed once, nearby discovery by town and radius, one rail per event with hidden gems, category-specific places with adaptive publishing, and reviews with owner answers and moderation. Migrations event_series, places and reviews applied to development and production; function definitions verified identical before replacement.

## v0.5.0
Organizer cover photographs for activities across all categories, trusted server-only media confirmation, shared actor reservation limits, race-safe pending cleanup and48px removal controls. Existing source covers remain labeled accurately. Additive migrations prepare both environments before new callers deploy; legacy member confirmation grants are removed after cutover. Development browser upload/replace/remove and storage cleanup are verified; production smoke/parity follow deployment.

- 2026-10-12 · [[seams/SearchConsole]] · verify the production Domain property through Cloudflare DNS, submit the generated sitemap (192discovered pages), and validate homepage indexing/crawl access · issue #45.
- 2026-10-12 · [[src/Public/Assistant]] · the assistant renders only on the root homepage; reply playback is removed while optional dictation stays; while its dialog is open the page underneath cannot scroll, and the original position returns on close, Escape, external dismissal and navigation. Asset/cache version 58 · risk LOW · issue #86
- 2026-10-12 · [[src/Public/Map3d]] · the 3D map turns freely by drag, twist, tilt, keyboard and turn buttons with a north compass; 2D stays north-up. The visible location explanation box is removed (status and help remain for screen readers). Photography credits are linked by version and asset HTML is revalidated, so style changes reach returning visitors. Asset/cache version 59 · risk LOW
- 2026-10-12 · [[src/Services/Contact]] · contact page in the app's form layout that never exposes the team address: messages are validated, rate-limited by a keyed daily fingerprint, recorded, then relayed by email with the sender as reply-to; bot defenses are a silent trap field, a signed timing stamp and the origin guard. Linked from the footer and the account menu. Asset/cache version 59 · risk MED
- 2026-10-12 · [[src/View/Components/A11y]] · accessibility toolbar on every page (Alt+A): six profiles, text size, line height and letter spacing, readable and dyslexia fonts, title and link highlights, left alignment, six color modes, stop animations, hide images, mute sounds, reading guide and mask, big cursor, strong focus and a page map. Settings apply before first paint and stay in the browser · risk LOW
- 2026-10-12 · [[src/Database/Discovery]] · discovery radius and up to five favourite towns in account settings (they fill the home nearby rail when the browser remembers no choice and lift recommendations); ranking adds quality, freshness, fill and report signals and hides near-duplicate listings; Most popular sort; saved searches from any listing, kept on the Activity page with list and map links; the map gains the listing's date, category and free filters and a link back to the same list · risk MED
- 2026-10-12 · [[src/View/Components/A11y]] · accessibility panel laid out as a floating card: header with close, language, title and Reset / Statement / Hide pills; OFF/ON profile rows with outline glyphs on transparent backgrounds; content, color and orientation cards; footer with the Alt + A shortcut. New accessibility statement at `/accessibility` on the existing legal template, linked from the panel and the footer · risk LOW

- 2026-10-13 · #88 · restore essential contact delivery with separate environment-scoped application credentials; normalize fixed-panel footer reservation under accessibility scaling, and make shared operational logging admission transactional. Live production application rollout remains pending.

- 2026-10-13 · #89 · enforce private activity detail/direct attendee audiences and approved-cohort attendee lists; member public/historical cards derive coarse coordinates. Both databases verified with role rollback tests and unchanged production publication count; the full published-contract gate remains open.

- 2026-10-13 · #89 · redact private calendar/digest URL capabilities in platform and remote access logs, including repeated-slash/encoded variants; source release remains gated by the full published-contract audit.

2026-10-13 · #89 — Guard optional digest delivery with current consent generation, record digest preference changes, retain idempotent service-only unsubscribe and canonical no-login confirmation routes with private/no-store/no-referrer. Additive suppression migration applied and rollback-verified in both databases; no optional production scheduling enabled.17suites/541assertions plus browser harnesses pass.

2026-10-13 · #88 — Stop location camera oscillation: no empty-result widening or speed-driven zoom, initial coarse fit/precise refinement once, retained intended animated zoom and explicit exploration detach. Preserve existing map cards/mobile sheet; no hover popup. Normal-motion/deferred location regressions and independent review pass; asset revision61. Physical iPhone verification and production app rollout remain pending.

2026-10-13 · #88 — Add inclusive Puerto Rico date ranges with a bilingual, keyboard-accessible calendar across discovery surfaces; compact map filters and explicit sheet rows remove excess list spacing. Calendar/domain regressions and desktop/320–390px Chrome checks pass; asset revision62.

2026-10-13 · #88 — Inspect Airbnb's live calendar, expanded map and loading skeleton, then unify neutral discovery pickers including home nearby selectors. Omit the accessibility launcher on map, add reversible rounded expansion and request-driven three-dot status, and render a fail-open home readiness skeleton. Independent review,17suites/552assertions and focused browser harnesses pass; actual320px Chrome verifies home pickers and expansion restoration. Asset revision63. No migration or production app promotion; physical iPhone and published-contract release gates remain.

- 2026-10-14 · #101 · Add home/search quick traits with retained filters, organizer age/access facts and qualified detail display. Apply and rollback-verify trait-aware recurring selection and compatible form RPCs in both databases; production data unchanged. Explicit search actions scroll smoothly to results with reduced-motion/history safeguards.18suites/616assertions plus browser harnesses and actual Codex-browser consent/create/edit/cancel/search checks pass. Asset/cache71; no application deployment.

- 2026-10-14 · visitor release guards · #107: preserve English titles across refreshed pins, trip labels and assistant sources; keep mobile forecast rows at their natural height; leave missing rain probability unknown; exclude multiday spans without daily hours from timed plans; reserve each provider call atomically across chat and translations with separate dev/prod allocations. Asset76. Both databases passed rollback guard tests and23-function/ACL parity; production publications preserved.

- 2026-10-14 · #107 UI verification: compact173px default weather card with optional hourly forecast, always-visible official alerts, idempotent refresh, active-sky-only animations and reduced-motion fallback; desktop map accessibility moved away from zoom/expansion, trip widget clear of the sidebar header. Asset77.

- #120: map place distances now require an explicit visitor origin; camera ordering stays internal. Applied and checked in both environments.

- #124: complete keyset-paged place discovery and McDonald spelling variants; visible expanded-map previews, clear gesture hit areas and44px rotation joystick; consistent scrollable card copy and exact-header social branding. Matching database migrations verified in both environments; production app verification follows release.

- #124: move shared link feedback after script-owned click handlers; keep pagination locking local and regress listener checkpoint order plus repeated pages.

- #124: store actual PNG bytes for the sharing image and validate its signature/IHDR dimensions; refresh social metadata to asset85.

- 2026-10-15 · release0.11.3 · #124 production verification complete: build f58dd6b8ea38/asset85,44px map joystick, bounded complete discovery and real PNG sharing image.18suites/662assertions pass; both database environments match. Physical multitouch remains a stated testing limitation.

## #137 · Original community discussions
Bounded public question/reply reads and full-text search; ownership, moderation, report privacy and serialized posting budgets. Forum data included in personal exports across states; account cascades and paused export preserved. Matching reviewed migrations applied to both projects, with isolated development rollback and concurrent-write verification. No forum seed in production.

#137 presentation: compact discussion rows, original responsive board, native composers, threaded reply pages and private moderation UI; no fake images or discussions. Held-parent actions and draft fallback match database visibility.

#137 integration: bilingual community navigation, guarded routes, public board sitemap, factual forum privacy disclosures and asset/cache88. Full gate19suites/696assertions plus browser harnesses; independent review and real browser contribution/moderation/pagination checks pass.

## v0.13.0
Promote reviewed compact discovery cards (#138) and original bilingual community forum (#139–141). Matching forum migrations are applied to both databases; production discussions remain empty. Validation:19suites/696assertions plus browser harnesses, independent review, controlled contribution/moderation/paging flows at desktop and phone widths. Production deployment verified: v0.13.0/buildb713b2ba2821, live phone/desktop layouts and guest contribution guard; dev synchronized.
