# Hawii House

Information website and content management system for **Hawii House**, a support NGO dedicated to providing safe refuge, nourishment, holistic case management, and community care with warmth and dignity.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Sanity CMS**.

---

## 1. Features

- **Home (`/`):** Hero, mission statement, highlight cards, featured album showcase, latest stories, call-to-action band.
- **About Us (`/about`):** Founding history, core principles & values, leadership & team profiles, direct contact block.
- **Photo Gallery (`/gallery` & `/gallery/[album]`):** Responsive album grids, photo counts, and a keyboard-accessible, focus-trapped image Lightbox with swipe/arrow navigation.
- **FAQ (`/faq`):** Category-grouped accordions built on native, accessible `<details>` / `<summary>` elements with schema.org `FAQPage` JSON-LD structured data.
- **Journal / Blog (`/blog` & `/blog/[slug]`):** Article catalog, reading time estimates, category tags, author metadata, client share/clipboard buttons, and previous/next article navigation.
- **Embedded CMS Studio (`/studio`):** Built-in Sanity Studio allowing non-technical editors to create and publish albums, stories, and FAQs.
- **On-demand Revalidation (`/api/revalidate`):** Webhook endpoint ensuring instant static page refreshes when content changes in Sanity.
- **SEO & Accessibility:** Dynamic XML sitemap (`/sitemap.xml`), `/robots.txt`, Open Graph metadata, skip link, WCAG AA color contrast compliance, and full keyboard navigation.

---

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 with brand design tokens defined in `app/globals.css`
- **Typography:** Lora (headings) & Nunito Sans (body/UI) loaded via `next/font/google`
- **Icons:** `lucide-react`
- **CMS:** Sanity (`next-sanity`, `@sanity/image-url`, `@portabletext/react`)
- **Hosting:** Vercel (or any Node.js environment)

---

## 3. Getting Started

### 3.1 Install Dependencies

```bash
npm install
```

### 3.2 Configure Environment Variables

Create a `.env.local` file in the root directory (based on `.env.example`):

```bash
cp .env.example .env.local
```

Fill in your Sanity project details:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-sanity-read-token
SANITY_REVALIDATE_SECRET=your-chosen-revalidate-secret
```

> **Note:** If Sanity keys are not yet configured, the website automatically falls back to curated static mock data so all routes and components remain fully functional and previewable.

### 3.3 Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

---

## 4. Available Scripts

```bash
npm run dev      # Launch local development server with Turbopack
npm run build    # Build optimized production bundle
npm run start    # Start production server
npm run lint     # Run ESLint check
npx tsc --noEmit # Perform TypeScript type check
```

---

## 5. Content Management (Sanity Studio)

Content editors can log in at `/studio` to manage:
- **Site Settings:** Organization name, logo, contact information, social links, default SEO.
- **Home Page:** Hero banner, headline, CTAs, highlight cards, featured album reference.
- **About Page:** History body text, values, team bios and headshots.
- **Photo Albums:** Upload high-resolution photos with captions and required alt text.
- **FAQs:** Add common questions, categorized and sortable by manual order.
- **Blog Posts:** Rich-text storytelling with authors, tags, cover photos, and excerpts.

---

## 6. Deployment & Webhooks

1. **Deploy to Vercel:** Push your branch to GitHub and import the repository into Vercel. Set all environment variables from `.env.local`.
2. **Setup Sanity Webhook:**
   - In your [Sanity Management Console](https://www.sanity.io/manage), navigate to **API** &rarr; **Webhooks**.
   - Create a webhook pointing to: `https://your-domain.com/api/revalidate`
   - Set the HTTP method to `POST` and set the Secret to match `SANITY_REVALIDATE_SECRET`.

---

## 7. License

MIT &copy; Hawii House.
