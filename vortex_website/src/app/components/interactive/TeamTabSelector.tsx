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
 * TeamTabSelector — horizontal tab row for switching between sub-teams.
 *
 * Design rationale:
 * - Sub-teams (Software, Mechanical, etc.) are the primary navigation axis
 *   within the Team page. A tab row communicates "these are alternatives,
 *   pick one" more clearly than links or a dropdown would.
 * - The active tab has an underline (`border-b-2 border-[#c21c1c]`) rather
 *   than a background fill to differentiate it visually from the year
 *   selector (which uses a filled red pill). Consistent but distinct states
 *   prevent confusion between the two selectors.
 */
export default function TeamTabSelector({
  tabs,
  activeTab,
  onSelect,
}: TeamTabSelectorProps) {
  return (
    <div className="overflow-x-auto whitespace-nowrap border-b border-[#374151]">
      <div className="inline-flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            className={`px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-150 border-b-2 -mb-px ${
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
