// ===== Site monetization config =====
// Everything here is OFF until you fill it in. Edit, commit and push — Vercel redeploys automatically.
window.ADS_CONFIG = {
  // 1) Google AdSense display ads (after approval). Publisher ID looks like "ca-pub-1234567890123456".
  //    Create one "Display ad unit" per placement in AdSense → Ads → By ad unit and paste the slot IDs.
  adsenseClient: "",
  slots: {
    home: "",      // home page, beside the leaderboard
    result: "",    // result screen (between rounds — never during a question)
    article: "",   // blog / quiz topic / glossary pages
  },

  // 2) Google "H5 Games Ads" (Ad Placement API) — rewarded ads ("watch an ad → +1 lifeline") and a short
  //    interstitial between levels. Needs AdSense approval + H5 games ads enabled on your account.
  //    Set test: true first to see test ads.
  h5games: { enabled: false, test: true },

  // 3) Any other ad network script (Ezoic, Media.net, Adsterra, Monetag…) — paste their script URLs.
  extraScripts: [],

  // 4) Sponsor — sell "This quiz is powered by X" to an ed-tech / digital-marketing institute.
  //    Shows on the home page, result screen and on every certificate.
  sponsor: null,
  // sponsor: { name: "ABC Digital Academy", url: "https://example.com/?utm_source=digicrorepati", logo: "", tagline: { en: "Become a certified digital marketer", hi: "Certified digital marketer bano", mr: "प्रमाणित डिजिटल मार्केटर बना" } },

  // 5) Affiliate / recommended courses & tools shown on the result screen (course affiliate programs,
  //    hosting/domain affiliates, books). Use your own affiliate links.
  affiliates: [],
  // affiliates: [{ title: "Google Ads Masterclass", desc: "Practical course with live campaigns", url: "https://example.com/?ref=you", cta: "View course", topics: ["ppc", "core"] }],

  // 6) Career-counselling lead form (opt-in, with consent). Leads are stored in your database and can be
  //    shared with partner institutes (pay-per-lead). Download them at /api/lead?key=ADMIN_KEY.
  leadForm: { enabled: false, minLevel: 3 },

  // 7) Support / "Go ad-free" link (Razorpay / Instamojo / UPI payment page).
  support: null,
  // support: { url: "https://rzp.io/l/yourpage", label: { en: "☕ Support us", hi: "☕ Support karo", mr: "☕ आम्हाला साथ द्या" } },
};
