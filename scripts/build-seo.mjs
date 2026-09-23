// Builds static, crawlable SEO pages into /public:
//  - /quiz/<topic> (+ /hi/quiz/<topic>, /mr/quiz/<topic>) : every question with answer + explanation, hreflang-linked
//  - /blog/ and /blog/<slug>
//  - /about, /contact, /privacy, /terms (needed for AdSense approval)
//  - sitemap.xml, robots.txt
// Run: node scripts/build-seo.mjs   (Vercel runs it automatically as the build command)
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { POSTS } from "../content/blog-posts.mjs";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUB = path.join(ROOT, "public");
const SITE = (process.env.SITE_URL || "https://digicrorepati.vercel.app").replace(/\/$/, "");
const BRAND = "DigiCrorepati";
const CONTACT = process.env.CONTACT_EMAIL || "";
const REPO = process.env.REPO_URL || "";
const TODAY = new Date().toISOString().slice(0, 10);

// ---------- load question bank ----------
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(PUB, "questions.js"), "utf8"), sandbox);
const BANK = sandbox.window.QUESTION_BANK;

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const optsOf = (q, l) => (Array.isArray(q.opts) ? q.opts : q.opts[l]);
const write = (rel, html) => {
  const file = path.join(PUB, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};
const urls = [];

// ---------- page shell ----------
const UI = {
  en: { quizzes: "Quizzes", blog: "Blog", play: "▶ Play the quiz game", home: "Home", showAns: "Show answer & explanation", answer: "Answer", level: "Level", situation: "Situation question" },
  hi: { quizzes: "Quizzes", blog: "Blog", play: "▶ Quiz game khelo", home: "Home", showAns: "Answer aur explanation dekho", answer: "Answer", level: "Level", situation: "Situation sawaal" },
  mr: { quizzes: "क्विझ", blog: "ब्लॉग", play: "▶ क्विझ गेम खेळा", home: "मुख्यपृष्ठ", showAns: "उत्तर आणि स्पष्टीकरण पहा", answer: "उत्तर", level: "Level", situation: "परिस्थिती प्रश्न" },
};
const HTML_LANG = { en: "en", hi: "hi-Latn", mr: "mr" };

function page({ lang = "en", title, description, pathname, body, jsonld = [], alternates = null, keywords = [], type = "website" }) {
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
  <link rel="canonical" href="${url}" />
  ${alt}
  <meta name="theme-color" content="#050a2e" />
  <meta property="og:type" content="${type}" />
  <meta property="og:site_name" content="${BRAND}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${SITE}/og.svg" />
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
    <nav class="top-nav" aria-label="Main"><a href="${lang === "en" ? "" : "/" + lang}/quiz/">${ui.quizzes}</a><a href="/blog/">${ui.blog}</a></nav>
    <div class="top-right"><a class="lz lz-gold small" href="/" style="text-decoration:none">${ui.play}</a></div>
  </header>
  <main>
    <div class="content">
${body}
      <div class="ad-slot" data-slot="article" aria-label="Advertisement"></div>
    </div>
  </main>
  <footer class="foot">
    <nav aria-label="Footer"><a href="/quiz/">Quizzes</a> · <a href="/blog/">Blog</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms</a></nav>
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

// ---------- topic quiz pages ----------
const TOPICS = [
  {
    slug: "digital-marketing-quiz", filter: (q) => q.cat === "dm",
    title: { en: "Digital Marketing Quiz with Answers – Free Mock Test (Beginner to Expert)", hi: "Digital Marketing Quiz Answers ke saath – Free Mock Test (Hinglish)", mr: "डिजिटल मार्केटिंग क्विझ उत्तरांसह – मोफत मॉक टेस्ट (मराठी)" },
    h1: { en: "Digital Marketing Quiz: Questions & Answers", hi: "Digital Marketing Quiz: Sawaal aur Jawab", mr: "डिजिटल मार्केटिंग क्विझ: प्रश्न आणि उत्तरे" },
    desc: { en: "Free digital marketing quiz with answers and explanations — SEO, Google Ads, Meta Ads, GA4, email and strategy, from beginner to expert level. Great for interviews and exams.", hi: "Free digital marketing quiz answers aur explanations ke saath — SEO, Google Ads, Meta Ads, GA4, email, strategy. Interview aur exam ke liye best.", mr: "मोफत डिजिटल मार्केटिंग क्विझ उत्तरे आणि स्पष्टीकरणांसह — SEO, Google Ads, Meta Ads, GA4, email आणि strategy. मुलाखत आणि परीक्षेसाठी उपयुक्त." },
    intro: { en: "Test your digital marketing knowledge — SEO, paid ads, social, email, analytics and strategy. Questions are ordered from easy (level 1) to hardest (level 10). Try to answer before opening each explanation.", hi: "Apna digital marketing knowledge test karo — SEO, paid ads, social, email, analytics aur strategy. Sawaal easy (level 1) se hardest (level 10) tak hain. Explanation kholne se pehle khud jawab socho.", mr: "तुमचे डिजिटल मार्केटिंग ज्ञान तपासा — SEO, paid ads, social, email, analytics आणि strategy. प्रश्न सोप्या (level 1) पासून सर्वात कठीण (level 10) पर्यंत आहेत. स्पष्टीकरण उघडण्यापूर्वी स्वतः उत्तर द्या." },
    keywords: ["digital marketing quiz", "digital marketing quiz with answers", "digital marketing mock test", "digital marketing MCQ"],
  },
  {
    slug: "ai-llm-quiz", filter: (q) => q.cat === "ai",
    title: { en: "AI & LLM Quiz with Answers – Test Your Generative AI Knowledge", hi: "AI & LLM Quiz Answers ke saath – Generative AI Test (Hinglish)", mr: "AI आणि LLM क्विझ उत्तरांसह – Generative AI ज्ञान तपासा (मराठी)" },
    h1: { en: "AI & LLM Quiz: Questions & Answers", hi: "AI & LLM Quiz: Sawaal aur Jawab", mr: "AI आणि LLM क्विझ: प्रश्न आणि उत्तरे" },
    desc: { en: "Free AI and large language model quiz with explanations: tokens, prompts, hallucinations, RAG, embeddings, fine-tuning, LoRA, agents, MCP, KV cache and more.", hi: "Free AI aur LLM quiz explanations ke saath: tokens, prompts, hallucination, RAG, embeddings, fine-tuning, agents, MCP aur bahut kuch.", mr: "मोफत AI आणि LLM क्विझ स्पष्टीकरणांसह: tokens, prompts, hallucination, RAG, embeddings, fine-tuning, agents, MCP आणि बरेच काही." },
    intro: { en: "From 'what is a token?' to speculative decoding — questions ordered from beginner to legend level, each with a short explanation.", hi: "'Token kya hai?' se speculative decoding tak — beginner se legend level tak sawaal, har ek ka short explanation.", mr: "'Token म्हणजे काय?' पासून speculative decoding पर्यंत — beginner ते legend level पर्यंत प्रश्न, प्रत्येकाचे छोटे स्पष्टीकरण." },
    keywords: ["AI quiz", "LLM quiz", "generative AI quiz", "ChatGPT quiz", "artificial intelligence quiz with answers"],
  },
  {
    slug: "seo-web-tech-quiz", filter: (q) => q.cat === "tech",
    title: { en: "SEO & Web Tech Quiz – robots.txt, Canonical, Core Web Vitals & More", hi: "SEO & Web Tech Quiz – robots.txt, Canonical, Core Web Vitals (Hinglish)", mr: "SEO आणि Web Tech क्विझ – robots.txt, Canonical, Core Web Vitals (मराठी)" },
    h1: { en: "SEO & Web Tech Quiz", hi: "SEO & Web Tech Quiz", mr: "SEO आणि Web Tech क्विझ" },
    desc: { en: "Technical SEO and web tech quiz with answers: robots.txt, canonical and hreflang tags, Core Web Vitals (INP), server-side tagging and vector databases.", hi: "Technical SEO aur web tech quiz answers ke saath: robots.txt, canonical, hreflang, Core Web Vitals (INP), server-side tagging.", mr: "Technical SEO आणि web tech क्विझ उत्तरांसह: robots.txt, canonical, hreflang, Core Web Vitals (INP), server-side tagging." },
    intro: { en: "Technical SEO questions developers and marketers both get wrong — with clear explanations.", hi: "Technical SEO ke woh sawaal jo developers aur marketers dono galat karte hain — clear explanations ke saath.", mr: "Technical SEO चे असे प्रश्न जे developers आणि marketers दोघेही चुकतात — स्पष्ट स्पष्टीकरणांसह." },
    keywords: ["SEO quiz", "technical SEO quiz", "SEO questions and answers", "core web vitals quiz"],
  },
  {
    slug: "digital-marketing-situation-questions", filter: (q) => q.type === "situation",
    title: { en: "Situation-Based Digital Marketing Interview Questions (with Answers)", hi: "Situation-Based Digital Marketing Interview Questions (Answers ke saath)", mr: "परिस्थिती-आधारित डिजिटल मार्केटिंग मुलाखत प्रश्न (उत्तरांसह)" },
    h1: { en: "Situation-Based Digital Marketing Questions", hi: "Situation-Based Digital Marketing Sawaal", mr: "परिस्थिती-आधारित डिजिटल मार्केटिंग प्रश्न" },
    desc: { en: "Real-world scenario questions asked in digital marketing and AI interviews: high CTR low conversions, ad fatigue, core update drops, A/B tests, attribution and more — with model answers.", hi: "Digital marketing aur AI interviews mein pooche jaane wale real scenario questions: high CTR low conversions, ad fatigue, core update drop, A/B test, attribution — model answers ke saath.", mr: "डिजिटल मार्केटिंग आणि AI मुलाखतींमध्ये विचारले जाणारे खऱ्या परिस्थितीचे प्रश्न: high CTR low conversions, ad fatigue, core update drop, A/B test, attribution — उत्तरांसह." },
    intro: { en: "Definitions get you shortlisted; judgement gets you hired. These scenario questions mirror real client problems.", hi: "Definitions se shortlist hote ho; judgement se job milti hai. Yeh scenario sawaal real client problems jaise hain.", mr: "Definitions मुळे shortlist होता; निर्णयक्षमतेमुळे नोकरी मिळते. हे प्रश्न खऱ्या client समस्यांसारखे आहेत." },
    keywords: ["situation based digital marketing interview questions", "scenario based marketing questions", "digital marketing case study questions"],
  },
];

const langPrefix = (l) => (l === "en" ? "" : "/" + l);

for (const topic of TOPICS) {
  const qs = BANK.filter(topic.filter).sort((a, b) => a.level - b.level);
  const alternates = Object.fromEntries(["en", "hi", "mr"].map((l) => [l, `${langPrefix(l)}/quiz/${topic.slug}`]));
  for (const lang of ["en", "hi", "mr"]) {
    const ui = UI[lang];
    const pathname = alternates[lang];
    const items = qs.map((q, n) => {
      const opts = optsOf(q, lang);
      return `<div class="qa" id="q${n + 1}">
        <div class="meta">${ui.level} ${q.level}${q.type === "situation" ? ` · ${ui.situation}` : ""}</div>
        <div class="qn">Q${n + 1}. ${esc(q.q[lang])}</div>
        <ol type="A">${opts.map((o) => `<li>${esc(o)}</li>`).join("")}</ol>
        <details><summary>${ui.showAns}</summary>
          <p><strong>${ui.answer}: ${"ABCD"[q.a]}. ${esc(opts[q.a])}</strong></p>
          <p>${esc(q.exp[lang])}</p>
        </details>
      </div>`;
    }).join("\n");
    const langLinks = `<div class="lang-links">🌐 <a href="${alternates.en}" hreflang="en">English</a> · <a href="${alternates.hi}" hreflang="hi">Hinglish</a> · <a href="${alternates.mr}" hreflang="mr">मराठी</a></div>`;
    const body = `
      <div class="breadcrumb"><a href="/">${ui.home}</a> › <a href="${langPrefix(lang)}/quiz/">${ui.quizzes}</a></div>
      <h1>${esc(topic.h1[lang])}</h1>
      ${langLinks}
      <p>${esc(topic.intro[lang])}</p>
      <p><a class="lz lz-gold small cta" href="/">${ui.play}</a></p>
      ${items}
      <p><a class="lz lz-gold small cta" href="/">${ui.play}</a></p>`;
    const quizLd = {
      "@context": "https://schema.org", "@type": "Quiz", name: topic.h1[lang], about: topic.keywords[0], inLanguage: HTML_LANG[lang],
      educationalLevel: "Beginner to Advanced", url: SITE + pathname,
      hasPart: qs.map((q) => ({
        "@type": "Question", eduQuestionType: "Multiple choice", text: q.q[lang],
        acceptedAnswer: { "@type": "Answer", text: optsOf(q, lang)[q.a] },
        suggestedAnswer: optsOf(q, lang).filter((_, i) => i !== q.a).map((o) => ({ "@type": "Answer", text: o })),
      })),
    };
    write(`${pathname.slice(1)}.html`, page({
      lang, title: `${topic.title[lang]} | ${BRAND}`, description: topic.desc[lang], pathname, body, alternates, keywords: topic.keywords,
      jsonld: [quizLd, breadcrumb([[ui.home, "/"], [ui.quizzes, `${langPrefix(lang)}/quiz/`], [topic.h1[lang], pathname]])],
    }));
    urls.push({ loc: pathname, alternates, priority: lang === "en" ? 0.9 : 0.8 });
  }
}

// quiz hubs
for (const lang of ["en", "hi", "mr"]) {
  const ui = UI[lang];
  const pathname = `${langPrefix(lang)}/quiz/`;
  const alternates = { en: "/quiz/", hi: "/hi/quiz/", mr: "/mr/quiz/" };
  const body = `
      <div class="breadcrumb"><a href="/">${ui.home}</a></div>
      <h1>${lang === "mr" ? "सर्व क्विझ" : lang === "hi" ? "Saare Quizzes" : "All Quizzes"}</h1>
      <div class="lang-links">🌐 <a href="/quiz/">English</a> · <a href="/hi/quiz/">Hinglish</a> · <a href="/mr/quiz/">मराठी</a></div>
      <ul class="card-list">${TOPICS.map((t) => `<li><a href="${langPrefix(lang)}/quiz/${t.slug}">${esc(t.h1[lang])}</a><p class="meta">${esc(t.desc[lang])}</p></li>`).join("")}</ul>
      <p><a class="lz lz-gold small cta" href="/">${ui.play}</a></p>`;
  write(`${pathname.slice(1)}index.html`, page({
    lang, title: `${lang === "mr" ? "डिजिटल मार्केटिंग आणि AI क्विझ" : "Digital Marketing & AI Quizzes"} | ${BRAND}`,
    description: TOPICS.map((t) => t.h1[lang]).join(" · "), pathname, body, alternates,
  }));
  urls.push({ loc: pathname, alternates, priority: 0.8 });
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
        inLanguage: HTML_LANG[post.lang], author: { "@type": "Organization", name: BRAND }, publisher: { "@type": "Organization", name: BRAND, logo: { "@type": "ImageObject", url: `${SITE}/favicon.svg` } },
        mainEntityOfPage: SITE + pathname, keywords: post.keywords.join(", ") },
      breadcrumb([["Home", "/"], ["Blog", "/blog/"], [post.title, pathname]]),
    ],
  }));
  urls.push({ loc: pathname, priority: 0.7, lastmod: post.date });
}
write("blog/index.html", page({
  title: `Digital Marketing & AI Study Guides | ${BRAND} Blog`,
  description: "Study guides for digital marketing interviews, Google Ads and GA4 certifications, AI/LLM basics and GEO — in English, Hinglish and Marathi.",
  pathname: "/blog/",
  body: `
      <div class="breadcrumb"><a href="/">Home</a></div>
      <h1>Blog & Study Guides</h1>
      <ul class="card-list">${POSTS.map((p) => `<li><a href="/blog/${p.slug}" hreflang="${p.lang}">${esc(p.title)}</a><p class="meta">${esc(p.description)}</p></li>`).join("")}</ul>`,
}));
urls.push({ loc: "/blog/", priority: 0.8 });

