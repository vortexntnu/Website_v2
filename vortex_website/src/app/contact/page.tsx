import type { Metadata } from "next";
import HeroSection from "@/app/components/ui/HeroSection";
import SectionHeading from "@/app/components/ui/SectionHeading";
import ContactCard from "@/app/components/ui/ContactCard";
import GoogleMap from "@/app/components/ui/GoogleMap";
import SocialIcons from "@/app/components/ui/SocialIcons";
import ContactForm from "@/app/components/interactive/ContactForm";
import type { ContactPerson } from "@/app/lib/types";

/*
 * Contact page — connect visitors to the right people at Vortex NTNU.
 *
 * Section layout:
 *   1. Hero             — welcoming heading with team photo
 *   2. Contact persons  — named contact card grid (Figma requirement)
 *   3. Map + address    — Google Maps iframe + address/social block
 *   4. Contact form     — direct message to the team
 *
 * Design rationale:
 *
 * CONTACT PERSON CARDS (main Figma requirement that was missing):
 * The original page had only a generic address block. The Figma design shows
 * a grid of named contact persons — each with a photo, name, role, and email.
 * This is far more welcoming for prospective members and sponsors because it
 * gives them a human face to contact rather than an anonymous inbox.
 *
 * MAP + FORM TWO-COLUMN LAYOUT:
 * The map tells visitors where we are physically (important for partners and
 * sponsors who want to visit). The form lets anyone reach us immediately
 * without knowing a specific email address. Putting them side-by-side saves
 * vertical space and creates a natural "location + contact" information pair.
 *
 * GOOGLE MAPS EMBED:
 * We use a standard iframe embed from Google Maps. No API key is required for
 * basic embed URLs. The `allowFullScreen` attribute lets mobile visitors
 * expand the map to use navigation. The URL points to Klæbuveien 153, which
 * is the official Vortex NTNU workshop address.
 */

export const metadata: Metadata = {
  title: "Contact — Vortex NTNU",
  description: "Get in touch with Vortex NTNU. Reach our team leads, find our location, or send us a message.",
};

const contacts: ContactPerson[] = [
  {
    name: "Andreas Skagen",
    role: "Project Manager",
    email: "andreas.skagen@vortexntnu.no",
  },
  {
    name: "Alvar Guddingsmo",
    role: "Chief Technical Officer Hardware",
    email: "alvar.guddingsmo@vortexntnu.no",
  },
  {
    name: "Axel Robert Olivier Jenssen",
    role: "Chief Financial Officer",
    email: "axel.jenssen@vortexntnu.no",
  },
  {
    name: "Lasse Johansen",
    role: "Deputy Project Manager",
    email: "lasse.johansen@vortexntnu.no",
  },
  {
    name: "Jørgen Fjermedal",
    role: "Chief Technical Officer Software",
    email: "jorgen.fjermedal@vortexntnu.no",
  },
  {
    name: "Yatavi Suresh",
    role: "Chief Marketing Officer",
    email: "yatavi.suresh@vortexntnu.no",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <HeroSection
        imageSrc="/images/competitions/tac2024-celebration.png"
        heading="Got any questions?"
        subheading="Please do not hesitate to contact us. Our team leads are happy to hear from prospective members, sponsors, and partners."
        align="center"
        height="lg"
        overlay={0.6}
      />

      {/* ── 2. Contact person cards ── */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading
            label="Contacts"
            title="Talk to our team leads"
            subtitle="Reach out directly to the person responsible for the area you are interested in."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {contacts.map((c) => (
              <ContactCard
                key={c.name}
                name={c.name}
                role={c.role}
                email={c.email}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Map + address | 4. Contact form ── */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left: map + address */}
          <div className="flex flex-col gap-8">
            {/*
             * Google Maps embed for S.P. Andersens veg 5, 7031 Trondheim.
             * The embed URL below is a public iframe link — no API key needed.
             * To update: go to maps.google.com → search the address →
             *   Share → Embed a map → copy the src URL.
             */}
            <GoogleMap
              src="https://www.google.com/maps?q=S.P.+Andersens+veg+5,+7031+Trondheim,+Norway&output=embed"
              height={320}
              title="Vortex NTNU location"
            />

            {/* Address + social */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Address
                </h3>
                <address className="not-italic text-gray-300 flex flex-col gap-1">
                  <span>S.P. Andersens veg 5</span>
                  <span>7031 Trondheim, Norway</span>
                </address>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Email
                </h3>
                <a
                  href="mailto:post@vortexntnu.no"
                  className="text-[#c21c1c] hover:text-[#dc2626] transition-colors duration-150"
                >
                  post@vortexntnu.no
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Org. Number
                </h3>
                <p className="text-gray-400">914 934 451</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  Follow Us
                </h3>
                <SocialIcons
                  facebook="https://facebook.com/vortexntnu"
                  linkedin="https://linkedin.com/company/vortexntnu"
                  instagram="https://instagram.com/vortexntnu"
                  youtube="https://www.youtube.com/@vortexntnu8471"
                  size="lg"
                />
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            {/*
             * ContactForm is a Client Component ('use client') because it uses
             * useState for controlled inputs and an onSubmit handler.
             * Keeping it separate allows this page to remain a Server Component.
             */}
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
