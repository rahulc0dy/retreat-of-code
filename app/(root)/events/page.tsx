import React from "react";
import Link from "next/link";
import { getAllYears } from "@/lib/questions";

const EventsPage: React.FunctionComponent = () => {
  const years = getAllYears();

  return (
    <main className="max-w-7xl px-2 font-light">
      <section>
        <h1 className="glow">Events</h1>
        <p className="text-overlay-1 font-light">
          Retreat of Code challenges are released each year. You can visit any past
          event to solve problems at your own pace.
        </p>
      </section>

      <section>
        <h2 className="text-text my-3 text-lg">--- Past Events ---</h2>
        <ul className="space-y-1">
          {years.map((year) => {
            const safeYear = encodeURIComponent(year);
            return (
              <li key={year}>
                <Link
                  href={`/questions/${safeYear}`}
                  className="text-lavender/60 hover:text-lavender"
                >
                  [{year}]
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default EventsPage;
