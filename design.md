# Design System

This is the living style guide for the Cyra / TimeBite site.

Keep it practical and close to the code. When the visual system changes, update this file in the same commit.

## Design Principles

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

## Visual Direction

- Base the interface on soft black surfaces with restrained pastel accents.
- Use borders and spacing for separation instead of shadows.
- Keep motion subtle and purposeful.
- Prefer strong hierarchy through typography and spacing rather than decoration.

## Core Tokens

All tokens live in `src/app/(frontend)/globals.css`.

- Background: `--tb-bg`
- Surface: `--tb-surface`
- Surface 2: `--tb-surface-2`
- Ink: `--tb-ink`
- Muted text: `--tb-muted`
- Faint text: `--tb-faint`
- Line: `--tb-line`
- Soft line: `--tb-line-soft`
- Accent blue: `--tb-blue`
- Accent green: `--tb-green`
- Accent gold: `--tb-gold`
- Accent lavender: `--tb-lavender`

## Radius System

The UI should read as squared-off and structured, not pill-heavy.

- `--tb-radius`: 18px for cards, panels, and larger containers
- `--tb-radius-sm`: 12px for compact surfaces
- 8px radius: buttons, chips, tag-like controls, and compact CTAs

Use 8px whenever an element behaves like a control or label, even if it looks pill-adjacent in the layout.

## Buttons

Primary buttons:

- Use `.tb-button` as the default CTA pattern.
- Keep the height at 50px, or 40px for compact versions.
- Keep the fill solid and the text dark on light accent backgrounds.
- Avoid shape animation or overly soft rounded corners.

Secondary buttons:

- Use transparent fill with a visible border.
- Keep the same radius as the primary button.
- Limit hover feedback to border color and opacity changes.

Disabled / passive actions:

- Reduce contrast.
- Keep spacing and radius consistent.
- Do not invent a third button shape unless it is truly a different control.

## Chips And Tags

Use 8px radius for:

- status chips
- roadmap tags
- CTA-adjacent labels
- metadata pills
- small surface elements that read like controls

These elements should feel crisp and editorial, not decorative or toy-like.

## Layout And Surfaces

- Maintain generous vertical rhythm between sections.
- Use consistent card padding across the site.
- Prefer one strong surface hierarchy instead of many competing layers.
- Keep container edges clear with subtle borders.
- Keep content centered and breathable on large screens.

## Typography

- Headlines: display font, light weight, tight tracking
- Body: body font, lighter weight, high line-height
- Labels and meta text: slightly wider letter spacing, but keep it restrained
- Avoid adding extra font weights unless the hierarchy truly needs them

## Implementation Notes

- Update this file whenever a new reusable visual pattern is introduced.
- If a token changes, update the CSS and this document together.
- If a component needs a different radius, explain why in a comment or note.
- If the UI starts drifting toward generic SaaS styling, simplify it before adding more ornament.

## Current Defaults

- Buttons and small chips are 8px rounded.
- Cards and panels stay on the existing token-based radius scale.
- The black background and pastel accents remain the baseline brand language.
