import { getURL } from '@/utilities/getURL'

export function JsonLd() {
  const url = getURL()

  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Creating Your Reality',
      url,
      description:
        'Creating Your Reality is the philosophy, design methodology, and ecosystem behind TimeBite.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'TimeBite',
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'TimeBite',
      applicationCategory: 'LifestyleApplication',
      operatingSystem: 'iOS, macOS',
      description:
        'TimeBite is the AI-powered personal operating system for intentional living, built on the Creating Your Reality framework.',
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
