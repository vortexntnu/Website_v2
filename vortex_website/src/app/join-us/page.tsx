import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "@/app/components/ui/HeroSection";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ExpandableTeamSection from "@/app/components/interactive/ExpandableTeamSection";

/*
 * Join Us page — recruitment and team exploration.
 *
 * Section layout:
 *   1. Hero             — strong CTA heading + application button
 *   2. Why Vortex       — 3 reason tiles
 *   3. Explore teams    — expandable accordion of 4 sub-teams (Client Component)
 *
 * Design rationale:
 *
 * ACCORDION vs REPEATED SECTIONS: The original page had each team's full
 * description in a long vertical section — visitors had to scroll past all
 * teams even if they only cared about one. An accordion pattern (progressive
 * disclosure) shows a thumbnail grid first, then reveals the selected team's
 * detail inline. This reduces page length by ~70% while making each team's
 * content more focused and readable.
 *
 * WHY VORTEX TILES: Visitors who land on a recruitment page need quick answers
 * to "what do I get out of this?" before they'll read detailed team descriptions.
 * Three concise benefit tiles address the three most common questions:
 *   - Real experience (not just coursework)
 *   - Community (team culture)
 *   - Impact (international stage)
 *
 * HERO CTA BUTTON links to /contact rather than an external form. This keeps
 * the conversion path within the site and lets the contact page provide full
 * context. When an application form is built, update this href.
 */

export const metadata: Metadata = {
  title: "Join Us — Vortex NTNU",
  description: "Apply to join Vortex NTNU — Norway's leading student underwater robotics team.",
};

const whyVortex = [
  {
    icon: "⚙️",
    title: "Real Engineering",
    body: "Build hardware that dives to competition depth, runs autonomously, and gets torn down and rebuilt every year. No toy projects.",
  },
  {
    icon: "🌊",
    title: "International Stage",
    body: "Compete at RoboSub in San Diego and TAC Challenge in Trondheim. Represent Norway on a global engineering platform.",
  },
  {
    icon: "🤝",
    title: "Tight-knit Community",
    body: "100+ members across all study levels. Weekly meetings, regular socials, and a network that lasts well beyond graduation.",
  },
];

const teams = [
  {
    id: "software",
    name: "Software",
    subtitle: "The Brains of the Operation",
    cardDescription: "Develops autonomy, computer vision, and mission planning for the AUV.",
    description1:
      "The software team is responsible for everything that makes the AUV autonomous — from the low-level ROS 2 driver nodes that talk to sensors and thrusters, to the high-level mission planner that decides what to do next in the competition pool.",
    description2:
      "You will work with Python, C++, OpenCV, and ROS 2. Experience with Linux and robotics is helpful but not required — we teach from scratch. We value curiosity and persistence over existing skill.",
    cardImageSrc: "https://picsum.photos/seed/swcard/600/400",
    imageSrc: "https://picsum.photos/seed/swdetail/800/500",
  },
  {
    id: "mechanical",
    name: "Mechanical",
    subtitle: "The Backbone of the AUV",
    cardDescription: "Designs, manufactures, and tests the hull, thruster mounts, and mechanical systems.",
    description1:
      "The mechanical team translates design requirements into physical hardware. You will design parts in CAD (SolidWorks or Fusion 360), manufacture them in NTNU's workshop, and test them for waterproofness and structural integrity.",
    description2:
      "We use materials ranging from aluminium and acrylic to 3D-printed PLA and carbon fibre. If you enjoy making things with your hands as much as designing them on a screen, this is your team.",
    cardImageSrc: "https://picsum.photos/seed/mechcard/600/400",
    imageSrc: "https://picsum.photos/seed/mechdetail/800/500",
  },
  {
    id: "electronics",
    name: "Electronics",
    subtitle: "The Nervous System",
    cardDescription: "Designs PCBs, power distribution, and all embedded systems.",
    description1:
      "The electronics team designs and builds all the custom circuit boards that run inside the AUV — from the main computer carrier board to the power management module and the thruster ESC board.",
    description2:
      "You will use KiCad for PCB design, STM32 microcontrollers for embedded firmware, and a variety of test equipment (oscilloscopes, multimeters, logic analysers). Experience in PCB design or embedded C is a plus.",
    cardImageSrc: "https://picsum.photos/seed/eleccard/600/400",
    imageSrc: "https://picsum.photos/seed/elecdetail/800/500",
  },
  {
    id: "marketing",
    name: "Marketing",
    subtitle: "Our Voice to the World",
    cardDescription: "Manages brand, social media, sponsor relations, and external communications.",
    description1:
      "The marketing team ensures that Vortex has the funding and visibility to operate at a high level. This means managing relationships with our sponsors, creating content for social media, designing graphics, and writing reports.",
    description2:
      "You do not need to be an engineer to join Vortex. Marketing students, communication students, and anyone with a passion for storytelling and design are just as welcome as coders and welders.",
    cardImageSrc: "https://picsum.photos/seed/mktcard/600/400",
    imageSrc: "https://picsum.photos/seed/mktdetail/800/500",
  },
];

export default function JoinUsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="https://picsum.photos/seed/joinushero/1920/1080"
        heading="Join The Team!"
        subheading="Applications are open for the 2027 generation. All study levels and backgrounds welcome."
        align="center"
        height="xl"
        overlay={0.65}
        cta={{ label: "APPLY NOW", href: "/contact" }}
      />

      {/* Team Lead application CTA strip */}
      <div className="bg-[#1a1a1a] border-b border-[#374151] py-5">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-300 text-sm">
            Interested in leading a team? Team Lead applications for 2027 are now open.
          </p>
          <Link
            href="/contact"
            className="bg-[#c21c1c] hover:bg-[#dc2626] text-white text-sm font-semibold px-6 py-2 transition-colors duration-200 whitespace-nowrap"
          >
            Team Lead Application →
          </Link>
        </div>
      </div>

      {/* ── 2. Why Vortex ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="Why Join?"
            title="What you get from Vortex"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyVortex.map((item) => (
              <div
                key={item.title}
                className="bg-[#1a1a1a] rounded-lg p-8 flex flex-col gap-4 text-center items-center"
              >
                <span className="text-4xl" role="img" aria-label={item.title}>
                  {item.icon}
                </span>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Explore teams ── */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="Our Teams"
            title="Explore our different teams"
            subtitle="Click any team card to read more about what they do and who they're looking for."
          />
          <div className="mt-10">
            <ExpandableTeamSection teams={teams} />
          </div>
        </div>
      </section>
    </>
  );
}
