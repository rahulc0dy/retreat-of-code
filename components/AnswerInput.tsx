"use client";

import React, { FormEvent, useState } from "react";
import axios from "axios";
import { tryCatch } from "@/lib/utils/tryCatch";
import { NEXT_PUBLIC_API_BASE_URL } from "@/env/client";
import { answerSubmissionRequestBodySchema } from "@/lib/zod-schemas/requestSchemas";

interface AnswerInputProps {
  questionId: string;
  userId: string;
}

const AnswerInput: React.FC<AnswerInputProps> = ({ questionId, userId }) => {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = answerSubmissionRequestBodySchema.safeParse({
      answer,
      questionId,
      userId,
    });
    if (!parsed.success) {
      setMessage(parsed.error.message);
      return;
    }

    // Prepare the payload (including the questionId for context)
    const payload = parsed.data;

    // Use tryCatch to call your API
    const { data: resData, error: resError } = await tryCatch(
      axios.post(`${NEXT_PUBLIC_API_BASE_URL}/solutions`, payload)
    );

    if (resError) {
      console.error(resError);
      setMessage(resError.message || "Error submitting answer");
    } else {
      console.log(resData.data);
      setMessage(resData.data.message);
      if (resData.data.success)
        setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-1"
      aria-label="Answer submission form"
    >
      <label htmlFor="answer-input" className="sr-only">
        Enter your answer
      </label>
      <input
        type="text"
        id="answer-input"
        className="bg-crust border-overlay-0 min-w-1/3 border border-r-0 p-2"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        aria-required="true"
      />
      <button
        type="submit"
        className="text-text bg-surface-1 border-overlay-0 hover:bg-surface-2 cursor-pointer border p-2"
      >
        Submit
      </button>

      {message && (
        <div className="text-lavender mt-2" role="status" aria-live="polite">
          {message}
        </div>
      )}
    </form>
  );
};

export default AnswerInput;
