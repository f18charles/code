export interface SanityImageReference {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SeoData {
  title?: string;
  description?: string;
  image?: {
    asset?: SanityImageReference | unknown;
    alt?: string;
    url?: string;
  };
}

export interface ImageWithAlt {
  asset?: SanityImageReference | unknown;
  alt: string;
  caption?: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logo?: ImageWithAlt;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: SocialLink[];
  footerNote?: string;
  defaultSeo?: SeoData;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  icon?: string;
}

export interface HomePageData {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage?: ImageWithAlt;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  missionSummary: string;
  highlights: HighlightItem[];
  featuredAlbum?: Album;
  seo?: SeoData;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo?: ImageWithAlt;
  bio?: string;
}

export interface AboutPageData {
  title: string;
  intro: string;
  body: unknown; // PortableText blocks
  values: ValueItem[];
  team?: TeamMember[];
  seo?: SeoData;
}

export interface AlbumPhoto {
  _key?: string;
  image?: SanityImageReference | unknown;
  alt: string;
  caption?: string;
  url?: string;
}

export interface Album {
  _id: string;
  title: string;
  slug: { current: string } | string;
  description?: string;
  coverImage: ImageWithAlt;
  date?: string;
  images: AlbumPhoto[];
  seo?: SeoData;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: unknown; // PortableText blocks or string
  category?: string;
  order?: number;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string } | string;
  excerpt?: string;
  coverImage?: ImageWithAlt;
  publishedAt: string;
  author?: string;
  tags?: string[];
  body: unknown; // PortableText
  seo?: SeoData;
}
