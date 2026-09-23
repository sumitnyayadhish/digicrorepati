# DigiCrorepati: Monetization and Growth Plan

This site costs close to ₹0 to run: Vercel Hobby, the Neon free tier, and no AI calls. That means almost every rupee it earns is profit. Aim to earn from several sources, not just display ads.

All revenue numbers below are **rough illustrations**, not guarantees. They depend on traffic, geography (Indian ad rates are much lower than US rates), niche and execution. Measure your real numbers, then double down on what works.

---

## Revenue streams, ranked by likely profit for this niche

### 1. Lead generation for course and career institutes (highest value)
Digital marketing institutes in India spend heavily on ads to find students, and a qualified, consented lead is worth real money to them. Players who reach level 3 or higher are clearly interested in the field.
- **Already built:** a career-counselling form on the result screen. Turn it on with `leadForm.enabled: true` in `public/ads-config.js`.
  - It asks for explicit consent and stores leads in Neon.
  - Download them as a CSV at `/api/lead?key=YOUR_ADMIN_KEY`.
- **How to sell:**
  - Approach 5–10 institutes in Pune, Mumbai and Nagpur. Offer pay-per-lead, or a monthly fee for leads from their city.
  - Leads from people who cleared higher levels are better quality, so price them higher.
- **Rules:**
  - Share leads only with partners covered by the consent wording.
  - Honour deletion requests (DPDP Act 2023).
  - Never sell the same lead to more partners than you told users.

### 2. Title sponsorship and sponsored certificates
"Powered by *X Academy*" appears on the home page, every result screen, and **every certificate players share on LinkedIn**. That's free, repeated branding for the sponsor in front of exactly their target audience.
- **Already built:** fill in `sponsor` in `ads-config.js`. It shows up everywhere automatically.
- **Pricing:** start with a monthly fee and raise it as traffic grows. Show sponsors your Search Console and analytics numbers.
- **Upsells:**
  - A sponsored Daily Challenge week.
  - A sponsored level ("Level 5 powered by X").
  - A sponsored blog guide, clearly labelled.

### 3. Affiliate commissions
- **Already built:** a "Recommended for you" section on the result screen. It ranks offers by the topics the player just got wrong. Fill in `affiliates` in `ads-config.js`.
- **Good programs for this audience:**
  - Online course marketplaces and ed-tech affiliate programs.
  - Hosting and domain affiliates. Every learner needs a website to practise SEO.
  - SEO and marketing tool affiliates.
  - Books.
- Affiliate links are labelled `rel="sponsored"`, and the privacy page discloses them.

### 4. Display ads (AdSense, then Ezoic or others)
- **Requirements:** a custom domain (AdSense rejects `*.vercel.app`), original content (you now have 1,000+ questions, a glossary and guides), and the legal pages (already built).
- **Already built:** placements on the home page, the result screen, and every quiz, glossary and blog page. There are never ads next to answer buttons, which AdSense requires for games.
- **H5 Games Ads (rewarded):**
  - "Watch an ad → +1 lifeline", plus a short ad between levels. Rewarded ads usually earn more than banners.
  - Set `h5games.enabled: true` once your AdSense account has it.
- **Other networks to try:** Ezoic (no traffic minimum), Media.net, Adsterra and Monetag (easy approval, lower quality). Premium networks like Mediavine and Raptive once traffic is large.

### 5. Paid products (later)
- **"Interview Kit" PDF:** the top 300 questions with answers, a formulas cheat sheet and situation-question frameworks, sold for ₹99–299 on Instamojo, Gumroad or Razorpay. The content already exists in the bank.
- **Institute and college licence:** a white-label quiz league for a batch, with their logo and a private leaderboard. Charge per batch or per year.
- **Support / ad-free link:** add a UPI or Razorpay page in `support` in `ads-config.js`.

---

## Traffic growth (free channels)

| Channel | What to do |
|---|---|
| **SEO** | 20+ topic quiz pages, a glossary and blog guides are live in 3 languages. Submit the sitemap in Search Console. Add one genuinely useful guide a week that you've reviewed yourself; mass-produced AI posts risk penalties. |
| **Built-in viral loops** | Daily Challenge streaks with a shareable 🟩🟥 result grid, "challenge a friend" links to the same questions, score-card images and LinkedIn certificates. |
| **Instagram Reels / YouTube Shorts** | One question per video: "Only 2% get this Level 10 question right…" Show the answer at the end, with the site link in bio. The bank gives you 1,000+ scripts. |
| **WhatsApp and Telegram** | Post a daily "question of the day" in study, placement and freelancer groups. Marathi and Hinglish versions stand out. |
| **Colleges and institutes** | Run inter-college quiz leagues with a prize from a sponsor. Placement cells love free prep tools. |
| **LinkedIn** | Carousel posts built from blog guides. Every shared certificate is free promotion. |
| **Quora and Reddit** | Answer "digital marketing interview questions" and "how to learn SEO" threads with genuinely helpful answers that link to the matching topic page. |

---

## Metrics to watch
- **Traffic:** Search Console impressions and clicks per quiz page. This is where the long-term growth comes from.
- **Retention:** Daily Challenge streaks and returning users.
- **Monetization:** lead form conversion rate (leads ÷ result views), affiliate clicks, and RPM (revenue per 1,000 page views) for each ad network.
- Keep every stream that has a good RPM or payback, and drop what doesn't.
