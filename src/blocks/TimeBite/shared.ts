import type { Field } from 'payload'

/**
 * Every button and link on the site.
 *
 * `newTab` and `analyticsId` live here rather than in the components because
 * the destination decides them: the beta CTA points at Substack and must open
 * in a new tab, and which CTA someone pressed is a marketing question, not a
 * rendering one. Presentation components read these — none of them know a URL.
 */
export const ctaFields: Field[] = [
  { name: 'label', type: 'text', label: 'Button label' },
  {
    name: 'url',
    type: 'text',
    label: 'Link URL',
    admin: {
      description:
        'Internal path (/philosophy), on-page anchor (#beta), or a full external URL (https://…).',
    },
  },
  {
    name: 'newTab',
    type: 'checkbox',
    label: 'Open in a new tab',
    defaultValue: false,
    admin: {
      description: 'Turn on for links that leave the site, such as Substack. Adds rel="noopener noreferrer".',
    },
  },
  {
    name: 'analyticsId',
    type: 'text',
    label: 'Analytics event name',
    admin: {
      description:
        'Optional. Rendered as data-analytics-event so this button can be tracked, e.g. join_beta_hero.',
    },
  },
]

export const headingFields: Field[] = [
  { name: 'eyebrow', type: 'text' },
  { name: 'headline', type: 'text', required: true },
  { name: 'body', type: 'textarea' },
]

export const sectionFields: Field[] = [
  ...headingFields,
  {
    name: 'cta',
    type: 'group',
    fields: ctaFields,
  },
]

/**
 * The four maturity labels, used everywhere something can be shipped or not:
 * feature cards, showcase steps, platforms, plan features, agents.
 *
 * One list, one vocabulary. Nothing on the site should invent a fifth state or
 * bake availability into free text — that is how a marketing page ends up
 * claiming something is shipped six months after it stopped being true.
 */
export const statusOptions = [
  { label: 'Available now', value: 'available' },
  { label: 'Beta', value: 'beta' },
  { label: 'In development', value: 'in-development' },
  { label: 'Planned', value: 'planned' },
  { label: 'Exploring', value: 'exploring' },
]

const STATUS_HELP =
  'Available now = shipped. Beta = usable, in the private beta. In development = being built. Planned = committed, not started. Exploring = we are looking at it and nothing more.'

/**
 * `defaultValue` is a parameter rather than something callers spread on
 * afterwards: `{ ...statusField(), defaultValue: 'planned' }` widens the return
 * back to the whole `Field` union and TypeScript stops being able to tell it is
 * a select, which fails the build against Payload's discriminated field type.
 */
export const statusField = (description?: string, defaultValue?: string): Field => ({
  name: 'status',
  type: 'select',
  label: 'Status',
  options: statusOptions,
  ...(defaultValue ? { defaultValue } : {}),
  admin: { description: description ? `${description} ${STATUS_HELP}` : STATUS_HELP },
})

/**
 * One media slot: a screenshot, optionally a video that uses the screenshot as
 * its poster frame, and the schematic to draw while neither exists yet.
 *
 * `sketch` is what keeps unshipped sections presentable. Rather than a stock
 * SaaS screenshot or an empty grey box, an empty slot renders an abstract
 * diagram of the layout that will eventually live there — obviously a drawing,
 * never mistakable for the product.
 */
export const mediaFields: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Screenshot. Also acts as the poster frame when a video is set.' },
  },
  {
    name: 'assetUrl',
    type: 'text',
    admin: { description: 'Optional public image URL used when no upload is set.' },
  },
  {
    name: 'imageAlt',
    type: 'text',
    admin: { description: 'Describe what the screen shows, for screen readers.' },
  },
  {
    name: 'video',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Optional MP4/WebM. Plays with visible controls — never autoplays.' },
  },
  {
    name: 'videoUrl',
    type: 'text',
    admin: { description: 'Optional public video URL used when no upload is set.' },
  },
  {
    name: 'mediaCaption',
    type: 'text',
    admin: { description: 'Short line under the media.' },
  },
  {
    name: 'mediaFrame',
    type: 'select',
    defaultValue: 'mac',
    options: [
      { label: 'macOS window', value: 'mac' },
      { label: 'Plain', value: 'plain' },
    ],
  },
  {
    name: 'sketch',
    type: 'select',
    defaultValue: 'workspace',
    admin: {
      description:
        'Schematic drawn while this slot has no screenshot yet. Pick the one that matches the screen being described.',
    },
    options: [
      { label: 'Workspace (sidebar + panels)', value: 'workspace' },
      { label: 'Goal + milestones', value: 'goal' },
      { label: 'Action list', value: 'list' },
      { label: 'Eisenhower matrix', value: 'matrix' },
      { label: 'Kanban board', value: 'board' },
      { label: 'Calendar / time blocking', value: 'calendar' },
      { label: 'Habit grid', value: 'habits' },
      { label: 'Progress chart', value: 'chart' },
      { label: 'Long-range timeline', value: 'timeline' },
    ],
  },
]

/**
 * The text half of a repeatable item.
 *
 * Split out from `itemFields` so a block can combine it with the richer
 * `mediaFields` instead. Spreading both `itemFields` and `mediaFields` into one
 * level defines `image` twice, and Payload rejects the whole config with
 * DuplicateFieldName rather than silently picking one.
 */
export const itemTextFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  { name: 'body', type: 'textarea' },
  { name: 'eyebrow', type: 'text' },
]

export const itemFields: Field[] = [
  ...itemTextFields,
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'assetUrl',
    type: 'text',
    admin: {
      description: 'Optional public Cloudflare R2 asset URL fallback.',
    },
  },
]

export const navLinkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'url', type: 'text', required: true },
]

export const footerLinkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  { name: 'url', type: 'text' },
  {
    name: 'comingSoon',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      description: 'Renders as a disabled label instead of a link when no page exists yet.',
    },
  },
]
