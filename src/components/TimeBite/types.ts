/**
 * Nullable throughout, because that is what Payload generates: an optional
 * field an editor has never filled in comes back as `null`, not `undefined`.
 * Declaring these as `string | undefined` makes every CTA read from
 * payload-types fail to assign.
 */
export type Cta = {
  label?: string | null
  url?: string | null
  /** External destinations (Substack) open in a new tab. Set per-link in the CMS. */
  newTab?: boolean | null
  /** Rendered as data-analytics-event so a button can be tracked. */
  analyticsId?: string | null
}

/** The one availability vocabulary — see `statusOptions` in blocks/TimeBite/shared.ts. */
export type Status = 'available' | 'beta' | 'in-development' | 'planned' | 'exploring'

/** Lifecycle of a physical product — see collections/Products.ts. */
export type ProductStatus = 'concept' | 'sample' | 'preorder' | 'available' | 'sold-out'

export type ProductDoc = {
  id?: string
  name?: string
  slug?: string
  description?: string
  productType?: string
  variantNote?: string
  status?: ProductStatus
  images?: { image?: BlockImage; alt?: string }[]
  price?: string
  compareAtPrice?: string
  cta?: Cta
  sortOrder?: number
  featured?: boolean
  enabled?: boolean
}

export type SketchKind =
  | 'workspace'
  | 'goal'
  | 'list'
  | 'matrix'
  | 'board'
  | 'calendar'
  | 'habits'
  | 'chart'
  | 'timeline'

export type BlockImage = { url?: string | null; alt?: string | null } | string | null

/** Shared shape behind every screenshot/video slot on the page. */
export type MediaContent = {
  image?: BlockImage
  assetUrl?: string
  imageAlt?: string
  video?: BlockImage
  videoUrl?: string
  mediaCaption?: string
  mediaFrame?: 'mac' | 'plain'
  sketch?: SketchKind
}

export type TimeBiteItem = MediaContent & {
  title?: string
  body?: string
  eyebrow?: string
  status?: Status
  enabled?: boolean
}

export type PlatformItem = {
  title?: string
  body?: string
  status?: Status
}

export type Pillar = {
  label?: string
}

export type ShowcaseRow = MediaContent & {
  title?: string
  body?: string
  status?: Status
}

export type ScaleLevel = {
  label?: string
  title?: string
  body?: string
}

export type WorkspaceModule = {
  name?: string
  description?: string
  /** Components are TimeBite surfaces; goal areas are CYR life domains. */
  kind?: 'component' | 'goal-area'
  sketch?: SketchKind
  status?: Status
  defaultOn?: boolean
}

export type WorkspaceSuggestion = {
  source?: string
  prompt?: string
  moduleName?: string
  sketch?: SketchKind
  acceptLabel?: string
  dismissLabel?: string
  dismissedNote?: string
}

export type AgentCard = {
  name?: string
  body?: string
  status?: Status
  capabilities?: { text?: string }[]
  disclaimer?: string
}

export type WordPart = {
  part?: string
  meaning?: string
}

export type PricingFeature = {
  text?: string
  status?: Status
}

