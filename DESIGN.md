# Adam the goat: implemented design

## Overview

Adam is a fictional digital goat for visitors who want a brief, playful interaction. The implemented direction pairs a photographic goat cutout with a warm orange scene, large Fraunces headings, cream space, and quiet forest-green controls. The visual anchor is Adam’s portrait inside a pale circular backdrop. The postcard reuses that composition.

This is an inferred direction for the brief “Adam the goat,” not a supplied brand system. The desktop hero is a two-column composition; the phone layout puts the name, portrait, and carrot action in one compact sequence. Supporting content has more breathing room and fewer visual layers.

Canonical implementation: `src/styles.css`, `src/App.tsx`, and `src/Icons.tsx`. Browser findings and limitations are in `artifacts/validation.md`.

## Colors

The source uses hex primitives and semantic aliases in `src/styles.css:17`. Components use semantic tokens. There is one light theme; no dark-mode variant is implemented.

| Semantic token | Value / primitive | Implemented role |
| --- | --- | --- |
| `--color-page` | `#f6f4e9` / `--cream-50` | Page, postcard paper, inverse button label |
| `--color-text` | `#273b2b` / `--forest-900` | Primary text, mark, icons |
| `--color-text-secondary` | `#455340` / `--forest-700` | Supporting paragraphs |
| `--color-border` | `#dbd7c4` / `--cream-200` | Questions and footer separators |
| `--color-hero` | `#f28b56` / `--orange-400` | Hero scene and stamp background |
| `--color-primary` | `#273b2b` | Primary action fill |
| `--color-primary-hover` | `#455340` | Primary hover and busy fill |
| `--color-on-primary` | `#f6f4e9` | Filled-button text |
| `--color-keepsake` | `#e6e9d6` / `--sage-100` | Keepsake section |
| `--color-ground` | `#273b2b`, rendered at 14% opacity | Decorative oval under Adam |
| `--color-focus` | `#273b2b` | Keyboard outline |

Measured solid-color pairs: text/page 10.90:1, secondary/page 7.42:1, text/orange 4.93:1, inverse/primary 10.90:1, inverse/hover 7.42:1, text/sage 9.73:1, and secondary/sage 6.63:1. Values and resolved browser tokens are recorded in `artifacts/browser-review.json`. These measurements do not establish every pixel behind image-adjacent decorative captions.

The circle uses page color at 80% opacity. The pale title dot, ground, tape, and icon flourishes are decorative. Text, counts, and labels carry state independently of color. Filled green emphasizes the carrot action; the download uses an outline.

## Typography

Both fonts are local WOFF2 files under `public/fonts/`, with `font-display: swap`. Their loaded status was checked in Chromium.

- `--font-display`: **Fraunces**, Georgia, serif; the provided face is weight 700, normal style. Used for h1, h2, and wordmarks.
- `--font-body`: **DM Sans**, Arial, sans-serif; the supplied variable face declares 400–700. Actual interface weights are 400, 600, and 700.
- No italic face or monospace prose is used. Root text is 16px at default settings, with root font smoothing.

| Token | Source value | Role |
| --- | --- | --- |
| `--text-small` | `.875rem` | 14px navigation, hints, captions, counts |
| `--text-body` | `1rem` | 16px paragraphs, buttons, questions |
| `--text-lead` | `1.25rem` | 20px h3, desktop hero description, farewell |
| `--text-title` | `1.75rem` | 28px wordmarks |
| `--text-section` | `clamp(2.25rem, 4.4vw, 3.5rem)` | 36–56px h2; set to 36px on phones |
| `--text-display` | `clamp(3.5rem, 8.6vw, 7.75rem)` | 56–124px h1; 62px on phones, 56px at ≤352px |

The probe observed six total sizes per width, two families, and three weights. H1 uses `.98` line-height and `-.055em` tracking; h2 `1.08` and `-.04em`; h3 `1.3` and `-.025em`. Body copy uses `1.6`, and the desktop hero description `1.5`. Headings balance, paragraphs use pretty wrapping, and long text can wrap anywhere rather than escape a grid. Paragraph measures are generally 21–28rem; open question answers cap at 50ch. Carrot counts use tabular numerals.

At 200% text size, content and controls grow vertically and long headings wrap. Fixed physical gutters and illustration geometry keep reading space available. The nonessential mobile stamp is part of the illustration and retains its 14px art label.

## Layout

Spacing tokens are `--space-1` through `--space-9`: 4, 8, 12, 16, 24, 32, 48, 64, and 96px at the default root size. They group text and controls, separate section introductions, and create the page rhythm. Illustration geometry and a few optical offsets use local values.

- `.page-width`: maximum 90rem with 32px outer gutters on wide screens; hero, header, and keepsake backgrounds share this edge.
- `.content-width`: maximum 76rem with 64px outer gutters on wide screens; text sections and footer share this edge.
- `.hero-inner`: `.95fr 1.05fr` grid, with the scene spanning the intro/action rows. Major padding is 4.5rem. Grid children allow shrinking with `min-inline-size: 0`.
- `.section-heading`: two equal columns. `.personality-grid`: three columns without separate card surfaces.
- `.postcard-inner`: `1.1fr 1fr`. The tilted paper and the download copy have distinct spaces.
- `.questions-section`: heading alongside a native disclosure list.

