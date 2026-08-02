import type { Metadata } from 'next'

import { getURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'TimeBite',
  title: 'TimeBite — the AI-powered personal operating system for intentional living',
  description:
    'TimeBite helps you discover what matters, turn it into action, and build a life you intentionally design.',
  url: getURL(),
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
  return {
    ...defaultOpenGraph,
    ...og,
  }
}
