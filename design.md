# TimeBite / Creating Your Reality — Design System

The site's single source of truth for colour, type, spacing and component
behaviour. Every value here exists as a CSS custom property in
`src/app/(frontend)/globals.css`; nothing in this document is aspirational.

---

## 0. How it should feel

The site should feel:

- calm
- intimate
- editorial
- lightly futuristic

The site should not feel like:

- a generic SaaS dashboard
- a bright productivity app
- a bubbly social product
- a heavy chrome/brutalist interface

Practically: soft surfaces with restrained pastel accents, separation through
borders and spacing rather than shadows, motion that is subtle and purposeful,
and hierarchy carried by typography and spacing rather than decoration.

> Sections 0 and 9 are carried over from the earlier design system in PR #6.
> Its radius scale (18px cards, 12px compact, 8px controls) is **superseded** —
> the site is now a single 8px everywhere. See section 5.

---

## 1. The idea

Borrowed from the printed CYR planner: **every section owns one colour**. It
announces itself with a solid chip, and washes that colour faintly through its
cards. Colour arrives in bands, never as confetti.

Three rules follow from that:

1. **One accent per section.** Never two. A section with three colours reads as
   a dashboard, not a document.
   *The one exception, and it is narrow:* a section that contains **two product
   layers** — TimeBite and Creating Your Reality — may mark each layer with a
   3px rail in its own hue while the card wash stays the section's single
   accent. `.tb-feature-group`, `.tb-featured` and `.tb-system-column` all do
   this. A rail is a label; it is not a second colour scheme.
2. **Colour lives in large areas, not tiny badges.** A 9% wash across a card is
   worth more than a saturated 12px dot.
3. **Depth comes from elevation, not borders.** Surfaces sit visibly above the
   ground. Hairlines are a supporting detail, never the only separation.

### Why the page was grey before

The old palette put `#0b0b0d` cards on a `#000000` page — a 4% difference. The
eye reads that as one flat sheet regardless of how bright the text is. Raising
text contrast alone did not fix it, because contrast was never the problem;
**elevation** was. The ground moved to `#121216` and surfaces to `#1a1a20`, and
the flatness went away.

---

## 2. Colour tokens

### Dark (default)

| Token | Value | Role |
|---|---|---|
| `--tb-bg` | `#121216` | Page ground. Warm charcoal, never pure black |
| `--tb-surface` | `#1a1a20` | Cards, panels, media frames |
| `--tb-surface-2` | `#212128` | Raised surfaces: window chrome, inputs, toggles |
| `--tb-ink` | `#ffffff` | Primary text. Pure white, ~18:1 |
| `--tb-muted` | `#c6c6cc` | Body copy, nav. ~11.5:1 |
| `--tb-faint` | `#9d9da5` | Captions, metadata. ~7:1 |
| `--tb-line` | `rgba(244,242,238,0.12)` | Visible borders |
| `--tb-line-soft` | `rgba(244,242,238,0.07)` | Section dividers |
| `--tb-on-accent` | `#000000` | Text on a filled accent surface |

### Light (toggle only)

| Token | Value | Role |
|---|---|---|
| `--tb-bg` | `#faf7f2` | Warm paper, never pure white |
| `--tb-surface` | `#ffffff` | Cards |
| `--tb-surface-2` | `#f1ece3` | Raised surfaces |
| `--tb-ink` | `#16161c` | Primary text, ~17:1 |
| `--tb-muted` | `#45454f` | Body copy, ~9.7:1 |
| `--tb-faint` | `#63636e` | Captions, ~6.2:1 |
| `--tb-line` | `rgba(22,22,28,0.16)` | Visible borders |
| `--tb-line-soft` | `rgba(22,22,28,0.1)` | Dividers |
| `--tb-on-accent` | `#ffffff` | Text on a filled accent surface |

### Accents — two families

One colour cannot do both jobs, and trying to make it do both is what produced
gold-on-gold chip text at roughly 1:1 contrast.

**Text accents** (`--tb-{hue}`) — used where the accent *is* type: status
badges, links, accent headings. These darken in light mode, because the dark
pastels fail as text on paper.

