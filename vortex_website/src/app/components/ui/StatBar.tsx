type StatBarProps = {
  label: string;
  value: number;
  max?: number; // defaults to 100
};

/**
 * StatBar — visual percentage bar replacing the plain <table> elements
 * used in the About page for membership statistics.
 *
 * Design rationale:
 * - A table of numbers is dry and hard to scan. A filled bar gives immediate
 *   visual intuition about proportions without any mathematical effort.
 * - The red fill (`--accent-red`) ties the data directly to the brand colour.
 * - The background track (`--bg-tertiary`) creates a subtle inset effect that
 *   makes the bar feel embedded rather than floating.
 */
export default function StatBar({ label, value, max = 100 }: StatBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300 font-medium">{label}</span>
        <span className="text-gray-400">{value}</span>
      </div>
      {/* Track */}
      <div className="w-full h-2 rounded-full bg-[#262626]">
        {/* Fill */}
        <div
          className="h-2 rounded-full bg-[#c21c1c] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
