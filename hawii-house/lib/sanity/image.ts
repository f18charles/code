import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./client";

const builder =
  projectId && dataset ? imageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: unknown) {
  if (!builder || !source) {
    return null;
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return builder.image(source as any);
  } catch {
    return null;
  }
}
