import type { Metadata } from "next";
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
    title: "Real Engineering",
    body: "Put theory into practice by designing and building autonomous underwater and surface vehicles. Work with ROS, PCB design, CAD, machine learning, and more.",
  },
  {
    title: "International Stage",
    body: "Compete at RoboSub in the USA and TAC Challenge in Trondheim. In 2024, we won 1st place at TAC Challenge after 4 years of participation.",
  },
  {
    title: "Collaborative Community",
    body: "50+ members from 20+ study programs. Develop yourself as both an engineer and team member through hands-on collaboration.",
  },
];

const teams = [
  {
    id: "software",
    name: "Software",
    subtitle: "The Brains of the Operation",
    cardDescription: "Building the systems that let our vehicles think, see, navigate, and act autonomously.",
    description1:
      "The software team builds the code that makes our drones think, perceive, and act. Working with ROS, Python, and C++, the team spans five specializations — from low-level embedded systems to high-level autonomy stacks and operator interfaces.",
    cardImageSrc: "/images/teams/software-coding.png",
    imageSrc: "/images/teams/simulation.png",
    subTeams: [
      {
        name: "Control",
        description:
          "The control group develops the algorithms that govern the vehicle's physical behavior. They create custom controllers that translate autonomous commands and sensor data into precise thrust allocation and steering, ensuring safe and reliable maneuvering in all six degrees of freedom.",
      },
      {
        name: "Autonomy",
        description:
          "We design, implement, test, and tune controllers and path-following algorithms for the drones, with the aim of making our AUV fully autonomous.",
      },
      {
        name: "Perception",
        description:
          "The perception team ensures our drones perceive their surroundings. They work with sonar, lidar, and cameras with the goal of performing object detection, target tracking, and environment mapping.",
      },
      {
        name: "Embedded",
        description:
          "We are the architects of the drones' intelligence, developing the core systems that enable communication between all onboard components. Our team implements the low-level software that powers the sensors, controls, and decision-making processes.",
      },
      {
        name: "GUI",
        description:
          "The GUI group designs and develops the interfaces that allow operators to interact seamlessly with our vehicle's systems. They transform complex data streams into intuitive visual displays, enabling real-time monitoring, control, and diagnostics.",
      },
    ],
  },
  {
    id: "hardware",
    name: "Hardware",
    subtitle: "The Body and Nervous System",
    cardDescription: "Builds the physical structure and electronics of our vehicles. Everything from hull design to PCB layout.",
    description1:
      "The hardware team is responsible for the physical form and electronic soul of our vehicles. From CAD models and composite structures to PCB design and power systems, they turn engineering concepts into water-ready machines.",
    cardImageSrc: "/images/teams/mechanical-working.png",
    imageSrc: "/images/teams/mechanical-beluga.png",
    subTeams: [
      {
        name: "Mechanical",
        description:
          "We work with 3D modelling in CAD and SolidWorks, developing the physical parts of the vessels. We combine fluid statics with practical engineering to develop a stable and safe vehicle that performs to the best of its abilities.",
      },
      {
        name: "Electronics",
        description:
          "We are responsible for all the electronics onboard, working with PCB and circuit design that the vessel's functionality depends greatly on. Power supply solutions, signal processing, and acoustics are key areas we focus on.",
      },
    ],
  },
  {
    id: "admin",
    name: "Admin",
    subtitle: "Keeping the Organisation Running",
    cardDescription: "Handles organisation-wide coordination, internal communication, and logistics to support all teams.",
    description1:
      "The Admin & Logistics team ensures that Vortex NTNU runs smoothly behind the scenes. We handle organisation-wide coordination, internal communication, and practical logistics to support all technical and operational teams. Our goal is to reduce the administrative load on team leads, maintain efficient workflows, and secure continuity between project years.",
    cardImageSrc: "/images/competitions/tac2024-team.png",
    imageSrc: "/images/team/walking.png",
  },
  {
    id: "marketing",
    name: "Marketing & Web",
    subtitle: "Our Voice to the World",
    cardDescription: "Shapes Vortex's public identity through brand, content, social media, and the website.",
    description1:
      "The Marketing & Web team shapes Vortex's public identity. They manage our brand, create content, and build the digital platforms that connect the organisation with students, sponsors, and the wider world.",
    cardImageSrc: "/images/team/presentation.jpg",
    imageSrc: "/images/team/CR_Marketing0.jpg",
    subTeams: [
      {
        name: "Marketing",
        description:
          "Vortex's marketing team promotes the organisation's brand, projects, and members. They manage brand identity, create content, handle social media and public relations, and drive engagement and organisational awareness.",
      },
      {
        name: "Web",
        description:
          "The web development team maintains and develops Vortex's website, ensuring it functions smoothly and reflects Vortex's activities and identity. The team is currently transitioning from Wix to a fully self-developed solution using React and TypeScript.",
      },
    ],
  },
];

export default function JoinUsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="/images/teams/mechanical-beluga.png"
        heading="Join The Team!"
        subheading="Applications are open for the 2027 generation. All study levels and backgrounds welcome."
        align="center"
        height="xl"
        overlay={0.65}
        cta={{ label: "APPLY NOW", href: "/contact" }}
      />

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
