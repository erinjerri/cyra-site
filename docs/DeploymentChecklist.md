# Deployment Checklist

## Environment variables

Copy `.env.example` to `.env` and set:

- `DATABASE_URI` or `MONGODB_URI` - MongoDB connection string. Payload uses MongoDB for content, users, globals,
  and media metadata.
- `PAYLOAD_SECRET` - long random string, unique per environment.
- `NEXT_PUBLIC_SERVER_URL` - the site's public URL. For production on Cloudflare, use
  `https://creatingyourreality.co`. This drives canonical URLs, JSON-LD, OpenGraph URLs, and the sitemap.
- `NEXT_PUBLIC_BETA_SIGNUP_URL` - POST target for the beta email form.
- `NEXT_PUBLIC_SUBSTACK_EMBED_URL` - Substack link used by the "Join Substack" button. Leave unset and the
  button simply doesn't render.
- `R2_BUCKET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_URL` - Cloudflare R2
  settings for uploaded media if you wire external storage.

If you are deploying to Cloudflare and want uploads to persist, you also need one of:

- a Payload upload adapter that writes to R2, or
- a persistent filesystem volume mounted at `public/media`.

MongoDB does not store the binary image files themselves. It stores the document metadata that points to the files.

## Standard installation

This is the expected install flow for a clean machine or CI environment:

```bash
cp .env.example .env
pnpm install
pnpm generate:types
pnpm generate:importmap
pnpm seed
pnpm dev
```

Then visit:

- `/` to confirm the homepage loads
- `/admin` to create the first admin user
- `/philosophy` to confirm seeded content
- `/does-not-exist` to confirm the 404 page

## First run
The `pnpm seed` command upserts Header, Footer, home page, and philosophy page. It is safe to re-run.

## Before every deploy

```bash
pnpm lint
tsc --noEmit
pnpm build
```

`sitemap.xml` and `robots.txt` are served dynamically at runtime (`src/app/(frontend)/sitemap.ts`,
`robots.ts`), generated from live Payload data on each request — nothing to regenerate at build time, and
nothing to spot-check in `public/`. Spot-check `/sitemap.xml` and `/robots.txt` on the running app instead.

## Before a real production launch

These are known, deliberately-deferred gaps (see also `docs/Roadmap.md`):

1. **Media storage adapter.** `media` uploads currently write to `public/media` on local disk
   (`src/collections/Media.ts`, `upload.staticDir`). That does not survive a serverless deploy or a container
   redeploy without a persistent volume. Wire an object-storage adapter for Cloudflare R2 or mount persistent
   storage in whatever container platform is used (the repo ships a `Dockerfile`).
2. **Social links.** All footer "Social" links are seeded as `comingSoon: true` placeholders — no real
   LinkedIn/GitHub/YouTube/Substack URLs exist yet. Set them in `/admin` (Footer global) once they do; the
   `comingSoon` checkbox flips them from a disabled label to a live link with no code change.
3. **First admin user.** Create it via `/admin` on the target database before handing off editor access.
4. **`plugin-form-builder` / `plugin-search`** are installed but unused — only wire them if a real form or
   site search becomes a requirement; don't turn them on speculatively.
