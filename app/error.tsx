"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={"p-2"}>
      <h2 className={"text-lg"}>Something went wrong!</h2>

      <code>{error.message}</code>
      <button
        onClick={() => reset()}
        className={"text-lavender block cursor-pointer"}
      >
        Try again
      </button>
      <Link href={"/"}>Home</Link>
    </div>
  );
}
