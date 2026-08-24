import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    sourceName: z.string(),
    sourceUrl: z.string().url(),
    tags: z.array(z.string()).default([]),
    // "ai" = summarized by the fetch pipeline's LLM step, "raw" = fell back
    // to the feed's own excerpt (no ANTHROPIC_API_KEY configured yet).
    generatedBy: z.enum(["ai", "raw", "manual"]).default("manual"),
  }),
});

export const collections = { blog };
