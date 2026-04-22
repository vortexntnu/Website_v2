// ─────────────────────────────────────────────
// Shared data types used across the Vortex NTNU website
// ─────────────────────────────────────────────

export type TeamMember = {
  name: string;
  role: string;
  imageSrc?: string;
  linkedinHref?: string;
  objectPosition?: string;
  imageScale?: number;
};

export type SubTeam = {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  photoSrc?: string;
};

export type YearTeam = {
  year: string;
  teams: SubTeam[];
};

export type Project = {
  id: string;
  name: string;
  year: string;
  description: string;
  imageSrc: string;
  side: "left" | "right";
};

export type Sponsor = {
  name: string;
  logoText?: string; // placeholder text when no logo image
  logoSrc?: string;
  href?: string;
  invertColors?: boolean; // invert logo colors (e.g. white logos on white background)
  scale?: number; // per-logo visual nudge when the source has extra padding (e.g. 1.2)
  logoHeight?: number; // rendered logo height in px (defaults to 48)
  hitWidth?: number; // clickable-area width in px (defaults to 180)
  hitPadX?: number; // extra horizontal padding inside the link in px (defaults to 0); used for both sides unless hitPadLeft/hitPadRight override
  hitPadLeft?: number; // overrides left-side padding (px)
  hitPadRight?: number; // overrides right-side padding (px)
};

export type ContactPerson = {
  name: string;
  role: string;
  email: string;
};

export type Competition = {
  year: string;
  title: string;
  description: string;
  imageSrc: string;
  result?: string; // e.g. "1st Place"
  videoSrc?: string;
};
