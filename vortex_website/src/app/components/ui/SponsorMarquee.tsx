import type { Sponsor } from "@/app/lib/types";

type SponsorMarqueeProps = {
  sponsors: Sponsor[];
};

/**
 * SponsorMarquee — infinite-scrolling sponsor banner.
 *
 * Design rationale:
 * - Sponsors are a key requirement for student organisations — they fund
 *   the hardware and competitions. A moving banner keeps them visible without
 *   dedicating a large static grid that could look sparse.
 * - We duplicate the sponsors array so the animation loops seamlessly:
 *   when the first copy scrolls off-screen the second copy is already in view,
 *   and the animation resets to zero without any visible jump.
 * - Pausing on hover (via `.marquee-wrapper:hover .animate-marquee` in
 *   globals.css) lets users read sponsor names without chasing them.
 */
export default function SponsorMarquee({ sponsors }: SponsorMarqueeProps) {
  // Duplicate for seamless looping
  const doubled = [...sponsors, ...sponsors];

  return (
    <div className="marquee-wrapper overflow-hidden w-full">
      <div className="animate-marquee flex gap-16 items-center whitespace-nowrap w-max">
        {doubled.map((s, i) => (
          <span
            key={i}
            className="text-gray-400 text-lg font-semibold tracking-wide hover:text-white transition-colors duration-150 cursor-default"
          >
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
