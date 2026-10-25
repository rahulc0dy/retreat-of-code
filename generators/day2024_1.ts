import { getSeededPrng, getRandomInt } from "@/generators/prng";

/**
 * Generates two space-separated columns of numbers.
 */
export function generateInput({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): string {
  const prng = getSeededPrng(userId, questionId);
  const totalPairs = 1000;
  const lines: string[] = [];

  for (let i = 0; i < totalPairs; i++) {
    const left = getRandomInt(prng, 10000, 99999);
    const right = getRandomInt(prng, 10000, 99999);
    lines.push(`${left}   ${right}`);
  }

  return lines.join("\n");
}

/**
 * Computes the total distance: sort both lists ascending, sum |left[i] - right[i]|.
 */
export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  const prng = getSeededPrng(userId, questionId);
  const totalPairs = 1000;

  const leftList: number[] = [];
  const rightList: number[] = [];

  for (let i = 0; i < totalPairs; i++) {
    const left = getRandomInt(prng, 10000, 99999);
    const right = getRandomInt(prng, 10000, 99999);
    leftList.push(left);
    rightList.push(right);
  }

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  let totalDistance = 0;
  for (let i = 0; i < totalPairs; i++) {
    totalDistance += Math.abs(leftList[i] - rightList[i]);
  }

  return totalDistance;
}

