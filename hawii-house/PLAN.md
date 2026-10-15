# PLAN.md: Hawii House Website

A support-NGO information site built with Next.js (App Router), TypeScript, Tailwind v4 and a headless CMS.
This file defines **what to build, in what order, and what every file must contain**.
Visual rules live in `DESIGN.md`.

> **Conventions**
> - Paths are relative to the project root. If your project uses a `src/` folder, prefix `app/`, `components/` and `lib/` with `src/`.
> - The CMS is assumed to be **Sanity** (hosted, strong image handling). If you pick Payload or Keystatic instead, only the `sanity/` folder and `lib/sanity/` files change; pages and components stay the same.
> - In recent Next.js versions, `params` and `searchParams` in pages are **Promises**: `await` them.

---

## 1. Goals

- Present the organization clearly: who we are, what we do, how to get help or contact us.
- Showcase work through a **photo gallery with albums**.
- Answer common questions in an **FAQ**.
- Publish updates and stories in a **blog**.
- Let non-developers manage all content through a **CMS** with no code changes.
- Be fast, accessible, mobile-first, and easy to maintain.

**Non-goals (for v1):** user accounts, donations/payment processing, comments, multi-language, site search.

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript |
| Styling | Tailwind CSS v4 (tokens in `app/globals.css`) |
| Fonts | Lora (headings), Nunito Sans (body) via `next/font/google` |
| CMS | Sanity (`next-sanity`, `@sanity/image-url`, `@portabletext/react`) |
| Images | `next/image` with Sanity CDN |
| Hosting | Vercel (or any Node host) |
| Content freshness | Static generation + on-demand revalidation via CMS webhook |

---

## 3. Routes

| Route | Purpose | Data source |
|---|---|---|
| `/` | Home: hero, mission summary, highlights, latest posts, featured album, call to action | `homePage`, `siteSettings`, latest `post`s, featured `album` |
| `/about` | Story, mission, values, team (optional), contact details | `aboutPage`, `siteSettings` |
| `/gallery` | Grid of albums | all `album`s |
| `/gallery/[album]` | Photos in one album + lightbox | one `album` |
| `/faq` | Accordion of questions, grouped by category | all `faqItem`s |
| `/blog` | Post list, newest first | all `post`s |
| `/blog/[slug]` | Single post | one `post` |
| `/studio` | CMS admin (embedded Sanity Studio) | n/a |
| `/sitemap.xml`, `/robots.txt` | SEO | generated |
| `/api/revalidate` | Webhook endpoint the CMS calls on publish | n/a |

Optional later: `/contact` (form), `/get-help` (resources), `/feed.xml` (RSS).

---

## 4. Content models (CMS schemas)

All text fields that appear on the site must be editable. Every image field **requires alt text**.

### `siteSettings` (singleton)
- `siteName` (string, required)
- `tagline` (string)
- `logo` (image + alt)
- `contactEmail`, `contactPhone` (string)
- `address` (text)
- `socialLinks` (array of `{ platform, url }`)
- `footerNote` (text)
- `defaultSeo` (`seo` object)

### `homePage` (singleton)
- `heroHeadline`, `heroSubheadline` (string)
- `heroImage` (image + alt)
- `primaryCta` (`{ label, href }`), `secondaryCta` (`{ label, href }`)
- `missionSummary` (text)
- `highlights` (array of `{ title, description, icon? }`, 3 to 4 items)
- `featuredAlbum` (reference to `album`)
- `seo` (`seo` object)

### `aboutPage` (singleton)
- `title` (string)
- `intro` (text)
- `body` (`blockContent`)
- `values` (array of `{ title, description }`)
- `team` (array of `{ name, role, photo + alt, bio }`, optional)
- `seo` (`seo` object)

### `album`
- `title` (required), `slug` (required, from title), `description` (text)
- `coverImage` (image + alt, required)
- `date` (date, optional)
- `images` (array of `{ image, alt (required), caption }`, ordered)
- `seo` (`seo` object)

### `faqItem`
- `question` (string, required)
- `answer` (`blockContent`, required)
- `category` (string, optional, e.g. "Getting help", "Volunteering")
- `order` (number, for manual sorting)

