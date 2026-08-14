import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { generateMeta } from '@/utilities/generateMeta'
import { getURL } from '@/utilities/getURL'

import { bodyFont, displayFont } from './fonts'
import './globals.css'

// generateMeta is async (it reads the site-settings global), so this must be
// an async generateMetadata export. Spreading the promise into a static
// `metadata` object silently yields {} and drops every tag.
export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(getURL()),
    ...(await generateMeta({ doc: null })),
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
