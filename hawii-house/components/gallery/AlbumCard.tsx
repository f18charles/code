import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Album } from "@/lib/types";
import { Images } from "lucide-react";

interface AlbumCardProps {
  album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
  const slug =
    typeof album.slug === "object" ? album.slug.current : album.slug;
  const imageUrl =
    album.coverImage?.url ||
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80";
  const imageAlt = album.coverImage?.alt || album.title;
  const photoCount = album.images?.length || 0;

  return (
    <article className="group h-full flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-200 hover:border-primary/40 shadow-sm hover:shadow-md">
      <Link href={`/gallery/${slug}`} className="flex flex-col h-full">
        {/* Cover image: 4:3 aspect ratio per DESIGN.md */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-background">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-3 right-3 bg-foreground/80 text-background text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
            <Images className="w-3.5 h-3.5" />
            <span>{photoCount} {photoCount === 1 ? "photo" : "photos"}</span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 md:p-6 flex flex-col flex-1 justify-between space-y-3">
          <div>
            <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
              {album.title}
            </h3>
            {album.description && (
              <p className="mt-2 text-sm text-muted line-clamp-2 leading-relaxed">
                {album.description}
              </p>
            )}
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center text-sm font-bold text-primary group-hover:underline underline-offset-4">
              View album &rarr;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
