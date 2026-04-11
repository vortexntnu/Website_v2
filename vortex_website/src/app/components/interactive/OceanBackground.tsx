"use client";

/*
 * OceanBackground — a scrollable underwater environment.
 *
 * APPROACH: Every ocean layer (gradient, fish, sunrays, bubbles) is positioned
 * absolutely within a container that spans the full height of the page content.
 * This means the ocean physically exists at different depths in the document —
 * scrolling genuinely moves you through it instead of just shifting a viewport
 * overlay.
 *
 * - The gradient is a single static linear-gradient covering 100% of the page.
 * - Sunrays and caustics are anchored to the top (the surface).
 * - Fish are placed at absolute vertical positions matching their ecological zone.
 * - Bubbles are distributed at various heights, each rising a short distance.
 * - A fixed vignette overlay darkens viewport edges (a camera-lens effect).
 *
 * No scroll listeners are needed for the gradient or fish — the browser's native
 * scroll handles revealing different depths. Only the vignette uses a scroll
 * listener to deepen with depth.
 */

import { useEffect, useState } from "react";

/* ── Fish data ───────────────────────────────────── */
type FishDef = {
  id: number;
  svg: string;
  viewBox: string;
  depthPct: number;     // % from top of the page (0 = surface, 100 = abyss)
  size: number;
  speed: number;
  direction: "ltr" | "rtl";
  delay: number;
  opacity: number;
};

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

function fishColor(depthPct: number): string {
  if (depthPct < 20) return "rgba(140, 200, 220, VAR)";   // silvery blue
  if (depthPct < 40) return "rgba(100, 180, 160, VAR)";   // teal green
  if (depthPct < 60) return "rgba(120, 140, 200, VAR)";   // slate blue
  if (depthPct < 80) return "rgba(100, 200, 180, VAR)";   // bioluminescent teal
  return "rgba(140, 180, 220, VAR)";                        // ghostly pale
}

// Fish placed at absolute depth positions (% of total page height)
const FISH_LIST: FishDef[] = [
  // Surface (0–18%) — small schooling fish
  { id: 1,  ...FISH_SHAPES.smallFish,    depthPct: 5,   size: 30, speed: 18, direction: "ltr", delay: 0,  opacity: 0.15 },
  { id: 2,  ...FISH_SHAPES.smallFish,    depthPct: 10,  size: 25, speed: 22, direction: "rtl", delay: 5,  opacity: 0.12 },
  { id: 3,  ...FISH_SHAPES.smallFish,    depthPct: 15,  size: 20, speed: 15, direction: "ltr", delay: 10, opacity: 0.1  },

  // Shallow (18–38%) — tropical fish, turtles
  { id: 4,  ...FISH_SHAPES.tropicalFish, depthPct: 22,  size: 45, speed: 25, direction: "rtl", delay: 3,  opacity: 0.12 },
  { id: 5,  ...FISH_SHAPES.turtle,       depthPct: 30,  size: 55, speed: 35, direction: "ltr", delay: 8,  opacity: 0.1  },
  { id: 6,  ...FISH_SHAPES.tropicalFish, depthPct: 35,  size: 35, speed: 20, direction: "ltr", delay: 14, opacity: 0.1  },

  // Mid-depth (38–60%) — jellyfish, whale
  { id: 7,  ...FISH_SHAPES.jellyfish,    depthPct: 42,  size: 40, speed: 30, direction: "rtl", delay: 2,  opacity: 0.1  },
  { id: 8,  ...FISH_SHAPES.jellyfish,    depthPct: 52,  size: 30, speed: 40, direction: "ltr", delay: 12, opacity: 0.08 },
  { id: 9,  ...FISH_SHAPES.whale,        depthPct: 48,  size: 90, speed: 45, direction: "rtl", delay: 6,  opacity: 0.07 },

  // Deep (60–82%) — anglerfish
  { id: 10, ...FISH_SHAPES.anglerfish,   depthPct: 65,  size: 55, speed: 28, direction: "ltr", delay: 4,  opacity: 0.12 },
  { id: 11, ...FISH_SHAPES.anglerfish,   depthPct: 75,  size: 40, speed: 35, direction: "rtl", delay: 16, opacity: 0.1  },

  // Abyss (82–100%) — ghost creatures
  { id: 12, ...FISH_SHAPES.jellyfish,    depthPct: 85,  size: 50, speed: 50, direction: "ltr", delay: 7,  opacity: 0.06 },
  { id: 13, ...FISH_SHAPES.whale,        depthPct: 92,  size: 110, speed: 60, direction: "rtl", delay: 20, opacity: 0.04 },
];

