"use client";

import React, { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
}

export function ShareButton({ title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (typeof window === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Failed to copy
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share or copy article link"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-surface hover:bg-surface/80 text-foreground text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-primary cursor-pointer min-h-[44px]"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-primary" />
          <span className="text-primary font-bold">Link Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 text-muted" />
          <span>Share Story</span>
        </>
      )}
    </button>
  );
}
