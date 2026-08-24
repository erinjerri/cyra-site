# Cyra Site

This repository is the TimeBite by CYRA marketing/CMS site.

The intended stack is:

- Next.js 15 App Router for the public site and app runtime
- Payload CMS 3 for content editing and media records
- MongoDB for Payload content and user data
- Cloudflare R2 for persistent media file storage
- Netlify as the app host when using the hosted runtime
- An analytics dashboard, typically PostHog, for traffic, conversion, and launch smoke checks

Current state:

- MongoDB is configured through `@payloadcms/db-mongodb` in `src/payload.config.ts`.
- The Payload collections are `pages`, `products`, `media`, and `users`. Globals are `header`, `footer`, and `site-settings`.
- **R2 is installed and wired.** `@payloadcms/storage-s3` drives it from `src/plugins/storage.ts`, opt-in via `USE_R2_STORAGE=true`. With it unset, uploads fall back to local disk at `public/media` so local dev needs no cloud credentials.
- **Pages render live from Payload.** `src/app/(frontend)/page.tsx` queries the `pages` collection by slug. `src/endpoints/seed/*` is only the baseline that `pnpm seed` writes into the database — once seeded, `/admin` is the source of truth.
- Analytics environment variable placeholders exist in `.env.example`. Every CTA carries an `analyticsId` rendered as `data-analytics-event`, but the app does not yet initialize an analytics client.

Media uploads are production-persistent as soon as `USE_R2_STORAGE=true` and the R2 credentials are set. Without them, uploaded files live on the host's disk and are lost on redeploy.

## CMS Model

Payload config lives in `src/payload.config.ts`.

### Editable Collections

`pages`

- Editors can create draft/published page records.
- Editable fields: `title`, `slug`, and `layout`.
- `layout` is a Payload blocks field using the TimeBite block schemas in `src/blocks/TimeBite/config.ts`.
- The schema can support multiple pages by slug, but this repo currently only has a public root route at `src/app/(frontend)/page.tsx`.

`products`

- Physical products: planners, task pads, goal notes, desk tools.
- Editable fields: `name`, `slug`, `description`, `productType`, `variantNote`, `status`, `images[]`, `price`, `compareAtPrice`, `cta`, `sortOrder`, `featured`, `enabled`.
- `status` is `concept` / `sample` / `preorder` / `available` / `sold-out`. Nothing may say "available" until it ships.
- Rendered on the homepage by the `productGridBlock`. Leaving that block's `products` relationship empty shows every enabled product in sort order.
- This is **not** ecommerce — no cart, no inventory, no checkout. `cta` is a link.

`media`

- Editors can create media records for images and videos.
- Payload stores media metadata in MongoDB, including generated upload fields such as filename, MIME type, filesize, and any custom fields.
- Custom editable field is `alt`. (`r2Url` is a legacy field, read by nothing — the storage adapter generates public URLs.)
- File bytes go to Cloudflare R2 when `USE_R2_STORAGE=true`; otherwise to `public/media` on local disk. See "Media Storage" below.

`users`

- Auth-enabled CMS users.
- Editors/admins with user access can log into the Payload admin once the Payload admin/API routes are present in the app.

### Editable Blocks

The registered CMS blocks are:

| Block | What it is on the page |
|---|---|
| `heroBlock` | Headline, both buttons, platform note, product screenshot |
| `quoteBlock` | The problem statement |
| `timelineBlock` | The loop: Plan → Focus → Track → Reflect → Improve |
| `productDemoBlock` | The 45–60s demo video, poster, caption and transcript |
| `scaleStoryBlock` | Action → Day → Week → Month → Goal → Year |
| `featureGridBlock` | App capabilities, each with a status badge and its own media |
| `showcaseBlock` | The alternating step-by-step tour |
| `workspaceBlock` | Adaptive workspace modules + the agent suggestion |
| `agentsBlock` | Goal / Career / Fitness / Finance agents |
| `aboutBlock` | Why it is called TimeBite |
| `frameworkSectionBlock` | The Creating Your Reality relationship |
| `platformCardsBlock` | macOS / iPhone / iPad / Watch / Vision status |
| `pricingBlock` | TimeBite subscription plans (digital only) |
| `productGridBlock` | Physical products, from the `products` collection |
| `newsletterBlock` | Beta signup |
| `faqBlock` | Questions and answers |
| `ctaBlock` | Closing call to action (used on `/philosophy`) |
| `roadmapBlock` | Registered, not currently on any page |
| `testimonialsBlock` | Registered, renders nothing until quotes are added |

