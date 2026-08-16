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

### `products` (`src/collections/Products.ts`)

Physical products — planners, task pads, goal notes, desk tools.

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | Card title |
| `slug` | text, required, unique | For future product pages |
| `description` | textarea | One or two sentences, shown on the card |
| `productType` | select | planner / pad / notes / tools / other |
| `variantNote` | text | e.g. "Quarterly · Annual · Undated" |
| `status` | select, required | concept / sample / preorder / available / sold-out |
| `images[]` | array of `{ image (upload → media), alt }` | First image is the card image |
| `price`, `compareAtPrice` | text | Numbers only, no currency symbol. Blank while undecided |
| `cta` | group (`ctaFields`) | Blank label renders the card with no button |
| `sortOrder` | number | Lower first |
| `featured` | checkbox | Highlighted card treatment |
| `enabled` | checkbox (sidebar) | Hide without deleting |

A collection rather than an array on the homepage because a product's status changes on its own schedule
and the same product will appear on the homepage, a future shop page, and launch emails. **This is not
ecommerce** — no cart, no inventory, no checkout. `cta` is a link.

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

Shared field groups (`src/blocks/TimeBite/shared.ts`): `ctaFields` (`label`, `url`, `newTab`,
`analyticsId`), `headingFields` (`eyebrow`, `headline`, `body`), `itemTextFields` (`title`, `body`,
`eyebrow`), `itemFields` (`itemTextFields` + `image`, `assetUrl`), `mediaFields`, and `statusField()`.

⚠️ Never spread `itemFields` **and** `mediaFields` into the same level — both define `image`, and Payload
rejects the entire config with `DuplicateFieldName`. Use `itemTextFields` + `mediaFields` instead.

### Buttons and links

Every CTA carries `label`, `url`, `newTab` and `analyticsId`, and renders through one component
(`CtaLink`). **No presentation component contains a URL** — the Substack beta link lives in content only,
so it can be repointed from `/admin` without a deploy. `newTab` adds `rel="noopener noreferrer"`;
`analyticsId` becomes `data-analytics-event`.

The site-wide fallback is `site-settings` → **Beta call to action**. A block that leaves its own button
blank inherits it.

### The status system

`statusField()` supplies one five-value vocabulary — `available` / `beta` / `in-development` / `planned` /
`exploring` — rendered everywhere by the shared `StatusBadge` component: feature cards, showcase steps,
workspace modules, platform cards, plan features and agents.

Availability is **never written into copy**. A feature line reading "Progress dashboards — in development"
has to be rewritten by hand the day it ships; a line carrying a `status` field only has to be re-tagged, and
the badge, its colour and its wording stay consistent across every surface at once. Anything unshipped on
this site must carry a badge.

### Media slots

`mediaFields` supplies one slot shape: `image`, `assetUrl`, `imageAlt`, `video`, `videoUrl`,
`mediaCaption`, `mediaFrame` (`mac` | `plain`), `sketch`. Resolved by `resolveMedia()`
(`src/components/TimeBite/media.ts`) and rendered by `MediaFrame`, which handles the macOS window chrome,
the fixed 16:10 stage, poster behaviour and the empty state.

An empty slot draws the schematic named by `sketch` (`LayoutSketch`) — an abstract diagram of the layout
that belongs there, never a stock screenshot. Video always renders with visible controls, `preload="metadata"`
and no autoplay. Filenames and capture settings for every slot on the homepage: **`docs/MediaSlots.md`**.

