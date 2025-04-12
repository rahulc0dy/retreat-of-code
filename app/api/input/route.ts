import { inputGeneratorRequestBodySchema } from "@/lib/zod-schemas/requestSchemas";
import { getInput } from "@/lib/getInput";
import { db } from "@/db";
import { answers } from "@/db/schemas/answers";
import { INPUT_GENERATION_SECRET } from "@/env/server";
import crypto from "crypto";
import { getAnswer } from "@/lib/getAnswer";
import { and, eq } from "drizzle-orm";

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

    // Check if answer already in the db.
    const existingAnswerEntry = await db
      .select({ answer: answers.answer })
      .from(answers)
      .where(
        and(
          eq(answers.userId, parsed.data.userId),
          eq(answers.questionId, parsed.data.questionId)
        )
      );

    if (!existingAnswerEntry || existingAnswerEntry.length < 1) {
      const answer = await getAnswer(parsed.data);
      const answerHash = crypto
        .createHmac("sha256", INPUT_GENERATION_SECRET)
        .update(answer.toString())
        .digest("hex");

      await db.insert(answers).values({
        userId: parsed.data.userId,
        questionId: parsed.data.questionId,
        answer: answerHash,
      });
    }

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
