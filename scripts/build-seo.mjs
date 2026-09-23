// Builds static, crawlable SEO pages into /public from the offline question bank:
//  - /quiz/<topic>[-page-N] in en + /hi + /mr (hreflang-linked): questions with answers & explanations
//  - /glossary/ (+ /hi, /mr): 200 terms, DefinedTermSet schema
//  - /blog/…, /about, /advertise, /contact, /privacy, /terms, 404, sitemap.xml, robots.txt, ads.txt
// Run: node scripts/build-seo.mjs   (Vercel runs it automatically)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { POSTS } from "../content/blog-posts.mjs";
import { loadBank, loadGlossary, ROOT } from "./bank-lib.mjs";

const PUB = path.join(ROOT, "public");
const SITE = (process.env.SITE_URL || "https://digicrorepati.vercel.app").replace(/\/$/, "");
const BRAND = "DigiCrorepati";
const CONTACT = process.env.CONTACT_EMAIL || "";
const REPO = process.env.REPO_URL || "https://github.com/sumitnyayadhish/digicrorepati";
const TODAY = new Date().toISOString().slice(0, 10);
const LANGS = ["en", "hi", "mr"];
const PER_PAGE = 40;

const BANK = loadBank();
const GLOSSARY = loadGlossary();

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const optsOf = (q, l) => (Array.isArray(q.opts) ? q.opts : q.opts[l]);
const langPrefix = (l) => (l === "en" ? "" : "/" + l);
const write = (rel, html) => {
  const file = path.join(PUB, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};
const urls = [];

// Clean previously generated folders so removed pages don't linger.
for (const d of ["quiz", "hi", "mr", "blog", "glossary"]) fs.rmSync(path.join(PUB, d), { recursive: true, force: true });

// ---------- page shell ----------
const UI = {
  en: { quizzes: "Quizzes", blog: "Blog", glossary: "Glossary", play: "▶ Play the quiz game", home: "Home", showAns: "Show answer & explanation", answer: "Answer", level: "Level", situation: "Situation question", page: "Page" },
  hi: { quizzes: "Quizzes", blog: "Blog", glossary: "Glossary", play: "▶ Quiz game khelo", home: "Home", showAns: "Answer aur explanation dekho", answer: "Answer", level: "Level", situation: "Situation sawaal", page: "Page" },
  mr: { quizzes: "क्विझ", blog: "ब्लॉग", glossary: "शब्दकोश", play: "▶ क्विझ गेम खेळा", home: "मुख्यपृष्ठ", showAns: "उत्तर आणि स्पष्टीकरण पहा", answer: "उत्तर", level: "Level", situation: "परिस्थिती प्रश्न", page: "पान" },
};
const HTML_LANG = { en: "en", hi: "hi-Latn", mr: "mr" };

function page({ lang = "en", title, description, pathname, body, jsonld = [], alternates = null, keywords = [], type = "website", noindex = false }) {
  const url = SITE + pathname;
  const ui = UI[lang];
  const alt = alternates
    ? Object.entries(alternates).map(([l, p]) => `<link rel="alternate" hreflang="${l}" href="${SITE + p}" />`).join("\n  ") +
      `\n  <link rel="alternate" hreflang="x-default" href="${SITE + alternates.en}" />`
    : "";
  return `<!doctype html>
<html lang="${HTML_LANG[lang]}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  ${keywords.length ? `<meta name="keywords" content="${esc(keywords.join(", "))}" />` : ""}
  ${noindex ? '<meta name="robots" content="noindex" />' : ""}
  <link rel="canonical" href="${url}" />
  ${alt}
  <meta name="theme-color" content="#050a2e" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="${BRAND}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Inter:wght@400;600;700;800&family=Noto+Sans+Devanagari:wght@400;600;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/style.css" />
  ${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join("\n  ")}
  <script src="/ads-config.js"></script>
  <script src="/ads.js" defer></script>
</head>
<body class="${lang === "mr" ? "lang-mr" : ""}">
  <div class="stage-bg" aria-hidden="true"><div class="beam b1"></div><div class="beam b2"></div><div class="beam b3"></div></div>
  <header class="topbar">
    <a class="brand" href="/"><img src="/favicon.svg" alt="" width="30" height="30" /> <span>${BRAND}</span></a>
    <nav class="top-nav" aria-label="Main"><a href="${langPrefix(lang)}/quiz/">${ui.quizzes}</a><a href="${langPrefix(lang)}/glossary/">${ui.glossary}</a><a href="/blog/">${ui.blog}</a></nav>
    <div class="top-right"><a class="lz lz-gold small" href="/" style="text-decoration:none">${ui.play}</a></div>
  </header>
  <main>
    <div class="content">
${body}
      <div class="ad-slot" data-slot="article" aria-label="Advertisement"></div>
    </div>
  </main>
  <footer class="foot">
    <nav aria-label="Footer"><a href="/quiz/">Quizzes</a> · <a href="/glossary/">Glossary</a> · <a href="/blog/">Blog</a> · <a href="/about">About</a> · <a href="/advertise">Advertise</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms</a></nav>
    <p>© ${new Date().getFullYear()} ${BRAND}. Prize money in the game is virtual.</p>
  </footer>
</body>
</html>
`;
}

const breadcrumb = (items) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + p })),
});

