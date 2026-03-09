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
      "Our latest AUV — a waterproof all-electric vehicle with a redesigned thruster layout, upgraded computer vision pipeline, and full ROS 2 integration. ORCA competed at RoboSub 2024 and achieved our best-ever placement.",
    imageSrc: "https://picsum.photos/seed/orca2024/800/600",
    side: "right",
  },
  {
    id: "freya",
    name: "FREYA",
    year: "2023",
    description:
      "A complete redesign from hull to software stack. Freya introduced the modular electronics bay that made future iterations much faster to iterate on. First drone to run a full perception stack on dedicated GPU hardware.",
    imageSrc: "https://picsum.photos/seed/freya2023/800/600",
    side: "left",
  },
  {
    id: "beluga",
    name: "BELUGA",
    year: "2021",
    description:
      "Beluga was the first Vortex AUV to demonstrate fully autonomous behaviour for multiple consecutive competition tasks. Built and tested entirely during the pandemic, it was a testament to remote collaboration.",
    imageSrc: "https://picsum.photos/seed/beluga2021/800/600",
    side: "right",
  },
  {
    id: "manta",
    name: "MANTA",
    year: "2018",
    description:
      "A pivotal year — Manta was converted from a remotely operated vehicle (ROV) to a fully autonomous AUV. This required a complete software rewrite and new sensor suite, laying the foundation for all future vehicles.",
    imageSrc: "https://picsum.photos/seed/manta2018/800/600",
    side: "left",
  },
  {
    id: "terrapin",
    name: "TERRAPIN",
    year: "2017",
    description:
      "The second drone in Vortex history. Terrapin refined the electrical architecture and introduced the first working hydrophone array for acoustic positioning.",
    imageSrc: "https://picsum.photos/seed/terrapin2017/800/600",
    side: "right",
  },
  {
    id: "maelstrom",
    name: "MAELSTROM",
    year: "2016",
    description:
      "The very first drone created by Vortex NTNU. Built from scratch by a small founding team, Maelstrom proved that NTNU students could build competitive underwater robotics hardware.",
    imageSrc: "https://picsum.photos/seed/maelstrom2016/800/600",
    side: "left",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="https://picsum.photos/seed/projectshero/1920/1080"
        heading="Our Drones"
        subheading="Six generations of autonomous underwater vehicles, each one smarter than the last."
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
