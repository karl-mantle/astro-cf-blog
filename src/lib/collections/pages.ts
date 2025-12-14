import { getCollection } from "astro:content";
import slugify from "slugify";

type Terms = {
  count?: number;
  label: string;
  slug: string;
  type?: string;
};

export const getPages = async (max?: number) => {
  return (await getCollection("pages")).filter((entry) => !entry.data.draft).slice(0, max);
};

export const getPagesByCategory = async (category: string, max?: number) => {
  return (await getPages(max))
    .filter((entry) => entry.data.category.includes(category))
    .slice(0, max);
};

export const getPagesCategories = async (): Promise<Terms[]> => {
  const pages = await getPages();
  const categories = new Set(pages.map((entry) => entry.data.category));

  const categoriesArray = Array.from(categories).map((category) => ({
    label: category,
    slug: slugify(category, { lower: true }),
    type: "category",
  }));

  return categoriesArray.sort((a, b) => a.label.localeCompare(b.label));
};
