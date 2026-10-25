import React from "react";
import { db } from "@/db";
import { submissions } from "@/db/schemas";
import { count, eq } from "drizzle-orm";
import { getAllQuestionsForYear } from "@/lib/questions";

export default async function StatsPage() {
  const year = "2025";
  const questions = getAllQuestionsForYear(year);

  const stats: Array<{ day: string; title: string; solvers: number }> = [];

  for (const q of questions) {
    let solvers = 0;
    try {
      if (q.id) {
        const res = await db
          .select({ total: count() })
          .from(submissions)
          .where(eq(submissions.questionId, q.id));
        solvers = res[0]?.total ?? 0;
      }
    } catch {
      solvers = 0;
    }
    stats.push({ day: q.day, title: q.title, solvers });
  }

  return (
    <main className="max-w-7xl px-2 font-light">
      <section>
        <h1 className="glow">Stats</h1>
        <p className="text-overlay-1 font-light">
          Completion statistics for Retreat of Code {year}.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- Solvers Per Day ---</h2>
        <ul className="my-2 space-y-1 font-mono text-sm">
          {stats.map((s) => (
            <li key={s.day} className="text-overlay-1">
              <span className="text-lavender">Day {s.day}</span>:{" "}
              <span className="text-yellow">{s.solvers}*</span> ({s.title})
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
