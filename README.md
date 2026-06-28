# Foxhole Regiment Landing Page

A static, single-page hub for the regiment — a splash screen plus links to our
Discord and the tools/content we run. Built with [Astro](https://astro.build) +
[Tailwind CSS](https://tailwindcss.com). Ships **zero JavaScript**.

## Develop

```bash
npm install      # once
npm run dev      # local dev server (hot reload)
npm run build    # production build → ./dist
npm run preview  # preview the built ./dist locally
```

The deployer just serves the contents of `dist/` as static files.

## How to edit

Everything you'd normally change lives in three places:

| What | Where |
| --- | --- |
| Faction theme (Colonial / Warden) | `src/config.ts` → `faction` |
| Regiment name & tagline | `src/config.ts` → `regiment` |
| Discord button & all links | `src/data/links.ts` |
| Colors (per faction) | `src/styles/global.css` |
| Splash art | `src/components/Hero.astro` |

### Switch faction theme

The site is mostly Colonial (green) but can switch to Warden (blue). This is an
**admin/build-time** setting — visitors can't change it; everyone sees what's set.

- Edit `src/config.ts`: `const DEFAULT_FACTION = "colonial"` → `"warden"`, **or**
- Build with an env var (no code edit): `PUBLIC_FACTION=warden npm run build`

Then rebuild and redeploy.

### Add or change links

Edit `src/data/links.ts`. The `discord` object is the big hero button; the
`links` array is the grid of cards. All URLs there are placeholders (`#`) — swap
in the real ones. To add a card, copy an entry and fill in
`title` / `description` / `url` (and optional `category`).

### Add the real splash art

The hero currently uses a CSS placeholder background. To use real art, drop an
image into `src/assets/` and replace the `.hero-art` block in
`src/components/Hero.astro` with an Astro
[`<Image>`](https://docs.astro.build/en/guides/images/) (optimized) or a CSS
background. It's isolated to that one component.
