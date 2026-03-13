export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch(
      "https://www.stj.jus.br/sites/portalp/rss/noticias.xml"
    );

    const xml = await res.text();

    return new Response(xml.slice(0, 2000), {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    return Response.json({
      erro: String(error),
    });
  }
}
