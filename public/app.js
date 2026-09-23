// DigiCrorepati — client
(() => {
  // ---------------- i18n ----------------
  const T = {
    en: {
      navQuizzes: "Quizzes", navBlog: "Blog",
      heroTitle: "Digital Marketing & AI Quiz",
      heroSub: "Answer 10 levels of questions — from Rookie to Legend — and win the virtual ₹1 Crore. Real situations, the latest AI launches, and an explanation for every answer.",
      yourName: "Your name", play: "▶ Play", playLevel: (n) => `▶ Play Level ${n}`,
      ladderTitle: "Prize Ladder", ladderHint: "Get 4 of 5 right to climb. Every level is harder, with less time.",
      leaderTitle: "Leaderboard", leaderEmpty: "Be the first on the board — enter your name and play!",
      freshPlay: "Latest AI Challenge", practiceTitle: "Practice",
      freshNone: "Live AI questions appear here automatically once the server has an API key.",
      freshSome: (n, d) => `🔥 ${n} live questions from recent news · updated ${d}`,
      cat_dm: "Digital Marketing", cat_ai: "AI & LLM", cat_tech: "Web & Tech", cat_situation: "Situations",
      newsTitle: "Latest AI & Marketing news", loading: "Loading…", newsNone: "News unavailable right now.",
      next: "Next question →", finish: "See result",
      correct: "✅ Correct answer!", wrong: "❌ Wrong answer", timeout: "⏰ Time's up!", rightAnswer: "Correct answer:",
      explainDeeper: "Explain deeper (AI)", thinking: "Thinking…", noAi: "AI explanations need an API key on the server.",
      level: "Level", situation: "Situation", fresh: "Live",
      pollTitle: "📊 Audience poll", friendTitle: "📞 Phone a friend",
      friendSays: (l, p) => `"Hmm… I'm about ${p}% sure it's ${l}. Go with your gut!"`,
      passTitle: "Level cleared! 🎉", failTitle: "Game over — well played!", passMsg: "Next level unlocked. It gets tougher from here.", failMsg: "You need 4 of 5 to climb. Read the explanations below and try again.",
      practiceDone: "Round complete", retry: "Play again", nextLevel: "Next level →", home: "Home", youWon: "You won",
      reviewTitle: "📘 Review & explanations", yourAnswer: "Your answer:", noAnswer: "(no answer)",
      locked: "Locked", share: "Challenge your friends:",
      shareText: (amt, lv) => `I won ${amt} on DigiCrorepati — the Digital Marketing & AI quiz (Level ${lv}). Can you beat me?`,
      footer: "Built-in bank + AI-generated questions from live news. Prize money is virtual. Facts change fast — always verify before acting.",
      freshTitleQuiz: "🔥 Latest AI Challenge", practiceTitleQuiz: "🎯 Practice",
    },
    hi: {
      navQuizzes: "Quizzes", navBlog: "Blog",
      heroTitle: "Digital Marketing & AI Quiz",
      heroSub: "Rookie se Legend tak 10 levels ke sawaalon ka jawab do aur jeeto virtual ₹1 Crore. Real situations, latest AI launches, aur har jawab ka explanation.",
      yourName: "Aapka naam", play: "▶ Khelo", playLevel: (n) => `▶ Level ${n} khelo`,
      ladderTitle: "Prize Ladder", ladderHint: "Upar jaane ke liye 5 mein se 4 sahi karo. Har level tough, time kam.",
      leaderTitle: "Leaderboard", leaderEmpty: "Board pe pehle aap aao — naam daalo aur khelo!",
      freshPlay: "Latest AI Challenge", practiceTitle: "Practice",
      freshNone: "Server pe API key lagte hi yahan live AI sawaal automatic aayenge.",
      freshSome: (n, d) => `🔥 Recent news se ${n} live sawaal · update ${d}`,
      cat_dm: "Digital Marketing", cat_ai: "AI & LLM", cat_tech: "Web & Tech", cat_situation: "Situations",
      newsTitle: "Latest AI & Marketing news", loading: "Load ho raha hai…", newsNone: "Abhi news available nahi hai.",
      next: "Agla sawaal →", finish: "Result dekho",
      correct: "✅ Sahi jawab!", wrong: "❌ Galat jawab", timeout: "⏰ Time khatam!", rightAnswer: "Sahi jawab:",
      explainDeeper: "Aur detail mein samjhao (AI)", thinking: "Soch raha hai…", noAi: "AI explanation ke liye server pe API key chahiye.",
      level: "Level", situation: "Situation", fresh: "Live",
      pollTitle: "📊 Audience poll", friendTitle: "📞 Phone a friend",
      friendSays: (l, p) => `"Hmm… mujhe lagta hai ${l} hai, around ${p}% sure hoon. Apne gut pe chalo!"`,
      passTitle: "Level clear! 🎉", failTitle: "Game over — achha khele!", passMsg: "Agla level unlock ho gaya. Ab aur tough hoga.", failMsg: "Upar jaane ke liye 5 mein se 4 chahiye. Neeche explanations padho aur phir try karo.",
      practiceDone: "Round complete", retry: "Phir se khelo", nextLevel: "Agla level →", home: "Home", youWon: "Aap jeete",
      reviewTitle: "📘 Review aur explanations", yourAnswer: "Aapka jawab:", noAnswer: "(jawab nahi diya)",
      locked: "Locked", share: "Doston ko challenge karo:",
      shareText: (amt, lv) => `Maine DigiCrorepati pe ${amt} jeete — Digital Marketing & AI quiz (Level ${lv}). Kya aap mujhe hara sakte ho?`,
      footer: "Built-in bank + live news se AI-generated sawaal. Prize money virtual hai. Facts jaldi badalte hain — action se pehle verify karo.",
      freshTitleQuiz: "🔥 Latest AI Challenge", practiceTitleQuiz: "🎯 Practice",
    },
    mr: {
      navQuizzes: "क्विझ", navBlog: "ब्लॉग",
      heroTitle: "डिजिटल मार्केटिंग आणि AI क्विझ",
      heroSub: "रूकी पासून लेजेंड पर्यंत 10 levels च्या प्रश्नांची उत्तरे द्या आणि जिंका virtual ₹1 कोटी. खऱ्या परिस्थिती, नवीनतम AI launches आणि प्रत्येक उत्तराचे स्पष्टीकरण.",
      yourName: "तुमचे नाव", play: "▶ खेळा", playLevel: (n) => `▶ Level ${n} खेळा`,
      ladderTitle: "बक्षीस शिडी", ladderHint: "वर चढण्यासाठी 5 पैकी 4 बरोबर करा. प्रत्येक level कठीण, वेळ कमी.",
      leaderTitle: "लीडरबोर्ड", leaderEmpty: "बोर्डवर पहिले तुम्ही या — नाव टाका आणि खेळा!",
      freshPlay: "नवीनतम AI Challenge", practiceTitle: "सराव",
      freshNone: "Server वर API key लावताच इथे live AI प्रश्न आपोआप येतील.",
      freshSome: (n, d) => `🔥 अलीकडच्या बातम्यांवरून ${n} live प्रश्न · update ${d}`,
      cat_dm: "डिजिटल मार्केटिंग", cat_ai: "AI & LLM", cat_tech: "Web & Tech", cat_situation: "परिस्थिती",
      newsTitle: "नवीनतम AI आणि Marketing बातम्या", loading: "Load होत आहे…", newsNone: "सध्या बातम्या उपलब्ध नाहीत.",
      next: "पुढचा प्रश्न →", finish: "निकाल पहा",
      correct: "✅ बरोबर उत्तर!", wrong: "❌ चुकीचे उत्तर", timeout: "⏰ वेळ संपली!", rightAnswer: "बरोबर उत्तर:",
      explainDeeper: "अधिक सविस्तर समजवा (AI)", thinking: "विचार करत आहे…", noAi: "AI स्पष्टीकरणासाठी server वर API key आवश्यक आहे.",
      level: "Level", situation: "परिस्थिती", fresh: "Live",
      pollTitle: "📊 प्रेक्षक मत", friendTitle: "📞 मित्राला फोन",
      friendSays: (l, p) => `"हम्म… मला वाटतं ${l} आहे, साधारण ${p}% खात्री आहे. मनाचं ऐका!"`,
      passTitle: "Level पूर्ण! 🎉", failTitle: "खेळ संपला — छान खेळलात!", passMsg: "पुढचा level उघडला. आता अजून कठीण.", failMsg: "वर चढण्यासाठी 5 पैकी 4 हवे. खालील स्पष्टीकरणे वाचा आणि पुन्हा प्रयत्न करा.",
      practiceDone: "फेरी पूर्ण", retry: "पुन्हा खेळा", nextLevel: "पुढचा level →", home: "मुख्यपृष्ठ", youWon: "तुम्ही जिंकलात",
      reviewTitle: "📘 आढावा आणि स्पष्टीकरणे", yourAnswer: "तुमचे उत्तर:", noAnswer: "(उत्तर दिले नाही)",
      locked: "Locked", share: "मित्रांना challenge करा:",
      shareText: (amt, lv) => `मी DigiCrorepati वर ${amt} जिंकले — डिजिटल मार्केटिंग आणि AI क्विझ (Level ${lv}). तुम्ही मला हरवू शकता का?`,
      footer: "Built-in प्रश्नसंच + live बातम्यांवरून AI-निर्मित प्रश्न. बक्षीस रक्कम virtual आहे. माहिती लवकर बदलते — कृतीपूर्वी खात्री करा.",
      freshTitleQuiz: "🔥 नवीनतम AI Challenge", practiceTitleQuiz: "🎯 सराव",
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
  const PER_ROUND = 5, PASS = 4;
  const prizeOf = (lv) => (state.lang === "mr" && lv.n === 10 ? "₹1 कोटी" : lv.prize);
  const levelName = (lv) => (state.lang === "mr" ? lv.mr : lv.en);

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
    fresh: [], freshMeta: { ai: false, updatedAt: 0 },
    round: null,
  };
  const saveProgress = () => store.set("qz_progress", state.progress);
  const t = (k, ...a) => { const v = T[state.lang][k] ?? T.en[k]; return typeof v === "function" ? v(...a) : v; };
  const $ = (s) => document.querySelector(s);
  const L = (obj) => (obj && typeof obj === "object" && !Array.isArray(obj) ? obj[state.lang] ?? obj.en : obj);
  const optsOf = (q) => (Array.isArray(q.opts) ? q.opts : q.opts[state.lang] ?? q.opts.en);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const totalStars = () => Object.values(state.progress.stars).reduce((s, v) => s + v, 0);

  function show(id) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.toggle("active", s.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function applyLang() {
    document.documentElement.lang = state.lang === "mr" ? "mr" : state.lang === "hi" ? "hi-Latn" : "en";
    document.body.classList.toggle("lang-mr", state.lang === "mr");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll(".lang-switch button").forEach((b) => b.classList.toggle("active", b.dataset.lang === state.lang));
    document.querySelector('.top-nav a[href$="/quiz/"]').href = state.lang === "en" ? "/quiz/" : `/${state.lang}/quiz/`;
    renderHome();
    if (state.round && $("#quiz").classList.contains("active")) renderQuestion(true);
    if (state.round && $("#result").classList.contains("active")) renderResult();
  }

  // ---------------- home ----------------
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
    const m = state.freshMeta;
    $("#freshInfo").textContent = state.fresh.length ? t("freshSome", state.fresh.length, new Date(m.updatedAt).toLocaleDateString()) : t("freshNone");
    $("#playFresh").disabled = !state.fresh.length;
    $("#muteBtn").textContent = Sound.muted ? "🔇" : "🔊";
    $("#muteBtn").classList.toggle("off", Sound.muted);
    $("#voiceBtn").classList.toggle("off", !Sound.voiceOn);
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

  async function loadFresh() {
    try {
      const d = await (await fetch("/api/fresh")).json();
      state.fresh = (d.questions || []).map((q) => ({ ...q, level: Math.min(10, Math.max(1, q.level)) }));
      state.freshMeta = { ai: d.ai, updatedAt: d.updatedAt };
    } catch { /* offline: bank only */ }
    renderHome();
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

  // ---------------- round building ----------------
  // Shuffle options once per question (same order in every language) and track the new correct index.
  function prepare(q) {
    const order = shuffle([0, 1, 2, 3]);
    const remap = (arr) => order.map((i) => arr[i]);
    const opts = Array.isArray(q.opts) ? remap(q.opts) : Object.fromEntries(Object.entries(q.opts).map(([k, v]) => [k, remap(v)]));
    return { ...q, opts, a: order.indexOf(q.a) };
  }

  function startLevel(n) {
    const lv = LEVELS[n - 1];
    const bank = window.QUESTION_BANK.filter((q) => q.level === n);
    const fresh = shuffle(state.fresh.filter((q) => q.level === n)).slice(0, 2);
    const picked = shuffle([...fresh, ...shuffle(bank).slice(0, PER_ROUND - fresh.length)]);
    startRound({ mode: "level", level: n, time: lv.time, questions: picked });
  }
  function startFresh() {
    const qs = shuffle(state.fresh).slice(0, 10).sort((a, b) => a.level - b.level);
    startRound({ mode: "fresh", time: 35, titleKey: "freshTitleQuiz", questions: qs });
  }
  function startPractice(cat) {
    const all = [...window.QUESTION_BANK, ...state.fresh].filter((q) => q.level <= Math.min(10, state.progress.unlocked + 1));
    const pool = all.filter((q) => (cat === "situation" ? q.type === "situation" : q.cat === cat));
    const qs = shuffle(pool).slice(0, 8).sort((a, b) => a.level - b.level);
    startRound({ mode: "practice", time: 40, titleKey: "practiceTitleQuiz", cat, questions: qs });
  }

  function startRound(cfg) {
    if (!cfg.questions.length) return;
    Sound.unlock();
    state.round = {
      ...cfg, questions: cfg.questions.map(prepare), i: 0, answers: [], streak: 0,
      timer: null, remaining: cfg.time, busy: false,
      lifelines: { fifty: true, poll: true, friend: true }, gone: {}, llView: {},
    };
    show("quiz");
    Sound.play("start");
    renderQuestion();
  }

  // ---------------- quiz ----------------
  function roundTitle() {
    const r = state.round;
    if (r.mode === "level") { const lv = LEVELS[r.level - 1]; return `${t("level")} ${r.level} · ${levelName(lv)} · ${prizeOf(lv)}`; }
    return t(r.titleKey) + (r.cat ? ` · ${t("cat_" + r.cat)}` : "");
  }

  function renderQuestion(langOnly = false) {
    const r = state.round, q = r.questions[r.i];
    const answered = r.answers[r.i];
    $("#quizTitle").textContent = roundTitle();
    $("#qDots").innerHTML = r.questions.map((_, i) => `<span class="${r.answers[i] ? (r.answers[i].ok ? "ok" : "bad") : i === r.i ? "cur" : ""}"></span>`).join("");
    $("#miniLadder").innerHTML = ladderHTML({ mini: true, current: r.mode === "level" ? r.level : 0 });
    $("#qBadges").innerHTML =
      `<span class="tag lvl">${t("level")} ${q.level}</span><span class="tag ${q.cat}">${t("cat_" + q.cat)}</span>` +
      (q.type === "situation" ? `<span class="tag situation">${t("situation")}</span>` : "") +
      (q.fresh ? `<span class="tag fresh">🔥 ${t("fresh")}${q.date ? " · " + esc(q.date) : ""}</span>` : "");
    $("#qText").textContent = L(q.q);
    const gone = r.gone[r.i] || [];
    $("#options").innerHTML = optsOf(q).map((o, i) =>
      `<button class="opt ${gone.includes(i) ? "gone" : ""}" data-i="${i}"><span class="key">${"ABCD"[i]}:</span><span>${esc(o)}</span></button>`).join("");
    document.querySelectorAll(".lifeline").forEach((b) => {
      b.disabled = !r.lifelines[b.dataset.ll] || !!answered;
      b.classList.toggle("used", !r.lifelines[b.dataset.ll]);
    });
    const ml = $("#miniLadder"), cur = $("#miniLadder .current");
    if (cur) ml.scrollLeft = cur.offsetLeft - ml.clientWidth / 2 + cur.clientWidth / 2;
    renderLifelinePanel();

    if (answered) {
      paintReveal(answered.chosen);
    } else if (r.lockedIdx != null) {
      document.querySelectorAll(".opt").forEach((b, i) => { b.disabled = true; if (i === r.lockedIdx) b.classList.add("locked"); });
    } else {
      $("#feedback").classList.add("hidden");
      $("#aiExplain").classList.add("hidden");
      if (!langOnly) {
        startTimer();
        Sound.startBed(q.level);
      }
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
    $("#qDots").innerHTML = r.questions.map((_, i) => `<span class="${r.answers[i] ? (r.answers[i].ok ? "ok" : "bad") : i === r.i ? "cur" : ""}"></span>`).join("");
    const fb = $("#feedback");
    fb.classList.remove("hidden", "ok", "bad");
    fb.classList.add(ok ? "ok" : "bad");
    $("#fbTitle").textContent = ok ? t("correct") : chosen == null ? t("timeout") : t("wrong");
    $("#fbText").innerHTML = (ok ? "" : `<b>${t("rightAnswer")}</b> ${"ABCD"[q.a]}: ${esc(optsOf(q)[q.a])}<br>`) + esc(L(q.exp));
    $("#nextBtn").textContent = r.i === r.questions.length - 1 ? t("finish") : t("next");
    $("#deeperBtn").disabled = false;
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
    renderLifelinePanel(true);
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

  async function explainDeeper() {
    const r = state.round, q = r.questions[r.i];
    const box = $("#aiExplain");
    box.classList.remove("hidden");
    box.textContent = t("thinking");
    $("#deeperBtn").disabled = true;
    try {
      const res = await fetch("/api/explain", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: L(q.q), options: optsOf(q), correct: q.a, chosen: r.answers[r.i]?.chosen ?? null, lang: state.lang }),
      });
      const d = await res.json();
      box.textContent = d.text || (d.error === "no_key" ? t("noAi") : d.error || "Error");
    } catch {
      box.textContent = t("noAi");
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
    show("home"); renderHome();
  }

  // ---------------- result ----------------
  function wonAmount(r) {
    if (r.mode !== "level") return null;
    if (r.score >= PASS) return prizeOf(LEVELS[r.level - 1]);
    // Fall back to the last safe level passed, like the show.
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
    const passed = r.mode === "level" ? r.score >= PASS : r.score / r.questions.length >= 0.7;
    if (r.mode === "level") {
      const stars = r.score === 5 ? 3 : r.score === 4 ? 2 : r.score === 3 ? 1 : 0;
      const p = state.progress;
      p.stars[r.level] = Math.max(p.stars[r.level] || 0, stars);
      if (r.score >= PASS && r.level === p.unlocked && p.unlocked < 10) p.unlocked++;
      saveProgress();
    }
    show("result");
    renderResult();
    Sound.play(passed ? "levelWin" : "levelLose");
    if (passed) { confetti(); setTimeout(() => Sound.host("win", state.lang, r.level ?? ""), 900); }
    else setTimeout(() => Sound.host("lose", state.lang), 900);
    submitScore();
    window.adsRefresh?.();
  }

  function renderResult() {
    const r = state.round, total = r.questions.length, score = r.score;
    const isLevel = r.mode === "level";
    const passed = isLevel ? score >= PASS : score / total >= 0.7;
    const stars = isLevel ? (score === 5 ? 3 : score === 4 ? 2 : score === 3 ? 1 : 0) : Math.round((score / total) * 3);
    const won = wonAmount(r);
    $("#resStars").textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
    $("#resWon").textContent = won ?? "";
    document.querySelector(".won-label").classList.toggle("hidden", !won);
    $("#resWon").classList.toggle("hidden", !won);
    $("#resTitle").textContent = isLevel ? (passed ? t("passTitle") : t("failTitle")) : t("practiceDone");
    $("#resMsg").textContent = isLevel ? (passed ? t("passMsg") : t("failMsg")) : "";
    $("#resScore").textContent = `${score} / ${total}`;
    $("#nextLevelBtn").classList.toggle("hidden", !(isLevel && passed && r.level < 10));

    const url = location.origin + "/";
    const text = t("shareText", won || `${score}/${total}`, r.level ?? state.progress.unlocked);
    $("#shareWa").href = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    $("#shareLi").href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    $("#shareX").href = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    $("#review").innerHTML = r.questions.map((q, i) => {
      const a = r.answers[i], opts = optsOf(q);
      return `<div class="rv ${a.ok ? "" : "bad"}">
        <div class="q">${a.ok ? "✅" : "❌"} ${esc(L(q.q))}</div>
        <div class="a"><b>${t("rightAnswer")}</b> ${esc(opts[q.a])}${a.ok ? "" : ` · <b>${t("yourAnswer")}</b> ${a.chosen == null ? t("noAnswer") : esc(opts[a.chosen])}`}</div>
        <div class="e">${esc(L(q.exp))}</div>
      </div>`;
    }).join("");
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
  $("#playFresh").addEventListener("click", startFresh);
  $("#practiceBtn").addEventListener("click", () => {
    const cats = ["dm", "ai", "tech", "situation"];
    const cat = cats[(store.get("qz_pcat", -1) + 1) % cats.length];
    store.set("qz_pcat", cats.indexOf(cat));
    startPractice(cat);
  });
  $("#options").addEventListener("click", (e) => { const b = e.target.closest(".opt"); if (b && !b.disabled) lockAnswer(+b.dataset.i); });
  $("#lifelines").addEventListener("click", (e) => { const b = e.target.closest(".lifeline"); if (b && !b.disabled) useLifeline(b.dataset.ll); });
  $("#nextBtn").addEventListener("click", next);
  $("#deeperBtn").addEventListener("click", explainDeeper);
  $("#quitBtn").addEventListener("click", quit);
  $("#homeLink").addEventListener("click", (e) => { if (location.pathname === "/") { e.preventDefault(); quit(); } });
  $("#homeBtn").addEventListener("click", quit);
  $("#retryBtn").addEventListener("click", () => {
    const r = state.round;
    if (r.mode === "level") startLevel(r.level); else if (r.mode === "fresh") startFresh(); else startPractice(r.cat);
  });
  $("#nextLevelBtn").addEventListener("click", () => startLevel(state.round.level + 1));
  $("#muteBtn").addEventListener("click", () => { Sound.setMuted(!Sound.muted); renderHome(); });
  $("#voiceBtn").addEventListener("click", () => { Sound.setVoice(!Sound.voiceOn); renderHome(); });
  document.addEventListener("keydown", (e) => {
    if (!$("#quiz").classList.contains("active") || !state.round || e.target.tagName === "INPUT") return;
    const k = e.key.toLowerCase();
    const idx = ["1", "2", "3", "4"].indexOf(k) >= 0 ? +k - 1 : ["a", "b", "c", "d"].indexOf(k);
    if (idx >= 0 && !state.round.answers[state.round.i]) lockAnswer(idx);
    else if (e.key === "Enter" && state.round.answers[state.round.i] && document.activeElement?.id !== "deeperBtn") { e.preventDefault(); next(); }
  });

  applyLang();
  loadNews();
  loadFresh();
  loadLeaderboard();
})();
