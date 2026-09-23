import { getNews } from "../lib/news.js";

export async function GET() {
  const items = (await getNews()).slice(0, 16);
  return Response.json({ items }, { headers: { "Cache-Control": "s-maxage=1800, stale-while-revalidate=3600" } });
}
