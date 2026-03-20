# Home Page — Underwater Depth Theme

## Concept

Scrolling down the home page simulates a descent through ocean depth zones.
The background transitions from sunlit surface waters at the top to the pitch-black
abyss at the bottom. Marine life appears at ecologically appropriate depths, and
environmental effects (sunrays, caustics, bubbles) reinforce the immersion.

This ties directly to Vortex NTNU's identity as an underwater robotics organisation —
the page itself becomes a dive.

---

## Architecture: Absolute vs Fixed positioning

All ocean layers (gradient, fish, sunrays, caustics, bubbles) use **`position: absolute`**
within a wrapper that spans the full height of the page content. This means the ocean
physically exists at different vertical positions in the document — the browser's native
scroll reveals different depths as you scroll, rather than a uniform viewport overlay
being shifted via JavaScript.

**Why this matters:** With the previous `position: fixed` approach, the entire viewport
showed the same gradient shade at any moment. A JS scroll listener shifted the gradient
to fake depth, but every pixel on screen was the same colour. With absolute positioning,
if you could see the entire page at once, you'd see the full gradient from teal to black —
scrolling genuinely moves through it.

The only `fixed` element is the **vignette** (edge darkening), which is intentionally a
camera-lens effect applied to the viewport.

---

## Depth Zones

The page is divided into six visual depth zones, each mapped to content sections:

| Zone         | Page %    | Colour                  | Sections             | Marine Life             |
|--------------|-----------|-------------------------|----------------------|-------------------------|
| **Surface**  | 0–15%     | Deep teal `#0c4a6e`     | Hero                 | Small silvery fish      |
| **Shallow**  | 15–35%    | Dark blue `#083355`     | Quote, Projects      | Tropical fish, turtles  |
| **Open**     | 35–55%    | Navy `#05203a`          | Stats, About         | Jellyfish, whales       |
| **Twilight** | 55–75%    | Deep navy `#03142a`     | Video                | Anglerfish (glowing)    |
| **Midnight** | 75–90%    | Near-black `#020c1c`    | Sponsors             | Ghost jellyfish         |
| **Abyss**    | 90–100%   | Black `#04040c`         | CTA                  | Faint whale silhouette  |

---

## Visual Effects

### Background Gradient
A single `linear-gradient(to bottom, ...)` applied to an absolutely-positioned div
spanning 100% of the page height. No JavaScript needed — the gradient is static and
scrolling naturally reveals different depths. Sections use transparent or semi-transparent
(`bg-black/40`) backgrounds so the gradient bleeds through.

### Sunrays
Absolutely positioned at the **top 40%** of the page. Built with layered `conic-gradient`
beams from above, gently swaying via a CSS animation (`sunray-sway`, 8s alternating).
A fade-out mask at the bottom prevents a hard edge. Since they're absolute, you only
see them when scrolled to the surface — they're gone by mid-page.

### Caustic Light
A blurred `repeating-conic-gradient` pattern simulating rippling light refraction.
Absolutely positioned in the **top 25%** of the page with a fade-out mask. Only visible
in the shallow water zone.

### Bubbles
30 small circular elements distributed throughout the full page height. Each bubble is
absolutely positioned at a specific `top` percentage and rises **~300px** from its origin
using `bubble-rise-local` animation. This means you encounter different bubbles at
different depths, rather than the same set looping across the whole viewport.

### Fish Silhouettes
13 SVG fish placed at specific depth positions (as `top: X%` of the page). Each fish:
- Uses inline SVG paths (no external assets)
- Swims horizontally across the viewport (`ocean-fish-ltr` / `ocean-fish-rtl` CSS animations)
- Undulates vertically via keyframe waypoints for natural swimming motion
- Is always present in the DOM at its depth — no scroll-gated rendering needed
- Only visible when scrolled to its position (natural document flow)

**Fish by depth:**

