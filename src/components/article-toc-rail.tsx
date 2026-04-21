"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "@/lib/articles";

type ArticleTocRailProps = {
  items: TocHeading[];
};

export function ArticleTocRail({ items }: ArticleTocRailProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="On this page" className="relative w-10 select-none overflow-visible xl:w-12">
      <h2 className="sr-only">On this page</h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const indent = item.level > 2 ? (item.level - 2) * 8 : 0;

          return (
            <li key={item.id} className="relative" style={{ paddingLeft: indent }}>
              <a
                href={`#${item.id}`}
                title={item.text}
                className="group relative flex items-center py-0.5 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span
                  className={[
                    "h-px shrink-0 rounded-full transition-[width,background-color]",
                    isActive ? "w-10 bg-foreground/80" : "w-6 bg-muted-foreground/35 group-hover:w-8 group-hover:bg-muted-foreground/60",
                  ].join(" ")}
                  aria-hidden
                />
                <span
                  className={[
                    "pointer-events-none absolute left-full top-1/2 z-10 ml-3 max-w-[min(16rem,calc(100vw-24rem))] -translate-y-1/2 truncate rounded-md border border-border/60 bg-background/95 px-2.5 py-1 text-xs leading-snug text-foreground shadow-sm backdrop-blur-sm",
                    "opacity-0 transition-opacity duration-150",
                    "group-hover:opacity-100 group-focus-visible:opacity-100",
                  ].join(" ")}
                >
                  {item.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
