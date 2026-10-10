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
