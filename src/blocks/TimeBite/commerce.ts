import type { Block, Field } from 'payload'

import { ctaFields, headingFields, statusField, statusOptions } from './shared'

/**
 * The commerce blocks — the storefront, the planner campaign, the bundle.
 *
 * A separate file from `config.ts` because these answer a different question.
 * `config.ts` blocks explain the product; these ones sell it, and they carry
 * the rules that go with selling: a price is a promise, availability is a
 * field rather than a sentence, and no component may contain a checkout URL.
 *
 * Prices seeded into these blocks are generated from `utilities/catalog.ts`,
 * so the derived figures (the monthly equivalent of the annual plan, the
 * bundle saving) cannot drift from the prices they are derived from. Editors
 * still override any of it in /admin — the CMS is the runtime source of truth.
 */

/** Six hues, no seventh. The same list every accent select in the repo uses. */
const accentField = (defaultValue: string, description?: string): Field => ({
  name: 'accent',
  type: 'select',
  defaultValue,
  admin: description ? { description } : {},
  options: [
    { label: 'Blue (TimeBite, software, pricing)', value: 'blue' },
    { label: 'Pink (physical CYR product)', value: 'pink' },
    { label: 'Gold (methodology, editorial)', value: 'gold' },
    { label: 'Teal (the connected system)', value: 'teal' },
    { label: 'Green (available, beta)', value: 'green' },
    { label: 'Lavender (CYR philosophy)', value: 'lavender' },
  ],
})

/**
 * Payload's `admin.condition` signature, named once so the helpers below can
 * take one without re-declaring the tuple at every call site.
 */
type FieldCondition = (data: Record<string, unknown>, siblingData: Record<string, unknown>) => boolean

/**
 * A status select that only appears when a sibling field says it applies.
 *
 * Built here rather than spread onto `statusField()` for the reason recorded
 * in shared.ts: spreading the returned `Field` widens it back to the whole
 * field union, and TypeScript then loses the discriminant that proves it is a
 * select, which fails the build against Payload's field types.
 */
const conditionalStatusField = (condition: FieldCondition, description: string): Field => ({
  name: 'status',
  type: 'select',
  label: 'Status',
  options: statusOptions,
  admin: {
    condition,
    description: `${description} Available now = shipped. Beta = usable, in the private beta. In development = being built. Planned = committed, not started. Exploring = we are looking at it and nothing more.`,
  },
})

/**
 * Which conceptual cover to draw when no photograph exists.
 *
 * The mockups are CSS and SVG, and they are obviously drawings — the same
 * decision as `LayoutSketch`. A photoreal render of a book nobody has printed
 * would be claiming a manufactured object exists.
 */
const coverConceptField = (condition?: FieldCondition): Field => ({
  name: 'cover',
  type: 'select',
  defaultValue: 'black-gold',
  label: 'Conceptual cover',
  admin: {
    description:
      'Drawn while no product photography exists. Clearly a concept drawing, never a fake render of a printed book.',
    ...(condition ? { condition } : {}),
  },
  options: [
    { label: 'Concept A — black, metallic gold', value: 'black-gold' },
    { label: 'Concept B — midnight blue, metallic silver', value: 'midnight-silver' },
  ],
})

const coverFields: Field[] = [
  coverConceptField(),
  {
    name: 'coverImage',
    type: 'upload',
    relationTo: 'media',
    label: 'Cover photograph',
    admin: { description: 'Replaces the concept drawing once real photography exists.' },
  },
  { name: 'coverAlt', type: 'text', label: 'Cover alt text' },
]

/** The interior-spread schematics — see components/TimeBite/SpreadSketch.tsx. */
const spreadOptions = [
  { label: 'Annual vision + eight life areas', value: 'annual-vision' },
  { label: 'Quarterly GROW', value: 'quarterly-grow' },
  { label: 'Monthly planning', value: 'monthly' },
  { label: 'Weekly TimeBite spread', value: 'weekly' },
  { label: 'Eight-area activity rings', value: 'rings' },
  { label: 'Quarterly journal + review', value: 'journal' },
  { label: 'Eisenhower priorities', value: 'priorities' },
  { label: 'Ikigai / purpose', value: 'ikigai' },
]