| Breakpoint | Implemented adaptation |
| --- | --- |
| ≤68rem / 1088px | Smaller hero/keepsake padding and gaps; reduced scene size |
| ≤51rem / 816px | 16px page gutters, 32px text gutters; extra nav links and scene caption hidden; portrait limited to 112%; columns retained |
| ≤39rem / 624px | One-column hero, introduction, traits, postcard, and questions; name/portrait/action sequence; only “Meet Adam” remains in the header navigation |
| ≤22rem / 352px | 56px display text, 16px hero inset, 24px text gutters, smaller keepsake inset |

On phones, page gutters are fixed at 16px, content gutters at 32px (24px at the smallest breakpoint), and the hero’s control inset at 24px (16px at the smallest breakpoint). These values intentionally do not double with text size. The scene uses a 1.4 aspect ratio. The carrot action fills its inset width, and the header can wrap. Trait icons use a 40px leading column. Feedback reserves 5rem, keeping the scene and neighboring sections stable through all five responses at 320px.

No sticky controls, horizontal carousels, custom scrolling panes, or client routes are present. Anchored sections have a 1.5rem scroll margin. Horizontal overflow was checked at 320, 390, 624, 720, 816, 1088, and 1440px. At 390 × 844, the primary button ends at approximately y=599px.

## Elevation & Depth

Most surfaces are flat. The keepsake paper alone has a `0 8px 16px rgb(39 59 43 / 9%)` shadow and a -6° rotation. Its image has a 1px black 10%-opacity inset outline. Tape is cream at 65% opacity. Questions use structural borders; they have no shadows. The hero’s circle and low-opacity ground place the goat without a framed photo card.

Scene art is layered locally: portrait at z-index 1, stamp/reaction at 2, temporary carrot at 3. Copy remains in normal grid flow. The skip link alone uses a fixed, high layer while focused.

## Shapes

`--radius-small` is `.75rem` for the skip link; `--radius-large` is `1.5rem` for the hero and keepsake; `--radius-pill` is `999px` for buttons. Circular forms belong to the illustration and dashed stamp. The postcard remains rectangular paper. Text is not clipped with hidden overflow or ellipses.

## Components

These are page patterns in `src/App.tsx`, not an exported component library.

| Pattern | Reuse point and behavior |
| --- | --- |
| Wordmark | `.wordmark` with `GoatMark`; home anchor, 44px minimum height, no surrounding pill |
| Primary action | `.button.button-primary.feed-button`; real button, idle/busy/success flow; `aria-busy` and guarded `aria-disabled` retain keyboard focus while the 750ms snack completes |
| Feedback | `.feeding-result`, `.carrot-count`, `.feed-status`; ephemeral count plus a stable polite status region; no shared visitor totals or persisted score |
| Secondary action | `.button.button-secondary`; outlined download anchor, real PNG file and download filename, nearby status text |
| Trait item | `.personality-item`; icon, h3, and paragraph; desktop columns become icon-led rows on phones |
| Question | Native `<details><summary>`; Enter/Space activation, plus rotates into a close shape, content grows in flow |
| Return action | `.text-button`; scrolls to Adam and returns focus to the carrot button |
| Icons | `Icon` in `src/Icons.tsx`; named SVGs use `currentColor`, 1.5px base stroke, 2px in buttons; decorative SVGs are hidden from assistive technology |

All controls use native elements. The skip link targets the focusable main landmark. Focus is a 2px outline, offset 5px. Forced-colors mode uses the system highlight and button border; a focused state was inspected in emulation. Hover rules are gated to hover-capable pointers.

Motion is opt-in through `prefers-reduced-motion: no-preference`. Buttons transition named properties over 150ms with `cubic-bezier(0.2, 0, 0, 1)` and press to `.96` scale. Feeding uses three 250ms small rotations plus one 750ms carrot sequence. Reduced motion removes these animations and smooth scrolling, while the text, count, and heart still report the result. There is no autoplay or endless motion.

## Do’s and don’ts

- Start another section with the existing width helpers, heading roles, and spacing tokens. Keep supporting text aligned to the same inset.
- Reuse the primary action for the central task and the outline/text styles for secondary actions. Preserve visible labels, focus outlines, and native keyboard behavior.
- Keep Adam’s image, postcard, and fonts local. Preserve the relative Vite base and hash navigation when rebuilding the static export.
- Keep new copy specific and brief; put instructions beside the affected control. Preserve the fictional/virtual framing and visit-local count semantics.
- Do not add tracked uppercase kickers, another font scale, nested card surfaces, an extra competing accent, or motion without a static cue.
- To extend the page, add an anchored section inside `<main>`, choose `.page-width` for a broad tonal surface or `.content-width` for text, reuse h2/body roles, and check 320px reflow and keyboard access.

Design knowledge adapted from Jakub Krehel’s Better Interface (MIT); documentation method adapted from Paul Bakaus’s Impeccable (Apache-2.0). Source records and license notices are retained in `artifacts/licenses/` and `artifacts/asset-notes.md`.
