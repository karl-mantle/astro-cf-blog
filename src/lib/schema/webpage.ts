import type { CollectionEntry } from "astro:content";
import { generalConfig } from "~/site.config";
import { cleanUrl, getCommonStructuredData } from "~/lib/schema/common";

export function createWebpage(url: URL, entry: CollectionEntry<"pages">) {
  const { ids: commonIds, nodes: commonNodes } = getCommonStructuredData();
  const canonicalUrl = cleanUrl(url);

  const ids = {
    webpage: `${canonicalUrl}#webpage`,
    /* breadcrumb: `${canonicalUrl}#breadcrumb`, */
    primaryImage: `${canonicalUrl}#primary-image`,
  };

  const pageImage = entry.data.image
    ? {
        "@type": "ImageObject",
        "@id": ids.primaryImage,
        inLanguage: generalConfig.language,
        url: entry.data.image.src.src,
        contentUrl: entry.data.image.src.src,
        caption: entry.data.image.alt,
        width: entry.data.image.src.width,
        height: entry.data.image.src.height,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...commonNodes,

      {
        "@type": "WebPage",
        "@id": ids.webpage,
        inLanguage: generalConfig.language,
        url: canonicalUrl,
        name: entry.data.title,
        description: entry.data.description,
        isPartOf: { "@id": commonIds.website },
        /* breadcrumb: { "@id": ids.breadcrumb }, */
        primaryImageOfPage: pageImage ? { "@id": ids.primaryImage } : { "@id": commonIds.ogImage },
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

      ...(pageImage ? [pageImage] : []),
    ],
  };
}

export default { createWebpage };
