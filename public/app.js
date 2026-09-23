// DigiCrorepati — client. 100% offline question bank + procedural maths questions. No AI calls.
(() => {
  // ---------------- i18n ----------------
  const T = {
    en: {
      navQuizzes: "Quizzes", navBlog: "Blog", navGlossary: "Glossary",
      heroTitle: "Digital Marketing & AI Quiz",
      heroSub: "Answer 10 levels of questions — from Rookie to Legend — and win the virtual ₹1 Crore. Real situations, marketing maths, and an explanation for every answer.",
      yourName: "Your name", play: "▶ Play", playLevel: (n) => `▶ Play Level ${n}`,
      bankStats: (n) => `${n.toLocaleString("en-IN")} questions + unlimited marketing-maths puzzles`,
      daily: "Daily Challenge", dailyDone: (s, st) => `✅ Today: ${s}/10 · 🔥 ${st}-day streak`, dailyStreak: (st) => `🔥 ${st}-day streak — keep it alive!`,
      dailyTitle: "📅 Daily Challenge", dailyAlready: "You've already played today's challenge. Come back tomorrow for a new one!",
      ladderTitle: "Prize Ladder", ladderHint: "Get 4 of 5 right to climb. Every level is harder, with less time.",
      leaderTitle: "Leaderboard", leaderEmpty: "Be the first on the board — enter your name and play!",
      practiceTitle: "Practice", pickTopic: "Choose a topic to practise", maths: "Marketing maths (CTR, ROAS, CPA…)",
      cat_dm: "Digital Marketing", cat_ai: "AI & LLM", cat_tech: "Web & Tech",
      newsTitle: "Latest AI & Marketing news", loading: "Loading…", newsNone: "News unavailable right now.",
      next: "Next question →", finish: "See result", close: "Close",
      correct: "✅ Correct answer!", wrong: "❌ Wrong answer", timeout: "⏰ Time's up!", rightAnswer: "Correct answer:",
      level: "Level", situation: "Situation", mathsTag: "Marketing maths",
      pollTitle: "📊 Audience poll", friendTitle: "📞 Phone a friend",
      friendSays: (l, p) => `"Hmm… I'm about ${p}% sure it's ${l}. Go with your gut!"`,
      watchAd: "📺 Watch an ad → +1 lifeline",
      passTitle: "Level cleared! 🎉", failTitle: "Game over — well played!", passMsg: "Next level unlocked. It gets tougher from here.", failMsg: "You need 4 of 5 to climb. Read the explanations below and try again.",
      practiceDone: "Round complete", retry: "Play again", nextLevel: "Next level →", home: "Home", youWon: "You won",
      reviewTitle: "📘 Review & explanations", yourAnswer: "Your answer:", noAnswer: "(no answer)",
      share: "Challenge your friends:", shareCard: "🖼️ Share score card", certificate: "🎓 Download certificate", challengeFriend: "⚔️ Challenge a friend (same questions)",
      linkCopied: "Challenge link copied! Send it to a friend.",
      shareText: (amt, lv) => `I won ${amt} on DigiCrorepati — the Digital Marketing & AI quiz (Level ${lv}). Can you beat me?`,
      challengeText: (name, lv, s) => `${name || "I"} scored ${s}/5 on Level ${lv} of DigiCrorepati. Beat me on the SAME questions:`,
      challengeBanner: (name, lv, s) => `⚔️ ${name || "A friend"} challenged you! They scored ${s}/5 on Level ${lv}. Same questions — can you beat them?`,
      acceptChallenge: "Accept challenge", dailyShare: (s, st, grid) => `DigiCrorepati Daily ${s}/10 🔥${st}\n${grid}`,
      recommended: "📚 Recommended for you", sponsoredBy: "Powered by",
      leadTitle: "🎯 Want a career in digital marketing?", leadSub: "Get a free counselling call about courses & jobs. We'll share your details only with our partner institutes.",
      leadName: "Name", leadPhone: "Mobile number", leadCity: "City", leadInterest: "Interested in",
      leadInterests: ["Digital marketing course", "Job / internship", "Freelancing", "AI tools training"],
      leadConsent: "I agree to be contacted by DigiCrorepati and its partner institutes about courses and careers.",
      leadSubmit: "Get free counselling", leadThanks: "✅ Thanks! Someone will contact you soon.", leadError: "Please enter your name, a valid mobile number and tick the consent box.",
      footer: "Offline question bank — free forever. Prize money is virtual. Facts change fast — always verify before acting.",
      practiceTitleQuiz: "🎯 Practice", challengeTitleQuiz: "⚔️ Friend challenge",
    },
    hi: {
      navQuizzes: "Quizzes", navBlog: "Blog", navGlossary: "Glossary",
      heroTitle: "Digital Marketing & AI Quiz",
      heroSub: "Rookie se Legend tak 10 levels ke sawaalon ka jawab do aur jeeto virtual ₹1 Crore. Real situations, marketing maths, aur har jawab ka explanation.",
      yourName: "Aapka naam", play: "▶ Khelo", playLevel: (n) => `▶ Level ${n} khelo`,
      bankStats: (n) => `${n.toLocaleString("en-IN")} sawaal + unlimited marketing-maths puzzles`,
      daily: "Daily Challenge", dailyDone: (s, st) => `✅ Aaj: ${s}/10 · 🔥 ${st} din ki streak`, dailyStreak: (st) => `🔥 ${st} din ki streak — tootne mat do!`,
      dailyTitle: "📅 Daily Challenge", dailyAlready: "Aaj ka challenge ho gaya. Kal naya challenge milega!",
      ladderTitle: "Prize Ladder", ladderHint: "Upar jaane ke liye 5 mein se 4 sahi karo. Har level tough, time kam.",
      leaderTitle: "Leaderboard", leaderEmpty: "Board pe pehle aap aao — naam daalo aur khelo!",
      practiceTitle: "Practice", pickTopic: "Practice ke liye topic chuno", maths: "Marketing maths (CTR, ROAS, CPA…)",
      cat_dm: "Digital Marketing", cat_ai: "AI & LLM", cat_tech: "Web & Tech",
      newsTitle: "Latest AI & Marketing news", loading: "Load ho raha hai…", newsNone: "Abhi news available nahi hai.",
      next: "Agla sawaal →", finish: "Result dekho", close: "Band karo",
      correct: "✅ Sahi jawab!", wrong: "❌ Galat jawab", timeout: "⏰ Time khatam!", rightAnswer: "Sahi jawab:",
      level: "Level", situation: "Situation", mathsTag: "Marketing maths",
      pollTitle: "📊 Audience poll", friendTitle: "📞 Phone a friend",
      friendSays: (l, p) => `"Hmm… mujhe lagta hai ${l} hai, around ${p}% sure hoon. Apne gut pe chalo!"`,
      watchAd: "📺 Ad dekho → +1 lifeline",
      passTitle: "Level clear! 🎉", failTitle: "Game over — achha khele!", passMsg: "Agla level unlock ho gaya. Ab aur tough hoga.", failMsg: "Upar jaane ke liye 5 mein se 4 chahiye. Neeche explanations padho aur phir try karo.",
      practiceDone: "Round complete", retry: "Phir se khelo", nextLevel: "Agla level →", home: "Home", youWon: "Aap jeete",
      reviewTitle: "📘 Review aur explanations", yourAnswer: "Aapka jawab:", noAnswer: "(jawab nahi diya)",
      share: "Doston ko challenge karo:", shareCard: "🖼️ Score card share karo", certificate: "🎓 Certificate download karo", challengeFriend: "⚔️ Dost ko challenge karo (same sawaal)",
      linkCopied: "Challenge link copy ho gaya! Dost ko bhejo.",
      shareText: (amt, lv) => `Maine DigiCrorepati pe ${amt} jeete — Digital Marketing & AI quiz (Level ${lv}). Kya aap mujhe hara sakte ho?`,
      challengeText: (name, lv, s) => `${name || "Maine"} DigiCrorepati ke Level ${lv} pe ${s}/5 score kiya. SAME sawaalon pe mujhe harao:`,
      challengeBanner: (name, lv, s) => `⚔️ ${name || "Aapke dost"} ne challenge kiya! Level ${lv} pe unka score ${s}/5 hai. Same sawaal — kya aap jeet sakte ho?`,
      acceptChallenge: "Challenge accept karo", dailyShare: (s, st, grid) => `DigiCrorepati Daily ${s}/10 🔥${st}\n${grid}`,
      recommended: "📚 Aapke liye recommended", sponsoredBy: "Powered by",
      leadTitle: "🎯 Digital marketing mein career banana hai?", leadSub: "Courses aur jobs ke baare mein free counselling call pao. Aapki details sirf hamare partner institutes ke saath share hongi.",
      leadName: "Naam", leadPhone: "Mobile number", leadCity: "Sheher", leadInterest: "Interest",
      leadInterests: ["Digital marketing course", "Job / internship", "Freelancing", "AI tools training"],
      leadConsent: "Main agree karta/karti hoon ki DigiCrorepati aur uske partner institutes courses aur career ke liye mujhse contact kar sakte hain.",
      leadSubmit: "Free counselling pao", leadThanks: "✅ Thank you! Jaldi hi aapko call aayega.", leadError: "Naam, sahi mobile number daalo aur consent box tick karo.",
      footer: "Offline question bank — hamesha free. Prize money virtual hai. Facts jaldi badalte hain — action se pehle verify karo.",
      practiceTitleQuiz: "🎯 Practice", challengeTitleQuiz: "⚔️ Dost ka challenge",
    },
    mr: {
      navQuizzes: "क्विझ", navBlog: "ब्लॉग", navGlossary: "शब्दकोश",
      heroTitle: "डिजिटल मार्केटिंग आणि AI क्विझ",
      heroSub: "रूकी पासून लेजेंड पर्यंत 10 levels च्या प्रश्नांची उत्तरे द्या आणि जिंका virtual ₹1 कोटी. खऱ्या परिस्थिती, मार्केटिंग गणित आणि प्रत्येक उत्तराचे स्पष्टीकरण.",
      yourName: "तुमचे नाव", play: "▶ खेळा", playLevel: (n) => `▶ Level ${n} खेळा`,
      bankStats: (n) => `${n.toLocaleString("en-IN")} प्रश्न + अमर्याद मार्केटिंग-गणित कोडी`,
      daily: "दैनिक Challenge", dailyDone: (s, st) => `✅ आज: ${s}/10 · 🔥 ${st} दिवसांची streak`, dailyStreak: (st) => `🔥 ${st} दिवसांची streak — तुटू देऊ नका!`,
      dailyTitle: "📅 दैनिक Challenge", dailyAlready: "आजचे challenge झाले. उद्या नवीन challenge मिळेल!",
      ladderTitle: "बक्षीस शिडी", ladderHint: "वर चढण्यासाठी 5 पैकी 4 बरोबर करा. प्रत्येक level कठीण, वेळ कमी.",
      leaderTitle: "लीडरबोर्ड", leaderEmpty: "बोर्डवर पहिले तुम्ही या — नाव टाका आणि खेळा!",
      practiceTitle: "सराव", pickTopic: "सरावासाठी विषय निवडा", maths: "मार्केटिंग गणित (CTR, ROAS, CPA…)",
      cat_dm: "डिजिटल मार्केटिंग", cat_ai: "AI & LLM", cat_tech: "Web & Tech",
      newsTitle: "नवीनतम AI आणि Marketing बातम्या", loading: "Load होत आहे…", newsNone: "सध्या बातम्या उपलब्ध नाहीत.",
      next: "पुढचा प्रश्न →", finish: "निकाल पहा", close: "बंद करा",
      correct: "✅ बरोबर उत्तर!", wrong: "❌ चुकीचे उत्तर", timeout: "⏰ वेळ संपली!", rightAnswer: "बरोबर उत्तर:",
      level: "Level", situation: "परिस्थिती", mathsTag: "मार्केटिंग गणित",
      pollTitle: "📊 प्रेक्षक मत", friendTitle: "📞 मित्राला फोन",
      friendSays: (l, p) => `"हम्म… मला वाटतं ${l} आहे, साधारण ${p}% खात्री आहे. मनाचं ऐका!"`,
      watchAd: "📺 Ad पहा → +1 lifeline",
      passTitle: "Level पूर्ण! 🎉", failTitle: "खेळ संपला — छान खेळलात!", passMsg: "पुढचा level उघडला. आता अजून कठीण.", failMsg: "वर चढण्यासाठी 5 पैकी 4 हवे. खालील स्पष्टीकरणे वाचा आणि पुन्हा प्रयत्न करा.",
      practiceDone: "फेरी पूर्ण", retry: "पुन्हा खेळा", nextLevel: "पुढचा level →", home: "मुख्यपृष्ठ", youWon: "तुम्ही जिंकलात",
      reviewTitle: "📘 आढावा आणि स्पष्टीकरणे", yourAnswer: "तुमचे उत्तर:", noAnswer: "(उत्तर दिले नाही)",
      share: "मित्रांना challenge करा:", shareCard: "🖼️ Score card share करा", certificate: "🎓 प्रमाणपत्र डाउनलोड करा", challengeFriend: "⚔️ मित्राला challenge करा (तेच प्रश्न)",
      linkCopied: "Challenge link copy झाली! मित्राला पाठवा.",
      shareText: (amt, lv) => `मी DigiCrorepati वर ${amt} जिंकले — डिजिटल मार्केटिंग आणि AI क्विझ (Level ${lv}). तुम्ही मला हरवू शकता का?`,
      challengeText: (name, lv, s) => `${name || "मी"} DigiCrorepati च्या Level ${lv} वर ${s}/5 गुण मिळवले. त्याच प्रश्नांवर मला हरवा:`,
      challengeBanner: (name, lv, s) => `⚔️ ${name || "तुमच्या मित्राने"} challenge केले! Level ${lv} वर त्यांचे ${s}/5 गुण. तेच प्रश्न — तुम्ही जिंकाल का?`,
      acceptChallenge: "Challenge स्वीकारा", dailyShare: (s, st, grid) => `DigiCrorepati Daily ${s}/10 🔥${st}\n${grid}`,
      recommended: "📚 तुमच्यासाठी शिफारस", sponsoredBy: "Powered by",
      leadTitle: "🎯 डिजिटल मार्केटिंगमध्ये करिअर करायचे आहे?", leadSub: "कोर्स आणि नोकऱ्यांबद्दल मोफत counselling call मिळवा. तुमची माहिती फक्त आमच्या partner संस्थांसोबत शेअर होईल.",
      leadName: "नाव", leadPhone: "मोबाईल नंबर", leadCity: "शहर", leadInterest: "आवड",
      leadInterests: ["डिजिटल मार्केटिंग कोर्स", "नोकरी / internship", "Freelancing", "AI tools प्रशिक्षण"],
      leadConsent: "कोर्स आणि करिअरबद्दल DigiCrorepati आणि त्यांच्या partner संस्थांनी माझ्याशी संपर्क करण्यास माझी संमती आहे.",
      leadSubmit: "मोफत counselling मिळवा", leadThanks: "✅ धन्यवाद! लवकरच तुम्हाला फोन येईल.", leadError: "नाव, योग्य मोबाईल नंबर टाका आणि संमती box tick करा.",
      footer: "Offline प्रश्नसंच — कायम मोफत. बक्षीस रक्कम virtual आहे. माहिती लवकर बदलते — कृतीपूर्वी खात्री करा.",
      practiceTitleQuiz: "🎯 सराव", challengeTitleQuiz: "⚔️ मित्राचे challenge",
    },
  };

  const LEVELS = [
    { n: 1, en: "Rookie", mr: "रूकी", time: 45, prize: "₹1,000" },
    { n: 2, en: "Explorer", mr: "एक्सप्लोरर", time: 42, prize: "₹5,000" },
    { n: 3, en: "Practitioner", mr: "प्रॅक्टिशनर", time: 40, prize: "₹10,000", safe: true },
    { n: 4, en: "Specialist", mr: "स्पेशालिस्ट", time: 38, prize: "₹50,000" },
    { n: 5, en: "Strategist", mr: "स्ट्रॅटेजिस्ट", time: 35, prize: "₹1,00,000" },
    { n: 6, en: "Expert", mr: "एक्स्पर्ट", time: 32, prize: "₹5,00,000" },
    { n: 7, en: "Master", mr: "मास्टर", time: 30, prize: "₹10,00,000", safe: true },
    { n: 8, en: "Architect", mr: "आर्किटेक्ट", time: 28, prize: "₹25,00,000" },
    { n: 9, en: "Grandmaster", mr: "ग्रँडमास्टर", time: 25, prize: "₹50,00,000" },
    { n: 10, en: "Legend", mr: "लेजेंड", time: 22, prize: "₹1 Crore" },
  ];
  const TOPIC_LABELS = {
    core: { en: "Mixed essentials", hi: "Mixed essentials", mr: "मूलभूत मिश्र" },
    seo: { en: "SEO", hi: "SEO", mr: "SEO" },
    ppc: { en: "Google Ads & PPC", hi: "Google Ads & PPC", mr: "Google Ads आणि PPC" },
    social: { en: "Social Media Marketing", hi: "Social Media Marketing", mr: "सोशल मीडिया मार्केटिंग" },
    analytics: { en: "Analytics & CRO", hi: "Analytics & CRO", mr: "Analytics आणि CRO" },
    "content-email": { en: "Content, Email & CRM", hi: "Content, Email & CRM", mr: "Content, Email आणि CRM" },
    "ai-basics": { en: "AI & LLM Basics", hi: "AI & LLM Basics", mr: "AI आणि LLM मूलभूत" },
    "ai-advanced": { en: "Advanced AI & LLMs", hi: "Advanced AI & LLMs", mr: "प्रगत AI आणि LLM" },
    "web-ecom": { en: "Web Tech & E-commerce", hi: "Web Tech & E-commerce", mr: "Web Tech आणि E-commerce" },
    glossary: { en: "Glossary terms", hi: "Glossary terms", mr: "शब्दकोश" },
  };
  const PER_ROUND = 5, PASS = 4, DAILY_N = 10;
  const CFG = window.ADS_CONFIG || {};

  // ---------------- state ----------------
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const state = {
    lang: store.get("qz_lang", "en"),
    name: store.get("qz_name", ""),
    pid: store.get("qz_pid", null) || (() => { const id = "p" + Math.random().toString(36).slice(2) + Date.now().toString(36); store.set("qz_pid", id); return id; })(),
    progress: store.get("qz_progress", { unlocked: 1, stars: {}, xp: 0, bestStreak: 0 }),
    seen: store.get("qz_seen", {}),
    daily: store.get("qz_daily", { last: null, score: 0, grid: "", streak: 0 }),
    manifest: null, bank: {}, round: null, challenge: null,
  };
  const saveProgress = () => store.set("qz_progress", state.progress);
  const t = (k, ...a) => { const v = T[state.lang][k] ?? T.en[k]; return typeof v === "function" ? v(...a) : v; };
  const $ = (s) => document.querySelector(s);
  const L = (obj) => (obj && typeof obj === "object" && !Array.isArray(obj) ? obj[state.lang] ?? obj.en : obj);
  const optsOf = (q) => (Array.isArray(q.opts) ? q.opts : q.opts[state.lang] ?? q.opts.en);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a, r = Math.random) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const totalStars = () => Object.values(state.progress.stars).reduce((s, v) => s + v, 0);
  const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const prizeOf = (lv) => (state.lang === "mr" && lv.n === 10 ? "₹1 कोटी" : lv.prize);
  const levelName = (lv) => (state.lang === "mr" ? lv.mr : lv.en);
  const siteUrl = () => location.origin + "/";

  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 2600);
  }

  // ---------------- question bank ----------------
  async function loadManifest() {
    try { state.manifest = await (await fetch("/bank/manifest.json")).json(); } catch { state.manifest = null; }
    renderHome();
  }
  async function loadLevel(n) {
    if (!state.bank[n]) state.bank[n] = fetch(`/bank/level-${n}.json`).then((r) => r.json()).catch(() => []);
    return state.bank[n];
  }
  function markSeen(ids, level) {
    const s = new Set(state.seen[level] || []);
    ids.forEach((id) => s.add(id));
    state.seen[level] = [...s].slice(-600);
    store.set("qz_seen", state.seen);
  }
  // Prefer questions the player hasn't seen; recycle when a level is exhausted.
  function pickFresh(pool, count, level, r = Math.random, useSeen = true) {
    const seen = new Set(useSeen ? state.seen[level] || [] : []);
    let unseen = pool.filter((q) => !seen.has(q.id));
    if (unseen.length < count) { if (useSeen) { state.seen[level] = []; store.set("qz_seen", state.seen); } unseen = pool; }
    return shuffle(unseen, r).slice(0, count);
  }

  async function levelQuestions(n, r = Math.random, useSeen = true) {
    const pool = await loadLevel(n);
    const wantMaths = r() < (n <= 2 ? 0.35 : 0.5);
    const bankCount = PER_ROUND - (wantMaths ? 1 : 0);
    // At most one auto-generated glossary question per round; the rest are hand-written.
    const glossCount = r() < 0.6 ? 1 : 0;
    const main = pool.filter((q) => q.t !== "glossary"), gloss = pool.filter((q) => q.t === "glossary");
    let picked = [...pickFresh(main, bankCount - glossCount, n, r, useSeen), ...pickFresh(gloss, glossCount, n, r, useSeen)];
    // From level 4 up, make sure there's at least one situation question.
    if (n >= 4 && !picked.some((q) => q.type === "situation")) {
      const sit = pickFresh(pool.filter((q) => q.type === "situation"), 1, n, r, false)[0];
      if (sit && !picked.includes(sit)) picked[picked.length - 1] = sit;
    }
    if (wantMaths) picked.push(Calc.generate(n, r, `${n}-${Math.floor(r() * 1e9)}`));
    return shuffle(picked, r);
  }

  // ---------------- home ----------------
  function applyLang() {
    document.documentElement.lang = state.lang === "mr" ? "mr" : state.lang === "hi" ? "hi-Latn" : "en";
    document.body.classList.toggle("lang-mr", state.lang === "mr");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll(".lang-switch button").forEach((b) => b.classList.toggle("active", b.dataset.lang === state.lang));
    const qz = document.querySelector('.top-nav a[data-nav="quiz"]');
    if (qz) qz.href = state.lang === "en" ? "/quiz/" : `/${state.lang}/quiz/`;
    renderHome();
    renderSponsor();
    if (state.round && $("#quiz").classList.contains("active")) renderQuestion(true);
    if (state.round && $("#result").classList.contains("active")) renderResult();
  }

  function ladderHTML({ mini = false, current = state.progress.unlocked } = {}) {
    const p = state.progress;
    return LEVELS.map((lv) => {
      const locked = !mini && lv.n > p.unlocked;
      const stars = p.stars[lv.n] || 0;
      const cls = ["rung", lv.safe ? "safe" : "", locked ? "locked" : "", lv.n === current ? "current" : "", stars ? "done" : ""].join(" ");
      return `<li class="${cls}" data-level="${lv.n}" tabindex="${locked || mini ? -1 : 0}">
        <span class="n">${lv.n}</span>
        <span class="amt">${prizeOf(lv)}${mini ? "" : `<span class="nm">${esc(levelName(lv))} · ${lv.time}s</span>`}</span>
        <span class="st">${locked ? "🔒" : "★".repeat(stars) + "☆".repeat(3 - stars)}</span>
      </li>`;
    }).join("");
  }

  function renderHome() {
    const p = state.progress;
    $("#xpVal").textContent = p.xp;
    $("#ladder").innerHTML = ladderHTML();
    $("#playBtn").querySelector("span").textContent = p.unlocked > 1 ? t("playLevel", p.unlocked) : t("play");
    $("#playerName").value = state.name;
    $("#bankStats").textContent = state.manifest ? t("bankStats", state.manifest.total) : "";
    const d = state.daily;
    const playedToday = d.last === todayKey();
    $("#dailyInfo").textContent = playedToday ? t("dailyDone", d.score, d.streak) : d.streak > 0 && isYesterday(d.last) ? t("dailyStreak", d.streak) : "";
    $("#dailyBtn").classList.toggle("done", playedToday);
    $("#muteBtn").textContent = Sound.muted ? "🔇" : "🔊";
    $("#muteBtn").classList.toggle("off", Sound.muted);
    $("#voiceBtn").classList.toggle("off", !Sound.voiceOn);
    if (CFG.support?.url) { const s = $("#supportLink"); s.href = CFG.support.url; s.textContent = L(CFG.support.label) || "☕ Support"; s.classList.remove("hidden"); }
  }
  function isYesterday(key) {
    if (!key) return false;
    const d = new Date(); d.setDate(d.getDate() - 1);
    return key === `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  function renderSponsor() {
    const sp = CFG.sponsor;
    document.querySelectorAll(".sponsor-slot").forEach((el) => {
      if (!sp?.name) { el.innerHTML = ""; el.classList.add("hidden"); return; }
      el.classList.remove("hidden");
      el.innerHTML = `<a href="${esc(sp.url)}" target="_blank" rel="sponsored noopener">${sp.logo ? `<img src="${esc(sp.logo)}" alt="" height="28" />` : ""}<span><small>${t("sponsoredBy")}</small> <b>${esc(sp.name)}</b>${sp.tagline ? ` — ${esc(L(sp.tagline))}` : ""}</span></a>`;
    });
  }

  async function loadNews() {
    try {
      const { items } = await (await fetch("/api/news")).json();
      if (!items?.length) throw 0;
      $("#news").innerHTML = items.map((n) => `<li><span class="tag ${n.cat}">${n.cat === "ai" ? "AI" : "DM"}</span><a href="${esc(n.link)}" target="_blank" rel="noopener nofollow">${esc(n.title)}</a><span class="src">${esc(n.source)} · ${esc(new Date(n.date).toLocaleDateString())}</span></li>`).join("");
    } catch {
      $("#news").innerHTML = `<li class="hint">${t("newsNone")}</li>`;
    }
  }
  async function loadLeaderboard() {
    try {
      const { items } = await (await fetch("/api/leaderboard")).json();
      $("#leaderboard").innerHTML = items?.length
        ? items.map((r) => `<li class="${r.name === state.name ? "me" : ""}"><span class="nm">${esc(r.name)}</span><span class="sc">L${r.level} · ⚡${r.xp}</span></li>`).join("")
        : `<li class="hint">${t("leaderEmpty")}</li>`;
    } catch {
      $("#leaderboard").innerHTML = `<li class="hint">${t("leaderEmpty")}</li>`;
    }
  }
  async function submitScore() {
    if (!state.name) return;
    try {
      await fetch("/api/leaderboard", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pid: state.pid, name: state.name, xp: state.progress.xp, level: state.progress.unlocked, stars: totalStars() }),
      });
      loadLeaderboard();
    } catch {}
  }

  // ---------------- rounds ----------------
  // Shuffle options once per question (same order in every language) and track the new correct index.
  function prepare(q, r = Math.random) {
    const order = shuffle([0, 1, 2, 3], r);
    const remap = (arr) => order.map((i) => arr[i]);
    const opts = Array.isArray(q.opts) ? remap(q.opts) : Object.fromEntries(Object.entries(q.opts).map(([k, v]) => [k, remap(v)]));
    return { ...q, opts, a: order.indexOf(q.a) };
  }

  async function startLevel(n, { seed } = {}) {
    Sound.unlock();
    const s = seed ?? Math.floor(Math.random() * 2 ** 31);
    const r = Calc.rngFrom(s);
    // Seeded rounds ignore "seen" history so a challenge link reproduces the exact same questions.
    const qs = await levelQuestions(n, r, seed == null);
    startRound({ mode: state.challenge && seed != null ? "challenge" : "level", level: n, seed: s, time: LEVELS[n - 1].time, questions: qs, r });
  }

  async function startDaily() {
    if (state.daily.last === todayKey()) { toast(t("dailyAlready")); return; }
    Sound.unlock();
    const seed = Number(todayKey().replace(/-/g, ""));
    const r = Calc.rngFrom(seed);
    const qs = [];
    for (let n = 1; n <= DAILY_N; n++) {
      if (n % 4 === 0) { qs.push(Calc.generate(n, r, `d${seed}-${n}`)); continue; }
      const pool = await loadLevel(n);
      if (pool.length) qs.push(pool[Math.floor(r() * pool.length)]);
    }
    startRound({ mode: "daily", time: 30, titleKey: "dailyTitle", questions: qs, r });
  }

  async function startPractice(topic) {
    closeModal();
    Sound.unlock();
    const maxL = Math.min(10, state.progress.unlocked + 1);
    let qs;
    if (topic === "maths") {
      qs = Array.from({ length: 8 }, (_, i) => Calc.generate(Math.min(maxL, 1 + Math.floor((i * maxL) / 8)), Math.random));
    } else {
      const pools = await Promise.all(Array.from({ length: maxL }, (_, i) => loadLevel(i + 1)));
      const pool = pools.flat().filter((q) => q.t === topic);
      qs = shuffle(pool).slice(0, 8).sort((a, b) => a.level - b.level);
    }
    startRound({ mode: "practice", time: 40, titleKey: "practiceTitleQuiz", topic, questions: qs });
  }

  function startRound(cfg) {
    if (!cfg.questions.length) return;
    const r = cfg.r || Math.random;
    state.round = {
      ...cfg, questions: cfg.questions.map((q) => prepare(q, r)), i: 0, answers: [], streak: 0,
      timer: null, remaining: cfg.time, busy: false,
      lifelines: { fifty: true, poll: true, friend: true }, rewardUsed: false, gone: {}, llView: {},
    };
    show("quiz");
    Sound.play("start");
    renderQuestion();
  }

  // ---------------- quiz ----------------
  function roundTitle() {
    const r = state.round;
    if (r.mode === "level" || r.mode === "challenge") {
      const lv = LEVELS[r.level - 1];
      return `${r.mode === "challenge" ? "⚔️ " : ""}${t("level")} ${r.level} · ${levelName(lv)} · ${prizeOf(lv)}`;
    }
    if (r.mode === "practice") return `${t("practiceTitleQuiz")} · ${r.topic === "maths" ? t("mathsTag") : L(TOPIC_LABELS[r.topic]) || ""}`;
    return t(r.titleKey);
  }
  const dotsHTML = (r) => r.questions.map((_, i) => `<span class="${r.answers[i] ? (r.answers[i].ok ? "ok" : "bad") : i === r.i ? "cur" : ""}"></span>`).join("");

  function renderQuestion(langOnly = false) {
    const r = state.round, q = r.questions[r.i];
    const answered = r.answers[r.i];
    $("#quizTitle").textContent = roundTitle();
    $("#qDots").innerHTML = dotsHTML(r);
    $("#miniLadder").innerHTML = ladderHTML({ mini: true, current: r.level || 0 });
    const topic = q.calc ? t("mathsTag") : L(TOPIC_LABELS[q.t]) || t("cat_" + q.cat);
    $("#qBadges").innerHTML =
      `<span class="tag lvl">${t("level")} ${q.level}</span><span class="tag ${q.calc ? "maths" : q.cat}">${esc(topic)}</span>` +
      (q.type === "situation" ? `<span class="tag situation">${t("situation")}</span>` : "");
    $("#qText").textContent = L(q.q);
    const gone = r.gone[r.i] || [];
    $("#options").innerHTML = optsOf(q).map((o, i) =>
      `<button class="opt ${gone.includes(i) ? "gone" : ""}" data-i="${i}"><span class="key">${"ABCD"[i]}:</span><span>${esc(o)}</span></button>`).join("");
    document.querySelectorAll(".lifeline").forEach((b) => {
      b.disabled = !r.lifelines[b.dataset.ll] || !!answered;
      b.classList.toggle("used", !r.lifelines[b.dataset.ll]);
    });
    renderRewardBtn();
    const ml = $("#miniLadder"), cur = $("#miniLadder .current");
    if (cur) ml.scrollLeft = cur.offsetLeft - ml.clientWidth / 2 + cur.clientWidth / 2;
    renderLifelinePanel();

    if (answered) {
      paintReveal(answered.chosen);
    } else if (r.lockedIdx != null) {
      document.querySelectorAll(".opt").forEach((b, i) => { b.disabled = true; if (i === r.lockedIdx) b.classList.add("locked"); });
    } else {
      $("#feedback").classList.add("hidden");
      if (!langOnly) { startTimer(); Sound.startBed(q.level); }
    }
  }

  function setTimerUI() {
    const r = state.round;
    const frac = Math.max(0, r.remaining / r.time);
    $("#timerCircle").style.strokeDashoffset = String(119.38 * (1 - frac));
    $("#timerNum").textContent = Math.ceil(Math.max(0, r.remaining));
    $("#timerRing").classList.toggle("low", r.remaining <= 5);
  }
  function startTimer() {
    const r = state.round;
    clearInterval(r.timer);
    r.remaining = r.time;
    setTimerUI();
    let lastSec = Math.ceil(r.remaining);
    r.timer = setInterval(() => {
      if (r.paused) return;
      r.remaining -= 0.25;
      setTimerUI();
      const sec = Math.ceil(r.remaining);
      if (sec !== lastSec) { lastSec = sec; if (sec <= 5 && sec > 0) Sound.play("tick"); }
      if (r.remaining <= 0) { clearInterval(r.timer); reveal(null); }
    }, 250);
  }

  // Click → lock the answer (orange) → suspense → reveal.
  async function lockAnswer(i) {
    const r = state.round;
    if (!r || r.busy || r.answers[r.i] || (r.gone[r.i] || []).includes(i)) return;
    r.busy = true;
    clearInterval(r.timer);
    r.lockedIdx = i;
    document.querySelectorAll(".opt").forEach((b, j) => { b.disabled = true; if (j === i) b.classList.add("locked"); });
    document.querySelectorAll(".lifeline").forEach((b) => { b.disabled = true; });
    $("#rewardBtn").classList.add("hidden");
    Sound.play("lock");
    Sound.host("lock", state.lang);
    const q = r.questions[r.i];
    await sleep(q.level <= 2 ? 1100 : 1600 + q.level * 60);
    if (state.round === r && r.busy && $("#quiz").classList.contains("active")) reveal(i);
  }

  function reveal(chosen) {
    const r = state.round;
    if (r.answers[r.i]) return;
    clearInterval(r.timer);
    Sound.stopBed();
    const q = r.questions[r.i];
    const ok = chosen === q.a;
    r.streak = ok ? r.streak + 1 : 0;
    if (ok) {
      state.progress.xp += 10 * q.level + Math.round(Math.max(0, r.remaining));
      state.progress.bestStreak = Math.max(state.progress.bestStreak, r.streak);
      saveProgress();
      $("#xpVal").textContent = state.progress.xp;
    }
    r.answers[r.i] = { chosen, ok };
    r.lockedIdx = null;
    r.busy = false;
    Sound.play(ok ? "correct" : chosen == null ? "timeout" : "wrong");
    setTimeout(() => Sound.host(ok ? "correct" : chosen == null ? "timeout" : "wrong", state.lang), ok ? 500 : 900);
    paintReveal(chosen);
  }

  function paintReveal(chosen) {
    const r = state.round, q = r.questions[r.i];
    const ok = chosen === q.a;
    document.querySelectorAll(".opt").forEach((b, i) => {
      b.disabled = true;
      b.classList.remove("locked");
      if (i === q.a) b.classList.add("correct");
      else if (i === chosen) b.classList.add("wrong");
    });
    document.querySelectorAll(".lifeline").forEach((b) => { b.disabled = true; });
    $("#rewardBtn").classList.add("hidden");
    $("#qDots").innerHTML = dotsHTML(r);
    const fb = $("#feedback");
    fb.classList.remove("hidden", "ok", "bad");
    fb.classList.add(ok ? "ok" : "bad");
    $("#fbTitle").textContent = ok ? t("correct") : chosen == null ? t("timeout") : t("wrong");
    $("#fbText").innerHTML = (ok ? "" : `<b>${t("rightAnswer")}</b> ${"ABCD"[q.a]}: ${esc(optsOf(q)[q.a])}<br>`) + esc(L(q.exp));
    $("#nextBtn").textContent = r.i === r.questions.length - 1 ? t("finish") : t("next");
    setTimeout(() => fb.scrollIntoView({ behavior: "smooth", block: "nearest" }), 250);
  }

  // ---------------- lifelines ----------------
  function useLifeline(kind) {
    const r = state.round;
    if (!r || r.busy || r.answers[r.i] || !r.lifelines[kind]) return;
    r.lifelines[kind] = false;
    const q = r.questions[r.i];
    const gone = r.gone[r.i] || [];
    const alive = [0, 1, 2, 3].filter((i) => !gone.includes(i));
    Sound.play("lifeline");
    Sound.host("lifeline", state.lang);
    if (kind === "fifty") {
      const wrongs = shuffle(alive.filter((i) => i !== q.a)).slice(0, 2);
      r.gone[r.i] = [...gone, ...wrongs];
      wrongs.forEach((i) => document.querySelector(`.opt[data-i="${i}"]`)?.classList.add("gone"));
    } else if (kind === "poll") {
      // The audience is less reliable on harder levels.
      const correctShare = Math.max(30, 82 - q.level * 5 + Math.floor(Math.random() * 12));
      const others = alive.filter((i) => i !== q.a);
      const weights = others.map(() => Math.random() + 0.2);
      const wsum = weights.reduce((s, w) => s + w, 0);
      const pct = [0, 0, 0, 0];
      pct[q.a] = others.length ? correctShare : 100;
      others.forEach((i, k) => { pct[i] = Math.round(((100 - correctShare) * weights[k]) / wsum); });
      pct[q.a] += 100 - pct.reduce((s, v) => s + v, 0);
      r.llView[r.i] = { kind: "poll", pct };
    } else if (kind === "friend") {
      const sure = Math.max(35, 96 - q.level * 6);
      const right = Math.random() * 100 < sure + 5;
      const pick = right ? q.a : shuffle(alive.filter((i) => i !== q.a))[0] ?? q.a;
      r.llView[r.i] = { kind: "friend", letter: "ABCD"[pick], pct: sure - Math.floor(Math.random() * 10) };
    }
    const btn = document.querySelector(`.lifeline[data-ll="${kind}"]`);
    btn.disabled = true;
    btn.classList.add("used");
    renderRewardBtn();
    renderLifelinePanel(true);
  }

  // Rewarded ad: once per round, restore one used lifeline.
  function renderRewardBtn() {
    const r = state.round;
    const anyUsed = Object.values(r.lifelines).some((v) => !v);
    const show = anyUsed && !r.rewardUsed && !r.answers[r.i] && r.lockedIdx == null && window.Monetize?.rewardedAvailable();
    const b = $("#rewardBtn");
    b.textContent = t("watchAd");
    b.classList.toggle("hidden", !show);
  }
  function watchRewarded() {
    const r = state.round;
    r.paused = true;
    Sound.stopBed();
    const started = window.Monetize.rewarded("extra-lifeline", () => {
      const used = Object.keys(r.lifelines).find((k) => !r.lifelines[k]);
      if (used) r.lifelines[used] = true;
      r.rewardUsed = true;
    }, () => { r.paused = false; if (state.round === r) renderQuestion(true); });
    if (!started) r.paused = false;
  }

  function renderLifelinePanel(animate = false) {
    const r = state.round, v = r.llView[r.i], panel = $("#lifelinePanel");
    if (!v) { panel.classList.add("hidden"); return; }
    panel.classList.remove("hidden");
    if (v.kind === "poll") {
      panel.innerHTML = `<b>${t("pollTitle")}</b><div class="poll">${v.pct.map((p, i) =>
        `<div class="col"><span>${p}%</span><div class="bar" style="height:${animate ? 0 : p}%" data-h="${p}"></div><span>${"ABCD"[i]}</span></div>`).join("")}</div>`;
      if (animate) requestAnimationFrame(() => requestAnimationFrame(() => panel.querySelectorAll(".bar").forEach((b) => { b.style.height = b.dataset.h + "%"; })));
    } else {
      panel.innerHTML = `<b>${t("friendTitle")}</b><div class="friend"><span class="avatar">🧑‍💼</span><p>${esc(t("friendSays", v.letter, v.pct))}</p></div>`;
      if (animate) Sound.say(t("friendSays", v.letter, v.pct).replace(/"/g, ""), state.lang);
    }
  }

  function next() {
    const r = state.round;
    if (!r.answers[r.i]) return;
    Sound.play("click");
    window.speechSynthesis?.cancel();
    if (r.i < r.questions.length - 1) { r.i++; renderQuestion(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else finishRound();
  }
  function quit() {
    if (state.round) { clearInterval(state.round.timer); state.round.busy = false; }
    Sound.stopBed();
    window.speechSynthesis?.cancel();
    closeModal();
    show("home"); renderHome();
  }

  // ---------------- result ----------------
  const isLadder = (r) => r.mode === "level" || r.mode === "challenge";
  function wonAmount(r) {
    if (!isLadder(r)) return null;
    if (r.score >= PASS) return prizeOf(LEVELS[r.level - 1]);
    const safe = [...LEVELS].reverse().find((lv) => lv.safe && lv.n < r.level && (state.progress.stars[lv.n] || 0) > 0);
    return safe ? prizeOf(safe) : "₹0";
  }
  function confetti() {
    const colors = ["#f5c542", "#ffdf7a", "#ff9a1a", "#9fb4ff", "#7dffac"];
    for (let i = 0; i < 90; i++) {
      const c = document.createElement("div");
      c.className = "confetti";
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[i % colors.length];
      c.style.animationDuration = 2 + Math.random() * 2.5 + "s";
      c.style.animationDelay = Math.random() * 0.8 + "s";
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5500);
    }
  }

  function finishRound() {
    const r = state.round;
    r.score = r.answers.filter((a) => a.ok).length;
    const passed = isLadder(r) ? r.score >= PASS : r.score / r.questions.length >= 0.7;
    if (isLadder(r)) {
      const stars = r.score === 5 ? 3 : r.score === 4 ? 2 : r.score === 3 ? 1 : 0;
      const p = state.progress;
      p.stars[r.level] = Math.max(p.stars[r.level] || 0, stars);
      if (r.score >= PASS && r.level === p.unlocked && p.unlocked < 10) p.unlocked++;
      saveProgress();
      markSeen(r.questions.filter((q) => !q.calc).map((q) => q.id), r.level);
    }
    if (r.mode === "daily") {
      const d = state.daily;
      d.streak = isYesterday(d.last) ? d.streak + 1 : 1;
      d.last = todayKey(); d.score = r.score;
      d.grid = r.answers.map((a) => (a.ok ? "🟩" : "🟥")).join("");
      store.set("qz_daily", d);
    }
    show("result");
    renderResult();
    Sound.play(passed ? "levelWin" : "levelLose");
    if (passed) { confetti(); setTimeout(() => Sound.host("win", state.lang, r.level ?? ""), 900); }
    else setTimeout(() => Sound.host("lose", state.lang), 900);
    submitScore();
    window.Monetize?.refreshSlots();
  }

  function renderResult() {
    const r = state.round, total = r.questions.length, score = r.score;
    const ladder = isLadder(r);
    const passed = ladder ? score >= PASS : score / total >= 0.7;
    const stars = ladder ? (score === 5 ? 3 : score === 4 ? 2 : score === 3 ? 1 : 0) : Math.round((score / total) * 3);
    const won = wonAmount(r);
    $("#resStars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("#resWon").textContent = won ?? "";
    document.querySelector(".won-label").classList.toggle("hidden", !won);
    $("#resWon").classList.toggle("hidden", !won);
    $("#resTitle").textContent = ladder ? (passed ? t("passTitle") : t("failTitle")) : r.mode === "daily" ? t("dailyTitle") : t("practiceDone");
    let msg = ladder ? (passed ? t("passMsg") : t("failMsg")) : "";
    if (r.mode === "challenge" && state.challenge) msg = `${t("challengeBanner", state.challenge.name, r.level, state.challenge.score)} → ${score}/5 ${score > state.challenge.score ? "🏆" : score === state.challenge.score ? "🤝" : "😅"}`;
    if (r.mode === "daily") msg = `${state.daily.grid}  🔥 ${state.daily.streak}`;
    $("#resMsg").textContent = msg;
    $("#resScore").textContent = `${score} / ${total}`;
    $("#nextLevelBtn").classList.toggle("hidden", !(ladder && passed && r.level < 10));
    $("#certBtn").classList.toggle("hidden", !(ladder && passed));
    $("#challengeBtn").classList.toggle("hidden", !ladder);

    const url = siteUrl();
    const brag = won && won !== "₹0" ? won : `${score}/${total}`;
    const text = r.mode === "daily" ? t("dailyShare", score, state.daily.streak, state.daily.grid) : t("shareText", brag, r.level ?? state.progress.unlocked);
    $("#shareWa").href = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    $("#shareLi").href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    $("#shareX").href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    renderAffiliates(r);
    renderLeadForm(r);

    $("#review").innerHTML = r.questions.map((q, i) => {
      const a = r.answers[i], opts = optsOf(q);
      return `<div class="rv ${a.ok ? "" : "bad"}">
        <div class="q">${a.ok ? "✅" : "❌"} ${esc(L(q.q))}</div>
        <div class="a"><b>${t("rightAnswer")}</b> ${esc(opts[q.a])}${a.ok ? "" : ` · <b>${t("yourAnswer")}</b> ${a.chosen == null ? t("noAnswer") : esc(opts[a.chosen])}`}</div>
        <div class="e">${esc(L(q.exp))}</div>
      </div>`;
    }).join("");
  }

  function renderAffiliates(r) {
    const list = CFG.affiliates || [];
    const box = $("#affiliates");
    if (!list.length) { box.classList.add("hidden"); return; }
    // Prefer offers matching topics the player got wrong.
    const weak = new Set(r.questions.filter((q, i) => !r.answers[i]?.ok).map((q) => (q.calc ? "maths" : q.t)));
    const ranked = [...list].sort((a, b) => (b.topics || []).filter((x) => weak.has(x)).length - (a.topics || []).filter((x) => weak.has(x)).length).slice(0, 3);
    box.classList.remove("hidden");
    box.innerHTML = `<h2 class="panel-title">${t("recommended")}</h2><div class="aff-list">${ranked.map((a) =>
      `<a class="aff" href="${esc(a.url)}" target="_blank" rel="sponsored noopener"><b>${esc(L(a.title))}</b><span>${esc(L(a.desc) || "")}</span><em>${esc(L(a.cta) || "→")}</em></a>`).join("")}</div>`;
  }

  function renderLeadForm(r) {
    const lf = CFG.leadForm, box = $("#leadBox");
    const eligible = lf?.enabled && !store.get("qz_lead_done", false) && (state.progress.unlocked >= (lf.minLevel || 1));
    if (!eligible) { box.classList.add("hidden"); return; }
    box.classList.remove("hidden");
    box.innerHTML = `<h2 class="panel-title">${t("leadTitle")}</h2><p class="hint">${t("leadSub")}</p>
      <form id="leadForm" class="lead-form">
        <input name="name" maxlength="60" required placeholder="${esc(t("leadName"))}" value="${esc(state.name)}" />
        <input name="phone" type="tel" inputmode="tel" maxlength="15" required placeholder="${esc(t("leadPhone"))}" />
        <input name="city" maxlength="40" placeholder="${esc(t("leadCity"))}" />
        <select name="interest">${t("leadInterests").map((x) => `<option>${esc(x)}</option>`).join("")}</select>
        <label class="consent"><input type="checkbox" name="consent" /> <span>${esc(t("leadConsent"))} <a href="/privacy" target="_blank">Privacy</a></span></label>
        <button class="lz lz-gold small" type="submit">${t("leadSubmit")}</button>
        <p class="hint lead-msg"></p>
      </form>`;
    $("#leadForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const body = { name: f.get("name"), phone: f.get("phone"), city: f.get("city"), interest: f.get("interest"), consent: f.get("consent") === "on", level: state.progress.unlocked, lang: state.lang };
      const msg = box.querySelector(".lead-msg");
      if (!body.name || String(body.phone).replace(/\D/g, "").length < 10 || !body.consent) { msg.textContent = t("leadError"); return; }
      try {
        const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        if (!res.ok) throw 0;
        store.set("qz_lead_done", true);
        box.innerHTML = `<p class="lead-thanks">${t("leadThanks")}</p>`;
      } catch { msg.textContent = t("leadError"); }
    });
  }

  async function shareCard() {
    const r = state.round;
    const lv = r.level ? LEVELS[r.level - 1] : null;
    const blob = await ShareKit.scoreCard({
      name: state.name, lang: state.lang, url: siteUrl(), sponsor: CFG.sponsor,
      levelLabel: lv ? `${t("level")} ${lv.n} · ${levelName(lv)}` : t(r.mode === "daily" ? "dailyTitle" : "practiceTitleQuiz").replace(/^\S+\s/, ""),
      amount: wonAmount(r), score: `${r.score} / ${r.questions.length}`,
      stars: isLadder(r) ? (r.score === 5 ? 3 : r.score === 4 ? 2 : r.score === 3 ? 1 : 0) : Math.round((r.score / r.questions.length) * 3),
    });
    await ShareKit.shareImage(blob, "digicrorepati-score.png", t("shareText", wonAmount(r) || `${r.score}/${r.questions.length}`, r.level ?? state.progress.unlocked), siteUrl());
  }
  async function downloadCert() {
    const r = state.round, lv = LEVELS[r.level - 1];
    if (!state.name) { $("#playerName").focus(); }
    const blob = await ShareKit.certificate({
      name: state.name, level: lv.n, levelName: lv.en, amount: lv.prize, lang: state.lang,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }), url: siteUrl(), sponsor: CFG.sponsor,
    });
    await ShareKit.shareImage(blob, `digicrorepati-level-${lv.n}-certificate.png`, t("shareText", lv.prize, lv.n), siteUrl());
  }
  async function challengeFriend() {
    const r = state.round;
    const link = `${siteUrl()}?c=${r.seed}.${r.level}.${r.score}&n=${encodeURIComponent(state.name || "")}`;
    const text = t("challengeText", state.name, r.level, r.score);
    if (navigator.share) { try { await navigator.share({ text, url: link }); return; } catch (e) { if (e.name === "AbortError") return; } }
    try { await navigator.clipboard.writeText(`${text} ${link}`); toast(t("linkCopied")); }
    catch { window.open(`https://wa.me/?text=${encodeURIComponent(text + " " + link)}`, "_blank", "noopener"); }
  }

  // ---------------- practice picker ----------------
  function openPractice() {
    const topics = Object.entries(state.manifest?.byTopic || {}).filter(([, n]) => n > 0);
    $("#modalBody").innerHTML = `<h2 class="panel-title">${t("pickTopic")}</h2><div class="topic-grid">
      <button class="lz small topic" data-topic="maths">🧮 ${esc(t("maths"))}</button>
      ${topics.map(([k, n]) => `<button class="lz small topic" data-topic="${esc(k)}">${esc(L(TOPIC_LABELS[k]) || k)} <small>(${n})</small></button>`).join("")}
    </div>`;
    $("#modal").classList.remove("hidden");
  }
  function closeModal() { $("#modal").classList.add("hidden"); }

  // ---------------- challenge links ----------------
  function readChallenge() {
    const p = new URLSearchParams(location.search);
    const c = p.get("c");
    if (!c) return;
    const [seed, level, score] = c.split(".").map(Number);
    if (!Number.isFinite(seed) || !(level >= 1 && level <= 10)) return;
    state.challenge = { seed, level, score: Math.max(0, Math.min(5, score || 0)), name: (p.get("n") || "").replace(/[<>]/g, "").slice(0, 24) };
    const bar = $("#challengeBar");
    bar.classList.remove("hidden");
    bar.querySelector("span").textContent = t("challengeBanner", state.challenge.name, level, state.challenge.score);
    history.replaceState(null, "", location.pathname);
  }

  // ---------------- events ----------------
  document.querySelectorAll(".lang-switch button").forEach((b) =>
    b.addEventListener("click", () => { state.lang = b.dataset.lang; store.set("qz_lang", state.lang); Sound.play("click"); applyLang(); }));
  $("#ladder").addEventListener("click", (e) => {
    const s = e.target.closest(".rung");
    if (s && !s.classList.contains("locked")) startLevel(+s.dataset.level);
  });
  $("#ladder").addEventListener("keydown", (e) => {
    const s = e.target.closest(".rung");
    if (e.key === "Enter" && s && !s.classList.contains("locked")) startLevel(+s.dataset.level);
  });
  $("#playerName").addEventListener("change", (e) => {
    state.name = e.target.value.replace(/[<>]/g, "").trim().slice(0, 24);
    store.set("qz_name", state.name);
    submitScore();
  });
  $("#playBtn").addEventListener("click", () => startLevel(state.progress.unlocked));
  $("#dailyBtn").addEventListener("click", startDaily);
  $("#practiceBtn").addEventListener("click", openPractice);
  $("#modal").addEventListener("click", (e) => {
    const b = e.target.closest(".topic");
    if (b) startPractice(b.dataset.topic);
    else if (e.target.id === "modal" || e.target.closest("#modalClose")) closeModal();
  });
  $("#acceptChallenge").addEventListener("click", () => {
    $("#challengeBar").classList.add("hidden");
    startLevel(state.challenge.level, { seed: state.challenge.seed });
  });
  $("#options").addEventListener("click", (e) => { const b = e.target.closest(".opt"); if (b && !b.disabled) lockAnswer(+b.dataset.i); });
  $("#lifelines").addEventListener("click", (e) => { const b = e.target.closest(".lifeline"); if (b && !b.disabled) useLifeline(b.dataset.ll); });
  $("#rewardBtn").addEventListener("click", watchRewarded);
  $("#nextBtn").addEventListener("click", next);
  $("#quitBtn").addEventListener("click", quit);
  $("#homeLink").addEventListener("click", (e) => { if (location.pathname === "/") { e.preventDefault(); quit(); } });
  $("#homeBtn").addEventListener("click", quit);
  $("#retryBtn").addEventListener("click", () => {
    const r = state.round;
    if (isLadder(r)) startLevel(r.level); else if (r.mode === "daily") startDaily(); else startPractice(r.topic);
  });
  $("#nextLevelBtn").addEventListener("click", () => {
    const n = state.round.level + 1;
    (window.Monetize?.interstitial || ((_, go) => go()))("level-complete", () => startLevel(n));
  });
  $("#shareCardBtn").addEventListener("click", shareCard);
  $("#certBtn").addEventListener("click", downloadCert);
  $("#challengeBtn").addEventListener("click", challengeFriend);
  $("#muteBtn").addEventListener("click", () => { Sound.setMuted(!Sound.muted); renderHome(); });
  $("#voiceBtn").addEventListener("click", () => { Sound.setVoice(!Sound.voiceOn); renderHome(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    if (!$("#quiz").classList.contains("active") || !state.round || ["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
    const k = e.key.toLowerCase();
    const idx = ["1", "2", "3", "4"].indexOf(k) >= 0 ? +k - 1 : ["a", "b", "c", "d"].indexOf(k);
    if (idx >= 0 && !state.round.answers[state.round.i]) lockAnswer(idx);
    else if (e.key === "Enter" && state.round.answers[state.round.i]) { e.preventDefault(); next(); }
  });

  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("/sw.js").catch(() => {});

  applyLang();
  readChallenge();
  loadManifest();
  loadNews();
  loadLeaderboard();
})();
