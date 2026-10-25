import {
  getSeededPrng,
  getRandomInt,
  getRandomChoice,
} from "@/generators/prng";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

/**
 * Generates lines in the format: "<min>-<max> <char>: <password>"
 */
export function generateInput({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): string {
  const prng = getSeededPrng(userId, questionId);
  const totalEntries = 1000;
  const lines: string[] = [];

  for (let i = 0; i < totalEntries; i++) {
    const min = getRandomInt(prng, 1, 6);
    const max = getRandomInt(prng, min, min + getRandomInt(prng, 1, 8));
    const targetChar = getRandomChoice(prng, LETTERS);

    const passLen = getRandomInt(prng, 6, 16);
    let password = "";
    for (let j = 0; j < passLen; j++) {
      password += getRandomChoice(prng, LETTERS);
    }

    lines.push(`${min}-${max} ${targetChar}: ${password}`);
  }

  return lines.join("\n");
}

/**
 * Validates how many passwords satisfy the character frequency policy.
 */
export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  const prng = getSeededPrng(userId, questionId);
  const totalEntries = 1000;
  let validCount = 0;

  for (let i = 0; i < totalEntries; i++) {
    const min = getRandomInt(prng, 1, 6);
    const max = getRandomInt(prng, min, min + getRandomInt(prng, 1, 8));
    const targetChar = getRandomChoice(prng, LETTERS);

    const passLen = getRandomInt(prng, 6, 16);
    let count = 0;
    for (let j = 0; j < passLen; j++) {
      const char = getRandomChoice(prng, LETTERS);
      if (char === targetChar) {
        count++;
      }
    }

    if (count >= min && count <= max) {
      validCount++;
    }
  }

  return validCount;
}

