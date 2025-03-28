import Link from "next/link";
import { getAllQuestionsForYear } from "@/lib/questions";

interface YearPageProps {
  params: { year: string };
}

export default async function YearPage({ params }: YearPageProps) {
  const { year } = await params;
  const questions = getAllQuestionsForYear(year);

  return (
    <main className="px-2">
      <h1 className="">Questions for {year}</h1>
      <br />
      <ul className="">
        {questions.map((q) => (
          <li key={q.day} className="mb-2">
            <Link
              href={`/questions/${year}/${q.day}`}
              className="hover:bg-overlay-2/20"
            >
              Day {q.day}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/"
        className="hover:bg-overlay-2/20 text-lavender mt-4 inline-block"
      >
        Back to Home
      </Link>
    </main>
  );
}
