export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatDate(dateInput: string | Date | undefined | null): string {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

interface PortableTextSpan {
  _type?: string;
  text?: string;
}

interface PortableTextBlockLike {
  _type?: string;
  children?: PortableTextSpan[];
}

export function readingTime(content: unknown): string {
  let text = "";
  if (typeof content === "string") {
    text = content;
  } else if (Array.isArray(content)) {
    // PortableText blocks
    text = content
      .filter(
        (block): block is PortableTextBlockLike =>
          typeof block === "object" &&
          block !== null &&
          (block as PortableTextBlockLike)._type === "block" &&
          Array.isArray((block as PortableTextBlockLike).children)
      )
      .map((block) =>
        (block.children || [])
          .map((c) => (typeof c.text === "string" ? c.text : ""))
          .join(" ")
      )
      .join(" ");
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function groupBy<T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}
