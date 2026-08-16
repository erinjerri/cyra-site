import type { Block } from 'payload'

import { ctaFields, headingFields, itemFields, itemTextFields, mediaFields, statusField } from './shared'

/**
 * The hero carries the product shot. A planning tool that shows no interface
 * asks a visitor to take its word for what it is — so the macOS window sits
 * directly under the headline rather than several scrolls down.
 */
export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Hero Blocks' },
  fields: [
    ...headingFields,
    { name: 'cta', type: 'group', label: 'Primary button', fields: ctaFields },
    { name: 'secondaryCta', type: 'group', label: 'Secondary button', fields: ctaFields },
    {
      name: 'availabilityNote',
      type: 'text',
      label: 'Platform note',
      admin: {
        description:
          'One quiet line under the buttons, e.g. "Beta on macOS • iOS, watchOS and visionOS coming soon".',
      },
    },
    ...mediaFields,
    {
      name: 'phone',
      type: 'group',
      label: 'Phone in front of the Mac (optional)',
      admin: {
        description:
          'A second device standing in front of the desktop shot. Uncheck "Show" to render the Mac window alone — do that while the iPhone app is still unreleased rather than showing an invented screen.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show the phone',
          defaultValue: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Phone screenshot',
          admin: { description: 'Portrait, 1179×2556 (iPhone) or similar. App content only, no device frame.' },
        },
        { name: 'assetUrl', type: 'text', admin: { description: 'Optional public URL used when no upload is set.' } },
        { name: 'imageAlt', type: 'text', label: 'Alt text' },
        {
          name: 'sketch',
          type: 'select',
          defaultValue: 'list',
          label: 'Schematic while empty',
          options: [
            { label: 'Action list', value: 'list' },
            { label: 'Goal + milestones', value: 'goal' },
            { label: 'Habit grid', value: 'habits' },
            { label: 'Progress chart', value: 'chart' },
          ],
        },
      ],
    },
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

/**
 * App capabilities — goals, actions, time tracking, rings, summaries.
 *
 * An array on the block rather than its own collection: these items appear on
 * this page and nowhere else, and a collection would buy reuse nobody needs at
 * the cost of a second place to look. Promote it to a collection the day a
 * second page needs the same list.
 *
 * Display order is the array order — drag the rows in /admin.
 */
export const FeatureGridBlock: Block = {
  slug: 'featureGridBlock',
  interfaceName: 'FeatureGridBlock',
  labels: { singular: 'App Feature Grid', plural: 'App Feature Grids' },
  fields: [
    ...headingFields,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Feature', plural: 'Features' },
      admin: { description: 'Drag to reorder — the order here is the order on the page.' },
      fields: [
        // itemTextFields + mediaFields, never itemFields + mediaFields — the
        // two both define `image`, and Payload rejects duplicate field names.
        ...itemTextFields,
        statusField('Leave blank for a card with no badge. Anything unshipped must carry one.'),
        ...mediaFields,
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show this feature',
          defaultValue: true,
          admin: { description: 'Uncheck to hide without deleting.' },
        },
      ],
    },
  ],
}

/**
 * Physical products, pulled from the `products` collection.
 *
 * The block holds the section's copy and its CTA; the products themselves live
 * in their own collection so a planner's status can change without anyone
 * opening the homepage. Leaving `products` empty shows every enabled product
 * in sort order, which is the behaviour an editor expects by default.
 */
export const ProductGridBlock: Block = {
  slug: 'productGridBlock',
  interfaceName: 'ProductGridBlock',
  labels: { singular: 'Physical Product Grid', plural: 'Physical Product Grids' },
  fields: [
    ...headingFields,
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Products to show',
      admin: {
        description:
          'Leave empty to show every product marked "Show on the site", ordered by its sort order. Pick products here to show only those, in the order you choose.',
      },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Section button',
      fields: ctaFields,
    },
    {
      name: 'footnote',
      type: 'textarea',
      admin: { description: 'Small print under the grid, e.g. that nothing is charged yet.' },
    },
  ],
}

/**
 * The dual loop, presented as tabs.
 *
 * The two brands do different jobs, so one linear list could never carry both.
 * The tab shape is lifted from the macOS app, where the top-level navigation is
 * Now / Plan / Track / Dashboard on the TimeBite side and Discover on the
 * Creating Your Reality side — a visitor who later opens the app should
 * recognise the structure.
 */
