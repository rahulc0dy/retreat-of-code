import { ApiError } from "@/lib/utils/ApiError";
import { ApiResponse } from "@/lib/utils/ApiResponse";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const POST = asyncHandler(async (request: Request) => {
  const body = await request.json();

  if (!body.answer || !body.questionId) {
    throw new ApiError({ message: "Missing required fields.", data: {} });
  }

  // TODO: Implement actual solution checking logic here

  return new ApiResponse({ message: "Success", data: body });
});
