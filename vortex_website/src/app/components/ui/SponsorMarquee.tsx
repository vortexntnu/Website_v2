import Image from "next/image";
import type { Sponsor } from "@/app/lib/types";

type SponsorMarqueeProps = {
  sponsors: Sponsor[];
};

/**
 * SponsorMarquee — infinite-scrolling sponsor banner.
 *
 * Uses margin-right (not gap) on every item so that each item carries its own
 * trailing space. This makes the doubled list exactly 2× a single copy's width,
 * so translateX(-50%) lands precisely at the seam — giving a seamless loop.
 */
export default function SponsorMarquee({ sponsors }: SponsorMarqueeProps) {
  // Duplicate for seamless looping
  const doubled = [...sponsors, ...sponsors];

  return (
    <div className="marquee-wrapper overflow-hidden w-full">
      <div className="animate-marquee flex items-center whitespace-nowrap w-max">
        {doubled.map((s, i) => {
          const inner = s.logoSrc ? (
            <Image
              src={s.logoSrc}
              alt={s.name}
              width={s.logoWidth ?? 180}
              height={s.logoHeight ?? 40}
              className="object-contain opacity-100 hover:opacity-100 transition-opacity duration-150 w-auto"
              style={{
                height: s.logoHeight ?? 40,
                ...(s.invertColors ? { filter: "invert(1)" } : {}),
              }}
            />
          ) : (
            <span className="text-gray-500 text-lg font-semibold tracking-wide hover:text-gray-900 transition-colors duration-150">
              {s.name}
            </span>
          );

          return s.href ? (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-16 flex items-center justify-center"
              aria-label={s.name}
            >
              {inner}
            </a>
          ) : (
            <span key={i} className="mr-16 flex items-center justify-center cursor-default">
              {inner}
            </span>
          );
        })}
      </div>
    </div>
  );
}
