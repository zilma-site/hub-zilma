export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.stj.jus.br/sites/portalp/rss/noticias.xml",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
          "Accept":
            "application/rss+xml,application/xml;q=0.9,text/xml;q=0.8",
        },
        cache: "no-store",
      }
    );

    const xml = await res.text();

    const items = xml
      .split("<item>")
      .slice(1)
      .map((item) => ({
        title: item.match(/<title>(.*?)<\/title>/)?.[1] ?? "",
        link: item.match(/<link>(.*?)<\/link>/)?.[1] ?? "",
        description:
          item.match(/<description>(.*?)<\/description>/)?.[1] ?? "",
        publishedAt:
          item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "",
        source: "STJ",
      }));

    return Response.json(items.slice(0, 10));
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
