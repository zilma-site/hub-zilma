export const dynamic = "force-dynamic";

async function getNews(url: string, source: string) {
  try {
    const res = await fetch(url);
    const xml = await res.text();

    return xml
      .split("<item>")
      .slice(1)
      .map((item) => ({
        title: item.match(/<title>(.*?)<\/title>/)?.[1] ?? "",
        link: item.match(/<link>(.*?)<\/link>/)?.[1] ?? "",
        publishedAt: item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "",
        source,
      }));
  } catch {
    return [];
  }
}

export async function GET() {
  const stj = await getNews(
    "https://news.google.com/rss/search?q=site:stj.jus.br&hl=pt-BR&gl=BR&ceid=BR:pt",
    "STJ"
  );

  const stf = await getNews(
    "https://news.google.com/rss/search?q=STF+site:stf.jus.br&hl=pt-BR&gl=BR&ceid=BR:pt",
    "STF"
  );

  const news = [...stj, ...stf].slice(0, 30);

  return Response.json(news);
}
