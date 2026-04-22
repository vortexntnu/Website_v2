import Image from "next/image";

type TimelineItemProps = {
  side: "left" | "right"; // which side holds the IMAGE; text is on the other side
  label: string;           // e.g. "ORCA 2024"
  year?: string;
  description: string;
  imageSrc: string;
};

/**
 * TimelineItem — alternating left/right card used in the Projects timeline
 * and the About page semester timeline.
 *
 * Design rationale:
 * - Alternating sides give the eye a natural zigzag reading path that works
 *   much better than a plain vertical list for a sequential story.
 * - The red centre dot sits on an absolute-positioned line drawn by the
 *   parent <Timeline> wrapper so alignment is always perfect regardless of
 *   card height differences.
 * - We use `md:flex-row` so on mobile the image always stacks above the text,
 *   both left and right variants collapse to the same readable single-column
 *   layout without any layout shift.
 */
export default function TimelineItem({
  side,
  label,
  year,
  description,
  imageSrc,
}: TimelineItemProps) {
  const isLeft = side === "left";

  return (
    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0">
      {/* ── Left half ── */}
      <div className="w-full md:w-1/2 md:pr-12">
        {isLeft ? (
          /* Image on left */
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={imageSrc} alt={label} fill className="object-cover" />
          </div>
        ) : (
          /* Text on left (when image is on right) */
          <div className="flex flex-col gap-3">
            <span className="inline-block bg-[#c21c1c] text-white text-sm font-semibold px-4 py-1 w-fit">
              {label}
            </span>
            {year && <p className="text-gray-500 text-sm">{year}</p>}
            <p className="text-gray-300 leading-relaxed">{description}</p>
          </div>
        )}
      </div>

      {/* ── Centre dot (sits on the vertical line drawn by parent) ── */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center w-5 h-5 rounded-full bg-[#c21c1c] border-2 border-[#0a0a0a] ring-2 ring-[#c21c1c]" />

      {/* ── Right half ── */}
      <div className="w-full md:w-1/2 md:pl-12">
        {isLeft ? (
          /* Text on right (when image is on left) */
          <div className="flex flex-col gap-3">
            <span className="inline-block bg-[#c21c1c] text-white text-sm font-semibold px-4 py-1 w-fit">
              {label}
            </span>
            {year && <p className="text-gray-500 text-sm">{year}</p>}
            <p className="text-gray-300 leading-relaxed">{description}</p>
          </div>
        ) : (
          /* Image on right */
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image src={imageSrc} alt={label} fill className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
