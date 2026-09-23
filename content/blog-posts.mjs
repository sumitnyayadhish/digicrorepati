// Blog articles. body is HTML. Keep them genuinely useful — thin/mass-produced pages hurt SEO and AdSense approval.
export const POSTS = [
  {
    slug: "digital-marketing-formulas",
    lang: "en",
    title: "Digital Marketing Formulas Cheat Sheet: CTR, CPC, CPM, CPA, ROAS, ROI, LTV:CAC (with Examples)",
    description: "Every digital marketing formula you need for interviews and exams — CTR, CPC, CPM, CPA, conversion rate, ROAS, ROI, break-even ROAS, LTV:CAC and CAC payback — with worked ₹ examples.",
    date: "2026-09-24",
    keywords: ["digital marketing formulas", "ROAS formula", "CTR formula", "CPM formula", "LTV CAC ratio", "break even ROAS"],
    body: `
<p>Interviewers love asking you to calculate a metric on the spot, and mixing up ROAS and ROI is the most common mistake. Here is every formula you need, with a worked example in rupees. When you're done, <a href="/quiz/marketing-maths-questions">practise with fresh numbers</a> — the game generates a new version of each question every time.</p>

<h2>Traffic and engagement</h2>
<ul>
<li><strong>CTR (click-through rate)</strong> = Clicks ÷ Impressions × 100. <em>Example:</em> 450 clicks from 30,000 impressions = 1.5%.</li>
<li><strong>Conversion rate</strong> = Conversions ÷ Clicks × 100. <em>Example:</em> 36 leads from 1,200 clicks = 3%.</li>
<li><strong>GA4 engagement rate</strong> = Engaged sessions ÷ Sessions. <strong>Bounce rate</strong> = 100% − engagement rate.</li>
<li><strong>Email CTOR (click-to-open rate)</strong> = Clicks ÷ Opens × 100 — not clicks ÷ delivered, which is the click rate.</li>
</ul>

<h2>Cost metrics</h2>
<ul>
<li><strong>CPC</strong> = Spend ÷ Clicks. ₹24,000 ÷ 1,600 clicks = ₹15.</li>
<li><strong>CPM</strong> = Spend ÷ Impressions × 1,000. ₹18,000 for 1,20,000 impressions = ₹150 CPM.</li>
<li><strong>CPA / CPL</strong> = Spend ÷ Conversions (or leads). ₹40,000 ÷ 80 leads = ₹500 per lead.</li>
</ul>

<h2>Return metrics</h2>
<ul>
<li><strong>ROAS</strong> = Ad revenue ÷ Ad spend. ₹2,00,000 sales from ₹50,000 spend = 4x.</li>
<li><strong>Marketing ROI</strong> = (Revenue − product cost − ad spend) ÷ Ad spend × 100. With ₹2,00,000 sales, ₹90,000 product cost and ₹50,000 ads, profit is ₹60,000 and ROI is 120%. A high ROAS can still mean a loss if margins are thin.</li>
<li><strong>Break-even ROAS</strong> = 1 ÷ Gross margin. At a 40% margin you need at least 2.5x ROAS just to cover ad spend.</li>
</ul>

<h2>Customer economics</h2>
<ul>
<li><strong>AOV</strong> = Revenue ÷ Orders.</li>
<li><strong>LTV (margin-based)</strong> = AOV × Orders per year × Years retained × Gross margin. ₹1,000 × 4 × 2 × 50% = ₹4,000.</li>
<li><strong>LTV:CAC</strong> = LTV ÷ CAC. With CAC ₹1,200, 4,000 ÷ 1,200 ≈ 3.3:1 — around 3:1 is a common healthy benchmark.</li>
<li><strong>CAC payback (months)</strong> = CAC ÷ (Monthly revenue per customer × Gross margin).</li>
</ul>

<h2>Planning a budget backwards</h2>
<p>Want 200 leads at a 4% conversion rate and ₹20 CPC? Clicks needed = 200 ÷ 0.04 = 5,000. Budget = 5,000 × ₹20 = ₹1,00,000. This is a favourite situation question in interviews.</p>

<h2>Relative vs absolute change</h2>
<p>If version A converts at 2% and B at 2.5%, the absolute difference is 0.5 percentage points, but the <strong>relative lift</strong> is (2.5 − 2) ÷ 2 = 25%. Always say which one you mean.</p>

<p>Test yourself now: <a href="/quiz/marketing-maths-questions">marketing maths practice questions</a> or <a href="/">play the full game</a> — maths questions appear at every level.</p>
`,
  },
  {
    slug: "digital-marketing-interview-questions",
    lang: "en",
    title: "30 Digital Marketing Interview Questions and Answers (2026)",
    description: "The digital marketing interview questions freshers and experienced candidates actually get asked — SEO, Google Ads, Meta, GA4, email and AI — with crisp model answers.",
    date: "2026-09-23",
    keywords: ["digital marketing interview questions", "digital marketing interview questions for freshers", "SEO interview questions", "Google Ads interview questions"],
    body: `
<p>Most digital marketing interviews in India follow the same pattern: a few definitions to check fundamentals, a few metrics to check you can do the maths, and one or two <strong>situation questions</strong> to see how you think. Below are 30 questions grouped the way interviewers ask them, each with a short answer you can expand in your own words.</p>

<h2>Fundamentals (freshers)</h2>
<ol>
<li><strong>What is digital marketing?</strong> Promoting products or services through digital channels — search, social, email, websites, apps and ads — with measurable results.</li>
<li><strong>SEO vs SEM?</strong> SEO earns unpaid (organic) rankings; SEM usually means paid search ads such as Google Ads. Many people use SEM to mean both.</li>
<li><strong>What is organic traffic?</strong> Visitors from unpaid sources, mainly search results you rank for naturally.</li>
<li><strong>What is a CTA?</strong> A call to action — the next step you want the user to take, like "Book a free consultation".</li>
<li><strong>What is a landing page?</strong> A focused page built for one campaign goal, usually with one CTA and no distracting navigation.</li>
<li><strong>What is a meta description?</strong> The HTML summary often shown under your title in search results. It doesn't directly affect rankings, but a good one improves click-through rate.</li>
<li><strong>What is a backlink?</strong> A link from another website to yours. Relevant links from trusted sites remain a strong ranking signal.</li>
<li><strong>What are UTM parameters?</strong> Tags added to URLs (utm_source, utm_medium, utm_campaign…) so analytics can attribute traffic to the exact campaign.</li>
</ol>

<h2>Metrics you must calculate on the spot</h2>
<ol start="9">
<li><strong>CTR</strong> = Clicks ÷ Impressions × 100.</li>
<li><strong>CPC</strong> = Spend ÷ Clicks.</li>
<li><strong>Conversion rate</strong> = Conversions ÷ Clicks (or sessions) × 100.</li>
<li><strong>CPA / CPL</strong> = Spend ÷ Conversions (or leads).</li>
<li><strong>ROAS</strong> = Ad revenue ÷ Ad spend. ₹50,000 revenue from ₹10,000 spend = 5x.</li>
<li><strong>LTV:CAC</strong> — lifetime value vs cost to acquire a customer. Around 3:1 is the common benchmark.</li>
<li><strong>GA4 bounce rate</strong> = 100% − engagement rate. An engaged session lasts 10+ seconds, has a key event, or has 2+ page views.</li>
</ol>

<h2>Channel knowledge (1–3 years' experience)</h2>
<ol start="16">
<li><strong>What is Quality Score?</strong> Google's 1–10 diagnostic based on expected CTR, ad relevance and landing page experience.</li>
<li><strong>Target CPA vs Target ROAS?</strong> Target CPA optimizes the number of conversions at a cost; Target ROAS optimizes conversion <em>value</em> at a return you set.</li>
<li><strong>What is Performance Max?</strong> A goal-based Google Ads campaign type that serves across Search, YouTube, Display, Discover, Gmail and Maps from one campaign.</li>
<li><strong>Why use Meta's Conversions API?</strong> It sends events server-side, recovering signals lost to browsers, ad blockers and iOS privacy changes. Use it with the pixel plus deduplication.</li>
<li><strong>What is ad frequency, and why does it matter?</strong> Average times one person saw your ad. High frequency with falling CTR means creative fatigue — refresh creatives or broaden the audience.</li>
<li><strong>What is a canonical tag?</strong> A hint telling search engines which URL is the preferred version of duplicate pages.</li>
<li><strong>What are Core Web Vitals?</strong> LCP (loading), INP (responsiveness — it replaced FID in March 2024) and CLS (visual stability).</li>
<li><strong>What is E-E-A-T?</strong> Experience, Expertise, Authoritativeness and Trustworthiness — Google's quality framework. Trust matters most.</li>
<li><strong>How do you improve email deliverability?</strong> Authenticate with SPF, DKIM and DMARC, remove inactive contacts, segment, and keep spam complaints very low.</li>
</ol>

<h2>AI questions (now common in every interview)</h2>
<ol start="25">
<li><strong>What is an LLM?</strong> A large language model trained on huge amounts of text to understand and generate language — like Claude, GPT or Gemini.</li>
<li><strong>What is a hallucination?</strong> A confident but false answer. Reduce it with grounding (search/RAG), asking for sources, and human review.</li>
<li><strong>What is RAG?</strong> Retrieval-Augmented Generation — fetching relevant documents and giving them to the model before it answers, so answers are current and grounded.</li>
<li><strong>How would you use AI in a campaign without hurting quality?</strong> Use it for research, variations and first drafts; keep experts editing, fact-checking and adding first-hand insight.</li>
</ol>

<h2>Situation questions (the ones that decide the offer)</h2>
<ol start="29">
<li><strong>"High CTR but very few conversions — what do you check?"</strong> The problem is after the click: search terms relevance, landing page speed and offer, and whether conversion tracking actually fires.</li>
<li><strong>"Meta says 6x ROAS but revenue is flat — why?"</strong> Platforms over-attribute (overlapping credit, view-through, people who'd buy anyway). Validate with blended MER, holdout/incrementality tests or MMM.</li>
</ol>

<h2>How to practise</h2>
<p>Reading answers isn't the same as recalling them under pressure. Play the <a href="/">DigiCrorepati quiz</a> — levels 1–5 match fresher interviews, levels 6–10 match experienced roles — and every answer comes with an explanation. For topic-wise revision, use the <a href="/quiz/digital-marketing-quiz">digital marketing quiz</a> and the <a href="/quiz/digital-marketing-situation-questions">situation-based questions</a> pages.</p>
`,
  },
  {
    slug: "google-ads-certification-preparation",
    lang: "en",
    title: "How to Prepare for Google Ads Certifications: A 7-Day Study Plan",
    description: "A practical 7-day plan to prepare for Google Ads certifications on Skillshop — what to study each day, the concepts that trip people up, and how to practise.",
    date: "2026-09-23",
    keywords: ["google ads certification", "google ads certification exam preparation", "google skillshop", "google ads search certification"],
    body: `
<p>Google Ads certifications are free on <strong>Google Skillshop</strong> and are one of the easiest ways to strengthen a digital marketing CV. The exams are timed, multiple-choice, and scenario-heavy, and certificates need renewing periodically. Formats change, so check Skillshop for the current rules before you start. The concepts, though, stay stable. Here's a 7-day plan built around them.</p>

<h2>Day 1 — How the auction works</h2>
<p>Understand that ad rank depends on your bid, ad quality (expected CTR, ad relevance, landing page experience), ad assets and context. Learn why a higher-quality ad can win a better position while paying less.</p>

<h2>Day 2 — Campaign types and goals</h2>
<p>Match goals to campaign types: Search for intent, Performance Max for goal-based reach across Google's inventory, Demand Gen and YouTube for awareness and consideration, Shopping for retail, App campaigns for installs. Expect questions like "a client wants X — which campaign type?"</p>

<h2>Day 3 — Keywords and search terms</h2>
<p>Know match types (broad, phrase, exact), negative keywords, and how the search terms report reveals the queries that actually triggered your ads. Broad match works best with Smart Bidding and good conversion data.</p>

<h2>Day 4 — Smart Bidding</h2>
<ul>
<li><strong>Maximize conversions / Target CPA</strong> — more conversions at a cost.</li>
<li><strong>Maximize conversion value / Target ROAS</strong> — more value at a return (needs conversion values).</li>
<li><strong>Maximize clicks</strong> — traffic only.</li>
</ul>
<p>Most "which strategy?" questions are answered by asking: what is the business goal, and do we track conversion value?</p>

<h2>Day 5 — Measurement</h2>
<p>Conversion tracking, enhanced conversions, GA4 integration, data-driven attribution (the default), and Consent Mode. Know why accurate conversion data is the fuel for every automated feature.</p>

<h2>Day 6 — Optimization scenarios</h2>
<p>Practise reasoning through situations: high CTR but low conversions (post-click problem), rising CPA after a budget cut, limited-by-budget campaigns, and low Quality Score. Our <a href="/quiz/digital-marketing-situation-questions">situation-based questions</a> are built for exactly this.</p>

<h2>Day 7 — Timed practice</h2>
<p>Do timed rounds. The <a href="/">DigiCrorepati game</a> gets faster as you climb (45 seconds per question at level 1, 22 at level 10), which trains the same speed you need in the real exam. Review every explanation — especially for questions you got right by guessing.</p>

<h2>Common traps</h2>
<ul>
<li>Choosing "increase budget" when the real problem is relevance or tracking.</li>
<li>Confusing Target CPA (count) with Target ROAS (value).</li>
<li>Forgetting that automation needs enough conversion data to learn.</li>
</ul>
<p>Once you pass, add the certificate to LinkedIn, then keep your knowledge fresh — platform features change every few months. The <em>Latest AI Challenge</em> on our home page adds questions about recent ad-platform updates.</p>
`,
  },
  {
    slug: "what-is-llm-explained-for-marketers",
    lang: "en",
    title: "What Is an LLM? Tokens, Context Windows, RAG and Hallucinations Explained for Marketers",
    description: "A plain-English guide to large language models for marketers: tokens, context windows, temperature, hallucinations, RAG, fine-tuning and AI agents — with practical examples.",
    date: "2026-09-23",
    keywords: ["what is LLM", "LLM for marketers", "RAG explained", "AI hallucination", "context window meaning"],
    body: `
<p>You don't need to be an engineer to use AI well, but a handful of concepts explain almost every "why did the AI do that?" moment. Here they are, in marketer language.</p>

<h2>LLM</h2>
<p>A <strong>large language model</strong> is a neural network trained on huge amounts of text to predict and generate language. Claude, GPT and Gemini are LLMs. They're excellent at drafting, summarizing, classifying and reasoning over text — and they need clear instructions and good inputs.</p>

<h2>Tokens</h2>
<p>Models read text as <strong>tokens</strong> — chunks of words. In English, one token is roughly three-quarters of a word. API pricing and limits are counted in tokens, so a long prompt costs more than a short one.</p>

<h2>Context window</h2>
<p>The <strong>context window</strong> is the maximum number of tokens the model can consider in one request: your instructions, pasted documents, chat history and its own answer. It is <em>not</em> the same as the training cutoff (the date its built-in knowledge ends).</p>

<h2>Temperature</h2>
<p>On models that expose it, temperature controls randomness: low for consistent, factual output; higher for varied, creative ideas like taglines. Some newer models manage this internally.</p>

<h2>Hallucinations</h2>
<p>A <strong>hallucination</strong> is a confident but wrong answer — a fake statistic or a made-up source. The fixes: give the model the facts (grounding), ask it to cite sources, and have a human verify anything that gets published or affects money.</p>

<h2>RAG vs fine-tuning</h2>
<p><strong>RAG (Retrieval-Augmented Generation)</strong> fetches relevant documents — say, your latest price list — and puts them into the prompt. It's how you keep answers current. <strong>Fine-tuning</strong> trains the model on many examples to change its <em>behaviour</em> (tone, format). Rule of thumb: knowledge → RAG, style → fine-tuning, and for most teams, good prompting beats both.</p>

<h2>Embeddings and vector databases</h2>
<p><strong>Embeddings</strong> turn text into numbers so that similar meanings sit close together. A <strong>vector database</strong> searches those numbers quickly. Together they power semantic search, RAG and recommendations — for example, clustering thousands of reviews by theme.</p>

<h2>Agents</h2>
<p>An <strong>AI agent</strong> is a model plus tools plus a loop: it plans, calls tools (search, CRM, spreadsheets, a browser), reads the results and keeps going until the job is done. Agents can run whole workflows, but they need guardrails — especially against <strong>prompt injection</strong>, where hidden text in a web page or email tries to hijack the agent.</p>

<h2>Test yourself</h2>
<p>Every concept here appears in the <a href="/quiz/ai-llm-basics">AI &amp; LLM quiz</a>, from beginner (tokens, prompts) to legend level (KV cache, speculative decoding). Play the <a href="/">full game</a> to see how far up the ladder you get.</p>
`,
  },
  {
    slug: "geo-generative-engine-optimization",
    lang: "en",
    title: "GEO: How to Get Your Brand Cited in ChatGPT, Perplexity and Google AI Overviews",
    description: "Generative Engine Optimization (GEO) explained: how AI answer engines choose sources, and a practical checklist to earn citations and mentions for your brand.",
    date: "2026-09-23",
    keywords: ["generative engine optimization", "GEO SEO", "AI overviews optimization", "how to rank in ChatGPT", "AI search optimization"],
    body: `
<p>More and more searches end inside an AI answer rather than on a list of blue links. <strong>Generative Engine Optimization (GEO)</strong> is the practice of making your brand the source those answers retrieve, trust and cite. The good news: it rewards the same fundamentals as good SEO, applied more deliberately.</p>

<h2>How AI answer engines pick sources</h2>
<p>Most AI search experiences retrieve web pages first, then write an answer grounded in them. Pages that are easy to retrieve, easy to quote and clearly trustworthy get cited more often. That means crawlability and ranking still matter — GEO builds on SEO, it doesn't replace it.</p>

<h2>A practical GEO checklist</h2>
<ol>
<li><strong>Answer the question directly.</strong> Put a clear one- or two-sentence answer near the top, then expand. AI systems love quotable definitions.</li>
<li><strong>Structure for extraction.</strong> Descriptive headings, short paragraphs, lists, comparison tables and FAQs.</li>
<li><strong>Publish original data.</strong> Surveys, benchmarks and case-study numbers are unique facts that others (and AI) have to cite you for.</li>
<li><strong>Show first-hand experience.</strong> Named authors, credentials, real examples and photos — the E-E-A-T signals.</li>
<li><strong>Earn third-party mentions.</strong> Reviews, press coverage, industry lists, forums and communities. AI engines weigh what others say about you, not just what you say.</li>
<li><strong>Use structured data.</strong> Organization, Product, FAQ and Article schema help machines understand your entities.</li>
<li><strong>Keep content fresh.</strong> Update statistics and dates; stale pages lose citations for time-sensitive queries.</li>
<li><strong>Don't block the crawlers you want.</strong> Check robots.txt rules for the AI and search crawlers relevant to your audience.</li>
</ol>

<h2>What not to do</h2>
<p>Hidden keyword text, mass-produced AI pages and fake reviews are spam — for search engines and AI engines alike. Google's spam policies explicitly target <em>scaled content abuse</em>.</p>

<h2>Measuring GEO</h2>
<p>Track referral traffic from AI assistants in GA4, monitor brand mentions, and regularly ask the major AI tools your key customer questions to see whether — and how — you're cited.</p>

<p>GEO is a level-9 topic in our game. Test your strategy instincts with the <a href="/quiz/digital-marketing-situation-questions">situation-based questions</a> or <a href="/">play the full ladder</a>.</p>
`,
  },
  {
    slug: "ga4-metrics-explained",
    lang: "en",
    title: "GA4 Metrics Explained: Engagement Rate, Bounce Rate, Key Events and Attribution",
    description: "Understand the Google Analytics 4 metrics that confuse everyone: engaged sessions, engagement rate vs bounce rate, key events, data-driven attribution and UTM tracking.",
    date: "2026-09-23",
    keywords: ["GA4 metrics explained", "GA4 engagement rate", "GA4 bounce rate", "GA4 key events", "Google Analytics certification"],
    body: `
<p>Google Analytics 4 measures websites and apps with an <strong>event-based model</strong>: page views, clicks, scrolls, form submissions and purchases are all events. Once that clicks, the rest of GA4's metrics make sense.</p>

<h2>Engaged session</h2>
<p>A session counts as <strong>engaged</strong> if it lasts longer than 10 seconds, has a key event, or has at least two page or screen views.</p>

<h2>Engagement rate and bounce rate</h2>
<p><strong>Engagement rate</strong> = engaged sessions ÷ total sessions. <strong>Bounce rate</strong> in GA4 is simply the opposite: 100% − engagement rate. This is different from the old Universal Analytics bounce rate, so don't compare the two directly.</p>

<h2>Key events</h2>
<p>The events that matter to your business — a lead form, a booking, a purchase — are marked as <strong>key events</strong> (GA4 renamed "conversions" to key events in 2024; "conversions" now refers to key events used in Google Ads). Mark only real business outcomes, not every click.</p>

<h2>Attribution</h2>
<p>GA4's default is <strong>data-driven attribution</strong>, which uses your account's data to share credit across touchpoints. The older rule-based models (first click, linear, time decay, position-based) were removed in 2023; last click remains available for comparison.</p>

<h2>UTM tags</h2>
<p>Add utm_source, utm_medium and utm_campaign to every link you control — WhatsApp broadcasts, Instagram bio, email, QR codes. Without them, that traffic lands in "direct" or "referral" and you can't prove what worked.</p>

<h2>Common mistakes</h2>
<ul>
<li>Marking page views as key events and inflating "conversions".</li>
<li>Not setting up cross-domain tracking when checkout happens on another domain.</li>
<li>Comparing GA4 numbers with ad platforms and expecting them to match — each uses different attribution.</li>
<li>Ignoring consent: with Consent Mode, some data is modelled rather than observed.</li>
</ul>

<p>These concepts appear from level 2 to level 9 of the <a href="/">DigiCrorepati quiz</a>. Practise them in the <a href="/quiz/digital-marketing-quiz">digital marketing quiz</a>.</p>
`,
  },
  {
    slug: "digital-marketing-mock-test-tips",
    lang: "en",
    title: "Digital Marketing Mock Test: How to Practise Smartly (Free, Level-Based)",
    description: "How to use a digital marketing mock test the right way — spaced practice, timed rounds, learning from explanations — with a free 10-level quiz in English, Hinglish and Marathi.",
    date: "2026-09-23",
    keywords: ["digital marketing mock test", "digital marketing test online", "digital marketing quiz with answers", "digital marketing exam questions"],
    body: `
<p>Whether you're finishing a digital marketing course, preparing for a certification or heading into interviews, a <strong>mock test</strong> is the fastest way to find your gaps. But most people use mock tests badly: they take one, look at the score, and move on. Here's how to get real value from them.</p>

<h2>1. Start easy, then climb</h2>
<p>Difficulty should rise with you. That's why <a href="/">DigiCrorepati</a> is a 10-level ladder: fundamentals first (SEO, CTR, CTA, LLM basics), then channel skills, then advanced strategy and AI. You unlock the next level only after scoring 4 out of 5.</p>

<h2>2. Read every explanation — even for right answers</h2>
<p>If you guessed correctly, you haven't learned it yet. Each question in our quiz has a short explanation of why the answer is right <em>and</em> why the others are wrong.</p>

<h2>3. Practise under time pressure</h2>
<p>Real exams and interviews don't wait. Our timer shrinks from 45 seconds at level 1 to 22 seconds at level 10, training fast recall.</p>

<h2>4. Mix topics</h2>
<p>Switching between SEO, ads, analytics and AI (interleaving) improves long-term memory more than studying one topic for hours. Use the practice modes to rotate topics.</p>

<h2>5. Focus on situation questions</h2>
<p>Definitions get you through the first round; judgement gets you hired. Practise with our <a href="/quiz/digital-marketing-situation-questions">situation-based questions</a>, which mirror real client problems.</p>

<h2>6. Space your practice</h2>
<p>Three 15-minute sessions across a week beat one 45-minute cram. Come back, replay a level, and aim for three stars.</p>

<h2>7. Study in the language you think in</h2>
<p>Concepts stick faster in your own language. Every question and explanation is available in English, Hinglish and Marathi — switch any time.</p>

<h2>Topic-wise mock tests</h2>
<ul>
<li><a href="/quiz/digital-marketing-quiz">Digital Marketing Quiz</a> — SEO, ads, email, analytics</li>
<li><a href="/quiz/ai-llm-basics">AI &amp; LLM Quiz</a> — from prompts to KV cache</li>
<li><a href="/quiz/seo">SEO &amp; Web Tech Quiz</a> — robots.txt, canonical, Core Web Vitals</li>
<li><a href="/quiz/digital-marketing-situation-questions">Situation-Based Questions</a></li>
</ul>
`,
  },
  {
    slug: "digital-marketing-marathi-guide",
    lang: "mr",
    title: "डिजिटल मार्केटिंग म्हणजे काय? मराठीत सोपे मार्गदर्शक (2026)",
    description: "डिजिटल मार्केटिंग म्हणजे काय, त्याचे प्रकार (SEO, Google Ads, Social Media, Email), महत्त्वाचे metrics आणि AI चा वापर — सोप्या मराठीत, मोफत क्विझसह.",
    date: "2026-09-23",
    keywords: ["डिजिटल मार्केटिंग म्हणजे काय", "digital marketing in marathi", "डिजिटल मार्केटिंग मराठी", "marathi quiz"],
    body: `
<p><strong>डिजिटल मार्केटिंग</strong> म्हणजे इंटरनेटवरील माध्यमांचा — Google, Instagram, Facebook, YouTube, WhatsApp, Email आणि वेबसाइट — वापर करून आपले उत्पादन किंवा सेवा योग्य लोकांपर्यंत पोहोचवणे आणि त्याचे निकाल मोजणे.</p>

<h2>डिजिटल मार्केटिंगचे मुख्य प्रकार</h2>
<ul>
<li><strong>SEO (Search Engine Optimization):</strong> वेबसाइट Google च्या मोफत (organic) निकालांत वर आणणे.</li>
<li><strong>Google Ads / SEM:</strong> पैसे देऊन search निकालांत जाहिरात दाखवणे.</li>
<li><strong>Social Media Marketing:</strong> Instagram, Facebook, LinkedIn, YouTube वर content आणि जाहिराती.</li>
<li><strong>Email आणि WhatsApp Marketing:</strong> ग्राहकांशी थेट संपर्क, offers आणि updates.</li>
<li><strong>Local SEO:</strong> Google Business Profile द्वारे "near me" searches मध्ये दिसणे — दुकाने, clinics, restaurants साठी सर्वात महत्त्वाचे.</li>
</ul>

<h2>महत्त्वाचे metrics (आकडे)</h2>
<ul>
<li><strong>CTR</strong> = Clicks ÷ Impressions × 100</li>
<li><strong>CPC</strong> = खर्च ÷ Clicks</li>
<li><strong>Conversion rate</strong> = Conversions ÷ Clicks × 100</li>
<li><strong>ROAS</strong> = जाहिरातीतून आलेले उत्पन्न ÷ जाहिरात खर्च</li>
</ul>

<h2>AI चा वापर कसा करावा?</h2>
<p>ChatGPT, Claude, Gemini सारखी AI tools कल्पना, captions, ad copy चे drafts आणि research साठी खूप उपयोगी आहेत. पण AI कधी कधी आत्मविश्वासाने चुकीची माहिती देते (याला <strong>hallucination</strong> म्हणतात). म्हणून प्रकाशित करण्यापूर्वी माणसाने तपासणे आवश्यक आहे.</p>

<h2>मराठीत जाहिरात करताना</h2>
<p>इंग्रजी जाहिरातीचे शब्दशः भाषांतर करू नका. <strong>Transcreation</strong> करा — म्हणजे मराठी म्हणी, भावना आणि स्थानिक संदर्भ वापरून नव्याने लिहा. पुणे-मुंबईत Hinglish किंवा English सुद्धा चालते, म्हणून A/B test करा.</p>

<h2>स्वतःची परीक्षा घ्या</h2>
<p>आमचा <a href="/">DigiCrorepati क्विझ</a> पूर्णपणे मराठीत खेळता येतो — 10 levels, प्रत्येक उत्तराचे मराठी स्पष्टीकरण. सुरुवात करा <a href="/mr/quiz/digital-marketing-quiz">डिजिटल मार्केटिंग क्विझ (मराठी)</a> पासून.</p>
`,
  },
  {
    slug: "digital-marketing-kaise-seekhe-hinglish",
    lang: "hi",
    title: "Digital Marketing Kaise Seekhe? 2026 ka Complete Roadmap (Hinglish)",
    description: "Digital marketing kaise seekhe — step-by-step roadmap Hinglish mein: SEO, Google Ads, Meta Ads, GA4, AI tools, free certifications aur practice quiz.",
    date: "2026-09-23",
    keywords: ["digital marketing kaise seekhe", "digital marketing course hindi", "digital marketing roadmap", "hinglish quiz"],
    body: `
<p>Digital marketing seekhna mushkil nahi hai — bas sahi order mein seekhna zaroori hai. Yeh roadmap follow karo aur har step ke baad khud ko test karo.</p>

<h2>Step 1: Basics samjho (1–2 hafte)</h2>
<p>Funnel (awareness → consideration → conversion), organic vs paid traffic, CTA, landing page, aur basic metrics: CTR, CPC, conversion rate, ROAS. Inke formulas yaad hone chahiye — interview mein seedha pooche jaate hain.</p>

<h2>Step 2: SEO (2–3 hafte)</h2>
<p>Keyword research, on-page SEO (title, meta description, headings), technical basics (robots.txt, canonical, Core Web Vitals), local SEO ke liye Google Business Profile, aur backlinks. Ek chhota blog bana ke khud practice karo.</p>

<h2>Step 3: Google Ads (2 hafte)</h2>
<p>Search campaigns, keyword match types, negative keywords, Quality Score, aur Smart Bidding (Target CPA vs Target ROAS). Google Skillshop pe free certification bhi le lo — CV mein achha lagta hai.</p>

<h2>Step 4: Meta Ads aur social media (2 hafte)</h2>
<p>Audience targeting, creatives ka testing, frequency aur creative fatigue, Pixel + Conversions API. Reels ke liye: hook, value, CTA.</p>

<h2>Step 5: Analytics (1–2 hafte)</h2>
<p>GA4: events, key events, engagement rate, UTM tags, attribution. Bina tracking ke marketing andhere mein teer chalane jaisa hai.</p>

<h2>Step 6: AI tools (ongoing)</h2>
<p>ChatGPT, Claude, Gemini se research, ad copy variations, content outlines. Lekin AI hallucinate kar sakta hai — fact-check hamesha karo. RAG, prompt engineering jaise concepts samjho — ab har interview mein AI pe sawaal aata hai.</p>

<h2>Step 7: Real project + practice</h2>
<p>Kisi local business ya apne project pe ₹1,000–2,000 ka chhota ad test chalao, results document karo — yeh aapka portfolio hai. Aur roz 10 minute <a href="/">DigiCrorepati quiz</a> khelo — 10 levels, Hinglish mein explanations ke saath.</p>

<p>Shuru karo: <a href="/hi/quiz/digital-marketing-quiz">Digital Marketing Quiz (Hinglish)</a> · <a href="/hi/quiz/ai-llm-basics">AI &amp; LLM Quiz (Hinglish)</a></p>
`,
  },
];
