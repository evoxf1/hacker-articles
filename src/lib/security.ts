/**
 * Small, explicit checks for user-controlled-ish inputs (URLs, slugs).
 * Content still comes from your repo; this limits blast radius if something slips.
 */

const SLUG_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9_-]*$/;

export function isSafeArticleSlug(slug: string): boolean {
  if (!slug || slug.length > 200) return false;
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) return false;
  return SLUG_PATTERN.test(slug);
}

/** Cover images: same-origin paths under `/` or absolute http(s) URLs only. */
export function safeCoverImageSrc(src: string | undefined): string | undefined {
  if (!src || typeof src !== "string") return undefined;
  const trimmed = src.trim();
  if (!trimmed) return undefined;

  if (trimmed.startsWith("/")) {
    if (trimmed.startsWith("//") || trimmed.includes("..")) return undefined;
    return trimmed;
  }

  try {
    const u = new URL(trimmed);
    if (u.protocol === "http:" || u.protocol === "https:") return trimmed;
  } catch {
    return undefined;
  }
  return undefined;
}

/** External links in frontmatter (e.g. source): http(s) only. */
export function safeExternalHref(href: string | undefined): string | undefined {
  if (!href || typeof href !== "string") return undefined;
  const trimmed = href.trim();
  if (!trimmed) return undefined;

  try {
    const u = new URL(trimmed);
    if (u.protocol === "http:" || u.protocol === "https:") return u.href;
  } catch {
    return undefined;
  }
  return undefined;
}
