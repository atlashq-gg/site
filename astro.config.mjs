// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Static output (default). The deployer can change `site` to the final URL —
// it's only used for absolute URLs in meta tags / sitemap.
export default defineConfig({
  site: "https://example.com",
  vite: {
    plugins: [tailwindcss()],
  },
});
