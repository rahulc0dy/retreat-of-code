import { getQuestionData } from "@/lib/questions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { z } from "zod";

interface QuestionPageProps {
  params: Promise<{ year: string; day: string }>;
}

const QuestionParamsSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, { message: "Year must be a 4-digit string" }),
  day: z.string().regex(/^\d+$/, { message: "Day must be a positive integer" }),
});

export default async function QuestionPage({ params }: QuestionPageProps) {
  const parsed = QuestionParamsSchema.safeParse(await params);
  if (!parsed.success) {
    return (
      <div>
        Invalid parameters:{" "}
        {parsed.error.flatten().fieldErrors.day?.[0] ||
          parsed.error.flatten().fieldErrors.year?.[0]}
      </div>
    );
  }

  const { year, day } = parsed.data;
  const questionData = await getQuestionData(year, `day${day}`);

  if (!questionData) {
    return <div className="p-4 text-red-500">Question not found.</div>;
  }

  return (
    <main className="p-2">
      <h1 className="mb-4">
        --- Day: {day} - {questionData.title || `${year} - day${day}`} ---
      </h1>
      <article className="max-w-prose font-thin">
        <ReactMarkdown>{questionData.content}</ReactMarkdown>
      </article>
      <Link
        href={`/questions/${year}`}
        className="hover:glow mt-4 inline-block"
      >
        Back to {year} Questions
      </Link>
    </main>
  );
}
