import { z } from "zod";
import { generateAns } from "@/generators/day1";

interface GenerateAnsProps {
  userId: string;
  questionId: string;
}

const generateAnsPropsSchema = z.object({
  userId: z.string().uuid().nonempty(),
  questionId: z.string().uuid().nonempty(),
});

export async function getAnswer({
  userId,
  questionId,
}: GenerateAnsProps): Promise<string> {
  const parsedData = generateAnsPropsSchema.safeParse({ userId, questionId });

  if (parsedData.error) {
    throw new Error(parsedData.error.message);
  }

  const answer = await generateAns(parsedData.data);

  return answer.toString();
}