Most blocks share `eyebrow`, `headline`, `body`. Buttons share `label`, `url`, `newTab` and `analyticsId`.
Media slots share `image`, `assetUrl`, `imageAlt`, `video`, `videoUrl`, `mediaCaption`, `mediaFrame`, `sketch`.

Full field-by-field reference: `docs/CMSContentModel.md`. Screenshot slots and sizes: `docs/MediaSlots.md`.

### Globals

`header` — logo text and tag, nav links, primary CTA.

`footer` — brand statement, six link groups (each link can be marked `comingSoon`), legal note.

`site-settings` — brand and organisation names, tagline, product/OG descriptions, header tag, footer brand
statement, **Beta call to action** (the site-wide default destination for every beta button), Substack
button label, 404 CTA label, legal note.

### Hard-Coded Or Environment-Driven Content

The following are not editor-editable in Payload:

- Route files themselves (`src/app/(frontend)/page.tsx`, `[slug]/page.tsx`)
- Visual styling in `src/app/(frontend)/globals.css`
- Fallback positioning strings in `src/utilities/brand.ts` (overridden by `site-settings` when set)
- The beta form's POST target, via `NEXT_PUBLIC_BETA_SIGNUP_URL`. When unset, the beta section renders a
  link to the CMS-managed beta URL instead of an email form — a form with nowhere to post silently loses
  addresses.
- Public canonical site URL, via `NEXT_PUBLIC_SERVER_URL`

`src/endpoints/seed/*` is a **content baseline**, not the live content. It is what `pnpm seed` writes into
the database; after that, `/admin` is the source of truth and re-seeding overwrites edits.

