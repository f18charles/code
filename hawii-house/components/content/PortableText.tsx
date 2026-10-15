import React from "react";
import Image from "next/image";
import { PortableText as PortableTextComponent, PortableTextComponents } from "@portabletext/react";

interface PortableTextProps {
  value: unknown;
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-foreground/90 leading-[1.65] my-5">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-serif font-semibold text-foreground mt-6 mb-2 leading-snug">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-5 my-6 italic font-serif text-lg md:text-xl text-foreground/90">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-5 space-y-2 marker:text-brown text-base md:text-lg text-foreground/90">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-5 space-y-2 marker:text-brown text-base md:text-lg text-foreground/90">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const isExternal = href.startsWith("http://") || href.startsWith("https://");
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary underline decoration-1 hover:decoration-2 underline-offset-2 transition-all font-medium"
        >
          {children}
          {isExternal && (
            <span className="sr-only"> (opens in a new tab)</span>
          )}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const url = value?.url || value?.asset?.url;
      const alt = value?.alt || "";
      const caption = value?.caption;

      if (!url) return null;

      return (
        <figure className="my-8">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-xs">
            <Image
              src={url}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export function PortableText({ value, className }: PortableTextProps) {
  if (!value) return null;

  return (
    <div className={`max-w-prose mx-auto prose-container ${className || ""}`}>
      <PortableTextComponent value={value} components={components} />
    </div>
  );
}
