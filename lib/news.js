// Live AI + marketing headlines from Google News RSS (free, no API key, no AI).
const NEWS_TTL_MS = 60 * 60 * 1000;
const NEWS_QUERIES = [
  { cat: "ai", q: "AI model launch OR LLM release OR OpenAI OR Anthropic OR Gemini" },
  { cat: "dm", q: "Google Ads update OR Meta Ads update OR SEO algorithm update OR digital marketing AI" },
];
let newsCache = { at: 0, items: [] };

function decode(s = "") {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
}

export async function getNews() {
  if (Date.now() - newsCache.at < NEWS_TTL_MS && newsCache.items.length) return newsCache.items;
  const all = [];
  await Promise.all(NEWS_QUERIES.map(async ({ cat, q }) => {
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q + " when:7d")}&hl=en-IN&gl=IN&ceid=IN:en`;
      const xml = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 DigiCrorepati" } })).text();
      for (const item of xml.split("<item>").slice(1, 13)) {
        const get = (tag) => decode((item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`)) || [])[1]);
        all.push({ cat, title: get("title"), link: get("link"), date: get("pubDate"), source: get("source") });
      }
    } catch (e) {
      console.warn("[news] fetch failed:", e.message);
    }
  }));
  if (all.length) {
    all.sort((a, b) => new Date(b.date) - new Date(a.date));
    newsCache = { at: Date.now(), items: all };
  }
  return newsCache.items;
}
