import { signIn } from "@/auth";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="text-lavender/60 hover:text-lavender cursor-pointer"
      >
        [Signin]
      </button>
    </form>
  );
}
