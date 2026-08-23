# Launch Pricing & Commerce

Conceptual launch pricing for TimeBite and the Creating Your Reality planner. **No payment provider is
connected.** Everything on the commerce pages is a link or a mailing-list signup.

## Where a price lives

There are two layers, and the distinction matters:

| Layer | File | Role |
|---|---|---|
| **Authoring source** | `src/utilities/catalog.ts` | The canonical numbers, and every figure derived from them |
| **Runtime source** | Payload (`/admin`) | What the site actually renders. An editor changes a price here with no deploy |

Seeds are generated *from* `catalog.ts`, so re-seeding restores a coherent set of numbers rather than whatever
was typed into six files on six different days. Editors then own it in `/admin`.

Every derived figure is **calculated**, never typed:

| Figure | Derivation | Today |
|---|---|---|
| Annual monthly equivalent | `TIMEBITE_ANNUAL_PRICE / 12` | `$6.58` |
| Annual saving | `1 − annual / (monthly × 12)`, floored | `~34%` |
| Bundle comparison price | `TIMEBITE_ANNUAL_PRICE + PLANNER_RETAIL_PRICE` | `$128` |
| Bundle saving | comparison − bundle | `$9` |

Rounded **down** deliberately: understating a discount is a rounding error, overstating one is a claim.

## TimeBite — software subscription

| Plan | Price |
|---|---|
| Free | `$0` |
| Premium monthly | `$9.99 / month` |
| Premium annual | `$79 / year` — about `$6.58/month`, `Save ~34%` |

- `/pricing` lays all three out as separate cards (`billingToggle: false` on the pricing block).
- The homepage keeps the monthly/annual switch: one Premium card, two billing periods.
- Every feature line that is not shipped carries a `status`. Check them against the feature grid on the
  homepage — the pricing page must never be where something quietly graduates from "in development" to a
  plain bullet point.

## Creating Your Reality planner — physical

| Figure | Value | State |
|---|---|---|
| Target retail | `$49` | A target, presented as one |
| Founding preorder | **Undecided** | Rendered as "Price to be announced" |
| Lifecycle status | `concept` | Not printed, not for sale |

`PLANNER_PREORDER_RANGE` (`$39–45`) exists in `catalog.ts` for internal reference and is **not rendered**.
`PLANNER_PREORDER_PRICE` is `null` on purpose: the Bookblock landed cost, shipping and tax are all open, so
any number on the page would be invented.

The lifecycle lives on the `products` document, not in copy. Moving `concept → sample → preorder` is one edit
in `/admin` and every surface follows.

## Bundle

| | |
|---|---|
| TimeBite + CYR Annual | `$119 / year` |
| Separately | `$128` |
| Saving | `$9` |

`$128` is the honest sum of the two products, not an inflated comparison price. The bundle contains a book
that has not been printed, so `availabilityNote` says so directly beneath the price — not in a footnote.

## Commerce status — what is NOT built

No Stripe, Shopify, Lemon Squeezy, Paddle, RevenueCat or Apple subscription. `CHECKOUT_PROVIDER` in
`catalog.ts` is `'none'` and is the seam to change when one is chosen.

Open decisions, all of which must be settled before anything can be bought:

- **App Store vs web billing.** An iOS subscription may have to run through Apple's in-app purchase rules.
  Keep the web CTA a lead surface rather than a web checkout for the iOS product.
- **Stripe for the planner preorder** — plus shipping zones, tax, and a fulfilment partner.
- **Bookblock landed COGS**, which sets the floor under both the retail and the preorder price.
- **Preorder fulfilment dates.** No date appears anywhere on the site until this is known.
- **One transaction or two** for the bundle. The FAQ currently says this is undecided, because it is.

### Integration points

| Surface | Field to repoint |
|---|---|
| Plan CTAs | `pricingBlock.digitalPlans[].cta` |
| Bundle CTA | `bundleBlock.cta` |
| Planner CTAs | `plannerCampaignBlock.cta` / `secondaryCta`, and `products[].cta` |
| Planner interest form | `plannerInterestBlock.formAction`, or `NEXT_PUBLIC_PLANNER_INTEREST_URL` |
| Beta promotion | `betaPromotion.cta` — the site never validates or displays a code |

## Structured data

`ProductJsonLd` (`src/components/ProductJsonLd.tsx`) emits an `offers` node **only** when the linked product's
status is `preorder` or `available` and a price exists. The planner is `concept`, so `/shop/planner` currently
publishes a `Product` with a name, brand and description and **no offer** — valid schema.org, and true.
Marking an unprinted book `InStock` would put a machine-readable claim into search results that the site
itself does not make.

`plannerCampaignBlock.canonical` gates this so the same campaign shown on `/shop` cannot publish a second,
competing description of the same product.

## Analytics

No analytics vendor is installed and none was added. Every CTA carries `data-analytics-event` via the
CMS `analyticsId` field, so a vendor can bind to them later without editing markup:

`timebite-start-free` · `timebite-monthly` · `timebite-annual` · `planner-interest` · `planner-preview` ·
`bundle-annual` · `beta_code_click` · `select_monthly` · `select_annual`

## Rules that hold regardless of price

- No fake reviews, fake scarcity, inventory counts, countdown timers or dark-pattern pricing.
- Nothing unshipped is described as shipped — availability is a `status` field, never a sentence.
- A blank price renders a note explaining that the number is undecided, never a placeholder number.
- Nothing implies immediate dispatch unless a product's status is `available`.
