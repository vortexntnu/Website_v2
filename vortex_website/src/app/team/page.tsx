import type { Metadata } from "next";
import HeroSection from "@/app/components/ui/HeroSection";
import TeamPageClient from "./TeamPageClient";

/*
 * Team page — browse Vortex NTNU team members by year and sub-team.
 *
 * Architecture:
 * - This file (Server Component) exports metadata for SEO and renders the
 *   shared <HeroSection>. The hero has no interactive state, so it stays here.
 * - All interactive logic (year selector, tab selector, member grid) lives in
 *   <TeamPageClient> which is a Client Component (`'use client'`).
 * - This Server + Client split keeps the page SSR-friendly while isolating
 *   the parts that genuinely need browser APIs (useState, click handlers).
 */

export const metadata: Metadata = {
  title: "Team — Vortex NTNU",
  description: "Meet the Vortex NTNU team members across all years and sub-teams.",
};

export default function TeamPage() {
  return (
    <>
      <HeroSection
        imageSrc="/images/team/Gruppebilder_hele_vortex.jpg"
        heading="Our Team"
        subheading="50+ students from 20+ study programs building autonomous maritime vehicles."
        align="center"
        height="lg"
        overlay={0.6}
      />
      <TeamPageClient />
    </>
  );
}
