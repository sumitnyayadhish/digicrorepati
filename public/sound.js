// Original quiz-show style sound design, synthesized with the Web Audio API (no audio files, no licensing issues),
// plus a "host" voice using the browser's speech synthesis.
window.Sound = (() => {
  let ctx = null, master = null, bed = null;
  let muted = (() => { try { return localStorage.getItem("qz_muted") === "1"; } catch { return false; } })();
  let voiceOn = (() => { try { return localStorage.getItem("qz_voice") !== "0"; } catch { return true; } })();

  function ac() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.55;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp).connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  // One synth note with an ADSR-ish envelope.
  function note(freq, start, dur, { type = "sine", gain = 0.3, attack = 0.01, release = 0.25, detune = 0, dest } = {}) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + start;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = freq; o.detune.value = detune;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + attack);
    g.gain.setValueAtTime(gain, t + Math.max(attack, dur - release));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(dest || master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function chord(freqs, start, dur, opts) { freqs.forEach((f) => { note(f, start, dur, opts); note(f, start, dur, { ...opts, detune: 7, gain: (opts?.gain ?? 0.2) * 0.6 }); }); }

  function noise(start, dur, { from = 400, to = 4000, gain = 0.25, q = 1.2 } = {}) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + start;
    const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(); src.buffer = buf;
    const f = c.createBiquadFilter(); f.type = "bandpass"; f.Q.value = q;
    f.frequency.setValueAtTime(from, t); f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + dur * 0.3); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t); src.stop(t + dur);
  }

  // Low pulsing drone that plays while a question is on screen. Gets tenser on higher levels.
  function startBed(level = 1) {
    stopBed();
    const c = ac(); if (!c) return;
    const base = 55 * Math.pow(2, (level - 1) / 24);
    const g = c.createGain(); g.gain.value = 0.0001;
    const lfo = c.createOscillator(), lfoGain = c.createGain();
    lfo.frequency.value = 0.9 + level * 0.12; lfoGain.gain.value = 0.05;
    lfo.connect(lfoGain).connect(g.gain);
    const f = c.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 420;
    const oscs = [base, base * 1.5, base * 2.0].map((fr, i) => {
      const o = c.createOscillator(); o.type = i ? "triangle" : "sawtooth"; o.frequency.value = fr; o.connect(f); o.start(); return o;
    });
    f.connect(g).connect(master);
    g.gain.setTargetAtTime(0.07, c.currentTime, 0.8);
    lfo.start();
    bed = { g, oscs, lfo };
  }
  function stopBed() {
    if (!bed || !ctx) return;
    const { g, oscs, lfo } = bed; bed = null;
    g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.15);
    setTimeout(() => { oscs.forEach((o) => o.stop()); lfo.stop(); }, 600);
  }

  const sfx = {
    start() { noise(0, 1.2, { from: 200, to: 6000, gain: 0.18 }); chord([196, 247, 294], 0.25, 1.6, { type: "sawtooth", gain: 0.07, attack: 0.3, release: 0.8 }); chord([262, 330, 392, 523], 1.0, 1.8, { type: "triangle", gain: 0.12, attack: 0.05, release: 1 }); },
    lock() { note(98, 0, 0.9, { type: "sawtooth", gain: 0.25, release: 0.7 }); note(147, 0, 0.9, { type: "square", gain: 0.08, release: 0.7 }); noise(0, 0.5, { from: 3000, to: 300, gain: 0.12 }); },
    correct() {
      [523, 659, 784, 1047].forEach((f, i) => note(f, i * 0.09, 0.9, { type: "triangle", gain: 0.22, release: 0.6 }));
      chord([523, 659, 784], 0.36, 1.6, { type: "sine", gain: 0.12, release: 1.1 });
      noise(0.3, 1.2, { from: 6000, to: 12000, gain: 0.05, q: 0.5 });
    },
    wrong() {
      [392, 370, 349, 294].forEach((f, i) => note(f, i * 0.22, 0.5, { type: "sawtooth", gain: 0.14, release: 0.3 }));
      note(73, 0.85, 1.4, { type: "sawtooth", gain: 0.22, release: 1.1 });
      note(77.8, 0.85, 1.4, { type: "sawtooth", gain: 0.16, release: 1.1 });
    },
    timeout() { [880, 880, 880].forEach((f, i) => note(f, i * 0.25, 0.15, { type: "square", gain: 0.08 })); sfx.wrong(); },
    tick() { note(1400, 0, 0.05, { type: "square", gain: 0.05, release: 0.03 }); },
    lifeline() { noise(0, 0.7, { from: 300, to: 5000, gain: 0.2 }); note(660, 0.3, 0.4, { type: "sine", gain: 0.12 }); note(990, 0.4, 0.5, { type: "sine", gain: 0.1 }); },
    levelWin() {
      const seq = [[392, 494, 587], [440, 554, 659], [523, 659, 784, 1047]];
      seq.forEach((c, i) => chord(c, i * 0.35, i === 2 ? 2.2 : 0.4, { type: "sawtooth", gain: 0.08, release: i === 2 ? 1.5 : 0.2 }));
      [1047, 1319, 1568, 2093].forEach((f, i) => note(f, 0.7 + i * 0.08, 1.4, { type: "triangle", gain: 0.1, release: 1 }));
      noise(0.7, 2, { from: 5000, to: 12000, gain: 0.06, q: 0.4 });
    },
    levelLose() { chord([220, 262, 311], 0, 1.8, { type: "sawtooth", gain: 0.07, attack: 0.1, release: 1.3 }); note(55, 0.2, 2, { type: "sine", gain: 0.3, release: 1.5 }); },
    click() { note(1200, 0, 0.06, { type: "sine", gain: 0.06, release: 0.04 }); },
  };

  // ---------------- host voice ----------------
  const LINES = {
    en: { correct: ["Correct answer!", "Absolutely right!", "Brilliant! That's the right answer!"], wrong: ["Oh no… that's the wrong answer.", "Sorry, that's not correct."], timeout: ["Time is up!"], lock: ["Locked in!"], win: (n) => `Congratulations! You have cleared level ${n}!`, lose: "Well played! Try again and climb higher.", lifeline: "Lifeline used!" },
    hi: { correct: ["Sahi jawab!", "Bilkul sahi jawab!", "Kya baat hai! Sahi jawab!"], wrong: ["Oh ho… galat jawab.", "Afsos, yeh jawab galat hai."], timeout: ["Time khatam!"], lock: ["Lock kiya jaaye!"], win: (n) => `Badhai ho! Aapne level ${n} paar kar liya!`, lose: "Achha khele! Phir se koshish kariye.", lifeline: "Lifeline use ho gayi!" },
    mr: { correct: ["बरोबर उत्तर!", "अगदी बरोबर उत्तर!", "व्वा! बरोबर उत्तर!"], wrong: ["अरेरे… चुकीचे उत्तर.", "माफ करा, हे उत्तर चुकीचे आहे."], timeout: ["वेळ संपली!"], lock: ["उत्तर लॉक केले!"], win: (n) => `अभिनंदन! तुम्ही level ${n} पार केला!`, lose: "छान खेळलात! पुन्हा प्रयत्न करा.", lifeline: "Lifeline वापरली!" },
  };
  // Hinglish is Hindi written in Roman letters — an Indian-English voice reads it most naturally.
  const VOICE_LANGS = { en: ["en-IN", "en-GB", "en-US", "en"], hi: ["en-IN", "hi-IN", "en"], mr: ["mr-IN", "hi-IN", "en-IN"] };

  function pickVoice(lang) {
    const voices = window.speechSynthesis?.getVoices() || [];
    for (const code of VOICE_LANGS[lang] || VOICE_LANGS.en) {
      const v = voices.find((x) => x.lang?.toLowerCase().startsWith(code.toLowerCase()));
      if (v) return v;
    }
    return null;
  }

  function say(text, lang = "en", { rate = 0.98, pitch = 0.9 } = {}) {
    if (muted || !voiceOn || !window.speechSynthesis || !text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(lang);
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = VOICE_LANGS[lang]?.[0] || "en-IN";
    u.rate = rate; u.pitch = pitch;
    speechSynthesis.speak(u);
  }
  function host(kind, lang, arg) {
    const L = LINES[lang] || LINES.en;
    const v = L[kind];
    const text = typeof v === "function" ? v(arg) : Array.isArray(v) ? v[Math.floor(Math.random() * v.length)] : v;
    say(text, lang);
  }
  if (window.speechSynthesis) speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();

  return {
    play(name) { if (!muted && sfx[name]) try { sfx[name](); } catch {} },
    startBed(level) { if (!muted) try { startBed(level); } catch {} },
    stopBed,
    host, say,
    unlock() { ac(); },
    get muted() { return muted; },
    get voiceOn() { return voiceOn; },
    setMuted(m) {
      muted = m;
      try { localStorage.setItem("qz_muted", m ? "1" : "0"); } catch {}
      if (master) master.gain.value = m ? 0 : 0.55;
      if (m) { stopBed(); window.speechSynthesis?.cancel(); }
    },
    setVoice(on) { voiceOn = on; try { localStorage.setItem("qz_voice", on ? "1" : "0"); } catch {} if (!on) window.speechSynthesis?.cancel(); },
  };
})();
