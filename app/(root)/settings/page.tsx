import React from "react";
import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schemas";
import { eq } from "drizzle-orm";
import SignInButton from "@/components/SignInButton";
import SignOutButton from "@/components/SignOutButton";

export default async function SettingsPage() {
  const session = await auth();
  const userId = session?.user?.id;

  let stars: number | string = 0;
  if (userId) {
    try {
      const data = await db
        .select({ stars: users.stars })
        .from(users)
        .where(eq(users.id, userId));
      stars = data[0]?.stars ?? 0;
    } catch {
      stars = 0;
    }
  }

  return (
    <main className="max-w-7xl px-2 font-light">
      <section>
        <h1 className="glow">Settings</h1>
        <p className="text-overlay-1 font-light">
          Manage your account profile and authentication state.
        </p>
      </section>

      {!session?.user ? (
        <section>
          <h2 className="text-text my-3 text-lg">--- Account ---</h2>
          <p className="text-overlay-1 font-light mb-3">
            You are currently not signed in.
          </p>
          <SignInButton />
        </section>
      ) : (
        <section>
          <h2 className="text-text my-3 text-lg">--- Account Details ---</h2>
          <p className="text-overlay-1 font-light">
            User: {session.user.name || "Adventurer"} ({session.user.email})
          </p>
          <p className="text-overlay-1 font-light">
            Total Stars: <span className="text-yellow">{stars}*</span>
          </p>
          <div className="mt-4">
            <SignOutButton />
          </div>
        </section>
      )}
    </main>
  );
}
