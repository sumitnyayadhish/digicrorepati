// Shareable images drawn on <canvas>: a square score card (WhatsApp/Instagram) and a certificate (LinkedIn).
window.ShareKit = (() => {
  const GOLD = ["#fff6c9", "#f5c542", "#b37700"];
  const font = (w, size, fam = "Cinzel, Georgia, serif") => `${w} ${size}px ${fam}`;
  const DEVA = '"Noto Sans Devanagari", "Nirmala UI", Inter, sans-serif';

  function stage(ctx, w, h) {
    const g = ctx.createRadialGradient(w / 2, h * 0.25, 20, w / 2, h * 0.4, Math.max(w, h) * 0.8);
    g.addColorStop(0, "#2a1fa8"); g.addColorStop(0.45, "#0b1260"); g.addColorStop(1, "#02041a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = "#a0b4ff";
    for (const [x, rot] of [[w * 0.15, 0.3], [w * 0.5, -0.05], [w * 0.85, -0.3]]) {
      ctx.save(); ctx.translate(x, -40); ctx.rotate(rot); ctx.fillRect(-w * 0.08, 0, w * 0.16, h * 1.2); ctx.restore();
    }
    ctx.restore();
  }
  function goldText(ctx, text, x, y, size, family) {
    const g = ctx.createLinearGradient(0, y - size, 0, y);
    g.addColorStop(0, GOLD[0]); g.addColorStop(0.55, GOLD[1]); g.addColorStop(1, GOLD[2]);
    ctx.fillStyle = g; ctx.font = font(900, size, family); ctx.fillText(text, x, y);
  }
  function emblem(ctx, cx, cy, r) {
    const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    g.addColorStop(0, GOLD[0]); g.addColorStop(0.5, GOLD[1]); g.addColorStop(1, GOLD[2]);
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fillStyle = "#070d44"; ctx.fill();
    ctx.lineWidth = r * 0.08; ctx.strokeStyle = g; ctx.stroke();
    ctx.textAlign = "center"; goldText(ctx, "₹", cx, cy + r * 0.35, r, "Georgia, serif");
  }
  const toBlob = (canvas) => new Promise((res) => canvas.toBlob(res, "image/png"));

  async function scoreCard({ name, levelLabel, amount, score, stars, lang, url, sponsor }) {
    await document.fonts?.ready;
    const c = document.createElement("canvas"); c.width = 1080; c.height = 1080;
    const ctx = c.getContext("2d"); stage(ctx, 1080, 1080);
    emblem(ctx, 540, 230, 120);
    ctx.textAlign = "center";
    goldText(ctx, "DigiCrorepati", 540, 440, 84);
    ctx.fillStyle = "#dfe4ff"; ctx.font = font(700, 36, lang === "mr" ? DEVA : "Inter, sans-serif");
    ctx.fillText(name ? `${name} · ${levelLabel}` : levelLabel, 540, 510);
    if (amount) goldText(ctx, amount, 540, 650, 120, "Cinzel, Georgia, serif");
    ctx.fillStyle = "#f5c542"; ctx.font = font(700, 72, "Inter, sans-serif");
    ctx.fillText("★".repeat(stars) + "☆".repeat(3 - stars), 540, 760);
    ctx.fillStyle = "#ffffff"; ctx.font = font(800, 48, "Inter, sans-serif"); ctx.fillText(score, 540, 840);
    ctx.fillStyle = "#aeb6e6"; ctx.font = font(600, 32, "Inter, sans-serif");
    ctx.fillText("Digital Marketing & AI Quiz · Can you beat me?", 540, 920);
    ctx.fillStyle = "#ffdf7a"; ctx.font = font(700, 34, "Inter, sans-serif"); ctx.fillText(url.replace(/^https?:\/\//, ""), 540, 980);
    if (sponsor?.name) { ctx.fillStyle = "#aeb6e6"; ctx.font = font(600, 24, "Inter, sans-serif"); ctx.fillText(`Powered by ${sponsor.name}`, 540, 1040); }
    return toBlob(c);
  }

  async function certificate({ name, level, levelName, amount, date, url, sponsor, lang }) {
    await document.fonts?.ready;
    const W = 1600, H = 1130;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d"); stage(ctx, W, H);
    // double gold frame
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, GOLD[0]); g.addColorStop(0.5, GOLD[1]); g.addColorStop(1, GOLD[2]);
    ctx.strokeStyle = g; ctx.lineWidth = 10; ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.lineWidth = 3; ctx.strokeRect(64, 64, W - 128, H - 128);
    emblem(ctx, W / 2, 200, 90);
    ctx.textAlign = "center";
    goldText(ctx, "CERTIFICATE OF ACHIEVEMENT", W / 2, 370, 64);
    ctx.fillStyle = "#cfd5ff"; ctx.font = font(500, 32, "Inter, sans-serif"); ctx.fillText("This certifies that", W / 2, 450);
    goldText(ctx, name || "DigiCrorepati Player", W / 2, 560, 92, lang === "mr" ? DEVA : "Cinzel, Georgia, serif");
    ctx.fillStyle = "#e6e9ff"; ctx.font = font(600, 36, "Inter, sans-serif");
    ctx.fillText(`has cleared Level ${level} — ${levelName} — of the`, W / 2, 650);
    ctx.fillText("DigiCrorepati Digital Marketing & AI Quiz", W / 2, 700);
    if (amount) { ctx.fillStyle = "#f5c542"; ctx.font = font(800, 40, "Inter, sans-serif"); ctx.fillText(`Prize ladder: ${amount}`, W / 2, 770); }
    ctx.fillStyle = "#aeb6e6"; ctx.font = font(500, 28, "Inter, sans-serif");
    ctx.fillText(`Date: ${date}`, W * 0.28, 930);
    ctx.fillText(url.replace(/^https?:\/\//, ""), W * 0.72, 930);
    if (sponsor?.name) { ctx.fillStyle = "#ffdf7a"; ctx.font = font(700, 30, "Inter, sans-serif"); ctx.fillText(`In association with ${sponsor.name}`, W / 2, 1010); }
    ctx.fillStyle = "#7f88c0"; ctx.font = font(400, 20, "Inter, sans-serif");
    ctx.fillText("Skill-practice certificate from a free online quiz game. Not an official or accredited qualification.", W / 2, H - 90);
    return toBlob(c);
  }

  // Share a PNG via the native share sheet (mobile) or download it (desktop).
  async function shareImage(blob, filename, text, url) {
    const file = new File([blob], filename, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], text: `${text} ${url}` }); return "shared"; } catch (e) { if (e.name === "AbortError") return "cancelled"; }
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    return "downloaded";
  }

  return { scoreCard, certificate, shareImage };
})();
