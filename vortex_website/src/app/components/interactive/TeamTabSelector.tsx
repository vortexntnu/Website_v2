"use client";

type Tab = {
  id: string;
  label: string;
};

type TeamTabSelectorProps = {
  tabs: Tab[];
  activeTab: string;
  onSelect: (id: string) => void;
};

/**
 * TeamTabSelector — responsive matrix of team buttons.
 *
 * Design rationale:
 * - Team count is high enough that a horizontal, scrollable row hides options.
 * - A matrix makes all teams visible at once and easier to scan on desktop.
 * - On mobile it collapses to fewer columns while preserving tap targets.
 */
export default function TeamTabSelector({
  tabs,
  activeTab,
  onSelect,
}: TeamTabSelectorProps) {
  return (
    <div className="border-b border-[#374151]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-150 border-b-2 text-left ${
              activeTab === tab.id
                ? "border-[#c21c1c] text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
