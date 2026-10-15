<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Hawii House: Project Rules

Information website for a support NGO: Home/About, Gallery (with albums), FAQ, Blog, and a CMS for non-developer editors.

> Do not edit the `nextjs-agent-rules` block above. `next dev` manages it. Everything below is project-owned.

## 1. Source of truth

Read these before starting any task. Do not duplicate their contents here.

- @PLAN.md: routes, content models, build phases, and what every file must contain.
- @DESIGN.md: color tokens, typography, spacing, component and page-layout rules, accessibility checklist.

If a task conflicts with either file, stop and ask. If the files are out of date after your change, update them in the same task.

> `PLAN.md` was drafted without access to this project's exact Next.js version. Where it mentions Next.js APIs (async `params`, `revalidateTag`, metadata, route handlers), **verify against `node_modules/next/dist/docs/` first** and follow the docs if they differ.

## 2. Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (design tokens live in `app/globals.css`)
- Fonts: Lora (headings) and Nunito Sans (body) via `next/font/google`
- CMS: Sanity (`next-sanity`, `@sanity/image-url`, `@portabletext/react`)
- Hosting: Vercel

## 3. Commands

```bash
npm run dev      # local dev server (http://localhost:3000)
npm run build    # production build; must pass before a task is done
npm run lint     # ESLint; must pass before a task is done
npx tsc --noEmit # type check; must pass before a task is done
```

Use **npm** only. Do not add `yarn.lock`, `pnpm-lock.yaml`, or `bun.lockb`.

## 4. Project structure

```
app/
  layout.tsx            root layout: fonts, globals.css, base metadata
  globals.css           design tokens + base styles
  (site)/               public pages, shared Header/Footer
  studio/[[...tool]]/   embedded Sanity Studio
  api/revalidate/       CMS webhook endpoint
components/             layout/ ui/ content/ home/ gallery/ blog/ seo/
lib/                    sanity/ (client, queries, image), types.ts, site.ts, utils.ts
sanity/                 sanity config and schemaTypes/
```

Full per-file responsibilities are in `PLAN.md` section 6. If the project uses a `src/` folder, prefix `app/`, `components/`, and `lib/` with `src/`.

## 5. How to work

1. **One phase at a time.** Follow the phases in `PLAN.md` in order. Do not start a phase until the previous acceptance check passes.
2. **Small, reviewable changes.** Prefer one concern per task (e.g. "build Header and MobileNav"), not whole-site rewrites.
3. **Plan first for anything touching more than 3 files.** State the files you will create or change, then proceed.
4. **Ask before** adding a dependency, changing CMS schemas that already contain content, or deviating from `DESIGN.md`.
5. **Finish with checks.** Run lint, type check, and build. Report anything that fails instead of hiding it.
6. **Report briefly.** End each task with what changed, what you verified, and anything left open.

## 6. Code conventions

**General**
- TypeScript strict mode. No `any`; no `@ts-ignore` without a comment explaining why.
- Server Components by default. Add `"use client"` only for interactivity (mobile nav, lightbox, copy-link).
- Components: one per file, `PascalCase.tsx`, typed props. Pages and layouts use default exports (Next requirement); other modules use named exports.
- Keep components small and composable. Extract repeated class strings into components (`Button`, `Card`, `Section`).
- Shared types live in `lib/types.ts`. Do not redefine content types inline.

**Data and CMS**
- All content reads go through `lib/sanity/` helpers and the named queries in `lib/sanity/queries.ts`. No ad-hoc fetching in components.
- Dynamic routes must call `notFound()` for missing slugs and implement `generateStaticParams` and `generateMetadata`.
- Every image field in a schema requires `alt` text. Do not make it optional.
- Never hardcode content that the CMS is supposed to manage (after Phase 3).

**Styling** (details in `DESIGN.md`)
- Use token classes only: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `text-brown`, `border-border`, `bg-primary text-primary-foreground`, `bg-accent`.
- No raw hex values and no default Tailwind palette colors (like `orange-500`) in components.
- Never put white text on `--accent` (soft orange). Use `--foreground` text on it.
- Mobile-first: base styles for mobile, `md:` / `lg:` for larger screens.

**Images**
- Use `next/image` (via `SanityImage`). Provide correct `sizes`. Only the hero image gets `priority`.
- Meaningful `alt` text; `alt=""` only for purely decorative images.

**Accessibility** (must hold for every change)
- Semantic landmarks, one `<h1>` per page, no skipped heading levels.
- Interactive elements are keyboard-operable, have visible focus, and have at least a 44×44px target.
- Menus, accordions, and the lightbox expose state with the correct ARIA attributes.
- Respect `prefers-reduced-motion`.

## 7. Boundaries

**Always**
- Read the relevant Next.js doc in `node_modules/next/dist/docs/` before using a Next.js API.
- Keep `.env.example` in sync when adding an environment variable.
- Update `lib/types.ts` whenever a schema changes.

**Ask first**
- New dependencies, new routes not listed in `PLAN.md`, CMS schema changes affecting existing content, changes to the design tokens.

**Never**
- Commit `.env.local` or any secret or token.
- Edit the `nextjs-agent-rules` block, generated files, or `node_modules`.
- Remove accessibility features (skip link, focus styles, alt requirements) to simplify code.
- Use `localStorage`-dependent logic for content or layout that should render on the server.
- Add tracking scripts or third-party embeds without approval.

## 8. Definition of done

A task is done only when:
- [ ] The change matches `PLAN.md` and `DESIGN.md`.
- [ ] `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.
- [ ] The affected pages work at 360px, 768px, and 1280px, in light and dark mode.
- [ ] Keyboard navigation works on everything touched.
- [ ] No hardcoded colors, secrets, or leftover mock data (after Phase 3).
- [ ] `PLAN.md` / `DESIGN.md` updated if the change altered them.
