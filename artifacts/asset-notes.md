# Asset provenance

## Adam’s portrait

`public/adam.webp` is the final project-bound asset, also exported as `dist/adam.webp`. It was generated with the **built-in imagegen tool**, using its transparent-background mode. No API/CLI fallback or private credentials were used.

The generated 1536 × 1024 PNG was inspected for subject and transparency, then resized and encoded as a 1200 × 800 WebP with alpha preserved, quality 88, alpha quality 100. This was packaging optimization, not a substituted illustration. The image is a fictional goat; the site says so in its introduction and questions.

Final prompt:

> Use case: photorealistic-natural. Asset type: transparent photographic cutout for a playful website about Adam the goat. Primary request: a single handsome, friendly brown and cream pygmy goat, full body, standing with all four hooves visible, facing three-quarter left with its head turned toward the viewer. Short sturdy legs, rich warm brown fur with creamy ivory facial markings and beard, two small curved horns, bright curious eyes, alert ears, lifelike proportions. Style: exceptionally crisp editorial animal photography, fine detailed natural fur, soft late afternoon sunlight from the upper left, warm and charming but realistic. Composition: landscape 3:2 canvas, entire goat centered with ample transparent padding around horns and hooves, the goat fills about 85 percent of the frame height. Background: truly transparent, no ground, no grass, no backdrop, no scene. No objects, no people, no text, no logo, no watermark. Maintain clean fine fur edges in the alpha channel.

## Postcard, favicon, and icons

`public/adam-postcard.png` (1200 × 630) is rendered from local HTML/CSS, the portrait, and the two local fonts using `scripts/generate-postcard.mjs`. It serves as both the social share card and a real downloadable PNG. Its source layout is in that script, so it can be reproduced without image generation.

`public/favicon.svg`, `GoatMark`, and `Icon` in `src/Icons.tsx` are original code-native vector artwork. They do not require a remote icon service or icon font.

## Fonts

Local Latin WOFF2 files were obtained from Google Fonts’ font distribution:

- DM Sans: `public/fonts/dm-sans-latin.woff2`, variable weight 400–700. Source family: https://fonts.google.com/specimen/DM+Sans. License retained as `licenses/dm-sans.txt`.
- Fraunces: `public/fonts/fraunces-latin.woff2`, normal weight 700 with optical sizing. Source family: https://fonts.google.com/specimen/Fraunces. License retained as `licenses/fraunces.txt`.

Fonts are supplied in the repository and export; a build does not fetch them from Google.

Runtime font notices are also retained under `public/fonts/` and therefore `dist/fonts/`. The React/React DOM/Scheduler MIT notice is retained as `public/licenses/react.txt` and copied into the export. Its upstream source is https://github.com/facebook/react/blob/main/LICENSE.

## Design guidance attribution

The pinned Better Interface guidance is adapted from Jakub Krehel, commit `267330e1adfc66a718fb65fa6918c1f06d0a689e`, MIT: https://github.com/jakubkrehel/skills/tree/267330e1adfc66a718fb65fa6918c1f06d0a689e/skills/better-interface.

The documentation method is adapted from Paul Bakaus, Impeccable, copyright 2025, commit `9d715cc4f5564a990ca8345abfdd5df6dc9b41c8`, Apache-2.0: https://github.com/pbakaus/impeccable/blob/9d715cc4f5564a990ca8345abfdd5df6dc9b41c8/skill/reference/document.md.

The combined license notices supplied with the pinned input are preserved in `licenses/design-guidance.txt`. The application is original; the guides were used as design/review knowledge, not shipped as application code.

## Browser evidence

Files in `screenshots/` are WebP encodings, quality 88, of actual final-export Playwright screenshots. They have no compositing or content retouching. Full-resolution PNG originals were written under disposable `test/scratch/`. The downloadable postcard is a separate runtime asset and is not a browser-evidence placeholder.
