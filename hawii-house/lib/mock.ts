import {
  SiteSettings,
  HomePageData,
  AboutPageData,
  Album,
  FaqItem,
  Post,
} from "./types";

export const mockSiteSettings: SiteSettings = {
  siteName: "Hawii House",
  tagline: "Warmth, dignity, and supportive community care",
  contactEmail: "contact@hawiihouse.org",
  contactPhone: "+1 (555) 349-8201",
  address: "742 Harmony Crest, Suite 100, Portland, OR 97201",
  footerNote:
    "Hawii House is a dedicated 501(c)(3) community-led organization providing shelter, restorative services, and compassionate navigation for individuals and families in need.",
  socialLinks: [
    { platform: "Facebook", url: "https://facebook.com" },
    { platform: "Instagram", url: "https://instagram.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
  ],
};

export const mockAlbums: Album[] = [
  {
    _id: "album-1",
    title: "Community Kitchen & Daily Meals",
    slug: { current: "community-kitchen" },
    description:
      "Every morning our volunteer kitchen team prepares fresh, wholesome breakfasts and lunches shared around communal tables.",
    date: "2026-03-12",
    coverImage: {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
      alt: "Volunteers serving fresh warm meals in the community dining hall",
    },
    images: [
      {
        _key: "img-1",
        url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
        alt: "Volunteers smiling while plating nutritious food",
        caption: "Plating lunch in the central dining kitchen.",
      },
      {
        _key: "img-2",
        url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
        alt: "People seated around a long wooden table sharing food and conversation",
        caption: "Communal lunch where residents and neighbors connect.",
      },
      {
        _key: "img-3",
        url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80",
        alt: "Care worker handing a food box to a mother and child",
        caption: "Weekly grocery pantry distribution.",
      },
      {
        _key: "img-4",
        url: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
        alt: "Two young volunteers chopping vegetables together",
        caption: "Morning prep shift with student volunteers.",
      },
      {
        _key: "img-5",
        url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80",
        alt: "Fresh loaves of warm baked bread arranged on cooling racks",
        caption: "Locally donated bakery provisions.",
      },
      {
        _key: "img-6",
        url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
        alt: "Group of friends embracing and smiling in an open courtyard",
        caption: "Afternoon community tea and social hour.",
      },
    ],
  },
  {
    _id: "album-2",
    title: "Youth Art & Healing Workshops",
    slug: { current: "youth-art-workshops" },
    description:
      "A creative haven where children and teenagers express their feelings through painting, ceramics, and storytelling.",
    date: "2026-02-18",
    coverImage: {
      url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
      alt: "Children painting colorful murals on large paper canvases",
    },
    images: [
      {
        _key: "art-1",
        url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
        alt: "Child holding paintbrushes coated in bright yellow and blue acrylic",
        caption: "Expressive painting session guided by art therapists.",
      },
      {
        _key: "art-2",
        url: "https://images.unsplash.com/photo-1560421683-6856ea585c78?auto=format&fit=crop&w=1200&q=80",
        alt: "Colorful pottery bowls crafted by workshop participants",
        caption: "Clay sculpting and pottery glazing work.",
      },
      {
        _key: "art-3",
        url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
        alt: "Instructor demonstrating watercolor technique to attentive youth",
        caption: "Step-by-step watercolor landscape exploration.",
      },
      {
        _key: "art-4",
        url: "https://images.unsplash.com/photo-1460518451282-474b156ed8c4?auto=format&fit=crop&w=1200&q=80",
        alt: "Wall gallery showcasing framed student artwork and poetry",
        caption: "Annual winter art exhibition at Hawii House.",
      },
      {
        _key: "art-5",
        url: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
        alt: "Outdoor garden sketching circle in the sunshine",
        caption: "Quiet reflection and sketching in our sensory garden.",
      },
      {
        _key: "art-6",
        url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
        alt: "Group celebration with certificate awards for workshop completion",
        caption: "Graduation celebration for our 8-week creative cohort.",
      },
    ],
  },
];

export const mockHomePage: HomePageData = {
  heroHeadline: "Safe shelter, warm meals, and unconditional support.",
  heroSubheadline:
    "Hawii House walks alongside individuals and families facing hardship, restoring stability with dignity and deep compassion.",
  heroImage: {
    url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
    alt: "Supportive hands holding together in unity and warmth",
  },
  primaryCta: {
    label: "Get Support",
    href: "/about#contact",
  },
  secondaryCta: {
    label: "Learn Our Story",
    href: "/about",
  },
  missionSummary:
    "We believe true healing begins with security and understanding. At Hawii House, no one has to navigate life’s heaviest storms in isolation.",
  highlights: [
    {
      title: "Transitional Housing",
      description:
        "Comfortable, secure temporary rooms providing privacy and peace while families rebuild permanent independence.",
      icon: "Home",
    },
    {
      title: "Daily Nutrition & Kitchen",
      description:
        "Warm, balanced breakfast and dinner served daily in our communal dining hall, open to residents and neighbors.",
      icon: "Utensils",
    },
    {
      title: "Holistic Case Management",
      description:
        "Dedicated social workers helping you navigate healthcare, paperwork, legal assistance, and job readiness.",
      icon: "HeartHandshake",
    },
    {
      title: "Restorative Wellbeing",
      description:
        "Trauma-informed counseling, group circles, and creative expression spaces designed for all ages.",
      icon: "Sparkles",
    },
  ],
  featuredAlbum: mockAlbums[0],
};

export const mockAboutPage: AboutPageData = {
  title: "A haven built on dignity, listening, and enduring care.",
  intro:
    "Founded in 2018 by social workers and neighborhood advocates, Hawii House emerged from a simple premise: everyone deserves a safe door to knock on when life becomes overwhelming.",
  body: [
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "When individuals walk through our doors, they are not treated as cases or statistics. They are welcomed as guests, neighbors, and people with intrinsic worth and unique stories.",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "Our facilities include twenty temporary supportive bedrooms, quiet study spaces for children, an open communal kitchen, and dedicated counseling suites. Over the past eight years, we have helped over 1,400 households transition into stable permanent housing.",
        },
      ],
    },
    {
      _type: "block",
      children: [
        {
          _type: "span",
          text: "We work directly alongside local health providers, legal clinics, and educational programs to ensure every family receives holistic care tailored to their self-defined goals.",
        },
      ],
    },
  ],
  values: [
    {
      title: "Radical Hospitality",
      description:
        "Every person is greeted with unconditional warmth, respectful boundaries, and non-judgmental acceptance.",
    },
    {
      title: "Personal Agency",
      description:
        "Residents direct their own transition paths. We provide the tools, resources, and space for them to lead.",
    },
    {
      title: "Community Resilience",
      description:
        "Lasting recovery thrives in supportive relationships. We foster mutual aid and lifelong support networks.",
    },
    {
      title: "Transparent Integrity",
      description:
        "Every donor dollar and volunteer hour is accounted for with ethical governance and clear community reporting.",
    },
  ],
  team: [
    {
      name: "Elena Rostova",
      role: "Executive Director & Co-Founder",
      bio: "Former clinical social worker with fifteen years of experience in youth advocacy and community housing.",
      photo: {
        url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
        alt: "Elena Rostova, Executive Director",
      },
    },
    {
      name: "Marcus Vance",
      role: "Director of Case Management",
      bio: "Specializes in restorative justice and trauma-informed family support systems.",
      photo: {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        alt: "Marcus Vance, Director of Case Management",
      },
    },
    {
      name: "Amina Al-Mansoor",
      role: "Community Programs Coordinator",
      bio: "Oversees daily food initiatives, youth art programs, and neighborhood volunteer partnerships.",
      photo: {
        url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
        alt: "Amina Al-Mansoor, Community Programs Coordinator",
      },
    },
  ],
};

