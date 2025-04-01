export async function POST(request: Request) {
  return new Response(await request.json());
}
