import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PhotoGrid } from "@/components/gallery/PhotoGrid";
import { mockAlbums } from "@/lib/mock";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar } from "lucide-react";

interface AlbumPageProps {
  params: Promise<{ album: string }>;
}

export async function generateStaticParams() {
  return mockAlbums.map((a) => {
    const slug = typeof a.slug === "object" ? a.slug.current : a.slug;
    return { album: slug };
  });
}

export async function generateMetadata({
  params,
}: AlbumPageProps): Promise<Metadata> {
  const { album: slug } = await params;
  const album = mockAlbums.find((a) => {
    const currentSlug = typeof a.slug === "object" ? a.slug.current : a.slug;
    return currentSlug === slug;
  });

  if (!album) {
    return { title: "Album Not Found" };
  }

  return {
    title: `${album.title} | Photo Gallery`,
    description: album.description || `Photos from ${album.title} at Hawii House`,
  };
}

export default async function AlbumDetailPage({ params }: AlbumPageProps) {
  const { album: slug } = await params;
  const album = mockAlbums.find((a) => {
    const currentSlug = typeof a.slug === "object" ? a.slug.current : a.slug;
    return currentSlug === slug;
  });

  if (!album) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 bg-background transition-colors">
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all albums</span>
          </Link>
        </div>

        {/* Album Header */}
        <div className="max-w-3xl mb-12">
          {album.date && (
            <div className="flex items-center gap-1.5 text-xs md:text-sm text-muted mb-3">
              <Calendar className="w-4 h-4" />
              <time dateTime={album.date}>{formatDate(album.date)}</time>
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            {album.title}
          </h1>
          {album.description && (
            <p className="text-base md:text-lg text-muted leading-relaxed">
              {album.description}
            </p>
          )}
        </div>

        {/* Photos Grid */}
        <PhotoGrid photos={album.images} />

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
          <Link
            href="/gallery"
            className="text-sm font-bold text-primary hover:underline underline-offset-4"
          >
            &larr; View other albums
          </Link>
          <Link
            href="/about#contact"
            className="text-sm font-bold text-muted hover:text-foreground"
          >
            Have photos or stories to contribute? Get in touch &rarr;
          </Link>
        </div>
      </Container>
    </div>
  );
}
