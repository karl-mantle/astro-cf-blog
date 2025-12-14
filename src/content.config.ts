import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import slugify from "slugify";

const loadingOptions = z.object({
  leaflet: z.boolean().optional().default(false),
  turnstile: z.boolean().optional().default(false),
});

const pages = defineCollection({
  loader: glob({ base: "src/content/pages", pattern: "**/*.mdx" }),
  schema: ({ image }) =>
    z.object({
      category: z.string().default("Uncategorised"),
      description: z.string().min(15).max(160),
      draft: z.boolean().default(false),
      slug: z.string(),
      image: z
        .object({
          src: image(),
          alt: z.string().nullable().default(null),
        })
        .optional(),
      loadingOptions: loadingOptions.optional(),
      title: z.string().min(5).max(120),
    }),
});

const posts = defineCollection({
  loader: glob({ base: "src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z
      .object({
        author: z.string().optional(),
        category: z.string().default("Uncategorised"),
        description: z.string().min(15).max(160),
        draft: z.boolean().default(false),
        slug: z.string().optional(),
        image: z
          .object({
            src: image(),
            alt: z.string().nullable().default(null),
          })
          .optional(),
        imageAttribution: z
          .object({
            name: z.string().optional(),
            url: z.string().url().optional(),
          })
          .optional(),
        loadingOptions: loadingOptions.optional(),
        pubDate: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        title: z.string().min(5).max(120),
        updatedDate: z.coerce.date().optional(),
      })
      .refine((data) => {
        if (!data.slug) {
          data.slug = slugify(data.title, { lower: true });
        }
        return true;
      }),
});

const profiles = defineCollection({
  loader: glob({ base: "src/content/profiles", pattern: "**/*.yaml" }),
  schema: ({ image }) =>
    z.object({
      category: z.string().default("Uncategorised"),
      description: z.string().min(15).max(160),
      draft: z.boolean().default(false),
      image: z
        .object({
          src: image(),
          alt: z.string().nullable().default(null),
        })
        .optional(),
      pubDate: z.coerce.date(),
      role: z.string(),
      slug: z.string().optional(),
      tags: z.array(z.string()).default([]),
      title: z.string().min(5).max(120),
      updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { pages, posts, profiles };
