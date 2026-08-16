import type { Metadata } from 'next'

import { JsonLd } from '../../components/JsonLd'
import { generateMeta } from '../../utilities/generateMeta'
import { getURL } from '../../utilities/getURL'

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

/**
 * Applies the stored theme before first paint.
 *
 * This has to be a blocking inline script: if the class were applied in an
 * effect, the browser would paint the default theme first and every visitor who
 * chose light mode would get a black flash on load. `suppressHydrationWarning`
 * on <html> is required because this script mutates the element before React
 * hydrates, which React would otherwise report as a mismatch.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('tb-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  )
}