| Token | Dark | Light | Used for |
|---|---|---|---|
| `--tb-blue` | `#a9d6e5` | `#1f7396` | Primary action, demo, tour, pricing |
| `--tb-green` | `#b8d8c0` | `#2f7a52` | Available-now status, features, beta |
| `--tb-gold` | `#ead9ab` | `#8a6d1f` | Beta status, how-it-works, platforms, FAQ |
| `--tb-pink` | `#e8bcc8` | `#b34a72` | Workspace, physical products |
| `--tb-teal` | `#a5d5cf` | `#1c7f79` | Scale story, agents |
| `--tb-lavender` | `#c9bce8` | `#5d4c9a` | Planned status, About, CYR philosophy |

**Chip accents** (`--tb-chip-{hue}`) — used where the accent is a *fill* behind
dark text. **Identical in both themes**, always paired with `--tb-on-chip`
(`#16161c`). This is the printed-planner look: a soft chip with dark ink, on
white or on charcoal.

| Token | Both themes | Contrast with `--tb-on-chip` |
|---|---|---|
| `--tb-chip-blue` | `#a9d6e5` | 11.5:1 |
| `--tb-chip-green` | `#b8d8c0` | 11.7:1 |
| `--tb-chip-gold` | `#ead9ab` | 12.9:1 |
| `--tb-chip-pink` | `#e8bcc8` | 11.4:1 |
| `--tb-chip-teal` | `#a5d5cf` | 11.2:1 |
| `--tb-chip-lavender` | `#c9bce8` | 10.9:1 |

⚠️ **Never fill a chip with a text accent.** In light mode that paints a dark
chip, and the dark ink on top disappears.

### Section assignments

Each section sets **two** variables: `--tb-section-accent` (card wash, accent
text — follows the theme) and `--tb-section-chip` (eyebrow fill — always
pastel).

```css
#how-it-works  gold        #workspace  pink
#demo          blue        #agents     teal
#scale         teal        #platforms  gold
#features      green       #pricing    blue
#tour          blue        #planner    pink
#about         lavender    #beta       green
#roadmap       lavender    #faq        gold

/* Commerce */
#shop-hero     blue        #bundle             blue
#featured      teal        #compare            blue
#system        teal        #methodology        gold
#planner-campaign  pink    #planner-interest   pink
```

Blue is software and pricing, pink is the physical product, gold is the
methodology, and teal is the two of them read as one system.

Adding a section? Give it a pair from the six hues above, and **add both
variables**. A section with only `--tb-section-accent` falls back to a gold
chip, which is how `#about` and `#roadmap` were silently wrong. Do not
introduce a seventh colour.

### Card tint

`--tb-card-tint` controls how much of the section accent washes into card
surfaces: **9% in dark, 14% in light**. Light tints harder because a 9% wash
over white is invisible.

```css
background: color-mix(in srgb, var(--tb-section-accent) var(--tb-card-tint), var(--tb-surface));
```

---

## 3. Status system

Five values, one vocabulary, rendered by one component (`StatusBadge`).
**Availability is never written into copy** — it is a field, so shipping
something is a re-tag, not a rewrite.

| Status | Colour | Means |
|---|---|---|
| `available` | green | Shipped |
| `beta` | gold | Usable, in the private beta |
| `in-development` | blue | Being built |
| `planned` | lavender | Committed, not started |
| `exploring` | faint | Looking at it, nothing more |

Physical products use a separate lifecycle: `concept` → `sample` → `preorder`
→ `available` → `sold-out`. Nothing may say "available" until it ships.

---

## 4. Type

| | Family | Weight | Size |
|---|---|---|---|
| Display (h1–h3) | `--font-display` | 300 | `clamp(1.9rem, 3.8vw, 4.6rem)` |
| Body | `--font-body` | 400 | `0.92rem`–`1.15rem` |
| Eyebrow / chip | `--font-body` | 400 | `0.78rem`, `0.2em` tracking, uppercase |
| Caption | `--font-body` | 400 | `0.78rem`–`0.87rem` |

**Two rules that are not negotiable:**

- **Nothing below `0.72rem`.** Small type on a dark ground is where this design
  fails first.
- **Body copy is weight 400, not 300.** Light weights look elegant at display
  sizes and turn to mush at 12px. Headings keep 300.

---

## 5. Shape, space, motion

**Radius: `8px`. Everywhere.** Buttons, cards, badges, inputs, media frames,
toggles. There are no pills. The only exceptions are genuine circles — status
dots, window-chrome dots, list bullets — which stay at `50%`.

