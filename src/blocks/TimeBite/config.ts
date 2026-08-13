import type { Block } from 'payload'

import { ctaFields, headingFields, itemFields } from './shared'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Hero Blocks' },
  fields: [
    ...headingFields,
    { name: 'cta', type: 'group', fields: ctaFields },
    { name: 'secondaryCta', type: 'group', fields: ctaFields },
  ],
}

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  interfaceName: 'QuoteBlock',
  labels: { singular: 'Quote', plural: 'Quote Blocks' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'statement', type: 'textarea', required: true },
    { name: 'emphasis', type: 'textarea' },
    { name: 'attribution', type: 'text' },
  ],
}

export const TimelineBlock: Block = {
  slug: 'timelineBlock',
  interfaceName: 'TimelineBlock',
  labels: { singular: 'Timeline', plural: 'Timeline Blocks' },
  fields: [
    ...headingFields,
    { name: 'steps', type: 'array', minRows: 1, fields: itemFields },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'App screenshot for this section — e.g. the half-day rings. Falls back to the built-in time loop graphic when empty.',
      },
    },
    { name: 'assetUrl', type: 'text', admin: { description: 'Optional public image URL used when no upload is set.' } },
    { name: 'imageAlt', type: 'text', admin: { description: 'Describe the image for screen readers.' } },
  ],
}

/**
 * Explains the name — the bridge from philosophy to something a person can
 * actually hold. `wordParts` splits the wordmark (Time / Bite) with a meaning
 * under each.
 */
export const AboutBlock: Block = {
  slug: 'aboutBlock',
  interfaceName: 'AboutBlock',
  labels: { singular: 'About the Name', plural: 'About Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'wordParts',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'part', type: 'text', required: true },
        { name: 'meaning', type: 'textarea' },
      ],
    },
    { name: 'closingStatement', type: 'textarea' },
  ],
}

export const FrameworkSectionBlock: Block = {
  slug: 'frameworkSectionBlock',
  interfaceName: 'FrameworkSectionBlock',
  labels: { singular: 'Framework Section', plural: 'Framework Section Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'pillars',
      type: 'array',
      minRows: 1,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'closingStatement', type: 'text' },
    { name: 'cta', type: 'group', fields: ctaFields },
  ],
}

export const FeatureGridBlock: Block = {
  slug: 'featureGridBlock',
  interfaceName: 'FeatureGridBlock',
  labels: { singular: 'Feature Grid', plural: 'Feature Grid Blocks' },
  fields: [
    ...headingFields,
    { name: 'items', type: 'array', minRows: 1, fields: itemFields },
  ],
}

export const PlatformCardsBlock: Block = {
  slug: 'platformCardsBlock',
  interfaceName: 'PlatformCardsBlock',
  labels: { singular: 'Platform Cards', plural: 'Platform Cards Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'platforms',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'planned',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'In development', value: 'in-development' },
            { label: 'Planned', value: 'planned' },
          ],
        },
      ],
    },
  ],
}

/**
 * Slim teaser only. The full board lives in an external roadmap tool
 * (Sunsama-style), linked via `cta`. The CTA is hidden until a URL is set,
 * so this never renders a dead button before the board exists.
 */
export const RoadmapBlock: Block = {
  slug: 'roadmapBlock',
  interfaceName: 'RoadmapBlock',
  labels: { singular: 'Roadmap', plural: 'Roadmap Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'highlights',
      type: 'array',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'cta',
      type: 'group',
      fields: ctaFields,
      admin: {
        description: 'Link to the external roadmap board. Hidden until a URL is set.',
      },
    },
  ],
}

/**
 * Product photography (physical planner) and app screenshots.
 * Rows with no image render as clean text — never an empty placeholder box.
 */
export const ShowcaseBlock: Block = {
  slug: 'showcaseBlock',
  interfaceName: 'ShowcaseBlock',
  labels: { singular: 'Showcase', plural: 'Showcase Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          name: 'assetUrl',
          type: 'text',
          admin: { description: 'Optional public image URL used when no upload is set.' },
        },
        {
          name: 'imageAlt',
          type: 'text',
          admin: { description: 'Describe the image for screen readers.' },
        },
      ],
    },
  ],
}

/**
 * Launch pricing — digital subscriptions and physical planner pre-orders in one
 * section, because they are one system rather than two product lines.
 *
 * Platform availability deliberately lives in `platformCardsBlock`, not here.
 * `platformNote` is a single sentence that points at it, so device status has
 * exactly one source of truth.
 *
 * No billing provider exists yet. Every CTA is a link, so repointing these at a
 * real checkout later is a content change rather than a code change.
 */
