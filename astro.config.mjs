import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// User-page GitHub Pages repo (lambiengcode.github.io) serves at the root,
// so no `base` config is needed. sitemap.xml, canonical URLs, and RSS all
// resolve against this.
const SITE_URL = "https://lambiengcode.github.io";

export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
