import {
  BUNDLE_ANNUAL_PRICE,
  BUNDLE_SAVING,
  BUNDLE_SEPARATE_PRICE,
  PLANNER_RETAIL_PRICE,
  TIMEBITE_ANNUAL_PRICE,
  TIMEBITE_MONTHLY_PRICE,
  amount,
  money,
} from '@/utilities/catalog'

/**
 * /shop — the storefront landing page.
 *
 * House rules, on top of the ones in timebite-home.ts:
 *  - TimeBite is the product that launches. The planner accompanies it. The
 *    order of the featured panels is that hierarchy, and it is not a detail
 *    someone should reorder without deciding to.
 *  - The planner is a CONCEPT. Nothing on this page may imply it can be
 *    bought, preordered or shipped, and the interest form says "list", never
 *    "preorder", until a real preorder exists.
 *  - Every price is interpolated from utilities/catalog.ts. Typing "$6.58" or
 *    "34%" here would be writing down a number that stops being true the day
 *    the price above it changes.
 */
export const shopPage = {
  title: 'Shop',
  slug: 'shop',
  _status: 'published',
  meta: {
    title: 'Shop | TimeBite and the Creating Your Reality Planner',
    description:
      'TimeBite is a planning and time app for macOS. The Creating Your Reality planner is the paper companion to it. See both, and how they work as one system.',
  },
  layout: [
    {
      blockType: 'announcementBlock',
      enabled: true,
      accent: 'teal',
      message: 'TimeBite launches first. The Creating Your Reality planner follows.',
      cta: { label: 'What that means', url: '#featured', analyticsId: 'announcement-launch-order' },
    },
    {
      blockType: 'storefrontHeroBlock',
      eyebrow: 'TimeBite + Creating Your Reality',
      headline: 'Your time, made visible.',
      body: 'TimeBite turns intention into scheduled, measurable action on your Mac. The Creating Your Reality planner gives you somewhere to step back from the screen, see the whole year at once, and decide what the next quarter is actually for.',
      cta: { label: 'Explore TimeBite', url: '/pricing', analyticsId: 'timebite-start-free' },
      secondaryCta: { label: 'Preview the planner', url: '/shop/planner', analyticsId: 'planner-preview' },
      availabilityNote:
        'TimeBite is in private beta on macOS. The planner is a concept — designed, not yet printed, and not for sale.',
      sketch: 'calendar',
      mediaFrame: 'mac',
      imageAlt:
        'TimeBite on macOS: the week planned into calendar blocks, with a goal and its actions alongside.',
      cover: 'black-gold',
      coverAlt:
        'Concept cover for the Creating Your Reality annual planner: black, with the wordmark in metallic gold.',
    },
    {
      blockType: 'featuredProductsBlock',
      eyebrow: 'Two products',
      headline: 'One digital. One on paper.',
      body: 'They do different jobs on purpose. The app is where a plan meets an hour; the book is where you decide whether the hours were worth spending.',
      items: [
        {
          eyebrow: 'Digital planning + execution',
          title: 'TimeBite',
          kind: 'software',
          status: 'beta',
          accent: 'blue',
          body: 'Goals into milestones into actions, dropped onto the calendar as real blocks of time — then measured against what actually happened.',
          priceNote: `Free to start · Premium ${money(TIMEBITE_MONTHLY_PRICE)}/month or ${money(TIMEBITE_ANNUAL_PRICE)}/year`,
          highlights: [
            { label: 'Plan the week into calendar time' },
            { label: 'Track what happened, daily to annually' },
            { label: 'Activity rings across eight life areas' },
            { label: 'macOS today, more devices in development' },
          ],
          media: 'app',
          sketch: 'calendar',
          imageAlt: 'Schematic of the TimeBite week: actions blocked into specific hours.',
          cta: { label: 'See pricing', url: '/pricing', analyticsId: 'timebite-view-pricing' },
        },
        {
          eyebrow: 'Analog vision + reflection',
          title: 'Creating Your Reality Planner',
          kind: 'physical',
          productStatus: 'concept',
          accent: 'pink',
          body: 'A year you can hold. Vision, quarters, months and weeks — with room to write down what you learned.',
          priceNote: `${money(PLANNER_RETAIL_PRICE)} target retail · Founding preorder price to be announced`,
          highlights: [
            { label: 'Annual, quarterly, monthly, weekly' },
            { label: 'Eight life areas and their rings' },
            { label: 'Quarterly journalling and review' },
          ],
          media: 'cover',
          cover: 'black-gold',
          coverAlt:
            'Concept cover for the Creating Your Reality annual planner: black, with the wordmark in metallic gold.',
          cta: { label: 'Preview the planner', url: '/shop/planner', analyticsId: 'planner-preview-card' },
        },
      ],
      together: {
        label: 'Together',
        headline: 'One system, in two materials.',
        body: 'What you decide on paper becomes what you schedule on the Mac, and what the Mac records is what you have to reflect on next quarter. Neither half is a copy of the other.',
        cta: { label: 'How the two connect', url: '#system', analyticsId: 'system-explainer' },
      },
    },
    {
      blockType: 'systemSplitBlock',
      eyebrow: 'The system',
      headline: 'Digital for execution. Physical for perspective.',
      body: 'A screen is very good at the next hour and very bad at the next year. Paper is the reverse. Using both is not redundancy — it is putting each question where it can actually be answered.',
      columns: [
        {
          label: 'TimeBite',
          tagline: 'Digital, for execution.',
          accent: 'blue',
          items: [
            { text: 'Daily intent — what this hour is for', status: 'available' },
            { text: 'Calendar planning and time blocking', status: 'available' },
            { text: 'Focus sessions and timers', status: 'available' },
            { text: 'Digital activity and time rings', status: 'available' },
            { text: 'Planned against actual, per goal', status: 'in-development' },
            { text: 'The same plan across your devices', status: 'in-development' },
          ],
        },
        {
          label: 'CYR Planner',
          tagline: 'Physical, for perspective.',
          accent: 'pink',
          items: [
            { text: 'Annual vision and the year at a glance' },
            { text: 'Quarterly direction, set once a quarter' },
            { text: 'Monthly goals with room to be wrong' },
            { text: 'Weekly prioritisation by hand' },
            { text: 'Eight life areas, drawn as rings' },
            { text: 'Written reflection and quarterly review' },
          ],
        },
      ],
      center: {
        label: 'One system',
        body: 'The same eight life areas, the same goals, read at two different distances.',
      },
      flow: 'Vision → GROW → Systems → Priorities → TimeBites → Reflection',
    },
    {
      blockType: 'bundleBlock',
      eyebrow: 'Bundle',
      headline: 'Both halves, once a year.',
      name: 'TimeBite + CYR Annual',
      badge: 'Bundle',
      price: amount(BUNDLE_ANNUAL_PRICE),
      cadence: 'per year',
      separatePrice: amount(BUNDLE_SEPARATE_PRICE),
      savingsNote: `Save ${money(BUNDLE_SAVING)}`,
      includes: [
        {
          text: 'TimeBite Premium for one year',
          note: `Everything in Premium, billed annually at ${money(TIMEBITE_ANNUAL_PRICE)} on its own.`,
        },
        {
          text: 'One annual Creating Your Reality planner',
          note: `Target retail ${money(PLANNER_RETAIL_PRICE)}. Concept — not yet printed.`,
        },
        {
          text: 'The connected digital and physical system',
          note: 'The same life areas and goals in both places, read at two distances.',
        },
      ],
      availabilityNote:
        'Conceptual pricing. The planner half of this bundle is still a concept, so the bundle cannot be bought and no date is being promised — it opens when planner preorders do.',
      cta: { label: 'Get updates on the bundle', url: '#planner-interest', analyticsId: 'bundle-annual' },
      footnote: `${money(BUNDLE_SEPARATE_PRICE)} is what the two cost bought separately — an annual subscription at ${money(TIMEBITE_ANNUAL_PRICE)} plus the planner at its ${money(PLANNER_RETAIL_PRICE)} target retail. It is not an inflated comparison price.`,
    },
    {
      // The wider stationery range, pulled from the `products` collection so a
      // product's lifecycle lives in exactly one place. Leaving `products`
      // unset shows every item marked "Show on the site".
      blockType: 'productGridBlock',
      eyebrow: 'Also from CYR',
      headline: 'The rest of the desk.',
      body: 'Pads, notes and tools designed around the same system. All concepts today — designed, not yet printed.',
      footnote:
        'Nothing on this row is for sale and nothing is charged. The planner list hears first when any of it moves.',
    },
    {
      blockType: 'plannerInterestBlock',
      eyebrow: 'Planner list',
      headline: 'Hear first when the planner is real.',
      body: 'One list for the planner and the bundle. We will write when there is something to say — a printed sample, a confirmed price, an open preorder — and not before.',
      interestLabel: 'I am interested in',
      interestOptions: [
        { label: 'Planner only', value: 'planner-only' },
        { label: 'TimeBite + Planner', value: 'timebite-and-planner' },
        { label: 'Both — keep me updated', value: 'keep-me-updated' },
      ],
      coverLabel: 'Preferred cover (optional)',
      coverOptions: [
        { label: 'Black', value: 'black' },
        { label: 'Midnight / dark blue', value: 'midnight' },
        { label: 'No preference', value: 'no-preference' },
      ],
      submitLabel: 'Join the planner list',
      formNote:
        'No charge, no card, no obligation — this is a mailing list, not a preorder. Unsubscribe whenever you like.',
      cta: {
        label: 'Join the planner list',
        url: 'https://erinjerri.substack.com/',
        newTab: true,
        analyticsId: 'planner-interest',
      },
    },
    {
      blockType: 'faqBlock',
      eyebrow: 'Questions',
      headline: 'What you are actually buying.',
      items: [
        {
          question: 'Is TimeBite required to use the planner?',
          answer:
            'No. The planner is a complete book on its own — annual vision, quarterly direction, monthly goals, weekly priorities and reflection all work with nothing but a pen. TimeBite adds the execution half: the calendar, the timers and the record of where the hours went.',
        },
        {
          question: 'Can I use the planner without subscribing?',
          answer:
            'Yes. They are sold separately and neither requires the other. The bundle exists because most people who want one end up wanting both, not because either is crippled alone.',
        },
        {
          question: 'Does the planner replace daily planning in the app?',
          answer:
            'No, and it deliberately does not duplicate it. Daily planning belongs on the screen, where an action can be dragged onto Tuesday at 10 and timed. The book handles the horizons a screen is bad at: the year, the quarter, the month, and the writing you do afterwards.',
        },
        {
          question: 'Are the app and the planner bought separately?',
          answer:
            'That is not settled. A subscription and a printed book have different mechanics — one may run through the App Store, the other needs shipping and tax — so they may well end up as two transactions even inside the bundle. We will say plainly which it is before anything can be bought.',
        },
        {
          question: 'When will planner preorders open?',
          answer:
            'There is no date. The manufacturing cost, shipping and fulfilment timing are all still open, and putting a date on the page before those are settled would be making one up. The planner list is where that news goes first.',
        },
        {
          question: 'Where will the app be available?',
          answer:
            'macOS today, in the private beta. iPhone is in development; iPad and Apple Watch are planned after it; Vision Pro is being explored. The platform section on the homepage carries the current status of each.',
        },
      ],
    },
    {
      blockType: 'ctaBlock',
      headline: 'Start with the app. The book is coming.',
      body: 'TimeBite is the part that exists today. Join the beta and use it, and put your name down for the planner while it is still being drawn.',
      cta: {
        label: 'Join the TimeBite Beta',
        url: 'https://erinjerri.substack.com/',
        newTab: true,
        analyticsId: 'timebite-start-free',
      },
      secondaryCta: { label: 'See pricing', url: '/pricing', analyticsId: 'view-pricing-footer' },
    },
  ],
}
