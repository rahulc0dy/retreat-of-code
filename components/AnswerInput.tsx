"use client";

import React, { FormEvent, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { tryCatch } from "@/lib/utils/tryCatch";
import { NEXT_PUBLIC_API_BASE_URL } from "@/env/client";

interface AnswerInputProps {
  questionId: string;
  // Assume the validation schema validates a string (the answer)
  validationSchema?: z.Schema<string>;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  questionId,
  validationSchema,
}) => {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  console.log(process.env);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Optionally validate the answer using the provided schema
    let validatedAnswer: string = answer;
    if (validationSchema) {
      const parsed = validationSchema.safeParse(answer);
      if (!parsed.success) {
        setMessage(
          "Invalid answer: " +
            JSON.stringify(parsed.error.flatten().fieldErrors)
        );
        return;
      } else {
        validatedAnswer = parsed.data;
      }
    }

    // Prepare the payload (including the questionId for context)
    const payload = { questionId, answer: validatedAnswer };

    // Use tryCatch to call your API
    const { data: resData, error: resError } = await tryCatch(
      axios.post(`${NEXT_PUBLIC_API_BASE_URL}/questions/answer`, payload)
    );

    if (resError) {
      console.error(resError);
      setMessage("Error submitting answer");
    } else {
      console.log(resData.data);
      setMessage("Answer submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-2">
      <input
        type="text"
        className="bg-crust border border-gray-300 p-2"
        placeholder="Enter your answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button type="submit" className="text-text bg-teal ml-2 p-2">
        Submit
      </button>
      {message && <div className="mt-2">{message}</div>}
    </form>
  );
};

export default AnswerInput;
