import { z } from "zod";
import { generateInput } from "@/generators/day1";

interface GenerateInputProps {
  userId: string;
  questionId: string;
}

const generateInputPropsSchema = z.object({
  userId: z.string().uuid("Invalid User Id").nonempty(),
  questionId: z.string().uuid("Invalid Question Id").nonempty(),
});

export const getInput = async ({
  userId,
  questionId,
}: GenerateInputProps): Promise<string> => {
  const parsed = generateInputPropsSchema.safeParse({ questionId, userId });
  if (!parsed.success) throw new Error("Failed to generate input");

  const input = generateInput({
    userId: parsed.data.userId,
    questionId: parsed.data.questionId,
  });

  return input;
};
