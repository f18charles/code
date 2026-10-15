export const SITE_NAME = "Hawii House";
export const SITE_TAGLINE = "Warmth, dignity, and supportive community care";
export const SITE_DESCRIPTION =
  "Hawii House is a support NGO dedicated to providing safe refuge, guidance, and community support with warmth, dignity, and care.";

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
] as const;

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
