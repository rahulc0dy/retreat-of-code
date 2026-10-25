import { getSeededPrng, getRandomChoice } from "@/generators/prng";

const DIRECTIONS = ["^", "v", ">", "<"] as const;

/**
 * Generates a sequence of directional moves (^, v, >, <).
 */
export function generateInput({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): string {
  const prng = getSeededPrng(userId, questionId);
  const totalMoves = 2000;
  let moves = "";

  for (let i = 0; i < totalMoves; i++) {
    moves += getRandomChoice(prng, DIRECTIONS);
  }

  return moves;
}

/**
 * Computes how many unique coordinates received at least one package, starting from (0, 0).
 */
export async function generateAns({
  userId,
  questionId,
}: {
  userId: string;
  questionId: string;
}): Promise<number> {
  const prng = getSeededPrng(userId, questionId);
  const totalMoves = 2000;

  const visited = new Set<string>();
  let x = 0;
  let y = 0;
  visited.add(`${x},${y}`);

  for (let i = 0; i < totalMoves; i++) {
    const dir = getRandomChoice(prng, DIRECTIONS);
    if (dir === "^") y++;
    else if (dir === "v") y--;
    else if (dir === ">") x++;
    else if (dir === "<") x--;

    visited.add(`${x},${y}`);
  }

  return visited.size;
}

