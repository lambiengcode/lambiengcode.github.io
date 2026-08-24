#!/usr/bin/env node
// Pulls latest WebRTC / Media-over-QUIC articles from SOURCES, summarizes
// each new one with Gemini, and writes it as a Markdown post under
// src/content/blog/. Safe to run repeatedly — already-seen sourceUrls are
// skipped. Runs without GEMINI_API_KEY too (falls back to the feed's own
// excerpt instead of an AI summary).
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Parser from "rss-parser";
import matter from "gray-matter";
import { SOURCES, RELEVANCE_KEYWORDS, MAX_NEW_PER_SOURCE } from "./sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, "..", "src", "content", "blog");
const rssParser = new Parser();

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

const ENTITIES = {
  "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#039;": "'",
  "&#8217;": "’", "&#8216;": "‘", "&#8220;": "“", "&#8221;": "”",
  "&#8211;": "–", "&#8212;": "—", "&nbsp;": " ",
};

function stripHtml(html = "") {
  let text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  for (const [entity, char] of Object.entries(ENTITIES)) {
    text = text.replaceAll(entity, char);
  }
  return text;
}

async function existingSourceUrls() {
  const files = await readdir(BLOG_DIR).catch(() => []);
  const urls = new Set();
  for (const file of files) {
    if (!file.endsWith(".md")) continue;
    const raw = await readFile(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);
    if (data.sourceUrl) urls.add(data.sourceUrl);
  }
  return urls;
}

function isRelevant({ title, excerpt }) {
  const haystack = `${title} ${excerpt}`.toLowerCase();
  return RELEVANCE_KEYWORDS.some((kw) => haystack.includes(kw));
}

async function fetchRssSource(source) {
  const feed = await rssParser.parseURL(source.url);
  return (feed.items ?? []).map((item) => ({
    title: item.title?.trim() ?? "Untitled",
    link: item.link,
    pubDate: item.isoDate ?? item.pubDate ?? new Date().toISOString(),
    excerpt: stripHtml(item.contentSnippet ?? item.content ?? item.summary ?? ""),
  }));
}

async function fetchHtmlListSource(source) {
  const res = await fetch(source.listUrl);
  const html = await res.text();
  const slugs = new Set();
  for (const match of html.matchAll(source.linkPattern)) {
    slugs.add(match[1]);
  }
  const candidates = [...slugs].slice(0, MAX_NEW_PER_SOURCE * 2);

  const items = [];
  for (const slug of candidates) {
    const url = `${source.base}${slug}`;
    try {
      const page = await fetch(url).then((r) => r.text());
      const title = page.match(/<meta property="og:title" content="([^"]*)"/)?.[1];
      const description = page.match(/<meta property="og:description" content="([^"]*)"/)?.[1] ?? "";
      const published = page.match(/<meta property="article:published_time" content="([^"]*)"/)?.[1];
      if (!title) continue;
      items.push({
        title: stripHtml(title),
        link: url,
        pubDate: published ?? new Date().toISOString(),
        excerpt: stripHtml(description),
      });
    } catch {
      // one bad post page shouldn't fail the whole source
    }
  }
  return items;
}

async function summarize(item, sourceName) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      description: item.excerpt.slice(0, 280) || item.title,
      tags: [],
      generatedBy: "raw",
      body: item.excerpt || `See the full article at ${sourceName}.`,
    };
  }

  const { GoogleGenAI } = await import("@google/genai");
  const client = new GoogleGenAI({ apiKey });

  const prompt = `You curate a link-blog about WebRTC and Media over QUIC (MoQ) for other engineers.
Given this article, respond with ONLY a JSON object: {"description": "...", "tags": ["...","..."], "body": "..."}
- description: one neutral sentence (<220 chars) summarizing what the article covers.
- tags: 2-4 short lowercase topical tags (e.g. "webrtc", "moq", "voice-ai", "sfu").
- body: 2-4 sentences of curated commentary for someone deciding whether to click through — not a copy of the article, your own framing of why it matters.

Source: ${sourceName}
Title: ${item.title}
Excerpt: ${item.excerpt}`;

  const response = await client.models.generateContent({
    model: "gemini-flash-latest",
    contents: prompt,
  });

  const text = response.text ?? "{}";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  try {
    const parsed = JSON.parse(jsonMatch?.[0] ?? "{}");
    return {
      description: parsed.description ?? item.excerpt.slice(0, 280),
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      generatedBy: "ai",
      body: parsed.body ?? item.excerpt,
    };
  } catch {
    return {
      description: item.excerpt.slice(0, 280) || item.title,
      tags: [],
      generatedBy: "raw",
      body: item.excerpt || `See the full article at ${sourceName}.`,
    };
  }
}

async function main() {
  const seen = await existingSourceUrls();
  let totalAdded = 0;

  for (const source of SOURCES) {
    const items =
      source.type === "rss" ? await fetchRssSource(source) : await fetchHtmlListSource(source);

    const fresh = items.filter((item) => item.link && !seen.has(item.link) && isRelevant(item));
    const toAdd = fresh.slice(0, MAX_NEW_PER_SOURCE);

    for (const item of toAdd) {
      const summary = await summarize(item, source.name);
      const slug = slugify(item.title);
      const frontmatter = {
        title: item.title,
        description: summary.description,
        pubDate: new Date(item.pubDate).toISOString().slice(0, 10),
        sourceName: source.name,
        sourceUrl: item.link,
        tags: summary.tags,
        generatedBy: summary.generatedBy,
      };
      const file = matter.stringify(`\n${summary.body}\n`, frontmatter);
      await writeFile(path.join(BLOG_DIR, `${slug}.md`), file);
      seen.add(item.link);
      totalAdded += 1;
      console.log(`+ [${source.name}] ${item.title}`);
    }
  }

  console.log(`\nDone. Added ${totalAdded} new post(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
