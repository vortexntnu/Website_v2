// ─────────────────────────────────────────────
// Shared data types used across the Vortex NTNU website
// ─────────────────────────────────────────────

export type TeamMember = {
  name: string;
  role: string;
  linkedinHref?: string;
};

export type SubTeam = {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
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
  logoHeight?: number;   // override default logo height in px
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
