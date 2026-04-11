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

// Academic years, 3 years back from current (e.g. "2025/2026", "2024/2025", "2023/2024")
const currentCalendarYear = new Date().getFullYear();
const years = Array.from({ length: 3 }, (_, i) => {
  const end = currentCalendarYear - i;
  return `${end - 1}/${end}`;
});

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
    id: "electronics",
    name: "Electronics",
    description: "We are responsible for all the electronics  and thereby they work with PCB and circuit design, which the vessel's functionality depends greatly on. Power supply solution, signal processing and acoustics are key tasks we work with as well.",
    members: [
      makeMember("Alvar Guddingsmo", "Electrical Team Leader", "elec1"),
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical",
    description: "We work with 3D modeling in CAD & SolidWorks; developing the physical parts of the vessles.  Essentially, we combine fluid statics with bright solutions to develop a stable and safe vehicle which will perform to the best of its abilities.",
    members: [
      makeMember("Åsmund Vetle Bru Nøkling", "CTO Hardware", "mech1"),
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "The Web Development Team is responsible for maintaining and developing Vortex’s website. We ensure it functions smoothly, stays updated, and reflects Vortex’s activities and identity in a professional way. The team is currently transitioning from Wix to a fully self-developed solution using React and TypeScript for the frontend and PocketBase for the backend. This shift allows us to have greater flexibility, control, and scalability in developing the website further.",
    members: [
      makeMember("Ingrid Nygård", "Web Development Lead", "web1"),
    ],
  },
  {
    id: "software",
    name: "Software",
    description: "Develops core software systems, architecture, tooling, and integrations that support Vortex's autonomous vehicles and team workflows.",
    members: [
      makeMember("Tristan E. Wolfram", "Software Lead", "sw1"),
    ],
  },
  {
    id: "control",
    name: "Control",
    description: "The control group develops the algorithms that govern the vehicle's physical behavior. They create custom controllers that translate autonomous commands and sensor data into precise thrust allocation and steering, ensuring safe and reliable maneuvering in all six degrees of freedom.",
    members: [
      makeMember("Anders S. Høgden", "Control Lead", "ctrl1"),
    ],
  },
  {
    id: "autonomy",
    name: "Autonomy",
    description: "We design, implement, test and tune controllers and path following algorithms for the drones, with the aim of making our AUV and ASV autonomous.",
    members: [
      makeMember("Tristan E. Wolfram", "Autonomy Lead", "auto1"),
    ],
  },
  {
    id: "perception",
    name: "Perception",
    description: "Builds sensor fusion and computer vision pipelines to understand the environment in real time.",
    members: [
      makeMember("Jørgen Fjermedal", "Perception Lead", "perc1"),
    ],
  },
  {
    id: "embedded",
    name: "Embedded",
    description: "Develops firmware and low-level software for onboard electronics, communication, and real-time systems.",
    members: [
      makeMember("Alvar Guddingsmo", "Embedded Lead", "emb1"),
    ],
  },
  {
    id: "admin",
    name: "Admin",
    description: "Coordinates organization, planning, logistics, and operations to keep all teams aligned and effective.",
    members: [
      makeMember("Sindre Mæhlum", "Admin Lead", "admin1"),
    ],
  },
  {
    id: "gui",
    name: "GUI",
    description: "The Percetion team ensures our drones perceive their surroundings. They work with sonar, lidar and cameras with the goal of performing object detection, target tracking as well as mapping the environment.",
    members: [
      makeMember("Andreas K. Svendsrud", "GUI Lead", "gui1"),
    ],
  },
 {
    id: "marketing",
    name: "Marketing",
    description: "Vortex’s marketing team promotes the organization’s brand, projects, and members. They manage the brand image,  create content, handle social media, and public relations, and also design the website. Their efforts boost engagement, increase organizational awareness, and drive growth.",
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

      {/* Team description */}
      <div>
        <p className="text-gray-400 max-w-2xl">{activeTeam.description}</p>
      </div>

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
