import Link from "next/link";
import Image from "next/image";
import SponsorMarquee from "@/app/components/ui/SponsorMarquee";
import VideoEmbed from "@/app/components/ui/VideoEmbed";
import OceanBackground from "@/app/components/interactive/OceanBackground";
import type { Sponsor } from "@/app/lib/types";

/*
 * Home page — the primary landing page for Vortex NTNU.
 *
 * UNDERWATER DEPTH THEME:
 * The entire page is wrapped in <OceanBackground>, which provides a scroll-
 * linked ocean gradient that transitions from sunlit surface blues at the top
 * to abyssal darkness at the bottom. Fish silhouettes, bubbles, sunrays, and
 * caustic light patterns layer behind the content.
 *
 * Section backgrounds use semi-transparent colours so the ocean gradient
 * bleeds through, creating the illusion of descending into the deep.
 *
 * Section layout:
 *   1. Hero              — surface zone: sunrays, light water, scroll prompt
 *   2. Quote             — shallow water with light filtering through
 *   3. Projects grid     — open water: turtles and tropical fish drift past
 *   4. Stats strip       — brand-red accent strip (the Vortex submarine)
 *   5. About cards       — twilight zone: darker, jellyfish appear
 *   6. Strategy video    — midnight zone: deep blue
 *   7. Sponsor marquee   — deep ocean
 *   8. CTA banner        — the abyss: darkest, anglerfish glow
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
    <OceanBackground>
      {/* ── 1. Hero — SURFACE ZONE ──
          Custom hero for the ocean theme: no background image, instead uses
          the ocean gradient + sunrays as the visual backdrop. The lighter
          blue tones of the surface zone create natural contrast with white text. */}
      <section className="relative w-full h-screen overflow-hidden flex items-end">
        {/* Surface shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-transparent to-transparent" />

        {/* Wave pattern at top edge */}
        <svg
          className="absolute top-0 left-0 w-full h-16 text-cyan-800/10"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,20 Q150,0 300,20 Q450,40 600,20 Q750,0 900,20 Q1050,40 1200,20 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-start text-left max-w-7xl mx-auto px-8 pb-16 w-full">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up drop-shadow-lg">
            Developing Students<br />on a Deeper Level
          </h1>
          <p className="mt-4 text-lg md:text-xl text-cyan-100/80 max-w-2xl animate-fade-in-up drop-shadow-md">
            A student organization at NTNU building autonomous underwater and
            surface vehicles. Your nautical journey starts here.
          </p>
          <Link
            href="/join-us"
            className="mt-8 inline-block bg-[#c21c1c] hover:bg-[#dc2626] text-white font-semibold px-8 py-3 transition-colors duration-200 animate-fade-in-up"
          >
            JOIN THE TEAM
          </Link>

          {/* Scroll indicator — styled as a diving prompt */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cyan-200/60 text-sm">
            <span className="tracking-widest text-xs uppercase">Dive in</span>
            <span className="animate-bounce text-lg">↓</span>
          </div>
        </div>
      </section>

      {/* ── 2. Quote — SHALLOW WATERS ── */}
      <section className="relative py-24 overflow-hidden">
        <span
          aria-hidden="true"
          className="absolute -top-8 left-8 text-[180px] font-serif leading-none text-cyan-400 opacity-5 select-none pointer-events-none"
        >
          &ldquo;
        </span>
        <div className="relative max-w-4xl mx-auto px-8 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-cyan-50/90 leading-relaxed italic drop-shadow-sm">
            Creating the future of engineers — opening doors for students in the
            fascinating maritime industry.
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-[#c21c1c] uppercase tracking-widest">
            — Vortex NTNU
          </p>
        </div>
      </section>

      {/* ── 3. Projects grid — OPEN WATER ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c21c1c]">
                Our Drones
              </span>
              <h2 className="mt-2 text-4xl font-bold text-white drop-shadow-sm">Featured Projects</h2>
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
                className="group relative aspect-[3/4] overflow-hidden rounded-lg block border border-white/5"
              >
                <Image
                  src={p.imageSrc}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-3 left-3 bg-[#c21c1c] text-white text-xs font-semibold px-2 py-0.5">
                  {p.year}
                </span>
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

      {/* ── 4. Stats strip — THE SUBMARINE ──
          Keeps the brand-red colour as a bold horizontal divider,
          like a submarine slicing through the ocean layers. */}
      <section className="py-12 bg-[#c21c1c]/90 backdrop-blur-sm">
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

      {/* ── 5. About cards — TWILIGHT ZONE ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Welcome card */}
          <div className="relative overflow-hidden rounded-lg bg-black/40 backdrop-blur-sm border border-white/5 p-10 flex flex-col justify-between min-h-80">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#c21c1c]">
                About Us
              </span>
              <h2 className="mt-3 text-3xl font-bold text-white">
                Welcome to Vortex
              </h2>
              <p className="mt-4 text-gray-300/80 leading-relaxed">
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
          <div className="relative overflow-hidden rounded-lg min-h-80 border border-white/5">
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

      {/* ── 6. Strategy video — MIDNIGHT ZONE ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#c21c1c]">
              Watch
            </span>
            <h2 className="mt-2 text-4xl font-bold text-white drop-shadow-sm">Our Strategy</h2>
          </div>
          <div className="rounded-lg overflow-hidden border border-white/5">
            <VideoEmbed
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Vortex NTNU Strategy Video"
            />
          </div>
        </div>
      </section>

      {/* ── 7. Sponsor marquee — DEEP OCEAN ── */}
      <section className="py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300/20 text-center">
            Proudly supported by
          </p>
        </div>
        <SponsorMarquee sponsors={sponsors} />
      </section>

      {/* ── 8. CTA banner — THE ABYSS ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-5xl font-bold text-white leading-tight drop-shadow-lg">
            Will you dive with us?
          </h2>
          <p className="text-gray-400/80 text-lg max-w-xl">
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
              className="border border-cyan-400/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-3 transition-colors duration-200"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </OceanBackground>
  );
}
