import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatPublishDate, getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
        ← Back to feed
      </Link>

      <header className="mt-6">
        <Badge variant="secondary">{article.category}</Badge>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{article.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{article.summary}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          {formatPublishDate(article.date)} · {article.readingMinutes} min read
          {article.author ? ` · ${article.author}` : ""}
        </p>
      </header>

      {article.coverImage ? (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-xl border">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 896px, 100vw"
          />
        </div>
      ) : null}

      <Separator className="my-8" />

      <article
        className="max-w-none space-y-4 text-base leading-7 text-foreground/90 [&_a]:underline [&_a]:underline-offset-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-semibold [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-6 [&_li]:list-disc [&_p]:mt-4"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {article.source ? (
        <p className="mt-10 text-sm text-muted-foreground">
          Source:{" "}
          <a className="underline underline-offset-4" href={article.source} target="_blank" rel="noreferrer">
            {article.source}
          </a>
        </p>
      ) : null}
    </main>
  );
}
