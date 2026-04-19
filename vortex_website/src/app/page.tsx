import Link from "next/link";
import Image from "next/image";
import SponsorMarquee from "@/app/components/ui/SponsorMarquee";
import OceanBackground from "@/app/components/interactive/OceanBackground";
import type { Sponsor } from "@/app/lib/types";

const sponsors: Sponsor[] = [
  {
    name: "KONGSBERG",
    logoSrc: "/images/sponsors/kongsberg.svg",
    href: "https://www.kongsberg.com",
    scale: 1,
    logoHeight: 100,
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "Water Linked",
    logoSrc: "/images/sponsors/Waterlinked_dark.svg",
    href: "https://www.waterlinked.com",
    scale: 0.7,
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "Nortek",
    logoSrc: "/images/sponsors/nortek.svg",
    href: "https://www.nortekgroup.com",
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "NTNU Department of Engineering and Cybernetics",
    logoSrc: "/images/sponsors/inst_for_teknisk_kybernetikk_bredde_eng.jpg",
    href: "https://www.ntnu.edu/itk",
    scale: 0.8,
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "FFU",
    logoSrc: "/images/sponsors/ffu.png",
    href: "https://www.ffu.no",
    invertColors: true,
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "Würth Elektronik",
    logoSrc: "/images/sponsors/wurth-elektronik.png",
    href: "https://www.we-online.com",
    scale: 1.5,
    hitWidth: 0,
    hitPadX: 60
  },
  {
    name: "Norbit",
    logoSrc: "/images/sponsors/norbit.svg",
    href: "https://norbit.com/",
    scale: 1,
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "Nordcad",
    logoSrc: "/images/sponsors/nordcad.svg",
    href: "https://www.nordcad.eu/",
    scale: 0.7,
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "Altimo",
    logoSrc: "/images/sponsors/altimo.png",
    href: "https://www.altimo.no/",
    hitWidth: 0,
    hitPadX: 30,
  },
  {
    name: "Imtas",
    logoSrc: "/images/sponsors/imtas.png",
    href: "https://en.imtas.no/",
    hitWidth: 0,
    hitPadX: 40,
    scale:1.2
  },
];

