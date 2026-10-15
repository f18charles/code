import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { PostCard } from "@/components/blog/PostCard";
import { PostMeta } from "@/components/blog/PostMeta";
import { sanityFetch } from "@/lib/sanity/fetch";
import { postsQuery } from "@/lib/sanity/queries";
import { Post } from "@/lib/types";
import { mockPosts } from "@/lib/mock";
import { readingTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog & Updates",
  description:
    "Stories of hope, recovery, community meals, and updates from the team and residents at Hawii House.",
};

export default async function BlogPage() {
  const sanityPosts = await sanityFetch<Post[]>({
    query: postsQuery,
    tags: ["post"],
  });

  const posts = sanityPosts && sanityPosts.length > 0 ? sanityPosts : mockPosts;
  const [featuredPost, ...remainingPosts] = posts;

  const featuredSlug = featuredPost
    ? typeof featuredPost.slug === "object"
      ? featuredPost.slug.current
      : featuredPost.slug
    : null;

  return (
    <div>
      <PageHeader
        eyebrow="Community Stories"
        title="Hawii House Journal"
        intro="Reflections, volunteer voices, program achievements, and stories of resilience from our supportive community."
      />

      <section className="py-16 md:py-24 bg-background">
        <Container>
          {/* Featured Post Card */}
          {featuredPost && featuredSlug && (
            <div className="mb-14">
              <article className="group rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-200 hover:border-primary/40 shadow-sm hover:shadow-md">
                <Link
                  href={`/blog/${featuredSlug}`}
                  className="grid grid-cols-1 lg:grid-cols-12 items-center"
                >
                  <div className="lg:col-span-7 relative w-full aspect-[16/10] bg-background overflow-hidden">
                    <Image
                      src={
                        featuredPost.coverImage?.url ||
                        "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
                      }
                      alt={featuredPost.coverImage?.alt || featuredPost.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block px-2.5 py-0.5 rounded-full bg-background border border-border text-brown text-xs font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {featuredPost.title}
                      </h2>

                      <PostMeta
                        publishedAt={featuredPost.publishedAt}
                        author={featuredPost.author}
                        readingTimeText={readingTime(featuredPost.body)}
                      />

                      {featuredPost.excerpt && (
                        <p className="text-base text-muted leading-relaxed line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <span className="inline-flex items-center text-sm font-bold text-primary group-hover:underline underline-offset-4">
                        Read full story &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          )}

          {/* Grid of Remaining Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
