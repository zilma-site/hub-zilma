export async function GET() {
  return Response.json([
    { title: "Teste notícia", link: "https://google.com" }
  ]);
}