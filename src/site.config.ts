export const generalConfig = {
  // site identity
  url: new URL("https://blog.karlmantle.workers.dev/"),
  name: "karl's blog",
  short_name: "karlsblog",
  title_separator: "-",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquam.",
  logo: {
    src: "/logo.webp",
    height: 512,
    width: 512,
  },
  ogImage: {
    src: "/opengraph.webp",
    height: 630,
    width: 1200,
  },
  // datetime
  language: "en-GB",
  date_format: "j F Y",
  copyrightYear: new Date().getFullYear(),
};

export const measurementConfig = {
  partytown: false,
  baidu_verification: "",
  bing_verificaton: "",
  facebook_verification: "",
  google_ga4_id: "",
  google_gtm_id: "",
  google_verification: "",
  fathom_id: "",
  metrical_id: "",
  pinterest_verification: "",
  umami_id: "",
  umami_source: "",
  yandex_verification: "",
};

export const collectionsConfig = {
  posts_per_page: 9,
  permalink_posts: "/posts/",
  permalink_posts_entry: "/posts/entry/",
  permalink_posts_category: "/posts/category/",
  permalink_posts_tag: "/posts/tag/",
};

export const imagesConfig = {
  full: {
    sizes: "(max-width: 640px) 480px, (max-width: 1024px) 1024px, 1920px",
    widths: [480, 1024, 1920],
  },
  half: {
    sizes: "(max-width: 640px) 480px, 960px",
    widths: [480, 960],
  },
  third: {
    sizes: "(max-width: 640px) 480px, 640px",
    widths: [480, 640],
  },
  thumbnail: {
    height: 64,
    width: 64,
  },
};

export const socialLinks = [
  {
    href: "https://www.karlmantle.com",
    icon: "material-symbols:globe-uk-sharp",
    label: "Visit my website",
    show: true,
  },
  {
    href: "https://github.com/karl-mantle/astro-cf-blog/",
    icon: "simple-icons:github",
    label: "Visit the GitHub repo",
    show: true,
  },
  {
    href: "/rss.xml",
    icon: "material-symbols:rss-feed",
    label: "Subscribe to RSS feed",
    show: true,
  },
];
