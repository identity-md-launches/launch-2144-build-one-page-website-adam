# Adam the goat

A one-page home for Adam, a fictional digital goat. Give him a virtual carrot, get to know his personality, download his postcard, and open the goat questions. Carrots belong to the current visit and reset on reload.

Built with React, TypeScript, and Vite. The complete, ready-to-serve export is in **[`dist/`](dist/)**. All artwork, fonts, icons, and the downloadable postcard are local. Runtime requests need no external service.

## Install and develop

Use Node.js **22.12 or newer** and npm.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. Dependencies are development tools and are excluded from the submission.

## Rebuild and preview

```sh
npm run typecheck
npm run build
npm run preview
```

Open the preview address printed by Vite. To serve the delivered export directly with Python:

```sh
python3 -m http.server 4173 --directory dist
```

Use an HTTP static server for the module-based page. Upload the **contents** of `dist/` to a static host. Vite uses `base: './'`; exported asset references are relative, and section navigation uses hashes. No route rewrite, backend, account, API key, or wallet is required.

## Validate

```sh
npx playwright install chromium webkit
npm run validate
```

The validation script starts and closes its own local server under `/preview/`. It checks the actual export, seven viewport widths, the first mobile screen, local font loading, keyboard navigation, feeding and repeat-activation protection, every response, stable feedback layout, questions, the postcard download, reduced motion, enlarged text, resources, and an axe accessibility scan. Output goes to `test/scratch/interactions/`, which is intentionally excluded from delivery. Missing WebKit binaries or system libraries are reported as a limitation, not as a WebKit pass.

Optional arguments select another export and evidence directory:

```sh
npm run validate -- --dir dist --out test/scratch/interactions
```

## Actual worker results

The final production build and `tsc --noEmit` passed. Chromium passed **39 interaction assertions** against the delivered `dist/`, served at a gateway-style `/preview/` subpath. The axe-core 4.14.0 scan reported **0 violations**. The pinned, offline `taste@1` probe passed **16/16 checks**. No horizontal overflow was detected at 320, 390, 624, 720, 816, 1088, or 1440 CSS pixels. At 390 × 844, Adam and the carrot button are both on the first screen.

Dependencies were installed in a disposable directory outside the repository; no `node_modules` or package-manager cache is delivered. The source was built there and the finished export copied back. A clean lockfile install was also checked; see the validation record for the final integrity and size results.

The supplied browser connector could not start because its Chrome executable was unavailable. A separate Playwright Chromium browser provided the rendered checks and screenshots. **WebKit could not launch because required system libraries were missing.** Physical devices, a native screen-reader session, and browser-native zoom were not tested; a 200% root text-size reflow check was performed. The probe leaves image-adjacent text contrast unmeasured. These are worker-run checks, not independent certification.

See [`artifacts/validation.md`](artifacts/validation.md) for the six-domain Better Interface review, findings, commands, evidence, and limitations; [`DESIGN.md`](DESIGN.md) for the implemented design system; and [`artifacts/path-budget.md`](artifacts/path-budget.md) for the explicit submission budget.

## Assets and maintenance

Content and state live in `src/App.tsx`; tokens, responsive layouts, and states live in `src/styles.css`. The original SVG mark and icon set live in `src/Icons.tsx`. Metadata is in `index.html`.

Adam’s portrait was generated with the built-in imagegen tool and optimized to a transparent WebP. Its prompt and provenance are recorded in [`artifacts/asset-notes.md`](artifacts/asset-notes.md). The portrait is intentionally fictional. Local Fraunces and DM Sans fonts use the SIL Open Font License; notices are retained in `artifacts/licenses/`.

The delivered `public/adam-postcard.png` is both the download and the 1200 × 630 social image. To regenerate its layout from the local portrait and fonts, after installing Chromium:

```sh
node scripts/generate-postcard.mjs
npm run build
```

Normal builds use the supplied PNG and do not generate images or launch a browser. The one-page site is served from `dist/`; documentation and browser evidence are outside that runtime export.
