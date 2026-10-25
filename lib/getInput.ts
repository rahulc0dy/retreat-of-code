import { z } from "zod";
import { getGeneratorByQuestionId } from "@/generators";

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
  if (!parsed.success) {
    throw new Error("Failed to generate input: Invalid parameters");
  }

  const generator = getGeneratorByQuestionId(parsed.data.questionId);
  if (!generator) {
    throw new Error(
      `No generator registered for questionId: ${parsed.data.questionId}`
    );
  }

  const input = generator.generateInput({
    userId: parsed.data.userId,
    questionId: parsed.data.questionId,
  });

  return input;
};
