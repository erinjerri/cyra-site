import type { SpreadKind } from './types'

/**
 * Schematics of the planner's interior spreads.
 *
 * A sibling of `LayoutSketch`, kept separate because it draws a different
 * thing: LayoutSketch draws app screens, these draw paper. Every one of them
 * is a two-page opening with a visible gutter, so a spread never reads as a
 * screenshot of a screen.
 *
 * Abstract on purpose — no invented dates, no fake handwriting, no legible
 * copy that could be mistaken for the final artwork. They exist so the
 * merchandising can be evaluated while the book is still being drawn, and
 * every one is replaced the moment real artwork is uploaded in /admin.
 */

const W = 320
const H = 200
const ink = 'currentColor'

const ACCENTS = {
  blue: 'var(--tb-blue)',
  green: 'var(--tb-green)',
  gold: 'var(--tb-gold)',
  pink: 'var(--tb-pink)',
  teal: 'var(--tb-teal)',
  lavender: 'var(--tb-lavender)',
}

/** Page halves. The gutter is the thing that makes it read as a book. */
const LEFT = { x: 14, w: 138 }
const RIGHT = { x: 168, w: 138 }

function Rule({
  x,
  y,
  w,
  o = 0.16,
  h = 3,
  color = ink,
}: {
  x: number
  y: number
  w: number
  o?: number
  h?: number
  color?: string
}) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} opacity={o} />
}

