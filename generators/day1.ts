import {
  cyrb128,
  mulberry32,
  getRandomInt,
  getSeededPrng,
} from "@/generators/prng";

/**
 * generateInput
 *
 * Given userId and questionId, this function uses a seeded PRNG to generate a
 * single line of space-separated integers (at least 1000 numbers). The numbers include groups
 * of consecutive duplicates.
 */
export function generateInput({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): string {
  const random = getSeededPrng(userId, questionId);

  const totalNumbers = 1000;
  const numbers: number[] = [];

  const minValue = 0;
  const maxValue = 100;
  const minGroup = 1;
  const maxGroup = 5;

  while (numbers.length < totalNumbers) {
    const num = getRandomInt(random, minValue, maxValue);
    const groupLen = getRandomInt(random, minGroup, maxGroup);

    for (let i = 0; i < groupLen && numbers.length < totalNumbers; i++) {
      numbers.push(num);
    }
  }

  return numbers.join(" ");
}

/**
 * generateAns
 *
 * Given a userId and questionId, generate the deterministic input sequence,
 * then compute the answer by summing only the first number of each group of consecutive identical numbers.
 */
export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  const random = getSeededPrng(userId, questionId);

  const totalNumbers = 1000;
  const numbers: number[] = [];
  const minValue = 0;
  const maxValue = 100;
  const minGroup = 1;
  const maxGroup = 5;

  while (numbers.length < totalNumbers) {
    const num = getRandomInt(random, minValue, maxValue);
    const groupLen = getRandomInt(random, minGroup, maxGroup);
    for (let i = 0; i < groupLen && numbers.length < totalNumbers; i++) {
      numbers.push(num);
    }
  }

  let sum = 0;
  let prev: number | null = null;
  for (const n of numbers) {
    if (prev === null || n !== prev) {
      sum += n;
    }
    prev = n;
  }

  return sum;
}

export { cyrb128, mulberry32, getRandomInt };
