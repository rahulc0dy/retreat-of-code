import { INPUT_GENERATION_SECRET } from "@/env/server";

/**
 * cyrb128: transforms a string into a 32-bit integer seed.
 */
export function cyrb128(str: string): number {
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

/**
 * Mulberry32: simple, deterministic 32-bit PRNG returning [0, 1).
 */
export function mulberry32(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a seeded PRNG for a given userId and questionId.
 */
export function getSeededPrng(userId: string, questionId: string): () => number {
  const secret = INPUT_GENERATION_SECRET || "retreat-of-code-secret";
  const seedString = userId + questionId + secret;
  const seed = cyrb128(seedString);
  return mulberry32(seed);
}

/**
 * Returns a random integer in [min, max] using the provided PRNG.
 */
export function getRandomInt(prng: () => number, min: number, max: number): number {
  return Math.floor(prng() * (max - min + 1)) + min;
}

/**
 * Picks a random element from an array using the provided PRNG.
 */
export function getRandomChoice<T>(prng: () => number, items: readonly T[]): T {
  const idx = getRandomInt(prng, 0, items.length - 1);
  return items[idx];
}

