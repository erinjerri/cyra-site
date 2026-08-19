# Cyra Site

This repository is the TimeBite by CYRA marketing/CMS site.

The intended stack is:

- Next.js 15 App Router for the public site and app runtime
- Payload CMS 3 for content editing and media records
- MongoDB for Payload content and user data
- Cloudflare R2 for persistent media file storage
- Netlify as the app host when using the hosted runtime
- An analytics dashboard, typically PostHog, for traffic, conversion, and launch smoke checks

The current codebase is partly wired for that model:

- MongoDB is already configured through `@payloadcms/db-mongodb` in `src/payload.config.ts`.
- The Payload collections are `pages`, `media`, and `users`.
- R2 environment variable placeholders exist in `.env.example`, and content fields include `assetUrl` / `r2Url` fallbacks.
- The R2 storage adapter is not installed or configured yet. Until that is added, Payload uploads use local disk at `public/media`.
- Analytics environment variable placeholders exist in `.env.example`, but the app does not yet initialize an analytics client or emit custom events.
- The public home page currently renders the seeded TypeScript fixture in `src/endpoints/seed/timebite-home.ts`, not a live Payload query.

Do not treat CMS edits or media uploads as production-persistent until MongoDB, R2 storage, and the runtime host are configured together.

## CMS Model

Payload config lives in `src/payload.config.ts`.

### Editable Collections

`pages`

- Editors can create draft/published page records.
- Editable fields: `title`, `slug`, and `layout`.
- `layout` is a Payload blocks field using the TimeBite block schemas in `src/blocks/TimeBite/config.ts`.
- The schema can support multiple pages by slug, but this repo currently only has a public root route at `src/app/(frontend)/page.tsx`.

`media`

- Editors can create media records for images and videos.
- Payload stores media metadata in MongoDB, including generated upload fields such as filename, MIME type, filesize, and any custom fields.
- Custom editable fields are `alt` and `r2Url`.
- File bytes are local-only today unless the R2/S3 storage adapter is added.

`users`

- Auth-enabled CMS users.
- Editors/admins with user access can log into the Payload admin once the Payload admin/API routes are present in the app.

### Editable Blocks

The registered CMS blocks are:

- `heroBlock`
- `authorityStripBlock`
- `problemAgitationBlock`
- `howItWorksBlock`
- `featureTabsBlock`
- `productScreensBlock`
- `aiArchitectureBlock`
- `betaSignupBlock`
- `founderCredibilityBlock`
- `faqBlock`

Most TimeBite blocks share these editable section fields:

- `eyebrow`
- `headline`
- `body`
- `cta.label`
- `cta.url`
- `media`
- `assetUrl`

Repeatable item-style blocks expose arrays such as `items`, `stats`, `steps`, `tabs`, or `screens`. Items can include:

- `title`
- `body`
- `eyebrow`
- `image`
- `assetUrl`

`heroBlock` also exposes `secondaryCta` and `stats`.

`betaSignupBlock` also exposes `formNote`.

`faqBlock` exposes repeatable `question` / `answer` items.

### Globals

There are no Payload globals configured in this repository yet. Header, footer, nav labels, legal links, and several product-display details are hard-coded in React.

### Hard-Coded Or Environment-Driven Content

The following are not currently editor-editable in Payload:

- The public root route itself: `src/app/(frontend)/page.tsx`
- The currently rendered homepage data: `src/endpoints/seed/timebite-home.ts`
- Header/nav structure and footer links in `src/components/TimeBite/RenderTimeBiteBlocks.tsx`
- The Cycle Matrix demo rows in `RenderTimeBiteBlocks.tsx`
- The pricing section: `pricingBlock` is rendered by React and appears in the seed fixture, but it is not registered in `src/blocks/TimeBite/config.ts`, so editors cannot add or edit it in the CMS yet.
- Signup integration URLs, which are environment-driven through `NEXT_PUBLIC_BETA_SIGNUP_URL` and `NEXT_PUBLIC_SUBSTACK_EMBED_URL`
- Public canonical site URL, which should be set through `NEXT_PUBLIC_SERVER_URL`
- Visual styling in `src/app/(frontend)/globals.css`

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
| `NEXT_PUBLIC_SERVER_URL` | Canonical public URL for the site, for example `https://www.creatingyourreality.co`. Use `http://localhost:3000` locally. |

