# Worker validation and Better Interface review

Date: 2026-10-18. Status: **Complete for the stated scope, with the browser/platform limitations below.** These results were produced by the worker, not independently certified.

| Area | Final result |
| --- | --- |
| Brief requirements | 7 addressed; 0 missing repository deliverables; 0 faked features |
| Broken primary interactions observed | 0 after fixes |
| Product and action on first 390px screen | Yes, measured and visually inspected at 390 × 844 |
| Production build / typecheck | Passed / passed |
| Useful interaction validation | 39 assertions passed in Chromium |
| Pinned taste@1 | 16/16 passed, offline |
| Automated accessibility | axe-core 4.14.0: 0 violations; 23 passes; 40 inapplicable; 0 incomplete |
| Outstanding required copy fixes | 0 |
| Share card | Local 1200 × 630 PNG and required metadata present |

## Scope and assumptions

The brief names “Adam the goat” without supplying a biography, organization, contact, real animal, or brand assets. The implementation therefore presents an explicitly fictional digital goat. Its one-page flows are virtual feeding, section navigation, a postcard download, native question disclosures, and returning to the feeding action. No external data, accounts, payment, wallet, real feeding, shared counter, or backend is implied. Carrots are in-memory state for the visit and reset on reload.

Visual idea: a friendly goat cutout on an orange field, with oversized warm serif type and a local postcard that repeats that composition.

The supplied Better Interface contents/workflow and core principles of all six domains were read before implementation. Relevant focus, semantics, motion, responsive layout, and documentation guidance informed the build. The pinned design-critic thresholds and wallet-connectors reference were also read; wallet functionality is not applicable to this ordinary website.

## Brief requirement coverage

| Requirement | Implementation / evidence |
| --- | --- |
| “usable website … working primary interactions and responsive layouts” | Working carrot action, real download, native questions, hash navigation; 39 Chromium assertions; seven widths checked |
| “dist/index.html and its assets … alongside the source and lockfile … relative asset URLs” | Complete `dist/`, React/TypeScript source, `package.json`, `package-lock.json`; Vite `base: './'`; successful `/preview/` subpath loading |
| “production build, typecheck and useful interaction validation … actual results and limitations” | Commands and results below; machine-readable results included |
| “Better Interface … six domains … findings and limitations” | Consolidated six-domain review and fixed findings below |
| “first screen at 390 … product and … main action … title, favicon, description, og:title and og:image” | `screenshots/mobile-390.webp`, measured button bottom y≈599px; metadata in `index.html`; share check passed |
| “DESIGN.md … implemented tokens, typography, components and responsive behavior” | Root `DESIGN.md`, extracted from the final source after corrections |
| “README … install, preview and rebuild” | Root `README.md`, with install, development, production preview, rebuild, validation and asset maintenance commands |

The source and complete export are present in the submission tree. Git capture/commit and hosting are handled by the contributor network; no Git metadata or publishing command was modified or used by this work.

## Commands and actual results

Dependencies and browser binaries were installed outside the repository. The worker copied the allowed source/configuration into a disposable build directory, ran npm there, and copied the production export back. Interaction validation then targeted the delivered `dist/`, not the development server. Paths below are normalized to avoid embedding machine-specific workspace names.

| Command / action | Actual result |
| --- | --- |
| `npm install` in the disposable build directory | Passed; lockfile retained in repository |
| `npm ci` in that directory, using the retained lockfile | Exit 0; clean install succeeded |
| `node scripts/generate-postcard.mjs` | Passed; real 1200 × 630 PNG created from local inputs |
| `npm run typecheck` (`tsc --noEmit`) after the last source change | Exit 0 |
| `npm run build` after the last source change | Exit 0; Vite 8.3.4, 17 modules, complete static export |
| `npm run validate -- --dir <repository>/dist --out <repository>/test/scratch/interactions` | Exit 0; 39 assertions passed in Chromium, WebKit explicitly reported unavailable |
| `node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste --offline` | Exit 0; 16/16 checks passed; explicit external Playwright module and browser path supplied |
| Separate bounded Playwright review of final export | Screenshots, measured mobile bounds, loaded fonts, settled hover, pending/success, open questions, forced-colors keyboard focus, and seven solid contrast pairs captured |

