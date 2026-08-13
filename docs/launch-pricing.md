# Launch Pricing — 2026

Every number below is content, not code. It lives in the `pricingBlock` and is editable in
`/admin`; the seeded defaults are in `src/endpoints/seed/timebite-home.ts`. Changing a price should
never mean grepping the codebase.

## Where it lives

| Concern | File |
| --- | --- |
| Payload schema | `src/blocks/TimeBite/config.ts` (`PricingBlock`) |
| TypeScript types | `src/components/TimeBite/types.ts` (`PricingBlockType`) |
| Renderer | `src/components/TimeBite/PricingSection.tsx` |
| Seeded content | `src/endpoints/seed/timebite-home.ts` |
| Nav links | `src/endpoints/seed/header-footer.ts` |
| Styles | `src/app/(frontend)/globals.css`, "Pricing" section |

## Digital — TimeBite subscription

| Plan | Monthly | Annual |
| --- | --- | --- |
| Free | $0 | $0 |
| Plus | $12.55 | $125.55 |
| Pro | $25.55 | $255.55 |

- Annual is the default view and carries the "Best value" badge, so the first price a visitor sees
  is the one we recommend.
- Plus annual is two months lighter than paying monthly; that claim is per-plan copy (`annualNote`)
  and only renders on the annual view.
- A plan priced `0` renders as "Free" and never says "billed annually".
- Pro's unbuilt capabilities are labelled "in development" or "planned" in the feature list. Leave
  those labels until the features actually ship.

## Trial and beta promotion

- 30 days free. The copy makes no claim about a credit card, because no billing exists to require
  one either way.
- `betaPromotion` adds two further months for invited testers. The **code itself never appears on
  the site** — the group holds only label, body, and CTA. Redemption belongs to whichever billing
  provider gets chosen.
- `betaPromotion.enabled` hides the strip without touching a component.

## Platforms

Pricing does **not** carry its own device list. `platformCardsBlock` owns availability, and the
pricing section shows a single `platformNote` line that links to it — one source of truth, so the
two can't drift apart.

## Physical — Creating Your Reality planner

| Product | Price | State |
| --- | --- | --- |
| Six-Month Planner | $35.55 | Pre-order, visible |
| Year of Planning (two planners) | $65.55 | Pre-order, visible, best value |
| Stationery Kit | $55.55 | Pre-order, visible |
| Planner + Stationery | $85.55 | Configured, `enabled: false` |
| Full Year Analog Set | $115.55 | Configured, `enabled: false` |

- All physical products are one-time and labelled "Pre-order", visually distinct from the recurring
  digital plans (gold accent rather than blue).
- The two bundles exist in the data so they can be switched on by flipping `enabled` in `/admin`.
  They're hidden today to keep the page hierarchy readable.
- Stationery contents are described loosely so the SKU can change before printing.

## Commerce status

No billing or ecommerce provider exists in this repository — no Stripe, Shopify, Lemon Squeezy,
Paddle, RevenueCat, or Apple subscriptions. None was added.

Every CTA is a plain link to the existing beta capture (`#beta`, backed by
`NEXT_PUBLIC_BETA_SIGNUP_URL` / `NEXT_PUBLIC_SUBSTACK_EMBED_URL`). Integration points when a
provider is chosen:

- **Digital plans** — `digitalPlans[].cta`. iOS subscriptions will likely have to run through
  Apple's in-app purchase rules, so keep the web CTA a lead surface rather than a web checkout for
  the iOS product.
- **Physical products** — `physicalProducts[].cta`. Repointing these at Shopify or Stripe is a
  content change.
- **Beta promotion** — `betaPromotion.cta`. The site should never validate or display a code.

## Analytics

No analytics vendor is installed and none was added. CTAs carry `data-analytics-event` attributes
so a vendor can bind to them later without editing markup: `start_free_trial`, `select_monthly`,
`select_annual`, `beta_code_click`, `planner_preorder_click`.