/* -------------------------------------------------------------------------
   1. Announcement strip
   ------------------------------------------------------------------------- */

/**
 * One restrained line above the page — launch sequencing, nothing more.
 *
 * No countdown, no scarcity, no "only 3 left". It states which product is
 * first and what comes next, and an editor can switch it off entirely.
 */
export const AnnouncementBlock: Block = {
  slug: 'announcementBlock',
  interfaceName: 'AnnouncementBlock',
  labels: { singular: 'Announcement strip', plural: 'Announcement strips' },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show the strip',
      admin: { description: 'Uncheck to hide without deleting the copy.' },
    },
    {
      name: 'message',
      type: 'text',
      required: true,
      admin: {
        description:
          'One short sentence, e.g. "TimeBite launches first. CYR Planner presale coming next." No urgency, no countdown.',
      },
    },
    accentField('teal', 'Fills the strip. Teal reads as the system rather than as either product.'),
    { name: 'cta', type: 'group', label: 'Inline link', fields: ctaFields },
  ],
}

/* -------------------------------------------------------------------------
   2. Storefront hero
   ------------------------------------------------------------------------- */

/**
 * The shop hero. Sells the system, not a feature list.
 *
 * Distinct from `heroBlock`: that one centres copy over a full-width Mac
 * window, which is right for a product page and wrong for a storefront. Here
 * the copy sits beside a two-object composition — the app and the book — so
 * the first thing a visitor understands is that there are two things and they
 * belong together.
 */
