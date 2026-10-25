import { getSeededPrng, getRandomInt } from "@/generators/prng";

/**
 * Generates 1000 lines of signed frequency adjustments (+X or -X).
 */
export function generateInput({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): string {
  const prng = getSeededPrng(userId, questionId);
  const totalAdjustments = 1000;
  const lines: string[] = [];

  for (let i = 0; i < totalAdjustments; i++) {
    const val = getRandomInt(prng, -500, 500);
    const line = val >= 0 ? `+${val}` : `${val}`;
    lines.push(line);
  }

  return lines.join("\n");
}

/**
 * Computes the resulting net frequency starting at 0.
 */
export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  const prng = getSeededPrng(userId, questionId);
  const totalAdjustments = 1000;
  let frequency = 0;

  for (let i = 0; i < totalAdjustments; i++) {
    const val = getRandomInt(prng, -500, 500);
    frequency += val;
  }

  return frequency;
}

