"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SUPPORT_EMAIL = "sahil2812@live.com";
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Brutal Articles — feedback")}`;
const UPI_ID = "evoxf1@ybl";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SUPPORT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be denied */
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-8 shrink-0"
      onClick={copy}
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

function CopyUpiButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be denied */
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-8 shrink-0"
      onClick={copy}
      aria-label={copied ? "UPI ID copied" : "Copy UPI ID"}
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </Button>
  );
}

function SupportFooterShell() {
  return (
    <Dialog>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-end p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-0 sm:p-4"
        style={{ top: "auto" }}
      >
        <footer aria-label="Support" className="pointer-events-none max-w-full">
          <DialogTrigger className="pointer-events-auto cursor-pointer rounded-full border border-border/70 bg-background/95 px-2.5 py-0.5 text-[10px] font-medium leading-none text-muted-foreground shadow-sm backdrop-blur-md transition-colors hover:border-border hover:text-foreground sm:px-3 sm:py-1 sm:text-[11px]">
            Support
          </DialogTrigger>
        </footer>
      </div>

      <DialogContent className="z-100 max-w-[min(100vw-2rem,20rem)] gap-4 rounded-xl p-4 pt-9 text-sm sm:max-w-80">
        <DialogHeader className="gap-1.5 space-y-0">
          <DialogTitle className="text-base font-semibold leading-tight">Support</DialogTitle>
          <DialogDescription className="text-xs leading-snug">
            Email for issues; UPI to support the site.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border bg-muted/30 px-3 py-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                Email
              </span>
              <CopyEmailButton />
            </div>
            <a
              href={MAILTO}
              className="mt-0.5 block break-all text-xs font-medium leading-snug text-foreground underline underline-offset-2"
            >
              {SUPPORT_EMAIL}
            </a>
          </div>
          <div className="rounded-lg border bg-muted/30 px-3 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                UPI
              </span>
              <CopyUpiButton />
            </div>
            <p className="mt-1 font-mono text-sm leading-normal text-foreground">{UPI_ID}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SupportFooter() {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return createPortal(<SupportFooterShell />, document.body);
}