export const mockFaqs: FaqItem[] = [
  {
    _id: "faq-1",
    category: "Getting Help",
    question: "Who is eligible for temporary housing at Hawii House?",
    order: 1,
    answer:
      "We prioritize adults, families, and young people experiencing unexpected housing crises, eviction, or unsafe living conditions. We do not require complex paperwork or fees to receive initial intake screening.",
  },
  {
    _id: "faq-2",
    category: "Getting Help",
    question: "How quickly can someone be placed in a room?",
    order: 2,
    answer:
      "Depending on current availability, intake reviews occur the same day. In cases of immediate emergency, our crisis team provides temporary shelter coordination and safe rest immediately.",
  },
  {
    _id: "faq-3",
    category: "Getting Help",
    question: "Are meals provided, and can dietary needs be accommodated?",
    order: 3,
    answer:
      "Yes. Our community kitchen provides nutritious breakfast, lunch, and dinner seven days a week. We readily accommodate vegetarian, halal, diabetic, and allergy-sensitive dietary needs.",
  },
  {
    _id: "faq-4",
    category: "Volunteering & Community",
    question: "How can I volunteer with Hawii House?",
    order: 4,
    answer:
      "We welcome individual and group volunteers for kitchen shifts, children's tutoring, weekend garden maintenance, and administrative assistance. Orientation sessions take place bi-weekly.",
  },
  {
    _id: "faq-5",
    category: "Volunteering & Community",
    question: "Do you accept physical donations of clothing and household items?",
    order: 5,
    answer:
      "Yes! We regularly accept clean, seasonally appropriate clothing, unopened toiletries, new bedding, and school supplies. Please review our monthly needs list on our blog or contact us directly.",
  },
  {
    _id: "faq-6",
    category: "About Our Services",
    question: "Is Hawii House affiliated with any religious organization?",
    order: 6,
    answer:
      "Hawii House is a secular non-profit organization. We provide services to all community members regardless of religious background, beliefs, race, gender, or orientation.",
  },
];

