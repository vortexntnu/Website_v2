import Image from "next/image";

type ContactCardProps = {
  name: string;
  role: string;
  email: string;
  imageSrc: string;
};

/**
 * ContactCard — profile card for the Contact page person grid.
 *
 * Design rationale:
 * - The Figma design shows named contact persons rather than just a generic
 *   address block. This gives visitors a human to reach out to, which is much
 *   more welcoming than an anonymous inbox.
 * - Layout mirrors TeamMemberCard (photo → name → role → email) for visual
 *   consistency, but adds a clickable mailto link as the primary action.
 */
export default function ContactCard({
  name,
  role,
  email,
  imageSrc,
}: ContactCardProps) {
  return (
    <div className="flex flex-col bg-[#1a1a1a] rounded-lg overflow-hidden">
      {/* Photo */}
      <div className="relative aspect-square w-full">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-1">
        <p className="text-white font-semibold">{name}</p>
        <p className="text-gray-400 text-sm">{role}</p>
        <a
          href={`mailto:${email}`}
          className="mt-2 text-sm text-[#c21c1c] hover:text-[#dc2626] transition-colors duration-150 break-all"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
