import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  priority?: boolean;
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const slug =
    typeof post.slug === "object" ? post.slug.current : post.slug;
  const imageUrl =
    post.coverImage?.url ||
    "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80";
  const imageAlt = post.coverImage?.alt || post.title;

  return (
    <article className="group h-full flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-200 hover:border-primary/40 shadow-sm hover:shadow-md">
      <Link href={`/blog/${slug}`} className="flex flex-col h-full">
        {/* Cover Image: 3:2 aspect ratio */}
        <div className="relative w-full aspect-[3/2] overflow-hidden bg-background">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.02]"
          />
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 flex flex-col flex-1 justify-between space-y-4">
          <div className="space-y-2.5">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-0.5 rounded-full bg-background border border-border text-brown text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
              {post.title}
            </h3>

            {/* Date */}
            <p className="text-xs text-muted">
              {formatDate(post.publishedAt)}
            </p>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center text-sm font-bold text-primary group-hover:underline underline-offset-4">
              Read story &rarr;
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
