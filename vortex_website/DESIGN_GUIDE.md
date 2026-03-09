# Vortex NTNU — Design Guide

> This document explains **every design decision** made when building the Vortex NTNU website —
> from colour choices to component architecture to page-level rationale. Read it to understand
> *why* things look and work the way they do, and *how* to extend the site without breaking anything.

---

## Table of Contents

1. [Design System](#1-design-system)
   - 1.1 Colour Palette
   - 1.2 Typography
   - 1.3 Spacing & Layout
   - 1.4 Border Radius Conventions
   - 1.5 Animations
2. [Component Reference](#2-component-reference)
   - 2.1 UI Components (Server)
   - 2.2 Interactive Components (Client)
3. [Page Rationale](#3-page-rationale)
4. [React / Next.js Architecture](#4-react--nextjs-architecture)
5. [How to Extend the Site](#5-how-to-extend-the-site)

---

## 1. Design System

The design system is the *source of truth* for every visual decision. When you add a new section or component, always reach for the tokens defined here rather than inventing new hex values or font sizes.

### 1.1 Colour Palette

All tokens are defined as CSS custom properties in `src/app/globals.css`:

| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#0a0a0a` | Main page background — near-black, not pure black |
| `--bg-secondary` | `#1a1a1a` | Card and section backgrounds — slightly lighter |
| `--bg-tertiary` | `#262626` | Hover states, elevated cards |
| `--accent-red` | `#c21c1c` | Primary brand accent: CTAs, labels, borders |
| `--accent-red-hover` | `#dc2626` | Hover state for red elements (slightly brighter) |
| `--text-primary` | `#ffffff` | Headings, key labels |
| `--text-muted` | `#9ca3af` | Body text, descriptions (Tailwind `gray-400`) |
| `--text-subtle` | `#6b7280` | Captions, timestamps, secondary metadata |
| `--border-dark` | `#374151` | Input borders, dividers (Tailwind `gray-700`) |

**Why near-black instead of pure black (`#000000`)?**
Pure black `#000000` creates extreme contrast with white text that can feel harsh under bright screens. Near-black `#0a0a0a` is still very dark but slightly warmer and easier on the eyes for extended reading. This is the same approach used by Apple, Vercel, and Linear.

**Why two shades of dark background?**
Having `--bg-primary` (page) and `--bg-secondary` (cards) creates depth without shadows. Cards *appear* to lift off the page simply because they are 10 steps lighter than the background — no `box-shadow` required. This is called "layered dark theming".

**Why this particular red (`#c21c1c`)?**
It is dark enough to pass WCAG AA contrast requirements against white text, yet saturated enough to read clearly on both dark and medium backgrounds. The hover red (`#dc2626`) is Tailwind's `red-600` which is slightly more vibrant — this creates a subtle but perceptible interaction response.

### 1.2 Typography

We use **Geist Sans** (loaded via `next/font/google`) — a clean, modern sans-serif designed specifically for developer-focused products. It renders clearly at all sizes and has excellent Norwegian character support (æ, ø, å).

| Level | Tailwind Classes | Where Used |
|---|---|---|
| Display | `text-6xl font-bold` | Hero headings on large screens |
| H1 | `text-5xl font-bold` | Page titles |
| H2 | `text-4xl font-bold` | Section headings (`SectionHeading`) |
| H3 | `text-2xl font-semibold` | Card titles, sub-section headings |
| Body | `text-base text-gray-300 leading-relaxed` | Content paragraphs |
| Small | `text-sm text-gray-400` | Descriptions, secondary text |
| Caption | `text-xs text-gray-500` | Metadata, footnotes |
| Label | `text-xs font-semibold uppercase tracking-widest` | Category markers, the red labels above headings |

**Why `leading-relaxed` for body text?**
Default line-height (`leading-normal`, 1.5) is fine for short text. For longer paragraphs, `leading-relaxed` (1.625) gives the eye more breathing room between lines and measurably improves readability — especially on dark backgrounds where contrast is already high.

### 1.3 Spacing & Layout

Every section on every page follows the same spacing rules. Consistent spacing creates visual rhythm:

| Rule | Value | Tailwind class |
|---|---|---|
| Section vertical padding | 64px | `py-16` |
| Content max-width | 1280px | `max-w-7xl` |
| Content horizontal padding | 32px | `px-8` |
| Card inner padding (standard) | 24px | `p-6` |
| Card inner padding (featured) | 32px–40px | `p-8` / `p-10` |
| Grid column gap | 24px or 32px | `gap-6` / `gap-8` |

**Why `max-w-7xl` (1280px)?**
This is the sweet spot for content-heavy sites. Narrower than 1280px and two-column layouts feel cramped. Wider than 1280px and line lengths become too long to read comfortably. Most design systems (Tailwind, Material) default to 1280px for large layouts.

### 1.4 Border Radius Conventions

| Use case | Value | Tailwind class |
|---|---|---|
| Standard cards | 8px | `rounded-lg` |
| Featured / large cards | 16px | `rounded-2xl` |
| Buttons and badges | 0 (square) | no class |
| Stat bars | full | `rounded-full` |
| Profile photos | 0 (square, not circle) | no class |

**Why square buttons and badges?**
The Vortex brand is technical and precise — rounded "pill" buttons feel too casual or startup-like. Square-cornered buttons (like Vercel, Linear, and many engineering brands) feel more intentional and serious. It is a small detail that shifts the overall feeling of the site towards "engineering" rather than "consumer app".

**Why square profile photos?**
Square crops allow more face/content to appear in the same pixel area compared to circles. Circular crops waste ~21% of the image area. For a team page with many small photos, this difference is noticeable.

### 1.5 Animations

We use **CSS keyframe animations only** — no JavaScript animation libraries. This keeps the bundle small and ensures animations work even if JavaScript is disabled.

Two custom animations are defined in `globals.css`:

**`animate-marquee`** — the sponsor carousel
Translates the element from 0 to -50% over 20 seconds, then loops. The element's content is duplicated so when the first copy finishes scrolling off-screen, the second copy is already in view, creating a seamless infinite loop. Pauses on hover via `.marquee-wrapper:hover .animate-marquee { animation-play-state: paused }`.

**`animate-fade-in-up`** — entrance animation
Fades in and moves up 24px over 0.6 seconds with an ease-out curve. Used in `HeroSection` for headings and CTAs. The `ease-out` curve starts fast and decelerates — this feels natural because it mimics how physical objects decelerate when they arrive at a resting position.

**Hover effects** — use Tailwind's `hover:` prefix with `transition-*` duration classes. We use `transition-colors duration-150` for colour changes (fast — feels responsive) and `transition-transform duration-300` for scale and movement (slower — prevents janky rapid movement).

---

## 2. Component Reference

### 2.1 UI Components (Server Components)

These components receive all their data as props and have no React state. They can be imported directly into Server Components (pages) with no `'use client'` directive.

Location: `src/app/components/ui/`

---

#### `HeroSection`

Full-width image section used at the top of every page.

```tsx
import HeroSection from "@/app/components/ui/HeroSection";

<HeroSection
  imageSrc="https://picsum.photos/seed/hero/1920/1080"
  heading="Page Heading"
  subheading="Optional secondary text"   // optional
  align="center"                         // "center" | "left"
  height="xl"                            // "sm" | "md" | "lg" | "xl" | "screen"
  overlay={0.55}                         // 0–1 — opacity of black overlay
  cta={{ label: "APPLY", href: "/join-us" }}  // optional
/>
```

**How the overlay works:**
We use `<Image fill>` for the background photo, then layer a `<div>` with `background-color: rgba(0,0,0,{overlay})` on top. This guarantees white heading text is always readable regardless of how light or dark the underlying photo is. The `overlay` prop lets you control how much the image shows through — hero images with a clear sky need a higher overlay; darker underwater photos need less.

**The `height` sizes map to:**
- `sm` → `h-64` (256px) — compact heroes for simple pages
- `md` → `h-96` (384px) — medium hero
- `lg` → `h-[500px]` — tall hero (most pages use this)
- `xl` → `h-[600px]` — extra-tall (About, Join Us)
- `screen` → `h-screen` (full viewport height — home page only)

---

#### `SectionHeading`

Reusable heading block for every content section. Enforces a consistent structure:
red label → large title → optional subtitle paragraph.

```tsx
import SectionHeading from "@/app/components/ui/SectionHeading";

<SectionHeading
  label="Our Story"          // optional — renders as red uppercase label
  title="From garage to podiums"
  subtitle="Optional descriptive paragraph"
  align="left"               // "left" | "center"
/>
```

**Why a dedicated heading component?**
Without it, every page invents its own heading style. Some use `text-3xl`, some `text-4xl`, some add a red label, some don't. The inconsistency accumulates until pages feel unrelated. One component enforces one style.

---

#### `RedLabel`

The filled red badge used for timeline entries, section markers, and team labels.

```tsx
import RedLabel from "@/app/components/ui/RedLabel";

<RedLabel size="md">SEMESTER 1</RedLabel>
// sizes: "sm" | "md" | "lg"
```

---

#### `StatBar`

A visual percentage bar that replaces plain `<table>` elements for membership statistics.

```tsx
import StatBar from "@/app/components/ui/StatBar";

<StatBar label="Software" value={45} max={100} />
```

The fill width is `(value / max) * 100%`. The red fill colour matches `--accent-red`. The component calculates and clamps the percentage so values above `max` don't overflow.

---

#### `TimelineItem`

An alternating left/right timeline card used in both Projects and About.

```tsx
import TimelineItem from "@/app/components/ui/TimelineItem";

<TimelineItem
  side="right"           // "left" | "right" — which side holds the IMAGE
  label="ORCA 2024"
  year="2024"            // optional
  description="Description text"
  imageSrc="https://..."
/>
```

**How the alternating layout works:**
- When `side="right"`: image on right, text on left
- When `side="left"`: image on left, text on right
- On mobile (`< md`): always stacks vertically (image then text)
- The vertical connecting line is drawn by the **parent container** using a CSS `before:` pseudo-element, not by `TimelineItem` itself. This means the line's length adjusts automatically to the container height.

---

#### `TeamMemberCard`

A profile card for the Team page member grid.

```tsx
import TeamMemberCard from "@/app/components/ui/TeamMemberCard";

<TeamMemberCard
  name="Sarah Johnson"
  role="Software Lead"
  imageSrc="https://picsum.photos/seed/sarah/400/400"
  linkedinHref="https://linkedin.com/in/sarah"   // optional
/>
```

The LinkedIn icon is an inline SVG path — no icon library needed. Using the actual LinkedIn logo (not text like "in →") is immediately recognisable globally.

---

#### `ContactCard`

A contact person card for the Contact page. Same shape as `TeamMemberCard` but adds a clickable email address.

```tsx
import ContactCard from "@/app/components/ui/ContactCard";

<ContactCard
  name="Tobias Drage Nolfi"
  role="General Leader"
  email="tobias@vortexntnu.no"
  imageSrc="https://picsum.photos/seed/tobias/400/400"
/>
```

---

#### `SponsorMarquee`

The infinite-scrolling sponsor banner. Accepts a `Sponsor[]` array (imported from `lib/types.ts`).

```tsx
import SponsorMarquee from "@/app/components/ui/SponsorMarquee";
import type { Sponsor } from "@/app/lib/types";

const sponsors: Sponsor[] = [
  { name: "KONGSBERG" },
  { name: "WaterLinked" },
  // ...
];

<SponsorMarquee sponsors={sponsors} />
```

**How the seamless loop works:**
The component renders the `sponsors` array twice side-by-side. The CSS `marquee` animation translates the container from 0 to -50%. When the first copy has scrolled fully off-screen (at -50%), the animation resets to 0. Because the second copy fills the visible area at that exact moment, the transition is invisible — the loop appears infinite.

---

#### `GoogleMap`

A thin wrapper around a Google Maps `<iframe>` embed.

```tsx
import GoogleMap from "@/app/components/ui/GoogleMap";

<GoogleMap
  src="https://www.google.com/maps/embed?pb=..."
  height={400}
  title="Our location"
/>
```

To get a new embed URL: go to [maps.google.com](https://maps.google.com), search the address, click Share → Embed a map, and copy the `src` attribute from the `<iframe>` code.

---

#### `SocialIcons`

A row of branded SVG icons for Facebook, LinkedIn, Instagram, YouTube.

```tsx
import SocialIcons from "@/app/components/ui/SocialIcons";

<SocialIcons
  facebook="https://facebook.com/vortexntnu"
  linkedin="https://linkedin.com/company/vortexntnu"
  instagram="https://instagram.com/vortexntnu"
  youtube="https://youtube.com/@vortexntnu"
  size="md"   // "sm" | "md" | "lg"
/>
```

Only props that are provided render an icon. If you don't have a Facebook page, omit the `facebook` prop and no Facebook icon appears.

---

#### `VideoEmbed`

A YouTube (or any iframe-embeddable) video with a responsive 16:9 container.

```tsx
import VideoEmbed from "@/app/components/ui/VideoEmbed";

<VideoEmbed
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video description"
/>
```

The `aspect-video` Tailwind class (`aspect-ratio: 16/9`) makes the container intrinsically sized. The `<iframe>` is positioned absolutely inside it at `100% × 100%`. This is the correct cross-browser approach for responsive iframe embeds.

---

### 2.2 Interactive Components (Client Components)

These components use `useState`, `useEffect`, or other browser-only React APIs. They all begin with `"use client"` and are in `src/app/components/interactive/`.

---

#### `NavBar`

The sticky top navigation bar. Handles active link detection and mobile hamburger menu.

```tsx
// Used only in layout.tsx — do not import elsewhere
import NavBar from "@/app/components/interactive/NavBar";
```

**Active link detection:**
Uses `usePathname()` from `next/navigation`. For the home route (`/`), we do an exact match. For all other routes, we use `pathname.startsWith(href)` so that `/about/team` also highlights the ABOUT link.

**Mobile menu:**
A `useState(false)` bool tracks whether the dropdown is open. Three `<span>` elements with CSS transforms create the hamburger-to-X animation: the top bar rotates 45°, the middle bar fades out (`opacity-0`), and the bottom bar rotates -45°.

**Design note:** The nav uses `bg-[#0a0a0a]/95 backdrop-blur-sm` which makes it 95% opaque with a subtle blur. This lets the hero image peek through the nav on scroll, making the page feel more layered and immersive.

---

#### `YearSelector`

A horizontally scrollable row of year buttons for the Team page.

```tsx
import YearSelector from "@/app/components/interactive/YearSelector";

<YearSelector
  years={["2026", "2025", "2024"]}
  activeYear="2026"
  onSelect={(year) => setActiveYear(year)}
/>
```

The component is "controlled" — it holds no state itself. The parent (`TeamPageClient`) owns `activeYear` and passes it down. This is the standard React "lifting state up" pattern.

---

#### `TeamTabSelector`

A horizontal tab row for switching between sub-teams. The active tab has an underline (not a filled background) to distinguish it visually from `YearSelector`.

```tsx
import TeamTabSelector from "@/app/components/interactive/TeamTabSelector";

<TeamTabSelector
  tabs={[{ id: "software", label: "SOFTWARE" }]}
  activeTab="software"
  onSelect={(id) => setActiveTabId(id)}
/>
```

---

#### `ExpandableTeamSection`

An accordion that shows team thumbnail cards and reveals a detail panel when a card is clicked.

```tsx
import ExpandableTeamSection from "@/app/components/interactive/ExpandableTeamSection";

<ExpandableTeamSection teams={teamData} />
```

**How the accordion animation works:**
CSS `max-height` transition from `0` to `9999px` with `transition-all duration-300`. This is a well-known CSS technique: you can't transition `height: auto` in CSS, but you can transition `max-height` between a known value (0) and a large enough cap (9999px). The perceived animation speed depends on how tall the content actually is relative to the cap — with a 300ms transition it feels fast and snappy.

**State:** A single `activeId: string | null`. `null` means nothing is open. Clicking the same card again sets `activeId` to `null`, closing it (toggle behaviour).

---

#### `ContactForm`

A controlled contact form with client-side validation and a success state.

```tsx
import ContactForm from "@/app/components/interactive/ContactForm";

<ContactForm />
```

**Validation strategy:**
We validate on submit, not on every keystroke. Showing errors before a user finishes typing is annoying (it's why some forms feel aggressive). On submit: if any required field is empty, or the email doesn't match a basic regex, we set error messages per-field. The form does not submit until all errors are cleared.

**Success state:**
After a successful (simulated) submit, the form area is replaced with a confirmation message in the same space. No navigation, no modal, no page reload. The user sees immediate confirmation and can send another message if needed.

**Backend note:** The form currently logs to `console.log`. To wire it up to PocketBase, replace the `console.log` in `handleSubmit` with a `pb.collection('messages').create(form)` call.

---

## 3. Page Rationale

### Home (`/`)

**Problem:** The original hero used a background image via inline CSS `style`, was 500px tall, and had text pushed down with `mt-80` which broke at different screen widths.

**Solution:** Use `<HeroSection height="screen">` for a full-viewport hero with left-aligned text anchored to the bottom via `flex items-end`. This is always visually correct regardless of screen height.

**Quote section:** The original was a single italic line of lorem ipsum. We replaced it with a blockquote + a large decorative quotation mark (rendered via a low-opacity `span` element) as a typographic background element. This is a well-established editorial design pattern used in print magazines and modern web.

**Stats strip:** A full-width `bg-[#c21c1c]` strip between the projects grid and the about cards. Red against dark creates maximum contrast and makes the strip feel like a visual "bookmark". The four stats (100+ Members, 8 Competitions, 6 Drones, Since 2016) give credibility at a glance.

**Project cards:** Were inconsistent — some had images, one had placeholder text. Now all four cards use the same aspect-[3/4] tall-card layout with a gradient overlay, a red year badge in the corner, and the drone name at the bottom. Hovering reveals the description using an opacity transition — this is "progressive disclosure": show the label first, reveal detail only when the user expresses interest.

---

### About (`/about`)

**Problem:** The "WHO ARE WE" cards used three different brownish-pink hex colours (`#e8b4b8`, `#d4a5aa`, `#c49195`) that were not in the design system and looked random.

**Solution:** Replace with dark cards + `border-l-4 border-[#c21c1c]`. The red left border does the same job (distinguishing the card) with one token, not three.

**Stats:** Replaced `<table>` with `<StatBar>` components. Tables convey the same information but require the reader to do proportion arithmetic. Bar charts show proportions visually — no arithmetic needed.

**Timeline:** The original had coloured divs with placeholder "VORTEX" text where images should be. Now uses `<TimelineItem>` with `picsum.photos` placeholder images and real semester descriptions.

---

### Team (`/team`)

**Problem:** All year selector and team tab buttons were completely non-functional (clicking did nothing). The team names were "TEAM 1" … "TEAM 13".

**Solution:** Extract interactive state to `TeamPageClient.tsx` (Client Component). The page file (`page.tsx`) remains a Server Component for metadata export. `TeamPageClient` uses `useState` for `activeYear` and `activeTabId`, and renders the correct team's members.

**Real team names:** Leadership, Software, Mechanical, Electronics, Marketing, Navigation, Perception, Control, Thruster, Embedded, Testing, Operations, Media — much more descriptive for recruitment visitors.

---

### Projects (`/projects`)

**Problem:** The timeline had positioning bugs (dot misaligned when card heights differed) and the tab bar was non-functional.

**Solution:** The tab bar now uses plain `<a href="#orca">` anchor links — no JavaScript needed. The `id` attributes on each timeline section handle the scrolling. Add `scroll-mt-32` to account for the sticky nav + secondary tab nav height.

**Alternating layout logic:** `side="right"` puts the image on the right; `side="left"` puts the image on the left. The text is always on the opposite side. The six drones alternate: right, left, right, left, right, left.

---

### Competitions (`/competitions`)

**Problem:** The entire page used `bg-white text-black` — a jarring contrast with the dark theme on every other page.

**Solution:** All sections converted to dark theme. White card containers become `bg-[#1a1a1a]` cards on `bg-[#0a0a0a]` background. The play button overlay is replaced with an SVG circle + triangle.

**Results banner:** A full-width `bg-[#c21c1c]` strip with the team's best result. Catches the eye immediately — visitors get the key credibility signal before reading any text.

**Competition cards:** Each past competition gets a `rounded-2xl` dark card with alternating image-on-right / image-on-left for the two-image block. Uses `md:grid-flow-dense` to swap column order without changing DOM order (important for screen readers).

---

### Join Us (`/join-us`)

**Problem:** Each team's full description was in a repeated full-width section. Visitors had to scroll past all teams even if they only cared about one.

**Solution:** `<ExpandableTeamSection>` accordion. Four thumbnail cards at the top; clicking one opens a detail panel inline below the grid. This reduces page length significantly while making each team's content more focused.

**Why Vortex tiles:** Recruitment pages need to answer "what do I get out of this?" before visitors will invest time reading details. Three tiles (Real Engineering, International Stage, Community) answer the three most common prospect questions in under 15 words each.

---

### Contact (`/contact`)

**Problem:** The original page had only an address block and a form. The Figma design shows named contact persons — a grid of faces with roles and emails.

**Solution:** `<ContactCard>` grid (`grid-cols-1 md:grid-cols-3`) at the top. Each card has a photo, name, role, and a `mailto:` email link. This is far more welcoming than an anonymous inbox — visitors know exactly who they're writing to.

**Google Maps embed:** Added via `<GoogleMap>` component. Visitors can see exactly where the workshop is and get directions without leaving the site. No API key required for basic iframe embeds.

**Two-column layout:** Map + address on the left, contact form on the right. This groups "where we are" and "how to reach us digitally" as natural pairs on a contact page.

---

## 4. React / Next.js Architecture

### Server vs. Client Components

Next.js App Router makes a fundamental distinction:

| Type | Where | Can use | Use for |
|---|---|---|---|
| **Server Component** | Default | Async data fetching, metadata, imports | Pages, layout, static content |
| **Client Component** | With `"use client"` at top | `useState`, `useEffect`, browser APIs | Interactive UI, forms, selectors |

**Our rule:** Only components in `src/app/components/interactive/` use `"use client"`. Everything else is a Server Component.

**The Server + Client page pattern:**

```
team/page.tsx          ← Server Component
  └── exports metadata
  └── renders <HeroSection /> (server)
  └── renders <TeamPageClient /> (client)

team/TeamPageClient.tsx ← Client Component ("use client")
  └── holds useState for activeYear, activeTab
  └── renders <YearSelector /> (client)
  └── renders <TeamTabSelector /> (client)
  └── renders <TeamMemberCard /> components (server, used inside a client)
```

**Why does this matter?** Server Components are rendered once on the server and sent as HTML — fast, SEO-friendly, no JavaScript download. Client Components download as JavaScript and re-render in the browser on state changes. Keeping most of the page as Server Components means less JS shipped to users.

### Path Aliases

The `@/*` alias maps to `./src/*`. So:
```
@/app/components/ui/HeroSection → src/app/components/ui/HeroSection.tsx
@/app/lib/types                  → src/app/lib/types.ts
```

Always use the alias (`@/`) rather than relative paths (`../../`) — it's shorter and doesn't break when files are moved.

### Images

We use `next/image` (`<Image>` from `"next/image"`) instead of plain `<img>` tags because:
1. **Automatic lazy loading** — images below the fold only load when needed
2. **Automatic format conversion** — serves WebP to browsers that support it
3. **Automatic resizing** — generates multiple sizes based on device pixel ratio

External image domains must be whitelisted in `next.config.ts` under `images.remotePatterns`. Currently allowed: `picsum.photos` and `images.unsplash.com`.

For placeholder images, we use `picsum.photos/seed/{name}/{width}/{height}`. The `seed` parameter makes the image deterministic — the same seed always returns the same photo, so the page doesn't randomly change on every reload.

---

## 5. How to Extend the Site

### Adding a new page

1. Create `src/app/new-page/page.tsx`
2. Export a `metadata` object:
   ```tsx
   export const metadata: Metadata = {
     title: "Page Name — Vortex NTNU",
     description: "...",
   };
   ```
3. Start with `<HeroSection>` for consistency
4. Add the new route to the `navLinks` array in `NavBar.tsx`
5. Add it to the `quickLinks` array in `layout.tsx`

### Adding a new team member

Open `src/app/team/TeamPageClient.tsx`. Find the `subTeams` array and add a new `TeamMember` object to the relevant sub-team's `members` array:

```ts
makeMember("Full Name", "Role Title", "unique-seed-string")
```

The third argument is the picsum.photos `seed` — use any unique string (like the person's name) to get a consistent placeholder photo. When real photos are available, replace with the actual image URL or a PocketBase file URL.

### Adding a new drone/project

Open `src/app/projects/page.tsx`. Add a new entry to the `projects` array:

```ts
{
  id: "newdrone",           // used as HTML anchor ID
  name: "NEWDRONE",
  year: "2025",
  description: "...",
  imageSrc: "https://picsum.photos/seed/newdrone/800/600",
  side: "right",            // alternate with the previous entry
},
```

Also add the drone to the home page `projects` array in `src/app/page.tsx` if it's one of the four featured ones.

### Adding a new competition year

Open `src/app/competitions/page.tsx`. Add a new object to the `past` array:

```ts
{
  year: "2025",
  title: "Competition Name",
  result: "Placement",
  description: "...",
  detail: "More detail...",
  image1: "https://picsum.photos/seed/comp2025a/800/500",
  image2: "https://picsum.photos/seed/comp2025b/800/500",
},
```

Update the `upcoming` object with the next competition's details.

### Swapping placeholder images for real photos

All placeholder images use `picsum.photos` URLs. To swap in a real photo:
1. Upload the photo to PocketBase (or any CDN)
2. Replace the `picsum.photos` URL with the real URL
3. If using an external domain, add it to `next.config.ts` under `images.remotePatterns`

For PocketBase files the URL format is:
```
http://127.0.0.1:8090/api/files/{collection}/{recordId}/{fileName}
```

### Connecting PocketBase

PocketBase is already installed and the client is initialised in `src/app/lib/pocketbase.ts`.

**To fetch team members from PocketBase instead of hardcoded data:**

1. Create a `members` collection in PocketBase with fields: `name`, `role`, `team`, `year`, `image`, `linkedin`
2. In `TeamPageClient.tsx`, replace the hardcoded `subTeams` with a `useEffect` fetch:
   ```ts
   useEffect(() => {
     pb.collection('members').getList(1, 50, {
       filter: `year = "${activeYear}" && team = "${activeTabId}"`,
     }).then(result => setMembers(result.items));
   }, [activeYear, activeTabId]);
   ```
3. Convert the Server Component page to `"use client"` or keep the data fetch in a Server Component using `async/await` at the top of `page.tsx`

**To wire up the contact form:**

In `ContactForm.tsx`, replace the `console.log` in `handleSubmit` with:
```ts
await pb.collection('contact_messages').create({
  name: form.name,
  email: form.email,
  subject: form.subject,
  message: form.message,
});
```

---

*This design guide was written after implementation, reflecting exactly what was built. Update it whenever a design decision changes — stale documentation is worse than no documentation.*
