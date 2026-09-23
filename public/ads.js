// Ads + monetization runtime. Everything is driven by ads-config.js and stays inert until configured.
// Display ads go on home, result and content pages — never beside answer buttons during a question.
(() => {
  const cfg = window.ADS_CONFIG || {};
  const client = (cfg.adsenseClient || "").trim();
  const h5 = cfg.h5games?.enabled && client;

  for (const src of cfg.extraScripts || []) {
    const s = document.createElement("script");
    s.async = true; s.src = src;
    document.head.appendChild(s);
  }

  if (client) {
    const lib = document.createElement("script");
    lib.async = true;
    lib.crossOrigin = "anonymous";
    lib.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    if (h5) {
      lib.dataset.adClient = client;
      if (cfg.h5games.test) lib.dataset.adbreakTest = "on";
    }
    document.head.appendChild(lib);
    window.adsbygoogle = window.adsbygoogle || [];
    if (h5) {
      window.adBreak = window.adConfig = (o) => window.adsbygoogle.push(o);
      window.adConfig({ preloadAdBreaks: "on", sound: "on" });
    }
  }

  function fill(slotEl) {
    const id = cfg.slots?.[slotEl.dataset.slot];
    if (!client || !id || slotEl.dataset.filled) return;
    if (!slotEl.offsetParent) return; // hidden screens have no width — AdSense would error
    slotEl.dataset.filled = "1";
    slotEl.classList.add("filled");
    slotEl.innerHTML = `<div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="${client}" data-ad-slot="${id}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    try { window.adsbygoogle.push({}); } catch {}
  }
  const fillAll = () => document.querySelectorAll(".ad-slot").forEach(fill);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fillAll);
  else fillAll();

  let rewardReady = false;
  window.Monetize = {
    refreshSlots: () => setTimeout(fillAll, 400),
    // Rewarded ad: calls onReward() only if the player watched the ad. Returns false when unavailable.
    rewarded(name, onReward, onDone) {
      if (!h5 || !window.adBreak) return false;
      window.adBreak({
        type: "reward", name,
        beforeReward: (showAdFn) => { rewardReady = true; showAdFn(); },
        adViewed: () => onReward(),
        adDismissed: () => {},
        adBreakDone: (info) => { rewardReady = false; onDone?.(info); },
      });
      return true;
    },
    rewardedAvailable: () => !!(h5 && window.adBreak),
    // Short interstitial at a natural break (between levels). Always calls next().
    interstitial(name, next) {
      if (!h5 || !window.adBreak) return next();
      let done = false;
      const go = () => { if (!done) { done = true; next(); } };
      window.adBreak({ type: "next", name, adBreakDone: go });
      setTimeout(go, 15000); // never block the game if the ad API misbehaves
    },
  };
})();
