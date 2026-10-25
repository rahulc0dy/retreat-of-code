import { getSeededPrng, getRandomInt } from "@/generators/prng";

/**
 * Generates lines of dimensions lxwxh for gift boxes.
 */
export function generateInput({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): string {
  const prng = getSeededPrng(userId, questionId);
  const totalBoxes = 500;
  const lines: string[] = [];

  for (let i = 0; i < totalBoxes; i++) {
    const l = getRandomInt(prng, 1, 50);
    const w = getRandomInt(prng, 1, 50);
    const h = getRandomInt(prng, 1, 50);
    lines.push(`${l}x${w}x${h}`);
  }

  return lines.join("\n");
}

/**
 * Computes the total square feet of wrapping paper needed.
 * Surface area: 2*l*w + 2*w*h + 2*h*l plus smallest side area: min(l*w, w*h, h*l).
 */
export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  const prng = getSeededPrng(userId, questionId);
  const totalBoxes = 500;
  let totalPaper = 0;

  for (let i = 0; i < totalBoxes; i++) {
    const l = getRandomInt(prng, 1, 50);
    const w = getRandomInt(prng, 1, 50);
    const h = getRandomInt(prng, 1, 50);

    const side1 = l * w;
    const side2 = w * h;
    const side3 = h * l;

    const surfaceArea = 2 * side1 + 2 * side2 + 2 * side3;
    const slack = Math.min(side1, side2, side3);

    totalPaper += surfaceArea + slack;
  }

  return totalPaper;
}