**No gradients. No glows. No coloured shadows.** Flat colour only. The single
shadow in the system is on the theme toggle, and it is neutral.

**Spacing** rides on `clamp()` so it compresses on small screens:

| Use | Value |
|---|---|
| Section padding | `clamp(72px, 10vw, 130px)` |
| Card padding | `clamp(24px, 2.6vw, 32px)` |
| Grid gap | `14px` |
| Shell width | `min(1120px, 100% - 40px)` |

**Breakpoints:** `1180px` (shell padding), `1024px` (3-up → 2-up), `920px`
(everything → 1 column), `620px` (mobile detail).

**Motion** is `0.15s ease` on colour and border only. `prefers-reduced-motion`
collapses all transitions to `0.01ms`.

---

## 6. Figma setup

Create these as **variables** (not styles) so the two modes switch together.

**Collection: `theme`** with modes `Dark` and `Light`:

| Variable | Dark | Light |
|---|---|---|
| `bg` | `#121216` | `#FAF7F2` |
| `surface` | `#1A1A20` | `#FFFFFF` |
| `surface-2` | `#212128` | `#F1ECE3` |
| `ink` | `#FFFFFF` | `#16161C` |
| `muted` | `#C6C6CC` | `#45454F` |
| `faint` | `#9D9DA5` | `#63636E` |
| `on-accent` | `#000000` | `#FFFFFF` |
| `blue` | `#A9D6E5` | `#1F7396` |
| `green` | `#B8D8C0` | `#2F7A52` |
| `gold` | `#EAD9AB` | `#8A6D1F` |
| `pink` | `#E8BCC8` | `#B34A72` |
| `teal` | `#A5D5CF` | `#1C7F79` |
| `lavender` | `#C9BCE8` | `#5D4C9A` |

**Collection: `chip`** — one mode only, identical in both themes. These are the
fills behind dark text: `blue #A9D6E5`, `green #B8D8C0`, `gold #EAD9AB`,
`pink #E8BCC8`, `teal #A5D5CF`, `lavender #C9BCE8`, plus `on-chip #16161C`.

Keeping chips in a separate single-mode collection is what stops a designer
binding a chip fill to a theme variable and reproducing the unreadable-text bug
in Figma.

**Collection: `radius`** — single value `8`, applied to every rectangle.

**Frames to build:** Desktop `1440`, Laptop `1280`, Tablet `768`, Mobile `375`.
Content column is `1120` max with `20px` side padding.

⚠️ The existing CYR Figma file is dark-only with a magenta CYR-Studio colourway.
The palette above replaces lavender-heavy usage with **pink and teal** per the
newer direction. Reconcile the file before treating it as the reference.

---

## 7. Canva setup

Canva has no modes, so build **two brand kits**.

**Brand kit — TimeBite Dark**
Background `#121216` · Text `#FFFFFF` · Secondary `#C6C6CC`
Accents `#A9D6E5` `#B8D8C0` `#EAD9AB` `#E8BCC8` `#A5D5CF` `#C9BCE8`

**Brand kit — TimeBite Light**
Background `#FAF7F2` · Text `#16161C` · Secondary `#45454F`
Accents `#1F7396` `#2F7A52` `#8A6D1F` `#B34A72` `#1C7F79` `#5D4C9A`

**Both kits — chip fills** (same in either kit, always with `#16161C` text):
`#A9D6E5` `#B8D8C0` `#EAD9AB` `#E8BCC8` `#A5D5CF` `#C9BCE8`

Corner radius `8px` on every element. No gradient fills, no shadows, no glows.

---

## 8. Media

Full specification: `docs/MediaSlots.md`.

Every screenshot is **16:9 → cropped to 16:10**, dark theme, exported at 2×.
Hero is `2880 × 1800`; tour rows are `2400 × 1500`; the demo video is
`2560 × 1600`, 45–60s, silent.

Empty slots draw a **schematic** — an abstract diagram of the layout that
belongs there, never a stock screenshot. This is deliberate: it keeps
unfinished sections looking designed without implying a screen exists.

---

## 9. Accessibility

Non-negotiable, and all currently passing:

- Every text colour meets **WCAG AA**; secondary text is measured, not guessed
- Nothing below `0.72rem`
- Semantic heading order, one `h1` per page
- `prefers-reduced-motion` honoured
- Visible focus rings on every interactive element, `2px` accent outline
- Video has visible controls, `preload="metadata"`, and never autoplays
- Every media slot has alt text or an `aria-label`
- Status meaning is carried by **words**, not colour alone