// ---------- marketing-maths questions (deterministic, from the same generator the game uses) ----------
const calcSandbox = { window: {}, Math, Number, String, Object, Array };
vm.runInNewContext(fs.readFileSync(path.join(PUB, "calc.js"), "utf8"), calcSandbox);
const Calc = calcSandbox.window.Calc;
const MATHS = Array.from({ length: 40 }, (_, i) => {
  const level = 1 + (i % 10);
  return { ...Calc.generate(level, Calc.rngFrom(9001 + i), `seo-${i}`), topic: "maths" };
}).sort((a, b) => a.level - b.level);

// ---------- topic pages ----------
const T3 = (en, hi, mr) => ({ en, hi, mr });
const TOPICS = [
  { slug: "digital-marketing-quiz", filter: (q) => q.topic === "core",
    h1: T3("Digital Marketing & AI Quiz: 60 Essential Questions", "Digital Marketing & AI Quiz: 60 Zaroori Sawaal", "डिजिटल मार्केटिंग आणि AI क्विझ: 60 महत्त्वाचे प्रश्न"),
    desc: T3("60 essential digital marketing and AI quiz questions with answers and explanations, from beginner to expert — a free mock test.", "60 zaroori digital marketing aur AI quiz sawaal answers aur explanations ke saath — free mock test.", "60 महत्त्वाचे डिजिटल मार्केटिंग आणि AI क्विझ प्रश्न उत्तरे आणि स्पष्टीकरणांसह — मोफत मॉक टेस्ट."),
    keywords: ["digital marketing quiz", "digital marketing quiz with answers", "digital marketing mock test", "digital marketing MCQ"] },
  { slug: "seo", filter: (q) => q.topic === "seo",
    h1: T3("SEO Quiz: Questions & Answers", "SEO Quiz: Sawaal aur Jawab", "SEO क्विझ: प्रश्न आणि उत्तरे"),
    desc: T3("Free SEO quiz with answers: keywords, on-page, technical SEO, local SEO, links, E-E-A-T and AI search — beginner to expert.", "Free SEO quiz answers ke saath: keywords, on-page, technical SEO, local SEO, links, E-E-A-T, AI search.", "मोफत SEO क्विझ उत्तरांसह: keywords, on-page, technical SEO, local SEO, links, E-E-A-T, AI search."),
    keywords: ["SEO quiz", "SEO questions and answers", "technical SEO quiz", "SEO MCQ", "SEO interview questions"] },
  { slug: "google-ads-ppc", filter: (q) => q.topic === "ppc",
    h1: T3("Google Ads & PPC Quiz", "Google Ads & PPC Quiz", "Google Ads आणि PPC क्विझ"),
    desc: T3("Google Ads quiz with answers — auction, Quality Score, match types, bidding, Performance Max, conversion tracking. Great for Google Ads certification practice.", "Google Ads quiz answers ke saath — auction, Quality Score, match types, bidding, Performance Max. Certification practice ke liye best.", "Google Ads क्विझ उत्तरांसह — auction, Quality Score, match types, bidding, Performance Max. Certification सरावासाठी उत्तम."),
    keywords: ["google ads quiz", "google ads certification questions", "PPC quiz", "google ads MCQ"] },
  { slug: "social-media-marketing", filter: (q) => q.topic === "social",
    h1: T3("Social Media Marketing Quiz", "Social Media Marketing Quiz", "सोशल मीडिया मार्केटिंग क्विझ"),
    desc: T3("Social media marketing quiz with answers: Meta Ads, Instagram Reels, YouTube, LinkedIn, influencer marketing and ASCI guidelines.", "Social media marketing quiz answers ke saath: Meta Ads, Instagram Reels, YouTube, LinkedIn, influencer marketing.", "सोशल मीडिया मार्केटिंग क्विझ उत्तरांसह: Meta Ads, Instagram Reels, YouTube, LinkedIn, influencer marketing."),
    keywords: ["social media marketing quiz", "meta ads quiz", "instagram marketing quiz", "facebook ads questions"] },
  { slug: "analytics-cro", filter: (q) => q.topic === "analytics",
    h1: T3("Analytics, GA4 & CRO Quiz", "Analytics, GA4 & CRO Quiz", "Analytics, GA4 आणि CRO क्विझ"),
    desc: T3("GA4, Google Tag Manager, attribution, A/B testing and conversion rate optimization quiz with answers.", "GA4, GTM, attribution, A/B testing aur CRO quiz answers ke saath.", "GA4, GTM, attribution, A/B testing आणि CRO क्विझ उत्तरांसह."),
    keywords: ["GA4 quiz", "google analytics quiz", "google analytics certification questions", "A/B testing quiz"] },
  { slug: "content-email-crm", filter: (q) => q.topic === "content-email",
    h1: T3("Content, Email & CRM Marketing Quiz", "Content, Email & CRM Marketing Quiz", "Content, Email आणि CRM मार्केटिंग क्विझ"),
    desc: T3("Content marketing, copywriting, email marketing, WhatsApp marketing and CRM quiz with answers and explanations.", "Content marketing, copywriting, email, WhatsApp marketing aur CRM quiz answers ke saath.", "Content marketing, copywriting, email, WhatsApp marketing आणि CRM क्विझ उत्तरांसह."),
    keywords: ["content marketing quiz", "email marketing quiz", "copywriting quiz", "CRM quiz"] },
  { slug: "ai-llm-basics", filter: (q) => q.topic === "ai-basics" || (q.topic === "core" && q.cat === "ai" && q.level <= 5),
    h1: T3("AI & LLM Quiz for Beginners", "AI & LLM Quiz (Beginners)", "AI आणि LLM क्विझ (नवशिक्यांसाठी)"),
    desc: T3("Free AI quiz: what LLMs are, tokens, prompts, hallucinations, generative AI tools and responsible AI — with answers.", "Free AI quiz: LLM, tokens, prompts, hallucination, generative AI tools aur responsible AI — answers ke saath.", "मोफत AI क्विझ: LLM, tokens, prompts, hallucination, generative AI tools आणि responsible AI — उत्तरांसह."),
    keywords: ["AI quiz", "LLM quiz", "generative AI quiz", "ChatGPT quiz", "artificial intelligence quiz with answers"] },
  { slug: "advanced-ai-llm", filter: (q) => q.topic === "ai-advanced" || (q.topic === "core" && q.cat === "ai" && q.level > 5),
    h1: T3("Advanced AI & LLM Quiz", "Advanced AI & LLM Quiz", "प्रगत AI आणि LLM क्विझ"),
    desc: T3("Advanced AI quiz: transformers, fine-tuning, RLHF, RAG, embeddings, agents, evaluation, quantization and inference — with answers.", "Advanced AI quiz: transformers, fine-tuning, RLHF, RAG, agents, evaluation, quantization — answers ke saath.", "प्रगत AI क्विझ: transformers, fine-tuning, RLHF, RAG, agents, evaluation, quantization — उत्तरांसह."),
    keywords: ["machine learning quiz", "LLM engineering quiz", "RAG quiz", "deep learning MCQ"] },
  { slug: "web-tech-ecommerce", filter: (q) => q.topic === "web-ecom" || (q.topic === "core" && q.cat === "tech"),
    h1: T3("Web Tech & E-commerce Quiz", "Web Tech & E-commerce Quiz", "Web Tech आणि E-commerce क्विझ"),
    desc: T3("Web tech and e-commerce quiz: DNS, hosting, CDN, HTTPS, WordPress, Shopify, D2C metrics, UPI, marketplaces and unit economics.", "Web tech aur e-commerce quiz: DNS, hosting, CDN, HTTPS, WordPress, Shopify, D2C metrics, UPI.", "Web tech आणि e-commerce क्विझ: DNS, hosting, CDN, HTTPS, WordPress, Shopify, D2C metrics, UPI."),
    keywords: ["e-commerce quiz", "web technology quiz", "D2C marketing quiz", "website basics quiz"] },
  { slug: "digital-marketing-situation-questions", filter: (q) => q.type === "situation",
    h1: T3("Situation-Based Digital Marketing & AI Questions", "Situation-Based Digital Marketing & AI Sawaal", "परिस्थिती-आधारित डिजिटल मार्केटिंग आणि AI प्रश्न"),
    desc: T3("Scenario-based digital marketing and AI interview questions with model answers: diagnosing campaigns, budgets, attribution, SEO drops and more.", "Scenario-based digital marketing aur AI interview questions model answers ke saath.", "परिस्थिती-आधारित डिजिटल मार्केटिंग आणि AI मुलाखत प्रश्न उत्तरांसह."),
    keywords: ["situation based digital marketing interview questions", "scenario based marketing questions", "digital marketing case study questions"] },
  { slug: "marketing-maths-questions", pool: MATHS,
    h1: T3("Digital Marketing Maths: CTR, ROAS, CPA & More (Practice Questions)", "Digital Marketing Maths: CTR, ROAS, CPA Practice", "डिजिटल मार्केटिंग गणित: CTR, ROAS, CPA सराव प्रश्न"),
    desc: T3("Practice digital marketing formulas with worked answers: CTR, CPC, CPM, CPA, ROAS, ROI, break-even ROAS, LTV:CAC, CAC payback and budget planning.", "Digital marketing formulas practice: CTR, CPC, CPM, CPA, ROAS, ROI, break-even ROAS, LTV:CAC — solved answers ke saath.", "डिजिटल मार्केटिंग सूत्रांचा सराव: CTR, CPC, CPM, CPA, ROAS, ROI, break-even ROAS, LTV:CAC — सोडवलेल्या उत्तरांसह."),
    keywords: ["digital marketing formulas", "ROAS calculation", "CTR formula", "marketing metrics questions", "CPA calculation"] },
];

