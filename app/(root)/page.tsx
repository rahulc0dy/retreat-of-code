import { notion } from "@/lib/utils/notionClient";
import { NOTION_DATABASE_ID, NOTION_SECRET } from "@/env";
import { tryCatch } from "@/lib/utils/tryCatch";
import Link from "next/link";

export default async function Home() {
  const { data, error } = await tryCatch(
    notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      auth: NOTION_SECRET,
    })
  );

  if (error) {
    console.error(error);
  }

  return (
    <>
      <div className="px-2">
        <h1 className="mb-4 text-2xl font-bold">Available Questions</h1>
        {error ? (
          <p className="text-red-500">
            Failed to load questions. Please try again later.
          </p>
        ) : data?.results?.length ? (
          <ul className="space-y-2">
            {data.results.map((item) => {
              if ("properties" in item) {
                const nameProp = item.properties["Name"];
                if (nameProp && nameProp.type === "title") {
                  const titleField = nameProp.title;
                  if (Array.isArray(titleField) && titleField.length > 0) {
                    const text = titleField[0].plain_text;
                    return (
                      <li key={item.id}>
                        <Link
                          href={`/questions/${item.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {text}
                        </Link>
                      </li>
                    );
                  } else {
                    return (
                      <li key={item.id}>
                        <Link
                          href={`/questions/${item.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Untitled Question
                        </Link>
                      </li>
                    );
                  }
                }
              }
            })}
          </ul>
        ) : (
          <p>No questions available at this time.</p>
        )}
      </div>
    </>
  );
}
