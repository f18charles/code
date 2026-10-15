import React from "react";
import { formatDate } from "@/lib/utils";

interface PostMetaProps {
  publishedAt: string;
  author?: string;
  readingTimeText?: string;
  className?: string;
}

export function PostMeta({
  publishedAt,
  author,
  readingTimeText,
  className,
}: PostMetaProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs md:text-sm text-muted ${className || ""}`}>
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      {author && (
        <>
          <span aria-hidden="true">&bull;</span>
          <span>By {author}</span>
        </>
      )}
      {readingTimeText && (
        <>
          <span aria-hidden="true">&bull;</span>
          <span>{readingTimeText}</span>
        </>
      )}
    </div>
  );
}
