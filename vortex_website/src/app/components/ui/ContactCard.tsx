type ContactCardProps = {
  name: string;
  role: string;
  email: string;
};

export default function ContactCard({ name, role, email }: ContactCardProps) {
  return (
    <div className="flex items-start gap-4 bg-[#0a0a0a] border border-[#1a1a1a] p-6 rounded-lg">
      {/* Left accent bar */}
      <div className="w-1 self-stretch bg-[#c21c1c] shrink-0" />

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="text-white font-bold text-lg">{name}</p>
        <p className="text-gray-400 text-sm">{role}</p>
        <a
          href={`mailto:${email}`}
          className="mt-1 text-sm text-gray-500 hover:text-[#c21c1c] transition-colors duration-150 break-all"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
