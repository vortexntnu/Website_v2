import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/app/components/ui/HeroSection";
import SponsorMarquee from "@/app/components/ui/SponsorMarquee";
import VideoEmbed from "@/app/components/ui/VideoEmbed";
import type { Sponsor } from "@/app/lib/types";

/*
 * Home page — the primary landing page for Vortex NTNU.
 *
 * Section layout:
 *   1. HeroSection       — full-viewport hero with tagline + CTA
 *   2. Quote             — inspirational organisational quote
 *   3. Projects grid     — 4 flagship drones as clickable cards
 *   4. Stats strip       — 4 key numbers at a glance
 *   5. About cards       — "Welcome to Vortex" + team photo side-by-side
 *   6. Strategy video    — embedded team overview video
 *   7. Sponsor marquee   — infinite-scrolling sponsor banner
 *   8. CTA banner        — final call to join or partner
 *
 * Design rationale:
 * - The hero is full-viewport height (`screen`) so visitors immediately feel
 *   immersed before any content competes for attention.
 * - The quote section uses oversized decorative quotation marks (large, red,
 *   low opacity) as a background element — a typographic technique that adds
 *   visual weight without adding noise.
 * - The stats strip breaks up content and gives visitors quick credibility
 *   signals (member count, years, etc.) without requiring them to read paragraphs.
 * - Project cards link directly to the Projects page with a hash anchor so
 *   users jump straight to the drone they clicked.
 */

const sponsors: Sponsor[] = [
  { name: "KONGSBERG" },
  { name: "Water Linked" },
  { name: "Nortek" },
  { name: "NTNU" },
  { name: "FFU" },
  { name: "Diab" },
  { name: "MECHMAN" },
];

const projects = [
  {
    id: "orca",
    name: "ORCA",
    year: "2024",
    imageSrc: "https://picsum.photos/seed/orca2024/800/600",
    description: "Our newest autonomous underwater drone, built for autonomy and robustness.",
  },
  {
    id: "freya",
    name: "FREYA",
    year: "2023",
    imageSrc: "https://picsum.photos/seed/freya2023/800/600",
    description: "Vortex's first autonomous surface vehicle (ASV), competing at Njord 2023.",
  },
  {
    id: "beluga",
    name: "BELUGA",
    year: "2021",
    imageSrc: "https://picsum.photos/seed/beluga2021/800/600",
    description: "The first Vortex drone developed with fully autonomous behaviour in mind.",
  },
  {
    id: "manta",
    name: "MANTA",
    year: "2018",
    imageSrc: "https://picsum.photos/seed/manta2018/800/600",
    description: "Started as an ROV, then converted to an AUV for RoboSub 2019.",
  },
];

const stats = [
  { value: "50+", label: "Active Members" },
  { value: "20+", label: "Study Programs" },
  { value: "6", label: "Drones Built" },
  { value: "2015", label: "Founded" },
];

export default function HomePage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="https://picsum.photos/seed/vortexhero/1920/1080"
        heading="Developing Students on a Deeper Level"
        subheading="A student organization at NTNU building autonomous underwater and surface vehicles. Your nautical journey starts here."
        align="left"
        height="screen"
        overlay={0.6}
        cta={{ label: "JOIN THE TEAM", href: "/join-us" }}
      />

      {/* ── 2. Quote ── */}
      <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
        {/* Decorative quotation mark — large, red, very transparent */}
        <span
          aria-hidden="true"
          className="absolute -top-8 left-8 text-[180px] font-serif leading-none text-[#c21c1c] opacity-10 select-none pointer-events-none"
        >
          &ldquo;
        </span>
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-gray-200 leading-relaxed italic">
            Creating the future of engineers — opening doors for students in the
            fascinating maritime industry.
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-[#c21c1c] uppercase tracking-widest">
            — Vortex NTNU
          </p>
        </div>
      </section>

      {/* ── 3. Projects grid ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c21c1c]">
                Our Drones
              </span>
              <h2 className="mt-2 text-4xl font-bold text-white">Featured Projects</h2>
            </div>
            <Link
              href="/projects"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects#${p.id}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-lg block"
              >
                {/* Photo */}
                <Image
                  src={p.imageSrc}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Year badge */}
                <span className="absolute top-3 left-3 bg-[#c21c1c] text-white text-xs font-semibold px-2 py-0.5">
                  {p.year}
                </span>
                {/* Name + description */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <p className="text-gray-300 text-xs leading-relaxed mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Stats strip ── */}
      <section className="py-12 bg-[#c21c1c]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white">{s.value}</span>
                <span className="text-sm text-red-200 uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. About cards ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Welcome card */}
          <div className="relative overflow-hidden rounded-lg bg-[#1a1a1a] p-10 flex flex-col justify-between min-h-80">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c21c1c]">
                About Us
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Welcome to Vortex
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Vortex NTNU is a student organization at NTNU created with the
                purpose of building autonomous underwater and surface vessels. Over 50
                students from 20+ study programs design, build, and compete with
                AUVs, ASVs, and ROVs at competitions like RoboSub and TAC Challenge.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-block text-sm font-semibold text-white border-b-2 border-[#c21c1c] pb-0.5 w-fit hover:text-[#c21c1c] transition-colors duration-150"
            >
              Learn more →
            </Link>
          </div>

          {/* Team photo card */}
          <div className="relative overflow-hidden rounded-lg min-h-80">
            <Image
              src="https://picsum.photos/seed/vortexteam/800/600"
              alt="Vortex NTNU team photo"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 left-6">
              <Link
                href="/team"
                className="bg-[#c21c1c] hover:bg-[#dc2626] text-white text-sm font-semibold px-5 py-2 transition-colors duration-200"
              >
                Meet the Team →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Strategy video ── */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c21c1c]">
              Watch
            </span>
            <h2 className="mt-2 text-4xl font-bold text-white">Our Strategy</h2>
          </div>
          <VideoEmbed
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Vortex NTNU Strategy Video"
          />
        </div>
      </section>

      {/* ── 7. Sponsor marquee ── */}
      <section className="py-10 bg-[#0a0a0a] border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 text-center">
            Proudly supported by
          </p>
        </div>
        <SponsorMarquee sponsors={sponsors} />
      </section>

      {/* ── 8. CTA banner ── */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Will you race with us?
          </h2>
          <p className="text-gray-400 text-lg max-w-xl">
            Whether you code, build, solder, or market — there is a seat on our
            submarine for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/join-us"
              className="bg-[#c21c1c] hover:bg-[#dc2626] text-white font-semibold px-8 py-3 transition-colors duration-200"
            >
              Become a Team Member
            </Link>
            <Link
              href="/contact"
              className="border border-[#374151] hover:border-white text-gray-300 hover:text-white font-semibold px-8 py-3 transition-colors duration-200"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
