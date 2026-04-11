type GoogleMapProps = {
  src: string;
  height?: number;
  title?: string;
};

/**
 * GoogleMap — a thin wrapper around a Google Maps <iframe> embed.
 *
 * Design rationale:
 * - Embedding a map directly on the Contact page removes friction: visitors
 *   can see exactly where Vortex is located without leaving the site.
 * - We wrap the iframe in a rounded container that matches the card radius
 *   convention (rounded-lg) so it blends naturally with the page's card grid.
 * - The `title` attribute is required for screen-reader accessibility — it
 *   describes what the embedded frame contains.
 */
export default function GoogleMap({
  src,
  height = 400,
  title = "Vortex office",
}: GoogleMapProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-[#374151]">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={title}
      />
    </div>
  );
}
