import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");

  return rss({
    title: "Karl's blog",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquam.",
    site: context.site ?? "https://blog.karlmantle.workers.dev/",
    trailingSlash: true,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    customData: `<language>en-GB</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `https://blog.karlmantle.workers.dev/posts/entry/${post.data.slug}`,
    })),
  });
}
