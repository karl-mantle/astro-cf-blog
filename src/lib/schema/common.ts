import { generalConfig, socialLinks } from "~/site.config";

export function cleanUrl(url: URL) {
  return url.toString().replace(/\/$/, "");
}

export function getCommonStructuredData() {
  const siteUrl = cleanUrl(generalConfig.url);

  const ids = {
    website: `${siteUrl}#website`,
    organization: `${siteUrl}#organization`,
    logo: `${siteUrl}#logo`,
    ogImage: `${siteUrl}#og-image`,
  };

  const nodes = [
    {
      "@type": "WebSite",
      "@id": ids.website,
      inLanguage: generalConfig.language,
      url: siteUrl,
      name: generalConfig.name,
      description: generalConfig.description,
      publisher: { "@id": ids.organization },
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/search?q={search_term_string}`,
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            valueRequired: true,
            valueName: "search_term_string",
          },
        },
      ],
      sameAs: socialLinks.map((s) => s.href).filter((href) => !href.endsWith(".xml")) ?? [],
    },

    {
      "@type": "Organization",
      "@id": ids.organization,
      name: generalConfig.name,
      url: siteUrl,
      logo: generalConfig.logo
        ? {
            "@type": "ImageObject",
            "@id": ids.logo,
            url: generalConfig.logo.src,
            contentUrl: generalConfig.logo.src,
            width: generalConfig.logo.width,
            height: generalConfig.logo.height,
            inLanguage: generalConfig.language,
            caption: generalConfig.name,
          }
        : undefined,
      image: {
        "@id": ids.logo,
      },
    },

    {
      "@type": "ImageObject",
      "@id": ids.ogImage,
      inLanguage: generalConfig.language,
      url: generalConfig.ogImage.src,
      contentUrl: generalConfig.ogImage.src,
      width: generalConfig.ogImage.width,
      height: generalConfig.ogImage.height,
      caption: "OpenGraph Image",
    },
  ];

  return {
    ids,
    nodes,
  };
}
