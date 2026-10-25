import { z } from "zod";
import { getGeneratorByQuestionId } from "@/generators";

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

  const generator = getGeneratorByQuestionId(parsedData.data.questionId);
  if (!generator) {
    throw new Error(
      `No generator registered for questionId: ${parsedData.data.questionId}`
    );
  }

  const answer = await generator.generateAns(parsedData.data);

  return answer.toString();
}
