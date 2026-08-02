# Deployment Checklist

## Environment variables

Copy `.env.example` to `.env` and set:

- `DATABASE_URI` — MongoDB connection string (replica set required for transactions).
- `PAYLOAD_SECRET` — long random string, unique per environment.
- `NEXT_PUBLIC_SERVER_URL` — the site's public URL (`https://creatingyourreality.xyz` in production). Drives
  canonical URLs, JSON-LD, OpenGraph URLs, and the sitemap.
- `NEXT_PUBLIC_BETA_SIGNUP_URL` — POST target for the beta email form.
- `NEXT_PUBLIC_SUBSTACK_EMBED_URL` — Substack link used by the "Join Substack" button. Leave unset and the
  button simply doesn't render (see `src/components/TimeBite/BetaSignup.tsx`).
- R2 vars (`R2_BUCKET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_URL`) —
  **not consumed by any code yet**, see "Before a real production launch" below.

## First run

```bash
pnpm install
pnpm generate:types
pnpm generate:importmap
pnpm seed        # upserts Header, Footer, home page, philosophy page — idempotent, safe to re-run
pnpm dev
```

Visit `/`, `/philosophy`, `/admin` (create the first admin user), and a nonsense slug like `/does-not-exist`
to confirm the 404 renders.

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
   (`src/collections/Media.ts`, `upload.staticDir`). That does not survive a Vercel/serverless deploy or a
   container redeploy without a persistent volume. Either wire `@payloadcms/storage-s3` (R2 is
   S3-compatible) using the `R2_*` env vars already documented, or mount persistent storage in whatever
   container platform is used (the repo ships a `Dockerfile`).
2. **Social links.** All footer "Social" links are seeded as `comingSoon: true` placeholders — no real
   LinkedIn/GitHub/YouTube/Substack URLs exist yet. Set them in `/admin` (Footer global) once they do; the
   `comingSoon` checkbox flips them from a disabled label to a live link with no code change.
3. **First admin user.** Create it via `/admin` on the target database before handing off editor access.
4. **`plugin-form-builder` / `plugin-search`** are installed but unused — only wire them if a real form or
   site search becomes a requirement; don't turn them on speculatively.
