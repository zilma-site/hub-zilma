export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.allorigins.win/raw?url=https://www.stj.jus.br/sites/portalp/rss/noticias.xml",
      {
        cache: "no-store",
      }
    );

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
          title,
          link,
          description,
          publishedAt: pubDate,
          source: "STJ",
        };
      });

    return Response.json(items.slice(0, 10));
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
