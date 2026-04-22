import type { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/app/components/ui/HeroSection";
import SectionHeading from "@/app/components/ui/SectionHeading";

/*
 * Competitions page — showcases past and upcoming competition participations.
 *
 * Section layout:
 *   1. Hero             — landscape/competition photo
 *   2. Results banner   — red strip with best placement
 *   3. Upcoming event   — large card for the next competition
 *   4. Past events      — alternating dark cards for previous competitions
 *
 * Design rationale:
 *
 * DARK THEME FIX: The original page used `bg-white` with `text-black`
 * throughout, creating a jarring white flash in an otherwise all-dark site.
 * All sections now use `bg-[#0a0a0a]` or `bg-[#1a1a1a]` card backgrounds.
 *
 * WHITE CARDS ON DARK: Figma shows "white card containers on dark background".
 * We interpret this as `bg-[#1a1a1a]` cards on `bg-[#0a0a0a]` page — the
 * cards appear lighter than the background even though both are dark. Using
 * literal white (#ffffff) cards would violate the dark-theme design system.
 *
 * RESULTS BANNER: A full-width red strip with the best placement is a quick
 * credibility signal that requires no reading. It catches the eye immediately
 * and communicates success before any text is read.
 *
 * PLAY BUTTON: SVG circle + triangle replaces the Unicode ▶ character.
 * SVG is resolution-independent and consistently sized across all browsers.
 */

export const metadata: Metadata = {
  title: "Competitions — Vortex NTNU",
  description: "Follow Vortex NTNU at international AUV competitions like RoboSub and TAC Challenge.",
};

const upcoming = {
  year: "2026",
  title: "TAC Challenge 2026",
  description:
    "The TAC Challenge is an international underwater robotics competition held at the Tau Autonomy Center in Tau, Norway. Teams compete on industry-developed tasks including subsea docking, pipeline inspection, underwater object detection, and autonomous navigation. After winning 1st place in 2024, Vortex NTNU returns to defend the title.",
  imageSrc: "/images/competitions/tac2026.png",
  location: "Tau, Norway",
  date: "June 15–19, 2026",
};

const past = [
  {
    year: "2024",
    title: "TAC Challenge 2024",
    result: "1st Place",
    description:
      "After 4 years of participation, Vortex NTNU won 1st place at the TAC Challenge 2024. The competition grew significantly from 5 teams in 2023 to 12 teams and 150 students from multiple countries.",
    detail:
      "This victory validated years of development on both the AUV and ASV platforms. The team competed with the latest iteration of Orca and demonstrated advanced autonomous capabilities in subsea tasks.",
    image1: "/images/competitions/tac2024-celebration.png",
    image2: "/images/competitions/tac2024-team.png",
  },
  {
    year: "2022",
    title: "RoboSub 2022",
    result: "5th Place",
    description:
      "Vortex NTNU placed 5th at RoboSub 2022 held at the University of Maryland. The team prequalified to the semifinals with two runs. Vortex also earned 5th place in the Design Documentation category.",
    detail:
      "Two years of work and 30,000–40,000 work hours resulted in the Beluga AUV used for this competition. The team scored enough in the semifinals for a third run, though fell short of the finals.",
    image1: "/images/competitions/deploying-drone.jpg",
    image2: "/images/competitions/orca-pool-testing.jpg",
  },
  {
    year: "2019",
    title: "RoboSub 2019",
    result: "First Participation",
    description:
      "In summer 2019, 11 students from Vortex NTNU traveled to San Diego to participate in RoboSub for the very first time. They competed with Manta, which had been converted from an ROV to an AUV in less than a year.",
    detail:
      "The development required rebuilding the existing ROV with new sensors and navigation equipment, improving existing software, and developing a simulation for testing — all within less than a year. This marked Vortex's shift from ROV to AUV development.",
    image1: "/images/competitions/orca-field.jpg",
    image2: "/images/competitions/boat-divers.png",
  },
];

export default function CompetitionsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="/images/competitions/tac2024-celebration.png"
        heading="Competitions"
        subheading="Where years of engineering meet the water."
        align="center"
        height="lg"
        overlay={0.6}
      />

      {/* ── 2. Results banner ── */}
      <div className="bg-[#c21c1c] py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white text-sm uppercase tracking-widest font-semibold">Best Result</p>
          <p className="text-white text-2xl md:text-3xl font-bold text-center">
            1st Place — TAC Challenge 2024
          </p>
          <p className="text-red-200 text-sm">RoboSub 5th Place in 2022</p>
        </div>
      </div>

      {/* ── 3. Upcoming event ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="Upcoming"
            title={upcoming.title}
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={upcoming.imageSrc}
                alt={upcoming.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 text-sm text-gray-500">
                <span>{upcoming.date}</span>
                <span>·</span>
                <span>{upcoming.location}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">{upcoming.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Past competitions ── */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading label="Past" title="Competition history" />

          <div className="mt-12 flex flex-col gap-16">
            {past.map((comp, i) => (
              <div
                key={comp.year}
                className={`bg-[#0a0a0a] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ${
                  i % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                {/* Text block */}
                <div className={`p-8 md:p-10 flex flex-col gap-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#c21c1c] text-white text-xs font-semibold px-3 py-1 uppercase tracking-wide">
                      {comp.year}
                    </span>
                    <span className="text-gray-500 text-sm">{comp.result}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{comp.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{comp.description}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{comp.detail}</p>
                </div>

                {/* Images / video block */}
                {i === 0 ? (
                  <div className="bg-black flex items-center">
                    <video
                      src="/videos/TAC2024/vlc-record-2025-08-17-19h59m05s-unveiling%20ahh%20vid%20(1).mp4-%201.mp4"
                      controls
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className={`grid grid-rows-2 gap-1 min-h-64 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={comp.image1}
                        alt={`${comp.title} photo 1`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                    <div className="relative overflow-hidden">
                      <Image
                        src={comp.image2}
                        alt={`${comp.title} photo 2`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