| Block slug | Fields beyond `headingFields` | Used on |
|---|---|---|
| `heroBlock` | `cta`, `secondaryCta`, `availabilityNote`, `mediaFields` | Home |
| `quoteBlock` | `eyebrow`, `statement`, `emphasis`, `attribution` (no `headingFields`) | Home, Philosophy |
| `timelineBlock` | `steps[]` (`itemFields`), `image`, `assetUrl`, `imageAlt` — falls back to the built-in `TimeLoop` SVG | Home |
| `productDemoBlock` | `mediaFields`, `duration`, `transcript` | Home |
| `scaleStoryBlock` | `levels[]` (`{ label, title, body }`), `closingStatement` | Home |
| `frameworkSectionBlock` | `pillars[]` (`{ label }`), `closingStatement`, `cta` | Home, Philosophy |
| `featureGridBlock` | `items[]` (`itemTextFields` + `status` + `mediaFields` + `enabled`) — array order is display order | Home |
| `showcaseBlock` | `numbered`, `rows[]` (`{ title, body, status }` + `mediaFields`) | Home |
| `productGridBlock` | `products` (relationship → `products`, empty = show all enabled by sort order), `cta`, `footnote` | Home |
| `workspaceBlock` | `modules[]` (`{ name, description, sketch, status, defaultOn }`), `suggestion` (`{ source, prompt, moduleName, sketch, acceptLabel, dismissLabel, dismissedNote }`), `footnote` | Home |
| `agentsBlock` | `agents[]` (`{ name, body, status, capabilities[], disclaimer }`), `footnote` | Home |
| `aboutBlock` | `wordParts[]` (`{ part, meaning }`), `closingStatement` | Home |
| `platformCardsBlock` | `platforms[]` (`{ title, body, status }`) | Home |
| `pricingBlock` | TimeBite subscription only; plan `features[]` carry `status`. Physical products were **removed** from this block and now live in the `products` collection | Home |
| `roadmapBlock` | `highlights[]` (`{ label }`), `cta` | **Registered, not on any page** — the agent roadmap and platform cards cover this ground now |
| `newsletterBlock` | `cta`, `secondaryCta`, `formNote` | Home |
| `faqBlock` | `items[]` (`{ question, answer }`) | Home |
| `ctaBlock` | `cta`, `secondaryCta` | Philosophy |
| `testimonialsBlock` | `items[]` (`{ quote, author, role, company, avatar }`) — **schema only, component no-ops when empty** | Not yet used |

Retired (removed, not left as dead code): `authorityStripBlock`, `problemAgitationBlock`,
`howItWorksBlock`, `featureTabsBlock`, `productScreensBlock`, `aiArchitectureBlock`,
`founderCredibilityBlock`.

## Positioning strings (`src/utilities/brand.ts`)

`PRODUCT_DESCRIPTION`, `OG_TITLE`, `SUPPORTED_PLATFORMS` and friends. These were previously duplicated
verbatim across the SEO plugin config, OpenGraph defaults, the OG image, JSON-LD, the `site-settings`
defaults and two metadata helpers — seven places that had to be edited in lockstep to reposition the
product. Editors still override them per-site through `site-settings`; these are the fallbacks behind
those fields.

## Plugins (`src/payload.config.ts`)

| Plugin | Wired? | Purpose |
|---|---|---|
| `@payloadcms/plugin-seo` | Yes | Adds `meta.title` / `meta.description` / `meta.image` to `pages`, with auto-generate callbacks |
| `@payloadcms/plugin-redirects` | Yes | Adds a `redirects` collection so editors can manage URL redirects without a deploy |
| `@payloadcms/plugin-form-builder` | No | Installed, not wired — no dynamic form use case in this scope |
| `@payloadcms/plugin-search` | No | Installed, not wired — no site search UI requested |
| `@payloadcms/plugin-nested-docs` | No | Installed, not wired — `pages` is flat, no parent/child hierarchy needed yet |

## Anchors used by nav/footer links

Home: `#how-it-works` (Timeline), `#demo` (Product Demo), `#scale` (Scale Story), `#features` (Feature
Grid), `#tour` (Showcase), `#workspace` (Adaptive Workspace), `#agents` (Agents), `#platforms` (Platform
Cards), `#pricing` (Pricing), `#planner` (Product Grid), `#beta` (Newsletter), `#faq` (FAQ).
These are plain `id` attributes on each block's `<section>`,
not a CMS field — fine for the current one-of-each-block-per-page layout; if a page ever needs two Timeline
blocks, revisit with a per-block `anchorId` field.
