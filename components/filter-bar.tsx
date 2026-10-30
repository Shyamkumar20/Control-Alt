"use client";

import { Flame, LayoutGrid, List } from "lucide-react";
import { DIRECTORY_TABS } from "@/lib/directory";
import type { DirectoryFilters, DirectoryTab, ViewMode } from "@/lib/types";

interface FilterBarProps {
  filters: DirectoryFilters;
  resultCount: number;
  view: ViewMode;
  onChange: (patch: Partial<DirectoryFilters>) => void;
  onViewChange: (view: ViewMode) => void;
}

export function FilterBar({
  filters,
  resultCount,
  view,
  onChange,
  onViewChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 py-2.5">
      <div
        className="no-scrollbar flex items-center gap-1.5 overflow-x-auto"
        role="tablist"
        aria-label="Directory views"
      >
        {DIRECTORY_TABS.map((tab) => {
          const active = filters.tab === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange({ tab: tab.value as DirectoryTab })}
              className={`flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-ca border px-2.5 text-[11px] transition-colors ${
                active
                  ? "border-ca-blue bg-ca-blue-dim text-ca-blue-light"
                  : "border-transparent text-ca-text-secondary hover:bg-ca-surface hover:text-ca-text"
              }`}
            >
              {tab.value === "trending" && (
                <Flame className="h-3 w-3 text-ca-amber" aria-hidden="true" />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <span className="whitespace-nowrap font-mono text-[11px] text-ca-text-dim">
          {resultCount} {resultCount === 1 ? "tool" : "tools"}
        </span>
        <div className="flex items-center gap-1" role="group" aria-label="Layout">
          <ViewButton
            label="Grid view"
            active={view === "grid"}
            onClick={() => onViewChange("grid")}
          >
            <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
          </ViewButton>
          <ViewButton
            label="List view"
            active={view === "list"}
            onClick={() => onViewChange("list")}
          >
            <List className="h-3.5 w-3.5" aria-hidden="true" />
          </ViewButton>
        </div>
      </div>
    </div>
  );
}

function ViewButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-7 w-7 items-center justify-center rounded-ca border transition-colors ${
        active
          ? "border-ca-blue bg-ca-blue-dim text-ca-blue-light"
          : "border-ca-border text-ca-text-dim hover:border-ca-border2 hover:text-ca-text-secondary"
      }`}
    >
      {children}
    </button>
  );
}
