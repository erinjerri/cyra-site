# CMS Content Model

## Collections

### `pages` (`src/collections/Pages.ts`)

| Field | Type | Notes |
|---|---|---|
| `title` | text, required | Doc title, also the SEO fallback title |
| `slug` | text, required, unique | Route: `home` → `/`, anything else → `/[slug]` |
| `layout` | blocks, required | The 11 TimeBite blocks below, in any order/combination |
| `meta.title`, `meta.description`, `meta.image` | — | Injected automatically by `plugin-seo` |

Drafts are enabled (`versions.drafts`). Read access is public (`access.read: () => true`) — this is a public
marketing site, there's no gated content.

### `media` (`src/collections/Media.ts`) — unchanged
### `users` (`src/collections/Users.ts`) — unchanged, admin auth only

## Globals

### `header` (`src/globals/Header.ts`)

| Field | Type |
|---|---|
| `logoText` | text (default "TimeBite") |
| `logoTag` | text (default "by Creating Your Reality") |
| `navLinks[]` | `{ label, url }` |
| `cta` | `{ label, url }` |

### `footer` (`src/globals/Footer.ts`)

| Field | Type |
|---|---|
| `brandStatement` | textarea |
| `explore`, `product`, `comingSoon`, `learn`, `company`, `social` | each: `{ title, links[] }` |
| `links[]` (per group) | `{ label, url, comingSoon }` — `comingSoon` renders a disabled label instead of a link |
| `legalNote` | text |

## Blocks (`src/blocks/TimeBite/config.ts`)

Shared field groups (`src/blocks/TimeBite/shared.ts`): `ctaFields` (`label`, `url`), `headingFields`
(`eyebrow`, `headline`, `body`), `itemFields` (`title`, `body`, `eyebrow`, `image`, `assetUrl`).

| Block slug | Fields beyond `headingFields` | Used on |
|---|---|---|
| `heroBlock` | `cta`, `secondaryCta` | Home |
| `quoteBlock` | `eyebrow`, `statement`, `emphasis`, `attribution` (no `headingFields`) | Home, Philosophy |
| `timelineBlock` | `steps[]` (`itemFields`) | Home |
| `frameworkSectionBlock` | `pillars[]` (`{ label }`), `closingStatement`, `cta` | Home, Philosophy |
| `featureGridBlock` | `items[]` (`itemFields`) | Home |
| `platformCardsBlock` | `platforms[]` (`{ title, body, status }`, status = available / in-development / planned) | Home |
| `roadmapBlock` | `now`, `comingSoon`, `future` — each `{ label, items[] }`, `items` = `{ title, body }` | Home |
| `newsletterBlock` | `cta`, `secondaryCta`, `formNote` | Home |
| `faqBlock` | `items[]` (`{ question, answer }`) | Home |
| `ctaBlock` | `cta`, `secondaryCta` | Philosophy |
| `testimonialsBlock` | `items[]` (`{ quote, author, role, company, avatar }`) — **schema only, no seeded content, component no-ops when empty** | Not yet used |

Retired (removed, not left as dead code): `authorityStripBlock`, `problemAgitationBlock`,
`howItWorksBlock`, `featureTabsBlock`, `productScreensBlock`, `aiArchitectureBlock`,
`founderCredibilityBlock`.

## Plugins (`src/payload.config.ts`)

| Plugin | Wired? | Purpose |
|---|---|---|
| `@payloadcms/plugin-seo` | Yes | Adds `meta.title` / `meta.description` / `meta.image` to `pages`, with auto-generate callbacks |
| `@payloadcms/plugin-redirects` | Yes | Adds a `redirects` collection so editors can manage URL redirects without a deploy |
| `@payloadcms/plugin-form-builder` | No | Installed, not wired — no dynamic form use case in this scope |
| `@payloadcms/plugin-search` | No | Installed, not wired — no site search UI requested |
| `@payloadcms/plugin-nested-docs` | No | Installed, not wired — `pages` is flat, no parent/child hierarchy needed yet |

## Anchors used by nav/footer links

Home: `#how-it-works` (Timeline), `#features` (Feature Grid), `#platforms` (Platform Cards), `#roadmap`
(Roadmap), `#beta` (Newsletter), `#faq` (FAQ). These are plain `id` attributes on each block's `<section>`,
not a CMS field — fine for the current one-of-each-block-per-page layout; if a page ever needs two Timeline
blocks, revisit with a per-block `anchorId` field.
