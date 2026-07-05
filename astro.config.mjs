// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output (default). `site` is the live URL (GitHub Pages + custom
// domain) — it's only used for absolute URLs in meta tags / sitemap. The site
// is served from the domain root, so no `base` path is needed.
export default defineConfig({
  site: "https://atlashq.gg",
  vite: {
    plugins: [tailwindcss()],
  },
});
