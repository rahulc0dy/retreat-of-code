import { tryCatch } from "@/lib/utils/tryCatch";
import { notion } from "@/lib/utils/notionClient";
import { NotionRenderer } from "react-notion";

const QuestionPage = async ({ params }) => {
  const { qid } = await params;
  const { data, error } = await tryCatch(
    notion.blocks.children.list({ block_id: qid })
  );

  if (error) {
    console.error(error);
    return <div>Error loading content.</div>;
  }

  console.log(data);

  return (
    <main className="p-2 font-thin">
      {<NotionRenderer blockMap={data.results} />}
    </main>
  );
};

export default QuestionPage;
