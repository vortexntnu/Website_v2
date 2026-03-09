import Image from "next/image";
import Link from "next/link";

type HeroHeight = "sm" | "md" | "lg" | "xl" | "screen";

type HeroCta = {
  label: string;
  href: string;
};

type HeroSectionProps = {
  imageSrc: string;
  heading: string;
  subheading?: string;
  align?: "left" | "center";
  height?: HeroHeight;
  overlay?: number; // 0–1 opacity of black overlay
  cta?: HeroCta;
};

const heightMap: Record<HeroHeight, string> = {
  sm: "h-64",
  md: "h-96",
  lg: "h-[500px]",
  xl: "h-[600px]",
  screen: "h-screen",
};

/**
 * HeroSection — full-width image section used at the top of every page.
 *
 * Design rationale:
 * - A consistent hero across all pages creates a strong first impression and
 *   makes the site feel professionally unified.
 * - We layer a dark gradient overlay over the image so white text is always
 *   readable regardless of the underlying photo colours.
 * - The `align` prop lets hero text be centred (home page) or left-aligned
 *   (inner pages), matching the Figma designs.
 * - An optional CTA button gives every hero the ability to drive a primary
 *   user action (e.g. "Apply Now").
 */
export default function HeroSection({
  imageSrc,
  heading,
  subheading,
  align = "center",
  height = "xl",
  overlay = 0.55,
  cta,
}: HeroSectionProps) {
  const alignClasses =
    align === "center"
      ? "items-center text-center"
      : "items-start text-left";

  return (
    <section className={`relative w-full ${heightMap[height]} overflow-hidden`}>
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={heading}
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark overlay — opacity driven by the `overlay` prop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${overlay})` }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-end h-full max-w-7xl mx-auto px-8 pb-16 ${alignClasses}`}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in-up">
            {subheading}
          </p>
        )}
        {cta && (
          <Link
            href={cta.href}
            className="mt-8 inline-block bg-[#c21c1c] hover:bg-[#dc2626] text-white font-semibold px-8 py-3 transition-colors duration-200 animate-fade-in-up"
          >
            {cta.label}
          </Link>
        )}

        {/* Subtle scroll indicator on screen-height heroes */}
        {height === "screen" && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 text-sm">
            <span>Scroll</span>
            <span className="animate-bounce">↓</span>
          </div>
        )}
      </div>
    </section>
  );
}
