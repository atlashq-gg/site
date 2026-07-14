// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output (default). `site` is the live URL — used for absolute URLs in
// meta tags / sitemap. The custom domain serves from the domain root, so no
// `base` path is needed (only github.io project URLs need one).
export default defineConfig({
  site: "https://atlashq.gg",
  vite: {
    plugins: [tailwindcss()],
  },
});
