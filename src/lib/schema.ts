import type { Page } from "astro";
import type { CollectionEntry, DataEntryMap } from "astro:content";
import { createWebpage } from "~/lib/schema/webpage";
import { createCollectionPage } from "~/lib/schema/collectionPage";
import { createSearchResultPage } from "~/lib/schema/searchResultsPage";
import { createArticle } from "~/lib/schema/article";

export function createSchema(
  type: string,
  url: URL,
  entry: DataEntryMap[keyof DataEntryMap][string],
  page?: Page,
) {
  let schema;
  switch (type) {
    case "webpage":
      schema = createWebpage(url, entry as CollectionEntry<"pages">);
      break;
    case "collectionPage":
      schema = createCollectionPage(url, entry as CollectionEntry<"pages">, page);
      break;
    case "searchResultsPage":
      schema = createSearchResultPage(url);
      break;
    case "article":
      schema = createArticle(url, entry as CollectionEntry<"posts">);
      break;
    default:
      break;
  }
  return schema;
}

export default { createSchema };
