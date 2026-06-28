# CLAUDE.md

Guidance for working in this repository.

## What this is

A **static landing page** for **ATLAS**, a Colonial Foxhole regiment formed from the
merger of *New Colonial Republic (NCR)* and *High Velocity Logistics (HvL)*. It's a
single-page hub: a splash hero, a Discord call-to-action, a grid of links to the
regiment's tools/content, and an "about" section. Someone else handles hosting — the
deliverable is just the built static site in `dist/`.

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
```

## Project layout

```
src/
  config.ts            # faction theme setting + regiment name/tagline
  data/
    links.ts           # Discord CTA + the Quick Links grid (content)
    content.ts         # "Who We Are" intro/motto + activities list (content)
  styles/global.css    # faction color palettes (CSS vars) + Tailwind @theme tokens
  layouts/Base.astro   # <head>, meta, stamps data-faction onto <html>
  components/
    Hero.astro         # splash + title + Discord CTA + scroll cue. Splash art lives here.
    LinkGrid.astro     # "Quick Links" section, maps over links data
    LinkCard.astro     # one link tile
    About.astro        # "Who We Are" — intro, motto, activities (as a list, NOT cards)
  pages/index.astro    # composes: Hero → LinkGrid → About → footer; defines .content-over panel
public/favicon.svg     # placeholder shield favicon
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

- **Colors flow through CSS variables.** `[data-faction="..."]` selectors set
  `--accent`, `--accent-strong`, `--accent-contrast`; the shared neutral base
  (`--bg`, `--surface`, `--text`, `--muted`, `--border`) is faction-agnostic.
  Tailwind utilities like `bg-accent` / `text-muted` map to these via `@theme`.
  To recolor, edit the variables in `global.css` — not utility classes everywhere.

- **Splash art is a placeholder.** `Hero.astro`'s `.hero-art` is a CSS gradient +
  faint grid, `position: fixed` so page content scrolls up over it. The
  `.content-over` panel in `index.astro` has a gradient lip so there's no hard cut
  between splash and content. Real art (when provided) replaces `.hero-art` —
  ideally a wide/high-res image via Astro `<Image>` from `src/assets/`, with a dark
  overlay so the centered title/CTA stay legible.

- **Zero JavaScript.** The build should ship no `.js`. If a feature seems to need
  client JS, prefer a CSS-only or build-time solution first.

## Verifying changes

Use the browser preview (`preview_*` tools) to check layout/appearance, and run
`npm run build` to confirm it compiles and still ships zero JS
(`find dist -name '*.js'` should return nothing).

## Status / TODO

- All link URLs in `src/data/links.ts` except Discord are placeholders (`#`) — the
  regiment fills in their real tool URLs. Discord is live: `https://discord.gg/atlashq`.
- Real splash art and an ATLAS logo are still pending from the user (logo would also
  replace `public/favicon.svg`).
