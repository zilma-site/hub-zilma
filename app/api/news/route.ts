import Parser from "rss-parser";

export const runtime = "nodejs";

const parser = new Parser({
  customFields: {
    item: [
      ["content:encoded", "contentEncoded"],
    ],
  },
});

export async function GET() {
  try {
    const res = await fetch(
      "https://res.stj.jus.br/hrestp-c-portalp/RSS.xml",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          "Accept": "application/rss+xml, application/xml;q=0.9",
        },
        redirect: "follow",
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("Erro HTTP:", res.status);
      return Response.json([]);
    }

    const xml = await res.text();
    const data = await parser.parseString(xml);

    const news =
      data.items?.slice(0, 10).map(item => ({
        source: "STJ",
        title: item.title ?? "",
        link: item.link ?? "",
        description:
          item.contentSnippet ??
          item.contentEncoded ??
          "",
        publishedAt: item.pubDate ?? "",
      })) ?? [];

    return Response.json(news);
  } catch (error) {
    console.error("Erro STJ RSS:", error);
    return Response.json([]);
  }
}