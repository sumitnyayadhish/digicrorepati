// Storage: Neon Postgres when DATABASE_URL/POSTGRES_URL is set (Vercel), otherwise local JSON files (dev).
import fs from "node:fs";
import path from "node:path";

const DB_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;
// Vercel's filesystem is read-only except /tmp (ephemeral) — only used until a database is connected.
const DATA_DIR = process.env.VERCEL ? "/tmp/digicrorepati" : path.join(process.cwd(), "data");

let sqlPromise = null;
async function db() {
  if (!DB_URL) return null;
  if (!sqlPromise) {
    sqlPromise = (async () => {
      const { neon } = await import("@neondatabase/serverless");
      const sql = neon(DB_URL);
      await sql`CREATE TABLE IF NOT EXISTS leaderboard (pid TEXT PRIMARY KEY, name TEXT NOT NULL, xp INT NOT NULL DEFAULT 0, level INT NOT NULL DEFAULT 1, stars INT NOT NULL DEFAULT 0, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
      await sql`CREATE TABLE IF NOT EXISTS leads (id SERIAL PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, city TEXT, interest TEXT, level INT, lang TEXT, consent BOOLEAN NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`;
      return sql;
    })();
    sqlPromise.catch(() => { sqlPromise = null; });
  }
  return sqlPromise;
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), "utf8")); } catch { return fallback; }
}
function writeJson(file, value) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(value, null, 2));
}

export const storageKind = () => (DB_URL ? "neon" : "file");

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

export async function addLead(lead) {
  const sql = await db();
  if (!sql) {
    const leads = readJson("leads.json", []);
    leads.push({ ...lead, created_at: new Date().toISOString() });
    return writeJson("leads.json", leads);
  }
  await sql`INSERT INTO leads (name, phone, city, interest, level, lang, consent)
    VALUES (${lead.name}, ${lead.phone}, ${lead.city}, ${lead.interest}, ${lead.level}, ${lead.lang}, ${lead.consent})`;
}

export async function listLeads(limit = 500) {
  const sql = await db();
  if (!sql) return readJson("leads.json", []).slice(-limit).reverse();
  return sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT ${limit}`;
}
