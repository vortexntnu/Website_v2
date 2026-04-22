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
    photoSrc: "/images/team-photos/Board-team-spring-2026.jpg",
    members: [
      makeMember("Andreas Skagen", "Project Manager / Chairman of the Board", "/images/members/Board Andreas Skagen.jpg"),
      makeMember("Alvar Guddingsmo", "Chief Technical Officer Hardware / Member of the Board", "/images/members/Alvar_edited.jpg"),
      { ...makeMember("Axel Robert Olivier Jenssen", "Chief Financial Officer / Member of the Board", "/images/members/Board  Axel Robert Olivier Jenssen.jpg"), objectPosition: "center 15%", imageScale: 1.1 },
      makeMember("Jørgen Fjermedal", "Chief Technical Officer Software / Member of the Board", "/images/members/Board Jørgen Fjermedal.jpg"),
      makeMember("Lasse Johansen", "Deputy Project Manager / Deputy Chair of the Board", "/images/members/Board Lasse Johansen.jpg"),
      makeMember("Yatavi Suresh", "Marketing Lead / Member of the Board", "/images/members/Marketing Lead and Board Yatavi Suresh.jpg"),
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "We are responsible for all the electronics and thereby they work with PCB and circuit design, which the vessel's functionality depends greatly on. Power supply solution, signal processing and acoustics are key tasks we work with as well.",
    photoSrc: "/images/team-photos/Electronics-team-spring-2026.jpg",
    members: [
      makeMember("Tormod Kleiv Von Haffenbrädl", "Leader of Electrical Group", "/images/members/Electronics Lead Tormod Kleiv Von Haffenbradl name.jpg"),
      makeMember("Birk Simen Geitanger Bønes", "Member of Electronics", "/images/members/Electronics Birk Simen Geitanger Bønes.jpg"),
      makeMember("Endre Fotland", "Member of Electronics", "/images/members/Electronics Endre Fotland.jpg"),
      makeMember("Erlend Langeggen", "Member of Electronics", "/images/members/Electronics Erlend Langeggen.jpg"),
      makeMember("Fredrik Flo", "Member of Electronics", "/images/members/Electronics Fredrik Flo.jpg"),
      makeMember("Oliver Bormark Sæther", "Member of Electronics", "/images/members/Electronics Oliver Børmark Sæther.jpg"),
      makeMember("Peder Anton Rustadbakken", "Member of Electronics", "/images/members/Electronics Peder Anton Rustadbakken.jpg"),
      makeMember("Vikingur Sigurdsson", "Member of Electronics / Member of Embedded", "/images/members/Electronics Vikingur Sigurdsson.jpg"),
      { ...makeMember("Øystein Romundstad Gjessing", "Member of Electronics", "/images/members/Electronics Øystein Romundstad Gjessing.jpg"), objectPosition: "center 20%", imageScale: 1.25 },
    ],
  },
  {
    id: "mechanical",
    name: "Mechanical",
    description: "We work with 3D modeling in CAD & SolidWorks; developing the physical parts of the vessels. Essentially, we combine fluid statics with bright solutions to develop a stable and safe vehicle which will perform to the best of its abilities.",
    photoSrc: "/images/team-photos/Mechanical-team-spring-2026.jpg",
    members: [
      makeMember("Nora Aasbo Heiberg", "Leader of Mechanical Group", "/images/members/Mechanical Lead Nora Aasbø Heiberg.jpg"),
      makeMember("Eirik Skage", "Member of Mechanical", "/images/members/Mechanical Eirik Skage.jpg"),
      makeMember("Igor Nachman", "Member of Mechanical", "/images/members/Mechanical Igor Nachman.jpg"),
      makeMember("Levi Ivan Wangensteen", "Member of Mechanical", "/images/members/Mechancial and Marketing Levi Ivan Wangensteen.jpg"),
      makeMember("Luckra Yaempryong", "Member of Mechanical", "/images/members/Mechanical Lucknara Yaemprayong.jpg"),
      makeMember("Martine Solberg", "Member of Mechanical", "/images/members/Mechanical Martine Solberg.jpg"),
      makeMember("Niclas Svardal", "Member of Mechanical", "/images/members/GUI Niclas Svardal.jpg"),
      makeMember("Simen Lund Gronli", "Member of Mechanical", "/images/members/Mechanical Simen Lund Grønli.jpg"),
      { ...makeMember("Torkil Sand Torvanger", "Member of Mechanical", "/images/members/Mechanical Torkil Sand Torvanger.jpg"), objectPosition: "70% 20%", imageScale: 1.30 },
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "The Web Development Team is responsible for maintaining and developing Vortex's website. We ensure it functions smoothly, stays updated, and reflects Vortex's activities and identity in a professional way. The team is currently transitioning from Wix to a fully self-developed solution using React and TypeScript for the frontend and PocketBase for the backend. This shift allows us to have greater flexibility, control, and scalability in developing the website further.",
    photoSrc: "/images/team-photos/Web-team-spring-2026.jpg",
    members: [
      makeMember("Weixin Lu", "Leader of Web Development Group / Member of Marketing", "/images/members/Marketing Weixin Lu.jpg"),
      makeMember("Ashish Bhardwaj", "Member of Web Development", "/images/members/Web Ashish Bhardwaj.jpg"),
      {...makeMember("Biraveen Gnanasampanthan", "Member of Web Development", "/images/members/Web Biraveen Gnanasampanthan.jpg"), objectPosition: "60% 20%"},
      makeMember("Ricardo Sonda Guiraudeli", "Member of Web Development", "/images/members/Web Ricardo Sonda Guiraudeli.jpg"),
    ],
  },
  {
    id: "control",
    name: "Control",
    description: "The control group develops the algorithms that govern the vehicle's physical behavior. They create custom controllers that translate autonomous commands and sensor data into precise thrust allocation and steering, ensuring safe and reliable maneuvering in all six degrees of freedom.",
    photoSrc: "/images/team-photos/Control-team-spring-2026.jpg",
    members: [
      makeMember("Cyprian Osinski", "Leader of Control Group", "/images/members/Control Lead Cyprian Pawel Osinski.jpg"),
      makeMember("Ahmed Borchani", "Member of Control", "/images/members/Control Ahmed Borchani.jpg"),
      makeMember("Akira Techapattaraporn", "Member of Control", "/images/members/Control Akira Techapattaraporn.jpg"),
      makeMember("Anbit Adhikari", "Member of Control", "/images/members/Control Anbit Adhikari.jpg"),
      makeMember("Filip Nilsen", "Member of Control", "/images/members/Control Filip Nilsen.jpg"),
      makeMember("Henrik Mæland Haakenaasen", "Member of Control", "/images/members/Control Henrik Mæland Haakenaasen.jpg"),
      makeMember("Patrick A. Sheehan", "Member of Control", "/images/members/Pat_edited.jpg"),
      { ...makeMember("Thomas Paulsen", "Member of Control", "/images/members/Control THomas Paulsen.jpg"), objectPosition: "center 20%", imageScale: 1.255 },
    ],
  },
  {
    id: "autonomy",
    name: "Autonomy",
    description: "We design, implement, test and tune controllers and path following algorithms for the drones, with the aim of making our AUV and ASV autonomous.",
    photoSrc: "/images/team-photos/Autonomy-team-spring-2026.jpg",
    members: [
      makeMember("Jorgen Fjermedal", "CTO Software / Member of the Board", "/images/members/Board Jørgen Fjermedal.jpg"),
      makeMember("Hinthujan Thigarajah", "Member of Autonomy", "/images/members/Autonomy Hinthujan Thigarajah.jpg"),
      makeMember("Sina Aanstad", "Member of Autonomy", "/images/members/Autonomy Sina Aanstad.jpg"),
    ],
  },
  {
    id: "perception",
    name: "Perception",
    description: "The Perception team ensures our drones perceive their surroundings. They work with sonar, lidar and cameras with the goal of performing object detection, target tracking as well as mapping the environment.",
    photoSrc: "/images/team-photos/Perception-team-spring-2026.jpg",
    members: [
      makeMember("Andreas Kluge Svendsrud", "Leader of Perception Group", "/images/members/Perception Lead Andreas Kluge Svendsrud.jpg"),
      makeMember("Anton Tran", "Member of Perception", "/images/members/Perception Anton Tran.jpg"),
      makeMember("Gard Eltvik Gronnerod", "Member of Perception", "/images/members/Perception Gard Eltvik Grønnerød.jpg"),
      makeMember("Jens Christian Aanestad", "Member of Perception", "/images/members/Perception Jens Christian Aanestad.jpg"),
      makeMember("Mads Engesvoll", "Member of Perception", "/images/members/Perception Mads Engesvoll.jpg"),
      makeMember("Ole Agaton Ellingsberg Helmers", "Member of Perception", "/images/members/Perception Ole Agaton Ellingsberg Helmers.jpg"),
      makeMember("Sophia Mina Friedensburg", "Member of Perception", "/images/members/Perception Sophia Mina Friedensburg.jpg"),
    ],
  },
  {
    id: "embedded",
    name: "Embedded Systems",
    description: "We are the architects of the drones' intelligence, developing and programming the core systems that enable communication between all onboard components. Our team designs and implements the low-level software that powers the sensors, controls, and decision-making processes, ensuring the AUV and ASV can autonomously perceive and navigate their environment.",
    photoSrc: "/images/team-photos/Embedded-team-spring-2026.jpg",
    members: [
      makeMember("Nathaniel Førrisdahl", "Leader of Embedded Systems Group", "/images/members/Embedded Lead Nathaniel Førrisdahl.jpg"),
      makeMember("Ali Sarikaya", "Member of Embedded", "/images/members/Embedded Ali Hahydar Sarikaya.jpg"),
      makeMember("Jonathan Skomsøy Hübertz", "Member of Embedded", "/images/members/Embedded Jonathan Hubertz name.jpg"),
      makeMember("Markus Sandvik", "Member of Embedded", "/images/members/Embedded Markus Sandvik.jpg"),
      makeMember("Rikke Schjønsby", "Member of Embedded", "/images/members/Embedded Rikke Schjønsby.jpg"),
      makeMember("Tommaso Chinello", "Member of Embedded", "/images/members/Embedded Tommaso Chinello.jpg"),
      makeMember("Vikingur Sigurdsson", "Member of Electronics / Member of Embedded", "/images/members/Electronics Vikingur Sigurdsson.jpg"),
    ],
  },
  {
    id: "admin",
    name: "Admin",
    description: "The Admin & Logistics team ensures that Vortex NTNU runs smoothly behind the scenes. We handle organization wide coordination, internal communication, and practical logistics to support all technical and operational teams. Our goal is to reduce the administrative load on team leads, maintain efficient workflows, and secure continuity between project years.",
    photoSrc: "/images/team-photos/Admin-team-spring-2026.jpg",
    members: [
      makeMember("Lasse Johansen", "Deputy Project Manager / Deputy Chair of the Board", "/images/members/Board Lasse Johansen.jpg"),
      makeMember("Ole Alexander Vimo Herrem", "Member of Admin", "/images/members/Admin Ole Alexander Vimo Herrem.jpg"),
      { ...makeMember("Ravn Nordling Tonnesen", "Member of Admin", "/images/members/Admin Ravn Nordling Tønnesen.jpg"), objectPosition: "60% 20%", imageScale: 1.34 },
      makeMember("Waldemar Riiser", "Member of Admin", "/images/members/Admin Waldemar Riiser.jpg"),
    ],
  },
  {
    id: "gui",
    name: "GUI",
    description: "The GUI group designs and develops the interfaces that allow operators to interact seamlessly with our vehicle's systems. They transform complex data streams into intuitive visual displays, enabling real-time monitoring, control, and diagnostics.",
    photoSrc: "/images/team-photos/GUI-team-spring-2026.jpg",
    members: [
      makeMember("Jorgen Fjermedal", "CTO Software / Member of the Board", "/images/members/Board Jørgen Fjermedal.jpg"),
      makeMember("Eirik Stokker Aksdal", "Member of GUI", "/images/members/GUI Eirik Stokker Aksdal.jpg"),
      makeMember("Jonas Rundfloen", "Member of GUI", "/images/members/GUI Jonas Rundfloen.jpg"),
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Vortex's marketing team promotes the organization's brand, projects, and members. They manage the brand image, create content, handle social media and public relations, and also design the website. Their efforts boost engagement, increase organizational awareness, and drive growth.",
    photoSrc: "/images/team-photos/Marketing-team-spring-2026.jpg",
    members: [
      makeMember("Yatavi Suresh", "Leader of Marketing Group / Member of the Board", "/images/members/Marketing Lead and Board Yatavi Suresh.jpg"),
      makeMember("Iver Haddal", "Member of Marketing", "/images/members/Marketing Iver Haddal.jpg"),
      { ...makeMember("Julie Qiao Hall", "Member of Marketing", "/images/members/Marketing Julie Hall.jpg"), objectPosition: "center 25%", imageScale: 1.18 },
      makeMember("Weixin Lu", "Member of Marketing / Leader of Web Development", "/images/members/Marketing Weixin Lu.jpg"),
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
          src={activeTeam.photoSrc ?? "/images/competitions/orca-team.jpg"}
          alt={`${activeTeam.name} team ${activeYear}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1280px"
          quality={90}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
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
            objectPosition={member.objectPosition}
            imageScale={member.imageScale}
          />
        ))}
      </div>
    </div>
  );
}
