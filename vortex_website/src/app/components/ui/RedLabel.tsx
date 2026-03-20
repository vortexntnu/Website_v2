import { ReactNode } from "react";

type RedLabelProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizeMap = {
  sm: "text-xs px-3 py-1",
  md: "text-sm px-4 py-2",
  lg: "text-base px-5 py-2.5",
};

/**
 * RedLabel — filled red badge used for timeline entries, team sections,
 * and category markers throughout the site.
 *
 * Design rationale:
 * - The red fill draws immediate attention and visually anchors section labels
 *   to the brand colour without using an underline or border.
 * - Extracting it into a component prevents four slightly-different variants
 *   of the same red box from appearing across different pages.
 */
export default function RedLabel({ children, size = "md" }: RedLabelProps) {
  return (
    <span
      className={`inline-block bg-[#c21c1c] text-white font-semibold uppercase tracking-wide ${sizeMap[size]}`}
    >
      {children}
    </span>
  );
}
