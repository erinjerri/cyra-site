import { PLANNER_RETAIL_PRICE, TIMEBITE_ANNUAL_PRICE, money } from '@/utilities/catalog'

/**
 * /shop/planner — the planner's own page.
 *
 * The slug is the full path, so the sitemap and the SEO plugin's canonical URL
 * both come out right with no special case. See app/(frontend)/shop/[slug].
 *
 * A function rather than a constant because the campaign block relates to the
 * `products` collection, and a relationship needs the document's id — which
 * only exists after the products have been seeded. The seeder resolves the
 * planner by slug and passes it in; with nothing passed, the page still
 * renders and simply falls back to its own status of "concept".
 *
 * Every specification is either known or explicitly marked as not decided.
 * There is no page count, no paper weight and no dimension here that somebody
 * invented to make the table look complete — a spec on a product page is a
 * promise to a printer as much as to a customer.
 */
export const plannerPage = (plannerProductId?: string) => ({
  title: 'Creating Your Reality Planner',
  slug: 'shop/planner',
  _status: 'published',
  meta: {
    title: 'Creating Your Reality Planner | Annual planning on paper',
    description:
      'A concept for an annual planner built around vision, quarterly direction, monthly goals, weekly priorities and reflection across eight life areas. Companion to the TimeBite app.',
  },
  layout: [
    {
      blockType: 'plannerCampaignBlock',
      eyebrow: 'Creating Your Reality',
      headline: 'Creating Your Reality Planner',
      ...(plannerProductId ? { product: plannerProductId } : {}),
      canonical: true,
      tagline: 'Step back from the screen. See the shape of your year.',
      description:
        'A screen shows you today. It is very bad at showing you a year. This is the other half of the system: one book for the horizons that need a whole spread and a pen — the year you are trying to have, the quarter in front of you, and an honest look afterwards at what the months actually contained.',
      priceNote: money(PLANNER_RETAIL_PRICE),
      preorderNote: 'Price to be announced',
      covers: [
        {
          label: 'Concept A — Black',
          note: 'Black cover, wordmark in metallic gold.',
          cover: 'black-gold',
          coverAlt:
            'Concept cover A: a black planner with the Creating Your Reality wordmark in metallic gold.',
        },
        {
          label: 'Concept B — Midnight',
          note: 'Midnight blue cover, wordmark in metallic silver.',
          cover: 'midnight-silver',
          coverAlt:
            'Concept cover B: a midnight blue planner with the Creating Your Reality wordmark in metallic silver.',
        },
      ],
      designedAround: [
        {
          label: 'Annual vision',
          body: 'One spread for the year: what you are trying to build, across the eight areas a life is actually made of.',
        },
        {
          label: 'Quarterly GROW',
          body: 'Four panels a quarter — the goal, where you honestly are, the options you have, and what you will do about it.',
        },
        {
          label: 'Monthly goals',
          body: 'A month grid beside the handful of outcomes that month is for. Enough room to be wrong and revise.',
        },
        {
          label: 'Weekly priorities',
          body: 'Seven columns and the bites that belong in them, prioritised by urgency and importance before anything reaches a calendar.',
        },
        {
          label: 'Identity and systems',
          body: 'The recurring actions underneath a goal, and the person those actions add up to — written down, and measured by whether they happened.',
        },
        {
          label: 'Ikigai and purpose',
          body: 'Prompts for the question that sits under every goal: what this is for, and whether it is still true.',
        },
        {
          label: 'Eight-area rings',
          body: 'The same rings TimeBite draws, filled in by hand. Doing it yourself is the part that makes you look.',
        },
        {
          label: 'Quarterly journal and review',
          body: 'Written reflection at the end of each quarter, where the year stops being a plan and becomes something you learned.',
        },
      ],
      spreads: [
        {
          title: 'Annual vision and life areas',
          body: 'The year on the left, the eight areas on the right.',
          spread: 'annual-vision',
        },
        {
          title: 'Quarterly GROW',
          body: 'Four panels running across the gutter, one per stage.',
          spread: 'quarterly-grow',
        },
        {
          title: 'Monthly planning',
          body: 'A month grid beside that month’s goals.',
          spread: 'monthly',
        },
        {
          title: 'Weekly TimeBite spread',
          body: 'Seven day columns and the bites that fill them.',
          spread: 'weekly',
        },
        {
          title: 'Eight-area activity rings',
          body: 'Rings to fill in by hand, and space to say why.',
          spread: 'rings',
        },
        {
          title: 'Quarterly journal and review',
          body: 'Ruled pages and one prompt, at the end of each quarter.',
          spread: 'journal',
        },
      ],
      details: [
        { title: 'Cover and foil', body: 'Stock, finish and foil colour still being sampled.' },
        { title: 'Binding', body: 'Binding style not yet chosen — it depends on how flat the book needs to lie.' },
        { title: 'Paper and print', body: 'Weight and ink to be confirmed with the printer.' },
      ],
      specs: [
        { label: 'Format', value: 'Annual — one book for a full year' },
        { label: 'Cover concepts', value: 'Black with gold, or midnight blue with silver' },
        { label: 'Dimensions', value: 'To be confirmed' },
        { label: 'Page count', value: 'To be confirmed' },
        { label: 'Paper', value: 'To be confirmed' },
        { label: 'Binding', value: 'To be confirmed' },
        { label: 'Manufacturing', value: 'Not yet in production' },
        { label: 'Target retail', value: money(PLANNER_RETAIL_PRICE) },
        { label: 'Founding preorder', value: 'Price to be announced' },
      ],
      cta: { label: 'Join the planner list', url: '#planner-interest', analyticsId: 'planner-interest' },
      secondaryCta: { label: 'See the bundle', url: '/pricing#bundle', analyticsId: 'bundle-annual' },
      footnote:
        'Everything on this page is a concept. The book has not been printed, no preorder is open, nothing is charged, and every image here is a drawing rather than a photograph of a manufactured object.',
    },
    {
      blockType: 'methodologyBlock',
      eyebrow: 'The method',
      headline: 'Why this is not an agenda.',
      body: 'A dated agenda tells you what day it is. This is built around a sequence — direction, goals, systems, priorities, execution, feedback — and every spread in the book belongs to one stage of it.',
      stages: [
        {
          label: 'Direction',
          title: 'Ikigai, vision, eight life areas',
          body: 'Before any goal, the question of what this is for. Purpose prompts and a vision for each of the eight areas a life is actually lived across.',
        },
        {
          label: 'Goals',
          title: 'GROW',
          body: 'A direction becomes a goal by surviving four questions: what you want, where you honestly are, what your options are, and what you will do this quarter.',
        },
        {
          label: 'Systems',
          title: 'Identity and recurring action',
          body: 'Goals are reached by the things you repeat, so the book asks for the actions and the person they add up to — then asks you to record whether they happened.',
        },
        {
          label: 'Priorities',
          title: 'Urgency and importance',
          body: 'A week has more candidates than hours. Sorting them by urgency against importance is what stops the loud work eating the important work.',
        },
        {
          label: 'Execution',
          title: 'TimeBite',
          body: 'The one stage that belongs on a screen. An action with no hour attached is a wish, and the app is where it gets one.',
        },
        {
          label: 'Feedback',
          title: 'Rings and reflection',
          body: 'Eight rings filled in by hand and a quarter’s worth of writing. This is the stage most planners skip, and the only one that changes what you do next.',
        },
      ],
      closingStatement:
        'The ideas about identity and systems here are general ones, expressed in our own language and our own layouts. Nothing in this book reproduces anyone else’s worksheets or diagrams.',
    },
    {
      blockType: 'plannerInterestBlock',
      eyebrow: 'Planner list',
      headline: 'Get preorder updates.',
      body: 'Tell us which version interests you and we will write when there is something real to report — a printed sample, a confirmed price, an open preorder.',
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
        'A mailing list, not a preorder. No card, no charge, no obligation — and the cover preference is genuinely used to decide what gets printed.',
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
      headline: 'About the book.',
      items: [
        {
          question: 'Is the planner one book for a full year?',
          answer:
            'That is the intent — one annual book covering the year’s vision, four quarters, twelve months and the weeks between. Whether a full year fits in one volume at a sensible thickness is a question for the printer, and if it turns out to need two we will say so rather than quietly shipping half a year.',
        },
        {
          question: 'Is TimeBite required to use it?',
          answer:
            'No. Everything in the book works with a pen. TimeBite adds the execution half — the calendar, the timers and the automatic record of where the hours went.',
        },
        {
          question: 'Does it duplicate the app?',
          answer:
            'Deliberately not. The app owns the day and the hour; the book owns the year, the quarter and the reflection. The only thing they share is the eight life areas and the goals underneath them, which is what makes the two halves add up.',
        },
        {
          question: 'When will preorders open?',
          answer:
            'There is no date, and there will not be one until the manufacturing cost, shipping and fulfilment are settled. The list on this page is where that is announced first.',
        },
        {
          question: 'What will it cost?',
          answer: `The target retail price is ${money(PLANNER_RETAIL_PRICE)}. A founding preorder price is being considered but has not been decided, and we would rather leave it blank than print a number we have to walk back. The annual bundle with TimeBite is priced against the ${money(TIMEBITE_ANNUAL_PRICE)} subscription and that ${money(PLANNER_RETAIL_PRICE)} target.`,
        },
        {
          question: 'Are these the final covers?',
          answer:
            'No. Both are concepts, drawn rather than photographed, and the foil, stock and binding are all still being sampled. That is exactly why the cover preference question on this page is worth answering.',
        },
      ],
    },
  ],
})
