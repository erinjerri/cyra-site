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

  const [pages, posts] = await Promise.all([
    payload.find({ collection: 'pages', limit: 100, depth: 0 }),
    payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      limit: 500,
      depth: 0,
    }),
  ])

  const pageEntries = pages.docs
    .filter((doc) => Boolean(doc.slug))
    .map((doc) => ({
      url: doc.slug === 'home' ? url : `${url}/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    }))

  const postEntries = posts.docs
    .filter((doc) => Boolean(doc.slug))
    .map((doc) => ({
      url: `${url}/blog/${doc.slug}`,
      lastModified: doc.updatedAt ? new Date(doc.updatedAt) : new Date(),
    }))

  // The blog index itself is a route file, not a Payload page, so it would
  // otherwise be missing from the sitemap entirely.
  const blogIndex = { url: `${url}/blog`, lastModified: new Date() }

  return [...pageEntries, blogIndex, ...postEntries]
}