### `post`
- `title` (required), `slug` (required), `excerpt` (text, max about 200 chars)
- `coverImage` (image + alt)
- `publishedAt` (datetime, required)
- `author` (string)
- `tags` (array of string)
- `body` (`blockContent`)
- `seo` (`seo` object)

### Shared objects
- `blockContent`: rich text with headings (H2 to H4), bold/italic, links, lists, blockquote, and inline images (with alt).
- `seo`: `{ title, description, image }`.

---

## 5. Build phases

Each phase ends with an **acceptance check**. Do not start the next phase until it passes.

### Phase 0: Foundation
- [ ] Install fonts (Lora, Nunito Sans) and remove the Geist imports from `app/layout.tsx`.
- [ ] Replace `app/globals.css` with the design tokens from `DESIGN.md` (remove the `font-family: Arial` line on `body`).
- [ ] Create the `(site)` route group with shared `Header`, `Footer`, `SkipLink`, and `Container`.
- [ ] Set site metadata: title template (`%s | Hawii House`), description, `metadataBase`, Open Graph defaults.
- [ ] Add `.env.example`.

**Acceptance:** `npm run dev` shows an empty page inside a styled header/footer; fonts and colors match `DESIGN.md`; light and dark themes both work.

### Phase 1: Static pages with placeholder content
- [ ] Home, About, FAQ built with **hardcoded** copy and placeholder images.
- [ ] FAQ accordion using native `<details>`/`<summary>`.
- [ ] Gallery and blog **list and detail** pages built with mock data from `lib/mock.ts` (temporary).
- [ ] `not-found.tsx`.

**Acceptance:** every route renders; layout is responsive at 360px, 768px, and 1280px; keyboard navigation works everywhere.

### Phase 2: CMS setup
- [ ] Create a Sanity project and dataset; add env vars.
- [ ] Add `sanity/` config and all schemas from section 4.
- [ ] Embed Studio at `/studio`.
- [ ] Enter sample content: 1 settings doc, home, about, 2 albums (6+ photos each), 6 FAQs, 3 posts.

**Acceptance:** an editor can log in at `/studio`, create and publish each content type, and required fields (alt text, slugs) block publishing when empty.

### Phase 3: Connect pages to the CMS
- [ ] Write GROQ queries in `lib/sanity/queries.ts` and typed fetch helpers.
- [ ] Replace mock data in every page; delete `lib/mock.ts`.
- [ ] Add `generateStaticParams` for `/gallery/[album]` and `/blog/[slug]`.
- [ ] Add `generateMetadata` to every page using the `seo` fields with sensible fallbacks.
- [ ] Add `/api/revalidate` and configure the Sanity webhook with a shared secret.

**Acceptance:** publishing a change in the Studio updates the live page within seconds without a redeploy; unpublished or missing slugs return the 404 page.

### Phase 4: Gallery and blog polish
- [ ] Gallery: responsive masonry or uniform grid, lazy-loaded images, blur placeholders, accessible lightbox (keyboard, focus trap, Esc to close).
- [ ] Blog: reading time, tags, previous/next links, share/copy-link button, related posts (optional).
- [ ] Portable Text renderer styled with the prose rules in `DESIGN.md`.

**Acceptance:** an album of 30+ images scrolls smoothly on a mid-range phone; Lighthouse performance 90+ on mobile.

### Phase 5: SEO, accessibility, launch
- [ ] `sitemap.ts` (static routes + all albums + all posts) and `robots.ts`.
- [ ] JSON-LD: `Organization` (site-wide), `Article` (posts), `FAQPage` (FAQ).
- [ ] Open Graph image fallback (`app/opengraph-image.png`).
- [ ] Accessibility audit: contrast, alt text, focus order, reduced motion, landmark roles.
- [ ] Deploy, connect domain, set production env vars and webhook URL, add analytics (privacy-friendly).

**Acceptance:** Lighthouse 90+ in all four categories on Home, Gallery album, FAQ, and a blog post; no console errors; sitemap submitted.

