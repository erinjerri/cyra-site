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
    name: 'Planner',
    slug: 'planner',
    productType: 'planner',
    variantNote: 'Quarterly · Annual · Undated',
    description:
      'The TimeBite loop on paper. Goals at the front, weeks in the middle, and room to review what actually happened.',
    status: 'concept',
    sortOrder: 10,
    featured: true,
    enabled: true,
    cta: {
      label: 'Get notified',
      url: 'https://erinjerri.substack.com/',
      newTab: true,
      analyticsId: 'product_notify_planner',
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
