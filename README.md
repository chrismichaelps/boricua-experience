# Boricua Experience

Find something to do in Puerto Rico, ask to join, or host your own. Live at
[boricuaexperience.com](https://boricuaexperience.com).

Written in [Pudu](https://github.com/chrismichaelps/pudu-lang). Data lives in Supabase (Postgres with
PostGIS), and the site runs on Vercel as a single function plus static assets.

## Run it locally

You need the Pudu 0.1.3 compiler, Docker, and the Supabase CLI.

```bash
supabase start
cp .env.example .env
scripts/dev.sh
```

`supabase start` brings up a local database with the schema and test data; copy its URL and keys
into `.env`. The app runs on <http://localhost:8080>. `dev.sh` refuses to run against a hosted
database unless you set `BORICUA_ALLOW_REMOTE_DB=1`.

## Test

```bash
pudu test
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
