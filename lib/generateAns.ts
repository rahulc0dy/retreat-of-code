import { z } from "zod";

interface GenerateAnsProps {
  userId: string;
  questionId: string;
}

const generateAnsPropsSchema = z.object({
  userId: z.string().uuid().nonempty(),
  questionId: z.string().uuid().nonempty(),
});

export async function generateAns({ userId, questionId }: GenerateAnsProps) {
  const parsedData = generateAnsPropsSchema.safeParse({ userId, questionId });

  if (parsedData.error) {
    throw new Error(parsedData.error.message);
  }

  // dummy answer
  return "1000";
}
