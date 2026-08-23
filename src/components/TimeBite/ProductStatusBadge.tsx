import type { ProductStatus } from './types'

/**
 * Availability for something physical.
 *
 * A separate vocabulary from `StatusBadge` because the two describe different
 * kinds of thing: "beta" says nothing useful about a printed book, and "sold
 * out" says nothing about an app. Same rule applies to both — the words carry
 * the meaning, colour only reinforces it, and nothing says "available" until
 * it ships.
 */
const PRODUCT_STATUS_LABELS: Record<ProductStatus, string> = {
  concept: 'Concept',
  sample: 'Sample',
  preorder: 'Preorder',
  available: 'Available',
  'sold-out': 'Sold out',
}

export function productStatusLabel(status?: string) {
  return PRODUCT_STATUS_LABELS[status as ProductStatus] || status || null
}

/** True only when the thing can actually be bought and shipped today. */
export function isPurchasable(status?: string) {
  return status === 'available'
}

export function ProductStatusBadge({ status }: { status?: string }) {
  const label = productStatusLabel(status)

  if (!label) return null

  return <span className={`tb-product-status tb-product-status-${status}`}>{label}</span>
}
