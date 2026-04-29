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
}

export type FAQBlock = TimeBiteBlock & {
  items?: {
    question?: string
    answer?: string
  }[]
}
