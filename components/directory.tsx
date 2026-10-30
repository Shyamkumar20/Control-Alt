"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Topbar } from "@/components/topbar";
import { Sidebar } from "@/components/sidebar";
import { MobileFilters } from "@/components/mobile-filters";
import { FilterBar } from "@/components/filter-bar";
import { ToolCard } from "@/components/tool-card";
import {
  DEFAULT_FILTERS,
  buildCategoryFacets,
  buildLanguageFacets,
  filterTools,
  parseDirectoryFilters,
  sortTools,
} from "@/lib/directory";
import type { DirectoryFilters, ToolListItem, ViewMode } from "@/lib/types";

interface DirectoryProps {
  tools: ToolListItem[];
}

export function Directory({ tools }: DirectoryProps) {
  const [filters, setFilters] = useState<DirectoryFilters>(DEFAULT_FILTERS);
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    setFilters(parseDirectoryFilters(new URLSearchParams(window.location.search)));
  }, []);

  const updateFilters = useCallback((patch: Partial<DirectoryFilters>) => {
    setFilters((current) => ({ ...current, ...patch }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    window.history.replaceState(null, "", "/");
  }, []);

  const categoryFacets = useMemo(() => buildCategoryFacets(tools), [tools]);
  const languageFacets = useMemo(() => buildLanguageFacets(tools), [tools]);
  const results = useMemo(
    () => sortTools(filterTools(tools, filters), filters.tab),
    [tools, filters]
  );

  return (
    <>
      <Topbar
        query={filters.query}
        onQueryChange={(query) => updateFilters({ query })}
        onReset={resetFilters}
      />

      <main
        id="main"
        className="mx-auto w-full max-w-[1400px] flex-1 px-3 sm:px-4"
      >
        <div className="flex gap-5">
          <aside className="hidden w-[188px] shrink-0 lg:block">
            <div className="no-scrollbar sticky top-12 max-h-[calc(100vh-3rem)] overflow-y-auto py-4 pr-4">
              <Sidebar
                filters={filters}
                total={tools.length}
                categoryFacets={categoryFacets}
                languageFacets={languageFacets}
                onChange={updateFilters}
              />
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <MobileFilters
              filters={filters}
              categoryFacets={categoryFacets}
              languageFacets={languageFacets}
              onChange={updateFilters}
            />

            <FilterBar
              filters={filters}
              resultCount={results.length}
              view={view}
              onChange={updateFilters}
              onViewChange={setView}
            />

            <div className="pb-16">
              {results.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-xs text-ca-text-secondary">
                    No tools match these filters.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="mt-3 rounded-ca border border-ca-border2 px-3 py-1.5 text-xs text-ca-text-secondary transition-colors hover:border-ca-blue hover:text-ca-blue-light"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div
                  className={
                    view === "grid"
                      ? "grid grid-cols-1 gap-2.5 md:grid-cols-2"
                      : "flex flex-col gap-2"
                  }
                >
                  {results.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} view={view} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
