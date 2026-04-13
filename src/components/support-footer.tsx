const SUPPORT_EMAIL = "sahil2812@live.com";
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Brutal Articles — feedback")}`;

export function SupportFooter() {
  return (
    <footer
      className="pointer-events-none fixed bottom-3 right-3 z-40 sm:bottom-4 sm:right-4"
      aria-label="Support"
    >
      <a
        href={MAILTO}
        title="Email if something doesn’t seem appropriate"
        className="pointer-events-auto inline-block max-w-[calc(100vw-1.5rem)] text-right text-[10px] leading-snug text-muted-foreground/90 transition-colors hover:text-foreground sm:text-xs"
      >
        <span className="font-medium">Support</span>
        <span className="mx-1 opacity-40" aria-hidden>
          ·
        </span>
        <span className="break-all underline decoration-transparent underline-offset-2 hover:decoration-foreground/40">
          {SUPPORT_EMAIL}
        </span>
      </a>
    </footer>
  );
}
