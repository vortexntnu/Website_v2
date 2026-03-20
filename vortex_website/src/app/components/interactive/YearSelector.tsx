"use client";

type YearSelectorProps = {
  years: string[];
  activeYear: string;
  onSelect: (year: string) => void;
};

/**
 * YearSelector — a horizontally scrollable row of year buttons.
 *
 * Design rationale:
 * - Browsing team history by year is a key feature. A scrollable pill row
 *   takes up minimal vertical space compared to a sidebar list, and makes
 *   it obvious that multiple years are available.
 * - The active year uses a red background matching --accent-red so the
 *   selected state is immediately clear without needing extra UI elements.
 * - `overflow-x-auto` with `whitespace-nowrap` handles any number of years
 *   gracefully on mobile without wrapping or truncating.
 */
export default function YearSelector({
  years,
  activeYear,
  onSelect,
}: YearSelectorProps) {
  return (
    <div className="overflow-x-auto whitespace-nowrap pb-2">
      <div className="inline-flex gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onSelect(year)}
            className={`px-4 py-1.5 text-sm font-semibold transition-colors duration-150 ${
              activeYear === year
                ? "bg-[#c21c1c] text-white"
                : "bg-[#1a1a1a] text-gray-400 hover:text-white hover:bg-[#262626]"
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}
