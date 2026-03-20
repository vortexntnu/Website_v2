# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands must be run from `vortex_website/`:

```bash
cd vortex_website

npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

## Architecture

This is the website for **Vortex NTNU**, an underwater robotics student organization. The current website runs at `https://www.vortexntnu.no`.

**Structure:**
- `vortex_website/` — the Next.js app (all source code lives here)
- `vortex_website/src/app/` — Next.js App Router pages and shared layout

**Stack:**
- Next.js 16 with App Router and TypeScript
- React 19, Tailwind CSS v4 (via `@tailwindcss/postcss`)
- PocketBase (`src/app/lib/pocketbase.ts`) as the backend — client points to `http://127.0.0.1:8090`
- Path alias: `@/*` → `./src/*`

**Pages** (`src/app/`):
- `layout.tsx` — root layout with sticky nav header and footer (shared across all pages)
- `page.tsx` — home
- `about/`, `team/`, `projects/`, `competitions/`, `join-us/`, `contact/` — one `page.tsx` each

**Component split:**
- `components/ui/` — server components (no `'use client'`), purely presentational
- `components/interactive/` — client components with state (NavBar, ContactForm, TeamTabSelector, ExpandableTeamSection, YearSelector)

## Design System

Full rationale is in `DESIGN_GUIDE.md`. Key rules:

**Colors** (CSS tokens in `globals.css`):
- Backgrounds: `#0a0a0a` (page), `#1a1a1a` (cards), `#262626` (hover/elevated)
- Accent: `#c21c1c` (brand red), `#dc2626` (hover)
- Text: `#ffffff` (headings), `#9ca3af` (body), `#6b7280` (captions)
- Borders: `#374151`

**Layout:** All sections use `py-16 px-8 max-w-7xl mx-auto`. Cards use `p-6` (standard) or `p-8`/`p-10` (featured).

**Border radius:** Cards use `rounded-lg` (8px) or `rounded-2xl` (16px). Buttons, badges, and profile photos are **square** (no `rounded-*`) — intentional engineering brand aesthetic.

**Responsive:** Mobile-first with `md:` breakpoints.

**Animations:** `animate-marquee` (sponsor carousel, CSS-only) and `animate-fade-in-up` (hero entrance) are defined in `globals.css`.
