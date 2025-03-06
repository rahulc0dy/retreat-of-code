import React from "react";
import { signOut } from "@/auth";

const SignOutButton = ({ className }: { className?: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className={`text-lavender/60 hover:text-lavender cursor-pointer ${className}`}
      >
        [SignOut]
      </button>
    </form>
  );
};
export default SignOutButton;
