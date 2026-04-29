export const timeBiteHome = {
  title: 'TimeBite',
  slug: 'home',
  _status: 'published',
  layout: [
    {
      blockType: 'heroBlock',
      eyebrow: 'TimeBite by CYRA',
      headline: 'Engineer your focus. See where your time actually goes.',
      body:
        'TimeBite turns daily intentions, timers, and reflection into a visual feedback loop so you can see the gap between what you planned and what actually happened.',
      cta: { label: 'Join the beta', url: '#beta' },
      secondaryCta: { label: 'Watch the demo', url: '#demo' },
      stats: [
        { title: 'Daily Intent', body: 'Choose the shape of today before the day chooses for you.' },
        { title: 'Reality Check', body: 'Compare planned time with lived time across life categories.' },
        { title: 'iOS first', body: 'Built for mobile daily loops, with spatial computing next.' },
      ],
    },
    {
      blockType: 'authorityStripBlock',
      eyebrow: 'Built for high-agency operators',
      headline: 'A cycle-based time system, not another generic AI planner.',
      body:
        'TimeBite models how time is actually spent across app, income, brand, health, admin, and life categories.',
      items: [
        { title: 'Cycle Matrix', body: 'Organize intent and tracked reality into reusable life categories.' },
        { title: 'Cycles Dashboard', body: 'Read your distribution, score, and drift at a glance.' },
        { title: 'Tight assistant', body: 'RAG-guided suggestions stay inside approved TimeBite actions.' },
      ],
    },
    {
      blockType: 'problemAgitationBlock',
      headline: 'Your planner shows the plan. Your day shows the truth.',
      body:
        'Most productivity apps help you make lists. TimeBite helps you understand the shape of your day: what you intended, what you actually did, and where your energy went.',
      items: [
        { title: 'Lists hide drift', body: 'Tasks can look organized while the day quietly goes somewhere else.' },
        { title: 'Timers lack memory', body: 'Focus sessions matter more when they feed the next decision.' },
        { title: 'Reflection closes the loop', body: 'Tomorrow gets better when today becomes visible.' },
      ],
    },
    {
      blockType: 'howItWorksBlock',
      eyebrow: 'Core loop',
      headline: 'Daily Intent to Reality Check.',
      steps: [
        { title: 'Set your daily intent' },
        { title: 'Start focused action timers' },
        { title: 'Track reality across life categories' },
        { title: 'Review your cycles and rebalance tomorrow' },
      ],
    },
    {
      blockType: 'featureTabsBlock',
      headline: 'The operating surface for your day.',
      tabs: [
        { title: 'Action', body: 'Start the next focused block without rebuilding your entire day.' },
        { title: 'Goals', body: 'Choose what matters today across app, income, brand, health, admin, and life.' },
        { title: 'Track', body: 'Capture what actually happened, not just what looked good in the planner.' },
        { title: 'Dashboard', body: 'See your time distribution, cycle score, and intent vs actual feedback.' },
      ],
    },
    {
      blockType: 'productScreensBlock',
      eyebrow: 'Product direction',
      headline: 'Designed iOS first, with spatial time systems next.',
      body:
        'The visual model is built around reverse activity rings and torus-style cycles: fast enough for daily use, rich enough for deeper review.',
      screens: [
        { title: 'Intent', body: 'Pick categories and define the next honest block.' },
        { title: 'Timer', body: 'Execute without turning planning into avoidance.' },
        { title: 'Cycles', body: 'See where time accumulated and where attention leaked.' },
      ],
    },
    {
      blockType: 'aiArchitectureBlock',
      headline: 'AI that stays inside the system.',
      body:
        'TimeBite is designed around a constrained assistant, not an open-ended chatbot. The assistant can retrieve context, suggest next actions, and execute approved UI actions without freely mutating your day.',
      items: [
        { title: 'Tight RAG', body: 'Retrieves only relevant context from the TimeBite model.' },
        { title: 'Approved actions', body: 'Suggestions become changes only through user-approved UI flows.' },
        { title: 'Cycle aware', body: 'Advice is grounded in categories, goals, timers, and tracked reality.' },
      ],
    },
    {
      blockType: 'pricingBlock',
      eyebrow: 'Pricing',
      headline: 'Simple, honest pricing.',
      body: 'Pay for what you actually use. Upgrade when you need more.',
      tiers: [
        {
          name: 'Access',
          price: 'Free',
          cadence: 'During the private beta',
          features: [
            { text: 'Core loop: Intent, Timer, Track, Reflect' },
            { text: '6 life categories' },
            { text: '30-day cycle history' },
            { text: 'iOS app (beta)' },
            { text: 'Community access' },
          ],
          cta: { label: 'Join the beta', url: '#beta' },
        },
        {
          name: 'Pro',
          price: '12',
          cadence: 'per month, billed monthly',
          featured: true,
          badge: 'Most popular',
          features: [
            { text: 'Everything in Access' },
            { text: 'Unlimited cycle history' },
            { text: 'Cycles dashboard and analytics' },
            { text: 'AI suggestions, cycle-aware and constrained' },
            { text: 'CSV export and integrations' },
            { text: 'Priority support' },
          ],
          cta: { label: 'Get early access', url: '#beta' },
        },
        {
          name: 'Operator',
          price: '29',
          cadence: 'per month, billed monthly',
          features: [
            { text: 'Everything in Pro' },
            { text: 'API access' },
            { text: 'Custom category system' },
            { text: 'Team-facing cycle reports' },
            { text: 'Early visionOS and spatial beta' },
            { text: '1-on-1 onboarding session' },
          ],
          cta: { label: 'Contact us', url: 'mailto:hello@cyra.ai' },
        },
      ],
    },
    {
      blockType: 'founderCredibilityBlock',
      eyebrow: 'Why CYRA is building this',
      headline: 'For builders who need ambition and execution in the same room.',
      body:
        'TimeBite comes from CYRA\'s broader work on agentic creative systems, spatial interfaces, and practical tools for people managing many life categories at once.',
      items: [
        { title: 'Builder-led', body: 'Shaped by real founder, creative, and operator workflows.' },
        { title: 'Research-backed direction', body: 'Draws from agent systems, visual feedback loops, and spatial computing.' },
      ],
    },
    {
      blockType: 'betaSignupBlock',
      eyebrow: 'Private beta',
      headline: 'Join the private beta.',
      body:
        'For builders, founders, neurodivergent operators, creatives, and high-agency people who need a better way to close the loop between ambition and execution.',
      cta: { label: 'Get early access', url: '#beta' },
      formNote: 'No spam. Just beta access and product updates when TimeBite is ready.',
    },
    {
      blockType: 'faqBlock',
      headline: 'Questions before the beta.',
      items: [
        { question: 'Is TimeBite another AI planner?', answer: 'No. It is a cycle-based time system that uses AI inside constrained workflows.' },
        { question: 'What platforms are planned?', answer: 'The product direction is iOS first, visionOS and spatial computing next, and macOS later.' },
        { question: 'What happens to my data during the beta?', answer: 'Beta data is stored securely and will migrate to your paid account. You own your cycle history.' },
        { question: 'Can I switch plans later?', answer: 'Yes. You can upgrade or downgrade at any time. Changes take effect at the start of the next billing period.' },
        { question: 'Where do assets come from?', answer: 'Production pages use Payload media or public Cloudflare R2 URLs configured through content and environment variables.' },
      ],
    },
  ],
}
