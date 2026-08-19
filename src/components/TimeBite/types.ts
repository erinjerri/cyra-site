export type Cta = {
  label?: string
  url?: string
}

export type TimeBiteItem = {
  title?: string
  body?: string
  eyebrow?: string
  assetUrl?: string
  videoUrl?: string
}

export type PlatformItem = {
  title?: string
  body?: string
  status?: 'available' | 'in-development' | 'planned'
}

export type Pillar = {
  label?: string
}

export type BlockImage = { url?: string | null; alt?: string | null } | string | null

export type ShowcaseRow = {
  title?: string
  body?: string
  image?: BlockImage
  assetUrl?: string
  video?: BlockImage
  videoUrl?: string
  imageAlt?: string
}

export type WordPart = {
  part?: string
  meaning?: string
}

export type TimeBiteBlock = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  statement?: string
  emphasis?: string
  attribution?: string
  closingStatement?: string
  cta?: Cta
  secondaryCta?: Cta
  formNote?: string
  items?: TimeBiteItem[]
  steps?: TimeBiteItem[]
  pillars?: Pillar[]
  platforms?: PlatformItem[]
  highlights?: Pillar[]
  rows?: ShowcaseRow[]
  wordParts?: WordPart[]
  image?: BlockImage
  assetUrl?: string
  video?: BlockImage
  videoUrl?: string
  imageAlt?: string
}

export type FAQBlockType = Omit<TimeBiteBlock, 'items'> & {
  items?: {
    question?: string
    answer?: string
  }[]
}

export type TestimonialsBlockType = Omit<TimeBiteBlock, 'items'> & {
  items?: {
    quote?: string
    author?: string
    role?: string
    company?: string
  }[]
}