// ---------- legal / trust pages (AdSense requires these) ----------
const contactLine = CONTACT
  ? `<p>Email: <a href="mailto:${esc(CONTACT)}">${esc(CONTACT)}</a></p>`
  : REPO ? `<p>Open an issue on our <a href="${esc(REPO)}/issues" rel="noopener">GitHub repository</a>.</p>` : `<p>Contact details coming soon.</p>`;

const LEGAL = {
  about: ["About DigiCrorepati", "About DigiCrorepati — a free, game-style digital marketing and AI quiz in English, Hinglish and Marathi.", `
      <h1>About ${BRAND}</h1>
      <p>${BRAND} is a free quiz game that helps students, job seekers and working marketers learn digital marketing and AI the fun way — on a 10-level prize ladder inspired by TV quiz shows.</p>
      <p>Every question comes with an explanation, in English, Hinglish and Marathi, because people learn fastest in the language they think in. New questions about the latest AI launches and marketing platform updates are added regularly from current news.</p>
      <p>Prize amounts in the game are virtual and for fun only. The content is educational and is not professional, legal or financial advice.</p>`],
  contact: ["Contact", `Contact the ${BRAND} team.`, `
      <h1>Contact</h1>
      <p>Found a mistake in a question, have a suggestion, or want to advertise or partner with us? We'd love to hear from you.</p>
      ${contactLine}`],
  privacy: ["Privacy Policy", `Privacy policy for ${BRAND}.`, `
      <h1>Privacy Policy</h1>
      <p class="meta">Last updated: ${TODAY}</p>
      <h2>What we collect</h2>
      <ul>
        <li><strong>Game progress</strong> (levels, stars, XP, language, sound settings) is stored in your browser's local storage on your device.</li>
        <li><strong>Leaderboard:</strong> if you enter a name, we store that name, a random player ID, and your score on our server. Don't use your full real name if you prefer not to.</li>
        <li><strong>AI explanations:</strong> when you tap "Explain deeper", the question text is sent to our AI provider to generate the explanation. No personal data is included.</li>
        <li>Our hosting provider may keep standard server logs (such as IP address and browser type) for security and reliability.</li>
      </ul>
      <h2>Cookies and advertising</h2>
      <p>We may show ads from Google AdSense and other advertising partners. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visits to this site and/or other sites on the Internet.</p>
      <p>You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" rel="noopener">Google Ads Settings</a>, or opt out of some third-party vendors' use of cookies for personalized advertising at <a href="https://www.aboutads.info/choices/" rel="noopener">www.aboutads.info</a>. Learn more about <a href="https://policies.google.com/technologies/partner-sites" rel="noopener">how Google uses data from partner sites</a>.</p>
      <h2>Your rights</h2>
      <p>You can clear your game progress at any time by clearing your browser's site data. To remove your leaderboard entry or ask a privacy question, contact us via the <a href="/contact">Contact page</a>. We handle personal data in line with applicable law, including India's Digital Personal Data Protection Act, 2023.</p>
      <h2>Children</h2>
      <p>The site is intended for a general audience and is not directed at children under 13.</p>
      <h2>Changes</h2>
      <p>We may update this policy; the date above shows the latest version.</p>`],
  terms: ["Terms of Use", `Terms of use for ${BRAND}.`, `
      <h1>Terms of Use</h1>
      <p class="meta">Last updated: ${TODAY}</p>
      <p>By using ${BRAND} you agree to these terms.</p>
      <ul>
        <li>The quiz is for education and entertainment. Prize amounts are <strong>virtual</strong> — no real money is offered or paid.</li>
        <li>We try to keep questions accurate, but technology and platform rules change quickly. Verify important information before acting on it.</li>
        <li>Some questions are generated with AI from recent news and may occasionally contain errors — please report them via the Contact page.</li>
        <li>Don't use offensive names on the leaderboard; we may remove entries at our discretion.</li>
        <li>Brand names mentioned belong to their respective owners. ${BRAND} is not affiliated with any TV show, Google, Meta, OpenAI, Anthropic or other company mentioned.</li>
      </ul>`],
};
for (const [slug, [title, description, body]] of Object.entries(LEGAL)) {
  write(`${slug}.html`, page({ title: `${title} | ${BRAND}`, description, pathname: `/${slug}`, body: `<div class="breadcrumb"><a href="/">Home</a></div>${body}` }));
  urls.push({ loc: `/${slug}`, priority: 0.3 });
}

