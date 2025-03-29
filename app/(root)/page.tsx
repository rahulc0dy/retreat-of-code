import Link from "next/link";
import { getAllYears } from "@/lib/questions";

export default function HomePage() {
  let years: string[] = [];
  try {
    years = getAllYears();
  } catch (error) {
    console.error("Failed to load years:", error);
  }

  return (
    <main className="px-2">
      <ul className="">
        {years.map((year) => (
          <li key={year} className="block">
            <Link href={`/questions/${year}`} className="hover:bg-overlay-2/20">
              {year}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
