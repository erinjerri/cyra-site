import { getFooter, getHeader } from '@/utilities/getGlobals'

import { Footer } from './Footer'
import { Header } from './Header'
import { RenderTimeBiteBlocks } from './RenderTimeBiteBlocks'
import type { TimeBiteBlock } from './types'

export async function FrontendShell({ blocks }: { blocks: TimeBiteBlock[] }) {
  const [header, footer] = await Promise.all([getHeader(), getFooter()])

  return (
    <>
      <a className="tb-skip-link" href="#main-content">
        Skip to content
      </a>
      <Header data={header} />
      <RenderTimeBiteBlocks blocks={blocks} />
      <Footer data={footer} />
    </>
  )
}
