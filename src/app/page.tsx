import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPublishDate, getAllArticles } from "@/lib/articles";

export default function HomePage() {
  const articles = getAllArticles();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8">
        <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          brutal honesty daily
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Hacker Articles
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Independent updates covering what happened today across tech, policy, markets, and the
          internet. Fast static pages, clean reading, and no fluff.
        </p>
      </section>

      <Separator />

      <section className="mt-8 grid gap-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`}>
            <Card className="transition-colors hover:border-foreground/40">
              <CardHeader>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {formatPublishDate(article.date)} · {article.readingMinutes} min read
                  </span>
                </div>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription className="text-sm leading-6">{article.summary}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <span className="text-sm font-medium underline underline-offset-4">Read post</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {articles.length === 0 ? (
        <p className="mt-10 rounded-lg border border-dashed p-8 text-center text-muted-foreground">
          No posts yet.
        </p>
      ) : null}
    </main>
  );
}
