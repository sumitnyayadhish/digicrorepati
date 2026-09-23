// Storage: Neon Postgres when DATABASE_URL/POSTGRES_URL is set (Vercel), otherwise local JSON files (dev).
import fs from "node:fs";
import path from "node:path";

const DB_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const DATA_DIR = path.join(process.cwd(), "data");
const MAX_FRESH = 60;

let sqlPromise = null;
async function db() {
  if (!DB_URL) return null;
  if (!sqlPromise) {
    sqlPromise = (async () => {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(DB_URL);
      await sql`CREATE TABLE IF NOT EXISTS fresh_questions (id TEXT PRIMARY KEY, data JSONB NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
      await sql`CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)`;
      await sql`CREATE TABLE IF NOT EXISTS leaderboard (pid TEXT PRIMARY KEY, name TEXT NOT NULL, xp INT NOT NULL DEFAULT 0, level INT NOT NULL DEFAULT 1, stars INT NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
      return sql;
    })();
    sqlPromise.catch(() => { sqlPromise = null; });
  }
  return sqlPromise;
}

// ---------- local file fallback ----------
function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8")); } catch { return fallback; }
}
function writeJson(file, value) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(value, null, 2));
}

export const storageKind = () => (DB_URL ? "neon" : "file");

export async function getFresh() {
  const sql = await db();
  if (!sql) return readJson("fresh.json", { updatedAt: 0, questions: [] });
  const rows = await sql`SELECT data FROM fresh_questions ORDER BY created_at DESC LIMIT ${MAX_FRESH}`;
  const meta = await sql`SELECT value FROM meta WHERE key = 'fresh_updated_at'`;
  return { updatedAt: Number(meta[0]?.value || 0), questions: rows.map((r) => r.data) };
}

export async function saveFresh(newQuestions) {
  const now = Date.now();
  const sql = await db();
  if (!sql) {
    const cur = readJson("fresh.json", { updatedAt: 0, questions: [] });
    const data = { updatedAt: now, questions: [...newQuestions, ...cur.questions].slice(0, MAX_FRESH) };
    writeJson("fresh.json", data);
    return data;
  }
  for (const q of newQuestions) {
    await sql`INSERT INTO fresh_questions (id, data) VALUES (${q.id}, ${JSON.stringify(q)}::jsonb) ON CONFLICT (id) DO NOTHING`;
  }
  await sql`DELETE FROM fresh_questions WHERE id NOT IN (SELECT id FROM fresh_questions ORDER BY created_at DESC LIMIT ${MAX_FRESH})`;
  await sql`INSERT INTO meta (key, value) VALUES ('fresh_updated_at', ${String(now)}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`;
  return getFresh();
}

export async function getMeta(key) {
  const sql = await db();
  if (!sql) return readJson("meta.json", {})[key] ?? null;
  const r = await sql`SELECT value FROM meta WHERE key = ${key}`;
  return r[0]?.value ?? null;
}

export async function setMeta(key, value) {
  const sql = await db();
  if (!sql) { const m = readJson("meta.json", {}); m[key] = value; return writeJson("meta.json", m); }
  await sql`INSERT INTO meta (key, value) VALUES (${key}, ${String(value)}) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`;
}

export async function upsertScore({ pid, name, xp, level, stars }) {
  const sql = await db();
  if (!sql) {
    const board = readJson("leaderboard.json", {});
    board[pid] = { pid, name, xp, level, stars, updated_at: new Date().toISOString() };
    return writeJson("leaderboard.json", board);
  }
  await sql`INSERT INTO leaderboard (pid, name, xp, level, stars) VALUES (${pid}, ${name}, ${xp}, ${level}, ${stars})
    ON CONFLICT (pid) DO UPDATE SET name = EXCLUDED.name, xp = GREATEST(leaderboard.xp, EXCLUDED.xp),
    level = GREATEST(leaderboard.level, EXCLUDED.level), stars = GREATEST(leaderboard.stars, EXCLUDED.stars), updated_at = now()`;
}

export async function topScores(limit = 15) {
  const sql = await db();
  if (!sql) {
    return Object.values(readJson("leaderboard.json", {})).sort((a, b) => b.xp - a.xp).slice(0, limit)
      .map(({ name, xp, level, stars }) => ({ name, xp, level, stars }));
  }
  return sql`SELECT name, xp, level, stars FROM leaderboard ORDER BY xp DESC, updated_at ASC LIMIT ${limit}`;
}
