"use client";

import { useEffect, useRef, useState } from "react";

/*
 * OceanBackground — a scroll-linked underwater environment layer.
 *
 * As the user scrolls down the home page, the background transitions through
 * ocean depth zones: sunlit surface → twilight zone → midnight zone → abyss.
 *
 * Elements:
 *  - Full-page gradient that shifts from light cyan to deep navy/black
 *  - Animated sunrays at the top (CSS conic gradients)
 *  - SVG fish silhouettes that drift across at their assigned depth
 *  - Rising bubble particles
 *
 * All animations are CSS-driven for performance. The scroll position is read
 * via IntersectionObserver + requestAnimationFrame to stay off the main thread.
 */

/* ── Depth zone colours ──────────────────────────── */
const DEPTH_STOPS = [
  { at: 0, color: "rgba(12, 74, 110, 0.95)" },    // surface — deep teal
  { at: 0.15, color: "rgba(8, 51, 85, 0.95)" },    // shallow
  { at: 0.35, color: "rgba(5, 32, 58, 0.95)" },    // open water
  { at: 0.55, color: "rgba(3, 20, 42, 0.95)" },    // twilight zone
  { at: 0.75, color: "rgba(2, 12, 28, 0.95)" },    // midnight zone
  { at: 1, color: "rgba(4, 4, 12, 0.98)" },         // abyss
];

function gradientAtScroll(t: number): string {
  // Shift the gradient so the visible viewport always shows the depth-appropriate colour
  return DEPTH_STOPS.map(
    (s) => `${s.color} ${((s.at - t * 0.6) * 100 + 50).toFixed(1)}%`
  ).join(", ");
}

/* ── Fish data ───────────────────────────────────── */
type Fish = {
  id: number;
  svg: string;          // SVG path(s) for the fish shape
  viewBox: string;
  depthMin: number;     // fraction 0–1 of page
  depthMax: number;
  size: number;         // px width
  speed: number;        // seconds for one crossing
  yOffset: number;      // % within its depth band
  direction: "ltr" | "rtl";
  delay: number;        // animation delay in seconds
  opacity: number;
};

// Simple SVG fish shapes as path data
const FISH_SHAPES = {
  smallFish: {
    viewBox: "0 0 60 30",
    svg: `<path d="M45,15 Q60,15 50,5 Q45,10 45,15 Q45,20 50,25 Q60,15 45,15 Z M5,15 Q15,3 30,5 Q42,7 45,15 Q42,23 30,25 Q15,27 5,15 Z" fill="currentColor"/><circle cx="15" cy="13" r="2" fill="rgba(0,0,0,0.3)"/>`,
  },
  tropicalFish: {
    viewBox: "0 0 70 40",
    svg: `<path d="M55,20 Q70,20 60,8 Q55,14 55,20 Q55,26 60,32 Q70,20 55,20 Z M5,20 Q10,5 30,5 Q48,5 55,20 Q48,35 30,35 Q10,35 5,20 Z" fill="currentColor"/><circle cx="18" cy="17" r="2.5" fill="rgba(0,0,0,0.3)"/><path d="M30,10 Q35,20 30,30" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" fill="none"/>`,
  },
  jellyfish: {
    viewBox: "0 0 50 70",
    svg: `<ellipse cx="25" cy="20" rx="20" ry="18" fill="currentColor"/><path d="M10,28 Q13,50 8,65" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/><path d="M18,30 Q20,52 15,68" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/><path d="M25,32 Q25,55 23,70" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/><path d="M32,30 Q30,52 35,68" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/><path d="M40,28 Q37,50 42,65" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>`,
  },
  turtle: {
    viewBox: "0 0 80 50",
    svg: `<ellipse cx="40" cy="25" rx="22" ry="16" fill="currentColor"/><ellipse cx="40" cy="25" rx="18" ry="12" fill="currentColor" opacity="0.7"/><path d="M62,22 Q75,18 78,20 Q75,24 62,25" fill="currentColor" opacity="0.8"/><path d="M22,14 Q12,6 8,8 Q10,14 20,18" fill="currentColor" opacity="0.8"/><path d="M22,36 Q12,44 8,42 Q10,36 20,32" fill="currentColor" opacity="0.8"/><path d="M55,14 Q60,6 64,8 Q62,14 56,18" fill="currentColor" opacity="0.8"/><path d="M55,36 Q60,44 64,42 Q62,36 56,32" fill="currentColor" opacity="0.8"/><circle cx="70" cy="19" r="1.5" fill="rgba(0,0,0,0.3)"/>`,
  },
  anglerfish: {
    viewBox: "0 0 90 60",
    svg: `<path d="M70,30 Q90,30 80,18 Q72,24 70,30 Q72,36 80,42 Q90,30 70,30 Z M8,30 Q15,8 40,8 Q62,10 70,30 Q62,50 40,52 Q15,52 8,30 Z" fill="currentColor"/><circle cx="22" cy="25" r="4" fill="rgba(200,255,255,0.3)"/><circle cx="22" cy="25" r="2" fill="rgba(200,255,255,0.5)"/><path d="M35,28 L50,26 L48,30 L55,28 L52,32 L60,30" stroke="currentColor" stroke-width="1" fill="none" opacity="0.5"/><path d="M20,10 Q18,0 22,0 Q24,0 22,5" stroke="currentColor" stroke-width="1.5" fill="none"/><circle cx="22" cy="0" r="3" fill="rgba(180,255,220,0.4)"/>`,
  },
  whale: {
    viewBox: "0 0 120 50",
    svg: `<path d="M100,25 Q115,18 118,12 Q112,20 100,25 Q112,30 118,38 Q115,32 100,25 Z M5,25 Q10,8 40,6 Q75,4 100,25 Q75,46 40,44 Q10,42 5,25 Z" fill="currentColor"/><circle cx="25" cy="20" r="2.5" fill="rgba(0,0,0,0.2)"/><path d="M45,20 Q55,25 45,30" stroke="rgba(0,0,0,0.1)" stroke-width="2" fill="none"/>`,
  },
};

