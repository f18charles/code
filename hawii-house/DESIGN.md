# DESIGN.md: Hawii House Design System

Visual and interaction rules for the Hawii House website, a support-NGO information site.
Build order and file responsibilities live in `PLAN.md`. This file defines **how everything should look and behave**.

---

## 1. Design principles

1. **Warm and welcoming.** Soft orange and brown tones, generous space, rounded shapes. Visitors may be stressed; the site should feel calm.
2. **Photos lead.** The palette is a neutral frame; real photography is the most colorful, emotional element.
3. **Clear actions.** One obvious primary action per screen (e.g. Get Help, Contact). Everything else is quieter.
4. **Readable by everyone.** Large comfortable text, strong contrast, works on older phones and slow connections.
5. **Understated elegance.** A soft serif for headings, a friendly sans for body, restrained decoration. No gimmicks.

---

## 2. Color

### 2.1 Tokens

| Token | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#FFF8F0` | `#1E1510` | Page background |
| `--foreground` | `#3B2A20` | `#F5E9DC` | Body text, headings |
| `--muted` | `#6B5648` | `#C9B4A1` | Captions, metadata, secondary text |
| `--surface` | `#F8E8D8` | `#2C1F17` | Cards, alternating sections, FAQ items |
| `--border` | `#E6D3BF` | `#4A3628` | Dividers, card outlines, inputs |
| `--primary` | `#B4541A` | `#F0A060` | Buttons, links, key actions |
| `--primary-foreground` | `#FFFFFF` | `#2A1608` | Text on primary |
| `--accent` | `#F4A261` | `#D98A4A` | Decorative blocks, icon backgrounds, highlights |
| `--brown` | `#7A4E2D` | `#C99A74` | Eyebrows, secondary headings, accents |

### 2.2 Usage rules

- **60 / 30 / 10:** about 60% background, 30% surfaces and text, 10% orange accents.
- **Soft orange (`--accent`) is decorative.** Use it for backgrounds, shapes, and icon tiles **with dark text** (`--foreground`). **Never put white text on it** (contrast is too low).
- **Burnt orange (`--primary`) carries actions.** Buttons and links only. Do not use it for large background areas.
- **Contrast targets (WCAG AA):** body text 4.5:1 or better, large text and UI components 3:1 or better. Approximate light-mode ratios: foreground on background about 12:1, muted on background about 6.5:1, white on primary about 6:1, foreground on accent about 6.5:1. **Re-check with a contrast tool whenever a value changes.**
- Do not rely on color alone to convey meaning (add icons, underlines, or text).

### 2.3 Dark mode

Follow `prefers-color-scheme`. Every component must use tokens, never hardcoded hex values, so dark mode works automatically. Photos get a subtle `brightness(0.95)` in dark mode so they do not glare.

### 2.4 `app/globals.css` (reference implementation)

