import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="Brutal Articles, home"
          className="group flex items-baseline gap-2.5 border-l-[3px] border-[#8B0000] pl-3.5 transition-colors hover:border-[#a31212] dark:border-[#b91c1c] dark:hover:border-[#dc2626]"
        >
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-sm">
            Brutal
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">Articles</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
