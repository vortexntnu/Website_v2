import type { Metadata } from "next";
import HeroSection from "@/app/components/ui/HeroSection";
import SectionHeading from "@/app/components/ui/SectionHeading";
import TimelineItem from "@/app/components/ui/TimelineItem";
import type { Project } from "@/app/lib/types";

/*
 * Projects page — a timeline of all Vortex NTNU drones from newest to oldest.
 *
 * Section layout:
 *   1. Hero             — AUV photo with "Our Drones" heading
 *   2. Tab navigation   — anchor links to each drone section
 *   3. Timeline         — alternating left/right project cards
 *
 * Design rationale:
 *
 * TAB NAVIGATION: Rather than JavaScript-powered filtering (which would
 * require a Client Component), the tabs use plain <a href="#id"> anchor links.
 * This approach:
 *   a) Works without any JavaScript at all (progressive enhancement)
 *   b) Allows the browser to handle smooth scrolling via `scroll-behavior: smooth`
 *      (we add this on the <html> element in globals.css)
 *   c) Keeps the page a Server Component, which is better for SEO and initial load
 *
 * TIMELINE: Uses the shared <TimelineItem> component with alternating `side`
 * values. The vertical centre line is a CSS `before:` pseudo-element on the
 * container so it only appears at desktop widths — on mobile cards simply
 * stack vertically with no connecting line.
 *
 * SCROLL PADDING: We add `pt-24` to each drone section so the sticky nav
 * does not obscure the section heading when the anchor link scrolls to it.
 * This is a CSS `scroll-margin-top` workaround for sticky headers.
 */

export const metadata: Metadata = {
  title: "Projects — Vortex NTNU",
  description: "Explore all autonomous underwater vehicles built by Vortex NTNU since 2016.",
};

const projects: Project[] = [
  {
    id: "orca",
    name: "ORCA",
    year: "2024",
    description:
      "Vortex's newest autonomous underwater drone, released in April 2024. Built for autonomy and robustness, Orca represented a new chapter in the organisation's AUV development. The team won 1st place at TAC Challenge 2024 after 4 years of participation.",
    imageSrc: "/images/drones/orca.png",
    side: "right",
  },
  {
    id: "freya",
    name: "FREYA",
    year: "2023",
    description:
      "An idea formed in 2021 that became Vortex's first autonomous surface vehicle (ASV). Freya competed at Njord 2023 — a first for both Njord and Vortex. Development continued through 23-24 with buoy detection, collision avoidance, and integration of the M3 Sonar from Kongsberg Discovery.",
    imageSrc: "/images/drones/freya.png",
    side: "left",
  },
  {
    id: "beluga",
    name: "BELUGA",
    year: "2021",
    description:
      "The first Vortex drone developed with fully autonomous behaviour in mind. Beluga competed at RoboSub 2021 (held digitally due to COVID) and RoboSub 2022 where Vortex placed 5th. Two years of work and 30,000-40,000 work hours went into this vehicle.",
    imageSrc: "/images/drones/beluga.png",
    side: "right",
  },
  {
    id: "manta",
    name: "MANTA",
    year: "2018",
    description:
      "Manta started life as an ROV but was converted to an AUV in 2019 — a pivotal shift from remote-controlled to autonomous drones. In summer 2019, 11 students traveled to San Diego for Vortex's first-ever RoboSub competition.",
    imageSrc: "/images/drones/manta.png",
    side: "left",
  },
  {
    id: "terrapin",
    name: "TERRAPIN",
    year: "2017",
    description:
      "The second installment in Vortex's fleet, with a more subtle exterior compared to its predecessor. Built by a team of 18 students, Terrapin refined the electrical architecture and competed at the MATE ROV competition in Long Beach.",
    imageSrc: "/images/drones/terrapin.png",
    side: "right",
  },
  {
    id: "maelstrom",
    name: "MAELSTROM",
    year: "2016",
    description:
      "The very first drone created by Vortex NTNU. Founded in 2015 by six students, the team grew to 20 members and achieved 16th place in their competition debut — establishing NTNU's only permanent ROV program at the time.",
    imageSrc: "/images/drones/maelstrom.png",
    side: "left",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="/images/competitions/working-on-drone.jpg"
        heading="Our Drones"
        subheading="Six generations of autonomous underwater and surface vehicles — from ROV to AUV to ASV."
        align="center"
        height="lg"
        overlay={0.6}
      />

      {/* ── 2. Tab navigation ── */}
      <nav className="sticky top-16 z-40 bg-[#0a0a0a] border-b border-[#1a1a1a] overflow-x-auto">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1 whitespace-nowrap">
            {projects.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="px-5 py-4 text-sm font-semibold text-gray-400 hover:text-white border-b-2 border-transparent hover:border-[#c21c1c] transition-colors duration-150"
              >
                {p.name}
                <span className="ml-2 text-xs text-gray-600">{p.year}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── 3. Timeline ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="Timeline"
            title="From MAELSTROM to ORCA"
            subtitle="Every vehicle in our history, with the engineering story behind each one."
            align="center"
          />

          {/*
           * The timeline vertical line is a CSS before: pseudo-element.
           * Only visible on md+ screens (before:hidden md:before:block).
           * Each TimelineItem has a dot that sits on this line.
           */}
          <div className="relative mt-20 flex flex-col gap-24 before:hidden md:before:block before:absolute before:top-0 before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:bg-[#c21c1c] before:opacity-20">
            {projects.map((project) => (
              /*
               * `scroll-mt-32` gives the section heading 8rem of top padding when
               * the browser scrolls to this anchor. This prevents the sticky nav
               * (h-16 = 4rem) + the secondary nav (h-14 ≈ 3.5rem) from covering
               * the heading. Adjust if the nav height changes.
               */
              <div
                key={project.id}
                id={project.id}
                className="scroll-mt-32"
              >
                <TimelineItem
                  side={project.side}
                  label={project.name}
                  year={project.year}
                  description={project.description}
                  imageSrc={project.imageSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
