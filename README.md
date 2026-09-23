# DigiCrorepati — Digital Marketing & AI Quiz Game

A free quiz-show style game on digital marketing, SEO, Google/Meta Ads, GA4, content, e-commerce, AI and LLMs, in **English, Hinglish and Marathi**.

**No AI at runtime and no API costs.** Everything comes from a built-in offline question bank.

## What's inside
- **1,000+ checked questions, available offline**, each with an explanation in all 3 languages:
  - 660 hand-written questions across 9 topics (270+ are situation questions).
  - 400 generated from a 200-term glossary.
- **Unlimited marketing-maths questions.** CTR, CPC, CPM, CPA, ROAS, ROI, break-even ROAS, LTV:CAC, CAC payback and budget planning. Every question uses fresh random numbers with a computed answer, so there are lakhs of variants.
- **10-level prize ladder** from ₹1,000 to a virtual ₹1 Crore, with safe levels at 3 and 7.
  - Clear 4 out of 5 to climb. Harder levels give you less time.
  - The game prefers questions you haven't seen yet.
- **Show-style gameplay**:
  - Lock in your answer, wait through the suspense, then the reveal.
  - Lifelines: 50:50, Audience Poll and Phone a Friend.
  - Original synthesized sound effects and a host voice in 3 languages.
- **Ways to come back and share**:
  - Daily Challenge: 10 questions a day, a streak counter and a shareable 🟩🟥 result grid.
  - Challenge-a-friend links that serve the exact same questions.
  - Score-card images and a certificate for each cleared level.
  - A leaderboard, and the site installs as an app that works offline.
- **SEO**:
  - 11 topic quiz pages in 3 languages with hreflang (long topics are split across pages).
  - A 3-language glossary.
  - 9 blog guides and a marketing-formulas page.
  - JSON-LD, a sitemap, and About/Advertise/Contact/Privacy/Terms pages.
- **Monetization hooks.** All are off until you configure them in `public/ads-config.js`. See **[MONETIZATION.md](MONETIZATION.md)**.

## Run locally
```bash
npm install
npm start          # builds the bank + SEO pages, then serves http://localhost:3000
```

## Deploy
The site is on Vercel and redeploys automatically on every push to `main`. Set these in **Settings → Environment Variables**:
- **`DATABASE_URL`**: added automatically when you connect Neon (Storage → Neon). Used for the leaderboard and leads.
- **`SITE_URL`**: your final domain, used for canonical links and the sitemap.
- **`CONTACT_EMAIL`**: shown on the Contact and Advertise pages.
- **`ADMIN_KEY`**: any long random string. It protects the leads export at `/api/lead?key=…`.

## Adding content
- **Questions:** add items to any file in `content/bank/*.json` using the same schema. The build validates everything and drops invalid entries or duplicates.
- **Glossary:** edit `content/glossary.json`. Each term automatically becomes 2 quiz questions and appears on the glossary pages.
- **Blog:** edit `content/blog-posts.mjs`.
- **Images:** run `scripts/make-images.ps1` to regenerate `og.png` and the app icons.

## Structure
- `public/`: the game (`index.html`, `app.js`, `calc.js`, `sound.js`, `share.js`, `sw.js`, `style.css`), `ads-config.js` and `ads.js`
- `content/`: the question bank (`questions-core.js`, `bank/*.json`), `glossary.json` and `blog-posts.mjs`
- `scripts/`:
  - `build-bank.mjs`: validates the bank and writes `public/bank/level-N.json`
  - `build-seo.mjs`: builds the static SEO pages
- `api/`: `leaderboard`, `lead` (lead capture and CSV export) and `news` (free RSS headlines)
- `lib/`: `store.js` (Neon, or local JSON files in development) and `news.js`
