import type { MetadataRoute } from 'next'

import { getURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const url = getURL()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/*'],
    },
    sitemap: `${url}/sitemap.xml`,
  }
}
