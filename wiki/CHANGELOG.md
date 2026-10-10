# Changelog

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
