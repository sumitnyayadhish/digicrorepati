import { aiEnabled, explain } from "../lib/ai.js";

export async function POST(request) {
  if (!aiEnabled()) return Response.json({ error: "no_key" }, { status: 400 });
  const body = await request.json();
  const text = await explain(body);
  return Response.json({ text });
}
