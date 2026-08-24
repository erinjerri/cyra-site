import {
  BUNDLE_ANNUAL_PRICE,
  BUNDLE_SAVING,
  BUNDLE_SEPARATE_PRICE,
  PLANNER_RETAIL_PRICE,
  TIMEBITE_ANNUAL_PRICE,
  TIMEBITE_FREE_PRICE,
  TIMEBITE_MONTHLY_PRICE,
  amount,
  annualMonthlyEquivalent,
  annualSavingsPercent,
  money,
} from '@/utilities/catalog'

/**
 * /pricing — TimeBite's subscription, laid out as three cards.
 *
 * The billing switch is off here on purpose. On the homepage one Premium card
 * with a monthly/annual toggle is the compact way to say it; on a page whose
 * whole job is the price, all three numbers should be visible at once with
 * nothing to click. See `billingToggle` in blocks/TimeBite/config.ts.
 *
 * Feature lines are taken from what the product actually has. Every line that
 * is not shipped carries a status, checked against the feature grid on the
 * homepage — this page must never be the place where something quietly
 * graduates from "in development" to a plain bullet point.
 */
export const pricingPage = {
  title: 'Pricing',
  slug: 'pricing',
  _status: 'published',
  meta: {
    title: 'TimeBite pricing | Free, monthly and annual',
    description: `TimeBite is free to start. Premium is ${money(TIMEBITE_MONTHLY_PRICE)} a month or ${money(TIMEBITE_ANNUAL_PRICE)} a year — about ${money(Number(annualMonthlyEquivalent()))} a month billed annually.`,
  },
  layout: [
    {
      blockType: 'announcementBlock',
      enabled: true,
      accent: 'teal',
      message: 'TimeBite launches first. The Creating Your Reality planner follows.',
      cta: { label: 'See both', url: '/shop', analyticsId: 'announcement-shop' },
    },
    {
      blockType: 'pricingBlock',
      eyebrow: 'Pricing',
      headline: 'Free to start. Premium when it earns it.',
      body: 'One product, three ways to pay for it. Nothing is charged during the private beta.',
      billingToggle: false,
      digitalEyebrow: 'TimeBite',
      annualBadge: 'Best value',
      digitalPlans: [
        {
          name: 'Free',
          monthlyPrice: amount(TIMEBITE_FREE_PRICE),
          description: 'Enough to plan a week properly and decide whether the loop suits you.',
          features: [
            { text: 'Now — today’s intent and focus sessions', status: 'available' },
            { text: 'Calendar planning and time blocking', status: 'available' },
            { text: 'Daily and weekly tracking', status: 'available' },
            { text: 'One device' },
          ],
          cta: {
            label: 'Start free',
            url: 'https://erinjerri.substack.com/',
            newTab: true,
            analyticsId: 'timebite-start-free',
          },
        },
        {
          name: 'Premium monthly',
          monthlyPrice: amount(TIMEBITE_MONTHLY_PRICE),
          description: 'The whole loop, month to month. Leave whenever you like.',
          features: [
            { text: 'Everything in Free' },
            { text: 'Discover, Ikigai and Boards', status: 'available' },
            { text: 'Timeline — goals laid across the months', status: 'available' },
            { text: 'Activity: intended time against actual', status: 'available' },
            { text: 'Monthly and annual tracking', status: 'available' },
            { text: 'Dashboard — planned against actual, per goal', status: 'in-development' },
            { text: 'Goals, Actions and Kanban', status: 'in-development' },
          ],
          cta: {
            label: 'Choose monthly',
            url: 'https://erinjerri.substack.com/',
            newTab: true,
            analyticsId: 'timebite-monthly',
          },
        },
        {
          name: 'Premium annual',
          annualPrice: amount(TIMEBITE_ANNUAL_PRICE),
          annualNote: `About ${money(Number(annualMonthlyEquivalent()))} a month, billed annually.`,
          annualSavings: `Save ~${annualSavingsPercent()}%`,
          featured: true,
          badge: 'Best value',
          description: 'The same Premium, paid once. The version most people who stay end up on.',
          features: [
            { text: 'Everything in Premium monthly' },
            { text: `${annualSavingsPercent()}% less than twelve monthly payments` },
            { text: 'Eligible for the planner bundle' },
            { text: 'Domain agents as they arrive', status: 'planned' },
          ],
          cta: {
            label: 'Choose annual',
            url: 'https://erinjerri.substack.com/',
            newTab: true,
            analyticsId: 'timebite-annual',
          },
        },
      ],
      betaPromotion: {
        enabled: true,
        label: 'Friends of TimeBite',
        body: 'Invite codes go to people in the private beta. Redemption will belong to whichever billing provider we choose — the code itself never appears on this site.',
        cta: { label: 'Have an invite code?', url: 'https://erinjerri.substack.com/', newTab: true, analyticsId: 'beta_code_click' },
      },
      platformNote: {
        text: 'One membership across every device we support, starting with the Mac.',
        cta: { label: 'See what runs where', url: '/#platforms' },
      },
      footnote:
        'Conceptual launch pricing. No billing is connected yet and nothing is charged during the private beta — these buttons put you on the list.',
    },
    {
      blockType: 'planComparisonBlock',
      eyebrow: 'Compare',
      headline: 'What changes when you upgrade.',
      body: 'Free and Premium, side by side. Anything still being built says so.',
      columns: [
        { label: 'Free', note: money(TIMEBITE_FREE_PRICE) },
        {
          label: 'Premium',
          note: `${money(TIMEBITE_MONTHLY_PRICE)}/mo · ${money(TIMEBITE_ANNUAL_PRICE)}/yr`,
          featured: true,
        },
      ],
      rows: [
        {
          label: 'Now — daily intent and focus sessions',
          values: [{ value: 'Included' }, { value: 'Included' }],
        },
        {
          label: 'Calendar planning and time blocking',
          values: [{ value: 'Included' }, { value: 'Included' }],
        },
        {
          label: 'Tracking',
          values: [{ value: 'Daily, weekly' }, { value: 'Daily to annual' }],
        },
        {
          label: 'Discover, Ikigai and Boards',
          values: [{ value: '—' }, { value: 'Included' }],
        },
        {
          label: 'Timeline across the months',
          values: [{ value: '—' }, { value: 'Included' }],
        },
        {
          label: 'Activity — intended time against actual',
          values: [{ value: '—' }, { value: 'Included' }],
        },
        {
          label: 'Dashboard — planned against actual',
          values: [{ value: '—' }, { value: 'Included', status: 'in-development' }],
        },
        {
          label: 'Goals, Actions and Kanban',
          values: [{ value: '—' }, { value: 'Included', status: 'in-development' }],
        },
        {
          label: 'Eisenhower matrix',
          values: [{ value: '—' }, { value: 'Included', status: 'planned' }],
        },
        {
          label: 'Devices',
          values: [{ value: 'One' }, { value: 'All your devices', status: 'in-development' }],
        },
        {
          label: 'Planner bundle eligibility',
          values: [{ value: '—' }, { value: 'Annual only' }],
        },
      ],
      footnote:
        'A line marked in development or planned is not available today and is not being sold as though it were. Those labels change the day the app does.',
    },
    {
      blockType: 'bundleBlock',
      eyebrow: 'Bundle',
      headline: 'Add the planner to an annual plan.',
      name: 'TimeBite + CYR Annual',
      badge: 'Bundle',
      price: amount(BUNDLE_ANNUAL_PRICE),
      cadence: 'per year',
      separatePrice: amount(BUNDLE_SEPARATE_PRICE),
      savingsNote: `Save ${money(BUNDLE_SAVING)}`,
      includes: [
        { text: 'TimeBite Premium for one year', note: `${money(TIMEBITE_ANNUAL_PRICE)} on its own.` },
        {
          text: 'One annual Creating Your Reality planner',
          note: `Target retail ${money(PLANNER_RETAIL_PRICE)}. Concept — not yet printed.`,
        },
        { text: 'The connected digital and physical system' },
      ],
      availabilityNote:
        'Conceptual pricing. The planner half is still a concept, so this bundle cannot be bought yet and no shipping date is implied.',
      cta: { label: 'Get updates on the bundle', url: '/shop#planner-interest', analyticsId: 'bundle-annual' },
      footnote: `${money(BUNDLE_SEPARATE_PRICE)} is the honest sum of the two — ${money(TIMEBITE_ANNUAL_PRICE)} plus ${money(PLANNER_RETAIL_PRICE)} — not an inflated comparison price.`,
    },
    {
      blockType: 'faqBlock',
      eyebrow: 'Billing',
      headline: 'How paying for this will work.',
      items: [
        {
          question: 'How does annual TimeBite billing work?',
          answer: `Annual is one payment of ${money(TIMEBITE_ANNUAL_PRICE)} covering twelve months — about ${money(Number(annualMonthlyEquivalent()))} a month, and roughly ${annualSavingsPercent()}% less than paying ${money(TIMEBITE_MONTHLY_PRICE)} twelve times. Renewal terms, proration and refunds will be set by whichever billing provider we choose, and will be stated here before anyone is charged.`,
        },
        {
          question: 'Can I switch between monthly and annual?',
          answer:
            'That depends on the billing provider, and one has not been chosen. Web subscriptions and App Store subscriptions handle plan changes quite differently, so we would rather leave this blank than describe a policy we have not built.',
        },
        {
          question: 'Am I charged anything today?',
          answer:
            'No. There is no checkout on this site. Every button here adds you to the beta or the planner list, and paid plans open to the beta list first.',
        },
        {
          question: 'Where will the app be available?',
          answer:
            'macOS today, in the private beta. iPhone is in development, iPad and Apple Watch are planned, and Vision Pro is being explored. The homepage carries the current status of each device.',
        },
        {
          question: 'Are app and planner purchases handled separately?',
          answer:
            'Probably, and possibly unavoidably. An app subscription may have to run through Apple’s in-app purchase rules while a printed book needs shipping, tax and a fulfilment partner. Whether the bundle is one transaction or two will be stated plainly before it can be bought.',
        },
        {
          question: 'Is the planner included in a subscription?',
          answer:
            'No. The subscription is software. The planner is a separate physical product, and the bundle is the only place the two are priced together.',
        },
      ],
    },
    {
      blockType: 'ctaBlock',
      headline: 'The beta is where this starts.',
      body: 'Nothing is charged yet. Join the beta, use the app, and tell us what the price should have been.',
      cta: {
        label: 'Join the TimeBite Beta',
        url: 'https://erinjerri.substack.com/',
        newTab: true,
        analyticsId: 'timebite-start-free',
      },
      secondaryCta: { label: 'See the planner', url: '/shop/planner', analyticsId: 'planner-preview-pricing' },
    },
  ],
}
