import { getQuestionData } from "@/lib/questions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface QuestionPageProps {
  params: { year: string; day: string };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { year, day } = await params;
  // Assuming your file is named like "day1.md" and day comes in as "1", prefix with "day"
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
