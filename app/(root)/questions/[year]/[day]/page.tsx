import { getQuestionData } from "@/lib/questions";
import Link from "next/link";

interface QuestionPageProps {
  params: { year: string; day: string };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { year, day } = params;
  const questionData = await getQuestionData(year, `day${day}`);

  if (!questionData) {
    return <div className="text-red px-2">Question not found.</div>;
  }

  return (
    <main className="p-4">
      <h1 className="text-lg">
        --- Day: {day} - {questionData.title || `${year} - ${day}`} ---
      </h1>
      <article
        className={"font-thin"}
        dangerouslySetInnerHTML={{ __html: questionData.contentHtml }}
      />
      <Link
        href={`/questions/${year}`}
        className="text-subtext-0 mt-4 inline-block"
      >
        Back to {year} Questions
      </Link>
    </main>
  );
}
