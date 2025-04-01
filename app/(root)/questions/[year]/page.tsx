import Link from "next/link";
import { getAllQuestionsForYear } from "@/lib/questions";
import { z } from "zod";

interface YearPageProps {
  params: Promise<{ year: string }>;
}

// Define a schema to validate the parameters.
const YearSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Year must be a 4-digit string" }),
});

export default async function YearPage({ params }: YearPageProps) {
  const parsed = YearSchema.safeParse(await params);
  if (!parsed.success) {
    return (
      <div className="text-red px-2">
        Invalid year: {parsed.error.flatten().fieldErrors.year?.[0]}
      </div>
    );
  }

  const { year } = parsed.data;
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
