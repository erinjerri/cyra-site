import type { SketchKind } from './types'

/**
 * Schematics drawn into media slots that have no screenshot yet.
 *
 * These are deliberately abstract — no fake data, no invented UI copy, nothing
 * that could be mistaken for a screenshot of a product that does not look like
 * this yet. They exist so an unfinished section still reads as designed rather
 * than as a row of grey boxes, and every one of them is replaced the moment a
 * real capture is uploaded in /admin.
 */

const W = 320
const H = 200

const line = 'currentColor'

function Panel({ x, y, w, h, r = 4, o = 0.07 }: { x: number; y: number; w: number; h: number; r?: number; o?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={line} opacity={o} />
}

function Bar({ x, y, w, h = 5, color = line, o = 0.22 }: { x: number; y: number; w: number; h?: number; color?: string; o?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} opacity={o} />
}

const ACCENTS = {
  blue: 'var(--tb-blue)',
  green: 'var(--tb-green)',
  gold: 'var(--tb-gold)',
  lavender: 'var(--tb-lavender)',
}

function Workspace() {
  return (
    <>
      <Panel x={12} y={12} w={68} h={176} />
      {[26, 44, 62, 80, 98].map((y, i) => (
        <Bar key={y} x={24} y={y} w={i === 1 ? 40 : 32} color={i === 1 ? ACCENTS.blue : line} o={i === 1 ? 0.5 : 0.2} />
      ))}
      <Panel x={92} y={12} w={104} h={84} />
      <Panel x={208} y={12} w={100} h={84} />
      <Panel x={92} y={108} w={216} h={80} />
      <Bar x={104} y={28} w={52} color={ACCENTS.gold} o={0.45} />
      <Bar x={220} y={28} w={44} color={ACCENTS.green} o={0.4} />
      <Bar x={104} y={124} w={70} o={0.28} />
    </>
  )
}

function Goal() {
  return (
    <>
      <Bar x={20} y={26} w={140} h={7} color={ACCENTS.lavender} o={0.55} />
      <Bar x={20} y={44} w={220} h={4} o={0.14} />
      <line x1={30} y1={80} x2={30} y2={172} stroke={line} strokeWidth="1" opacity="0.18" />
      {[80, 110, 140, 168].map((y, i) => (
        <g key={y}>
          <circle cx={30} cy={y} r={5} fill={i < 2 ? ACCENTS.green : 'none'} stroke={line} strokeWidth="1" opacity={i < 2 ? 0.6 : 0.3} />
          <Bar x={48} y={y - 3} w={i === 3 ? 96 : 150 - i * 18} o={0.2} />
        </g>
      ))}
    </>
  )
}

function List() {
  return (
    <>
      <Bar x={20} y={24} w={96} h={6} o={0.3} />
      {[52, 82, 112, 142, 172].map((y, i) => (
        <g key={y}>
          <rect x={20} y={y - 7} width={14} height={14} rx={4} fill={i < 2 ? ACCENTS.green : 'none'} stroke={line} strokeWidth="1" opacity={i < 2 ? 0.55 : 0.25} />
          <Bar x={44} y={y - 3} w={190 - i * 22} o={i < 2 ? 0.14 : 0.24} />
          <Bar x={262} y={y - 3} w={38} color={ACCENTS.blue} o={0.28} />
        </g>
      ))}
    </>
  )
}

function Matrix() {
  const quads = [
    { x: 16, y: 16, accent: ACCENTS.gold },
    { x: 166, y: 16, accent: ACCENTS.blue },
    { x: 16, y: 106, accent: ACCENTS.lavender },
    { x: 166, y: 106, accent: line },
  ]

  return (
    <>
      {quads.map((q, i) => (
        <g key={i}>
          <Panel x={q.x} y={q.y} w={138} h={78} />
          <Bar x={q.x + 12} y={q.y + 16} w={54} color={q.accent} o={i === 3 ? 0.22 : 0.5} />
          <Bar x={q.x + 12} y={q.y + 36} w={106} o={0.16} />
          <Bar x={q.x + 12} y={q.y + 52} w={82} o={0.16} />
        </g>
      ))}
    </>
  )
}

function Board() {
  const cols = [
    { x: 16, cards: [30, 62], accent: ACCENTS.gold },
    { x: 118, cards: [30, 62, 94], accent: ACCENTS.blue },
    { x: 220, cards: [30], accent: ACCENTS.green },
  ]

  return (
    <>
      {cols.map((col, i) => (
        <g key={i}>
          <Bar x={col.x} y={14} w={44} color={col.accent} o={0.5} />
          <Panel x={col.x} y={28} w={84} h={158} o={0.04} />
          {col.cards.map((y, j) => (
            <g key={j}>
              <Panel x={col.x + 8} y={y + 12} w={68} h={26} r={5} o={0.1} />
              <Bar x={col.x + 16} y={y + 22} w={44} h={4} o={0.22} />
            </g>
          ))}
        </g>
      ))}
    </>
  )
}

function Calendar() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Bar x={20 + i * 58} y={16} w={26} h={4} o={0.24} />
          <line x1={20 + i * 58} y1={32} x2={20 + i * 58} y2={186} stroke={line} strokeWidth="1" opacity="0.08" />
        </g>
      ))}
      <Panel x={22} y={48} w={48} h={34} r={5} o={0.1} />
      <rect x={22} y={48} width={3} height={34} rx={1.5} fill={ACCENTS.blue} opacity="0.7" />
      <Panel x={80} y={92} w={48} h={50} r={5} o={0.1} />
      <rect x={80} y={92} width={3} height={50} rx={1.5} fill={ACCENTS.gold} opacity="0.7" />
      <Panel x={138} y={60} w={48} h={28} r={5} o={0.1} />
      <rect x={138} y={60} width={3} height={28} rx={1.5} fill={ACCENTS.green} opacity="0.7" />
      <Panel x={196} y={120} w={48} h={42} r={5} o={0.1} />
      <rect x={196} y={120} width={3} height={42} rx={1.5} fill={ACCENTS.lavender} opacity="0.7" />
      <line x1={12} y1={112} x2={308} y2={112} stroke={ACCENTS.blue} strokeWidth="1" opacity="0.4" strokeDasharray="3 4" />
    </>
  )
}

