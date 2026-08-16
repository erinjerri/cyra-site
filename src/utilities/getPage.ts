import config from '@payload-config'
import { getPayload } from 'payload'

export async function getPageBySlug(slug: string) {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    // Depth 2, not 1: the product grid block relates to `products`, and each
    // product relates to `media`. At depth 1 the product doc arrives populated
    // but its images are still bare IDs, so every product card loses its photo.
    depth: 2,
  })

  return result.docs[0] || null
}
