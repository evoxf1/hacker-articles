import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import readingTime from "reading-time";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import { remark } from "remark";

import { isSafeArticleSlug, safeCoverImageSrc, safeExternalHref } from "@/lib/security";

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

function listArticleMarkdownFiles(): string[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  return fs.readdirSync(articlesDirectory).filter((file) => {
    if (!file.endsWith(".md") || file.toLowerCase() === "readme.md") {
      return false;
    }
    const slug = file.replace(/\.md$/, "");
    return isSafeArticleSlug(slug);
  });
}

function articleMetaFromFrontmatter(
  slug: string,
  frontmatter: RawFrontmatter,
  content: string,
): ArticleMeta {
  return {
    slug,
    title: frontmatter.title ?? slug,
    summary: frontmatter.summary ?? "No summary yet.",
    date: frontmatter.date ?? new Date().toISOString().slice(0, 10),
    category: frontmatter.category ?? "General",
    coverImage: safeCoverImageSrc(frontmatter.coverImage),
    source: safeExternalHref(frontmatter.source),
    author: frontmatter.author?.trim() || undefined,
    readingMinutes: Math.max(1, Math.ceil(readingTime(content).minutes)),
  };
}

async function markdownToSanitizedHtml(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

function getArticleMetaFromFile(fileName: string): ArticleMeta {
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(articlesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as RawFrontmatter;

  return articleMetaFromFrontmatter(slug, frontmatter, content);
}

export function getAllArticles(): ArticleMeta[] {
  const allArticles = listArticleMarkdownFiles().map(getArticleMetaFromFile);

  return allArticles.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAllArticleSlugs(): string[] {
  return listArticleMarkdownFiles().map((file) => file.replace(/\.md$/, ""));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isSafeArticleSlug(slug)) {
    return null;
  }

  const fullPath = path.join(articlesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as RawFrontmatter;
  const contentHtml = await markdownToSanitizedHtml(content);

  return {
    ...articleMetaFromFrontmatter(slug, frontmatter, content),
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
