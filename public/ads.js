// Loads ads only when configured in ads-config.js. Ads are placed on home, result and content pages —
// never next to the answer buttons during a question (AdSense policy: avoid accidental clicks in games).
(() => {
  const cfg = window.ADS_CONFIG || {};
  const client = (cfg.adsenseClient || "").trim();

  for (const src of cfg.extraScripts || []) {
    const s = document.createElement("script");
    s.async = true; s.src = src;
    document.head.appendChild(s);
  }
  if (!client) return;

  const lib = document.createElement("script");
  lib.async = true;
  lib.crossOrigin = "anonymous";
  lib.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  document.head.appendChild(lib);

  function fill(slotEl) {
    const id = cfg.slots?.[slotEl.dataset.slot];
    if (!id || slotEl.dataset.filled) return;
    // Only fill slots that are visible (a hidden screen has zero width and AdSense would error).
    if (!slotEl.offsetParent) return;
    slotEl.dataset.filled = "1";
    slotEl.classList.add("filled");
    slotEl.innerHTML = `<div class="ad-label">Advertisement</div><ins class="adsbygoogle" style="display:block" data-ad-client="${client}" data-ad-slot="${id}" data-ad-format="auto" data-full-width-responsive="true"></ins>`;
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
  }

  const fillAll = () => document.querySelectorAll(".ad-slot").forEach(fill);
  window.adsRefresh = () => setTimeout(fillAll, 400);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fillAll);
  else fillAll();
})();