// Seed fish across depth zones — deterministic, no randomness during render
const FISH_LIST: Fish[] = [
  // Surface zone (0–25%) — small fish, dolphins
  { id: 1, ...FISH_SHAPES.smallFish, depthMin: 0.02, depthMax: 0.18, size: 30, speed: 18, yOffset: 30, direction: "ltr", delay: 0, opacity: 0.15 },
  { id: 2, ...FISH_SHAPES.smallFish, depthMin: 0.02, depthMax: 0.18, size: 25, speed: 22, yOffset: 60, direction: "rtl", delay: 5, opacity: 0.12 },
  { id: 3, ...FISH_SHAPES.smallFish, depthMin: 0.05, depthMax: 0.22, size: 20, speed: 15, yOffset: 80, direction: "ltr", delay: 10, opacity: 0.1 },

  // Shallow zone (20–45%) — tropical fish, turtles
  { id: 4, ...FISH_SHAPES.tropicalFish, depthMin: 0.18, depthMax: 0.38, size: 45, speed: 25, yOffset: 25, direction: "rtl", delay: 3, opacity: 0.12 },
  { id: 5, ...FISH_SHAPES.turtle, depthMin: 0.2, depthMax: 0.4, size: 55, speed: 35, yOffset: 65, direction: "ltr", delay: 8, opacity: 0.1 },
  { id: 6, ...FISH_SHAPES.tropicalFish, depthMin: 0.22, depthMax: 0.42, size: 35, speed: 20, yOffset: 45, direction: "ltr", delay: 14, opacity: 0.1 },

  // Mid-depth (40–65%) — jellyfish, larger fish
  { id: 7, ...FISH_SHAPES.jellyfish, depthMin: 0.38, depthMax: 0.58, size: 40, speed: 30, yOffset: 30, direction: "rtl", delay: 2, opacity: 0.1 },
  { id: 8, ...FISH_SHAPES.jellyfish, depthMin: 0.42, depthMax: 0.62, size: 30, speed: 40, yOffset: 70, direction: "ltr", delay: 12, opacity: 0.08 },
  { id: 9, ...FISH_SHAPES.whale, depthMin: 0.4, depthMax: 0.6, size: 90, speed: 45, yOffset: 50, direction: "rtl", delay: 6, opacity: 0.07 },

  // Deep zone (60–85%) — anglerfish with bioluminescence
  { id: 10, ...FISH_SHAPES.anglerfish, depthMin: 0.6, depthMax: 0.8, size: 55, speed: 28, yOffset: 40, direction: "ltr", delay: 4, opacity: 0.12 },
  { id: 11, ...FISH_SHAPES.anglerfish, depthMin: 0.65, depthMax: 0.85, size: 40, speed: 35, yOffset: 70, direction: "rtl", delay: 16, opacity: 0.1 },

  // Abyss (80–100%) — ghost-like deep creatures
  { id: 12, ...FISH_SHAPES.jellyfish, depthMin: 0.8, depthMax: 1, size: 50, speed: 50, yOffset: 35, direction: "ltr", delay: 7, opacity: 0.06 },
  { id: 13, ...FISH_SHAPES.whale, depthMin: 0.82, depthMax: 1, size: 110, speed: 60, yOffset: 60, direction: "rtl", delay: 20, opacity: 0.04 },
];

