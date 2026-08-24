// Sources for the automated blog pipeline (scripts/fetch-articles.mjs).
// type "rss"       — standard RSS/Atom feed, parsed with rss-parser.
// type "html-list" — no feed available; scrape the listing page for post
//                    links, then read each post's og:title/og:description.
export const SOURCES = [
  {
    name: "LiveKit Blog",
    type: "html-list",
    listUrl: "https://livekit.com/blog",
    base: "https://livekit.com",
    linkPattern: /href="(\/blog\/[a-z0-9-]+)"/g,
  },
  {
    name: "WebRTC.ventures",
    type: "rss",
    url: "https://webrtc.ventures/feed/",
  },
  {
    name: "moq.dev",
    type: "rss",
    url: "https://moq.dev/rss.xml",
  },
  {
    name: "webrtcHacks",
    type: "rss",
    url: "https://webrtchacks.com/feed/",
  },
  {
    name: "BlogGeek.me",
    type: "rss",
    url: "https://bloggeek.me/feed.xml",
  },
];

// Only items whose title+excerpt mention one of these are kept — cheap
// relevance filter so a source's off-topic posts don't flood the blog.
export const RELEVANCE_KEYWORDS = [
  "webrtc", "rtc", "real-time", "realtime", "media", "streaming", "stream",
  "sfu", "moq", "quic", "video", "audio", "voice", "agent", "latency",
  "codec", "webtransport", "sip", "rtp",
];

// Cap new posts per source per run so one prolific blog doesn't dominate.
export const MAX_NEW_PER_SOURCE = 3;
