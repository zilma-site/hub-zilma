export const runtime = "nodejs";

async function parseRSS(url: string, source: string) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/rss+xml, application/xml",
      },
      next: { revalidate: 600 },
    });

    if (!res.ok) return [];

    const xml = await res.text();

    const items = xml
      .split("<item>")
      .slice(1)
      .map((item) => {
        const title = item.match(/<title>(.*?)<\/title>/)?.[1] ?? "";
        const link = item.match(/<link>(.*?)<\/link>/)?.[1] ?? "";
        const pubDate = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "";
        const description =
          item.match(/<description>(.*?)<\/description>/)?.[1] ?? "";

        return {
          source,
          title,
          link,
          description,
          publishedAt: pubDate,
        };
      });

    return items;
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const stf = await parseRSS(
      "https://www.stf.jus.br/portal/rss/noticiaRss.asp",
      "STF"
    );

    const stj = await parseRSS(
      "https://www.stj.jus.br/sites/portalp/rss/noticias.xml",
      "STJ"
    );

    const news = [...stf, ...stj]
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 20);

    return Response.json(news);
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
