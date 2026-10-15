import React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  eyebrow?: string;
  title?: string;
  intro?: string;
  tone?: "default" | "surface" | "accent";
  narrow?: boolean;
  children: React.ReactNode;
}

export function Section({
  as: Component = "section",
  eyebrow,
  title,
  intro,
  tone = "default",
  narrow = false,
  className,
  children,
  ...props
}: SectionProps) {
  const toneClasses = {
    default: "bg-background text-foreground",
    surface: "bg-surface text-foreground",
    accent: "bg-accent text-foreground",
  };

  const hasHeader = Boolean(eyebrow || title || intro);

  return (
    <Component
      className={cn(
        "py-16 md:py-24 transition-colors",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      <Container narrow={narrow}>
        {hasHeader && (
          <div className="mb-10 md:mb-14 text-center max-w-2xl mx-auto">
            {eyebrow && (
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-brown mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {intro && (
              <p className="text-base md:text-lg text-muted leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </Component>
  );
}
