# R2 Porting Brief

Hand this file to an agent working in `erinjerri-portf-template` or `faster-web-26` to bring
their Cloudflare R2 setup and documentation in line with `cyra-site`.

Everything below was verified against a live R2 bucket, not written from memory.

---

## Prompt to give the agent

> Update this repository's Cloudflare R2 media storage setup and its documentation to match
> the reference implementation described below, which comes from the `cyra-site` repo and has
> been verified against a live bucket.
>
> Before changing anything, inspect: `src/payload.config.ts`, `src/plugins/storage.ts` (or
> wherever the storage adapter lives), `src/collections/Media.ts`, `next.config.js`,
> `.env.example`, and the README. Preserve whatever already works — this is an alignment
> pass, not a rewrite. If the repo already matches a section, say so and skip it.
>
> Report at the end: which sections already matched, which you changed, and anything in this
> repo that the reference does not cover.

---

## 1. The env var contract

Use these exact names. `R2_ENDPOINT` is optional and derived from `R2_ACCOUNT_ID` when absent.

```bash
USE_R2_STORAGE=false          # opt-in. unset/false = local disk, no cloud creds needed
R2_BUCKET=
R2_ACCOUNT_ID=                # 32 chars, from R2 > Overview > Account details
R2_ENDPOINT=                  # optional override; derived from account id otherwise
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_PUBLIC_HOSTNAME=           # e.g. media.example.com — NO scheme, NO trailing slash
# R2_FORCE_PATH_STYLE=true    # only if the provider needs virtual-hosted URLs
```

`R2_PUBLIC_URL` is accepted as a legacy alias for `R2_PUBLIC_HOSTNAME`. Prefer the hostname
name in all new docs.

## 2. The adapter

Use `@payloadcms/storage-s3`, not the Workers-only R2 adapter — R2 exposes an S3-compatible
API and the Workers adapter is wrong for a Node/Netlify runtime.

Three behaviours the reference implementation gets right and which are worth copying:

**Opt-in, and fails safe.** The plugin array is empty unless `USE_R2_STORAGE === 'true'` AND
bucket, endpoint, access key and secret are all present. Partial configuration must not
half-enable the adapter — it should fall back to local disk cleanly.

```ts
export const isR2Configured = Boolean(enabled && bucket && endpoint && accessKeyId && secretAccessKey)
export const storagePlugins: Plugin[] = isR2Configured ? [ s3Storage({ /* ... */ }) ] : []
```

**Direct serving is conditional.** Only set `disablePayloadAccessControl` + a custom
`generateFileURL` when `R2_PUBLIC_HOSTNAME` is present. Without it, reads proxy through
Payload — slower, but correct. Setting a hostname that is not actually bound to the bucket is
worse than leaving it blank: uploads succeed and every image 404s.

**URL building strips scheme and trailing slashes**, and encodes the filename, so an editor
pasting `https://media.example.com/` into the env var still produces valid URLs.

```ts
const base = `https://${publicHostname.replace(/^https?:\/\//, '').replace(/\/+$/, '')}`
const name = encodeURIComponent(String(filename).replace(/^\/+/, ''))
return prefix ? `${base}/${prefix}/${name}` : `${base}/${name}`
```

Region is always `'auto'` for R2.

## 3. next.config.js

The public hostname must be in `images.remotePatterns` or `next/image` returns 400 for every
uploaded asset in production. Read it from env at build time — do not hardcode:

```js
const r2PublicHost = (process.env.R2_PUBLIC_HOSTNAME || process.env.R2_PUBLIC_URL || '')
  .trim().replace(/^https?:\/\//, '').replace(/\/+$/, '')

remotePatterns: [
  ...(r2PublicHost ? [{ hostname: r2PublicHost, protocol: 'https' }] : []),
]
```

Because this is read at **build** time, changing `R2_PUBLIC_HOSTNAME` requires a rebuild, not
just a restart. Document that.

## 4. The import map trap

**This is the single highest-value thing to document.** It cost real debugging time.

When `USE_R2_STORAGE` is turned on, the storage plugin registers an admin component,
`S3ClientUploadHandler` from `@payloadcms/storage-s3/client`. If the import map was generated
while R2 was off, that entry is missing and the admin panel throws:

```
getFromImportMap: PayloadComponent not found in importMap null
"You may need to run the `payload generate:importmap` command"
```

The fix is not just running the command — running `generate:importmap` on its own frequently
reports *"No new imports found, skipping writing import map"* and does nothing. Delete the
file first:

```bash
rm src/app/\(payload\)/admin/importMap.js && pnpm generate:importmap
```

Document this as a required step whenever `USE_R2_STORAGE` is toggled.

## 5. Media collection

Accept both images and video if the site uses either:

```ts
upload: { staticDir: 'public/media', mimeTypes: ['image/*', 'video/*'] }
```

`staticDir` is the local fallback and is ignored when the S3 adapter takes over.

Do **not** add a custom `r2Url` text field. The adapter generates public URLs. If one already
exists, mark it legacy and stop reading it rather than deleting the column.

## 6. Docs to write

**Click-by-click Cloudflare setup**, in this order, because the domain step fails if the
bucket step is not finished:

- A. R2 → Create bucket → name it → Location *Automatic* → **Create bucket**
- B. R2 → Overview → right side → **Account details → Account ID** (32 chars)
- C. R2 → Overview → **Manage API tokens** → **Create API token** → permission
  **Object Read & Write** (not Admin, not Read only) → *Apply to specific buckets only* →
  tick the bucket → **Create API Token** → copy both keys, **the secret shows once**
- D. Custom domain, optional but do it before real traffic:
  DNS → Records → **delete any existing record** for the subdomain first (a leftover proxied
  record is the usual cause of a later `522`) → R2 → bucket → **Settings** →
  **Public access → Custom Domains → Connect Domain** → enter the full subdomain →
  wait for **Active**

**The verification commands.** These are what make the docs trustworthy:

```bash
# custom domain bound correctly?
curl -sI https://media.example.com/anything | head -1
#   HTTP/2 404  -> correct: bucket reached, key absent
#   HTTP/2 522  -> NOT bound. DNS record exists but is not attached to the bucket.
```

```bash
# after uploading one image in /admin:
ls public/media/
#   empty  -> R2 is handling storage. This is the pass condition.
#   a file -> R2 is off; you are writing to disk and will lose it on redeploy.
```

`ls public/media/` being empty is the clearest single proof that R2 is live. Lead with it.

**Explain the split**, because it confuses people: MongoDB stores the content and the media
*record* (filename, alt, sizes). R2 stores the *bytes*. Every upload writes to both. They are
not alternatives.

## 7. Reference files in `cyra-site`

| File | What to copy from it |
|---|---|
| `src/plugins/storage.ts` | The whole adapter, including the opt-in guard and URL builder |
| `next.config.js` | The `r2PublicHost` remote-pattern block |
| `.env.example` | The env contract with its comments |
| `README.md` § *2. Set Up Cloudflare R2* | The click-by-click steps A–F |
| `README.md` § *6. Local Media Smoke Test* | The verification checklist |
| `docs/MediaStorage.md` | Long-form setup, troubleshooting, migration |
