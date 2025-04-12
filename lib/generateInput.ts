import { z } from "zod";

interface GenerateInputProps {
  userId: string;
  questionId: string;
}

const generateInputPropsSchema = z.object({
  userId: z.string().uuid("Invalid User Id").nonempty(),
  questionId: z.string().uuid("Invalid Question Id").nonempty(),
});

export const generateInput = async ({
  userId,
  questionId,
}: GenerateInputProps) => {
  const parsed = generateInputPropsSchema.safeParse({ questionId, userId });
  if (!parsed.success) throw new Error("Failed to generate input");

  // TODO: Generate actual input from quid, uid and env secret

  // dummy input
  return `${userId}:${questionId}: ${Math.random().toString(36).padStart(2, "0")}`;
};
