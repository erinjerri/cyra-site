/**
 * Homepage copy — see the story direction doc for the alternatives behind each
 * headline and the reasoning. Every line here is the recommended pick, and all
 * of it is editable in /admin without touching code.
 *
 * House rules this copy follows:
 *  - Keep Creating Your Reality as the philosophy layer.
 *  - TimeBite is the execution and measurement layer.
 *  - Finance stays conservative: tracking, budgeting, savings goals, and guidance.
 */
export const timeBiteHome = {
  title: 'TimeBite | Goals, powered by actions',
  slug: 'home',
  _status: 'published',
  layout: [
    {
      blockType: 'heroBlock',
      eyebrow: 'TimeBite',
      headline: 'Goals, powered by actions.',
      body:
        'TimeBite turns a big goal into a sustainable loop of small, repeated actions. Capture the next step, tag it to the right goal area, choose the horizon, and keep moving today.',
      cta: { label: 'Start with one action', url: '#product-ui' },
      secondaryCta: { label: 'See how it works', url: '#how-it-works' },
    },
    {
      blockType: 'quoteBlock',
      eyebrow: 'The problem',
      statement:
        'Goals without a system drift into vague planning, motivational spikes, and unfinished lists that never make it into the day.',
      emphasis: 'Intent fades when the next step stays abstract.',
    },
    {
      blockType: 'timelineBlock',
      eyebrow: 'How it works',
      headline: 'Start with the goal. Leave with the next action.',
      body: 'A goal gives direction. The action loop keeps it moving.',
      steps: [
        { title: 'Define the goal', body: 'Name the outcome you want and keep the direction visible.' },
        { title: 'Capture one action', body: 'Write the next concrete step instead of a vague intention.' },
        { title: 'Tag the goal area', body: 'Attach the action to the part of life it belongs to.' },
        { title: 'Choose the horizon', body: 'Mark it short term, intermediate term, or long term.' },
        { title: 'Repeat the loop', body: 'Complete the next step, then come back and do it again.' },
      ],
    },
    {
      blockType: 'frameworkSectionBlock',
      eyebrow: 'Why it works',
      headline: 'Small actions reduce overwhelm. Repetition builds momentum.',
      body:
        'The system stays sustainable because it is simple enough to repeat. Goals become actionable instead of abstract, and repeated actions become habits that shape identity.',
      pillars: [
        { label: 'Less overwhelm' },
        { label: 'More consistency' },
        { label: 'Clearer priorities' },
        { label: 'Better follow-through' },
      ],
      closingStatement:
        'Identity shapes behavior, and behavior compounds into the reality you want. TimeBite keeps that loop grounded in something you can do today.',
      cta: { label: 'See the product UI', url: '#product-ui' },
    },
    {
      blockType: 'featureGridBlock',
      eyebrow: 'Product benefits',
      headline: 'A system you can return to every day.',
      body: 'AI helps turn a goal into repeated actions, so the week is less about guessing and more about doing.',
      items: [
        { title: 'Less guessing', body: 'Know what to do next without rebuilding the plan every morning.' },
        { title: 'Less overwhelm', body: 'Shrink a large goal into a step you can complete today.' },
        { title: 'More consistency', body: 'Keep the loop small enough to repeat and strong enough to stick.' },
        { title: 'Clearer priorities', body: 'Separate the next action from the rest of the noise.' },
        { title: 'Better follow-through', body: 'Turn intention into a repeatable practice instead of a wish.' },
        { title: 'Compounding progress', body: 'Let repeated actions become habits that change how you see yourself.' },
      ],
    },
    {
      blockType: 'showcaseBlock',
      eyebrow: 'Product UI',
      headline: 'A larger creation modal, built around the next action.',
      body:
        'The interface stays action-first: capture the task, attach the goal, choose the horizon, and move on with a clear next step.',
      rows: [
        {
          title: 'Task first',
          body: 'Capture the action before it gets buried under planning language.',
        },
        {
          title: 'Goal pills',
          body: 'Attach the action to a goal area using restrained, brand-colored tags.',
        },
        {
          title: 'Horizon tags',
          body: 'Short term, intermediate term, and long term keep the action in context.',
        },
        {
          title: 'Friendly modal',
          body: 'A larger panel gives the workflow room to feel calm, clear, and deliberate.',
        },
      ],
    },
    {
      blockType: 'ctaBlock',
      eyebrow: 'Closing idea',
      headline: 'Turn goals into a system.',
      body:
        'Start with a single action. Build the loop. Let the compounding do the work that motivation cannot sustain on its own.',
      cta: { label: 'Start with one action', url: '#product-ui' },
      secondaryCta: { label: 'See how it works', url: '#how-it-works' },
    },
  ],
}