export const PricingBlock: Block = {
  slug: 'pricingBlock',
  interfaceName: 'PricingBlock',
  labels: { singular: 'Pricing', plural: 'Pricing Blocks' },
  fields: [
    ...headingFields,
    { name: 'cta', type: 'group', fields: ctaFields },
    { name: 'secondaryCta', type: 'group', fields: ctaFields },
    {
      name: 'trialCopy',
      type: 'textarea',
      admin: { description: 'Free trial line above the plans, e.g. "Try TimeBite free for 30 days."' },
    },
    { name: 'digitalEyebrow', type: 'text', defaultValue: 'Digital' },
    { name: 'monthlyLabel', type: 'text', defaultValue: 'Monthly' },
    { name: 'annualLabel', type: 'text', defaultValue: 'Annual' },
    {
      name: 'annualBadge',
      type: 'text',
      admin: { description: 'Small badge beside the annual toggle, e.g. "Best value".' },
    },
    {
      name: 'digitalPlans',
      type: 'array',
      labels: { singular: 'Digital plan', plural: 'Digital plans' },
      fields: [
        { name: 'name', type: 'text', required: true },
        {
          name: 'monthlyPrice',
          type: 'text',
          admin: { description: 'Number only, no currency symbol. Use "0" for free. Blank if not sold monthly.' },
        },
        {
          name: 'annualPrice',
          type: 'text',
          admin: { description: 'Number only, no currency symbol. Blank if not sold annually.' },
        },
        {
          name: 'annualNote',
          type: 'text',
          admin: { description: 'Shown only on the annual view, e.g. "Two months free against paying monthly."' },
        },
        { name: 'description', type: 'textarea' },
        { name: 'badge', type: 'text' },
        { name: 'featured', type: 'checkbox' },
        { name: 'features', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
        { name: 'cta', type: 'group', fields: ctaFields },
      ],
    },
    {
      name: 'betaPromotion',
      type: 'group',
      admin: {
        description:
          'Invite-code promotion. The code itself is never rendered — redemption belongs to the billing provider.',
      },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'label', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'cta', type: 'group', fields: ctaFields },
      ],
    },
    {
      name: 'platformNote',
      type: 'group',
      admin: { description: 'One line about cross-device access. Device status lives in the Platform Cards block.' },
      fields: [
        { name: 'text', type: 'textarea' },
        { name: 'cta', type: 'group', fields: ctaFields },
      ],
    },
    { name: 'physicalEyebrow', type: 'text', defaultValue: 'Analog' },
    { name: 'physicalHeadline', type: 'text' },
    { name: 'physicalBody', type: 'textarea' },
    {
      name: 'physicalProducts',
      type: 'array',
      labels: { singular: 'Physical product', plural: 'Physical products' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        {
          name: 'billingType',
          type: 'select',
          defaultValue: 'preorder',
          options: [
            { label: 'Pre-order (one-time)', value: 'preorder' },
            { label: 'One-time purchase', value: 'one-time' },
          ],
        },
        { name: 'description', type: 'textarea' },
        { name: 'includedItems', type: 'array', fields: [{ name: 'text', type: 'text', required: true }] },
        { name: 'badge', type: 'text' },
        { name: 'featured', type: 'checkbox' },
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Uncheck to keep an offer configured but hidden from the page.' },
        },
        { name: 'cta', type: 'group', fields: ctaFields },
      ],
    },
    { name: 'footnote', type: 'textarea' },
  ],
}

export const NewsletterBlock: Block = {
  slug: 'newsletterBlock',
  interfaceName: 'NewsletterBlock',
  labels: { singular: 'Newsletter', plural: 'Newsletter Blocks' },
  fields: [
    ...headingFields,
    { name: 'cta', type: 'group', fields: ctaFields },
    { name: 'secondaryCta', type: 'group', fields: ctaFields },
    { name: 'formNote', type: 'textarea' },
  ],
}

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ', plural: 'FAQ Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}

export const CtaBlock: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CtaBlock',
  labels: { singular: 'CTA', plural: 'CTA Blocks' },
  fields: [
    ...headingFields,
    { name: 'cta', type: 'group', fields: ctaFields },
    { name: 'secondaryCta', type: 'group', fields: ctaFields },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'company', type: 'text' },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export const timeBiteBlocks = [
  HeroBlock,
  QuoteBlock,
  TimelineBlock,
  AboutBlock,
  FrameworkSectionBlock,
  FeatureGridBlock,
  ShowcaseBlock,
  PlatformCardsBlock,
  RoadmapBlock,
  PricingBlock,
  NewsletterBlock,
  FAQBlock,
  CtaBlock,
  TestimonialsBlock,
]
