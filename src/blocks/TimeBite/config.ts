import type { Block } from 'payload'

import { itemFields, sectionFields } from './shared'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Hero Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'secondaryCta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const AuthorityStripBlock: Block = {
  slug: 'authorityStripBlock',
  interfaceName: 'AuthorityStripBlock',
  labels: { singular: 'Authority Strip', plural: 'Authority Strips' },
  fields: [
    ...sectionFields,
    {
      name: 'items',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const ProblemAgitationBlock: Block = {
  slug: 'problemAgitationBlock',
  interfaceName: 'ProblemAgitationBlock',
  labels: { singular: 'Problem Agitation', plural: 'Problem Agitation Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'items',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const HowItWorksBlock: Block = {
  slug: 'howItWorksBlock',
  interfaceName: 'HowItWorksBlock',
  labels: { singular: 'How It Works', plural: 'How It Works Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'steps',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const FeatureTabsBlock: Block = {
  slug: 'featureTabsBlock',
  interfaceName: 'FeatureTabsBlock',
  labels: { singular: 'Feature Tabs', plural: 'Feature Tabs Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'tabs',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const ProductScreensBlock: Block = {
  slug: 'productScreensBlock',
  interfaceName: 'ProductScreensBlock',
  labels: { singular: 'Product Screens', plural: 'Product Screens Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'screens',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const AIArchitectureBlock: Block = {
  slug: 'aiArchitectureBlock',
  interfaceName: 'AIArchitectureBlock',
  labels: { singular: 'AI Architecture', plural: 'AI Architecture Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'items',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const BetaSignupBlock: Block = {
  slug: 'betaSignupBlock',
  interfaceName: 'BetaSignupBlock',
  labels: { singular: 'Beta Signup', plural: 'Beta Signup Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'formNote',
      type: 'textarea',
    },
  ],
}

export const FounderCredibilityBlock: Block = {
  slug: 'founderCredibilityBlock',
  interfaceName: 'FounderCredibilityBlock',
  labels: { singular: 'Founder Credibility', plural: 'Founder Credibility Blocks' },
  fields: [
    ...sectionFields,
    {
      name: 'items',
      type: 'array',
      fields: itemFields,
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ', plural: 'FAQ Blocks' },
  fields: [
    ...sectionFields,
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

export const timeBiteBlocks = [
  HeroBlock,
  AuthorityStripBlock,
  ProblemAgitationBlock,
  HowItWorksBlock,
  FeatureTabsBlock,
  ProductScreensBlock,
  AIArchitectureBlock,
  BetaSignupBlock,
  FounderCredibilityBlock,
  FAQBlock,
]
