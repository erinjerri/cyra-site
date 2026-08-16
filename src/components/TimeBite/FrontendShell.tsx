import { getFooter, getHeader } from '@/utilities/getGlobals'

import { Footer } from './Footer'
import { Header } from './Header'
import { RenderTimeBiteBlocks } from './RenderTimeBiteBlocks'
import type { TimeBiteBlock } from './types'

export async function FrontendShell({
  blocks,
  pageTitle,
}: {
  blocks: TimeBiteBlock[]
  /** Rendered as a visually hidden h1 on pages whose blocks start at h2. */
  pageTitle?: string | null
}) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()])

  return (
    <>
      <a className="tb-skip-link" href="#main-content">
        Skip to content
      </a>
      <Header data={header} />
      {pageTitle ? <h1 className="sr-only">{pageTitle}</h1> : null}
      <RenderTimeBiteBlocks blocks={blocks} />
      <Footer data={footer} />
    </>
  )
}
