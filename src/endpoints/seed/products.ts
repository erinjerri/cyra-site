/**
 * Physical products — the offline extension of the TimeBite system.
 *
 * Everything ships as `concept` on purpose. Nothing here has been printed, so
 * nothing here may say preorder or available; the status field is what moves
 * when that changes, and it moves in /admin rather than in this file.
 *
 * Prices are left blank rather than guessed. A price on a marketing page is a
 * promise, and an invented one is the kind that gets quoted back to you.
 */
export const productsSeed = [
  {
    // The flagship physical product, and the one /shop/planner is about. Its
    // slug is what that page's URL is built from, so it should not change.
    // Price stays blank on purpose: $49 is a target we can talk about in
    // campaign copy, not a price anyone can pay, and the price field renders
    // as an actual price.
    name: 'Creating Your Reality Planner',
    slug: 'planner',
    productType: 'planner',
    variantNote: 'Annual · Black or midnight',
    description:
      'The year on paper. Annual vision, quarterly direction, monthly goals, weekly priorities and room to write down what you learned.',
    status: 'concept',
    sortOrder: 10,
    featured: true,
    enabled: true,
    cta: {
      label: 'Preview the planner',
      url: '/shop/planner',
      analyticsId: 'planner-preview-grid',
    },
  },
  {
    name: 'Task & Time',
    slug: 'task-and-time',
    productType: 'pad',
    variantNote: 'Daily pad',
    description:
      'A daily planning and time-blocking pad. Decide the handful of things that matter, then give each one an hour.',
    status: 'concept',
    sortOrder: 20,
    enabled: true,
    cta: {
      label: 'Get notified',
      url: 'https://erinjerri.substack.com/',
      newTab: true,
      analyticsId: 'product_notify_task_time',
    },
  },
  {
    name: 'Goal Notes',
    slug: 'goal-notes',
    productType: 'notes',
    description:
      'For turning a loose idea into a next action while it is still in your head — then moving it into TimeBite when you sit down.',
    status: 'concept',
    sortOrder: 30,
    enabled: true,
    cta: {
      label: 'Get notified',
      url: 'https://erinjerri.substack.com/',
      newTab: true,
      analyticsId: 'product_notify_goal_notes',
    },
  },
  {
    name: 'Tools',
    slug: 'tools',
    productType: 'tools',
    variantNote: 'Pens · Highlighters · Desk accessories',
    description: 'The small things that make the paper worth keeping open.',
    status: 'concept',
    sortOrder: 40,
    enabled: true,
    cta: {
      label: 'Get notified',
      url: 'https://erinjerri.substack.com/',
      newTab: true,
      analyticsId: 'product_notify_tools',
    },
  },
]