export const StorefrontHeroBlock: Block = {
  slug: 'storefrontHeroBlock',
  interfaceName: 'StorefrontHeroBlock',
  labels: { singular: 'Storefront hero', plural: 'Storefront heroes' },
  fields: [
    ...headingFields,
    { name: 'cta', type: 'group', label: 'Primary button', fields: ctaFields },
    { name: 'secondaryCta', type: 'group', label: 'Secondary button', fields: ctaFields },
    {
      name: 'availabilityNote',
      type: 'text',
      label: 'Availability note',
      admin: { description: 'One quiet line under the buttons. Say what is actually purchasable today.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'App screenshot',
      admin: { description: 'The macOS capture. Falls back to a schematic while empty.' },
    },
    { name: 'assetUrl', type: 'text', admin: { description: 'Optional public image URL used when no upload is set.' } },
    { name: 'imageAlt', type: 'text', label: 'Alt text' },
    {
      name: 'sketch',
      type: 'select',
      defaultValue: 'calendar',
      label: 'Schematic while empty',
      options: [
        { label: 'Calendar / time blocking', value: 'calendar' },
        { label: 'Workspace (sidebar + panels)', value: 'workspace' },
        { label: 'Goal + milestones', value: 'goal' },
        { label: 'Action list', value: 'list' },
      ],
    },
    ...coverFields,
  ],
}

/* -------------------------------------------------------------------------
   3. Featured product merchandising
   ------------------------------------------------------------------------- */

/**
 * The editorial two-product composition.
 *
 * Deliberately NOT an equal-card grid: the first item runs two thirds of the
 * shell and the second one third, so the page states a hierarchy rather than
 * leaving a visitor to guess which product is launching. The `together` band
 * underneath is what stops the two reading as alternatives.
 */
export const FeaturedProductsBlock: Block = {
  slug: 'featuredProductsBlock',
  interfaceName: 'FeaturedProductsBlock',
  labels: { singular: 'Featured products', plural: 'Featured product blocks' },
  fields: [
    ...headingFields,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Featured product', plural: 'Featured products' },
      admin: {
        description:
          'The first item gets the wide panel, the second the narrow one, and the pair alternates after that. Order is the hierarchy — put the product that is actually launching first.',
      },
      fields: [
        { name: 'eyebrow', type: 'text', admin: { description: 'e.g. Digital planning + execution.' } },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        {
          name: 'kind',
          type: 'select',
          required: true,
          defaultValue: 'software',
          label: 'What this is',
          admin: {
            description:
              'Software and physical products use different availability vocabularies, because "beta" means nothing about a printed book and "sold out" means nothing about an app.',
          },
          options: [
            { label: 'Software (TimeBite)', value: 'software' },
            { label: 'Physical product (CYR)', value: 'physical' },
          ],
        },
        conditionalStatusField(
          (_data, siblingData) => siblingData?.kind === 'software',
          'Software maturity.',
        ),
        {
          name: 'productStatus',
          type: 'select',
          label: 'Product lifecycle',
          defaultValue: 'concept',
          admin: {
            condition: (_data, siblingData) => siblingData?.kind === 'physical',
            description: 'Nothing may say "available" until it ships.',
          },
          options: [
            { label: 'Concept', value: 'concept' },
            { label: 'Sample', value: 'sample' },
            { label: 'Preorder', value: 'preorder' },
            { label: 'Available', value: 'available' },
            { label: 'Sold out', value: 'sold-out' },
          ],
        },
        accentField('blue'),
        {
          name: 'price',
          type: 'text',
          admin: {
            description:
              'Number only, no currency symbol, e.g. 9.99. Leave blank while pricing is undecided — a blank price renders the note below instead of a number.',
          },
        },
        {
          name: 'priceNote',
          type: 'text',
          admin: { description: 'e.g. "From $0 · Premium $9.99/month" or "Founding preorder price to be announced".' },
        },
        {
          name: 'highlights',
          type: 'array',
          labels: { singular: 'Highlight', plural: 'Highlights' },
          admin: { description: 'Three or four short lines. Not a feature list — the shape of the thing.' },
          fields: [{ name: 'label', type: 'text', required: true }],
        },
        {
          name: 'media',
          type: 'select',
          defaultValue: 'app',
          label: 'What to show',
          options: [
            { label: 'App screenshot / schematic', value: 'app' },
            { label: 'Planner cover', value: 'cover' },
            { label: 'Interior spread schematic', value: 'spread' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Replaces whichever placeholder is selected above.' },
        },
        { name: 'imageAlt', type: 'text' },
        {
          name: 'sketch',
          type: 'select',
          defaultValue: 'calendar',
          admin: { condition: (_data, siblingData) => siblingData?.media === 'app' },
          options: [
            { label: 'Calendar / time blocking', value: 'calendar' },
            { label: 'Workspace (sidebar + panels)', value: 'workspace' },
            { label: 'Goal + milestones', value: 'goal' },
            { label: 'Action list', value: 'list' },
            { label: 'Habit grid', value: 'habits' },
            { label: 'Progress chart', value: 'chart' },
          ],
        },
        coverConceptField((_data, siblingData) => siblingData?.media === 'cover'),
        {
          name: 'spread',
          type: 'select',
          defaultValue: 'annual-vision',
          admin: { condition: (_data, siblingData) => siblingData?.media === 'spread' },
          options: spreadOptions,
        },
        { name: 'cta', type: 'group', label: 'Button', fields: ctaFields },
      ],
    },
    {
      name: 'together',
      type: 'group',
      label: 'Together band',
      admin: {
        description:
          'The line under the two products saying they are one system. Leave the headline blank to hide the band.',
      },
      fields: [
        { name: 'label', type: 'text', defaultValue: 'Together' },
        { name: 'headline', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'cta', type: 'group', fields: ctaFields },
      ],
    },
  ],
}

/* -------------------------------------------------------------------------
   4. Planner campaign
   ------------------------------------------------------------------------- */

/**
 * The planner treated as a consumer-product launch rather than a merch row.
 *
 * Everything that would be photography on a finished PDP — cover, details,
 * interior spreads — is a slot backed by a schematic, so the page can be
 * evaluated as merchandising while the physical artwork is still being drawn.
 *
 * `product` optionally relates to the `products` collection so the lifecycle
 * status has one home. When it is set, the collection wins on availability.
 */
export const PlannerCampaignBlock: Block = {
  slug: 'plannerCampaignBlock',
  interfaceName: 'PlannerCampaignBlock',
  labels: { singular: 'Planner campaign', plural: 'Planner campaigns' },
  fields: [
    ...headingFields,
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      label: 'Linked product',
      admin: {
        description:
          'Optional. When set, the product record supplies the lifecycle status and price so they are not maintained twice.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'The editorial line under the title, e.g. "Step back from the screen."' },
    },
    { name: 'description', type: 'textarea', label: 'Editorial description' },
    {
      name: 'priceNote',
      type: 'text',
      admin: {
        description:
          'Target retail, phrased as a target. Do not put a preorder number here until one is decided — say it is to be announced instead.',
      },
    },
    {
      name: 'preorderNote',
      type: 'text',
      admin: { description: 'e.g. "Founding preorder price to be announced."' },
    },
    {
      name: 'covers',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Cover concept', plural: 'Cover concepts' },
      admin: { description: 'Conceptual colourways. Labelled as concepts on the page — these are not manufactured.' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. Concept A — Black.' } },
        { name: 'note', type: 'text', admin: { description: 'Material or finish note.' } },
        ...coverFields,
      ],
    },
    {
      name: 'designedAround',
      type: 'array',
      labels: { singular: 'Planning layer', plural: 'Planning layers' },
      admin: {
        description:
          'What the book is built around — annual, quarterly, monthly, weekly, GROW, priorities, reflection. Say how each one complements the app rather than duplicating it.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'specs',
      type: 'array',
      labels: { singular: 'Specification', plural: 'Specifications' },
      admin: {
        description:
          'Physical specifications. Everything still undecided should say so — "to be confirmed" is a real answer and an invented page count is not.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    {
      name: 'spreads',
      type: 'array',
      labels: { singular: 'Interior spread', plural: 'Interior spreads' },
      admin: { description: 'Schematic previews of the interior. Upload artwork to replace a schematic.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'spread', type: 'select', defaultValue: 'annual-vision', options: spreadOptions },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Spread photograph or artwork' },
        { name: 'imageAlt', type: 'text' },
      ],
    },
    {
      name: 'details',
      type: 'array',
      labels: { singular: 'Detail slot', plural: 'Detail slots' },
      admin: { description: 'Close-up detail imagery — binding, foil, paper. Empty slots render as marked placeholders.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageAlt', type: 'text' },
      ],
    },
    { name: 'cta', type: 'group', label: 'Primary button', fields: ctaFields },
    { name: 'secondaryCta', type: 'group', label: 'Secondary button', fields: ctaFields },
    { name: 'footnote', type: 'textarea' },
    {
      name: 'canonical',
      type: 'checkbox',
      defaultValue: false,
      label: 'This is the product’s canonical page',
      admin: {
        position: 'sidebar',
        description:
          'Emits Product structured data. Tick it on the product’s own page only — the same campaign shown on the shop landing page would otherwise publish a second, competing description of the same product. The offer inside it appears only once the linked product is actually on preorder or shipping.',
      },
    },
  ],
}

/* -------------------------------------------------------------------------
   5. App + planner system split
   ------------------------------------------------------------------------- */

/**
 * "Digital for execution. Physical for perspective."
 *
 * Two columns with a connective centre, plus the flow line underneath. The
 * flow is one text field rather than an array because it is a sentence, not a
 * list — splitting it into rows in /admin would invite someone to reorder the
 * arc into something that no longer describes the product.
 */
export const SystemSplitBlock: Block = {
  slug: 'systemSplitBlock',
  interfaceName: 'SystemSplitBlock',
  labels: { singular: 'App + planner system', plural: 'System split blocks' },
  fields: [
    ...headingFields,
    {
      name: 'columns',
      type: 'array',
      minRows: 2,
      maxRows: 2,
      labels: { singular: 'Side', plural: 'Sides' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. TIMEBITE.' } },
        { name: 'tagline', type: 'text', admin: { description: 'e.g. Digital, for execution.' } },
        accentField('blue'),
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          labels: { singular: 'Line', plural: 'Lines' },
          fields: [
            { name: 'text', type: 'text', required: true },
            statusField('Only for the software side. Leave blank on the paper side — a printed page has no build status.'),
          ],
        },
      ],
    },
    {
      name: 'center',
      type: 'group',
      label: 'Centre',
      fields: [
        { name: 'label', type: 'text', defaultValue: 'One system' },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'flow',
      type: 'text',
      label: 'Flow line',
      admin: {
        description:
          'Separated by →, e.g. "Vision → GROW → Systems → Priorities → TimeBites → Reflection". Leave blank to hide.',
      },
    },
  ],
}

/* -------------------------------------------------------------------------
   6. Bundle
   ------------------------------------------------------------------------- */

/**
 * The bundle, with the honest caveat attached.
 *
 * `availabilityNote` is not optional in practice: a bundle containing a book
 * that has not been printed must say so on the same screen as its price, or
 * the price reads as an offer to ship something.
 */
export const BundleBlock: Block = {
  slug: 'bundleBlock',
  interfaceName: 'BundleBlock',
  labels: { singular: 'Bundle', plural: 'Bundle blocks' },
  fields: [
    ...headingFields,
    { name: 'name', type: 'text', required: true, admin: { description: 'e.g. TimeBite + CYR Annual.' } },
    { name: 'badge', type: 'text', admin: { description: 'Small marker, e.g. "Bundle". Keep it quiet.' } },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          admin: { width: '33%', description: 'Number only, no currency symbol, e.g. 119.' },
        },
        {
          name: 'cadence',
          type: 'text',
          defaultValue: 'per year',
          admin: { width: '33%' },
        },
        {
          name: 'separatePrice',
          type: 'text',
          admin: { width: '34%', description: 'What the pieces cost bought separately, e.g. 128.' },
        },
      ],
    },
    {
      name: 'savingsNote',
      type: 'text',
      admin: { description: 'e.g. "Save $9". Stated once, quietly.' },
    },
    {
      name: 'includes',
      type: 'array',
      labels: { singular: 'Included', plural: 'Includes' },
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'note', type: 'text', admin: { description: 'Optional qualifier under the line.' } },
      ],
    },
    {
      name: 'availabilityNote',
      type: 'textarea',
      label: 'Availability note',
      admin: {
        description:
          'Required in spirit: say plainly that the planner half depends on the preorder lifecycle and is not shipping yet. Never imply immediate dispatch unless the product status is "available".',
      },
    },
    { name: 'cta', type: 'group', label: 'Button', fields: ctaFields },
    { name: 'footnote', type: 'textarea' },
  ],
}