const topicSummaries = [];
for (const topic of TOPICS) {
  const qs = (topic.pool || BANK.filter(topic.filter)).sort((a, b) => a.level - b.level || String(a.id).localeCompare(String(b.id)));
  if (!qs.length) continue;
  const pages = Math.ceil(qs.length / PER_PAGE);
  topicSummaries.push({ topic, count: qs.length });
  for (let p = 1; p <= pages; p++) {
    const slugP = p === 1 ? topic.slug : `${topic.slug}-page-${p}`;
    const alternates = Object.fromEntries(LANGS.map((l) => [l, `${langPrefix(l)}/quiz/${slugP}`]));
    const chunk = qs.slice((p - 1) * PER_PAGE, p * PER_PAGE);
    for (const lang of LANGS) {
      const ui = UI[lang];
      const pathname = alternates[lang];
      const items = chunk.map((q, n) => {
        const opts = optsOf(q, lang);
        const num = (p - 1) * PER_PAGE + n + 1;
        return `<div class="qa" id="q${num}">
        <div class="meta">${ui.level} ${q.level}${q.type === "situation" ? ` · ${ui.situation}` : ""}</div>
        <div class="qn">Q${num}. ${esc(q.q[lang])}</div>
        <ol type="A">${opts.map((o) => `<li>${esc(o)}</li>`).join("")}</ol>
        <details><summary>${ui.showAns}</summary>
          <p><strong>${ui.answer}: ${"ABCD"[q.a]}. ${esc(opts[q.a])}</strong></p>
          <p>${esc(q.exp[lang])}</p>
        </details>
      </div>`;
      }).join("\n");
      const pager = pages > 1 ? `<nav class="pager" aria-label="${ui.page}">${Array.from({ length: pages }, (_, i) => i + 1).map((i) =>
        i === p ? `<span>${i}</span>` : `<a href="${langPrefix(lang)}/quiz/${i === 1 ? topic.slug : `${topic.slug}-page-${i}`}">${i}</a>`).join("")}</nav>` : "";
      const title = `${topic.h1[lang]}${p > 1 ? ` – ${ui.page} ${p}` : ""} | ${BRAND}`;
      const body = `
      <div class="breadcrumb"><a href="/">${ui.home}</a> › <a href="${langPrefix(lang)}/quiz/">${ui.quizzes}</a></div>
      <h1>${esc(topic.h1[lang])}${p > 1 ? ` <small>(${ui.page} ${p})</small>` : ""}</h1>
      <div class="lang-links">🌐 <a href="${alternates.en}" hreflang="en">English</a> · <a href="${alternates.hi}" hreflang="hi">Hinglish</a> · <a href="${alternates.mr}" hreflang="mr">मराठी</a></div>
      <p>${esc(topic.desc[lang])}</p>
      <p><a class="lz lz-gold small cta" href="/">${ui.play}</a></p>
      ${pager}
      ${items}
      ${pager}
      <p><a class="lz lz-gold small cta" href="/">${ui.play}</a></p>`;
      const quizLd = {
        "@context": "https://schema.org", "@type": "Quiz", name: topic.h1[lang], about: topic.keywords[0], inLanguage: HTML_LANG[lang],
        educationalLevel: "Beginner to Advanced", url: SITE + pathname,
        hasPart: chunk.map((q) => ({
          "@type": "Question", eduQuestionType: "Multiple choice", text: q.q[lang],
          acceptedAnswer: { "@type": "Answer", text: optsOf(q, lang)[q.a] },
          suggestedAnswer: optsOf(q, lang).filter((_, i) => i !== q.a).map((o) => ({ "@type": "Answer", text: o })),
        })),
      };
      write(`${pathname.slice(1)}.html`, page({
        lang, title, description: topic.desc[lang], pathname, body, alternates, keywords: topic.keywords,
        jsonld: [quizLd, breadcrumb([[ui.home, "/"], [ui.quizzes, `${langPrefix(lang)}/quiz/`], [topic.h1[lang], pathname]])],
      }));
      urls.push({ loc: pathname, alternates, priority: p === 1 ? (lang === "en" ? 0.9 : 0.8) : 0.6 });
    }
  }
}

