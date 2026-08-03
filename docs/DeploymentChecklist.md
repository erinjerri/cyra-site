# Deployment Checklist

Work through the phases in order. The ordering is not arbitrary — see below.

| Phase | What | Why it comes here |
|---|---|---|
| [1](#phase-1--infrastructure) | MongoDB Atlas + Cloudflare R2 | Both must exist before the app stores anything real |
| [2](#phase-2--payload) | Env vars, install, seed, admin user | Needs the connection string and bucket from Phase 1 |
| [3](#phase-3--netlify-and-dns) | Netlify host + Cloudflare DNS | Needs a working app to deploy |
| [4](#phase-4--verify-live) | End-to-end verification | The only proof any of it worked |

## Why this order

**Set up R2 before you upload a single image.**

Payload splits every upload in two: MongoDB stores the *document and metadata*,
the storage layer stores the *actual file bytes*. If R2 is not configured, the
bytes go to `public/media` on local disk. That directory is part of the container
filesystem, so it is wiped on every deploy — the database keeps a record pointing
at a file that no longer exists, and the site renders broken images.

The practical consequence:

> **Any image uploaded before R2 is switched on has to be re-uploaded afterwards.**
> The database row survives, the file does not. There is no way to recover it, so
> every minute spent uploading media before R2 is live is wasted work.

MongoDB comes first alongside it because the app cannot render a single page
without a database — every route reads content from Payload.

---

## Phase 1 — Infrastructure

Do both of these before touching the app.

### 1a. MongoDB Atlas

Payload uses MongoDB for content, users, globals, and media metadata.

1. Create a MongoDB account.
2. Create a project.
3. Create a cluster (the free M0 tier is fine to start).
4. Add your local IP **and** your deployment host to the network access list.
   Netlify builds from rotating IPs, so you will likely need `0.0.0.0/0` for the
   host — restrict it later if that matters to you.
5. Create a database user with a strong password.
6. Copy the connection string — this becomes `DATABASE_URI`.
7. Use the **same** database URI in every environment that should share content.
   Separate URIs mean separate content, which is usually a surprise rather than a
   choice.

Reference tutorials:

- [Building dynamic websites with Payload, App Router, and TypeScript — DB & File Storage](https://www.youtube.com/watch?v=-0CCUkoBDSY&t=692s)
- [How to set up Payload with Supabase](https://www.youtube.com/watch?v=L5w2QYB9-UU&t=161s)

For this repo, prefer MongoDB + Cloudflare R2 over Supabase.

### 1b. Cloudflare R2

The adapter is already wired in code (`src/plugins/storage.ts`) — you only need to
create the bucket and supply credentials.

**Full walkthrough: [docs/MediaStorage.md](./MediaStorage.md).** In short:

1. Create an R2 bucket, one per site.
2. Copy the **Account ID** from the R2 sidebar.
3. Create an API token under **R2 → Manage API Tokens**, permission **Object Read
   & Write**, scoped to that bucket. The secret is shown once.
4. Enable public access with a custom domain, e.g. `media.creatingyourreality.co`.

**R2 credentials are account-scoped, not domain-scoped.** If you already use R2 for
another site in the same Cloudflare account, `R2_ACCOUNT_ID` is the *same value* —
copy it across. Only the bucket name and public hostname differ per site. Access
keys belong to a token, not a domain; make a separate token per site so one leaked
key cannot expose all of them.

---

## Phase 2 — Payload

### Environment variables

Copy `.env.example` to `.env` and set:

| Var | Notes |
|---|---|
| `DATABASE_URI` | From Phase 1a. `MONGODB_URI` also works. |
| `PAYLOAD_SECRET` | Long random string, unique per environment. |
| `NEXT_PUBLIC_SERVER_URL` | `https://creatingyourreality.co` in production. Drives canonicals, JSON-LD, OpenGraph, and the sitemap. |
| `USE_R2_STORAGE` | `true` to activate R2. Leave unset locally to use disk. |
| `R2_BUCKET`, `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_PUBLIC_HOSTNAME` | From Phase 1b. |
| `NEXT_PUBLIC_BETA_SIGNUP_URL` | POST target for the beta form. |
| `NEXT_PUBLIC_SUBSTACK_EMBED_URL` | Substack link. Unset means the button does not render. |

`.env` is gitignored. Never commit real credentials — put production values in the
host's environment settings, not in a file.

### Install and run

```bash
cp .env.example .env
pnpm install
pnpm generate:types
pnpm generate:importmap
pnpm seed
pnpm dev
```

`pnpm seed` upserts the Header, Footer, home page, and philosophy page. It is
idempotent — safe to re-run.

Then check:

- `/` — homepage loads
- `/admin` — create the first admin user
- `/philosophy` — seeded content renders
- `/does-not-exist` — 404 page

### Before every deploy

```bash
pnpm lint
tsc --noEmit
pnpm build
```

`sitemap.xml` and `robots.txt` are served dynamically from live Payload data
(`src/app/(frontend)/sitemap.ts`, `src/app/robots.ts`) — nothing to regenerate at
build time. Spot-check them on the running app instead of in `public/`.

---

## Phase 3 — Netlify and DNS

Netlify runs the app. Cloudflare handles the domain. Neither stores CMS data.

### Netlify

1. Connect the GitHub repository to a Netlify site.
2. Build command: `pnpm build`.
3. Publish directory: `.next`.
4. Set the Node version to match the repo's local runtime.
5. Add every env var from Phase 2 in **Site configuration → Environment variables**.
   - `DATABASE_URI` → the production cluster
   - `PAYLOAD_SECRET` → the production value
   - `NEXT_PUBLIC_SERVER_URL=https://creatingyourreality.co`
   - `USE_R2_STORAGE=true` plus the R2 credentials
6. Deploy once and confirm the app boots.

Env var changes require a redeploy — most hosts do not apply them to a running build.

### Cloudflare DNS

1. Add `creatingyourreality.co` as a custom domain in Netlify.
2. Netlify shows the DNS records it wants.
3. In Cloudflare, point the domain at Netlify using those records.
4. Confirm the domain resolves to the Netlify deployment.

---

## Phase 4 — Verify live

Do not trust a green deploy. Confirm the parts that fail silently:

1. Open `/admin` on the **production** URL and upload a test image.
2. Check the media document's URL. It must be
   `https://media.creatingyourreality.co/...` — not `/api/media/file/...`, which
   means `R2_PUBLIC_HOSTNAME` is unset, and not a local path, which means R2 never
   activated.
3. Confirm the object appears in the Cloudflare bucket listing.
4. Reference that image in a page and confirm the frontend renders it.
5. **Redeploy, then reload the image.** Surviving a redeploy is the actual proof
   that storage is external. This is the step that catches a silently misconfigured
   `USE_R2_STORAGE`.
6. Check `/sitemap.xml` and `/robots.txt` return live content.

If the flag is on but a credential is wrong, storage falls back to disk rather than
crashing. Convenient for uptime, but it means misconfiguration looks like success
until step 5.

---

## Remaining gaps before launch

1. **Social links.** Footer "Social" links are seeded as `comingSoon: true`
   placeholders. Set real URLs in `/admin` (Footer global) and untick the box —
   no code change needed.
2. **Media re-upload.** Any image uploaded before R2 was switched on must be
   re-uploaded. See [Why this order](#why-this-order).
3. **`plugin-form-builder` / `plugin-search`** are installed but unwired. Only turn
   them on if a real form or site search becomes a requirement.

---

## Appendix — the stack, and why not D1

- **MongoDB** — CMS content, users, globals, media metadata
- **Cloudflare R2** — uploaded file bytes
- **Netlify** — app runtime
- **Cloudflare** — DNS

See [`docs/SystemDesign.md`](./SystemDesign.md) for the full diagram.

The official Payload Cloudflare template (`with-cloudflare-d1`) uses a different
stack — Workers as the runtime, D1 instead of MongoDB, R2 attached during the
Cloudflare setup flow, and deploys via Wrangler after migrations. Do not copy that
database flow into this repo. The one lesson worth taking from it is the same
ordering rule above: object storage gets wired before anything depends on uploaded
media.

If you do use D1 elsewhere in the ecosystem:

1. Let Cloudflare create the D1 database in the same flow as the Worker.
2. Bind it to the runtime.
3. Manage local bindings and migrations through Wrangler.
4. Keep D1 for a Worker-based app or internal tool, not the public CMS site.
