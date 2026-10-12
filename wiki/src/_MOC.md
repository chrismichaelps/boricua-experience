---
type: moc
tags: [moc, modules]
---

# Modules

One page per source file under `src/`, grouped by layer in dependency order ([[architecture/_MOC#Layers]]).

## Constants

- [[src/Constants/App]] — Product names, policy versions, the theme colour, Puerto Rico's UTC offset, the minimum age, the asset version, and the island's bounding box and map centre.
- [[src/Constants/Codes]] — Every failure code the database API or the server raises, and the translation key shown for it.
- [[src/Constants/Cookies]] — The session, sign-in flow, language, consent, visitor, and flash cookie names and their lifetimes.
- [[src/Constants/Http]] — Media types, cache policies, the scripts' request marker, the content security policy, and the security headers every response carries.
- [[src/Constants/Limits]] — Field lengths matching the database checks, page sizes, radii, token refresh margin, cache lifetime, and body size.
- [[src/Constants/Routes]] — Every page, action, JSON endpoint, and reference document path, and the prefixes used to build links.
- [[src/Constants/Supabase]] — The name of every database function the server calls, the identity endpoints, header names, the named client, and its timeouts.

## Utils

- [[src/Utils/Claims]] — Reads the subject, email, expiry, issue time, and provider from an access token's payload.
- [[src/Utils/Cookie]] — Parses a `Cookie` header into a map and writes `Set-Cookie` values.
- [[src/Utils/Form]] — Reads text, paragraphs, checkboxes, and whole numbers from posted fields.
- [[src/Utils/Geo]] — Bounds checks, coordinate parsing, and distance labels.
- [[src/Utils/Money]] — Writes prices from cents and reads price fields into cents.
- [[src/Utils/Query]] — Builds a query string from pairs, leaving out empty values.
- [[src/Utils/Text]] — Text shaping for display and form input: collapsing space, shortening with an ellipsis, and avatar initials.
- [[src/Utils/Time]] — Reads database timestamps, converts instants to Puerto Rico wall-clock readings, and reads and writes `datetime-local` form values.
- [[src/Utils/Wire]] — Decodes JSON into whichever `Json.Decode` type the caller's annotation names; the one generic seam between raw answers and typed values.

## Domain

- [[src/Domain/Menu]] — Structured menu projections and editable documents with unknown price and availability preserved.

- [[src/Domain/Admin]] — The administrator's overview counts and open reports.
- [[src/Domain/Catalog]] — Category and municipality reference values and lookups by slug.
- [[src/Domain/Consent]] — Which optional cookie uses a visitor allowed, and the versioned cookie value that remembers it.
- [[src/Domain/Credentials]] — Sign-up, sign-in, new password, and onboarding form records.
- [[src/Domain/Draft]] — The publishing form's raw values, the validated values sent to the database, and the published result.
- [[src/Domain/Event]] — The card (listing projection), the page of cards, and the full detail with organizer, attendees, revealed location, and the viewer's relation.
- [[src/Domain/Index]] — One sitemap entry: path, last change, priority.
- [[src/Domain/Locale]] — Spanish (default) and English, with codes, language tags, and negotiation from `Accept-Language`.
- [[src/Domain/Location]] — A browser reading, what the database did with it, and a co-attendee's live position.
- [[src/Domain/Notification]] — Inbox entries with their event and actor.
- [[src/Domain/Participation]] — A member's own requests, an organizer's queue, and the small states actions answer.
- [[src/Domain/Problem]] — The single failure type of every service, with its HTTP status, stable code, and message key; field errors for forms.
- [[src/Domain/Profile]] — The signed-in account with preferences and counts, the public organizer profile, and the edit records.
- [[src/Domain/Search]] — Search filters, sort, and date windows with their wire names.
- [[src/Domain/Session]] — The sealed session, the sign-in flow, and the identity provider's tokens.

## I18n

- [[src/I18n/Dates]] — Weekday and month names, short and long dates, relative days (today, tomorrow, weekday), card time lines, and full schedules, in Puerto Rico time.
- [[src/I18n/En]] — The English catalogue.
- [[src/I18n/EnAccount]] — English sign-in, account, form, problem, notice, and inbox text.
- [[src/I18n/EnLegal]] — English counterpart of [[src/I18n/EsLegal]].
- [[src/I18n/Es]] — The Spanish catalogue: every user-facing string by key.
- [[src/I18n/EsAccount]] — Spanish sign-in, account, form, problem, notice, and inbox text.
- [[src/I18n/EsLegal]] — Spanish terms, privacy policy, cookie policy, and about page, section by section.
- [[src/I18n/Format]] — Price (free or dollars), going counts, seats left, distance, and category names.
- [[src/I18n/Translate]] — Looks up a key across the interface, account, and policy catalogues in the reader's language with Spanish as fallback, fills `:name` placeholders, and picks singular or plural forms.

## Config

- [[src/Config/Settings]] — Binds every setting from `.env` (when present) over the process environment, validates them together, and keeps keys as secrets.

## Validation

- [[src/Validation/Account]] — Sign-up, sign-in, recovery address, new password, onboarding, profile, and preferences.
- [[src/Validation/Avatar]] — Decodes a base64 photo (bare or as a data address), refuses anything over 600 KB, and recognises WebP, JPEG, or PNG by their leading bytes.
- [[src/Validation/Check]] — Runs a validator and turns its failures into `Problem.Invalid`, one field error per field, keyed by the rule's message key.
- [[src/Validation/EventForm]] — Checks every publishing field and converts the draft into database values: coordinates, UTC timestamps, capacity, and cents.
- [[src/Validation/Location]] — A reading must lie in Puerto Rico with an accuracy from 0 to 100 km.
- [[src/Validation/Participation]] — Message and note lengths, report reasons, and reaction values.

## Api

- [[src/Api/Menus]] — Typed menu read and revision-checked save adapter.

- [[src/Api/Account]] — Account reads and writes, notifications, consent records, and the data-subject operations.
- [[src/Api/Admin]] — Administrator overview, open reports, and resolution.
- [[src/Api/Catalog]] — Reference lists.
- [[src/Api/Events]] — Search, recommendations, nearby, detail, attendees, organizer listings, publishing, editing, cancelling, view counting, and sitemap rows.
- [[src/Api/Location]] — Recording, stopping, deleting, and reading co-attendee positions.
- [[src/Api/Participation]] — The join flow and engagement calls.
- [[src/Api/Supabase/Gateway]] — The single client every database and identity call goes through: pooled keep-alive TLS connections to the project, a resilience pipeline chosen per call, and failure translation into `Problem`.
- [[src/Api/Supabase/Identity]] — The identity provider: email sign-up with confirmations, password sign-in, refresh, PKCE code exchange, recovery, password change, sign-out, the external-provider address, and deletion with the service key.

## Services

- [[src/Services/Account]] — Profile reads and edits, preferences, onboarding, and notifications.
- [[src/Services/Admin]] — Overview counts with open reports, and report resolution.
- [[src/Services/Auth/Accounts]] — Identity use cases: sign-up with confirmations (signed in at once or after the email link), password sign-in, provider sign-in through PKCE, finishing a redirect, recovery, password change, sign-out, and confirming presence before deletion.
- [[src/Services/Auth/Pkce]] — PKCE verifiers (32 random bytes, base64url), their S256 challenges, and random tokens for visitors and form keys.
- [[src/Services/Auth/Sealer]] — Seals sessions and sign-in flows into cookie values with the standard library's authenticated cipher, bound to their purpose; opens them only when genuine.
- [[src/Services/Auth/Sessions]] — Builds sessions from tokens, refreshes them before they expire, and signs and checks the token every form carries.
- [[src/Services/Catalog]] — Both reference lists, read at most once per ten minutes per instance.
- [[src/Services/Discovery]] — The home rails read in parallel (recommended, next, this weekend, free this week), search with date windows in Puerto Rico time, typeahead suggestions, and map pins.
- [[src/Services/Events]] — Event pages (counting a view for non-organizers), attendee lists, publishing and editing through validation, and cancelling.
- [[src/Services/Location]] — Records readings, stops sharing, erases history, and reads co-attendee positions.
- [[src/Services/Participation]] — The join flow, the organizer's queue, saves, reactions, reports, and the activity page's three lists read in parallel.
- [[src/Services/Privacy]] — Records cookie choices, exports everything held as JSON, pauses and reactivates, and deletes the account after confirming presence.
- [[src/Services/Runtime]] — The record every service receives: the gateway, the 32-byte session key, the site origin, whether cookies are `Secure`, and the per-instance catalogue cache.
- [[src/Services/Seo]] — Fixed pages, every category and municipality page, and public events (upcoming and the last 90 days).

## App

- [[src/App/Assembly]] — Builds the mediator from the pipeline and every subsystem's handlers, reporting every registration problem at once.
- [[src/App/Handlers/Account]] — Registers one mediator handler per kind of profile, preferences, onboarding, inbox; each lifts a service result into the mediator's outcome.
- [[src/App/Handlers/Admin]] — Registers one mediator handler per kind of the administrator's dashboard; each lifts a service result into the mediator's outcome.
- [[src/App/Handlers/Discover]] — Registers one mediator handler per kind of home, search, suggestions, pins, catalogue, and sitemap; each lifts a service result into the mediator's outcome.
- [[src/App/Handlers/Events]] — Registers one mediator handler per kind of event pages and publishing; each lifts a service result into the mediator's outcome.
- [[src/App/Handlers/Identity]] — Registers one mediator handler per kind of signing up, in, out, and recovering; each lifts a service result into the mediator's outcome.
- [[src/App/Handlers/Location]] — Registers one mediator handler per kind of live location; each lifts a service result into the mediator's outcome.
- [[src/App/Handlers/Participation]] — Registers one mediator handler per kind of joining, deciding, saving, reacting, reporting; each lifts a service result into the mediator's outcome.
- [[src/App/Handlers/Privacy]] — Registers one mediator handler per kind of consent, export, pause, reactivation, deletion; each lifts a service result into the mediator's outcome.
- [[src/App/Logging]] — Two loggers: one event per request, and the mediator's events, quiet unless debugging.
- [[src/App/Messages]] — The message records and the `Kinds` record: one typed request kind per use case, tagged read, command, or identity.
- [[src/App/Pipeline]] — The open behaviors every message runs through: the logging recorder outermost, an exception action that logs faults as errors and unavailable dependencies as warnings, and validation bounds on search and suggestion text; plus the mapping from mediator failures to `Problem`.

## View

- [[src/View/Calendar]] — An iCalendar file for one event, with its page address.
- [[src/View/Components/Avatar]] — Initials avatars with a stable colour per name, and overlapping stacks with a count.
- [[src/View/Components/EventCard]] — The event card (cover, price, policy flag, time line, title, place, going, likes, seats, distance), sideways rails, and grids.
- [[src/View/Components/Moment]] — dates and times as `<time>` elements the browser rewrites in the reader's zone.
- [[src/View/Components/Form]] — Labelled inputs, text areas, selects, checkboxes, switches, the hidden form token, and the problem banner, wired with `aria-invalid` and `aria-describedby`.
- [[src/View/Components/Icons]] — Original line icons as inline SVG, hidden from assistive software; a const table of path data.
- [[src/View/Components/Notice]] — The polite toast, empty states, and the cookie choice (accept, necessary only, customize).
- [[src/View/Components/People]] — Organizer card with tenure and hosting record; attendee list honouring [[decisions/ADR-0007-attendee-visibility]].
- [[src/View/Components/Search]] — The white search pill (what, where, when, round submit, suggestions list), scrolling category chips, and the GET filter bar.
- [[src/View/Frame]] — The record every page renders with: locale, origin, path, query, member, form token, consent, flash key, and the clock.
- [[src/View/Layout]] — The document shell: head tags (icons, manifest, font preload, stylesheet, module script, CSRF meta), app bar with language switch and account, main, footer, mobile tab bar, cookie banner, toast, and live badge.
- [[src/View/Pages/Account]] — Profile form, preferences with switches and visibility choices, location history deletion, password change, export, pause, delete, and sign-out.
- [[src/View/Pages/Activity]] — Three sections with in-page tabs and statuses.
- [[src/View/Pages/Admin]] — Metric tiles and open reports with dismiss and act.
- [[src/View/Pages/Auth]] — Sign-in, sign-up with the three confirmations, check-your-email, recovery, new password, and welcome pages.
- [[src/View/Pages/Errors]] — 404, problem, and offline pages.
- [[src/View/Pages/Event]] — The event page: cover with share and save, heading, reactions, description, facts, place (revealed or locked), organizer, attendees, live arrivals, report, and the join panel for every state.
- [[src/View/Pages/EventForm]] — The publishing form in sections with the map pin picker, choices for visibility and policy, and inline errors.
- [[src/View/Pages/Home]] — Hero frame with the search pill, chips, rails (for you, weekend, soon, free), near-you and create tiles, and the municipality directory.
- [[src/View/Pages/Legal]] — Policy pages built from section keys, with the version line and a cookie-choice reset on the cookie page.
- [[src/View/Pages/Manage]] — Pending requests with approve and decline (with note), then answered ones.
- [[src/View/Pages/Map]] — Full-screen map, near-me and live switches, the pin data as inline JSON, and the bottom sheet of cards.
- [[src/View/Pages/Notifications]] — Notifications with kind icons, decision notes, and mark-all-read.
- [[src/View/Pages/Profile]] — Public profile with stats and upcoming events; indexable only when it has upcoming events.
- [[src/View/Pages/Search]] — Results with the pill, chips, filter bar, grid, and load-more; landing pages for a category or town with breadcrumbs; JSON card fragments for load-more.
- [[src/View/Seo]] — Title, description, robots, canonical and alternates, Open Graph and Twitter tags; JSON-LD for the site, events, breadcrumbs, and profiles; `robots.txt`; the sitemap; the web app manifest.

## Web

- [[src/Web/Access]] — Writes method, path (never the query), status, and milliseconds for each request; errors for 5xx.
- [[src/Web/Context]] — Resolves the visitor: locale (cookie, then `Accept-Language`), sealed session refreshed when needed, member profile for pages, consent choice, visitor id, and flash; builds the view frame.
- [[src/Web/Guard]] — Every state change must be a POST whose `Origin` (or `Referer`) is the site and, for members, carry the session's form token.
- [[src/Web/Handlers/Account]] — Routes for the account page, profiles, notifications, and onboarding: `/account`, `/account/profile|preferences|password`, `/u/:id`, `/notifications`, `/notifications/read`, `/welcome`.
- [[src/Web/Handlers/Admin]] — Routes for the administrator's dashboard and decisions: `/admin`, `/admin/reports/:id`.
- [[src/Web/Handlers/Discover]] — Routes for home, search, landing pages, the map, and suggestions: `/`, `/search`, `/c/:slug`, `/pueblo/:slug`, `/map`, `/api/suggest`, `/api/nearby`.
- [[src/Web/Handlers/Events]] — Routes for event pages, calendar files, publishing, editing, cancelling: `/e/:slug`, `/e/:slug/calendar.ics`, `/create`, `/e/:slug/edit`, `/e/:slug/cancel`.
- [[src/Web/Handlers/Identity]] — Routes for signing in, up, out, with Google, and recovering: `/signin`, `/signup`, `/auth/google`, `/auth/callback`, `/recover`, `/reset-password`, `/signout`.
- [[src/Web/Handlers/Location]] — Routes for live location for the map and event pages: `/api/location`, `/api/location/stop`, `/api/e/:slug/positions`.
- [[src/Web/Handlers/Participation]] — Routes for joining, deciding, saving, reacting, reporting, activity: `/e/:slug/join|withdraw|save|react|report`, `/e/:slug/requests`, `/requests/:id/decide`, `/activity`.
- [[src/Web/Handlers/Privacy]] — Routes for cookie choices, language, export, pause, deletion: `/consent`, `/language`, `/account/export|location-history|pause|reactivate|delete`.
- [[src/Web/Handlers/Site]] — Routes for sitemap, robots, manifest, health, policies, and the offline page: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/health`, `/terms`, `/privacy`, `/cookies`, `/about`, `/offline`.
- [[src/Web/Platform]] — Reads the request from an invocation (wrapped `Action: Invoke` bodies or gateway shapes, base64 bodies, list headers) and writes the answer with every `Set-Cookie` as one list inside `headers`, the only object the platform launcher reads.
- [[src/Web/Respond]] — Page, redirect, JSON, and document responses; session, flow, flash, and preference cookies; problem answers (sign-in redirect, onboarding, JSON for scripts, error pages); and `finish`, which writes a renewed or ended session, consumes the flash, adds security headers, and chooses the cache policy.
- [[src/Web/Router]] — Concatenates every handler module's routes and answers a 404 page for the rest.
- [[src/Web/Serve]] — The handler shapes: `page` (any visitor, member loaded, onboarding gate), `memberPage`, `action` (guarded), `memberAction`, and `api`; plus `ask` through the mediator and request readers.
- [[src/Web/Static]] — Serves `public/` for assets, the service worker, and the favicon in development, with media types from a const table.

## (entry)

- [[src/Function]] — Builds the application once per cold start, then answers platform invocations through [[src/Web/Platform]] until stopped.
- [[src/Main]] — Loads settings, builds the runtime and application, and serves the router on a socket with static files and access logs.

## Referenced by

[[00-INDEX]]

- [[src/Public/Styles]] · [[src/Public/Brand]] · [[src/Public/ServiceWorker]] — homepage and offline shell.

- [[src/Test/Presentation]] · [[src/Test/ServiceWorker]] — rendered output and offline privacy regressions.

- [[src/Public/Live]] · [[src/Public/Explorer]] — location lifecycle and filtered map integration.

- [[src/Test/Location]] — browser watch lifecycle regressions.

- [[src/Domain/Catalog]] · [[src/View/Components/Hero]] · [[src/Public/Carousel]] · [[src/Public/BrowserMain]] · [[src/Public/BrowserConfig]] — automatic home scenes and controls.

- [[src/Test/Carousel]] — carousel timing, manual controls and motion regression tests.

- [[src/View/Components/Footer]] — branded app navigation and legal footer.

- [[src/Public/SearchPickers]] · [[src/Public/SearchStyles]] — progressive search selectors.

- [[src/Public/AccountMenu]] — header account menu (popover on wide screens, sheet on phones) and the bell that rings for new notifications.
- [[src/Public/Motion]] · [[src/Public/MotionVendor]] · [[src/Public/ExperienceStyles]] · [[src/Public/Covers]] — native feedback and design refinement.

- [[src/Test/Motion]] — animation lifecycle regressions.

- [[src/Public/Photographs]] — licensed real Puerto Rico destination photographs.

- [[src/Public/Markers]] — accessible map marker construction.

- [[src/Public/MapLoader]] — local map runtime configuration.
- [[src/Public/EventMaps]] — event and publisher map surfaces.

- [[src/Public/MapClusters]] — lossless overview marker grouping.
- [[src/Test/MapClusters]] — grouping regressions.

- [[src/Public/MapViewport]] · [[src/Test/MapViewport]] — viewport discovery and regression boundaries.

- [[src/Public/LocalTime]] — dates and times in the reader's own zone.
- [[src/Public/Haptics]] · [[src/Public/SheetGestures]] · [[src/Database/MapEvents]] · [[src/Test/Interactions]] — native mobile input and spatial read boundaries.

- [[src/Public/Http]] · [[src/Public/Toggle]] — cancellation transport and serialized interactions.

- [[src/Public/PrivacyControls]] — native privacy disclosure with optional Motion.

- [[src/Test/AccountMenu]]

- [[src/Constants/Assistant]] — live assistant boundary.

- [[src/Domain/Assistant]] — live assistant boundary.

- [[src/Services/Assistant]] — live assistant boundary.

- [[src/Web/Handlers/Assistant]] — live assistant boundary.

- [[src/View/Components/Assistant]] — live assistant boundary.

- [[src/Public/Assistant]] — live assistant boundary.

- [[src/Database/AssistantQuota]] — live assistant boundary.

- [[src/Public/AssistantStream]] — streaming assistant contract.

- [[src/Test/Assistant]] — streaming assistant contract.

- [[src/Public/AssistantStyles]] — streaming assistant contract.

- [[src/Public/AssistantMarkdown]]
- [[src/Public/Marked]]

- [[src/Public/Locate]] — bounded explicit publishing location lookup.

- [[Public/BrowserMessages]] — localized browser location and interaction feedback.

- [[src/Test/Domain]] — domain and nullable account-profile regressions.
- [[src/Test/Menus]] — Menu wire contract regressions for unknown facts and write shapes.

[[src/Infrastructure/SupabaseConfig]]

- [[src/Public/Passwords]] · [[src/Public/SubmitFeedback]] — local password guidance and native submission feedback.
- [[src/Test/FormFeedback]] — native and asynchronous submission lifecycle regressions.

- [[src/Database/OptionalEventFacts]] — nullable publication facts and finite discovery policy.

- [[src/Database/Menus]] — normalized category-authorized restaurant menus and owner revisions.

- [[src/Services/Menus]] — Viewer-authorized menu reads.
- [[src/Web/Handlers/Menus]] — Dedicated menu reader route.
- [[src/View/Pages/Menu]] — Bilingual structured menu reader.
- [[src/Public/MenuStyles]] — Responsive menu layout.
- [[src/Test/MessageKeys]] — Deterministic dynamic-menu translation key coverage.

- [[src/Public/CreditsStyles]] — Readable photography attributions.

- [[src/Constants/Menus]] — Owner menu protocol bounds.
- [[src/Domain/MenuDraft]] — Raw owner input and refill.
- [[src/Validation/MenuForm]] — Bounded nested menu validation.
- [[src/Test/MenuForm]] — Raw menu validation boundary regressions.
