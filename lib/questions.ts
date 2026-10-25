// lib/questions.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface QuestionData {
  year: string;
  day: string;
  content: string;
  id: string;
  title?: string;
  difficulty?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface QuestionMeta {
  day: string;
  title: string;
  id: string;
}

const questionsDirectory = path.join(process.cwd(), "questions");

/**
 * Returns an array of directory names inside the questions folder, sorted descending.
 */
export function getAllYears(): string[] {
  try {
    if (!fs.existsSync(questionsDirectory)) {
      return [];
    }
    return fs
      .readdirSync(questionsDirectory)
      .filter((name) => {
        const fullPath = path.join(questionsDirectory, name);
        return fs.statSync(fullPath).isDirectory() && /^\d{4}$/.test(name);
      })
      .sort((a, b) => Number(b) - Number(a));
  } catch (error) {
    console.error("Error reading years directories:", error);
    return [];
  }
}

/**
 * Returns an array of question metadata for a given year, sorted by day ascending.
 *
 * @param year - The year folder (e.g., "2025").
 * @returns An array of objects containing day, title, and id.
 */
export function getAllQuestionsForYear(year: string): QuestionMeta[] {
  const yearPath = path.join(questionsDirectory, year);
  if (!fs.existsSync(yearPath)) return [];

  const fileNames = fs
    .readdirSync(yearPath)
    .filter((file) => file.endsWith(".md"));

  const questions: QuestionMeta[] = fileNames.map((fileName) => {
    const fileBase = fileName.replace(/\.md$/, "");
    const fullPath = path.join(yearPath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const rawDay = data.day ? String(data.day) : fileBase.replace(/^day/, "");

    return {
      day: rawDay,
      title: data.title || `Day ${rawDay}`,
      id: data.id || "",
    };
  });

  return questions.sort((a, b) => {
    const numA = parseInt(a.day.replace(/\D/g, ""), 10) || 0;
    const numB = parseInt(b.day.replace(/\D/g, ""), 10) || 0;
    return numA - numB;
  });
}

/**
 * Reads a specific Markdown file for a given year and day,
 * parses the front matter, and returns the raw Markdown content.
 *
 * @param year - The year directory.
 * @param day - The file name with or without prefix (e.g. "1" or "day1").
 * @returns The parsed question data.
 */
export async function getQuestionData(
  year: string,
  day: string
): Promise<QuestionData | null> {
  const normalizedDay = day.startsWith("day") ? day : `day${day}`;
  const fullPath = path.join(questionsDirectory, year, `${normalizedDay}.md`);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    if (!data.id) {
      throw new Error(
        `No id present in front matter. Question: year ${year}, day ${day}`
      );
    }

    return {
      year,
      day: normalizedDay.replace(/^day/, ""),
      id: data.id,
      content,
      ...data,
    };
  } catch (error) {
    console.error(
      `Error processing question data for year ${year}, day ${day}:`,
      error
    );
    return null;
  }
}
