// News feed + Claude-powered question generation and explanations.
import { getFresh, saveFresh } from "./store.js";

const MODEL = "claude-opus-5";
const NEWS_TTL_MS = 60 * 60 * 1000;
const LANGS = ["en", "hi", "mr"];

export const aiEnabled = () =>
  !!(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_PROFILE);

let clientPromise = null;
function getClient() {
  if (!aiEnabled()) return null;
  if (!clientPromise) clientPromise = import("@anthropic-ai/sdk").then(({ default: Anthropic }) => new Anthropic());
  return clientPromise;
}

async function callClaude(messages, { tools, maxTokens = 32000 } = {}) {
  const client = await getClient();
  if (!client) throw new Error("no_key");
  // Server-side fallbacks: if the primary model declines, the API reruns on a fallback model.
  let convo = messages;
  let msg;
  for (let i = 0; i < 5; i++) {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: maxTokens,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      thinking: { type: "adaptive" },
      ...(tools ? { tools } : {}),
      messages: convo,
    });
    msg = await stream.finalMessage();
    // Server tools (web search) can pause long turns — continue them.
    if (msg.stop_reason === "pause_turn") {
      convo = [...convo, { role: "assistant", content: msg.content }];
      continue;
    }
    break;
  }
  if (msg.stop_reason === "refusal") throw new Error("Model declined the request");
  return msg.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text.slice(text.indexOf("["), text.lastIndexOf("]") + 1);
  return JSON.parse(raw);
}

// ---------- News (Google News RSS) ----------
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
      const xml = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 QuizLadder" } })).text();
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

// ---------- Fresh question generation ----------
function validQuestion(q) {
  try {
    return LANGS.every((l) => typeof q.q[l] === "string" && q.q[l] && Array.isArray(q.opts[l]) && q.opts[l].length === 4 && typeof q.exp[l] === "string")
      && Number.isInteger(q.a) && q.a >= 0 && q.a <= 3 && Number.isInteger(q.level) && q.level >= 1 && q.level <= 10;
  } catch { return false; }
}

const GEN_PROMPT = (headlines, today) => `Today is ${today}. You are writing questions for a Digital Marketing + AI/LLM quiz game played by Indian marketers and tech learners.

Use web search to check the latest (last ~30 days) AI model/product launches, LLM technical developments, and digital-marketing platform changes (Google Ads, Meta, SEO/AI Overviews, GA4, etc.). Here are some recent headlines for a starting point:
${headlines}

Write 12 multiple-choice questions based ONLY on facts you verified via search. Mix:
- 4 questions level 3-5 (what launched, who launched it, what it does)
- 4 questions level 6-8 (technical: how it works, why it matters, how a marketer should use it)
- 4 questions level 9-10 (hard "situation" questions: a realistic business scenario where the player must pick the best decision given the new launch/update)
At least 5 must be type "situation". Make wrong options plausible. Exactly one correct answer.

Every question must be written in three languages:
- "en": English
- "hi": Hinglish (Hindi written in Roman/English letters, casual, the way Indian marketers talk; keep technical terms in English)
- "mr": Marathi in Devanagari script (keep brand names/technical terms in English where natural)

Output ONLY a JSON array in a \`\`\`json code block, each item exactly:
{"level": <1-10>, "cat": "ai"|"dm"|"tech", "type": "mcq"|"situation",
 "q": {"en": "...", "hi": "...", "mr": "..."},
 "opts": {"en": ["A","B","C","D"], "hi": [...4], "mr": [...4]},
 "a": <index 0-3 of correct option>,
 "exp": {"en": "2-3 sentence explanation of why the answer is right and why the others are wrong", "hi": "...", "mr": "..."},
 "source": "short source name", "date": "YYYY-MM-DD of the news"}`;

let generating = null;
export const isGenerating = () => !!generating;

export async function generateFresh() {
  if (!aiEnabled()) throw new Error("no_key");
  if (generating) return generating;
  generating = (async () => {
    const news = await getNews();
    const headlines = news.slice(0, 20).map((n) => `- [${n.cat}] ${n.title} (${n.source || ""}, ${n.date})`).join("\n") || "(none available)";
    const today = new Date().toISOString().slice(0, 10);
    const text = await callClaude(
      [{ role: "user", content: GEN_PROMPT(headlines, today) }],
      { tools: [{ type: "web_search_20260209", name: "web_search", max_uses: 8 }] }
    );
    const stamp = Date.now();
    const qs = extractJson(text).filter(validQuestion).map((q, i) => ({ ...q, id: `fresh-${stamp}-${i}`, fresh: true }));
    if (!qs.length) throw new Error("Generation returned no valid questions");
    const data = await saveFresh(qs);
    console.log(`[ai] generated ${qs.length} fresh questions`);
    return data;
  })().finally(() => { generating = null; });
  return generating;
}

export { getFresh };

const LANG_NAME = { en: "English", hi: "Hinglish (Hindi in Roman letters)", mr: "Marathi (Devanagari script)" };

export async function explain({ question, options, correct, chosen, lang }) {
  const prompt = `A learner is playing a Digital Marketing / AI quiz.
Question: ${question}
Options: ${(options || []).map((o, i) => `${i + 1}. ${o}`).join(" | ")}
Correct answer: ${options?.[correct]}
Learner chose: ${chosen == null ? "(no answer — time ran out)" : options?.[chosen]}

Explain in ${LANG_NAME[lang] || "English"}, like a friendly quiz-show host and expert mentor:
1) Why the correct answer is right (simple words, one real-world example from Indian marketing/tech if possible)
2) Why the learner's choice is wrong (if they chose one)
3) One practical tip to remember it
Keep it under 150 words. Plain text, no markdown headings.`;
  return callClaude([{ role: "user", content: prompt }], { maxTokens: 8000 });
}
