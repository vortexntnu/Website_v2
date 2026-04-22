import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/app/components/interactive/NavBar";
import SocialIcons from "@/app/components/ui/SocialIcons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vortex NTNU",
  description: "Vortex NTNU — Developing students on a deeper level",
};

/*
 * RootLayout — the shared shell rendered around every page.
 *
 * Structure:
 *   <NavBar />  — sticky top navigation (Client Component for active links + mobile menu)
 *   {children}  — page content
 *   <footer>    — 4-column footer: Quick Links, Sponsors, Social, Contact
 *
 * Design rationale:
 * - The footer has four equal columns so visitors can always find navigation
 *   (Quick Links), discover partners (Sponsors), find social channels, and get
 *   contact details — all without scrolling back to the top.
 * - Sponsor logos are listed as text names until real logo images are provided.
 *   Text names are readable and take up no extra asset bandwidth.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Competitions", href: "/competitions" },
    { label: "Join Us", href: "/join-us" },
    { label: "Contact", href: "/contact" },
  ];

  const sponsors = [
    { name: "KONGSBERG", href: "https://www.kongsberg.com" },
    { name: "Water Linked", href: "https://www.waterlinked.com" },
    { name: "Nortek", href: "https://www.nortekgroup.com" },
    { name: "NTNU", href: "https://www.ntnu.edu/itk" },
    { name: "FFU", href: "https://www.ffu.no" },
    { name: "Würth Elektronik", href: "https://www.we-online.com"},
    { name: "Norbit", href: "https://www.we-online.com" },
    { name: "Nordcad", href: "https://www.nordcad.eu/" },
    { name: "Altimo", href: "https://www.altimo.no/" },
    { name: "Imtas", href: "https://en.imtas.no/" },
  ];

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {/* Sticky navigation */}
        <NavBar />

        {/* Page content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-14">
          <div className="max-w-7xl mx-auto px-8">
            {/* 4-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                  Quick Links
                </h4>
                <ul className="flex flex-col gap-2">
                  {quickLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sponsors */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                  Our Sponsors
                </h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {sponsors.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-150"
                      >
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                  Follow Us
                </h4>
                <SocialIcons
                  facebook="https://facebook.com/vortexntnu"
                  linkedin="https://linkedin.com/company/vortexntnu"
                  instagram="https://instagram.com/vortexntnu"
                  youtube="https://www.youtube.com/@vortexntnu8471"
                />
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                  Contact
                </h4>
                <address className="not-italic text-gray-400 text-sm flex flex-col gap-1">
                  <span>S. P. Andersens veg 1</span>
                  <span>7031 Trondheim, Norway</span>
                  <a
                    href="mailto:post@vortexntnu.no"
                    className="mt-2 text-[#c21c1c] hover:text-[#dc2626] transition-colors duration-150"
                  >
                    post@vortexntnu.no
                  </a>
                  <span className="mt-1 text-gray-600 text-xs">Org. nr. 919924851</span>
                </address>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Image
                src="/images/logos/LogoSideProjectTextLight.svg"
                alt="Vortex"
                width={180}
                height={40}
                className="h-12 w-auto"
              />
              <p className="text-gray-600 text-xs">
                © {new Date().getFullYear()} Vortex NTNU. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
