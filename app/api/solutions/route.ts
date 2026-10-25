import { ApiError } from "@/lib/utils/ApiError";
import { ApiResponse } from "@/lib/utils/ApiResponse";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { answerSubmissionRequestBodySchema } from "@/lib/zod-schemas/requestSchemas";
import { db } from "@/db";
import { submissions, users } from "@/db/schemas";
import { eq, sql } from "drizzle-orm";
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
    const newStars = await db.transaction(async (tx) => {
      await tx
        .insert(submissions)
        .values({ userId, questionId, answer })
        .onConflictDoNothing();

      const [updatedUser] = await tx
        .update(users)
        .set({
          stars: sql`(SELECT count(*)::int FROM ${submissions} WHERE ${submissions.userId} = ${userId})`,
        })
        .where(eq(users.id, userId))
        .returning({ stars: users.stars });

      return updatedUser ? { count: updatedUser.stars } : { count: 0 };
    });

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
