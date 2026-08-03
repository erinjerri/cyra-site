# Media Storage on Cloudflare R2

Payload writes uploads to local disk by default. That is fine locally and fatal in
production: every deploy replaces the container filesystem, so **uploaded images
silently disappear**. This wires Cloudflare R2 as the storage backend instead.

Written to be portable. The same env var names and the same
[`src/plugins/storage.ts`](../src/plugins/storage.ts) block are used across:

| Repo | Site | Status |
|---|---|---|
| `cyra-site` | creatingyourreality.co | Implemented here |
| `erinjerri-portf-template` | erinjerri.com | Already uses these names — this repo was aligned to it |
| `FASTER-web-26` | non-profit site | Port when it needs uploads |

See [Porting to another repo](#porting-to-another-repo) at the end.

---

## Why R2 rather than S3

- No egress fees, which matters for an image-heavy marketing site.
- S3-compatible, so the standard `@payloadcms/storage-s3` adapter works — no bespoke adapter.
- Already in the Cloudflare account if Cloudflare handles DNS.

The only R2-specific details are `region: 'auto'` and the
`https://<account-id>.r2.cloudflarestorage.com` endpoint.

---

## Part 1 — Create the bucket

1. Cloudflare dashboard → **R2** in the left sidebar.
2. If this is the first time, enable R2. It asks for a payment method even on the
   free tier (10 GB storage, 1M Class-A ops/month free).
3. **Create bucket**.
   - Name: `cyra-site-media` (or `erinjerri-media`, `faster-web-media`).
     One bucket per site — do not share buckets across sites, since a filename
     collision in Payload would overwrite the wrong file.
   - Location: **Automatic**, unless you need a specific jurisdiction.
4. Create it. Leave the settings page open — you need the bucket name shortly.

## Part 2 — Get the account ID

On any R2 page, the right sidebar shows **Account ID** (a 32-character hex string).

Copy it → this is `R2_ACCOUNT_ID`.

The code derives the endpoint from it automatically:
`https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com`. You only need to set
`R2_ENDPOINT` if you want to override that.

## Part 3 — Create an API token

1. **R2 → API → Manage API Tokens → Create API Token.**
   (This is the R2-specific token screen, *not* the general "My Profile → API
   Tokens" page. Tokens made there will not work for S3 calls.)
2. Name: `cyra-site-media-rw`.
3. Permission: **Object Read & Write**.
4. Scope it to the single bucket from Part 1, not "All buckets".
5. TTL: leave forever, or set a rotation reminder.
6. Create.

The result screen shows, **once only**:

- **Access Key ID** → `R2_ACCESS_KEY_ID`
- **Secret Access Key** → `R2_SECRET_ACCESS_KEY`

Copy both now. The secret cannot be retrieved later — if you lose it, delete the
token and make a new one. Put them straight into your password manager or your
host's env var settings; do not paste them into a file in the repo.

> Ignore the "Use jurisdiction-specific endpoint" note unless you have a data
> residency requirement.

## Part 4 — Serve the files publicly

Buckets are private by default. The app needs a public hostname to serve images
from, otherwise every request proxies through your Next.js server — slower, and
it burns your host's bandwidth.

**Recommended: a custom subdomain** (requires the domain on Cloudflare DNS)

1. Bucket → **Settings → Public access → Custom Domains → Connect Domain**.
2. Enter a subdomain you are not otherwise using, e.g. `media.creatingyourreality.co`.
3. Cloudflare adds the CNAME automatically when it manages the zone. Accept it.
4. Wait for **Active** (usually under a minute, occasionally a few).

→ `R2_PUBLIC_HOSTNAME=media.creatingyourreality.co`

**Alternative: the r2.dev subdomain**

Bucket → Settings → Public access → **Allow Access** under R2.dev subdomain.
Gives something like `pub-abc123.r2.dev`.

→ `R2_PUBLIC_HOSTNAME=pub-abc123.r2.dev`

Fine for staging. Avoid for production: it is rate-limited, not covered by your
Cloudflare cache settings, and puts a Cloudflare-branded URL in your page source.

> **Do not skip this part.** With `R2_PUBLIC_HOSTNAME` unset the app still works —
> reads proxy through Payload — but you lose the main benefit and pay for the
> bandwidth twice.

## Part 5 — Set the environment variables

On your host (Netlify: Site configuration → Environment variables; Vercel:
Settings → Environment Variables):

```bash
USE_R2_STORAGE=true
R2_BUCKET=cyra-site-media
R2_ACCOUNT_ID=<32-char account id>
R2_ACCESS_KEY_ID=<from Part 3>
R2_SECRET_ACCESS_KEY=<from Part 3>
R2_PUBLIC_HOSTNAME=media.creatingyourreality.co
```

Notes:

- **`USE_R2_STORAGE=true` is the master switch.** Without it the other five are
  ignored and uploads go to disk. This is deliberate: local dev and CI need no
  cloud credentials.
- If the flag is on but any credential is missing, storage falls back to disk
  rather than crashing at boot. Convenient, but it means a typo fails *quietly* —
  verify with Part 6 rather than assuming.
- Set them for **all** environments that serve real uploads, including preview
  deploys, or previews will 404 on images.
- Redeploy after changing env vars. Most hosts do not apply them to a running build.

## Part 6 — Verify it actually works

Do not trust a green deploy. Confirm end to end:

1. Open `/admin` → **Media** → upload a test image.
2. Click the uploaded doc. The **URL** field should read
   `https://media.creatingyourreality.co/<filename>` — *not* `/api/media/file/...`
   and not a localhost path.
3. Open that URL directly in a browser. It should render the image.
4. In Cloudflare → R2 → your bucket, confirm the object is listed.
5. **The real test:** redeploy the site, then reload the image. If it still loads,
   storage is external and persistent. If it 404s, the file went to container disk
   and the wiring is not live.

## Part 7 — Migrate existing images

Anything uploaded before R2 was switched on lives in `public/media` and is not in
the bucket. Options:

- **Simplest:** re-upload through `/admin`. Fine for a handful of files.
- **Bulk:** use `rclone` or the Cloudflare dashboard uploader to copy
  `public/media/*` into the bucket, keeping filenames identical so existing
  database records resolve. The reference repo has a script for this
  (`src/scripts/upload-media-to-r2.ts` in `erinjerri-portf-template`) worth porting
  if the volume justifies it.

---

## How it is wired

[`src/plugins/storage.ts`](../src/plugins/storage.ts) exports `storagePlugins`,
spread into `plugins` in `payload.config.ts`. It resolves to an empty array unless
R2 is fully configured, so the adapter is simply absent locally.

`next.config.js` adds `R2_PUBLIC_HOSTNAME` to `images.remotePatterns`. **This is
required** — `next/image` returns 400 for any host not on that allowlist, so
without it every uploaded image breaks in production while working locally.

`src/collections/Media.ts` keeps `staticDir: 'public/media'` as the local-only
fallback; the adapter overrides it when active.

### Known cleanup

`Media` still has a legacy `r2Url` text field from before the adapter existed.
Nothing reads it — the adapter generates URLs automatically. It is kept only so
existing values are not dropped, and can be removed once you confirm the column is
empty in production.

---

## Porting to another repo

1. Install: `pnpm add @payloadcms/storage-s3@<your payload version>`.
   The version **must** match your `payload` version or the plugin types will not
   line up.
2. Copy `src/plugins/storage.ts` across unchanged.
3. Spread `...storagePlugins` into `plugins` in `payload.config.ts`.
4. Add the R2 hostname to `images.remotePatterns` in `next.config.js`.
5. Copy the R2 block from `.env.example`.
6. Create a **separate bucket and token per site.** Do not reuse credentials across
   erinjerri.com, creatingyourreality.co, and FASTER — one leaked key would
   otherwise expose all three, and per-bucket tokens can be rotated independently.
7. If the repo uploads more than one collection (the portfolio template also has
   `documents`), add it to the `collections` map in `storage.ts`.

For `erinjerri-portf-template`, the env var names already match, so only steps 6
and 7 apply. For `FASTER-web-26`, follow all seven.

---

## Troubleshooting

| Symptom | Cause |
|---|---|
| Images work locally, 400 in production | `R2_PUBLIC_HOSTNAME` missing from `images.remotePatterns`, or env var not set on the host |
| URL still `/api/media/file/...` | `R2_PUBLIC_HOSTNAME` unset — reads are proxying through Payload |
| Upload succeeds, file absent from bucket | `USE_R2_STORAGE` not `true`, so it went to local disk |
| `SignatureDoesNotMatch` | Token made under My Profile → API Tokens instead of R2 → Manage API Tokens |
| `NoSuchBucket` | `R2_BUCKET` typo, or bucket in a different Cloudflare account than `R2_ACCOUNT_ID` |
| `AccessDenied` on upload | Token is Read-only; needs **Object Read & Write** |
| Images vanish after each deploy | Storage never activated — re-run Part 6 |
