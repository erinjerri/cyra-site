export const philosophyPage = {
  title: 'Philosophy',
  slug: 'philosophy',
  _status: 'published',
  layout: [
    {
      blockType: 'quoteBlock',
      eyebrow: 'Creating Your Reality',
      statement: 'Most software asks what you need to do today.',
      emphasis: 'We start somewhere else: what kind of life are you trying to build?',
    },
    {
      blockType: 'frameworkSectionBlock',
      eyebrow: 'The framework',
      headline: 'Intentions are fragile. They deserve infrastructure.',
      body: 'Creating Your Reality is not a product. It is the belief underneath the products — that the distance between who you are and who you are becoming is crossed in small, ordinary, kept promises.',
      pillars: [{ label: 'Identity' }, { label: 'Purpose' }, { label: 'Intentional Living' }, { label: 'Long-term Growth' }],
      closingStatement:
        'Every tool we build exists for one reason: so the things you decide matter are still there in six months, when life has done its best to bury them.',
      cta: { label: 'Join the TimeBite beta', url: '/#beta' },
    },
    {
      blockType: 'quoteBlock',
      eyebrow: 'Philosophy, then product',
      statement:
        'I decided this mattered. I promised myself I would do it. Six months later I could not tell you whether I had.',
      emphasis:
        'Creating Your Reality decides what is worth doing. TimeBite is where that decision meets a calendar, and where you find out whether it held.',
    },
    {
      blockType: 'ctaBlock',
      headline: 'Come build it with us.',
      body: 'TimeBite is where this philosophy stops being an idea and becomes a daily practice.',
      cta: { label: 'Join the beta', url: '/#beta' },
      secondaryCta: { label: 'Explore TimeBite', url: '/' },
    },
  ],
}
