import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Every product that should appear on the site, in the order an editor set.
 *
 * Used by the product grid block when its `products` relationship is left
 * empty — the sensible default being "show what I have", rather than an empty
 * section until someone remembers to pick each item by hand.
 */
export async function getVisibleProducts() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'products',
    where: { enabled: { not_equals: false } },
    sort: 'sortOrder',
    limit: 50,
    // One level deeper than the docs themselves, so `images[].image` arrives as
    // a media document rather than an ID.
    depth: 1,
  })

  return result.docs
}
