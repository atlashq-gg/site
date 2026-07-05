// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output (default). `site` is the live URL — used for absolute URLs in
// meta tags / sitemap. Currently the default GitHub Pages project URL; once
// the atlashq.gg DNS is set up (handled outside this repo), change to
//   site: "https://atlashq.gg"
// and remove `base` — a custom domain serves from the domain root, so no base
// path is needed there.
export default defineConfig({
  site: "https://p0etc.github.io",
  base: "/atlas-landingpage",
  vite: {
    plugins: [tailwindcss()],
  },
});
