/**
 * Two starter posts so /blog has something real to render and test against.
 *
 * `substackUrl` is set on the first and deliberately left blank on the second —
 * that exercises both paths of the automatic end-of-post call to action: the
 * post-specific "Read this on Substack", and the site-wide "Follow on Substack"
 * fallback.
 */

type Block = { text: string; type?: 'p' | 'h2' | 'quote' }

/** Minimal valid Lexical document. Payload stores richText in this shape. */
function lexical(blocks: Block[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: blocks.map((block) => {
        const text = {
          type: 'text',
          detail: 0,
          format: 0,
          mode: 'normal',
          style: '',
          text: block.text,
          version: 1,
        }

        if (block.type === 'h2') {
          return {
            type: 'heading',
            tag: 'h2',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            children: [text],
          }
        }

        if (block.type === 'quote') {
          return {
            type: 'quote',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            children: [text],
          }
        }

        return {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          textFormat: 0,
          direction: 'ltr' as const,
          children: [text],
        }
      }),
    },
  }
}

export const postsSeed = [
  {
    title: 'Planning is not the same as deciding',
    slug: 'planning-is-not-deciding',
    _status: 'published',
    category: 'planning',
    publishedAt: '2026-07-28T09:00:00.000Z',
    readingMinutes: 4,
    featured: true,
    excerpt:
      'A full calendar and a clear week are different things. One is a record of what you agreed to; the other is a record of what you chose.',
    substackUrl: 'https://erinjerri.substack.com/',
    content: lexical([
      {
        text: 'Most planning tools are very good at capturing what you have agreed to and very bad at showing you what you chose. Those are different questions, and only one of them is about your life.',
      },
      { type: 'h2', text: 'A calendar is a record of agreements' },
      {
        text: 'Look at a full week and try to work out which of those blocks you would defend if the day went sideways. Most of us cannot answer quickly, because the calendar flattens everything into the same rectangle. A stakeholder sync and the two hours that actually move your goal look identical.',
      },
      {
        type: 'quote',
        text: 'The gap between what you planned and what you completed is the most useful number you are not currently looking at.',
      },
      { type: 'h2', text: 'Deciding leaves a trace' },
      {
        text: 'When a goal is connected to the actions under it, and those actions are connected to the hours you gave them, a decision leaves a trace you can inspect later. Not to feel bad about it. To notice, in October, that the thing you said mattered in January never got a Tuesday morning.',
      },
      {
        text: 'That is the whole argument for putting goals, actions and time in one system rather than three. Not tidiness. Evidence.',
      },
    ]),
  },
  {
    title: 'What a week looks like when nothing is urgent',
    slug: 'week-with-nothing-urgent',
    _status: 'published',
    category: 'intentional-living',
    publishedAt: '2026-08-04T09:00:00.000Z',
    readingMinutes: 6,
    excerpt:
      'Urgency is a useful signal and a terrible operating system. What happens to a week when you take it away on purpose.',
    content: lexical([
      {
        text: 'Urgency is the cheapest possible way to decide what to do next. It requires no thought, it feels productive, and it is almost always someone else’s priority wearing your calendar.',
      },
      { type: 'h2', text: 'The quadrant nobody talks about' },
      {
        text: 'Everyone knows the urgent-and-important quadrant. The one that quietly runs most weeks is urgent-but-not-important: the messages, the small asks, the things that are loud rather than significant. They are easy to finish, which is exactly why they win.',
      },
      {
        text: 'Sorting by urgency and importance is not a productivity trick. It is a way of making that quadrant visible enough to argue with.',
      },
      { type: 'h2', text: 'Try one week' },
      {
        text: 'Take a week and schedule only the work you would defend. Leave the rest unscheduled and let it find its own way into the gaps. The result is rarely a heroic week. It is usually an ordinary one that moved something.',
      },
    ]),
  },
]
