import { CtaLink } from './CtaLink'
import { SectionHeader } from './SectionHeader'
import type { BundleBlockType } from './types'

/**
 * The bundle, priced against what the two cost separately.
 *
 * The comparison price is a real one — the sum of the annual subscription and
 * the planner's target retail — not an inflated "value" number invented to
 * make the discount look larger. That is the difference between a saving and
 * a dark pattern, and it is a nine dollar saving, so it is stated once and
 * quietly rather than shouted.
 *
 * `availabilityNote` renders directly beneath the price rather than in a
 * footnote. A bundle containing a book that has not been printed has to say so
 * where the price is read, not several scrolls below it.
 */
export function BundleOffer({ block }: { block: BundleBlockType }) {
  return (
    <section className="tb-section tb-bundle" id="bundle">
      <div className="tb-shell">
        <SectionHeader block={block} />

        <div className="tb-bundle-card">
          <div className="tb-bundle-head">
            {block.badge ? <p className="tb-bundle-badge">{block.badge}</p> : null}
            <h3>{block.name}</h3>

            {block.price ? (
              <p className="tb-plan-price tb-bundle-price">
                <span className="tb-plan-amount">
                  <span aria-hidden="true">$</span>
                  {block.price}
                </span>
                {block.cadence ? <span className="tb-plan-cadence">{block.cadence}</span> : null}
              </p>
            ) : null}

            <p className="tb-bundle-compare">
              {block.separatePrice ? (
                <span>
                  <s>
                    <span aria-hidden="true">$</span>
                    {block.separatePrice}
                  </s>{' '}
                  separately
                </span>
              ) : null}
              {block.savingsNote ? <span className="tb-bundle-saving">{block.savingsNote}</span> : null}
            </p>

            {block.availabilityNote ? <p className="tb-bundle-availability">{block.availabilityNote}</p> : null}

            <CtaLink cta={block.cta} />
          </div>

          {block.includes?.length ? (
            <ul className="tb-bundle-includes">
              {block.includes.map((item, index) => (
                <li key={index}>
                  <span className="tb-bundle-include-text">{item.text}</span>
                  {item.note ? <span className="tb-bundle-include-note">{item.note}</span> : null}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {block.footnote ? <p className="tb-pricing-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}
