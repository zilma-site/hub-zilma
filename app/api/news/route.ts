export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://news.google.com/rss/search?q=site:stj.jus.br&hl=pt-BR&gl=BR&ceid=BR:pt"
    );

    const xml = await res.text();

    const news = xml
      .split("<item>")
      .slice(1)
      .map((item) => ({
        title: item.match(/<title>(.*?)<\/title>/)?.[1] ?? "",
        link: item.match(/<link>(.*?)<\/link>/)?.[1] ?? "",
        publishedAt: item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "",
        source: "STJ",
      }))
      .slice(0, 30);

    return Response.json(news);
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
