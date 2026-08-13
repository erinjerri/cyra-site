'use client'

import { useState } from 'react'

import type { DigitalPlan, PhysicalProduct, PricingBlockType } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

type BillingCycle = 'monthly' | 'annual'

/**
 * Annual is the default view, so the price a visitor sees first is the one we
 * recommend. A plan priced '0' never says "billed annually".
 */
function planPrice(plan: DigitalPlan, cycle: BillingCycle) {
  const isAnnual = cycle === 'annual' && Boolean(plan.annualPrice)
  const amount = isAnnual ? plan.annualPrice : plan.monthlyPrice

  if (!amount) return null
  if (amount === '0') return { amount, cadence: 'Free' }

  return { amount, cadence: isAnnual ? 'per year' : 'per month' }
}

function FeatureList({ items }: { items?: { text?: string }[] }) {
  if (!items?.length) return null

  return (
    <ul className="tb-plan-features">
      {items.map((item, index) => (
        <li key={index}>{item.text}</li>
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
      {plan.cta?.label ? (
        <a
          className={cx('tb-button tb-button-compact', !plan.featured && 'tb-button-secondary')}
          data-analytics-event="start_free_trial"
          href={plan.cta.url || '#beta'}
        >
          {plan.cta.label}
        </a>
      ) : null}
    </article>
  )
}

function PhysicalProductCard({ product }: { product: PhysicalProduct }) {
  const isPreorder = product.billingType !== 'one-time'

  return (
    <article className={cx('tb-card tb-plan tb-product', product.featured && 'tb-product-featured')}>
      <p className="tb-plan-badge tb-product-tag">{isPreorder ? 'Pre-order' : 'One-time'}</p>
      <h3>{product.name}</h3>
      <p className="tb-plan-price">
        <span className="tb-plan-amount">
          <span aria-hidden="true">$</span>
          {product.price}
        </span>
        <span className="tb-plan-cadence">{isPreorder ? 'one-time, charged when it ships' : 'one-time'}</span>
      </p>
      {product.badge ? <p className="tb-plan-note tb-product-note">{product.badge}</p> : null}
      {product.description ? <p>{product.description}</p> : null}
      <FeatureList items={product.includedItems} />
      {product.cta?.label ? (
        <a
          className={cx('tb-button tb-button-compact', !product.featured && 'tb-button-secondary')}
          data-analytics-event="planner_preorder_click"
          href={product.cta.url || '#beta'}
        >
          {product.cta.label}
        </a>
      ) : null}
    </article>
  )
}

export function PricingSection({ block }: { block: PricingBlockType }) {
  const [cycle, setCycle] = useState<BillingCycle>('annual')

  const plans = block.digitalPlans || []
  const products = (block.physicalProducts || []).filter((product) => product.enabled !== false)
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
            {block.cta?.label ? (
              <a className="tb-button" data-analytics-event="start_free_trial" href={block.cta.url || '#beta'}>
                {block.cta.label}
              </a>
            ) : null}
            {block.secondaryCta?.label ? (
              <a
                className="tb-button tb-button-secondary"
                data-analytics-event="planner_preorder_click"
                href={block.secondaryCta.url || '#planner'}
              >
                {block.secondaryCta.label}
              </a>
            ) : null}
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
              <a className="tb-promo-link" data-analytics-event="beta_code_click" href={promotion.cta.url || '#beta'}>
                {promotion.cta.label}
              </a>
            ) : null}
          </div>
        ) : null}

        {block.platformNote?.text ? (
          <p className="tb-platform-note">
            {block.platformNote.text}{' '}
            {block.platformNote.cta?.label ? (
              <a href={block.platformNote.cta.url || '#platforms'}>{block.platformNote.cta.label}</a>
            ) : null}
          </p>
        ) : null}

        {products.length ? (
          <div className="tb-analog" id="planner">
            <div className="tb-lane-head">
              <p className="tb-lane-eyebrow">{block.physicalEyebrow || 'Analog'}</p>
            </div>
            {block.physicalHeadline ? <h3 className="tb-analog-headline">{block.physicalHeadline}</h3> : null}
            {block.physicalBody ? <p className="tb-analog-body">{block.physicalBody}</p> : null}
            <div className="tb-grid tb-plan-grid">
              {products.map((product, index) => (
                <PhysicalProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        ) : null}

        {block.footnote ? <p className="tb-pricing-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}