export type DigitalPlan = {
  name?: string
  /** Number only, no currency symbol. '0' means free. */
  monthlyPrice?: string
  annualPrice?: string
  annualNote?: string
  /** Small marker beside the annual price, e.g. "Save ~34%". Annual view only. */
  annualSavings?: string
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

export type ProductGridBlockType = Omit<TimeBiteBlock, 'items'> & {
  /** Populated relationship docs. Empty means "show every enabled product". */
  products?: (ProductDoc | string)[]
}

export type TimeBiteBlock = MediaContent & {
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
  availabilityNote?: string
  items?: TimeBiteItem[]
  steps?: TimeBiteItem[]
  pillars?: Pillar[]
  platforms?: PlatformItem[]
  highlights?: Pillar[]
  rows?: ShowcaseRow[]
  numbered?: boolean
  wordParts?: WordPart[]
  levels?: ScaleLevel[]
  duration?: string
  transcript?: string
  footnote?: string
  /** Optional second device standing in front of the hero desktop shot. */
  phone?: MediaContent & { enabled?: boolean | null }
  /** Feature groups — one per product layer. See FeatureGrid. */
  groups?: FeatureGroup[]
  flow?: string
}

export type FeatureGroup = {
  label?: string
  brand?: string
  body?: string
  accent?: 'blue' | 'teal' | 'gold' | 'green' | 'pink' | 'lavender'
  items?: TimeBiteItem[]
}

export type WorkspaceBlockType = Omit<TimeBiteBlock, 'items'> & {
  modules?: WorkspaceModule[]
  suggestion?: WorkspaceSuggestion
}

export type AgentsBlockType = Omit<TimeBiteBlock, 'items'> & {
  agents?: AgentCard[]
  roadmapCta?: Cta
}

export type DualLoopTab = {
  label?: string
  tagline?: string
  accent?: 'blue' | 'teal' | 'gold' | 'green' | 'pink' | 'lavender'
  steps?: { title?: string; body?: string; status?: Status }[]
}

export type DualLoopBlockType = Omit<TimeBiteBlock, 'items'> & {
  tabs?: DualLoopTab[]
}

export type ValuesBlockType = Omit<TimeBiteBlock, 'items'> & {
  values?: { title?: string; body?: string }[]
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
  /** False lays the billing periods out as separate cards. See PricingSection. */
  billingToggle?: boolean
  monthlyLabel?: string
  annualLabel?: string
  annualBadge?: string
  digitalPlans?: DigitalPlan[]
  betaPromotion?: BetaPromotion
  platformNote?: { text?: string; cta?: Cta }
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

/* -------------------------------------------------------------------------
   Commerce

   Shapes for the storefront blocks in `blocks/TimeBite/commerce.ts`. Nullable
   throughout for the same reason as everything above: Payload returns `null`
   for a field an editor has never filled in.
   ------------------------------------------------------------------------- */

/** The six brand hues. There is no seventh — see design.md §10. */
export type Accent = 'blue' | 'teal' | 'gold' | 'green' | 'pink' | 'lavender'

/** Conceptual planner colourways. Drawings, never renders of a printed book. */
export type CoverConcept = 'black-gold' | 'midnight-silver'

/** Interior-spread schematics — see SpreadSketch. */
export type SpreadKind =
  | 'annual-vision'
  | 'quarterly-grow'
  | 'monthly'
  | 'weekly'
  | 'rings'
  | 'journal'
  | 'priorities'
  | 'ikigai'

export type CoverSource = {
  cover?: CoverConcept
  coverImage?: BlockImage
  coverAlt?: string
}

export type AnnouncementBlockType = {
  blockType: string
  enabled?: boolean
  message?: string
  accent?: Accent
  cta?: Cta
}

export type StorefrontHeroBlockType = MediaContent &
  CoverSource & {
    blockType: string
    eyebrow?: string
    headline?: string
    body?: string
    cta?: Cta
    secondaryCta?: Cta
    availabilityNote?: string
  }

export type FeaturedProduct = CoverSource & {
  eyebrow?: string
  title?: string
  body?: string
  kind?: 'software' | 'physical'
  status?: Status
  productStatus?: ProductStatus
  accent?: Accent
  price?: string
  priceNote?: string
  highlights?: Pillar[]
  media?: 'app' | 'cover' | 'spread'
  image?: BlockImage
  imageAlt?: string
  sketch?: SketchKind
  spread?: SpreadKind
  cta?: Cta
}

export type FeaturedProductsBlockType = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  items?: FeaturedProduct[]
  together?: {
    label?: string
    headline?: string
    body?: string
    cta?: Cta
  }
}

export type PlannerSpread = {
  title?: string
  body?: string
  spread?: SpreadKind
  image?: BlockImage
  imageAlt?: string
}

export type PlannerCampaignBlockType = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  product?: ProductDoc | string
  tagline?: string
  description?: string
  priceNote?: string
  preorderNote?: string
  covers?: (CoverSource & { label?: string; note?: string })[]
  designedAround?: { label?: string; body?: string }[]
  specs?: { label?: string; value?: string }[]
  spreads?: PlannerSpread[]
  details?: { title?: string; body?: string; image?: BlockImage; imageAlt?: string }[]
  cta?: Cta
  secondaryCta?: Cta
  footnote?: string
  /** Emits Product structured data. True on the product's own page only. */
  canonical?: boolean
}

export type SystemColumn = {
  label?: string
  tagline?: string
  accent?: Accent
  items?: { text?: string; status?: Status }[]
}

export type SystemSplitBlockType = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  columns?: SystemColumn[]
  center?: { label?: string; body?: string }
  flow?: string
}

export type BundleBlockType = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  name?: string
  badge?: string
  price?: string
  cadence?: string
  separatePrice?: string
  savingsNote?: string
  includes?: { text?: string; note?: string }[]
  availabilityNote?: string
  cta?: Cta
  footnote?: string
}

export type MethodologyBlockType = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  stages?: { label?: string; title?: string; body?: string }[]
  closingStatement?: string
}

export type PlanComparisonBlockType = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  columns?: { label?: string; note?: string; featured?: boolean }[]
  rows?: { label?: string; values?: { value?: string; status?: Status }[] }[]
  footnote?: string
}

export type PlannerInterestBlockType = {
  blockType: string
  eyebrow?: string
  headline?: string
  body?: string
  formAction?: string
  interestLabel?: string
  interestOptions?: { label?: string; value?: string }[]
  coverLabel?: string
  coverOptions?: { label?: string; value?: string }[]
  submitLabel?: string
  formNote?: string
  cta?: Cta
}
