export const dynamic = "force-dynamic";

async function parseRSS(xml: string, source: string) {
  return xml
    .split("<item>")
    .slice(1)
    .map((item) => ({
      title: item.match(/<title>(.*?)<\/title>/)?.[1] ?? "",
      link: item.match(/<link>(.*?)<\/link>/)?.[1] ?? "",
      publishedAt: item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? "",
      source,
    }));
}

export async function GET() {
  try {
    const stjRes = await fetch(
      "https://news.google.com/rss/search?q=site:stj.jus.br&hl=pt-BR&gl=BR&ceid=BR:pt"
    );

    const stfRes = await fetch(
      "https://www.stf.jus.br/portal/rss/noticiaRss.asp"
    );

    const tstRes = await fetch(
      "https://www.tst.jus.br/rss"
    );

    const stjXML = await stjRes.text();
    const stfXML = await stfRes.text();
    const tstXML = await tstRes.text();

    const stj = await parseRSS(stjXML, "STJ");
    const stf = await parseRSS(stfXML, "STF");
    const tst = await parseRSS(tstXML, "TST");

    const news = [...stf, ...stj, ...tst]
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() -
          new Date(a.publishedAt).getTime()
      )
      .slice(0, 30);

    return Response.json(news);
  } catch (error) {
    console.error(error);
    return Response.json([]);
  }
}