Chromium tested 320, 390, 624, 720, 816, 1088, and 1440 CSS-pixel widths. No horizontal overflow was detected. The first screen at 390 × 844 contains the full portrait bounds (approximately y=291–541) and the 310 × 56px primary button (approximately y=543–599). The final mobile screenshot was viewed, as were desktop, focus, intermediate-width, enlarged-text and expanded-question states.

The automated interaction walk covers initial zero, local font loading, skip link and main focus, tab order to the action, visible keyboard focus, Space/Enter activation, pending state, 20 rapid repeat activations guarded into one carrot, success announcement, focus retention, pluralization, all five response variants, stable hero height at 320px, navigation at a subpath, every question opened and closed with the keyboard, real PNG signature and filename on download, focus return, reload reset, reduced motion, 200% root text enlargement, and console/resource/external-request checks. No script, console, missing-resource, or external runtime request failures were observed.

The validation script owns and closes a foreground preview server. The probe also owns its own bounded preview. No background application server is left running.

## Better Interface domain coverage

| Domain | Coverage and evidence | Limits / inapplicable checks |
| --- | --- | --- |
| Accessibility — Checked | Native links/buttons/details; one main and h1; skip link; informative portrait alt and hidden decorative SVGs; guarded busy button; stable polite status; keyboard feeding/disclosures/focus return; viewed focus and forced-colors screenshots; axe scan with zero violations | Native screen-reader session and physical touch hardware not verified. Forms, validation errors, modal focus traps, and destructive actions are not applicable |
| Layout — Checked | Source order and logical properties reviewed; responsive grids and explicit mobile gutters; seven widths checked; actual mobile/desktop screenshots; no overflow; 200% text reflow; primary task inside first mobile screen | Browser-native 200% zoom and a translated/RTL version not verified. Only English is implemented |
| Writing — Checked | Three-word product heading plus plain digital-goat description; verb-first actions; instructions beside the carrot action; fictional framing; visit-local count explained; source labels matched to handlers; slogan stack reduced | No service-error or form-error flow exists. Requester-specific facts were not invented |
| Typography — Checked | Six-size scale, two loaded local families, weights 400/600/700; descending headings; body line-height and measures; tabular count; wrapping inspected at mobile and enlarged text | No non-English locale or fallback-font-only visual comparison was performed |
| Colors — Checked | Source semantic aliases; resolved browser tokens; seven measured solid pairs; button hover/busy backgrounds; orange stamp made opaque; forced-colors focus inspected | Probe excludes four image-adjacent text instances across its two views. Decorative scene-caption pixels were not exhaustively sampled. No dark theme is implemented |
| UI — Checked | Idle/hover/focus/pending/success and repeated feeding; native open/closed questions; real download; named transitions; .96 press; static reduced-motion feedback; flat sections, one paper shadow, no nested cards | DevTools Animations-panel 10%-speed playback not performed. Loading/retry/empty service states do not apply to this local-only page |

Measured contrast ratios are recorded in `browser-review.json`: body/page 10.90:1, secondary/page 7.42:1, hero text/orange 4.93:1, primary label/idle 10.90:1, primary label/hover or busy 7.42:1, heading/sage 9.73:1, and prose/sage 6.63:1. Foreground/background values were checked against browser-resolved tokens and the settled hover state. The photograph itself is art, not a text background for a required control.

## Findings and corrections

Source locations below point to the final corrected source, not generated bundles.

