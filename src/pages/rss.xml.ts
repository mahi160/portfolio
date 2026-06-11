import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { GLOBAL } from "../lib/variables";

export async function GET(context: APIContext) {
  const articles = await getCollection("blog");

  return rss({
    title: `${GLOBAL.username} — ${GLOBAL.blogTitle}`,
    description: GLOBAL.blogLongDescription,
    site: context.site ?? GLOBAL.rootUrl,
    items: articles
      .sort((a, b) => b.data.timestamp.getTime() - a.data.timestamp.getTime())
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.timestamp,
        link: `/blog/${entry.id}`,
        categories: entry.data.tags,
      })),
    customData: "<language>en</language>",
  });
}
