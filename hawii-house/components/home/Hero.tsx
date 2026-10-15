import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { CtaLink, ImageWithAlt } from "@/lib/types";

interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  image?: ImageWithAlt;
  eyebrow?: string;
}

export function Hero({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  image,
  eyebrow = "Welcome to Hawii House",
}: HeroProps) {
  const imageUrl =
    image?.url ||
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80";
  const imageAlt =
    image?.alt || "Supportive hands holding together in unity and warmth";

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background transition-colors overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-brown bg-surface px-3 py-1 rounded-full border border-border">
              {eyebrow}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold text-foreground leading-[1.1] tracking-tight">
              {headline}
            </h1>

            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-xl">
              {subheadline}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 w-full sm:w-auto">
              <Button href={primaryCta.href} variant="primary" size="lg" className="w-full sm:w-auto">
                {primaryCta.label}
              </Button>
              <Button href={secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
                {secondaryCta.label}
              </Button>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] lg:aspect-[3/2] rounded-2xl overflow-hidden shadow-md border border-border">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
