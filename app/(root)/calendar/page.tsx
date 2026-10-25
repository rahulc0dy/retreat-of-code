import React from "react";
import Link from "next/link";
import { getAllQuestionsForYear } from "@/lib/questions";

export default function CalendarPage() {
  const year = "2025";
  const questions = getAllQuestionsForYear(year);

  return (
    <main className="max-w-7xl px-2 font-light">
      <section>
        <h1 className="glow">Calendar</h1>
        <p className="text-overlay-1 font-light">
          Advent calendar for Retreat of Code {year}.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- {year} Puzzles ---</h2>
        <ul className="space-y-1">
          {questions.map((q) => {
            const safeYear = encodeURIComponent(year);
            const safeDay = encodeURIComponent(q.day);
            return (
              <li key={q.day}>
                <Link
                  href={`/questions/${safeYear}/${safeDay}`}
                  className="text-lavender/60 hover:text-lavender"
                >
                  [Day {q.day}: {q.title}]
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
