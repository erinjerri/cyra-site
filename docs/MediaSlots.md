# Media Slots

Every screenshot and video the homepage can show, where it goes, and what to capture.

Until a slot is filled it renders a **schematic** — an abstract line drawing of that screen's layout,
chosen per slot via the block's `sketch` field. Schematics are deliberately not screenshots: no invented
data, no fake UI copy, nothing mistakable for the product. The page reads as designed while it waits, and
each drawing disappears the moment a real capture is uploaded in `/admin`.

## How to fill a slot

1. Upload the file to **Media** in `/admin`, filling in the `alt` field.
2. Open **Pages → TimeBite → layout**, find the block named below, and set its `image` (and `video`, where
   listed).
3. Set `imageAlt` on the block if the media item's own `alt` isn't right in that context.

No deploy is needed for any of this. `assetUrl` / `videoUrl` accept a public URL instead of an upload if
you'd rather serve from R2 directly.

## Capture settings (all macOS slots)

| Setting | Value |
|---|---|
| Aspect ratio | **16:10** — the frame is fixed at `16 / 10` and crops from the top, so anything else loses its bottom edge |
| Window width | Capture at 1440pt or wider so text stays legible when scaled down |
| Scale | 2× (Retina). Export at the pixel dimensions below, which are already 2× |
| Format | PNG for stills, `.mp4` (H.264) for clips |
| Chrome | Capture the app content only — the site draws its own macOS window frame around it |
| Content | Real, plausible data. No lorem ipsum, no `Test goal 1`, no visible personal information |
| Theme | Dark. The site is a black ground and light screenshots punch a hole in the page |

## The slots

### 1. Hero — the product shot

Everything above the fold rests on this one. It renders full-shell width (~1120px on a 13" MacBook), so it
is the most detail-critical image on the site.

| | |
|---|---|
| Block | `heroBlock` |
| Filename | `hero-macos-workspace.png` |
| Dimensions | **2880 × 1800** |
| Shows | A goal with milestones beside the week planned into calendar blocks — the whole proposition in one frame |
| Schematic until filled | `workspace` |

### 2. Product demo — the 45–60 second walkthrough

| | |
|---|---|
| Block | `productDemoBlock` |
| Poster | `demo-poster.png` — **2560 × 1600** |
| Video | `timebite-demo.mp4` — **2560 × 1600**, H.264, 30fps, target under 25 MB |
| Length | 45–60 seconds |
| Audio | None, or a silent track. The player never autoplays, and the caption says the clip is silent |
| Shows | Goal → actions → sorted → dragged onto Wednesday → completed → progress → zoomed out |

Keep the `transcript` field on the block in step with the final edit — it is the accessible equivalent for
anyone who cannot or would rather not watch, and it currently describes the cut listed above.

### 3. The tour — eight steps

All eight live on the `showcaseBlock` rows, in this order. They render at roughly 615px wide on a 13"
MacBook, so **2400 × 1500** is comfortably enough and keeps the page weight sane.

| # | Row title | Filename | Dimensions | Shows |
|---|---|---|---|---|
| 1 | Define a goal | `tour-01-define-goal.png` | 2400 × 1500 | A goal with its milestones listed beneath it |
| 2 | Break it into actions | `tour-02-break-into-actions.png` | 2400 × 1500 | A milestone expanded into individual actions |
| 3 | Organize what actually matters | `tour-03-eisenhower.png` | 2400 × 1500 | The Eisenhower matrix with actions in all four quadrants |
| 4 | Drag an action into your calendar | `tour-04-drag-to-calendar.mp4` **+** `tour-04-drag-to-calendar.png` | 2400 × 1500 | **Video.** 6–10s silent clip of an action being dragged onto Wednesday morning and becoming a block. The PNG is its poster frame |
| 5 | Work it, and mark it done | `tour-05-board-complete.png` | 2400 × 1500 | The Kanban board with a card in the done column |
| 6 | Review the habits underneath | `tour-06-habits.png` | 2400 × 1500 | The habit grid across several weeks, including missed days |
| 7 | See whether you are moving | `tour-07-progress.png` | 2400 × 1500 | Progress chart, completed tracking against planned |
| 8 | Zoom out to the year | `tour-08-timeline.png` | 2400 × 1500 | Long-range timeline with several goals spanning months |

Rows 7 and 8 are tagged **In development**. Leave them on schematics until those screens are real —
a mocked-up chart on a marketing page is a promise you have to keep.

### 4. Loop diagram — optional

| | |
|---|---|
| Block | `timelineBlock` |
| Filename | `loop-rings.png` |
| Dimensions | **720 × 720** (square) |
| Shows | The in-app rings, if you want them instead of the drawn loop |

This slot has a real fallback rather than a schematic: the built-in `TimeLoop` SVG, which is theme-aware and
weightless. Only fill it if an app screenshot genuinely says more than the diagram does.

## Slots that intentionally have no media

- **Adaptive workspace** — the tiles are live schematics that rearrange as modules are toggled. A screenshot
  would defeat the interaction.
- **Agents** — nothing has shipped. Illustrating an unbuilt feature is the exact failure mode the status
  system exists to prevent.
- **Platform cards, pricing, FAQ** — text by design.
- **Paper planner photography** — no slot on the page today. The analog lane in pricing is text-only; add a
  `showcaseBlock` with a single row if product photography arrives.

## Checklist before uploading

- [ ] 16:10, exported at 2×
- [ ] Dark theme
- [ ] No personal data, no placeholder text, no notification badges from other apps
- [ ] `alt` filled in on the Media item
- [ ] Under ~800 KB per PNG after compression (run them through ImageOptim or similar)
