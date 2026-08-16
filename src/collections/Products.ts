import type { CollectionConfig } from 'payload'

import { ctaFields } from '@/blocks/TimeBite/shared'

/**
 * Physical products — planners, pads, notes, desk tools.
 *
 * A collection rather than an array inside the homepage, because these are
 * real things with their own lifecycle: a planner moves concept → sample →
 * preorder → available → sold out on its own schedule, and the same product
 * will appear on the homepage, in a future shop page, and in a launch email.
 * Editing that in one place beats editing it in three.
 *
 * This is deliberately NOT ecommerce. There is no cart, no inventory, no
 * checkout — `cta` is a link, so pointing it at a real store later is a
 * content change rather than a rebuild.
 */
export const Products: CollectionConfig = {
  slug: 'products',
  labels: { singular: 'Physical product', plural: 'Physical products' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'productType', 'status', 'sortOrder', 'featured'],
    description:
      'Planners, pads and stationery. Shown on the homepage by the "Physical Product Grid" block.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product name',
      admin: { description: 'e.g. Planner, Task & Time, Goal Notes.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Lowercase, hyphenated, unique. Used for future product pages and links, e.g. task-and-time.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Short description',
      admin: { description: 'One or two sentences. This is what appears on the card.' },
    },
    {
      name: 'productType',
      type: 'select',
      label: 'Product type',
      defaultValue: 'planner',
      options: [
        { label: 'Planner', value: 'planner' },
        { label: 'Task & time pad', value: 'pad' },
        { label: 'Goal notes', value: 'notes' },
        { label: 'Tools & accessories', value: 'tools' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'variantNote',
      type: 'text',
      label: 'Variants',
      admin: { description: 'Optional line under the name, e.g. "Quarterly · Annual · Undated".' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'concept',
      admin: {
        description:
          'Concept = an idea we are showing. Sample = physically prototyped. Preorder = taking orders. Available = shipping. Sold out = none left. Nothing may say "available" until it actually ships.',
      },
      options: [
        { label: 'Concept', value: 'concept' },
        { label: 'Sample', value: 'sample' },
        { label: 'Preorder', value: 'preorder' },
        { label: 'Available', value: 'available' },
        { label: 'Sold out', value: 'sold-out' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product images',
      labels: { singular: 'Image', plural: 'Images' },
      admin: {
        description:
          'Uploaded through Media, so they go to Cloudflare R2 when R2 is enabled. The first image is the one shown on the card.',
      },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text', admin: { description: 'Overrides the alt text set on the Media item.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          admin: {
            width: '50%',
            description: 'Number only, no currency symbol, e.g. 35.55. Leave blank while pricing is undecided.',
          },
        },
        {
          name: 'compareAtPrice',
          type: 'text',
          label: 'Compare-at price',
          admin: {
            width: '50%',
            description: 'Optional. Shown struck through beside the price.',
          },
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Button',
      fields: ctaFields,
      admin: { description: 'Leave the label blank to render the card without a button.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sortOrder',
          type: 'number',
          label: 'Sort order',
          defaultValue: 0,
          admin: { width: '50%', description: 'Lower numbers appear first.' },
        },
        {
          name: 'featured',
          type: 'checkbox',
          label: 'Featured',
          defaultValue: false,
          admin: { width: '50%', description: 'Gives the card the highlighted treatment.' },
        },
      ],
    },
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Show on the site',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to keep a product configured but hidden, without deleting it.',
      },
    },
  ],
  timestamps: true,
}
