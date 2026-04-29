export type Cta = {
  label?: string
  url?: string
}

export type TimeBiteItem = {
  title?: string
  body?: string
  eyebrow?: string
  assetUrl?: string
  question?: string
  answer?: string
}

export type PricingFeature = {
  text: string
}

export type PricingTier = {
  name: string
  price: string
  cadence: string
  featured?: boolean
  badge?: string
  features: PricingFeature[]
  cta: Cta
}

export type PricingBlock = {
  blockType: 'pricingBlock'
  eyebrow?: string
  headline?: string
  body?: string
  tiers: PricingTier[]
}

export type TimeBiteBlock = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  cta?: Cta
  secondaryCta?: Cta
  formNote?: string
  assetUrl?: string
  items?: TimeBiteItem[]
  stats?: TimeBiteItem[]
  steps?: TimeBiteItem[]
  tabs?: TimeBiteItem[]
  screens?: TimeBiteItem[]
  tiers?: PricingTier[]
}

export type FAQBlock = TimeBiteBlock
