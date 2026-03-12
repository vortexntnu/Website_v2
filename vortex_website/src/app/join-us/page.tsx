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
    body: "Put theory into practice by designing and building autonomous underwater and surface vehicles. Work with ROS, PCB design, CAD, machine learning, and more.",
  },
  {
    icon: "🌊",
    title: "International Stage",
    body: "Compete at RoboSub in the USA and TAC Challenge in Trondheim. In 2024, we won 1st place at TAC Challenge after 4 years of participation.",
  },
  {
    icon: "🤝",
    title: "Collaborative Community",
    body: "50+ members from 20+ study programs. Develop yourself as both an engineer and team member through hands-on collaboration.",
  },
];

const teams = [
  {
    id: "software",
    name: "Software",
    subtitle: "The Brains of the Operation",
    cardDescription: "Develops control systems, SLAM, computer vision, and mission planning.",
    description1:
      "You will learn how to use the Robot Operating System (ROS) with Python and C++ to develop code for a highly advanced and robust platform, and how to test, deploy, and verify your code as part of a software team. Work includes control systems design, SLAM, computer vision and object detection, embedded software design, and underwater acoustic communication.",
    description2:
      "The Autonomous Systems sub-team designs and implements guidance and navigation stacks, fusing sensors such as GNSS, UGPS, DVL, and IMU, and develops mission planning schemes for competitions. Experience with Linux and robotics is helpful but not required — we teach from scratch.",
    cardImageSrc: "https://picsum.photos/seed/swcard/600/400",
    imageSrc: "https://picsum.photos/seed/swdetail/800/500",
  },
  {
    id: "mechanical",
    name: "Mechanical",
    subtitle: "The Backbone of the Drones",
    cardDescription: "Responsible for all physical structures — from concept design to assembly.",
    description1:
      "As a member of the mechanical team you will be responsible for all physical structures in our drones, including the entire process from concept design to prototyping and assembly of the final product.",
    description2:
      "We use materials ranging from aluminium and acrylic to 3D-printed PLA and carbon fibre. If you enjoy making things with your hands as much as designing them on a screen, this is your team.",
    cardImageSrc: "https://picsum.photos/seed/mechcard/600/400",
    imageSrc: "https://picsum.photos/seed/mechdetail/800/500",
  },
  {
    id: "electronics",
    name: "Electronics",
    subtitle: "The Nervous System",
    cardDescription: "Designs PCBs, power distribution, wiring, and embedded systems.",
    description1:
      "The electronics group is responsible for the power distribution, wiring, and communication buses in our drones. As part of the electronics team you will either design PCBs, utilise waterproof connections to enable power distribution and communication across different modules, or be responsible for embedded systems design.",
    description2:
      "You will use KiCad for PCB design, STM32 microcontrollers for embedded firmware, and a variety of test equipment (oscilloscopes, multimeters, logic analysers). Experience in PCB design or embedded C is a plus.",
    cardImageSrc: "https://picsum.photos/seed/eleccard/600/400",
    imageSrc: "https://picsum.photos/seed/elecdetail/800/500",
  },
  {
    id: "marketing",
    name: "Marketing",
    subtitle: "Our Voice to the World",
    cardDescription: "Markets the organisation with creative freedom — bold and creative individuals welcome.",
    description1:
      "The marketing group has a lot of freedom to market how they want, and we are excited to invite bold and creative individuals to apply, so that we can take our profile to new levels.",
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
