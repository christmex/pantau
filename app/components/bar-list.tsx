"use client";

import { useState } from "react";

import type { RankedCount } from "@/app/lib/religious-intolerance-cases";

type BarListProps = {
  heading: string;
  rows: readonly RankedCount[];
  variant?: "solid" | "soft";
};

const COLLAPSED_ROW_COUNT = 3;

export function BarList({ heading, rows, variant = "solid" }: BarListProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const highestCount = Math.max(...rows.map((row) => row.count));
  const visibleRows = isExpanded ? rows : rows.slice(0, COLLAPSED_ROW_COUNT);
  const hiddenCount = rows.length - COLLAPSED_ROW_COUNT;

  return (
    <div>
      <span className="field-label">{heading}</span>
      <ul className="bar-list">
        {visibleRows.map((row) => (
          <li className="bar-row" key={row.label}>
            <span className="bar-label">{row.label}</span>
            <span className="bar-count">{row.count}</span>
            <span className="bar-track">
              <span
                className={variant === "soft" ? "bar-fill soft" : "bar-fill"}
                style={{ width: `${(row.count / highestCount) * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button
          type="button"
          className="bar-expand"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Tampilkan lebih sedikit" : `Tampilkan ${hiddenCount} lainnya`}
        </button>
      )}
    </div>
  );
}
