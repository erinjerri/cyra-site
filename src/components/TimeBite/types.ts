export type Cta = {
  label?: string
  url?: string
}

export type TimeBiteItem = {
  title?: string
  body?: string
  eyebrow?: string
  assetUrl?: string
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
  imageAlt?: string
}

export type WordPart = {
  part?: string
  meaning?: string
}

export type PricingFeature = {
  text?: string
}

export type DigitalPlan = {
  name?: string
  /** Number only, no currency symbol. '0' means free. */
  monthlyPrice?: string
  annualPrice?: string
  annualNote?: string
  description?: string
  badge?: string
  featured?: boolean
  features?: PricingFeature[]
  cta?: Cta
}

export type BetaPromotion = {
  enabled?: boolean
  label?: string
  body?: string
  cta?: Cta
}

export type PhysicalProduct = {
  name?: string
  price?: string
  billingType?: 'preorder' | 'one-time'
  description?: string
  includedItems?: PricingFeature[]
  badge?: string
  featured?: boolean
  /** Offers can stay configured but hidden — used for the optional bundles. */
  enabled?: boolean
  cta?: Cta
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
  imageAlt?: string
}

export type FAQBlockType = Omit<TimeBiteBlock, 'items'> & {
  items?: {
    question?: string
    answer?: string
  }[]
}

export type PricingBlockType = Omit<TimeBiteBlock, 'items'> & {
  trialCopy?: string
  digitalEyebrow?: string
  monthlyLabel?: string
  annualLabel?: string
  annualBadge?: string
  digitalPlans?: DigitalPlan[]
  betaPromotion?: BetaPromotion
  platformNote?: { text?: string; cta?: Cta }
  physicalEyebrow?: string
  physicalHeadline?: string
  physicalBody?: string
  physicalProducts?: PhysicalProduct[]
  footnote?: string
}

export type TestimonialsBlockType = Omit<TimeBiteBlock, 'items'> & {
  items?: {
    quote?: string
    author?: string
    role?: string
    company?: string
  }[]
}
