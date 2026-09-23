// Loads and validates the whole offline question bank (hand-written + glossary-generated).
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

export const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT = path.join(ROOT, "content");
const LANGS = ["en", "hi", "mr"];

export const TOPICS = {
  core: { en: "Mixed essentials", hi: "Mixed essentials", mr: "मूलभूत मिश्र" },
  seo: { en: "SEO", hi: "SEO", mr: "SEO" },
  ppc: { en: "Google Ads & PPC", hi: "Google Ads & PPC", mr: "Google Ads आणि PPC" },
  social: { en: "Social Media Marketing", hi: "Social Media Marketing", mr: "सोशल मीडिया मार्केटिंग" },
  analytics: { en: "Analytics & CRO", hi: "Analytics & CRO", mr: "Analytics आणि CRO" },
  "content-email": { en: "Content, Email & CRM", hi: "Content, Email & CRM", mr: "Content, Email आणि CRM" },
  "ai-basics": { en: "AI & LLM Basics", hi: "AI & LLM Basics", mr: "AI आणि LLM मूलभूत" },
  "ai-advanced": { en: "Advanced AI & LLMs", hi: "Advanced AI & LLMs", mr: "प्रगत AI आणि LLM" },
  "web-ecom": { en: "Web Tech & E-commerce", hi: "Web Tech & E-commerce", mr: "Web Tech आणि E-commerce" },
  glossary: { en: "Glossary terms", hi: "Glossary terms", mr: "शब्दकोश" },
};

const GLOSS_CAT = { seo: "dm", ads: "dm", social: "dm", analytics: "dm", content: "dm", ecom: "dm", web: "tech", ai: "ai" };

export function valid(q) {
  try {
    const opts = (l) => (Array.isArray(q.opts) ? q.opts : q.opts[l]);
    return q.id && Number.isInteger(q.level) && q.level >= 1 && q.level <= 10 && ["dm", "ai", "tech"].includes(q.cat)
      && ["mcq", "situation"].includes(q.type) && Number.isInteger(q.a) && q.a >= 0 && q.a <= 3
      && LANGS.every((l) => typeof q.q[l] === "string" && q.q[l].trim() && typeof q.exp[l] === "string" && q.exp[l].trim()
        && Array.isArray(opts(l)) && opts(l).length === 4 && opts(l).every((o) => typeof o === "string" && o.trim())
        && new Set(opts(l)).size === 4);
  } catch { return false; }
}

// Deterministic PRNG so builds are reproducible.
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

export function loadGlossary() {
  const f = path.join(CONTENT, "glossary.json");
  if (!fs.existsSync(f)) return [];
  return JSON.parse(fs.readFileSync(f, "utf8")).filter((g) => g.term && g.def && LANGS.every((l) => g.def[l]) && GLOSS_CAT[g.cat]);
}

function glossaryQuestions(gloss) {
  const out = [];
  gloss.forEach((g, i) => {
    const r = rng(i + 7);
    const peers = gloss.filter((p) => p.cat === g.cat && p.id !== g.id)
      .map((p) => ({ p, d: Math.abs(p.level - g.level) + r() }))
      .sort((a, b) => a.d - b.d).slice(0, 3).map((x) => x.p);
    if (peers.length < 3) return;
    const cat = GLOSS_CAT[g.cat];
    const expOf = (l) => `${g.term}: ${g.def[l]}`;
    out.push({
      id: `gq-${g.id}`, level: g.level, cat, type: "mcq", topic: "glossary", a: 0,
      q: { en: `What does "${g.term}" mean?`, hi: `"${g.term}" ka matlab kya hai?`, mr: `"${g.term}" म्हणजे काय?` },
      opts: Object.fromEntries(LANGS.map((l) => [l, [g.def[l], ...peers.map((p) => p.def[l])]])),
      exp: Object.fromEntries(LANGS.map((l) => [l, expOf(l)])),
    });
    out.push({
      id: `gr-${g.id}`, level: Math.min(10, g.level + 1), cat, type: "mcq", topic: "glossary", a: 0,
      q: { en: `Which term means: "${g.def.en}"`, hi: `Kaunsa term iska matlab hai: "${g.def.hi}"`, mr: `"${g.def.mr}" — याला कोणता term म्हणतात?` },
      opts: [g.term, ...peers.map((p) => p.term)],
      exp: Object.fromEntries(LANGS.map((l) => [l, expOf(l)])),
    });
  });
  return out;
}

export function loadBank({ log = false } = {}) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(CONTENT, "questions-core.js"), "utf8"), sandbox);
  const all = sandbox.window.QUESTION_BANK.map((q) => ({ ...q, topic: "core" }));

  const bankDir = path.join(CONTENT, "bank");
  if (fs.existsSync(bankDir)) {
    for (const f of fs.readdirSync(bankDir).filter((f) => f.endsWith(".json")).sort()) {
      const topic = f.replace(/\.json$/, "");
      try {
        const items = JSON.parse(fs.readFileSync(path.join(bankDir, f), "utf8"));
        all.push(...items.map((q) => ({ ...q, topic })));
      } catch (e) {
        console.warn(`[bank] skipped ${f}: ${e.message}`);
      }
    }
  }
  all.push(...glossaryQuestions(loadGlossary()));

  const seen = new Set(), seenText = new Set(), good = [], bad = [];
  for (const q of all) {
    const key = q.q?.en?.toLowerCase().replace(/\W+/g, " ").trim();
    if (!valid(q) || seen.has(q.id) || seenText.has(key)) { bad.push(q.id); continue; }
    seen.add(q.id); seenText.add(key); good.push(q);
  }
  if (log && bad.length) console.warn(`[bank] dropped ${bad.length} invalid/duplicate: ${bad.slice(0, 20).join(", ")}${bad.length > 20 ? "…" : ""}`);
  return good;
}
