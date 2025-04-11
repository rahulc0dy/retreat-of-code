import { ApiResponse } from "@/lib/utils/ApiResponse";

export const asyncHandler = (handler: (req: Request) => Promise<Response>) => {
  return async (req: Request): Promise<Response> => {
    try {
      return await handler(req);
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Internal server error";
      // Return a new ApiResponse instance with error options.
      return new ApiResponse({
        success: false,
        message: errorMessage,
        data: {},
        options: {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      });
    }
  };
};