/* ── Bubble config ───────────────────────────────── */
type Bubble = {
  id: number;
  left: number;   // % from left
  size: number;   // px
  speed: number;  // seconds to rise
  delay: number;  // seconds
  opacity: number;
};

const BUBBLES: Bubble[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: (i * 17 + 5) % 100,         // spread across width
  size: 4 + (i % 5) * 3,
  speed: 12 + (i % 7) * 4,
  delay: (i * 2.3) % 15,
  opacity: 0.08 + (i % 4) * 0.03,
}));

/* ── Depth zone colour for fish ──────────────────── */
function fishColor(depthMin: number): string {
  if (depthMin < 0.2) return "rgba(140, 200, 220, VAR)";    // silvery blue
  if (depthMin < 0.4) return "rgba(100, 180, 160, VAR)";    // teal green
  if (depthMin < 0.6) return "rgba(120, 140, 200, VAR)";    // slate blue
  if (depthMin < 0.8) return "rgba(100, 200, 180, VAR)";    // bioluminescent teal
  return "rgba(140, 180, 220, VAR)";                          // ghostly pale
}

export default function OceanBackground({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!containerRef.current) { ticking = false; return; }
        const el = containerRef.current;
        const scrollable = el.scrollHeight - window.innerHeight;
        const t = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        setScrollFraction(t);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const gradient = `linear-gradient(to bottom, ${gradientAtScroll(scrollFraction)})`;

  // Sunray opacity fades as you go deeper
  const sunrayOpacity = Math.max(0, 1 - scrollFraction * 3);

  return (
    <div ref={containerRef} className="relative">
      {/* ── Ocean gradient layer ── */}
      <div
        className="fixed inset-0 -z-10 transition-none"
        style={{ background: gradient }}
      />

      {/* ── Sunrays (visible near top) ── */}
      {sunrayOpacity > 0.01 && (
        <div
          className="fixed inset-0 -z-10 pointer-events-none ocean-sunrays"
          style={{ opacity: sunrayOpacity }}
        />
      )}

      {/* ── Light caustics overlay (top 40%) ── */}
      {scrollFraction < 0.5 && (
        <div
          className="fixed inset-0 -z-10 pointer-events-none ocean-caustics"
          style={{ opacity: Math.max(0, 0.12 - scrollFraction * 0.24) }}
        />
      )}

      {/* ── Floating particles / marine snow ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Bubbles */}
        {BUBBLES.map((b) => (
          <div
            key={b.id}
            className="absolute ocean-bubble"
            style={{
              left: `${b.left}%`,
              width: b.size,
              height: b.size,
              animationDuration: `${b.speed}s`,
              animationDelay: `${b.delay}s`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Fish layer ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        {FISH_LIST.map((fish) => {
          // Only render fish if the current scroll is within ±30% of their depth band
          const midDepth = (fish.depthMin + fish.depthMax) / 2;
          const dist = Math.abs(scrollFraction - midDepth);
          if (dist > 0.35) return null;

          const fadeFactor = Math.max(0, 1 - dist / 0.35);
          const yPos = fish.depthMin * 100 + fish.yOffset * (fish.depthMax - fish.depthMin) * 100;
          const colorStr = fishColor(fish.depthMin).replace("VAR", String(fish.opacity * fadeFactor));

          return (
            <div
              key={fish.id}
              className={`absolute ocean-fish-${fish.direction}`}
              style={{
                top: `${yPos}%`,
                width: fish.size,
                height: fish.size * 0.6,
                animationDuration: `${fish.speed}s`,
                animationDelay: `${fish.delay}s`,
                color: colorStr,
              }}
            >
              <svg
                viewBox={fish.viewBox}
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
                style={fish.direction === "rtl" ? { transform: "scaleX(-1)" } : undefined}
                dangerouslySetInnerHTML={{ __html: fish.svg }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Vignette (gets stronger deeper) ── */}
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${0.2 + scrollFraction * 0.4}) 100%)`,
        }}
      />

      {/* ── Page content ── */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
