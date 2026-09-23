// Local dev server. Serves /public and routes /api/<name> to the same handlers Vercel runs.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "public");
const PORT = Number(process.env.PORT) || 3000;

// tiny .env loader (no dependency)
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const { aiEnabled, generateFresh, getFresh } = await import("./lib/ai.js");
const { storageKind } = await import("./lib/store.js");

const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon",
  ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".webmanifest": "application/manifest+json",
};

async function handleApi(req, res, url) {
  const name = url.pathname.slice(5).replace(/[^a-z0-9-]/gi, "");
  const file = path.join(__dirname, "api", `${name}.js`);
  if (!fs.existsSync(file)) { res.writeHead(404); return res.end("Not found"); }
  const mod = await import(pathToFileURL(file).href);
  const handler = mod[req.method];
  if (!handler) { res.writeHead(405); return res.end("Method not allowed"); }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const request = new Request(`http://localhost:${PORT}${req.url}`, {
    method: req.method, headers: req.headers, body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
  });
  const response = await handler(request);
  res.writeHead(response.status, Object.fromEntries(response.headers));
  res.end(Buffer.from(await response.arrayBuffer()));
}

function serveStatic(req, res, url) {
  let p = path.normalize(path.join(PUBLIC, decodeURIComponent(url.pathname)));
  if (!p.startsWith(PUBLIC)) { res.writeHead(403); return res.end("Forbidden"); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, "index.html");
  else if (!fs.existsSync(p) && fs.existsSync(p + ".html")) p += ".html"; // clean URLs, like Vercel
  if (!fs.existsSync(p)) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    return fs.createReadStream(path.join(PUBLIC, "404.html")).on("error", () => res.end("Not found")).pipe(res);
  }
  res.writeHead(200, { "Content-Type": MIME[path.extname(p)] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://x");
  try {
    if (url.pathname.startsWith("/api/")) return await handleApi(req, res, url);
    serveStatic(req, res, url);
  } catch (e) {
    console.error("[http]", e);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: e.message }));
  }
}).listen(PORT, () => {
  console.log(`\n  DigiCrorepati running → http://localhost:${PORT}`);
  console.log(`  Storage: ${storageKind()} · Live AI questions: ${aiEnabled() ? "ON" : "OFF (set ANTHROPIC_API_KEY in .env)"}\n`);
  // Local stand-in for the Vercel cron: refresh every 12h.
  const tick = async () => {
    if (!aiEnabled()) return;
    const { updatedAt } = await getFresh();
    if (Date.now() - updatedAt > 12 * 60 * 60 * 1000) generateFresh().catch((e) => console.warn("[ai] generation failed:", e.message));
  };
  tick();
  setInterval(tick, 60 * 60 * 1000);
});
