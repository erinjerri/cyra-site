'use client'

import { useState } from 'react'

import { CtaLink } from './CtaLink'
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
          {item.status && item.status !== 'available' ? <StatusBadge size="sm" status={item.status} /> : null}
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
      {cycle === 'annual' && plan.annualNote ? <p className="tb-plan-note">{plan.annualNote}</p> : null}
      {plan.description ? <p>{plan.description}</p> : null}
      <FeatureList items={plan.features} />
      <CtaLink compact cta={plan.cta} variant={plan.featured ? 'primary' : 'secondary'} />
    </article>
  )
}

export function PricingSection({ block }: { block: PricingBlockType }) {
  /*
   * Monthly first. Annual was the default so the recommended price led, but it
   * meant a visitor's first impression of Executive was $1,111.10 rather than
   * $111.11 — the same offer reading roughly ten times more expensive. The
   * annual saving is still one click away, and the toggle announces it.
   */
  const [cycle, setCycle] = useState<BillingCycle>('monthly')

  const plans = block.digitalPlans || []
  const promotion = block.betaPromotion
  const showPromotion = promotion?.enabled !== false && Boolean(promotion?.label || promotion?.body)

  return (
    <section className="tb-section tb-pricing" id="pricing">
      <div className="tb-shell">
        <div className="tb-section-header">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          {block.headline ? <h2>{block.headline}</h2> : null}
          {block.body ? <p>{block.body}</p> : null}
        </div>

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
              <div className="tb-billing-toggle" role="radiogroup" aria-label="Billing period">
                <button
                  aria-checked={cycle === 'monthly'}
                  className={cx('tb-billing-option', cycle === 'monthly' && 'tb-billing-option-active')}
                  data-analytics-event="select_monthly"
                  onClick={() => setCycle('monthly')}
                  role="radio"
                  type="button"
                >
                  {block.monthlyLabel || 'Monthly'}
                </button>
                <button
                  aria-checked={cycle === 'annual'}
                  className={cx('tb-billing-option', cycle === 'annual' && 'tb-billing-option-active')}
                  data-analytics-event="select_annual"
                  onClick={() => setCycle('annual')}
                  role="radio"
                  type="button"
                >
                  {block.annualLabel || 'Annual'}
                  {block.annualBadge ? <span className="tb-billing-badge">{block.annualBadge}</span> : null}
                </button>
              </div>
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
