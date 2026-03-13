export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.rss2json.com/v1/api.json?rss_url=https://www.stj.jus.br/sites/portalp/rss/noticias.xml"
    );

    const data = await res.json();

    const news = data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      description: item.description,
      publishedAt: item.pubDate,
      source: "STJ",
    }));

    return new Response(JSON.stringify(news.slice(0, 10)), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify([]), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
