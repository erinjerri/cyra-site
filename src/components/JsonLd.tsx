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
        'TimeBite keeps your notes, calendar, goals, and reflections in one shared memory, so the things you care about stop slipping through the week.',
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
