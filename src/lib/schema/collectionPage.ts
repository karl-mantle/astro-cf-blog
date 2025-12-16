import type { Page } from "astro";
import type { CollectionEntry } from "astro:content";
import { cleanUrl, getCommonStructuredData } from "~/lib/schema/common";
import { collectionsConfig, generalConfig } from "~/site.config";

export function createCollectionPage(url: URL, entry: CollectionEntry<"pages">, page?: Page) {
  const { ids: commonIds, nodes: commonNodes } = getCommonStructuredData();
  const canonicalUrl = cleanUrl(url);

  const ids = {
    webpage: `${canonicalUrl}#webpage`,
    /* breadcrumb: `${canonicalUrl}#breadcrumb`, */
    itemList: `${canonicalUrl}#item-list`,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...commonNodes,

      {
        "@type": "CollectionPage",
        "@id": ids.webpage,
        inLanguage: generalConfig.language,
        url: canonicalUrl,
        name: entry.data.title,
        description: entry.data.description,
        isPartOf: { "@id": commonIds.website },
        /* breadcrumb: { "@id": ids.breadcrumb }, */
        primaryImageOfPage: { "@id": commonIds.ogImage },
        mainEntity: { "@id": ids.itemList },
      },

      // TODO
      /* {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: generalConfig.url },
          { "@type": "ListItem", position: 2, name: entry.data.title, item: canonicalUrl },
        ],
      }, */

      {
        "@type": "ItemList",
        "@id": ids.itemList,
        name: `${entry.data.title} page ${page?.currentPage}`,
        numberOfItems: page ? page.data.length : undefined,
        itemListElement: page
          ? page.data.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: cleanUrl(
                new URL(
                  `${generalConfig.url}${collectionsConfig.permalink_posts_entry}${p.data.slug}`,
                ),
              ),
              name: p.data.title,
            }))
          : undefined,
      },
    ],
  };
}

export default { createCollectionPage };
