import Image from "next/image";

type TeamMemberCardProps = {
  name: string;
  role: string;
  imageSrc?: string;
  linkedinHref?: string;
  objectPosition?: string;
  imageScale?: number;
};

/**
 * TeamMemberCard — profile card displayed in the Team page member grid.
 *
 * Design rationale:
 * - The card background uses --bg-secondary (#1a1a1a) so it lifts off the
 *   page background without needing a border or shadow.
 * - The LinkedIn icon (official SVG path) is used instead of "In →" text so
 *   international visitors immediately recognise the platform.
 * - The card has a subtle hover scale so the grid feels interactive even
 *   though the only action is the LinkedIn link.
 * - Profile photos are square (no rounded-*) per the engineering brand aesthetic.
 */
export default function TeamMemberCard({
  name,
  role,
  imageSrc,
  linkedinHref,
  objectPosition = "center top",
  imageScale = 1,
}: TeamMemberCardProps) {
  return (
    <div className="group flex flex-col bg-[#1a1a1a] rounded-lg overflow-hidden hover:bg-[#262626] transition-colors duration-200">
      {/* Photo */}
      <div className="relative w-full aspect-square bg-[#262626] overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
            quality={90}
            className="object-cover"
            style={{ objectPosition, transform: `scale(${imageScale})`, transformOrigin: objectPosition }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1">
        <p className="text-white font-semibold text-sm leading-snug">{name}</p>
        <p className="text-gray-400 text-xs">{role}</p>

        {linkedinHref && (
          <a
            href={linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#c21c1c] transition-colors duration-150"
            aria-label={`${name} on LinkedIn`}
          >
            {/* LinkedIn "in" square icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
