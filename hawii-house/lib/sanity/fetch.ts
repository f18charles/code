import { client, projectId } from "./client";
import type { QueryParams } from "next-sanity";

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T | null> {
  // If no projectId is configured in environment, return null gracefully
  if (
    !projectId ||
    projectId === "placeholder-id" ||
    projectId === "placeholder-project-id" ||
    projectId === "your-project-id"
  ) {
    return null;
  }

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: tags.length ? false : revalidate,
        tags,
      },
    });
  } catch (error) {
    console.warn("Sanity fetch failed, falling back to local defaults:", error);
    return null;
  }
}
