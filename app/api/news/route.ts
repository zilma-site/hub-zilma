export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://news.google.com/rss/search?q=site:stj.jus.br&hl=pt-BR&gl=BR&ceid=BR:pt"
    );

    const xml = await res.text();

    const items = xml
      .split("<item>")
      .slice(1)
      .map((item) => ({
        title: item.match(/<title>(.*?)<\/title>/)?.[1] ?? "",
        link: item.match(/<link>(.*?)<\/link>/)?.[1] ?? "",
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
