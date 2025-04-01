export async function POST(request: Request) {
  const { body } = request;
  return new Response(body);
}
