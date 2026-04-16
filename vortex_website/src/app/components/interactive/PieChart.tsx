"use client";

import { useState } from "react";

type Slice = { label: string; value: number };

function generateColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const hue = Math.round((i * 360) / count);
    return `hsl(${hue}, 60%, 55%)`;
  });
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const clampedEnd = Math.min(end, start + 359.99);
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, clampedEnd);
  const large = clampedEnd - start > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
}

export default function PieChart({
  data,
  title,
  collapsibleLegend = false,
}: {
  data: Slice[];
  title: string;
  collapsibleLegend?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [legendOpen, setLegendOpen] = useState(false);

  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = generateColors(data.length);

  const sorted = [...data].sort((a, b) => b.value - a.value || a.label.localeCompare(b.label));

  const cx = 110, cy = 110, r = 95;
  let cum = 0;
  const slices = sorted.map((d, i) => {
    const start = (cum / total) * 360;
    cum += d.value;
    const end = (cum / total) * 360;
    return { ...d, start, end, color: colors[i] };
  });

  const active = hovered !== null ? slices[hovered] : null;


  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-semibold text-white self-start">{title}</h3>

      {/* Chart */}
      <div className="relative w-full max-w-55 md:max-w-70 lg:max-w-85 mx-auto">
        <svg width="100%" height="100%" viewBox="0 0 220 220" style={{ display: "block" }}>
          {slices.map((s, i) => (
            <path
              key={s.label}
              d={arc(cx, cy, hovered === i ? r + 7 : r, s.start, s.end)}
              fill={s.color}
              opacity={hovered !== null && hovered !== i ? 0.35 : 1}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer transition-all duration-150"
            />
          ))}
          <circle cx={cx} cy={cy} r={46} fill="#0a0a0a" />
          <text x={cx} y={cy + 6} textAnchor="middle" fill="#ffffff" fontSize={22} fontWeight="bold" fontFamily="sans-serif">
            {total}
          </text>
          <text x={cx} y={cy + 22} textAnchor="middle" fill="#6b7280" fontSize={10} fontFamily="sans-serif">
            members
          </text>
        </svg>
      </div>

      {/* Hover tooltip */}
      <div className="h-6 flex items-center justify-center w-full">
        {active ? (
          <p className="text-sm text-white text-center">
            <span className="font-semibold" style={{ color: active.color }}>{active.label}</span>
            {" — "}
            <span className="font-bold">{active.value}</span> members
          </p>
        ) : (
          <p className="text-sm text-gray-600">Hover a segment for details</p>
        )}
      </div>

      {/* Legend — first 4 always visible, rest collapsible */}
      <div className="w-full flex flex-col gap-1.5">
        {slices.slice(0, 4).map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center justify-between gap-3 cursor-pointer px-2 py-1 rounded transition-colors duration-150 ${hovered === i ? "bg-[#262626]" : ""}`}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-3 h-3 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} />
              <span className={`text-sm transition-colors duration-150 truncate ${hovered === i ? "text-white" : "text-gray-400"}`}>{s.label}</span>
            </div>
            <span className="text-white font-semibold text-sm tabular-nums shrink-0">{s.value}</span>
          </div>
        ))}

        {collapsibleLegend && slices.length > 4 && (
          <>
            {legendOpen && (
              <div className="max-h-56 overflow-y-auto pr-1 border-t border-[#374151] pt-1.5 flex flex-col gap-1.5">
                {slices.slice(4).map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-center justify-between gap-3 cursor-pointer px-2 py-1 rounded transition-colors duration-150 ${hovered === i + 4 ? "bg-[#262626]" : ""}`}
                    onMouseEnter={() => setHovered(i + 4)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-3 h-3 shrink-0 rounded-sm" style={{ backgroundColor: s.color }} />
                      <span className={`text-sm transition-colors duration-150 truncate ${hovered === i + 4 ? "text-white" : "text-gray-400"}`}>{s.label}</span>
                    </div>
                    <span className="text-white font-semibold text-sm tabular-nums shrink-0">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setLegendOpen((v) => !v)}
              className="mt-1 w-full flex items-center justify-between px-3 py-2 text-sm text-gray-400 hover:text-white border border-[#374151] hover:border-[#c21c1c] rounded transition-colors duration-150"
            >
              <span>{legendOpen ? "Show less" : `Show ${slices.length - 4} more programs`}</span>
              <span style={{ display: "inline-block", transform: legendOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>↓</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
