// ===== Ad configuration =====
// 1) After Google AdSense approves your site, paste your publisher ID below (looks like "ca-pub-1234567890123456")
//    and create one "Display ad unit" per placement in AdSense → Ads → By ad unit, then paste each slot ID.
// 2) Also update /ads.txt with the same publisher ID.
// Leave adsenseClient empty and no ad code loads at all (good while waiting for approval).
window.ADS_CONFIG = {
  adsenseClient: "",            // e.g. "ca-pub-1234567890123456"
  slots: {
    home: "",                   // home page, beside the leaderboard
    result: "",                 // result screen (between rounds — never during a question)
    article: "",                // blog / quiz topic pages
  },
  // Optional: any other network's code that doesn't need per-slot IDs (e.g. Ezoic, Media.net, Adsterra).
  // Paste their <script> src here; it will be injected once.
  extraScripts: [],
};