/* ── Bubble config ───────────────────────────────── */
// Bubbles are distributed throughout the page height. Each rises ~300px from
// its starting point, so they appear localised rather than crossing the whole page.
type Bubble = {
  id: number;
  left: number;      // % horizontal position
  topPct: number;    // % vertical starting position (within the page)
  size: number;
  speed: number;
  delay: number;
  opacity: number;
};

const BUBBLES: Bubble[] = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: (i * 13 + 7) % 97 + 1,        // spread across width (1–98%)
  topPct: (i * 11 + 3) % 95 + 2,       // spread across height (2–97%)
  size: 3 + (i % 5) * 2.5,
  speed: 8 + (i % 6) * 3,
  delay: (i * 1.7) % 12,
  opacity: 0.06 + (i % 4) * 0.025,
}));

export default function OceanBackground({ children }: { children: React.ReactNode }) {
  // Vignette still uses scroll for a viewport darkening effect
  const [scrollFraction, setScrollFraction] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const t = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
        setScrollFraction(t);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative">
      {/* ── Ocean gradient — absolute, full page height ──
          This is the core of the depth effect. A single tall gradient that
          the browser reveals naturally as the user scrolls. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom,
            rgba(12, 74, 110, 0.95) 0%,
            rgba(8, 51, 85, 0.95) 15%,
            rgba(5, 32, 58, 0.95) 35%,
            rgba(3, 20, 42, 0.95) 55%,
            rgba(2, 12, 28, 0.95) 75%,
            rgba(4, 4, 12, 0.98) 100%
          )`,
        }}
      />

      {/* ── Sunrays — anchored to the top of the page (the surface) ──
          Only covers the first ~40% of the page, fading out naturally. */}
      <div
        className="absolute top-0 left-0 right-0 -z-10 pointer-events-none ocean-sunrays"
        style={{ height: "40%" }}
      >
        {/* Fade-out mask so rays don't end abruptly */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(5,32,58,1) 100%)",
          }}
        />
      </div>

      {/* ── Caustics — only in the top ~25% (shallow water) ── */}
      <div
        className="absolute top-0 left-0 right-0 -z-10 pointer-events-none ocean-caustics"
        style={{ height: "25%", opacity: 0.1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(8,51,85,1) 100%)",
          }}
        />
      </div>

      {/* ── Fish layer — absolute within full page ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {FISH_LIST.map((fish) => {
          const colorStr = fishColor(fish.depthPct).replace("VAR", String(fish.opacity));
          return (
            <div
              key={fish.id}
              className={`absolute ocean-fish-${fish.direction}`}
              style={{
                top: `${fish.depthPct}%`,
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
                style={fish.direction === "ltr" ? { transform: "scaleX(-1)" } : undefined}
                dangerouslySetInnerHTML={{ __html: fish.svg }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Bubbles — scattered throughout the page, each rising locally ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {BUBBLES.map((b) => (
          <div
            key={b.id}
            className="absolute ocean-bubble-local"
            style={{
              left: `${b.left}%`,
              top: `${b.topPct}%`,
              width: b.size,
              height: b.size,
              animationDuration: `${b.speed}s`,
              animationDelay: `${b.delay}s`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Fixed vignette — viewport effect that deepens with scroll ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: `radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,${(0.15 + scrollFraction * 0.45).toFixed(2)}) 100%)`,
        }}
      />

      {/* ── Page content ── */}
      <div className="relative z-0">{children}</div>
    </div>
  );
}
