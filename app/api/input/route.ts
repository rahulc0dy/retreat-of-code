import { inputGeneratorRequestBodySchema } from "@/lib/zod-schemas/requestSchemas";
import { getInput } from "@/lib/getInput";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const questionId = searchParams.get("questionId");

  const parsed = inputGeneratorRequestBodySchema.safeParse({
    userId,
    questionId,
  });

  if (!parsed.success) {
    return new Response("Invalid request. Could not generate input.", {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });
  }

  try {
    const input = await getInput(parsed.data);

    return new Response(input, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Server failure. Could not generate input.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });
  }
}