```css
@import "tailwindcss";

:root {
  --background: #fff8f0;
  --foreground: #3b2a20;
  --muted: #6b5648;
  --surface: #f8e8d8;
  --border: #e6d3bf;
  --primary: #b4541a;
  --primary-foreground: #ffffff;
  --accent: #f4a261;
  --brown: #7a4e2d;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted: var(--muted);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-brown: var(--brown);
  --font-sans: var(--font-nunito);
  --font-serif: var(--font-lora);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #1e1510;
    --foreground: #f5e9dc;
    --muted: #c9b4a1;
    --surface: #2c1f17;
    --border: #4a3628;
    --primary: #f0a060;
    --primary-foreground: #2a1608;
    --accent: #d98a4a;
    --brown: #c99a74;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}

@layer base {
  h1, h2, h3, h4 {
    font-family: var(--font-lora), Georgia, serif;
  }

  :focus-visible {
    outline: 3px solid var(--primary);
    outline-offset: 3px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Headings | **Lora** (serif) | Weights 500 to 700. Warm, trustworthy. |
| Body / UI | **Nunito Sans** (sans) | Weights 400, 600, 700. Rounded, very readable. |

Load both with `next/font/google` in `app/layout.tsx`, exposing `--font-lora` and `--font-nunito`. Always include fallbacks (`Georgia, serif` and `system-ui, sans-serif`).

### Scale (mobile → desktop)

| Style | Mobile | Desktop | Weight | Line height |
|---|---|---|---|---|
| Display (home hero) | 36px | 56px | 600 | 1.1 |
| H1 | 32px | 44px | 600 | 1.15 |
| H2 | 26px | 34px | 600 | 1.2 |
| H3 | 21px | 24px | 600 | 1.3 |
| Body | 17px | 18px | 400 | 1.65 |
| Small / meta | 14px | 15px | 400 to 600 | 1.5 |
| Eyebrow | 13px | 14px | 700, uppercase, +0.08em tracking | 1.3 |

Rules:
- Body text never below 16px. Reading width capped at **65 to 75 characters** (`max-w-prose` or about 68ch).
- One `<h1>` per page. Do not skip heading levels.
- Eyebrow text uses `--brown`. Metadata uses `--muted`.
- Links in body text are `--primary`, underlined, with a stronger underline on hover.

---

## 4. Layout, spacing, shape

- **Grid:** 4-column mobile, 8-column tablet, 12-column desktop via Tailwind grid utilities.
- **Container:** max width 1152px (`max-w-6xl`), horizontal padding 20px mobile / 32px desktop. Reading pages (blog post, about body, FAQ) use a narrow container of about 720px.
- **Spacing scale:** Tailwind default (4px base). Section vertical padding: 64px mobile / 96px desktop. Gap between cards: 24px.
- **Radius:** cards and images 16px (`rounded-2xl`), buttons and inputs 12px (`rounded-xl`), pills fully rounded.
- **Borders and shadow:** prefer 1px `--border` outlines. Shadows only for floating elements (dropdowns, lightbox controls): soft, low-opacity warm brown (`0 8px 24px rgb(59 42 32 / 0.12)`).
- **Alternating sections:** alternate `--background` and `--surface` to create rhythm without heavy dividers.
- **Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Design mobile-first.

---

## 5. Imagery

- Use real photos of people, spaces, and activities. Avoid generic stock where possible. **Respect consent and privacy** for anyone depicted, especially people receiving support.
- Aspect ratios: hero 4:3 (mobile) / 3:2 (desktop); album and post covers 3:2; album cards 4:3; team portraits 1:1.
- Always supply meaningful `alt` text (describe what is shown, not "image of"). Decorative images use `alt=""`.
- Use `next/image` with correct `sizes`, lazy loading (except the hero, which is `priority`), and blur placeholders from the CMS.
- Do not overlay text on photos unless a solid or gradient scrim guarantees 4.5:1 contrast.
- Icons: a single outline icon set (e.g. Lucide), 24px, stroke 1.75, colored `--brown` or `--primary`. Place icons on `--accent` tiles (with dark icon color) for highlight cards.

---

## 6. Components

### Button
- **Primary:** `--primary` background, `--primary-foreground` text, 12px radius, 48px min height (44px minimum touch target), padding 24px horizontal, weight 700. Hover: 8% darker. Active: slight press (`translateY(1px)`).
- **Secondary:** transparent, 2px `--primary` border, `--primary` text. Hover: `--surface` background.
- **Ghost:** text only in `--primary` with underline on hover.
- Visible focus ring (see `globals.css`). Disabled state at 50% opacity, `aria-disabled`.
- One primary button per view area.

### Header
- Sticky, `--background` at 90% opacity with backdrop blur and a bottom `--border` line.
- Left: logo + site name (Lora, 20px). Right (desktop): nav links + primary CTA. Below `lg`: menu button opening a full-width panel.
- Active link: `--primary` text with underline; `aria-current="page"`.
- Height: 72px desktop, 64px mobile.

### Footer
- `--surface` background, top `--border`. Three columns on desktop: about + contact, navigation, social. Stacked on mobile.
- Bottom row: copyright, small print. Text `--muted` (links `--primary`).

### Card
- `--surface` or `--background` fill with 1px `--border`, 16px radius, 20 to 24px padding. Image at top bleeds to the edges with matching radius.
- Hover (if clickable): border becomes `--primary` at 40% opacity and the image scales 1.02 over 200ms. The entire card is a single link target; do not nest links.

### Accordion (FAQ)
- Built on `<details>`/`<summary>`. Each item: `--surface` background, 12px radius, 20px padding, 8px gap between items.
- Summary: Lora 19px, with a chevron on the right that rotates 180° when open. The whole row is clickable and has a 48px minimum height.
- Open state: answer revealed with 16px top spacing; body text color unchanged.
- Category headings (H2) separate groups.

### Photo grid and lightbox
- Grid: 2 columns mobile, 3 tablet, 4 desktop, 12px gap, images cropped to a consistent ratio (or masonry if chosen later).
- Each thumbnail is a `<button>` with an accessible label ("Open photo 3 of 24: {alt}").
- Lightbox: full-screen scrim (`rgb(30 21 16 / 0.92)`), image centered (`object-contain`), caption below, prev/next/close controls (48px targets). Keyboard: `←`/`→` navigate, `Esc` closes. Focus is trapped while open and returned to the thumbnail on close. Respect reduced motion.

### Post card
- Cover image (3:2), tags as small pills (`--surface` background, `--brown` text), title (H3, Lora), date in `--muted`, 2-line clamped excerpt, "Read more" link.

### Prose (blog body, about body, rich text)
- Max width about 68ch. Paragraph spacing 1.25em. H2 margin-top 2em, H3 1.5em.
- Lists keep bullets/numbers in `--brown`. Blockquote: 4px left border in `--accent`, italic Lora, `--muted` attribution.
- Inline images are full-width within the prose column with a caption in `--muted` 14px.
- Links use the link style from section 3. External links include a visually-hidden "(opens in a new tab)" label.

### Call-to-action band
- Full-width `--accent` background (soft orange) with `--foreground` text; heading in Lora, one primary-style button (use a **dark brown** button variant here, `--foreground` background with `--background` text, so contrast stays high on the orange).

---

## 7. Page layouts

### Home (`/`)
1. **Hero:** two columns on desktop (text left, photo right); stacked on mobile with photo first or second. Eyebrow, Display headline, subheadline (max 2 lines), primary + secondary CTA.
2. **Mission summary:** narrow centered paragraph with an eyebrow and a short link to About.
3. **Highlights:** 3 to 4 cards (icon tile, title, 2-line description) on `--surface`.
4. **Featured album:** section heading, a horizontal strip or 3-up grid of photos, link "View the gallery".
5. **Latest posts:** 3 post cards, link "All stories".
6. **CTA band:** invitation to get in touch / get involved.

### About (`/about`)
Page header → story/body in narrow prose container (with one or two inline photos) → values grid (2 to 3 columns, each with title and short text) → team grid (optional, 1:1 portraits, name, role) → contact block.

### Gallery (`/gallery`)
Page header → responsive grid of album cards (1 / 2 / 3 columns) with cover, title, and photo count. Empty state: friendly message.

### Album (`/gallery/[album]`)
Breadcrumb or back link → title, description, date → photo grid → lightbox. Optional "More albums" row at the bottom.

### FAQ (`/faq`)
Page header → optional category jump links (pills) → grouped accordions in a narrow container → "Still have questions?" card with contact CTA.

### Blog (`/blog`)
Page header → featured latest post (large card) → grid of post cards (1 / 2 / 3 columns) → pagination.

### Post (`/blog/[slug]`)
Narrow container: tags, H1, meta line (date, author, reading time), cover image (full container width), prose body, share/copy-link, previous/next post cards.

### 404
Centered message in Lora, short helpful text, three link buttons (Home, Gallery, Blog).

---

## 8. Motion

- Subtle and purposeful: 150 to 250ms, `ease-out`. Hover lifts, accordion chevron rotation, lightbox fade.
- No parallax, auto-playing carousels, or scroll-jacking.
- All motion is disabled or minimized under `prefers-reduced-motion` (handled globally in `globals.css`).

---

## 9. Accessibility checklist

- [ ] Skip-to-content link is the first focusable element.
- [ ] Landmarks: `<header>`, `<nav aria-label="Primary">`, `<main id="main">`, `<footer>`.
- [ ] Every image has meaningful alt text (or `alt=""` if decorative).
- [ ] Focus ring visible on every interactive element, never removed.
- [ ] All interactive targets at least 44×44px.
- [ ] Menu button, accordion, and lightbox are fully operable by keyboard and announce their state (`aria-expanded`, `aria-controls`, dialog role with a label).
- [ ] Contrast passes WCAG AA in light and dark modes.
- [ ] Page language set (`<html lang="en">`); headings in logical order.
- [ ] Forms (if added) have visible labels, clear error messages, and are not color-dependent.
- [ ] Text can be zoomed to 200% without loss of content or horizontal scrolling.

---

## 10. Voice and content tone

- **Warm, plain, respectful.** Short sentences. Speak to the reader as "you" and the organization as "we".
- Avoid jargon, acronyms without explanation, and pity-based language. Describe people with dignity and agency.
- Calls to action are specific verbs: "Get help", "Contact us", "Volunteer", "Read our stories", not "Click here".
- Headlines state the benefit or fact; avoid slogans without substance.
- Dates formatted for readability ("15 October 2026").
- Error and empty states are kind and tell the reader what to do next.

---

## 11. Tailwind usage conventions

- Use **token-based classes only** for color: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `text-brown`, `border-border`, `bg-primary text-primary-foreground`, `bg-accent`. No raw hex values and no default Tailwind color names (like `orange-500`) in components.
- Headings automatically use Lora through the base layer; use `font-serif` explicitly for non-heading serif text, `font-sans` is the default.
- Compose repeated patterns into components (`Button`, `Card`, `Section`) instead of copy-pasting long class strings.
- Mobile-first: write base styles for mobile, then add `md:` / `lg:` overrides.
