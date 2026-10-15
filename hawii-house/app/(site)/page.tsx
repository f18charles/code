import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { PostCard } from "@/components/blog/PostCard";
import { sanityFetch } from "@/lib/sanity/fetch";
import { homePageQuery, postsQuery } from "@/lib/sanity/queries";
import { HomePageData, Post } from "@/lib/types";
import { mockHomePage, mockPosts, mockAlbums } from "@/lib/mock";

export async function generateMetadata(): Promise<Metadata> {
  const sanityHome = await sanityFetch<HomePageData>({
    query: homePageQuery,
    tags: ["homePage"],
  });

  const seo = sanityHome?.seo;

  return {
    title: seo?.title || "Hawii House | Safe Shelter, Warm Meals & Community Care",
    description:
      seo?.description ||
      "Hawii House is a support NGO dedicated to providing safe refuge, guidance, and community support with warmth, dignity, and care.",
  };
}

export default async function HomePage() {
  const [sanityHome, sanityPosts] = await Promise.all([
    sanityFetch<HomePageData>({
      query: homePageQuery,
      tags: ["homePage"],
    }),
    sanityFetch<Post[]>({
      query: postsQuery,
      tags: ["post"],
    }),
  ]);

  const homeData = sanityHome || mockHomePage;
  const posts = sanityPosts && sanityPosts.length > 0 ? sanityPosts : mockPosts;
  const latestPosts = posts.slice(0, 3);
  const featuredAlbum = homeData.featuredAlbum || mockAlbums[0];

  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <Hero
        headline={homeData.heroHeadline}
        subheadline={homeData.heroSubheadline}
        primaryCta={homeData.primaryCta}
        secondaryCta={homeData.secondaryCta}
        image={homeData.heroImage}
      />

      {/* 2. Mission Summary */}
      <Section tone="default" narrow className="text-center">
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.08em] text-brown mb-3">
          Our Purpose
        </p>
        <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed">
          &ldquo;{homeData.missionSummary}&rdquo;
        </p>
        <div className="mt-6">
          <Link
            href="/about"
            className="text-primary font-bold text-base hover:underline underline-offset-4"
          >
            Read our founding story &rarr;
          </Link>
        </div>
      </Section>

      {/* 3. Highlights */}
      <Section
        tone="surface"
        eyebrow="What We Do"
        title="Comprehensive, Restorative Support"
        intro="From emergency shelter and hot meals to long-term career stabilization, our doors are open with programs designed for lasting recovery."
      >
        <Highlights items={homeData.highlights} />
      </Section>

      {/* 4. Featured Album Strip */}
      {featuredAlbum && (
        <Section
          tone="default"
          eyebrow="Community in Action"
          title={featuredAlbum.title}
          intro={featuredAlbum.description}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredAlbum.images?.slice(0, 3).map((photo, i) => (
              <div
                key={photo._key || i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-xs bg-background"
              >
                <Image
                  src={photo.url || ""}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/gallery" variant="secondary" size="md">
              View All Photo Albums &rarr;
            </Button>
          </div>
        </Section>
      )}

      {/* 5. Latest Posts */}
      <Section
        tone="surface"
        eyebrow="Stories & Updates"
        title="Voices from Hawii House"
        intro="Insights, community highlights, and firsthand perspectives from our team, volunteers, and neighbors."
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/blog" variant="ghost" size="md">
            Read all stories &rarr;
          </Button>
        </div>
      </Section>

      {/* 6. Call to Action Band */}
      <section className="bg-accent py-16 md:py-20 transition-colors">
        <Container narrow className="text-center">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Need support or want to make a difference?
          </h2>
          <p className="text-base md:text-lg text-foreground/90 max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you are searching for shelter, looking for community assistance, or eager to volunteer your time, we are here for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/about#contact" variant="dark" size="lg">
              Get in Touch Today
            </Button>
            <Button
              href="/faq"
              variant="secondary"
              size="lg"
              className="border-foreground text-foreground hover:bg-foreground/10"
            >
              Frequently Asked Questions
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
