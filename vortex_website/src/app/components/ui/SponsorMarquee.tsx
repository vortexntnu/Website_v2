import Image from "next/image";
import type { Sponsor } from "@/app/lib/types";

type SponsorMarqueeProps = {
  sponsors: Sponsor[];
};

/**
 * SponsorMarquee — infinite-scrolling sponsor banner.
 *
 * Every sponsor is rendered into an identical fixed slot with `object-contain`,
 * so differing source aspect ratios don't translate into differing visual sizes.
 * For logos whose source file has baked-in transparent padding, use the optional
 * `scale` field on the sponsor to nudge them up without editing the image.
 * Use `logoHeight` (in px) when a specific logo should render taller or shorter.
 */
export default function SponsorMarquee({ sponsors }: SponsorMarqueeProps) {
  const doubled = [...sponsors, ...sponsors];

  return (
    <div className="marquee-wrapper overflow-hidden w-full">
      <div className="animate-marquee flex items-center whitespace-nowrap w-max">
        {doubled.map((s, i) => {
          const logoHeight = s.logoHeight ?? 48;
          // For shrinking (scale < 1), apply via height so the layout box matches
          // the visual (hitbox hugs the logo). For scale >= 1, keep CSS transform
          // so oversized logos don't push the marquee row height.
          const shrinkViaLayout = s.scale !== undefined && s.scale < 1;
          const renderedHeight = shrinkViaLayout ? logoHeight * (s.scale as number) : logoHeight;
          const useTransform = s.scale !== undefined && s.scale >= 1;

          const inner = s.logoSrc ? (
            <Image
              src={s.logoSrc}
              alt={s.name}
              width={320}
              height={96}
              className="w-auto max-w-none"
              style={{
                height: renderedHeight,
                transform: useTransform ? `scale(${s.scale})` : undefined,
                ...(s.invertColors ? { filter: "invert(1)" } : {}),
              }}
            />
          ) : (
            <span className="text-gray-500 text-lg font-semibold tracking-wide">
              {s.name}
            </span>
          );

          const slotClasses = "flex items-center justify-center shrink-0";
          const slotStyle = {
            minWidth: s.hitWidth ?? 180,
            paddingLeft: s.hitPadLeft ?? s.hitPadX ?? 0,
            paddingRight: s.hitPadRight ?? s.hitPadX ?? 0,
          };

          return s.href ? (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={slotClasses}
              style={slotStyle}
              aria-label={s.name}
            >
              {inner}
            </a>
          ) : (
            <span key={i} className={`${slotClasses} cursor-default`} style={slotStyle}>
              {inner}
            </span>
          );
        })}
      </div>
    </div>
  );
}
