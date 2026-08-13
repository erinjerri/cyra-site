/**
 * Homepage copy — see the story direction doc for the alternatives behind each
 * headline and the reasoning. Every line here is the recommended pick, and all
 * of it is editable in /admin without touching code.
 *
 * House rules this copy follows:
 *  - No "personal operating system", "AI-powered", "productivity", "optimize".
 *  - AI is mentioned once, quietly, as plumbing — never as a headline noun.
 *  - Verbs are Capture / Connect / Reflect / Act / Grow.
 */
export const timeBiteHome = {
  title: 'TimeBite',
  slug: 'home',
  _status: 'published',
  layout: [
    {
      blockType: 'heroBlock',
      eyebrow: 'TimeBite',
      headline: 'Remember what you meant to do.',
      body: 'TimeBite keeps your notes, calendar, goals, and reflections in one shared memory —\nso the things you care about stop slipping through the week.',
      cta: { label: 'Join the beta', url: '#beta' },
      secondaryCta: { label: 'Read the philosophy', url: '/philosophy' },
    },
    {
      blockType: 'quoteBlock',
      eyebrow: 'Why TimeBite',
      statement:
        'Your notes live in one app. Your calendar in another. Your goals are in a notebook you have not opened since January.',
      emphasis: 'The problem was never discipline.',
    },
    {
      blockType: 'timelineBlock',
      eyebrow: 'How it works',
      headline: 'One loop, running quietly underneath your life.',
      steps: [
        { title: 'Capture', body: 'A thought, anywhere, in one gesture. Phone, watch, laptop — before it is gone.' },
        { title: 'Connect', body: 'It lands where it belongs: beside the goal it serves, the note it continues, the week it fits.' },
        { title: 'Reflect', body: 'See the week you actually lived, not the one you scheduled.' },
        { title: 'Act', body: 'The next honest step, on the calendar, at a time you will genuinely have.' },
        { title: 'Grow', body: 'Six months of this, and the picture that comes back is someone changing on purpose.' },
      ],
      // Falls back to the built-in time loop graphic. Upload a half-day rings
      // screenshot to this block's `image` field in /admin to replace it.
      imageAlt: 'TimeBite half-day rings, showing scheduled action time across a 12-hour window',
    },
    {
      blockType: 'aboutBlock',
      eyebrow: 'About the name',
      headline: 'Why we called it TimeBite.',
      body: 'Time is the one thing everyone says they want more of, and the one thing nobody can hold.',
      wordParts: [
        {
          part: 'Time',
          meaning:
            'Abstract, infinite, and impossible to grasp. You cannot put your hands on a year, or on the life you keep meaning to start.',
        },
        {
          part: 'Bite',
          meaning:
            'Small, specific, human-sized. Something you can actually take — today, in the hour in front of you.',
        },
      ],
      closingStatement:
        'TimeBite is the bridge between them: where the life you are imagining becomes an hour you can actually live. Philosophy on one side, Tuesday afternoon on the other, and tools grounded well enough to carry the weight between.',
    },
    {
      blockType: 'frameworkSectionBlock',
      eyebrow: 'Creating Your Reality',
      headline: 'A life is built the same way a memory is: one kept promise at a time.',
      body: 'Creating Your Reality starts with a different question. Not what do you need to do today, but what kind of life are you trying to build?',
      pillars: [{ label: 'Identity' }, { label: 'Purpose' }, { label: 'Intentional Living' }, { label: 'Long-term Growth' }],
      closingStatement: 'TimeBite is where those four ideas stop being a mood board and start being a Tuesday.',
      cta: { label: 'Read the philosophy', url: '/philosophy' },
    },
    {
      blockType: 'featureGridBlock',
      eyebrow: 'What is inside',
      headline: 'It is not seven features. It is one system.',
      body: 'Each part is more useful because the others exist.',
      items: [
        { title: 'Quick capture', body: 'Catch it in a second, from anywhere. Sorting it out is our job, not yours.' },
        { title: 'Calendar', body: 'Intentions and commitments in one view, with time blocking — so you stop planning a day you do not have.' },
        { title: 'Notes and journal', body: 'What happened, and what you made of it, kept where you will find it again.' },
        { title: 'Goals', body: 'Long-term intentions that stay visible when the week gets loud.' },
        { title: 'Reflection', body: 'A gentle look back that quietly shapes what comes next.' },
        {
          title: 'TimeBite Cycles',
          body: 'Your day broken down by where the hours actually went — and a cycle score that tells you the truth, gently.',
        },
      ],
    },
    {
      // Rows render as clean text until images are uploaded in /admin —
      // no empty placeholder boxes. Add planner photography and app
      // screenshots to the `image` field on each row.
      blockType: 'showcaseBlock',
      eyebrow: 'A closer look',
      headline: 'Digital and analog, designed together.',
      rows: [
        {
          title: 'The loop, on your phone',
          body: 'Catch a thought on the way out the door. Find it waiting beside the goal it belongs to when you sit down that evening.',
          imageAlt: 'TimeBite on iPhone, showing a captured thought connected to a goal',
        },
        {
          title: 'The guided planner',
          body: 'The same framework in print — a paper planner and journal for the days you would rather be off a screen.',
          imageAlt: 'The Creating Your Reality guided paper planner, open to a daily spread',
        },
      ],
    },
    {
      blockType: 'platformCardsBlock',
      eyebrow: 'Across your devices',
      headline: 'The same memory, wherever you are.',
      body: 'A thought caught on your watch mid-run is already waiting on your Mac when you sit down.',
      platforms: [
        { title: 'iPhone', body: 'Where the daily loop lives first.', status: 'available' },
        { title: 'macOS', body: 'Think it through where you already work.', status: 'in-development' },
        { title: 'Apple Watch', body: 'Capture without breaking your stride.', status: 'planned' },
        { title: 'Vision Pro', body: 'Your plans, arranged in the room with you.', status: 'planned' },
        { title: 'AI glasses', body: 'One day, a quiet reminder exactly where you need it.', status: 'planned' },
      ],
    },
    {
      blockType: 'roadmapBlock',
      eyebrow: 'Roadmap',
      headline: 'We are building this in the open.',
      body: 'TimeBite is in private beta. Studio, the paper planner, Apple Watch, and Vision Pro are already in motion — and the beta shapes what lands first.',
      highlights: [
        { label: 'Studio' },
        { label: 'Paper Planner' },
        { label: 'Apple Watch' },
        { label: 'Vision Pro' },
      ],
      // Set the URL in /admin once the public roadmap board exists — the
      // button stays hidden until then rather than rendering a dead link.
      cta: { label: 'See the full roadmap' },
    },
    {
      // Launch pricing. Every number here is content — change it in /admin, not
      // in code. Optional bundles ship with `enabled: false` so they can be
      // switched on without a deploy. See docs/launch-pricing.md.
      blockType: 'pricingBlock',
      eyebrow: 'Pricing',
      headline: 'Choose how you want to build your reality.',
      body: 'Start on a screen, work on paper, or move between the two. TimeBite and the Creating Your Reality planner were designed as one system.',
      trialCopy: 'Try TimeBite free for 30 days — long enough to know whether it belongs in your life.',
      cta: { label: 'Try TimeBite free', url: '#beta' },
      secondaryCta: { label: 'Pre-order the planner', url: '#planner' },
      digitalEyebrow: 'Digital',
      monthlyLabel: 'Monthly',
      annualLabel: 'Annual',
      annualBadge: 'Best value',
      digitalPlans: [
        {
          name: 'Free',
          monthlyPrice: '0',
          annualPrice: '0',
          badge: 'To begin with',
          description: 'For beta members and anyone still deciding. Enough of the loop to find out whether it holds.',
          features: [
            { text: 'Quick capture' },
            { text: 'Goals and daily action' },
            { text: 'Reflection' },
            { text: 'One device' },
          ],
          cta: { label: 'Join the beta', url: '#beta' },
        },
        {
          name: 'Plus',
          monthlyPrice: '12.55',
          annualPrice: '125.55',
          annualNote: 'Two months free against paying monthly.',
          featured: true,
          badge: 'Recommended',
          description: 'The whole loop, kept in one memory, on every Apple device we support.',
          features: [
            { text: 'Everything in Free' },
            { text: 'Calendar and time blocking' },
            { text: 'Notes and journal' },
            { text: 'Unlimited goals and history' },
            { text: 'TimeBite Cycles' },
            { text: 'Sync across your devices' },
          ],
          cta: { label: 'Try TimeBite free', url: '#beta' },
        },
        {
          name: 'Pro',
          monthlyPrice: '25.55',
          annualPrice: '255.55',
          badge: 'As it lands',
          description: 'For the deeper end — richer planning and quiet automation, arriving as those pieces are built.',
          features: [
            { text: 'Everything in Plus' },
            { text: 'Deeper planning surfaces — in development' },
            { text: 'Longer-range review and reporting — in development' },
            { text: 'Quiet automation across the loop — planned' },
          ],
          cta: { label: 'Join the waitlist', url: '#beta' },
        },
      ],
      betaPromotion: {
        enabled: true,
        label: 'Friends of TimeBite',
        body: 'An invite code adds two more months on top of the 30-day trial. Codes go to the people in the private beta.',
        cta: { label: 'Have an invite code?', url: '#beta' },
      },
      platformNote: {
        text: 'One membership, across every Apple device we support.',
        cta: { label: 'See what runs where', url: '#platforms' },
      },
      physicalEyebrow: 'Analog',
      physicalHeadline: 'The same framework, in print.',
      physicalBody:
        'A paper home for the ideas you are building in TimeBite — six months of intentional planning, reflection, goals, and daily action per planner.',
      physicalProducts: [
        {
          name: 'Six-Month Planner',
          price: '35.55',
          billingType: 'preorder',
          description: 'One planner, roughly six months of the loop on paper.',
          includedItems: [
            { text: 'One Creating Your Reality planner' },
            { text: 'Guided goal, reflection, and daily action spreads' },
          ],
          cta: { label: 'Pre-order the planner', url: '#beta' },
        },
        {
          name: 'Year of Planning',
          price: '65.55',
          billingType: 'preorder',
          featured: true,
          badge: 'Best value in paper',
          description: 'A full year, without re-ordering in the middle of it.',
          includedItems: [{ text: 'Two six-month planners' }, { text: 'One year of analog planning' }],
          cta: { label: 'Pre-order the year', url: '#beta' },
        },
        {
          name: 'Stationery Kit',
          price: '55.55',
          billingType: 'preorder',
          description: 'The small things that make the planner easier to keep. Contents may change before printing.',
          includedItems: [{ text: 'Branded sticky notes' }, { text: 'Sticker set' }, { text: 'Pen' }],
          cta: { label: 'Pre-order the kit', url: '#beta' },
        },
        {
          // Optional bundles: configured, hidden. Flip `enabled` to true in
          // /admin when they are ready to sell.
          name: 'Planner + Stationery',
          price: '85.55',
          billingType: 'preorder',
          enabled: false,
          description: 'Optional bundle, held back for a later launch.',
          includedItems: [{ text: 'One six-month planner' }, { text: 'Stationery kit' }],
          cta: { label: 'Pre-order the bundle', url: '#beta' },
        },
        {
          name: 'Full Year Analog Set',
          price: '115.55',
          billingType: 'preorder',
          enabled: false,
          description: 'Optional bundle, held back for a later launch.',
          includedItems: [{ text: 'Two six-month planners' }, { text: 'Stationery kit' }],
          cta: { label: 'Pre-order the set', url: '#beta' },
        },
      ],
      footnote:
        'Launch pricing. Plans renew; planners and stationery are one-time pre-orders charged when they ship. Nothing is charged yet — pre-orders and paid plans open to the beta list first.',
    },
    {
      blockType: 'newsletterBlock',
      eyebrow: 'Private beta',
      headline: 'Come build it with us.',
      body: 'The beta is small on purpose, and the people in it genuinely change what gets built. Add your email for early access, or follow along while we work.',
      cta: { label: 'Join the beta', url: '#beta' },
      secondaryCta: { label: 'Follow on Substack' },
      formNote: 'No spam, no drip sequence. Beta invitations and honest build updates.',
    },
    {
      blockType: 'faqBlock',
      headline: 'The honest answers.',
      items: [
        {
          question: 'Is this just another AI planner?',
          answer:
            'No. Planners start with your task list. TimeBite starts with what you are trying to build, then keeps hold of it when the week gets away from you. The AI is quiet plumbing, not the point.',
        },
        {
          question: 'What is Creating Your Reality?',
          answer:
            'The philosophy and the long-term ecosystem. TimeBite is the first product built on it — the place the ideas become a daily practice.',
        },
        {
          question: 'Do I have to use all of it?',
          answer:
            'No. Most people start by capturing one thought a day. The system gets more useful the more of your life it holds, but it never demands the whole thing up front.',
        },
        {
          question: 'Which devices can I use it on?',
          answer: 'iPhone first, then macOS, with Apple Watch and Vision Pro on the roadmap.',
        },
        {
          question: 'What does it cost?',
          answer:
            'Free for 30 days, then $12.55 a month or $125.55 a year for Plus — the annual price is two months lighter. There is a free tier to begin with, and a Pro tier for the deeper features as they are built. Nothing is charged during the beta.',
        },
        {
          question: 'Can I buy the paper planner yet?',
          answer:
            'Not quite. Pre-orders are listed so you can see what is coming and what it will cost, but checkout is not live — the beta list hears first when it opens.',
        },
      ],
    },
  ],
}
