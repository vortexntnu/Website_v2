"use client";

/*
 * TeamPageClient — all the interactive state for the Team page.
 *
 * Why a separate Client Component?
 * - `team/page.tsx` is a Server Component so it can export `metadata`.
 *   Server Components cannot use React hooks.
 * - This wrapper holds the `useState` for activeYear and activeTab, and
 *   renders the selectors + member grid based on the selected values.
 * - Pattern: page.tsx (Server) → <TeamPageClient /> (Client with state)
 *
 * Data model:
 * - `years` is a flat list of year strings ("2026", "2025", …)
 * - `teams` maps year → array of sub-teams, each with a `members` array
 * - Selecting a year resets the active tab to the first tab in that year
 *
 * Design rationale for team names:
 * - Original tabs said "TEAM 1" … "TEAM 13" which is not descriptive.
 *   Real sub-team names (Leadership, Software, Mechanical, Electronics, etc.)
 *   tell visitors what each group actually does — important for recruitment.
 */

import { useState } from "react";
import Image from "next/image";
import YearSelector from "@/app/components/interactive/YearSelector";
import TeamTabSelector from "@/app/components/interactive/TeamTabSelector";
import TeamMemberCard from "@/app/components/ui/TeamMemberCard";
import type { TeamMember, SubTeam } from "@/app/lib/types";

// ── Static team data ──────────────────────────────────────────────────────────
// Replace with PocketBase fetch when backend is ready.

const years = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016"];

function makeMember(name: string, role: string, seed: string): TeamMember {
  return {
    name,
    role,
    imageSrc: `https://picsum.photos/seed/${seed}/400/400`,
    linkedinHref: "https://linkedin.com",
  };
}

const subTeams: SubTeam[] = [
  {
    id: "board",
    name: "The Board",
    description: "Sets strategy, manages resources, and ensures the whole organisation moves as one unit.",
    members: [
      makeMember("Patrick A. Sheehan", "Project Manager / Chairman", "board1"),
      makeMember("Sindre Mæhlum", "Deputy Project Manager", "board2"),
      makeMember("Åsmund Vetle Bru Nøkling", "CTO Hardware", "board3"),
      makeMember("Tristan E. Wolfram", "CTO Software", "board4"),
      makeMember("Emil S. Sylte", "Chief Financial Officer", "board5"),
      makeMember("Ingrid Nygård", "Marketing Lead", "board6"),
    ],
  },
  {
    id: "software",
    name: "Software",
    description: "Develops all autonomy software — control systems, SLAM, computer vision, navigation, and mission planning using ROS, Python, and C++.",
    members: [
      makeMember("Tristan E. Wolfram", "CTO Software", "sw1"),
      makeMember("Jørgen Fjermedal", "Situational Awareness Lead", "sw2"),
      makeMember("Anders S. Høgden", "Autonomous Systems Lead", "sw3"),
      makeMember("Andreas K. Svendsrud", "DevOps Lead", "sw4"),
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical",
    description: "Designs and manufactures all physical structures — from concept design to prototyping and assembly.",
    members: [
      makeMember("Åsmund Vetle Bru Nøkling", "CTO Hardware", "mech1"),
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Responsible for power distribution, wiring, communication buses, PCB design, and embedded systems.",
    members: [
      makeMember("Alvar Guddingsmo", "Electrical Team Leader", "elec1"),
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Manages brand, social media, sponsor relations, and external communications.",
    members: [
      makeMember("Ingrid Nygård", "Marketing Lead", "mkt1"),
    ],
  },
];

// For simplicity all years show the same sub-teams. In production, fetch
// year-specific rosters from PocketBase.
const teamsByYear: Record<string, SubTeam[]> = Object.fromEntries(
  years.map((y) => [y, subTeams])
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function TeamPageClient() {
  const [activeYear, setActiveYear] = useState(years[0]);
  const [activeTabId, setActiveTabId] = useState(subTeams[0].id);

  const currentTeams = teamsByYear[activeYear] ?? subTeams;
  const tabs = currentTeams.map((t) => ({ id: t.id, label: t.name.toUpperCase() }));
  const activeTeam = currentTeams.find((t) => t.id === activeTabId) ?? currentTeams[0];

  const handleYearSelect = (year: string) => {
    setActiveYear(year);
    // Reset tab to first when switching years
    setActiveTabId(teamsByYear[year]?.[0]?.id ?? subTeams[0].id);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col gap-10">
      {/* Year selector */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
          Browse by Year
        </p>
        <YearSelector
          years={years}
          activeYear={activeYear}
          onSelect={handleYearSelect}
        />
      </div>

      {/* Sub-team tab selector */}
      <TeamTabSelector
        tabs={tabs}
        activeTab={activeTabId}
        onSelect={setActiveTabId}
      />

      {/* Team photo */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/team${activeYear}${activeTabId}/1200/600`}
          alt={`${activeTeam.name} team ${activeYear}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="bg-[#c21c1c] text-white text-sm font-semibold px-4 py-1.5 uppercase tracking-wide">
            {activeYear} — {activeTeam.name}
          </span>
        </div>
      </div>

      {/* Team description */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Meet the team</h2>
        <p className="text-gray-400 max-w-2xl">{activeTeam.description}</p>
      </div>

      {/* Member cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {activeTeam.members.map((member) => (
          <TeamMemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            imageSrc={member.imageSrc}
            linkedinHref={member.linkedinHref}
          />
        ))}
      </div>
    </div>
  );
}
