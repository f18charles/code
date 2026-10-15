"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AlbumPhoto } from "@/lib/types";
import { Lightbox } from "@/components/gallery/Lightbox";

interface PhotoGridProps {
  photos: AlbumPhoto[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) {
    return (
      <div className="text-center py-12 text-muted bg-surface/50 rounded-2xl border border-border">
        No photos currently in this album.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo, index) => {
          const imageUrl =
            photo.url ||
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80";

          return (
            <button
              key={photo._key || index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Open photo ${index + 1} of ${photos.length}: ${photo.alt}`}
              className="group relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-border focus-visible:outline-3 focus-visible:outline-primary bg-background shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Image
                src={imageUrl}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-200 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          );
        })}
      </div>

      <Lightbox
        photos={photos}
        currentIndex={selectedIndex ?? 0}
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        onNavigate={(newIndex) => setSelectedIndex(newIndex)}
      />
    </>
  );
}