| Depth        | Species        | Colour Palette          | Notes                        |
|--------------|----------------|-------------------------|------------------------------|
| Surface      | Small fish ×3  | Silvery blue            | Fast, small, schooling feel  |
| Shallow      | Tropical ×2    | Teal green              | Larger, slower               |
| Shallow      | Sea turtle ×1  | Teal green              | Slow, graceful               |
| Mid-depth    | Jellyfish ×2   | Slate blue              | Vertical, trailing tentacles |
| Mid-depth    | Whale ×1       | Slate blue              | Very large, very slow        |
| Deep         | Anglerfish ×2  | Bioluminescent teal     | Glowing lure detail in SVG   |
| Abyss        | Jellyfish ×1   | Ghostly pale            | Near-invisible               |
| Abyss        | Whale ×1       | Ghostly pale            | Massive shadow, barely there |

### Vignette (fixed)
The only viewport-locked element. A radial gradient that darkens screen edges. Strength
increases from 15% opacity at the surface to 60% at the abyss — a scroll listener
(`requestAnimationFrame`-throttled) drives this single value.

---

## Design Decisions

### Why absolute instead of fixed positioning?
Fixed positioning makes the entire viewport the same shade — the "depth" is faked by
shifting gradient stops via JS. Absolute positioning creates a real spatial relationship:
the surface is at the top of the document, the abyss at the bottom. Scrolling moves
through the ocean rather than the ocean moving through the viewport.

### Why no background image for the hero?
The ocean gradient + sunrays serve as the hero backdrop. This keeps the surface zone
feeling light and watery rather than photo-heavy, and avoids a jarring transition from
a photograph to the gradient below.

### Why semi-transparent section backgrounds?
Opaque backgrounds would hide the ocean gradient entirely. Using `bg-black/40` with
`backdrop-blur-sm` on cards keeps content readable while the depth colour shows through.

### Why CSS animations over JS-driven animation?
All fish, bubbles, and effects use CSS `@keyframes`. The browser's compositor handles
these off the main thread, so scroll performance stays smooth even with 40+ animated elements.

### Why local bubble rise (300px) instead of full-page rise?
With absolute positioning, a bubble that rises the full page height would need to be
thousands of pixels tall in its animation. Instead, each bubble rises ~300px from its
starting position, creating localised effervescence at every depth. Different bubbles
are encountered at different scroll positions.

### Content text adjustments
- Hero subheading uses `text-cyan-100/80` instead of gray for an underwater feel
- The CTA heading changed from "race" to "dive" to match the theme
- Quote text uses `text-cyan-50/90` for a cooler tone
- Border colours shifted from `border-[#374151]` to `border-white/5` for subtlety
- "Scroll" indicator became "Dive in" with a downward arrow

### Preserving brand identity
The Vortex brand red (`#c21c1c`) is kept on all accent elements — CTA buttons, labels,
the stats strip, and underlines. The stats strip specifically uses `bg-[#c21c1c]/90`
with backdrop blur so it reads as a bold red band cutting through the ocean (like a
submarine).

---

## Files Modified

| File | Change |
|------|--------|
| `src/app/page.tsx` | Wrapped in `OceanBackground`, removed opaque section bgs, adjusted text colours, themed hero |
| `src/app/globals.css` | Added ocean animations: sunrays, caustics, bubbles (local + viewport), fish swim paths |
| `src/app/components/interactive/OceanBackground.tsx` | **New** — absolute-positioned depth gradient, fish, bubbles, sunrays, caustics, fixed vignette |

---

## Performance Notes

- All animations are CSS-only (GPU composited)
- Fish are always in the DOM but offscreen when not at their depth (no JS gating needed)
- Only one scroll listener remains (for the vignette), throttled via `requestAnimationFrame`
- 30 bubbles + 13 fish = 43 animated elements, all CSS `transform`/`opacity` (compositor-friendly)
- No external image assets — all visuals are CSS gradients + inline SVG
