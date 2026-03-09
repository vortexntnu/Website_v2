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
    "The TAC Challenge is an annual Norwegian underwater robotics competition. In 2026 we return with our latest AUV ORCA, refined after the RoboSub 2024 campaign. Tasks include acoustic pinger following, gate passing, and torpedo shooting.",
  imageSrc: "https://picsum.photos/seed/tac2026/1200/700",
  location: "Trondheim, Norway",
  date: "July 2026",
};

const past = [
  {
    year: "2024",
    title: "RoboSub 2024",
    result: "Top 10 Finish",
    description:
      "RoboSub is the world's premier student AUV competition held in San Diego, USA. In 2024, Vortex NTNU competed with ORCA and achieved our best-ever placement. The vehicle completed gate-passing, buoy-interaction, and torpedo tasks in back-to-back runs.",
    detail:
      "The team of 12 students spent six months preparing ORCA for the competition. Key improvements included a new vision system using YOLO-based object detection and a fully redesigned electronics bay that reduced waterproofing failures to zero.",
    image1: "https://picsum.photos/seed/robosub2024a/800/500",
    image2: "https://picsum.photos/seed/robosub2024b/800/500",
  },
  {
    year: "2023",
    title: "TAC Challenge 2023",
    result: "2nd Place",
    description:
      "Competing with FREYA, Vortex took 2nd place at the 2023 TAC Challenge. The vehicle's new acoustic positioning system allowed it to locate and interact with underwater targets faster than any previous Vortex entry.",
    detail:
      "This was the first competition where Vortex ran a fully autonomous mission without any manual interventions. The result validated two years of software development and opened the door for the RoboSub qualification application.",
    image1: "https://picsum.photos/seed/tac2023a/800/500",
    image2: "https://picsum.photos/seed/tac2023b/800/500",
  },
];

export default function CompetitionsPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="https://picsum.photos/seed/compshero/1920/1080"
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
            2nd Place — TAC Challenge 2023
          </p>
          <p className="text-red-200 text-sm">RoboSub Top 10 in 2024</p>
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
            {/* Video / image with play button overlay */}
            <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src={upcoming.imageSrc}
                alt={upcoming.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-200" />
              {/* SVG play button — circle + triangle, resolution-independent */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:border-[#c21c1c] transition-colors duration-200">
                  <svg
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6 ml-1 group-hover:fill-[#c21c1c] transition-colors duration-200"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
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

                {/* Images block */}
                <div className={`grid grid-rows-2 gap-1 min-h-64 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={comp.image1}
                      alt={`${comp.title} photo 1`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden">
                    <Image
                      src={comp.image2}
                      alt={`${comp.title} photo 2`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
