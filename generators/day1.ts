// Helper: simple hash function that transforms a string into a 32-bit integer seed.
import { INPUT_GENERATION_SECRET } from "@/env/server";

function cyrb128(str: string): number {
  let h1 = 1779033703,
    h2 = 3144134277,
    h3 = 1013904242,
    h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  return (h1 ^ h2 ^ h3 ^ h4) >>> 0;
}

// A simple seeded PRNG: Mulberry32
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Returns a random integer in [min, max] using the provided PRNG
function getRandomInt(prng: () => number, min: number, max: number): number {
  return Math.floor(prng() * (max - min + 1)) + min;
}

/**
 * generateInput
 *
 * Given userId, questionId, and a secret, this function uses a seeded PRNG to generate a
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
  // Create a unique seed from the inputs.
  const seedString = userId + questionId + INPUT_GENERATION_SECRET;
  const seed = cyrb128(seedString);
  const random = mulberry32(seed);

  const totalNumbers = 1000; // minimum count required
  const numbers: number[] = [];

  // Choose a range for our random numbers, e.g. 0 to 100.
  const minValue = 0;
  const maxValue = 100;
  // Decide on group sizes (for consecutive identical numbers)
  const minGroup = 1;
  const maxGroup = 5;

  while (numbers.length < totalNumbers) {
    const num = getRandomInt(random, minValue, maxValue);
    // Determine how many times to repeat the same number consecutively.
    // This is randomly determined between minGroup and maxGroup.
    const groupLen = getRandomInt(random, minGroup, maxGroup);

    // Make sure we don’t exceed the totalNumbers count.
    for (let i = 0; i < groupLen && numbers.length < totalNumbers; i++) {
      numbers.push(num);
    }
  }

  // Return the numbers as a single line string.
  return numbers.join(" ");
}

/**
 * generateAns
 *
 * Given a userId and questionId, generate a deterministic input sequence using a seeded PRNG
 * with a secret (INPUT_GENERATION_SECRET), then compute the answer by summing only the first
 * number of each group of consecutive identical numbers.
 *
 * With the same userId, questionId, and secret, this function always returns the same answer.
 */

export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  // Combine the userId, questionId, and secret to create a seed string
  const seedString = userId + questionId + INPUT_GENERATION_SECRET;

  // Generate the seed and PRNG function.
  const seed = cyrb128(seedString);
  const random = mulberry32(seed);

  // Generate an array of at least 1000 numbers.
  // We'll generate groups of consecutive numbers to later use our rule.
  const totalNumbers = 1000;
  const numbers: number[] = [];
  // Define a range for random numbers (e.g. 0 to 100)
  const minValue = 0;
  const maxValue = 100;
  // Define group lengths (e.g. each number can be repeated between 1 and 5 times)
  const minGroup = 1;
  const maxGroup = 5;

  while (numbers.length < totalNumbers) {
    const num = getRandomInt(random, minValue, maxValue);
    const groupLen = getRandomInt(random, minGroup, maxGroup);
    for (let i = 0; i < groupLen && numbers.length < totalNumbers; i++) {
      numbers.push(num);
    }
  }

  // Compute the answer:
  // For each group of consecutive identical numbers, only add the first occurrence.
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
