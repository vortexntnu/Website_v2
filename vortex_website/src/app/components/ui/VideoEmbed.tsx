type VideoEmbedProps = {
  src: string;
  title: string;
};

/**
 * VideoEmbed — a YouTube (or any iframe-embeddable) video embed.
 *
 * Design rationale:
 * - The 16:9 aspect ratio wrapper uses the padding-bottom trick
 *   (`aspect-video` Tailwind class) so the iframe is always the correct shape
 *   regardless of its container width. This is the correct responsive approach
 *   for iframe embeds that don't support intrinsic sizing.
 * - A rounded-lg border-radius matches the card design language. A dark
 *   ring border visually separates the video from the page background.
 */
export default function VideoEmbed({ src, title }: VideoEmbedProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg ring-1 ring-[#374151]">
      <div className="relative w-full aspect-video">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
