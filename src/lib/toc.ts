import type { MarkdownHeading } from "astro";

interface tocHeading extends MarkdownHeading {
  subheadings: tocHeading[];
}

export const getTableOfContents = (headings: MarkdownHeading[]): tocHeading[] => {
  const toc: tocHeading[] = [];
  const parentHeadings = new Map<number, tocHeading>();

  headings.forEach((h) => {
    const heading: tocHeading = { ...h, subheadings: [] };
    parentHeadings.set(heading.depth, heading);

    if (heading.depth === 2) {
      toc.push(heading);
    } else {
      const parent = parentHeadings.get(heading.depth - 1);
      if (parent) {
        parent.subheadings.push(heading);
      } else {
        toc.push(heading);
      }
    }
  });

  return toc;
};
