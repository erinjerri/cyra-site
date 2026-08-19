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

export const WorkspaceBlock: Block = {
  slug: 'workspaceBlock',
  interfaceName: 'WorkspaceBlock',
  labels: { singular: 'Workspace', plural: 'Workspace Blocks' },
  fields: [
    ...headingFields,
    { name: 'items', type: 'array', minRows: 1, fields: itemFields },
  ],
}

export const AgentsBlock: Block = {
  slug: 'agentsBlock',
  interfaceName: 'AgentsBlock',
  labels: { singular: 'Agents', plural: 'Agents Blocks' },
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
          defaultValue: 'available',
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
          name: 'video',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'videoUrl',
          type: 'text',
          admin: { description: 'Optional public video URL used when no upload is set.' },
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
  WorkspaceBlock,
  AgentsBlock,
  ShowcaseBlock,
  PlatformCardsBlock,
  RoadmapBlock,
  NewsletterBlock,
  FAQBlock,
  CtaBlock,
  TestimonialsBlock,
]
