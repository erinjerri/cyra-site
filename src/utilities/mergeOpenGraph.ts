import type { Metadata } from 'next'

import { OG_TITLE, PRODUCT_DESCRIPTION, PRODUCT_NAME } from './brand'
import { getURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: PRODUCT_NAME,
  title: OG_TITLE,
  description: PRODUCT_DESCRIPTION,
  url: getURL(),
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
  return {
    ...defaultOpenGraph,
    ...og,
  }
}