// quiz hubs
for (const lang of LANGS) {
  const ui = UI[lang];
  const pathname = `${langPrefix(lang)}/quiz/`;
  const alternates = { en: "/quiz/", hi: "/hi/quiz/", mr: "/mr/quiz/" };
  const body = `
      <div class="breadcrumb"><a href="/">${ui.home}</a></div>
      <h1>${lang === "mr" ? "सर्व क्विझ" : lang === "hi" ? "Saare Quizzes" : "All Quizzes"}</h1>
      <div class="lang-links">🌐 <a href="/quiz/">English</a> · <a href="/hi/quiz/">Hinglish</a> · <a href="/mr/quiz/">मराठी</a></div>
      <p>${BANK.length.toLocaleString("en-IN")} ${lang === "mr" ? "प्रश्न, उत्तरे आणि स्पष्टीकरणांसह." : lang === "hi" ? "sawaal, answers aur explanations ke saath." : "questions with answers and explanations."}</p>
      <ul class="card-list">${topicSummaries.map(({ topic: t, count }) => `<li><a href="${langPrefix(lang)}/quiz/${t.slug}">${esc(t.h1[lang])}</a><p class="meta">${count} · ${esc(t.desc[lang])}</p></li>`).join("")}</ul>
      <p><a class="lz lz-gold small cta" href="/">${ui.play}</a></p>`;
  write(`${pathname.slice(1)}index.html`, page({
    lang, title: `${lang === "mr" ? "डिजिटल मार्केटिंग आणि AI क्विझ" : "Digital Marketing & AI Quizzes with Answers"} | ${BRAND}`,
    description: topicSummaries.map(({ topic: t }) => t.h1[lang]).join(" · "), pathname, body, alternates,
  }));
  urls.push({ loc: pathname, alternates, priority: 0.85 });
}