---

## 6. File manifest: what each file must contain

### Root configuration

| File | Must contain |
|---|---|
| `next.config.ts` | `images.remotePatterns` allowing `cdn.sanity.io`. No other custom config unless needed. |
| `.env.example` | Placeholder keys (no real values): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`, `SANITY_REVALIDATE_SECRET`. |
| `.env.local` | Real values for the keys above. **Never commit.** Confirm it is in `.gitignore`. |
| `sanity.config.ts` | Studio config: project ID, dataset, base path `/studio`, schema list, structure that shows singletons (`siteSettings`, `homePage`, `aboutPage`) as single documents. |
| `sanity.cli.ts` | Project ID and dataset for the Sanity CLI. |
| `README.md` | Setup steps, env vars, scripts, how to add content, how to deploy. |

### `app/` (routing and pages)

| File | Must contain |
|---|---|
| `app/layout.tsx` | Root layout only: font setup (Lora, Nunito Sans) with CSS variables on `<html>`, `import "./globals.css"`, `metadata` (title template, description, `metadataBase`, Open Graph defaults), `<body>` with base classes. No header/footer here. |
| `app/globals.css` | Tailwind import, color tokens (light + dark) in `:root`, `@theme inline` mapping tokens to Tailwind colors and fonts, base styles (body colors, heading font, focus ring, reduced-motion). See `DESIGN.md`. |
| `app/favicon.ico` | Site favicon (already present). Add `icon.png` / `apple-icon.png` if available. |
| `app/opengraph-image.png` | 1200×630 default share image on the brand background. |
| `app/not-found.tsx` | Friendly 404: short message, links to Home, Gallery, Blog. |
| `app/error.tsx` | Client error boundary with a "Try again" button and a link home. |
| `app/sitemap.ts` | Static routes plus dynamic album and post URLs with `lastModified`. |
| `app/robots.ts` | Allow all except `/studio` and `/api`; point to the sitemap. |
| `app/(site)/layout.tsx` | Public site shell: `SkipLink`, `Header`, `<main id="main">`, `Footer`. Fetches `siteSettings` once for header/footer. |
| `app/(site)/page.tsx` | Home. Sections in order: Hero, Mission summary, Highlights (3 to 4 cards), Featured album strip, Latest posts (3), Call-to-action band. |
| `app/(site)/about/page.tsx` | Page title, intro, rich-text body, values grid, team grid (if present), contact block. |
| `app/(site)/gallery/page.tsx` | Page title + intro, grid of `AlbumCard`s, empty state. |
| `app/(site)/gallery/[album]/page.tsx` | Album title, description, date, photo grid with lightbox, back link. `generateStaticParams`, `generateMetadata`, `notFound()` on missing slug. |
| `app/(site)/faq/page.tsx` | Title + intro, FAQ list grouped by category (accordion), "Still have questions?" CTA, `FAQPage` JSON-LD. |
| `app/(site)/blog/page.tsx` | Title + intro, list of `PostCard`s (newest first), simple pagination or "Load more" when over 12 posts. |
| `app/(site)/blog/[slug]/page.tsx` | Cover image, title, date, author, tags, rich-text body, previous/next links, `Article` JSON-LD. `generateStaticParams`, `generateMetadata`, `notFound()`. |
| `app/studio/[[...tool]]/page.tsx` | Renders `NextStudio` with the config; sets `dynamic = "force-static"` and exports the Studio `metadata` and `viewport`. |
| `app/api/revalidate/route.ts` | `POST` handler: verify the webhook signature/secret, then `revalidateTag` (or `revalidatePath`) for the changed document type. Return 401 on a bad secret, 200 otherwise. |

### `components/`

| File | Must contain |
|---|---|
| `components/layout/Header.tsx` | Logo/site name link, primary nav (Home, About, Gallery, FAQ, Blog), prominent CTA button, active-link styling (`aria-current="page"`). |
| `components/layout/MobileNav.tsx` | Client component. Menu button (`aria-expanded`, `aria-controls`), slide-down panel, closes on route change and Esc, focus management. |
| `components/layout/Footer.tsx` | Org name + tagline, contact details, nav links, social links, footer note, current year. |
| `components/layout/Container.tsx` | Max-width wrapper with horizontal padding; optional `as` prop and `narrow` variant for reading width. |
| `components/layout/SkipLink.tsx` | "Skip to content" link, visible on focus, targets `#main`. |
| `components/ui/Button.tsx` | Variants: `primary`, `secondary`, `ghost`; sizes `md`, `lg`; renders `<a>`/`Link` or `<button>`. |
| `components/ui/Section.tsx` | Vertical-rhythm wrapper with optional heading, eyebrow, intro, and background tone (`default`, `surface`). |
| `components/ui/Card.tsx` | Surface, border, radius, hover state; slots for image, title, text. |
| `components/ui/Accordion.tsx` | Single FAQ item built on `<details>`/`<summary>` with chevron and animated open state (respects reduced motion). |
| `components/ui/PageHeader.tsx` | Page `<h1>` + intro paragraph block reused by About, Gallery, FAQ, Blog. |
| `components/content/PortableText.tsx` | Portable Text renderer: headings, paragraphs, lists, links (external links open safely), quotes, images with alt and caption. |
| `components/content/SanityImage.tsx` | Wrapper around `next/image` that builds the URL via the image builder, applies `alt`, sizes, and blur placeholder. |
| `components/home/Hero.tsx` | Headline, subheadline, two CTAs, hero image. |
| `components/home/Highlights.tsx` | 3 to 4 highlight cards with icon, title, description. |
| `components/gallery/AlbumCard.tsx` | Cover image, title, photo count, link to the album. |
| `components/gallery/PhotoGrid.tsx` | Responsive grid of photos; each opens the lightbox. |
| `components/gallery/Lightbox.tsx` | Client component. Full-screen viewer with prev/next, caption, close button; keyboard arrows and Esc; focus trap; restores focus on close. |
| `components/blog/PostCard.tsx` | Cover image, title, date, excerpt, tags, link. |
| `components/blog/PostMeta.tsx` | Date, author, reading time. |
| `components/seo/JsonLd.tsx` | Renders a `<script type="application/ld+json">` from a typed object. |