Required after R2 storage is wired:

| Variable | Purpose |
| --- | --- |
| `R2_BUCKET` | Cloudflare R2 bucket name. |
| `R2_ENDPOINT` | R2 S3 API endpoint, used for uploads. Format: `https://<account-id>.r2.cloudflarestorage.com`. |
| `R2_ACCESS_KEY_ID` | R2 token access key with object read/write permission for the bucket. |
| `R2_SECRET_ACCESS_KEY` | R2 token secret access key. |
| `R2_PUBLIC_HOSTNAME` | Public URL used to serve files, either an R2 public development URL or a custom media domain such as `https://media.creatingyourreality.co

# Cloudflare R2 API Credentials

`cyra-site` uses Cloudflare R2 as persistent object storage for media uploaded through Payload CMS.

The R2 configuration intentionally follows the same environment-variable convention used by the Erin Jerri portfolio projects so storage configuration can be ported between sites without changing application code.

## Required environment variables

```bash
USE_R2_STORAGE=true
R2_BUCKET=creatingyourreality
R2_ACCOUNT_ID=<cloudflare-account-id>
R2_ACCESS_KEY_ID=<cloudflare-r2-access-key-id>
R2_SECRET_ACCESS_KEY=<cloudflare-r2-secret-access-key>
R2_PUBLIC_HOSTNAME=media.creatingyourreality.co
```

`R2_ENDPOINT` normally does not need to be configured. The application derives the standard Cloudflare endpoint from `R2_ACCOUNT_ID`:

```text
https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com
```

Only set `R2_ENDPOINT` when using a jurisdiction-specific or otherwise customized R2 endpoint.

## Creating the CYRA R2 credentials

Go to the Cloudflare dashboard and open:

**Storage & databases → R2 → Manage API Tokens**

Create a new **Account API token**.

Use a site-specific name:

```text
creatingyourreality-rw
```

### Permissions

Select:

```text
Object Read & Write
```

CYRA requires write access because Payload CMS uploads media to R2.

When possible, choose:

```text
Apply to specific buckets only
```

and select:

```text
creatingyourreality
```

Do not give the CYRA credential access to unrelated buckets.

Each production site should have its own bucket and R2 credential. For example:

```text
cyra-site
  → creatingyourreality
  → creatingyourreality-rw

erinjerri-portf
  → erinjerri-media
  → erinjerri-portf R2 credential
```

This allows credentials to be revoked or rotated independently without affecting another site.

## Copy the S3 credentials

After the token is created, Cloudflare displays:

```text
Access Key ID
Secret Access Key
```

Map those values directly to:

```bash
R2_ACCESS_KEY_ID=<Access Key ID>
R2_SECRET_ACCESS_KEY=<Secret Access Key>
```

The Secret Access Key is only displayed when the credential is created. Store it securely. If it is lost, revoke the credential and create a new one.

The R2 API token itself should not be confused with the S3-compatible credential fields expected by the application.

The application expects:

```bash
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
```

## Local development

Real credentials belong in `.env.local` or another ignored environment file:

```bash
USE_R2_STORAGE=true
R2_BUCKET=creatingyourreality
R2_ACCOUNT_ID=<real-account-id>
R2_ACCESS_KEY_ID=<real-access-key-id>
R2_SECRET_ACCESS_KEY=<real-secret-access-key>
R2_PUBLIC_HOSTNAME=media.creatingyourreality.co
```

Never commit these values to Git.

The checked-in `.env.example` should contain variable names and placeholders only:

```bash
USE_R2_STORAGE=false

