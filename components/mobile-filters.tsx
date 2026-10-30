"use client";

import { LANGUAGE_ALL, POPULARITY_OPTIONS } from "@/lib/directory";
import type { DirectoryFilters, Facet, PopularityBucket } from "@/lib/types";

interface MobileFiltersProps {
  filters: DirectoryFilters;
  categoryFacets: Facet[];
  languageFacets: Facet[];
  onChange: (patch: Partial<DirectoryFilters>) => void;
}

export function MobileFilters({
  filters,
  categoryFacets,
  languageFacets,
  onChange,
}: MobileFiltersProps) {
  return (
    <div className="-mx-3 border-b border-ca-border px-3 py-2 sm:-mx-4 sm:px-4 lg:hidden">
      <div
        className="no-scrollbar flex items-center gap-1.5 overflow-x-auto"
        role="group"
        aria-label="Directory filters"
      >
        <Chip
          label="All"
          active={filters.category === "all"}
          onClick={() => onChange({ category: "all" })}
        />
        {categoryFacets.map((category) => (
          <Chip
            key={category.value}
            label={category.label}
            active={filters.category === category.value}
            onClick={() =>
              onChange({
                category:
                  filters.category === category.value
                    ? "all"
                    : (category.value as DirectoryFilters["category"]),
              })
            }
          />
        ))}

        <Divider />

        <Chip
          label="All stacks"
          active={filters.language === LANGUAGE_ALL}
          onClick={() => onChange({ language: LANGUAGE_ALL })}
        />
        {languageFacets.map((language) => (
          <Chip
            key={language.value}
            label={language.label}
            active={filters.language === language.value}
            onClick={() =>
              onChange({
                language:
                  filters.language === language.value
                    ? LANGUAGE_ALL
                    : language.value,
              })
            }
          />
        ))}

        <Divider />

        {POPULARITY_OPTIONS.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            active={filters.popularity === option.value}
            onClick={() =>
              onChange({ popularity: option.value as PopularityBucket })
            }
          />
        ))}
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-6 shrink-0 whitespace-nowrap rounded-ca border px-2 font-mono text-[10px] transition-colors ${
        active
          ? "border-ca-blue bg-ca-blue-dim text-ca-blue-light"
          : "border-ca-border bg-ca-surface text-ca-text-secondary hover:border-ca-border2 hover:text-ca-text"
      }`}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <span aria-hidden="true" className="mx-1 h-4 w-px shrink-0 bg-ca-border" />;
}