export const mockPosts: Post[] = [
  {
    _id: "post-1",
    title: "Opening the Winter Pantry: How Neighbors Came Together",
    slug: { current: "opening-the-winter-pantry" },
    excerpt:
      "When cold temperatures arrived early this November, over forty local volunteers answered our urgent call to pack emergency food hampers.",
    publishedAt: "2026-03-01T10:00:00Z",
    author: "Elena Rostova",
    tags: ["Community", "Nutrition", "Volunteers"],
    coverImage: {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80",
      alt: "Pantry volunteers packing boxes of healthy food",
    },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "As winter approached, rising utility bills and groceries placed severe pressure on families across our district. Thanks to our partnership with local grocers and generous individual contributions, our winter food drive surpassed all previous goals.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Over the span of three days, community volunteers assembled and delivered 350 emergency relief boxes containing whole grains, fresh citrus, winter squash, and hearty soups.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "We want to extend our heartfelt gratitude to every individual who spent their weekend sorting canned goods and carrying boxes. Community resilience is not an abstract concept; it is practiced here every single day.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-2",
    title: "Celebrating Milestones: The Journey to Permanent Independence",
    slug: { current: "journey-to-permanent-independence" },
    excerpt:
      "Reflecting on Sarah and her daughter Maya’s six-month transition from our family wing into their very own two-bedroom apartment.",
    publishedAt: "2026-02-14T09:30:00Z",
    author: "Marcus Vance",
    tags: ["Stories", "Housing", "Impact"],
    coverImage: {
      url: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80",
      alt: "Family enjoying their living room with bright morning sunlight",
    },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "When Sarah first came to Hawii House in August, she was juggling two part-time shifts while searching for an affordable lease after an unexpected rent hike. Finding stability seemed like an insurmountable mountain.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Working alongside case manager Marcus, Sarah accessed career coaching, childcare subsidy navigation, and saved a rental deposit within our matched savings program.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Last Friday, Sarah received the keys to her new apartment. Stories like Sarah and Maya remind us why transitional housing coupled with dedicated case management changes generations.",
          },
        ],
      },
    ],
  },
  {
    _id: "post-3",
    title: "The Therapeutic Power of Art in Childhood Recovery",
    slug: { current: "therapeutic-power-of-art" },
    excerpt:
      "Our resident child specialist explains how creative workshops help young guests process anxiety and regain confidence.",
    publishedAt: "2026-01-22T14:15:00Z",
    author: "Amina Al-Mansoor",
    tags: ["Wellbeing", "Youth", "Workshops"],
    coverImage: {
      url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
      alt: "Child painting with bright colors on an easel",
    },
    body: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Trauma and sudden displacement frequently strip children of words. They internalize uncertainty and fear, which can manifest as withdrawal or chronic stress.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Through guided pottery, watercolor painting, and collaborative wall murals, our weekly art circles offer children a non-verbal language to release tension and feel pride in their creations.",
          },
        ],
      },
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Each session finishes with a calm group showcase where every participant’s work is framed and celebrated by peers and staff alike.",
          },
        ],
      },
    ],
  },
];
