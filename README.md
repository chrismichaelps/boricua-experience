<p align="center">
  <img src="public/assets/brand/logo.svg" alt="Boricua Experience" width="96" height="96" />
</p>

# Boricua Experience

Find something to do in Puerto Rico, ask to join, or host your own. Live at
[boricuaexperience.com](https://boricuaexperience.com).

Written in [Pudu](https://github.com/chrismichaelps/pudu-lang). Data lives in Supabase (Postgres with
PostGIS), and the site runs on Vercel as a Pudu function, a narrow Node streaming adapter and static assets.

## Run it locally

You need the Pudu0.1.3 compiler, Node22 and the Supabase CLI.

```bash
cp .env.example .env
scripts/dev-db.sh
scripts/dev.sh
```

Fill `.env` with the development project's URL, keys, and database password, and the development
Google OAuth client. `dev-db.sh` applies the migrations, the test data, and the auth settings to
that project. The app runs on <http://localhost:8080>; Pudu listens internally on8082. Both scripts refuse the production project,
whose secrets live only in Vercel. With Docker, `supabase start` gives a local database instead.

## Assistant

Signed-in members can ask about current activities or their own preferences. The server uses
OpenRouter's free router with bounded database tools, genuine streaming and safe Markdown.
An optional `BORICUA_OPENROUTER_KEY` stays server-side. Dev and production use separate keys,
but provider account limits remain shared: routing does not create more quota. Current project
ceilings are2requests/minute and7/day, at most3provider calls per request. Paid fallback is disabled.
Private database migrations supply the service-only reservation RPC; no business data is baked into
application code. Voice dictation requires browser support and produces an editable transcript.

## Test

```bash
scripts/test.sh
```

## Deploy

```bash
scripts/fetch-runtime.sh
BORICUA_SITE_URL=https://boricuaexperience.com scripts/build-vercel.sh
vercel deploy --prebuilt --prod
```

After a database migration, `scripts/check-production-data.sh` confirms no test data reached
production.

## Layout

| Path | What is there |
| --- | --- |
| `src/` | The application, in layers: constants, utils, domain, i18n, validation, api, services, app, view, web |
| `public/` | Styles, browser scripts, the map style, brand assets, photographs |
| `test/` | Unit and presentation tests with JSON fixtures |
| `scripts/` | Local run, build, deploy, and data checks |
| `wiki/` | Architecture, decisions, and a page for every source file |

## License

Proprietary, all rights reserved; see `LICENSE`. Third-party work keeps its own licenses, listed in
`THIRD_PARTY_NOTICES.md`.