R2_BUCKET=
R2_ACCOUNT_ID=
R2_ENDPOINT=

R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=

R2_PUBLIC_HOSTNAME=
```

## Production deployment

Add the same values through the deployment provider's environment-variable configuration.

After adding or changing R2 credentials, redeploy the application so the new environment variables are loaded.

## Verify the configuration

After deployment:

1. Sign into `/admin`.
2. Open **Media**.
3. Upload a test image.
4. Confirm the object appears inside the `creatingyourreality` R2 bucket.
5. Confirm the generated media URL uses the configured R2 public hostname.
6. Redeploy the site.
7. Reload the image.

If the image continues to load after redeployment, the file is being stored persistently in R2 rather than on the application's temporary filesystem.

## Security rules

* Never commit `R2_SECRET_ACCESS_KEY`.
* Never put production credentials into `.env.example`.
* Create a separate R2 token for each application.
* Scope credentials to a specific bucket whenever possible.
* Use **Object Read & Write** rather than broader account permissions when the application only needs media access.
* Rotate a token immediately if its Secret Access Key is exposed.

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

R2 must be ready before production editors upload assets.

1. Create an R2 bucket, for example `creatingyourreality`.
2. Create an R2 API token with object read/write permission scoped to that bucket.
3. Copy the S3 API endpoint into `R2_ENDPOINT`.
4. Set `R2_BUCKET`, `R2_ACCESS_KEY_ID`, and `R2_SECRET_ACCESS_KEY`.
5. Configure a public bucket URL or custom media domain.
6. Set that hostname (no scheme, no trailing slash) as `R2_PUBLIC_HOSTNAME`.
7. Wire Payload to R2 with `@payloadcms/storage-s3` before relying on uploads in production.

For a Netlify/Node runtime, Payload's S3 storage adapter is the correct R2 path because R2 exposes an S3-compatible API. The Cloudflare Workers-only R2 adapter is not the right adapter for this deployment model.

Current repo gap: `@payloadcms/storage-s3` is not in `package.json`, and `payload.config.ts` does not yet include an R2 storage plugin. Until that is implemented, uploaded files are written to `public/media` and can disappear across fresh clones, clean builds, or redeploys.

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

1. Start the app locally with `DATABASE_URI` pointing at the intended non-production test database and all `R2_*` variables set.
2. Open Payload admin.
3. Upload one small image to `Media`.
4. Confirm the media record appears in Payload with a filename, MIME type, filesize, and `alt` text.
5. Confirm the actual object appears in the Cloudflare R2 bucket.
6. Use the media record in a page block's `media` field, or paste its public R2 URL into `assetUrl` if the frontend image rendering is still using URL fallbacks.
7. Confirm the image renders at `http://localhost:3000`.
8. Stop and restart the app.
9. Confirm the same image still renders without relying on `public/media`.

### 7. Run The Live Media Smoke Test

1. Push and deploy the same code and environment model.
2. Open the live site and Payload admin on the hosted URL.
3. Confirm the test media record is visible in the CMS.
4. Confirm the image URL points at `R2_PUBLIC_HOSTNAME` or the configured public media domain.
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

With R2 configured through Payload's S3 storage adapter, uploads should be written to the R2 bucket and served from `R2_PUBLIC_HOSTNAME`. A redeploy should not affect existing media.

## Domain And Hosting Notes

- Configure the production app domain in Netlify or whichever runtime host serves the Next.js/Payload app.
- Configure DNS records in Cloudflare so the domain points to that host.
- Configure the media domain separately if using a custom R2 public domain such as `media.creatingyourreality.co`.
- Set `NEXT_PUBLIC_SERVER_URL` to the canonical public app URL, not the R2 media URL.
- Set `R2_PUBLIC_HOSTNAME` to the public media URL, not the app URL.
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
- Netlify Next.js runtime: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Netlify environment variables: https://docs.netlify.com/build/configure-builds/environment-variables/
