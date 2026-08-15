import {
  ORGANIZATION_DESCRIPTION,
  ORGANIZATION_NAME,
  PRODUCT_DESCRIPTION,
  PRODUCT_NAME,
  SUPPORTED_PLATFORMS,
} from '@/utilities/brand'
import { getURL } from '@/utilities/getURL'

export function JsonLd() {
  const url = getURL()

  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: ORGANIZATION_NAME,
      url,
      description: ORGANIZATION_DESCRIPTION,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: PRODUCT_NAME,
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: PRODUCT_NAME,
      applicationCategory: 'ProductivityApplication',
      // macOS only, and deliberately so — listing a platform the app does not
      // ship on yet is a structured-data claim search engines will surface.
      operatingSystem: SUPPORTED_PLATFORMS,
      description: PRODUCT_DESCRIPTION,
      url,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/PreOrder',
      },
    },
  ]

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />

}
