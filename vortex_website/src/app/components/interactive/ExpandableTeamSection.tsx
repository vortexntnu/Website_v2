"use client";

import { useState } from "react";
import Image from "next/image";

type SubTeam = {
  name: string;
  description: string;
};

type TeamSectionData = {
  id: string;
  name: string;
  subtitle: string;
  description1: string;
  description2?: string;
  imageSrc: string;
  cardImageSrc: string;
  cardDescription: string;
  subTeams?: SubTeam[];
};

type ExpandableTeamSectionProps = {
  teams: TeamSectionData[];
};

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
          <div className="flex flex-col gap-8 bg-[#1a1a1a] rounded-lg p-8">
            {/* Top: text + image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-4">
                <span className="inline-block bg-[#c21c1c] text-white text-sm font-semibold px-4 py-2 uppercase tracking-wide w-fit">
                  {active.name}
                </span>
                <h3 className="text-2xl font-bold text-white">{active.subtitle}</h3>
                <p className="text-gray-300 leading-relaxed">{active.description1}</p>
                {active.description2 && (
                  <p className="text-gray-400 leading-relaxed">{active.description2}</p>
                )}
              </div>
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

            {/* Sub-teams */}
            {active.subTeams && active.subTeams.length > 0 && (
              <div className="border-t border-[#374151] pt-8">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#c21c1c] mb-6">
                  Sub-teams
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {active.subTeams.map((sub) => (
                    <div
                      key={sub.name}
                      className="bg-[#262626] border border-[#374151] p-5 rounded-lg flex flex-col gap-2 w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                    >
                      <h5 className="text-white font-semibold text-lg">{sub.name}</h5>
                      <p className="text-gray-400 text-base leading-relaxed">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