// ---------- glossary ----------
const GCAT = {
  seo: T3("SEO", "SEO", "SEO"), ads: T3("Advertising", "Advertising", "जाहिरात"), social: T3("Social media", "Social media", "सोशल मीडिया"),
  analytics: T3("Analytics", "Analytics", "Analytics"), content: T3("Content, email & CRM", "Content, email & CRM", "Content, email आणि CRM"),
  ecom: T3("E-commerce & growth", "E-commerce & growth", "E-commerce आणि growth"), web: T3("Web technology", "Web technology", "Web technology"), ai: T3("AI & LLMs", "AI & LLMs", "AI आणि LLM"),
};
if (GLOSSARY.length) {
  const alternates = { en: "/glossary/", hi: "/hi/glossary/", mr: "/mr/glossary/" };
  for (const lang of LANGS) {
    const ui = UI[lang];
    const pathname = alternates[lang];
    const h1 = { en: "Digital Marketing & AI Glossary", hi: "Digital Marketing & AI Glossary (Hinglish)", mr: "डिजिटल मार्केटिंग आणि AI शब्दकोश" }[lang];
    const desc = { en: `${GLOSSARY.length} digital marketing, SEO, ads, analytics, e-commerce and AI terms explained in simple words.`, hi: `${GLOSSARY.length} digital marketing, SEO, ads, analytics, e-commerce aur AI terms simple Hinglish mein.`, mr: `${GLOSSARY.length} डिजिटल मार्केटिंग, SEO, ads, analytics, e-commerce आणि AI संज्ञा सोप्या मराठीत.` }[lang];
    const sections = Object.keys(GCAT).map((c) => {
      const terms = GLOSSARY.filter((g) => g.cat === c).sort((a, b) => a.term.localeCompare(b.term));
      if (!terms.length) return "";
      return `<h2 id="${c}">${esc(GCAT[c][lang])}</h2><dl class="glossary-list">${terms.map((g) => `<dt id="${esc(g.id)}">${esc(g.term)}</dt><dd>${esc(g.def[lang])}</dd>`).join("")}</dl>`;
    }).join("\n");
    const body = `
      <div class="breadcrumb"><a href="/">${ui.home}</a></div>
      <h1>${esc(h1)}</h1>
      <div class="lang-links">🌐 <a href="/glossary/">English</a> · <a href="/hi/glossary/">Hinglish</a> · <a href="/mr/glossary/">मराठी</a></div>
      <p>${esc(desc)}</p>
      <p>${Object.keys(GCAT).map((c) => `<a href="#${c}">${esc(GCAT[c][lang])}</a>`).join(" · ")}</p>
      <p><a class="lz lz-gold small cta" href="/">${ui.play}</a></p>
      ${sections}`;
    write(`${pathname.slice(1)}index.html`, page({
      lang, title: `${h1} | ${BRAND}`, description: desc, pathname, body, alternates,
      keywords: ["digital marketing glossary", "digital marketing terms", "SEO terms", "AI glossary", "marketing terms meaning"],
      jsonld: [{
        "@context": "https://schema.org", "@type": "DefinedTermSet", name: h1, inLanguage: HTML_LANG[lang], url: SITE + pathname,
        hasDefinedTerm: GLOSSARY.map((g) => ({ "@type": "DefinedTerm", name: g.term, description: g.def[lang], url: `${SITE}${pathname}#${g.id}` })),
      }],
    }));
    urls.push({ loc: pathname, alternates, priority: 0.8 });
  }
}