| Severity / domain | Source location | Evidence and correction | Recheck |
| --- | --- | --- | --- |
| High — layout / text enlargement | `src/styles.css:76`, `src/styles.css:102`, `src/styles.css:246` | At 390px with 200% root text, measured document width was 425px: grid minimums, expanded gutters, nav and scene art exceeded the viewport. Added shrinkable grid children and wrapping; allowed the header to wrap; kept physical phone gutters, artwork, and icon geometry bounded so enlarged button text has useful reading space | Final 200% text check passed with no horizontal overflow; screenshot retained; action text wraps into readable lines |
| High — writing | `src/App.tsx:80`, `src/App.tsx:92`, `src/App.tsx:123` | Initial taste probe found four two-beat slogan lines across the page, including the first screen. Replaced the stamp with “Good company,” the hint with “Give him a virtual carrot,” and the download helper with “A free PNG for your camera roll” | Final slogans check passed with one line; plain instructions remain beside controls |
| Medium — responsive layout | `src/styles.css:229` | At 816px the transformed 125%-width portrait extended to x≈822, creating horizontal scroll. Limited the portrait to 112% in the tablet layout | No overflow at 816px or any of the seven checked widths; final probe layout check passed |
| Medium — UI / decorative copy | `src/styles.css:124`, `src/App.tsx:80` | Original mobile stamp copy broke into too many lines and crossed the goat. Shortened it and gave the stamp an opaque orange background, preserving the image while keeping the decorative label on a known solid pair | Final mobile screenshot viewed; stamp text fits; orange/text ratio measured 4.93:1 |
| Low — targets | `src/styles.css:91`, `src/styles.css:172` | Initial probe reported two controls below the comfortable 44px target, although they passed the 24px baseline. Added minimum 44px block size to header/footer wordmarks | Final target report: all 11 measured mobile controls pass and zero are below 44px |
| Low — typography | `src/App.tsx:104` | Enlarged-text review showed the long “personality” section heading ending with an isolated letter. Changed it to “Small goat, big heart,” retaining the same heading role and type tokens | Final enlarged-text export checked; all text remains available without clipping |

Additional preventive refinements: removed unused color aliases, matched the button icon stroke to semibold labels, and reserved 5rem for mobile feedback. The final interaction script cycles every reply at 320px and checks that the hero height stays constant.

## Final taste@1 coverage

All sixteen checks passed: render, layout, targets, contrast, casing, tracking, eyebrows, type-sizes, type-faces, glyphs, slogans, repetition, copy-budget, chrome, motion, and share. The exact check results are retained in `taste-results.json`.

The probe found six total type sizes per view, two font families, three weights, no nested cards or border-plus-shadow surfaces, no endless motion, and no `transition: all`. First-screen prose was 8 words at 390px against the 60-word bar, and 14 at 1440px against the 90-word bar. Four image-adjacent text instances were outside the automated contrast measurement; this is retained as a limit, not promoted to a measured pass.

## Evidence and limitations

Retained evidence:

- `screenshots/mobile-390.webp`: final first mobile screen.
- `screenshots/desktop-1440.webp`: final full desktop page.
- `screenshots/keyboard-focus-390.webp`: visible normal-theme primary focus.
- `screenshots/feeding-390.webp`: actual pending feeding state.
- `screenshots/questions-390.webp`: open question content.
- `screenshots/text-enlargement-390.webp`: 200% root-text reflow after lazy artwork was loaded by scrolling.
- `screenshots/forced-colors-390.webp`: actual keyboard focus in emulated forced-colors mode.
- `interaction-results.json`, `taste-results.json`, `axe-summary.json`, and `browser-review.json`: actual worker results, compacted without machine-specific paths.

The supplied browser connector answered that its Chrome executable was not found. It was not used to claim successful screenshots. Independent Playwright Chromium launched successfully and performed the checks described here. WebKit installation completed, but launch failed because the host lacks system libraries including GStreamer, GTK 4, Pango/Cairo and GDK Pixbuf. **No WebKit/Safari result is claimed.**

No physical-device, native screen-reader, native-browser-zoom, social-platform crawler/unfurl, translated locale, or 10%-speed DevTools animation session was performed. Relative social image metadata is deliberate because the final hosting origin is assigned later. The static asset and metadata presence were checked locally. All observed applicable source defects were repaired; the remaining limits are verification coverage, not simulated successes.

## Delivery integrity and byte budget

The explicit budgets are in `path-budget.md`, including the `.gitignore` allowance. Required source, lockfile, optimized runtime assets, finished export, documentation, and evidence remain included. Dependencies, browser binaries and package caches stay outside the repository; scratch evidence is disposable. Final byte counts and the clean-install/export comparison are recorded in `delivery-integrity.json`.

An inherited ignore rule initially hid `artifacts/` from file discovery. Explicit local include rules now retain both `artifacts/**` and `dist/**`, followed by dependency/cache exclusions at every nesting level. The ignore file remains within its explicit 1,024-byte budget. Runtime font and React license notices are included in the final export.
