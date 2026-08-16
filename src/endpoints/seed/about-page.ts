/**
 * /about — Mission, Vision, Values, Our Story.
 *
 * Replaces /philosophy, which said the same thing about CYR and TimeBite in
 * fewer words. A redirect from the old URL lives in the `redirects` collection.
 *
 * Two claims this page deliberately does NOT make, because the macOS build
 * does not support them:
 *  - cycle-aware planning (zero occurrences in the Swift source)
 *  - energy or capacity modelling (same)
 * Both appear only as design principle and future direction, never as
 * something you can use today.
 */
export const aboutPage = {
  title: 'About',
  slug: 'about',
  _status: 'published',
  layout: [
    {
      blockType: 'quoteBlock',
      eyebrow: 'About',
      statement: 'People make vision boards. They journal, set goals, save inspiration, download another planner, fill another calendar.',
      emphasis: 'Each of those is a reasonable thing to do. They just tend to live in completely separate places.',
    },
    {
      blockType: 'frameworkSectionBlock',
      eyebrow: 'Mission',
      headline: 'Turn intention into sustainable action — and make it visible.',
      body: 'Most tools help you capture what you want, or manage what you do. Rarely both. We build the connection between them: a way to decide what you are creating, act on it at a pace your life can actually hold, and see whether your time is taking you there.',
      pillars: [{ label: 'Intention' }, { label: 'Action' }, { label: 'Sustainable progress' }, { label: 'Awareness' }],
      closingStatement:
        'Measurement is here to give you agency, not a verdict. Being busy and moving forward are not the same thing.',
    },
    {
      blockType: 'frameworkSectionBlock',
      eyebrow: 'Vision',
      headline: 'Technology that adapts to you.',
      body: 'Personal software still assumes every day is the same day — same energy, same attention, same available hours. We think that is a choice rather than a constraint. We are working toward tools that respond to your goals, your context and your own patterns: interfaces that reshape around what you are working on, measurement that reveals something true instead of another number to chase, and AI that helps you navigate a direction you chose.',
      pillars: [
        { label: 'Adaptive interfaces' },
        { label: 'Intentional AI' },
        { label: 'Personal patterns' },
        { label: 'Cross-device' },
      ],
      closingStatement: 'The long-term idea is not that AI manages your life. It is that your tools get better at supporting it.',
      cta: { label: 'See what we are building', url: '/#agents', analyticsId: 'about_to_agents' },
    },
    {
      blockType: 'valuesBlock',
      eyebrow: 'Values',
      headline: 'What we hold to.',
      body: 'Six principles that decide what we build, and more often what we leave out.',
      values: [
        {
          title: 'Intention Before Optimization',
          body: 'Know what you are moving toward before optimising how fast you get there. Speed toward the wrong thing is still the wrong thing.',
        },
        {
          title: 'Sustainable Progress',
          body: 'Energy, attention and circumstances change. A system that only works during your best week is not a system.',
        },
        {
          title: 'Designed for Human Rhythms',
          body: 'People are not machines with identical daily output. Tools should make room for different cognitive styles, changing capacity and individual patterns — including, optionally, the cycles some people plan around.',
        },
        {
          title: 'Make Progress Visible',
          body: 'Goals stay abstract until something makes them concrete. Measurement should reveal patterns and hand back agency, never deliver a judgement.',
        },
        {
          title: 'AI Should Earn Its Place',
          body: 'We use AI where it removes real friction or surfaces something you could not otherwise see. You choose the direction; it helps you navigate.',
        },
        {
          title: 'Reflection and Action',
          body: 'Reflection gives action direction. Action gives reflection consequence. We design for the relationship between the two.',
        },
      ],
    },
    {
      blockType: 'showcaseBlock',
      eyebrow: 'Our story',
      headline: 'What are you trying to create?',
      body: 'The question underneath everything we build — and the gap that made us build it.',
      rows: [
        {
          title: 'The missing connection',
          body: 'A vision board does not tell you what to do on Tuesday afternoon. A task manager does not know why the task matters. A calendar can show you exactly where your time went without telling you whether it went anywhere you care about.',
          sketch: 'goal',
          mediaFrame: 'plain',
          imageAlt: 'Schematic of a goal separated from the calendar beneath it.',
        },
        {
          title: 'Two halves of one system',
          body: 'Creating Your Reality is the exploratory side — direction, identity, inspiration, goals. TimeBite is where that becomes actions, calendar time and progress you can see. Together they close a loop: imagine, decide, act, measure, reflect, adapt.',
          sketch: 'workspace',
          mediaFrame: 'plain',
          imageAlt: 'Schematic of the two layers connected into one workspace.',
        },
        {
          title: 'Why the technology',
          body: 'We are interested in AI, adaptive interfaces, personal data and emerging platforms because they make it possible to build software that responds to an individual person rather than an average one. Technology is the means. The point is tools that get better at supporting a human life — not humans getting better at behaving like software.',
          sketch: 'chart',
          mediaFrame: 'plain',
          imageAlt: 'Schematic of progress measured over time.',
        },
      ],
    },
    {
      blockType: 'ctaBlock',
      headline: 'Create the life you imagine. See whether your time is taking you there.',
      body: 'TimeBite is in private beta on macOS. The people in it genuinely change what gets built next.',
      cta: {
        label: 'Join the TimeBite Beta',
        url: 'https://erinjerri.substack.com/',
        newTab: true,
        analyticsId: 'join_beta_about',
      },
      secondaryCta: { label: 'See TimeBite', url: '/', analyticsId: 'about_to_home' },
    },
  ],
}
