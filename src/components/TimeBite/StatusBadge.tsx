import type { Status } from './types'

/**
 * One badge, four states, used on feature cards, showcase steps, platforms,
 * plan features and agents. Colour carries meaning here (shipped reads green,
 * speculative reads faint) but never carries it alone — the words are the
 * label, so the meaning survives colour blindness and greyscale printing.
 */
const STATUS_LABELS: Record<Status, string> = {
  available: 'Available now',
  beta: 'Beta',
  'in-development': 'In development',
  planned: 'Planned',
  exploring: 'Exploring',
}

export function statusLabel(status?: string) {
  return STATUS_LABELS[status as Status] || status || null
}

export function StatusBadge({ status, size }: { status?: string; size?: 'sm' }) {
  const label = statusLabel(status)

  if (!label) return null

  return (
    <span className={`tb-status tb-status-${status}${size === 'sm' ? ' tb-status-sm' : ''}`}>{label}</span>
  )
}
