import React from "react";
import { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { AlbumCard } from "@/components/gallery/AlbumCard";
import { sanityFetch } from "@/lib/sanity/fetch";
import { albumsQuery } from "@/lib/sanity/queries";
import { Album } from "@/lib/types";
import { mockAlbums } from "@/lib/mock";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Explore photo albums documenting community meals, creative workshops, and daily life at Hawii House.",
};

export default async function GalleryPage() {
  const sanityAlbums = await sanityFetch<Album[]>({
    query: albumsQuery,
    tags: ["album"],
  });

  const albums = sanityAlbums && sanityAlbums.length > 0 ? sanityAlbums : mockAlbums;

  return (
    <div>
      <PageHeader
        eyebrow="Visual Moments"
        title="Community Photo Gallery"
        intro="A glimpse into the daily joy, shared meals, healing workshops, and fellowship that bring our home to life."
      />

      <section className="py-16 md:py-24 bg-background">
        <Container>
          {albums.length === 0 ? (
            <div className="text-center py-16 bg-surface rounded-2xl border border-border">
              <p className="text-lg text-muted">
                No albums currently available. Please check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {albums.map((album) => (
                <AlbumCard key={album._id} album={album} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
