import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'TimeBite',
    },
    {
      name: 'organizationName',
      type: 'text',
      defaultValue: 'Creating Your Reality',
    },
    {
      name: 'siteTagline',
      type: 'text',
      defaultValue: 'a shared memory for the life you are building',
    },
    {
      name: 'brandDescription',
      type: 'textarea',
      defaultValue:
        'Creating Your Reality is the philosophy, design methodology, and ecosystem behind TimeBite.',
    },
    {
      name: 'productDescription',
      type: 'textarea',
      defaultValue:
        'TimeBite keeps your notes, calendar, goals, and reflections in one shared memory, so the things you care about stop slipping through the week.',
    },
    {
      name: 'openGraphDescription',
      type: 'textarea',
      defaultValue:
        'TimeBite keeps your notes, calendar, goals, and reflections in one shared memory, so the things you care about stop slipping through the week.',
    },
    {
      name: 'headerTag',
      type: 'text',
      defaultValue: 'by Creating Your Reality',
    },
    {
      name: 'footerBrandStatement',
      type: 'textarea',
      defaultValue: 'Creating Your Reality is the philosophy behind TimeBite, and everything we build next.',
    },
    {
      name: 'betaButtonLabel',
      type: 'text',
      defaultValue: 'Join Beta',
    },
    {
      name: 'substackButtonLabel',
      type: 'text',
      defaultValue: 'Join Substack',
    },
    {
      name: 'notFoundCtaLabel',
      type: 'text',
      defaultValue: 'Back to TimeBite',
    },
    {
      name: 'legalNote',
      type: 'text',
      defaultValue: `© ${new Date().getFullYear()} Creating Your Reality. All rights reserved.`,
    },
  ],
}
