import { getSeededPrng, getRandomChoice } from "@/generators/prng";

const ROW_CHARS = ["F", "B"] as const;
const COL_CHARS = ["L", "R"] as const;

/**
 * Generates 800 boarding pass strings (e.g. "FBFBBFFRLR").
 */
export function generateInput({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): string {
  const prng = getSeededPrng(userId, questionId);
  const totalPasses = 800;
  const lines: string[] = [];

  for (let i = 0; i < totalPasses; i++) {
    let pass = "";
    for (let r = 0; r < 7; r++) {
      pass += getRandomChoice(prng, ROW_CHARS);
    }
    for (let c = 0; c < 3; c++) {
      pass += getRandomChoice(prng, COL_CHARS);
    }
    lines.push(pass);
  }

  return lines.join("\n");
}

/**
 * Computes the highest seat ID among all boarding passes.
 * F/L = 0, B/R = 1. Seat ID = row * 8 + col.
 */
export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  const prng = getSeededPrng(userId, questionId);
  const totalPasses = 800;
  let maxSeatId = 0;

  for (let i = 0; i < totalPasses; i++) {
    let rowBits = 0;
    for (let r = 0; r < 7; r++) {
      const char = getRandomChoice(prng, ROW_CHARS);
      rowBits = (rowBits << 1) | (char === "B" ? 1 : 0);
    }

    let colBits = 0;
    for (let c = 0; c < 3; c++) {
      const char = getRandomChoice(prng, COL_CHARS);
      colBits = (colBits << 1) | (char === "R" ? 1 : 0);
    }

    const seatId = rowBits * 8 + colBits;
    if (seatId > maxSeatId) {
      maxSeatId = seatId;
    }
  }

  return maxSeatId;
}