write("404.html", page({
  title: `Page not found | ${BRAND}`, description: "Page not found.", pathname: "/404",
  body: `<h1>Page not found</h1><p>This page doesn't exist — but the quiz does!</p><p><a class="lz lz-gold small cta" href="/">▶ Play the quiz game</a></p>`,
}).replace('<meta name="theme-color"', '<meta name="robots" content="noindex" />\n  <meta name="theme-color"'));

// ---------- sitemap + robots ----------
urls.unshift({ loc: "/", priority: 1.0, changefreq: "daily" });
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map((u) => `  <url>
    <loc>${SITE}${u.loc}</loc>
    <lastmod>${u.lastmod || TODAY}</lastmod>
    <changefreq>${u.changefreq || "weekly"}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>${u.alternates ? Object.entries(u.alternates).map(([l, p]) => `
    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${p}" />`).join("") : ""}
  </url>`).join("\n")}
</urlset>
`;
write("sitemap.xml", sitemap);
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);

// ads.txt from ads-config.js (only once a publisher ID is set)
const adsSandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(PUB, "ads-config.js"), "utf8"), adsSandbox);
const pub = (adsSandbox.window.ADS_CONFIG?.adsenseClient || "").replace(/^ca-/, "");
if (pub) write("ads.txt", `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);

// Point canonical/OG URLs in the hand-written home page at the configured site.
const indexPath = path.join(PUB, "index.html");
const indexHtml = fs.readFileSync(indexPath, "utf8").replace(/https:\/\/[a-z0-9.-]+\.[a-z]+(?=\/(#site|og\.svg|"))/g, SITE);
fs.writeFileSync(indexPath, indexHtml);

console.log(`SEO build: ${urls.length} URLs → ${SITE}/sitemap.xml`);
