import { z } from "zod";

export const answerSubmissionRequestBodySchema = z.object({
  answer: z.string().nonempty(),
  questionId: z
    .string()
    .uuid("Invalid question Id")
    .nonempty("Question Id empty"),
  userId: z.string().uuid("Invalid user ID").nonempty("User ID empty"),
});

export const inputGeneratorRequestBodySchema = z.object({
  questionId: z
    .string()
    .uuid("Invalid question Id")
    .nonempty("Question Id empty"),
  userId: z.string().uuid("Invalid user ID").nonempty("User ID empty"),
});