/* -------------------------------------------------------------------------
   7. Methodology band
   ------------------------------------------------------------------------- */

/**
 * The CYR method, as an editorial band rather than a diagram.
 *
 * This is the section that separates the planner from a dated agenda, so it
 * carries the argument in words. General identity-based and systems-based
 * habit ideas are expressed in original CYR language — no third-party
 * worksheets, diagrams or wording are reproduced.
 */
export const MethodologyBlock: Block = {
  slug: 'methodologyBlock',
  interfaceName: 'MethodologyBlock',
  labels: { singular: 'Methodology band', plural: 'Methodology bands' },
  fields: [
    ...headingFields,
    {
      name: 'stages',
      type: 'array',
      minRows: 2,
      maxRows: 8,
      labels: { singular: 'Stage', plural: 'Stages' },
      admin: { description: 'Ordered. Numbered automatically — do not type numbers into the labels.' },
      fields: [
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. Direction.' } },
        { name: 'title', type: 'text', admin: { description: 'The method used at this stage, e.g. GROW.' } },
        { name: 'body', type: 'textarea' },
        /* No per-stage accent. Six stages in six colours is the confetti this
           palette exists to prevent — the section owns one hue (gold) and the
           stage number does the separating. See design.md §1. */
      ],
    },
    { name: 'closingStatement', type: 'textarea' },
  ],
}

