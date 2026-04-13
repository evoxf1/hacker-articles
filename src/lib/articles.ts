import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export type ArticleMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  coverImage?: string;
  source?: string;
  author?: string;
  readingMinutes: number;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

type RawFrontmatter = {
  title?: string;
  summary?: string;
  date?: string;
  category?: string;
  coverImage?: string;
  source?: string;
  author?: string;
};

function getFileNames() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(articlesDirectory)
    .filter((file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md");
}

function getArticleMetaFromFile(fileName: string): ArticleMeta {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as RawFrontmatter;

  return {
    slug,
    title: frontmatter.title ?? slug,
    summary: frontmatter.summary ?? "No summary yet.",
    date: frontmatter.date ?? new Date().toISOString().slice(0, 10),
    category: frontmatter.category ?? "General",
    coverImage: frontmatter.coverImage,
    source: frontmatter.source,
    author: frontmatter.author,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

export function getAllArticles(): ArticleMeta[] {
  const allArticles = getFileNames().map(getArticleMetaFromFile);

  return allArticles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAllArticleSlugs(): string[] {
  return getFileNames().map((file) => file.replace(/\.md$/, ""));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as RawFrontmatter;
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: frontmatter.title ?? slug,
    summary: frontmatter.summary ?? "No summary yet.",
    date: frontmatter.date ?? new Date().toISOString().slice(0, 10),
    category: frontmatter.category ?? "General",
    coverImage: frontmatter.coverImage,
    source: frontmatter.source,
    author: frontmatter.author,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
    contentHtml,
  };
}

export function formatPublishDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