function Habits() {
  const cells = Array.from({ length: 5 }, (_, row) => Array.from({ length: 10 }, (_, col) => (row * 7 + col * 3) % 5 !== 0))

  return (
    <>
      {cells.map((row, r) =>
        row.map((filled, c) => (
          <rect
            key={`${r}-${c}`}
            x={22 + c * 28}
            y={40 + r * 28}
            width={20}
            height={20}
            rx={5}
            fill={filled ? ACCENTS.green : line}
            opacity={filled ? 0.34 : 0.08}
          />
        )),
      )}
      <Bar x={22} y={18} w={72} h={5} o={0.28} />
    </>
  )
}

function Chart() {
  return (
    <>
      {[56, 92, 128, 164].map((y) => (
        <line key={y} x1={20} y1={y} x2={304} y2={y} stroke={line} strokeWidth="1" opacity="0.07" />
      ))}
      <polyline
        points="20,158 66,140 112,146 158,110 204,96 250,64 296,40"
        fill="none"
        stroke={ACCENTS.blue}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.75"
      />
      <polyline
        points="20,164 66,152 112,150 158,134 204,124 250,108 296,92"
        fill="none"
        stroke={line}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 5"
        opacity="0.24"
      />
      <Bar x={20} y={18} w={88} h={5} o={0.28} />
    </>
  )
}

function Timeline() {
  const rows = [
    { y: 56, x: 24, w: 150, accent: ACCENTS.lavender },
    { y: 88, x: 82, w: 118, accent: ACCENTS.blue },
    { y: 120, x: 132, w: 150, accent: ACCENTS.gold },
    { y: 152, x: 60, w: 210, accent: ACCENTS.green },
  ]

  return (
    <>
      {[24, 94, 164, 234, 300].map((x) => (
        <line key={x} x1={x} y1={30} x2={x} y2={180} stroke={line} strokeWidth="1" opacity="0.08" />
      ))}
      {[24, 94, 164, 234].map((x) => (
        <Bar key={x} x={x} y={16} w={22} h={4} o={0.2} />
      ))}
      {rows.map((row, i) => (
        <rect key={i} x={row.x} y={row.y} width={row.w} height={12} rx={6} fill={row.accent} opacity="0.42" />
      ))}
    </>
  )
}

const SKETCHES: Record<SketchKind, () => React.JSX.Element> = {
  workspace: Workspace,
  goal: Goal,
  list: List,
  matrix: Matrix,
  board: Board,
  calendar: Calendar,
  habits: Habits,
  chart: Chart,
  timeline: Timeline,
}

export function LayoutSketch({ kind = 'workspace', className }: { kind?: SketchKind; className?: string }) {
  const Sketch = SKETCHES[kind] || SKETCHES.workspace

  return (
    <svg
      className={['tb-sketch', className].filter(Boolean).join(' ')}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <Sketch />
    </svg>
  )
}