/* -------------------------------------------------------------------------
   8. Plan comparison
   ------------------------------------------------------------------------- */

/**
 * A short, honest comparison, kept to two or three columns on purpose.
 *
 * A dense SaaS matrix would need horizontal scrolling on a phone, and a
 * commerce page that scrolls sideways has already lost. Every row value can
 * carry a status badge, so nothing in the table claims something ships when
 * the status system says it does not.
 */
export const PlanComparisonBlock: Block = {
  slug: 'planComparisonBlock',
  interfaceName: 'PlanComparisonBlock',
  labels: { singular: 'Plan comparison', plural: 'Plan comparisons' },
  fields: [
    ...headingFields,
    {
      name: 'columns',
      type: 'array',
      minRows: 2,
      maxRows: 3,
      labels: { singular: 'Column', plural: 'Columns' },
      admin: { description: 'Two is the readable maximum on a phone. Three is the hard limit.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'note', type: 'text', admin: { description: 'Small line under the heading, e.g. "$9.99/month".' } },
        { name: 'featured', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Row', plural: 'Rows' },
      admin: {
        description:
          'Only list capabilities that exist in the product or on the roadmap. Anything unshipped must carry a status on its value.',
      },
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'values',
          type: 'array',
          labels: { singular: 'Value', plural: 'Values' },
          admin: { description: 'One per column, in column order.' },
          fields: [
            {
              name: 'value',
              type: 'text',
              admin: { description: 'e.g. "Included", "—", "Up to 3". Leave blank for a dash.' },
            },
            statusField('Tags an unshipped capability so availability is never written into the value text.'),
          ],
        },
      ],
    },
    { name: 'footnote', type: 'textarea' },
  ],
}

