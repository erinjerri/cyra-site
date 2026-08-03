import type { Metadata } from 'next'

import { getURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'TimeBite',
  title: 'TimeBite — remember what you meant to do.',
  description:
    'TimeBite keeps your notes, calendar, goals, and reflections in one shared memory, so the things you care about stop slipping through the week.',
  url: getURL(),
}

export function mergeOpenGraph(og?: Metadata['openGraph']): Metadata['openGraph'] {
  return {
    ...defaultOpenGraph,
    ...og,
  }
}
