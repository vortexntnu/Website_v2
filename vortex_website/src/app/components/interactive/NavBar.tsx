"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT", href: "/about" },
  { label: "TEAM", href: "/team" },
  { label: "PROJECTS", href: "/projects" },
  { label: "COMPETITIONS", href: "/competitions" },
  { label: "CONTACT", href: "/contact" },
];

/**
 * NavBar — the sticky top navigation shared across the entire site.
 *
 * Design rationale:
 * - `usePathname()` from next/navigation lets us highlight the active link
 *   with a red bottom border without any global state management. The pattern
 *   is: compare each link's `href` to the current pathname; if they match,
 *   apply `border-b-2 border-[#c21c1c]`.
 * - The "APPLY" button is a filled red CTA (not a nav link) — it should always
 *   stand out. We use it to drive visitors to the Join Us page, which is the
 *   primary conversion goal of the site.
 * - Mobile: a hamburger icon (three SVG lines) toggles a full-width dropdown
 *   that replaces the horizontal link list. The dropdown uses `useState` so
 *   it closes when the user navigates (handled by `key` on the route change).
 * - `sticky top-0 z-50` keeps the nav visible while scrolling.
 *   `backdrop-blur-sm bg-[#0a0a0a]/90` makes it slightly translucent so the
 *   hero image peek behind the nav feels intentional, not a bug.
 */
export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo / wordmark */}
        <Link href="/" className="inline-flex items-center -ml-6 md:-ml-10" aria-label="Vortex home">
          <Image
            src="/images/logos/LogoTextLight.svg"
            alt="Vortex logo"
            width={48}
            height={48}
            className="h-30 w-25"
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-150 pb-0.5 ${
                isActive(link.href)
                  ? "text-white border-b-2 border-[#c21c1c]"
                  : "text-gray-400 hover:text-white border-b-2 border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/join-us"
          className="hidden md:inline-flex items-center justify-center bg-[#c21c1c] hover:bg-[#dc2626] text-white text-sm font-semibold px-5 py-2 transition-colors duration-200"
        >
          APPLY
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${open ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-[#1a1a1a] px-8 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium tracking-wide ${
                isActive(link.href) ? "text-white" : "text-gray-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/join-us"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center bg-[#c21c1c] text-white text-sm font-semibold px-5 py-2 w-fit"
          >
            APPLY
          </Link>
        </div>
      )}
    </header>
  );
}
