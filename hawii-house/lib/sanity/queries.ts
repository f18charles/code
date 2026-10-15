import { groq } from "next-sanity";

export const settingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    logo {
      asset-> {
        _id,
        url
      },
      alt
    },
    contactEmail,
    contactPhone,
    address,
    socialLinks,
    footerNote,
    defaultSeo {
      title,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeadline,
    heroSubheadline,
    heroImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    primaryCta,
    secondaryCta,
    missionSummary,
    highlights,
    featuredAlbum-> {
      _id,
      title,
      slug,
      description,
      date,
      coverImage {
        asset-> {
          _id,
          url
        },
        alt
      },
      images[] {
        _key,
        asset-> {
          _id,
          url
        },
        alt,
        caption
      }
    },
    seo {
      title,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    title,
    intro,
    body,
    values,
    team[] {
      name,
      role,
      bio,
      photo {
        asset-> {
          _id,
          url
        },
        alt
      }
    },
    seo {
      title,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`;

export const albumsQuery = groq`
  *[_type == "album"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    date,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    "imagesCount": count(images),
    images[] {
      _key,
      asset-> {
        _id,
        url
      },
      alt,
      caption
    }
  }
`;

export const albumBySlugQuery = groq`
  *[_type == "album" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    date,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    images[] {
      _key,
      asset-> {
        _id,
        url
      },
      alt,
      caption
    },
    seo {
      title,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`;

export const faqItemsQuery = groq`
  *[_type == "faqItem"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    tags,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    author,
    tags,
    body,
    coverImage {
      asset-> {
        _id,
        url
      },
      alt
    },
    seo {
      title,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      }
    }
  }
`;

export const albumSlugsQuery = groq`
  *[_type == "album" && defined(slug.current)][].slug.current
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;
