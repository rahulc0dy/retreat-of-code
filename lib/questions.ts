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

const questionsDirectory = path.join(process.cwd(), "questions");

/**
 * Returns an array of directory names inside the questions folder.
 */
export function getAllYears(): string[] {
  try {
    if (!fs.existsSync(questionsDirectory)) {
      return [];
    }
    return fs.readdirSync(questionsDirectory).filter((name) => {
      const fullPath = path.join(questionsDirectory, name);
      return fs.statSync(fullPath).isDirectory();
    });
  } catch (error) {
    console.error("Error reading years directories:", error);
    return [];
  }
}

/**
 * Returns an array of question metadata for a given year.
 *
 * @param year - The year folder (e.g., "2025").
 * @returns An array of objects containing day and title.
 */
export function getAllQuestionsForYear(
  year: string
): { day: string; title?: string }[] {
  const yearPath = path.join(questionsDirectory, year);
  if (!fs.existsSync(yearPath)) return [];
  const fileNames = fs
    .readdirSync(yearPath)
    .filter((file) => file.endsWith(".md"));
  const questions = fileNames.map((fileName) => {
    const day = fileName.replace(/\.md$/, "");
    const fullPath = path.join(yearPath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    return {
      day: data.day || day,
      title: data.title || day,
    };
  });
  return questions;
}

/**
 * Reads a specific Markdown file for a given year and day,
 * parses the front matter, and returns the raw Markdown content.
 *
 * @param year - The year directory.
 * @param day - The file name without extension (e.g., "day1").
 * @returns The parsed question data.
 */
export async function getQuestionData(
  year: string,
  day: string
): Promise<QuestionData | null> {
  const fullPath = path.join(questionsDirectory, year, `${day}.md`);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    return {
      year,
      day,
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
