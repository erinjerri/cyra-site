/**
 * Homepage copy. Every line here is editable in /admin without touching code.
 *
 * House rules:
 *  - TimeBite is macOS-first. Nothing on this page may imply iPhone shipped
 *    ahead of the Mac.
 *  - Nothing unshipped is described as available. Availability is carried by
 *    the `status` field on cards, steps, platforms and plan features — never
 *    written into a sentence, where it rots silently.
 *  - Agents are described by what they do for a person. No model names, no
 *    "AI-powered", no "autonomous". "Helps you break this down", not "uses AI
 *    to decompose your goals".
 *  - Finance means goal tracking, savings progress, budgeting and education.
 *    Never securities recommendations.
 *  - Creating Your Reality is the philosophy; TimeBite is the product. The two
 *    are named separately every time they appear together.
 */
export const timeBiteHome = {
  title: 'TimeBite',
  slug: 'home',
  _status: 'published',
  layout: [
    {
      blockType: 'heroBlock',
      eyebrow: 'TimeBite',
      headline: "Make time for the life you're actually trying to create.",
      body: 'TimeBite brings your goals, tasks, time and progress into one place—so you can decide what matters, act on it, and see where your time actually goes.',
      // The Substack URL lives here in content, never in a component. Change it
      // in /admin and every beta button that inherits it follows.
      cta: {
        label: 'Join the TimeBite Beta',
        url: 'https://erinjerri.substack.com/',
        newTab: true,
        analyticsId: 'join_beta_hero',
      },
      secondaryCta: {
        label: 'See How TimeBite Works',
        url: '#how-it-works',
        analyticsId: 'see_how_it_works_hero',
      },
      availabilityNote: 'macOS first • iPhone, Apple Watch & Apple Vision Pro coming next',
      // Upload the hero capture to this block's `image` field in /admin.
      // Until then the schematic renders. See docs/MediaSlots.md.
      sketch: 'workspace',
      mediaFrame: 'mac',
      imageAlt:
        'TimeBite on macOS: a goal and its milestones on the left, the week planned into calendar blocks on the right.',
    },
    {
      blockType: 'quoteBlock',
      eyebrow: 'The gap',
      statement:
        'Your goals live in one place. Your calendar lives in another. By Thursday the two have stopped speaking to each other.',
      emphasis: 'Nothing was checking whether the week moved you anywhere.',
    },
    {
      blockType: 'timelineBlock',
      eyebrow: 'How it works',
      headline: 'One system for turning intention into action.',
      body: 'Five stages, running continuously. Most tools give you one or two of them and leave you to carry the rest in your head.',
      steps: [
        {
          title: 'Plan',
          body: 'Name the goal, break it into milestones, and turn those into actions small enough to start on a Tuesday.',
        },
        {
          title: 'Focus',
          body: 'Decide what actually matters this week, and give it real hours on the calendar instead of a place on a list.',
        },
        {
          title: 'Track',
          body: 'Time, completion and habits recorded as you go — not reconstructed on Friday from memory.',
        },
        {
          title: 'Reflect',
          body: 'Look at the day, the week, the month: where the hours went, and whether they went where you meant them to.',
        },
        {
          title: 'Improve',
          body: 'Use what that shows to change next week. The plan bends to the evidence, not the other way round.',
        },
      ],
      imageAlt: 'The TimeBite loop: plan, focus, track, reflect, improve.',
    },
    {
      // The 45–60s Screen Studio cut. Poster + MP4 go on this block in /admin;
      // the transcript below is the accessible equivalent and should be kept in
      // step with whatever the final edit shows.
      blockType: 'productDemoBlock',
      eyebrow: 'The demo',
      headline: 'A minute inside TimeBite.',
      body: 'One goal, taken all the way from a sentence to a scheduled Tuesday morning — and then to a chart that says whether it happened.',
      duration: 'About 60 seconds',
      sketch: 'workspace',
      mediaFrame: 'mac',
      mediaCaption: 'Recorded on macOS. No sound — press play whenever you like.',
      imageAlt: 'TimeBite on macOS, showing a goal being planned into the week.',
      transcript:
        'The walkthrough opens on a goal with three milestones beneath it. A milestone is expanded into individual actions. Those actions are sorted by urgency and importance, then moved across a board from planned into this week. One action is dragged onto Wednesday morning, where it becomes a calendar block of a set length. The week view fills in around it. The action is marked complete, the habit streak beside it advances by a day, and the progress chart for the goal updates to show actual completion running against the plan. The view pulls back to a long-range timeline where the goal sits across the months around it.',
    },
    {
      blockType: 'scaleStoryBlock',
      eyebrow: 'Zoom out',
      headline: 'The hour in front of you, connected to the year you are in.',
      body: 'The same work, read at six different distances. Nothing has to be re-entered to move between them.',
      levels: [
        {
          label: 'Action',
          title: 'One thing, small enough to start.',
          body: 'Not "launch the product". Write the launch email. Forty minutes, a clear finish, a place on the calendar.',
        },
        {
          label: 'Day',
          title: 'A handful of them, in real hours.',
          body: 'Blocked into the time you genuinely have, against the meetings already there — so the day is a plan rather than a hope.',
        },
        {
          label: 'Week',
          title: 'What you meant to move, and what moved.',
          body: 'Planned against completed, side by side. The gap between them is the most useful number in the app.',
        },
        {
          label: 'Month',
          title: 'Habits, streaks, and the shape of your effort.',
          body: 'Whether the thing you said mattered got any hours at all — visible without you having to remember November.',
        },
        {
          label: 'Goal',
          title: 'Milestones falling, or quietly not.',
          body: 'Progress against the goal you set, measured in finished work rather than in how busy the week felt.',
        },
        {
          label: 'Year',
          title: 'A long view you can actually read.',
          body: 'Goals laid across the months, overlapping and competing — which is what makes it obvious when you have taken on two years of work.',
        },
      ],
      closingStatement:
        'A year is not a separate thing from a Tuesday. TimeBite keeps the connection visible in both directions.',
    },
    {
      // Each feature can carry its own screenshot or clip — the fields are
      // there on every row. They render as schematics until media is uploaded.
      blockType: 'featureGridBlock',
      eyebrow: 'What is in it',
      headline: 'It is not nine features. It is one system.',
      body: 'Planning, execution and measurement in one place, so nothing has to be copied between them.',
      items: [
        {
          title: 'Goals',
          body: 'What you are working toward, broken into milestones with a definition of done.',
          status: 'available',
          sketch: 'goal',
          enabled: true,
        },
        {
          title: 'Actions',
          body: 'The unit of work. Small, specific, and always attached to the milestone it serves.',
          status: 'available',
          sketch: 'list',
          enabled: true,
        },
        {
          title: 'Eisenhower planning',
          body: 'Sort what is urgent from what is important before you decide what gets your Tuesday.',
          status: 'available',
          sketch: 'matrix',
          enabled: true,
        },
        {
          title: 'Kanban board',
          body: 'Move work through the states it actually passes through, and see what is stuck.',
          status: 'available',
          sketch: 'board',
          enabled: true,
        },
        {
          title: 'Time tracking',
          body: 'Where the hours went, recorded against the goal they belong to rather than guessed at later.',
          status: 'available',
          sketch: 'calendar',
          enabled: true,
        },
        {
          title: 'Daily activity rings',
          body: 'The day at a glance: planned against actual, closing as the work gets done.',
          status: 'available',
          sketch: 'habits',
          enabled: true,
        },
        {
          title: 'Now, AM, PM & daily summaries',
          body: 'What is in front of you right now, how the morning went, and what the whole day added up to.',
          status: 'available',
          sketch: 'list',
          enabled: true,
        },
        {
          title: 'Progress dashboards',
          body: 'Completion over time, plan against actual, per goal — so progress is a line rather than a feeling.',
          status: 'in-development',
          sketch: 'chart',
          enabled: true,
        },
        {
          title: 'AI-assisted recommendations',
          body: 'Help breaking a goal down and a nudge when something you committed to has gone quiet.',
          status: 'in-development',
          sketch: 'workspace',
          enabled: true,
        },
      ],
    },
    {
      // The step-by-step tour. Every row has a media slot; rows render a
      // schematic until a real capture is uploaded. Filenames and sizes for
      // each slot are listed in docs/MediaSlots.md.
      blockType: 'showcaseBlock',
      eyebrow: 'A closer look',
      headline: 'From a sentence to a scheduled hour, and back out again.',
      body: 'Eight steps. This is the whole loop, in the order you would actually do it.',
      numbered: true,
      rows: [
        {
          title: 'Define a goal',
          body: 'Start with the outcome, not the task list. Give it a horizon and what finishing looks like, and everything below it inherits that context.',
          status: 'available',
          sketch: 'goal',
          mediaFrame: 'mac',
          imageAlt: 'A goal in TimeBite with its milestones listed beneath it.',
        },
        {
          title: 'Break it into actions',
          body: 'Milestones become actions small enough to schedule. Each one keeps its link back to the goal, so nothing floats free of why you are doing it.',
          status: 'available',
          sketch: 'list',
          mediaFrame: 'mac',
          imageAlt: 'A milestone expanded into a list of individual actions.',
        },
        {
          title: 'Organize what actually matters',
          body: 'Sort actions by urgency and importance. The quadrant that quietly runs most weeks is the urgent-but-unimportant one, and it is easier to argue with when you can see it.',
          status: 'available',
          sketch: 'matrix',
          mediaFrame: 'mac',
          imageAlt: 'The Eisenhower matrix in TimeBite with actions in each quadrant.',
        },
        {
          title: 'Drag an action into your calendar',
          body: 'Pull an action onto a day and it becomes a block of real time. This is where a plan stops being a list and starts costing something.',
          status: 'available',
          sketch: 'calendar',
          mediaFrame: 'mac',
          mediaCaption: 'Silent clip.',
          imageAlt: 'An action being dragged from the action list onto Wednesday morning in the calendar.',
        },
        {
          title: 'Work it, and mark it done',
          body: 'Move work across the board as it progresses. Completion feeds the record everything else is measured against.',
          status: 'available',
          sketch: 'board',
          mediaFrame: 'mac',
          imageAlt: 'A Kanban board with an action moving into the done column.',
        },
        {
          title: 'Review the habits underneath',
          body: 'Most long goals rest on something repeated. The habit grid shows the weeks you kept it and, more usefully, the ones you did not.',
          status: 'available',
          sketch: 'habits',
          mediaFrame: 'mac',
          imageAlt: 'A habit grid in TimeBite showing completed days across several weeks.',
        },
        {
          title: 'See whether you are moving',
          body: 'Completion over time, against what you planned. Two lines, and the distance between them is the honest answer.',
          status: 'in-development',
          sketch: 'chart',
          mediaFrame: 'mac',
          imageAlt: 'A progress chart showing completed work tracking against planned work.',
        },
        {
          title: 'Zoom out to the year',
          body: 'Goals laid across the months, overlapping where they compete. This is the view that tells you when you have committed to more than a year holds.',
          status: 'in-development',
          sketch: 'timeline',
          mediaFrame: 'mac',
          imageAlt: 'A long-range timeline with several goals spanning months.',
        },
      ],
    },
    {
      blockType: 'workspaceBlock',
      eyebrow: 'Adaptive workspace',
      headline: 'A system that learns how you work.',
      body: 'TimeBite is being designed to help you customize your workspace around your goals—from the widgets you use to the agents that help you stay on track. Your life doesn’t fit into someone else’s dashboard.',
      modules: [
        { name: 'Today', description: 'What is on, right now', sketch: 'list', status: 'available', defaultOn: true },
        { name: 'Actions', description: 'Everything queued', sketch: 'matrix', status: 'available', defaultOn: true },
        { name: 'Calendar', description: 'The week in hours', sketch: 'calendar', status: 'available', defaultOn: true },
        { name: 'Goals', description: 'Outcomes and milestones', sketch: 'goal', status: 'available', defaultOn: true },
        { name: 'Habits', description: 'The repeated work', sketch: 'habits', status: 'available' },
        { name: 'Progress', description: 'Plan against actual', sketch: 'chart', status: 'in-development' },
        { name: 'Journal', description: 'What happened, in your words', sketch: 'list', status: 'in-development' },
        { name: 'Career', description: 'Longer-range professional goals', sketch: 'timeline', status: 'planned' },
        { name: 'Fitness', description: 'Training and consistency', sketch: 'habits', status: 'planned' },
        { name: 'Finance', description: 'Savings and money goals', sketch: 'chart', status: 'exploring' },
      ],
      suggestion: {
        source: 'Goal Agent',
        prompt: "You're working toward a product launch. Add a Launch Progress widget?",
        moduleName: 'Launch Progress',
        sketch: 'chart',
        acceptLabel: 'Add',
        dismissLabel: 'Not now',
        dismissedNote: 'Not now. It will stay out of the way.',
      },
      footnote:
        'Customisable widgets and agent suggestions are in development — the modules above show where each one stands today. Suggestions are offers: nothing arranges your workspace without asking, and "not now" is a complete answer.',
    },
    {
      blockType: 'agentsBlock',
      eyebrow: 'What comes next',
      headline: 'Help that stays inside the work.',
      body: 'TimeBite is building assistance into the loop itself rather than bolting a chat window onto the side of it. These are the domains we are working on, and where each one honestly stands.',
      agents: [
        {
          name: 'Goal Agent',
          status: 'in-development',
          body: 'Helps you turn a goal you have described in a sentence into milestones and actions you can schedule — and keeps an eye on whether they are moving.',
          capabilities: [
            { text: 'Suggests a first breakdown of a new goal, for you to edit' },
            { text: 'Notices milestones that have gone quiet for a few weeks' },
            { text: 'Offers a reminder when a scheduled block keeps getting skipped' },
          ],
        },
        {
          name: 'Career Agent',
          status: 'planned',
          body: 'Holds the longer arc — the skills, projects and conversations that add up to a direction rather than a job.',
          capabilities: [
            { text: 'Keeps long-range professional goals visible against the noisy weeks' },
            { text: 'Suggests what might help next when a milestone stalls' },
          ],
        },
        {
          name: 'Fitness Agent',
          status: 'planned',
          body: 'Watches the consistency that training actually depends on, and adjusts what it suggests when a week goes sideways.',
          capabilities: [
            { text: 'Tracks streaks and the weeks they break' },
            { text: 'Proposes a lighter plan after a disrupted week rather than a guilt trip' },
          ],
        },
        {
          name: 'Finance Agent',
          status: 'exploring',
          body: 'Financial goals treated like any other goal: a target, a horizon, and visible progress toward it.',
          capabilities: [
            { text: 'Savings goals with progress you can see' },
            { text: 'Budget targets tracked against what actually happened' },
            { text: 'Plain-language explanations of the concepts involved' },
          ],
          disclaimer:
            'Goal tracking, savings progress, budgeting and general education only. TimeBite does not give investment advice and does not recommend securities.',
        },
      ],
      footnote:
        'Nothing here is available today. Each card says where it stands, and the status changes on this page the day it changes in the product.',
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
            'Abstract, infinite, impossible to grasp. You cannot put your hands on a year, or on the life you keep meaning to start.',
        },
        {
          part: 'Bite',
          meaning:
            'Small, specific, human-sized. Something you can actually take — today, in the hour in front of you.',
        },
      ],
      closingStatement:
        'The product is the bridge between them: where a goal you can only describe becomes an hour you can actually schedule, and then a record of whether you did.',
    },
    {
      blockType: 'frameworkSectionBlock',
      eyebrow: 'Creating Your Reality',
      headline: 'Two names, two jobs.',
      body: 'Creating Your Reality is the philosophy and the writing around it — the question of what kind of life you are trying to build. TimeBite is the product that answers a narrower one: what do you do next, when will you do it, and are you actually moving toward it?',
      pillars: [{ label: 'Identity' }, { label: 'Purpose' }, { label: 'Intentional Living' }, { label: 'Long-term Growth' }],
      closingStatement:
        'The philosophy decides what is worth doing. The product is where it survives contact with a calendar.',
      cta: { label: 'Read the philosophy', url: '/philosophy' },
    },
    {
      blockType: 'platformCardsBlock',
      eyebrow: 'Where it runs',
      headline: 'Built for the Mac first.',
      body: 'Planning a year is desk work. TimeBite starts where that work already happens, and reaches the smaller screens from there.',
      platforms: [
        {
          title: 'macOS',
          body: 'The full product. Planning, boards, calendar, habits and review.',
          status: 'available',
        },
        {
          title: 'iPhone',
          body: 'Your day and your actions in your pocket, syncing with the Mac.',
          status: 'in-development',
        },
        { title: 'iPad', body: 'The planning surfaces, sized for a lap and a pencil.', status: 'planned' },
        { title: 'Apple Watch', body: 'Check off an action without breaking your stride.', status: 'planned' },
        { title: 'Vision Pro', body: 'Long-range plans arranged in the room with you.', status: 'exploring' },
      ],
    },
    {
      // Launch pricing. Every number is content — change it in /admin, not in
      // code. Optional bundles ship with `enabled: false` so they can be
      // switched on without a deploy. See docs/launch-pricing.md.
      blockType: 'pricingBlock',
      eyebrow: 'Pricing',
      headline: 'Choose how you want to build your reality.',
      body: 'Start on the Mac, work on paper, or move between the two. TimeBite and the Creating Your Reality planner were designed as one system.',
      trialCopy: 'Try TimeBite free for 30 days — long enough to plan a month and see whether it held.',
      cta: { label: 'Try TimeBite free', url: '#beta', analyticsId: 'start_free_trial' },
      secondaryCta: { label: 'See the planners', url: '#planner', analyticsId: 'view_planners' },
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
            { text: 'Goals and milestones' },
            { text: 'Actions and daily planning' },
            { text: 'Habit tracking' },
            { text: 'One device' },
          ],
          cta: { label: 'Join the TimeBite Beta', url: '#beta', analyticsId: 'join_beta_plan_free' },
        },
        {
          name: 'Plus',
          monthlyPrice: '12.55',
          annualPrice: '125.55',
          annualNote: 'Two months free against paying monthly.',
          featured: true,
          badge: 'Recommended',
          description: 'The whole loop — plan, schedule, track and review, on every device we support.',
          features: [
            { text: 'Everything in Free' },
            { text: 'Eisenhower planning and Kanban' },
            { text: 'Calendar and time blocking' },
            { text: 'Weekly, monthly and annual review' },
            { text: 'Unlimited goals and full history' },
            { text: 'Sync across your devices' },
          ],
          cta: { label: 'Try TimeBite free', url: '#beta', analyticsId: 'start_free_trial_plus' },
        },
        {
          name: 'Pro',
          monthlyPrice: '25.55',
          annualPrice: '255.55',
          badge: 'As it lands',
          description: 'For the deeper end — measurement, long-range planning and assistance, arriving as each piece is built.',
          features: [
            { text: 'Everything in Plus' },
            { text: 'Progress dashboards and charts', status: 'in-development' },
            { text: 'Long-range goal timeline', status: 'in-development' },
            { text: 'Goal Agent', status: 'in-development' },
            { text: 'Domain agents as they arrive', status: 'planned' },
          ],
          cta: { label: 'Join the waitlist', url: '#beta', analyticsId: 'join_waitlist_pro' },
        },
      ],
      betaPromotion: {
        enabled: true,
        label: 'Friends of TimeBite',
        body: 'An invite code adds two more months on top of the 30-day trial. Codes go to the people in the private beta.',
        cta: { label: 'Have an invite code?', url: '#beta', analyticsId: 'beta_code_click' },
      },
      platformNote: {
        text: 'One membership across every device we support, starting with the Mac.',
        cta: { label: 'See what runs where', url: '#platforms' },
      },
      footnote:
        'Launch pricing. Nothing is charged during the beta — paid plans open to the beta list first.',
    },
    {
      // Physical products come AFTER the subscription, and pull from the
      // `products` collection rather than being listed here — leaving
      // `products` unset shows every product marked "Show on the site".
      blockType: 'productGridBlock',
      eyebrow: 'Analog',
      headline: 'Take TimeBite offline.',
      body: "For the moments when you don't want another screen.\nPhysical planners, task pads, goal notes and stationery designed around the same system as the TimeBite app.",
      cta: {
        label: 'Get notified when preorders open',
        url: 'https://erinjerri.substack.com/',
        newTab: true,
        analyticsId: 'preorder_notify_section',
      },
      footnote:
        'Every one of these is still a concept — designed, not yet printed. Nothing is for sale and nothing is charged. The list above hears first when that changes.',
    },
    {
      blockType: 'newsletterBlock',
      eyebrow: 'Private beta',
      headline: 'Come build it with us.',
      body: 'The beta is small on purpose, and the people in it genuinely change what gets built next. Add your email for early access on macOS, or follow along while we work.',
      cta: { label: 'Join the TimeBite Beta', url: 'https://erinjerri.substack.com/', newTab: true, analyticsId: 'join_beta_newsletter' },
      secondaryCta: { label: 'Follow on Substack', url: 'https://erinjerri.substack.com/', newTab: true, analyticsId: 'follow_substack' },
      formNote: 'No spam, no drip sequence. Beta invitations and honest build updates.',
    },
    {
      blockType: 'faqBlock',
      headline: 'The honest answers.',
      items: [
        {
          question: 'Which devices can I use it on?',
          answer:
            'macOS first — that is where the full product lives and where the beta is running. iPhone is in development, with iPad and Apple Watch planned after it. Vision Pro is something we are exploring, not building.',
        },
        {
          question: 'Is this a task manager or a goal app?',
          answer:
            'Both, deliberately. Task managers lose the reason behind the task; goal apps never reach the calendar. TimeBite keeps a goal, the actions under it, and the hours you spent on them in one system, so progress can be measured rather than guessed at.',
        },
        {
          question: 'Is this an AI app?',
          answer:
            'No. It is a planning and tracking tool, and assistance is being built into the work rather than sold as the point of it. The Goal Agent is in development; the others are further out. Every one of them suggests, and you decide.',
        },
        {
          question: 'What can the agents actually do today?',
          answer:
            'Nothing yet — none of them have shipped. The agents section on this page marks each one as in development, planned or exploring, and those labels change the day the product does.',
        },
        {
          question: 'Does the Finance Agent give investment advice?',
          answer:
            'No. It is being explored for financial goal tracking — savings targets, budget goals, progress toward them, and plain-language education. It does not give investment advice and does not recommend securities.',
        },
        {
          question: 'What is Creating Your Reality?',
          answer:
            'The philosophy and the writing around it — the question of what kind of life you are trying to build. TimeBite is the product built on it: the planning, execution and measurement layer where those intentions meet a calendar.',
        },
        {
          question: 'Do I have to use all of it?',
          answer:
            'No. Most people start with one goal and a handful of actions. The workspace is modular, so the parts you do not want are not on your screen.',
        },
        {
          question: 'What does it cost?',
          answer:
            'Free for 30 days, then $12.55 a month or $125.55 a year for Plus — the annual price is two months lighter. There is a free tier to begin with, and a Pro tier for measurement, long-range planning and agents as they are built. Nothing is charged during the beta.',
        },
        {
          question: 'Can I buy the paper planner yet?',
          answer:
            'No. The planner, pads, goal notes and desk tools are concepts — designed around the same system as the app, but not yet printed and not for sale. Nothing is charged, and the beta list hears first when preorders open.',
        },
      ],
    },
  ],
}
