# Website Architecture

`creatingyourreality.xyz` is a single Next.js 15 (App Router) + Payload CMS 3 app. TimeBite is the flagship
product and gets the homepage; Creating Your Reality (CYR) is the philosophy/ecosystem and gets `/philosophy`
plus a supporting role in the footer. See `docs/Roadmap.md` for the product framing this architecture serves.

## Data flow

Nothing on the site is hardcoded content anymore. Everything a visitor sees comes from Payload via the Local
API, fetched server-side on each request (no client-side fetching, no static import of seed data):

```
Payload (MongoDB)
  ├─ collection "pages"   (blocks-based layout, one doc per route)
  ├─ global "header"      (logo, nav links, primary CTA)
  └─ global "footer"      (brand statement, 6 link columns)
        │
        ▼
src/utilities/getPage.ts, getGlobals.ts   (Local API reads, no access-control bypass concerns — public read)
        │
        ▼
src/app/(frontend)/page.tsx        → pages.slug = 'home'
src/app/(frontend)/[slug]/page.tsx → any other published page (e.g. 'philosophy')
        │
        ▼
src/components/TimeBite/FrontendShell.tsx  (Header + RenderTimeBiteBlocks + Footer)
```

`page.tsx` (the `/` route) and `[slug]/page.tsx` are intentionally near-duplicates of a few lines each rather
than one being a special case of the other — Next.js requires an explicit file for the root route, so the
generic `[slug]` route can't also serve `/`. Both call the same `getPageBySlug`/`generateMeta` utilities and
render through the same `FrontendShell`, so a new page created in the CMS (any slug other than `home`) is live
with zero code changes and correct metadata.

Both routes export `dynamic = 'force-dynamic'`. This was not the original plan — static generation was tried
first (`generateStaticParams` over published pages), but it caused a real bug: Next.js statically cached the
`[slug]` route and started serving a `200` with `x-nextjs-cache: HIT` for slugs that don't exist, instead of a
`404`. Given editors update content live in `/admin` and correctness of 404s matters for SEO, forcing dynamic
rendering was the right trade — this is a low-traffic marketing site pre-launch, not a page where static
caching is worth the correctness risk. Revisit if traffic/latency ever makes it worth it (see
`docs/Roadmap.md`).

## Content model: Blocks, not hardcoded sections

Every homepage/philosophy-page section is a Payload block (`src/blocks/TimeBite/config.ts`), rendered by a
matching presentational component in `src/components/TimeBite/RenderTimeBiteBlocks.tsx`. See
`docs/CMSContentModel.md` for the full field list per block. This replaces the previous implementation, where
`page.tsx` statically imported a TypeScript object (`timeBiteHome`) and the `pages` collection existed but was
never actually queried.

## Decisions and why

- **Header/Footer are Payload Globals, not page blocks.** They're identical on every page; modeling them as a
  block would mean re-entering footer content per page doc. This deviates from a literal reading of "Footer"
  in the original block list — flagged here rather than silently decided.
- **One generic `[slug]` route** instead of a hand-built page per URL (see Data flow above).
- **Footer links to pages that don't exist yet** (Manifesto, Blog, Speaking, Press, Contact, About, and the
  ecosystem "Coming Soon" items) render as disabled labels via a `comingSoon` checkbox on each footer link,
  not dead links or empty stub pages. Flip the checkbox off once the real page/URL exists — no code change.
- **No route-level `loading.tsx`.** One was built, then removed. A `loading.tsx` makes Next.js wrap the route
  in a Suspense boundary and stream the loading fallback immediately with a `200` — which means by the time an
  async page component discovers a slug doesn't exist and calls `notFound()`, the response has already been
  sent as `200` and can't be changed. This was caught in testing: `/some-bad-slug` was serving `200` instead of
  `404`. Since `/` and `/[slug]` both call `notFound()`, and correct 404 status codes matter more here (SEO,
  explicitly requested) than a loading skeleton for queries that are single, fast, local Mongo reads, the
  skeleton was dropped in favor of correct status codes. Revisit only if a route without `notFound()` needs one.
- **`testimonialsBlock` is schema-only.** The Payload config exists so it's a real, reusable content model;
  the component renders nothing when the array is empty. No placeholder quotes were seeded.
- **Dark-only, no light-mode toggle.** Matches the CYR Figma file (single dark-bg page) and the brief's
  "Dark mode" instruction.
- **`--tb-magenta` accent, used only inside the Framework block.** Ties to the CYR-Studio magenta colorway in
  the Figma file, so wherever the Creating Your Reality philosophy is being presented (home teaser or the full
  `/philosophy` page) it reads as visually distinct from TimeBite's cyan product identity.

## Fixes made to existing infrastructure

These were pre-existing gaps/bugs in the repo, not new work requested directly, but blocking "reusable,
production-ready":

- **`payload.config.ts` had zero plugins registered** despite `plugin-seo` and `plugin-redirects` being
  installed dependencies. Both are now wired (see `docs/CMSContentModel.md`). `plugin-form-builder`,
  `plugin-search`, and `plugin-nested-docs` remain installed but unwired — not needed by this scope.
- **`globals.css` referenced `font-family: "Sora"` with no font ever loaded** (no `next/font`, no `<link>`),
  silently falling back to the system font. Fixed via `src/app/(frontend)/fonts.ts` (`next/font/google`).
- **`next-sitemap.config.cjs` excluded `/*`** — every single page was excluded from the generated sitemap —
  and referenced `posts-sitemap.xml`/`pages-sitemap.xml` routes that don't exist in this repo (copied from a
  different template). First fix attempt was just correcting the `exclude` list, but `next-sitemap` crawls the
  static build manifest, and `/` and `/[slug]` are `force-dynamic` (see below) — they don't appear in that
  manifest, so `next-sitemap` silently produced a sitemap missing the homepage entirely. Replaced it outright
  with Next.js's native `app/sitemap.ts` / `app/robots.ts` (`src/app/(frontend)/sitemap.ts`, `robots.ts`),
  which query Payload directly and are correct by construction for CMS-driven content. The `next-sitemap`
  dependency, its config file, and the `postbuild` script were removed. One more wrinkle found in testing:
  `sitemap.ts` works inside the `(frontend)` route group, but `robots.ts` silently produced no route at all
  there — it only registers correctly at the true app root, so it lives at `src/app/robots.ts` while
  `sitemap.ts` stays at `src/app/(frontend)/sitemap.ts`. Confirmed via `next build`'s route table (`.next/server/app`)
  before and after the move.

## Styling

The existing hand-authored CSS system (`tb-` prefixed classes, CSS custom properties, offset shadows, hairline
grids) was extended, not replaced. No move to a component library or full Tailwind utility rewrite — the
existing visual language was already distinctive and matched the CYR Figma direction.
