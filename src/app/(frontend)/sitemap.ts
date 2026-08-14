import config from '@payload-config'
import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import { getURL } from '@/utilities/getURL'

// Reflect newly created/published Payload pages immediately rather than
// baking the page list in at build time (see the note in [slug]/page.tsx).
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const url = getURL()

  const { docs } = await payload.find({
    collection: 'pages',
    limit: 100,
    depth: 0,
  })

  return docs
    .filter((doc) => Boolean(doc.slug))
    .map((doc) => ({
      url: doc.slug === 'home' ? url : `${url}/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    }))
}
