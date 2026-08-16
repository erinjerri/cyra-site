import { getVisibleProducts } from '@/utilities/getProducts'

import { CtaLink } from './CtaLink'
import type { BlockImage, ProductDoc, ProductGridBlockType, ProductStatus } from './types'

const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ')

const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  concept: 'Concept',
  sample: 'Sample',
  preorder: 'Preorder',
  available: 'Available',
  'sold-out': 'Sold out',
}

function imageOf(entry?: { image?: BlockImage; alt?: string }) {
  if (!entry?.image) return null

  const upload = typeof entry.image === 'object' ? entry.image : null
  const src = upload?.url

  if (!src) return null

  return { src, alt: entry.alt || upload?.alt || '' }
}

/**
 * Physical products — the offline extension of the app, never the headline.
 *
 * Cards come from the `products` collection, so a planner moving from concept
 * to preorder is one edit in one place. Products with no image render as clean
 * type rather than a broken frame, because stationery photography arrives long
 * after the product is worth announcing.
 */
export async function ProductGrid({ block }: { block: ProductGridBlockType }) {
  // Relationship fields arrive as populated docs; unpopulated IDs are dropped
  // rather than rendered as an empty card.
  const picked = (block.products || []).filter(
    (product): product is ProductDoc => typeof product === 'object' && product !== null,
  )

  // Nothing picked means "show everything I have" — see getVisibleProducts.
  const products = picked.length > 0 ? picked : ((await getVisibleProducts()) as ProductDoc[])

  const visible = products.filter((product) => product.enabled !== false)

  if (visible.length === 0) return null

  return (
    <section className="tb-section tb-products" id="planner">
      <div className="tb-shell">
        <div className="tb-section-header">
          {block.eyebrow ? <p className="tb-eyebrow">{block.eyebrow}</p> : null}
          {block.headline ? <h2>{block.headline}</h2> : null}
          {block.body ? <p>{block.body}</p> : null}
        </div>

        <div className="tb-grid tb-product-grid">
          {visible.map((product, index) => {
            const image = imageOf(product.images?.[0])

            return (
              <article className={cx('tb-card tb-product', product.featured && 'tb-product-featured')} key={index}>
                {image ? (
                  <figure className="tb-product-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={image.src} alt={image.alt} loading="lazy" />
                  </figure>
                ) : null}

                {product.status ? (
                  <span className={`tb-product-status tb-product-status-${product.status}`}>
                    {PRODUCT_STATUS_LABELS[product.status] || product.status}
                  </span>
                ) : null}

                <h3>{product.name}</h3>
                {product.variantNote ? <p className="tb-product-variants">{product.variantNote}</p> : null}
                {product.description ? <p>{product.description}</p> : null}

                {product.price ? (
                  <p className="tb-plan-price">
                    <span className="tb-plan-amount">
                      <span aria-hidden="true">$</span>
                      {product.price}
                    </span>
                    {product.compareAtPrice ? (
                      <s className="tb-product-compare">
                        <span aria-hidden="true">$</span>
                        {product.compareAtPrice}
                      </s>
                    ) : null}
                  </p>
                ) : null}

                <CtaLink compact cta={product.cta} variant={product.featured ? 'primary' : 'secondary'} />
              </article>
            )
          })}
        </div>

        {block.cta?.label ? (
          <div className="tb-actions tb-actions-center">
            <CtaLink cta={block.cta} />
          </div>
        ) : null}

        {block.footnote ? <p className="tb-pricing-footnote">{block.footnote}</p> : null}
      </div>
    </section>
  )
}