// ---------- blog ----------
for (const post of POSTS) {
  const pathname = `/blog/${post.slug}`;
  const body = `
      <div class="breadcrumb"><a href="/">Home</a> › <a href="/blog/">Blog</a></div>
      <article>
        <h1>${esc(post.title)}</h1>
        <p class="meta">${BRAND} Team · <time datetime="${post.date}">${post.date}</time></p>
        ${post.body}
        <p><a class="lz lz-gold small cta" href="/">${UI[post.lang].play}</a></p>
      </article>`;
  write(`blog/${post.slug}.html`, page({
    lang: post.lang, title: `${post.title} | ${BRAND}`, description: post.description, pathname, body, keywords: post.keywords, type: "article",
    jsonld: [
      { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.date,
        inLanguage: HTML_LANG[post.lang], author: { "@type": "Organization", name: BRAND }, publisher: { "@type": "Organization", name: BRAND, logo: { "@type": "ImageObject", url: `${SITE}/icon-512.png` } },
        image: `${SITE}/og.png`, mainEntityOfPage: SITE + pathname, keywords: post.keywords.join(", ") },
      breadcrumb([["Home", "/"], ["Blog", "/blog/"], [post.title, pathname]]),
    ],
  }));
  urls.push({ loc: pathname, priority: 0.7, lastmod: post.date });
}
write("blog/index.html", page({
  title: `Digital Marketing & AI Study Guides | ${BRAND} Blog`,
  description: "Study guides for digital marketing interviews, Google Ads and GA4 certifications, marketing formulas, AI/LLM basics and GEO — in English, Hinglish and Marathi.",
  pathname: "/blog/",
  body: `
      <div class="breadcrumb"><a href="/">Home</a></div>
      <h1>Blog & Study Guides</h1>
      <ul class="card-list">${POSTS.map((p) => `<li><a href="/blog/${p.slug}" hreflang="${p.lang}">${esc(p.title)}</a><p class="meta">${esc(p.description)}</p></li>`).join("")}</ul>`,
}));
urls.push({ loc: "/blog/", priority: 0.8 });

