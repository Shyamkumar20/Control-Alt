"use client";

import type { DirectoryFilters, Facet, PopularityBucket } from "@/lib/types";
import { LANGUAGE_ALL, POPULARITY_OPTIONS } from "@/lib/directory";

interface SidebarProps {
  filters: DirectoryFilters;
  total: number;
  categoryFacets: Facet[];
  languageFacets: Facet[];
  onChange: (patch: Partial<DirectoryFilters>) => void;
}

export function Sidebar({
  filters,
  total,
  categoryFacets,
  languageFacets,
  onChange,
}: SidebarProps) {
  return (
    <nav aria-label="Directory filters" className="flex w-full flex-col gap-4">
      <FilterGroup title="Categories">
        <FilterRow
          label="All categories"
          count={total}
          active={filters.category === "all"}
          onClick={() => onChange({ category: "all" })}
        />
        {categoryFacets.map((category) => (
          <FilterRow
            key={category.value}
            label={category.label}
            count={category.count}
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
      </FilterGroup>

      <FilterGroup title="Tech stack">
        <FilterRow
          label="All stacks"
          count={total}
          active={filters.language === LANGUAGE_ALL}
          onClick={() => onChange({ language: LANGUAGE_ALL })}
        />
        {languageFacets.map((language) => (
          <FilterRow
            key={language.value}
            label={language.label}
            count={language.count}
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
      </FilterGroup>

      <FilterGroup title="Popularity">
        {POPULARITY_OPTIONS.map((option) => (
          <FilterRow
            key={option.value}
            label={option.label}
            active={filters.popularity === option.value}
            onClick={() =>
              onChange({ popularity: option.value as PopularityBucket })
            }
          />
        ))}
      </FilterGroup>
    </nav>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-ca-border pb-4 last:border-b-0 last:pb-0">
      <h2 className="mb-1.5 px-2 text-[10px] font-medium uppercase tracking-[0.12em] text-ca-text-dim">
        {title}
      </h2>
      <div className="flex flex-col">{children}</div>
    </section>
  );
}

function FilterRow({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex h-[26px] w-full items-center justify-between gap-2 rounded-ca px-2 text-left text-xs transition-colors ${
        active
          ? "bg-ca-blue-dim text-ca-blue-light"
          : "text-ca-text-secondary hover:bg-ca-surface2 hover:text-ca-text"
      }`}
    >
      <span className="truncate">{label}</span>
      {typeof count === "number" && (
        <span
          className={`shrink-0 font-mono text-[10px] ${
            active ? "text-ca-blue-light" : "text-ca-text-dim"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
