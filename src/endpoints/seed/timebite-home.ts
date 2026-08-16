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
      body: 'TimeBite brings your goals, tasks, time and progress into one place—so you can decide what matters, act on it, and see where your time actually goes. It bridges what is actually happening in your physical world with the digital, so the goals you set are the ones you meet.',
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
      availabilityNote: 'Beta on macOS • iOS, watchOS and visionOS coming soon',
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
      // Two loops behind a tab bar, matching the macOS app's top-level
      // navigation: Now / Plan / Track / Dashboard on the TimeBite side,
      // Discover on the Creating Your Reality side.
      blockType: 'dualLoopBlock',
      eyebrow: 'How it works',
      headline: 'One system for turning intention into action.',
      body: 'Two halves of the same practice. Creating Your Reality decides what is worth doing; TimeBite is where that meets a calendar.',
      tabs: [
        {
          label: 'TimeBite',
          accent: 'blue',
          tagline: 'Planning, execution and measurement — the same four surfaces you get in the macOS app.',
          steps: [
            {
              title: 'Now',
              body: 'What is in front of you this hour, and nothing else. Start a focus session without leaving the view.',
              status: 'available',
            },
            {
              title: 'Plan',
              body: 'Goals into milestones into actions, then onto the calendar as real blocks of time you can defend.',
              status: 'available',
            },
            {
              title: 'Track',
              body: 'Time, completion and habits recorded as you go — daily, monthly and annual, not reconstructed from memory.',
              status: 'available',
            },
            {
              title: 'Dashboard',
              body: 'Planned against actual, per goal, over time. The gap between the two is the useful number.',
              status: 'in-development',
            },
          ],
        },
        {
          label: 'Creating Your Reality',
          accent: 'lavender',
          tagline: 'The philosophy side: what kind of life you are trying to build, before any of it reaches a calendar.',
          steps: [
            {
              title: 'Discover',
              body: 'Identity, purpose and the long-term picture — vision work, values, and the questions underneath the goals.',
              status: 'in-development',
            },
            {
              title: 'Define',
              body: 'Turn that picture into goal areas you can actually name: career, fitness, finance, and the rest of a life.',
              status: 'planned',
            },
            {
              title: 'Practise',
              body: 'The paper planner and the written framework, for the parts of this that work better away from a screen.',
              status: 'planned',
            },
          ],
        },
      ],
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
      /*
       * Every status below was checked against timebite-macos/RootView.swift,
       * not against what this page previously claimed. Anything routed to
       * PlaceholderView or ContentUnavailableView is NOT "available now":
       *   Actions, Goals            -> PlaceholderView
       *   Kanban                    -> ContentUnavailableView("Kanban is next")
       *   Eisenhower                -> no source in the repo at all
       *   Create, Journal, Library  -> PlaceholderView
       * Built and shipping: Now (AM/PM), Plan > Calendar with real
       * drag-and-drop, Plan > Timeline, Track (daily/weekly/monthly/annual/
       * habits), Dashboard, activity rings, Discover (Ikigai + Boards).
       */
      blockType: 'featureGridBlock',
      eyebrow: "What's inside",
      headline: 'Turn what you want into what you actually do.',
      body: 'Creating Your Reality helps you define the direction. TimeBite turns it into actions, time, and measurable progress.',
      flow: 'Vision → Goals → Actions → Calendar → Time → Progress',
      groups: [
        {
          label: 'Create your direction',
          brand: 'Creating Your Reality',
          accent: 'lavender',
          body: 'Work backward from what you want this to become, before any of it reaches a calendar.',
          items: [
            {
              title: 'Discover',
              body: 'Explore and assemble the ideas behind a direction before committing to it.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Ikigai',
              body: 'Find the intersection of what matters to you, what you are good at, and what sustains you.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Boards',
              body: 'Collect visual inspiration and references around the life or goal you are building.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Create',
              body: 'Shape a loose direction into something concrete enough to act on.',
              status: 'in-development',
              enabled: true,
            },
            {
              title: 'Journal',
              body: 'Capture what is working, what changed, and what you learned along the way.',
              status: 'in-development',
              enabled: true,
            },
            {
              title: 'Library',
              body: 'Keep the references, advice, and resources you want to return to later.',
              status: 'planned',
              enabled: true,
            },
          ],
        },
        {
          label: 'Turn it into action',
          brand: 'TimeBite',
          accent: 'blue',
          body: 'Translate a direction into calendar time, then measure whether it moved you anywhere.',
          items: [
            {
              title: 'Now',
              body: 'See what is in front of you this hour, and how the AM and PM are going.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Calendar Planning',
              body: 'Drag actions into your calendar and give important work an actual place in your day.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Timeline',
              body: 'Lay goals across the months and see where they overlap and compete.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Track',
              body: 'Record what happened daily, weekly, monthly and annually — including the habits underneath.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Activity',
              body: 'Compare the time you intended to spend with the time you actually did.',
              status: 'available',
              enabled: true,
            },
            {
              title: 'Dashboard',
              body: 'Watch progress accumulate across actions, goals and time instead of trusting memory.',
              status: 'in-development',
              enabled: true,
            },
            {
              title: 'Goals & Actions',
              body: 'Break a direction into milestones and actions you can schedule.',
              status: 'in-development',
              enabled: true,
            },
            {
              title: 'Kanban',
              body: 'Move the actions behind your goals through stages of progress.',
              status: 'in-development',
              enabled: true,
            },
            {
              title: 'Eisenhower Matrix',
              body: 'Sort actions by urgency and importance to decide what deserves your time now.',
              status: 'planned',
              enabled: true,
            },
          ],
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
      body: 'TimeBite is being designed to help you customize your workspace around your goals—from the widgets you use to the agents that help you stay on track. Your life doesn’t fit into someone else’s dashboard. Components are TimeBite surfaces; goal areas are the parts of your life Creating Your Reality asks you to name.',
      modules: [
        // Components: TimeBite surfaces.
        { name: 'Today', kind: 'component', description: 'What is on, right now', sketch: 'list', status: 'available', defaultOn: true },
        { name: 'Actions', kind: 'component', description: 'Everything queued', sketch: 'matrix', status: 'available', defaultOn: true },
        { name: 'Calendar', kind: 'component', description: 'The week in hours', sketch: 'calendar', status: 'available', defaultOn: true },
        { name: 'Goals', kind: 'component', description: 'Outcomes and milestones', sketch: 'goal', status: 'available', defaultOn: true },
        { name: 'Habits', kind: 'component', description: 'The repeated work', sketch: 'habits', status: 'available' },
        { name: 'Progress', kind: 'component', description: 'Plan against actual', sketch: 'chart', status: 'in-development' },
        { name: 'Journal', kind: 'component', description: 'What happened, in your words', sketch: 'list', status: 'in-development' },
        // Goal areas: Creating Your Reality life domains.
        { name: 'Career', kind: 'goal-area', description: 'Longer-range professional goals', sketch: 'timeline', status: 'planned' },
        { name: 'Fitness', kind: 'goal-area', description: 'Training and consistency', sketch: 'habits', status: 'planned' },
        { name: 'Finance', kind: 'goal-area', description: 'Savings and money goals', sketch: 'chart', status: 'exploring' },
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
      // Set the URL in /admin once the public board exists — the button stays
      // hidden until then rather than rendering a dead link. Sunsama runs
      // theirs on Canny (roadmap.sunsama.com), which is the obvious option if
      // you want feedback voting alongside the changelog.
      roadmapCta: { label: 'Our roadmap & changelog', analyticsId: 'view_roadmap' },
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
        'Create the life you imagine. See whether your time is taking you there.',
      cta: { label: 'Read our mission', url: '/about', analyticsId: 'home_to_about' },
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
          name: 'Free Trial',
          monthlyPrice: '0',
          annualPrice: '0',
          badge: 'First month free',
          description: 'A full month of the loop, free. Long enough to plan a month and see whether it held.',
          features: [
            { text: 'Everything in Starter Kit' },
            { text: 'One device' },
            { text: 'No card required during the beta' },
          ],
          cta: { label: 'Join the TimeBite Beta', url: '#beta', analyticsId: 'join_beta_plan_free' },
        },
        {
          name: 'Starter Kit',
          monthlyPrice: '35.55',
          annualPrice: '355.50',
          annualNote: 'Two months free against paying monthly.',
          featured: true,
          badge: 'Recommended',
          description: 'The whole loop — direction, planning, calendar time and review. The planner bundle adds the printed planner to the app.',
          features: [
            { text: 'Discover, Ikigai and Boards' },
            { text: 'Calendar planning with drag-and-drop' },
            { text: 'Daily, weekly, monthly and annual tracking' },
            { text: 'Habits and activity rings' },
            { text: 'Sync across your devices' },
            { text: 'Add the planner — $75.55 a quarter, or $255.55 a year' },
          ],
          cta: { label: 'Try TimeBite free', url: '#beta', analyticsId: 'start_free_trial_starter' },
        },
        {
          name: 'Executive',
          monthlyPrice: '111.11',
          annualPrice: '1111.10',
          badge: 'Premium Subscriber',
          description: 'The measurement and assistance layer, arriving as each piece is built.',
          features: [
            { text: 'Everything in Starter Kit' },
            { text: 'Progress dashboards and charts', status: 'in-development' },
            { text: 'Goals, Actions and Kanban', status: 'in-development' },
            { text: 'Goal Agent', status: 'in-development' },
            { text: 'Domain agents as they arrive', status: 'planned' },
          ],
          cta: { label: 'Join the waitlist', url: '#beta', analyticsId: 'join_waitlist_executive' },
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
            'The beta runs on macOS, where the full product lives. iOS, watchOS and visionOS are coming — iPhone is in development, with iPad and Apple Watch planned after it, and Vision Pro further out.',
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
