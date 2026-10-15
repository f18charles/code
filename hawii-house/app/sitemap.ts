import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";
import { sanityFetch } from "@/lib/sanity/fetch";
import { albumSlugsQuery, postSlugsQuery } from "@/lib/sanity/queries";
import { mockAlbums, mockPosts } from "@/lib/mock";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const currentDate = new Date().toISOString();

  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 2. Dynamic Albums
  const sanityAlbumSlugs = await sanityFetch<string[]>({
    query: albumSlugsQuery,
    tags: ["album"],
  });
  const albumSlugs =
    sanityAlbumSlugs && sanityAlbumSlugs.length > 0
      ? sanityAlbumSlugs
      : mockAlbums.map((a) =>
          typeof a.slug === "object" ? a.slug.current : a.slug
        );

  const albumRoutes: MetadataRoute.Sitemap = albumSlugs.map((slug) => ({
    url: `${baseUrl}/gallery/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 3. Dynamic Blog Posts
  const sanityPostSlugs = await sanityFetch<string[]>({
    query: postSlugsQuery,
    tags: ["post"],
  });
  const postSlugs =
    sanityPostSlugs && sanityPostSlugs.length > 0
      ? sanityPostSlugs
      : mockPosts.map((p) =>
          typeof p.slug === "object" ? p.slug.current : p.slug
        );

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...albumRoutes, ...postRoutes];
}
