"use client";

import { useState } from "react";
import Image from "next/image";

type TeamSectionData = {
  id: string;
  name: string;
  subtitle: string;
  description1: string;
  description2: string;
  imageSrc: string;
  cardImageSrc: string; // small card thumbnail
  cardDescription: string;
};

type ExpandableTeamSectionProps = {
  teams: TeamSectionData[];
};

/**
 * ExpandableTeamSection — accordion-style team cards for the Join Us page.
 *
 * Design rationale:
 * - The original page had each team's full description in a repeated
 *   full-width section that required scrolling past all teams even if you
 *   only cared about one. An accordion collapses irrelevant content and
 *   makes the page scannable.
 * - The explore-cards grid at the top shows all four teams at a glance with
 *   a thumbnail and short description. Clicking one opens the detail panel
 *   inline below the grid — this is the "progressive disclosure" pattern:
 *   show a summary, let the user request more detail.
 * - The expanded panel uses a smooth max-height transition (via Tailwind
 *   `transition-all duration-300`) because CSS transitions on `height` require
 *   a known target value. `max-height: 9999px` is a common workaround that
 *   creates a smooth opening effect without JavaScript height calculation.
 */
export default function ExpandableTeamSection({ teams }: ExpandableTeamSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const toggle = (id: string) => setActiveId((prev) => (prev === id ? null : id));
  const active = teams.find((t) => t.id === activeId);

  return (
    <div className="flex flex-col gap-8">
      {/* ── Explore cards grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => toggle(team.id)}
            className={`group text-left flex flex-col rounded-lg overflow-hidden transition-all duration-200 ${
              activeId === team.id
                ? "ring-2 ring-[#c21c1c]"
                : "ring-1 ring-[#374151] hover:ring-[#c21c1c]"
            }`}
          >
            {/* Card thumbnail */}
            <div className="relative aspect-video w-full">
              <Image
                src={team.cardImageSrc}
                alt={team.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                quality={90}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40" />
              <span className="absolute bottom-3 left-3 bg-[#c21c1c] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wide">
                {team.name}
              </span>
            </div>
            {/* Card text */}
            <div className="p-4 bg-[#1a1a1a] flex-1">
              <p className="text-gray-300 text-sm leading-relaxed">{team.cardDescription}</p>
              <span className="mt-3 inline-block text-[#c21c1c] text-xs font-semibold">
                {activeId === team.id ? "Close ↑" : "Learn more ↓"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Expanded detail panel ── */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          active ? "max-h-[9999px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {active && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#1a1a1a] rounded-lg p-8 items-center">
            {/* Text side */}
            <div className="flex flex-col gap-4">
              <span className="inline-block bg-[#c21c1c] text-white text-sm font-semibold px-4 py-2 uppercase tracking-wide w-fit">
                {active.name}
              </span>
              <h3 className="text-2xl font-bold text-white">{active.subtitle}</h3>
              <p className="text-gray-300 leading-relaxed">{active.description1}</p>
              <p className="text-gray-400 leading-relaxed">{active.description2}</p>
            </div>
            {/* Image side */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
              <Image
                src={active.imageSrc}
                alt={active.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