**No component contains a URL.** The Substack beta link lives in content (`site-settings` → Beta call to
action, or an individual block's button), so it can be changed in `/admin` without a deploy.

## Installfest

Use this path for a fresh local setup, launch prep, or a future port into another template such as `erinjerri-portf-template`.

Requirements:

- Node.js `^18.20.2` or `>=20.9.0`
- pnpm `^9` or `^10`
- A local MongoDB server for local development, or a MongoDB Atlas connection string
- Optional analytics provider access, usually a PostHog project, if you want dashboard verification during install

Install:

```bash
git clone https://github.com/erinjerri/cyra-site.git
cd cyra-site
pnpm install
cp .env.example .env
```

For local development, set at least:

```bash
DATABASE_URI=mongodb://127.0.0.1/timebite-cyra-site
PAYLOAD_SECRET=<long-random-secret>
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Then start the app:

```bash
pnpm dev
```

Open `http://localhost:3000`.

If you are doing CMS work, also confirm the Payload admin/API routes exist and that `/admin` loads. If `/admin` is missing or returns a 404, restore/add the standard Payload Next.js route files before asking editors to use the CMS.

For analytics installfest work, create the dashboard before launch even if the frontend tracking client is wired later. That gives the deployment a known destination for traffic checks and avoids inventing metrics after the site is live.

Minimum analytics dashboard:

- Public page views by path
- Top referrers and UTM campaigns
- Beta CTA clicks
- Beta form submits or Substack embed conversions
- CMS/admin route exclusion check, so `/admin` traffic does not pollute public-site reporting
- Deploy verification event or annotation for each production release

Current repo gap: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, and `NEXT_PUBLIC_ANALYTICS_DASHBOARD_URL` are documented and listed in `.env.example`, but no PostHog package or analytics component is installed yet. When implementing analytics, add the client initialization in `src/app/(frontend)/layout.tsx` or a small client component mounted from that layout, then track CTA/form events in `src/components/TimeBite/RenderTimeBiteBlocks.tsx` and `src/components/TimeBite/BetaSignup.tsx`.

## Environment Variables

Required for every real environment:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URI` | MongoDB connection string used by Payload. `MONGODB_URI` is also accepted by `payload.config.ts`, but use `DATABASE_URI` as the standard name for this repo. |
| `PAYLOAD_SECRET` | Payload encryption/signing secret. Use a long random value and never commit it. |
| `NEXT_PUBLIC_SERVER_URL` | Canonical public URL for the site, for example `https://timebite.cyra.ai` or `https://www.cyra.ai`. Use `http://localhost:3000` locally. |

Required after R2 storage is wired:

| Variable | Purpose |
| --- | --- |
| `R2_BUCKET` | Cloudflare R2 bucket name. |
| `R2_ENDPOINT` | R2 S3 API endpoint, used for uploads. Format: `https://<account-id>.r2.cloudflarestorage.com`. |
| `R2_ACCESS_KEY_ID` | R2 token access key with object read/write permission for the bucket. |
| `R2_SECRET_ACCESS_KEY` | R2 token secret access key. |
| `R2_PUBLIC_HOSTNAME` | Hostname that serves the bucket publicly, e.g. `media.creatingyourreality.co`. No `https://`, no trailing slash. Leave unset until the custom domain shows **Active** in R2 — see step 2D. (`R2_PUBLIC_URL` is accepted as a legacy alias.) |

Optional:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BETA_SIGNUP_URL` | Form action for the fallback beta signup form. |
| `NEXT_PUBLIC_SUBSTACK_EMBED_URL` | Substack embed iframe URL. When present, it replaces the fallback form. |
| `NEXT_PUBLIC_POSTHOG_KEY` | Public analytics project key if using PostHog. |
| `NEXT_PUBLIC_POSTHOG_HOST` | Analytics ingestion host. Use `https://us.i.posthog.com`, `https://eu.i.posthog.com`, or your self-hosted endpoint as appropriate. |
| `NEXT_PUBLIC_ANALYTICS_DASHBOARD_URL` | Internal reference URL for the launch analytics dashboard. This is for operators, not for rendering public UI. |

## Type And Import Map Generation

Run type generation after changing Payload collections, globals, block schemas, or field names:

```bash
pnpm generate:types
```

Commit the generated `src/payload-types.ts` when it changes.

Run import map generation when adding or changing custom Payload admin components:

```bash
pnpm generate:importmap
```

This repo does not currently define custom admin UI components, so import map generation is not part of normal content-only editing.

## Seeding

The current seed content is the TypeScript fixture at `src/endpoints/seed/timebite-home.ts`.

Use seed content only when:

- Starting a fresh local database
- Recreating demo content in an empty staging database
- Manually importing an initial homepage record before real editorial work begins

Do not seed against production after editors have entered content. Seeding is destructive in most Payload workflows because it can overwrite or duplicate editorial records.

## Production Launch Order

Follow this order. Do not deploy first and backfill persistence later.

### 1. Set Up MongoDB

Use MongoDB Atlas or another managed MongoDB host.

1. Create the MongoDB project/cluster.
2. Create a database user for this app.
3. Restrict network access as tightly as your runtime allows.
4. Create or choose the database name, for example `timebite-cyra-site`.
5. Copy the connection string.
6. Set `DATABASE_URI` in local `.env` and in the runtime host.
7. Run the app locally against the hosted database only when you intentionally want to inspect or prepare that environment.

MongoDB stores Payload documents, drafts, users, and media metadata. It does not store uploaded image/video bytes.

### 2. Set Up Cloudflare R2

The code side is already done: `@payloadcms/storage-s3` is installed and wired in
`src/plugins/storage.ts`. Everything below is dashboard clicking. Do it in this order —
step D fails if C isn't finished.

Where things live: **MongoDB stores the content** (pages, blocks, products, users, and the
media *record*). **R2 stores the file bytes** (the actual .png / .jpg / .mp4). Every upload
writes to both. They are not alternatives.

#### A. Make the bucket

1. Go to <https://dash.cloudflare.com> and sign in.
2. Left sidebar → click **R2**.
3. Click **Create bucket**.
4. Type a bucket name, e.g. `creatingyourreality`. Write it down.
5. Leave **Location** on *Automatic*.
6. Click **Create bucket**.

→ Put the name in `R2_BUCKET`.

#### B. Get the account ID

1. Still in **R2**, click **Overview** in the left sidebar.
2. On the right-hand side find **Account details → Account ID**.
3. Click the copy icon next to it. It's a 32-character string.

→ Put it in `R2_ACCOUNT_ID`.

#### C. Make an API token

1. **R2** → **Overview** → click **Manage API tokens** (top right).
2. Click **Create API token**.
3. **Token name**: anything, e.g. `cyra-site-media`.
4. **Permissions**: select **Object Read & Write**. *(Not Admin. Not Read only.)*
5. **Specify bucket(s)**: choose **Apply to specific buckets only**, then tick your bucket.
6. **TTL**: leave as *Forever* unless you plan to rotate it.
7. Click **Create API Token**.
8. The next screen shows **Access Key ID** and **Secret Access Key**.
   **Copy both now — the secret is shown exactly once.**

→ Access Key ID goes in `R2_ACCESS_KEY_ID`, Secret Access Key in `R2_SECRET_ACCESS_KEY`.

At this point uploads will work. The remaining step only changes *how files are served*.

#### D. Connect the public domain (optional, do it before real traffic)

Without this, images still work — they are streamed through the Next.js server instead of
straight from Cloudflare's edge. That is slower and uses your host's bandwidth.

1. Cloudflare → **DNS → Records**. If a record already exists for the subdomain you want
   (e.g. `media`), **delete it**. A leftover proxied record here is the usual cause of a
   `522` error later.
2. Cloudflare → **R2** → click your bucket → **Settings** tab.
3. Scroll to **Public access → Custom Domains** → click **Connect Domain**.
4. Enter the full subdomain, e.g. `media.creatingyourreality.co`.
5. Click **Continue**, then **Connect Domain**. Cloudflare creates the DNS record itself.
6. Wait until the status shows **Active** (usually under a minute).

→ Put the hostname (no `https://`) in `R2_PUBLIC_HOSTNAME`.

Check it worked:

```bash
curl -sI https://media.creatingyourreality.co/anything | head -1
```

- `HTTP/2 404` → correct. The bucket was reached; that key just doesn't exist.
- `HTTP/2 522` → **not** connected. The DNS record exists but isn't bound to the bucket.
  Redo steps D1–D6.

If you are not ready to do step D, **leave `R2_PUBLIC_HOSTNAME` unset**. Setting it to a
domain that isn't connected is worse than leaving it blank: uploads succeed and every image
on the site 404s.

#### E. Set the variables

Locally in `.env`, and on your host under environment variables:

```bash
USE_R2_STORAGE=true
R2_BUCKET=your-r2-bucket-name
R2_ACCOUNT_ID=<from step B>
R2_ACCESS_KEY_ID=<from step C>
R2_SECRET_ACCESS_KEY=<from step C>
R2_PUBLIC_HOSTNAME=media.creatingyourreality.co   # omit entirely until step D is Active
```

`R2_ENDPOINT` is optional — it is derived from `R2_ACCOUNT_ID`. Only set it if you need to
override the default.

#### F. Regenerate the import map

**Required whenever you switch `USE_R2_STORAGE` on.** The storage plugin registers an admin
component (`S3ClientUploadHandler`) that only exists when R2 is active. Without this the
admin panel throws *"PayloadComponent not found in importMap"*.

```bash
rm src/app/\(payload\)/admin/importMap.js && pnpm generate:importmap
```

Delete the file first — running `generate:importmap` on its own often reports
"No new imports found" and skips the write.

`R2_PUBLIC_HOSTNAME` is read at **build** time by `next.config.js` (for `next/image`), so
changing it requires a rebuild, not just a restart.

### 3. Set Up The Analytics Dashboard

Analytics should be prepared before the app is deployed so the first production smoke test is visible.

1. Create or choose the analytics project, typically PostHog.
2. Copy the public project key into `NEXT_PUBLIC_POSTHOG_KEY`.
3. Copy the ingestion host into `NEXT_PUBLIC_POSTHOG_HOST`.
4. Create a launch dashboard with page views, referrers, beta CTA clicks, beta form submits, and deploy annotations.
5. Copy the dashboard URL into `NEXT_PUBLIC_ANALYTICS_DASHBOARD_URL` for operator reference.
6. Decide which routes are excluded from public analytics, at minimum `/admin`.
7. Wire the frontend analytics client before relying on dashboard data. Until that code exists, the dashboard can be configured but will not receive events from this app.

For a portfolio-template port, keep the provider variables generic enough to reuse: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, and `NEXT_PUBLIC_ANALYTICS_DASHBOARD_URL`.

### 4. Set Up Netlify Or The Runtime Host

If Netlify is the intended runtime:

1. Import `https://github.com/erinjerri/cyra-site` into Netlify.
2. Use the production branch you intend to deploy, usually `main`.
3. Set the build command to `pnpm build`.
4. Let Netlify's Next.js/OpenNext adapter handle the Next.js output.
5. Set the Node version to a version accepted by `package.json`, for example Node 20.
6. Add all required environment variables in Netlify project settings.
7. Set `NEXT_PUBLIC_SERVER_URL` to the final production URL when known. Before the domain is attached, use the Netlify production URL.

If the runtime host is not Netlify, use an app host that supports Next.js server rendering and Payload's Node runtime. Static-only hosting is not enough for Payload admin/API routes.

### 5. Deploy The App

1. Confirm `pnpm build` succeeds locally.
2. Push the branch to GitHub.
3. Trigger the Netlify deploy.
4. Confirm the public page loads.
5. Confirm `/admin` loads before handing the CMS to editors.
6. Confirm the analytics dashboard receives at least one public page view after the analytics client is implemented.

### 6. Run The Local Media Smoke Test

Run this after MongoDB and R2 are configured.

1. `pnpm dev`, then open <http://localhost:3000/admin> and log in.
2. Left sidebar → **Media** → **Create New** → drag in a small image → fill `alt` → **Save**.
3. Confirm the record shows a filename, MIME type and filesize.
4. **The key check:**

   ```bash
   ls public/media/
   ```

   **Empty is the pass.** If the file is sitting there, R2 is off and you are writing to
   local disk — those files vanish on the next deploy.
5. Confirm the object appears in Cloudflare → **R2** → your bucket → **Objects**.
6. Attach it: **Pages → TimeBite → Hero block → `image`** → pick the upload → **Save**.
7. Reload `http://localhost:3000` — the hero schematic is replaced by your image.
8. Restart the app and reload. The image still renders, because it never lived on disk.

If the image record saves but the picture is broken, and `R2_PUBLIC_HOSTNAME` is set, the
custom domain is not connected — see step 2D.

### 7. Run The Live Media Smoke Test

1. Push and deploy the same code and environment model.
2. Open the live site and Payload admin on the hosted URL.
3. Confirm the test media record is visible in the CMS.
4. Confirm the image URL points at `R2_PUBLIC_HOSTNAME`. If it points at `/api/media/...` instead, the hostname is unset and files are proxying through the app — functional, just slower.
5. Redeploy the app without changing the media record.
6. Confirm the image still renders live after redeploy.

Passing this test proves the file bytes are not trapped on local or build-machine disk.

### 8. Run The Analytics Smoke Test

Run this after the analytics client is implemented and the production deploy is live.

1. Open the production homepage in a clean browser session.
2. Click the primary beta CTA.
3. Submit the fallback beta form or complete the Substack embed flow, depending on the active signup mode.
4. Open the analytics dashboard.
5. Confirm the page view appears with the correct production hostname.
6. Confirm the CTA click and signup event appear.
7. Confirm `/admin` route visits are excluded or filtered out of public-site dashboard cards.
8. Add a deploy annotation or release marker for the launch.

If no events appear, check the public env vars in the runtime host, browser network requests to the analytics host, consent/ad-blocking behavior, and whether the client component is mounted from the frontend layout.

### 9. Point The Domain Through Cloudflare DNS

Do this after the app and media smoke tests pass.

1. Add the custom domain in Netlify or the runtime host first.
2. Copy the DNS target values the host gives you.
3. In Cloudflare DNS, create the required records for the domain.
4. Use a `CNAME` for `www` when the host provides one.
5. For the apex/root domain, use the hosting provider's documented target. On Cloudflare this may use CNAME flattening when the host provides a CNAME target.
6. Wait for DNS and TLS issuance.
7. Update `NEXT_PUBLIC_SERVER_URL` to the final canonical URL.
8. Redeploy so sitemap, analytics host filters, and any build-time public URL references use the final domain.
9. Rerun the live media and analytics smoke tests on the final domain.

The application domain is configured in the hosting provider. DNS is configured in Cloudflare. The media domain, if separate, is configured on the R2 bucket and also points through Cloudflare DNS.

## Media Storage

Payload media has two parts:

- Metadata stored in MongoDB
- File bytes stored by the upload adapter

Metadata includes the media document, alt text, filename, MIME type, filesize, and any custom fields such as `r2Url`. MongoDB does not store the image or video bytes.

Without R2, this repo's `media` collection writes uploads to `public/media`. That is acceptable for short local tests, but not for production. App hosts such as Netlify build and redeploy from source; local upload directories are not durable content storage.

With R2 configured through Payload's S3 storage adapter, uploads are written to the R2 bucket and served from `R2_PUBLIC_HOSTNAME`. A redeploy does not affect existing media.

## Domain And Hosting Notes

- Configure the production app domain in Netlify or whichever runtime host serves the Next.js/Payload app.
- Configure DNS records in Cloudflare so the domain points to that host.
- Configure the media domain separately if using a custom R2 public domain such as `media.cyra.ai`.
- Set `NEXT_PUBLIC_SERVER_URL` to the canonical public app URL, not the R2 media URL.
- Set `R2_PUBLIC_HOSTNAME` to the media hostname, not the app URL, and without a scheme.
- Keep analytics dashboard filters aligned with the final production hostname.
- After changing any public URL, redeploy and rerun the public page, sitemap, media, and analytics smoke tests.

## Porting To `erinjerri-portf-template`

When moving this installfest into `erinjerri-portf-template`, preserve the setup order and replace only the repository-specific names:

- Keep the order: MongoDB, R2, analytics dashboard, runtime host, deploy, media smoke test, analytics smoke test, domain.
- Replace `timebite-cyra-site` with the template database name.
- Replace TimeBite/CYRA block names with the template's actual Payload collections, globals, and blocks.
- Keep `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `R2_*`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, and `NEXT_PUBLIC_ANALYTICS_DASHBOARD_URL` unless the template already standardizes different names.
- Keep the warning that MongoDB stores media metadata, while R2 stores file bytes.
- Keep the dashboard smoke test as part of launch acceptance, not as an afterthought.

## Useful Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm generate:types
pnpm generate:importmap
```

## References

- Payload storage adapters: https://payloadcms.com/docs/upload/storage-adapters
- Payload uploads overview: https://payloadcms.com/docs/upload/overview
- Payload + Cloudflare deployment walkthrough: https://www.youtube.com/watch?v=8jPNsLX7XGg
- Netlify Next.js runtime: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Netlify environment variables: https://docs.netlify.com/build/configure-builds/environment-variables/