// ---------- trust / business pages ----------
const contactLine = CONTACT
  ? `<p>Email: <a href="mailto:${esc(CONTACT)}">${esc(CONTACT)}</a></p>`
  : `<p>Open an issue on our <a href="${esc(REPO)}/issues" rel="noopener">GitHub repository</a>.</p>`;

const STATIC_PAGES = {
  about: ["About DigiCrorepati", "About DigiCrorepati — a free, game-style digital marketing and AI quiz in English, Hinglish and Marathi.", `
      <h1>About ${BRAND}</h1>
      <p>${BRAND} is a free quiz game that helps students, job seekers and working marketers learn digital marketing and AI the fun way — on a 10-level prize ladder inspired by TV quiz shows.</p>
      <p>The game has ${BANK.length.toLocaleString("en-IN")} reviewed questions plus unlimited marketing-maths practice, with explanations in English, Hinglish and Marathi, because people learn fastest in the language they think in.</p>
      <p>Prize amounts in the game are virtual and for fun only. The content is educational and is not professional, legal or financial advice.</p>`],
  advertise: ["Advertise with DigiCrorepati", "Reach digital marketing and AI learners in India: sponsorships, sponsored questions, certificates, lead generation and display ads.", `
      <h1>Advertise with ${BRAND}</h1>
      <p>Our players are students, job seekers, freelancers and working marketers in India who are actively learning <strong>digital marketing and AI</strong> — the exact audience for courses, tools, agencies and recruiters. Content is available in English, Hinglish and Marathi.</p>
      <h2>Ways to partner</h2>
      <ul>
        <li><strong>Title sponsorship</strong> — "Powered by <em>your brand</em>" on the home page, every result screen and every certificate players share on LinkedIn.</li>
        <li><strong>Sponsored level or daily challenge</strong> — your brand on a level or on the daily challenge for a week or month.</li>
        <li><strong>Career-counselling leads</strong> — opt-in, consented leads from players who want digital marketing courses, jobs or internships (pay per lead, filterable by city and level reached).</li>
        <li><strong>Recommended course / tool placement</strong> — your course or product in the "Recommended for you" section, matched to topics the player needs to improve.</li>
        <li><strong>Sponsored study guide</strong> — a clearly-labelled article on our blog.</li>
        <li><strong>Campus & corporate quizzes</strong> — a branded quiz league for your college, institute or team.</li>
      </ul>
      <p>All sponsored placements are clearly labelled. We never place ads next to answer buttons during a question.</p>
      <h2>Get in touch</h2>
      ${contactLine}`],
  contact: ["Contact", `Contact the ${BRAND} team.`, `
      <h1>Contact</h1>
      <p>Found a mistake in a question, have a suggestion, or want to <a href="/advertise">advertise or partner with us</a>? We'd love to hear from you.</p>
      ${contactLine}`],
  privacy: ["Privacy Policy", `Privacy policy for ${BRAND}.`, `
      <h1>Privacy Policy</h1>
      <p class="meta">Last updated: ${TODAY}</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Game progress</strong> (levels, stars, XP, daily streak, language, sound settings) is stored in your browser's local storage on your device.</li>
        <li><strong>Leaderboard:</strong> if you enter a name, we store that name, a random player ID and your score on our server. Don't use your full real name if you prefer not to.</li>
        <li><strong>Career-counselling form (optional):</strong> if you submit it and tick the consent box, we store your name, mobile number, city, interest, level reached and language, and may share them with partner institutes so they can contact you about courses and careers. You can withdraw consent and ask us to delete your details at any time via the <a href="/contact">Contact page</a>.</li>
        <li>Our hosting provider may keep standard server logs (such as IP address and browser type) for security and reliability.</li>
      </ul>
      <h2>Cookies and advertising</h2>
      <p>We may show ads from Google AdSense and other advertising partners. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visits to this site and/or other sites on the Internet.</p>
      <p>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="noopener">Google Ads Settings</a>, or opt out of some third-party vendors' use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" rel="noopener">www.aboutads.info</a>. Learn more about <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">how Google uses data from partner sites</a>.</p>
      <p>Some links (sponsors, recommended courses) are affiliate or sponsored links; we may earn a commission if you buy, at no extra cost to you.</p>
      <h2>Your rights</h2>
      <p>You can clear your game progress at any time by clearing your browser's site data. To remove your leaderboard entry or form details, or to ask a privacy question, contact us. We handle personal data in line with applicable law, including India's Digital Personal Data Protection Act, 2023.</p>
      <h2>Children</h2>
      <p>The site is intended for a general audience and is not directed at children under 13. The career-counselling form is intended for users aged 18 and over.</p>
      <h2>Changes</h2>
      <p>We may update this policy; the date above shows the latest version.</p>`],
  terms: ["Terms of Use", `Terms of use for ${BRAND}.`, `
      <h1>Terms of Use</h1>
      <p class="meta">Last updated: ${TODAY}</p>
      <p>By using ${BRAND} you agree to these terms.</p>
      <ul>
        <li>The quiz is for education and entertainment. Prize amounts are <strong>virtual</strong> — no real money is offered or paid.</li>
        <li>Certificates are skill-practice certificates from a free online game and are not official or accredited qualifications.</li>
        <li>We try to keep questions accurate, but technology and platform rules change quickly. Verify important information before acting on it, and please report errors via the Contact page.</li>
        <li>Don't use offensive names on the leaderboard; we may remove entries at our discretion.</li>
        <li>Sponsored content and affiliate links are labelled. Brand names mentioned belong to their respective owners. ${BRAND} is not affiliated with any TV show, Google, Meta, OpenAI, Anthropic or other company mentioned.</li>
      </ul>`],
};
for (const [slug, [title, description, body]] of Object.entries(STATIC_PAGES)) {
  write(`${slug}.html`, page({ title: `${title} | ${BRAND}`, description, pathname: `/${slug}`, body: `<div class="breadcrumb"><a href="/">Home</a></div>${body}` }));
  urls.push({ loc: `/${slug}`, priority: slug === "advertise" ? 0.5 : 0.3 });
}

