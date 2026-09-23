# DigiCrorepati — Digital Marketing & AI Quiz Game

A free quiz-show style game on digital marketing, SEO, Google/Meta Ads, GA4, AI and LLMs, in **English, Hinglish and Marathi**.

## Features
- **10-level prize ladder** from ₹1,000 to a virtual ₹1 Crore, with safe levels at 3 and 7.
  - You need 4/5 correct to climb. Each level is harder and has less time (45s down to 22s).
- **Show-style gameplay**:
  - Lock in your answer (it turns orange), wait through the suspense, then the reveal.
  - Three lifelines per round: 50:50, Audience Poll and Phone a Friend.
  - Original synthesized sound effects (Web Audio) and a host voice that speaks in your language.
- **An explanation for every answer.** The "Explain deeper" button gives an AI mentor explanation.
- **Auto-updating content**:
  - A live AI and marketing news feed.
  - A daily Vercel Cron job where Claude, with web search, writes 12 new questions about the latest launches in all 3 languages.
- **Leaderboard** stored in Neon Postgres (free tier).
- **SEO**:
  - Crawlable home page content with JSON-LD.
  - 12 topic quiz pages (4 topics × 3 languages, linked with hreflang) listing every question with its answer and explanation.
  - 8 blog study guides, a sitemap and robots.txt.
- **Ads-ready**: AdSense or other networks switch on from one config file. Ads only show on the home page, the result screen and content pages, never during a question.

## Run locally
```bash
npm install
npm start          # builds SEO pages, then serves http://localhost:3000
```
Optional `.env` (see `.env.example`): `ANTHROPIC_API_KEY`, `DATABASE_URL`, `SITE_URL`, `CONTACT_EMAIL`.
Without a database URL, data is stored in local JSON files under `data/`.

## Deploy (Vercel)
1. Import the GitHub repo in Vercel. The framework preset is "Other"; `vercel.json` already sets the build and output settings.
2. Go to **Storage → Create → Neon (Postgres)** and connect it to the project. This injects `DATABASE_URL`, and the tables are created automatically.
3. Add these environment variables:
   - `ANTHROPIC_API_KEY`: turns on live questions and AI explanations.
   - `CRON_SECRET`: any random string; it protects the daily cron job.
   - `SITE_URL`: your final domain, for canonical links and the sitemap.
   - `CONTACT_EMAIL`: shown on the Contact page.
4. Redeploy.

## Monetization
1. **Buy a custom domain** (.com or .in) and add it in Vercel. AdSense does not accept `*.vercel.app` sites. Then set `SITE_URL` and redeploy.
2. **Submit your sitemap** in Google Search Console: `https://yourdomain/sitemap.xml`.
3. **Apply to AdSense** once the site has some traffic and content. The About, Contact, Privacy and Terms pages are already built.
4. **After approval:**
   - Put your `ca-pub-…` ID and ad-unit slot IDs in `public/ads-config.js`.
   - Push the change. `ads.txt` is generated automatically.
5. **Other networks**, which can be added through `extraScripts` in the same config file:
   - Ezoic (AdSense-certified, no minimum traffic)
   - Media.net (Yahoo/Bing contextual ads)
   - Adsterra and Monetag (low entry bar, lower quality)
   - Carbon Ads or EthicalAds (for the developer/tech audience)
   - Mediavine Journey or Raptive (premium, once traffic grows)
   - Direct sponsorships from ed-tech and digital-marketing courses, which often pay the most for this niche.

## Structure
- `public/`: the game (`index.html`, `app.js`, `sound.js`, `style.css`, `questions.js`) and the ad config
- `api/`: Vercel functions (`news`, `fresh`, `refresh` for the cron, `explain`, `leaderboard`)
- `lib/`: AI and news code (`ai.js`) and storage, Neon or local files (`store.js`)
- `content/blog-posts.mjs`: the blog articles
- `scripts/build-seo.mjs`: generates the topic pages, blog, legal pages, sitemap and robots.txt
