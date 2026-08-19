export const philosophyPage = {
  title: 'Philosophy',
  slug: 'philosophy',
  _status: 'published',
  layout: [
    {
      blockType: 'quoteBlock',
      eyebrow: 'Creating Your Reality',
      statement: 'TimeBite starts with a goal, but it is built around the action loop that keeps it moving.',
      emphasis: 'Goals give direction. Systems create the follow-through that compounds.',
    },
    {
      blockType: 'frameworkSectionBlock',
      eyebrow: 'The framework',
      headline: 'Identity is built by what you repeat.',
      body:
        'A good system does not ask for perfect motivation. It asks for a next action small enough to repeat, then gives that action somewhere to live.',
      pillars: [{ label: 'Identity' }, { label: 'Systems' }, { label: 'Habits' }, { label: 'Compounding' }],
      closingStatement:
        'That is the bridge TimeBite is built to hold: a goal at one end, a concrete action at the other, and a daily loop between them.',
      cta: { label: 'See TimeBite', url: '/' },
    },
    {
      blockType: 'quoteBlock',
      eyebrow: 'Shared memory',
      statement: 'An idea only becomes part of your life when the system remembers it after the moment passes.',
      emphasis: 'Repeated actions are how intention becomes identity.',
    },
    {
      blockType: 'ctaBlock',
      headline: 'Build the loop that holds the goal.',
      body: 'TimeBite is where this philosophy stops being abstract and becomes a daily practice.',
      cta: { label: 'Explore TimeBite', url: '/' },
      secondaryCta: { label: 'Start with one action', url: '/#product-ui' },
    },
  ],
}
