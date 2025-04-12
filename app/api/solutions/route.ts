import { ApiError } from "@/lib/utils/ApiError";
import { ApiResponse } from "@/lib/utils/ApiResponse";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { answerSubmissionRequestBodySchema } from "@/lib/zod-schemas/requestSchemas";
import { submissions } from "@/db/schemas/submissions";
import { db } from "@/db";
import { answers, users } from "@/db/schemas";
import { and, count, eq } from "drizzle-orm";
import crypto from "crypto";
import { INPUT_GENERATION_SECRET } from "@/env/server";

export const POST = asyncHandler(async (request: Request) => {
  const body = await request.json();
  const parsedBody = answerSubmissionRequestBodySchema.safeParse(body);

  if (parsedBody.error) {
    throw new ApiError({
      message: parsedBody.error.message || "Missing required fields.",
      data: { error: parsedBody.error },
    });
  }

  const { userId, answer, questionId } = parsedBody.data;

  const correctAnswer = await db
    .select({ answer: answers.answer })
    .from(answers)
    .where(and(eq(answers.userId, userId), eq(answers.questionId, questionId)))
    .then((result) => result[0].answer);

  // Create hash of the answer with the same INPUT_GENERATION_SECRET to match with actual answer
  const answerHash = crypto
    .createHmac("sha256", INPUT_GENERATION_SECRET)
    .update(answer.toString())
    .digest("hex");

  if (correctAnswer === answerHash) {
    await db.insert(submissions).values({ answer, userId, questionId });
    const totalStars = await db
      .select({ count: count() })
      .from(submissions)
      .where(eq(submissions.userId, userId))
      .then((result) => result[0].count);
    await db
      .update(users)
      .set({ stars: totalStars })
      .where(eq(users.id, userId));
    return new ApiResponse({
      message: "Your answer is correct. You get 1 *",
      data: { answer: correctAnswer },
    });
  }

  return new ApiResponse({
    message: "Your answer is incorrect! Try again.",
    data: {},
    success: false,
    options: {
      status: 200,
    },
  });
});
