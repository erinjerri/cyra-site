import { ORGANIZATION_NAME } from '@/utilities/brand'
import { getURL } from '@/utilities/getURL'

/**
 * `Product` structured data for a physical product page.
 *
 * The `offers` node is emitted ONLY when the product can actually be bought —
 * status `preorder` or `available`, with a real price. A concept renders a
 * Product with a name and a description and no offer at all, which is both
 * valid schema.org and true.
 *
 * That restraint is the entire point of this component. Marking an unprinted
 * book `InStock`, or inventing a `PreOrder` availability for something with no
 * preorder open, puts a machine-readable claim into search results that the
 * site itself does not make — and it is the sort of claim a shopping surface
 * will happily render as a buyable listing.
 */
export function ProductJsonLd({
  name,
  description,
  status,
  price,
  currency = 'USD',
  path,
}: {
  name: string
  description?: string
  status?: string
  /** Digits only, no symbol. Ignored unless the status allows an offer. */
  price?: string | null
  currency?: string
  /** Path of the page this product is presented on, e.g. /shop/planner. */
  path: string
}) {
  const url = `${getURL()}${path}`

  const availability =
    status === 'available'
      ? 'https://schema.org/InStock'
      : status === 'preorder'
        ? 'https://schema.org/PreOrder'
        : null

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    url,
    brand: { '@type': 'Brand', name: ORGANIZATION_NAME },
    ...(description ? { description } : {}),
  }

  if (availability && price) {
    data.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability,
      url,
    }
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
