# CLAUDE.md

Guidance for working in this repository.

## What this is

A **static landing page** for **ATLAS**, a Colonial Foxhole regiment formed from the
merger of *New Colonial Republic (NCR)* and *High Velocity Logistics (HvL)*. It's a
single-page hub: a splash hero, a Discord call-to-action, a grid of links to the
regiment's tools/content, and an "about" section. Someone else handles hosting — the
deliverable is just the built static site in `dist/`.

> **Branding is WORK IN PROGRESS.** The splash artwork (`broadside.png`), both
> faction logos/crests (`ATLAS{Colonial,Warden}RedStars.png`), and the color
> palettes in `global.css` are all PLACEHOLDER and may change once the regiment
> finalizes its branding. Treat them as swappable, not final.

## Stack

- **Astro 5** (static output, zero client-side JavaScript)
- **Tailwind CSS v4** via `@tailwindcss/vite` (configured in CSS, not a JS config file)
- No runtime framework (no React/Vue). No external network requests at runtime
  (no CDN fonts/scripts) — keep it self-contained.

## Commands

```bash
npm install      # once
npm run dev      # local dev server (http://localhost:4321)
npm run build    # static build → ./dist
npm run preview  # serve the built ./dist
npm run previews # build BOTH factions → self-contained previews/atlas-<faction>.html
```

## Project layout

```
src/
  config.ts            # faction theme setting + regiment name/tagline
  data/
    links.ts           # Discord CTA + the Quick Links grid (content)
    content.ts         # "Who We Are" intro/motto + activities list (content)
  lib/crest.ts         # picks the active faction's crest (+ exposes the inactive one)
  assets/              # build-optimized images (Astro <Image>/getImage)
    broadside.png        # splash art (wide, dark, ~5200x2000)
    ATLASColonialRedStars.png  # Colonial crest (green/gold)
    ATLASWardenRedStars.png    # Warden crest (blue/silver)
  styles/global.css    # faction color palettes (CSS vars) + Tailwind @theme tokens
  layouts/Base.astro   # <head>, meta, stamps data-faction; builds favicon + OG image
  components/
    Hero.astro         # splash art + crest + title + Discord CTA + scroll cue
    LinkGrid.astro     # "Quick Links" section, maps over links data
    LinkCard.astro     # one link tile
    About.astro        # "Who We Are" — intro, motto, activities (as a list, NOT cards)
  pages/index.astro    # composes: Hero → LinkGrid → About → footer; defines .content-over panel
public/favicon.svg     # legacy placeholder; the live favicon is generated from the crest
```

## Key conventions & decisions

- **Content lives in data files, not markup.** Editing links, the Discord URL,
  regiment name, intro copy, or activities means editing `src/config.ts`,
  `src/data/links.ts`, or `src/data/content.ts` — not the `.astro` components.

- **Faction theme is admin/build-time, NOT a visitor toggle.** ATLAS is mostly
  Colonial (green) but sometimes plays Warden (blue). Both palettes exist in
  `global.css`; which one ships is set by `DEFAULT_FACTION` in `src/config.ts`, or
  overridden at build via the `PUBLIC_FACTION` env var (`PUBLIC_FACTION=warden npm run build`).
  Switching faction = change the value, rebuild, redeploy. Do not reintroduce a
  client-side toggle (the user explicitly rejected it — too much JS / avoids a flash).

- **Colors flow through CSS variables.** Each faction carries its OWN full palette
  (the bases differ: Colonial = warm olive, Warden = cold navy). The
  `[data-faction="..."]` selectors in `global.css` set every token —
  `--bg`, `--surface`, `--surface-2`, `--text`, `--muted`, `--border`,
  `--accent`, `--accent-strong`, `--accent-contrast`, `--accent-2` (the crest red).
  Tailwind utilities like `bg-accent` / `text-muted` map to these via `@theme`.
  To recolor, edit the variables in `global.css` — not utility classes everywhere.
  NOTE: current colors are PLACEHOLDER while the regiment finalizes branding.

- **Splash art + crest are real, faction-aware images.** `Hero.astro` renders
  `broadside.png` via Astro `<Image>` in `.hero-art` (`position: fixed` so content
  scrolls over it), with a `.hero-art::after` dark gradient for text legibility and
  a bottom fade into `--bg`. The faction crest sits above the title and is chosen by
  `src/lib/crest.ts`. `Base.astro` derives the favicon/apple-touch icon from the same
  crest and the OG share image from the splash. To change art: swap the file in
  `src/assets/` and update the import.

- **Only the active faction's crest ships.** Astro copies the full-size original of
  any imported image that's never processed. `crest.ts` exposes the inactive crest so
  `Base.astro` can run it through `getImage` (a throwaway 1px derivative), which keeps
  its multi-MB original out of `dist/`. Don't remove that call.

- **Zero JavaScript.** The build should ship no `.js`. If a feature seems to need
  client JS, prefer a CSS-only or build-time solution first.

## Sharing without deploying

`scripts/make-preview.mjs` inlines a built `dist/` into one **self-contained**
HTML file (`previews/atlas-<faction>.html`) — CSS inlined, all images as base64
data URIs, zero network requests. Open it in any browser or send it directly; no
server, no deploy.

- Generated only by `npm run previews` (`scripts/build-previews.mjs`): it builds
  both factions, inlines each, then restores `dist/` to the configured default.
  It is deliberately NOT hooked into `npm run build` — a deploy build stays clean.
- `previews/` is gitignored (and absent on a fresh clone); the script recreates
  it via `mkdir -p` before writing.

## Verifying changes

Use the browser preview (`preview_*` tools) to check layout/appearance, and run
`npm run build` to confirm it compiles and still ships zero JS
(`find dist -name '*.js'` should return nothing).

## Status / TODO

- All link URLs in `src/data/links.ts` except Discord are placeholders (`#`) — the
  regiment fills in their real tool URLs. Discord is live: `https://discord.gg/atlashq`.
- Splash art (`broadside.png`) and both faction crests are in place, but everything
  (art, crests, color palettes) is PLACEHOLDER pending the regiment's final branding.