function Block({
  x,
  y,
  w,
  h,
  o = 0.06,
  color = ink,
  r = 3,
}: {
  x: number
  y: number
  w: number
  h: number
  o?: number
  color?: string
  r?: number
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={color} opacity={o} />
}

function Ring({ cx, cy, r, color, dash, o = 0.7 }: { cx: number; cy: number; r: number; color: string; dash: number; o?: number }) {
  const circumference = 2 * Math.PI * r
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={ink} strokeWidth="3" opacity="0.12" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${circumference * dash} ${circumference}`}
        transform={`rotate(-90 ${cx} ${cy})`}
        opacity={o}
      />
    </>
  )
}

/** Left: one long-range statement. Right: the eight life areas as a grid. */
function AnnualVision() {
  return (
    <>
      <Rule x={LEFT.x + 10} y={26} w={70} o={0.4} h={4} />
      <Block x={LEFT.x + 10} y={44} w={118} h={44} o={0.05} />
      <Rule x={LEFT.x + 20} y={58} w={92} o={0.2} />
      <Rule x={LEFT.x + 20} y={70} w={64} o={0.2} />
      {[104, 124, 144, 164].map((y) => (
        <Rule key={y} x={LEFT.x + 10} y={y} w={118} o={0.1} h={2} />
      ))}
      <Rule x={RIGHT.x + 10} y={26} w={54} o={0.4} h={4} />
      {[0, 1, 2, 3].map((row) =>
        [0, 1].map((col) => (
          <g key={`${row}-${col}`}>
            <Block x={RIGHT.x + 10 + col * 62} y={44 + row * 33} w={54} h={26} o={0.06} />
            <Rule x={RIGHT.x + 17 + col * 62} y={54 + row * 33} w={30} o={0.3} h={3} />
          </g>
        )),
      )}
    </>
  )
}

/** Four GROW panels — goal, reality, options, way forward — in CYR language. */
function QuarterlyGrow() {
  const cells = [
    { x: LEFT.x + 10, y: 34, accent: ACCENTS.gold },
    { x: LEFT.x + 76, y: 34, accent: ACCENTS.teal },
    { x: RIGHT.x + 10, y: 34, accent: ACCENTS.blue },
    { x: RIGHT.x + 76, y: 34, accent: ACCENTS.pink },
  ]

  return (
    <>
      <Rule x={LEFT.x + 10} y={20} w={58} o={0.36} h={4} />
      {cells.map((cell, index) => (
        <g key={index}>
          <Block x={cell.x} y={cell.y} w={56} h={128} o={0.05} />
          <Rule x={cell.x + 8} y={cell.y + 12} w={26} color={cell.accent} o={0.6} h={4} />
          {[0, 1, 2, 3, 4].map((line) => (
            <Rule key={line} x={cell.x + 8} y={cell.y + 34 + line * 16} w={line === 4 ? 24 : 40} o={0.14} h={2} />
          ))}
        </g>
      ))}
    </>
  )
}

/** A month grid on the left, the month's goals listed on the right. */
function Monthly() {
  return (
    <>
      <Rule x={LEFT.x + 10} y={22} w={48} o={0.36} h={4} />
      {[0, 1, 2, 3, 4].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <Block
            key={`${row}-${col}`}
            x={LEFT.x + 10 + col * 17}
            y={40 + row * 26}
            w={14}
            h={22}
            o={row === 1 && col === 3 ? 0.18 : 0.05}
            r={2}
          />
        )),
      )}
      <Rule x={RIGHT.x + 10} y={22} w={40} o={0.36} h={4} />
      {[44, 74, 104, 134, 164].map((y, index) => (
        <g key={y}>
          <circle
            cx={RIGHT.x + 16}
            cy={y}
            r={5}
            fill={index < 2 ? ACCENTS.green : 'none'}
            stroke={ink}
            strokeWidth="1"
            opacity={index < 2 ? 0.5 : 0.25}
          />
          <Rule x={RIGHT.x + 30} y={y - 2} w={98 - index * 12} o={0.16} />
        </g>
      ))}
    </>
  )
}

/** Seven day columns on the left; the time-blocked bites on the right. */
function Weekly() {
  return (
    <>
      <Rule x={LEFT.x + 10} y={22} w={44} o={0.36} h={4} />
      {[0, 1, 2, 3, 4, 5, 6].map((col) => (
        <g key={col}>
          <Block x={LEFT.x + 10 + col * 18} y={38} w={15} h={132} o={0.04} r={3} />
          <Rule x={LEFT.x + 12 + col * 18} y={46} w={11} o={0.22} h={2} />
          {col < 5 ? <Block x={LEFT.x + 12 + col * 18} y={62 + col * 8} w={11} h={22} color={ACCENTS.blue} o={0.4} r={2} /> : null}
        </g>
      ))}
      <Rule x={RIGHT.x + 10} y={22} w={56} o={0.36} h={4} />
      {[42, 76, 110, 144].map((y, index) => (
        <g key={y}>
          <Block x={RIGHT.x + 10} y={y} w={118} h={26} o={0.05} />
          <Block x={RIGHT.x + 16} y={y + 7} w={5} h={12} color={index === 0 ? ACCENTS.gold : ACCENTS.blue} o={0.55} r={2} />
          <Rule x={RIGHT.x + 28} y={y + 8} w={72 - index * 8} o={0.18} />
          <Rule x={RIGHT.x + 28} y={y + 17} w={40} o={0.1} h={2} />
        </g>
      ))}
    </>
  )
}

/** The eight-area reflection: rings on the left, notes on the right. */
function Rings() {
  const ringColors = [ACCENTS.blue, ACCENTS.gold, ACCENTS.pink, ACCENTS.teal, ACCENTS.green, ACCENTS.lavender, ACCENTS.blue, ACCENTS.gold]
  const fills = [0.8, 0.55, 0.35, 0.65, 0.45, 0.75, 0.25, 0.6]

  return (
    <>
      <Rule x={LEFT.x + 10} y={20} w={52} o={0.36} h={4} />
      {ringColors.map((color, index) => {
        const col = index % 4
        const row = Math.floor(index / 4)
        return (
          <Ring
            key={index}
            cx={LEFT.x + 27 + col * 32}
            cy={64 + row * 68}
            r={13}
            color={color}
            dash={fills[index]}
          />
        )
      })}
      <Rule x={RIGHT.x + 10} y={20} w={44} o={0.36} h={4} />
      {[42, 62, 82, 102, 122, 142, 162].map((y, index) => (
        <Rule key={y} x={RIGHT.x + 10} y={y} w={index % 3 === 2 ? 74 : 118} o={0.12} h={2} />
      ))}
    </>
  )
}

/** Ruled reflection pages — the quarterly review. */
function Journal() {
  return (
    <>
      <Rule x={LEFT.x + 10} y={22} w={62} o={0.36} h={4} />
      {[44, 62, 80, 98, 116, 134, 152, 170].map((y, index) => (
        <Rule key={y} x={LEFT.x + 10} y={y} w={index === 7 ? 70 : 118} o={0.1} h={2} />
      ))}
      <Block x={RIGHT.x + 10} y={30} w={118} h={52} o={0.05} />
      <Rule x={RIGHT.x + 18} y={42} w={40} color={ACCENTS.lavender} o={0.5} h={4} />
      <Rule x={RIGHT.x + 18} y={58} w={98} o={0.14} h={2} />
      <Rule x={RIGHT.x + 18} y={68} w={72} o={0.14} h={2} />
      {[98, 116, 134, 152, 170].map((y, index) => (
        <Rule key={y} x={RIGHT.x + 10} y={y} w={index === 4 ? 54 : 118} o={0.1} h={2} />
      ))}
    </>
  )
}

/** Four quadrants by urgency and importance, printed across the gutter. */
function Priorities() {
  const quads = [
    { x: LEFT.x + 10, y: 36, accent: ACCENTS.gold },
    { x: LEFT.x + 76, y: 36, accent: ACCENTS.blue },
    { x: LEFT.x + 10, y: 110, accent: ACCENTS.lavender },
    { x: LEFT.x + 76, y: 110, accent: ink },
  ]

  return (
    <>
      <Rule x={LEFT.x + 10} y={22} w={56} o={0.36} h={4} />
      {quads.map((quad, index) => (
        <g key={index}>
          <Block x={quad.x} y={quad.y} w={56} h={62} o={0.05} />
          <Rule x={quad.x + 8} y={quad.y + 10} w={24} color={quad.accent} o={index === 3 ? 0.22 : 0.55} h={4} />
          {[0, 1, 2].map((line) => (
            <Rule key={line} x={quad.x + 8} y={quad.y + 28 + line * 12} w={40 - line * 8} o={0.14} h={2} />
          ))}
        </g>
      ))}
      <Rule x={RIGHT.x + 10} y={22} w={40} o={0.36} h={4} />
      {[42, 66, 90, 114, 138, 162].map((y, index) => (
        <g key={y}>
          <rect
            x={RIGHT.x + 10}
            y={y - 5}
            width={11}
            height={11}
            rx={3}
            fill={index < 2 ? ACCENTS.green : 'none'}
            stroke={ink}
            strokeWidth="1"
            opacity={index < 2 ? 0.5 : 0.24}
          />
          <Rule x={RIGHT.x + 30} y={y - 2} w={96 - index * 10} o={0.16} />
        </g>
      ))}
    </>
  )
}

/** Four overlapping circles — purpose, drawn as regions rather than as a chart. */
function Ikigai() {
  const circles = [
    { cx: 68, cy: 78, color: ACCENTS.gold },
    { cx: 100, cy: 78, color: ACCENTS.teal },
    { cx: 68, cy: 112, color: ACCENTS.pink },
    { cx: 100, cy: 112, color: ACCENTS.blue },
  ]

  return (
    <>
      <Rule x={LEFT.x + 10} y={22} w={46} o={0.36} h={4} />
      {circles.map((circle, index) => (
        <circle
          key={index}
          cx={circle.cx}
          cy={circle.cy}
          r={34}
          fill={circle.color}
          opacity="0.14"
          stroke={circle.color}
          strokeWidth="1"
          strokeOpacity="0.4"
        />
      ))}
      <Rule x={RIGHT.x + 10} y={22} w={58} o={0.36} h={4} />
      {[46, 74, 102, 130, 158].map((y, index) => (
        <g key={y}>
          <Rule x={RIGHT.x + 10} y={y} w={34} color={circles[index % 4].color} o={0.45} h={3} />
          <Rule x={RIGHT.x + 10} y={y + 12} w={index === 4 ? 62 : 118} o={0.12} h={2} />
        </g>
      ))}
    </>
  )
}

const SPREADS: Record<SpreadKind, () => React.ReactElement> = {
  'annual-vision': AnnualVision,
  'quarterly-grow': QuarterlyGrow,
  monthly: Monthly,
  weekly: Weekly,
  rings: Rings,
  journal: Journal,
  priorities: Priorities,
  ikigai: Ikigai,
}

export const SPREAD_LABELS: Record<SpreadKind, string> = {
  'annual-vision':
    'Schematic of the annual vision spread: a long-range statement on the left page, the eight life areas gridded on the right.',
  'quarterly-grow':
    'Schematic of the quarterly GROW spread: four panels running across both pages, one per stage of the framework.',
  monthly: 'Schematic of the monthly spread: a month grid on the left page, that month’s goals listed on the right.',
  weekly:
    'Schematic of the weekly spread: seven day columns on the left page, time-blocked bites listed on the right.',
  rings:
    'Schematic of the reflection spread: eight activity rings at different fill levels on the left page, ruled notes on the right.',
  journal: 'Schematic of the quarterly journal spread: ruled reflection pages with one prompt panel.',
  priorities:
    'Schematic of the priorities spread: four quadrants by urgency and importance on the left page, a checklist on the right.',
  ikigai:
    'Schematic of the purpose spread: four overlapping regions on the left page, prompts for each on the right.',
}

export function SpreadSketch({ kind = 'annual-vision' }: { kind?: SpreadKind }) {
  const Drawing = SPREADS[kind] || AnnualVision

  return (
    <svg className="tb-sketch tb-spread-sketch" viewBox={`0 0 ${W} ${H}`} role="presentation" aria-hidden="true">
      {/* The two pages and the gutter between them. */}
      <rect x={LEFT.x} y={10} width={LEFT.w} height={180} rx={3} fill={ink} opacity="0.03" />
      <rect x={RIGHT.x} y={10} width={RIGHT.w} height={180} rx={3} fill={ink} opacity="0.03" />
      <line x1={160} y1={10} x2={160} y2={190} stroke={ink} strokeWidth="1" opacity="0.14" />
      <Drawing />
    </svg>
  )
}
