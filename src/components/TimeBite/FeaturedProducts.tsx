import { CtaLink } from './CtaLink'
import { LayoutSketch } from './LayoutSketch'
import { PlannerMockup } from './PlannerMockup'
import { ProductStatusBadge } from './ProductStatusBadge'
import { SectionHeader } from './SectionHeader'
import { SPREAD_LABELS, SpreadSketch } from './SpreadSketch'
import { StatusBadge } from './StatusBadge'
import type { BlockImage, FeaturedProduct, FeaturedProductsBlockType } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

function uploadUrl(image?: BlockImage) {
  const upload = image && typeof image === 'object' ? image : null
  return upload?.url ? { src: upload.url, alt: upload.alt || '' } : null
}

/**
 * The media half of a featured panel.
 *
 * Three placeholders rather than one, because the two products are not the
 * same kind of object: an app gets a screen schematic inside a window, a book
 * gets a cover drawing, and a page of the book gets a spread schematic. One
 * generic grey box for all three would flatten exactly the distinction this
 * section exists to draw.
 */
function PanelMedia({ item }: { item: FeaturedProduct }) {
  const uploaded = uploadUrl(item.image)

  if (uploaded) {
    return (
      <div className="tb-featured-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={item.imageAlt || uploaded.alt} loading="lazy" src={uploaded.src} />
      </div>
    )
  }

  if (item.media === 'cover') {
    return (
      <div className="tb-featured-media tb-featured-media-cover">
        <PlannerMockup alt={item.coverAlt} cover={item.cover} />
      </div>
    )
  }

  if (item.media === 'spread') {
    const kind = item.spread || 'annual-vision'
    return (
      <div
        aria-label={item.imageAlt || SPREAD_LABELS[kind]}
        className="tb-featured-media tb-featured-media-paper"
        role="img"
      >
        <SpreadSketch kind={kind} />
      </div>
    )
  }

  return (
    <div
      aria-label={item.imageAlt || 'Schematic of the TimeBite workspace.'}
      className="tb-featured-media tb-featured-media-app"
      role="img"
    >
      <LayoutSketch kind={item.sketch || 'calendar'} />
    </div>
  )
}

function FeaturedPanel({ item, scale }: { item: FeaturedProduct; scale: 'major' | 'minor' }) {
  return (
    <article
      className={cx('tb-featured', `tb-featured-${scale}`)}
      style={{ '--tb-featured-accent': `var(--tb-${item.accent || 'blue'})` } as React.CSSProperties}
    >
      <PanelMedia item={item} />

      <div className="tb-featured-copy">
        {item.eyebrow ? <p className="tb-featured-eyebrow">{item.eyebrow}</p> : null}
        <h3>{item.title}</h3>

        {/* Two vocabularies, one slot: software maturity or product lifecycle,
            never both, because an item is one kind of thing or the other. */}
        {item.kind === 'physical' ? (
          <ProductStatusBadge status={item.productStatus} />
        ) : (
          <StatusBadge size="sm" status={item.status} />
        )}

        {item.body ? <p className="tb-featured-body">{item.body}</p> : null}

        {item.highlights?.length ? (
          <ul className="tb-featured-highlights">
            {item.highlights.map((highlight, index) => (
              <li key={index}>{highlight.label}</li>
            ))}
          </ul>
        ) : null}

        {/* A blank price is not a gap to fill with a guess — the note takes its
            place and says plainly that the number is not decided. */}
        {item.price ? (
          <p className="tb-featured-price">
            <span className="tb-plan-amount">
              <span aria-hidden="true">$</span>
              {item.price}
            </span>
            {item.priceNote ? <span className="tb-featured-price-note">{item.priceNote}</span> : null}
          </p>
        ) : item.priceNote ? (
          <p className="tb-featured-price-pending">{item.priceNote}</p>
        ) : null}

        <CtaLink compact cta={item.cta} variant={scale === 'major' ? 'primary' : 'secondary'} />
      </div>
    </article>
  )
}

/**
 * Editorial merchandising: one product wide, the next narrow, alternating.
 *
 * An equal-card grid would say the two products are equivalent choices. They
 * are not — TimeBite launches first and the planner accompanies it — and the
 * layout is where that gets said, before anyone reads a word. Array order is
 * the hierarchy: item one takes the wide panel.
 *
 * Both panels stack full width below 920px, in array order, so the phone
 * layout preserves the same ranking rather than inverting it.
 */
export function FeaturedProducts({ block }: { block: FeaturedProductsBlockType }) {
  const items = block.items || []

  if (items.length === 0) return null

  const together = block.together

  return (
    <section className="tb-section tb-featured-section" id="featured">
      <div className="tb-shell">
        <SectionHeader block={block} />

        <div className="tb-featured-grid">
          {items.map((item, index) => (
            <FeaturedPanel item={item} key={index} scale={index % 2 === 0 ? 'major' : 'minor'} />
          ))}
        </div>

        {together?.headline ? (
          <div className="tb-together">
            {together.label ? <p className="tb-together-label">{together.label}</p> : null}
            <h3>{together.headline}</h3>
            {together.body ? <p>{together.body}</p> : null}
            <CtaLink compact cta={together.cta} variant="secondary" />
          </div>
        ) : null}
      </div>
    </section>
  )
}
