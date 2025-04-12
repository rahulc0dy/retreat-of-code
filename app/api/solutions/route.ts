import { ApiError } from "@/lib/utils/ApiError";
import { ApiResponse } from "@/lib/utils/ApiResponse";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { answerSubmissionRequestBodySchema } from "@/lib/zod-schemas/requestSchemas";
import { db } from "@/db";
import { submissions, users } from "@/db/schemas";
import { and, count, eq } from "drizzle-orm";
import { getAnswer } from "@/lib/getAnswer";

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

  const correctAnswer = await getAnswer({ userId, questionId });

  if (correctAnswer === answer) {
    await db
      .insert(submissions)
      .values({ userId, questionId, answer })
      .onConflictDoNothing();

    const newStars = await db
      .select({ count: count() })
      .from(submissions)
      .where(
        and(
          eq(submissions.userId, userId),
          eq(submissions.questionId, questionId)
        )
      )
      .then((result) => result[0]);

    await db
      .update(users)
      .set({ stars: newStars.count })
      .where(eq(users.id, userId));

    return new ApiResponse({
      message: "Your answer is correct. You get 1 *",
      data: { answer: correctAnswer, newStars },
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
