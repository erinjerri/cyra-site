import { ProductJsonLd } from '@/components/ProductJsonLd'

import { CtaLink } from './CtaLink'
import { PlannerMockup } from './PlannerMockup'
import { ProductStatusBadge } from './ProductStatusBadge'
import { SectionHeader } from './SectionHeader'
import { SPREAD_LABELS, SpreadSketch } from './SpreadSketch'
import type { BlockImage, PlannerCampaignBlockType, PlannerSpread, ProductDoc } from './types'

function uploadUrl(image?: BlockImage) {
  const upload = image && typeof image === 'object' ? image : null
  return upload?.url ? { src: upload.url, alt: upload.alt || '' } : null
}

/**
 * One interior spread: real artwork if it exists, a schematic if it does not.
 *
 * The schematic is labelled as one. A page of a book nobody has printed drawn
 * convincingly enough to pass for a photograph is the exact failure mode this
 * whole placeholder system exists to avoid.
 */
function Spread({ spread }: { spread: PlannerSpread }) {
  const uploaded = uploadUrl(spread.image)
  const kind = spread.spread || 'annual-vision'

  return (
    <li className="tb-spread">
      {uploaded ? (
        <div className="tb-spread-frame">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={spread.imageAlt || uploaded.alt} loading="lazy" src={uploaded.src} />
        </div>
      ) : (
        <div aria-label={spread.imageAlt || SPREAD_LABELS[kind]} className="tb-spread-frame" role="img">
          <SpreadSketch kind={kind} />
        </div>
      )}
      <h4>{spread.title}</h4>
      {spread.body ? <p>{spread.body}</p> : null}
    </li>
  )
}

/**
 * The planner as a product launch rather than a merchandise row.
 *
 * Structured the way a considered physical product is presented: the object
 * first at size, then the argument for it, then the colourways, then what is
 * inside, then the specifications — and the price treated as a target rather
 * than an offer, because it is one.
 *
 * When a `products` record is linked, that record wins on status and price.
 * A planner's lifecycle has to have exactly one home, or the day preorders
 * open someone updates the collection and this section keeps saying concept.
 */
export function PlannerCampaign({ block }: { block: PlannerCampaignBlockType }) {
  const product = (typeof block.product === 'object' && block.product ? block.product : null) as ProductDoc | null

  const status = product?.status || 'concept'
  const price = product?.price
  const covers = block.covers || []
  const hero = covers[0]

  return (
    <section className="tb-section tb-planner-campaign" id="planner-campaign">
      {/* Only from the product's own page, and only ever an offer the linked
          product's status actually supports. See ProductJsonLd. */}
      {block.canonical && product?.name && product.slug ? (
        <ProductJsonLd
          description={product.description || block.description}
          name={product.name}
          path={`/shop/${product.slug}`}
          price={price}
          status={status}
        />
      ) : null}

      <div className="tb-shell">
        <SectionHeader block={block} />

        <div className="tb-campaign-lead">
          <div className="tb-campaign-object">
            <PlannerMockup
              alt={hero?.coverAlt}
              className="tb-campaign-cover"
              cover={hero?.cover}
              image={hero?.coverImage}
            />
          </div>

          <div className="tb-campaign-copy">
            <ProductStatusBadge status={status} />
            {block.tagline ? <p className="tb-campaign-tagline">{block.tagline}</p> : null}
            {block.description ? <p className="tb-campaign-description">{block.description}</p> : null}

            {/* Price and preorder state, side by side and both hedged. The
                target retail number is real; the founding preorder number is
                not decided, and says so rather than showing a placeholder. */}
            <dl className="tb-campaign-price">
              {price ? (
                <div>
                  <dt>Price</dt>
                  <dd className="tb-plan-amount">
                    <span aria-hidden="true">$</span>
                    {price}
                  </dd>
                </div>
              ) : block.priceNote ? (
                <div>
                  <dt>Target retail</dt>
                  <dd>{block.priceNote}</dd>
                </div>
              ) : null}
              {block.preorderNote ? (
                <div>
                  <dt>Founding preorder</dt>
                  <dd>{block.preorderNote}</dd>
                </div>
              ) : null}
            </dl>

            <div className="tb-actions">
              <CtaLink cta={block.cta} />
              <CtaLink cta={block.secondaryCta} variant="secondary" />
            </div>
          </div>
        </div>

        {covers.length > 0 ? (
          <div className="tb-campaign-covers">
            <p className="tb-campaign-label">Cover concepts</p>
            <ul>
              {covers.map((cover, index) => (
                <li key={index}>
                  <PlannerMockup alt={cover.coverAlt} cover={cover.cover} image={cover.coverImage} />
                  <p className="tb-campaign-cover-label">{cover.label}</p>
                  {cover.note ? <p className="tb-campaign-cover-note">{cover.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {block.designedAround?.length ? (
          <div className="tb-campaign-layers">
            <p className="tb-campaign-label">Designed around</p>
            <dl>
              {block.designedAround.map((layer, index) => (
                <div key={index}>
                  <dt>{layer.label}</dt>
                  {layer.body ? <dd>{layer.body}</dd> : null}
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {block.spreads?.length ? (
          <div className="tb-campaign-spreads">
            <p className="tb-campaign-label">Inside the book</p>
            <ul className="tb-spread-grid">
              {block.spreads.map((spread, index) => (
                <Spread key={index} spread={spread} />
              ))}
            </ul>
          </div>
        ) : null}

        {block.details?.length ? (
          <div className="tb-campaign-details">
            <p className="tb-campaign-label">Details</p>
            <ul>
              {block.details.map((detail, index) => {
                const uploaded = uploadUrl(detail.image)
                return (
                  <li key={index}>
                    {uploaded ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img alt={detail.imageAlt || uploaded.alt} loading="lazy" src={uploaded.src} />
                    ) : (
                      /* An empty detail slot says what it is waiting for rather
                         than pretending to be a photograph. */
                      <span className="tb-detail-empty">Detail photography to come</span>
                    )}
                    <p className="tb-detail-title">{detail.title}</p>
                    {detail.body ? <p className="tb-detail-body">{detail.body}</p> : null}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}

        {block.specs?.length ? (
          <div className="tb-campaign-specs">
            <p className="tb-campaign-label">Specifications</p>
            <dl>
              {block.specs.map((spec, index) => (
                <div key={index}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {block.footnote ? <p className="tb-pricing-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}