/* -------------------------------------------------------------------------
   9. Planner interest capture
   ------------------------------------------------------------------------- */

/**
 * Interest capture, not a checkout.
 *
 * Same rule as `BetaSignup`: the form only renders when there is somewhere for
 * it to post. A form submitting to '#' looks like it worked and silently loses
 * the address — worse than no form. With no endpoint configured it falls back
 * to the CMS-managed link.
 *
 * `formAction` is a plain endpoint rather than a hard dependency on the form
 * builder, so pointing it at a Payload form-builder submission URL later is a
 * content change. Language stays at "join the list" until a real preorder
 * checkout exists — "preorder" implies a charge.
 */
export const PlannerInterestBlock: Block = {
  slug: 'plannerInterestBlock',
  interfaceName: 'PlannerInterestBlock',
  labels: { singular: 'Planner interest form', plural: 'Planner interest forms' },
  fields: [
    ...headingFields,
    {
      name: 'formAction',
      type: 'text',
      label: 'Form POST endpoint',
      admin: {
        description:
          'Where the form submits. A Payload form-builder submission URL, or any endpoint that accepts a POST. Leave blank to fall back to NEXT_PUBLIC_PLANNER_INTEREST_URL, and then to the button below — the form is never rendered with nowhere to post.',
      },
    },
    {
      name: 'interestLabel',
      type: 'text',
      defaultValue: 'I am interested in',
    },
    {
      name: 'interestOptions',
      type: 'array',
      labels: { singular: 'Option', plural: 'Options' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true, admin: { description: 'Submitted value, e.g. planner-only.' } },
      ],
    },
    {
      name: 'coverLabel',
      type: 'text',
      defaultValue: 'Preferred cover (optional)',
    },
    {
      name: 'coverOptions',
      type: 'array',
      labels: { singular: 'Option', plural: 'Options' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
      ],
    },
    { name: 'submitLabel', type: 'text', defaultValue: 'Join the planner list' },
    {
      name: 'formNote',
      type: 'textarea',
      admin: { description: 'What happens to the address, and what is not being charged.' },
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Fallback button',
      admin: { description: 'Shown instead of the form when no endpoint is configured.' },
      fields: ctaFields,
    },
  ],
}

export const commerceBlocks = [
  AnnouncementBlock,
  StorefrontHeroBlock,
  FeaturedProductsBlock,
  PlannerCampaignBlock,
  SystemSplitBlock,
  BundleBlock,
  MethodologyBlock,
  PlanComparisonBlock,
  PlannerInterestBlock,
]
