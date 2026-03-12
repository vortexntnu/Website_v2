# Home Page — Underwater Depth Theme

## Concept

Scrolling down the home page simulates a descent through ocean depth zones.
The background transitions from sunlit surface waters at the top to the pitch-black
abyss at the bottom. Marine life appears at ecologically appropriate depths, and
environmental effects (sunrays, caustics, bubbles) reinforce the immersion.

This ties directly to Vortex NTNU's identity as an underwater robotics organisation —
the page itself becomes a dive.

---

## Depth Zones

The page is divided into six visual depth zones, each mapped to content sections:

| Zone         | Scroll %  | Colour                  | Sections             | Marine Life             |
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
A full-viewport `linear-gradient` fixed behind all content. The gradient stop positions
shift based on scroll progress (computed in `requestAnimationFrame`), so the
viewport always shows the depth-appropriate colour. Sections use transparent or
semi-transparent (`bg-black/40`) backgrounds to let the gradient bleed through.

### Sunrays
Visible in the top ~30% of the page. Built with layered `conic-gradient` beams from
above, gently swaying via a CSS animation (`sunray-sway`, 8s alternating). Opacity
fades to zero as the user scrolls deeper — light doesn't reach the deep ocean.

### Caustic Light
A blurred `repeating-conic-gradient` pattern simulating the rippling light refraction
you see on shallow ocean floors. Fades out by ~40% scroll depth.

### Bubbles
20 small circular elements that continuously rise from bottom to top using CSS
`bubble-rise` animation. Each has randomised (but deterministic) horizontal position,
size (4–19px), speed (12–40s), and delay. They use a radial gradient for a glassy look.

### Fish Silhouettes
13 SVG fish placed at specific depth bands. Each fish:
- Uses inline SVG paths (no external assets needed)
- Swims horizontally across the viewport (`ocean-fish-ltr` / `ocean-fish-rtl` animations)
- Undulates vertically via keyframe waypoints for a natural swimming motion
- Only renders when the user's scroll position is within ±35% of its depth band (performance)
- Fades in/out smoothly as the user scrolls near/away from its depth

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

### Vignette
A radial gradient overlay that darkens the edges. Strength increases with scroll depth
(20% opacity at surface, 60% at the abyss), simulating reduced visibility in deep water.

---

## Design Decisions

### Why no background image for the hero?
The ocean gradient + sunrays serve as the hero backdrop. This keeps the surface zone
feeling light and watery rather than photo-heavy, and avoids a jarring transition from
a photograph to the gradient below.

### Why semi-transparent section backgrounds?
Opaque backgrounds would hide the ocean gradient entirely. Using `bg-black/40` with
`backdrop-blur-sm` on cards keeps content readable while the depth colour shows through.

### Why CSS animations over JS-driven animation?
All fish, bubbles, and effects use CSS `@keyframes`. The browser's compositor handles
these off the main thread, so scroll performance stays smooth even with 30+ animated elements.

### Why conditional fish rendering?
Fish outside the visible depth band are not rendered (`return null`). This keeps the
DOM lean — typically only 4–6 fish are active at once instead of all 13.

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
| `src/app/globals.css` | Added ocean animations: sunrays, caustics, bubbles, fish swim paths |
| `src/app/components/interactive/OceanBackground.tsx` | **New** — scroll-linked depth gradient, fish, bubbles, sunrays, vignette |

---

## Performance Notes

- All animations are CSS-only (GPU composited)
- Fish rendering is gated by scroll proximity — only ~4–6 active at once
- Scroll handler uses `requestAnimationFrame` throttling
- Bubble DOM is static (20 elements, never re-rendered)
- No external image assets — all visuals are CSS gradients + inline SVG
