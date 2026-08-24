import { CtaLink } from './CtaLink'
import { MediaFrame } from './MediaFrame'
import { PlannerMockup } from './PlannerMockup'
import type { StorefrontHeroBlockType } from './types'

/**
 * The storefront opening: copy on one side, both products on the other.
 *
 * `heroBlock` centres its copy over a full-width Mac window, which is right
 * for a product page — one thing, shown large. A storefront has to answer a
 * different question first: what is for sale here. So the composition carries
 * two objects, the app window and the book, with the window dominant because
 * the app is what launches first.
 *
 * The book overlaps the window rather than sitting beside it. Two objects in
 * separate boxes read as two products; one standing in front of the other
 * reads as a set, which is the whole argument of the page.
 */
export function StorefrontHero({ block }: { block: StorefrontHeroBlockType }) {
  return (
    <section className="tb-section tb-store-hero" id="shop-hero">
      <div className="tb-shell tb-store-hero-inner">
        <div className="tb-store-hero-copy">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          <h1>{block.headline}</h1>
          {block.body ? <p className="tb-store-hero-body">{block.body}</p> : null}
          <div className="tb-actions">
            <CtaLink cta={block.cta} />
            <CtaLink cta={block.secondaryCta} variant="secondary" />
          </div>
          {block.availabilityNote ? <p className="tb-store-hero-note">{block.availabilityNote}</p> : null}
        </div>

        <div className="tb-store-hero-stage">
          <MediaFrame className="tb-store-hero-app" priority ratio="16 / 10" source={block} title="TimeBite" />
          <PlannerMockup
            alt={block.coverAlt}
            className="tb-store-hero-book"
            cover={block.cover}
            image={block.coverImage}
          />
        </div>
      </div>
    </section>
  )
}
