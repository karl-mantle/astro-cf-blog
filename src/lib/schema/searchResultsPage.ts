import { generalConfig } from "~/site.config";
import { cleanUrl, getCommonStructuredData } from "~/lib/schema/common";

export function createSearchResultPage(url: URL) {
  const { ids: commonIds, nodes: commonNodes } = getCommonStructuredData();
  const canonicalUrl = cleanUrl(url);

  const webpageId = `${canonicalUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...commonNodes,

      {
        "@type": "SearchResultsPage",
        "@id": webpageId,
        inLanguage: generalConfig.language,
        url: canonicalUrl,
        name: "Search results",
        isPartOf: { "@id": commonIds.website },
        primaryImageOfPage: { "@id": commonIds.ogImage },
        about: { "@id": commonIds.website },
      },
    ],
  };
}

export default { createSearchResultPage };
