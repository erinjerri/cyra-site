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

See [`docs/SystemDesign.md`](./SystemDesign.md) for the stack diagram and the reason this repo uses MongoDB for the CMS site while keeping D1 as an optional fit for other parts of the ecosystem.

## Launch Order

Use this sequence when bringing the site fully live:

1. Set up the repo and local app first so you can work against the real codebase.
2. Set up MongoDB and connect Payload to it.
3. Set up Cloudflare R2 and wire media storage before you rely on real uploads.
4. Set up Netlify as the runtime host.
5. Deploy the app once the database and media storage are connected.
6. Upload one image in Payload and confirm it renders locally.
7. Push/deploy and confirm the same image renders on the live site.
8. Point `creatingyourreality.co` at the Netlify deployment through Cloudflare DNS.

This is the core production path for the site:

- MongoDB stores the CMS content and media records.
- Cloudflare R2 stores uploaded image files.
- Netlify runs the app.
- Cloudflare routes the domain.

If you already created the repo, MongoDB, and Payload first, that is not wrong. The important ordering rule is that Cloudflare R2 must be in place before you treat image uploads as production-ready.

### Relation to the official Cloudflare template

The official Payload Cloudflare template (`with-cloudflare-d1`) follows a different stack and setup order:

- Cloudflare Workers is the runtime
- D1 is the database instead of MongoDB
- R2 is configured during the Cloudflare setup flow
- `wrangler login` is part of the local setup
- deploy runs through Wrangler after migrations

That means the template's setup order is closer to:

1. Start from the template or connect the repo in Cloudflare.
2. Attach D1 and R2 in Cloudflare.
3. Install dependencies and run locally with Wrangler bindings.
4. Create migrations.
5. Deploy through Cloudflare.

For this repo, do not copy the D1 database flow directly into the CMS site. The important lesson from the template is that object storage should be wired before you depend on uploaded media in production.

## D1 notes for the broader ecosystem

If you decide to use D1 in other TimeBite projects, the key setup pattern is:

1. Let Cloudflare create the D1 database in the same setup flow as the Worker or template.
2. Bind the D1 database to the runtime.
3. Use Wrangler or the Cloudflare deployment flow to manage local bindings and migrations.
4. Keep D1 for the Cloudflare-native app or service layer, not necessarily the public CMS marketing site.

That makes D1 a better fit for a Worker-based app or an internal tool than for this repo's CMS stack.

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

## MongoDB and Payload setup

Follow the MongoDB setup tutorials from All About Payload before you deploy:

- [Building dynamic websites with Payload, App Router, and TypeScript | DB & File Storage](https://www.youtube.com/watch?v=-0CCUkoBDSY&t=692s)
- [How to set up Payload with Supabase](https://www.youtube.com/watch?v=L5w2QYB9-UU&t=161s)
- [Payload + Cloudflare setup](https://www.youtube.com/watch?v=8jPNsLX7XGg)

For this repo, prefer MongoDB plus Cloudflare R2 rather than Supabase for the production setup.

### MongoDB Atlas checklist

Use the tutorial flow as your guide, then make sure you complete:

1. Create a new MongoDB account.
1. Create a new project.
1. Create a new cluster.
1. Add your local IP address or deployment host to the network access list.
1. Create a database user with a strong password.
1. Copy the connection string into `DATABASE_URI` or `MONGODB_URI`.
1. Keep the same database URI in every environment that should share content.

### Payload setup checklist

After MongoDB is ready:

1. Copy `.env.example` to `.env`.
1. Set `DATABASE_URI` or `MONGODB_URI`.
1. Set `PAYLOAD_SECRET` to a long random string.
1. Run `pnpm install`.
1. Run `pnpm generate:types`.
1. Run `pnpm generate:importmap`.
1. Run `pnpm seed`.
1. Run `pnpm dev`.
1. Create the first admin user at `/admin`.

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

## R2 image smoke test

Use this as the live setup checklist when you are wiring image storage for the first time:

1. Create the MongoDB database first and confirm `DATABASE_URI` works locally.
2. Create the Cloudflare R2 bucket.
3. Create an access key pair for that bucket.
4. Set the R2 env vars in `.env`:
   - `R2_BUCKET`
   - `R2_ENDPOINT`
   - `R2_ACCESS_KEY_ID`
   - `R2_SECRET_ACCESS_KEY`
   - `R2_PUBLIC_URL`
5. Wire the Payload storage adapter in code so the `media` collection writes to R2 instead of `public/media`.
6. Start the app locally with `pnpm dev`.
7. Open `/admin`.
8. Upload one image in the Media collection.
9. Confirm the image loads in the admin preview and on the frontend.
10. Redeploy the app.
11. Confirm the same media still loads after deploy.

Important:

- MongoDB stores the media document and metadata.
- R2 stores the actual file bytes.
- If the upload adapter is still using `staticDir: 'public/media'`, the image will work locally but will not survive a redeploy.
- For the live production test, upload a new image through Payload after the adapter is wired, then reference that media in a page or block and verify the frontend renders it.

## Netlify deployment

If you are deploying the app on Netlify, treat Netlify as the runtime host and Cloudflare as the domain/DNS host.

### Netlify setup checklist

1. Connect the GitHub repository to a Netlify site.
2. Set the build command to `pnpm build`.
3. Set the publish directory to `.next`.
4. Set the Node version in Netlify to match the repo's local runtime as closely as possible.
5. Add all env vars from `.env.example` in the Netlify site settings.
6. Make sure `DATABASE_URI` points to the production MongoDB cluster.
7. Make sure `PAYLOAD_SECRET` is set to the same value for that production environment.
8. Set `NEXT_PUBLIC_SERVER_URL=https://creatingyourreality.co`.
9. Wire the media adapter to Cloudflare R2 before relying on image uploads.
10. Deploy once from Netlify and confirm the app boots.

### Cloudflare domain step for Netlify

Once the Netlify site exists and builds successfully:

1. Add `creatingyourreality.co` as a custom domain in Netlify.
2. Let Netlify show the DNS records it wants.
3. In Cloudflare, point the domain to Netlify using the records Netlify provides.
4. Verify the domain resolves to the Netlify deployment.
5. Confirm the app still serves media from R2 and content from MongoDB.

### Netlify notes

- Netlify is hosting the app runtime, not the CMS data.
- MongoDB still stores the CMS content and media metadata.
- R2 still stores the uploaded files.
- If you change the content or upload a new image in Payload, redeploying Netlify should show the updated live site as long as the content is in MongoDB and the media is in R2.
