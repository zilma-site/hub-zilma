export const runtime = "nodejs";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.stj.jus.br/sites/portalp/rss/noticias.xml",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          Accept: "application/rss+xml, application/xml;q=0.9",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Erro HTTP:", res.status);
      return Response.json([]);
    }

    const xml = await res.text();

    const items = xml
      .split("<item>")
      .slice(1)
      .map((item) => {
        const title =
          item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ||
          item.match(/<title>(.*?)<\/title>/)?.[1] ||
          "";

        const link =
          item.match(/<link>(.*?)<\/link>/)?.[1] || "";

        const description =
          item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] ||
          item.match(/<description>(.*?)<\/description>/)?.[1] ||
          "";

        const pubDate =
          item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || "";

        return {
          source: "STJ",
          title,
          link,
          description,
          publishedAt: pubDate,
        };
      });

    return Response.json(items.slice(0, 10));
  } catch (error) {
    console.error("Erro RSS:", error);
    return Response.json([]);
  }
}
