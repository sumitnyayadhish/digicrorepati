// Career/course counselling lead capture (opt-in, with consent) — leads can be sold/shared with partner institutes.
// GET /api/lead?key=ADMIN_KEY returns a CSV export for the site owner.
import { addLead, listLeads } from "../lib/store.js";

const clean = (s, n) => String(s ?? "").replace(/[<>\r\n]/g, " ").trim().slice(0, n);

export async function POST(request) {
  const b = await request.json();
  const name = clean(b.name, 60);
  const phone = clean(b.phone, 20).replace(/[^\d+]/g, "");
  if (!name || phone.replace(/\D/g, "").length < 10 || b.consent !== true) {
    return Response.json({ error: "name, a valid phone number and consent are required" }, { status: 400 });
  }
  await addLead({
    name, phone, city: clean(b.city, 40), interest: clean(b.interest, 60),
    level: Math.max(1, Math.min(10, Number(b.level) || 1)), lang: clean(b.lang, 5), consent: true,
  });
  return Response.json({ ok: true });
}

export async function GET(request) {
  const key = process.env.ADMIN_KEY;
  if (!key || new URL(request.url).searchParams.get("key") !== key) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  const rows = await listLeads();
  const cols = ["created_at", "name", "phone", "city", "interest", "level", "lang", "consent"];
  const csv = [cols.join(","), ...rows.map((r) => cols.map((c) => `"${String(r[c] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
  return new Response(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=leads.csv" } });
}
