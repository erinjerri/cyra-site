import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { generateMeta } from '@/utilities/generateMeta'
import { getURL } from '@/utilities/getURL'

import { bodyFont, displayFont } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getURL()),
  ...generateMeta({ doc: null }),
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