const projects = [
  {
    id: "orca",
    name: "ORCA",
    year: "2024",
    imageSrc: "/images/drones/orca.png",
    description: "Our newest underwater drone, built for autonomy and robustness.",
  },
  {
    id: "freya",
    name: "FREYA",
    year: "2023",
    imageSrc: "/images/drones/freya.png",
    description: "Vortex's first autonomous surface vehicle (ASV), competing at Njord 2023.",
  },
  {
    id: "beluga",
    name: "BELUGA",
    year: "2021",
    imageSrc: "/images/drones/beluga.png",
    description: "The first Vortex drone developed with fully autonomous behaviour in mind.",
  },
  {
    id: "manta",
    name: "MANTA",
    year: "2018",
    imageSrc: "/images/drones/manta.png",
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

      {/* ── 1. HERO — SURFACE ZONE ── */}
      <section className="relative w-full h-screen overflow-hidden flex items-end">


        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16 mb-50 w-full">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/40 mb-4">
            Vortex NTNU — Trondheim, Norway
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] animate-fade-in-up drop-shadow-lg max-w-3xl">
            Developing Students<br />on a Deeper Level
          </h1>
          <p className="mt-5 text-base md:text-lg text-cyan-100/55 max-w-lg animate-fade-in-up">
            A student organization at NTNU building autonomous underwater and
            surface vehicles, where engineering meets the ocean.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 animate-fade-in-up">
            <Link
              href="/join-us"
              className="bg-[#c21c1c] hover:bg-[#dc2626] text-white font-semibold px-8 py-3 transition-colors duration-200"
            >
              JOIN THE TEAM
            </Link>
            <Link
              href="/projects"
              className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold px-8 py-3 transition-colors duration-200"
            >
              SEE OUR WORK
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-18 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cyan-200/40 z-10">
          <span className="tracking-widest text-xs uppercase">Dive in</span>
          <span className="animate-bounce text-lg">↓</span>
        </div>
      </section>

      {/* ── 2. MISSION STATEMENT — SHALLOW WATERS ── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-l-2 border-[#c21c1c] pl-8 max-w-3xl">
            <p className="text-3xl md:text-4xl font-light text-white/90 leading-relaxed">
              Creating the future of engineers and opening doors for students in the
              fascinating maritime industry.
            </p>
            <p className="mt-6 text-xs font-semibold text-[#c21c1c] uppercase tracking-[0.3em]">
              Vortex NTNU
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. PROJECTS GRID — OPEN WATER ── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c21c1c]">Our Drones</span>
              <h2 className="mt-1 text-4xl font-bold text-white">Featured Projects</h2>
            </div>
            <Link href="/projects" className="text-sm text-gray-500 hover:text-white transition-colors duration-150 hidden sm:block">
              View all →
            </Link>
          </div>

          {/* Asymmetric grid: ORCA featured (2-col top), FREYA tall portrait (right, 2-row), BELUGA+MANTA bottom */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            style={{ gridTemplateRows: "auto" }}
          >
            {/* ORCA — featured large, top-left */}
            <Link
              href="/projects#orca"
              className="group relative overflow-hidden block border border-white/5 sm:col-span-2 lg:col-span-2"
              style={{ height: 300 }}
            >
              <Image src={projects[0].imageSrc} alt={projects[0].name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 850px" quality={90} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#c21c1c] text-white text-xs font-bold px-2 py-0.5 tracking-wide">
                {projects[0].year}
              </span>
              <span className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-widest text-white/30 border border-white/10 px-2 py-0.5">
                Latest
              </span>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-bold text-2xl">{projects[0].name}</h3>
                <p className="text-gray-300/70 text-sm mt-1 max-w-sm">{projects[0].description}</p>
              </div>
            </Link>

            {/* FREYA — tall portrait, right column, spans 2 rows */}
            <Link
              href="/projects#freya"
              className="group relative overflow-hidden block border border-white/5 sm:row-span-2 lg:row-span-2"
              style={{ height: 300 }}
            >
              <Image src={projects[1].imageSrc} alt={projects[1].name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" quality={90} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <span className="absolute top-4 left-4 bg-[#c21c1c] text-white text-xs font-bold px-2 py-0.5">{projects[1].year}</span>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-xl">{projects[1].name}</h3>
                <p className="text-gray-300/65 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{projects[1].description}</p>
              </div>
            </Link>

            {/* BELUGA */}
            <Link
              href="/projects#beluga"
              className="group relative overflow-hidden block border border-white/5"
              style={{ height: 220 }}
            >
              <Image src={projects[2].imageSrc} alt={projects[2].name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" quality={90} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 bg-[#c21c1c] text-white text-xs font-bold px-2 py-0.5">{projects[2].year}</span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg">{projects[2].name}</h3>
                <p className="text-gray-400/65 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{projects[2].description}</p>
              </div>
            </Link>

            {/* MANTA */}
            <Link
              href="/projects#manta"
              className="group relative overflow-hidden block border border-white/5"
              style={{ height: 220 }}
            >
              <Image src={projects[3].imageSrc} alt={projects[3].name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" quality={90} className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute top-3 left-3 bg-[#c21c1c] text-white text-xs font-bold px-2 py-0.5">{projects[3].year}</span>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg">{projects[3].name}</h3>
                <p className="text-gray-400/65 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{projects[3].description}</p>
              </div>
            </Link>
          </div>

          <Link href="/projects" className="mt-5 inline-block text-sm text-gray-500 hover:text-white transition-colors duration-150 sm:hidden">
            View all →
          </Link>
        </div>
      </section>

      {/* ── 4. STATS STRIP — THE SUBMARINE ── */}
      <section className="py-14 bg-[#c21c1c]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-6 py-2">
                <span className="text-5xl md:text-6xl font-bold text-white tabular-nums">{s.value}</span>
                <span className="text-xs text-red-200/70 uppercase tracking-[0.2em]">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ABOUT — TWILIGHT ZONE ── */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Text card — wider (3/5) */}
          <div className="lg:col-span-3 relative overflow-hidden bg-black/25 backdrop-blur-sm border border-white/5 p-10 flex flex-col justify-between min-h-72">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c21c1c]">About Us</span>
              <h2 className="mt-4 text-4xl font-bold text-white leading-tight">
                Welcome to<br />Vortex NTNU
              </h2>
              <p className="mt-5 text-gray-400 leading-relaxed max-w-md text-sm">
                Vortex NTNU is a student organization at NTNU created with the
                purpose of building autonomous underwater and surface vessels. Over 50
                students from 20+ study programs design, build, and compete with
                AUVs, ASVs, and ROVs at competitions like RoboSub and TAC Challenge.
              </p>
            </div>
            <div className="mt-10 flex gap-6 items-center">
              <Link
                href="/about"
                className="text-sm font-semibold text-white border-b border-[#c21c1c] pb-0.5 hover:text-[#c21c1c] transition-colors duration-150"
              >
                Learn more →
              </Link>
              <Link
                href="/team"
                className="text-sm font-semibold text-gray-500 hover:text-white transition-colors duration-150"
              >
                Meet the team →
              </Link>
            </div>
          </div>

          {/* Photo card — narrower (2/5) */}
          <div className="lg:col-span-2 relative overflow-hidden min-h-72 border border-white/5">
            <Image
              src="/images/competitions/tac2024-team.png"
              alt="Vortex NTNU team photo"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              quality={90}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white/40 text-xs uppercase tracking-widest">The Team</p>
              <p className="text-white font-semibold mt-1 text-sm">50+ members across NTNU</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. PROMO VIDEO — MIDNIGHT ZONE ── */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          {/* Context text */}
          <div className="md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c21c1c]">Watch</span>
            <h2 className="mt-3 text-4xl font-bold text-white leading-tight">Vortex in Action</h2>
            <p className="mt-4 text-gray-500 leading-relaxed text-sm">
              From sensor integration to autonomous missions: see how we bring our
              engineering to life in the water.
            </p>
            <Link
              href="/competitions"
              className="mt-6 inline-block text-sm font-semibold text-white border-b border-[#c21c1c] pb-0.5 hover:text-[#c21c1c] transition-colors duration-150"
            >
              See more of TAC 2024 →
            </Link>
          </div>
          {/* Local promo video */}
          <div className="md:col-span-3 overflow-hidden border border-white/5">
            <video
              src="/videos/Vortex_promo_one.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full block"
            />
          </div>
        </div>
      </section>

      {/* ── 7. SPONSOR MARQUEE — DEEP OCEAN ── */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-8 mb-4 flex items-center gap-5">
          <div className="flex-1 h-px bg-black/10" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 shrink-0">
            Proudly supported by
          </p>
          <div className="flex-1 h-px bg-black/10" />
        </div>
        <SponsorMarquee sponsors={sponsors} />
      </section>

      {/* ── 8. CTA BANNER — THE ABYSS ── */}
      <section className="py-28 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/5 bg-black/20 px-10 py-16 md:px-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-600 mb-4">Join Us</p>
              <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.05] max-w-xl">
                Will you<br />dive with us?
              </h2>
              <p className="mt-5 text-gray-500 max-w-sm leading-relaxed text-sm">
                Whether you code, build, solder, or market — there is a seat on our
                submarine for you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
              <Link
                href="/join-us"
                className="bg-[#c21c1c] hover:bg-[#dc2626] text-white font-semibold px-8 py-3 transition-colors duration-200 text-center"
              >
                Become a Member
              </Link>
              <Link
                href="/contact"
                className="border border-white/10 hover:border-white/25 text-gray-400 hover:text-white font-semibold px-8 py-3 transition-colors duration-200 text-center"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>

    </OceanBackground>
  );
}
