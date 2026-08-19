import { getURL } from '@/utilities/getURL'

export function JsonLd() {
  const url = getURL()

  const data = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'TimeBite',
      url,
      description:
        'TimeBite is an AI-powered goals system built around actions, repetition, and compounding follow-through.',
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
        'TimeBite connects goals to small repeated actions so progress becomes sustainable and compounding.',
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
