# lambiengcode.github.io

Personal site + a curated, AI-summarized WebRTC/Media-over-QUIC blog. Built
with [Astro](https://astro.build) for static output (no client JS shipped) —
fast Core Web Vitals and full SEO out of the box: sitemap, RSS, canonical
URLs, Open Graph/Twitter cards, and JSON-LD (`Person` on the homepage,
`BlogPosting` on each post).

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## The blog pipeline

`scripts/fetch-articles.mjs` pulls new posts from the sources listed in
`scripts/sources.mjs` (LiveKit, WebRTC.ventures, moq.dev, webrtcHacks,
BlogGeek.me), filters for relevance, summarizes each new item with Gemini,
and writes it as a Markdown file in `src/content/blog/`. Already-seen
`sourceUrl`s are skipped, so it's safe to run repeatedly.

```sh
GEMINI_API_KEY=... npm run fetch-articles
```

Get a key at https://aistudio.google.com/apikey. Without `GEMINI_API_KEY` it
still runs — posts get the feed's raw excerpt instead of an AI summary
(`generatedBy: "raw"` in the frontmatter).

`.github/workflows/fetch-content.yml` runs this daily via cron and commits
whatever it finds. To enable it: add a `GEMINI_API_KEY` repo secret
(Settings → Secrets and variables → Actions). Without the secret the
workflow still runs and still commits — just with raw excerpts.

To add a source, add an entry to `scripts/sources.mjs`: an RSS feed
(`type: "rss"`) or, if the site has no feed, a `type: "html-list"` scraper
config (see the LiveKit entry for the shape).

## Deploying to GitHub Pages

This repo is the special `lambiengcode.github.io` user-page repo, so it
publishes at the root (`https://lambiengcode.github.io/`) — no Astro `base`
path needed.

1. Push this repo to GitHub as `lambiengcode/lambiengcode.github.io`.
2. In the repo, go to **Settings → Pages** and set **Source** to
   **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and deploys on every push to
   `main`. First push triggers the first deploy automatically.
4. Optional: add the `GEMINI_API_KEY` secret (see above) so the daily
   content-fetch workflow produces AI summaries instead of raw excerpts.

## SEO

On-page SEO is done: sitemap, RSS, canonical URLs, per-page meta
descriptions, Open Graph + Twitter cards (`public/og-image.png`, a proper
1200×630 banner), JSON-LD (`Person` + `BlogPosting`), a favicon with an
`.ico` fallback, and `/blog/tag/[tag]/` archive pages so tags are real
internal links instead of dead text.

What's *not* solved by code, and won't be by more of it:

- **Submit to search engines.** Verify the domain in
  [Google Search Console](https://search.google.com/search-console) and
  [Bing Webmaster Tools](https://www.bing.com/webmasters), then submit
  `https://lambiengcode.github.io/sitemap-index.xml`. Until you do this,
  Google finds the site on its own schedule instead of being told directly.
- **Backlinks and domain age.** This is what actually drives ranking for
  competitive terms, and it only comes from time, real inbound links, and
  people citing the site elsewhere — no config change produces it.
- **Content depth.** The blog posts are short curated summaries with a
  link to the original — good for a link-blog, but they won't outrank the
  source article for its own keywords. They're most useful for your own
  branded/long-tail search traffic, not for competing head-to-head on
  "WebRTC vs MoQ"-type queries.
