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

// Academic year shown on the team page.
const years = ["2025/2026"];

function makeMember(name: string, role: string, imageSrc?: string): TeamMember {
  return {
    name,
    role,
    ...(imageSrc ? { imageSrc } : {}),
    // linkedinHref: "https://linkedin.com",
    
  };
}

const subTeams: SubTeam[] = [
  {
    id: "board",
    name: "The Board",
    description: "Sets strategy, manages resources, and ensures the whole organisation moves as one unit.",
    members: [
      makeMember("Andreas Skagen", "Project Manager / Chairman of the Board", "/images/jpg/Board Andreas Skagen.jpg"),
      makeMember("Alvar Guddingsmo", "Chief Technical Officer Hardware / Member of the Board", "/images/jpg/Alvar_edited.jpg"),
      makeMember("Axel Robert Olivier Jenssen", "Chief Financial Officer / Member of the Board", "/images/jpg/Board  Axel Robert Olivier Jenssen.jpg"),
      makeMember("Jørgen Fjermedal", "Chief Technical Officer Software / Member of the Board", "/images/jpg/Board Jørgen Fjermedal.jpg"),
      makeMember("Lasse Johansen", "Deputy Project Manager / Deputy Chair of the Board", "/images/jpg/Board Lasse Johansen.jpg"),
      makeMember("Yatavi Suresh", "Marketing Lead / Member of the Board", "/images/jpg/Marketing Lead and Board Yatavi Suresh.jpg"),
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "We are responsible for all the electronics and thereby they work with PCB and circuit design, which the vessel's functionality depends greatly on. Power supply solution, signal processing and acoustics are key tasks we work with as well.",
    members: [
      makeMember("Tormod Kleiv Von Haffenbrädl", "Leader of Electrical Group", "/images/jpg/Electronics Lead Tormod Kleiv Von Haffenbradl name.jpg"),
      makeMember("Birk Simen Geitanger Bønes", "Member of Electronics", "/images/jpg/Electronics Birk Simen Geitanger Bønes.jpg"),
      makeMember("Endre Fotland", "Member of Electronics", "/images/jpg/Electronics Endre Fotland.jpg"),
      makeMember("Erlend Langeggen", "Member of Electronics", "/images/jpg/Electronics Erlend Langeggen.jpg"),
      makeMember("Fredrik Flo", "Member of Electronics", "/images/jpg/Electronics Fredrik Flo.jpg"),
      makeMember("Oliver Bormark Sæther", "Member of Electronics", "/images/jpg/Electronics Oliver Børmark Sæther.jpg"),
      makeMember("Peder Anton Rustadbakken", "Member of Electronics", "/images/jpg/Electronics Peder Anton Rustadbakken.jpg"),
      makeMember("Vikingur Sigurdsson", "Member of Electronics / Member of Embedded", "/images/jpg/Electronics Vikingur Sigurdsson.jpg"),
      makeMember("Øystein Romundstad Gjessing", "Member of Electronics", "/images/jpg/Electronics Øystein Romundstad Gjessing.jpg"),
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical",
    description: "We work with 3D modeling in CAD & SolidWorks; developing the physical parts of the vessels. Essentially, we combine fluid statics with bright solutions to develop a stable and safe vehicle which will perform to the best of its abilities.",
    members: [
      makeMember("Nora Aasbo Heiberg", "Leader of Mechanical Group", "/images/jpg/Mechanical Lead Nora Aasbø Heiberg.jpg"),
      makeMember("Eirik Skage", "Member of Mechanical", "/images/jpg/Mechanical Eirik Skage.jpg"),
      makeMember("Igor Nachman", "Member of Mechanical", "/images/jpg/Mechanical Igor Nachman.jpg"),
      makeMember("Levi Ivan Wangensteen", "Member of Mechanical", "/images/jpg/Mechancial and Marketing Levi Ivan Wangensteen.jpg"),
      makeMember("Luckra Yaempryong", "Member of Mechanical", "/images/jpg/Mechanical Lucknara Yaemprayong.jpg"),
      makeMember("Martine Solberg", "Member of Mechanical", "/images/jpg/Mechanical Martine Solberg.jpg"),
      makeMember("Niclas Svardal", "Member of Mechanical", "/images/jpg/GUI Niclas Svardal.jpg"),
      makeMember("Simen Lund Gronli", "Member of Mechanical", "/images/jpg/Mechanical Simen Lund Grønli.jpg"),
      makeMember("Torkil Sand Torvanger", "Member of Mechanical", "/images/jpg/Mechanical Torkil Sand Torvanger.jpg"),
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "The Web Development Team is responsible for maintaining and developing Vortex's website. We ensure it functions smoothly, stays updated, and reflects Vortex's activities and identity in a professional way. The team is currently transitioning from Wix to a fully self-developed solution using React and TypeScript for the frontend and PocketBase for the backend. This shift allows us to have greater flexibility, control, and scalability in developing the website further.",
    members: [
      makeMember("Weixin Lu", "Leader of Web Development Group / Member of Marketing", "/images/jpg/Marketing Weixin Lu.jpg"),
      makeMember("Ashish Bhardwaj", "Member of Web Development", "/images/jpg/Ashish_edited.jpg"),
      makeMember("Biraveen Gnanasampanthan", "Member of Web Development", "/images/jpg/Biraveen_edited.jpg"),
      makeMember("Ricardo Sonda Guiraudeli", "Member of Web Development", "/images/jpg/Ricardo_edited.jpg"),
    ],
  },
  {
    id: "software",
    name: "Software",
    description: "Develops core software systems, architecture, tooling, and integrations that support Vortex's autonomous vehicles and team workflows.",
    members: [
      makeMember("Tristan E. Wolfram", "Software Lead", "/images/jpg/Tristian_edited.jpg"),
    ],
  },
  {
    id: "control",
    name: "Control",
    description: "The control group develops the algorithms that govern the vehicle's physical behavior. They create custom controllers that translate autonomous commands and sensor data into precise thrust allocation and steering, ensuring safe and reliable maneuvering in all six degrees of freedom.",
    members: [
      makeMember("Cyprian Osinski", "Leader of Control Group", "/images/jpg/Control Lead Cyprian Pawel Osinski.jpg"),
      makeMember("Ahmed Borchani", "Member of Control", "/images/jpg/Control Ahmed Borchani.jpg"),
      makeMember("Akira Techapattaraporn", "Member of Control", "/images/jpg/Control Akira Techapattaraporn.jpg"),
      makeMember("Anbit Adhikari", "Member of Control", "/images/jpg/Control Anbit Adhikari.jpg"),
      makeMember("Filip Nilsen", "Member of Control", "/images/jpg/Control Filip Nilsen.jpg"),
      makeMember("Henrik Mæland Haakenaasen", "Member of Control", "/images/jpg/Control Henrik Mæland Haakenaasen.jpg"),
      makeMember("Patrick A. Sheehan", "Member of Control", "/images/jpg/Pat_edited.jpg"),
      makeMember("Thomas Paulsen", "Member of Control", "/images/jpg/Control THomas Paulsen.jpg"),
    ],
  },
  {
    id: "autonomy",
    name: "Autonomy",
    description: "We design, implement, test and tune controllers and path following algorithms for the drones, with the aim of making our AUV and ASV autonomous.",
    members: [
      makeMember("Jorgen Fjermedal", "CTO Software / Member of the Board", "/images/jpg/Jørgen Fjermedal_edited.jpg"),
      makeMember("Hinthujan Thigarajah", "Member of Autonomy", "/images/jpg/Autonomy Hinthujan Thigarajah.jpg"),
      makeMember("Sina Aanstad", "Member of Autonomy", "/images/jpg/Autonomy Sina Aanstad.jpg"),
    ],
  },
  {
    id: "perception",
    name: "Perception",
    description: "The Perception team ensures our drones perceive their surroundings. They work with sonar, lidar and cameras with the goal of performing object detection, target tracking as well as mapping the environment.",
    members: [
      makeMember("Andreas Kluge Svendsrud", "Leader of Perception Group", "/images/jpg/Perception Lead Andreas Kluge Svendsrud.jpg"),
      makeMember("Anton Tran", "Member of Perception", "/images/jpg/Perception Anton Tran.jpg"),
      makeMember("Gard Eltvik Gronnerod", "Member of Perception", "/images/jpg/Perception Gard Eltvik Grønnerød.jpg"),
      makeMember("Jens Christian Aanestad", "Member of Perception", "/images/jpg/Perception Jens Christian Aanestad.jpg"),
      makeMember("Mads Engesvoll", "Member of Perception", "/images/jpg/Perception Mads Engesvoll.jpg"),
      makeMember("Ole Agaton Ellingsberg Helmers", "Member of Perception", "/images/jpg/Perception Ole Agaton Ellingsberg Helmers.jpg"),
      makeMember("Sophia Mina Friedensburg", "Member of Perception", "/images/jpg/Perception Sophia Mina Friedensburg.jpg"),
    ],
  },
  {
    id: "embedded",
    name: "Embedded",
    description: "Develops firmware and low-level software for onboard electronics, communication, and real-time systems.",
    members: [
      makeMember("Alvar Guddingsmo", "Embedded Lead", "/images/jpg/Alvar_edited.jpg"),
    ],
  },
  {
    id: "admin",
    name: "Admin",
    description: "The Admin & Logistics team ensures that Vortex NTNU runs smoothly behind the scenes. We handle organization wide coordination, internal communication, and practical logistics to support all technical and operational teams. Our goal is to reduce the administrative load on team leads, maintain efficient workflows, and secure continuity between project years.",
    members: [
      makeMember("Lasse Johansen", "Deputy Project Manager / Deputy Chair of the Board", "/images/jpg/Board Lasse Johansen.jpg"),
      makeMember("Ole Alexander Vimo Herrem", "Member of Admin", "/images/jpg/Admin Ole Alexander Vimo Herrem.jpg"),
      makeMember("Ravn Nordling Tonnesen", "Member of Admin", "/images/jpg/Admin Ravn Nordling Tønnesen.jpg"),
      makeMember("Waldemar Riiser", "Member of Admin", "/images/jpg/Admin Waldemar Riiser.jpg"),
    ],
  },
  {
    id: "gui",
    name: "GUI",
    description: "The GUI group designs and develops the interfaces that allow operators to interact seamlessly with our vehicle's systems. They transform complex data streams into intuitive visual displays, enabling real-time monitoring, control, and diagnostics.",
    members: [
      makeMember("Jorgen Fjermedal", "CTO Software / Member of the Board", "/images/jpg/Jørgen Fjermedal_edited.jpg"),
      makeMember("Eirik Stokker Aksdal", "Member of GUI", "/images/jpg/GUI Eirik Stokker Aksdal.jpg"),
      makeMember("Jonas Rundfloen", "Member of GUI", "/images/jpg/GUI Jonas Rundfloen.jpg"),
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Vortex's marketing team promotes the organization's brand, projects, and members. They manage the brand image, create content, handle social media and public relations, and also design the website. Their efforts boost engagement, increase organizational awareness, and drive growth.",
    members: [
      makeMember("Yatavi Suresh", "Leader of Marketing Group / Member of the Board", "/images/jpg/Marketing Lead and Board Yatavi Suresh.jpg"),
      makeMember("Iver Haddal", "Member of Marketing", "/images/jpg/Marketing Iver Haddal.jpg"),
      makeMember("Julie Qiao Hall", "Member of Marketing", "/images/jpg/Marketing Julie Hall.jpg"),
      makeMember("Weixin Lu", "Member of Marketing / Leader of Web Development", "/images/jpg/Marketing Weixin Lu.jpg"),
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
          src="/images/competitions/orca-team.jpg"
          alt={`${activeTeam.name} team ${activeYear}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
          quality={90}
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
