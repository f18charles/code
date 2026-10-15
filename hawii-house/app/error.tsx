"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service if configured
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="py-24 md:py-36 text-center">
      <Container narrow>
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-brown bg-surface px-3 py-1 rounded-full border border-border">
          Something went wrong
        </span>
        <h1 className="mt-6 text-3xl md:text-5xl font-serif font-bold text-foreground">
          We encountered an unexpected error
        </h1>
        <p className="mt-4 text-base md:text-lg text-muted max-w-md mx-auto leading-relaxed">
          Don’t worry, we’ve logged the issue. You can try refreshing the page or head back to the home page.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button onClick={() => reset()} variant="primary" size="md">
            Try Again
          </Button>
          <Button href="/" variant="secondary" size="md">
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
