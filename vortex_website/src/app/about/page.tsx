import HeroSection from "@/app/components/ui/HeroSection";
import SectionHeading from "@/app/components/ui/SectionHeading";
import RedLabel from "@/app/components/ui/RedLabel";
import StatBar from "@/app/components/ui/StatBar";
import TimelineItem from "@/app/components/ui/TimelineItem";

/*
 * About page — tells the Vortex NTNU story: who we are, what we value, and
 * how the academic year is structured.
 *
 * Section layout:
 *   1. Hero              — team photo with heading
 *   2. Inspirational quote
 *   3. Our Story         — two-column text + image
 *   4. Who Are We        — three value pillars as bordered cards
 *   5. Membership stats  — two StatBar columns (role distribution + experience)
 *   6. Year timeline     — four semester blocks with red labels
 *
 * Design rationale — key decisions:
 *
 * VALUE CARDS: The original page used three different shades of brownish-pink
 * that didn't match the dark theme. We replaced them with dark cards that have
 * a red left border (`border-l-4 border-[#c21c1c]`). This:
 *   a) Stays within the established dark palette
 *   b) Uses the red accent to distinguish values without being garish
 *   c) Is one reusable pattern, not three bespoke hex colours
 *
 * STAT BARS: A plain <table> conveys the same numbers as a StatBar but with
 * no visual hierarchy. Bar charts give immediate proportion comparisons.
 *
 * TIMELINE: Uses the shared <TimelineItem> component so the alternating
 * left/right layout is consistent with the Projects page timeline.
 */

const valueCards = [
  {
    title: "Commitment",
    body: "Members fulfill their responsibilities through optimum effort while prioritizing safety and delivering exceptional work.",
  },
  {
    title: "Teamwork",
    body: "A solid foundation for teamwork is a key factor for success. We recognise individual strengths within team performance.",
  },
  {
    title: "Innovation",
    body: "We strive to make a unique product without limitations from our previous projects, solving complex problems through creative engineering.",
  },
];

const technicalStats = [
  { label: "Software", value: 40 },
  { label: "Electronics", value: 20 },
  { label: "Mechanical", value: 25 },
  { label: "Marketing", value: 15 },
];

const experienceStats = [
  { label: "1st Year", value: 35 },
  { label: "2nd Year", value: 25 },
  { label: "3rd Year", value: 20 },
  { label: "4th Year +", value: 20 },
];

const timelineItems = [
  {
    label: "Semester 1",
    period: "Mid-August → Late December",
    body: "Kick-off, onboarding new members, hardware design reviews, and the first full integration sprint before winter break.",
    imageSrc: "/images/teams/software-coding.png",
    side: "right" as const,
  },
  {
    label: "Winter Break",
    period: "January",
    body: "Focused individual study, documentation, and preparing hardware for the second semester test campaigns.",
    imageSrc: "/images/teams/electronics-pcb.png",
    side: "left" as const,
  },
  {
    label: "Semester 2",
    period: "Mid-January → June",
    body: "Full-speed integration, pool testing, and competition preparation. Final tuning leading up to RoboSub or other summer events.",
    imageSrc: "/images/teams/pool-test.png",
    side: "right" as const,
  },
  {
    label: "Summer Competition",
    period: "July → August",
    body: "International competition, post-mortem analysis, and early planning for the next generation AUV.",
    imageSrc: "/images/competitions/tac2024-team.png",
    side: "left" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="/images/competitions/orca-team.jpg"
        heading="Anchor Into Our Mission"
        subheading="Enabling students at NTNU to develop themselves as engineers and team members through autonomous maritime vehicles."
        align="center"
        height="xl"
        overlay={0.55}
      />

      {/* ── 2. Inspirational quote ── */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <blockquote className="text-2xl font-light text-gray-200 italic leading-relaxed">
            &ldquo;Developing students on a deeper level.&rdquo;
          </blockquote>
          <p className="mt-4 text-sm text-[#c21c1c] uppercase tracking-widest font-semibold">
            Vortex NTNU
          </p>
        </div>
      </section>

      {/* ── 3. Our Story ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionHeading
            label="Our Story"
            title="From six students to international podiums"
            subtitle="Founded in January 2015 by six NTNU engineering students, Vortex NTNU has grown into over 50 members from 20+ study programs. We are a student-led volunteer organization that designs and builds both hardware and software for autonomous underwater vehicles (AUVs), autonomous surface vehicles (ASVs), and remotely operated vehicles (ROVs), competing nationally and internationally at events like RoboSub and TAC Challenge."
          />
          <div
            className="relative h-80 rounded-lg overflow-hidden"
            style={{
              backgroundImage: "url('/images/team/walking.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

      {/* ── 4. Who Are We ── */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="Who Are We?"
            title="Our core values"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {valueCards.map((card) => (
              <div
                key={card.title}
                className="bg-[#0a0a0a] border-l-4 border-[#c21c1c] rounded-r-lg p-8 flex flex-col gap-3"
              >
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Membership stats ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="Membership"
            title="By the numbers"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Technical Distribution</h3>
              <div className="flex flex-col gap-5">
                {technicalStats.map((s) => (
                  <StatBar key={s.label} label={s.label} value={s.value} max={100} />
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-600">Approximate member count per specialisation.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Experience Level</h3>
              <div className="flex flex-col gap-5">
                {experienceStats.map((s) => (
                  <StatBar key={s.label} label={s.label} value={s.value} max={100} />
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-600">Approximate percentage of members per year of study.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Year timeline ── */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="The Academic Year"
            title="Each year's journey"
            align="center"
          />

          {/*
           * The vertical red line is rendered via a CSS `before:` pseudo-element
           * on the container (only visible at md+). The TimelineItem dots sit
           * on top of this line via `absolute` positioning inside the component.
           */}
          <div className="relative mt-16 flex flex-col gap-20 before:hidden md:before:block before:absolute before:top-4 before:bottom-4 before:left-1/2 before:-translate-x-1/2 before:w-px before:bg-[#c21c1c] before:opacity-25">
            {timelineItems.map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <RedLabel size="md">{item.label}</RedLabel>
                <p className="text-xs text-gray-500 mb-4">{item.period}</p>
                <div className="w-full">
                  <TimelineItem
                    side={item.side}
                    label={item.label}
                    year={item.period}
                    description={item.body}
                    imageSrc={item.imageSrc}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
