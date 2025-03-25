import { Client } from "@notionhq/client";
import { NOTION_SECRET } from "@/env";

export const notion = new Client({ auth: NOTION_SECRET });
