import { topScores, upsertScore } from "../lib/store.js";

export async function GET() {
  return Response.json({ items: await topScores(15) }, { headers: { "Cache-Control": "s-maxage=30" } });
}

export async function POST(request) {
  const b = await request.json();
  const pid = String(b.pid || "").slice(0, 40);
  const name = String(b.name || "").replace(/[<>]/g, "").trim().slice(0, 24);
  const xp = Math.max(0, Math.min(1_000_000, Math.floor(Number(b.xp) || 0)));
  const level = Math.max(1, Math.min(10, Math.floor(Number(b.level) || 1)));
  const stars = Math.max(0, Math.min(30, Math.floor(Number(b.stars) || 0)));
  if (!pid || !name) return Response.json({ error: "pid and name required" }, { status: 400 });
  await upsertScore({ pid, name, xp, level, stars });
  return Response.json({ ok: true });
}