write("404.html", page({
  title: `Page not found | ${BRAND}`, description: "Page not found.", pathname: "/404", noindex: true,
  body: `<h1>Page not found</h1><p>This page doesn't exist — but the quiz does!</p><p><a class="lz lz-gold small cta" href="/">▶ Play the quiz game</a></p>`,
}));

// ---------- sitemap + robots + ads.txt ----------
urls.unshift({ loc: "/", priority: 1.0, changefreq: "daily" });
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod || TODAY}</lastmod>
    <changefreq>${u.changefreq || "weekly"}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${u.alternates ? Object.entries(u.alternates).map(([l, p]) => `
    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${p}" />`).join("") : ""}
  </url>`).join("\n")}
</urlset>
`);
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);

const adsSandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(PUB, "ads-config.js"), "utf8"), adsSandbox);
const pub = (adsSandbox.window.ADS_CONFIG?.adsenseClient || "").replace(/^ca-/, "");
if (pub) write("ads.txt", `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);
else fs.rmSync(path.join(PUB, "ads.txt"), { force: true });

// Point canonical/OG URLs in the hand-written home page at the configured site.
const indexPath = path.join(PUB, "index.html");
fs.writeFileSync(indexPath, fs.readFileSync(indexPath, "utf8").replace(/https:\/\/[a-z0-9.-]+\.[a-z]+(?=\/(#site|og\.png|"))/g, SITE));

console.log(`SEO build: ${urls.length} URLs (${BANK.length} bank questions, ${GLOSSARY.length} glossary terms) → ${SITE}/sitemap.xml`);
