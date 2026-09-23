// Generates fresh questions from the latest news.
// GET  = Vercel Cron (daily), authorized with CRON_SECRET.
// POST = "Update now" button, throttled so the public site can't burn API credits.
import { aiEnabled, generateFresh, getFresh } from "../lib/ai.js";

const MIN_GAP_MS = 6 * 60 * 60 * 1000;

async function run() {
  if (!aiEnabled()) return Response.json({ error: "no_key" }, { status: 400 });
  const data = await generateFresh();
  return Response.json({ updatedAt: data.updatedAt, count: data.questions.length });
}

export async function GET(request) {
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return run();
}

export async function POST() {
  const { updatedAt } = await getFresh();
  if (Date.now() - updatedAt < MIN_GAP_MS) {
    return Response.json({ error: "too_soon", updatedAt }, { status: 429 });
  }
  return run();
}
