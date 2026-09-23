import { aiEnabled, getFresh, isGenerating } from "../lib/ai.js";

export async function GET() {
  const fresh = await getFresh();
  return Response.json(
    { ai: aiEnabled(), updatedAt: fresh.updatedAt, generating: isGenerating(), questions: fresh.questions },
    { headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" } }
  );
}
