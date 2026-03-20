type SectionHeadingProps = {
  label?: string;      // small red uppercase label above the title
  title: string;
  subtitle?: string;   // optional paragraph below the title
  align?: "left" | "center";
};

/**
 * SectionHeading — reusable heading block for every content section.
 *
 * Design rationale:
 * - Having one heading style everywhere gives the site a consistent rhythm.
 * - The optional red `label` (e.g. "Our Story") adds a hierarchy level between
 *   the nav and the section title without crowding the heading itself.
 * - The optional `subtitle` paragraph lets us describe a section without
 *   copying the layout into every page file.
 */
export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-widest text-[#c21c1c]">
          {label}
        </span>
      )}
      <h2 className="text-4xl font-bold text-white leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-base text-gray-300 leading-relaxed max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
