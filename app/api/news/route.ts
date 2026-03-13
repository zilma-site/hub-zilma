export const runtime = "nodejs";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.stj.jus.br/sites/portalp/rss/noticias.xml",
      { cache: "no-store" }
    );

    const data = await res.json();

    const news =
      data.items?.slice(0, 10).map((item: any) => ({
        source: "STJ",
        title: item.title,
        link: item.link,
        description: item.description,
        publishedAt: item.pubDate,
      })) ?? [];

    return Response.json(news);
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
