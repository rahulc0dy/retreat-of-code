import * as day1 from "./day1";
import * as day2 from "./day2";
import * as day3 from "./day3";
import * as day4 from "./day4";
import * as day5 from "./day5";
import * as day6 from "./day6";
import * as day2024_1 from "./day2024_1";

export interface QuestionGenerator {
  questionId: string;
  year: string;
  day: number;
  generateInput: (params: { userId: string; questionId: string }) => string;
  generateAns: (params: {
    userId: string;
    questionId: string;
  }) => Promise<number | string> | number | string;
}

export const QUESTION_GENERATORS: Record<string, QuestionGenerator> = {
  // 2025 Day 1
  "3fc951ca-d226-4d07-a6c4-4541feaaf3d3": {
    questionId: "3fc951ca-d226-4d07-a6c4-4541feaaf3d3",
    year: "2025",
    day: 1,
    generateInput: day1.generateInput,
    generateAns: day1.generateAns,
  },
  // 2025 Day 2
  "7d3c8e41-2b69-4f81-9b7e-e14589d3c52a": {
    questionId: "7d3c8e41-2b69-4f81-9b7e-e14589d3c52a",
    year: "2025",
    day: 2,
    generateInput: day2.generateInput,
    generateAns: day2.generateAns,
  },
  // 2025 Day 3
  "b9a1d642-4f8e-4731-bc63-5e28a9b1c74f": {
    questionId: "b9a1d642-4f8e-4731-bc63-5e28a9b1c74f",
    year: "2025",
    day: 3,
    generateInput: day3.generateInput,
    generateAns: day3.generateAns,
  },
  // 2025 Day 4
  "e2c8a735-9f14-46d2-8b43-7f31a5c68b92": {
    questionId: "e2c8a735-9f14-46d2-8b43-7f31a5c68b92",
    year: "2025",
    day: 4,
    generateInput: day4.generateInput,
    generateAns: day4.generateAns,
  },
  // 2025 Day 5
  "4f7b9c28-3e51-49a6-8d12-6a8b4c7e2f93": {
    questionId: "4f7b9c28-3e51-49a6-8d12-6a8b4c7e2f93",
    year: "2025",
    day: 5,
    generateInput: day5.generateInput,
    generateAns: day5.generateAns,
  },
  // 2025 Day 6
  "d1e8c4b7-6a3f-4295-8e71-9c3b5a8d2e64": {
    questionId: "d1e8c4b7-6a3f-4295-8e71-9c3b5a8d2e64",
    year: "2025",
    day: 6,
    generateInput: day6.generateInput,
    generateAns: day6.generateAns,
  },
  // 2024 Day 1
  "f0a3e8b1-5d9c-4826-a147-38e2b9c71d54": {
    questionId: "f0a3e8b1-5d9c-4826-a147-38e2b9c71d54",
    year: "2024",
    day: 1,
    generateInput: day2024_1.generateInput,
    generateAns: day2024_1.generateAns,
  },
};

export function getGeneratorByQuestionId(
  questionId: string
): QuestionGenerator | undefined {
  return QUESTION_GENERATORS[questionId];
}

