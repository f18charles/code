import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PostMeta } from "@/components/blog/PostMeta";
import { ShareButton } from "@/components/blog/ShareButton";
import { PortableText } from "@/components/content/PortableText";
import { JsonLd } from "@/components/seo/JsonLd";
import { mockPosts } from "@/lib/mock";
import { readingTime } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockPosts.map((p) => {
    const slug = typeof p.slug === "object" ? p.slug.current : p.slug;
    return { slug };
  });
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = mockPosts.find((p) => {
    const currentSlug = typeof p.slug === "object" ? p.slug.current : p.slug;
    return currentSlug === slug;
  });

  if (!post) {
    return { title: "Story Not Found" };
  }

  return {
    title: `${post.title} | Hawii House Journal`,
    description: post.excerpt || `Read ${post.title} on Hawii House`,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage?.url ? [{ url: post.coverImage.url }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postIndex = mockPosts.findIndex((p) => {
    const currentSlug = typeof p.slug === "object" ? p.slug.current : p.slug;
    return currentSlug === slug;
  });

  if (postIndex === -1) {
    notFound();
  }

  const post = mockPosts[postIndex];
  const prevPost = postIndex > 0 ? mockPosts[postIndex - 1] : null;
  const nextPost = postIndex < mockPosts.length - 1 ? mockPosts[postIndex + 1] : null;

  const prevSlug = prevPost
    ? typeof prevPost.slug === "object"
      ? prevPost.slug.current
      : prevPost.slug
    : null;

  const nextSlug = nextPost
    ? typeof nextPost.slug === "object"
      ? nextPost.slug.current
      : nextPost.slug
    : null;

  // Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || "Hawii House Community",
    },
    image: post.coverImage?.url,
  };

  return (
    <article className="py-12 md:py-20 bg-background transition-colors">
      <JsonLd data={articleSchema} />

      <Container narrow>
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all stories</span>
          </Link>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 rounded-full bg-surface border border-border text-brown text-xs font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-[1.2] mb-6">
          {post.title}
        </h1>

        {/* Meta & Share Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border">
          <PostMeta
            publishedAt={post.publishedAt}
            author={post.author}
            readingTimeText={readingTime(post.body)}
          />
          <ShareButton title={post.title} />
        </div>

        {/* Cover Image */}
        {post.coverImage?.url && (
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-border shadow-xs mb-10">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
            />
          </div>
        )}

        {/* Rich Text Body */}
        <PortableText value={post.body} />

        {/* Previous / Next Post Navigation */}
        <div className="mt-16 pt-10 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
          {prevPost && prevSlug ? (
            <Link
              href={`/blog/${prevSlug}`}
              className="group p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-colors flex flex-col justify-between"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-brown flex items-center gap-1.5 mb-2">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Story
              </span>
              <span className="text-base font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost && nextSlug ? (
            <Link
              href={`/blog/${nextSlug}`}
              className="group p-5 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-colors flex flex-col justify-between sm:text-right"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-brown flex items-center gap-1.5 mb-2 sm:justify-end">
                Next Story <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-base font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </article>
  );
}
