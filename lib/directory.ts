import {
  CATEGORIES,
  getCategoryBySlug,
  getCategoryForTopic,
  type CategorySlug,
} from "@/lib/categories";
import type { Software } from "@/types/database";
import type {
  DirectoryFilters,
  DirectoryTab,
  Facet,
  PopularityBucket,
  ToolListItem,
} from "@/lib/types";

export const LANGUAGE_ALL = "all";

export const DEFAULT_FILTERS: DirectoryFilters = {
  query: "",
  category: "all",
  language: LANGUAGE_ALL,
  popularity: "any",
  tab: "all",
};

export const DIRECTORY_TABS: { value: DirectoryTab; label: string }[] = [
  { value: "all", label: "All software" },
  { value: "trending", label: "Trending" },
  { value: "docker", label: "Docker / Self-host" },
  { value: "recent", label: "Recently added" },
];

export const POPULARITY_OPTIONS: { value: PopularityBucket; label: string }[] = [
  { value: "any", label: "Any" },
  { value: "10k", label: "★ 10k+" },
  { value: "1k", label: "★ 1k–10k" },
  { value: "under1k", label: "Under 1k" },
];

const TAB_VALUES = DIRECTORY_TABS.map((tab) => tab.value);
const POPULARITY_VALUES = POPULARITY_OPTIONS.map((option) => option.value);
const DOCKER_TOPICS = new Set([
  "docker",
  "docker-compose",
  "self-hosted",
  "selfhosted",
  "self-hosting",
  "homelab",
]);

const DAY_MS = 24 * 60 * 60 * 1000;

export function toToolListItem(row: Software): ToolListItem {
  return {
    id: row.id,
    fullName: row.full_name,
    name: row.name,
    description: row.description ?? "",
    license: row.license_spdx,
    language: row.language,
    topics: row.topics ?? [],
    stars: row.stars ?? 0,
    forks: row.forks ?? 0,
    htmlUrl: row.html_url,
    createdAt: row.created_at,
    pushedAt: row.pushed_at,
  };
}

export function getToolCategory(tool: Pick<ToolListItem, "topics">) {
  for (const category of CATEGORIES) {
    if (tool.topics.some((topic) => category.topics.includes(topic.toLowerCase()))) {
      return category;
    }
  }
  return null;
}

export function getCategoryNameForTool(tool: Pick<ToolListItem, "topics">): string {
  return getToolCategory(tool)?.name ?? "Uncategorized";
}

export function buildCategoryFacets(tools: ToolListItem[]): Facet[] {
  const counts = new Map<CategorySlug, number>();
  const seen = new Set<string>();

  for (const tool of tools) {
    for (const topic of tool.topics) {
      const category = getCategoryForTopic(topic);
      if (!category) continue;
      const key = `${tool.id}:${category.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      counts.set(category.slug, (counts.get(category.slug) ?? 0) + 1);
    }
  }

  return CATEGORIES.map((category) => ({
    value: category.slug,
    label: category.name,
    count: counts.get(category.slug) ?? 0,
  }));
}

export function buildLanguageFacets(tools: ToolListItem[]): Facet[] {
  const counts = new Map<string, number>();

  for (const tool of tools) {
    if (!tool.language) continue;
    counts.set(tool.language, (counts.get(tool.language) ?? 0) + 1);
  }

  return Array.from(counts, ([language, count]) => ({
    value: language,
    label: language,
    count,
  })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

function matchesPopularity(stars: number, bucket: PopularityBucket): boolean {
  switch (bucket) {
    case "10k":
      return stars >= 10_000;
    case "1k":
      return stars >= 1_000 && stars < 10_000;
    case "under1k":
      return stars < 1_000;
    default:
      return true;
  }
}

function isTrending(tool: ToolListItem): boolean {
  if (tool.stars < 10_000) return false;
  const pushed = Date.parse(tool.pushedAt);
  if (Number.isNaN(pushed)) return false;
  return Date.now() - pushed <= 90 * DAY_MS;
}

function isDockerOrSelfHosted(tool: ToolListItem): boolean {
  return tool.topics.some((topic) => DOCKER_TOPICS.has(topic.toLowerCase()));
}

function matchesTab(tool: ToolListItem, tab: DirectoryTab): boolean {
  if (tab === "trending") return isTrending(tool);
  if (tab === "docker") return isDockerOrSelfHosted(tool);
  return true;
}

function searchableText(tool: ToolListItem): string {
  return [
    tool.name,
    tool.fullName,
    tool.description,
    tool.language ?? "",
    tool.license ?? "",
    tool.topics.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

export function filterTools(
  tools: ToolListItem[],
  filters: DirectoryFilters
): ToolListItem[] {
  const query = filters.query.trim().toLowerCase();

  return tools.filter((tool) => {
    if (filters.category !== "all") {
      const belongs = tool.topics.some(
        (topic) => getCategoryForTopic(topic)?.slug === filters.category
      );
      if (!belongs) return false;
    }

    if (filters.language !== LANGUAGE_ALL && tool.language !== filters.language) {
      return false;
    }

    if (!matchesPopularity(tool.stars, filters.popularity)) return false;
    if (!matchesTab(tool, filters.tab)) return false;
    if (query && !searchableText(tool).includes(query)) return false;

    return true;
  });
}

export function sortTools(tools: ToolListItem[], tab: DirectoryTab): ToolListItem[] {
  const sorted = [...tools];

  if (tab === "recent") {
    sorted.sort((a, b) => {
      const aTime = Date.parse(a.createdAt) || 0;
      const bTime = Date.parse(b.createdAt) || 0;
      return bTime - aTime || b.stars - a.stars || a.id - b.id;
    });
    return sorted;
  }

  sorted.sort((a, b) => b.stars - a.stars || a.id - b.id);
  return sorted;
}

export function parseDirectoryFilters(params: {
  get(key: string): string | null;
}): DirectoryFilters {
  const category = params.get("category");
  const language = params.get("lang");
  const popularity = params.get("pop");
  const tab = params.get("tab");
  const query = params.get("q") ?? "";

  return {
    query: query.trim().slice(0, 80),
    category:
      category && getCategoryBySlug(category) ? (category as CategorySlug) : "all",
    language:
      language && language.trim() ? language.trim().slice(0, 40) : LANGUAGE_ALL,
    popularity: POPULARITY_VALUES.includes(popularity as PopularityBucket)
      ? (popularity as PopularityBucket)
      : "any",
    tab: TAB_VALUES.includes(tab as DirectoryTab) ? (tab as DirectoryTab) : "all",
  };
}

export function toolHref(fullName: string): string {
  return `/tool/${fullName.split("/").map(encodeURIComponent).join("/")}`;
}

export function categoryHref(slug: CategorySlug): string {
  return `/directory?category=${slug}`;
}

export function countLabel(count: number): string {
  return `${count} ${count === 1 ? "tool" : "tools"}`;
}
