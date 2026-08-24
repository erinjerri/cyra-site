/**
 * The canonical commerce numbers.
 *
 * Same reasoning as `brand.ts`: a price that appears in a seed file, a FAQ
 * answer, a bundle comparison and a piece of structured data is four places to
 * forget, and a marketing page that quotes two different prices for the same
 * product is the kind of mistake customers screenshot.
 *
 * Nothing here is read at render time. Components read Payload — that is the
 * runtime source of truth, and an editor changing $79 to $89 in /admin must not
 * need a deploy. This file is the AUTHORING source: the seeds are generated
 * from it, so re-seeding restores a coherent set of numbers rather than
 * whatever was typed into six files on six different days.
 *
 * Every derived figure — the monthly equivalent of the annual plan, the
 * percentage saved, the bundle discount — is CALCULATED below. Typing "34%"
 * by hand is how a page ends up claiming a saving that stopped being true when
 * the monthly price moved.
 *
 * These are LAUNCH CONCEPT prices. See docs/launch-pricing.md for what is
 * still undecided, and `CHECKOUT_PROVIDER` for the deliberate absence of one.
 */

export const CURRENCY = 'USD'
export const CURRENCY_SYMBOL = '$'

/**
 * No billing provider exists in this repository. This constant is the seam:
 * anything that would need a checkout URL checks it first, so adding Stripe or
 * App Store subscriptions is a change here plus a CTA repoint in /admin, not a
 * hunt through components.
 */
export const CHECKOUT_PROVIDER: 'none' | 'stripe' | 'app-store' = 'none'

/* -------------------------------------------------------------------------
   TimeBite — software subscription
   ------------------------------------------------------------------------- */

export const TIMEBITE_FREE_PRICE = 0
export const TIMEBITE_MONTHLY_PRICE = 9.99
export const TIMEBITE_ANNUAL_PRICE = 79

/* -------------------------------------------------------------------------
   Creating Your Reality planner — physical product

   The preorder price is deliberately null. We know the range we are thinking
   in; we do not know the Bookblock landed cost, shipping or tax, so putting a
   number on the page would be inventing one. `PLANNER_PREORDER_RANGE` exists
   for internal copy only and is not rendered as a price.
   ------------------------------------------------------------------------- */

export const PLANNER_RETAIL_PRICE = 49
export const PLANNER_PREORDER_RANGE = { low: 39, high: 45 }
export const PLANNER_PREORDER_PRICE: number | null = null

/**
 * Physical lifecycle, using the vocabulary in `collections/Products.ts`.
 * Nothing may say "preorder" until preorders actually open.
 */
export const PLANNER_STATUS: 'concept' | 'sample' | 'preorder' | 'available' | 'sold-out' = 'concept'

/* -------------------------------------------------------------------------
   TimeBite + planner bundle
   ------------------------------------------------------------------------- */

export const BUNDLE_ANNUAL_PRICE = 119

/** What the two cost bought separately — derived, so it cannot drift. */
export const BUNDLE_SEPARATE_PRICE = TIMEBITE_ANNUAL_PRICE + PLANNER_RETAIL_PRICE

export const BUNDLE_SAVING = BUNDLE_SEPARATE_PRICE - BUNDLE_ANNUAL_PRICE

/* -------------------------------------------------------------------------
   Formatting
   ------------------------------------------------------------------------- */

/**
 * A price as the CMS stores it: digits only, no currency symbol. The `$` is
 * rendered by the component, so a future currency switch is one change.
 * Whole numbers stay whole — "$79", never "$79.00".
 */
export function amount(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(2)
}

/** A display price with its symbol, for prose and notes. */
export function money(value: number): string {
  return `${CURRENCY_SYMBOL}${amount(value)}`
}

/** What the annual plan works out to per month, e.g. "6.58". */
export function annualMonthlyEquivalent(): string {
  return (TIMEBITE_ANNUAL_PRICE / 12).toFixed(2)
}

/**
 * How much annual saves against twelve monthly payments, rounded down to a
 * whole percent. Rounded DOWN deliberately: understating a discount is a
 * rounding error, overstating one is a claim.
 */
export function annualSavingsPercent(): number {
  return Math.floor((1 - TIMEBITE_ANNUAL_PRICE / (TIMEBITE_MONTHLY_PRICE * 12)) * 100)
}