---

## 9. Keeping this file honest

Carried over from PR #6, and worth keeping:

- Update this file whenever a new reusable visual pattern is introduced.
- If a token changes, change the CSS and this document **in the same commit**.
- If a component needs a different radius, explain why in a comment.
- If the UI starts drifting toward generic SaaS styling, simplify before adding
  more ornament.

The reason this matters: every value in section 2 is a measured contrast ratio,
not a preference. A token changed without updating the table turns this document
from a reference into a rumour.

---

## 9b. Commerce patterns

Three patterns introduced by the storefront. They belong here because each one
is reusable and each one encodes a rule that is easy to break by accident.

### The asymmetric product grid

Three columns; the first panel spans two, the second spans one, and
`grid-auto-flow: row dense` lets a fourth panel back-fill the column a third
leaves empty so pairs alternate sides down the page.

The asymmetry is the message: an equal-card grid says two products are
equivalent choices, and they are not. **Array order is the hierarchy** — the
product that is actually launching goes first, and that survives into the
single-column mobile layout as source order.

Both panels put the object above the copy, at a fixed `aspect-ratio` on the
media stage. Without that ratio the taller panel dictates the row and its
neighbour fills with dead space; with it, a wide panel gets a big picture and
short lines while a narrow one gets a smaller picture and longer lines, and
the two land at nearly the same height. The CTA carries `margin-top: auto`, so
whatever height a panel inherits collects above the button rather than below
it, and both buttons align.

Collapses to one full-width column at `920px`.

### The concept object

A physical product that has not been manufactured is drawn in CSS, never
rendered photorealistically, and carries a **"Concept" flag as part of the
drawing**. The same reasoning as the media schematics in section 8: a
placeholder must be obviously a placeholder, and on a page with a price beside
it a convincing render is a claim rather than a stand-in.

Two rules that are easy to get wrong:

- **The colourways are not theme tokens.** A concept object depicts a physical
  thing — a black book is black on a white page too. Only the frame around it
  follows the theme.
- **Foil is flat colour.** A metallic finish is a gradient, and gradients are
  ruled out. Name the finish in the caption; draw it in flat brand gold or flat
  silver.
- The mock must stay a **positioned element**. Its spine and flag are absolutely
  positioned children, so `position: static` sends both to the nearest
  positioned ancestor and paints a stray band across the page.

Type inside the object scales with `cqw` under `container-type: inline-size`,
held above the sheet's floor with `max(0.72rem, …)` — the minimum type size
applies to drawn covers too.

### Interior-spread schematics

`SpreadSketch` is a sibling of `LayoutSketch`, kept separate because it draws
paper rather than screens. Every spread is a **two-page opening with a visible
gutter**, which is what stops it reading as a screenshot. Abstract throughout:
no invented dates, no fake handwriting, no legible copy that could pass for
final artwork.

### Comparison tables

A comparison stays a real `<table>` at every width. Restyling table elements to
`display: block` on small screens drops the implicit table roles in several
browsers and a screen-reader user loses the column headers. Cap the schema at
**three columns**, use `table-layout: fixed`, and the grid fits inside 375px
with nothing to scroll sideways. Status badges inside cells need
`white-space: normal` — the shared badge is `nowrap`, which is right for a card
and 40px too wide for a table cell.

---

## 10. What not to do

- Do not add a seventh accent colour
- Do not fill a chip with a text accent, or set `color` on `.tb-eyebrow`
  anywhere below the section-chip rule — both produce invisible chip text
- Do not add a section without setting **both** `--tb-section-accent` and
  `--tb-section-chip`
- Do not use two accents in one section
- Do not reintroduce pill radii
- Do not add gradients, glows, or coloured shadows
- Do not write availability into copy — use the `status` field
- Do not put a URL in a component — CTAs come from Payload
- Do not drop body copy below weight 400 or `0.72rem`
- Do not add a `prefers-color-scheme` block without deciding, deliberately,
  that light should greet half your visitors
- Do not render a concept product photorealistically, or drop its "Concept" flag
- Do not bind a concept object's cover colours to theme tokens
- Do not put a price on a product whose price is undecided — render the note
  saying so instead
- Do not let a comparison table scroll sideways, or restyle it out of being a
  table
