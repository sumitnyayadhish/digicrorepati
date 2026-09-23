// Procedural marketing-maths questions: random realistic numbers, computed answers, "common mistake" distractors,
// explanations in English / Hinglish / Marathi. Millions of unique variants, always correct, no AI needed.
window.Calc = (() => {
  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const inr2 = (n) => "₹" + (Math.round(n * 100) / 100).toLocaleString("en-IN", { minimumFractionDigits: n < 100 ? 2 : 0, maximumFractionDigits: 2 });
  const num = (n) => Math.round(n).toLocaleString("en-IN");
  const pct = (n, d = 1) => (Math.round(n * 10 ** d) / 10 ** d).toLocaleString("en-IN", { maximumFractionDigits: d }) + "%";
  const x = (n, d = 1) => (Math.round(n * 10 ** d) / 10 ** d).toLocaleString("en-IN", { maximumFractionDigits: d }) + "x";
  const L3 = (en, hi, mr) => ({ en, hi, mr });

  function rngFrom(seed) {
    let a = seed >>> 0;
    return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const int = (r, min, max, step = 1) => min + step * Math.floor(r() * ((max - min) / step + 1));
  const pick = (r, arr) => arr[Math.floor(r() * arr.length)];

  // Make 4 distinct option strings: correct first, then distractors; fill gaps with ±variations if any collide.
  function options(correct, wrongs, fmt, r) {
    const out = [fmt(correct)];
    for (const w of wrongs) { const s = fmt(w); if (w > 0 && isFinite(w) && !out.includes(s)) out.push(s); if (out.length === 4) break; }
    let k = 1;
    while (out.length < 4) { const s = fmt(correct * (1 + (k % 2 ? 1 : -1) * (0.15 + 0.1 * k))); if (!out.includes(s)) out.push(s); k++; }
    return out;
  }
  const same = (arr) => ({ en: arr, hi: arr, mr: arr });

  const BRANDS = {
    en: ["a Pune bakery", "a Mumbai clinic", "a D2C skincare brand", "a coaching institute", "a Nagpur furniture store", "a SaaS startup", "a Goa hotel", "a Nashik jewellery shop"],
    hi: ["ek Pune bakery", "ek Mumbai clinic", "ek D2C skincare brand", "ek coaching institute", "ek Nagpur furniture store", "ek SaaS startup", "ek Goa hotel", "ek Nashik jewellery shop"],
    mr: ["पुण्यातील एक बेकरी", "मुंबईतील एक क्लिनिक", "एक D2C skincare brand", "एक कोचिंग संस्था", "नागपूरचे एक फर्निचर दुकान", "एक SaaS startup", "गोव्यातील एक हॉटेल", "नाशिकचे एक ज्वेलरी दुकान"],
  };

  const GEN = {
    ctr: { levels: [1, 3], make(r, b) {
      const imp = int(r, 2, 80, 1) * 1000, ctr = int(r, 5, 80, 1) / 10, clicks = Math.round(imp * ctr / 100), c = clicks / imp * 100;
      return { q: L3(`${b.en} got ${num(imp)} impressions and ${num(clicks)} clicks. What is the CTR?`, `${b.hi} ko ${num(imp)} impressions aur ${num(clicks)} clicks mile. CTR kitna hai?`, `${b.mr} ला ${num(imp)} impressions आणि ${num(clicks)} clicks मिळाले. CTR किती?`),
        opts: same(options(c, [c * 10, imp / clicks, c / 10], (v) => pct(v, 2), r)),
        exp: L3(`CTR = Clicks ÷ Impressions × 100 = ${num(clicks)} ÷ ${num(imp)} × 100 = ${pct(c, 2)}.`, `CTR = Clicks ÷ Impressions × 100 = ${num(clicks)} ÷ ${num(imp)} × 100 = ${pct(c, 2)}.`, `CTR = Clicks ÷ Impressions × 100 = ${num(clicks)} ÷ ${num(imp)} × 100 = ${pct(c, 2)}.`) }; } },
    aov: { levels: [1, 3], make(r, b) {
      const orders = int(r, 40, 900, 10), aov = int(r, 300, 4000, 50), rev = orders * aov;
      return { q: L3(`${b.en} made ${inr(rev)} revenue from ${num(orders)} orders. What is the Average Order Value (AOV)?`, `${b.hi} ne ${num(orders)} orders se ${inr(rev)} revenue kamaya. Average Order Value (AOV) kitna hai?`, `${b.mr} ने ${num(orders)} orders मधून ${inr(rev)} revenue मिळवले. Average Order Value (AOV) किती?`),
        opts: same(options(aov, [aov * 1.18, rev / (orders * 2), aov * 0.8], inr, r)),
        exp: L3(`AOV = Revenue ÷ Orders = ${inr(rev)} ÷ ${num(orders)} = ${inr(aov)}.`, `AOV = Revenue ÷ Orders = ${inr(rev)} ÷ ${num(orders)} = ${inr(aov)}.`, `AOV = Revenue ÷ Orders = ${inr(rev)} ÷ ${num(orders)} = ${inr(aov)}.`) }; } },
    cpc: { levels: [2, 4], make(r, b) {
      const clicks = int(r, 100, 5000, 50), cpc = int(r, 3, 60, 1), spend = clicks * cpc;
      return { q: L3(`${b.en} spent ${inr(spend)} on Google Ads and got ${num(clicks)} clicks. What is the average CPC?`, `${b.hi} ne Google Ads pe ${inr(spend)} kharch kiye aur ${num(clicks)} clicks mile. Average CPC kitna hai?`, `${b.mr} ने Google Ads वर ${inr(spend)} खर्च केले आणि ${num(clicks)} clicks मिळाले. सरासरी CPC किती?`),
        opts: same(options(cpc, [cpc * 10, cpc / 2, cpc * 1.5], inr2, r)),
        exp: L3(`CPC = Spend ÷ Clicks = ${inr(spend)} ÷ ${num(clicks)} = ${inr2(cpc)}.`, `CPC = Spend ÷ Clicks = ${inr(spend)} ÷ ${num(clicks)} = ${inr2(cpc)}.`, `CPC = Spend ÷ Clicks = ${inr(spend)} ÷ ${num(clicks)} = ${inr2(cpc)}.`) }; } },
    cvr: { levels: [2, 4], make(r, b) {
      const clicks = int(r, 200, 8000, 100), cvr = int(r, 5, 120, 5) / 10, conv = Math.max(1, Math.round(clicks * cvr / 100)), c = conv / clicks * 100;
      return { q: L3(`A landing page got ${num(clicks)} clicks and ${num(conv)} leads. What is the conversion rate?`, `Ek landing page pe ${num(clicks)} clicks aur ${num(conv)} leads aaye. Conversion rate kitna hai?`, `एका landing page ला ${num(clicks)} clicks आणि ${num(conv)} leads मिळाल्या. Conversion rate किती?`),
        opts: same(options(c, [clicks / conv, c * 10, c / 2], (v) => pct(v, 2), r)),
        exp: L3(`Conversion rate = Conversions ÷ Clicks × 100 = ${num(conv)} ÷ ${num(clicks)} × 100 = ${pct(c, 2)}.`, `Conversion rate = Conversions ÷ Clicks × 100 = ${num(conv)} ÷ ${num(clicks)} × 100 = ${pct(c, 2)}.`, `Conversion rate = Conversions ÷ Clicks × 100 = ${num(conv)} ÷ ${num(clicks)} × 100 = ${pct(c, 2)}.`) }; } },
    bounce: { levels: [2, 4], make(r) {
      const sessions = int(r, 1000, 50000, 500), er = int(r, 30, 85, 1), engaged = Math.round(sessions * er / 100), br = 100 - engaged / sessions * 100;
      return { q: L3(`In GA4 a site had ${num(sessions)} sessions, of which ${num(engaged)} were engaged. What is the bounce rate?`, `GA4 mein ek site ke ${num(sessions)} sessions the, jinmein ${num(engaged)} engaged the. Bounce rate kitna hai?`, `GA4 मध्ये एका site चे ${num(sessions)} sessions होते, त्यापैकी ${num(engaged)} engaged होते. Bounce rate किती?`),
        opts: same(options(br, [100 - br, br / 2 + 10, Math.min(99, br + 12)], (v) => pct(v, 1), r)),
        exp: L3(`GA4 bounce rate = 100% − engagement rate. Engagement rate = ${num(engaged)} ÷ ${num(sessions)} = ${pct(100 - br)}, so bounce rate = ${pct(br)}.`, `GA4 bounce rate = 100% − engagement rate. Engagement rate = ${num(engaged)} ÷ ${num(sessions)} = ${pct(100 - br)}, isliye bounce rate = ${pct(br)}.`, `GA4 bounce rate = 100% − engagement rate. Engagement rate = ${num(engaged)} ÷ ${num(sessions)} = ${pct(100 - br)}, म्हणून bounce rate = ${pct(br)}.`) }; } },
    cpm: { levels: [3, 5], make(r, b) {
      const imp = int(r, 20, 900, 10) * 1000, cpm = int(r, 40, 400, 10), spend = imp / 1000 * cpm;
      return { q: L3(`${b.en} spent ${inr(spend)} for ${num(imp)} Instagram impressions. What is the CPM?`, `${b.hi} ne ${num(imp)} Instagram impressions ke liye ${inr(spend)} kharch kiye. CPM kitna hai?`, `${b.mr} ने ${num(imp)} Instagram impressions साठी ${inr(spend)} खर्च केले. CPM किती?`),
        opts: same(options(cpm, [spend / imp, cpm / 10, cpm * 10], inr2, r)),
        exp: L3(`CPM = Spend ÷ Impressions × 1,000 = ${inr(spend)} ÷ ${num(imp)} × 1,000 = ${inr2(cpm)} (cost per thousand impressions).`, `CPM = Spend ÷ Impressions × 1,000 = ${inr(spend)} ÷ ${num(imp)} × 1,000 = ${inr2(cpm)} (har 1,000 impressions ki cost).`, `CPM = Spend ÷ Impressions × 1,000 = ${inr(spend)} ÷ ${num(imp)} × 1,000 = ${inr2(cpm)} (प्रत्येक 1,000 impressions चा खर्च).`) }; } },
    cpa: { levels: [3, 5], make(r, b) {
      const conv = int(r, 10, 400, 5), cpa = int(r, 80, 2500, 10), spend = conv * cpa;
      return { q: L3(`${b.en} spent ${inr(spend)} on Meta ads and got ${num(conv)} leads. What is the cost per lead (CPL)?`, `${b.hi} ne Meta ads pe ${inr(spend)} kharch kiye aur ${num(conv)} leads mile. Cost per lead (CPL) kitna hai?`, `${b.mr} ने Meta ads वर ${inr(spend)} खर्च केले आणि ${num(conv)} leads मिळाल्या. Cost per lead (CPL) किती?`),
        opts: same(options(cpa, [cpa * 1.25, cpa / 1.5, cpa * 2], inr, r)),
        exp: L3(`CPL = Spend ÷ Leads = ${inr(spend)} ÷ ${num(conv)} = ${inr(cpa)}.`, `CPL = Spend ÷ Leads = ${inr(spend)} ÷ ${num(conv)} = ${inr(cpa)}.`, `CPL = Spend ÷ Leads = ${inr(spend)} ÷ ${num(conv)} = ${inr(cpa)}.`) }; } },
    roas: { levels: [3, 6], make(r, b) {
      const spend = int(r, 5, 200, 5) * 1000, roas = int(r, 8, 80, 1) / 10, rev = spend * roas;
      return { q: L3(`${b.en} spent ${inr(spend)} on ads that generated ${inr(rev)} in sales. What is the ROAS?`, `${b.hi} ne ads pe ${inr(spend)} kharch kiye aur ${inr(rev)} ki sales hui. ROAS kitna hai?`, `${b.mr} ने ads वर ${inr(spend)} खर्च केले आणि ${inr(rev)} ची विक्री झाली. ROAS किती?`),
        opts: same(options(roas, [1 / roas, roas - 1, roas * 2], (v) => x(v, 2), r)),
        exp: L3(`ROAS = Ad revenue ÷ Ad spend = ${inr(rev)} ÷ ${inr(spend)} = ${x(roas, 2)}. (Revenue − spend ÷ spend would be ROI, a different metric.)`, `ROAS = Ad revenue ÷ Ad spend = ${inr(rev)} ÷ ${inr(spend)} = ${x(roas, 2)}. (Profit wala formula ROI hota hai, alag metric.)`, `ROAS = Ad revenue ÷ Ad spend = ${inr(rev)} ÷ ${inr(spend)} = ${x(roas, 2)}. (नफ्याचे सूत्र म्हणजे ROI, वेगळा metric.)`) }; } },
    ctor: { levels: [4, 6], make(r) {
      const delivered = int(r, 5, 100, 1) * 1000, opens = Math.round(delivered * int(r, 15, 45, 1) / 100), clicks = Math.round(opens * int(r, 5, 30, 1) / 100), c = clicks / opens * 100;
      return { q: L3(`An email reached ${num(delivered)} inboxes, got ${num(opens)} opens and ${num(clicks)} clicks. What is the click-to-open rate (CTOR)?`, `Ek email ${num(delivered)} inboxes tak pahuncha, ${num(opens)} opens aur ${num(clicks)} clicks mile. Click-to-open rate (CTOR) kitna hai?`, `एक email ${num(delivered)} inboxes पर्यंत पोहोचला, ${num(opens)} opens आणि ${num(clicks)} clicks मिळाले. Click-to-open rate (CTOR) किती?`),
        opts: same(options(c, [clicks / delivered * 100, opens / delivered * 100, c / 2], (v) => pct(v, 1), r)),
        exp: L3(`CTOR = Clicks ÷ Opens × 100 = ${num(clicks)} ÷ ${num(opens)} × 100 = ${pct(c)}. Clicks ÷ delivered would be the click rate (CTR), not CTOR.`, `CTOR = Clicks ÷ Opens × 100 = ${num(clicks)} ÷ ${num(opens)} × 100 = ${pct(c)}. Clicks ÷ delivered toh click rate hota hai, CTOR nahi.`, `CTOR = Clicks ÷ Opens × 100 = ${num(clicks)} ÷ ${num(opens)} × 100 = ${pct(c)}. Clicks ÷ delivered म्हणजे click rate, CTOR नाही.`) }; } },
    lift: { levels: [5, 7], make(r) {
      const a = int(r, 10, 60, 1) / 10, b2 = Math.round(a * (1 + int(r, 5, 60, 5) / 100) * 10) / 10, lift = (b2 - a) / a * 100;
      return { q: L3(`In an A/B test, version A converts at ${pct(a)} and version B at ${pct(b2)}. What is B's relative lift over A?`, `A/B test mein version A ka conversion ${pct(a)} aur version B ka ${pct(b2)} hai. B ka A ke upar relative lift kitna hai?`, `A/B test मध्ये version A चा conversion ${pct(a)} आणि version B चा ${pct(b2)} आहे. B चा A वर relative lift किती?`),
        opts: same(options(lift, [b2 - a, (b2 - a) / b2 * 100, lift * 2], (v) => pct(v, 1), r)),
        exp: L3(`Relative lift = (B − A) ÷ A × 100 = (${pct(b2)} − ${pct(a)}) ÷ ${pct(a)} = ${pct(lift)}. The raw difference (${(Math.round((b2 - a) * 10) / 10)} percentage points) is not the relative lift.`, `Relative lift = (B − A) ÷ A × 100 = ${pct(lift)}. Seedha difference (${(Math.round((b2 - a) * 10) / 10)} percentage points) relative lift nahi hota.`, `Relative lift = (B − A) ÷ A × 100 = ${pct(lift)}. थेट फरक (${(Math.round((b2 - a) * 10) / 10)} percentage points) म्हणजे relative lift नाही.`) }; } },
    roi: { levels: [5, 7], make(r, b) {
      const spend = int(r, 10, 200, 5) * 1000, rev = spend * int(r, 20, 60, 1) / 10, cogs = Math.round(rev * int(r, 30, 55, 1) / 100), profit = rev - cogs - spend, roi = profit / spend * 100;
      return { q: L3(`${b.en}: ad spend ${inr(spend)}, sales ${inr(rev)}, product cost ${inr(cogs)}. What is the marketing ROI (profit after product and ad cost ÷ ad spend)?`, `${b.hi}: ad spend ${inr(spend)}, sales ${inr(rev)}, product cost ${inr(cogs)}. Marketing ROI kitna hai (product aur ad cost ke baad profit ÷ ad spend)?`, `${b.mr}: ad spend ${inr(spend)}, विक्री ${inr(rev)}, product cost ${inr(cogs)}. Marketing ROI किती (product आणि ad खर्चानंतरचा नफा ÷ ad spend)?`),
        opts: same(options(roi, [(rev - spend) / spend * 100, rev / spend * 100, (rev - cogs) / spend * 100], (v) => (v < 0 ? "−" + pct(-v, 0) : pct(v, 0)), r)),
        exp: L3(`Profit = ${inr(rev)} − ${inr(cogs)} − ${inr(spend)} = ${inr(profit)}. ROI = ${inr(profit)} ÷ ${inr(spend)} × 100 = ${pct(roi, 0)}. Ignoring product cost overstates ROI.`, `Profit = ${inr(rev)} − ${inr(cogs)} − ${inr(spend)} = ${inr(profit)}. ROI = ${inr(profit)} ÷ ${inr(spend)} × 100 = ${pct(roi, 0)}. Product cost ignore karoge toh ROI zyada dikhega.`, `नफा = ${inr(rev)} − ${inr(cogs)} − ${inr(spend)} = ${inr(profit)}. ROI = ${inr(profit)} ÷ ${inr(spend)} × 100 = ${pct(roi, 0)}. Product cost दुर्लक्षित केल्यास ROI जास्त दिसतो.`) }; } },
    breakeven: { levels: [6, 9], make(r, b) {
      const margin = pick(r, [20, 25, 30, 40, 50, 60, 70, 80]), be = 100 / margin;
      return { q: L3(`${b.en} has a ${margin}% gross margin. What is the break-even ROAS (the ROAS below which ads lose money)?`, `${b.hi} ka gross margin ${margin}% hai. Break-even ROAS kya hai (jiske neeche ads se loss hota hai)?`, `${b.mr} चा gross margin ${margin}% आहे. Break-even ROAS किती (ज्याच्या खाली ads मुळे तोटा होतो)?`),
        opts: same(options(be, [margin / 10, 1 + margin / 100, be * 2], (v) => x(v, 2), r)),
        exp: L3(`Break-even ROAS = 1 ÷ gross margin = 1 ÷ ${margin / 100} = ${x(be, 2)}. Below that, the margin on sales doesn't cover the ad spend.`, `Break-even ROAS = 1 ÷ gross margin = 1 ÷ ${margin / 100} = ${x(be, 2)}. Isse neeche sales ka margin ad spend cover nahi karta.`, `Break-even ROAS = 1 ÷ gross margin = 1 ÷ ${margin / 100} = ${x(be, 2)}. याखाली विक्रीचा margin ad spend भरून काढत नाही.`) }; } },
    ltvcac: { levels: [5, 8], make(r, b) {
      const aov = int(r, 400, 3000, 100), freq = int(r, 2, 8, 1), years = int(r, 1, 4, 1), margin = pick(r, [30, 40, 50, 60]), cac = int(r, 200, 3000, 50);
      const ltv = aov * freq * years * margin / 100, ratio = ltv / cac;
      return { q: L3(`${b.en}: AOV ${inr(aov)}, ${freq} orders/year, customers stay ${years} year(s), ${margin}% gross margin, CAC ${inr(cac)}. What is the LTV:CAC ratio (margin-based LTV)?`, `${b.hi}: AOV ${inr(aov)}, saal mein ${freq} orders, customer ${years} saal tak rehta hai, ${margin}% gross margin, CAC ${inr(cac)}. LTV:CAC ratio kya hai (margin-based LTV)?`, `${b.mr}: AOV ${inr(aov)}, वर्षाला ${freq} orders, customer ${years} वर्षे टिकतो, ${margin}% gross margin, CAC ${inr(cac)}. LTV:CAC ratio किती (margin-based LTV)?`),
        opts: same(options(ratio, [ratio * 100 / margin, ratio / years, ratio * 2], (v) => (Math.round(v * 10) / 10) + " : 1", r)),
        exp: L3(`LTV = ${inr(aov)} × ${freq} × ${years} × ${margin}% = ${inr(ltv)}. LTV:CAC = ${inr(ltv)} ÷ ${inr(cac)} ≈ ${Math.round(ratio * 10) / 10}:1. Around 3:1 is a common healthy benchmark.`, `LTV = ${inr(aov)} × ${freq} × ${years} × ${margin}% = ${inr(ltv)}. LTV:CAC = ${inr(ltv)} ÷ ${inr(cac)} ≈ ${Math.round(ratio * 10) / 10}:1. Around 3:1 healthy maana jaata hai.`, `LTV = ${inr(aov)} × ${freq} × ${years} × ${margin}% = ${inr(ltv)}. LTV:CAC = ${inr(ltv)} ÷ ${inr(cac)} ≈ ${Math.round(ratio * 10) / 10}:1. साधारण 3:1 निरोगी मानले जाते.`) }; } },
    budget: { levels: [6, 9], make(r, b) {
      const target = int(r, 20, 500, 10), cvr = int(r, 10, 80, 5) / 10, cpc = int(r, 5, 80, 1), clicks = target / (cvr / 100), budget = clicks * cpc;
      return { q: L3(`${b.en} wants ${num(target)} leads next month. Landing page conversion rate is ${pct(cvr)} and average CPC is ${inr(cpc)}. What monthly ad budget is needed?`, `${b.hi} ko agle mahine ${num(target)} leads chahiye. Landing page conversion rate ${pct(cvr)} hai aur average CPC ${inr(cpc)}. Kitna monthly ad budget chahiye?`, `${b.mr} ला पुढच्या महिन्यात ${num(target)} leads हव्या आहेत. Landing page conversion rate ${pct(cvr)} आणि सरासरी CPC ${inr(cpc)} आहे. किती मासिक ad budget लागेल?`),
        opts: same(options(budget, [target * cpc, budget / 10, target * cpc * cvr], inr, r)),
        exp: L3(`Clicks needed = ${num(target)} ÷ ${pct(cvr)} ≈ ${num(clicks)}. Budget = clicks × CPC ≈ ${inr(budget)}.`, `Clicks chahiye = ${num(target)} ÷ ${pct(cvr)} ≈ ${num(clicks)}. Budget = clicks × CPC ≈ ${inr(budget)}.`, `लागणारे clicks = ${num(target)} ÷ ${pct(cvr)} ≈ ${num(clicks)}. Budget = clicks × CPC ≈ ${inr(budget)}.`) }; } },
    payback: { levels: [7, 10], make(r, b) {
      const cac = int(r, 1000, 20000, 500), arpu = int(r, 200, 3000, 50), margin = pick(r, [50, 60, 70, 80]), months = cac / (arpu * margin / 100);
      return { q: L3(`${b.en} (subscription): CAC ${inr(cac)}, monthly revenue per customer ${inr(arpu)}, ${margin}% gross margin. What is the CAC payback period?`, `${b.hi} (subscription): CAC ${inr(cac)}, har customer se monthly revenue ${inr(arpu)}, ${margin}% gross margin. CAC payback period kitna hai?`, `${b.mr} (subscription): CAC ${inr(cac)}, प्रत्येक customer कडून मासिक revenue ${inr(arpu)}, ${margin}% gross margin. CAC payback period किती?`),
        opts: same(options(months, [cac / arpu, months * 2, months / 2], (v) => (Math.round(v * 10) / 10) + " months", r)),
        exp: L3(`Payback = CAC ÷ (monthly revenue × margin) = ${inr(cac)} ÷ (${inr(arpu)} × ${margin}%) ≈ ${Math.round(months * 10) / 10} months. Using revenue without margin understates it.`, `Payback = CAC ÷ (monthly revenue × margin) = ${inr(cac)} ÷ (${inr(arpu)} × ${margin}%) ≈ ${Math.round(months * 10) / 10} months. Margin ke bina calculate karoge toh kam dikhega.`, `Payback = CAC ÷ (मासिक revenue × margin) = ${inr(cac)} ÷ (${inr(arpu)} × ${margin}%) ≈ ${Math.round(months * 10) / 10} महिने. Margin शिवाय काढल्यास कमी दिसतो.`) }; } },
  };
  const TYPES = Object.keys(GEN);
  const TYPE_LABEL = { en: "Marketing maths", hi: "Marketing maths", mr: "मार्केटिंग गणित" };

  function generate(level, rng = Math.random, seedHint = "") {
    const fits = TYPES.filter((t) => level >= GEN[t].levels[0] && level <= GEN[t].levels[1]);
    const type = fits.length ? fits[Math.floor(rng() * fits.length)] : "roas";
    const r = rng;
    const bi = Math.floor(r() * BRANDS.en.length);
    const brand = { en: BRANDS.en[bi], hi: BRANDS.hi[bi], mr: BRANDS.mr[bi] };
    brand.en = brand.en[0].toUpperCase() + brand.en.slice(1);
    brand.hi = brand.hi[0].toUpperCase() + brand.hi.slice(1);
    const body = GEN[type].make(r, brand);
    return {
      id: `calc-${type}-${seedHint || Math.floor(rng() * 1e9)}`,
      level, cat: "dm", type: "mcq", calc: true, a: 0, ...body,
    };
  }

  return { generate, rngFrom, types: TYPES, TYPE_LABEL, count: TYPES.length };
})();
