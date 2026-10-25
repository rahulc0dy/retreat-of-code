import React from "react";
import { db } from "@/db";
import { users } from "@/db/schemas";
import { desc, gt } from "drizzle-orm";

export default async function LeaderboardPage() {
  let topUsers: Array<{
    id: string;
    name: string | null;
    stars: number;
  }> = [];

  try {
    topUsers = await db
      .select({
        id: users.id,
        name: users.name,
        stars: users.stars,
      })
      .from(users)
      .where(gt(users.stars, 0))
      .orderBy(desc(users.stars))
      .limit(100);
  } catch {
    topUsers = [];
  }

  return (
    <main className="max-w-7xl px-2 font-light">
      <section>
        <h1 className="glow">Leaderboard</h1>
        <p className="text-overlay-1 font-light">
          Global scores and star rankings for Retreat of Code.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- Top Solvers ---</h2>
        {topUsers.length === 0 ? (
          <p className="text-overlay-1 font-light">
            No solvers on the leaderboard yet.
          </p>
        ) : (
          <ol className="my-2 space-y-1 font-mono text-sm">
            {topUsers.map((user, index) => (
              <li key={user.id} className="text-overlay-1">
                <span className="text-text">{index + 1})</span>{" "}
                <span className="text-yellow">{user.stars}*</span>{" "}
                <span className="text-lavender">
                  {user.name || "Anonymous"}
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- How It Works ---</h2>
        <p className="text-overlay-1 font-light">
          Each puzzle you solve grants 1 star. Solve more puzzles to climb the leaderboard.
        </p>
      </section>
    </main>
  );
}
