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

  error ? console.error(error) : console.log(data);

  return (
    <>
      <div className="px-2">
        <h1>
          {data &&
            data?.results.map((item) => (
              <Link href={`/questions/${item.id}`} key={item.id}>
                {item?.properties?.Name.title[0].plain_text}
              </Link>
            ))}
        </h1>
      </div>
    </>
  );
}
