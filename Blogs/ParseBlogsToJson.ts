//run this script on deploy to parse all current blogs into json
import fs from "fs";
import path from "path";
import { parseMarkdown } from "obby-parser";

//combination of node and text, conditionally pick items from it to render to page
interface ParsedJsonNode{
    Id: number;
    link: string;
    title: string;
    date: string;
    type: string;
    html: string;
    LinksTo: string[];
}

const BLOGS_DIR = path.join(process.cwd(), "Blogs/Blogs")

const OUTPUT_JSON = path.join(process.cwd(), "/client/parsedBlog.json")
function getAllMarkdownFiles(dir: string): string[] {
    return fs.readdirSync(dir).filter(file => file.endsWith(".md"))
    .map(file => path.join(dir, file));
}

function main() {
  console.log(process.cwd())
  if (!fs.existsSync(BLOGS_DIR)) {
    console.error("Blogs directory not found:", BLOGS_DIR);
    process.exit(1);
  }

  const files = getAllMarkdownFiles(BLOGS_DIR);
  const result: ParsedJsonNode[] = [];

  console.log(files);

  //parse the nodes
  let Id: number = 0;
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    Id += 1
      // Split lines and extract title/date
  const lines = content.split("\n");
  const titleLine = lines[0] || "";
  const dateLine = lines[1] || "";

  // Remove "##" prefix and trim
  
  const title = titleLine.replace(/^##\s*/, "").trim();
  const date = dateLine.replace(/^##\s*/, "").trim();
    const link = `/my-blog/${Id}`;
    const type = "blog";
    const { links_set, html } = parseMarkdown(content, link);

    result.push({
      Id,
      link,
      title,
      date,
      type,
      html,
      LinksTo: Array.from(links_set),
    });

  }
  //parse the content to query



  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(result, null, 2), "utf8");
  console.log(`Parsed ${result.length} blogs to ${OUTPUT_JSON}`);
}

main();
/// for next time: i have moved the blogs directory to have its own package.json
// change the workflow to reference this one, we did this to prevent conflicts with how the client side app is setup since it needs to run
//differently than a one time script