export const DualLoopBlock: Block = {
  slug: 'dualLoopBlock',
  interfaceName: 'DualLoopBlock',
  labels: { singular: 'Dual Loop (tabbed)', plural: 'Dual Loop Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Tab', plural: 'Tabs' },
      admin: { description: 'One tab per brand. The first is selected by default.' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. TimeBite' } },
        {
          name: 'tagline',
          type: 'text',
          admin: { description: 'One line under the tab bar saying what this side does.' },
        },
        {
          name: 'accent',
          type: 'select',
          defaultValue: 'blue',
          admin: { description: 'Chip and rail colour for this tab.' },
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Teal', value: 'teal' },
            { label: 'Gold', value: 'gold' },
            { label: 'Green', value: 'green' },
            { label: 'Pink', value: 'pink' },
            { label: 'Lavender', value: 'lavender' },
          ],
        },
        {
          name: 'steps',
          type: 'array',
          minRows: 1,
          labels: { singular: 'Stage', plural: 'Stages' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'body', type: 'textarea' },
            statusField('Leave blank when the stage simply exists.'),
          ],
        },
      ],
    },
  ],
}

/**
 * The 45–60 second Screen Studio demo.
 *
 * Deliberately never autoplays: the section sits mid-page, and a video that
 * starts talking while someone is reading is the fastest way to lose them.
 * `poster` is required in practice — it is what the section looks like before
 * anyone presses play, and on slow connections it may be all they ever see.
 */
export const ProductDemoBlock: Block = {
  slug: 'productDemoBlock',
  interfaceName: 'ProductDemoBlock',
  labels: { singular: 'Product Demo', plural: 'Product Demo Blocks' },
  fields: [
    ...headingFields,
    ...mediaFields,
    {
      name: 'duration',
      type: 'text',
      admin: { description: 'Shown beside the caption, e.g. "52 seconds".' },
    },
    {
      name: 'transcript',
      type: 'textarea',
      admin: {
        description:
          'Plain-text walkthrough of what the video shows. Rendered in an expandable panel under the player — the accessible equivalent for anyone who cannot or would rather not watch.',
      },
    },
  ],
}

/**
 * The zoom-out: ACTION → DAY → WEEK → MONTH → GOAL → YEAR.
 *
 * This is the argument the rest of the page cannot make on its own — that the
 * thing you do at 2pm is connected to the thing you said you wanted in
 * January. Each level widens the visual rail, so the scale change is felt
 * before it is read.
 */
export const ScaleStoryBlock: Block = {
  slug: 'scaleStoryBlock',
  interfaceName: 'ScaleStoryBlock',
  labels: { singular: 'Scale Story', plural: 'Scale Story Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'levels',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      labels: { singular: 'Level', plural: 'Levels' },
      admin: { description: 'Ordered smallest to largest — one action, then a day, and out to a year.' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. ACTION, DAY, WEEK.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    { name: 'closingStatement', type: 'textarea' },
  ],
}

/**
 * Selectable workspace modules plus one advisory agent suggestion.
 *
 * The suggestion is the whole point of the section: it demonstrates the shape
 * of the relationship — the agent proposes, with a visible "Not now", and the
 * person decides. Anything that adds a widget without asking would be telling
 * the wrong story about the product.
 */
export const WorkspaceBlock: Block = {
  slug: 'workspaceBlock',
  interfaceName: 'WorkspaceBlock',
  labels: { singular: 'Adaptive Workspace', plural: 'Adaptive Workspace Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'modules',
      type: 'array',
      minRows: 2,
      labels: { singular: 'Module', plural: 'Modules' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'description', type: 'text' },
        {
          name: 'kind',
          type: 'select',
          required: true,
          defaultValue: 'component',
          label: 'Module type',
          admin: {
            description:
              'Components are TimeBite surfaces — Today, Actions, Calendar. Goal areas are Creating Your Reality life domains — Career, Fitness, Finance. They are grouped separately because they are different things: one is a view, the other is a part of your life.',
          },
          options: [
            { label: 'Component (a TimeBite surface)', value: 'component' },
            { label: 'Goal area (a CYR life domain)', value: 'goal-area' },
          ],
        },
        {
          name: 'sketch',
          type: 'select',
          defaultValue: 'list',
          options: [
            { label: 'Action list', value: 'list' },
            { label: 'Goal + milestones', value: 'goal' },
            { label: 'Eisenhower matrix', value: 'matrix' },
            { label: 'Kanban board', value: 'board' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Habit grid', value: 'habits' },
            { label: 'Progress chart', value: 'chart' },
            { label: 'Long-range timeline', value: 'timeline' },
          ],
        },
        statusField(),
        {
          name: 'defaultOn',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Starts switched on in the demo workspace.' },
        },
      ],
    },
    {
      name: 'suggestion',
      type: 'group',
      admin: { description: 'The sample agent suggestion. Leave the prompt blank to hide the card.' },
      fields: [
        { name: 'source', type: 'text', admin: { description: 'Which agent is speaking, e.g. "Goal Agent".' } },
        { name: 'prompt', type: 'textarea' },
        { name: 'moduleName', type: 'text', admin: { description: 'Name of the widget it offers to add.' } },
        {
          name: 'sketch',
          type: 'select',
          defaultValue: 'chart',
          options: [
            { label: 'Progress chart', value: 'chart' },
            { label: 'Long-range timeline', value: 'timeline' },
            { label: 'Goal + milestones', value: 'goal' },
            { label: 'Kanban board', value: 'board' },
          ],
        },
        { name: 'acceptLabel', type: 'text', defaultValue: 'Add' },
        { name: 'dismissLabel', type: 'text', defaultValue: 'Not now' },
        {
          name: 'dismissedNote',
          type: 'text',
          admin: { description: 'Shown after "Not now" — keep it unbothered.' },
        },
      ],
    },
    { name: 'footnote', type: 'textarea' },
  ],
}

