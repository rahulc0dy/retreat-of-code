import { ApiError } from "@/lib/utils/ApiError";
import { ApiResponse } from "@/lib/utils/ApiResponse";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import { generateAns } from "@/lib/generateAns";
import { answerSubmissionRequestBodySchema } from "@/lib/zod-schemas/requestSchemas";
import { submissions } from "@/db/schemas/submissions";
import { db } from "@/db";

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

  // TODO: Implement actual solution checking logic here
  const correctAnswer = await generateAns({ userId, questionId });

  if (correctAnswer === answer) {
    await db.insert(submissions).values({ answer, userId, questionId });
    return new ApiResponse({
      message: "Your answer is correct.",
      data: { answer: correctAnswer },
    });
  }

  return new ApiResponse({ message: "Your answer is incorrect.", data: {} });
});
