import React from "react";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  intro,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("py-12 md:py-16 text-center border-b border-border/60 bg-surface/40", className)}>
      <Container narrow>
        {eyebrow && (
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-brown mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
          {title}
        </h1>
        {intro && (
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {intro}
          </p>
        )}
      </Container>
    </div>
  );
}