### `lib/`

| File | Must contain |
|---|---|
| `lib/sanity/client.ts` | `createClient` using env vars, `useCdn` set for production reads. |
| `lib/sanity/fetch.ts` | Typed `sanityFetch` helper wrapping the client with cache tags and revalidation options. |
| `lib/sanity/image.ts` | `urlFor(source)` builder from `@sanity/image-url`. |
| `lib/sanity/queries.ts` | All GROQ queries as named constants: settings, home, about, albums list, album by slug, FAQs, posts list, post by slug, slugs for static params. |
| `lib/types.ts` | TypeScript types for every content model and shared objects. |
| `lib/site.ts` | Navigation items, site constants (name, default description), URL helpers. |
| `lib/utils.ts` | `cn()` class joiner, `formatDate()`, `readingTime()`, `groupBy()`. |
| `lib/mock.ts` | **Temporary** (Phase 1 only). Mock data matching `lib/types.ts`. Delete in Phase 3. |

### `sanity/schemaTypes/`

| File | Must contain |
|---|---|
| `index.ts` | Exports the full schema array. |
| `siteSettings.ts`, `homePage.ts`, `aboutPage.ts` | Singleton schemas per section 4. |
| `album.ts`, `faqItem.ts`, `post.ts` | Collection schemas per section 4, with slug sources, required fields, preview config, and sensible ordering. |
| `blockContent.ts` | Rich text definition (styles, marks, lists, inline image with required alt). |
| `seo.ts` | Reusable SEO object. |

---

## 7. Definition of done (v1)

- All routes in section 3 are live, responsive, and keyboard-accessible.
- An editor with no coding knowledge can add an album, a post, and an FAQ and see them live within seconds.
- Every image has alt text; contrast passes WCAG AA in light and dark modes.
- Lighthouse 90+ (mobile) on key pages.
- `README.md` documents setup and editing; no secrets in the repo.