/**
 * Domain agents, described by what they do for a person rather than by what
 * they are built from. No model names, no "autonomous", no "powered by".
 *
 * `disclaimer` exists for Finance: goal tracking, savings progress, budgeting
 * and education — never securities recommendations. That boundary is content
 * so it can be tightened without a deploy.
 */
export const AgentsBlock: Block = {
  slug: 'agentsBlock',
  interfaceName: 'AgentsBlock',
  labels: { singular: 'Agents', plural: 'Agents Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'agents',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        statusField(),
        {
          name: 'capabilities',
          type: 'array',
          labels: { singular: 'Capability', plural: 'Capabilities' },
          admin: { description: 'Outcomes, phrased as things it does for you.' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          name: 'disclaimer',
          type: 'textarea',
          admin: { description: 'Scope limit shown in the card, e.g. the Finance Agent boundary.' },
        },
      ],
    },
    {
      name: 'roadmapCta',
      type: 'group',
      label: 'Roadmap / changelog link',
      admin: {
        description:
          'Points at the public roadmap and changelog. Hidden until a URL is set, so it never renders a dead button. For reference, Sunsama runs theirs on Canny at roadmap.sunsama.com — that is the obvious option if you want feedback voting alongside a changelog.',
      },
      fields: ctaFields,
    },
    { name: 'footnote', type: 'textarea' },
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
        statusField(undefined, 'planned'),
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
 * The alternating step-by-step story — define a goal, break it down, organise
 * it, drop it into time, complete it, review, zoom out.
 *
 * Every row takes either a screenshot or a short silent clip, so a step whose
 * motion matters (dragging an action onto the calendar) can be a video while
 * its neighbours stay still images.
 */
export const ShowcaseBlock: Block = {
  slug: 'showcaseBlock',
  interfaceName: 'ShowcaseBlock',
  labels: { singular: 'Showcase', plural: 'Showcase Blocks' },
  fields: [
    ...headingFields,
    {
      name: 'numbered',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Number the rows — use when the rows are a sequence rather than a set.' },
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        statusField('Badge on the step. Leave blank when the step is simply shipped and obvious.'),
        ...mediaFields,
      ],
    },
  ],
}

/**
 * TimeBite subscription pricing.
 *
 * Digital only. Physical products used to live in this block too, which made
 * the planner look like half the offer and gave stationery two homes — this
 * one and, once a shop existed, another. They now live in the `products`
 * collection and render through `productGridBlock`, further down the page,
 * where they read as an extension of the app rather than a rival to it.
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
  labels: { singular: 'TimeBite Pricing', plural: 'TimeBite Pricing Blocks' },
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
        {
          name: 'features',
          type: 'array',
          fields: [
            { name: 'text', type: 'text', required: true },
            statusField('Tags an unshipped line so availability never has to be written into the text itself.'),
          ],
        },
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
  DualLoopBlock,
  ProductDemoBlock,
  ScaleStoryBlock,
  AboutBlock,
  FrameworkSectionBlock,
  FeatureGridBlock,
  ShowcaseBlock,
  WorkspaceBlock,
  AgentsBlock,
  PlatformCardsBlock,
  ProductGridBlock,
  RoadmapBlock,
  PricingBlock,
  NewsletterBlock,
  FAQBlock,
  CtaBlock,
  TestimonialsBlock,
]
