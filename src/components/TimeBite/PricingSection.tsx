'use client'

import { useState } from 'react'

import { CtaLink } from './CtaLink'
import { SectionHeader } from './SectionHeader'
import { StatusBadge } from './StatusBadge'
import type { DigitalPlan, PricingBlockType, PricingFeature } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

type BillingCycle = 'monthly' | 'annual'

/**
 * Falls back to the monthly figure whenever the annual one is missing, so a
 * plan sold only monthly still shows a price on the annual view. A plan priced
 * '0' never says "billed annually".
 */
function planPrice(plan: DigitalPlan, cycle: BillingCycle) {
  const isAnnual = cycle === 'annual' && Boolean(plan.annualPrice)
  const amount = isAnnual ? plan.annualPrice : plan.monthlyPrice

  if (!amount) return null
  if (amount === '0') return { amount, cadence: 'Free' }

  return { amount, cadence: isAnnual ? 'per year' : 'per month' }
}

/**
 * Availability is a badge, never words inside the feature line. A line that
 * reads "Longer-range review — in development" has to be rewritten by hand the
 * day it ships; a line carrying a status field only has to be re-tagged.
 */
function FeatureList({ items }: { items?: PricingFeature[] }) {
  if (!items?.length) return null

  return (
    <ul className="tb-plan-features">
      {items.map((item, index) => (
        <li key={index}>
          {item.text}
          {item.status && item.status !== 'available' ? (
            <StatusBadge size="sm" status={item.status} />
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function DigitalPlanCard({ plan, cycle }: { plan: DigitalPlan; cycle: BillingCycle }) {
  const price = planPrice(plan, cycle)

  return (
    <article className={cx('tb-card tb-plan', plan.featured && 'tb-plan-featured')}>
      {plan.badge ? <p className="tb-plan-badge">{plan.badge}</p> : null}
      <h3>{plan.name}</h3>
      {price ? (
        <p className="tb-plan-price">
          <span className="tb-plan-amount">
            <span aria-hidden="true">$</span>
            {price.amount}
          </span>
          <span className="tb-plan-cadence">{price.cadence}</span>
        </p>
      ) : null}
      {/* Annual-only, both of them: on the monthly view "about $6.58 a month"
          and "save 34%" would be describing a price the visitor is not looking
          at. The saving is a quiet marker, not a starburst. */}
      {cycle === 'annual' && plan.annualSavings ? (
        <p className="tb-plan-saving">{plan.annualSavings}</p>
      ) : null}
      {cycle === 'annual' && plan.annualNote ? (
        <p className="tb-plan-note">{plan.annualNote}</p>
      ) : null}
      {plan.description ? <p>{plan.description}</p> : null}
      <FeatureList items={plan.features} />
      <CtaLink compact cta={plan.cta} variant={plan.featured ? 'primary' : 'secondary'} />
    </article>
  )
}

export function PricingSection({ block }: { block: PricingBlockType }) {
  /*
   * Monthly first. Annual was the default so the recommended price led, but a
   * visitor's first impression then became the annual figure — the same offer
   * reading roughly twelve times more expensive than it is. The annual saving
   * is one click away, the toggle announces it, and the annual card carries
   * both the monthly equivalent and the percentage saved.
   *
   * With the switch turned off, the section lays the billing periods out as
   * separate cards instead. It settles on 'annual' because `planPrice` falls
   * back to the monthly figure whenever a plan has no annual price: a
   * monthly-only card then shows "$9.99 per month", an annual-only card shows
   * "$79 per year", and a card priced 0 still just says Free. Three prices
   * visible at once, nothing to click.
   */
  const showToggle = block.billingToggle !== false
  const [cycle, setCycle] = useState<BillingCycle>(showToggle ? 'monthly' : 'annual')

  const plans = block.digitalPlans || []
  const promotion = block.betaPromotion
  const showPromotion = promotion?.enabled !== false && Boolean(promotion?.label || promotion?.body)

  return (
    <section className="tb-section tb-pricing" id="pricing">
      <div className="tb-shell">
        <SectionHeader block={block} />

        {block.trialCopy ? <p className="tb-trial-line">{block.trialCopy}</p> : null}

        {block.cta?.label || block.secondaryCta?.label ? (
          <div className="tb-actions tb-actions-center">
            <CtaLink cta={block.cta} />
            <CtaLink cta={block.secondaryCta} variant="secondary" />
          </div>
        ) : null}

        {plans.length ? (
          <>
            <div className="tb-lane-head">
              <p className="tb-lane-eyebrow">{block.digitalEyebrow || 'Digital'}</p>
              {showToggle ? (
                <div className="tb-billing-toggle" role="radiogroup" aria-label="Billing period">
                  <button
                    aria-checked={cycle === 'monthly'}
                    className={cx(
                      'tb-billing-option',
                      cycle === 'monthly' && 'tb-billing-option-active',
                    )}
                    data-analytics-event="select_monthly"
                    onClick={() => setCycle('monthly')}
                    role="radio"
                    type="button"
                  >
                    {block.monthlyLabel || 'Monthly'}
                  </button>
                  <button
                    aria-checked={cycle === 'annual'}
                    className={cx(
                      'tb-billing-option',
                      cycle === 'annual' && 'tb-billing-option-active',
                    )}
                    data-analytics-event="select_annual"
                    onClick={() => setCycle('annual')}
                    role="radio"
                    type="button"
                  >
                    {block.annualLabel || 'Annual'}
                    {block.annualBadge ? (
                      <span className="tb-billing-badge">{block.annualBadge}</span>
                    ) : null}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="tb-grid tb-plan-grid">
              {plans.map((plan, index) => (
                <DigitalPlanCard cycle={cycle} key={index} plan={plan} />
              ))}
            </div>
          </>
        ) : null}

        {showPromotion ? (
          <div className="tb-promo">
            <div>
              {promotion?.label ? <p className="tb-promo-label">{promotion.label}</p> : null}
              {promotion?.body ? <p>{promotion.body}</p> : null}
            </div>
            {promotion?.cta?.label ? (
              <a
                className="tb-promo-link"
                data-analytics-event={promotion.cta.analyticsId || undefined}
                href={promotion.cta.url || '#beta'}
                rel={promotion.cta.newTab ? 'noopener noreferrer' : undefined}
                target={promotion.cta.newTab ? '_blank' : undefined}
              >
                {promotion.cta.label}
              </a>
            ) : null}
          </div>
        ) : null}

        {block.platformNote?.text ? (
          <p className="tb-platform-note">
            {block.platformNote.text}{' '}
            {block.platformNote.cta?.label ? (
              <a
                data-analytics-event={block.platformNote.cta.analyticsId || undefined}
                href={block.platformNote.cta.url || '#platforms'}
              >
                {block.platformNote.cta.label}
              </a>
            ) : null}
          </p>
        ) : null}

        {block.footnote ? <p className="tb-pricing-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}
