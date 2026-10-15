import React from "react";
import Image, { ImageProps } from "next/image";
import { urlFor } from "@/lib/sanity/image";
import { ImageWithAlt } from "@/lib/types";

interface SanityImageProps
  extends Omit<ImageProps, "src" | "alt"> {
  image: ImageWithAlt | unknown;
  alt: string; // Alt text is strictly required
  fallbackSrc?: string;
}

export function SanityImage({
  image,
  alt,
  fallbackSrc = "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
  className,
  ...props
}: SanityImageProps) {
  let resolvedSrc: string = fallbackSrc;

  if (typeof image === "object" && image !== null) {
    const imgObj = image as { url?: string; asset?: { url?: string } };
    if (imgObj.url) {
      resolvedSrc = imgObj.url;
    } else if (imgObj.asset?.url) {
      resolvedSrc = imgObj.asset.url;
    } else {
      const builderUrl = urlFor(image)?.auto("format").fit("max").url();
      if (builderUrl) {
        resolvedSrc = builderUrl;
      }
    }
  }

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
