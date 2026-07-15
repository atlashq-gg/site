# CLAUDE.md

Guidance for working in this repository.

## What this is

A **static landing page** for **ATLAS**, a Colonial Foxhole regiment formed from the
merger of *New Colonial Republic (NCR)* and *High Velocity Logistics (HvL)*. It's a
single-page hub: a full-height splash hero, a Discord call-to-action, and a grid of
links to the regiment's tools/content. Hosted on **GitHub Pages** — every push
to `main` builds and deploys automatically (see "Deploying" below).

> **Branding is FINAL.** The splash artwork (`broadside.png`), both faction
> logos/crests (`ATLAS{Colonial,Warden}.png`), and the color palettes in
> `global.css` are the regiment's settled branding.

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
  config.ts            # faction theme setting + regiment name/tagline + splash-art credit
  data/
    links.ts           # Discord CTA + the Quick Links grid (content)
  lib/crest.ts         # picks the active faction's crest (+ exposes the inactive one)
  assets/              # build-optimized images (Astro <Image>/getImage)
    broadside.png        # splash art (wide, dark, ~5200x2000)
    ATLASColonial.png    # Colonial crest (olive/gold)
    ATLASWarden.png      # Warden crest (navy/steel)
    logos/               # pre-sized crest PNGs (256/128/64) for use OUTSIDE the site
                         # (Discord etc.) — deliberately never imported, so Astro
                         # keeps them out of dist/
    fonts/               # self-hosted display font (Oswald, SIL OFL 1.1) + OFL.txt;
                         # bundled at build via url() in global.css, no runtime fetch
  styles/global.css    # faction color palettes (CSS vars) + Tailwind @theme tokens
  layouts/Base.astro   # <head>, meta, stamps data-faction; builds favicon + OG image
  components/
    Hero.astro         # splash art + crest + title + Discord CTA + scroll cue; owns the dissolve
    LinkGrid.astro     # "Quick Links" section, maps over links data
    LinkCard.astro     # one link tile
  pages/index.astro    # composes: Hero → LinkGrid → footer; defines the (transparent) .content-over wrapper + artist credit
docs/branding/         # artist's palette swatches ({Colonial,Warden}ColorPalette.png) — reference only, not part of the build
public/CNAME           # pins the custom domain (atlashq.gg) into the deploy; copied verbatim to dist/
```

(`public/` holds only `CNAME` — the one file that must reach `dist/` verbatim to
hold the custom domain. Everything else is generated: the favicon is derived from
the crest in `Base.astro`, and other assets are hashed through Astro's pipeline.)

The swatch PNGs in `docs/branding/` are the source of truth behind the CSS
palettes: their stripes map 1:1 to `--muted`, `--surface`, `--surface-2`, and
`--accent` in `global.css`. Each also has a red stripe the site deliberately
does NOT use (the red was dropped from the branding).

## Key conventions & decisions

- **Content lives in data files, not markup.** Editing links, the Discord URL,
  the regiment name/tagline, or the splash-art credit means editing `src/config.ts`
  or `src/data/links.ts` — not the `.astro` components. (The splash artist is
  credited in the footer via `splashArtist` in `src/config.ts` — name + optional
  mailto; leave `email: ""` to show the name without a link. The crest
  contributors are credited via `crestArtists` in the same file — names + roles
  only, deliberately WITHOUT links: the artists asked for no socials/email.)

- **Faction theme is admin/build-time, NOT a visitor toggle.** ATLAS is mostly
  Colonial (green) but sometimes plays Warden (blue). Both palettes exist in
  `global.css`; which one ships is set by `FACTION` in `src/config.ts`.
  Switching faction = change that value and push to main (auto-deploys) —
  content-as-code, same as any other content edit. The `PUBLIC_FACTION` env
  override in `config.ts` is internal plumbing for `npm run previews` (it
  builds both factions in one run) — don't document it as a user-facing
  switch, and don't remove it. Do not reintroduce a
  client-side toggle (the user explicitly rejected it — too much JS / avoids a flash).

- **Colors flow through CSS variables.** Each faction carries its OWN full palette
  (the bases differ: Colonial = warm olive, Warden = cold navy). The
  `[data-faction="..."]` selectors in `global.css` set every token —
  `--bg`, `--surface`, `--surface-2`, `--text`, `--muted`, `--border`,
  `--accent`, `--accent-strong`, `--accent-contrast`.
  Tailwind utilities like `bg-accent` / `text-muted` map to these via `@theme`.
  To recolor, edit the variables in `global.css` — not utility classes everywhere.
  These palettes are the FINAL branding.

- **Splash art + crest are real, faction-aware images.** `Hero.astro` renders
  `broadside.png` via Astro `<Image>` in `.hero-art`. The faction crest sits above
  the title and is chosen by `src/lib/crest.ts`. `Base.astro` derives the
  favicon/apple-touch icon from the same crest and the OG share image from the
  splash. To change art: swap the file in `src/assets/` and update the import
  (any wide, dark image works best with the bottom fade — see next bullet).

- **Warden builds have a sticky-note gag (intentional).** The Warden crest covers
  the Colonial signature with a pinned sticky note; the hero eyebrow label plays
  along — on Warden builds the word "Colonial" stays in the label with a CSS
  sticky note reading "Warden" pinned over it (see `.sticky-note` in
  `Hero.astro`). Screen readers hear the plain "Warden Foxhole Regiment".
  Colonial builds render a plain label.

- **The hero dissolve is a mask-fade on the picture.** The picture is NOT fixed;
  it scrolls in flow, filling `--hero-art-h` (currently `100svh`). Its bottom edge
  is faded to transparent with a `mask-image` gradient on the `<img>`
  (`--hero-fade-start` sets where the fade begins), so it dissolves into the page
  background — the `.content-over` wrapper in `index.astro` deliberately has no
  background of its own (the page bg is already `--bg` on `<html>`). Geometry:
  the hero section's `min-h`/`pb` + `LinkGrid`'s top padding place the content
  start just past the picture; if you change `--hero-art-h`, shift `min-h`/`pb`
  to match.

- **Only the active faction's crest ships.** Astro copies the full-size original of
  any imported image that's never processed. `crest.ts` exposes the inactive crest so
  `Base.astro` can run it through `getImage` (a throwaway 1px derivative), which keeps
  its multi-MB original out of `dist/`. Don't remove that call.

- **Zero JavaScript.** The build should ship no `.js`. If a feature seems to need
  client JS, prefer a CSS-only or build-time solution first.

## Deploying

GitHub Pages via GitHub Actions: `.github/workflows/deploy.yml` builds and
publishes `dist/` on every push to `main` (also manually triggerable via
`workflow_dispatch`). One-time repo setup lives in GitHub → Settings → Pages:
source must be "GitHub Actions", custom domain `atlashq.gg` (DNS is managed
outside this repo). The site serves at `https://atlashq.gg` — a custom domain
serves from the domain root, so `astro.config.mjs` sets `site` and no `base`.
To ship the Warden theme, edit `FACTION` in `src/config.ts` and push — no
workflow setting.

The repo has **no open-source license** (all rights reserved), and the artwork
is used with the artists' permission for this site only — see "License &
artwork rights" in `README.md`. Don't add a license file without the user.

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
- Branding is FINAL: splash art (`broadside.png`), both faction crests
  (`ATLAS{Colonial,Warden}.png`), and the color palettes.
- The hero dissolve is a plain mask-fade into `--bg`. It's palette-independent,
  so it works for both factions as-is.
- The "Who We Are" / About section was removed by request (along with
  `src/components/About.astro` and `src/data/content.ts`).
