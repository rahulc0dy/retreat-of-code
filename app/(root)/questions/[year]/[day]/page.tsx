import { getQuestionData } from "@/lib/questions";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { z } from "zod";
import AnswerInput from "@/components/AnswerInput";
import { auth } from "@/auth";

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

  const session = await auth();
  const userId = session?.user?.id;

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

      {userId ? (
        <>
          <Link
            href={`/api/input?userId=${userId}&questionId=${questionData.id}`}
            target={"_blank"}
            rel={"noopener noreferrer"}
            referrerPolicy={"no-referrer"}
            className={"text-mauve glow"}
          >
            Get your input
          </Link>
          <AnswerInput questionId={`${questionData.id}`} userId={userId} />
        </>
      ) : (
        <p className={"glow text-peach py-2"}>
          Please Sign In to Your Account to Submit an Answer.
        </p>
      )}

      <Link
        href={`/questions/${year}`}
        className="hover:glow text-lavender mt-4 inline-block"
      >
        Back to {year} Questions
      </Link>
    </main>
  );
}
